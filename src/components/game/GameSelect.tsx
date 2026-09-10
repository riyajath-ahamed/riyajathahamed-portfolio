"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useFeatureFlagEnabled } from "@posthog/react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";
import { DATA } from "@/data/resume";
import { ANALYTICS_EVENTS, captureEvent } from "@/lib/analytics";
import { FEATURE_FLAGS } from "@/lib/flags";
import { cn } from "@/lib/utils";

type GameEntry = (typeof DATA.games)[number];

function CirclePreview() {
  return (
    <div
      aria-hidden
      className="relative h-40 overflow-hidden bg-[#f4f1ea] dark:bg-[#1c1a17] sm:h-52"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(35 59 36 / 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgb(35 59 36 / 0.08) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      <svg
        viewBox="0 0 160 160"
        className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          d="M86 28 C124 40 138 70 124 100 C112 128 78 144 52 126 C28 108 22 74 40 50 C54 32 70 22 86 28"
          fill="none"
          stroke="#233b24"
          strokeWidth="3"
          strokeLinecap="round"
          className="dark:stroke-[#ccfd50]"
        />
      </svg>
    </div>
  );
}

function ColorPreview() {
  return (
    <div aria-hidden className="relative h-40 overflow-hidden sm:h-52">
      <div className="absolute inset-0" style={{ background: "#a1a5db" }} />
      <div className="absolute inset-y-3 left-3 flex gap-1.5">
        <span
          className="w-2.5 rounded-full"
          style={{
            background:
              "linear-gradient(to bottom, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)",
          }}
        />
        <span
          className="w-2.5 rounded-full"
          style={{
            background: "linear-gradient(to bottom, #ffffff, #a1a5db)",
          }}
        />
        <span
          className="w-2.5 rounded-full"
          style={{
            background: "linear-gradient(to bottom, #000000, #a1a5db)",
          }}
        />
      </div>
    </div>
  );
}

function CityPreview() {
  return (
    <div
      aria-hidden
      className="relative h-36 overflow-hidden bg-[#dfe8df] dark:bg-[#142016]"
    >
      <div className="absolute inset-x-0 bottom-0 flex h-24 items-end justify-center gap-1.5 px-6">
        <span className="h-8 w-4 rounded-t-sm bg-[#233b24]/40 dark:bg-[#ccfd50]/35" />
        <span className="h-14 w-5 rounded-t-sm bg-[#233b24]/65 dark:bg-[#ccfd50]/55" />
        <span className="h-10 w-4 rounded-t-sm bg-[#233b24]/50 dark:bg-[#ccfd50]/40" />
        <span className="h-20 w-6 rounded-t-sm bg-[#233b24] dark:bg-[#ccfd50]" />
        <span className="h-12 w-4 rounded-t-sm bg-[#233b24]/55 dark:bg-[#ccfd50]/45" />
        <span className="h-16 w-5 rounded-t-sm bg-[#233b24]/75 dark:bg-[#ccfd50]/65" />
        <span className="h-7 w-4 rounded-t-sm bg-[#233b24]/35 dark:bg-[#ccfd50]/30" />
      </div>
    </div>
  );
}

function GamePreview({ slug }: { slug: string }) {
  if (slug === "colorMemo") return <ColorPreview />;
  if (slug === "suprisePage" || slug === "cityRise") return <CityPreview />;
  return <CirclePreview />;
}

export default function GameSelect() {
  const reduce = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);
  const isNewGameEnabled = useFeatureFlagEnabled(FEATURE_FLAGS.NEW_GAME);
  const games = DATA.games.filter((game) => {
    if (!("flag" in game) || !game.flag) return true;
    return hasMounted && isNewGameEnabled === true;
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    captureEvent(ANALYTICS_EVENTS.GAME_HUB_VIEWED, {
      game_count: games.length,
      new_game_enabled: isNewGameEnabled === true,
    });
  }, [games.length, isNewGameEnabled]);

  return (
    <div className="relative z-10 flex min-h-[100dvh] items-start justify-center px-4 pt-24 pb-28 md:items-center md:py-8 md:pb-28 selection:bg-[#233b24] selection:text-[#ccfd50]">
      <motion.section
        role="dialog"
        aria-labelledby="game-select-title"
        aria-modal="false"
        initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-2xl rounded-[2rem] border border-stone-200/80 bg-stone-100/70 p-1.5 shadow-[0_24px_60px_-28px_rgba(35,59,36,0.35)] dark:border-stone-700/80 dark:bg-stone-900/70 dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.55)]"
      >
        <div className="overflow-hidden rounded-[calc(2rem-6px)] border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-950">
          <header className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-6">
            <div className="min-w-0">
              <h1
                id="game-select-title"
                className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-3xl"
              >
                Games
              </h1>
              <p className="mt-1 max-w-[40ch] text-sm leading-relaxed text-stone-500 dark:text-stone-400">
                Short challenges. Pick one and play.
              </p>
            </div>
            <Link
              href="/"
              aria-label="Close games and return home"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-stone-200 text-stone-500 transition-colors hover:border-stone-300 hover:bg-stone-50 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#233b24] active:scale-[0.98] dark:border-stone-700 dark:text-stone-400 dark:hover:border-stone-600 dark:hover:bg-stone-900 dark:hover:text-stone-100 dark:focus-visible:ring-[#ccfd50]"
            >
              <Cross2Icon className="size-4" />
            </Link>
          </header>

          <ul className="grid gap-3 px-3 pb-3 sm:grid-cols-5 sm:px-4 sm:pb-4">
            {games.map((game, index) => (
              <li
                key={game.slug}
                className={
                  index === 0
                    ? "sm:col-span-3"
                    : index === 1
                      ? "sm:col-span-2"
                      : "sm:col-span-5"
                }
              >
                <GameTile game={game} />
              </li>
            ))}
          </ul>
        </div>
      </motion.section>
    </div>
  );
}

function GameTile({ game }: { game: GameEntry }) {
  const reduce = useReducedMotion();

  return (
    <Link
      href={game.href}
      onClick={() =>
        captureEvent(ANALYTICS_EVENTS.GAME_SELECTED, { game: game.slug })
      }
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 text-left outline-none",
        "transition-transform duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-stone-300",
        "focus-visible:ring-2 focus-visible:ring-[#233b24] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        "active:translate-y-0 active:scale-[0.98]",
        "dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-600",
        "dark:focus-visible:ring-[#ccfd50] dark:focus-visible:ring-offset-stone-950",
        reduce && "transition-none hover:translate-y-0",
      )}
    >
      <GamePreview slug={game.slug} />
      <div className="flex flex-1 flex-col justify-end px-4 py-4">
        <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">
          {game.title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed text-stone-500 dark:text-stone-400">
          {game.description}
        </p>
        <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-[#233b24] px-3 py-1.5 text-xs font-medium text-[#ccfd50] dark:bg-[#ccfd50] dark:text-[#233b24]">
          Play
          <ArrowRightIcon className="size-3" />
        </span>
      </div>
    </Link>
  );
}
