import { z } from "zod";
import { createNewChallenge } from "@/db/models/challenge";

const challengeSchema = z.object({
  title: z.string().nonempty("Title is required"),
  description: z.string().nonempty("Description is required"),
  functionName: z.string().nonempty("Function name is required"),
  parameters: z.string().nonempty("Parameters are required"),
  testCases: z
    .array(
      z.object({
        input: z.string().nonempty("Test case input is required"),
        expectedOutput: z.string().nonempty("Expected output is required"),
      })
    )
    .min(1, "At least one test case is required"),
});

export const POST = async (request: Request) => {
  try {
    const data = await request.json();

    const validationResult = challengeSchema.safeParse(data);

    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          error: validationResult.error.format(),
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    await createNewChallenge(data);

    return new Response(
      JSON.stringify({
        message: "Challenge created successfully",
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Something went wrong",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
