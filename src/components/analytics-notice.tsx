"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { Toaster, toast } from "sonner";

const STORAGE_KEY = "analytics-notice-acknowledged";
const TOAST_ID = "analytics-notice";

function acknowledge() {
  try {
    localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Private browsing can block storage. The toast still closes.
  }
}

function hasAcknowledged() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

export function AnalyticsNotice() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (hasAcknowledged()) return;

    toast.custom(
      (id) => (
        <div
          role="status"
          className="flex w-[min(100vw-2rem,22rem)] items-center gap-3 rounded-2xl border border-[#233b24]/12 bg-[#fbf8f1] px-4 py-3 text-[#1c1917] shadow-[0_16px_40px_-18px_rgba(35,59,36,0.5)] dark:border-white/10 dark:bg-[#15201a] dark:text-[#f4f1ea]"
        >
          <p className="min-w-0 flex-1 text-sm leading-snug">
            This site collects anonymous usage data for analytics. No name,
            email, or account is stored.
          </p>
          <button
            type="button"
            data-testid="analytics-notice-okay"
            onClick={() => {
              acknowledge();
              toast.dismiss(id);
            }}
            className="shrink-0 rounded-full bg-[#233b24] px-3.5 py-1.5 text-xs font-medium text-[#ccfd50] transition-colors hover:bg-[#1a2e1b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccfd50] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbf8f1] dark:focus-visible:ring-offset-[#15201a]"
          >
            Okay
          </button>
        </div>
      ),
      {
        id: TOAST_ID,
        duration: Infinity,
        onDismiss: acknowledge,
      },
    );
  }, []);

  return (
    <Toaster
      position="bottom-left"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      offset={{ bottom: "20px", left: "20px" }}
      mobileOffset={{ bottom: "16px", left: "16px" }}
      containerAriaLabel="Analytics notice"
    />
  );
}
