import { Dock, DockIcon } from "@/components/magicui/dock";
import { ModeToggle } from "@/components/mode-toggle";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./icons";

export default function Navbar() {
  return (
    <div className="pointer-events-none fixed mt-5 z-30 mx-auto mb-4 flex origin-bottom h-full w-full max-h-14">
      <div className="fixed bottom-0 inset-x-0 h-16 w-full bg-background to-transparent backdrop-blur-lg [-webkit-mask-image:linear-gradient(to_top,black,transparent)] dark:bg-background"></div>
      <Dock className="z-50 pointer-events-auto relative mx-auto flex min-h-full h-full items-center px-1 bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] transform-gpu dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] ">
        <DockIcon key={"home"}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={"/"}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-12 group",
                )}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  
                  {/* Default Image */}
                  <img
                    src="/logo-bw.png"
                    alt="Logo"
                    className="absolute max-h-[60%] max-w-full object-contain 
                              transition-opacity duration-300 ease-in-out
                              opacity-100 group-hover:opacity-0"
                  />

                  {/* Hover Image */}
                  <img
                    src="/favicon.ico"
                    alt="Logo Hover"
                    className="absolute max-h-[60%] max-w-full object-contain 
                              transition-opacity duration-300 ease-in-out
                              opacity-0 group-hover:opacity-100"
                  />
                  
                </div>
              </Link>
            </TooltipTrigger>
          </Tooltip>
        </DockIcon>
        <Separator orientation="vertical" className="h-full  mr-1" />
        {DATA.navbar.map((item) => (
          <DockIcon key={item.href}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "size-12",
                  )}
                >
                  <item.icon className="size-4" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        ))}
        <Separator orientation="vertical" className="h-full  mr-1" />
        <DockIcon key={"spotify"}>
          <div className=" flex flex-row bg-black/10 dark:bg-white/10 rounded-full backdrop-blur-sm ">
            <Icons.spotify className="size-6" />
          </div>
        </DockIcon>
        <Separator orientation="vertical" className="h-full ml-1" />
        <DockIcon>
          <Tooltip>
            <TooltipTrigger asChild>
              <ModeToggle />
            </TooltipTrigger>
            <TooltipContent>
              <p>Theme</p>
            </TooltipContent>
          </Tooltip>
        </DockIcon>
      </Dock>
    </div>
  );
}
