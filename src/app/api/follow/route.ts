import { NextResponse } from "next/server";
import { followUser } from "@/db/models/follow";
import { readPayload } from "@/lib/jwt";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Token tidak ditemukan" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const payload = readPayload(token);
    const userId = payload.id;

    const { followUserId } = await request.json();

    if (!followUserId) {
      return NextResponse.json({ error: "userId dan followersId os required" });
    }

    await followUser(userId, followUserId);

    return NextResponse.json(
      { message: "Successfully followed user" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "error occurred while processing the request" },
      { status: 500 }
    );
  }
}
