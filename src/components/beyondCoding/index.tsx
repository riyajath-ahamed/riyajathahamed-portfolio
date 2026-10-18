"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { BLUR_FADE_DELAY, cardBase } from "@/lib/home";
import { cn } from "@/lib/utils";
import BlurFade from "../magicui/blur-fade";
import GradientASCII from "../magicui/GradientASCII";
import StickerPeel from "../magicui/stickerPeel";

type PhotoId = "barca" | "messi" | "naruto" | "kakashi";

type Photo = {
  id: PhotoId;
  src: string;
  alt: string;
  frame: string;
  /** Resting tilt, in degrees. */
  rotate: number;
  /** Scattered slot from `lg` up, around the copy. The sticker can leave this slot. */
  place: string;
};

const PHOTOS: Photo[] = [
  {
    id: "barca",
    src: "/beyond/barca.jpg",
    alt: "Illustration of a hand gripping the FC Barcelona crest on a blaugrana shirt",
    frame: "aspect-square",
    rotate: -6,
    place: "lg:left-[4%] lg:top-[2%] lg:w-[14%]",
  },
  {
    id: "messi",
    src: "/beyond/messi.jpg",
    alt: "Lionel Messi celebrating with his arms wide in a Barça shirt",
    frame: "aspect-[3/2]",
    rotate: 5,
    place: "lg:right-[4%] lg:top-[8%] lg:w-[17%]",
  },
  {
    id: "naruto",
    src: "/beyond/naruto.jpg",
    alt: "Naruto Uzumaki grinning in his Konoha headband",
    frame: "aspect-[3/2]",
    rotate: 3,
    place: "lg:bottom-[4%] lg:left-[10%] lg:w-[16%]",
  },
  {
    id: "kakashi",
    src: "/beyond/kakashi.jpg",
    alt: "Kakashi Hatake winking, hand raised to his headband",
    frame: "aspect-square",
    rotate: -4,
    place: "lg:bottom-0 lg:right-[9%] lg:w-[13%]",
  },
];

const BURST_ANGLES = [-64, -32, 0, 32, 64];

const ANCHOR_HANDLES: Record<PhotoId, { current: HTMLDivElement | null }> = {
  barca: { current: null },
  messi: { current: null },
  naruto: { current: null },
  kakashi: { current: null },
};

function Mark({
  id,
  active,
  onHover,
  children,
}: {
  id: PhotoId;
  active: PhotoId | null;
  onHover: (id: PhotoId | null) => void;
  children: ReactNode;
}) {
  return (
    <span
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        "cursor-default font-semibold text-[#e8413c] underline decoration-[#e8413c]/25 decoration-2 underline-offset-[0.2em] transition-[text-decoration-color] duration-300 dark:text-[#ff7a6e] dark:decoration-[#ff7a6e]/25",
        active === id && "decoration-[#e8413c] dark:decoration-[#ff7a6e]",
      )}
    >
      {children}
    </span>
  );
}

function Reach() {
  const stageRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ["start end", "center center"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const cursorX = useTransform(progress, [0, 1], ["-55%", "0%"]);
  const armX = useTransform(progress, [0, 1], ["26%", "0%"]);
  const burst = useTransform(progress, [0.9, 1], [0, 1]);

  return (
    // Stage coordinates are percentages of a 100:40 box so both fingertips stay aligned at every width.
    <div
      ref={stageRef}
      aria-hidden
      className="pointer-events-none relative aspect-[100/40] w-[130%] sm:w-full"
    >
      <motion.div
        className="absolute left-[7.5%] top-[17.5%] w-[26%] [filter:drop-shadow(-6px_6px_0_#d3ccbd)] dark:[filter:drop-shadow(-6px_6px_0_#3a3a3a)]"
        style={{ x: reduce ? 0 : cursorX }}
      >
        <Image
          src="/beyond/mouseCursor.png"
          alt=""
          width={840}
          height={859}
          sizes="(min-width: 1400px) 364px, 34vw"
          className="h-auto w-full [transform:rotate(48deg)_scaleX(-1)] dark:[filter:brightness(0.8)]"
        />
      </motion.div>

      <motion.div
        className="absolute -right-[4%] top-[5%] w-[64%] mix-blend-multiply dark:mix-blend-normal"
        style={{ x: reduce ? 0 : armX }}
      >
        <Image
          src="/beyond/arm.png"
          alt=""
          width={942}
          height={548}
          sizes="(min-width: 1400px) 896px, 84vw"
          className="h-auto w-full"
        />
      </motion.div>

      <motion.div
        className="absolute left-[38.4%] top-[44%]"
        style={{ opacity: reduce ? 1 : burst, scale: reduce ? 1 : burst }}
      >
        {BURST_ANGLES.map((deg) => (
          <span
            key={deg}
            className="absolute bottom-0 left-[-0.2cqi] h-[1.7cqi] w-[0.4cqi] origin-bottom rounded-full bg-[#e8413c] dark:bg-[#ff7a6e]"
            style={{ transform: `rotate(${deg}deg) translateY(-55%)` }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function BeyondCoding() {
  const [active, setActive] = useState<PhotoId | null>(null);
  const [widths, setWidths] = useState<Record<PhotoId, number>>({
    barca: 180,
    messi: 180,
    naruto: 180,
    kakashi: 180,
  });

  useEffect(() => {
    const read = () => {
      setWidths((prev) => {
        let changed = false;
        const next = { ...prev };
        (Object.keys(ANCHOR_HANDLES) as PhotoId[]).forEach((id) => {
          const slot = ANCHOR_HANDLES[id].current?.clientWidth ?? 0;
          const width = slot > 16 ? Math.round(slot) : prev[id];
          if (width !== prev[id]) {
            next[id] = width;
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    };
    const observer = new ResizeObserver(read);
    (Object.keys(ANCHOR_HANDLES) as PhotoId[]).forEach((id) => {
      const node = ANCHOR_HANDLES[id].current;
      if (node) observer.observe(node);
    });
    read();
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="beyond-coding"
      className={cn(
        cardBase,
        "relative col-span-full p-0 pb-8 text-neutral-950 dark:text-white [container-type:inline-size] md:p-0 md:pb-12",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <GradientASCII
          colors={["#1e3fd8", "#f6f8ff", "#a5d8ff", "#38bdf8"]}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
          glyphOpacity={0.85}
          glow={0.2}
          depthOfField={0}
          flicker={0.2}
          softness={0.5}
          scale={1}
          flow={0.5}
          speed={1}
          gradientOpacity={0.9}
          grain={0.08}
          variation={0}
          mouseInteraction
          scrambleRadius={0.1}
          clickEffect="wave"
          intro
          lightMode={false}
        />
      </div>

      <div className="relative z-[1]">
      <Reach />

      <div className="relative px-5 md:px-10">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="-mt-[4cqi] pb-[0.06em] text-center font-serif text-[clamp(2.5rem,10.5cqi,9rem)] font-black uppercase leading-[0.85] tracking-tighter text-foreground text-balance">
            Beyond Coding
          </h2>
        </BlurFade>

        <div className="relative mt-8 md:mt-10 lg:flex lg:min-h-[32cqi] lg:items-center lg:justify-center">
          <BlurFade
            delay={BLUR_FADE_DELAY * 8}
            className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center"
          >
            <div className="space-y-4 text-[1.05rem] font-medium leading-[1.45] tracking-tight sm:text-[1.15rem] lg:text-[1.1rem] xl:text-[1.25rem]">
              <p className="text-foreground">
                I&apos;m a lifelong football fanatic and a proud{" "}
                <Mark id="barca" active={active} onHover={setActive}>
                  FC Barcelona
                </Mark>{" "}
                supporter. Watching{" "}
                <Mark id="messi" active={active} onHover={setActive}>
                  Messi🐐
                </Mark>{" "}
                play is why I fell in love with the beautiful game.
              </p>
              <p className="text-foreground/60">
                Off the pitch, I&apos;m deep into anime.{" "}
                <Mark id="naruto" active={active} onHover={setActive}>
                  Naruto
                </Mark>{" "}
                shaped how I think about perseverance, and{" "}
                <Mark id="kakashi" active={active} onHover={setActive}>
                  Kakashi Hatake
                </Mark>{" "}
                is still my all-time favorite character.
              </p>
            </div>

            <p
              className="font-hand -rotate-2 text-xl text-foreground/70"
            >
              Visca el Barça!
            </p>
          </BlurFade>

          <div
            aria-hidden
            className="pointer-events-none mx-auto mt-8 grid max-w-sm grid-cols-2 items-center gap-4 px-2 sm:max-w-2xl sm:grid-cols-4 lg:absolute lg:inset-0 lg:mt-0 lg:block lg:max-w-none lg:px-0"
          >
            {PHOTOS.map((photo) => (
              <div
                key={photo.id}
                ref={(node) => {
                  ANCHOR_HANDLES[photo.id].current = node;
                }}
                className={cn("w-full lg:absolute rounded-xl", photo.place, photo.frame)}
              />
            ))}
          </div>
        </div>
      </div>
      </div>

      {/* Drag bounds are this layer, which covers the whole card. */}
      <div className="pointer-events-none absolute inset-0 z-[2]">
        {PHOTOS.map((photo) => (
          <StickerPeel
            key={photo.id}
            imageSrc={photo.src}
            width={widths[photo.id]}
            finish="matte"
            peelBackHoverPct={25}
            peelBackActivePct={40}
            rotate={photo.rotate}
            peelDirection={0}
            curlRadius={12}
            backColor="#d4d4d8"
            lightingIntensity={0.8}
            shadowIntensity={0.6}
            followPointer
            swing={1}
            friction={0.5}
            bounce={0.35}
            draggable
            intro
            anchorRef={ANCHOR_HANDLES[photo.id]}
            dimmed={active !== null && active !== photo.id}
            aria-label={photo.alt}
            onMouseEnter={() => setActive(photo.id)}
            onMouseLeave={() => setActive(null)}
            className="transition-[opacity,filter] rounded-xl duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
          />
        ))}
      </div>
    </section>
  );
}
