"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { DATA } from "@/data/resume";
import { BLUR_FADE_DELAY, cardBase } from "@/lib/home";
import { cn } from "@/lib/utils";
import { writeClipboard } from "@/components/contact/copy-email-button";
import BlurFade from "../magicui/blur-fade";

type Project = (typeof DATA.projects)[number];
type Showcased = Extract<Project, { image: string }>;
type ProjectLink = Project["links"][number];

const showcased = DATA.projects.filter((p): p is Showcased => "image" in p);
const tools = DATA.projects.filter((p) => !("image" in p));

const LINK_LABELS: Record<string, string> = {
  Website: "Website",
  "Dev - Website": "Preview",
  GitHub: "GitHub",
  NPM: "npm",
  "mcp-schema-validator-ui": "UI repo",
};

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const mat =
  "relative aspect-[16/10] overflow-hidden rounded-xl bg-[#f1ece2] ring-1 ring-black/5 dark:bg-white/[0.04] dark:ring-white/10";
function pad(n: number) {
  return String(n).padStart(2, "0");
}

function secondaryLinks(project: Project) {
  return (project.links as readonly ProjectLink[]).filter((link) => link.href !== project.href);
}

function installCommand(project: Project) {
  const links = project.links as readonly ProjectLink[];
  const npm = links.find((link) => link.type === "NPM");
  if (npm) return `npm i ${npm.href.replace(/\/+$/, "").split("/").pop()}`;
  const repo = links.find((link) => link.type === "GitHub");
  if (repo) return `gh repo clone ${new URL(repo.href).pathname.slice(1)}`;
  return null;
}

function LinkRow({ project }: { project: Project }) {
  const links = secondaryLinks(project);
  if (links.length === 0) return null;

  return (
    <div className="relative z-10 flex flex-wrap items-center gap-x-4 gap-y-1">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 underline decoration-foreground/20 underline-offset-4 transition-colors hover:text-[#e8413c] hover:decoration-[#e8413c] dark:hover:text-[#ff7a6e] dark:hover:decoration-[#ff7a6e]"
        >
          {link.icon}
          {LINK_LABELS[link.type] ?? link.type}
        </Link>
      ))}
    </div>
  );
}

function Screenshot({ project, className }: { project: Showcased; className?: string }) {
  return (
    <div
      className={cn(
        "absolute left-[7%] top-[11%] aspect-[16/10] h-full overflow-hidden rounded-lg shadow-[0_24px_60px_rgba(60,40,20,0.22)] ring-1 ring-black/10 dark:shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <Image
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        fill
        sizes="(min-width: 1024px) 760px, 100vw"
        className="object-cover object-left-top"
      />
    </div>
  );
}

function ProjectRow({
  project,
  index,
  active,
  onActivate,
}: {
  project: Showcased;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE_OUT }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className="group relative grid grid-cols-[2.5rem_minmax(0,1fr)] border-t border-foreground/10 py-6 last:border-b"
    >
      <span
        className={cn(
          "pt-2.5 font-mono text-xs tabular-nums text-foreground/40 transition-colors duration-300",
          active && "lg:text-[#e8413c] dark:lg:text-[#ff7a6e]",
        )}
      >
        {pad(index + 1)}
      </span>

      <div className="min-w-0">
        <h3
          className={cn(
            "font-serif text-2xl font-bold leading-tight tracking-tight transition-colors duration-300 md:text-3xl",
            !active && "lg:text-foreground/40",
          )}
        >
          <Link
            href={project.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-foreground focus-visible:after:ring-offset-4 focus-visible:after:ring-offset-background"
          >
            {project.title}
            <ArrowUpRight
              className={cn(
                "size-5 shrink-0 text-foreground/40 transition-[transform,color,opacity] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                active ? "lg:text-[#e8413c] dark:lg:text-[#ff7a6e]" : "lg:opacity-0",
              )}
              strokeWidth={2}
              aria-hidden
            />
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 max-w-[60ch] text-base leading-relaxed text-foreground/60 lg:sr-only">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="text-sm text-foreground/45">
            {(project.technologies as readonly string[]).slice(0, 3).join(" · ")}
          </p>
          <LinkRow project={project} />
        </div>
      </div>
    </motion.li>
  );
}

function ProjectIndex() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = showcased[active];

  return (
    <div className="mt-10 grid grid-cols-1 gap-x-12 lg:grid-cols-12 lg:items-start">
      <ol className="lg:col-span-5">
        {showcased.map((project, i) => (
          <ProjectRow
            key={project.title}
            project={project}
            index={i}
            active={i === active}
            onActivate={() => setActive(i)}
          />
        ))}
      </ol>

      <BlurFade delay={BLUR_FADE_DELAY * 16} className="hidden lg:col-span-7 lg:block">
        <div aria-hidden>
          <div className={mat}>
            {showcased.map((project, i) => (
              <Screenshot
                key={project.title}
                project={project}
                className={cn(
                  "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-opacity",
                  i === active
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0 motion-reduce:translate-y-0",
                )}
              />
            ))}
            <span className="absolute right-4 top-3.5 font-mono text-[11px] tabular-nums tracking-[0.2em] text-foreground/40">
              {pad(active + 1)} / {pad(showcased.length)}
            </span>
          </div>

          <div className="mt-5 min-h-[5.25rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={current.title}
                initial={reduce ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -4 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="line-clamp-3 max-w-[62ch] text-base leading-relaxed text-foreground/60"
              >
                {current.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </BlurFade>
    </div>
  );
}

function InstallCommand({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  async function copy() {
    try {
      await writeClipboard(command);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  const Icon = copied ? Check : Copy;

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : `Copy ${command}`}
      className="relative z-10 inline-flex max-w-full items-center gap-3 justify-self-start rounded-lg bg-foreground/[0.04] py-2 pl-3 pr-2.5 font-mono text-[13px] text-foreground/75 ring-1 ring-inset ring-foreground/[0.08] transition-[background-color,transform] duration-200 hover:bg-foreground/[0.07] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground"
    >
      <span className="truncate">
        <span aria-hidden className="mr-2 select-none text-foreground/35">
          $
        </span>
        {command}
      </span>
      <Icon
        className={cn("size-3.5 shrink-0", copied ? "text-[#2f8f72]" : "text-foreground/40")}
        strokeWidth={2}
        aria-hidden
      />
    </button>
  );
}

function PackageRow({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const command = installCommand(project);

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: EASE_OUT }}
      className="group relative py-6"
    >
      <h4 className="font-mono text-base font-medium tracking-tight md:text-[17px]">
        <Link
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 break-all outline-none transition-colors after:absolute after:inset-0 after:rounded-lg group-hover:text-[#e8413c] focus-visible:after:ring-2 focus-visible:after:ring-foreground dark:group-hover:text-[#ff7a6e]"
        >
          {project.title}
          <ArrowUpRight
            className="size-4 shrink-0 text-foreground/40 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-current"
            strokeWidth={2}
            aria-hidden
          />
        </Link>
      </h4>
      <p className="mt-1.5 line-clamp-2 max-w-[62ch] text-sm leading-relaxed text-foreground/60 md:text-base">
        {project.description}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        {command && <InstallCommand command={command} />}
        <LinkRow project={project} />
      </div>
    </motion.li>
  );
}

export default function Projects() {
  return (
    <section id="projects" className={cn(cardBase, "col-span-full")}>
      <BlurFade delay={BLUR_FADE_DELAY * 15}>
        <h2 className="flex items-center gap-2 pb-[0.08em] font-serif text-4xl font-bold leading-none tracking-tighter sm:text-5xl text-foreground text-balance">
          Selected
          <Image
            src="/beyond/Selectedproject.png"
            alt=""
            aria-hidden
            width={512}
            height={512}
            sizes="48px"
            className="h-[1em] w-auto shrink-0 pb-2"
          />
          Projects
        </h2>
      </BlurFade>

      <ProjectIndex />

      {tools.length > 0 && (
        <div className="mt-20 grid grid-cols-1 gap-x-12 gap-y-4 lg:grid-cols-12">
          <BlurFade delay={BLUR_FADE_DELAY * 17} className="lg:col-span-4">
            <h3 className="font-serif text-3xl font-bold leading-tight tracking-tight">
              Open source
            </h3>
            <p className="mt-3 max-w-[34ch] text-base leading-relaxed text-foreground/60">
              Small tools for DX. Copy a command to try one.
            </p>
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:text-[#e8413c] hover:decoration-current dark:hover:text-[#ff7a6e]"
            >
              All repositories
              <ArrowUpRight className="size-4" strokeWidth={2} aria-hidden />
            </Link>
          </BlurFade>

          <ul className="divide-y divide-foreground/10 border-y border-foreground/10 lg:col-span-8">
            {tools.map((project, i) => (
              <PackageRow key={project.title} project={project} index={i} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
