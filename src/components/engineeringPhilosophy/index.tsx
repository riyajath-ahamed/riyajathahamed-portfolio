"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, QuoteIcon, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { bindDiorama, bindWaveBreak, easeDrawer, easeOutStrong, GreatWave} from "./greatWave";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ikigaiNotes = [
  {
    title: "Make beautiful things, even if no one cares",
    body: "I'm driven to make beatiful things, whether they're celebrated or invisible. Quality isnt about recognition, it's about the standards you hold no one's watching.",
    source: "video",
    src: "https://pub-7744c747312a4db3afe9366c16797634.r2.dev/asallen.mp4"
  },
  {
    title: "Design eperiences centered on human connection",
    body: "I design and build people-first experiences, shaped by human conncetions and a deep care for details, from micro-interactions to refined aesthetics.",
    src: "/ikigai/intercative.png",
  },
  {
    title: "Stay curious, keep experimenting",
    body: "I care about what happens beneath the surface. Thoughtful architecture, maintainable systems, and performance aren't afterthoughts — they're what make good products great over time.",
    src: "/ikigai/curious.jpeg",
  },
];

const drawerMotion = `
  .gw-diorama { perspective: 1100px; overflow: hidden; }
  .dio-sheet { transform-style: preserve-3d; }
  .dio-plane {
    transform-box: fill-box;
    transform-origin: center;
  }
  .dio-shadow { fill: #0c2744; }
  .dark .dio-shadow { fill: #061018; }
  .dio-shadow-stroke { fill: none; stroke: #0c2744; }
  .dark .dio-shadow-stroke { stroke: #061018; }
  .dio-grain { mix-blend-mode: multiply; opacity: 0.22; pointer-events: none; }
  .dark .dio-grain { mix-blend-mode: screen; opacity: 0.1; }
  .dio-swell { transform-box: fill-box; transform-origin: center; }
  @media (prefers-reduced-motion: no-preference) {
    .dio-plane, .dio-sheet, .dio-swell { will-change: transform; }
  }
  .ikigai-ripple { opacity: 0.4; }
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
  .gw-claw, .gw-particle, .gw-seal, .gw-sky, .gw-cloud,
  .gw-base-rig, .gw-shadow-rig, .gw-foam-rig, .gw-water-rig, .gw-claw-rig {
    transform-box: fill-box;
    transform-origin: center;
  }
  .gw-base, .gw-shadow, .gw-foam, .gw-claw,
  .gw-base-rig, .gw-shadow-rig, .gw-foam-rig, .gw-water-rig, .gw-claw-rig {
    will-change: transform;
  }
  .gw-sheet { --gw-line: rgba(23,54,83,.12); background: #f3eee4; }
  .dark .gw-sheet { --gw-line: rgba(213,227,234,.1); background: #111820; }
  .gw-hatch {
    background-image: repeating-linear-gradient(
      90deg, var(--gw-line) 0 1px, transparent 1px 5px
    );
  }
  .gw-dots {
    background-image: radial-gradient(var(--gw-line) 0.8px, transparent 1px);
    background-size: 10px 10px;
  }
  @media (prefers-reduced-motion: no-preference) {
    .is-motion .gw-fragment {
      opacity: 0;
      transform: translateY(8px);
    }
    .is-motion .gw-fragment[data-revealed="true"] {
      opacity: 1;
      transform: none;
      transition:
        opacity 300ms cubic-bezier(0.23, 1, 0.32, 1),
        transform 300ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    [data-wave-ikigai],
    [data-wave-cue] { opacity: 0; }
  }
  @media (hover: hover) and (pointer: fine) {
    .ikigai-press:hover { transform: scale(1.03); }
  }
  .ikigai-press {
    transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
  }
  .ikigai-press:active { transform: scale(0.97); }
  @media (max-width: 767px) {
    [data-wave-space],
    [data-wave-cue] { display: none; }
    [data-wave-ikigai] { opacity: 1; }
    .gw-stage {
      position: relative;
      height: 72dvh;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .gw-fragment { opacity: 1 !important; transform: none !important; }
    [data-wave-space],
    [data-wave-cue] { display: none; }
    [data-wave-ikigai] { opacity: 1; display: block; }
    .gw-stage {
      position: relative;
      height: 62dvh;
    }
  }
`;

function ikigaiSVG () {
  return (
    <div className="w-[16px] h-[16px] relative" aria-hidden="true"><svg className="absolute inset-[-3.13%] w-[17px] h-[17px]" fill="none" viewBox="0 0 17 17" aria-hidden="true"><circle cx="8.5" cy="5.5" r="5" stroke="#BBBBBB" fill="none"></circle><circle cx="8.5" cy="11.5" r="5" stroke="#BBBBBB" fill="none"></circle><circle cx="5.5" cy="8.5" r="5" stroke="#BBBBBB" fill="none"></circle><circle cx="11.5" cy="8.5" r="5" stroke="#BBBBBB" fill="none"></circle></svg></div>
  )
}  

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="gw-hatch relative flex h-8 items-center justify-center border-b border-[var(--gw-line)]">
      <span className="bg-[#f3eee4] px-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#172331] dark:bg-[#111820] dark:text-[#e7edf0]">
        [ {children} ]
      </span>
    </div>
  );
}

function WaveFrame({ variant, source = "image" }: { variant: string | undefined; source: string | undefined }) {
  return (
    <div className="gw-fragment gw-dots relative aspect-[16/9] w-full overflow-hidden rounded-xl ring-1 ring-[var(--gw-line)]">
      <div className="absolute inset-4 overflow-hidden rounded-md">
        { variant && source === "image" && 
        (<Image
            src={variant}
            alt=""
            width={640}
            height={360}
            className="h-full w-full object-cover"
            priority
          />
        )}
        { variant && source === "video" &&
        (<video
            src={variant}  
            controls
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={`absolute size-1 rounded-full bg-[#172331]/60 dark:bg-[#e7edf0]/60 ${pos}`}
        />
      ))}
    </div>
  );
}

function IkigaiCopy() {
  return (
    <div className="mx-auto w-full max-w-6xl border-x border-[var(--gw-line)] text-[#172331] dark:text-[#e7edf0]">
      <SectionLabel>My Ikigai</SectionLabel>

      <div className="px-6 py-16 sm:px-10 sm:py-20">
        <Dialog.Title className="font-sans text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          <QuoteIcon
            className="mr-1 inline size-5 -translate-y-1 rotate-180 opacity-60"
            fill="currentColor"
            strokeWidth={1.5}
            aria-hidden
          />
          I&apos;ve found my ikigai at the intersection of design, technology, and problem solving.
        </Dialog.Title>
        <Dialog.Description className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-[#173653]/70 dark:text-[#d5e3ea]/70">
          生き甲斐 · a reason for being
        </Dialog.Description>
        <div className="mt-6 flex flex-col justify-between md:flex-row gap-3">
          <p className="mt-6 max-w-[30ch] font-sans text-[15px] leading-7 text-[#172331]/70 text-pretty dark:text-[#e7edf0]/70">
            My ikigai <span className="inline-block align-middle">{ikigaiSVG() }</span>{" "}lives at the intersection of design, technology, and problem solving. 
            I love turning complex ideas into intuitive experiences - building products that work beautifully, 
            feel effortless, and solve real problems.
          </p>
          <Image
            src="/ikigai/myikigai.png"
            alt=""
            width={520}
            height={360}
            className="mt-8 w-full rounded-xl object-cover dark:invert dark:contrast-[0.8] md:mt-0 md:w-[520px]"
            priority
          />
        </div>
      </div>

      <div className="border-t border-[var(--gw-line)]">
        <SectionLabel>What drives me</SectionLabel>
      </div>

      <div className="grid grid-cols-1 divide-y divide-[var(--gw-line)] md:grid-cols-3 md:divide-x md:divide-y-0">
        {ikigaiNotes.map((note, i) => (
          <article
            key={note.title}
            className="px-6 py-14 sm:px-8 md:pb-28 md:pt-24"
          >
            <WaveFrame variant={note.src} source={note.source} />
            <h3 className="mt-8 max-w-[22ch] font-sans text-[15px] font-semibold leading-snug tracking-tight text-balance">
              {note.title}
            </h3>
            <p className="mt-4 font-sans text-sm leading-6 text-[#172331]/65 text-pretty dark:text-[#e7edf0]/65">
              {note.body}
            </p>
          </article>
        ))}
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
    let entered = false;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (entered) return;
          entered = true;
          cleanupWave = bindWaveBreak(panel) ?? (() => {});
          ScrollTrigger.refresh();
        },
      });
      tl.fromTo(
        overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.28, ease: easeOutStrong },
        0,
      );
      tl.fromTo(
        panel,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.5, ease: easeDrawer },
        0,
      );
    }, panel);

    return () => {
      entered = true;
      cleanupWave();
      ctx.revert();
    };
  }, []);

  return <span ref={anchorRef} className="sr-only" />;
}

function KanwaVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    const section = video?.closest("section");
    if (!video || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    video.setAttribute("fetchpriority", "low");

    let loaded = false;
    const show = () => setReady(true);
    video.addEventListener("loadeddata", show);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          if (!loaded) {
            loaded = true;
            video.src = "/video/kanwa.mp4";
          }
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.01 },
    );
    observer.observe(section);

    return () => {
      video.removeEventListener("loadeddata", show);
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full object-cover transition-opacity duration-700 ease-out motion-reduce:hidden ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}

export default function EngineeringPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let stop = () => {};
    const ctx = gsap.context(() => {
      stop = bindDiorama(section);
    }, section);

    return () => {
      stop();
      ctx.revert();
    };
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
    const leave = gsap.timeline({
      onComplete: () => {
        closingRef.current = false;
        setOpen(false);
      },
    });
    leave
      .to(panel, { yPercent: 100, duration: 0.5, ease: easeDrawer }, 0)
      .to(overlay, { autoAlpha: 0, duration: 0.28, ease: easeOutStrong }, 0.08);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <style>{drawerMotion}</style>
      <section
        ref={sectionRef}
        id="my-ikigai"
        className="relative aspect-[640/584] w-full self-start overflow-hidden rounded-[1.35rem] bg-[#f3eee4] shadow-[0_18px_44px_rgba(16,47,83,0.14)] ring-1 ring-[#173653]/10 dark:bg-[#111820] dark:shadow-[0_18px_44px_rgba(0,0,0,0.35)] dark:ring-white/10 md:col-span-1 lg:col-span-2"
      >
        {/* <WaveDiorama className="absolute inset-0" /> */}
        <KanwaVideo />

        <div className="pointer-events-none absolute left-6 top-6 z-10 max-w-[13rem] text-left sm:left-8 sm:top-8">
          <h2 className="font-serif text-3xl font-bold leading-none tracking-tighter text-[#172331] text-balance sm:text-4xl dark:text-[#e7edf0]">
            My IKIGAI
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="pointer-events-auto mt-2 font-sans text-sm font-medium leading-none tracking-tight text-[#173653] underline decoration-[#173653]/30 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173653] dark:text-[#d5e3ea] dark:decoration-white/30 dark:focus-visible:ring-white"
              >
                生き甲斐
              </button>
            </TooltipTrigger>
            <TooltipContent className="bg-white text-neutral-900">
              Ikigai: a reason for being
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="absolute bottom-4 right-4 z-20 size-14">
          <span
            aria-hidden
            className="ikigai-ripple pointer-events-none absolute inset-0 rounded-full border border-[#173653]/30 dark:border-white/45"
          />
          <Dialog.Trigger asChild>
            <button
              type="button"
              aria-label="Play IKIGAI"
              className="ikigai-press relative grid size-14 place-items-center rounded-full bg-[#f8f5ed] text-[#102f53] shadow-[0_12px_28px_rgba(16,47,83,0.28)] ring-1 ring-[#173653]/15 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173653] dark:bg-[#e7edf0] dark:text-[#102f53] dark:focus-visible:ring-white"
            >
              <Play className="ml-0.5 size-6 fill-current" strokeWidth={1.75} />
            </button>
          </Dialog.Trigger>
        </div>
      </section>

      <Dialog.Portal>
        <Dialog.Overlay
          ref={overlayRef}
          data-ikigai-overlay=""
          className="fixed inset-0 z-[80] bg-[#102f53]/40"
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
                    data-wave-ikigai=""
                    aria-hidden
                    className="pointer-events-none absolute left-[30%] top-[40%] z-[2] w-[min(16rem,38%)] text-center text-[#172331] dark:text-[#e7edf0]"
                  >
                    <p className="font-sans text-xs tracking-[0.18em] text-[#8fa3af]/70 dark:text-[#d5e3ea]/70">
                      生き甲斐
                    </p>
                    <p className="mt-2 font-serif text-2xl font-bold leading-tight text-[#8fa3af] tracking-tight sm:text-3xl">
                      I&apos;ve found my Ikigai in building things.
                    </p>
                  </div>
                  <p
                    data-wave-cue=""
                    className="pointer-events-none absolute left-[30%] top-[47%] z-[2] w-[min(16rem,38%)] text-center font-sans text-[11px] uppercase tracking-[0.28em] text-[#173653]/70 dark:text-[#d5e3ea]/70"
                  >
                    Scroll
                  </p>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply dark:mix-blend-screen dark:opacity-[0.08] [background-image:radial-gradient(circle_at_center,rgba(23,54,83,0.35)_0.6px,transparent_0.8px)] [background-size:4px_4px]"
                  />
                </div>
                <div
                  data-wave-space=""
                  data-wave-deconstruct-end=""
                  className="relative h-[160dvh]"
                  aria-hidden
                />
                <div className="gw-sheet relative z-[2]">
                  <IkigaiCopy />
                </div>
                <div className="gw-sheet h-[20dvh]" aria-hidden>
                  <div className="mx-auto h-full max-w-6xl border-x border-t border-[var(--gw-line)]" />
                </div>
              </div>
            </div>

            <Dialog.Close className="ikigai-press absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full bg-[#f8f5ed] text-neutral-950 ring-1 ring-[#173653]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#173653] dark:bg-[#17232d] dark:text-white dark:ring-white/25 dark:focus-visible:ring-white">
              <X className="size-5" strokeWidth={1.75} />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
