import { useState } from "react";
import { executeCode } from "./api";
import * as monaco from "monaco-editor";

interface OutputProps {
  editorRef: React.RefObject<monaco.editor.IStandaloneCodeEditor>;
  language: string;
}

const Output: React.FC<OutputProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const runCode = async () => {
    if (!editorRef.current) return;
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      console.log(sourceCode);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error: any) {
      console.log(error);
      alert(error.message || "Unable to run code"); // menggunakan alert sebagai pengganti toast
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
            : "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
        }`}
        onClick={runCode}
        disabled={isLoading}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <div
        className={`h-3/4 p-2 border rounded-md ${
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
