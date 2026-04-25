import { Icons } from "@/components/icons";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import FolderProjects from "@/components/FolderProjects";
import SkillRadarChart from "@/components/skillRadarChart";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import GridPattern from "@/components/ui/grid-pattern";
import TextRevealByWord from "@/components/ui/text-reveal";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Link2, PictureInPicture2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/profileCard";
import SkillStickers from "@/components/skillStickers";
import StickerPeel from "@/components/magicui/stickerPeel";
import BeyondCoding from "@/components/BeyondCoding";
import Terminal from "@/components/Terminal";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-screen space-y-10 max-w-4xl mx-auto py-12 sm:py-24 px-6 bg-transparent overflow-x-clip">
      <section id="hero" className="">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          {/* TODO : onHover Show the email pop over */}
          <BlurFade className="flex justify-center gap-1 mt-10 md:mt-0" delay={BLUR_FADE_DELAY}>
            <span className="relative flex items-center h-2 w-2 ">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4cd9af]"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4cd9af]"></span>
            </span>
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className=" font-semibold tracking-tighter  whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10"
              yOffset={8}
              text={`Available for work`}
            />
          </BlurFade>
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-6xl font-semibold font-sans tracking-tighter sm:text-6xl xl:text-7xl/none pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center  leading-none text-transparent dark:from-white dark:to-slate-900/10"
                yOffset={8}
                text={`Hi, I'm`}
              />
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
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Image
                  src="/hero.png"
                  alt="Descriptive text for screen readers"
                  width={300}
                  height={300}
                  className="responsive"
                  placeholder="blur"
                  blurDataURL="data:image/png"
                />
              </BlurFade>
              <BlurFadeText
                className="max-w-[600px] font-serif text-left pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-2xl font-normal leading-none text-transparent dark:from-white dark:to-slate-900/10  p-2 md:text-xl lg:text-2xl xl:text-3xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
          </div>
        </div>
        <div></div>
      </section>

      <section id="about">
        <TextRevealByWord text={DATA.summary} />
      </section>

      <div className="relative">
        <section id="engineering-philosophy" className="sticky top-8 z-10 py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="relative w-full rounded-3xl border border-foreground/10 bg-gradient-to-br from-background via-background to-foreground/[0.03] px-5 py-8 md:p-12 overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="flex-1 flex flex-col gap-4 justify-center">
                  <h2 className="text-xl font-serif font-bold bg-gradient-to-b from-black to-gray-400/80 bg-clip-text leading-tight text-transparent dark:from-white dark:to-slate-900/10 tracking-tight md:text-2xl">
                    Engineering Philosophy
                  </h2>
                  <p className="font-serif text-base md:text-lg text-foreground/70 leading-relaxed">
                    My approach to design is deeply shaped by a personal philosophy that echoes ideas like this.{" "}
                    <span className="italic text-foreground/50">For me —</span>{" "}
                    the interface is the product. Everything else is infrastructure. It&apos;s this mindset that keeps me curious, creative, and driven every day.
                  </p>
                  <p className="font-sans text-xs md:text-sm text-foreground/40 leading-relaxed border-l-2 border-foreground/10 pl-3">
                    The iceberg principle. Complexity belongs inside, hidden. The surface should be calm.
                  </p>
                </div>

                <div className="relative flex flex-col items-center md:flex-row md:items-start md:justify-center shrink-0 w-full md:w-[320px] md:gap-0">
                  <div className="relative w-[120px] h-[168px] shrink-0 z-0 md:z-10 order-1 -mt-12 md:mt-0">
                    <StickerPeel
                      imageSrc="/philosophy-of-software-design.jpg"
                      width={108}
                      rotate={-3}
                      peelDirection={0}
                      peelBackHoverPct={30}
                      peelBackActivePct={45}
                      shadowIntensity={0.5}
                      lightingIntensity={0.08}
                      initialPosition={{ x: 4, y: 4 }}
                    />
                  </div>

                  <div className="relative z-10 md:z-0 w-full max-w-[280px] md:max-w-[220px] rounded-[2px] bg-amber-50 dark:bg-amber-950/80 transform rotate-0 md:rotate-2 md:-ml-2 md:mt-8 shadow-[2px_3px_12px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.06)] order-2">
                    <div className="absolute top-0 left-0 right-0 h-6 bg-amber-100/80 dark:bg-amber-900/40 border-b border-amber-200/50 dark:border-amber-800/30" />
                    <div
                      className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.06]"
                      style={{
                        backgroundImage: "repeating-linear-gradient(transparent, transparent 23px, currentColor 23px, currentColor 24px)",
                        backgroundPositionY: "28px",
                      }}
                    />
                    <div className="absolute left-7 top-0 bottom-0 w-px bg-rose-300/30 dark:bg-rose-400/15" />
                    <div className="relative px-10 pt-8 pb-5">
                      <blockquote className="font-serif italic text-sm md:text-base text-amber-900/80 dark:text-amber-200/70 leading-[24px]">
                        &ldquo;The best modules are those that provide powerful functionality yet have simple interfaces.&rdquo;
                      </blockquote>
                      <span className="block text-[10px] font-mono uppercase tracking-widest text-amber-700/50 dark:text-amber-400/40 mt-3">
                        — John Ousterhout
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </BlurFade>
        </section>

        <section id="beyond-coding" className="relative z-20 py-8">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <div className="relative w-full rounded-3xl border border-foreground/10 bg-gradient-to-br from-background via-background to-foreground/[0.03] px-5 py-8 md:p-8 overflow-hidden shadow-md">
              <BeyondCoding />
            </div>
          </BlurFade>
        </section>
      </div>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-5xl font-serif font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter sm:text-5xl">
              Skills
            </h2>
          </BlurFade>
          <SkillStickers />
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-5xl font-serif font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter sm:text-5xl">
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
          <BlurFade delay={BLUR_FADE_DELAY * 12}>
            <FolderProjects />
          </BlurFade>
        </div>
      </section>
      <section id="contact">
        <div className="w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="relative w-full rounded-3xl border border-foreground/10 bg-gradient-to-br from-background via-background to-foreground/[0.03] px-5 py-8 md:p-12 shadow-sm">
              <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center">
                <div className="relative w-[240px] h-[300px] md:w-[280px] md:h-[340px] shrink-0 -mt-16 md:-mt-24 md:-ml-6 z-10">
                  <StickerPeel
                    imageSrc="/tagCard.png"
                    width={240}
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
            </div>

            <div className="text-center mt-8">
              <h2 className="text-5xl md:text-6xl pt-4 font-serif font-bold pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter">
                だってばよ
              </h2>
              <Terminal />
              <p className="text-xs text-foreground/50 mt-4">
              ✦ Crafted by a human ✦
              </p>
              <div className="text-sm text-gray-600 mt-2">
                &copy; {new Date().getFullYear()} {DATA.name} - All rights
                reserved.
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
      
    </main>
  );
}
