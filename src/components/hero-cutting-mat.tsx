import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

const CELL = 24;
const MAJOR = CELL * 5;
const RULER_MARKS = Array.from({ length: 64 }, (_, i) => i + 1);

const gridStyle = {
  backgroundImage: [
    "linear-gradient(to right, rgba(255,255,255,0.42) 1px, transparent 1px)",
    "linear-gradient(to bottom, rgba(255,255,255,0.42) 1px, transparent 1px)",
    "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px)",
    "linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
  ].join(","),
  backgroundSize: `${MAJOR}px ${MAJOR}px, ${MAJOR}px ${MAJOR}px, ${CELL}px ${CELL}px, ${CELL}px ${CELL}px`,
};

export default function HeroCuttingMat({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -top-12 -right-6 bottom-6 left-3 md:-right-10 md:bottom-8 md:left-6 -rotate-[1.4deg] overflow-hidden rounded-[28px] bg-[#2a7a4e] dark:bg-[#1c5236]",
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.18),inset_0_-3px_0_rgba(0,0,0,0.22),0_34px_60px_-24px_rgba(18,52,32,0.55),0_10px_18px_-8px_rgba(18,52,32,0.35)]",
        "dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-3px_0_rgba(0,0,0,0.4),0_34px_60px_-24px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      <div
        className="absolute inset-x-6 top-16 bottom-14 border-y border-l border-white/60"
        style={gridStyle}
      />

      <svg className="absolute inset-x-6 top-16 bottom-14 h-[calc(100%-7.5rem)] w-[calc(100%-3rem)] opacity-25">
        <line x1="0" y1="100%" x2="70%" y2="0" stroke="white" strokeWidth="1" strokeDasharray="6 6" />
        <line x1="0" y1="100%" x2="38%" y2="0" stroke="white" strokeWidth="1" />
      </svg>

      <div className="absolute inset-x-6 bottom-7 h-4 overflow-hidden">
        {RULER_MARKS.map((n) => (
          <span
            key={n}
            className="absolute -translate-x-1/2 font-mono text-[9px] tabular-nums leading-none text-white/75"
            style={{ left: n * CELL }}
          >
            {String(n).padStart(2, "0")}
          </span>
        ))}
      </div>

      <span className="absolute bottom-2.5 right-14 font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white/70 md:right-20">
        Made in {DATA.location}
      </span>

      <span className="absolute left-2 top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[9px] uppercase tracking-[0.35em] text-white/45 [writing-mode:vertical-rl] md:block">
        Self-healing · 3 ply · A2
      </span>

      <svg className="absolute inset-0 h-full w-full opacity-[0.35] mix-blend-overlay">
        <filter id="matGrain">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#matGrain)" />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_0%,rgba(255,255,255,0.10),transparent_55%),radial-gradient(90%_70%_at_100%_100%,rgba(0,0,0,0.18),transparent_60%)]" />
    </div>
  );
}
