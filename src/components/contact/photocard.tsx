"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

const CARD_W = 320;
const CARD_H = 448;
const SPRING = { type: "spring" as const, duration: 0.5, bounce: 0.14 };

/**
 * Drop a file in /public/contact and set `src` (for example "/contact/photo-01.jpg").
 * Leave `src` unset to keep the placeholder frame.
 */
const PHOTOS: {
  id: string;
  src?: string;
  alt: string;
  caption: string;
  rot: number;
  x: number;
  z: number;
}[] = [
  {
    id: "01",
    alt: "From The 39th Floor",
    src: "/contact/photo-01.webp",
    caption: "From The 39th Floor",
    rot: -9,
    x: -34,
    z: 1,
  },
  {
    id: "02",
    alt: "At the river deck",
    src: "/contact/photo-02.webp",
    caption: "At the river deck",
    rot: 2,
    x: 6,
    z: 3,
  },
  {
    id: "03",
    alt: "Kayaking in the Hikka",
    src: "/contact/photo-04.webp",
    caption: "Kayaking in the Hikka",
    rot: 11,
    x: 42,
    z: 2,
  },
];

type Pose = { x: number; y: number; scale: number; rotate: number };

function openPose(): Pose {
  const margin = 24;
  const scale = Math.min(
    1.05,
    (window.innerWidth - margin * 2) / CARD_W,
    (window.innerHeight - margin * 2 - 72) / CARD_H,
  );
  return {
    scale,
    rotate: 0,
    x: (window.innerWidth - CARD_W) / 2,
    y: (window.innerHeight - CARD_H) / 2 - 12,
  };
}

function CardFace({
  photo,
  titleId,
}: {
  photo: (typeof PHOTOS)[number];
  titleId?: string;
}) {
  return (
    <div className="flex h-full w-full flex-col bg-[#fbf8f2] px-3 pb-4 pt-3 text-[#2c261c]">
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#e6dfd2]">
        {photo.src ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="420px"
            className="object-cover"
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[linear-gradient(165deg,#efe8da_0%,#e3d9c8_55%,#d7cdbb_100%)]">
            <span className="absolute left-2.5 top-2.5 font-mono text-[10px] tracking-[0.18em] text-[#2c261c]/40">
              {photo.id}
            </span>
            <span className="grid size-12 place-items-center rounded-full border border-dashed border-[#2c261c]/25">
              <span className="block h-5 w-6 rounded-[3px] border border-[#2c261c]/30" />
            </span>
            <span className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#2c261c]/45">
              Add photo
            </span>
          </div>
        )}
      </div>
      <p
        id={titleId}
        className="font-hand truncate px-1 pt-3 text-center text-[22px] leading-none"
      >
        {photo.caption}
      </p>
    </div>
  );
}

export default function PhotoCard({ className }: { className?: string }) {
  const reduce = useReducedMotion() === true;
  const titleId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const cardButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(0.34);
  const rotate = useMotionValue(0);

  const [slotScale, setSlotScale] = useState(0.34);
  const [hover, setHover] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [flying, setFlying] = useState(false);

  const scaleRef = useRef(slotScale);
  scaleRef.current = slotScale;
  const indexRef = useRef(index);
  indexRef.current = index;
  const openRef = useRef(false);
  openRef.current = open;
  const flyingRef = useRef(false);
  const runRef = useRef(0);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const next = Math.min((rect.width * 0.46) / CARD_W, ((rect.height - 40) * 0.78) / CARD_H);
    setSlotScale(Number.isFinite(next) && next > 0 ? next : 0.34);
  }, []);

  useLayoutEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(() => measure());
    observer.observe(stage);
    return () => observer.disconnect();
  }, [measure]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!flying) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [flying]);

  const frameFor = useCallback(
    (cardIndex: number) => {
      const photo = PHOTOS[cardIndex];
      const lifted = hover === cardIndex;
      return {
        offset: lifted ? photo.x * 1.65 : photo.x,
        scale: scaleRef.current * (lifted ? 1.05 : 1),
        rotate: lifted ? 0 : photo.rot,
        z: lifted ? 5 : photo.z,
      };
    },
    [hover],
  );

  const poseFromCard = useCallback(
    (cardIndex: number): Pose => {
      const node = cardButtonRefs.current[cardIndex];
      const frame = frameFor(cardIndex);
      if (!node) {
        return { x: 0, y: 0, scale: frame.scale, rotate: frame.rotate };
      }
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      return {
        x: cx - CARD_W / 2,
        y: cy - CARD_H / 2,
        scale: frame.scale,
        rotate: frame.rotate,
      };
    },
    [frameFor],
  );

  const motionTo = useCallback(
    (pose: Pose) => {
      const transition = reduce ? { duration: 0 } : SPRING;
      return Promise.all([
        animate(x, pose.x, transition),
        animate(y, pose.y, transition),
        animate(scale, pose.scale, transition),
        animate(rotate, pose.rotate, transition),
      ]);
    },
    [reduce, rotate, scale, x, y],
  );

  const closeCard = useCallback(async () => {
    if (!openRef.current) return;
    const id = ++runRef.current;
    const cardIndex = indexRef.current;
    setOpen(false);
    await motionTo(poseFromCard(cardIndex));
    if (runRef.current !== id) return;
    flyingRef.current = false;
    setFlying(false);
    cardButtonRefs.current[cardIndex]?.focus();
  }, [motionTo, poseFromCard]);

  const openCard = useCallback(
    (cardIndex: number) => {
      if (openRef.current || flyingRef.current || !stageRef.current) return;
      const from = poseFromCard(cardIndex);
      const id = ++runRef.current;
      indexRef.current = cardIndex;
      setIndex(cardIndex);
      x.set(from.x);
      y.set(from.y);
      scale.set(from.scale);
      rotate.set(from.rotate);
      flyingRef.current = true;
      setFlying(true);
      setOpen(true);
      void motionTo(openPose()).then(() => {
        if (runRef.current !== id) return;
      });
    },
    [motionTo, poseFromCard, rotate, scale, x, y],
  );

  useEffect(() => {
    if (!open) return;
    closeButtonRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        void closeCard();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setIndex((current) => {
          const next = (current + 1) % PHOTOS.length;
          indexRef.current = next;
          return next;
        });
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setIndex((current) => {
          const next = (current - 1 + PHOTOS.length) % PHOTOS.length;
          indexRef.current = next;
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCard, open]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      void motionTo(openPose());
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [motionTo, open]);

  function trapTab(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const root = portalRef.current;
    if (!root) return;
    const items = Array.from(
      root.querySelectorAll<HTMLElement>("button:not([disabled])"),
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  const active = PHOTOS[index] ?? PHOTOS[0];

  const flyer = flying ? (
    <div ref={portalRef} className="fixed inset-0 z-[80]" onKeyDown={trapTab}>
      <motion.button
        type="button"
        aria-label="Close photo"
        className="absolute inset-0 bg-[#14110e]/55 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
        onClick={() => void closeCard()}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute left-0 top-0 overflow-hidden shadow-[0_28px_70px_rgba(20,16,12,0.42)]"
        style={{
          width: CARD_W,
          height: CARD_H,
          x,
          y,
          scale,
          rotate,
          originX: 0.5,
          originY: 0.5,
          borderRadius: 4,
          zIndex: 81,
        }}
      >
        <CardFace photo={active} titleId={titleId} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.2, delay: open ? 0.12 : 0 }}
        className="absolute inset-x-0 bottom-5 z-[82] flex items-center justify-center gap-2"
      >
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() =>
            setIndex((current) => {
              const next = (current - 1 + PHOTOS.length) % PHOTOS.length;
              indexRef.current = next;
              return next;
            })
          }
          className="grid size-10 place-items-center rounded-full bg-[#fbf8f2] text-[#2c261c] shadow-[0_8px_20px_rgba(0,0,0,0.22)] transition-transform duration-150 ease-out hover:bg-white active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronLeft className="size-4" aria-hidden />
        </button>
        <span className="min-w-14 text-center font-mono text-[11px] tracking-[0.16em] text-white/85">
          {active.id} / {String(PHOTOS.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() =>
            setIndex((current) => {
              const next = (current + 1) % PHOTOS.length;
              indexRef.current = next;
              return next;
            })
          }
          className="grid size-10 place-items-center rounded-full bg-[#fbf8f2] text-[#2c261c] shadow-[0_8px_20px_rgba(0,0,0,0.22)] transition-transform duration-150 ease-out hover:bg-white active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronRight className="size-4" aria-hidden />
        </button>
      </motion.div>
      <motion.button
        ref={closeButtonRef}
        type="button"
        onClick={() => void closeCard()}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.2, delay: open ? 0.12 : 0 }}
        className="absolute right-4 top-4 z-[82] inline-flex h-10 items-center gap-1.5 rounded-full bg-[#fbf8f2] px-3.5 text-sm font-medium text-[#2c261c] shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-transform duration-150 ease-out hover:bg-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="size-4" aria-hidden />
        Close
      </motion.button>
    </div>
  ) : null;

  return (
    <>
      <div
        ref={stageRef}
        className={cn(
          "relative h-full min-h-[230px] overflow-hidden rounded-[22px] border border-black/[0.05] bg-[#f6f6f7] shadow-[0_1px_1px_rgba(0,0,0,0.03)] dark:border-white/[0.07] dark:bg-[#1a222e]",
          className,
        )}
        inert={flying}
      >
        {PHOTOS.map((photo, cardIndex) => {
          const frame = frameFor(cardIndex);
          const hidden = flying && index === cardIndex;
          return (
            <button
              key={photo.id}
              ref={(node) => {
                cardButtonRefs.current[cardIndex] = node;
              }}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open && index === cardIndex}
              aria-label={
                photo.src
                  ? `View photo: ${photo.caption}`
                  : `View photo ${photo.id} placeholder`
              }
              onMouseEnter={() => setHover(cardIndex)}
              onMouseLeave={() => setHover((current) => (current === cardIndex ? null : current))}
              onFocus={() => setHover(cardIndex)}
              onBlur={() => setHover((current) => (current === cardIndex ? null : current))}
              onClick={() => openCard(cardIndex)}
              className={cn(
                "absolute left-1/2 top-[42%] cursor-pointer rounded-[4px] shadow-[0_10px_22px_rgba(40,28,16,0.16)] transition-[transform,opacity] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-white/70",
                hidden && "opacity-0",
              )}
              style={{
                width: CARD_W,
                height: CARD_H,
                zIndex: frame.z,
                transformOrigin: "center center",
                transform: `translate(calc(-50% + ${frame.offset}px), -50%) rotate(${frame.rotate}deg) scale(${frame.scale})`,
              }}
            >
              <CardFace photo={photo} />
            </button>
          );
        })}
        {/* <span
          className={cn(
            "pointer-events-none absolute bottom-3 left-1/2 z-[6] -translate-x-1/2 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#2c261c]/70 shadow-[0_4px_12px_rgba(40,28,16,0.12)] transition-opacity duration-200",
            flying && "opacity-0",
          )}
        >
          Click to view
        </span> */}
      </div>
      {mounted && flyer ? createPortal(flyer, document.body) : null}
    </>
  );
}
