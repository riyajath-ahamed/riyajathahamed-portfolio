import { Icons } from "@/components/icons";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import FlowingMenu from "@/components/magicui/FlowingMenu/FlowingMenu";
import SkillRadarChart from "@/components/skillRadarChart";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import GridPattern from "@/components/ui/grid-pattern";
import TextRevealByWord from "@/components/ui/text-reveal";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LanyardVisibilityWrapper from "@/components/lanyard-visibility-wrapper";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {

type Project = (typeof DATA.projects)[number];

  return (
    <main className="flex flex-col min-h-screen space-y-10 max-w-2xl mx-auto py-12 sm:py-24 px-6 bg-transparent overflow-x-hidden">
      <section id="hero" className="">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          {/* TODO : onHover Show the email pop over */}
          <BlurFade className="flex justify-end gap-1 mt-10 md:mt-0" delay={BLUR_FADE_DELAY}>
            <span className="relative flex h-3 w-3 bottom-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className=" font-bold tracking-tighter  whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10"
              yOffset={8}
              text={`Available`}
            />
          </BlurFade>
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1.5">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-6xl font-bold font-serif tracking-tighter sm:text-6xl xl:text-7xl/none pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center  leading-none text-transparent dark:from-white dark:to-slate-900/10"
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
                  "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
                )}
              />
              <BlurFade delay={BLUR_FADE_DELAY}>
                <Image
                  src="/hero.png"
                  alt="Descriptive text for screen readers"
                  width={500}
                  height={300}
                  className="responsive"
                  placeholder="blur"
                  blurDataURL="data:image/png"
                />
              </BlurFade>
              <BlurFadeText
                className="max-w-[600px] font-serif pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-2xl font-normal leading-none text-transparent dark:from-white dark:to-slate-900/10  p-2 md:text-xl lg:text-2xl xl:text-3xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
          </div>
        </div>
        <div></div>
      </section>

      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <TextRevealByWord
            className=" font-serif pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-2xl font-normal leading-none text-transparent dark:from-white dark:to-slate-900/10  md:text-xl lg:text-2xl xl:text-3xl"
            text={DATA.summary}
          />
        </BlurFade>

        {/* TODO : Cu=urrent and previes roles */}
      </section>

      {/* <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-serif font-bold">Work Experience</h2>
          </BlurFade>
          {DATA.work.map((work, id) => (
            <BlurFade
              key={work.company}
              delay={BLUR_FADE_DELAY * 6 + id * 0.05}
            >
              <ResumeCard
                key={work.company}
                logoUrl={work.logoUrl}
                altText={work.company}
                title={work.company}
                subtitle={work.title}
                href={work.href}
                badges={work.badges}
                period={`${work.start} - ${work.end ?? "Present"}`}
                description={work.description}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-serif font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section> */}
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-5xl font-serif font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter sm:text-5xl">
              Skills
            </h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1 ">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + id * 0.05}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
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
          <FlowingMenu
            items={DATA.projects.map((project) => ({
              text: project.title,
              link: project.href,
              image: project.image,
              project: project,
            }))}
          />
          </BlurFade>
          
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-3">
              <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                Contact
              </div>
              <h2 className="text-5xl font-serif font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center  leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter sm:text-5xl">
                Get in Touch
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-center space-x-4 ">
                <div id="lanyard-container" className="w-1/2 relative overflow-visible min-h-[400px]">
                  <LanyardVisibilityWrapper />
                </div>
                <div className="w-full md:w-1/2 rounded-2xl border border-black/[0.08] bg-white/70 p-3 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-white/30 dark:hover:bg-white/10">
                  <SkillRadarChart />
                </div>
              </div>
            </div>

            
            <div>
            <p className="mx-auto  text-left text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    If you&apos;d like to get in touch, feel free to send me an
                    email at{" "}
                    <a
                      href={`mailto:${DATA.contact.email}`}
                      className="text-blue-500 underline"
                    >
                      {DATA.contact.email}
                    </a>
                    . I&apos;ll get back to you as soon as I can. <br />
                    <span className="cursor-pointer ">
                      <span className="inline-block ">
                        <Link2 className="inline-block" />{" "}
                        <span className="inline-block "> My socials</span>
                      </span>

                      <span className="flex gap-3">
                        <Link
                          href={DATA.contact.social.GitHub.url}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "size-10"
                          )}
                        >
                          <Icons.github className="inline-block w-5 h-5" />
                        </Link>
                        <Link
                          href={DATA.contact.social.LinkedIn.url}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "size-10"
                          )}
                        >
                          <Icons.linkedin className="inline-block w-5 h-5" />
                        </Link>
                        <Link
                          href={DATA.contact.social.X.url}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "size-10"
                          )}
                        >
                          <Icons.x className="inline-block w-5 h-5" />
                        </Link>
                        <Link
                          href={DATA.contact.social.Medium.url}
                          className={cn(
                            buttonVariants({ variant: "ghost", size: "icon" }),
                            "size-10"
                          )}
                        >
                          <Icons.medium className="inline-block w-5 h-5" />
                        </Link>
                      </span>
                    </span>
                  </p>
            </div>
            <h2 className="text-6xl pt-4 font-serif font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter sm:text-5xl">
              だってばよ
            </h2>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="space-y-2 sm:col-span-12 lg:col-span-4">
                <div className="text-sm text-gray-600">
                  &copy; {new Date().getFullYear()} {DATA.name} - All rights
                  reserved.
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
      {/* <FooterPattern name={'RJ'} /> */}
    </main>
  );
}
