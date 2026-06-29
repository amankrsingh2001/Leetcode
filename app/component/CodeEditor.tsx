"use client";

import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { useSocket } from "../hook/useSocket";

const STARTER_CODES = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

class Solution {
public:

};`,

  java: `class Solution {

}`,

  python: `class Solution:
    pass`,

  javascript: `function solve() {

}`,
} as const;

type Language = keyof typeof STARTER_CODES;

export default function CodeEditor() {
  const [language, setLanguage] = useState<Language>("cpp");
  const {socket, loadingState} = useSocket();

  const [codes, setCodes] = useState<Record<Language, string>>(
    STARTER_CODES
  );

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  const handleCodeChange = (value: string | undefined) => {
    setCodes((prev) => ({
      ...prev,
      [language]: value ?? "",
    }));
  };


    useEffect(() => {
      if (socket && !loadingState) {
          console.log("Socket is on")
      }
    }, [socket]);


  return (
    <div className="flex flex-col h-full">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-2">
        <select
          value={language}
          onChange={(e) =>
            handleLanguageChange(e.target.value as Language)
          }
          className="bg-zinc-900 border border-zinc-700 rounded px-2 py-1"
        >
          <option value="cpp">C++</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>

        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-zinc-700">
            Run
          </button>

          <button className="px-3 py-1 rounded bg-green-600">
            Submit
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          language={language}
          value={codes[language]}
          onChange={handleCodeChange}
          theme="vs-dark"
          height="100%"
          options={{
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
            scrollBeyondLastLine: false,
            fontSize: 14,
          }}
        />
      </div>
    </div>
  );
}