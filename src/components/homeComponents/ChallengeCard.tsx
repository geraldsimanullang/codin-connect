"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

interface Challenge {
  _id: string;
  title: string;
  description: string;
  functionName: string;
  parameters: string;
  authorId: string;
  author?: {
    name: string;
    // username:
  };
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

const ChallengeCard = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = async () => {
    try {
      const response = await fetch("/api/challenge");
      if (!response.ok) {
        throw new Error("Failed to fetch challenges");
      }
      const data: Challenge[] = await response.json();
      setChallenges(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setError(err.message);
      } else {
        console.error("Unexpected error", err);
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  if (loading) {
    return (
      <p className="flex flex-col items-center min-h-screen p-4">
        Loading challenges...
      </p>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <Link href="/create-challenge">
        <button className="bg-black text-white rounded-full px-4 py-2 mb-4">
          Add Challenge
        </button>
      </Link>

      <div className="grid grid-cols-1 gap-4 max-w-4xl w-full">
        {challenges.map((challenge) => (
          <div
            key={challenge._id}
            className="card bg-white shadow-md rounded-lg p-4"
          >
            <h2 className="text-xl font-bold">{challenge.title}</h2>
            <div className="text-xs text-gray-500 mb-5">
              <strong></strong> {challenge.author?.name || "Unknown"}{" "}
            </div>
            <p className="text-gray-700 mb-4">{challenge.description}</p>
            <div className="text-sm">
              <strong>Function:</strong> {challenge.functionName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengeCard;
