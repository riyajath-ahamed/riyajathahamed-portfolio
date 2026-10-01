"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

      <g id="water" className="gw-water">
        <path className="gw-water-light" d="M0 478c142-42 286 28 428-10 184-50 340 26 504-16 86-22 174 4 268-6v354H0V478z" />
        <path className="gw-indigo" d="M0 538c156-38 302 26 454-10 176-42 334 32 496-12 82-20 164 8 250-4v288H0V538z" />
        <path className="gw-indigo-deep" d="M0 644c176-30 324 24 508-12 170-34 304 24 464-8 76-14 148 4 228 0v176H0V644z" />
        <path className="gw-foam-stroke" d="M0 520c154-44 298 26 448-12 178-44 338 30 496-12 84-22 166 8 256-6" fill="none" strokeWidth="8" />
        <path className="gw-inkline" d="M0 586c160-32 304 22 464-8 170-34 318 22 484-10 88-16 166 4 252-2" fill="none" strokeWidth="2" />
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

      <g id="wave-shadow" className="gw-shadow">
        <path
          className="gw-indigo-deep"
          d="M-36 800V466C100 428 150 270 304 166 448 68 638 62 782 128c82 38 144 98 180 174-106-58-224-62-330-18-104 44-184 132-218 238-30 96-14 198 42 278H-36Z"
        />
        <path className="gw-shadow-line" d="M176 694c-52-166-2-340 136-444 120-92 286-112 430-52" fill="none" strokeWidth="18" />
      </g>

      <g id="wave-base" className="gw-base">
        <path
          className="gw-indigo"
          d="M-20 800V444C112 410 164 258 314 158 448 68 620 62 754 118c82 34 142 86 178 154-98-44-202-40-296 2-100 44-176 130-210 232-34 104-12 212 58 294H-20Z"
        />
        <path className="gw-wave-rib gw-foam-stroke" d="M138 704c-54-160-2-326 126-424 108-82 252-108 386-70" fill="none" strokeWidth="12" />
        <path className="gw-wave-rib gw-foam-stroke" d="M204 742c-46-144 4-292 118-374 94-66 212-82 320-52" fill="none" strokeWidth="7" />
        <path className="gw-wave-rib gw-inkline" d="M282 770c-34-122 10-246 102-310 72-50 164-66 250-42" fill="none" strokeWidth="3" />
      </g>

      <g id="wave-foam" className="gw-foam">
        <path className="gw-foam-fill gw-inkline" strokeWidth="2" d="M246 172c132-98 340-106 480-10 62 42 102 104 112 172-40-50-86-92-146-118-124-54-274-24-370 76-38 40-60 12-76-120z" />
        <path className="gw-indigo" d="M340 188c108-58 250-56 350 14-118-34-234-14-326 62l-24-76z" />
        <path className="gw-foam-fill" d="M322 292c42-44 94-72 150-84-48 30-86 68-108 116l-42-32z" />
      </g>

      <g id="wave-claws">
        {clawPaths.map((d) => (
          <g key={d} className="gw-claw">
            <path className="gw-foam-fill gw-inkline" d={d} strokeWidth="1.25" />
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
  const dots = gsap.utils.toArray<SVGElement>(".gw-particle", panel);
  const boats = gsap.utils.toArray<SVGElement>(".gw-boat", panel);
  const ribs = gsap.utils.toArray<SVGElement>(".gw-wave-rib", panel);
  const fragments = gsap.utils.toArray<HTMLElement>(".gw-fragment", panel);
  const drift = [-92, -38, 34, 88, 126, 160];
  const lift = [-54, -104, -138, -88, -42, 18];
  const spin = [-14, 9, 18, -12, 16, 24];
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) {
    gsap.set(fragments, { autoAlpha: 1, y: 0 });
    return;
  }

  gsap.set(fragments, { autoAlpha: 0, y: 22 });
  gsap.set(ribs, { strokeDasharray: 520, strokeDashoffset: 0 });

  const timeline = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      scroller,
      trigger: stage,
      start: "top top",
      endTrigger,
      end: "bottom bottom",
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });

  timeline
    .addLabel("activate", 0)
    .to(".gw-base", { rotation: 1.4, x: -10, y: -10, duration: 0.2 }, "activate")
    .to(".gw-shadow", { rotation: -0.8, x: 12, y: 7, duration: 0.2 }, "activate")
    .to(".gw-foam", { rotation: -2.8, x: 8, y: -14, duration: 0.2 }, "activate")
    .to(".gw-water", { x: -12, duration: 0.2 }, "activate")
    .to(boats, { x: (index) => 5 + index * 5, y: (index) => -3 + index * 2, duration: 0.2 }, "activate")
    .to(ribs, { strokeDashoffset: -42, duration: 0.2, stagger: 0.015 }, "activate")
    .to(claws, { y: -12, rotation: (index) => index * 1.5 - 4, duration: 0.18, stagger: 0.012 }, 0.02)
    .to(dots, { y: -16, duration: 0.2, stagger: 0.008 }, 0)
    .to(".gw-seal", { y: -8, rotation: -4, duration: 0.2 }, 0.05)
    .addLabel("foamBreak", 0.2)
    .to(
      claws,
      {
        x: (index) => drift[index] ?? 40,
        y: (index) => lift[index] ?? -40,
        rotation: (index) => spin[index] ?? 8,
        duration: 0.18,
        stagger: 0.01,
      },
      "foamBreak",
    )
    .to(
      dots,
      {
        x: (index) => (index % 2 === 0 ? -1 : 1) * (28 + index * 16),
        y: (index) => -36 - index * 12,
        opacity: 0.5,
        duration: 0.18,
        stagger: 0.008,
      },
      "foamBreak",
    )
    .to(".gw-foam", { x: 56, y: -62, rotation: -7, duration: 0.2 }, "foamBreak")
    .to(ribs, { strokeDashoffset: -180, autoAlpha: 0.6, duration: 0.2, stagger: 0.012 }, "foamBreak")
    .addLabel("separate", 0.4)
    .to(".gw-base", { x: -86, y: 28, rotation: -5, scale: 0.97, duration: 0.2 }, "separate")
    .to(".gw-shadow", { x: 112, y: 46, rotation: 5, scale: 1.03, duration: 0.2 }, "separate")
    .to(".gw-water", { x: -32, y: 58, duration: 0.2 }, "separate")
    .to(".gw-cloud", { x: 34, y: -12, autoAlpha: 0.55, duration: 0.2 }, "separate")
    .to(
      boats,
      {
        x: (index) => -24 + index * 42,
        y: (index) => 14 + index * 10,
        rotation: (index) => -5 + index * 4,
        duration: 0.18,
        stagger: 0.02,
      },
      "separate",
    )
    .to(".gw-fuji", { y: -9, scale: 1.025, duration: 0.2 }, "separate")
    .addLabel("scatter", 0.6)
    .to(".gw-base", { x: -230, y: 74, rotation: -10, scale: 0.9, autoAlpha: 0.36, duration: 0.2 }, "scatter")
    .to(".gw-shadow", { x: 210, y: 92, rotation: 7, scale: 1.08, autoAlpha: 0.16, duration: 0.2 }, "scatter")
    .to(".gw-foam", { x: 132, y: -142, rotation: -12, scale: 0.86, autoAlpha: 0.55, duration: 0.2 }, "scatter")
    .to(".gw-water", { x: -70, y: 118, autoAlpha: 0.26, duration: 0.2 }, "scatter")
    .to(".gw-sky", { autoAlpha: 0.24, duration: 0.2 }, "scatter")
    .to(".gw-fuji", { x: 24, y: -12, autoAlpha: 0.9, duration: 0.2 }, "scatter")
    .addLabel("layout", 0.8)
    .to(".gw-base", { x: -340, y: 126, scale: 0.78, autoAlpha: 0.08, duration: 0.2 }, "layout")
    .to(".gw-shadow", { x: 290, y: 132, autoAlpha: 0, duration: 0.2 }, "layout")
    .to(".gw-foam", { x: 220, y: -190, autoAlpha: 0.22, duration: 0.2 }, "layout")
    .to(".gw-water", { y: 176, autoAlpha: 0.12, duration: 0.2 }, "layout")
    .to(".gw-fuji", { x: 54, y: 12, scale: 0.84, autoAlpha: 0.58, duration: 0.2 }, "layout")
    .to(dots, { autoAlpha: 0.34, duration: 0.2 }, "layout")
    .to(boats, { autoAlpha: 0.3, duration: 0.2 }, "layout")
    .to(".gw-seal", { x: 48, y: -76, autoAlpha: 1, duration: 0.2 }, "layout")
    .to(fragments, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.025 }, 0.76);

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
  };
}
