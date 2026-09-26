import { Icons } from "@/components/icons";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import FolderProjects from "@/components/FolderProjects";
import SkillStickers from "@/components/skillStickers";
import { buttonVariants } from "@/components/ui/button";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
import Link from "next/link";
import StickerPeel from "@/components/magicui/stickerPeel";
import BeyondCoding from "@/components/BeyondCoding";
import Terminal from "@/components/Terminal";
import GridPattern from "@/components/ui/grid-pattern";
import CardTextReveal from "@/components/ui/card-text-reveal";
import HeroLanyard from "@/components/hero-lanyard";
import HeroStamp from "@/components/hero-stamp";
import { Mascot } from "@/components/mascot";
import AboutMe from "@/components/aboutMe";
import EngineeringPhilosophy from "@/components/engineeringPhilosophy";
import { BLUR_FADE_DELAY, cardBase } from "@/lib/home";

export default function Page() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 md:p-8 lg:p-10 max-w-[1400px] mx-auto min-h-screen">
      {/* ── Hero ── */}
      <section
        id="hero"
        className="col-span-full relative isolate overflow-hidden rounded-md bg-[#fbf8f1] dark:bg-background/80 backdrop-blur-sm p-6 md:p-8 shadow-[0_2px_20px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_6px_34px_rgba(0,0,0,0.12)]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 p-[7px] dark:opacity-80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(-45deg, #e8413c 0 14px, transparent 14px 24px, #2b4c7e 24px 38px, transparent 38px 48px)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[7px] overflow-hidden rounded-[3px]"
        >
          <svg className="absolute inset-0 h-full w-full opacity-[0.18] mix-blend-multiply dark:opacity-[0.08] dark:mix-blend-screen">
            <filter id="postcardGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#postcardGrain)" />
          </svg>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-14 left-[632px] hidden lg:flex flex-col items-center"
        >
          <span className="w-px flex-1 bg-foreground/15" />
          <span className="py-4 font-mono text-[10px] uppercase tracking-[0.45em] text-foreground/40 [writing-mode:vertical-rl] rotate-180">
            Post Card
          </span>
          <span className="w-px flex-1 bg-foreground/15" />
        </div>

        <div className="absolute z-[3] top-16 right-5 w-28 sm:w-32 md:right-auto md:top-8 md:left-[calc(50%+200px)] md:w-28 xl:left-auto xl:right-10 xl:w-32 2xl:w-40">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <HeroStamp />
          </BlurFade>
        </div>

        {/* <div className="absolute z-[3] hidden md:block left-[430px] top-[170px]">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <Mascot
              directions="/mascots/riyajath-directions.webp"
              reactions="/mascots/riyajath-reactions.webp"
              size={180}
              label={`${DATA.name} mascot`}
            />
          </BlurFade>
        </div> */}

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-14 left-[672px] hidden w-[210px] space-y-4 xl:block text-foreground/60"
          style={{ fontFamily: "Mynerve, cursive" }}
        >
          <p className="h-8 border-b border-foreground/20 text-base leading-8 whitespace-nowrap">To: you, curious visitor</p>
          <p className="h-8 border-b border-foreground/20 text-base leading-8 whitespace-nowrap">somewhere on the internet</p>
          <p className="h-8 border-b border-foreground/20" />
        </div>

        <div className="relative z-[1] h-[500px] -mx-6 -mt-6 -mb-16 md:m-0 md:absolute md:inset-0 md:h-auto">
          <HeroLanyard />
        </div>

        <div className="relative z-[2] pointer-events-none flex flex-col justify-center max-w-lg lg:max-w-xl space-y-5 mt-10 md:mt-0 md:min-h-[520px]">
        <BlurFade className="flex justify-start gap-1 mt-10 md:mt-0" delay={BLUR_FADE_DELAY}>
            <span className="relative flex items-center h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4cd9af]"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4cd9af]"></span>
            </span>
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="font-semibold tracking-tighter whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10"
              yOffset={8}
              text="Available for work"
            />
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="w-full max-w-sm rounded-[20px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] -rotate-3">
                  <div className="bg-[#e8413c] px-4 pb-2 text-center">
                    <h1 className="text-5xl sm:text-6xl font-bold text-white tracking-tight font-sans">
                      Hello
                    </h1>
                    <p className="text-xl sm:text-2xl text-white/90 font-sans">
                      my name is
                    </p>
                  </div>
                  <div className="bg-white px-6 py-8 text-center flex items-center justify-center">
                    <span
                      className="text-3xl font-bold sm:text-5xl text-gray-800"
                      style={{ fontFamily: "Mynerve, cursive" }}
                    >
                      {DATA.name}
                    </span>
                  </div>
                  <div className="bg-[#e8413c] h-3" />
                </div>
          </BlurFade>
          <BlurFadeText
            className="max-w-[540px] font-serif text-left whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-xl font-normal leading-snug text-transparent dark:from-white dark:to-slate-900/10 md:text-2xl"
            delay={BLUR_FADE_DELAY * 3}
            text={DATA.description}
          />
        </div>
      </section>

      {/* ── About ── */}
      <AboutMe />

      {/* ── Engineering Philosophy ── */}
    
      <EngineeringPhilosophy />
      {/* ── Beyond Coding ── */}
      {/* <section id="beyond-coding" className={cn(cardBase, "md:col-span-1 lg:col-span-1")}>
         <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                )}
              />
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--foreground) / 0.08) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.08) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative">
            <BeyondCoding />
          </div>
        </BlurFade>
      </section> */}

      {/* ── Projects ── */}
      {/* <section id="projects" className={cn(cardBase, "md:col-span-1 lg:col-span-3")}>
         <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                )}
              />
        <div className="space-y-8 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 15}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-4xl font-serif font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <FolderProjects />
          </BlurFade>
        </div>
      </section> */}

      {/* ── Contact ── */}
      <section id="contact" className={cn(cardBase, "md:col-span-2 lg:col-span-3")}>
         <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                )}
              />
        <BlurFade delay={BLUR_FADE_DELAY * 18}>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
            <div className="relative w-[200px] h-[250px] md:w-[240px] md:h-[300px] shrink-0 z-10">
              <StickerPeel
                imageSrc="/tagCard.png"
                width={200}
                rotate={-5}
                peelDirection={0}
                peelBackHoverPct={25}
                peelBackActivePct={40}
                shadowIntensity={0.55}
                lightingIntensity={0.08}
                initialPosition={{ x: 8, y: 8 }}
              />
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div className="inline-block self-start rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold bg-gradient-to-b from-black to-gray-300/80 bg-clip-text leading-tight text-transparent dark:from-white dark:to-slate-900/10 tracking-tight">
                Get in Touch
              </h2>
              <p className="font-serif text-base md:text-lg text-foreground/70 leading-relaxed">
                If you&apos;d like to get in touch, feel free to send me an
                email at{" "}
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className="text-blue-500 hover:text-blue-600 underline underline-offset-2 transition-colors"
                >
                  {DATA.contact.email}
                </a>
                . I&apos;ll get back to you as soon as I can.
              </p>

              <div className="flex flex-col gap-2 mt-1">
                <span className="flex items-center gap-1.5 text-sm text-foreground/50">
                  <Link2 className="w-4 h-4" />
                  My socials
                </span>
                <div className="flex gap-1">
                  <Link
                    href={DATA.contact.social.GitHub.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-9 rounded-xl hover:bg-foreground/[0.06]"
                    )}
                  >
                    <Icons.github className="w-5 h-5" />
                  </Link>
                  <Link
                    href={DATA.contact.social.LinkedIn.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-9 rounded-xl hover:bg-foreground/[0.06]"
                    )}
                  >
                    <Icons.linkedin className="w-5 h-5" />
                  </Link>
                  <Link
                    href={DATA.contact.social.X.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-9 rounded-xl hover:bg-foreground/[0.06]"
                    )}
                  >
                    <Icons.x className="w-5 h-5" />
                  </Link>
                  <Link
                    href={DATA.contact.social.Medium.url}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "size-9 rounded-xl hover:bg-foreground/[0.06]"
                    )}
                  >
                    <Icons.medium className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </BlurFade>
      </section>

      {/* ── Footer ── */}
      <footer className={cn(cardBase, "md:col-span-2 lg:col-span-1 flex flex-col items-center justify-center text-center")}>
         <GridPattern
                width={30}
                height={30}
                x={-1}
                y={-1}
                strokeDasharray={"4 2"}
                className={cn(
                  "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
                )}
              />
        <BlurFade delay={BLUR_FADE_DELAY * 20}>
          <h2 className="text-4xl md:text-5xl pt-4 font-serif font-bold pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter">
            だってばよ
          </h2>
          <Terminal />
          <p className="text-xs text-foreground/50 mt-4">
            Crafted by a human. No AI was involved in the making of this portfolio.
          </p>  
        </BlurFade>
      </footer>

      <div className="col-span-full text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} {DATA.name} - All rights reserved.
          </div>
    </main>
  );
}
