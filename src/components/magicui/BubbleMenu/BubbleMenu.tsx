"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

type MenuItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: {
    bgColor?: string;
    textColor?: string;
  };
};

export type BubbleMenuProps = {
  logo: ReactNode | string;
  onMenuClick?: (open: boolean) => void;
  className?: string;
  style?: CSSProperties;
  menuAriaLabel?: string;
  menuBg?: string;
  menuContentColor?: string;
  useFixedPosition?: boolean;
  items?: MenuItem[];
  animationEase?: string;
  animationDuration?: number;
  staggerDelay?: number;
};

const DEFAULT_ITEMS: MenuItem[] = [
  {
    label: "home",
    href: "#",
    ariaLabel: "Home",
    rotation: -8,
    hoverStyles: { bgColor: "#3b82f6", textColor: "#ffffff" },
  },
  {
    label: "about",
    href: "#",
    ariaLabel: "About",
    rotation: 8,
    hoverStyles: { bgColor: "#10b981", textColor: "#ffffff" },
  },
  {
    label: "projects",
    href: "#",
    ariaLabel: "Documentation",
    rotation: 8,
    hoverStyles: { bgColor: "#f59e0b", textColor: "#ffffff" },
  },
  {
    label: "blog",
    href: "#",
    ariaLabel: "Blog",
    rotation: 8,
    hoverStyles: { bgColor: "#ef4444", textColor: "#ffffff" },
  },
  {
    label: "contact",
    href: "#",
    ariaLabel: "Contact",
    rotation: -8,
    hoverStyles: { bgColor: "#8b5cf6", textColor: "#ffffff" },
  },
];

export default function BubbleMenu({
  logo,
  onMenuClick,
  className,
  style,
  menuAriaLabel = "Toggle menu",
  menuBg = "#fff",
  menuContentColor = "#111",
  useFixedPosition = false,
  items,
  animationEase = "back.out(1.5)",
  animationDuration = 0.5,
  staggerDelay = 0.12,
}: BubbleMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const { theme, setTheme } = useTheme();

  const overlayRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLAnchorElement[]>([]);
  const labelRefs = useRef<HTMLSpanElement[]>([]);
  const themeToggleRef = useRef<HTMLButtonElement>(null);
  const sunIconRef = useRef<SVGSVGElement>(null);
  const moonIconRef = useRef<SVGSVGElement>(null);

  const menuItems = items?.length ? items : DEFAULT_ITEMS;

  const handleThemeToggle = () => {
    const sunIcon = sunIconRef.current;
    const moonIcon = moonIconRef.current;
    
    // Animate icon transition
    if (sunIcon && moonIcon) {
      if (theme === "dark") {
        // Switching to light: fade out moon, fade in sun
        gsap.to(moonIcon, {
          scale: 0,
          rotation: -180,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        gsap.fromTo(
          sunIcon,
          { scale: 0, rotation: 180, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.5)",
            delay: 0.15,
          }
        );
      } else {
        // Switching to dark: fade out sun, fade in moon
        gsap.to(sunIcon, {
          scale: 0,
          rotation: 180,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
        gsap.fromTo(
          moonIcon,
          { scale: 0, rotation: -180, opacity: 0 },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.3,
            ease: "back.out(1.5)",
            delay: 0.15,
          }
        );
      }
    }
    
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const containerClassName = [
    "bubble-menu",
    useFixedPosition ? "fixed" : "absolute",
    "left-0 right-0 top-8",
    "flex items-center justify-between",
    "gap-4 px-8",
    "pointer-events-none",
    "z-[1001]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleToggle = () => {
    const nextState = !isMenuOpen;
    if (nextState) setShowOverlay(true);
    setIsMenuOpen(nextState);
    onMenuClick?.(nextState);
  };

  useEffect(() => {
    const overlay = overlayRef.current;
    const bubbles = bubblesRef.current.filter(Boolean);
    const labels = labelRefs.current.filter(Boolean);
    const themeToggle = themeToggleRef.current;
    if (!overlay || !bubbles.length) return;

    if (isMenuOpen) {
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([...bubbles, ...labels, themeToggle].filter(Boolean));
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });
      if (themeToggle) {
        gsap.set(themeToggle, { scale: 0, transformOrigin: "50% 50%" });
      }

      bubbles.forEach((bubble, i) => {
        const delay = i * staggerDelay + gsap.utils.random(-0.05, 0.05);
        const tl = gsap.timeline({ delay });
        tl.to(bubble, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
        });
        if (labels[i]) {
          tl.to(
            labels[i],
            {
              y: 0,
              autoAlpha: 1,
              duration: animationDuration,
              ease: "power3.out",
            },
            "-=" + animationDuration * 0.9,
          );
        }
      });

      // Animate theme toggle button
      if (themeToggle) {
        const themeDelay = menuItems.length * staggerDelay + gsap.utils.random(-0.05, 0.05);
        gsap.to(themeToggle, {
          scale: 1,
          duration: animationDuration,
          ease: animationEase,
          delay: themeDelay,
        });
      }
    } else if (showOverlay) {
      gsap.killTweensOf([...bubbles, ...labels, themeToggle].filter(Boolean));
      gsap.to(labels, {
        y: 24,
        autoAlpha: 0,
        duration: 0.2,
        ease: "power3.in",
      });
      gsap.to(bubbles, {
        scale: 0,
        duration: 0.2,
        ease: "power3.in",
      });
      if (themeToggle) {
        gsap.to(themeToggle, {
          scale: 0,
          duration: 0.2,
          ease: "power3.in",
        });
      }
      gsap.delayedCall(0.2, () => {
        gsap.set(overlay, { display: "none" });
        setShowOverlay(false);
      });
    }
  }, [isMenuOpen, showOverlay, animationEase, animationDuration, staggerDelay, menuItems.length]);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen) {
        const bubbles = bubblesRef.current.filter(Boolean);
        const isDesktop = window.innerWidth >= 900;
        bubbles.forEach((bubble, i) => {
          const item = menuItems[i];
          if (bubble && item) {
            const rotation = isDesktop ? (item.rotation ?? 0) : 0;
            gsap.set(bubble, { rotation });
          }
        });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, menuItems]);

  // Initialize icon states
  useEffect(() => {
    const sunIcon = sunIconRef.current;
    const moonIcon = moonIconRef.current;
    
    if (sunIcon && moonIcon) {
      if (theme === "dark") {
        gsap.set(sunIcon, { scale: 0, opacity: 0 });
        gsap.set(moonIcon, { scale: 1, opacity: 1, rotation: 0 });
      } else {
        gsap.set(sunIcon, { scale: 1, opacity: 1, rotation: 0 });
        gsap.set(moonIcon, { scale: 0, opacity: 0 });
      }
    }
  }, [theme]);

  return (
    <>
      {/* Workaround for silly Tailwind capabilities */}
      <style>{`
        .bubble-menu .menu-line {
          transition: transform 0.3s ease, opacity 0.3s ease;
          transform-origin: center;
        }
        .theme-toggle-bubble svg {
          transform-origin: center;
        }
        @media (min-width: 900px) {
          .theme-toggle-bubble:hover {
            transform: scale(1.06);
            background: var(--hover-bg) !important;
          }
          .theme-toggle-bubble:active {
            transform: scale(.94);
          }
        }
        @media (max-width: 899px) {
          .theme-toggle-bubble:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
          }
          .theme-toggle-bubble:active {
            transform: scale(.94);
          }
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):nth-last-child(2) {
          margin-left: calc(100% / 6);
        }
        .bubble-menu-items .pill-list .pill-col:nth-child(4):last-child {
          margin-left: calc(100% / 3);
        }
        @media (min-width: 900px) {
          .bubble-menu-items .pill-link {
            transform: rotate(var(--item-rot));
          }
          .bubble-menu-items .pill-link:hover {
            transform: rotate(var(--item-rot)) scale(1.06);
            background: var(--hover-bg) !important;
            color: var(--hover-color) !important;
          }
          .bubble-menu-items .pill-link:active {
            transform: rotate(var(--item-rot)) scale(.94);
          }
        }
        @media (max-width: 899px) {
          .bubble-menu-items {
            padding-top: 120px;
            align-items: flex-start;
          }
          .bubble-menu-items .pill-list {
            row-gap: 16px;
          }
          .bubble-menu-items .pill-list .pill-col {
            flex: 0 0 100% !important;
            margin-left: 0 !important;
            overflow: visible;
          }
          .bubble-menu-items .pill-link {
            font-size: clamp(1.2rem, 3vw, 4rem);
            padding: clamp(1rem, 2vw, 2rem) 0;
            min-height: 80px !important;
          }
          .bubble-menu-items .pill-link:hover {
            transform: scale(1.06);
            background: var(--hover-bg);
            color: var(--hover-color);
          }
          .bubble-menu-items .pill-link:active {
            transform: scale(.94);
          }
        }
      `}</style>

      <nav
        className={containerClassName}
        style={style}
        aria-label="Main navigation"
      >
        <div
          className={[
            "bubble logo-bubble",
            "inline-flex items-center justify-center",
            "rounded-full",
            "bg-white",
            "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
            "pointer-events-auto",
            "h-12 md:h-14",
            "px-4 md:px-8",
            "gap-2",
            "will-change-transform",
          ].join(" ")}
          aria-label="Logo"
          style={{
            background: menuBg,
            minHeight: "48px",
            borderRadius: "9999px",
          }}
        >
          <span
            className={[
              "logo-content",
              "inline-flex items-center justify-center",
              "w-[48px] h-full",
            ].join(" ")}
            style={
              {
                ["--logo-max-height"]: "60%",
                ["--logo-max-width"]: "100%",
              } as CSSProperties
            }
          >
            {typeof logo === "string" ? (
              <img
                src={logo}
                alt="Logo"
                className="bubble-logo max-h-[60%] max-w-full object-contain block"
                onClick={() => window.location.href = "/"}
              />
            ) : (
              logo
            )}
          </span>
        </div>

        <button
          type="button"
          className={[
            "bubble toggle-bubble menu-btn",
            isMenuOpen ? "open" : "",
            "inline-flex flex-col items-center justify-center",
            "rounded-full",
            "bg-white",
            "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
            "pointer-events-auto",
            "w-12 h-12 md:w-14 md:h-14",
            "border-0 cursor-pointer p-0",
            "will-change-transform",
          ].join(" ")}
          onClick={handleToggle}
          aria-label={menuAriaLabel}
          aria-pressed={isMenuOpen}
          style={{ background: menuBg }}
        >
          <span
            className="menu-line block mx-auto rounded-[2px]"
            style={{
              width: 26,
              height: 2,
              background: menuContentColor,
              transform: isMenuOpen ? "translateY(4px) rotate(45deg)" : "none",
            }}
          />
          <span
            className="menu-line short block mx-auto rounded-[2px]"
            style={{
              marginTop: "6px",
              width: 26,
              height: 2,
              background: menuContentColor,
              transform: isMenuOpen
                ? "translateY(-4px) rotate(-45deg)"
                : "none",
            }}
          />
        </button>
      </nav>

      {showOverlay && (
        <div
          ref={overlayRef}
          className={[
            "bubble-menu-items",
            useFixedPosition ? "fixed" : "absolute",
            "inset-0",
            "flex items-center justify-center",
            "pointer-events-none",
            "backdrop-blur-sm",
            "z-[1000]",
          ].join(" ")}
          aria-hidden={!isMenuOpen}
        >
          <ul
            className={[
              "pill-list",
              "list-none m-0 px-6",
              "w-full max-w-[1600px] mx-auto",
              "flex flex-wrap",
              "gap-x-0 gap-y-1",
              "pointer-events-auto",
            ].join(" ")}
            role="menu"
            aria-label="Menu links"
          >
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                role="none"
                className={[
                  "pill-col",
                  "flex justify-center items-stretch",
                  "[flex:0_0_calc(100%/3)]",
                  "box-border",
                ].join(" ")}
              >
                <a
                  role="menuitem"
                  href={item.href}
                  aria-label={item.ariaLabel || item.label}
                  className={[
                    "pill-link",
                    "w-full",
                    "rounded-[999px]",
                    "no-underline",
                    "bg-white",
                    "text-inherit",
                    "shadow-[0_4px_14px_rgba(0,0,0,0.10)]",
                    "flex items-center justify-center",
                    "relative",
                    "transition-[background,color] duration-300 ease-in-out",
                    "box-border",
                    "whitespace-nowrap overflow-hidden",
                  ].join(" ")}
                  style={
                    {
                      ["--item-rot"]: `${item.rotation ?? 0}deg`,
                      ["--pill-bg"]: menuBg,
                      ["--pill-color"]: menuContentColor,
                      ["--hover-bg"]: item.hoverStyles?.bgColor || "#f3f4f6",
                      ["--hover-color"]:
                        item.hoverStyles?.textColor || menuContentColor,
                      background: "var(--pill-bg)",
                      color: "var(--pill-color)",
                      minHeight: "var(--pill-min-h, 160px)",
                      padding: "clamp(1.5rem, 3vw, 8rem) 0",
                      fontSize: "clamp(1.5rem, 4vw, 4rem)",
                      fontWeight: 400,
                      lineHeight: 0,
                      willChange: "transform",
                      height: 10,
                    } as CSSProperties
                  }
                  ref={(el) => {
                    if (el) bubblesRef.current[idx] = el;
                  }}
                >
                  <span
                    className="pill-label inline-block"
                    style={{
                      willChange: "transform, opacity",
                      height: "1.2em",
                      lineHeight: 1.2,
                    }}
                    ref={(el) => {
                      if (el) labelRefs.current[idx] = el;
                    }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
            <li
              key={"theme-toggle"}
              role="none"
              className={[
                "pill-col",
                "flex justify-center items-stretch",
                "[flex:0_0_calc(100%/3)]",
                "box-border",
              ].join(" ")}
            >
              <button
                ref={themeToggleRef}
                type="button"
                className={[
                  "bubble theme-toggle-bubble",
                  "inline-flex items-center justify-center",
                  "rounded-full",
                  "bg-white",
                  "shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
                  "pointer-events-auto",
                  "w-12 h-12 md:w-14 md:h-14",
                  "border-0 cursor-pointer p-0",
                  "will-change-transform",
                  "pill-link",
                  "w-full",
                  "rounded-[999px]",
                  "no-underline",
                  "bg-white",
                  "text-inherit",
                  "shadow-[0_4px_14px_rgba(0,0,0,0.10)]",
                  "flex items-center justify-center",
                  "relative",
                  "transition-[background,color] duration-300 ease-in-out",
                  "box-border",
                  "whitespace-nowrap overflow-hidden",
                ].join(" ")}
                onClick={handleThemeToggle}
                aria-label="Toggle theme"
                style={
                  {
                    ["--item-rot"]: `${0}deg`,
                    ["--pill-bg"]: menuBg,
                    ["--pill-color"]: menuContentColor,
                    ["--hover-bg"]: "#f3f4f6",
                    ["--hover-color"]: menuContentColor,
                    background: "var(--pill-bg)",
                    color: "var(--pill-color)",
                    minHeight: "var(--pill-min-h, 160px)",
                    padding: "clamp(1.5rem, 3vw, 8rem) 0",
                    fontSize: "clamp(1.5rem, 4vw, 4rem)",
                    fontWeight: 400,
                    lineHeight: 0,
                    willChange: "transform",
                    height: 10,
                  } as CSSProperties
                }
              >
                <SunIcon
                  ref={sunIconRef}
                  className="h-[1.2rem] w-[1.2rem] dark:hidden"
                  style={{ color: menuContentColor }}
                />
                <MoonIcon
                  ref={moonIconRef}
                  className="hidden h-[1.2rem] w-[1.2rem] dark:block"
                  style={{ color: menuContentColor }}
                />
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
