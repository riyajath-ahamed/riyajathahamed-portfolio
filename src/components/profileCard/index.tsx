"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

const TiltImage: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imageRef.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      // Calculate tilt (-15 to 15 degrees)
      const rotateX = ((y / height - 0.5) * 2) * 10; // vertical tilt
      const rotateY = ((x / width - 0.5) * 2) * 10; // horizontal tilt

      gsap.to(el, {
        rotateX: -rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: "power3.out",
        transformPerspective: 500,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: "power3.out" });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div ref={imageRef} className="w-[250px] h-[50px] cursor-pointer">
      <Image
        src="/tagCard.png"
        alt="Descriptive text for screen readers"
        width={250}
        height={50}
        className="responsive rounded-lg"
        placeholder="blur"
        blurDataURL="data:image/png"
      />
    </div>
  );
};

export default TiltImage;
