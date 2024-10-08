import { searchUserByUsername } from "@/db/models/user";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username");

    if (!username) {
      return NextResponse.json(
        { message: "Username is required" },
        { status: 400 }
      );
    }

    const user = await searchUserByUsername(username);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { message: "An error occurred while searching for the user." },
      { status: 500 }
    );
  }
}
