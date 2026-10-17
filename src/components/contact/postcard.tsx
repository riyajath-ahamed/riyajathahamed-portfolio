"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

const LANDSCAPE = { w: 740, h: 480 };
const PORTRAIT = { w: 360, h: 540 };
const SPRING = { type: "spring" as const, duration: 0.52, bounce: 0.16 };

type Size = { w: number; h: number };
type Pose = { x: number; y: number; scale: number };

const city = DATA.location.split(",")[0]?.trim() || DATA.location;

function fitPose(rect: DOMRect, card: Size, pad = 0): Pose {
  const scale = Math.min(
    (rect.width - pad * 2) / card.w,
    (rect.height - pad * 2) / card.h,
  );
  const width = card.w * scale;
  const height = card.h * scale;
  return {
    scale,
    x: rect.left + (rect.width - width) / 2,
    y: rect.top + (rect.height - height) / 2,
  };
}

function openPose(card: Size): Pose {
  const margin = 28;
  const scale = Math.min(
    1.15,
    (window.innerWidth - margin * 2) / card.w,
    (window.innerHeight - margin * 2) / card.h,
  );
  const width = card.w * scale;
  const height = card.h * scale;
  return {
    scale,
    x: (window.innerWidth - width) / 2,
    y: (window.innerHeight - height) / 2,
  };
}

function Airmail() {
  return (
    <div
      aria-hidden
      className="h-3.5 w-full shrink-0 bg-[repeating-linear-gradient(-45deg,#e8413c_0_8px,#f4efe2_8px_13px,#1d4e89_13px_21px,#f4efe2_21px_26px)]"
    />
  );
}

function Stamp({ className }: { className?: string }) {
  return (
    <Image
      src="/hero/herostamp.png"
      alt=""
      width={1145}
      height={1374}
      className={cn(
        "h-auto rotate-[8deg] drop-shadow-[0_6px_10px_rgba(40,28,16,0.22)] transition-transform duration-300 ease-out group-hover:rotate-0 group-hover:scale-105",
        className,
      )}
    />
  );
}

function PostcardCanvas({
  portrait,
  interactive,
  titleId,
}: {
  portrait: boolean;
  interactive?: boolean;
  titleId?: string;
}) {
  const email = interactive ? (
    <a
      href={`mailto:${DATA.contact.email}`}
      className="underline decoration-[#e8413c]/70 underline-offset-[5px] transition-colors hover:text-[#9d2b28]"
    >
      {DATA.contact.email}
    </a>
  ) : (
    <span>{DATA.contact.email}</span>
  );

  return (
    <article className="flex h-full w-full flex-col bg-[#f4efe2] text-[#2c261c]">
      <Airmail />
      <div
        className={cn(
          "grid min-h-0 flex-1",
          portrait ? "grid-rows-[auto_1fr_auto]" : "grid-cols-[1.45fr_0.9fr]",
        )}
      >
        <div className={cn("flex min-w-0 flex-col", portrait ? "px-6 pt-5" : "px-9 py-6")}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#1d4e89]/75">
            Postcard · {city}
          </p>
          <div
            className={cn(
              "font-hand text-[#2c261c]",
              portrait ? "mt-4 text-[22px] leading-[34px]" : "mt-4 text-[26px] leading-[40px]",
            )}
            style={{
              backgroundImage:
                "linear-gradient(transparent calc(100% - 1px), rgba(29,78,137,0.22) calc(100% - 1px))",
              backgroundSize: portrait ? "100% 34px" : "100% 40px",
            }}
          >
            <p id={titleId}>Hello —</p>
            <p>I&apos;m in {city}, building interfaces that stay calm when the work is not.</p>
            <p>If something hard needs a careful front end, send a note. I read every one.</p>
          </div>
          <p className={cn("font-hand", portrait ? "mt-4 text-[22px]" : "mt-auto pt-4 text-[26px]")}>
            — {DATA.name.split(" ")[0]}
          </p>
        </div>

        <div
          className={cn(
            "relative flex min-w-0 flex-col items-center",
            portrait
              ? "border-t border-dashed border-[#2c261c]/20 px-6 py-4"
              : "border-l border-dashed border-[#2c261c]/20 px-6 py-6",
          )}
        >
          <Stamp className={portrait ? "w-[78px]" : "mt-1 w-[112px]"} />
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute grid -rotate-12 place-items-center rounded-full border-[3px] border-dashed border-[#1d4e89]/65 text-center font-mono uppercase leading-tight tracking-[0.14em] text-[#1d4e89]/75",
              portrait
                ? "right-6 top-2 size-[72px] text-[8px]"
                : "right-7 top-14 size-[92px] text-[10px]",
            )}
          >
            {city}
            <br />
            posted
          </div>
          <address
            className={cn(
              "text-center not-italic",
              portrait ? "mt-3 font-hand text-[18px] leading-snug" : "mt-auto font-hand text-[22px] leading-snug",
            )}
          >
            <span className="block">{DATA.name}</span>
            <span className="block">{DATA.location}</span>
          </address>
          <p className={cn("font-mono text-[#2c261c]/80", portrait ? "mt-2 text-[11px]" : "mt-3 text-[13px]")}>
            {email}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function Postcard({ className }: { className?: string }) {
  const reduce = useReducedMotion() === true;
  const titleId = useId();
  const slotRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  const [portrait, setPortrait] = useState(false);
  const [slotScale, setSlotScale] = useState(0.4);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [flying, setFlying] = useState(false);

  const card = portrait ? PORTRAIT : LANDSCAPE;
  const cardRef = useRef(card);
  cardRef.current = card;
  const openRef = useRef(false);
  openRef.current = open;
  const runRef = useRef(0);

  const measureSlot = useCallback(() => {
    const slot = slotRef.current;
    if (!slot) return 0.4;
    const rect = slot.getBoundingClientRect();
    const next = fitPose(rect, cardRef.current, 8).scale;
    setSlotScale(next);
    setReady(true);
    return next;
  }, []);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const apply = () => setPortrait(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useLayoutEffect(() => {
    measureSlot();
    const slot = slotRef.current;
    if (!slot) return;
    const observer = new ResizeObserver(() => measureSlot());
    observer.observe(slot);
    return () => observer.disconnect();
  }, [measureSlot, portrait]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!flying) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [flying]);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        void closeCard();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => {
      const to = openPose(cardRef.current);
      const transition = reduce ? { duration: 0 } : SPRING;
      animate(x, to.x, transition);
      animate(y, to.y, transition);
      animate(scale, to.scale, transition);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open, reduce, scale, x, y]);

  function transition() {
    return reduce ? { duration: 0 } : SPRING;
  }

  function openCard() {
    const slot = slotRef.current;
    if (!slot || openRef.current) return;
    const from = fitPose(slot.getBoundingClientRect(), cardRef.current, 8);
    const to = openPose(cardRef.current);
    const id = ++runRef.current;
    x.set(from.x);
    y.set(from.y);
    scale.set(from.scale);
    setFlying(true);
    setOpen(true);
    const motion = transition();
    void Promise.all([
      animate(x, to.x, motion),
      animate(y, to.y, motion),
      animate(scale, to.scale, motion),
    ]).then(() => {
      if (runRef.current !== id) return;
    });
  }

  async function closeCard() {
    const slot = slotRef.current;
    if (!slot || !openRef.current) return;
    const id = ++runRef.current;
    setOpen(false);
    const from = fitPose(slot.getBoundingClientRect(), cardRef.current, 8);
    const motion = transition();
    await Promise.all([
      animate(x, from.x, motion),
      animate(y, from.y, motion),
      animate(scale, from.scale, motion),
    ]);
    if (runRef.current !== id) return;
    setFlying(false);
    slotRef.current?.focus();
  }

  function trapTab(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Tab") return;
    const root = portalRef.current;
    if (!root) return;
    const items = Array.from(
      root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
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

  const flyer = flying ? (
    <div
      ref={portalRef}
      className="fixed inset-0 z-[80]"
      onKeyDown={trapTab}
    >
      <motion.button
        type="button"
        aria-label="Close postcard"
        className="absolute inset-0 bg-[#1c140c]/50 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.28, ease: [0.23, 1, 0.32, 1] }}
        onClick={() => void closeCard()}
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="absolute left-0 top-0"
        style={{
          width: card.w,
          height: card.h,
          x,
          y,
          scale,
          originX: 0,
          originY: 0,
          borderRadius: 22,
          overflow: "hidden",
          boxShadow: "0 24px 70px rgba(28, 20, 12, 0.38), 0 2px 8px rgba(28, 20, 12, 0.16)",
          zIndex: 81,
        }}
      >
        <PostcardCanvas portrait={portrait} interactive titleId={titleId} />
      </motion.div>
      <motion.button
        ref={closeRef}
        type="button"
        onClick={() => void closeCard()}
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 0.2, delay: open ? 0.12 : 0 }}
        className="absolute right-4 top-4 z-[82] inline-flex h-10 items-center gap-1.5 rounded-full bg-[#f4efe2] px-3.5 text-sm font-medium text-[#2c261c] shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-transform duration-150 ease-out hover:bg-white active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X className="size-4" aria-hidden />
        Close
      </motion.button>
    </div>
  ) : null;

  return (
    <>
      <button
        ref={slotRef}
        type="button"
        onClick={openCard}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`Open postcard from ${city}`}
        inert={open}
        className={cn(
          "group relative h-full min-h-[230px] w-full overflow-hidden rounded-[22px] border border-black/[0.05] bg-[#f6f6f7] text-left shadow-[0_1px_1px_rgba(0,0,0,0.03)] outline-none transition-shadow duration-300 hover:shadow-[0_10px_28px_rgba(20,20,20,0.08)] focus-visible:ring-2 focus-visible:ring-neutral-900/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[0.07] dark:bg-[#1a222e] dark:focus-visible:ring-white/70",
          className,
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute left-1/2 top-1/2 block",
            ready && !flying ? "opacity-100" : "opacity-0",
          )}
          style={{
            width: card.w,
            height: card.h,
            transform: `translate(-50%, -50%) scale(${slotScale})`,
            borderRadius: 22,
            overflow: "hidden",
            boxShadow: "0 10px 24px rgba(40, 28, 16, 0.12)",
          }}
        >
          <PostcardCanvas portrait={portrait} />
        </span>
        <span
          className={cn(
            "pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-[#2c261c]/70 shadow-[0_4px_12px_rgba(40,28,16,0.12)] transition-opacity duration-200",
            flying && "opacity-0",
          )}
        >
          Click to read
        </span>
      </button>
      {mounted && flyer ? createPortal(flyer, document.body) : null}
    </>
  );
}
