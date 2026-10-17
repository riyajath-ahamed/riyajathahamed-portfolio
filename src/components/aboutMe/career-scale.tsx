"use client";

import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";

const INK = "#f15a24";
const MONTHS: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

type Stamp = { year: number; month: number };

type RoleSpan = {
  company: string;
  title: string;
  href: string;
  startYears: number;
  endYears: number;
};

function absMonth(stamp: Stamp) {
  return stamp.year * 12 + stamp.month;
}

function parseStamp(value: string, now: Stamp): Stamp {
  const text = value.trim().toLowerCase();
  if (!text || text === "present" || text === "now") return now;
  const year = Number(text.match(/\d{4}/)?.[0]);
  const monthKey = Object.keys(MONTHS).find((key) => text.includes(key));
  if (!Number.isFinite(year)) return now;
  return { year, month: monthKey ? MONTHS[monthKey] : 0 };
}

function buildTimeline(now: Stamp) {
  const originCandidates = DATA.work.map((role) => absMonth(parseStamp(role.start, now)));
  const origin = Math.min(...originCandidates);

  const roles: RoleSpan[] = DATA.work.map((role) => {
    const start = absMonth(parseStamp(role.start, now));
    const end = Math.max(start, absMonth(parseStamp(role.end, now)));
    return {
      company: role.company,
      title: role.title,
      href: role.href,
      startYears: (start - origin) / 12,
      endYears: (end - origin) / 12,
    };
  });

  const nowYears = Math.max(0, (absMonth(now) - origin) / 12);
  const scaleMax = Math.max(4, Math.ceil(nowYears + 2));

  return { origin, roles, nowYears, scaleMax };
}

function roleAt(roles: RoleSpan[], years: number) {
  const active = roles.filter(
    (role) => years >= role.startYears - 0.001 && years <= role.endYears + 0.001,
  );
  if (active.length === 0) return roles[0];
  return active.reduce((latest, role) =>
    role.startYears > latest.startYears ? role : latest,
  );
}

function calendarYear(origin: number, years: number) {
  return Math.floor((origin + Math.round(years * 12)) / 12);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function CareerScale() {
  const reduce = useReducedMotion();
  const nowDate = new Date();
  const now: Stamp = { year: nowDate.getFullYear(), month: nowDate.getMonth() };
  const timeline = buildTimeline(now);

  const [years, setYears] = useState(timeline.nowYears);
  const [glide, setGlide] = useState(true);
  const [spin, setSpin] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const role = roleAt(timeline.roles, years);
  const shown = (Math.round(years * 10) / 10).toFixed(1);
  const year = calendarYear(timeline.origin, years);
  const ratio = timeline.scaleMax === 0 ? 0 : years / timeline.scaleMax;

  const maxTenths = Math.round(timeline.scaleMax * 10);
  const ticks = Array.from({ length: maxTenths / 2 + 1 }, (_, index) => {
    const tenths = index * 2;
    const major = tenths % 10 === 0;
    const lit = tenths / 10 <= timeline.nowYears + 0.05;
    return { tenths, major, lit };
  });

  function yearsFromClientX(clientX: number) {
    const el = trackRef.current;
    if (!el) return years;
    const rect = el.getBoundingClientRect();
    const pad = 14;
    const span = rect.width - pad * 2;
    const t = span <= 0 ? 0 : (clientX - rect.left - pad) / span;
    return clamp(t * timeline.scaleMax, 0, timeline.nowYears);
  }

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    setGlide(false);
    event.currentTarget.setPointerCapture(event.pointerId);
    setYears(yearsFromClientX(event.clientX));
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    setYears(yearsFromClientX(event.clientX));
  }

  function endDrag() {
    dragging.current = false;
    setGlide(true);
  }

  function nudge(delta: number) {
    setGlide(true);
    setYears((current) => clamp(Math.round((current + delta) * 10) / 10, 0, timeline.nowYears));
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const step = event.shiftKey ? 0.5 : 0.1;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault();
      nudge(-step);
    } else if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault();
      nudge(step);
    } else if (event.key === "Home") {
      event.preventDefault();
      setGlide(true);
      setYears(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setGlide(true);
      setYears(timeline.nowYears);
    }
  }

  function reset() {
    setGlide(true);
    setYears(timeline.nowYears);
    setSpin((count) => count + 1);
  }

  const place = (tenths: number) =>
    `calc(14px + (100% - 28px) * ${maxTenths === 0 ? 0 : tenths / maxTenths})`;

  return (
    <div className="w-full rounded-[28px] bg-white px-4 pb-4 pt-3.5 shadow-[0_16px_40px_-24px_rgba(40,20,10,0.45)] ring-1 ring-black/[0.05] dark:bg-[#141a22] dark:shadow-none dark:ring-white/10 sm:px-5 sm:pb-5">
      <div className="flex items-center gap-2 sm:gap-3">
        <div
          ref={trackRef}
          role="slider"
          tabIndex={0}
          aria-label="Career timeline"
          aria-valuemin={0}
          aria-valuemax={Number(timeline.nowYears.toFixed(1))}
          aria-valuenow={Number(shown)}
          aria-valuetext={`${shown} years, ${role.company}, ${role.title}, ${year}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          onKeyDown={onKeyDown}
          className="relative h-[4.75rem] min-w-0 flex-1 cursor-grab touch-none select-none outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-[#f15a24]/70 active:cursor-grabbing"
        >
          {ticks.map((tick) => (
            <div
              key={tick.tenths}
              className="pointer-events-none absolute bottom-[18px] flex -translate-x-1/2 flex-col items-center"
              style={{ left: place(tick.tenths) }}
            >
              <span
                className={cn(
                  "mb-1.5 h-[13px] text-[12px] font-medium tabular-nums leading-none sm:text-[13px]",
                  tick.lit ? "text-[#f15a24]" : "text-neutral-300 dark:text-neutral-600",
                  !tick.major && "invisible",
                )}
              >
                {tick.tenths / 10}
              </span>
              <span
                className={cn(
                  "w-px",
                  tick.major ? "h-4" : "h-2.5",
                  tick.lit ? "bg-[#f15a24]" : "bg-neutral-200 dark:bg-neutral-700",
                )}
              />
            </div>
          ))}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-1 -translate-x-1/2"
            style={{
              left: `calc(14px + (100% - 28px) * ${ratio})`,
              transition: glide && !reduce ? "left 0.45s cubic-bezier(0.22, 1, 0.36, 1)" : "none",
            }}
          >
            <svg width="12" height="9" viewBox="0 0 12 9">
              <path d="M6 0.5 L11.2 8.5 H0.8 Z" fill={INK} />
            </svg>
          </div>
        </div>

        <button
          type="button"
          onClick={reset}
          aria-label="Reset to today"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-white shadow-[0_2px_8px_rgba(20,16,12,0.12)] ring-1 ring-black/10 transition-colors hover:bg-neutral-50 dark:bg-[#1c2430] dark:ring-white/15 dark:hover:bg-[#243040]"
        >
          <motion.span
            aria-hidden
            animate={{ rotate: spin * -360 }}
            transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="grid place-items-center text-neutral-500 dark:text-neutral-300"
          >
            <RotateCcw className="size-4" strokeWidth={1.75} />
          </motion.span>
        </button>
      </div>

      <div className="mt-3 flex items-end justify-between gap-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${role.company}-${role.title}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="min-w-0"
          >
            <a
              href={role.href}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] text-neutral-400 transition-colors hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300"
            >
              {role.company}
            </a>
            <p className="mt-0.5 text-lg font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-xl">
              {role.title}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="shrink-0 text-right">
          <p className="text-[1.85rem] font-semibold leading-none tracking-tight text-[#f15a24] tabular-nums sm:text-[2rem]">
            <span suppressHydrationWarning>{shown}</span>
            <span className="ml-0.5 text-sm font-medium">yr</span>
          </p>
          <p suppressHydrationWarning className="mt-1 text-[13px] tabular-nums text-neutral-400 dark:text-neutral-500">
            {year}
          </p>
        </div>
      </div>
    </div>
  );
}
