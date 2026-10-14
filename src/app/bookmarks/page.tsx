
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";

import React from "react";
import { BOOKMARKS } from "./BookmarkData";

const BLUR_FADE_DELAY = 0.04;

const BookMarkPage = async () => {
  
  return (
    <main className="relative mx-auto max-w-7xl px-4 py-16">
      <section className="relative flex flex-col items-center">
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-3 mt-10 text-balance text-center">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-6xl font-bold font-serif tracking-tighter sm:text-6xl xl:text-7xl/none pointer-events-none text-foreground text-balance"
            yOffset={8}
            text={`Inspiration`}
          />
          <BlurFadeText
            className="max-w-[600px] font-serif pointer-events-none whitespace-pre-wrap text-center text-2xl font-normal leading-none p-2 md:text-xl lg:text-2xl xl:text-3xl text-foreground text-balance"
            delay={BLUR_FADE_DELAY}
            text="The key to improve your work is to get inspired by the best. Here's who and what inspires me"
          />
        </div>
      </section>

      <section>
        <div className="mt-16 w-full">
          {/* Bookmark grid or list component goes here */}
          <p className="text-center text-gray-500">
          Inspiration feature is under construction. Please check back later.
          </p>

          {
            /* Example bookmark item structure
            
            BOOKMARKS.map((bookmark) => (
              <div key={bookmark.id} className="mb-4">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {bookmark.title}
                </a>
              </div>
            ))
               */
          }
        </div>
      </section>

      <footer className="mt-20 text-center text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} {DATA.name} — All rights reserved.
      </footer>
    </main>
  );
};

export default BookMarkPage;
