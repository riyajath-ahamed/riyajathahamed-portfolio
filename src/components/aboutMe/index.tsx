"use client";

import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight, BookOpen, MapPin } from "lucide-react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { BLUR_FADE_DELAY } from "@/lib/home";
import BlurFade from "../magicui/blur-fade";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const school = DATA.education[0];
const role = DATA.work[0];
const firstRole = DATA.work[DATA.work.length - 1];
const city = DATA.location.split(",")[0];

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function yearsSince(start: string) {
  const [month, year] = start.toLowerCase().split(" ");
  const begin = Number(year) * 12 + Math.max(0, MONTHS.indexOf(month.slice(0, 3)));
  const now = new Date();
  return Math.max(1, Math.floor((now.getFullYear() * 12 + now.getMonth() - begin) / 12));
}

const TILTS = [-8, -2, 3, 8];
const CARD_STEP = 108;

const deck: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const card: Variants = {
  hidden: (i: number) => ({
    opacity: 0,
    y: 40,
    x: (1.5 - i) * CARD_STEP,
    rotate: 0,
  }),
  shown: (i: number) => ({
    opacity: 1,
    y: 0,
    x: 0,
    rotate: TILTS[i],
    transition: { type: "spring", stiffness: 140, damping: 18 },
  }),
};

// Must stay an object target: a variant label here would stop cards inheriting the deck's dealing state.
const LIFT = {
  y: -18,
  scale: 1.06,
  rotate: 0,
  transition: { type: "spring", stiffness: 320, damping: 22 },
} as const;

const cardBase =
  "relative flex h-[172px] w-[136px] shrink-0 flex-col justify-between rounded-2xl p-3.5 text-left outline-none hover:z-30 focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function AboutDeck() {
  const reduce = useReducedMotion();
  const lift = reduce ? undefined : LIFT;
  const reveal = reduce
    ? ({ initial: false, animate: "shown" } as const)
    : ({ initial: "hidden", whileInView: "shown", viewport: { once: true, amount: 0.4 } } as const);

  return (
    <div className="w-full [container-type:inline-size]">
      <motion.div
        variants={deck}
        {...reveal}
        className="flex w-max items-end pl-3 pt-6 [zoom:min(1,calc(100cqw/30.5rem))]"
      >
        <motion.a
          custom={0}
          variants={card}
          whileHover={lift}
          whileFocus={lift}
          href={DATA.locationLink}
          target="_blank"
          rel="noreferrer"
          aria-label={`${city} on Google Maps`}
          className={cn(
            cardBase,
            "z-[1] bg-[#e8413c] text-white shadow-[0_14px_28px_rgba(120,24,20,0.24)]",
          )}
        >
          <MapPin className="size-5" strokeWidth={1.75} />
          <p className="font-hand">
            <span className="block text-[15px] leading-none">based in</span>
            <span className="mt-1 block text-[22px] leading-none">{city}</span>
          </p>
        </motion.a>

        <motion.article
          custom={1}
          variants={card}
          whileHover={lift}
          whileFocus={lift}
          tabIndex={0}
          className={cn(
            cardBase,
            "z-[2] -ml-7 bg-[#2b4c7e] text-white shadow-[0_14px_28px_rgba(20,40,90,0.28)]",
          )}
        >
          <span className="text-sm font-medium text-white/75">Experience</span>
          <p className="leading-none">
            <span suppressHydrationWarning className="block text-5xl font-semibold tracking-tight tabular-nums">
              {yearsSince(firstRole.start)}+
            </span>
            <span className="mt-1.5 block text-sm font-medium">years</span>
          </p>
        </motion.article>

        <motion.a
          custom={2}
          variants={card}
          whileHover={lift}
          whileFocus={lift}
          href={school.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            cardBase,
            "z-[3] -ml-7 bg-[#fbf8f1] text-neutral-900 shadow-[0_14px_28px_rgba(60,40,20,0.14)] ring-1 ring-black/5",
          )}
        >
          <p>
            <span className="block text-lg font-semibold leading-[1.15] tracking-tight">
              {school.degree}
            </span>
            <span className="mt-1 block text-xs text-neutral-600">
              {school.school}, {school.start}-{school.end}
            </span>
          </p>
          <span className="font-hand text-[15px] text-neutral-700">
            Education
          </span>
        </motion.a>

        <DialogTrigger asChild>
          <motion.button
            custom={3}
            variants={card}
            whileHover={lift}
            whileFocus={lift}
            type="button"
            className={cn(
              cardBase,
              "z-[4] -ml-7 bg-[#171717] text-white shadow-[0_16px_32px_rgba(0,0,0,0.28)] dark:ring-1 dark:ring-white/15",
            )}
          >
            <BookOpen className="size-5 text-white/80" strokeWidth={1.75} />
            <span className="flex items-end gap-1 text-lg font-medium leading-tight tracking-tight">
              The long version
              <ArrowUpRight className="mb-0.5 size-4 shrink-0" strokeWidth={1.75} />
            </span>
          </motion.button>
        </DialogTrigger>
      </motion.div>
    </div>
  );
}

function InlineMark({
  logo,
  label,
  tooltip,
}: {
  logo: string;
  label: string;
  tooltip: string;
}) {
  return (
    <span className="inline-flex items-baseline gap-[0.22em] whitespace-nowrap">
      <span className="font-semibold text-[#e8413c] dark:text-[#ff7a6e]">{label}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex self-center">
            <Image
              src={logo}
              alt={tooltip}
              width={40}
              height={40}
              className="size-[1.15em] rounded-[0.2em] object-contain"
            />
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-neutral-900">{tooltip}</TooltipContent>
      </Tooltip>
    </span>
  );
}

export default function AboutMe() {
  return (
    <section
      id="about"
      className="flex flex-col justify-between gap-8 py-2 md:col-span-1 lg:col-span-2"
    >
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <h2 className="pointer-events-none pb-[0.08em] font-serif text-4xl font-bold leading-none tracking-tighter sm:text-5xl text-foreground text-balance">
          Currently
        </h2>
        <p className="mt-5 max-w-[36rem] text-pretty text-[1.35rem] font-medium leading-[1.35] tracking-tight text-foreground sm:text-[1.6rem] lg:text-[1.55rem] xl:text-[1.85rem]">
          I&apos;m building products from{" "}
          <span className="whitespace-nowrap">
            <InlineMark logo="/hero/flag.jpg" label="Colombo" tooltip="Sri Lanka" />.
          </span>{" "}
          <span className="text-foreground/60">
            Outside of work, I build developer tools, experiment with{" "}
            <span className="whitespace-nowrap">
              <InlineMark logo="/hero/ai.png" label="AI" tooltip="Cooking with AI" />,
            </span>{" "}
            and
            explore the space where design meets engineering.
          </span>
        </p>
      </BlurFade>

      <Dialog>
        <AboutDeck />
        <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-1.5rem)] max-w-xl gap-0 overflow-y-auto rounded-2xl p-6 sm:p-8">
          <DialogHeader className="text-left">
            <DialogTitle className="font-serif text-3xl font-bold tracking-tight">
              The long version
            </DialogTitle>
            <DialogDescription className="sr-only">
              A longer note on how I work.
            </DialogDescription>
          </DialogHeader>
          <p className="mt-4 text-base leading-relaxed text-foreground/75 md:text-lg">
            {DATA.summary}
          </p>
          <p className="mt-6 border-t border-foreground/10 pt-4 text-sm text-foreground/60">
            {role.title} at{" "}
            <a
              href={role.href}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-foreground underline underline-offset-4 hover:text-[#e8413c]"
            >
              {role.company}
            </a>
            , since {role.start}.
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
