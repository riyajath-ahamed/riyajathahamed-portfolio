import Parser from "rss-parser";
import { MediumPostsType } from "@/app/blog/config";

const MEDIUM_USERNAME = "riyajatha";
const FEED_URL = `https://medium.com/feed/@${MEDIUM_USERNAME}`;

let cached: { posts: MediumPostsType[]; ts: number } | null = null;
const TTL = 60 * 60 * 1000; // 1 hour

export async function getMediumPosts(): Promise<MediumPostsType[]> {
  if (cached && Date.now() - cached.ts < TTL) {
    return cached.posts;
  }

  try {
    const parser = new Parser({
      customFields: {
        item: ["media:content", "media:thumbnail"],
      },
    });

    const feed = await parser.parseURL(FEED_URL);

    const posts: MediumPostsType[] = feed.items.map((item: any) => ({
      title: item.title ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
      categories: item.categories ?? [],
      thumbnail:
        item["media:content"]?.$?.url ||
        item["media:thumbnail"]?.$?.url ||
        null,
      description: item["content:encodedSnippet"] || item.contentSnippet || "",
    }));

    cached = { posts, ts: Date.now() };
    return posts;
  } catch {
    return cached?.posts ?? [];
  }
}
