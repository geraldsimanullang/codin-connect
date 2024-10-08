"use client";

import { useState, useEffect } from "react";
import { LuBadgeCheck, LuBell } from "react-icons/lu";
import ProfileServer from "./profileServer";
import Link from "next/link";

interface User {
  name: string;
  username: string;
}

interface Challenge {
  _id: string;
  title: string;
  description: string;
  functionName: string;
  parameters: string;
  testCases: string[];
}

interface Solution {
  _id: string;
  solution: string;
  language: string;
  createdAt: string;
}

interface Profile {
  name: string;
  username: string;
  following: User[];
  followers: User[];
  userChallenges: Challenge[];
  userSolutions: Solution[];
}

const Profile = () => {
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await ProfileServer();
  
      setProfile(fetchedProfile as Profile);
      
    };
    fetchProfile();
  }, []);

  const handleShowFollowing = () => {
    setShowFollowing((prev) => !prev);
    setShowFollowers(false);
  };

  const handleShowFollowers = () => {
    setShowFollowers((prev) => !prev);
    setShowFollowing(false);
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <>
      <div className="flex">
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <LuBell className="text-2xl text-gray-700" />
          </div>

          {/* Profile Section */}
          <div className="flex items-start mb-8 gap-6">
            <div className="relative">
              <div className="absolute top-0 right-0 bg-white rounded-full p-1 -mt-2 -mr-2">
                <LuBadgeCheck className="text-green-500 text-xl" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-4 text-center gap-6">
              <div onClick={handleShowFollowing} className="cursor-pointer">
                <div className="text-3xl font-bold">{profile.following.length}</div>
                <div className="text-gray-600">Following</div>
              </div>
              <div onClick={handleShowFollowers} className="cursor-pointer">
                <div className="text-3xl font-bold">{profile.followers.length}</div>
                <div className="text-gray-600">Followers</div>
              </div>
            </div>
          </div>

          {/* Daftar Following */}
          {showFollowing && (
            <div className="mt-4">
              <ul>
                {profile.following.map((user) => (
                  <li key={user.username} className="text-gray-600">
                    <Link href={`/profile/${user.username}`}>
                      {user.name} ({user.username})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Daftar Followers */}
          {showFollowers && (
            <div className="mt-4">
              <ul>
                {profile.followers.map((user) => (
                  <li key={user.username} className="text-gray-600">
                    <Link href={`/profile/${user.username}`}>
                      {user.name} ({user.username})
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Daftar User Challenges */}
          <div className="mt-8">
            <h3 className="text-xl font-bold">User Challenges</h3>
            {profile.userChallenges.length === 0 ? (
              <p>No challenges found</p>
            ) : (
              <ul>
                {profile.userChallenges.map((challenge) => (
                  <li key={challenge._id} className="text-gray-600 mt-2">
                    <strong>{challenge.title}:</strong> {challenge.description}
                    <br />
                    <strong>Function:</strong> {challenge.functionName} ({challenge.parameters})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8">
  <h3 className="text-xl font-bold">User Solutions</h3>
  {profile?.userSolutions?.length === 0 ? (
    <p>No solutions found</p>
  ) : (
    <ul>
      {profile?.userSolutions?.map((solution) => (
        <li key={solution._id} className="text-gray-600 mt-2">
          <strong>Solution (Language: {solution.language}):</strong> <br />
          <pre>{solution.solution}</pre>
          <p><strong>Submitted on:</strong> {new Date(solution.createdAt).toLocaleDateString()}</p>
        </li>
      ))}
    </ul>
  )}
</div>
        </main>
      </div>
    </>
  );
};

export default Profile;
