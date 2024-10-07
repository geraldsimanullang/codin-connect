import React, { useEffect, useState } from "react";

// Definisikan tipe untuk test case
// interface TestCase {
//   input: string;
//   expectedOutput: string;
// }

// interface Challenge {
//   title: string;
//   description: string;
//   functionName: string;
//   parameters: string[];
//   testCases: TestCase[];
//   createdAt: string;
// }

// interface ChallengeCardProps {
//   challengeId: string
// }

// const ChallengeCard: React.FC<ChallengeCardProps> = ({ challengeId }) => {
//   const [challenge, setChallenge] = useState<Challenge | null>(null); 
//   const [loading, setLoading] = useState<boolean>(true); 
//   const [error, setError] = useState<string | null>(null); 

//   useEffect(() => {
//     const fetchChallenge = async () => {
//       // Cek apakah challengeId valid
//       if (!challengeId) {
//         setError("Invalid challenge ID");
//         setLoading(false);
//         return;
//       }

//       try {
//         const response = await fetch(`/api/challenges/${challengeId}`);
//         if (!response.ok) {
//           throw new Error("Challenge not found");
//         }

//         const data: Challenge = await response.json(); 
//         setChallenge(data); 
//       } catch (error) {
//         setError((error as Error).message); 
//       } finally {
//         setLoading(false); 
//       }
//     };

//     fetchChallenge(); 
//   }, [challengeId]); 

//   if (loading) return <div className="text-center">Loading...</div>;
//   if (error) return <div className="text-red-500">Error: {error}</div>;

//   return (
//     // <div className="p-6 border border-gray-300 rounded-lg shadow-md">
//     //   <h2 className="text-2xl font-bold mb-4">{challenge?.title}</h2>
//     //   <p>{challenge?.description}</p>
//     //   <p>
//     //     <strong>Function Name:</strong> {challenge?.functionName}
//     //   </p>
//     //   <p>
//     //     <strong>Parameters:</strong>{" "}
//     //     {challenge?.parameters? challenge.parameters.join(", ") : "No parameters provided"}
//     //   </p>
//     //   <p>
//     //     <strong>Test Cases:</strong> {challenge?.testCases.length}
//     //   </p>
//     //   <p>
//     //     <strong>Created At:</strong>{" "}
//     //     {challenge?.createdAt ? new Date(challenge.createdAt).toLocaleString() : "N/A"}
//     //   </p>
//     // </div>
//     <h1>masuk gaaaaa</h1>
//   );
// };

export default function ChallengeCard(){
  return (
    <>
    <h1>Masuk gaaa card nyaaaaaa</h1>
    </>
  )
}

// export default ChallengeCard;
