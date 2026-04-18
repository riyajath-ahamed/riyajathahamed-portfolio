"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [isOpen, setIsOpen] = useState(false);

  const categoryCounts = posts.reduce<Record<string, number>>((acc, post) => {
    post.categories.forEach((cat) => {
      acc[cat] = (acc[cat] || 0) + 1;
    });
    return acc;
  }, {});

  const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.categories.includes(selectedCategory))
    : posts;

  return (
    <>
      {/* Mobile: Collapsible TOC bar */}
      <div className="lg:hidden w-full mt-20 mb-6">
        <motion.button
          onClick={() => setIsOpen((v) => !v)}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl
            bg-white/30 dark:bg-white/5
            backdrop-blur-xl backdrop-saturate-150
            border border-white/40 dark:border-white/10
            shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)]
            text-sm font-medium text-neutral-800 dark:text-neutral-100
            transition-all duration-200"
        >
          <span className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#233b24]/10 dark:bg-[#ccfd50]/10">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#233b24] dark:text-[#ccfd50]">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="15" y2="12" />
                <line x1="3" y1="18" x2="9" y2="18" />
              </svg>
            </span>
            <span>Table of Contents</span>
            {selectedCategory && (
              <span className="px-2.5 py-0.5 rounded-full bg-[#233b24] text-[#ccfd50] text-xs font-semibold tracking-wide">
                {selectedCategory}
              </span>
            )}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-neutral-400 dark:text-neutral-500 text-xs"
          >
            ▼
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mt-2 p-5 rounded-2xl space-y-5
                bg-white/40 dark:bg-white/5
                backdrop-blur-xl backdrop-saturate-150
                border border-white/50 dark:border-white/10
                shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
              >
                <TOCContent
                  categories={categories}
                  selectedCategory={selectedCategory}
                  filteredPosts={filteredPosts}
                  onCategoryChange={(c) => {
                    onCategoryChange(c);
                    setIsOpen(false);
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop: Sticky sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl p-5 space-y-6
          bg-white/30 dark:bg-white/[0.04]
          backdrop-blur-2xl backdrop-saturate-150
          border border-white/50 dark:border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
          scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700"
        >
          {/* Header */}
          <div className="flex items-center gap-2.5">
            <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-[#233b24]/10 dark:bg-[#ccfd50]/10 shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#233b24] dark:text-[#ccfd50]">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="15" y2="12" />
                <line x1="3" y1="18" x2="9" y2="18" />
              </svg>
            </span>
            <h2 className="text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
              Table of Contents
            </h2>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/10 to-transparent" />

          <TOCContent
            categories={categories}
            selectedCategory={selectedCategory}
            filteredPosts={filteredPosts}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </aside>
    </>
  );
};

type CategoryBadgeProps = {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ label, count, active, onClick }) => (
  <motion.button
    onClick={onClick}
    whileTap={{ scale: 0.95 }}
    className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 overflow-hidden ${
      active
        ? "text-[#ccfd50] shadow-[0_2px_16px_rgba(35,59,36,0.5)] dark:shadow-[0_2px_20px_rgba(204,253,80,0.15)]"
        : "text-neutral-600 dark:text-neutral-200 hover:text-neutral-900 dark:hover:text-white bg-neutral-100/80 dark:bg-white/10 hover:bg-neutral-200/80 dark:hover:bg-white/20 border border-transparent dark:border-white/10 dark:hover:border-white/20"
    }`}
  >
    {active && (
      <motion.span
        layoutId="activeCategoryBg"
        className="absolute inset-0 bg-[#233b24] dark:bg-[#ccfd50]/20 dark:border dark:border-[#ccfd50]/40 rounded-full"
        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
      />
    )}
    <span className="relative">{label}</span>
    <span className={`relative font-mono text-[10px] ${
      active ? "text-[#ccfd50]/80 dark:text-[#ccfd50]" : "text-neutral-400 dark:text-neutral-400"
    }`}>
      {count}
    </span>
  </motion.button>
);

type TOCContentProps = {
  categories: [string, number][];
  selectedCategory: string | null;
  filteredPosts: MediumPostsType[];
  onCategoryChange: (category: string | null) => void;
};

const VISIBLE_BADGE_LIMIT = 6;

const TOCContent: React.FC<TOCContentProps> = ({
  categories,
  selectedCategory,
  filteredPosts,
  onCategoryChange,
}) => {
  const [filterOpen, setFilterOpen] = useState(true);
  const [showAllBadges, setShowAllBadges] = useState(false);

  const allBadges: [string, number | null][] = [["All", null], ...categories];
  const visibleBadges = showAllBadges ? allBadges : allBadges.slice(0, VISIBLE_BADGE_LIMIT);
  const hiddenCount = allBadges.length - VISIBLE_BADGE_LIMIT;

  return (
    <>
      {/* Category Filters */}
      <div>
        <button
          onClick={() => setFilterOpen((v) => !v)}
          className="w-full flex items-center justify-between px-1 mb-2 group"
        >
          <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
            Filter by Category
          </p>
          <motion.span
            animate={{ rotate: filterOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-neutral-400 dark:text-neutral-500 text-[10px] group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors"
          >
            ▼
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pt-1">
                {visibleBadges.map(([label, _]) => {
                  const count = label === "All"
                    ? filteredPosts.length
                    : (categories.find(([c]) => c === label)?.[1] ?? 0);
                  const active = label === "All" ? !selectedCategory : selectedCategory === label;
                  return (
                    <CategoryBadge
                      key={label}
                      label={label}
                      count={count}
                      active={active}
                      onClick={() => onCategoryChange(label === "All" ? null : (selectedCategory === label ? null : label))}
                    />
                  );
                })}
                {!showAllBadges && hiddenCount > 0 && (
                  <button
                    onClick={() => setShowAllBadges(true)}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
                      text-neutral-500 dark:text-neutral-400
                      bg-neutral-100/80 dark:bg-white/10
                      border border-transparent dark:border-white/10
                      hover:text-neutral-800 dark:hover:text-white
                      hover:bg-neutral-200/80 dark:hover:bg-white/20
                      transition-all duration-200"
                  >
                    +{hiddenCount} more
                  </button>
                )}
                {showAllBadges && (
                  <button
                    onClick={() => setShowAllBadges(false)}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
                      text-neutral-500 dark:text-neutral-400
                      bg-neutral-100/80 dark:bg-white/10
                      border border-transparent dark:border-white/10
                      hover:text-neutral-800 dark:hover:text-white
                      hover:bg-neutral-200/80 dark:hover:bg-white/20
                      transition-all duration-200"
                  >
                    Show less
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-neutral-300/60 dark:via-white/10 to-transparent" />

      {/* Post List */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3 px-1">
          {selectedCategory ? `${filteredPosts.length} Articles` : `All ${filteredPosts.length} Articles`}
        </p>
        <ol className="flex flex-col gap-0.5">
          {filteredPosts.map((post, i) => (
            <li key={post.link}>
              <motion.a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.15 }}
                className="flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-xs
                  text-neutral-500 dark:text-neutral-400
                  hover:text-neutral-900 dark:hover:text-white
                  hover:bg-white/50 dark:hover:bg-white/8
                  transition-colors duration-150 group"
              >
                <span className="shrink-0 mt-0.5 font-mono text-[10px] w-4 text-right
                  text-neutral-300 dark:text-neutral-600 group-hover:text-[#233b24] dark:group-hover:text-[#ccfd50] transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="line-clamp-2 leading-relaxed">{post.title}</span>
              </motion.a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
