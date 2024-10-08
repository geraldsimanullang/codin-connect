"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/homeComponents/Navbar";
import Image from "next/image";
import FollowButton from "@/components/FollowButton";

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

const Profile = ({ params }: { params: { username: string } }) => {
  const [activeTab, setActiveTab] = useState("challenges");
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { username } = params;
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/profile/${username}`);
        if (!response.ok) {
          throw new Error("Pengguna tidak ditemukan");
        }
        const fetchedProfile = await response.json();
        setProfile(fetchedProfile);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchProfile();
  }, [username]);

  const handleShowFollowing = () => {
    setShowFollowing((prev) => !prev);
    setShowFollowers(false); // Menutup followers jika following dibuka
  };

  const handleShowFollowers = () => {
    setShowFollowers((prev) => !prev);
    setShowFollowing(false); // Menutup following jika followers dibuka
  };

  if (error) return <p>{error}</p>; // Menampilkan pesan kesalahan jika ada
  if (!profile)
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <Image
          src="/loading.svg"
          alt=""
          width={100}
          height={0}
          style={{ height: "auto" }}
        />
        <p className=" font-semibold text-gray-700">Fetching user profile...</p>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="flex">
        <main className="flex-1 p-8">
          {/* Profile Section */}
          <div className="flex items-center mb-8 gap-6">
            <div className="w-24 h-24 border-[0.5px] border-gray-300 rounded-md bg-gray-100">
              {/* Placeholder for user photo */}
              <img
                src="/default-avatar.jpg"
                alt="Profile Photo"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Nama dan Stats */}
            <div className="flex h-24 flex-grow justify-between items-center">
              <div className="flex gap-4 items-center">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <FollowButton />
              </div>

              {/* Stats Section */}
              <div className="mt-2 flex space-x-8 pr-8">
                <div className="text-center">
                  <div className="font-semibold">
                    {profile.userChallenges.length}
                  </div>
                  <div>Challenges</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">
                    {profile.userSolutions?.length || "0"}
                  </div>
                  <div>Solutions</div>
                </div>
                <div
                  onClick={handleShowFollowing}
                  className="cursor-pointer text-center"
                >
                  <div className="font-semibold">
                    {profile.following.length}
                  </div>
                  <div>Following</div>
                </div>
                <div
                  onClick={handleShowFollowers}
                  className="cursor-pointer text-center"
                >
                  <div className="font-semibold">
                    {profile.followers.length}
                  </div>
                  <div>Followers</div>
                </div>
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
                  <p>{`${profile.name} has not created any challenge`}</p>
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
                  <p>{`${profile.name} has not solved any challenge`}</p>
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
