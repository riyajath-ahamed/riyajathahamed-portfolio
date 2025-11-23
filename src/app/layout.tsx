import ResponsiveNavbar from "@/components/responsive-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Poppins as FontSans } from "next/font/google";
import localFont from 'next/font/local'
import "./globals.css";
import Particles from "@/components/magicui/particles";
import Spline from "@splinetool/react-spline";
import AuroraBackground from "@/components/AuroraBackground";

const fontSans = FontSans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
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
  verification: {
    google: "",
    yandex: "",
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
          fontSans.variable, acorn.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuroraBackground />
          <div
            style={{
              background:
                "linear-gradient(to bottom, #6C47FF00 0%, #6C47FF 50%, #6C47FF00 100%)",
              opacity: "15%",

              // TODO: background: "linear-gradient(180deg, #6C47FF 0%, #6C47FF 50%, #6C47FF 100%)", yellow
            }}
            className="w-screen md:w-[840px] h-[632px] overflow-hidden blur-3xl pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 -z-10 "
          ></div>
          <Particles
            className="fixed inset-0"
            quantity={500}
            ease={80}
            refresh
          />
          <TooltipProvider delayDuration={0}>
          <ResponsiveNavbar />
            {children}
          </TooltipProvider>
        </ThemeProvider>
        {/*  xl:inset-y-0 xl:-right-[70vh] xl:inset-x-auto  */}
        <div className=" hidden sm:block absolute inset-x-0 top-[60vh] -z-10 overflow-x-hidden ">
        <Spline className="fixed w-full h-full inset-x-0 top-[60vh] -z-10 overflow-x-hidden"
          scene="https://prod.spline.design/IKyLNSd3P6WxwJpg/scene.splinecode" 
        />
        </div>
        
      </body>
    </html>
  );
}
