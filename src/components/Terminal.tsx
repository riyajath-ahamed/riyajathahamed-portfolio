"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

const ROUTES: Record<string, string> = {
  game: "/game",
  admin: "/admin",
};

const AVAILABLE = Object.keys(ROUTES);
const PROMPT = "rj@portfolio:~$ ";
const MAX_LINES = 3;

export default function Terminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<{ text: string; type: "prompt" | "output" | "error" }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  function addLines(newLines: { text: string; type: "prompt" | "output" | "error" }[]) {
    setLines((prev) => [...prev, ...newLines].slice(-MAX_LINES));
  }

  function handleCommand(cmd: string) {
    const trimmed = cmd.trim();

    if (!trimmed) {
      addLines([{ text: `${PROMPT}`, type: "prompt" }]);
      return;
    }

    const parts = trimmed.split(/\s+/);
    const command = parts[0];
    const arg = parts[1];
    const promptLine = { text: `${PROMPT}${trimmed}`, type: "prompt" as const };

    switch (command) {
      case "ls":
        addLines([promptLine, { text: AVAILABLE.join("  "), type: "output" }]);
        break;
      case "cd": {
        const target = arg?.replace(/^\//, "");
        if (target && ROUTES[target]) {
          addLines([promptLine, { text: `navigating to /${target}...`, type: "output" }]);
          setTimeout(() => router.push(ROUTES[target]), 500);
          return;
        }
        addLines([promptLine, { text: `cd: no such directory: ${arg || ""}`, type: "error" }]);
        break;
      }
      case "help":
        addLines([promptLine, { text: "commands: ls, cd <dir>, clear, help", type: "output" }]);
        break;
      case "clear":
        setLines([]);
        return;
      default:
        addLines([promptLine, { text: `command not found: ${command}. Try 'help'`, type: "error" }]);
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  }

  return (
    <div
      className="mt-4 w-full max-w-sm cursor-text text-left mx-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="rounded-lg bg-neutral-900 dark:bg-neutral-950 border border-neutral-700/50 shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-green-500/20">
        <div ref={scrollRef} className="px-3 py-2 font-mono text-xs space-y-0.5 overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none]" style={{ maxHeight: "4.5rem" }}>
          {lines.map((line, i) => (
            <div
              key={i}
              className={
                line.type === "prompt"
                  ? "text-neutral-400"
                  : line.type === "error"
                    ? "text-red-400"
                    : "text-green-400"
              }
            >
              {line.type === "prompt" ? (
                <>
                  <span className="text-green-400">rj@portfolio</span>
                  <span className="text-neutral-600">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-neutral-400">{line.text.slice(PROMPT.length - 2)}</span>
                </>
              ) : (
                line.text
              )}
            </div>
          ))}

          <div className="flex items-center">
            <span className="text-green-400 shrink-0">rj@portfolio</span>
            <span className="text-neutral-600 shrink-0">:</span>
            <span className="text-blue-400 shrink-0">~</span>
            <span className="text-neutral-400 shrink-0">$&nbsp;</span>
            <span className="inline-block w-[5px] h-3.5 bg-green-400 shrink-0 animate-[blink_1s_step-end_infinite]" />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 min-w-0 bg-transparent text-green-400 outline-none caret-transparent font-mono text-xs"
              spellCheck={false}
              autoComplete="off"
            />
            <style dangerouslySetInnerHTML={{ __html: `@keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
