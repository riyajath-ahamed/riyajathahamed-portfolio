"use client";

import { useId, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;
  const sampleX = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sampleY = (t: number) => ((ay * t + by) * t + cy) * t;
  const sampleDX = (t: number) => (3 * ax * t + 2 * bx) * t + cx;

  return (progress: number) => {
    if (progress <= 0) return 0;
    if (progress >= 1) return 1;
    let t = progress;
    for (let i = 0; i < 6; i++) {
      const slope = sampleDX(t);
      if (slope === 0) break;
      const next = t - (sampleX(t) - progress) / slope;
      if (Math.abs(next - t) < 1e-5) {
        t = next;
        break;
      }
      t = next;
    }
    return sampleY(Math.min(1, Math.max(0, t)));
  };
}

export const easeOutStrong = cubicBezier(0.23, 1, 0.32, 1);
export const easeInOutStrong = cubicBezier(0.77, 0, 0.175, 1);
export const easeDrawer = cubicBezier(0.32, 0.72, 0, 1);

const clawPaths = [
  "M620 104c18-44 62-62 96-32 20 18 10 52-14 74-28-8-54-20-82-42z",
  "M688 112c24-40 72-48 98-14 16 22 0 52-28 68-24-12-48-28-70-54z",
  "M752 140c34-30 78-20 92 18 10 26-14 50-44 60-18-20-34-46-48-78z",
  "M806 188c38-18 76 2 78 40 2 28-26 44-56 42-8-26-14-52-22-82z",
  "M838 250c34-4 62 24 50 56-10 24-40 30-64 16 0-24 4-48 14-72z",
  "M842 320c28 10 44 42 24 66-18 20-48 10-64-10 6-22 18-42 40-56z",
];

const particles = [
  [588, 122, 5],
  [654, 74, 3.5],
  [730, 92, 4],
  [812, 126, 3],
  [876, 192, 4.5],
  [902, 266, 3],
  [884, 354, 4],
  [774, 244, 2.5],
  [936, 232, 3],
  [548, 160, 3],
] as const;

export function GreatWave({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label="The Great Wave off Kanagawa"
    >
      <g id="sky" className="gw-sky">
        <rect className="gw-paper" width="1200" height="800" />
        <circle className="gw-sun" cx="1030" cy="128" r="68" />
        <path className="gw-cloud" d="M712 172c48-28 102-22 134 8 38-42 112-38 142 12 44-18 92 2 106 38H680c2-22 12-42 32-58z" />
      </g>

      <g id="mount-fuji" className="gw-fuji">
        <path className="gw-fuji-body gw-inkline" strokeWidth="2" d="M746 506 910 286l190 220H746z" />
        <path className="gw-snow" d="m910 286 62 72-32-12-24 32-28-30-42 16 64-78z" />
        <path className="gw-inkline" d="M836 438c44-18 100-18 150 2" fill="none" strokeWidth="1.5" />
      </g>

      <g className="gw-water-rig">
      <g id="water" className="gw-water">
        <path className="gw-water-light" d="M0 478c142-42 286 28 428-10 184-50 340 26 504-16 86-22 174 4 268-6v354H0V478z" />
        <path className="gw-indigo" d="M0 538c156-38 302 26 454-10 176-42 334 32 496-12 82-20 164 8 250-4v288H0V538z" />
        <path className="gw-indigo-deep" d="M0 644c176-30 324 24 508-12 170-34 304 24 464-8 76-14 148 4 228 0v176H0V644z" />
        <path className="gw-foam-stroke" d="M0 520c154-44 298 26 448-12 178-44 338 30 496-12 84-22 166 8 256-6" fill="none" strokeWidth="8" />
        <path className="gw-inkline" d="M0 586c160-32 304 22 464-8 170-34 318 22 484-10 88-16 166 4 252-2" fill="none" strokeWidth="2" />
      </g>
      </g>

      <g id="boat-1" className="gw-boat">
        <path className="gw-boat-fill gw-inkline" strokeWidth="2" d="M760 486c58-22 132-18 196 8l-30 28c-58 12-118 4-170-18l4-18z" />
        <path className="gw-inkline" d="M792 482 920 506M832 474l-8 38M870 474l-6 42" fill="none" strokeWidth="2" />
      </g>
      <g id="boat-2" className="gw-boat">
        <path className="gw-boat-fill gw-inkline" strokeWidth="2" d="M916 550c48-18 110-14 162 8l-24 22c-48 10-98 4-140-14l2-16z" />
        <path className="gw-inkline" d="m950 546 100 24M990 540l-6 36" fill="none" strokeWidth="1.8" />
      </g>
      <g id="boat-3" className="gw-boat">
        <path className="gw-boat-fill gw-inkline" strokeWidth="1.8" d="M660 574c38-14 88-10 126 8l-18 18c-38 6-74 0-108-14v-12z" />
      </g>

      <g className="gw-shadow-rig">
      <g id="wave-shadow" className="gw-shadow">
        <path
          className="gw-indigo-deep"
          d="M-36 800V466C100 428 150 270 304 166 448 68 638 62 782 128c82 38 144 98 180 174-106-58-224-62-330-18-104 44-184 132-218 238-30 96-14 198 42 278H-36Z"
        />
        <path className="gw-shadow-line" d="M176 694c-52-166-2-340 136-444 120-92 286-112 430-52" fill="none" strokeWidth="18" />
      </g>
      </g>

      <g className="gw-base-rig">
      <g id="wave-base" className="gw-base">
        <path
          className="gw-indigo"
          d="M-20 800V444C112 410 164 258 314 158 448 68 620 62 754 118c82 34 142 86 178 154-98-44-202-40-296 2-100 44-176 130-210 232-34 104-12 212 58 294H-20Z"
        />
        <path className="gw-wave-rib gw-foam-stroke" d="M138 704c-54-160-2-326 126-424 108-82 252-108 386-70" fill="none" strokeWidth="12" />
        <path className="gw-wave-rib gw-foam-stroke" d="M204 742c-46-144 4-292 118-374 94-66 212-82 320-52" fill="none" strokeWidth="7" />
        <path className="gw-wave-rib gw-inkline" d="M282 770c-34-122 10-246 102-310 72-50 164-66 250-42" fill="none" strokeWidth="3" />
      </g>
      </g>

      <g className="gw-foam-rig">
      <g id="wave-foam" className="gw-foam">
        <path className="gw-foam-fill gw-inkline" strokeWidth="2" d="M246 172c132-98 340-106 480-10 62 42 102 104 112 172-40-50-86-92-146-118-124-54-274-24-370 76-38 40-60 12-76-120z" />
        <path className="gw-indigo" d="M340 188c108-58 250-56 350 14-118-34-234-14-326 62l-24-76z" />
        <path className="gw-foam-fill" d="M322 292c42-44 94-72 150-84-48 30-86 68-108 116l-42-32z" />
      </g>
      </g>

      <g id="wave-claws">
        {clawPaths.map((d) => (
          <g key={d} className="gw-claw-rig">
            <g className="gw-claw">
              <path className="gw-foam-fill gw-inkline" d={d} strokeWidth="1.25" />
            </g>
          </g>
        ))}
      </g>

      <g id="particles">
        {particles.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} className="gw-particle gw-foam-fill" cx={cx} cy={cy} r={r} />
        ))}
      </g>

      <g id="seal" className="gw-seal">
        <rect className="gw-seal-fill" x="78" y="688" width="34" height="34" />
        <rect className="gw-paper" x="86" y="696" width="18" height="18" />
      </g>
    </svg>
  );
}

export function WaveMark({ variant }: { variant: "curl" | "claws" | "horizon" }) {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden>
      <rect className="gw-paper" width="320" height="180" />
      {variant === "curl" && (
        <>
          <path className="gw-indigo-deep" d="M-10 190C0 120 20 60 70 36 130 8 200 20 250 62c28 24 36 58 20 90-20-30-40-52-78-60-50-10-90 16-110 52-8 14-22 8-22-10 0-28 36-40 58-22 16 14 6 36-16 36-20 0-32-16-24-32 10-20 36-16 36 4" />
          <path className="gw-indigo" d="M0 170C10 110 36 58 86 36 146 10 214 28 258 70c24 24 28 54 10 82-22-28-48-46-86-50-46-6-80 20-96 54-6 12-20 6-18-12 4-24 36-32 54-16 14 12 4 32-16 30-18-2-28-16-20-30 8-16 32-12 30 6" />
          <path className="gw-foam-fill" d="M120 48c40-16 78-6 100 18 8-20-4-36-28-44-36-12-64 6-72 26z" />
        </>
      )}
      {variant === "claws" && (
        <>
          <path className="gw-indigo" d="M20 150c40-70 90-90 150-70 40 14 60 40 70 70-30-20-60-24-100-8-36 14-70 10-120 8z" />
          <path className="gw-foam-fill gw-inkline" strokeWidth="1.2" d="M150 46c22-14 48-4 54 16 6 18-10 32-26 30-14-14-22-32-28-46z" />
          <path className="gw-foam-fill gw-inkline" strokeWidth="1.2" d="M196 70c24-4 40 14 40 34 0 16-16 26-30 18-4-16-8-34-10-52z" />
          <path className="gw-foam-fill gw-inkline" strokeWidth="1.2" d="M230 108c18 8 22 32 10 46-12 12-30 4-34-10 0-14 10-28 24-36z" />
          <path className="gw-ink" d="M70 132c16-8 40-8 54 2l-8 10c-14 4-32 2-46-4v-8z" />
        </>
      )}
      {variant === "horizon" && (
        <>
          <path className="gw-fuji-body" d="M150 130c16 0 28-36 58-78 8-12 20-4 24 14 10-20 22-28 36-12 18 30 34 76 26 76H150z" />
          <path className="gw-snow" d="M208 52l12 22-8 4 10 20h-28l8-18-8-2 14-26z" />
          <path className="gw-indigo" d="M0 118c40-12 70 10 110-2 40-12 80 8 120-4 30-6 60 2 90-2v70H0v-62z" />
          <path className="gw-indigo-deep" d="M0 142c50-8 80 8 130-2 40-8 70 6 110-2 24-4 50 2 80 0v44H0v-40z" />
        </>
      )}
    </svg>
  );
}

export function bindWaveBreak(panel: HTMLElement) {
  const scroller = panel.querySelector<HTMLElement>("[data-ikigai-scroll]");
  const stage = panel.querySelector<HTMLElement>("[data-wave-stage]");
  const endTrigger = panel.querySelector<HTMLElement>("[data-wave-deconstruct-end]");
  if (!scroller || !stage || !endTrigger) return;

  const claws = gsap.utils.toArray<SVGElement>(".gw-claw", panel);
  const clawRigs = gsap.utils.toArray<SVGElement>(".gw-claw-rig", panel);
  const dots = gsap.utils.toArray<SVGElement>(".gw-particle", panel);
  const boats = gsap.utils.toArray<SVGElement>(".gw-boat", panel);
  const fragments = gsap.utils.toArray<HTMLElement>(".gw-fragment", panel);
  const quote = panel.querySelector<HTMLElement>("[data-wave-ikigai]");
  const cue = panel.querySelector<HTMLElement>("[data-wave-cue]");
  const base = panel.querySelector<SVGElement>(".gw-base");
  const shadow = panel.querySelector<SVGElement>(".gw-shadow");
  const foam = panel.querySelector<SVGElement>(".gw-foam");
  const water = panel.querySelector<SVGElement>(".gw-water");
  const baseRig = panel.querySelector<SVGElement>(".gw-base-rig");
  const shadowRig = panel.querySelector<SVGElement>(".gw-shadow-rig");
  const foamRig = panel.querySelector<SVGElement>(".gw-foam-rig");
  const waterRig = panel.querySelector<SVGElement>(".gw-water-rig");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const narrow = window.matchMedia("(max-width: 767px)").matches;

  if (reduced) {
    gsap.set(shadowRig, { x: 10, y: 16 });
    gsap.set(foamRig, { x: -4, y: -12 });
    gsap.set(baseRig, { y: 4 });
    gsap.set(waterRig, { y: 8 });
    gsap.set(clawRigs, { y: (index: number) => -4 - (index % 3) * 2 });
    return;
  }

  if (narrow) {
    gsap.set(baseRig, { y: 64, x: -16, rotation: -2 });
    gsap.set(shadowRig, { y: 36, x: 12, rotation: 1.4 });
    gsap.set(foamRig, { y: -78, x: 14, rotation: -3 });
    gsap.set(waterRig, { y: 40 });
    gsap.set(clawRigs, {
      x: (index: number) => 8 + index * 3,
      y: (index: number) => -16 - index * 6,
    });
    if (quote) gsap.set(quote, { autoAlpha: 1 });
    return;
  }

  panel.classList.add("is-motion");
  gsap.set(shadowRig, { x: 10, y: 16 });
  gsap.set(foamRig, { x: -4, y: -12 });
  gsap.set(baseRig, { y: 4 });
  gsap.set(waterRig, { y: 8 });
  gsap.set(clawRigs, { y: (index: number) => -4 - (index % 3) * 2 });

  const life = gsap.timeline({
    repeat: -1,
    yoyo: true,
    defaults: { ease: "sine.inOut", duration: 2.4 },
  });
  life
    .to(base, { y: -8 }, 0)
    .to(shadow, { y: 5 }, 0)
    .to(foam, { y: -7, rotation: -1.4 }, 0)
    .to(water, { y: 6 }, 0)
    .to(boats, { y: (index) => -3 - index, rotation: (index) => (index - 1) * 1.2, duration: 2.2 }, 0)
    .to(claws, { rotation: (index) => (index % 2 === 0 ? -3 : 3), duration: 1.8, stagger: 0.05 }, 0)
    .to(dots, { y: -9, duration: 2, stagger: 0.04 }, 0);

  const cueIn = cue
    ? gsap.to(cue, { autoAlpha: 1, duration: 0.35, delay: 0.55, ease: easeOutStrong })
    : null;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "true");
        observer.unobserve(entry.target);
      }
    },
    { root: scroller, rootMargin: "0px 0px -15% 0px" },
  );
  fragments.forEach((fragment) => observer.observe(fragment));

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      scroller,
      trigger: stage,
      start: "top top",
      endTrigger,
      end: "bottom bottom",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  if (cue) timeline.to(cue, { autoAlpha: 0, duration: 0.12 }, 0);
  timeline
    .to(baseRig, { y: 64, x: -16, rotation: -2, duration: 0.7 }, 0.12)
    .to(shadowRig, { y: 36, x: 12, rotation: 1.4, duration: 0.7 }, 0.12)
    .to(foamRig, { y: -78, x: 14, rotation: -3, duration: 0.7 }, 0.12)
    .to(waterRig, { y: 40, duration: 0.7 }, 0.12)
    .to(
      clawRigs,
      {
        x: (index) => 8 + index * 3,
        y: (index) => -16 - index * 6,
        duration: 0.7,
        stagger: 0.01,
      },
      0.14,
    );
  if (quote) {
    timeline.fromTo(
      quote,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.28, immediateRender: false },
      0.48,
    );
    timeline.set(quote, { autoAlpha: 1 }, 1);
  }

  return () => {
    observer.disconnect();
    panel.classList.remove("is-motion");
    cueIn?.kill();
    life.kill();
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
}

const WAVE_BODY =
  "M-48 660 L-48 214 C8 168 86 142 168 158 C248 174 318 148 392 186 C456 220 492 286 458 348 C408 292 332 258 274 296 C214 336 198 408 232 470 C266 532 214 598 148 640 C78 684 8 660 -48 660 Z";
const WAVE_HOLLOW =
  "M64 548 C48 420 108 300 196 236 C248 198 292 220 270 274 C248 328 186 340 178 408 C170 476 214 528 164 574 C128 536 82 578 64 548 Z";
const WAVE_LIP =
  "M156 168 C236 138 318 132 392 176 C448 214 478 268 452 324";
const FOREGROUND =
  "M-80 524 C70 486 168 552 276 514 C392 474 486 556 600 508 C690 478 760 524 800 500 L800 700 L-80 700 Z";

const dioClaws = [
  "M292 162 C348 118 424 102 492 124 C438 136 372 158 312 180 C298 168 292 166 292 162 Z",
  "M338 186 C404 154 478 150 538 178 C476 190 408 202 350 210 C340 196 336 190 338 186 Z",
  "M382 224 C446 206 514 214 566 248 C506 246 446 250 388 252 C380 236 378 230 382 224 Z",
  "M414 268 C472 262 528 286 562 326 C512 312 462 304 416 298 C410 282 410 274 414 268 Z",
  "M424 318 C474 328 518 362 534 404 C492 376 454 358 418 348 C416 332 418 324 424 318 Z",
  "M390 358 C432 382 464 422 468 462 C438 428 408 400 384 378 C382 366 384 360 390 358 Z",
];

const dioSpray = [
  [508, 112, 3],
  [552, 166, 2.5],
  [578, 236, 3.2],
  [548, 300, 2.4],
  [470, 108, 2.2],
  [590, 196, 2],
] as const;

function Plane({
  depth,
  swell = 0,
  delay = 0,
  restX = 0,
  restY = 0,
  children,
}: {
  depth: number;
  swell?: number;
  delay?: number;
  restX?: number;
  restY?: number;
  children: ReactNode;
}) {
  return (
    <g className="dio-plane" data-depth={depth} data-restx={restX} data-resty={restY}>
      <g
        className={swell ? "dio-swell" : undefined}
        data-swell={swell || undefined}
        data-delay={swell ? delay : undefined}
      >
        {children}
      </g>
    </g>
  );
}

export function WaveDiorama({ className }: { className?: string }) {
  const grainId = `dio-grain-${useId().replace(/:/g, "")}`;

  return (
    <div data-wave-diorama="" className={`gw-diorama ${className ?? ""}`}>
      <svg
        data-dio-sheet=""
        viewBox="0 0 640 584"
        className="dio-sheet h-full w-full"
        aria-hidden
      >
        <defs>
          <filter id={grainId} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.55" />
            </feComponentTransfer>
          </filter>
        </defs>

        <rect className="gw-paper" x="-40" y="-40" width="720" height="680" />

        <Plane depth={3} swell={2} delay={-0.8}>
          <path
            className="gw-cloud"
            d="M430 86c34-24 80-16 104 10 30-34 90-28 112 14 32-12 68 6 76 32H414c4-20 8-40 16-56z"
          />
        </Plane>

        <Plane depth={3} restX={7} restY={10}>
          <path className="dio-shadow" d="M486 378 582 228l118 150H486z" />
        </Plane>
        <Plane depth={6}>
          <path className="gw-fuji-body gw-inkline" strokeWidth="2" d="M478 368 574 214l122 154H478z" />
          <path className="gw-snow" d="m574 214 34 42-18-6-14 22-16-18-24 12 38-52z" />
          <path className="gw-inkline" d="M530 312c32-12 72-12 108 4" fill="none" strokeWidth="1.5" />
        </Plane>

        <Plane depth={5} swell={4} delay={-0.2}>
          <path
            className="gw-water-light"
            d="M-80 352c120-36 230 42 360-8 130-48 250 28 430-18l70 8v130H-80V352z"
          />
        </Plane>
        <Plane depth={7} swell={5} delay={-1.1}>
          <path
            className="gw-indigo"
            d="M-80 414c140-34 240 48 380-4 120-42 230 30 400-12l80 6v160H-80V414z"
          />
          <path
            className="gw-foam-stroke"
            d="M-40 424c130-28 230 36 360-6 120-36 220 24 360-10"
            fill="none"
            strokeWidth="5"
          />
        </Plane>
        <Plane depth={9} swell={4} delay={-1.8}>
          <path
            className="gw-indigo-deep"
            d="M-80 478c150-28 250 40 400-6 130-38 220 26 390-8l70 4v180H-80V478z"
          />
        </Plane>

        <Plane depth={6} swell={2} delay={-0.5} restX={6} restY={8}>
          <path className="dio-shadow" d="M448 468c62-18 132-14 186 16l-22 18c-58 8-118 2-168-16l4-18z" />
          <path className="dio-shadow" d="M508 418c48-14 104-10 146 14l-16 14c-46 6-92 2-132-14l2-14z" />
          <path className="dio-shadow" d="M562 376c36-12 78-8 108 12l-12 12c-34 4-68 0-98-12l2-12z" />
        </Plane>
        <Plane depth={11} swell={3} delay={-0.5}>
          <path className="gw-boat-fill gw-inkline" strokeWidth="1.7" d="M440 458c62-18 132-14 186 16l-22 18c-58 8-118 2-168-16l4-18z" />
          <path className="gw-inkline" d="M468 452 590 478M512 444l-6 34M556 442l-5 38M598 446l-4 32" fill="none" strokeWidth="1.5" />
          <path className="gw-boat-fill gw-inkline" strokeWidth="1.5" d="M500 408c48-14 104-10 146 14l-16 14c-46 6-92 2-132-14l2-14z" />
          <path className="gw-inkline" d="m524 402 96 24M562 394l-5 30M604 396l-4 28" fill="none" strokeWidth="1.35" />
          <path className="gw-boat-fill gw-inkline" strokeWidth="1.35" d="M554 366c36-12 78-8 108 12l-12 12c-34 4-68 0-98-12l2-12z" />
          <path className="gw-inkline" d="m574 360 72 18M608 354l-4 24" fill="none" strokeWidth="1.2" />
        </Plane>

        <Plane depth={8} swell={4} delay={-0.4} restX={14} restY={18}>
          <path className="dio-shadow" d={WAVE_BODY} />
        </Plane>
        <Plane depth={14} swell={7} delay={-0.4}>
          <path className="gw-indigo" d={WAVE_BODY} />
          <path className="gw-indigo-deep" d={WAVE_HOLLOW} />
          <path className="gw-foam-stroke" d="M28 560C18 420 78 286 168 214" fill="none" strokeWidth="8" />
          <path className="gw-foam-stroke" d="M64 582C52 440 124 308 220 232" fill="none" strokeWidth="4.5" />
          <path className="gw-shadow-line" d="M102 596C90 462 164 338 268 252" fill="none" strokeWidth="2.25" />
        </Plane>

        <Plane depth={10} swell={5} delay={-0.9} restX={8} restY={12}>
          <path className="dio-shadow-stroke" d={WAVE_LIP} strokeWidth="16" strokeLinecap="round" />
        </Plane>
        <Plane depth={16} swell={8} delay={-0.9}>
          <path className="gw-foam-stroke" d={WAVE_LIP} fill="none" strokeWidth="11" strokeLinecap="round" />
        </Plane>

        <Plane depth={11} swell={4} delay={-1.3} restX={8} restY={12}>
          {dioClaws.map((d) => (
            <path key={d} className="dio-shadow" d={d} />
          ))}
        </Plane>
        {dioClaws.map((d, index) => (
          <Plane key={d} depth={18} swell={6} delay={-0.35 * index}>
            <path className="gw-foam-fill gw-inkline" strokeWidth="1.2" d={d} />
          </Plane>
        ))}

        <Plane depth={19} swell={5} delay={-1.6}>
          {dioSpray.map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} className="gw-foam-fill" cx={cx} cy={cy} r={r} />
          ))}
        </Plane>

        <Plane depth={12} swell={3} delay={-0.6} restX={8} restY={12}>
          <path className="dio-shadow" d={FOREGROUND} />
        </Plane>
        <Plane depth={22} swell={6} delay={-0.6}>
          <path className="gw-indigo" d={FOREGROUND} />
          <path
            className="gw-foam-stroke"
            d="M-40 530c130-40 220 36 340-8 130-48 220 40 360-18"
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
          />
        </Plane>

        <rect className="dio-grain" x="0" y="0" width="640" height="584" filter={`url(#${grainId})`} />
      </svg>
    </div>
  );
}

export function bindDiorama(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>("[data-wave-diorama]");
  const sheet = stage?.querySelector<SVGElement>("[data-dio-sheet]");
  if (!stage || !sheet) return () => {};

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const planes = gsap.utils.toArray<SVGElement>("[data-depth]", stage).map((el) => ({
    el,
    depth: Number(el.dataset.depth) || 0,
    restX: Number(el.dataset.restx) || 0,
    restY: Number(el.dataset.resty) || 0,
  }));

  if (reduced) {
    planes.forEach((plane) => {
      gsap.set(plane.el, { x: plane.restX, y: plane.restY });
    });
    return () => {};
  }

  const swellTweens = gsap.utils.toArray<SVGElement>(".dio-swell", stage).map((el) => {
    const distance = Number(el.dataset.swell) || 0;
    const shift = Number(el.dataset.delay) || 0;
    const tween = gsap.to(el, {
      y: distance,
      duration: 4.2,
      ease: easeInOutStrong,
      repeat: -1,
      yoyo: true,
    });
    if (shift < 0) tween.time(Math.min(4.2, Math.abs(shift)));
    return tween;
  });

  const swellObserver = new IntersectionObserver(([entry]) => {
    swellTweens.forEach((tween) => {
      if (entry?.isIntersecting) tween.play();
      else tween.pause();
    });
  });
  swellObserver.observe(stage);

  let live = false;
  const intro = gsap.timeline({
    paused: true,
    defaults: { ease: easeOutStrong },
    onComplete: () => {
      live = true;
    },
  });
  planes.forEach((plane) => {
    const band = Math.min(5, Math.round(plane.depth / 4));
    intro.fromTo(
      plane.el,
      { y: plane.restY + 12, autoAlpha: 0 },
      { y: plane.restY, x: plane.restX, autoAlpha: 1, duration: 0.45 },
      band * 0.06,
    );
  });

  const playIntro = () => {
    if (intro.progress() > 0) return;
    intro.play(0);
  };
  const trigger = ScrollTrigger.create({
    trigger: root,
    start: "top 88%",
    once: true,
    onEnter: playIntro,
  });
  if (root.getBoundingClientRect().top < window.innerHeight * 0.92) playIntro();

  const follow = fine
    ? {
        x: gsap.quickTo(sheet, "rotateY", { duration: 0.5, ease: easeOutStrong }),
        y: gsap.quickTo(sheet, "rotateX", { duration: 0.5, ease: easeOutStrong }),
        planes: planes.map((plane) => ({
          plane,
          x: gsap.quickTo(plane.el, "x", { duration: 0.5, ease: easeOutStrong }),
          y: gsap.quickTo(plane.el, "y", { duration: 0.5, ease: easeOutStrong }),
        })),
      }
    : null;

  const settle = (nx: number, ny: number) => {
    if (!follow) return;
    follow.y(ny * -4.5);
    follow.x(nx * 5.5);
    for (const mover of follow.planes) {
      mover.x(mover.plane.restX + nx * mover.plane.depth);
      mover.y(mover.plane.restY + ny * mover.plane.depth * 0.6);
    }
  };

  const onMove = (event: PointerEvent) => {
    if (!live) return;
    const rect = stage.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    settle(
      ((event.clientX - rect.left) / rect.width - 0.5) * 2,
      ((event.clientY - rect.top) / rect.height - 0.5) * 2,
    );
  };
  const onLeave = () => {
    if (!live) return;
    settle(0, 0);
  };
  if (fine) {
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
  }

  return () => {
    swellObserver.disconnect();
    swellTweens.forEach((tween) => tween.kill());
    trigger.kill();
    intro.kill();
    gsap.killTweensOf(sheet);
    gsap.killTweensOf(planes.map((plane) => plane.el));
    root.removeEventListener("pointermove", onMove);
    root.removeEventListener("pointerleave", onLeave);
  };
}
