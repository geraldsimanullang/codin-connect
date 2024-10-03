"use client";
import { useRef, useState } from "react";
import { Editor, OnMount } from "@monaco-editor/react";
import LanguageSelector from "@/components/codeEditor/languageSelector";
import { CODE_SNIPPETS } from "@/components/codeEditor/constans";
import Output from "@/components/codeEditor/Output";
import * as monaco from "monaco-editor";

const CodeEditor: React.FC = () => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [value, setValue] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");

  const onMount: OnMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (selectedLanguage: string) => {
    setLanguage(selectedLanguage);
    setValue(CODE_SNIPPETS[selectedLanguage]);
  };

  return (
    <div className="flex space-x-4">
      <div className="w-1/2">
        <LanguageSelector language={language} onSelect={onSelect} />
        <div className="mt-80">
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            theme="vs-light"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(newValue) => setValue(newValue || "")}
          />
        </div>
      </div>
      <Output editorRef={editorRef} language={language} />
    </div>
  );
};

export default CodeEditor;
