"use client";

import React from "react";
import { BentoCard } from "./BentoCard";
import { MediumPostsType } from "@/app/blog/config";

type BentoGridProps = {
  posts: MediumPostsType[];
};

type LayoutPattern = {
  size: "small" | "medium" | "large" | "wide";
  variant: "dark" | "light" | "accent" | "gradient";
};

// Define dynamic layout patterns that repeat
const layoutPatterns: LayoutPattern[][] = [
  // Pattern 1: Hero Focus - Large featured card with supporting cards
  // [
  //   { size: "large", variant: "dark" },      // Hero card
  //   { size: "medium", variant: "light" },    // Supporting card
  //   { size: "medium", variant: "accent" },   // Accent card
  //   { size: "small", variant: "light" },     // Small cards
  //   { size: "small", variant: "gradient" },
  //   { size: "small", variant: "light" },
  // ],
  // Pattern 2: Balanced Grid - Equal emphasis
  // [
  //   { size: "medium", variant: "gradient" },
  //   { size: "medium", variant: "light" },
  //   { size: "medium", variant: "dark" },
  //   { size: "medium", variant: "accent" },
  //   { size: "small", variant: "light" },
  //   { size: "small", variant: "light" },
  // ],
  // Pattern 3: Wide Banner - Horizontal emphasis
  [
    { size: "wide", variant: "dark" },       // Wide banner
    { size: "small", variant: "accent" },
    { size: "small", variant: "light" },
    { size: "medium", variant: "light" },
    { size: "medium", variant: "gradient" },
  ],
  // Pattern 4: Colorful Mix - Vibrant layout
  [
    { size: "medium", variant: "accent" },
    { size: "small", variant: "light" },
    { size: "small", variant: "gradient" },
    { size: "large", variant: "light" },
    { size: "small", variant: "dark" },
    { size: "small", variant: "accent" },
  ],
  // Pattern 5: Classic Bento - Traditional bento feel
  [
    { size: "medium", variant: "dark" },
    { size: "small", variant: "light" },
    { size: "small", variant: "accent" },
    { size: "small", variant: "gradient" },
    { size: "medium", variant: "light" },
    { size: "small", variant: "light" },
  ],
];

export const BentoGrid: React.FC<BentoGridProps> = ({ posts }) => {
  // Function to get layout for each post
  const getLayoutForPost = (index: number): LayoutPattern => {
    // Determine which pattern to use
    const patternIndex = Math.floor(index / 6) % layoutPatterns.length;
    const pattern = layoutPatterns[patternIndex];
    
    // Get position within the pattern
    const positionInPattern = index % pattern.length;
    
    return pattern[positionInPattern];
  };

  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-6 gap-4 auto-rows-[200px]">
      {posts.map((post, index) => {
        const layout = getLayoutForPost(index);
        
        return (
          <BentoCard
            key={post.link}
            post={post}
            size={layout.size}
            variant={layout.variant}
            index={index}
          />
        );
      })}
    </div>
  );
};
