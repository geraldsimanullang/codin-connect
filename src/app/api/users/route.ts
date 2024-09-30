import { doRegister } from "@/db/models/user";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const user = await doRegister(data);

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
        {
          status: 500,
        }
      );
    }
  }
};
