"use client";

import Navbar from "@/components/navbar";
import BubbleMenu from "./magicui/BubbleMenu/BubbleMenu";
import { DATA } from "@/data/resume";

export default function ResponsiveNavbar() {
  return (
    <>
      {/* Desktop Navbar - hidden on mobile */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      
      {/* Mobile Navigation Menu - hidden on desktop */}
      <div className="md:hidden fixed inset-0 z-50 ">
        <BubbleMenu logo="/favicon.ico" items={DATA.navbar.map((item) => ({
          label: item.label,
          href: item.href,
          ariaLabel: item.label,
          rotation: -8,
          hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
        }))}
        menuBg="#ffffff"
        menuContentColor="#111111"
        useFixedPosition={false}
        animationEase="back.out(1.5)"
        animationDuration={0.5}
        staggerDelay={0.12}
        />
      </div>
    </>
  );
}

