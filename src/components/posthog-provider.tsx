"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "@posthog/react";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (token && !posthog.__loaded) {
      posthog.init(token, {
        api_host: host,
        defaults: "2026-05-30",
        capture_pageview: true,
        capture_pageleave: true,
      });
    }
    window.posthog = posthog;
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
