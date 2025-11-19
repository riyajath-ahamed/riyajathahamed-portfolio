import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import React from "react";

const BLUR_FADE_DELAY = 0.04;

const BlogPage = () => {
  return (
    <main className="relative mx-auto grid max-w-5xl gap-12 px-4 py-16">
      <section className="relative flex flex-col items-center text-center">
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-6 text-balance">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-6xl font-bold font-serif tracking-tighter sm:text-6xl xl:text-7xl/none pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center  leading-none text-transparent dark:from-white dark:to-slate-900/10"
            yOffset={8}
            text={`Blog`}
          />
        </div>
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
};

export default BlogPage;
