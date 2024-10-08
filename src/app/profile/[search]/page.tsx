import { GetServerSideProps } from "next";
import { getProfileByUsername } from "@/db/models/user";
import { UserModel } from "@/db/models/user";
import React from "react";

interface ProfileProps {
  user: UserModel | null;
  error: string | null;
}

const Profile: React.FC<ProfileProps> = ({ user, error }) => {
  if (error) {
    return <div className="text-red-500 text-center mt-10">{error}</div>;
  }

  if (!user) {
    return <div className="text-center mt-10">User not found</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Profile: {user.username}</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      {/* You can add more user details here */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.params as { username: string };

  try {
    const user = await getProfileByUsername(username);

    if (!user) {
      return { props: { user: null, error: "User not found" } };
    }

    return { props: { user, error: null } };
  } catch (error) {
    return { props: { user: null, error: "Error fetching user profile" } };
  }
};

export default Profile;
