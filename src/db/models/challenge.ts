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

export const createNewChallenge = async () => {
  const db = await getDb();
};
