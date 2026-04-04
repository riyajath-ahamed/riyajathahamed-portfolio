"use client";

import StickerPeel from "@/components/magicui/stickerPeel";
import { DATA } from "@/data/resume";

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
};

// 5 columns × 3 rows, row 2 offset by half a column for a brick pattern
const STICKER_CONFIG = [
  // Row 1
  { rotate: 10,  peelDirection: 0,   initialPosition: { x: 20,  y: 8   } },
  { rotate: -14, peelDirection: 180, initialPosition: { x: 130, y: 16  } },
  { rotate: 18,  peelDirection: 0,   initialPosition: { x: 240, y: 6   } },
  { rotate: -6,  peelDirection: 180, initialPosition: { x: 350, y: 14  } },
  { rotate: 12,  peelDirection: 0,   initialPosition: { x: 460, y: 8   } },
  // Row 2 (shifted right by ~55 px for visual interest)
  { rotate: -18, peelDirection: 180, initialPosition: { x: 75,  y: 110 } },
  { rotate: 8,   peelDirection: 0,   initialPosition: { x: 185, y: 102 } },
  { rotate: -10, peelDirection: 180, initialPosition: { x: 295, y: 112 } },
  { rotate: 16,  peelDirection: 0,   initialPosition: { x: 405, y: 104 } },
  { rotate: -8,  peelDirection: 180, initialPosition: { x: 515, y: 110 } },
  // Row 3
  { rotate: 14,  peelDirection: 0,   initialPosition: { x: 20,  y: 212 } },
  { rotate: -16, peelDirection: 180, initialPosition: { x: 130, y: 204 } },
  { rotate: 6,   peelDirection: 0,   initialPosition: { x: 240, y: 214 } },
  { rotate: -20, peelDirection: 180, initialPosition: { x: 350, y: 206 } },
  { rotate: 10,  peelDirection: 0,   initialPosition: { x: 460, y: 212 } },
];

export default function SkillStickers() {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-md">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs text-muted-foreground ml-1">drag stickers anywhere on the page</span>
      </div>
      <div className="relative min-h-[300px] overflow-visible p-2">
        {DATA.skills.map((skill, id) => {
          const config = STICKER_CONFIG[id % STICKER_CONFIG.length];
          return (
            <StickerPeel
              key={skill}
              imageSrc={SKILL_ICONS[skill] ?? ""}
              width={48}
              rotate={config.rotate}
              peelBackHoverPct={30}
              peelBackActivePct={40}
              shadowIntensity={0.5}
              lightingIntensity={0.1}
              initialPosition={config.initialPosition}
              peelDirection={config.peelDirection}
              label={skill}
              freeDrag
            />
          );
        })}
      </div>
    </div>
  );
}
