"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import StickerPeel from "@/components/magicui/stickerPeel";
import { DATA } from "@/data/resume";

function fallbackIcon(name: string): string {
  const initials = name.slice(0, 2).toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="%23e5e7eb"/><text x="32" y="38" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="600" fill="%236b7280">${initials}</text></svg>`;
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

const ROTATIONS = [10, -14, 18, -6, 12, -16, -18, 8, -10, 16, -8, 14, 14, -16, 6, -20, 10, -12];
const PEEL_DIRS = [0, 180, 0, 180, 0, 180, 180, 0, 180, 0, 180, 0, 0, 180, 0, 180, 0, 180];

function computeGrid(count: number, containerWidth: number) {
  const cols = containerWidth < 400 ? 3 : containerWidth < 600 ? 4 : 6;
  const rows = Math.ceil(count / cols);
  const cellW = (containerWidth - 16) / cols;
  const rowH = 100;
  const offsetX = cellW * 0.3;

  return Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const shift = row % 2 === 1 ? offsetX : 0;
    return {
      x: col * cellW + shift + 10,
      y: row * rowH + 8 + (i % 3) * 4,
    };
  });
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

  const positions = computeGrid(DATA.skills.length, width);
  const rows = Math.ceil(DATA.skills.length / (width < 400 ? 3 : width < 600 ? 4 : 6));

  return (
    <div className="rounded-2xl border border-border bg-card shadow-md">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-muted-foreground ml-1">🐛 Drag at your own risk - it&apos;s a feature, not a bug (okay maybe a bug)</span>
      </div>
      <div
        ref={containerRef}
        className="relative overflow-visible p-2"
        style={{ minHeight: rows * 100 + 20 }}
      >
        {DATA.skills.map((skill, id) => (
          <StickerPeel
            key={skill}
            imageSrc={SKILL_ICONS[skill] ?? fallbackIcon(skill)}
            width={48}
            rotate={ROTATIONS[id % ROTATIONS.length]}
            peelBackHoverPct={30}
            peelBackActivePct={40}
            shadowIntensity={0.5}
            lightingIntensity={0.1}
            initialPosition={positions[id]}
            peelDirection={PEEL_DIRS[id % PEEL_DIRS.length]}
            label={skill}
            freeDrag
          />
        ))}
      </div>
    </div>
  );
}
