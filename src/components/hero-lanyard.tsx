"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Lanyard = dynamic(
  () => import("@/components/magicui/Lanyard/Lanyard"),
  { ssr: false },
);

export default function HeroLanyard() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return (
    <Lanyard
      position={[5, 0, 13]}
      gravity={[0, -40, 0]}
      interactive={isDesktop}
    />
  );
}
