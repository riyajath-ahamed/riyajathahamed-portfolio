"use client";

import React from "react";
import { motion } from "framer-motion";

export const SketchCircle = ({ 
  color = "currentColor", 
  className = "absolute top-4 right-4 opacity-20" 
}: { 
  color?: string; 
  className?: string;
}) => (
  <svg
    className={className}
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
  >
    <motion.circle
      cx="40"
      cy="40"
      r="35"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="4 4"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.3 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  </svg>
);

export const SketchArrow = ({ 
  color = "currentColor",
  className = "absolute bottom-6 right-6 opacity-30"
}: { 
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
  >
    <motion.path
      d="M10 30 L45 30 M35 20 L45 30 L35 40"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
    />
  </svg>
);

export const SketchStar = ({ 
  color = "currentColor",
  className = "absolute top-6 left-6 opacity-20"
}: { 
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
  >
    <motion.path
      d="M25 5 L30 20 L45 25 L30 30 L25 45 L20 30 L5 25 L20 20 Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    />
  </svg>
);

export const SketchSquiggle = ({ 
  color = "currentColor",
  className = "absolute bottom-4 left-4 opacity-25"
}: { 
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="70"
    height="40"
    viewBox="0 0 70 40"
    fill="none"
  >
    <motion.path
      d="M5 20 Q15 10 25 20 T45 20 T65 20"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
    />
  </svg>
);

export const SketchUnderline = ({ 
  color = "currentColor" 
}: { 
  color?: string;
}) => (
  <svg
    className="absolute"
    width="100%"
    height="8"
    style={{ bottom: "-4px", left: 0 }}
    viewBox="0 0 200 8"
    preserveAspectRatio="none"
    fill="none"
  >
    <motion.path
      d="M0 4 Q50 1 100 4 T200 4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
    />
  </svg>
);

export const SketchSparkle = ({ 
  color = "currentColor",
  className = "absolute top-3 right-3 opacity-25"
}: { 
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
  >
    <motion.g
      initial={{ scale: 0, rotate: -90 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ duration: 0.8, ease: "backOut" }}
    >
      <path
        d="M20 2 L20 38 M2 20 L38 20 M8 8 L32 32 M32 8 L8 32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </motion.g>
  </svg>
);

export const SketchHeart = ({ 
  color = "currentColor",
  className = "absolute bottom-5 left-5 opacity-20"
}: { 
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="45"
    height="40"
    viewBox="0 0 45 40"
    fill="none"
  >
    <motion.path
      d="M22.5 38 C22.5 38 3 25 3 13 C3 6 8 2 12.5 2 C17 2 22.5 7 22.5 7 C22.5 7 28 2 32.5 2 C37 2 42 6 42 13 C42 25 22.5 38 22.5 38 Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, scale: 0.8 }}
      animate={{ pathLength: 1, scale: 1 }}
      transition={{ duration: 1.8, ease: "easeInOut" }}
    />
  </svg>
);

export const SketchLightning = ({ 
  color = "currentColor",
  className = "absolute top-4 left-4 opacity-30"
}: { 
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="35"
    height="50"
    viewBox="0 0 35 50"
    fill="none"
  >
    <motion.path
      d="M20 2 L8 22 L18 22 L12 48 L30 18 L20 18 Z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 0.3 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    />
  </svg>
);

export const SketchSpiral = ({ 
  color = "currentColor",
  className = "absolute top-6 right-8 opacity-20"
}: { 
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
  >
    <motion.path
      d="M30 30 Q35 25 35 20 Q35 15 30 15 Q22 15 22 23 Q22 32 30 32 Q40 32 40 22 Q40 10 30 10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, rotate: -45 }}
      animate={{ pathLength: 1, rotate: 0 }}
      transition={{ duration: 2.5, ease: "easeInOut" }}
    />
  </svg>
);

export const SketchDots = ({ 
  color = "currentColor",
  className = "absolute bottom-8 right-8 opacity-25"
}: { 
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="50"
    height="50"
    viewBox="0 0 50 50"
    fill="none"
  >
    {[...Array(9)].map((_, i) => (
      <motion.circle
        key={i}
        cx={10 + (i % 3) * 15}
        cy={10 + Math.floor(i / 3) * 15}
        r="2.5"
        fill={color}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ 
          duration: 0.5, 
          delay: i * 0.1,
          ease: "backOut"
        }}
      />
    ))}
  </svg>
);

export const SketchWave = ({ 
  color = "currentColor",
  className = "absolute top-5 left-5 opacity-20"
}: { 
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="80"
    height="40"
    viewBox="0 0 80 40"
    fill="none"
  >
    <motion.path
      d="M0 20 Q10 10 20 20 T40 20 T60 20 T80 20"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, x: -20 }}
      animate={{ pathLength: 1, x: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
  </svg>
);
