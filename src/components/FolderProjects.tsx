"use client";

import React, { useState } from 'react';
import Folder from '@/components/magicui/folder';
import Link from 'next/link';
import { DATA } from '@/data/resume';

type Project = typeof DATA.projects[number];

const PROJECT_BADGES: Record<string, { label: string; className: string }> = {
  'MuSync': {
    label: 'research',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
  },
  'Beyond Childhood Int': {
    label: 'live',
    className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300',
  },
  'Genso CLI': {
    label: 'npm',
    className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300',
  },
  'FOSS KDU': {
    label: 'oss',
    className: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-300',
  },
};

function getLinkLabel(type: string): string {
  if (type === 'Website' || type === 'Dev - Website') return '-> live';
  if (type === 'GitHub') return '-> repo';
  if (type === 'NPM') return '-> npm';
  return `-> ${type}`;
}

interface FolderGroup {
  id: string;
  label: string;
  color: string;
  count: string;
  projectTitles: string[];
}

const FOLDER_GROUPS: FolderGroup[] = [
  {
    id: 'projects',
    label: 'Projects',
    color: '#5227FF',
    count: '2 projects',
    projectTitles: ['MuSync', 'Beyond Childhood Int'],
  },
  {
    id: 'oss',
    label: 'Open Source',
    color: '#1D9E75',
    count: '2 tools',
    projectTitles: ['Genso CLI', 'FOSS KDU'],
  },
];

function ProjectMiniCard({ project }: { project: Project }) {
  const badge = PROJECT_BADGES[project.title] ?? {
    label: 'project',
    className: 'bg-muted text-muted-foreground',
  };

  return (
    <div className="rounded-xl border border-border/50 bg-background/80 p-3 hover:border-border transition-all duration-200 hover:shadow-sm group/card">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full ${badge.className}`}>
          {badge.label}
        </span>
      </div>
      <div className="text-sm font-semibold text-foreground mb-1 leading-tight">
        {project.title}
      </div>
      <div className="text-xs text-muted-foreground line-clamp-2 mb-2 leading-relaxed">
        {project.description.slice(0, 90)}...
      </div>
      <div className="flex flex-wrap gap-1 mb-2.5">
        {(project.technologies as readonly string[]).slice(0, 3).map(tech => (
          <span
            key={tech}
            className="text-[9px] font-mono bg-muted/60 border border-border/40 rounded px-1.5 py-0.5 text-muted-foreground"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {project.links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            target="_blank"
            className="text-[10px] font-mono text-muted-foreground bg-muted/40 border border-border/40 rounded-md px-2 py-1 hover:text-foreground hover:border-border transition-colors duration-150"
          >
            {getLinkLabel(link.type)}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function FolderProjects() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const activeFolder = FOLDER_GROUPS.find(g => g.id === activeGroup);
  const activeProjects = activeFolder
    ? DATA.projects.filter(p => activeFolder.projectTitles.includes(p.title))
    : [];

  const handleToggle = (id: string) => {
    setActiveGroup(prev => (prev === id ? null : id));
  };

  return (
    <div className="relative w-full rounded-3xl border border-foreground/10 bg-gradient-to-br from-background via-background to-foreground/5 p-8 md:p-10 overflow-hidden shadow-sm">
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-foreground/[0.03] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-foreground/[0.03] blur-3xl" />

      {/* Folders row */}
      <div className="relative flex gap-12 sm:gap-20 justify-center items-end">
        {FOLDER_GROUPS.map(group => (
          <div key={group.id} className="flex flex-col items-center gap-3">
            <Folder
              color={group.color}
              isOpen={activeGroup === group.id}
              onToggle={() => handleToggle(group.id)}
              size={1.35}
            />
            <button
              onClick={() => handleToggle(group.id)}
              className="flex flex-col items-center gap-0.5 cursor-pointer"
            >
              <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                {group.label}
              </span>
              <span className="text-[10px] font-mono text-muted-foreground/50">
                {group.count}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Hint text */}
      {!activeGroup && (
        <p className="text-center text-xs text-muted-foreground/50 font-mono mt-5">
          click a folder to explore
        </p>
      )}

      {/* Cards panel */}
      {activeFolder && (
        <div className="relative mt-8 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: activeFolder.color }}
            />
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {activeFolder.label} — {activeFolder.count}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeProjects.map(project => (
              <ProjectMiniCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
