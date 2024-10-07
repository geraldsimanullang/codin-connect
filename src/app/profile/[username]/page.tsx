
"use client"; 

import { useState, useEffect } from "react";
import { LuBadgeCheck, LuBell } from "react-icons/lu";
import Link from "next/link";


interface User {
  name: string;
  username: string;
}

interface Profile {
  name: string; 
  username: string; 
  following: User[]; 
  followers: User[]; 
}

const Profile = ({ params }: { params: { username: string } }) => {
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { username } = params; // Mengambil username dari params

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
  if (!profile) return <p>Loading...</p>; // Menampilkan loading jika profil belum ada

  return (
    <>
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            {/* <h1 className="text-2xl font-bold">Profile {profile.username}</h1> */}
            <LuBell className="text-2xl text-gray-700" />
          </div>

          {/* Profile Section */}
          <div className="flex items-start mb-8 gap-6">
            <div className="relative">
              {/* Placeholder image */}
              <div className="absolute top-0 right-0 bg-white rounded-full p-1 -mt-2 -mr-2">
                <LuBadgeCheck className="text-green-500 text-xl" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">{profile.name}</h2>
              {/* <p className="text-gray-600">@{profile.username}</p> */}
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
              {/* <h3 className="text-xl font-bold">Following</h3> */}
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
              {/* <h3 className="text-xl font-bold">Followers</h3> */}
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
        </main>
      </div>
    </>
  );
};

export default Profile;
