"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFeatureFlagEnabled } from "@posthog/react";
import { FEATURE_FLAGS } from "@/lib/flags";

export default function NewGameGate({ children }: { children: React.ReactNode }) {
  const enabled = useFeatureFlagEnabled(FEATURE_FLAGS.NEW_GAME);
  const router = useRouter();

  useEffect(() => {
    if (enabled === false) {
      router.replace("/game");
    }
  }, [enabled, router]);

  if (enabled !== true) {
    return null;
  }

  return children;
}
