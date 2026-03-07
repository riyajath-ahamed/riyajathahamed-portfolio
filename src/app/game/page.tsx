"use client";

import React, { useState, useRef, useEffect } from 'react';

const SUPABASE_URL = 'https://nganxdoqkrjnoqhbxaub.supabase.co';
const SUPABASE_KEY = 'sb_publishable_caK0HrqAY6xP6Qvd-Pg6eg_bMzORvvG';

// GAME_SECRET must match the GAME_SECRET env var set in your Edge Function
// This is the client-side copy — it signs the score so the server can verify it
const GAME_SECRET = 'k9$mX2#pLqR7@wZnV4&jT8';

async function hmacSign(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const sbFetch = (path, opts = {}) =>
  fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json', ...opts.headers },
  }).then(r => r.ok ? (r.status === 204 ? null : r.json()) : r.json().then(e => Promise.reject(e)));

const fetchTop10 = () =>
  sbFetch('circle_leaderboard?select=name,score,created_at&order=score.desc&limit=10');

const submitScore = async (name, score) => {
  const timestamp = Date.now();
  const signature = await hmacSign(GAME_SECRET, `${score}:${timestamp}`);
  const res = await fetch(`${SUPABASE_URL}/functions/v1/submit-score`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, score, timestamp, signature }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Submission failed');
  return data;
};

export default function DrawPerfectCircle() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [result, setResult] = useState(null);
  const [showGrid, setShowGrid] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [lbLoading, setLbLoading] = useState(false);
  const [lbError, setLbError] = useState(null);
  const [nameInput, setNameInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  // scoreToken is generated when drawing stops — ties the score to a specific play session
  const scoreTokenRef = useRef(null);

  const loadLeaderboard = async () => {
    setLbLoading(true); setLbError(null);
    try { setLeaderboard(await fetchTop10() || []); }
    catch { setLbError('Failed to load leaderboard.'); }
    finally { setLbLoading(false); }
  };

  const evaluateCircle = (pts) => {
    if (pts.length < 10) return { score: 0, message: 'Draw a complete circle!' };
    const center = pts.reduce((a, p) => ({ x: a.x + p.x, y: a.y + p.y }), { x: 0, y: 0 });
    center.x /= pts.length; center.y /= pts.length;
    let avg = 0;
    for (const p of pts) avg += Math.sqrt((p.x - center.x) ** 2 + (p.y - center.y) ** 2);
    avg /= pts.length;
    let variance = 0;
    for (const p of pts) variance += (Math.sqrt((p.x - center.x) ** 2 + (p.y - center.y) ** 2) - avg) ** 2;
    variance = Math.sqrt(variance / pts.length);
    const closure = Math.sqrt((pts[pts.length - 1].x - pts[0].x) ** 2 + (pts[pts.length - 1].y - pts[0].y) ** 2);
    const isClosed = closure < avg * 0.2;
    const vScore = Math.max(0, 1 - (variance / (avg * 0.5)));
    const total = Math.round(Math.min(100, Math.max(0, vScore * 0.6 + (isClosed ? 1 : 0.5) * 0.4) * 100));
    const msgs = [[95,'Perfect circle! True artist! ✨'],[85,'Excellent! Almost perfect! 🎯'],[75,'Great job! Very circular! 👏'],[60,'Good effort! Keep practicing! 💪'],[40,"Not bad! Try slower? 🖊️"],[20,"Give it another shot! 🔄"],[0,"Abstract art! 🎨"]];
    return { score: total, message: msgs.find(([t]) => total >= t)[1] };
  };

  useEffect(() => { drawCanvas(); }, [points, showGrid]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr, h = canvas.height / dpr;
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h);
    if (showGrid) {
      ctx.strokeStyle = '#f0f0f0'; ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y < h; y += 40) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
    }
    if (points.length > 1) {
      ctx.strokeStyle = '#111'; ctx.lineWidth = 3; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const set = () => {
      canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px'; canvas.style.height = window.innerHeight + 'px';
      canvas.getContext('2d').scale(dpr, dpr);
    };
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);

  const getPos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    if (e.touches) return { x: e.touches[0].clientX - r.left, y: e.touches[0].clientY - r.top };
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const startDrawing = (e) => { e.preventDefault(); setIsDrawing(true); setPoints([getPos(e)]); setResult(null); setSaveError(null); scoreTokenRef.current = null; };
  const draw = (e) => { e.preventDefault(); if (!isDrawing) return; setPoints(p => [...p, getPos(e)]); };
  const stopDrawing = async (e) => {
    e?.preventDefault();
    if (!isDrawing) return;
    setIsDrawing(false);
    const ev = evaluateCircle(points);
    // Generate a signed token immediately on draw end — timestamp is baked in
    const ts = Date.now();
    const sig = await hmacSign(GAME_SECRET, `${ev.score}:${ts}`);
    scoreTokenRef.current = { score: ev.score, timestamp: ts, signature: sig };
    setResult(ev);
    setAttempts(a => a + 1);
  };

  const handleSubmit = async () => {
    const token = scoreTokenRef.current;
    if (!token) return;
    const name = nameInput.trim() || 'Anonymous';
    setSaving(true); setSaveError(null);
    try {
      await submitScore(name, token.score);
      // replace token with fresh payload including precomputed sig
      // (submitScore recomputes internally — token here just validates timing)
      await loadLeaderboard();
      setShowLeaderboard(true);
      setResult(null);
    } catch (e) {
      setSaveError(e.message || 'Could not save score. Try again.');
    } finally {
      setSaving(false);
    }
  };

  const openLeaderboard = async () => { setShowLeaderboard(true); await loadLeaderboard(); };
  const clearCanvas = () => { setPoints([]); setResult(null); setSaveError(null); setShowLeaderboard(false); scoreTokenRef.current = null; };

  const getMedal = (i) => ['🥇', '🥈', '🥉'][i] || `${i + 1}.`;
  const scoreColor = (s) => s >= 90 ? 'text-yellow-500' : s >= 75 ? 'text-green-500' : s >= 50 ? 'text-blue-500' : 'text-gray-500';
  const fmtDate = (d) => new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      <canvas ref={canvasRef}
        className="absolute inset-0 cursor-crosshair"
        onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
        onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
      />

      <div className="absolute top-4 left-4 flex gap-2 z-10">
        <button onClick={clearCanvas} className="px-4 py-2 bg-white text border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium">Clear</button>
        <button onClick={() => setShowGrid(g => !g)} className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium">{showGrid ? 'Hide' : 'Show'} Grid</button>
        <button onClick={openLeaderboard} className="px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-sm font-medium">🏆 Leaderboard</button>
      </div>

      {points.length === 0 && !result && !showLeaderboard && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-4xl font-bold mb-3">Draw a Perfect Circle</h1>
          <p className="text-gray-500">Click and drag to draw your circle</p>
          <p className="text-gray-400 text-sm mt-1">Attempts: {attempts}</p>
        </div>
      )}

      {result && !showLeaderboard && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-20">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-80 text-center">
            <div className={`text-6xl font-bold mb-2 ${scoreColor(result.score)}`}>
              {result.score}<span className="text-2xl text-gray-400">/100</span>
            </div>
            <p className="text-lg font-medium mb-5">{result.message}</p>
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Enter your name for the leaderboard</p>
              <input
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-black"
                placeholder="Your name"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !saving && handleSubmit()}
                autoFocus
              />
              {saveError && (
                <div className="mt-2 flex items-start gap-1 text-left">
                  <span className="text-red-500 text-xs">⚠️ {saveError}</span>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={handleSubmit} disabled={saving}
                className="w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium disabled:opacity-50">
                {saving ? 'Saving…' : 'Save to Leaderboard'}
              </button>
              <button onClick={clearCanvas} className="w-full py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium">Skip & Try Again</button>
            </div>
          </div>
        </div>
      )}

      {showLeaderboard && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/95 z-30">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96 max-w-full">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold">🏆 Top 10 Leaderboard</h2>
              <button onClick={() => setShowLeaderboard(false)} className="text-gray-400 hover:text-gray-600 text-2xl leading-none">&times;</button>
            </div>
            {lbLoading ? (
              <div className="py-10 text-center text-gray-400 text-sm">Loading…</div>
            ) : lbError ? (
              <div className="py-6 text-center">
                <p className="text-red-500 text-sm mb-3">{lbError}</p>
                <button onClick={loadLeaderboard} className="px-4 py-2 bg-black text-white rounded-lg text-sm">Retry</button>
              </div>
            ) : leaderboard.length === 0 ? (
              <p className="text-gray-400 text-center py-6">No records yet. Be the first!</p>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, i) => (
                  <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-lg ${i === 0 ? 'bg-yellow-50 border border-yellow-100' : i === 1 ? 'bg-gray-50' : i === 2 ? 'bg-orange-50 border border-orange-100' : ''}`}>
                    <span className="w-8 text-center text-lg">{getMedal(i)}</span>
                    <span className="flex-1 font-medium text-sm truncate">{entry.name}</span>
                    <span className="text-xs text-gray-400">{fmtDate(entry.created_at)}</span>
                    <span className={`font-bold text-sm w-12 text-right ${scoreColor(entry.score)}`}>{entry.score}</span>
                  </div>
                ))}
              </div>
            )}
            <button onClick={clearCanvas} className="mt-5 w-full py-2 bg-black text-white rounded-lg hover:bg-gray-800 text-sm font-medium">Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
}