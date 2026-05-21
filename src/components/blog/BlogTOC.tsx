"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MediumPostsType } from "@/app/blog/config";

type BlogTOCProps = {
  posts: MediumPostsType[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

export const BlogTOC: React.FC<BlogTOCProps> = ({
  posts,
  selectedCategory,
  onCategoryChange,
}) => {
  const categoryCounts = posts.reduce<Record<string, number>>((acc, post) => {
    post.categories.forEach((cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
    });
    return acc;
  }, {});

  const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  const allItems: { label: string; key: string | null }[] = [
    { label: "All", key: null },
    ...categories.map(([cat]) => ({ label: cat, key: cat })),
  ];

  const mid = Math.ceil(allItems.length / 2);
  const leftCol = allItems.slice(0, mid);
  const rightCol = allItems.slice(mid);

  return (
    <>
      {/* Mobile: Sticky horizontal scroll strip */}
      <div className="md:hidden sticky top-0 z-30 w-full pt-24 pb-4 
        bg-gradient-to-b from-background via-background to-background/0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 shrink-0 px-2">
            Filters
          </span>
          <div className="h-4 w-px bg-neutral-200 dark:bg-neutral-700/50 shrink-0" />
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] pb-0.5">
            {allItems.map((item) => {
              const active = item.key === null ? selectedCategory === null : selectedCategory === item.key;
              return (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    onCategoryChange(
                      item.key === null
                        ? null
                        : selectedCategory === item.key
                          ? null
                          : item.key
                    )
                  }
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150
                    ${active
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm"
                      : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-lg shrink-0 transition-colors duration-150
                      ${active
                        ? "bg-amber-400 dark:bg-amber-500"
                        : "bg-neutral-300 dark:bg-neutral-600"
                      }`}
                  />
                  {item.label}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Desktop: Sticky sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 rounded-lg p-5 space-y-4
          bg-white dark:bg-neutral-900
          border border-neutral-200 dark:border-neutral-700/50
          shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400 px-1">
            Filters
          </h2>

          <div className="h-px bg-neutral-200 dark:bg-neutral-700/50" />

          <FilterColumns
            leftCol={leftCol}
            rightCol={rightCol}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </aside>
    </>
  );
};

const VISIBLE_LIMIT = 6;

type FilterColumnsProps = {
  leftCol: { label: string; key: string | null }[];
  rightCol: { label: string; key: string | null }[];
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
};

const FilterColumns: React.FC<FilterColumnsProps> = ({
  leftCol,
  rightCol,
  selectedCategory,
  onCategoryChange,
}) => {
  const [showAll, setShowAll] = useState(false);

  const totalItems = leftCol.length + rightCol.length;
  const hiddenCount = totalItems - VISIBLE_LIMIT;
  const limitPerCol = Math.ceil(VISIBLE_LIMIT / 2);

  const visibleLeft = showAll ? leftCol : leftCol.slice(0, limitPerCol);
  const visibleRight = showAll ? rightCol : rightCol.slice(0, VISIBLE_LIMIT - limitPerCol);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
        <div className="flex flex-col gap-0.5">
          {visibleLeft.map((item) => (
            <FilterItem
              key={item.label}
              label={item.label}
              active={item.key === null ? selectedCategory === null : selectedCategory === item.key}
              color="amber"
              onClick={() =>
                onCategoryChange(
                  item.key === null
                    ? null
                    : selectedCategory === item.key
                      ? null
                      : item.key
                )
              }
            />
          ))}
        </div>
        <div className="flex flex-col gap-0.5">
          {visibleRight.map((item) => (
            <FilterItem
              key={item.label}
              label={item.label}
              active={selectedCategory === item.key}
              color="pink"
              onClick={() =>
                onCategoryChange(
                  selectedCategory === item.key ? null : item.key
                )
              }
            />
          ))}
        </div>
      </div>
      {hiddenCount > 0 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="text-[11px] font-medium text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300 transition-colors duration-150 px-2 pt-1"
        >
          {showAll ? "Show less" : `+${hiddenCount} more`}
        </button>
      )}
    </div>
  );
};

type FilterItemProps = {
  label: string;
  active: boolean;
  color: "amber" | "pink";
  onClick: () => void;
};

const dotColors = {
  amber: { active: "bg-amber-500 dark:bg-amber-400", inactive: "bg-neutral-300 dark:bg-neutral-600" },
  pink: { active: "bg-pink-500 dark:bg-pink-400", inactive: "bg-neutral-300 dark:bg-neutral-600" },
};

const FilterItem: React.FC<FilterItemProps> = ({ label, active, color, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors duration-150 text-left
      ${active ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200"}`}
  >
    <span
      className={`w-2 h-2 rounded-lg shrink-0 transition-colors duration-150
        ${active ? dotColors[color].active : dotColors[color].inactive}`}
    />
    <span className="truncate">{label}</span>
  </button>
);
