import { NextResponse } from 'next/server';
import { readPayload } from "@/lib/jwt";
import { getChallenges } from "@/db/models/challenge"; 
import { getProfileById } from "@/db/models/user"; 

type FollowingType = {
  _id: string; 
};

export const GET = async (request: Request) => {
  try {
    const cookieHeader = request.headers.get("cookie");
    console.log(cookieHeader, "<<<<< cookie nya nihhhhh");
    
    const token = cookieHeader
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 401 });
    }

    let decodedPayload;
    try {
      decodedPayload = readPayload(token);
    } catch (error) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const userId = decodedPayload?.id;
    console.log(userId, "<<<<<<< user id nyaaaaaa");
    
    const userProfile = await getProfileById(userId);
    
    if (!userProfile) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const followingIds: string[] = (userProfile.following as FollowingType[]).map((following) => following._id);

    const allChallenges = await getChallenges();

    const userChallenges = allChallenges.filter(challenge => 
      challenge.authorId === userId || followingIds.includes(challenge.authorId)
    );

    console.log(userChallenges, "<<<<<< challenge yang kamu follow disiniiiii yuhuuuuu");
    
    return NextResponse.json(userChallenges, { status: 200 });

  } catch (error) {
    console.error("Error fetching following challenges:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
};
