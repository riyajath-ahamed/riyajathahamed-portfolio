import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import { BlogClientWrapper } from "@/components/blog/BlogClientWrapper";
import React from "react";

const BLUR_FADE_DELAY = 0.04;

const BlogPage = () => {
  return (
    <div className="py-8">
      <section className="relative flex flex-col items-center">
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-3 mt-10 text-balance text-center">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-6xl font-bold font-serif tracking-tighter sm:text-6xl xl:text-7xl/none pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10"
            yOffset={8}
            text={`Blog`}
          />
          <BlurFadeText
            className="max-w-[600px] font-serif pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-2xl font-normal leading-none text-transparent dark:from-white dark:to-slate-900/10 p-2 md:text-xl lg:text-2xl xl:text-3xl"
            delay={BLUR_FADE_DELAY}
            text="Latest Articles"
          />
        </div>

        <div className="mt-16 w-full">
          <BlogClientWrapper />
        </div>
      </section>

      <footer className="mt-20 text-center text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} {DATA.name} — All rights reserved.
      </footer>
    </div>
  );
};

export default BlogPage;
