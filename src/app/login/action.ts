"use server"

import { getUserByEmail, getUserByUsername } from "@/db/models/user"
import { redirect } from "next/navigation"
import { z } from "zod"
import { comparePasswordWithHash } from "@/db/utils/bcrypt"
import { createToken } from "@/lib/jwt"
import { cookies } from "next/headers"

const url = process.env.NEXT_PUBLIC_BASE_URL

export const doLogin =async(formdata: FormData) => {
  const loginInputSchema = z.object({
    identifier: z.string(),
    password: z.string()
  })

  const identifier = formdata.get("identifier")?.toString() || ""
  const password = formdata.get("password")


  const parseData = loginInputSchema.safeParse({
    identifier,
    password
  })

  if (!parseData.success) {
    const errorPath = parseData.error.issues[0].path[0]
    const errorMessage = parseData.error.issues[0].message
    const errorFinalMessage = `${errorPath} - ${errorMessage}`

    return redirect (`${url}/login?error=${errorFinalMessage}`)
  }

  let user = null

  if (identifier.includes("@")) {
    user = await getUserByEmail(parseData.data.identifier)
  } else {
    user = await getUserByUsername(parseData.data.identifier)
  }

  if (!user || !comparePasswordWithHash(parseData.data.password, user.password)) {
    return redirect(`${url}/login?error=Invalid%20credentials`)
  }

  const payload = {
    id: user._id,
    email: user.email
  }

  const token = createToken(payload)
  console.log(token);

  cookies().set("token", token, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 1000 * 60 * 60),
    sameSite: "strict"
  })

  return redirect(`${url}`)
}