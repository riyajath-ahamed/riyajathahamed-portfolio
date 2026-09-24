"use client";

import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight, FileText, MapPin } from "lucide-react";
import Image from "next/image";
import { BLUR_FADE_DELAY } from "@/app/page";
import BlurFade from "../magicui/blur-fade";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const work = DATA.work[0];
const school = DATA.education[0];

function yearsSince(start: string) {
  const then = new Date(start);
  const years =
    (Date.now() - then.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
  return Math.max(1, Math.floor(years));
}

const cardLift =
  "relative origin-bottom transition-transform duration-300 ease-out hover:z-30 hover:-translate-y-5 hover:scale-[1.06] hover:rotate-0 focus-visible:z-30 focus-visible:-translate-y-5 focus-visible:scale-[1.06] focus-visible:rotate-0 motion-reduce:transition-none";

function AboutCards() {
  const city = DATA.location.split(",")[0];
  const years = yearsSince(work.start);

  return (
    <div className="flex items-end justify-center px-2 pt-2 pb-1">
      <article
        tabIndex={0}
        className={cn(
          cardLift,
          "z-[1] -rotate-[8deg] flex h-[158px] w-[124px] flex-col justify-between rounded-2xl bg-[radial-gradient(120%_100%_at_15%_0%,#ffb3c6_0%,#ef5d8a_48%,#8aa4ff_100%)] p-3.5 text-white shadow-[0_14px_28px_rgba(80,20,40,0.22)] sm:h-[172px] sm:w-[136px]",
        )}
      >
        <MapPin className="size-5 fill-rose-600 text-rose-700" strokeWidth={1.75} />
        <p style={{ fontFamily: "Mynerve, cursive" }}>
          <span className="block text-[15px] leading-none text-white/90">based in</span>
          <span className="mt-1 block text-[22px] leading-none">{city}</span>
        </p>
      </article>

      <article
        tabIndex={0}
        className={cn(
          cardLift,
          "z-[2] -ml-7 -rotate-[2deg] flex h-[158px] w-[124px] flex-col justify-between rounded-2xl bg-[#2d5bff] p-3.5 text-white shadow-[0_14px_28px_rgba(20,40,140,0.28)] sm:h-[172px] sm:w-[136px]",
        )}
      >
        <span className="text-sm font-medium text-white/70">Exp</span>
        <p className="leading-none">
          <span className="block text-5xl font-semibold tracking-tight">{years}+</span>
          <span className="mt-1 block text-sm font-medium tracking-wide">YRS</span>
        </p>
      </article>

      <article
        tabIndex={0}
        className={cn(
          cardLift,
          "z-[3] -ml-7 rotate-[3deg] flex h-[158px] w-[124px] flex-col justify-between rounded-2xl bg-[#f7f7f8] p-3.5 text-neutral-900 shadow-[0_14px_28px_rgba(0,0,0,0.12)] sm:h-[172px] sm:w-[136px]",
        )}
      >
        <p className="text-[17px] font-semibold leading-[1.15] tracking-tight sm:text-lg">
          {school.degree}
        </p>
        <p
          className="text-[15px] text-neutral-700"
          style={{ fontFamily: "Mynerve, cursive" }}
        >
          Education
        </p>
      </article>

      <article
        tabIndex={0}
        className={cn(
          cardLift,
          "z-[4] -ml-7 rotate-[8deg] flex h-[158px] w-[124px] flex-col justify-between rounded-2xl bg-[#171717] p-3.5 text-white shadow-[0_16px_32px_rgba(0,0,0,0.28)] sm:h-[172px] sm:w-[136px]",
        )}
      >
        <FileText className="size-5 text-white/80" strokeWidth={1.75} />
        <p className="flex items-end gap-1 text-[17px] font-medium leading-tight tracking-tight sm:text-lg">
          View Resume
          <ArrowUpRight className="mb-0.5 size-4 shrink-0" strokeWidth={1.75} />
        </p>
      </article>
    </div>
  );
}

function InlineMark({
  href,
  logo,
  label,
  wordClassName,
}: {
  href: string;
  logo: string;
  label: string;
  wordClassName?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="ml-[0.28em] inline-flex items-center gap-[0.28em] align-[-0.12em] text-[#f3f0ea] underline-offset-4 hover:underline"
    >
      <Image
        src={logo}
        alt=""
        width={28}
        height={28}
        className="size-[1.05em] rounded-[5px] bg-white object-contain"
      />
      <span className={cn("font-medium", wordClassName)}>{label}</span>
    </a>
  );
}

export default function AboutMe() {
  return (
    <section
      id="about"
      className="relative col-span-full flex flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-[#161616] p-8 md:p-10"
    >
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="flex flex-col">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
            Currently
          </p>
          <p className="mt-5 text-[1.65rem] font-medium leading-[1.22] tracking-tight text-white/65 sm:text-[2rem] md:text-[2.35rem] lg:text-[2.65rem]">
            I&apos;m building front-end products at
            <InlineMark
              href={work.href}
              logo={work.logoUrl}
              label={work.company}
            />, designing the interfaces, their systems, and shipping them from Colombo, Sri Lanka 🇱🇰. Previously, I studied at
            <InlineMark
              href={school.href}
              logo={school.logoUrl}
              label={school.school}
              wordClassName="text-[#e07a3d]"
            />.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-10 self-start rounded-sm bg-white/10 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/75 transition-colors hover:bg-white/15 hover:text-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Read More
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl gap-6 overflow-visible p-6 sm:rounded-lg sm:p-8">
              <DialogHeader className="sr-only">
                <DialogTitle>About</DialogTitle>
                <DialogDescription>
                  A longer note on how I work.
                </DialogDescription>
              </DialogHeader>
              <AboutCards />
              <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
                {DATA.summary}
              </p>
            </DialogContent>
          </Dialog>
        </div>
      </BlurFade>
    </section>
  );
}
