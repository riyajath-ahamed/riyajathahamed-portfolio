"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const WIN_GDP = 50000;
const TICK_MS = 1000;
const POLL_MS = 1800;

const BUILDINGS = {
  farm: {
    label: "Farm",
    cost: 200,
    income: 15,
    pop: 10,
    icon: "▲",
    requires: null,
  },
  market: {
    label: "Market",
    cost: 500,
    income: 40,
    pop: 25,
    icon: "◆",
    requires: "farm",
  },
  factory: {
    label: "Factory",
    cost: 1200,
    income: 120,
    pop: 60,
    icon: "■",
    requires: "market",
  },
  bank: {
    label: "Bank",
    cost: 3000,
    income: 350,
    pop: 120,
    icon: "●",
    requires: "factory",
  },
  tower: {
    label: "Tech Tower",
    cost: 7000,
    income: 900,
    pop: 300,
    icon: "★",
    requires: "bank",
  },
};

const EVENTS = [
  { msg: "Trade winds boost exports!", mod: 1.2, dur: 5, good: true },
  { msg: "Supply chain disruption!", mod: 0.7, dur: 4, good: false },
  { msg: "Tourism surge!", mod: 1.15, dur: 6, good: true },
  { msg: "Tech boom!", mod: 1.3, dur: 5, good: true },
  { msg: "Recession warning!", mod: 0.8, dur: 4, good: false },
];

const PALETTES = [
  { accent: "#2563EB", light: "#EFF6FF", mid: "#BFDBFE", text: "#1E40AF" },
  { accent: "#059669", light: "#ECFDF5", mid: "#A7F3D0", text: "#065F46" },
  { accent: "#DC2626", light: "#FEF2F2", mid: "#FECACA", text: "#991B1B" },
  { accent: "#7C3AED", light: "#F5F3FF", mid: "#DDD6FE", text: "#4C1D95" },
  { accent: "#D97706", light: "#FFFBEB", mid: "#FDE68A", text: "#92400E" },
  { accent: "#DB2777", light: "#FDF2F8", mid: "#FBCFE8", text: "#831843" },
  { accent: "#0891B2", light: "#ECFEFF", mid: "#A5F3FC", text: "#164E63" },
  { accent: "#65A30D", light: "#F7FEE7", mid: "#D9F99D", text: "#3F6212" },
];

const SB_URL = process.env.NEXT_PUBLIC_SB_URL;
const SB_KEY = process.env.NEXT_PUBLIC_SB_KEY;


async function sb(path, opts = {}) {
  const r = await fetch(`${SB_URL}${path}`, {
    ...opts,
    headers: {
      apikey: SB_KEY,
      Authorization: `Bearer ${SB_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(opts.headers || {}),
    },
  });
  const txt = await r.text();
  if (!r.ok) throw new Error(txt);
  return txt ? JSON.parse(txt) : null;
}

function income(city) {
  let b = 10;
  for (const [t, n] of Object.entries(city.buildings || {}))
    b += (BUILDINGS[t]?.income || 0) * n;
  if (city.event) b *= city.event.mod;
  return Math.round(b);
}
function pop(city) {
  let p = 50;
  for (const [t, n] of Object.entries(city.buildings || {}))
    p += (BUILDINGS[t]?.pop || 0) * n;
  return p;
}
function pal(city) {
  return PALETTES[city.colorIdx ?? 0] || PALETTES[0];
}

function Sparkline({ history = [], color }) {
  if (history.length < 2) return <div style={{ height: 28 }} />;
  const w = 140,
    h = 28,
    max = Math.max(...history, 1);
  const pts = history
    .slice(-25)
    .map(
      (v, i, a) => `${(i / (a.length - 1)) * w},${h - (v / max) * (h - 4) - 2}`,
    )
    .join(" ");
  const last = pts.split(" ").pop().split(",");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.7"
      />
      <circle
        cx={parseFloat(last[0])}
        cy={parseFloat(last[1])}
        r="2.5"
        fill={color}
      />
    </svg>
  );
}

function Bar({ value, max, color }) {
  return (
    <div
      style={{
        height: 5,
        background: "#F1F5F9",
        borderRadius: 99,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.min(value / max, 1) * 100}%`,
          background: color,
          borderRadius: 99,
          transition: "width 0.5s ease",
        }}
      />
    </div>
  );
}

function MyCityCard({ city, onBuild }) {
  const p = pal(city);
  const inc = income(city);
  const gdpPct = Math.round(Math.min((city.gdp || 0) / WIN_GDP, 1) * 100);
  const won = (city.gdp || 0) >= WIN_GDP;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      <div style={{ height: 4, background: p.accent }} />
      <div style={{ padding: "1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 12,
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginBottom: 3,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: p.accent,
                }}
              />
              <span style={{ fontSize: 16, fontWeight: 500, color: "#0F172A" }}>
                {city.name}
              </span>
              {won ? (
                <span
                  style={{
                    fontSize: 10,
                    background: "#FEF9C3",
                    color: "#854D0E",
                    borderRadius: 20,
                    padding: "2px 8px",
                    fontWeight: 500,
                  }}
                >
                  WINNER
                </span>
              ) : (
                <span
                  style={{
                    fontSize: 10,
                    background: p.light,
                    color: p.text,
                    borderRadius: 20,
                    padding: "2px 8px",
                  }}
                >
                  YOUR CITY
                </span>
              )}
            </div>
            {city.event && (
              <div
                style={{
                  fontSize: 11,
                  color: city.event.good ? "#15803D" : "#B91C1C",
                  background: city.event.good ? "#F0FDF4" : "#FEF2F2",
                  borderRadius: 20,
                  padding: "2px 9px",
                  display: "inline-block",
                }}
              >
                {city.event.good ? "↑" : "↓"} {city.event.msg}
              </div>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#94A3B8" }}>income / sec</div>
            <div style={{ fontSize: 18, fontWeight: 500, color: p.accent }}>
              +${inc}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            marginBottom: 12,
          }}
        >
          {[
            ["GDP", `$${((city.gdp || 0) / 1000).toFixed(1)}k`, p.accent],
            ["Cash", `$${(city.cash || 0).toLocaleString()}`, "#0F172A"],
            ["Pop", pop(city).toLocaleString(), "#0F172A"],
          ].map(([l, v, c]) => (
            <div
              key={l}
              style={{
                background: "#F8FAFC",
                borderRadius: 10,
                padding: "8px 10px",
              }}
            >
              <div style={{ fontSize: 10, color: "#94A3B8", marginBottom: 2 }}>
                {l}
              </div>
              <div style={{ fontSize: 15, fontWeight: 500, color: c }}>{v}</div>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              color: "#94A3B8",
              marginBottom: 4,
            }}
          >
            <span>Progress to win</span>
            <span style={{ color: p.accent, fontWeight: 500 }}>
              {gdpPct}% of $50k
            </span>
          </div>
          <Bar value={city.gdp || 0} max={WIN_GDP} color={p.accent} />
        </div>

        <div style={{ marginBottom: 14 }}>
          <Sparkline history={city.history} color={p.accent} />
        </div>

        <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 12 }}>
          <div style={{ fontSize: 11, color: "#94A3B8", marginBottom: 8 }}>
            Build structures
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {Object.entries(BUILDINGS).map(([type, b]) => {
              const locked = b.requires && !(city.buildings?.[b.requires] > 0);
              const poor = (city.cash || 0) < b.cost;
              const cnt = city.buildings?.[type] || 0;
              const off = locked || poor;
              return (
                <button
                  key={type}
                  onClick={() => !off && onBuild(type)}
                  disabled={off}
                  title={
                    locked
                      ? `Unlock ${BUILDINGS[b.requires]?.label} first`
                      : `$${b.cost} · +$${b.income}/s`
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 12,
                    padding: "6px 11px",
                    borderRadius: 8,
                    border: `1px solid ${off ? "#E2E8F0" : p.mid}`,
                    background: off ? "#F8FAFC" : p.light,
                    color: off ? "#CBD5E1" : p.text,
                    cursor: off ? "not-allowed" : "pointer",
                    fontWeight: cnt > 0 ? 500 : 400,
                    transition: "all 0.1s",
                  }}
                >
                  <span style={{ fontSize: 11 }}>{b.icon}</span>
                  {b.label}
                  {cnt > 0 && (
                    <span
                      style={{
                        background: p.mid,
                        color: p.text,
                        borderRadius: 10,
                        padding: "0 5px",
                        fontSize: 10,
                      }}
                    >
                      ×{cnt}
                    </span>
                  )}
                  {!off && (
                    <span style={{ color: p.accent, fontSize: 10 }}>
                      ${b.cost}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function RivalCard({ city }) {
  const p = pal(city);
  const inc = income(city);
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #E2E8F0",
        borderRadius: 12,
        padding: "0.75rem",
        flex: "1 1 160px",
        minWidth: 0,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginBottom: 8,
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: p.accent,
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "#0F172A",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {city.name}
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <div>
          <div style={{ fontSize: 10, color: "#94A3B8" }}>GDP</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: p.accent }}>
            ${((city.gdp || 0) / 1000).toFixed(1)}k
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: "#94A3B8" }}>+/s</div>
          <div style={{ fontSize: 13, color: "#475569" }}>+${inc}</div>
        </div>
      </div>
      <Bar value={city.gdp || 0} max={WIN_GDP} color={p.accent} />
      <div style={{ marginTop: 7, display: "flex", flexWrap: "wrap", gap: 3 }}>
        {Object.entries(city.buildings || {})
          .filter(([, c]) => c > 0)
          .map(([t, n]) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                background: "#F1F5F9",
                color: "#64748B",
                borderRadius: 4,
                padding: "1px 5px",
              }}
            >
              {BUILDINGS[t]?.icon}×{n}
            </span>
          ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState("login");
  const [nameInput, setNameInput] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState(null);
  const [cities, setCities] = useState({});
  const [log, setLog] = useState([]);
  const [tick, setTick] = useState(0);
  const [tab, setTab] = useState("city");
  const timerRef = useRef(null);
  const pollRef = useRef(null);
  const playerRef = useRef(null);
  const addLog = useCallback(
    (msg) => setLog((p) => [{ msg }, ...p].slice(0, 40)),
    [],
  );

  const handleLogin = async () => {
    const name = nameInput.trim(),
      code = codeInput.trim();
    if (!name || code.length < 4) {
      setError("Enter a city name and code (min 4 chars).");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const rows = await sb(
        `/rest/v1/cityrise_players?player_code=eq.${encodeURIComponent(code)}&select=*`,
      );
      let p;
      if (rows?.length) {
        if (rows[0].name !== name) {
          setError("Wrong city name for that code.");
          setLoading(false);
          return;
        }
        p = rows[0];
        addLog(`Welcome back, ${name}!`);
      } else {
        const all = await sb(`/rest/v1/cityrise_players?select=id`);
        const idx = (all?.length || 0) % PALETTES.length;
        const city = {
          name,
          colorIdx: idx,
          gdp: 0,
          cash: 500,
          buildings: {},
          event: null,
          eventTick: 0,
          history: [0],
        };
        const created = await sb(`/rest/v1/cityrise_players`, {
          method: "POST",
          body: JSON.stringify({
            name,
            player_code: code,
            city,
            last_seen: new Date().toISOString(),
          }),
        });
        p = created[0];
        addLog(`"${name}" founded. Build your city!`);
      }
      playerRef.current = p;
      setPlayer(p);
      setScreen("game");
    } catch (e) {
      setError("Error: " + e.message);
    }
    setLoading(false);
  };

  const runTick = useCallback(async () => {
    const p = playerRef.current;
    if (!p) return;
    try {
      const rows = await sb(
        `/rest/v1/cityrise_players?id=eq.${p.id}&select=city`,
      );
      if (!rows?.length) return;
      const city = {
        ...rows[0].city,
        buildings: { ...(rows[0].city?.buildings || {}) },
      };
      const inc = income(city);
      city.cash = (city.cash || 0) + inc;
      city.gdp = (city.gdp || 0) + inc;
      city.history = [...(city.history || []).slice(-40), city.gdp];
      if ((city.eventTick || 0) > 0) {
        city.eventTick -= 1;
        if (city.eventTick === 0) city.event = null;
      } else if (Math.random() < 0.035 && !city.event) {
        const ev = EVENTS[Math.floor(Math.random() * EVENTS.length)];
        city.event = ev;
        city.eventTick = ev.dur;
        addLog(`${city.name}: ${ev.msg}`);
      }
      await sb(`/rest/v1/cityrise_players?id=eq.${p.id}`, {
        method: "PATCH",
        body: JSON.stringify({ city, last_seen: new Date().toISOString() }),
      });
      setTick((t) => t + 1);
    } catch (_) {}
  }, [addLog]);

  const runPoll = useCallback(async () => {
    try {
      const since = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const rows = await sb(
        `/rest/v1/cityrise_players?last_seen=gte.${since}&select=id,name,city,last_seen&order=city->gdp.desc`,
      );
      if (!rows) return;
      const map = {};
      rows.forEach((r) => {
        map[r.id] = { ...r.city, _id: r.id };
      });
      setCities(map);
    } catch (_) {}
  }, []);

  useEffect(() => {
    if (screen !== "game") return;
    timerRef.current = setInterval(runTick, TICK_MS);
    pollRef.current = setInterval(runPoll, POLL_MS);
    runPoll();
    return () => {
      clearInterval(timerRef.current);
      clearInterval(pollRef.current);
    };
  }, [screen, runTick, runPoll]);

  const handleBuild = useCallback(
    async (type) => {
      const p = playerRef.current;
      if (!p) return;
      try {
        const rows = await sb(
          `/rest/v1/cityrise_players?id=eq.${p.id}&select=city`,
        );
        if (!rows?.length) return;
        const city = {
          ...rows[0].city,
          buildings: { ...(rows[0].city?.buildings || {}) },
        };
        if ((city.cash || 0) < BUILDINGS[type].cost) return;
        city.cash -= BUILDINGS[type].cost;
        city.buildings[type] = (city.buildings[type] || 0) + 1;
        await sb(`/rest/v1/cityrise_players?id=eq.${p.id}`, {
          method: "PATCH",
          body: JSON.stringify({ city, last_seen: new Date().toISOString() }),
        });
        addLog(`${city.name} built ${BUILDINGS[type].label}`);
        setCities((prev) => ({ ...prev, [p.id]: { ...city, _id: p.id } }));
      } catch (_) {}
    },
    [addLog],
  );

  const handleLogout = () => {
    clearInterval(timerRef.current);
    clearInterval(pollRef.current);
    setPlayer(null);
    playerRef.current = null;
    setCities({});
    setLog([]);
    setNameInput("");
    setCodeInput("");
    setError("");
    setTick(0);
    setScreen("login");
  };

  if (screen === "login")
    return (
      <div
        style={{
          background: "#F8FAFC",
          minHeight: 520,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: 380 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  background: "#2563EB",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ color: "#fff", fontSize: 16 }}>★</span>
              </div>
              <span
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#0F172A",
                  letterSpacing: "-0.01em",
                }}
              >
                CityRise
              </span>
            </div>
            <div style={{ fontSize: 13, color: "#94A3B8" }}>
              Open world · economic strategy · live multiplayer
            </div>
          </div>

          <div
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 16,
              padding: "1.5rem",
            }}
          >
            {error && (
              <div
                style={{
                  fontSize: 12,
                  color: "#B91C1C",
                  background: "#FEF2F2",
                  border: "1px solid #FECACA",
                  borderRadius: 8,
                  padding: "8px 12px",
                  marginBottom: 14,
                }}
              >
                {error}
              </div>
            )}

            <div style={{ marginBottom: 14 }}>
              <label
                style={{
                  fontSize: 12,
                  color: "#64748B",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                City name
              </label>
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Nova Haven"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #E2E8F0",
                  fontSize: 14,
                  background: "#F8FAFC",
                  color: "#0F172A",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  fontSize: 12,
                  color: "#64748B",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                Secret code{" "}
                <span style={{ color: "#CBD5E1" }}>
                  — your account key (min 4 chars)
                </span>
              </label>
              <input
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                placeholder="••••••"
                type="password"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #E2E8F0",
                  fontSize: 14,
                  background: "#F8FAFC",
                  color: "#0F172A",
                  outline: "none",
                }}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                width: "100%",
                padding: "11px",
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 500,
                background: "#2563EB",
                color: "#fff",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Connecting..." : "Enter World"}
            </button>

            <div
              style={{
                marginTop: 16,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {[
                ["▲ Farm → ★ Tower", "Tech tree path"],
                ["$50k GDP", "Win condition"],
                ["Name + code", "Resume your city"],
                ["No rooms needed", "Open world"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  style={{
                    background: "#F8FAFC",
                    borderRadius: 8,
                    padding: "8px 10px",
                  }}
                >
                  <div
                    style={{ fontSize: 12, fontWeight: 500, color: "#0F172A" }}
                  >
                    {k}
                  </div>
                  <div style={{ fontSize: 11, color: "#94A3B8" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );

  const myCity = player ? cities[player.id] : null;
  const others = Object.entries(cities)
    .filter(([id]) => id !== player?.id)
    .sort((a, b) => (b[1].gdp || 0) - (a[1].gdp || 0));
  const allSorted = Object.values(cities).sort(
    (a, b) => (b.gdp || 0) - (a.gdp || 0),
  );
  const winner = allSorted.find((c) => (c.gdp || 0) >= WIN_GDP);
  const myPal = myCity ? pal(myCity) : PALETTES[0];

  const tabs = [
    { id: "city", label: "My City" },
    { id: "world", label: `World (${others.length})` },
    { id: "rank", label: "Rankings" },
    { id: "log", label: "Log" },
  ];

  return (
    <div style={{ background: "#F8FAFC", minHeight: 560 }}>
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #E2E8F0",
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: 8,
              background: "#2563EB",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: 13 }}>★</span>
          </div>
          <div>
            <span style={{ fontSize: 14, fontWeight: 500, color: "#0F172A" }}>
              CityRise
            </span>
            <span style={{ fontSize: 11, color: "#94A3B8", marginLeft: 8 }}>
              tick #{tick}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {myCity && (
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: myPal.accent,
              }}
            />
          )}
          <span style={{ fontSize: 12, color: "#475569" }}>{myCity?.name}</span>
          <button
            onClick={handleLogout}
            style={{
              fontSize: 11,
              padding: "5px 10px",
              borderRadius: 7,
              border: "1px solid #E2E8F0",
              background: "#fff",
              color: "#64748B",
              cursor: "pointer",
            }}
          >
            Leave
          </button>
        </div>
      </div>

      {winner && (
        <div
          style={{
            background: "#FEF9C3",
            borderBottom: "1px solid #FDE68A",
            padding: "9px 14px",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14 }}>★</span>
          <span style={{ fontSize: 13, color: "#854D0E", fontWeight: 500 }}>
            {winner.name} won with ${((winner.gdp || 0) / 1000).toFixed(1)}k
            GDP!
          </span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: 2,
          padding: "10px 14px 0",
          background: "#fff",
          borderBottom: "1px solid #E2E8F0",
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{
              fontSize: 13,
              padding: "7px 13px",
              borderRadius: "8px 8px 0 0",
              border: "none",
              background: tab === t.id ? "#F8FAFC" : "transparent",
              color: tab === t.id ? myPal.accent : "#94A3B8",
              fontWeight: tab === t.id ? 500 : 400,
              cursor: "pointer",
              borderBottom:
                tab === t.id
                  ? `2px solid ${myPal.accent}`
                  : "2px solid transparent",
              transition: "all 0.15s",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "12px 14px 24px" }}>
        {tab === "city" &&
          (myCity ? (
            <MyCityCard city={myCity} onBuild={handleBuild} />
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 0",
                color: "#94A3B8",
                fontSize: 13,
              }}
            >
              Connecting to world...
            </div>
          ))}

        {tab === "world" &&
          (others.length > 0 ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {others.map(([id, city]) => (
                <RivalCard key={id} city={city} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 0",
                color: "#94A3B8",
                fontSize: 13,
              }}
            >
              No other cities online right now.
            </div>
          ))}

        {tab === "rank" && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {allSorted.length === 0 ? (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "#94A3B8",
                  fontSize: 13,
                }}
              >
                Loading...
              </div>
            ) : (
              allSorted.map((c, i) => {
                const cp = pal(c);
                const isMe = player && c._id === player.id;
                return (
                  <div
                    key={c._id || i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 14px",
                      borderBottom:
                        i < allSorted.length - 1 ? "1px solid #F1F5F9" : "none",
                      background: isMe ? cp.light : "#fff",
                    }}
                  >
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 8,
                        background: i === 0 ? "#FEF9C3" : "#F1F5F9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 13,
                        fontWeight: 500,
                        color: i === 0 ? "#854D0E" : "#64748B",
                        flexShrink: 0,
                      }}
                    >
                      {i === 0 ? "★" : `#${i + 1}`}
                    </div>
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: cp.accent,
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          color: "#0F172A",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {c.name} {isMe && "·"}{" "}
                        {isMe && (
                          <span style={{ fontSize: 11, color: cp.text }}>
                            you
                          </span>
                        )}
                      </div>
                      <div style={{ marginTop: 3 }}>
                        <Bar
                          value={c.gdp || 0}
                          max={WIN_GDP}
                          color={cp.accent}
                        />
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          color: cp.accent,
                        }}
                      >
                        ${((c.gdp || 0) / 1000).toFixed(1)}k
                      </div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>
                        +${income(c)}/s
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {tab === "log" && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 14,
              padding: "1rem",
            }}
          >
            {log.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem 0",
                  color: "#94A3B8",
                  fontSize: 13,
                }}
              >
                Events will appear here.
              </div>
            ) : (
              log.map((l, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 8,
                    alignItems: "flex-start",
                    paddingBottom: 10,
                    marginBottom: 10,
                    borderBottom:
                      i < log.length - 1 ? "1px solid #F1F5F9" : "none",
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#CBD5E1",
                      marginTop: 5,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      color: i === 0 ? "#0F172A" : "#64748B",
                      lineHeight: 1.5,
                    }}
                  >
                    {l.msg}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
