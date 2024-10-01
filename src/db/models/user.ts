import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config";
import { comparePasswordWithHash, hashPassword } from "../utils/bcrypt";

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

export const getUserByEmail = async (email: string) => {
  const db = await getDb()
  const user = (await db.collection(COLLECTION_NAME).findOne({email: email})) as UserModel

  return user
}

export const getUserByUsername = async (username: string) => {
  const db = await getDb()
  const user = (await db.collection(COLLECTION_NAME).findOne({username: username})) as UserModel

  return user
}

export const doLogin = async (usernameOrEmail: string, password: string) => {
 
  const user =
    usernameOrEmail.includes("@")
      ? await getUserByEmail(usernameOrEmail)
      : await getUserByUsername(usernameOrEmail);

  if (!user) {
    return null; 
  }

  
  const isPasswordValid = comparePasswordWithHash(password, user.password);
  return isPasswordValid ? user : null; 
};

