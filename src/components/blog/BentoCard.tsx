"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MediumPostsType } from "@/app/blog/config";
import {
  SketchArrow,
  SketchUnderline,
  SketchScribbleOval,
  PinWheelSVG,
  CircleQuaterSVG,
  SquareSmallSVG,
  QuoteOpenSVG,
} from "./SketchElements";

type BentoCardProps = {
  post: MediumPostsType;
  size: "small" | "medium" | "large" | "wide";
  variant: "dark" | "light" | "accent" | "gradient";
  index: number;
};

export const BentoCard: React.FC<BentoCardProps> = ({
  post,
  size,
  variant,
  index,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    small: "col-span-3 md:col-span-2 row-span-1",
    medium: "col-span-3 md:col-span-3 row-span-2",
    large: "col-span-3 md:col-span-3 row-span-3",
    wide: "col-span-3 md:col-span-4 row-span-2",
  };

  const variantStyles = {
    dark: "bg-[#233b24] text-[#ccfd50] border border-neutral-800",
    light: "bg-[#f0ede5] dark:bg-[#004643] text-[#004643] dark:text-[#f0ede5] border border-neutral-200 dark:border-neutral-800",
    accent: "bg-gradient-to-br from-[#f9d4e0] to-[#0b5777] text-[#004643]",
    gradient: "bg-gradient-to-br from-[#b7e5ba] to-[#288760] text-[#004643]",
  };

  const sketchColor = variant === "light" ? "#ccfd50" : "#f0ede5";

  const svgElements = [
    <PinWheelSVG key="pinwheel" color={sketchColor} />,
    <CircleQuaterSVG key="circle-quarter" color={sketchColor} />,
    <SquareSmallSVG key="square-small" color={sketchColor} />,
    <QuoteOpenSVG key="quote-open" color={sketchColor} />,
  ];

  const randomSvg = svgElements[index % svgElements.length];

  return (
    <motion.a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative overflow-hidden rounded-3xl p-6 flex flex-col justify-between transition-all duration-500 ${sizeClasses[size]} ${variantStyles[variant]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* SVG Sketch Elements */}
      <div className="pointer-events-none">
        {randomSvg}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Title with scribble oval highlight */}
        <motion.h3
          className={`font-semibold font-serif leading-tight mb-3 ${
            size === "large" || size === "wide"
              ? "text-3xl md:text-4xl"
              : size === "medium"
              ? "text-2xl md:text-3xl"
              : "text-xl"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 + 0.3 }}
        >
          {/* Split title into words and wrap one word with scribble oval */}
          {(size === "large" || size === "wide" || size === "medium") && isHovered ? (
            post.title.split(' ').map((word, wordIndex) => {
              // Pick a word to highlight (use index to make it consistent per card)
              const words = post.title.split(' ');
              const targetWordIndex = wordIndex === Math.min(1, words.length - 1)
              const shouldHighlight = targetWordIndex;
              
              return (
                <span key={wordIndex}>
                  <span 
                    className={shouldHighlight ? "relative inline-block px-1" : ""}
                  >
                    {word}
                    {shouldHighlight && <SketchScribbleOval color={sketchColor} />}
                  </span>
                  {wordIndex < words.length - 1 && ' '}
                </span>
              );
            })
          ) : (
            <span className="relative inline-block">
              {post.title}
              {/* Show underline for smaller cards */}
              {isHovered && size === "small" && (
                <SketchUnderline color={sketchColor} />
              )}
            </span>
          )}
        </motion.h3>

        {/* Description - only for larger cards */}
        {(size === "medium" || size === "large" || size === "wide") && (
          <motion.p
            className={`opacity-80 mb-4 ${
              size === "large" ? "text-lg" : "text-base"
            } line-clamp-3`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            {post.description?.replace(/<[^>]+>/g, "").slice(0, 150)}
            {post.description?.length > 150 ? "..." : ""}
          </motion.p>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
        {
         post.categories.map((category, catIndex) => (
            <motion.div
            id={`category-${catIndex}`}
            className="mb-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 + 0.2 }}
          >
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                variant === "light"
                  ? "bg-black/5 dark:bg-white/10"
                  : "bg-white/20"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
              </span>
              {category}
            </span>
          </motion.div>

         ))   
        }
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4">
          <motion.span
            className="text-sm opacity-70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            {new Date(post.pubDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </motion.span>

          <motion.button
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              variant === "light"
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "bg-white text-black"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-2">
              Read
              <motion.span
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </div>
      </div>

      {/* Hover Overlay */}
      <motion.div
        className={`absolute inset-0 pointer-events-none ${
          variant === "light"
            ? "bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20"
            : "bg-white/5"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.a>
  );
};
