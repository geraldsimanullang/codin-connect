import { useState } from "react";
import { executeCode } from "./api";
import * as monaco from "monaco-editor";
import { TestCaseModel } from "@/db/models/challenge";

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

  const runCode = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      let finalResults: string[] = [];

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
    } catch (error: any) {
      console.log(error);
      alert(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-1/2 p-4">
      <p className="mb-2 text-lg">Output</p>
      <button
        className={`mb-4 px-4 py-2 border rounded-md ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "border-[#004aad] text-[#004aad] hover:bg-[#004aad] hover:text-white"
        }`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? "Attempting..." : "Attempt"}
      </button>
      <div
        className={`h-1/2 p-2 w-full border rounded-md ${
          isError ? "border-red-500 text-red-400" : "border-gray-700"
        }`}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;
