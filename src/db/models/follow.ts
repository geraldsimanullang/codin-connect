import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";

export type FollowModel = {
  _id: ObjectId;
  userId: ObjectId;
  following: ObjectId[];
  followers: ObjectId[];
};

const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = "Follows";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

export const followUSer = async (userId: string, followersId: string) => {
  const db = await getDb();
  await db
    .collection(COLLECTION_NAME)
    .updateOne(
      { userId: new ObjectId(followersId) },
      { $addToSet: { followers: new ObjectId(userId) } },
      { upsert: true }
    );

  await db
    .collection(COLLECTION_NAME)
    .updateOne(
      { userId: new ObjectId(userId) },
      { $addToSet: { following: new ObjectId(followersId) } },
      { upsert: true }
    );
};

export const getFollowers = async (userId: string) => {
  const db = await getDb();
  const follows = await db
    .collection(COLLECTION_NAME)
    .findOne({ userId: new ObjectId(userId) });

  return follows ? follows.followers : [];
};

export const getFollowing = async (userId: string) => {
  const db = await getDb();
  const follows = await db
    .collection(COLLECTION_NAME)
    .findOne({ userId: new ObjectId(userId) });

  return follows ? follows.following : [];
};
