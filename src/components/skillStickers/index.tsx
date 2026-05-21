"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import StickerPeel from "@/components/magicui/stickerPeel";
import { DATA } from "@/data/resume";

function fallbackIcon(name: string): string {
  const initials = name.slice(0, 2).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="%23e5e7eb"/><text x="32" y="38" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="%236b7280">${initials}</text></svg>`;
  return `data:image/svg+xml,${svg}`;
}

const SKILL_ICONS: Record<string, string> = {
  "React":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Typescript":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Node.js":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "Go":           "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  "GraphQL":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Docker":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "Redux":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "Postgres":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "Kubernetes":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "AWS":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
  "GCP":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  "Firebase":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  "Terraform":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  "MCP":          "https://img.icons8.com/?size=100&id=MWq04yMLKiTZ&format=png&color=000000",
};

const PEEL_DIRS = [0, 180, 0, 180, 0, 180, 180, 0, 180, 0, 180, 0, 0, 180, 0, 180, 0, 180];

function computeGrid(count: number, containerWidth: number) {
  const cols = containerWidth < 400 ? 3 : containerWidth < 600 ? 4 : 6;
  const rows = Math.ceil(count / cols);
  const cellW = containerWidth / cols;
  const iconW = 60;
  const rowH = 110;

  return { cols, rows, positions: Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    return {
      x: col * cellW + (cellW - iconW) / 2,
      y: row * rowH + 12,
    };
  })};
}

export default function SkillStickers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(700);

  const measure = useCallback(() => {
    if (containerRef.current) {
      setWidth(containerRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const { rows, positions } = computeGrid(DATA.skills.length, width);

  return (
    <div
      ref={containerRef}
      className="relative overflow-visible py-4 px-2"
      style={{ minHeight: rows * 110 + 24 }}
    >
      {DATA.skills.map((skill, id) => (
        <StickerPeel
          key={skill}
          imageSrc={SKILL_ICONS[skill] ?? fallbackIcon(skill)}
          width={60}
          rotate={0}
          peelBackHoverPct={25}
          peelBackActivePct={35}
          shadowIntensity={0.35}
          lightingIntensity={0.08}
          initialPosition={positions[id]}
          peelDirection={PEEL_DIRS[id % PEEL_DIRS.length]}
          label={skill}
          freeDrag
          imgClassName="rounded-[22.37%] bg-white dark:bg-neutral-800 p-3 shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.04)] box-border"
        />
      ))}
    </div>
  );
}
