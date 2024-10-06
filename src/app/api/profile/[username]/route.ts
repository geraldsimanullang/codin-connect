import { getUserByUsername } from "@/db/models/user";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;
    const userProfile = await getUserByUsername(username);
    if (!userProfile) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan" },
        { status: 404 }
      );
    }
    return NextResponse.json(userProfile, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "internal Server error" },
      { status: 500 }
    );
  }
}
