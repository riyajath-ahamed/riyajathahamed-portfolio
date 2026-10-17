import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY, cardBase } from "@/lib/home";
import BlurFade from "../magicui/blur-fade";
import Terminal from "../Terminal";

export default function Footer() {
  return (
    <footer className={cn(cardBase, "col-span-full flex flex-col items-center justify-center text-center")}>
      <BlurFade delay={BLUR_FADE_DELAY * 20}>
        <h2 className="text-4xl md:text-5xl pt-4 font-serif font-bold pointer-events-none leading-none tracking-tighter text-foreground text-balance">
          だってばよ
        </h2>
        <p className="text-xs text-foreground/50 mt-4">
          Lost? Type{" "}
          <kbd className="rounded bg-white px-1.5 py-0.5 font-mono text-[11px] text-neutral-700 shadow-[0_1px_1px_rgba(0,0,0,0.06)] dark:bg-white/10 dark:text-neutral-200">
            help
          </kbd>
        </p>
        <Terminal className="mt-2" />
        <p className="text-xs text-foreground/50 mt-4">
          Crafted by a human & AI. 
        </p>
        <p className="text-xs text-foreground/40 mt-1">
          &copy; {new Date().getFullYear()} {DATA.name}. All rights reserved.
        </p>
      </BlurFade>
    </footer>
  );
}
