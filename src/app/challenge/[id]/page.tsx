"use client";

import { getChallengeById } from "@/db/models/challenge";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ChallengeModel } from "@/db/models/challenge";
import Navbar from "@/components/homeComponents/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Challenge() {
  const { id }: { id: string } = useParams();
  const [challenge, setChallenge] = useState<ChallengeModel>();

  // Function to get the challenge based on the id
  const getChallange = async () => {
    const challenge = await getChallengeById(id);
    setChallenge(challenge);
  };

  // Effect to fetch challenge when component is mounted
  useEffect(() => {
    getChallange();
  }, []);

  return (
    <>
      {challenge ? (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow flex justify-center bg-gray-100">
            <div className="max-w-7xl w-full p-8 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">{challenge?.title}</h1>

                <Link href={`/solve/${id}`}>
                  <button className="bg-black text-white px-6 py-2 rounded-md">
                    Solve
                  </button>
                </Link>
              </div>

              <p className="text-lg mb-6">{challenge?.description}</p>
              <h2 className="text-xl font-semibold mb-2">Test Cases:</h2>
              <div className="space-y-4">
                {challenge?.testCases?.map((testCase, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white shadow rounded-md border border-gray-200"
                  >
                    <p className="font-medium">
                      <span className="text-gray-500">Input:</span>{" "}
                      {testCase.input}
                    </p>
                    <p className="font-medium">
                      <span className="text-gray-500">Expected Output:</span>{" "}
                      {testCase.expectedOutput}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-screen flex-col">
          <Image
            src="/loading.svg"
            alt="loading"
            width={100}
            height={0}
            style={{ height: "auto" }}
          />
          <p className="font-semibold text-gray-700">Loading challenge...</p>
        </div>
      )}
    </>
  );
}
