"use client";

import { useState } from "react";
import { executeCode } from "./api";
import * as monaco from "monaco-editor";
import { TestCaseModel } from "@/db/models/challenge";
import { useRouter } from "next/navigation";

const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface OutputProps {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>;
  language: string;
  functionName: string;
  challengeId: string;
  testCases: TestCaseModel[];
}

const Output: React.FC<OutputProps> = ({
  editorRef,
  language,
  functionName,
  challengeId,
  testCases,
}) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const router = useRouter();

  const runCode = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      let finalResults: string[] = [];
      let passCount = 0;

      for (let i = 0; i < testCases.length; i++) {
        const { input, expectedOutput } = testCases[i];

        let finalCode: string = "";

        if (language === "javascript") {
          finalCode = `
            ${sourceCode}
            console.log(${functionName}(${input})); 
          `;
        }

        if (language === "python") {
          finalCode = `${sourceCode}\nprint(${functionName}(${input}));`;
        }

        const { run: result } = await executeCode(language, finalCode);

        if (result.output.trim() == expectedOutput) {
          finalResults.push(
            `Test case ${
              i + 1
            } passed: got ${result.output.trim()}, expected ${expectedOutput}`
          );
          passCount++;
        } else {
          finalResults.push(
            `Test case ${
              i + 1
            } failed: got ${result.output.trim()}, expected ${expectedOutput}`
          );
        }
      }

      setOutput(finalResults);
      setIsError(false);

      if (passCount === testCases.length) {
        const response = await fetch(`/api/solution`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            solution: sourceCode,
            language,
            challengeId,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit the solution");
        }

        await response.json();
        setIsSolved(true);
      }
    } catch (error: any) {
      console.log(error);
      alert(error.message || "Unable to run code");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full p-6 bg-white shadow-md rounded-lg border border-gray-200">
      {/* Output Title */}
      <p className="text-xl font-semibold text-gray-700">Output</p>

      {/* Button */}
      {!isSolved ? (
        <button
          className={`w-full px-4 py-2 rounded-lg font-medium transition ${
            isLoading
              ? "bg-gray-400 text-gray-100 cursor-not-allowed"
              : "border bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={runCode}
          disabled={isLoading}
        >
          {isLoading ? "Attempting..." : "Attempt"}
        </button>
      ) : (
        <div className="w-full flex justify-end gap-3 py-3">
          <button className="border-[1px] border-black px-4 py-1 rounded-md">
            Back to Home
          </button>
          <button className="border-[1px] border-blue-700 text-blue-700 px-4 py-1 rounded-md">
            Explore challenges
          </button>
          <button className="border-[1px] border-blue-500 text-white bg-blue-500 px-4 py-1 rounded-md">
            Find random challenge
          </button>
        </div>
      )}

      {/* Output Display */}
      <div
        className={`min-h-[150px] p-4 rounded-lg overflow-auto transition border ${
          isError
            ? "border-red-500 text-red-600"
            : "border-gray-300 text-gray-800"
        }`}
      >
        {output && output.length > 0 ? (
          output.map((line, index) => (
            <div
              key={index}
              className={`whitespace-pre-wrap p-3 mb-3 rounded-xl border-2 ${
                line.includes("passed")
                  ? "border-green-500 text-green-700"
                  : "border-red-500 text-red-700"
              }`}
            >
              {line}
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">
            Click "Attempt" to see the test case
          </p>
        )}
      </div>
    </div>
  );
};

export default Output;
