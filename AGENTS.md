# AGENTS.md — Riyajath Ahamed Portfolio

AI agent guidance for working in this codebase.

---

## Project Overview

Personal portfolio for **Riyajath Ahamed** (Frontend Developer, Colombo, Sri Lanka).  
Live at `https://riyajathahamed.lk`, `https://riyajathahamed.com` and `https://riyajathahamed.netlify.app/`. Deployed on Netlify.

Stack: **Next.js 15** (App Router, Turbopack) · **React 19** · **TypeScript** · **Tailwind CSS v3** · **Framer Motion** · **Three.js / R3F** · **GSAP**

---

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages & layouts
│   ├── layout.tsx          # Root layout — fonts, theme, navbar, particles, Spline bg
│   ├── page.tsx            # Home: hero, about, skills, projects, contact
│   ├── blog/
│   │   ├── layout.tsx      # Blog layout — fetches posts, provides BlogProvider, renders TOC
│   │   ├── page.tsx        # Blog page — header, BentoGrid, SEO metadata + JSON-LD
│   │   └── config.ts       # MediumPostsType definition
│   ├── bookmarks/          # Bookmarks page (WIP — placeholder content)
│   ├── craftlab/           # Craft Lab — experimental UI/motion prototypes showcase
│   ├── game/               # Game page
│   └── api/medium/         # API route — parses Medium RSS feed via rss-parser
├── components/
│   ├── blog/               # Blog-specific components (see below)
│   ├── magicui/            # Custom animation/UI primitives
│   ├── ui/                 # shadcn/ui primitives (badge, button, card, tooltip…)
│   ├── navbar.tsx          # Desktop navbar
│   ├── responsive-navbar.tsx # Switches between Navbar (desktop) and BubbleMenu (mobile)
│   └── ...
├── data/
│   └── resume.tsx          # Single source of truth: name, bio, skills, projects, contact, navbar links
├── lib/
│   ├── getMediumPosts.ts   # Server helper — fetches /api/medium with 1h revalidation
│   └── utils.ts            # cn() utility (clsx + tailwind-merge)
└── conceptLibrary/         # Isolated concept components (timer etc.)
```

---

## Key Patterns

### Data flow — `src/data/resume.tsx`
All personal content (name, description, skills, projects, social links, navbar items) lives in the `DATA` object exported from this file. Edit here first before touching UI.

### Blog pipeline
```
Medium RSS → /api/medium/route.ts (rss-parser) → getMediumPosts() (cached fetch)
→ blog/layout.tsx (async, fetches posts, wraps in BlogProvider)
→ BlogTOCConnected (sidebar/mobile TOC, reads context)
→ blog/page.tsx (generateMetadata + JSON-LD + BlogClientWrapper)
→ BlogClientWrapper (reads filteredPosts from context) → BentoGrid → BentoCard
```

- **`/api/medium`** is `force-static` — built at deploy time, revalidated every hour at runtime.
- **`getMediumPosts`** uses `next: { revalidate: 3600 }`. Calling it multiple times in the same render is safe — Next.js deduplicates the fetch.
- **`BlogProvider`** (`src/components/blog/BlogContext.tsx`) holds `selectedCategory` state and `filteredPosts`. It is a Client Component wrapping the layout.

### Server vs Client Components
- Pages and layouts are Server Components by default.
- Components using `useState`, `useEffect`, Framer Motion, or browser APIs have `"use client"` at the top.
- `BlogTOCConnected` and `BlogClientWrapper` are client wrappers that consume `BlogContext`.

### Theming
- `next-themes` with `attribute="class"`, default `"light"`.
- Always add both `light` and `dark:` variants when styling. Brand accent: `#233b24` (dark green) / `#ccfd50` (lime).

### Animations
- **Framer Motion** — page transitions, hover effects, collapsible sections (`AnimatePresence`).
- **GSAP** — used in select magicui components.
- **`BlurFade` / `BlurFadeText`** — standard reveal pattern used across all pages. Always pass a `delay` calculated as `BLUR_FADE_DELAY * n`.

---

## Blog Components (`src/components/blog/`)

| File | Purpose |
|------|---------|
| `BlogContext.tsx` | Context provider — `posts`, `selectedCategory`, `filteredPosts`, `setSelectedCategory` |
| `BlogTOCConnected.tsx` | Thin client wrapper — pulls from context, renders `BlogTOC` |
| `BlogTOC.tsx` | Full TOC UI — mobile collapsible bar (`lg:hidden`) + desktop sticky sidebar (`hidden lg:block`). Contains expandable category badge filter and article list. |
| `BlogClientWrapper.tsx` | Reads `filteredPosts` from context, renders `BentoGrid` |
| `BentoGrid.tsx` | Responsive grid of blog post cards |
| `BentoCard.tsx` | Individual post card with thumbnail, title, categories |
| `BentoSkeleton.tsx` | Loading skeleton for cards |

---

## Pages & Routes

| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.tsx` | Home — hero, about, skills, projects, contact |
| `/blog` | `app/blog/page.tsx` | Blog listing with TOC sidebar |
| `/bookmarks` | `app/bookmarks/page.tsx` | WIP — placeholder |
| `/craftlab` | `app/craftlab/page.tsx` | Experimental UI showcases |
| `/game` | `app/game/page.tsx` | Game section |
| `/api/medium` | `app/api/medium/route.ts` | Medium RSS → JSON |

---

## Navigation

- **Desktop** (`md+`): `src/components/navbar.tsx`
- **Mobile** (`< md`): `BubbleMenu` in `src/components/magicui/BubbleMenu/BubbleMenu.tsx` — fixed, `z-50`
- Nav items defined in `DATA.navbar` inside `src/data/resume.tsx`

---

## SEO

- Root metadata in `src/app/layout.tsx` (`DATA.name`, `DATA.description`, OG tags).
- Blog page exports `generateMetadata` — dynamically builds `description` from top-5 post descriptions, `keywords` from all categories, OG image from the latest post thumbnail.
- Blog page also renders an inline `<script type="application/ld+json">` with `schema.org/ItemList` of all posts.

---

## Commands

```bash
npm run dev      # Dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint
```

---

## Things to Know

- `src/data/resume.tsx` is the **single source of truth** for all personal content. Do not hardcode names, URLs, or contact info elsewhere.
- The blog layout is `async` and fetches posts — adding `generateMetadata` to `blog/page.tsx` is safe because the fetch is cached.
- Mobile navbar is `fixed` and does **not** push document flow. Account for this when adding sticky elements (`top-0` works, no offset needed).
- `MediumPostsType` is defined in `src/app/blog/config.ts`. Use it instead of local interfaces when working with post data.
- The `cn()` utility from `src/lib/utils.ts` wraps `clsx` + `tailwind-merge`. Always use it for conditional class composition.
- Spline 3D scene loads only on `sm+` (`hidden sm:block`) to avoid mobile performance issues.
