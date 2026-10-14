import ResponsiveNavbar from "@/components/responsive-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Mynerve, Outfit } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import Particles from "@/components/magicui/particles";
import AuroraBackground from "@/components/AuroraBackground";
import { PostHogProvider } from "@/components/posthog-provider";


const fontSans = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

const fontHand = Mynerve({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hand",
  weight: "400",
});

const acorn = localFont({
  src: [
    { path: "/font/Acorn-Regular.otf", weight: "400" },
    { path: "/font/Acorn-SemiBold.otf", weight: "700" },
  ],
  preload: true,
  variable: "--font-acorn",
}); 

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  appleWebApp: {
    title: DATA.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          " bg-background font-sans overflow-x-hidden",
          fontSans.variable, fontMono.variable, fontHand.variable, acorn.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <PostHogProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[#fbf8f1] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-900 focus:shadow-[0_8px_24px_rgba(60,40,20,0.16)] focus:outline-none focus:ring-2 focus:ring-[#e8413c]"
          >
            Skip to content
          </a>
          <AuroraBackground />
          <div
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(232,65,60,0.08) 0%, rgba(43,76,126,0.04) 46%, transparent 72%)",
            }}
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[632px] w-screen -translate-x-1/2 overflow-hidden blur-3xl md:w-[840px]"
          />
          <Particles
            className="fixed inset-0"
            quantity={500}
            ease={80}
            refresh
          />
          <TooltipProvider delayDuration={0}>
          <ResponsiveNavbar />
            <div id="content">{children}</div>
          </TooltipProvider>
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
