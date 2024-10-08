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
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_NAME)
    .findOne({ email: email })) as UserModel;

  return user;
};

export const getUserByUsername = async (username: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_NAME)
    .findOne({ username: username })) as UserModel;

  return user;
};

export const searchUserByUsername = async (username: string) => {
  const db = await getDb();
  const user = await db.collection("Users").findOne({ username });

  return user;
};

export const getProfileByUsername = async (username: string) => {
  const db = await getDb();
  const pipeline = [
    { $match: { username: username } },

    {
      $lookup: {
        from: "Follows",
        let: { userId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$followingId", "$$userId"] } } },
          { $project: { followerId: 1, _id: 0 } },
        ],
        as: "followers",
      },
    },

    {
      $lookup: {
        from: "Follows",
        let: { userId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$followerId", "$$userId"] } } },
          { $project: { followingId: 1, _id: 0 } },
        ],
        as: "following",
      },
    },

    {
      $lookup: {
        from: "Users",
        localField: "followers.followerId",
        foreignField: "_id",
        as: "followerDetails",
      },
    },

    {
      $lookup: {
        from: "Users",
        localField: "following.followingId",
        foreignField: "_id",
        as: "followingDetails",
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        username: 1,
        followers: {
          $map: {
            input: "$followerDetails",
            as: "follower",
            in: {
              _id: "$$follower._id",
              name: "$$follower.name",
              username: "$$follower.username",
              email: "$$follower.email",
            },
          },
        },
        following: {
          $map: {
            input: "$followingDetails",
            as: "following",
            in: {
              _id: "$$following._id",
              name: "$$following.name",
              username: "$$following.username",
              email: "$$following.email",
            },
          },
        },
      },
    },
  ];

  const user = await db.collection("Users").aggregate(pipeline).toArray();

  if (!user || user.length === 0) {
    return null;
  }

  return user[0];
};

export const doLogin = async (usernameOrEmail: string, password: string) => {
  const user = usernameOrEmail.includes("@")
    ? await getUserByEmail(usernameOrEmail)
    : await getUserByUsername(usernameOrEmail);

  if (!user) {
    return null;
  }

  const isPasswordValid = comparePasswordWithHash(password, user.password);
  return isPasswordValid ? user : null;
};

export const getProfileById = async (_id: string) => {
  const db = await getDb();
  const objectId = new ObjectId(_id);

  const pipeline = [
    { $match: { _id: objectId } },

    {
      $lookup: {
        from: "Follows",
        let: { userId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$followingId", "$$userId"] } } },
          { $project: { followerId: 1, _id: 0 } },
        ],
        as: "followers",
      },
    },

    {
      $lookup: {
        from: "Follows",
        let: { userId: "$_id" },
        pipeline: [
          { $match: { $expr: { $eq: ["$followerId", "$$userId"] } } },
          { $project: { followingId: 1, _id: 0 } },
        ],
        as: "following",
      },
    },

    {
      $lookup: {
        from: "Users",
        localField: "followers.followwerId",
        foreignField: "_id",
        as: "followerDetails",
      },
    },
    {
      $lookup: {
        from: "Users",
        localField: "following.followingId",
        foreignField: "_id",
        as: "followingDetails",
      },
    },

    {
      $lookup: {
        from: "Challenges",
        localField: "_id",
        foreignField: "authorId",
        as: "userChallenges",
      },
    },

    {
      $lookup: {
        from: "Solutions",
        let: { challengeIds: "$userChallenges._id", authorId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$challengeId", "$$challengeIds"] },
                  { $eq: ["$authorId", "$$authorId"] },
                ],
              },
            },
          },
          {
            $project: {
              _id: 1,
              challengeId: 1,
              solution: 1,
              language: 1,
              createdAt: 1,
            },
          },
        ],
        as: "solutions",
      },
    },

    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        username: 1,
        followers: {
          $map: {
            input: "$followerDetails",
            as: "follower",
            in: {
              _id: "$$follower._id",
              name: "$$follower.name",
              username: "$$follower.username",
              email: "$$follower.email",
            },
          },
        },
        following: {
          $map: {
            input: "$followingDetails",
            as: "following",
            in: {
              _id: "$$following._id",
              name: "$$following.name",
              username: "$$following.username",
              email: "$$following.email",
            },
          },
        },

        userChallenges: {
          $map: {
            input: "$userChallenges",
            as: "challenge",
            in: {
              _id: "$$challenge._id",
              title: "$$challenge.title",
              description: "$$challenge.description",
              functionName: "$$challenge.functionName",
              parameters: "$$challenge.parameters",
              testCases: "$$challenge.testCases",
              solutions: {
                $filter: {
                  input: "$solutions",
                  as: "solution",
                  cond: { $eq: ["$$solution.challengeId", "$$challenge._id"] },
                },
              },
            },
          },
        },
      },
    },
  ];

  const user = await db
    .collection(COLLECTION_NAME)
    .aggregate(pipeline)
    .toArray();

  if (!user || user.length === 0) {
    return null;
  }

  return user[0];
};
