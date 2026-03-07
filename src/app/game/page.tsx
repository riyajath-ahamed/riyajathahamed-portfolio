"use client";

import { useState, useRef, useEffect, useCallback, type MouseEvent, type TouchEvent } from "react";
import { CircleResult, IssueTokenResponse, LeaderboardEntry, PeerCursor, ScoreToken, SocketEnvelope, SocketSendMessage } from "./config";
import { Point } from "framer-motion";
import { useTheme } from "next-themes";

type DrawEvent = MouseEvent<HTMLCanvasElement> | TouchEvent<HTMLCanvasElement>;

const SB_URL = process.env.NEXT_PUBLIC_SB_URL;
const SB_KEY = process.env.NEXT_PUBLIC_SB_KEY;
const WS_URL_PREFIX = process.env.NEXT_PUBLIC_WS_URL;
const WS_Handshake = `${WS_URL_PREFIX}?apikey=${SB_KEY}&vsn=1.0.0`;

if (!SB_URL || !SB_KEY || !WS_URL_PREFIX) {
  throw new Error("Missing required Supabase environment variables.");
}

const COLORS = ["#e74c3c", "#3498db", "#2ecc71", "#f39c12", "#9b59b6", "#1abc9c", "#e67e22", "#e91e63", "#00bcd4", "#8bc34a"];
const uid = (): string => Math.random().toString(36).slice(2, 9);
const pickColor = (id: string): string => {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return COLORS[h % COLORS.length];
};
const readHslVar = (styles: CSSStyleDeclaration, name: string, fallback: string): string => {
  const value = styles.getPropertyValue(name).trim();
  return value ? `hsl(${value})` : fallback;
};

const sbFetch = async <T,>(path: string, opts: RequestInit = {}): Promise<T> => {
  const headers = new Headers(opts.headers);
  headers.set("apikey", SB_KEY);
  headers.set("Authorization", `Bearer ${SB_KEY}`);
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${SB_URL}/rest/v1/${path}`, { ...opts, headers });
  if (response.ok) {
    return (response.status === 204 ? null : await response.json()) as T;
  }

  let message = "Request failed";
  try {
    const data = (await response.json()) as { error?: string; message?: string };
    message = data.error ?? data.message ?? message;
  } catch {
    // Keep fallback message.
  }
  throw new Error(message);
};

const fetchTop10 = (): Promise<LeaderboardEntry[]> =>
  sbFetch<LeaderboardEntry[]>("circle_leaderboard?select=name,score,created_at&order=score.desc&limit=10");

const edgeFn = async <T,>(body: Record<string, unknown>): Promise<T> => {
  const res = await fetch(`${SB_URL}/functions/v1/submit-score`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const data = (await res.json()) as T & { error?: string };
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
};

// Step 1: ask server to issue a signed token for this score
const issueToken = (score: number): Promise<IssueTokenResponse> => edgeFn<IssueTokenResponse>({ action: "issue", score });
// Step 2: submit name + token to save to DB
const submitScore = (name: string, score: number, token: string, timestamp: number): Promise<unknown> =>
  edgeFn({ action: "submit", name, score, token, timestamp });

const isCursorPayload = (value: unknown): value is { id: string; x: number; y: number; name: string } => {
  if (typeof value !== "object" || value === null) return false;
  const payload = value as Record<string, unknown>;
  return (
    typeof payload.id === "string" &&
    typeof payload.x === "number" &&
    typeof payload.y === "number" &&
    typeof payload.name === "string"
  );
};

const isLeavePayload = (value: unknown): value is { id: string } => {
  if (typeof value !== "object" || value === null) return false;
  const payload = value as Record<string, unknown>;
  return typeof payload.id === "string";
};

// ── Realtime via raw WebSocket ───────────────────────────────────────────────
function useRealtimeCursors(
  myId: string,
  myName: string,
  onPeer: (payload: { id: string; x: number; y: number; name: string }) => void,
  onLeave: (id: string) => void
) {
  const ws = useRef<WebSocket | null>(null);
  const hbRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastB = useRef<number>(0);

  const send = useCallback((obj: SocketSendMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) ws.current.send(JSON.stringify(obj));
  }, []);

  const join = useCallback(() => {
    send({ topic: "realtime:cursors", event: "phx_join", payload: { config: { broadcast: { self: false } } }, ref: "1" });
  }, [send]);

  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const connect = () => {
      const s = new WebSocket(WS_Handshake);
      ws.current = s;
      s.onopen = () => {
        join();
        hbRef.current = setInterval(() => send({ topic: "phoenix", event: "heartbeat", payload: {}, ref: "hb" }), 20000);
      };
      s.onmessage = ({ data }) => {
        try {
          const raw = JSON.parse(String(data)) as SocketEnvelope;
          if (raw.event !== "broadcast") return;
          const event = raw.payload?.event;
          const payload = raw.payload?.payload;

          if (event === "cursor" && isCursorPayload(payload) && payload.id !== myId) onPeer(payload);
          if (event === "leave" && isLeavePayload(payload) && payload.id !== myId) onLeave(payload.id);
        } catch {
          // Ignore malformed websocket payloads.
        }
      };
      s.onclose = () => {
        if (hbRef.current) clearInterval(hbRef.current);
        reconnectTimer = setTimeout(connect, 2000);
      };
    };

    connect();
    return () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (hbRef.current) clearInterval(hbRef.current);
      send({ topic: "realtime:cursors", event: "broadcast", payload: { event: "leave", payload: { id: myId } }, ref: "bye" });
      ws.current?.close();
    };
  }, [join, myId, onLeave, onPeer, send]);

  return useCallback(
    (x: number, y: number) => {
      const now = Date.now();
      if (now - lastB.current < 40) return;
      lastB.current = now;
      send({ topic: "realtime:cursors", event: "broadcast", payload: { event: "cursor", payload: { id: myId, x, y, name: myName } }, ref: "c" });
    },
    [myId, myName, send]
  );
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayRef = useRef<HTMLCanvasElement | null>(null);
  const myId = useRef<string>(uid()).current;
  const scoreToken = useRef<ScoreToken | null>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState<Point[]>([]);
  const [result, setResult] = useState<CircleResult | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [showLB, setShowLB] = useState(false);
  const [leaderboard, setLB] = useState<LeaderboardEntry[]>([]);
  const [lbLoading, setLbLoad] = useState(false);
  const [lbError, setLbErr] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState<string>(() => (typeof window === "undefined" ? "" : localStorage.getItem("cpName") || ""));
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveErr] = useState<string | null>(null);
  const [peers, setPeers] = useState<Record<string, PeerCursor>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [themeTick, setThemeTick] = useState(0);
  const { theme, resolvedTheme } = useTheme();

  const onPeer = useCallback((p: { id: string; x: number; y: number; name: string }) => {
    setPeers((prev) => ({ ...prev, [p.id]: { ...p, color: pickColor(p.id), ts: Date.now() } }));
  }, []);

  const onLeave = useCallback((id: string) => {
    setPeers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const myName = nameInput.trim() || "Anonymous";
  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const broadcastCursor = useRealtimeCursors(myId, myName, onPeer, onLeave);

  // Force canvas redraw when theme classes/attributes are applied on <html>.
  useEffect(() => {
    const root = document.documentElement;
    const trigger = () => {
      requestAnimationFrame(() => setThemeTick((t) => t + 1));
    };

    trigger();
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          trigger();
          break;
        }
      }
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });
    return () => observer.disconnect();
  }, []);

  // Keep cursor style accurate without touching window during render.
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prune stale peers.
  useEffect(() => {
    const timer = setInterval(() => {
      setPeers((prev) => {
        const now = Date.now();
        let changed = false;
        const next: Record<string, PeerCursor> = { ...prev };
        for (const key in next) {
          if (now - next[key].ts > 5000) {
            delete next[key];
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Canvas sizing - prevent scroll bounce on iOS.
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    const setup = () => {
      const dpr = window.devicePixelRatio || 1;
      [canvasRef, overlayRef].forEach((ref) => {
        const canvas = ref.current;
        if (!canvas) return;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        const ctx = canvas.getContext("2d");
        if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
    };

    setup();
    window.addEventListener("resize", setup);
    return () => {
      window.removeEventListener("resize", setup);
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, []);

  // Draw game canvas.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    const styles = getComputedStyle(document.documentElement);
    const canvasBg = readHslVar(styles, "--background", "#ffffff");
    const gridColor = readHslVar(styles, "--border", "#f0f0f0");
    const strokeColor = readHslVar(styles, "--foreground", "#111111");

    ctx.fillStyle = canvasBg;
    ctx.fillRect(0, 0, w, h);

    if (showGrid) {
      const step = window.innerWidth < 480 ? 30 : 40;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    if (points.length > 1) {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
    }
  }, [points, showGrid, currentTheme, themeTick]);

  // Draw cursor overlay.
  useEffect(() => {
    const canvas = overlayRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const styles = getComputedStyle(document.documentElement);
    const cursorStroke = readHslVar(styles, "--foreground", "#ffffff");
    ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
    for (const { x, y, name, color } of Object.values(peers)) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 14);
      ctx.lineTo(4, 10);
      ctx.lineTo(7, 16);
      ctx.lineTo(9, 15);
      ctx.lineTo(6, 9);
      ctx.lineTo(11, 9);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = cursorStroke;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      ctx.font = "bold 11px system-ui";
      const tw = ctx.measureText(name).width;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x + 14, y + 14, tw + 10, 20, 4);
      ctx.fill();
       ctx.fillStyle = "#ffffff";
      ctx.fillText(name, x + 19, y + 28);
    }
  }, [peers, currentTheme, themeTick]);

  const evaluateCircle = (pts: Point[]): CircleResult => {
    if (pts.length < 10) return { score: 0, message: "Draw a complete circle!" };
    const c = pts.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
    c.x /= pts.length;
    c.y /= pts.length;

    let avg = 0;
    for (const p of pts) avg += Math.sqrt((p.x - c.x) ** 2 + (p.y - c.y) ** 2);
    avg /= pts.length;

    let v = 0;
    for (const p of pts) v += (Math.sqrt((p.x - c.x) ** 2 + (p.y - c.y) ** 2) - avg) ** 2;
    v = Math.sqrt(v / pts.length);

    const closed = Math.sqrt((pts[pts.length - 1].x - pts[0].x) ** 2 + (pts[pts.length - 1].y - pts[0].y) ** 2) < avg * 0.2;
    const total = Math.round(Math.min(100, Math.max(0, (Math.max(0, 1 - v / (avg * 0.5)) * 0.6 + (closed ? 1 : 0.5) * 0.4) * 100)));
    const msgs: Array<[number, string]> = [
      [95, "Perfect! True artist! ✨"],
      [85, "Almost perfect! 🎯"],
      [75, "Very circular! 👏"],
      [60, "Keep practicing! 💪"],
      [40, "Try slower! 🖊️"],
      [20, "Another shot! 🔄"],
      [0, "Abstract art! 🎨"]
    ];

    const message = msgs.find(([t]) => total >= t)?.[1] ?? "Abstract art! 🎨";
    return { score: total, message };
  };

  const getPos = (e: DrawEvent): Point => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    const src = "touches" in e ? e.touches[0] : e;
    return { x: src.clientX - rect.left, y: src.clientY - rect.top };
  };

  const startDrawing = (e: DrawEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    setPoints([getPos(e)]);
    setResult(null);
    setSaveErr(null);
    scoreToken.current = null;
  };

  const onMove = (e: DrawEvent) => {
    e.preventDefault();
    const p = getPos(e);
    broadcastCursor(p.x, p.y);
    if (isDrawing) setPoints((prev) => [...prev, p]);
  };

  const stopDrawing = async (e?: DrawEvent) => {
    e?.preventDefault();
    if (!isDrawing) return;
    setIsDrawing(false);

    const ev = evaluateCircle(points);
    setResult(ev);
    setAttempts((a) => a + 1);

    // Get server-signed token immediately. No crypto on client.
    try {
      const { token, timestamp } = await issueToken(ev.score);
      scoreToken.current = { score: ev.score, token, timestamp };
    } catch {
      scoreToken.current = null;
    }
  };

  const handleSubmit = async () => {
    const name = nameInput.trim() || "Anonymous";
    if (typeof window !== "undefined") {
      localStorage.setItem("cpName", name);
    }

    setSaving(true);
    setSaveErr(null);
    try {
      const t = scoreToken.current;
      if (!t) throw new Error("No valid token - please draw again.");
      await submitScore(name, t.score, t.token, t.timestamp);
      setLB((await fetchTop10()) || []);
      setShowLB(true);
      setResult(null);
    } catch (e) {
      setSaveErr(e instanceof Error ? e.message : "Could not save. Try again.");
    } finally {
      setSaving(false);
    }
  };

  const openLB = async () => {
    setShowLB(true);
    setLbLoad(true);
    setLbErr(null);
    try {
      setLB((await fetchTop10()) || []);
    } catch {
      setLbErr("Failed to load.");
    } finally {
      setLbLoad(false);
    }
  };

  const clear = () => {
    setPoints([]);
    setResult(null);
    setSaveErr(null);
    setShowLB(false);
    scoreToken.current = null;
  };

  const medal = (i: number): string => ["🥇", "🥈", "🥉"][i] || `${i + 1}`;
  const sColor = (s: number): string => (s >= 90 ? "text-yellow-500" : s >= 75 ? "text-green-500" : s >= 50 ? "text-blue-500" : "text-gray-500");
  const fDate = (d: string): string => new Date(d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  const peerCount = Object.keys(peers).length;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background select-none">
   
      {/* Canvases */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          cursor: isMobile ? "default" : "crosshair",
          zIndex: 1,
          touchAction: "none"
        }}
        onMouseDown={startDrawing}
        onMouseMove={onMove}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={onMove}
        onTouchEnd={stopDrawing}
      />
      <canvas
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 2 }}
      />

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-3 pt-3 gap-2">
        {/* Desktop buttons */}
        <div className="hidden sm:flex gap-2">
          <button onClick={clear} className="px-4 py-2 bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground text-sm font-medium">Clear</button>
          <button onClick={()=>setShowGrid(g=>!g)} className="px-4 py-2 bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground text-sm font-medium">{showGrid?"Hide":"Show"} Grid</button>
          <button onClick={openLB} className="px-4 py-2 bg-card text-card-foreground border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground text-sm font-medium">🏆 Leaderboard</button>
        </div>

        {/* Mobile: icon buttons */}
        <div className="flex sm:hidden mt-20 gap-2">
          <button onClick={clear} className="w-10 h-10 bg-card text-card-foreground border border-border rounded-lg shadow-sm flex items-center justify-center text-lg">✕</button>
          <button onClick={()=>setShowGrid(g=>!g)} className="w-10 h-10 bg-card text-card-foreground border border-border rounded-lg shadow-sm flex items-center justify-center text-lg">{showGrid?"◻":"▦"}</button>
          <button onClick={openLB} className="w-10 h-10 bg-card text-card-foreground border border-border rounded-lg shadow-sm flex items-center justify-center text-lg">🏆</button>
        </div>

        {/* Online indicator */}
        {peerCount > 0 && (
          <div className="flex mt-20 sm:mt-0 items-center gap-1.5 bg-card border border-border rounded-lg shadow-sm px-2.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{peerCount} online</span>
          </div>
        )}
      </div>

      {/* ── Idle prompt ── */}
      {points.length===0 && !result && !showLB && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6 text-center" style={{zIndex:3}}>
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">Draw a Perfect Circle</h1>
          <p className="text-muted-foreground text-sm sm:text-base">{isMobile ? "Trace a circle with your finger" : "Click and drag to draw your circle"}</p>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">Attempts: {attempts}</p>
        </div>
      )}
      {/* ── Result panel ── */}
      {result && !showLB && (
        <div className="absolute inset-0 flex items-end sm:items-center justify-center bg-background/90 z-20 px-4 pb-4 mb-20  sm:pb-0">
          <div className="bg-card text-card-foreground border border-border rounded-2xl shadow-xl p-6 sm:p-8 w-full max-w-sm text-center">
            <div className={`text-5xl sm:text-6xl font-bold mb-1 sm:mb-2 ${sColor(result.score)}`}>
              {result.score}<span className="text-xl sm:text-2xl text-muted-foreground">/100</span>
            </div>
            <p className="text-base sm:text-lg font-medium mb-4 sm:mb-5">{result.message}</p>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Your name for the leaderboard</p>
              <input
                className="w-full bg-background border border-input rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
                placeholder="Your name" value={nameInput}
                onChange={e=>setNameInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&!saving&&handleSubmit()}
              />
              {saveError && <p className="text-destructive text-xs mt-1">⚠️ {saveError}</p>}
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={handleSubmit} disabled={saving}
                className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 text-sm font-medium disabled:opacity-50">
                {saving?"Saving…":"Save to Leaderboard"}
              </button>
              <button onClick={clear} className="w-full py-2.5 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground text-sm font-medium">Skip & Try Again</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Leaderboard ── */}
      {showLB && (
        <div className="absolute inset-0 flex items-end sm:items-center justify-center bg-background/95 z-30 px-4 pb-4 mb-20 sm:pb-0">
          <div className="bg-card text-card-foreground border border-border rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <h2 className="text-lg sm:text-xl font-bold">🏆 Top 10</h2>
              <button onClick={()=>setShowLB(false)} className="text-muted-foreground hover:text-foreground text-2xl leading-none w-8 h-8 flex items-center justify-center">&times;</button>
            </div>

            {lbLoading ? (
              <div className="py-10 text-center text-muted-foreground text-sm">Loading…</div>
            ) : lbError ? (
              <div className="py-6 text-center">
                <p className="text-destructive text-sm mb-3">{lbError}</p>
                <button onClick={openLB} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:opacity-90">Retry</button>
              </div>
            ) : leaderboard.length===0 ? (
              <p className="text-muted-foreground text-center py-6 text-sm">No records yet. Be the first!</p>
            ) : (
              <div className="space-y-1.5 max-h-72 overflow-y-auto">
                {leaderboard.map((e,i)=>(
                  <div key={i} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${i===0?"bg-accent/70 border border-border":i===1?"bg-muted/60":i===2?"bg-accent/40 border border-border":""}`}>
                    <span className="w-7 text-center text-base">{medal(i)}</span>
                    <span className="flex-1 font-medium text-sm truncate">{e.name}</span>
                    <span className="text-xs text-muted-foreground hidden xs:block">{fDate(e.created_at)}</span>
                    <span className={`font-bold text-sm w-10 text-right ${sColor(e.score)}`}>{e.score}</span>
                  </div>
                ))}
              </div>
            )}

            <button onClick={clear} className="mt-4 w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 text-sm font-medium">Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}