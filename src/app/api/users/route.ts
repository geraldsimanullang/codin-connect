import { doRegister } from "@/db/models/user";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { searchUserByUsername } from "@/db/models/user";

type Myresponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const userInputSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z
    .string()
    .email({ message: "Must be email format" })
    .regex(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      { message: "Invalid email format" }
    ),
  password: z.string().min(5, { message: "Must be 5 or more characters long" }),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();
    console.log("received daaata", data);
    const parseResult = userInputSchema.safeParse(data);

    if (!parseResult.success) {
      const errorIssue = parseResult.error.issues[0];
      console.log("validation error", errorIssue);
      const errorPath = errorIssue.path[0];
      const errorMessage = errorIssue.message;

      return NextResponse.json<Myresponse<never>>(
        {
          statusCode: 400,
          error: `${errorPath} - ${errorMessage}`,
        },
        { status: 400 }
      );
    }

    const user = await doRegister(parseResult.data);

    return NextResponse.json<Myresponse<unknown>>(
      {
        statusCode: 201,
        message: "User registered successfully",
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Unexpected error:", error);

    return NextResponse.json<Myresponse<never>>(
      {
        statusCode: 500,
        error: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { message: "Username is required", data: null },
      { status: 400 }
    );
  }

  try {
    const user = await searchUserByUsername(username);

    if (!user) {
      return NextResponse.json(
        { message: "User not found", data: null },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Success", data: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal Server Error", data: null },
      { status: 500 }
    );
  }
}
