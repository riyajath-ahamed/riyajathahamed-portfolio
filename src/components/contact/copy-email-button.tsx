"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

function copyWithSelection(value: string) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.left = "-9999px";
  document.body.appendChild(input);
  input.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(input);
  if (!ok) throw new Error("copy failed");
}

export async function writeClipboard(value: string) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value);
      return;
    }
  } catch {
    // The clipboard API can reject without a direct user gesture.
  }

  copyWithSelection(value);
}

export function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  async function copy() {
    try {
      await writeClipboard(email);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Email copied" : `Copy ${email}`}
      className={cn(
        "inline-flex h-7 shrink-0 items-center gap-1 rounded-lg border border-black/[0.08] bg-[#f6f6f7] px-2 text-xs font-medium text-neutral-800 transition-[transform,background-color] duration-200 hover:bg-neutral-100 active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.06] dark:text-neutral-100 dark:hover:bg-white/10",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-white/70",
      )}
    >
      {copied ? (
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
          <path
            d="M3.2 8.3 6.3 11.4 12.8 4.6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
          <rect
            x="5.2"
            y="4.2"
            width="7.2"
            height="8.6"
            rx="1.4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
          />
          <path
            d="M10.6 4.2V3.4A1.4 1.4 0 0 0 9.2 2H3.8A1.4 1.4 0 0 0 2.4 3.4v6.2A1.4 1.4 0 0 0 3.8 11H5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      )}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
