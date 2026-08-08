import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("bash", bash);

const editorTheme = {
  ...vscDarkPlus,
  'pre[class*="language-"]': {
    ...vscDarkPlus['pre[class*="language-"]'],
    background: "transparent",
    margin: 0,
  },
  'code[class*="language-"]': {
    ...vscDarkPlus['code[class*="language-"]'],
    background: "transparent",
  },
};

export function CodeBlock({ code, language = "jsx" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative rounded-xl border border-[var(--border)] bg-[#1e1e1e] group">
      <button
        onClick={copy}
        aria-label="Copy code"
        className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <SyntaxHighlighter
        language={language}
        style={editorTheme}
        customStyle={{
          margin: 0,
          padding: "16px",
          paddingRight: "40px",
          fontSize: "13px",
          lineHeight: 1.6,
          background: "transparent",
          maxHeight: "420px",
        }}
        codeTagProps={{ style: { fontFamily: '"JetBrains Mono", ui-monospace, monospace' } }}
        showLineNumbers={code.split("\n").length > 8}
        lineNumberStyle={{ color: "#4b4b52", minWidth: "2em" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

const MANAGERS = [
  { id: "pnpm", label: "pnpm", cmd: (c) => `pnpm dlx ${c}` },
  { id: "yarn", label: "yarn", cmd: (c) => `yarn dlx ${c}` },
  { id: "npm", label: "npm", cmd: (c) => `npx ${c}` },
  { id: "bun", label: "bun", cmd: (c) => `bunx --bun ${c}` },
];

export function PackageManagerTabs({ registryCommand }) {
  const [active, setActive] = useState("pnpm");
  const manager = MANAGERS.find((m) => m.id === active);
  const command = manager.cmd(registryCommand);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[#1e1e1e] overflow-hidden">
      <div className="flex items-center gap-1 px-2 pt-2 border-b border-white/5">
        {MANAGERS.map((m) => (
          <button
            key={m.id}
            onClick={() => setActive(m.id)}
            className={`px-3 py-1.5 text-[12px] font-mono-key rounded-t-md transition-colors ${
              active === m.id
                ? "text-zinc-100 bg-white/5"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <CommandLine command={command} />
    </div>
  );
}

function CommandLine({ command }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative">
      <button
        onClick={copy}
        aria-label="Copy command"
        className="absolute top-2.5 right-2.5 p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-white/5 transition-colors"
      >
        {copied ? <Check size={14} /> : <Copy size={14} />}
      </button>
      <pre className="overflow-x-auto p-4 pr-10 text-[13px] font-mono-key text-[#c7b3ff]">
        <code>{command}</code>
      </pre>
    </div>
  );
}
