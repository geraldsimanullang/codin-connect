"use server";

import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = "Solutions";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export interface NewSolutionInput {
  authorId: string;
  challengeId: string;
  solution: string;
}

export const createNewSolution = async (data: NewSolutionInput) => {
  try {
    const db = await getDb();

    const newChallenge = {
      authorId: new ObjectId(data.authorId),
      challengeId: new ObjectId(data.challengeId),
      solution: data.solution,
      createdAt: new Date(),
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(newChallenge);

    return result;
  } catch (error) {
    console.error("Error creating new challenge:", error);
    throw error;
  }
};
