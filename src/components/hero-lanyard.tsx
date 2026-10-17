"use client";

import dynamic from "next/dynamic";

const Lanyard = dynamic(
  () => import("@/components/magicui/Lanyard/Lanyard"),
  { ssr: false },
);

export default function HeroLanyard() {
  return (
    <Lanyard frontImage="/lanyard/card-front.png" backImage="/lanyard/card-back.png" strapImage="/lanyard/lanyard.png"
      imageFit="cover"
      cardColor="#ccfd50"
      orientation="portrait"
      finish="matte"
      cornerRadius={0.3}
      size={0.6}
      anchor="right"
      strapLength={0.5}
      strapColor="#111111"
      strapWidth={0.65}
      metal="graphite"
      gravity={1}
      damping={0.5}
      elasticity={0.5}
      breeze={0.5}
      interactive
      intro
      />
  );
}
