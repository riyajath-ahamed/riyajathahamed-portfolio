"use client";

import { useLayoutEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, QuoteIcon, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { bindDiorama, bindWaveBreak, easeDrawer, easeOutStrong, GreatWave, WaveDiorama, WaveMark } from "./greatWave";

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
        <WaveDiorama className="absolute inset-0" />

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
                    <p className="font-sans text-xs tracking-[0.18em] text-[#173653]/70 dark:text-[#d5e3ea]/70">
                      生き甲斐
                    </p>
                    <p className="mt-2 font-serif text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
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
                <div className="gw-sheet h-[20dvh]" aria-hidden />
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
