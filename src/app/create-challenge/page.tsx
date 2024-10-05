"use client";
import Navbar from "@/components/homeComponents/Navbar";
import { handleCreateChallenge } from "./action";

export default function Addquestion() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Form */}
      <div className="flex-1 flex justify-center items-center">
        <form
          className="bg-white p-8 shadow-lg w-full max-w-3xl"
          action={handleCreateChallenge}
        >
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 text-sm text-gray-700 rounded-lg border border-black bg-transparent focus:border-black focus:ring-black"
              name="title"
            />
          </div>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/2">
              <label className="block text-lg font-bold mb-2">
                Description
              </label>
              <input
                type="text"
                className="w-full p-2 text-sm text-gray-700 rounded-lg border border-black bg-transparent focus:border-black focus:ring-black"
                name="description"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-lg font-bold mb-2">
                Function Name
              </label>
              <input
                type="text"
                className="w-full p-2 text-sm text-gray-700 rounded-lg border bg-transparent focus:border-black focus:ring-black border-black"
                name="functionName"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Parameters</label>
            <input
              type="text"
              className="w-full p-2 text-sm text-gray-700 rounded-lg border border-black bg-transparent focus:border-black focus:ring-black"
              name="parameters"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-bold mb-2">Test Cases</label>
            <textarea
              className="w-full p-2 text-sm text-gray-700 rounded-lg h-32 border bg-transparent focus:border-black focus:ring-black border-black"
              name="testCases"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-transparent hover:bg-black hover:text-white text-lg font-bold text-gray-700 p-2 rounded-lg transition duration-300 ease-in-out border border-black"
          >
            Post Challenge
          </button>
        </form>
      </div>
    </div>
  );
}
