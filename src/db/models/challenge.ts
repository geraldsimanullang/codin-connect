"use server";

import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

export type TestCaseModel = {
  input: string;
  expectedOutput: string;
};

export type ChallengeModel = {
  _id: ObjectId;
  title: string;
  description: string;
  functionName: string;
  parameters: string;
  testCases: TestCaseModel[];
};

const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = "Challenges";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getChallengeById = async (_id: string) => {
  const db = await getDb();
  const objectId = new ObjectId(_id);

  const challenge = (await db
    .collection(COLLECTION_NAME)
    .findOne({ _id: objectId })) as ChallengeModel;

  return challenge;
};

export interface NewChallengeInput {
  authorId: string;
  title: string;
  description: string;
  functionName: string;
  parameters: string;
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

export const getChallenges = async () => {
  const db = await getDb();
  const challenges = await db
    .collection("Challenges")
    .aggregate([
      {
        $lookup: {
          from: "Users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
          preserveNullAndEmptyArrays: true,
        },
      },
    ])
    .toArray();

  return challenges;
};

export const createNewChallenge = async (data: NewChallengeInput) => {
  try {
    const db = await getDb();

    const newChallenge = {
      authorId: new ObjectId(data.authorId),
      title: data.title,
      description: data.description,
      functionName: data.functionName,
      parameters: data.parameters,
      testCases: data.testCases,
      createdAt: new Date(),
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(newChallenge);

    return result;
  } catch (error) {
    console.error("Error creating new challenge:", error);
    throw error;
  }
};
