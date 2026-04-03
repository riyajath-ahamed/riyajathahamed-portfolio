"use client";

import React from "react";
import { useBlogContext } from "./BlogContext";
import { BentoGrid } from "./BentoGrid";

export function BlogClientWrapper() {
  const { filteredPosts, selectedCategory } = useBlogContext();

  if (filteredPosts.length === 0) {
    return (
      <p className="text-center text-gray-500 py-16">
        No posts in this category yet.
      </p>
    );
  }

  return <BentoGrid posts={filteredPosts} key={selectedCategory ?? "all"} />;
}
