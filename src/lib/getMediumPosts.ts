import { headers } from "next/headers";

export async function getMediumPosts() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/medium`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.posts || [];
}
