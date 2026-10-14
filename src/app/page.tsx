import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import BeyondCoding from "@/components/beyondCoding";
import HeroLanyard from "@/components/hero-lanyard";
import HeroStamp from "@/components/hero-stamp";
import HeroCuttingMat from "@/components/hero-cutting-mat";
import AboutMe from "@/components/aboutMe";
import EngineeringPhilosophy from "@/components/engineeringPhilosophy";
import { BLUR_FADE_DELAY } from "@/lib/home";
import Projects from "@/components/projects";
import Contact from "@/components/contact";
import Footer from "@/components/footer";



export default function Page() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 md:p-8 lg:p-10 max-w-[1400px] mx-auto min-h-dvh">
      {/* ── Hero ── */}
      <section
        id="hero"
        className="col-span-full relative isolate overflow-hidden rounded-md bg-background px-8 pt-10 pb-20 md:px-12 md:pt-14 md:pb-24"
      >
        <HeroCuttingMat />

        <div className="absolute z-[3] top-16 right-8 w-24 sm:w-28 md:right-auto md:top-14 md:left-[calc(50%+180px)] xl:left-auto xl:right-14 xl:w-32 2xl:w-36">
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <HeroStamp />
          </BlurFade>
        </div>

        <div className="relative z-[1] h-[500px] -mx-8 -mt-10 -mb-16 md:m-0 md:absolute md:inset-0 md:h-auto">
          <HeroLanyard />
        </div>

        <div className="relative z-[2] pointer-events-none flex flex-col justify-center max-w-lg lg:max-w-xl space-y-7 mt-10 md:mt-0 md:min-h-[480px]">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <span className="inline-flex -rotate-2 rounded-full bg-[#ccfd50] p-1 shadow-[0_6px_14px_-4px_rgba(18,52,32,0.55),inset_0_-2px_0_rgba(35,59,36,0.25)]">
              <span className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#233b24]/45 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#233b24]/60 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#233b24]" />
                </span>
                <span className="text-sm font-semibold tracking-tight text-[#233b24]">
                  Available for work
                </span>
              </span>
            </span>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div className="relative w-full max-w-sm -rotate-3">
              <span
                aria-hidden
                className="absolute -top-3 left-1/2 z-[1] h-7 w-28 -translate-x-1/2 rotate-[4deg] bg-[#f4efd9]/70 shadow-[0_1px_2px_rgba(0,0,0,0.12)] backdrop-blur-[1px]"
              />
              <div className="overflow-hidden rounded-[20px] shadow-[0_18px_30px_-12px_rgba(12,40,24,0.6),0_4px_8px_-2px_rgba(12,40,24,0.35)]">
                <div className="bg-[#e8413c] px-4 pb-2 text-center">
                  <h1 className="font-sans text-5xl font-bold tracking-tight text-white sm:text-6xl">
                    Hello
                  </h1>
                  <p className="font-sans text-xl text-white/90 sm:text-2xl">
                    my name is
                  </p>
                </div>
                <div className="flex items-center justify-center bg-white px-6 py-8 text-center">
                  <span className="font-hand text-3xl font-bold text-neutral-800 sm:text-5xl">
                    {DATA.name}
                  </span>
                </div>
                <div className="h-3 bg-[#e8413c]" />
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <figure className="relative ml-2 w-full max-w-[22rem] rotate-[1.5deg] rounded-[3px] bg-[#fbf8ef] px-5 pt-3 pb-4 shadow-[0_16px_28px_-14px_rgba(12,40,24,0.65),0_3px_6px_-2px_rgba(12,40,24,0.3)] dark:bg-[#e8e3d4] sm:max-w-md">
              <span
                aria-hidden
                className="absolute -top-2.5 -right-4 h-6 w-20 rotate-[28deg] bg-[#f4efd9]/75 shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
              />
              <figcaption className="flex items-baseline justify-between border-b-2 border-[#e8413c]/55 pb-1.5">
                <span className="font-hand text-xl font-bold text-neutral-700">What I do</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">No. 01</span>
              </figcaption>
              <p className="bg-[linear-gradient(transparent_31px,rgba(43,76,126,0.2)_31px)] bg-[length:100%_32px] font-serif text-lg leading-8 text-pretty text-neutral-800 md:text-xl md:leading-8">
                {DATA.description}
              </p>
            </figure>
          </BlurFade>
        </div>
      </section>

      {/* ── About ── */}
      <AboutMe />

      {/* ── Engineering Philosophy ── */}
    
      <EngineeringPhilosophy />

      {/* ── Beyond Coding ── */}
      <BeyondCoding />
  

      {/* ── Projects ── */}
      <Projects />

      {/* ── Contact ── */}
      <Contact />

      {/* ── Footer ── */}
      <Footer />
    </main>
  );
}
