import jwt from "jsonwebtoken"

const SECRET_KEY = process.env.SECRET_KEY || "not safe key"

export const createToken = (payload: object) => jwt.sign(payload, SECRET_KEY)
export const readPayload = (token: string) => jwt.verify(token, SECRET_KEY)