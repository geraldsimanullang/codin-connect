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
  author: string
};

const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = "Challenges";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  return client.db(DATABASE_NAME);
};

export const getChallengeById = async (id: string): Promise<ChallengeModel | null> => {
  const db = await getDb();
  const objectId = new ObjectId(id);

  const challenge = await db.collection(COLLECTION_NAME).aggregate([
    { $match: { _id: objectId } },
    {
      $lookup: {
        from: "Users", // Nama koleksi untuk penulis
        localField: "authorId",
        foreignField: "_id",
        as: "author", // Nama field untuk menyimpan data penulis
      },
    },
    {
      $unwind: {
        path: "$author",
        preserveNullAndEmptyArrays: true, // Jika tidak ada penulis, tetap tampilkan tantangan
      },
    },
  ]).toArray();

  return challenge.length > 0 ? {
    _id: challenge[0]._id,
    title: challenge[0].title,
    description: challenge[0].description,
    functionName: challenge[0].functionName,
    parameters: challenge[0].parameters,
    testCases: challenge[0].testCases,
    author: challenge[0].author.name, // Ganti 'name' dengan field yang sesuai dari koleksi Users
  } : null; 
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
