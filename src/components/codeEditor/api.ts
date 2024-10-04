import { LANGUAGE_VERSIONS } from "./constans";

interface ExecuteCodeResponse {
  run: {
    output: string;
    stderr?: string;
  };
  [key: string]: any; // Additional fields if needed
}

export const executeCode = async (
  language: string,
  sourceCode: string
): Promise<ExecuteCodeResponse> => {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to execute code");
  }

  const data = await response.json();

  return data as ExecuteCodeResponse;
};
