"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ImageIcon, Play, QuoteIcon, X } from "lucide-react";
import { BLUR_FADE_DELAY } from "@/lib/home";
import BlurFade from "../magicui/blur-fade";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function DrawerVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={videoRef}
      src="/video/kanwa.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
    />
  );
}

const ikigaiCards = [
  {
    title: "Build things that matter",
    body: "I'm happiest when an idea becomes something people can actually use. I enjoy taking something from a blank canvas to a thoughtful, working product — one detail at a time.",
  },
  {
    title: "Make complexity feel simple",
    body: "I love solving difficult problems and hiding that complexity behind simple experiences. Good engineering, to me, is often about making the complicated feel obvious.",
  },
  {
    title: "Keep learning, keep experimenting",
    body: "Technology never stays still, and neither do I. I enjoy exploring new tools, patterns, and ideas — from frontend architecture to AI — and turning curiosity into things I can actually build.",
  },
];

const drawerMotion = `
  @keyframes ikigai-open {
    from { clip-path: inset(100% 0 0 0 round 28px); }
    to { clip-path: inset(0% 0 0 0 round 28px); }
  }
  @keyframes ikigai-close {
    from { clip-path: inset(0% 0 0 0 round 28px); }
    to { clip-path: inset(100% 0 0 0 round 28px); }
  }
  @keyframes ikigai-fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .ikigai-drawer[data-state="open"] {
    animation: ikigai-open 0.95s cubic-bezier(0.22, 1, 0.36, 1) both;
  }
  .ikigai-drawer[data-state="closed"] {
    animation: ikigai-close 0.45s ease-in both;
  }
  .ikigai-drawer[data-state="open"] .ikigai-scrim,
  .ikigai-drawer[data-state="open"] .ikigai-copy {
    animation: ikigai-fade 0.4s ease 0.55s both;
  }
  @media (prefers-reduced-motion: reduce) {
    .ikigai-drawer[data-state="open"],
    .ikigai-drawer[data-state="closed"],
    .ikigai-drawer[data-state="open"] .ikigai-scrim,
    .ikigai-drawer[data-state="open"] .ikigai-copy {
      animation: none;
    }
  }
`;

export default function EngineeringPhilosophy() {
  return (
    <Dialog.Root>
      <style>{drawerMotion}</style>
      <section
        id="my-ikigai"
        className="relative aspect-[1024/934] w-full self-start overflow-hidden rounded-3xl border border-foreground/[0.06] bg-background/80 [container-type:inline-size] md:col-span-1 lg:col-span-2"
      >
        <BlurFade delay={BLUR_FADE_DELAY * 5} className="absolute inset-0">
          <div className="relative h-full w-full">
            <Image
              src="/hero/koi-l.png"
              alt=""
              width={825}
              height={787}
              className="pointer-events-none absolute -left-[6%] bottom-[-1%] hidden h-[84%] w-auto max-w-none rotate-[-90deg] dark:block"
            />
            <Image
              src="/hero/koi-d.png"
              alt=""
              width={811}
              height={759}
              className="pointer-events-none absolute -left-[6%] bottom-[-1%] h-[84%] w-auto max-w-none rotate-[-90deg] dark:hidden"
            />
            <div className="absolute right-[7%] top-[7%] z-10 text-right">
              <h2 className="pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-4xl font-serif font-bold leading-none tracking-tighter text-transparent dark:from-white dark:to-slate-900/10 sm:text-5xl">
                My IKIGAI
              </h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <h4 className="mt-[0.55em] font-sans text-[clamp(1rem,3.8cqi,2rem)] font-medium leading-none tracking-tight text-neutral-950 dark:text-white">
                    ( 生き甲斐 : 生きる意味 )
                  </h4>
                </TooltipTrigger>
                <TooltipContent className="bg-white text-neutral-900">
                  Ikigai: Meaning of life
                </TooltipContent>
              </Tooltip>
            </div>

            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="Play IKIGAI"
                className="absolute left-1/2 top-1/2 z-20 grid size-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-neutral-950 shadow-[0_10px_40px_rgba(0,0,0,0.28)] ring-1 ring-black/10 transition-transform duration-300 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Play className="ml-1 size-7 fill-current" strokeWidth={1.75} />
              </button>
            </Dialog.Trigger>
          </div>
        </BlurFade>
      </section>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/45 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="ikigai-drawer fixed inset-x-0 bottom-0 z-[80] h-[min(92dvh,860px)] w-full overflow-hidden rounded-t-[28px] bg-black p-0 shadow-none outline-none">
          <DrawerVideo />
          <div
            aria-hidden
            className="ikigai-scrim pointer-events-none absolute inset-0 bg-white/55 dark:bg-black/60"
          />
          <div
            aria-hidden
            className="ikigai-scrim pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-white/30 to-white/15 dark:from-black/70 dark:via-black/20 dark:to-black/30"
          />

          <Dialog.Close className="ikigai-copy absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full bg-foreground/10 text-foreground ring-1 ring-foreground/15 backdrop-blur-sm transition-colors hover:bg-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground">
            <X className="size-5" strokeWidth={1.75} />
            <span className="sr-only">Close</span>
          </Dialog.Close>

          <div className="ikigai-copy relative z-10 flex h-full flex-col overflow-y-auto p-6 pb-10 text-foreground sm:p-10">
            <Dialog.Title className="font-serif text-4xl font-bold tracking-tighter sm:text-5xl">
              My IKIGAI
            </Dialog.Title>
            <Dialog.Description className="mt-3 max-w-md font-sans text-lg text-foreground/80">
              生き甲斐 - a reason for being.
            </Dialog.Description>
            <p className="mt-4 max-w-xl whitespace-pre-line font-serif text-base leading-relaxed text-foreground/70 md:text-lg">
              <span className="font-bold text-foreground text-2xl">
                {" "}
                <QuoteIcon
                  className="size-8 rotate-180"
                  fill="currentColor"
                  strokeWidth={1.5}
                />
                I've found my Ikigai in building things.
                <QuoteIcon
                  className="size-8"
                  fill="currentColor"
                  strokeWidth={1.5}
                />
              </span>
              <span className="font-normal text-foreground/70 text-2xl">
                {" "}
                I love the intersection of technology, creativity, and problem
                solving — turning an idea into something real, useful, and
                beautifully crafted.
              </span>
              <span className="font-normal text-foreground/70 text-2xl">
                {" "}
                It's the reason I enjoy engineering.
              </span>
              <span className="font-normal text-foreground/70 text-2xl">
                {" "}
                Not just writing code, but figuring out how things should work,
                how they should feel, and how they can be made better.
              </span>
            </p>
            <ul className="mt-8 grid gap-4 md:grid-cols-3">
              {ikigaiCards.map((card) => (
                <li
                  key={card.title}
                  className="flex flex-col overflow-hidden rounded-2xl border border-foreground/10 bg-background/80 backdrop-blur-md"
                >
                  <div className="relative grid aspect-[4/3] place-items-center bg-foreground/[0.06]">
                    <ImageIcon
                      className="size-8 text-foreground/35"
                      strokeWidth={1.5}
                    />
                    <span className="sr-only">Image placeholder</span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-4 sm:p-5">
                    <h3 className="font-serif text-xl font-bold leading-tight tracking-tight">
                      {card.title}
                    </h3>
                    <p className="font-serif text-sm leading-relaxed text-foreground/70 md:text-base">
                      {card.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
