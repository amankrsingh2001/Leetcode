"use client";

import Editor from "@monaco-editor/react";
import { useProblem } from "../context/problemContext";

export default function CodeEditor() {
  const { language, codes, setCodes } = useProblem();






  function handleEditorChange(value: string | undefined) {
    setCodes((prev) => ({
      ...prev,
      [language]: value ?? "",
    }));
  }

  return (
    <Editor
      height="60vh"
      language={language}
      value={codes[language]}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        suggestOnTriggerCharacters: false,
        quickSuggestions: false,
        parameterHints: {
          enabled: false,
        },
        inlineSuggest: {
          enabled: false,
        },
        automaticLayout: true,
        fontSize: 14,
        tabSize: 4,
      }}
    />
  );
}