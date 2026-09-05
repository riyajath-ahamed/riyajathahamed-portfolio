"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CardTextRevealProps {
  text: string;
  className?: string;
}

const CardTextReveal: FC<CardTextRevealProps> = ({ text, className }) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={`flex flex-wrap font-sans font-medium text-foreground/15 text-base md:text-lg leading-relaxed ${className ?? ""}`}
    >
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

const Word: FC<{ children: ReactNode; progress: any; range: [number, number] }> = ({
  children,
  progress,
  range,
}) => {
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <span className="relative mr-1.5 mb-0.5">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="text-foreground/60">
        {children}
      </motion.span>
    </span>
  );
};

export default CardTextReveal;
