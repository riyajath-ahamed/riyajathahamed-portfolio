"use client";

import { useEffect, useState, useRef } from "react";
import Lanyard from "@/components/magicui/Lanyard/Lanyard";

export default function LanyardVisibilityWrapper() {
  const [isVisible, setIsVisible] = useState(false);
  const [containerReady, setContainerReady] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    let observer: IntersectionObserver | null = null;

    const init = () => {
      const contactSection = document.getElementById("contact");
      const lanyardContainer = document.getElementById("lanyard-container");
      
      if (!contactSection || !lanyardContainer) {
        // Retry after a short delay if elements aren't ready
        timeoutId = setTimeout(init, 100);
        return;
      }

      // Container is ready
      setContainerReady(true);

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const visible = entry.isIntersecting;
            isVisibleRef.current = visible;
            setIsVisible(visible);
          });
        },
        {
          threshold: 0.1,
        }
      );

      observer.observe(contactSection);
      
      // Check initial visibility
      const initialRect = contactSection.getBoundingClientRect();
      const isInitiallyVisible = initialRect.top < window.innerHeight && initialRect.bottom > 0;
      setIsVisible(isInitiallyVisible);
      isVisibleRef.current = isInitiallyVisible;

      return () => {
        if (observer) {
          observer.disconnect();
        }
      };
    };

    const cleanup = init();
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  if (!containerReady) return null;

  return (
    <div
      id="lanyard-free-wrapper"
      className="fixed inset-0 pointer-events-none z-0 right-60 bottom-60"
      style={{
        overflow: 'visible',
      }}
    >
      <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
    </div>
  );
}

