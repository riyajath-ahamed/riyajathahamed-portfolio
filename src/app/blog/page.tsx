import BlurFadeText from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";
import { BlogClientWrapper } from "@/components/blog/BlogClientWrapper";
import { getMediumPosts } from "@/lib/getMediumPosts";
import type { Metadata } from "next";
import React from "react";

const BLUR_FADE_DELAY = 0.04;

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getMediumPosts();

  interface PostWithCategories {
    categories: string[];
  }

  const keywords: string[] = Array.from(
    new Set((posts as PostWithCategories[]).flatMap((p: PostWithCategories) => p.categories))
  ).slice(0, 20);

  const recentDescriptions = posts
    .slice(0, 5)
    .map((p) => p.description?.replace(/<[^>]*>/g, "").trim())
    .filter((d): d is string => typeof d === "string" && d.length > 0)
    .join(" · ");

  const description = recentDescriptions
    ? `${recentDescriptions.slice(0, 200)}…`
    : `Articles on ${keywords.slice(0, 5).join(", ")} by ${DATA.name}.`;

  const latestPost = posts[0];

  return {
    title: "Blog",
    description,
    keywords,
    openGraph: {
      title: `Blog — ${DATA.name}`,
      description,
      url: `${DATA.url}/blog`,
      siteName: DATA.name,
      type: "website",
      ...(latestPost?.thumbnail && {
        images: [{ url: latestPost.thumbnail, width: 1200, height: 630, alt: latestPost.title }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `Blog — ${DATA.name}`,
      description,
      ...(latestPost?.thumbnail && { images: [latestPost.thumbnail] }),
    },
    alternates: {
      canonical: `${DATA.url}/blog`,
    },
  };
}

const BlogPage = () => {
  return (
    <div className="py-8">
      <JsonLd />
      <section className="relative flex flex-col items-center">
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-3 mt-10 text-balance text-center">
          <BlurFadeText
            delay={BLUR_FADE_DELAY}
            className="text-6xl font-bold font-serif tracking-tighter sm:text-6xl xl:text-7xl/none pointer-events-none bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-transparent dark:from-white dark:to-slate-900/10"
            yOffset={8}
            text={`Blog`}
          />
          <BlurFadeText
            className="max-w-[600px] font-serif pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-2xl font-normal leading-none text-transparent dark:from-white dark:to-slate-900/10 p-2 md:text-xl lg:text-2xl xl:text-3xl"
            delay={BLUR_FADE_DELAY}
            text="Latest Articles"
          />
        </div>

        <div className="mt-16 w-full">
          <BlogClientWrapper />
        </div>
      </section>

      <footer className="mt-20 text-center text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} {DATA.name} — All rights reserved.
      </footer>
    </div>
  );
};

async function JsonLd() {
  const posts = await getMediumPosts();

  interface MediumPost {
    title: string;
    link: string;
    pubDate: string;
    description?: string;
    categories: string[];
    thumbnail?: string;
  }

  interface PersonSchema {
    "@type": "Person";
    name: string;
    url: string;
  }

  interface BlogPostingSchema {
    "@type": "BlogPosting";
    headline: string;
    url: string;
    datePublished: string;
    description?: string;
    keywords: string;
    author: PersonSchema;
    image?: string;
  }

  interface ListItemSchema {
    "@type": "ListItem";
    position: number;
    item: BlogPostingSchema;
  }

  interface ItemListSchema {
    "@context": "https://schema.org";
    "@type": "ItemList";
    name: string;
    url: string;
    itemListElement: ListItemSchema[];
  }

  const schema: ItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Blog — ${DATA.name}`,
    url: `${DATA.url}/blog`,
    itemListElement: (posts as MediumPost[]).map((post, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "BlogPosting",
        headline: post.title,
        url: post.link,
        datePublished: post.pubDate,
        description: post.description?.replace(/<[^>]*>/g, "").trim(),
        keywords: post.categories.join(", "),
        author: {
          "@type": "Person",
          name: DATA.name,
          url: DATA.url,
        },
        ...(post.thumbnail && { image: post.thumbnail }),
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default BlogPage;
