"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(
  () => import("@/components/magicui/Lanyard/Lanyard"),
  { ssr: false },
);

export default function HeroLanyard() {
  return (
    <Lanyard position={[5, 0, 13]} gravity={[0, -40, 0]} />
  );
}
