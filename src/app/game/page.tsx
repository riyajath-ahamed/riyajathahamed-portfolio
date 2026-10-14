import type { Metadata } from "next";
import GameSelect from "@/components/game/GameSelect";
import { DATA } from "@/data/resume";

export const metadata: Metadata = {
  title: "Games",
  description: "Play Draw Circle and Color Memo. Short challenges with live leaderboards.",
  openGraph: {
    title: `Games | ${DATA.name}`,
    description: "Play Draw Circle and Color Memo. Short challenges with live leaderboards.",
    url: `${DATA.url}/game`,
    siteName: DATA.name,
    type: "website",
  },
  alternates: {
    canonical: `${DATA.url}/game`,
  },
};

export default function GamePage() {
  return <GameSelect />;
}
