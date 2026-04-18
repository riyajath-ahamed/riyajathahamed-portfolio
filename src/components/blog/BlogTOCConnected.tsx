"use client";

import React from "react";
import { BlogTOC } from "./BlogTOC";
import { useBlogContext } from "./BlogContext";

export function BlogTOCConnected() {
  const { posts, selectedCategory, setSelectedCategory } = useBlogContext();

  return (
    <BlogTOC
      posts={posts}
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
    />
  );
}
