"use client";

import LanguageSelector from "@/components/codeEditor/languageSelector";
import Output from "@/components/codeEditor/Output";
import { getChallengeById } from "@/db/models/challenge";
import { Editor, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ChallengeModel } from "@/db/models/challenge";

export default function Solve() {
  const { id }: { id: string } = useParams();
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [challenge, setChallenge] = useState<ChallengeModel>();

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const buildSnippet = () => {
    if (language === "javascript") {
      const snippet = `function ${challenge?.functionName}(${challenge?.parameters}){\n\t// write code here \n\n}`;

      setValue(snippet);
    }

    if (language === "python") {
      const snippet = `def ${challenge?.functionName}(${challenge?.parameters}):\n\t# write code here`;

      setValue(snippet);
    }
  };

  const onSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
  };

  const getChallange = async () => {
    const challenge = await getChallengeById(id);
    setChallenge(challenge);
  };

  useEffect(() => {
    buildSnippet();
  }, [challenge, language]);

  useEffect(() => {
    getChallange();
  }, []);

  return (
    <div className="flex min-h-screen min-w-screen">
      <div className="min-h-screen w-1/2">
        <p>{challenge?.title}</p>
        <p>{challenge?.description}</p>
        <p>Test cases:</p>
        {challenge?.testCases &&
          challenge.testCases.map((testCase) => {
            return (
              <>
                <p>Input: {testCase.input}</p>
                <p>Expected output: {testCase.expectedOutput}</p>
              </>
            );
          })}
      </div>
      {challenge && (
        <div className="min-h-screen w-1/2">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="50%"
            theme="vs-light"
            language={language}
            defaultValue={value}
            onMount={onMount}
            value={value}
            onChange={(newValue) => setValue(newValue || "")}
          />
          <Output
            editorRef={editorRef}
            language={language}
            functionName={challenge.functionName}
            testCases={challenge.testCases}
          />
        </div>
      )}
    </div>
  );
}
