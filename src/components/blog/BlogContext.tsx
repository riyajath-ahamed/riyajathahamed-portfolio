"use client";

import React, { createContext, useContext, useState } from "react";
import { MediumPostsType } from "@/app/blog/config";

type BlogContextType = {
  posts: MediumPostsType[];
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  filteredPosts: MediumPostsType[];
};

const BlogContext = createContext<BlogContextType | null>(null);

export function BlogProvider({
  posts,
  children,
}: {
  posts: MediumPostsType[];
  children: React.ReactNode;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = selectedCategory
    ? posts.filter((p) => p.categories.includes(selectedCategory))
    : posts;

  return (
    <BlogContext.Provider value={{ posts, selectedCategory, setSelectedCategory, filteredPosts }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogContext() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlogContext must be used within BlogProvider");
  return ctx;
}
