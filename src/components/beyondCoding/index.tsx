"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
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

type PhotoId = "barca" | "messi" | "naruto" | "kakashi";

type Photo = {
  id: PhotoId;
  src: string;
  alt: string;
  frame: string;
  focus?: string;
  /** Tilt everywhere, scattered position from `lg` up, where the photos float around the copy. */
  place: string;
};

const PHOTOS: Photo[] = [
  {
    id: "barca",
    src: "/beyond/barca.jpg",
    alt: "Illustration of a hand gripping the FC Barcelona crest on a blaugrana shirt",
    frame: "aspect-square",
    place: "-rotate-6 lg:left-[4%] lg:top-[2%] lg:w-[14%]",
  },
  {
    id: "messi",
    src: "/beyond/messi.jpg",
    alt: "Lionel Messi celebrating with his arms wide in a Barça shirt",
    frame: "aspect-[3/2]",
    focus: "object-[center_35%]",
    place: "rotate-[5deg] lg:right-[4%] lg:top-[8%] lg:w-[17%]",
  },
  {
    id: "naruto",
    src: "/beyond/naruto.jpg",
    alt: "Naruto Uzumaki grinning in his Konoha headband",
    frame: "aspect-[3/2]",
    focus: "object-[center_30%]",
    place: "rotate-3 lg:bottom-[4%] lg:left-[10%] lg:w-[16%]",
  },
  {
    id: "kakashi",
    src: "/beyond/kakashi.jpg",
    alt: "Kakashi Hatake winking, hand raised to his headband",
    frame: "aspect-square",
    place: "-rotate-[4deg] lg:bottom-0 lg:right-[9%] lg:w-[13%]",
  },
];

const BURST_ANGLES = [-64, -32, 0, 32, 64];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

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
  const reduce = useReducedMotion();
  const [active, setActive] = useState<PhotoId | null>(null);

  return (
    <section
      id="beyond-coding"
      className={cn(
        cardBase,
        "relative col-span-full p-0 pb-8 text-neutral-950 dark:text-white [container-type:inline-size] md:p-0 md:pb-12",
      )}
    >
      <Reach />

      <div className="relative px-5 md:px-10">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="-mt-[4cqi] bg-gradient-to-b from-black to-gray-400/80 bg-clip-text pb-[0.06em] text-center font-serif text-[clamp(2.5rem,10.5cqi,9rem)] font-black uppercase leading-[0.85] tracking-tighter text-transparent dark:from-white dark:to-neutral-500">
            Beyond Coding
          </h2>
        </BlurFade>

        <div className="relative mt-8 md:mt-10 lg:flex lg:min-h-[32cqi] lg:items-center lg:justify-center">
          <BlurFade
            delay={BLUR_FADE_DELAY * 8}
            className="relative mx-auto flex max-w-[34ch] flex-col items-center gap-6 text-center"
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
              className="-rotate-2 text-xl text-foreground/70"
              style={{ fontFamily: "Mynerve, cursive" }}
            >
              Visca el Barça!
            </p>
          </BlurFade>

          {/* From `lg` this layer covers the copy, so only the photos themselves take pointer events. */}
          <div className="mx-auto mt-8 grid max-w-sm grid-cols-2 items-center gap-4 px-2 sm:max-w-2xl sm:grid-cols-4 lg:pointer-events-none lg:absolute lg:inset-0 lg:mt-0 lg:block lg:max-w-none lg:px-0">
            {PHOTOS.map((photo, i) => {
              const dimmed = active !== null && active !== photo.id;
              return (
                <div
                  key={photo.id}
                  className={cn(
                    "lg:pointer-events-auto lg:absolute",
                    photo.place,
                    active === photo.id && "z-10",
                  )}
                >
                  <motion.figure
                    initial={reduce ? false : { opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, delay: i * 0.08, ease: EASE_OUT }}
                    onMouseEnter={() => setActive(photo.id)}
                    onMouseLeave={() => setActive(null)}
                    className={cn(
                      "relative overflow-hidden rounded-xl bg-foreground/5 shadow-[0_10px_30px_rgba(60,40,20,0.12)] ring-1 ring-foreground/[0.06] dark:shadow-[0_10px_30px_rgba(0,0,0,0.35)]",
                      photo.frame,
                    )}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 160px, 180px"
                      draggable={false}
                      className={cn(
                        "object-cover transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none",
                        photo.focus,
                        active === photo.id && "scale-[1.04] motion-reduce:scale-100",
                        dimmed && "opacity-40 grayscale",
                      )}
                    />
                  </motion.figure>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
