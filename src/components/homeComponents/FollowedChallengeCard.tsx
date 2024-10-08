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
  author?: string
  testCases: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

const url = process.env.NEXT_PUBLIC_DATABASE_URL || "http://localhost:3000";

const FollowedChallengeCard: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChallenges = async () => {
    try {
      const response = await fetch(`/api/followed-challenge`);
      if (!response.ok) {
        throw new Error("Failed to fetch challenges");
      }
      const data: Challenge[] = await response.json();
      setChallenges(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
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
    return <p className="text-center">Loading challenges...</p>;
  }

  if (error) {
    return <p className="text-center">Error: {error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold text-black">Feeds</h1>

      <div className="grid grid-cols-1 gap-4 max-w-4xl w-full mx-auto mt-4">
        {challenges.length === 0 ? (
          <p>No challenges created by your followed users.</p>
        ) : (
          challenges.map((challenge) => (
            <div
              key={challenge._id}
              className="card bg-white shadow-lg rounded-lg p-6 transition-transform"
            >
              <Link href={`${url}/challenge/${challenge._id}`}>
                <h2 className="text-xl font-bold text-black hover:text-blue-800 transition duration-200">
                  {challenge.title}
                </h2>
              </Link>
              <div className="text-sm text-gray-600 mb-2">
                <strong>{challenge.author || "Unknown"}</strong> {/* Menampilkan nama penulis */}
              </div>
              <p className="text-gray-700 mb-4">{challenge.description}</p>
            </div>
          ))
        )}
      </div>
      <Link href="/global-challenges">
        <button className="bg-black text-white rounded px-6 py-3 shadow-md mt-6 mb-6">
          Go to Global Challenges
        </button>
      </Link>
    </div>
  );
};

export default FollowedChallengeCard;
