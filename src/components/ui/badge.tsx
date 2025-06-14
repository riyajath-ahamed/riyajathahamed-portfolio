"use client";

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "@/lib/utils"
import { BorderBeam } from "./border-beam";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-4 py-1 text-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
}

function Badge({ className, variant, gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8, ...props }: BadgeProps) {

  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);
 
  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    },
    [mouseX, mouseY],
    
  );

  const handleMouseLeave = React.useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);
 
  React.useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  return (
    <>
    <div onMouseMove={handleMouseMove}
    onMouseLeave={handleMouseLeave} className={cn(badgeVariants({ variant }), className)} {...props} />
    <BorderBeam className="rounded-md" size={250} duration={12} delay={9} />
    </>
  )
}

export { Badge, badgeVariants }
