import Link from "next/link";
import { BLUR_FADE_DELAY } from "@/lib/home";
import { cn } from "@/lib/utils";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import BlurFade from "@/components/magicui/blur-fade";
import { CopyEmailButton } from "@/components/contact/copy-email-button";
import PhotoCard from "./photocard";
import { TodoList } from "@/components/contact/todo-list";
import IpodPreview from "@/components/phonePreview";

const tile =
  "relative flex h-full flex-col overflow-hidden rounded-[22px] border border-black/[0.05] bg-background p-5 text-neutral-900 shadow-[0_1px_1px_rgba(0,0,0,0.03)] transition-[transform,box-shadow] duration-300 ease-out hover:shadow-[0_10px_28px_rgba(20,20,20,0.06)] dark:border-white/[0.07] dark:text-neutral-100";

const title =
  "text-balance text-[15px] font-medium tracking-[-0.015em] text-neutral-900 dark:text-neutral-100";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-white/70";

const SKILLS: { name: string; className: string }[] = [
  { name: "React", className: "left-[7%] top-[8%] -rotate-2" },
  { name: "Next.js", className: "right-[8%] top-[5%] rotate-[7deg]" },
  { name: "TypeScript", className: "left-[5%] top-[32%]" },
  { name: "Node.js", className: "right-[4%] top-[30%] -rotate-[4deg]" },
  { name: "GraphQL", className: "left-[16%] top-[54%] -rotate-1" },
  { name: "React Native", className: "left-[40%] top-[50%] rotate-[2deg]" },
  { name: "Docker", className: "right-[7%] top-[56%] rotate-[3deg]" },
  { name: "GCP", className: "left-[8%] bottom-[8%] -rotate-[7deg]" },
  { name: "Postgres", className: "right-[12%] bottom-[10%] rotate-[8deg]" },
];

const SOCIALS = [
  {
    name: "LinkedIn",
    href: DATA.contact.social.LinkedIn.url,
    icon: Icons.linkedin,
  },
  {
    name: "X",
    href: DATA.contact.social.X.url,
    icon: Icons.x,
  },
  {
    name: "GitHub",
    href: DATA.contact.social.GitHub.url,
    icon: Icons.github,
  },
  {
    name: "Medium",
    href: DATA.contact.social.Medium.url,
    icon: Icons.medium,
  },
] as const;

function SkillPill({
  name,
  className,
  floating = true,
}: {
  name: string;
  className?: string;
  floating?: boolean;
}) {
  return (
    <span
      className={cn(
        "whitespace-nowrap rounded-full bg-white px-3.5 py-[7px] text-[13px] font-medium tracking-[-0.01em] text-neutral-800 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_18px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:rotate-0 dark:bg-[#243041] dark:text-neutral-100",
        floating && "absolute",
        className,
      )}
    >
      {name}
    </span>
  );
}

function GmailMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        fill="#4caf50"
        d="M45 16.2 40 18.95 35 23.7V40h7c1.657 0 3-1.343 3-3V16.2z"
      />
      <path
        fill="#1e88e5"
        d="M3 16.2 6.614 17.91 13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z"
      />
      <path
        fill="#e53935"
        d="m35 11.2-11 8.25-11-8.25-1 5.8 1 6.7 11 8.25 11-8.25 1-6.7z"
      />
      <path
        fill="#c62828"
        d="M3 12.298V16.2l10 7.5V11.2l-3.124-2.341A4.3 4.3 0 0 0 7.298 8C4.924 8 3 9.924 3 12.298z"
      />
      <path
        fill="#fbc02d"
        d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341A4.3 4.3 0 0 1 40.702 8C43.076 8 45 9.924 45 12.298z"
      />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="col-span-full">
      <BlurFade delay={BLUR_FADE_DELAY * 18}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <PhotoCard className="lg:col-start-1 lg:row-start-1" />

          <article className={cn(tile, "min-h-[230px] lg:col-start-2 lg:row-start-1")}>
            <h2 className={title}>Skills & Stack</h2>
            <div className="relative mt-3 min-h-[168px] flex-1 md:block">
              {SKILLS.map((skill) => (
                <SkillPill key={skill.name} name={skill.name} className={skill.className} />
              ))}
            </div>
          </article>

          <article className={cn(tile, "p-0 lg:col-start-3 lg:row-start-1 lg:row-span-2")}>
            <IpodPreview />
          </article>

          <article
            className={cn(
              tile,
              "lg:col-start-1 lg:row-start-2 lg:row-span-2",
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h2 className="text-xl font-semibold tracking-[-0.02em]">{DATA.name}</h2>
                <p className="mt-1 truncate text-[15px] text-neutral-500 dark:text-neutral-400">
                  {DATA.contact.email}
                </p>
              </div>
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05),0_6px_16px_rgba(0,0,0,0.06)]">
                <GmailMark className="size-8" />
              </span>
            </div>

            <div className="-mr-5 mt-5 rounded-l-xl bg-white py-4 pl-4 pr-5 shadow-[0_2px_4px_rgba(0,0,0,0.04),0_8px_20px_rgba(0,0,0,0.06)] dark:bg-white/[0.06] dark:shadow-none">
              <div className="flex items-center gap-2 text-[15px]">
                <p className="min-w-0 flex-1 truncate">
                  <span className="mr-1.5">To</span>
                  <span>{DATA.contact.email}</span>
                </p>
                <CopyEmailButton email={DATA.contact.email} />
              </div>
              <p className="mt-5 text-[15px]">Let&apos;s chat</p>
              <p className="mt-6 text-sm text-neutral-500 dark:text-neutral-400">Say hello</p>
            </div>

            <div className="mt-auto pt-5">
              <a
                href={`mailto:${DATA.contact.email}`}
                className={cn(
                  "flex h-12 w-full items-center justify-center rounded-xl border border-black/[0.14] bg-white text-base font-semibold text-neutral-900 transition-[transform,background-color] duration-200 hover:bg-neutral-50 active:scale-[0.98] dark:border-white/10 dark:bg-[#121820] dark:text-neutral-100 dark:hover:bg-[#0e141c]",
                  focusRing,
                )}
              >
                Email me
              </a>
            </div>
          </article>

          <article className={cn(tile, "min-h-[180px] lg:col-start-2 lg:row-start-2")}>
            <h2 className={title}>To do</h2>
            <TodoList />
          </article>

          <div
            className={cn(
              tile,
              "min-h-[92px] flex-row  gap-3 px-6 py-4 md:col-span-2 lg:col-span-2 lg:col-start-2 lg:row-start-3",
            )}
          >
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.name}
                  className={cn(
                    "grid size-10 place-items-center bg-background/90 rounded-lg shadow-[0_6px_14px_rgba(0,0,0,0.12)] transition-transform duration-200 hover:scale-[1.5] active:scale-[1]",
                    focusRing,
                  )}
                >
                  <Icon className="size-[22px] text-foreground" />
                </Link>
              );
            })}
          </div>
        </div>
      </BlurFade>
    </section>
  );
}
