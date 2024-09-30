import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { hashPassword } from "../utils/bcrypt";

export type UserModel = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type RegisterInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.DATABASE_NAME;
const COLLECTION_NAME = "Users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const doRegister = async (user: RegisterInput) => {
  const modifiedUser: RegisterInput = {
    ...user,
    password: hashPassword(user.password),
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_NAME).insertOne(modifiedUser);

  return result;
  
};
