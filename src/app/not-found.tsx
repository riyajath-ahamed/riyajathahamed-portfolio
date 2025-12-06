import { SketchUnderline } from "@/components/blog";
import Link from "next/link";

export default function Custom404() {
  

  return (
    <div className="relative w-full h-screen bg-white dark:bg-[#00171f] flex items-center justify-center overflow-hidden">
      {/* Background Big 404 */}
      <div className="absolute inset-0 flex items-center justify-center select-none">
        <span className="text-[60vw] font-extrabold leading-none font-sans text-red-600 opacity-90 blur-sm -tracking-[0.08em]">404</span>
      </div>

      {/* Center Content */}
      <div className="relative z-10 text-center text-white">
        <p className="text-sm font-semibold font-serif tracking-widest opacity-80 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10">404</p>
        <p className="text-sm md:text-base font-serif font-bold opacity-90 whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10">SORRY, WE COULDN&apos;T FIND THIS PAGE</p>
        <Link
          href="/"
          className="inline-block mt-3 text-3xl font-semibold font-serif relative  whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10"
        >
          GO BACK
          <SketchUnderline className="stroke-black dark:stroke-white"  />
        </Link>
      </div>

      {/* Bottom Text */}
      <p className="absolute bottom-6 text-[10px] md:text-xs text-[#00171f] dark:text-white opacity-75 tracking-widest text-center w-full">
        THE PAGE YOU ARE LOOKING FOR DOESN&apos;T EXIST OR AN OTHER ERROR OCCURRED.
      </p>
    </div>
  );
}
