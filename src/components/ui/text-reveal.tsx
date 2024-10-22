"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "@/lib/utils";

interface TextRevealByWordProps {
  text: string;
  className?: string;
}

export const TextRevealByWord: FC<TextRevealByWordProps> = ({
  text,
  className,
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0 h-[200vh] ", className)}>
      <div
        className={
          "sticky top-0 mx-auto flex h-[50%] max-w-max items-center bg-transparent gap-3 "
        }
      >
        <h2 className=" text-4xl font-serif font-bold pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center leading-none text-transparent dark:from-white dark:to-slate-900/10 tracking-tighter sm:text-5xl">
            About
          </h2>
        <p
          ref={targetRef}
          className={
            "flex flex-wrap text-2xl font-bold whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-black/20 dark:text-white/20 sm:text-xl  md:text-3xl  lg:text-4xl xl:text-5xl"
          }
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start , end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: any;
  range: [number, number];
}

const Word: FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="xl:lg-3 relative mx-1 lg:mx-2.5">
      <span className={"absolute opacity-30"}>{children}</span>
      <motion.span
        style={{ opacity: opacity }}
        className={"text-black dark:text-white"}
      >
        {children}
      </motion.span>
    </span>
  );
};

export default TextRevealByWord;
