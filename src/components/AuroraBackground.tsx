"use client";

import Aurora from "@/components/icons/Aurora/Aurora";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function AuroraBackground() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  if (currentTheme !== "dark") {
    return null;
  }

  return (
    <Aurora
      colorStops={["#2E1A47", "#A45DBD", "#EAB8E4"]}
      blend={1}
      amplitude={0.1}
      speed={0.5}
    />
  );
}

