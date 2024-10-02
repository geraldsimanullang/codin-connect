"use client";

import Image from "next/image";
import { LuBadgeCheck, LuBell } from "react-icons/lu";
import Sidebar from "@/components/homeComponents/Sidebar";

const Profile = () => {
  return (
    <>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <LuBell className="text-2xl text-gray-700" />
          </div>

          {/* Profile Section */}
          <div className="flex items-start mb-8 gap-6">
            <div className="relative">
              <img
                src="https://placehold.co/100x100"
                alt="Profile"
                className="w-40 h-40 rounded-lg object-cover shadow-lg"
              />
              <div className="absolute top-0 right-0 bg-white rounded-full p-1 -mt-2 -mr-2">
                <LuBadgeCheck className="text-green-500 text-xl" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold">Reiza Akbar</h2>
              <p className="text-gray-600 mb-2">reiwildani@gmail.com</p>
              <div className="flex items-center mb-2">
                <span className="text-gray-600 mr-2">Limit:</span>
                <span className="text-3xl font-bold">30</span>
                <span className="text-gray-600">/30</span>
              </div>
              <button className="bg-red-100 text-red-500 px-4 py-2 rounded-full shadow-sm">
                Logout
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-4 text-center gap-6">
              <div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-gray-600">Following</div>
              </div>
              <div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-gray-600">Followers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-gray-600">Total Soal</div>
              </div>
              <div>
                <div className="text-3xl font-bold">0</div>
                <div className="text-gray-600">Score</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Profile;
