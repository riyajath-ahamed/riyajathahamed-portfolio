"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

interface TimeInfo {
  time: string;
  offset: string;
  relative: string;
}

function getOffsetMinutes(timeZone: string, date: Date) {
  const name =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "longOffset" })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT";
  const match = name.match(/GMT([+-])(\d{2}):?(\d{2})?/);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3] ?? 0));
}

function getTimeInfo(timeZone: string): TimeInfo {
  const now = new Date();
  const time = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(now);
  const offset =
    new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" })
      .formatToParts(now)
      .find((part) => part.type === "timeZoneName")?.value ?? "";

  const diff = -now.getTimezoneOffset() - getOffsetMinutes(timeZone, now);
  let relative = "Same time as you";
  if (diff !== 0) {
    const hours = Math.abs(diff) / 60;
    const value = Number.isInteger(hours) ? hours : hours.toFixed(1);
    const unit = hours === 1 ? "hr" : "hrs";
    relative = `${value} ${unit} ${diff > 0 ? "behind" : "ahead of"} you`;
  }

  return { time, offset, relative };
}

const badgeClass =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-black/[0.06] bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-[0_6px_18px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-100 dark:shadow-[0_6px_18px_rgba(0,0,0,0.5)] opacity-0 translate-x-6 rotate-0 scale-75 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 group-focus:opacity-100 group-focus:translate-x-0 group-focus:scale-100";

export default function HeroStamp() {
  const [info, setInfo] = useState<TimeInfo | null>(null);

  useEffect(() => {
    const update = () => setInfo(getTimeInfo(DATA.timezone));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div tabIndex={0} className="group relative outline-none">
      <Image
        src="/hero/herostamp.png"
        alt={`${DATA.location} postage stamp`}
        width={1145}
        height={1374}
        sizes="160px"
        priority
        className="h-auto w-full rotate-[4deg] drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)] transition-transform duration-300 ease-out group-hover:rotate-0 group-hover:scale-[1.04] group-focus:rotate-0 group-focus:scale-[1.04]"
      />
      {info && (
        <div className="pointer-events-none absolute right-full top-1/2 mr-1 flex -translate-y-1/2 flex-col items-end gap-1.5">
          <span
            className={cn(
              badgeClass,
              "mr-3 group-hover:rotate-[8deg] group-focus:rotate-[8deg]",
            )}
          >
            {info.time}
            <span className="text-neutral-400">{info.offset}</span>
          </span>
          <span
            className={cn(
              badgeClass,
              "group-hover:-rotate-[3deg] group-focus:-rotate-[3deg] group-hover:delay-75 group-focus:delay-75",
            )}
          >
            {info.relative}
          </span>
        </div>
      )}
    </div>
  );
}
