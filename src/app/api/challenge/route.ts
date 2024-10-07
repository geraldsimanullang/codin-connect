// import { z } from "zod";
import { getChallenges } from "@/db/models/challenge"; // Fungsi untuk mendapatkan data tantangan
import { readPayload } from "@/lib/jwt"; // Fungsi untuk membaca token JWT

export const GET = async (request: Request) => {
  try {
    const cookieHeader = request.headers.get("cookie");

    const token = cookieHeader
      ?.split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return new Response(JSON.stringify({ error: "Token is required" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    let decodedPayload;
    try {
      decodedPayload = readPayload(token);
    } catch (error) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const challenges = await getChallenges();

    return new Response(JSON.stringify(challenges), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching challenges:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
