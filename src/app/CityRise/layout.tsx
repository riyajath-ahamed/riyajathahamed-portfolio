import type { ReactNode } from "react";
import NewGameGate from "@/components/game/NewGameGate";

export default function CityRiseLayout({ children }: { children: ReactNode }) {
  return <NewGameGate>{children}</NewGameGate>;
}
