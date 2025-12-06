"use client";

import React from "react";
import { motion } from "framer-motion";

export const SketchArrow = ({
  color = "currentColor",
  className = "absolute bottom-6 right-6 opacity-30",
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

export const SketchUnderline = ({
  color = "currentColor",
  className = "",
}: {
  color?: string;
  className?: string;
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
      className={className}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
    />
  </svg>
);

export const SketchScribbleCircle = ({
  color = "currentColor",
  className = "absolute top-4 right-6 opacity-25",
}: {
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    width="90"
    height="90"
    viewBox="0 0 90 90"
    fill="none"
  >
    <motion.path
      d="M45 10 C25 10 10 25 10 45 C10 65 25 80 45 80 C65 80 80 65 80 45 C80 25 65 10 45 10 M45 15 C27 15 15 27 15 45 C15 63 27 75 45 75 C63 75 75 63 75 45 C75 27 63 15 45 15"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, rotate: -10 }}
      animate={{
        pathLength: 1,
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        pathLength: { duration: 2.5, ease: "easeInOut" },
        rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  </svg>
);

export const SketchScribbleOval = ({
  color = "currentColor",
  className = "",
}: {
  color?: string;
  className?: string;
}) => (
  <svg
    className={`absolute pointer-events-none ${className}`}
    width="110%"
    height="140%"
    viewBox="0 0 100 100"
    preserveAspectRatio="none"
    fill="none"
    style={{
      left: "-5%",
      top: "-20%",
    }}
  >
    <motion.ellipse
      cx="50"
      cy="50"
      rx="45"
      ry="48"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      strokeDasharray="2 2"
      initial={{ pathLength: 0, scale: 0.7, rotate: -8 }}
      animate={{ pathLength: 1, scale: 1, rotate: 5 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
    />
    <motion.ellipse
      cx="50"
      cy="50"
      rx="43"
      ry="46"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: 0, scale: 0.75, rotate: 6 }}
      animate={{ pathLength: 1, scale: 1, rotate: -4 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
    />
  </svg>
);

export const PinWheelSVG = ({
  color = "currentColor",
  className = "absolute bottom-4 left-4 opacity-20",
}: {
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 480 480"
    fill={color}
    width="480"
    height="480"
  >
    <path
      d="M480 210A160 160 0 0 0 210 93.8V0A160 160 0 0 0 93.8 270H0a160 160 0 0 0 270 116.2V480a160 160 0 0 0 116.2-270H480Zm-210 60h-60v-60h60v60Z"
      fill={color}
    ></path>
  </svg>
);

export const CircleQuaterSVG = ({
  color = "currentColor",
  className = "absolute bottom-4 left-4 opacity-20",
}: {
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 480 480"
    fill={color}
    width="480"
    height="480"
  >
  <path d="M240 120h240v120H240zM0 240h240v120H0zM240 360h240v120H240zM0 0h240v120H0z" fill={color}></path>
  </svg>
);

export const SquareSmallSVG = ({
  color = "currentColor",
  className = "absolute bottom-4 left-4 opacity-20",
}: {
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 480 480"
    fill={color}
    width="480"
    height="480"
  >
  <path d="M160 320v160h320V320H320V160H160V0H0v320h160z" fill={color}></path>
  </svg>
);


export const QuoteOpenSVG = ({
  color = "currentColor",
  className = "absolute bottom-4 left-4 opacity-20",
}: {
  color?: string;
  className?: string;
}) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 480 480"
    fill={color}
    width="480"
    height="480"
  >
  <path d="M22.12 145v97.65h97.65V145H70.95c0-26.92 21.9-48.82 48.82-48.82V47.35c-53.93 0-97.65 43.72-97.65 97.65zm245.76-48.82V47.35c-53.93 0-97.65 43.72-97.65 97.65v97.65h97.65V145h-48.82c-.01-26.92 21.89-48.82 48.82-48.82z" fill={color}></path>
  </svg>
);

