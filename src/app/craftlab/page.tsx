import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import Noise from "@/components/magicui/Noise/Noise";
import { DATA } from "@/data/resume";
import React from "react";

const BLUR_FADE_DELAY = 0.04;

const bentoCards = [
  {
    title: "Interface Sketches",
    description: "Lo-fi explorations for playful UI microinteractions.",
    badge: "Sketches",
    cols: "md:col-span-2",
  },
  {
    title: "Motion Studies",
    description: "Timing curves and motion recipes for tactile feedback.",
    badge: "Motion",
    cols: "md:col-span-1",
  },
  {
    title: "Material Tests",
    description: "Shader, glass, and noise treatments for hero sections.",
    badge: "Materials",
    cols: "md:col-span-1",
  },
  {
    title: "Playground Experiments",
    description: "Small prototypes mixing audio, light, and haptics.",
    badge: "Play",
    cols: "md:col-span-2",
  },
  {
    title: "Material Tests 2",
    description: "Shader, glass, and noise treatments for hero sections.",
    badge: "Materials",
    cols: "md:col-span-1",
  },
  {
    title: "Playground Experiments 6",
    description: "Small prototypes mixing audio, light, and haptics.",
    badge: "Play",
    cols: "md:col-span-2",
  },
];

export default function CraftLabShowcasePage() {
  return (
    <main className="relative mx-auto grid max-w-5xl gap-12 px-4 py-16">
      <section className="relative flex flex-col items-center text-center">
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6 text-balance">
          <div className="inline-flex flex-col items-center gap-2 mt-10">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-6xl font-bold font-serif tracking-tighter sm:text-6xl xl:text-7xl/none pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center  leading-none text-transparent dark:from-white dark:to-slate-900/10"
              yOffset={8}
              text={`Craft Lab`}
            />
          </div>
          <BlurFadeText
            className="max-w-[600px] font-serif pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-2xl font-normal leading-none text-transparent dark:from-white dark:to-slate-900/10  p-2 md:text-xl lg:text-2xl xl:text-3xl"
            delay={BLUR_FADE_DELAY}
            text="A space where I experiment, prototype, and play with conceptual ideas."
          />
        </div>
      </section>

      <BlurFade delay={BLUR_FADE_DELAY}>
      <section className="grid gap-6 md:grid-cols-3">
      
        {bentoCards.map((card) => (
          <article
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white/70 p-6 text-slate-900 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-lg transition duration-300 hover:-translate-y-1 hover:border-black/20 hover:bg-white ${card.cols} dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/10`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/[0.04] to-transparent opacity-0 transition group-hover:opacity-100 dark:from-white/10" />
            <div className="relative z-10 flex h-full flex-col gap-4">
              <span className="inline-flex w-fit items-center rounded-full border border-black/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-black/60 dark:border-white/20 dark:text-white/60">
                {card.badge}
              </span>
              <h3 className="text-2xl font-semibold">{card.title}</h3>
              <p className="text-sm text-slate-700 dark:text-white/70">
                {card.description}
              </p>
              <div className="mt-auto flex items-center gap-2 text-xs font-medium uppercase tracking-[0.3em] text-slate-500 transition group-hover:text-slate-900 dark:text-white/50 dark:group-hover:text-white/80">
                prototype
                <span className="h-px w-6 bg-slate-400 transition group-hover:bg-slate-900 dark:bg-white/30 dark:group-hover:bg-white/80"></span>
                2025
              </div>
            </div>
          </article>
        ))}
        
      </section>
      </BlurFade>

      <section className="flex flex-col items-center justify-center pt-12 text-center">
        <BlurFadeText
          className="max-w-[600px] font-serif pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-2xl font-normal leading-none text-transparent dark:from-white dark:to-slate-900/10  p-2 md:text-xl lg:text-xl xl:text-2xl"
          delay={BLUR_FADE_DELAY}
          text="More experiments are always cooking."
        />
      </section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="space-y-2 sm:col-span-12 lg:col-span-4">
          <div className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} {DATA.name} - All rights reserved.
          </div>
        </div>
      </div>
    </main>
  );
}
