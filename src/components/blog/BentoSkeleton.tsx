"use client";

import React from "react";
import { motion } from "framer-motion";

export const BentoSkeleton = () => {
  const skeletonPattern = [
    { size: "col-span-3 md:col-span-3 row-span-2" },
    { size: "col-span-3 md:col-span-3 row-span-2" },
    { size: "col-span-3 md:col-span-3 row-span-2" },
    { size: "col-span-3 md:col-span-2 row-span-1" },
    { size: "col-span-3 md:col-span-2 row-span-1" },
    { size: "col-span-3 md:col-span-2 row-span-1" },
  ];

  return (
    <div className="w-full grid grid-cols-3 md:grid-cols-6 gap-4 auto-rows-[200px]">
      {skeletonPattern.map((item, index) => (
        <motion.div
          key={index}
          className={`${item.size} rounded-3xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 p-6 flex flex-col justify-between overflow-hidden relative`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Badge skeleton */}
          <div className="relative z-10">
            <div className="w-20 h-6 bg-neutral-300 dark:bg-neutral-700 rounded-full mb-3 animate-pulse" />
            
            {/* Title skeleton */}
            <div className="space-y-2 mb-4">
              <div className="h-6 bg-neutral-300 dark:bg-neutral-700 rounded w-3/4 animate-pulse" />
              <div className="h-6 bg-neutral-300 dark:bg-neutral-700 rounded w-1/2 animate-pulse" />
            </div>

            {/* Description skeleton - only for larger cards */}
            {index < 3 && (
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-full animate-pulse" />
                <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-4/6 animate-pulse" />
              </div>
            )}
          </div>

          {/* Footer skeleton */}
          <div className="relative z-10 flex items-center justify-between mt-auto">
            <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-24 animate-pulse" />
            <div className="h-9 w-20 bg-neutral-300 dark:bg-neutral-700 rounded-full animate-pulse" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
