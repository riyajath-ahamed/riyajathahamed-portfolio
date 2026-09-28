"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BLUR_FADE_DELAY, cardBase } from "@/lib/home";
import { cn } from "@/lib/utils";
import BlurFade from "../magicui/blur-fade";

const PHOTOS = [
  { src: "/beyond/barca.jpg", alt: "FC Barcelona", rotate: -15, z: 1 },
  { src: "/beyond/messi.jpg", alt: "Lionel Messi", rotate: -7, z: 2 },
  { src: "/beyond/naruto.jpg", alt: "Naruto", rotate: 3, z: 3 },
  { src: "/beyond/kakashi.jpg", alt: "Kakashi Hatake", rotate: 12, z: 4 },
];

const fanVariants = {
  hidden: { opacity: 0, y: 40, rotate: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: PHOTOS[i].rotate,
    scale: 1,
    transition: {
      delay: 0.15 * i,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const reachTransition = { duration: 1.4, ease: [0.22, 1, 0.36, 1] };

export default function BeyondCoding() {
  return (
    <section
      id="beyond-coding"
      className={cn(
        cardBase,
        "relative col-span-full p-0 pb-10 text-neutral-950 border border-foreground/[0.06] bg-background/80 [container-type:inline-size] md:p-0 md:pb-14"
      )}
    >
      <svg aria-hidden className="absolute h-0 w-0">
        <filter id="beyond-posterize-light" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0.1 0.4 0.68 1" />
            <feFuncG type="discrete" tableValues="0.1 0.4 0.68 1" />
            <feFuncB type="discrete" tableValues="0.1 0.4 0.68 1" />
          </feComponentTransfer>
        </filter>
        <filter id="beyond-posterize-dark" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0.03 0.32 0.58 0.82" />
            <feFuncG type="discrete" tableValues="0.03 0.32 0.58 0.82" />
            <feFuncB type="discrete" tableValues="0.03 0.32 0.58 0.82" />
          </feComponentTransfer>
        </filter>
      </svg>

      {/* Stage coordinates are percentages of a 100:40 box so both fingertips stay aligned at every width. */}
      <div
        aria-hidden
        className="pointer-events-none relative aspect-[100/40] w-[130%] sm:w-full"
      >
        <motion.div
          className="absolute left-[7.5%] top-[17.5%] w-[26%] [filter:drop-shadow(-6px_6px_0_#d3ccbd)] dark:[filter:drop-shadow(-6px_6px_0_#3a3a3a)]"
          initial={{ opacity: 0, x: "-18%" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reachTransition}
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
          initial={{ opacity: 0, x: "10%" }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={reachTransition}
        >
          <Image
            src="/beyond/arm.png"
            alt=""
            width={942}
            height={548}
            sizes="(min-width: 1400px) 896px, 84vw"
            className="h-auto w-full "
            //[filter:url(#beyond-posterize-light)] dark:[filter:url(#beyond-posterize-dark)]
          />
        </motion.div>
      </div>

      <div className="relative px-6 md:px-8">
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <h2 className="-mt-[4cqi] bg-gradient-to-b from-black to-gray-400/80 bg-clip-text text-center font-serif text-[clamp(2.5rem,10.5cqi,9rem)] font-black uppercase leading-[0.85] tracking-tighter text-transparent dark:from-white dark:to-neutral-500">
            Beyond Coding
          </h2>
        </BlurFade>

        <BlurFade delay={BLUR_FADE_DELAY * 8} className="mx-auto mt-6 max-w-2xl md:mt-8">
          <p className="text-center font-serif text-base leading-relaxed text-neutral-950/70 dark:text-white/70 md:text-lg">
            I&apos;m a lifelong football fanatic and a proud{" "}
            <span className="font-semibold text-neutral-950 dark:text-white">FC Barcelona</span> supporter - watching{" "}
            <span className="font-semibold text-neutral-950 dark:text-white">Messi🐐</span> play is why I fell in love with the beautiful game.
            Off the pitch, I&apos;m deep into anime - <span className="italic text-neutral-950/80 dark:text-white/80">Naruto</span> shaped
            how I think about perseverance, and{" "}
            <span className="font-semibold text-neutral-950 dark:text-white">Kakashi Hatake</span> remains my all-time favorite character.
          </p>
        </BlurFade>

        <div className="mt-2 flex justify-center">
          <div className="relative h-[220px] w-full max-w-[480px] shrink-0 md:h-[240px] md:max-w-[520px]">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={photo.alt}
                className="absolute bottom-4 h-[140px] w-[110px] origin-bottom cursor-pointer overflow-hidden rounded-xl border-[3px] border-white shadow-lg dark:border-neutral-800 md:h-[165px] md:w-[130px]"
                style={{
                  zIndex: photo.z,
                  left: `${i * 22 + 8}%`,
                }}
                custom={i}
                variants={fanVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  y: -16,
                  scale: 1.08,
                  zIndex: 10,
                  transition: { duration: 0.25, ease: "easeOut" },
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
