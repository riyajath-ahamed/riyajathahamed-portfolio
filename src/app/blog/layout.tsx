import { getMediumPosts } from "@/lib/getMediumPosts";
import { BlogProvider } from "@/components/blog/BlogContext";
import { BlogTOCConnected } from "@/components/blog/BlogTOCConnected";
import React, { ReactNode } from "react";

interface BlogLayoutProps {
    children: ReactNode;
}

export default async function BlogLayout({ children }: BlogLayoutProps) {
    const posts = await getMediumPosts();

    return (
        <BlogProvider posts={posts}>
            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[256px_1fr_256px]">
                <BlogTOCConnected />
                <div className="flex flex-col items-center px-4 py-8">
                    <main className="w-full">
                        {children}
                    </main>
                </div>
                <div className="hidden lg:block" />
            </div>
        </BlogProvider>
    );
}
