"use client";

import { useState } from "react";
import { executeCode } from "./api";
import * as monaco from "monaco-editor";
import { TestCaseModel } from "@/db/models/challenge";

const url = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

interface OutputProps {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>;
  language: string;
  functionName: string;
  testCases: TestCaseModel[];
}

interface TestCase {
  input: string;
  expectedOutput: string;
}

const Output: React.FC<OutputProps> = ({
  editorRef,
  language,
  functionName,
  testCases,
}) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [passedCount, setPassedCount] = useState<number>(0);

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
      setPassedCount(passCount);
      setIsError(false);

      if (passCount === testCases.length) {
        const response = await fetch(`/api/solution`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            sourceCode,
            language,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to submit the solution");
        }

        const data = await response.json();
        console.log("Solution submitted successfully:", data);
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
      <p className="mb-4 text-xl font-semibold text-gray-700">Output</p>

      {/* Run Code Button */}
      <button
        className={`mb-6 w-full px-4 py-2 rounded-lg font-medium transition ${
          isLoading
            ? "bg-gray-400 text-gray-100 cursor-not-allowed"
            : "border border-[#004aad] text-[#004aad] bg-white hover:bg-[#004aad] hover:text-white"
        }`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? "Attempting..." : "Attempt"}
      </button>

      {/* Output Display */}
      <div
        className={`min-h-[150px] p-4 rounded-lg overflow-auto transition border ${
          isError
            ? "border-red-500 bg-red-50 text-red-600"
            : "border-gray-300 bg-gray-100 text-gray-800"
        }`}
      >
        {output && output.length > 0 ? (
          output.map((line, index) => (
            <p
              key={index}
              className={`whitespace-pre-wrap ${
                line.includes("passed") ? "text-green-700" : "text-red-700"
              }`}
            >
              {line}
            </p>
          ))
        ) : (
          <p>Click "Run Code" to see the output here</p>
        )}
      </div>
    </div>
  );
};

export default Output;
