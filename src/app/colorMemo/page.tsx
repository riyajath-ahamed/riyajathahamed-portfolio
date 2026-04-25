"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SB_URL = "https://nganxdoqkrjnoqhbxaub.supabase.co";
const SB_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nYW54ZG9xa3Jqbm9xaGJ4YXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4NjUyMzMsImV4cCI6MjA4ODQ0MTIzM30.k25WTcE8FWJApZTXjrgLrUUJnNT8JaLqdc4rsg29ukg";

const DIFF = {
  easy:   { label: "Easy",   ms: 4000, hint: "4 seconds" },
  medium: { label: "Medium", ms: 2000, hint: "2 seconds" },
  hard:   { label: "Hard",   ms: 800,  hint: "0.8 seconds" },
} as const;

const EDGE_FN = `${SB_URL}/functions/v1/submit-color-score`;
const DEFAULT_TARGET_HEX = "#a1a5db";

type Difficulty = keyof typeof DIFF;
type GamePhase = "menu" | "flash" | "pick" | "result";
type SliderKey = "h" | "s" | "v";
type PointerStartEvent = React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>;
type PointerMoveEvent = MouseEvent | TouchEvent;
type KnownPointerEvent = PointerStartEvent | PointerMoveEvent;

interface RGB {
  r: number;
  g: number;
  b: number;
}

interface HSV {
  h: number;
  s: number;
  v: number;
}

interface LeaderboardRow {
  id?: string | number;
  name: string;
  difficulty:string;
  score: number;
  created_at?: string;
}

interface ApiErrorResponse {
  error?: string;
}

interface IssueTokenResponse extends ApiErrorResponse {
  token: string;
  timestamp: number;
}

interface SubmitScoreResponse extends ApiErrorResponse {}

interface SliderConfig {
  key: SliderKey;
  ref: React.RefObject<HTMLDivElement | null>;
  bg: string;
  val: number;
  max: number;
}

const DIFF_ENTRIES = Object.entries(DIFF) as [Difficulty, (typeof DIFF)[Difficulty]][];

function rnd255(): number {
  return Math.floor(Math.random() * 256);
}

function randRgb(): RGB {
  return { r: rnd255(), g: rnd255(), b: rnd255() };
}

function toHex({ r, g, b }: RGB): string {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function dist(a: RGB, b: RGB): number {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

function calcScore(d: number): number {
  return Math.round(Math.max(0, (1 - d / Math.sqrt(3 * 255 * 255)) * 1000));
}

function hsvToRgb(h: number, s: number, v: number): RGB {
  const f = (n: number): number => {
    const k = (n + h / 60) % 6;
    return v - v * s * Math.max(0, Math.min(k, 4 - k, 1));
  };

  return { r: Math.round(f(5) * 255), g: Math.round(f(3) * 255), b: Math.round(f(1) * 255) };
}

function luminance({ r, g, b }: RGB): number {
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
}

function getScoreColor(score: number | null): string {
  if (score === null) {
    return "text-stone-500";
  }
  if (score >= 900) {
    return "text-emerald-500";
  }
  if (score >= 700) {
    return "text-amber-500";
  }
  return "text-red-500";
}

function getClientY(event: KnownPointerEvent): number {
  if ("touches" in event) {
    return event.touches[0]?.clientY ?? 0;
  }
  return event.clientY;
}

async function sbFetch(diff: Difficulty): Promise<LeaderboardRow[]> {
  try {
    const response = await fetch(`${SB_URL}/rest/v1/color_memory_scores?difficulty=eq.${diff}&order=score.desc&limit=10`, {
      headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
    });

    if (!response.ok) {
      return [];
    }

    const data = (await response.json()) as LeaderboardRow[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

async function sbFetchTop10(): Promise<LeaderboardRow[]> {
  const response = await fetch(`${SB_URL}/rest/v1/color_memory_scores?&order=score.desc&limit=10`, {
    headers: { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}` }
  });

  if (!response.ok) {
    throw new Error(`Leaderboard error ${response.status}`);
  }

  const data = (await response.json()) as LeaderboardRow[];
  return Array.isArray(data) ? data : [];
}

async function issueToken(score: number, difficulty: Difficulty): Promise<IssueTokenResponse> {
  const res = await fetch(EDGE_FN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "issue", score, difficulty })
  });
  const data = (await res.json()) as IssueTokenResponse;
  if (!res.ok) throw new Error(data.error ?? `Issue error ${res.status}`);
  return data;
}

async function submitScore(
  name: string,
  score: number,
  difficulty: Difficulty,
  token: string,
  timestamp: number
): Promise<SubmitScoreResponse> {
  const res = await fetch(EDGE_FN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "submit", name, score, difficulty, token, timestamp })
  });
  const data = (await res.json()) as SubmitScoreResponse;
  if (!res.ok) throw new Error(data.error ?? `Submit error ${res.status}`);
  return data;
}

export default function App() {
  const [phase, setPhase] = useState<GamePhase>("menu");
  const [diff, setDiff] = useState<Difficulty>("medium");
  const [target, setTarget] = useState<RGB | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [hsv, setHsv] = useState<HSV>({ h: 0, s: 0, v: 1 });
  const [score, setScore] = useState<number | null>(null);
  const [accuracy, setAccuracy] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authTs, setAuthTs] = useState<number | null>(null);
  const [lb, setLb] = useState<LeaderboardRow[]>([]);
  const [lbLoading, setLbLoading] = useState(false);
  const [showLB, setShowLB] = useState(false);
  const [lbError, setLbError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const sRef = useRef<HTMLDivElement>(null);
  const vRef = useRef<HTMLDivElement>(null);

  const picked = hsvToRgb(hsv.h, hsv.s, hsv.v);
  const pickedHex = toHex(picked);
  const targetHex = target ? toHex(target) : DEFAULT_TARGET_HEX;
  const secs = Math.ceil(timeLeft / 1000);
  const progress = totalTime > 0 ? timeLeft / totalTime : 0;
  const isLight = (c: RGB): boolean => luminance(c) > 160;
  const onLight = target && isLight(target);
  const pickOnLight = isLight(picked);

  const overlayText = onLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.85)";
  const pickOverlay = pickOnLight ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.9)";
  const scoreColor = getScoreColor(score);
  const leaderboard = lb;

  const sliderConfigs: SliderConfig[] = [
    { key: "h", ref: hRef, bg: "linear-gradient(to bottom,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)", val: hsv.h, max: 360 },
    { key: "s", ref: sRef, bg: `linear-gradient(to bottom,${toHex(hsvToRgb(hsv.h, 1, hsv.v))},${toHex(hsvToRgb(hsv.h, 0, hsv.v))})`, val: hsv.s, max: 1 },
    { key: "v", ref: vRef, bg: `linear-gradient(to bottom,${toHex(hsvToRgb(hsv.h, hsv.s, 1))},#000)`, val: hsv.v, max: 1 }
  ];

  const startGame = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    const color = randRgb();
    setTarget(color);
    setHsv({ h: 0, s: 0, v: 1 });
    setScore(null);
    setAccuracy(null);
    setSaved(false);
    setName("");
    setSaveError(null);
    setAuthToken(null);
    setAuthTs(null);

    const ms = DIFF[diff].ms;
    setTimeLeft(ms);
    setTotalTime(ms);
    setPhase("flash");
    intervalRef.current = setInterval(() => setTimeLeft((t) => Math.max(0, t - 50)), 50);
    timerRef.current = setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPhase("pick");
    }, ms);
  };

  const sColor = (value: number): string => getScoreColor(value);

  const medal = (index: number): string => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}`;
  };

  const fDate = (value?: string): string => {
    if (!value) return "--";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "--";
    return date.toLocaleDateString();
  };

  const clear = () => {
    setShowLB(false);
    setPhase("menu");
  };

  const openLB = useCallback(async () => {
    setShowLB(true);
    setLbLoading(true);
    setLbError(null);
    try {
      const data = await sbFetchTop10();
      setLb(data);
    } catch {
      setLbError("Failed to load leaderboard.");
    } finally {
      setLbLoading(false);
    }
  }, []);

  const submitGuess = async () => {
    if (!target) return;

    const d = dist(target, picked);
    const s = calcScore(d);
    setScore(s);
    setAccuracy((s / 10).toFixed(1));
    setPhase("result");

    // Request server-issued token for score submission.
    try {
      const { token, timestamp } = await issueToken(s, diff);
      setAuthToken(token);
      setAuthTs(timestamp);
    } catch (e) {
      setSaveError(`Could not get auth token: ${getErrorMessage(e, "Unknown error")}`);
    }

    setLbLoading(true);
    try {
      const data = await sbFetch(diff);
      setLb(data);
    } finally {
      setLbLoading(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim() || saving || score === null) return;
    if (!authToken || authTs === null) {
      setSaveError("No auth token - please play again.");
      return;
    }

    setSaving(true);
    setSaveError(null);
    try {
      await submitScore(name.trim(), score, diff, authToken, authTs);
      const data = await sbFetch(diff);
      setLb(data);
      setSaved(true);
    } catch (err) {
      setSaveError(getErrorMessage(err, "Failed to submit score."));
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const dragBar = useCallback((e: PointerStartEvent, key: SliderKey, barRef: React.RefObject<HTMLDivElement | null>) => {
    e.preventDefault();

    const move = (ev: PointerMoveEvent) => {
      if ("touches" in ev) {
        ev.preventDefault();
      }

      const bar = barRef.current;
      if (!bar) return;

      const rect = bar.getBoundingClientRect();
      const clientY = getClientY(ev);
      const ratio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      const nextValue = key === "h" ? ratio * 360 : 1 - ratio;
      setHsv((h) => ({ ...h, [key]: nextValue }));
    };

    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);

    const bar = barRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const clientY = getClientY(e);
    const ratio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    const nextValue = key === "h" ? ratio * 360 : 1 - ratio;
    setHsv((h) => ({ ...h, [key]: nextValue }));
  }, []);

  const thumbTop = (val: number, max = 1): string => `calc(${(1 - val / max) * 100}% - 10px)`;

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex items-center justify-center px-4 py-8 relative z-10 ">
      <div className="w-full max-w-sm">

        {/* ── MENU ── */}
        {phase === "menu" && (
          <div>
            <div className="text-center mb-8">
              <p className="text-xs tracking-widest text-stone-400 dark:text-stone-500 font-medium mb-3">COLOR MEMORY</p>
              <h1 className="text-2xl font-semibold text-stone-800 dark:text-stone-100 leading-snug mb-3">
                How well do you<br />remember color?
              </h1>
              <p className="text-sm text-stone-400 dark:text-stone-400 leading-relaxed">
                A color flashes briefly. Memorize it,<br />then recreate it with sliders.
              </p>
            </div>

            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 mb-3 shadow-sm dark:shadow-black/30">
              <p className="text-xs tracking-widest text-stone-400 dark:text-stone-500 font-medium mb-4">DIFFICULTY</p>
              <div className="flex gap-2 mb-5">
                {DIFF_ENTRIES.map(([key, val]) => (
                  <button key={key} onClick={() => setDiff(key)}
                    className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-150 border
                      ${diff === key
                        ? "bg-stone-900 dark:bg-stone-600 text-white border-stone-900"
                        : "bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800"}`}>
                    {val.label}
                  </button>
                ))}
              </div>

              <div className="flex mb-6">
                {DIFF_ENTRIES.map(([key, val]) => (
                  <div key={key} className={`flex-1 text-center text-xs transition-colors duration-150 ${diff === key ? "text-stone-700 dark:text-stone-200 font-medium" : "text-stone-300 dark:text-stone-600"}`}>
                    {val.hint}
                  </div>
                ))}
              </div>

              <button onClick={startGame}
                className="w-full py-3.5 rounded-2xl bg-stone-900 dark:bg-stone-600 text-white text-sm font-medium tracking-wide hover:bg-stone-700 transition-colors">
                Start game
              </button>
            </div>

            <p className="text-center text-xs text-stone-300 dark:text-stone-500 mb-5">Score up to 1000 · Global leaderboard</p>

            <button onClick={openLB}
              className="w-full py-3.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-100 text-sm font-medium tracking-wide hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
              Leaderboard
            </button>
          </div>
        )}

        {/* ── FLASH ── */}
        {phase === "flash" && (
          <div className="rounded-3xl overflow-hidden relative shadow-sm" style={{ background: targetHex, aspectRatio: "4/3" }}>
            <div className="absolute top-5 left-5">
              <p className="text-xs font-semibold tracking-widest" style={{ color: overlayText }}>
                  {DIFF[diff].label.toUpperCase()} · MEMORIZE
              </p>
            </div>

            <div className="absolute bottom-7 right-6 text-right">
              <div className="flex items-baseline gap-0.5">
                {String(secs).padStart(3, "0").split("").map((ch, i) => (
                  <span key={i} className="font-bold leading-none tabular-nums"
                    style={{ fontSize: 76, color: overlayText, opacity: [0.2, 0.45, 1][i] }}>
                    {ch}
                  </span>
                ))}
              </div>
              <p className="text-xs tracking-widest mt-1 font-medium" style={{ color: overlayText, opacity: 0.55 }}>
                SECONDS LEFT
              </p>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "rgba(0,0,0,0.08)" }}>
              <div className="h-full rounded-r transition-all duration-75"
                style={{ width: `${progress * 100}%`, background: overlayText, opacity: 0.45 }} />
            </div>
          </div>
        )}

        {/* ── PICK ── */}
        {phase === "pick" && (
          <div>
            <div className="rounded-3xl overflow-hidden relative shadow-sm" style={{ background: pickedHex, aspectRatio: "4/3" }}>
              <div className="absolute top-5 left-5">
                <p className="text-xs font-semibold tracking-widest" style={{ color: pickOverlay }}>
                  RECREATE THE COLOR
                </p>
              </div>

              {/* Sliders */}
              <div className="absolute top-4 bottom-4 left-4 flex gap-2.5">
                {sliderConfigs.map(({ key, ref, bg, val, max }) => (
                  <div key={key} className="w-7 relative">
                    <div ref={ref}
                      onMouseDown={e => dragBar(e, key, ref)}
                      onTouchStart={e => dragBar(e, key, ref)}
                      className="w-full h-full rounded-2xl cursor-ns-resize relative select-none"
                      style={{ background: bg, boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)" }}>
                      <div className="absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white pointer-events-none"
                        style={{ top: thumbTop(val, max), boxShadow: "0 1px 6px rgba(0,0,0,0.3)" }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Hex label */}
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
                <p className="text-xs font-mono tracking-wider" style={{ color: pickOverlay, opacity: 0.65 }}>
                  {pickedHex.toUpperCase()}
                </p>
              </div>

              {/* Submit */}
              <button onClick={submitGuess}
                className="absolute bottom-4 right-4 w-12 h-12 rounded-full flex items-center justify-center bg-white/95 shadow-md active:scale-95 transition-transform">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1c1917" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>

            {/* HSV readout */}
            <div className="flex justify-center gap-8 mt-4">
              {[["H", `${Math.round(hsv.h)}°`], ["S", `${Math.round(hsv.s * 100)}%`], ["V", `${Math.round(hsv.v * 100)}%`]].map(([l, v]) => (
                <div key={l} className="text-center">
                  <p className="text-xs tracking-widest text-stone-400 dark:text-stone-500 mb-1">{l}</p>
                  <p className="text-sm font-medium text-stone-600 dark:text-stone-300 tabular-nums">{v}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {phase === "result" && (
          <div>
            {/* Score hero */}
            <div className="text-center mb-6">
              <p className="text-xs tracking-widest text-stone-400 dark:text-stone-500 font-medium mb-2">YOUR SCORE</p>
              <p className={`text-6xl font-bold tabular-nums leading-none ${scoreColor}`}>{score}</p>
              <p className="text-sm text-stone-400 dark:text-stone-500 mt-2">out of 1000 · {accuracy}% accuracy</p>
            </div>

            {/* Color comparison */}
            <div className="flex gap-3 mb-4">
              {[{ label: "TARGET", hex: targetHex, rgb: target }, { label: "YOUR GUESS", hex: pickedHex, rgb: picked }].map((item) => (
                <div key={item.label} className="flex-1 bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-sm dark:shadow-black/30">
                  <div className="h-20" style={{ background: item.hex }} />
                  <div className="p-3">
                    <p className="text-xs tracking-widest text-stone-400 dark:text-stone-500 mb-1">{item.label}</p>
                    <p className="text-xs font-mono text-stone-600 dark:text-stone-300">{item.hex.toUpperCase()}</p>
                    {item.rgb && <p className="text-xs text-stone-300 dark:text-stone-500 mt-0.5">rgb({item.rgb.r}, {item.rgb.g}, {item.rgb.b})</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* Leaderboard */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 px-4 py-5 mb-4 shadow-sm dark:shadow-black/30">
              <p className="text-xs tracking-widest text-stone-400 dark:text-stone-500 font-medium mb-4">
                LEADERBOARD — {DIFF[diff].label.toUpperCase()}
              </p>

              {lbLoading ? (
                <p className="text-sm text-stone-300 dark:text-stone-500 text-center py-3">Loading…</p>
              ) : lb.length === 0 ? (
                <p className="text-sm text-stone-300 dark:text-stone-500 text-center py-3">No scores yet — be first!</p>
              ) : (
                <div className="space-y-0">
                  {lb.map((row, i) => (
                    <div key={row.id || i}
                      className={`flex items-center gap-3 py-2.5 ${i < lb.length - 1 ? "border-b border-stone-100" : ""}`}>
                      <span className={`w-5 text-right text-xs tabular-nums ${i < 3 ? "font-semibold text-stone-700 dark:text-stone-200" : "text-stone-300 dark:text-stone-500"}`}>
                        {i + 1}
                      </span>
                      <span className="flex-1 text-sm text-stone-700 dark:text-stone-200">{row.name}</span>
                      <span className="text-sm font-semibold text-stone-800 dark:text-stone-100 tabular-nums">{row.score}</span>
                    </div>
                  ))}
                </div>
              )}

              {!saved && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-stone-100 dark:border-stone-800">
                  <input value={name} onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSave()}
                    placeholder="Your name"
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/80 text-sm text-stone-700 dark:text-stone-100 placeholder-stone-300 dark:placeholder-stone-500 outline-none focus:border-stone-400 dark:focus:border-stone-500 transition-colors" />
                  <button onClick={handleSave} disabled={!name.trim() || saving || score === null || !authToken || authTs === null}
                    className="px-3 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-medium disabled:opacity-40 transition-opacity hover:bg-stone-700">
                    {saving ? "…" : "Save"}
                  </button>
                </div>
              )}
              {saved && <p className="text-sm text-emerald-500 text-center mt-3">Score saved!</p>}
              {saveError && (
                <div className="mt-3 p-3 rounded-xl bg-red-50 border border-red-100">
                  <p className="text-xs font-mono text-red-500 break-all">{saveError}</p>
                </div>
              )}
            </div>

            <button onClick={() => setPhase("menu")}
              className="w-full py-3.5 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-200 text-sm font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors shadow-sm dark:shadow-black/30">
              Play again
            </button>
          </div>
        )}

      </div>
      {/* ── Leaderboard ── */}
      {showLB && (
        <div className="absolute inset-0 flex items-end sm:items-center justify-center bg-stone-950/60 dark:bg-black/75 backdrop-blur-[2px] z-30 px-4 pb-4 mb-20 sm:pb-0">
          <div className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-700 rounded-2xl shadow-xl dark:shadow-black/40 p-5 sm:p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h2 className="text-lg sm:text-xl font-bold">🏆 Top 10</h2>
              <button onClick={() => setShowLB(false)} className="text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-200 text-2xl leading-none w-8 h-8 flex items-center justify-center">&times;</button>
            </div>

            {lbLoading ? (
              <div className="py-10 text-center text-stone-500 dark:text-stone-400 text-sm">Loading…</div>
            ) : lbError ? (
              <div className="py-6 text-center">
                <p className="text-red-500 text-sm mb-3">{lbError}</p>
                <button onClick={openLB} className="px-4 py-2 bg-stone-900 dark:bg-stone-700 text-white rounded-lg text-sm hover:opacity-90">Retry</button>
              </div>
            ) : leaderboard.length===0 ? (
              <p className="text-stone-500 dark:text-stone-400 text-center py-6 text-sm">No records yet. Be the first!</p>
            ) : (
              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {leaderboard.map((e,i)=>(
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${i===0?"bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700":i===1?"bg-stone-50 dark:bg-stone-800/70":i===2?"bg-stone-100/80 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700":""}`}>
                    <span className="w-7 text-center text-base">{medal(i)}</span>
                    <span className="flex-1 font-medium text-sm truncate">{e.name}</span>
                    <span className="font-semibold text-xs truncate capitalize rounded-full border-2 px-2 ">{e.difficulty}</span>
                    <span className="text-xs text-stone-500 dark:text-stone-400 hidden xs:block">{fDate(e.created_at)}</span>
                    <span className={`font-bold text-sm w-10 text-right ${sColor(e.score)}`}>{e.score}</span>
                  </div>
                ))}
              </div>
            )}

            <button onClick={clear} className="mt-4 w-full py-2.5 bg-stone-900 dark:bg-stone-700 text-white rounded-lg hover:opacity-90 text-sm font-medium">Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}