"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "contact-todos-note";
const MAX_ITEMS = 6;
const EASE = [0.23, 1, 0.32, 1] as const;
const HAND = { fontFamily: "var(--font-hand), cursive" };
const NEW_EMOJI = ["✏️", "📌", "🌱", "☕", "🎧"];

const INITIAL: Todo[] = [
  { id: "portfolio", label: "Portfolio", emoji: "🖼️", done: true },
  { id: "side-project", label: "Side Project", emoji: "🚀", done: false },
  { id: "travel", label: "Travel the world", emoji: "🏞️", done: false },
];

type Todo = { id: string; label: string; emoji?: string; done: boolean };

function sortTodos(list: Todo[]) {
  return [...list.filter((item) => !item.done), ...list.filter((item) => item.done)];
}

function isTodo(value: unknown): value is Todo {
  if (!value || typeof value !== "object") return false;
  const entry = value as Todo;
  return typeof entry.id === "string" && typeof entry.label === "string";
}

function loadSaved(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return sortTodos(INITIAL);
    const saved = JSON.parse(raw) as unknown;
    if (!Array.isArray(saved) || !saved.every(isTodo)) return sortTodos(INITIAL);
    return sortTodos(
      saved.map((entry) => ({
        id: entry.id,
        label: entry.label,
        emoji: typeof entry.emoji === "string" ? entry.emoji : undefined,
        done: Boolean(entry.done),
      })),
    );
  } catch {
    return sortTodos(INITIAL);
  }
}

function TodoRow({
  item,
  fresh,
  motionOn,
  onToggle,
}: {
  item: Todo;
  fresh: boolean;
  motionOn: boolean;
  onToggle: (id: string) => void;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      layout={motionOn && !reduce ? "position" : false}
      initial={fresh && !reduce ? { opacity: 0, y: 6, rotate: -2 } : false}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{
        duration: 0.24,
        ease: EASE,
        layout: { duration: 0.3, ease: EASE },
      }}
    >
      <button
        type="button"
        onClick={() => onToggle(item.id)}
        aria-pressed={item.done}
        aria-label={`${item.label}, ${item.done ? "done" : "not done"}`}
        className="group/row flex w-full items-start gap-1.5 rounded-md text-left text-[19px] leading-[1.2] text-[#6b4a2b] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6b4a2b]/50 focus-visible:ring-offset-1 focus-visible:ring-offset-[#fbf0b8]"
        style={HAND}
      >
        <span aria-hidden className="shrink-0">
          –
        </span>
        <span className="relative min-w-0">
          <span
            className={cn(
              "transition-[color,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/row:text-[#4f3420]",
              item.done && "text-[#8a6a49]/75",
            )}
          >
            {item.label}
            {item.emoji && (
              <span
                aria-hidden
                className={cn(
                  "ml-1.5 inline-block text-[16px] transition-[filter,opacity] duration-200",
                  item.done && "opacity-70 saturate-50",
                )}
              >
                {item.emoji}
              </span>
            )}
          </span>
          <svg
            aria-hidden
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            className="pointer-events-none absolute -left-1 top-[0.55em] h-[0.42em] w-[calc(100%+0.5rem)] overflow-visible text-[#6b4a2b]"
          >
            <motion.path
              d="M1 6.2C14 3.8 25 7.4 38 5.1S63 3.6 76 5.6 92 4.4 99 4.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={false}
              animate={{ pathLength: item.done ? 1 : 0, opacity: item.done ? 0.85 : 0 }}
              transition={{ duration: reduce ? 0 : item.done ? 0.28 : 0.14, ease: EASE }}
            />
          </svg>
        </span>
      </button>
    </motion.li>
  );
}

export function TodoList() {
  const [items, setItems] = useState<Todo[]>(() => sortTodos(INITIAL));
  const [ready, setReady] = useState(false);
  const [motionOn, setMotionOn] = useState(false);
  const [draft, setDraft] = useState("");
  const [freshId, setFreshId] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadSaved());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const frame = requestAnimationFrame(() => setMotionOn(true));
    return () => cancelAnimationFrame(frame);
  }, [ready]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const doneCount = items.filter((item) => item.done).length;
  const full = items.length >= MAX_ITEMS;

  function toggle(id: string) {
    setFreshId(null);
    setItems((current) =>
      sortTodos(current.map((item) => (item.id === id ? { ...item, done: !item.done } : item))),
    );
  }

  function add(event: FormEvent) {
    event.preventDefault();
    const label = draft.trim();
    if (!label || full) return;
    const id = crypto.randomUUID();
    const emoji = NEW_EMOJI[items.length % NEW_EMOJI.length];
    setFreshId(id);
    setDraft("");
    setItems((current) => sortTodos([{ id, label, emoji, done: false }, ...current]));
  }

  return (
    <div className="relative flex flex-1 flex-col">

      <div className="flex flex-1 items-center justify-center py-3">
        <div className="group/note relative w-full max-w-[232px] -rotate-[4deg] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-rotate-[2deg] motion-reduce:transition-none">
          <div
            aria-hidden
            className="absolute inset-0 translate-y-[5px] rounded-[20px] bg-[#e6cf7c]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 78%, 82% 100%, 0 100%)" }}
          />
          <div
            className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(172deg,#fdf6cf_0%,#fbf0b8_46%,#f7e6a2_100%)] px-5 pb-6 pt-7"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 78%, 82% 100%, 0 100%)" }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-7 bg-[linear-gradient(180deg,rgba(236,214,128,0.55),rgba(236,214,128,0))]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
              style={{
                backgroundImage:
                  "radial-gradient(rgba(160,130,60,0.18) 0.6px, transparent 0.7px)",
                backgroundSize: "5px 5px",
              }}
            />

            <ul className="relative flex max-h-[9.5rem] flex-col gap-1.5 overflow-y-auto pr-1 [scrollbar-width:none]">
              {items.map((item) => (
                <TodoRow
                  key={item.id}
                  item={item}
                  fresh={item.id === freshId}
                  motionOn={motionOn}
                  onToggle={toggle}
                />
              ))}
            </ul>

            <form onSubmit={add} className="relative mt-2 flex items-center gap-1.5 pr-8">
              <span aria-hidden className="text-[19px] text-[#6b4a2b]/45" style={HAND}>
                –
              </span>
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                disabled={full}
                maxLength={40}
                aria-label="Add a task"
                placeholder={full ? "note is full" : "add one…"}
                className="min-w-0 flex-1 bg-transparent text-[19px] leading-[1.2] text-[#6b4a2b] outline-none placeholder:text-[#6b4a2b]/40 disabled:cursor-not-allowed"
                style={HAND}
              />
            </form>
          </div>

          <div
            aria-hidden
            className="absolute bottom-0 right-0 h-[22%] w-[18%] origin-bottom-right drop-shadow-[-3px_-2px_3px_rgba(150,120,40,0.18)] transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover/note:scale-110"
          >
            <div
              className="h-full w-full rounded-tl-[14px] bg-[linear-gradient(135deg,#fffbe2_0%,#f6e7a8_55%,#e3cc78_100%)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
