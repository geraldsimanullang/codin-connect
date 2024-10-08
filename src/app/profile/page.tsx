"use client";

import { useState, useEffect } from "react";
import ProfileServer from "./profileServer";
import Link from "next/link";
import Navbar from "@/components/homeComponents/Navbar";

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
  challenge: Challenge;
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
  const [activeTab, setActiveTab] = useState("challenges");
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
      <Navbar />
      <div className="flex">
        <main className="flex-1 p-8">
          {/* Profile Section */}
          <div className="flex items-start mb-8 gap-6">
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-4 text-center gap-6">
              <div className="">
                <div className="text-3xl font-bold">
                  {profile.userChallenges.length}
                </div>
                <div className="text-gray-600">Challenges</div>
              </div>
              <div className="">
                <div className="text-3xl font-bold">
                  {profile.userSolutions?.length || "0"}
                </div>
                <div className="text-gray-600">Solutions</div>
              </div>
              <div onClick={handleShowFollowing} className="cursor-pointer">
                <div className="text-3xl font-bold">
                  {profile.following.length}
                </div>
                <div className="text-gray-600">Following</div>
              </div>
              <div onClick={handleShowFollowers} className="cursor-pointer">
                <div className="text-3xl font-bold">
                  {profile.followers.length}
                </div>
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

          {/* Tabs for Challenges and Solutions */}
          <div className="mt-8">
            <div className="border-b border-gray-200 mb-4">
              <nav className="-mb-px flex space-x-4">
                <button
                  onClick={() => setActiveTab("challenges")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "challenges"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  User Challenges
                </button>
                <button
                  onClick={() => setActiveTab("solutions")}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "solutions"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  User Solutions
                </button>
              </nav>
            </div>

            {/* User Challenges */}
            {activeTab === "challenges" && (
              <div>
                {profile.userChallenges.length === 0 ? (
                  <p>No challenges found</p>
                ) : (
                  <ul>
                    {profile.userChallenges.map((challenge) => (
                      <div
                        key={challenge._id}
                        className="mt-2 w-full border-[0.5px] border-gray-200 p-2 rounded-sm"
                      >
                        <Link href={`/challenge/${challenge._id}`}>
                          <strong>{challenge.title}</strong>
                        </Link>
                        <p>{challenge.description}</p>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* User Solutions */}
            {activeTab === "solutions" && (
              <div>
                {profile?.userSolutions?.length === 0 ? (
                  <p>No solutions found</p>
                ) : (
                  <ul>
                    {profile?.userSolutions?.map((solution) => (
                      <li
                        key={solution._id}
                        className="mt-2 px-2 border-[0.5px] border-gray-200 rounded-md"
                      >
                        <strong>{solution.challenge.title}</strong>
                        <p className="text-sm text-gray-700">
                          Language: {solution.language}
                        </p>{" "}
                        <br />
                        <pre className="border-slate-200 border-[0.5px]">
                          {solution.solution}
                        </pre>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
