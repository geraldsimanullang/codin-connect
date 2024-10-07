import { createNewSolution } from "@/db/models/solution";
import { readPayload } from "@/lib/jwt";

export const POST = async (request: Request) => {
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

    const data = await request.json();
  } catch (error) {
    console.error("Error creating challenge:", error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
