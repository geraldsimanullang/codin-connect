"use client";

import React from "react";
import Sidebar from "@/components/homeComponents/HomeNavbar";

const Dashboard: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full p-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Kounter Statistics */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {/* Kounter List */}
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">0/30</h2>
              <p className="text-sm text-gray-500">Kounter List</p>
            </div>
            <div className="text-black">
              <i className="fas fa-list-alt"></i>
            </div>
          </div>
          {/* Kounter Online */}
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">0</h2>
              <p className="text-sm text-gray-500">apa aja </p>
            </div>
            <div className="text-black">
              <i className="fas fa-heartbeat"></i>
            </div>
          </div>
          {/* Total Kounter */}
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">0</h2>
              <p className="text-sm text-gray-500">Total Question</p>
            </div>
            <div className="text-black">
              <i className="fas fa-eye"></i>
            </div>
          </div>
          {/* Total Click */}
          <div className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">0</h2>
              <p className="text-sm text-gray-500">Total Click</p>
            </div>
            <div className="text-black">
              <i className="fas fa-mouse-pointer"></i>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <button className="mt-6 py-2 px-4 bg-black text-white rounded-lg shadow-md">
            + Add Question
          </button>
        </div>

        {/* Top Kounter */}
        <div>
          <h2 className="text-xl font-bold mb-4">Top Leaderboard</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg shadow-md">
              <thead>
                <tr className="bg-black text-white">
                  <th className="py-2 px-4 border">Rank</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Category</th>
                  <th className="py-2 px-4 border">Count</th>
                  <th className="py-2 px-4 border">Click</th>
                  <th className="py-2 px-4 border">Visibility</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    Data tidak ditemukan
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tambah Kounter Button */}
      </div>
    </div>
  );
};

export default Dashboard;
