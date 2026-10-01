import Image from "next/image";
import { BLUR_FADE_DELAY, cardBase } from "@/lib/home";
import { cn } from "@/lib/utils";
import GridPattern from "../ui/grid-pattern";
import BlurFade from "../magicui/blur-fade";
import FolderProjects from "../FolderProjects";

export default function Projects() {
  return (
     <section id="projects" className={cn(cardBase, "md:col-span-1 lg:col-span-3")}>
        <div className="space-y-8 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="flex flex-col items-start gap-1 text-left">
              <h2 className="flex items-center gap-2 text-4xl font-serif font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter sm:text-5xl">
                Selected
                <Image
                  src="/beyond/Selectedproject.png"
                  alt=""
                  aria-hidden
                  width={512}
                  height={512}
                  sizes="48px"
                  className="h-[1em] w-auto shrink-0 pb-2"
                />
                Projects
              </h2>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <FolderProjects />
          </BlurFade>
        </div>
      </section> 
  );
}