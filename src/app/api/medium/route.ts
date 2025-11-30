import { NextResponse } from "next/server";
import Parser from "rss-parser";

export const dynamic = "force-static";

export async function GET() {
  try {
    const mediumUsername = "riyajatha"; 
    const feedUrl = `https://medium.com/feed/@${mediumUsername}`;

    const parser = new Parser({
      customFields: {
        item: ["media:content", "media:thumbnail"],
      },
    });

    const feed = await parser.parseURL(feedUrl);

    const posts = feed.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      categories: item.categories,
      thumbnail:
        item["media:content"]?.$?.url ||
        item["media:thumbnail"]?.$?.url ||
        null,
      description: item["content:encodedSnippet"] || item.contentSnippet,
    }));

    return NextResponse.json({ success: true, posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch Medium posts" },
      { status: 500 }
    );
  }
}
