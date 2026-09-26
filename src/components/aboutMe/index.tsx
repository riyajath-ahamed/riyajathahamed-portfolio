"use client";

import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { ArrowUpRight, BookOpen, FileText, MapPin } from "lucide-react";
import Image from "next/image";
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
import GridPattern from "../ui/grid-pattern";

const school = DATA.education[0];

const cardLift =
  "relative origin-bottom transition-transform duration-300 ease-out hover:z-30 hover:-translate-y-5 hover:scale-[1.06] hover:rotate-0 focus-visible:z-30 focus-visible:-translate-y-5 focus-visible:scale-[1.06] focus-visible:rotate-0 motion-reduce:transition-none";

function AboutCards() {
  const city = DATA.location.split(",")[0];
  const years = "3";

  return (
    <div className="w-full [container-type:inline-size]">
      <div className="mx-auto flex w-max items-end justify-center px-4 pt-6 pb-2 [zoom:min(1,calc(100cqw/32rem))]">
      <article
        tabIndex={0}
        className={cn(
          cardLift,
          "z-[1] -rotate-[8deg] flex h-[172px] w-[136px] flex-col justify-between rounded-2xl bg-[radial-gradient(120%_100%_at_15%_0%,#ffb3c6_0%,#ef5d8a_48%,#8aa4ff_100%)] p-3.5 text-white shadow-[0_14px_28px_rgba(80,20,40,0.22)]",
        )}
      >
        📍
        <p style={{ fontFamily: "Mynerve, cursive" }}>
          <span className="block text-[15px] leading-none text-white/90">based in</span>
          <span className="mt-1 block text-[22px] leading-none">{city}</span>
        </p>
      </article>

      <article
        tabIndex={0}
        className={cn(
          cardLift,
          "z-[2] -ml-7 -rotate-[2deg] flex h-[172px] w-[136px] flex-col justify-between rounded-2xl bg-[#2d5bff] p-3.5 text-white shadow-[0_14px_28px_rgba(20,40,140,0.28)]",
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
          "z-[3] -ml-7 rotate-[3deg] flex h-[172px] w-[136px] flex-col justify-between rounded-2xl bg-[#f7f7f8] p-3.5 text-neutral-900 shadow-[0_14px_28px_rgba(0,0,0,0.12)]",
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
          "z-[4] -ml-7 rotate-[8deg] flex h-[172px] w-[136px] flex-col justify-between rounded-2xl bg-[#171717] p-3.5 text-white shadow-[0_16px_32px_rgba(0,0,0,0.28)]",
        )}
      >
        <FileText className="size-5 text-white/80" strokeWidth={1.75} />
        <p className="flex items-end gap-1 text-[17px] font-medium leading-tight tracking-tight sm:text-lg">
          View Resume
          <ArrowUpRight className="mb-0.5 size-4 shrink-0" strokeWidth={1.75} />
        </p>
      </article>
      </div>
    </div>
  );
}

function InlineMark({
  logo,
  label,
  tooltip,
  wordClassName,
}: {
  href: string;
  logo: string;
  label: string;
  tooltip: string;
  wordClassName?: string;
}) {
  return (
    <div
      className="ml-[0.28em] inline-flex items-center gap-[0.28em] align-[-0.12em] text-[#f3f0ea] underline-offset-4 hover:underline"
    >
      <span className={cn("font-medium", wordClassName)}>{label}</span>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">
            <Image
              src={logo}
              alt={tooltip}
              width={28}
              height={28}
              className="size-10 rounded-md object-contain"
            />
          </span>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-neutral-900">{tooltip}</TooltipContent>
      </Tooltip>
    </div>
  );
}

export default function AboutMe() {
  return (
    <section id="about" className={ "md:col-span-1 lg:col-span-2 flex flex-col justify-center"}>
      <BlurFade delay={BLUR_FADE_DELAY * 3}>
        <div className="flex flex-col ">
          <p className="text-4xl mt-10 font-serif font-bold pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter sm:text-5xl">
            Currently
          </p>
          <p className="mt-5 text-[1.25rem] font-medium leading-[1.3] tracking-tight text-foreground/60 sm:text-[1.5rem] md:text-[1.7rem] lg:text-[1.9rem]">
            I&apos;m building products from 
            <InlineMark
              href={school.href}
              logo={"/hero/flag.jpg"}
              label={"Colombo"}
              tooltip="Sri Lanka"
              wordClassName="text-[#e07a3d]"
            />.
            Outside of work, I build developer tools, experiment with 
            <InlineMark
              href={""}
              logo={"/hero/ai.png"}
              label={"AI"}
              tooltip="Cooking with AI"
              wordClassName="text-[#e07a3d]"
            />, and explore the space where design meets engineering. 
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-2 self-start rounded-sm bg-foreground/10 px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:bg-foreground/15 hover:text-foreground active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                Read More <ArrowUpRight className="mb-0.5 size-4 shrink-0 inline-block" strokeWidth={1.75} />
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-2xl gap-5 overflow-y-auto p-4 pt-10 sm:max-h-[min(720px,calc(100dvh-2rem))] sm:gap-6 sm:overflow-visible sm:p-8">
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
