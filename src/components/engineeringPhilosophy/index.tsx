"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, QuoteIcon, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { bindWaveBreak, GreatWave, WaveMark } from "./greatWave";


gsap.registerPlugin(ScrollTrigger);

const ikigaiNotes = [
  {
    title: "Build things that matter",
    body: "I'm happiest when an idea becomes something people can actually use. I enjoy taking something from a blank canvas to a thoughtful, working product, one detail at a time.",
  },
  {
    title: "Make complexity feel simple",
    body: "I love solving difficult problems and hiding that complexity behind simple experiences. Good engineering, to me, is often about making the complicated feel obvious.",
  },
  {
    title: "Keep learning, keep experimenting",
    body: "Technology never stays still, and neither do I. I enjoy exploring new tools, patterns, and ideas, from frontend architecture to AI, and turning curiosity into things I can actually build.",
  },
];

const IKIGAI_WAVE_A =
  "M0,0.60 C0.06,0.60 0.10,0.53 0.16,0.52 C0.22,0.51 0.25,0.34 0.32,0.31 C0.39,0.29 0.43,0.45 0.50,0.46 C0.57,0.47 0.61,0.39 0.68,0.38 C0.75,0.37 0.78,0.51 0.85,0.53 C0.91,0.55 0.95,0.46 1,0.43 L1,1 L0,1 Z";
const IKIGAI_WAVE_B =
  "M0,0.56 C0.06,0.57 0.11,0.49 0.17,0.50 C0.23,0.51 0.27,0.30 0.34,0.29 C0.41,0.28 0.44,0.43 0.51,0.44 C0.58,0.45 0.62,0.35 0.69,0.36 C0.76,0.37 0.80,0.48 0.86,0.50 C0.92,0.52 0.96,0.43 1,0.41 L1,1 L0,1 Z";
const IKIGAI_WAVE_C =
  "M0,0.62 C0.06,0.61 0.10,0.55 0.16,0.54 C0.22,0.53 0.25,0.37 0.31,0.34 C0.38,0.31 0.42,0.47 0.49,0.48 C0.56,0.49 0.60,0.41 0.67,0.40 C0.74,0.39 0.77,0.53 0.84,0.55 C0.91,0.57 0.95,0.48 1,0.45 L1,1 L0,1 Z";
const IKIGAI_CREST_A =
  "M0,0.60 C0.06,0.60 0.10,0.53 0.16,0.52 C0.22,0.51 0.25,0.34 0.32,0.31 C0.39,0.29 0.43,0.45 0.50,0.46 C0.57,0.47 0.61,0.39 0.68,0.38 C0.75,0.37 0.78,0.51 0.85,0.53 C0.91,0.55 0.95,0.46 1,0.43";
const IKIGAI_CREST_B =
  "M0,0.56 C0.06,0.57 0.11,0.49 0.17,0.50 C0.23,0.51 0.27,0.30 0.34,0.29 C0.41,0.28 0.44,0.43 0.51,0.44 C0.58,0.45 0.62,0.35 0.69,0.36 C0.76,0.37 0.80,0.48 0.86,0.50 C0.92,0.52 0.96,0.43 1,0.41";
const IKIGAI_CREST_C =
  "M0,0.62 C0.06,0.61 0.10,0.55 0.16,0.54 C0.22,0.53 0.25,0.37 0.31,0.34 C0.38,0.31 0.42,0.47 0.49,0.48 C0.56,0.49 0.60,0.41 0.67,0.40 C0.74,0.39 0.77,0.53 0.84,0.55 C0.91,0.57 0.95,0.48 1,0.45";

const drawerMotion = `
  @property --enso {
    syntax: "<number>";
    inherits: false;
    initial-value: 0;
  }
  .ikigai-enso {
    --enso: 0;
    -webkit-mask-image: conic-gradient(
      from 188deg at 56% 47%,
      #000 calc(var(--enso) * 100%),
      transparent calc(var(--enso) * 100%)
    );
    mask-image: conic-gradient(
      from 188deg at 56% 47%,
      #000 calc(var(--enso) * 100%),
      transparent calc(var(--enso) * 100%)
    );
  }
  @media (prefers-reduced-motion: reduce) {
    .ikigai-enso {
      --enso: 1;
      -webkit-mask-image: none;
      mask-image: none;
    }
  }
  @media (prefers-reduced-motion: no-preference) {
    .ikigai-ripple { opacity: 0; }
  }
  .gw-paper { fill: #f3eee4; }
  .dark .gw-paper { fill: #111820; }
  .gw-sun { fill: #b6493f; opacity: .16; }
  .gw-cloud { fill: #e8dfcf; opacity: .64; }
  .dark .gw-cloud { fill: #344652; opacity: .52; }
  .gw-water-light { fill: #91aec0; }
  .dark .gw-water-light { fill: #7193a8; }
  .gw-indigo { fill: #1f4b78; }
  .dark .gw-indigo { fill: #8fb0c4; }
  .gw-indigo-deep { fill: #102f53; }
  .dark .gw-indigo-deep { fill: #547c98; }
  .gw-foam-fill { fill: #f8f5ed; }
  .dark .gw-foam-fill { fill: #e7eff3; }
  .gw-foam-stroke { stroke: #f8f5ed; }
  .dark .gw-foam-stroke { stroke: #e7eff3; }
  .gw-shadow-line { stroke: #0b2442; opacity: .48; }
  .dark .gw-shadow-line { stroke: #365c76; }
  .gw-fuji-body { fill: #8fa3af; }
  .dark .gw-fuji-body { fill: #7894a5; }
  .gw-snow { fill: #f8f5ed; }
  .gw-boat-fill { fill: #c8a06a; }
  .dark .gw-boat-fill { fill: #b88a5e; }
  .gw-ink { fill: #172331; }
  .dark .gw-ink { fill: #e7edf0; }
  .gw-inkline { stroke: #173653; }
  .dark .gw-inkline { stroke: #d5e3ea; }
  .gw-seal-fill { fill: #a8463e; }
  .gw-base, .gw-shadow, .gw-foam, .gw-water, .gw-fuji, .gw-boat,
  .gw-claw, .gw-particle, .gw-seal, .gw-sky, .gw-cloud {
    transform-box: fill-box;
    transform-origin: center;
  }
  .gw-base, .gw-shadow, .gw-foam, .gw-claw { will-change: transform; }
  .gw-sheet {
    background:
      linear-gradient(90deg, rgba(23,54,83,.045) 1px, transparent 1px),
      #f3eee4;
    background-size: 32px 32px;
  }
  .dark .gw-sheet {
    background:
      linear-gradient(90deg, rgba(213,227,234,.035) 1px, transparent 1px),
      #111820;
  }
  @media (prefers-reduced-motion: reduce) {
    .gw-fragment { opacity: 1 !important; transform: none !important; }
    [data-wave-space] { display: none; }
  }
`;

function WaveFrame({
  variant,
  className,
}: {
  variant: "curl" | "claws" | "horizon";
  className: string;
}) {
  return (
    <div className={`gw-fragment relative overflow-hidden rounded-2xl ${className}`}>
      <WaveMark variant={variant} />
    </div>
  );
}

function IkigaiCopy() {
  const [build, simple, learn] = ikigaiNotes;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-14 pb-24 pr-16 text-foreground sm:px-10 sm:py-20">
      <Dialog.Title className="ikigai-line font-serif text-4xl font-bold tracking-tighter sm:text-5xl">
        My IKIGAI
      </Dialog.Title>
      <Dialog.Description className="ikigai-line mt-3 max-w-md font-sans text-lg text-foreground/80">
        生き甲斐 - a reason for being.
      </Dialog.Description>
      <p className="ikigai-line mt-6 max-w-xl font-serif text-2xl leading-snug text-foreground">
        <QuoteIcon
          className="mr-1 inline size-6 -translate-y-1 rotate-180"
          fill="currentColor"
          strokeWidth={1.5}
          aria-hidden
        />
        I&apos;ve found my Ikigai in building things.
        <QuoteIcon
          className="ml-1 inline size-6 -translate-y-1"
          fill="currentColor"
          strokeWidth={1.5}
          aria-hidden
        />
      </p>
      <p className="ikigai-line mt-4 max-w-xl font-sans text-base leading-relaxed text-foreground/75 md:text-lg">
        I love the intersection of technology, creativity, and problem solving,
        turning an idea into something real, useful, and beautifully crafted.
        It&apos;s the reason I enjoy engineering. Not just writing code, but
        figuring out how things should work, how they should feel, and how they
        can be made better.
      </p>

      <div className="mt-16 flex max-w-4xl flex-col gap-20">
        <article className="ikigai-line grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,1.45fr)_minmax(15rem,.8fr)] md:items-end md:gap-9">
          <WaveFrame variant="curl" className="aspect-[16/10] w-full" />
          <div className="md:pb-2">
            <h3 className="font-serif text-2xl font-bold leading-tight tracking-tight">
              {build.title}
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/75 md:text-base">
              {build.body}
            </p>
          </div>
        </article>

        <article className="ikigai-line grid grid-cols-1 gap-5 md:grid-cols-[minmax(16rem,.72fr)_minmax(0,1.35fr)] md:items-center md:gap-10">
          <div>
            <h3 className="font-serif text-2xl font-bold leading-tight tracking-tight">
              {simple.title}
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/75 md:text-base">
              {simple.body}
            </p>
          </div>
          <WaveFrame variant="claws" className="aspect-[4/3] w-full" />
        </article>

        <article className="ikigai-line">
          <div className="max-w-xl">
            <h3 className="font-serif text-2xl font-bold leading-tight tracking-tight">
              {learn.title}
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-foreground/75 md:text-base">
              {learn.body}
            </p>
          </div>
          <WaveFrame variant="horizon" className="mt-6 aspect-[12/4] w-full" />
        </article>
      </div>
    </div>
  );
}

function DrawerRise() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const anchor = anchorRef.current;
    const panel = anchor?.closest<HTMLElement>('[role="dialog"]');
    const overlay = document.querySelector<HTMLElement>("[data-ikigai-overlay]");
    if (!panel || !overlay) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(panel, { yPercent: 0, autoAlpha: 1 });
      gsap.set(overlay, { autoAlpha: 1 });
      gsap.set(panel.querySelectorAll(".gw-fragment"), { autoAlpha: 1, y: 0 });
      return;
    }

    let cleanupWave = () => {};
    const ctx = gsap.context(() => {
      const stage = panel.querySelector<HTMLElement>("[data-wave-stage]");
      cleanupWave = bindWaveBreak(panel) ?? (() => {});

      const tl = gsap.timeline({
        onComplete: () => ScrollTrigger.refresh(),
      });
      tl.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.42 }, 0);
      tl.fromTo(
        panel,
        { yPercent: 108 },
        { yPercent: 0, duration: 1.15, ease: "power3.out" },
        0,
      );
      if (stage) {
        tl.fromTo(
          stage,
          { scale: 1.12, autoAlpha: 0.45 },
          {
            scale: 1,
            autoAlpha: 1,
            duration: 1.4,
            ease: "sine.out",
            transformOrigin: "50% 55%",
          },
          0.08,
        );
      }
    }, panel);

    return () => {
      cleanupWave();
      ctx.revert();
    };
  }, []);

  return <span ref={anchorRef} className="sr-only" />;
}

export default function EngineeringPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const ensoRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const enso = ensoRef.current;
    if (!section || !enso) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const swell = section.querySelector<HTMLElement>(".ikigai-card-swell");
      const edge = document.getElementById("ikigai-water-edge");
      const foam = section.querySelector<SVGPathElement>(".ikigai-card-foam");
      if (swell) {
        gsap.to(swell, {
          y: 7,
          duration: 3.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }
      if (edge && foam) {
        gsap
          .timeline({ repeat: -1, yoyo: true, defaults: { ease: "sine.inOut" } })
          .to(edge, { attr: { d: IKIGAI_WAVE_B }, duration: 2.8 })
          .to(foam, { attr: { d: IKIGAI_CREST_B }, duration: 2.8 }, "<")
          .to(edge, { attr: { d: IKIGAI_WAVE_C }, duration: 3.4 })
          .to(foam, { attr: { d: IKIGAI_CREST_C }, duration: 3.4 }, "<");
      }

      const brush = { progress: 0 };
      enso.style.setProperty("--enso", "0");

      const drift = gsap.fromTo(
        enso,
        { rotation: -2.2 },
        {
          rotation: 2.2,
          duration: 8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          transformOrigin: "56% 47%",
          paused: true,
          immediateRender: false,
        },
      );
      const ripple = gsap.fromTo(
        ".ikigai-ripple",
        { scale: 1, autoAlpha: 0.4 },
        {
          scale: 1.65,
          autoAlpha: 0,
          duration: 2.6,
          ease: "power1.out",
          repeat: -1,
          paused: true,
          immediateRender: false,
        },
      );

      const tl = gsap.timeline({ paused: true });
      tl.to(brush, {
        progress: 1,
        duration: 2.6,
        ease: "sine.inOut",
        onUpdate: () => {
          enso.style.setProperty("--enso", brush.progress.toFixed(4));
        },
        onComplete: () => {
          enso.style.maskImage = "none";
          enso.style.setProperty("-webkit-mask-image", "none");
          drift.play();
          ripple.play();
        },
      });

      const playBrush = () => {
        if (tl.progress() > 0) return;
        tl.play(0);
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top 88%",
        once: true,
        onEnter: playBrush,
      });

      if (section.getBoundingClientRect().top < window.innerHeight * 0.92) {
        playBrush();
      }
    }, section);

    return () => ctx.revert();
  }, []);

  function handleOpenChange(next: boolean) {
    if (next) {
      closingRef.current = false;
      setOpen(true);
      return;
    }
    if (closingRef.current) return;

    const panel = panelRef.current;
    const overlay = overlayRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !panel || !overlay) {
      setOpen(false);
      return;
    }

    closingRef.current = true;
    const lines = panel.querySelectorAll(".ikigai-line");
    const scroller = panel.querySelector<HTMLElement>("[data-ikigai-scroll]");
    const stage = panel.querySelector<HTMLElement>("[data-wave-stage]");
    const leave = gsap.timeline({
      onComplete: () => {
        closingRef.current = false;
        setOpen(false);
      },
    });
    leave.to(lines, { autoAlpha: 0, y: 16, duration: 0.22, stagger: 0.03, ease: "power2.in" }, 0);
    if (scroller) {
      leave.to(scroller, { scrollTop: 0, duration: 0.5, ease: "power2.inOut" }, 0);
    }
    if (stage) {
      leave.to(stage, { scale: 1.08, duration: 0.58, ease: "power2.in" }, 0.05);
    }
    leave
      .to(panel, { yPercent: 108, duration: 0.66, ease: "power3.in" }, 0.12)
      .to(overlay, { autoAlpha: 0, duration: 0.36 }, 0.25);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <style>{drawerMotion}</style>
      <svg aria-hidden className="absolute h-0 w-0">
        <mask id="ikigai-water" maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
          <path id="ikigai-water-edge" fill="white" d={IKIGAI_WAVE_A} />
        </mask>
      </svg>
      <section
        ref={sectionRef}
        id="my-ikigai"
        className="relative aspect-[1024/934] w-full self-start overflow-hidden rounded-3xl border border-foreground/[0.06] bg-background/80 md:col-span-1 lg:col-span-2"
      >
        <div className="pointer-events-none absolute inset-y-[2%] left-[-4%] z-[1] aspect-square">
          <div className="relative h-full w-full rotate-[-90deg]">
            <div ref={ensoRef} className="ikigai-enso relative h-full w-full will-change-transform">
              <Image
                src="/hero/koi-d.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="object-contain dark:hidden"
              />
              <Image
                src="/hero/koi-l.png"
                alt=""
                fill
                sizes="(min-width: 1024px) 640px, 100vw"
                className="hidden object-contain dark:block"
              />
            </div>
          </div>
        </div>

        <div className="ikigai-card-swell pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[38%] will-change-transform [mask-image:url(#ikigai-water)] [-webkit-mask-image:url(#ikigai-water)]">
          <video
            src="/video/kanwa.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover object-[center_70%]"
          />
        </div>
        <svg
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-[38%] w-full overflow-visible"
        >
          <path
            className="ikigai-card-foam"
            d={IKIGAI_CREST_A}
            fill="none"
            stroke="rgba(255,255,255,0.78)"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="absolute left-[41%] top-[46%] z-10 w-[min(16rem,52%)] -translate-x-1/2 text-center">
          <h2 className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text font-serif text-3xl font-bold leading-none tracking-tighter text-transparent dark:from-white dark:to-slate-900/10 sm:text-4xl">
            My IKIGAI
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="mt-[0.45em] whitespace-nowrap font-sans text-[clamp(0.8rem,2.6cqi,1.05rem)] font-medium leading-none tracking-tight text-neutral-950 dark:text-white">
                ( 生き甲斐 : 生きる意味 )
              </h3>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-neutral-900">
              Ikigai: Meaning of life
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="absolute left-[41%] top-[27%] z-20 -translate-x-1/2 -translate-y-1/2">
          <span
            aria-hidden
            className="ikigai-ripple pointer-events-none absolute inset-0 rounded-full border border-neutral-950/30 dark:border-white/50"
          />
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Play IKIGAI"
              className="relative grid size-[4.5rem] place-items-center rounded-full bg-white/90 text-neutral-950 shadow-[0_10px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition-transform duration-300 hover:scale-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 dark:focus-visible:ring-white"
            >
              <Play className="ml-1 size-7 fill-current" strokeWidth={1.75} />
            </button>
          </Dialog.Trigger>
        </div>
      </section>

      <Dialog.Portal>
        <Dialog.Overlay
          ref={overlayRef}
          data-ikigai-overlay=""
          className="fixed inset-0 z-[80] bg-black/45"
        />
        <Dialog.Content
          ref={panelRef}
          className="fixed inset-x-0 bottom-0 z-[80] h-[94dvh] w-full bg-transparent p-0 shadow-none outline-none"
        >
          <DrawerRise />
          <div className="relative h-full overflow-hidden rounded-t-2xl bg-[#f3eee4] shadow-[0_-18px_70px_rgba(12,34,55,0.22)] dark:bg-[#111820]">
            <div data-ikigai-scroll="" className="relative h-full overflow-y-auto overscroll-contain">
              <div data-ikigai-track="" className="relative">
                <div
                  data-wave-stage=""
                  className="gw-stage sticky top-0 h-[94dvh] overflow-hidden"
                >
                  <GreatWave className="h-full w-full" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply dark:mix-blend-screen dark:opacity-[0.08] [background-image:radial-gradient(circle_at_center,rgba(23,54,83,0.35)_0.6px,transparent_0.8px)] [background-size:4px_4px]"
                  />
                </div>
                <div
                  data-wave-space=""
                  data-wave-deconstruct-end=""
                  className="relative h-[125dvh]"
                  aria-hidden
                />
                <div className="gw-sheet relative z-[2]">
                  <IkigaiCopy />
                </div>
                <div className="gw-sheet h-[20dvh]" aria-hidden />
              </div>
            </div>

            <Dialog.Close className="absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full bg-[#f8f5ed] text-neutral-950 ring-1 ring-[#173653]/20 transition-transform duration-200 hover:scale-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173653] dark:bg-[#17232d] dark:text-white dark:ring-white/25 dark:focus-visible:ring-white">
              <X className="size-5" strokeWidth={1.75} />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
