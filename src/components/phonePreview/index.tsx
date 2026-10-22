"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SpotifyPlayback = {
  position: number;
  duration: number;
  isPaused: boolean;
  playingURI?: string;
};

type SpotifyEmbedController = {
  loadEntity: (uriOrUrl: string) => void;
  play: () => void;
  pause: () => void;
  restart: () => void;
  seek: (seconds: number) => void;
  destroy: () => void;
  addListener: (event: "ready" | "playback_update", cb: (event: { data: SpotifyPlayback }) => void) => void;
  removeListener: (event: "playback_update") => void;
};

type SpotifyIFrameAPI = {
  createController: (
    element: HTMLElement,
    options: { url?: string; width?: number; height?: number },
    callback: (controller: SpotifyEmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
    __spotifyIframeApi?: SpotifyIFrameAPI;
  }
}

function spotifyTrackId(src: string) {
  return src.match(/(?:open\.spotify\.com\/track\/|spotify:track:)([A-Za-z0-9]+)/)?.[1] ?? null;
}

function loadSpotifyIframeApi() {
  if (window.__spotifyIframeApi) return Promise.resolve(window.__spotifyIframeApi);
  return new Promise<SpotifyIFrameAPI>((resolve) => {
    const previous = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      window.__spotifyIframeApi = api;
      previous?.(api);
      resolve(api);
    };
    if (!document.querySelector("script[data-spotify-iframe-api]")) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      script.dataset.spotifyIframeApi = "true";
      document.body.appendChild(script);
    }
  });
}

type Track = {
  title: string;
  artist: string;
  album: string;
  /** Fallback duration in seconds, used until the audio file's metadata loads. */
  length: number;
  /** Path under /public, e.g. "/audio/blue-bird.mp3". Leave empty to simulate playback. */
  src: string;
  /** Path under /public, e.g. "/covers/blue-bird.jpg". Leave empty for a generated cover. */
  cover: string;
};

const TRACKS: Track[] = [
  {
    title: "Ma meilleure ennemie",
    artist: "Luc Van Haver, Pomme, and Stroma",
    album: "Arcane",
    length: 147,
    src: "https://open.spotify.com/track/4lriIG2vNqwDWzOj2I9rtj?si=373457257ddf454d",
    cover:
      "https://i.pinimg.com/736x/dc/52/48/dc5248b0850b57c94b8591b56156e3c9.jpg",
  },
  {
    title: "All the Stars",
    artist: "Kendrick Lamar and SZA ",
    album: "Black Panther",
    length: 235,
    src: "https://open.spotify.com/track/3GCdLUSnKSMJhs4Tj6CV3s?si=ea46f8d79646400e",
    cover:
      "https://i.pinimg.com/736x/ba/78/0c/ba780ccd6bea8a007cb5235c20057a60.jpg",
  },
  {
    title: "Take Me to the River (I Will Swim)",
    artist: " Alex Yurkiv and Thelma Costolo",
    album: "Take Me to the River (I Will Swim)",
    length: 178,
    src: "https://i.pinimg.com/736x/43/7c/a5/437ca59f291a8321452a3eacd24197a6.jpg",
    cover: "https://open.spotify.com/track/4yaalj9cPc9FCVi0SXkBuV?si=2d5843223a07426b",
  },
  {
    title: "Viva la Vida",
    artist: "Coldplay",
    album: "Viva la Vida",
    length: 242,
    src: "",
    cover: "",
  },
];

const COVER_TINTS = [
  "linear-gradient(145deg,#5b9bd5,#1f3f73)",
  "linear-gradient(145deg,#c9a27a,#4a2a1c)",
  "linear-gradient(145deg,#f08a4b,#7a2216)",
  "linear-gradient(145deg,#e9d8a6,#8a5a2b)",
];

const EASE = [0.23, 1, 0.32, 1] as const;
const SCREEN_FONT = { fontFamily: "Georgia, 'Times New Roman', serif" };
const WHEEL_STEP_DEG = 24;
const BACKLIGHT_MS = 10000;
const VOLUME_STEP = 1 / 16;

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

function formatTime(seconds: number) {
  const safe = Math.max(0, seconds);
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function Battery() {
  return (
    <svg viewBox="0 0 22 11" className="h-2.5 w-5" aria-hidden>
      <rect x="0.6" y="0.6" width="18.4" height="9.8" rx="1.4" fill="none" stroke="currentColor" strokeWidth="1.1" />
      <rect x="2.2" y="2.2" width="15.2" height="6.6" rx="0.6" fill="url(#ipod-battery)" />
      <rect x="19.6" y="3.4" width="1.8" height="4.2" rx="0.5" fill="currentColor" />
      <defs>
        <linearGradient id="ipod-battery" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9be27a" />
          <stop offset="1" stopColor="#3f9a2c" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden>
      <path d="M2 1.2v7.6L8.6 5 2 1.2Z" fill="currentColor" />
    </svg>
  );
}

function PauseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" className={className} aria-hidden>
      <rect x="2" y="1.4" width="2.1" height="7.2" rx="0.4" fill="currentColor" />
      <rect x="5.9" y="1.4" width="2.1" height="7.2" rx="0.4" fill="currentColor" />
    </svg>
  );
}

function SkipGlyph({ direction, className }: { direction: "prev" | "next"; className?: string }) {
  return (
    <svg
      viewBox="0 0 14 10"
      className={cn(className, direction === "prev" && "-scale-x-100")}
      aria-hidden
    >
      <path d="M1 1.4v7.2L5.8 5 1 1.4Zm5.2 0v7.2L11 5 6.2 1.4Z" fill="currentColor" />
      <rect x="11.2" y="1.4" width="1.6" height="7.2" rx="0.3" fill="currentColor" />
    </svg>
  );
}

function SpeakerGlyph({ loud, className }: { loud?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 12 10" className={className} aria-hidden>
      <path d="M1 3.5h2L6 1v8L3 6.5H1z" fill="currentColor" />
      {loud && (
        <path d="M8 3a3 3 0 0 1 0 4M9.6 1.6a5 5 0 0 1 0 6.8" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      )}
    </svg>
  );
}

function Cover({ track, index }: { track: Track; index: number }) {
  return (
    <div className="relative aspect-square w-[40%] shrink-0 overflow-hidden rounded-[2px] shadow-[0_2px_4px_rgba(10,25,45,0.35)] ring-1 ring-black/20">
      {track.cover ? (
        <Image src={track.cover} alt={`${track.album} cover`} fill sizes="64px" className="object-cover" />
      ) : (
        <div
          className="grid size-full place-items-center text-[22px] italic text-white/90"
          style={{ background: COVER_TINTS[index % COVER_TINTS.length] }}
        >
          {track.album.charAt(0)}
        </div>
      )}
      <span aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(150deg,rgba(255,255,255,0.35)_0%,transparent_45%)]" />
    </div>
  );
}

const wheelButton =
  "absolute grid place-items-center rounded-full text-[#8c8c8a] [text-shadow:0_0.5px_0_rgba(255,255,255,0.9)] transition-colors duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-[#5f5f5d] active:bg-black/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400";

export default function IpodPreview() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(1);
  const [elapsed, setElapsed] = useState(19);
  const [duration, setDuration] = useState<number | null>(null);
  const [playing, setPlaying] = useState(false);
  const [view, setView] = useState<"now" | "menu">("now");
  const [cursor, setCursor] = useState(1);
  const [volume, setVolume] = useState(0.6);
  const [volumePing, setVolumePing] = useState(0);
  const [volumeVisible, setVolumeVisible] = useState(false);
  const [wakePing, setWakePing] = useState(0);
  const [lit, setLit] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const clickCtx = useRef<AudioContext | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const embedSlotRef = useRef<HTMLDivElement>(null);
  const spotifyRef = useRef<SpotifyEmbedController | null>(null);
  const spotifyReady = useRef(false);
  const pendingPlay = useRef(false);
  const loadedSpotifyId = useRef<string | null>(null);
  const playingRef = useRef(false);
  const indexRef = useRef(index);
  const spotifyEnded = useRef(false);
  const drag = useRef({ angle: 0, acc: 0, moved: false });

  const track = TRACKS[index];
  const spotifyId = spotifyTrackId(track.src);
  const hasFileAudio = Boolean(track.src) && !spotifyId;
  const length = duration ?? track.length;

  playingRef.current = playing;
  indexRef.current = index;

  useEffect(() => {
    const slot = embedSlotRef.current;
    if (!slot) return;
    let cancelled = false;
    const host = document.createElement("div");
    slot.appendChild(host);
    const initial = TRACKS.find((item) => spotifyTrackId(item.src));

    const onUpdate = (event: { data: SpotifyPlayback }) => {
      const { position, duration: rawDuration, isPaused, playingURI } = event.data;
      const currentId = spotifyTrackId(TRACKS[indexRef.current].src);
      if (!currentId || (playingURI && !playingURI.includes(currentId))) return;
      if (rawDuration > 0) {
        const useMs = rawDuration > 1000;
        const durationSec = useMs ? rawDuration / 1000 : rawDuration;
        const positionSec = useMs ? position / 1000 : position;
        setDuration(durationSec);
        setElapsed(positionSec);
        if (!isPaused) spotifyEnded.current = false;
        if (
          isPaused &&
          playingRef.current &&
          !spotifyEnded.current &&
          durationSec > 1 &&
          positionSec >= durationSec - 0.4
        ) {
          spotifyEnded.current = true;
          pendingPlay.current = false;
          const next = (indexRef.current + 1) % TRACKS.length;
          setIndex(next);
          setElapsed(0);
          setDuration(null);
          return;
        }
      }
      setPlaying(!isPaused);
    };

    loadSpotifyIframeApi()
      .then((api) => {
        if (cancelled) return;
        api.createController(
          host,
          {
            width: 300,
            height: 80,
            ...(initial ? { url: initial.src } : {}),
          },
          (controller) => {
            if (cancelled) {
              controller.destroy();
              return;
            }
            spotifyRef.current = controller;
            if (initial) loadedSpotifyId.current = spotifyTrackId(initial.src);
            controller.addListener("ready", () => {
              spotifyReady.current = true;
              if (pendingPlay.current) controller.play();
            });
            controller.addListener("playback_update", onUpdate);
          },
        );
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      spotifyReady.current = false;
      spotifyRef.current?.removeListener("playback_update");
      spotifyRef.current?.destroy();
      spotifyRef.current = null;
      slot.replaceChildren();
    };
  }, []);

  useEffect(() => {
    if (!playing || hasFileAudio || spotifyId) return;
    const id = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => window.clearInterval(id);
  }, [playing, hasFileAudio, spotifyId]);

  useEffect(() => {
    if (hasFileAudio || spotifyId || elapsed < length) return;
    goTo(index + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, length, hasFileAudio, spotifyId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !hasFileAudio) return;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [playing, hasFileAudio, index]);

  useEffect(() => {
    const controller = spotifyRef.current;
    if (!controller || !spotifyReady.current) return;
    if (!spotifyId) {
      controller.pause();
      return;
    }
    if (loadedSpotifyId.current !== spotifyId) {
      loadedSpotifyId.current = spotifyId;
      controller.loadEntity(track.src);
      if (playingRef.current) controller.play();
    }
  }, [spotifyId, track.src]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume, index]);

  useEffect(() => {
    setLit(true);
    const id = window.setTimeout(() => setLit(false), BACKLIGHT_MS);
    return () => window.clearTimeout(id);
  }, [wakePing]);

  useEffect(() => {
    if (volumePing === 0) return;
    setVolumeVisible(true);
    const id = window.setTimeout(() => setVolumeVisible(false), 1400);
    return () => window.clearTimeout(id);
  }, [volumePing]);

  function click() {
    try {
      const ctx = (clickCtx.current ??= new AudioContext());
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.005), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) ** 4;
      }
      const source = ctx.createBufferSource();
      const gain = ctx.createGain();
      source.buffer = buffer;
      gain.gain.value = 0.12;
      source.connect(gain).connect(ctx.destination);
      source.start();
    } catch {
      // Web Audio unavailable; the click is decorative.
    }
  }

  function goTo(next: number) {
    setIndex((next + TRACKS.length) % TRACKS.length);
    setElapsed(0);
    setDuration(null);
  }

  function playSpotify(src: string) {
    const id = spotifyTrackId(src);
    if (!id) return false;
    pendingPlay.current = true;
    const controller = spotifyRef.current;
    if (controller && spotifyReady.current) {
      if (loadedSpotifyId.current !== id) {
        loadedSpotifyId.current = id;
        controller.loadEntity(src);
      }
      controller.play();
    }
    setPlaying(true);
    return true;
  }

  function pausePlayback() {
    pendingPlay.current = false;
    spotifyRef.current?.pause();
    setPlaying(false);
  }

  function restart() {
    setElapsed(0);
    if (spotifyId && spotifyRef.current) {
      if (playing) spotifyRef.current.restart();
      else spotifyRef.current.seek(0);
      return;
    }
    if (audioRef.current) audioRef.current.currentTime = 0;
  }

  function press(action: () => void) {
    return () => {
      if (drag.current.moved) return;
      click();
      setWakePing((p) => p + 1);
      action();
    };
  }

  function onMenu() {
    if (view === "menu") {
      setView("now");
      return;
    }
    setCursor(index);
    setView("menu");
  }

  function onPrev() {
    if (view === "menu") {
      setCursor((c) => (c - 1 + TRACKS.length) % TRACKS.length);
      return;
    }
    if (elapsed > 3) restart();
    else {
      const prev = (index - 1 + TRACKS.length) % TRACKS.length;
      goTo(prev);
      if (playing) playSpotify(TRACKS[prev].src);
    }
  }

  function onNext() {
    if (view === "menu") {
      setCursor((c) => (c + 1) % TRACKS.length);
      return;
    }
    const next = (index + 1) % TRACKS.length;
    goTo(next);
    if (playing) playSpotify(TRACKS[next].src);
  }

  function onSelect() {
    if (view === "menu") {
      if (cursor !== index) goTo(cursor);
      if (!playSpotify(TRACKS[cursor].src)) setPlaying(true);
      setView("now");
      return;
    }
    if (playing) pausePlayback();
    else if (!playSpotify(track.src)) setPlaying(true);
  }

  function scrollWheel(direction: number) {
    click();
    setWakePing((p) => p + 1);
    if (view === "menu") {
      setCursor((c) => clamp(c + direction, 0, TRACKS.length - 1));
    } else {
      setVolume((v) => clamp(v + direction * VOLUME_STEP, 0, 1));
      setVolumePing((p) => p + 1);
    }
  }

  function angleAt(x: number, y: number) {
    const rect = wheelRef.current!.getBoundingClientRect();
    return (Math.atan2(y - (rect.top + rect.height / 2), x - (rect.left + rect.width / 2)) * 180) / Math.PI;
  }

  function onWheelPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    drag.current = { angle: angleAt(event.clientX, event.clientY), acc: 0, moved: false };

    const onMove = (e: PointerEvent) => {
      const angle = angleAt(e.clientX, e.clientY);
      let delta = angle - drag.current.angle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      drag.current.angle = angle;
      drag.current.acc += delta;
      while (Math.abs(drag.current.acc) >= WHEEL_STEP_DEG) {
        const direction = Math.sign(drag.current.acc);
        drag.current.acc -= direction * WHEEL_STEP_DEG;
        drag.current.moved = true;
        scrollWheel(direction);
      }
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      window.setTimeout(() => {
        drag.current.moved = false;
      }, 0);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  }

  const progress = clamp(elapsed / length, 0, 1);
  const screenTransition = { duration: reduce ? 0 : 0.18, ease: EASE };

  return (
    <div className="relative flex h-full min-h-[440px] w-full flex-1 items-center justify-center overflow-hidden p-5">

      <div ref={embedSlotRef} className="pointer-events-none fixed left-0 top-0 -z-10 h-20 w-[300px] opacity-0" aria-hidden />

      {hasFileAudio && (
        <audio
          ref={audioRef}
          src={track.src}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
          onEnded={() => goTo(index + 1)}
        />
      )}

      <div className="relative z-[1] rounded-[28px] bg-white p-[1.5px] shadow-[0_0_0_1px_rgba(0,0,0,0.07),0_1px_1px_rgba(0,0,0,0.12),0_12px_22px_-10px_rgba(40,40,48,0.28),0_34px_50px_-24px_rgba(40,40,48,0.32)]">
        <div className="relative flex aspect-[0.6] w-[12rem] flex-col overflow-hidden rounded-[26.5px] bg-[linear-gradient(160deg,#ffffff_0%,#f6f6f4_48%,#e8e8e5_100%)] p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.06)]">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-1/4 -top-1/4 h-2/3 w-[120%] rotate-[-18deg] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9),transparent_65%)]"
          />

          <div className="relative rounded-[10px] bg-[#1d1d1f] p-[3px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.9)]">
            <div
              className="relative aspect-[1.34] overflow-hidden rounded-[7px] bg-[linear-gradient(180deg,#e9f2fa_0%,#cfe0f0_100%)] text-[#16263a]"
              style={SCREEN_FONT}
              aria-live="polite"
            >
              <div className="flex items-center justify-between border-b border-[#16263a]/25 bg-[linear-gradient(180deg,#f6fafd,#d6e3ef)] px-1.5 py-[3px] text-[9px] font-bold">
                {playing ? <PlayGlyph className="size-2" /> : <PauseGlyph className="size-2" />}
                <span>{view === "menu" ? "Music" : "Now Playing"}</span>
                <Battery />
              </div>

              <AnimatePresence mode="wait" initial={false}>
                {view === "now" ? (
                  <motion.div
                    key={`now-${index}`}
                    initial={{ opacity: 0, x: reduce ? 0 : 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduce ? 0 : -8 }}
                    transition={screenTransition}
                    className="flex h-[calc(100%-17px)] flex-col px-2 pb-1.5 pt-1"
                  >
                    <p className="text-[8px] tabular-nums">
                      {index + 1} of {TRACKS.length}
                    </p>
                    <div className="mb-1 flex min-h-0 flex-1 items-center gap-2">
                      <Cover track={track} index={index} />
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-3 text-[9.5px] font-semibold leading-tight">{track.title}</p>
                        <p className="mt-0.5 truncate text-[8.5px] leading-tight">{track.artist}</p>
                        <p className="truncate text-[8px] leading-tight opacity-70">{track.album}</p>
                      </div>
                    </div>

                    {volumeVisible ? (
                      <div className="flex h-[19px] items-center gap-1" aria-label={`Volume ${Math.round(volume * 100)}%`}>
                        <SpeakerGlyph className="h-2 w-2.5 shrink-0" />
                        <div className="relative h-[7px] flex-1 overflow-hidden rounded-full border border-[#16263a]/70 bg-white/60">
                          <div
                            className="absolute inset-y-0 left-0 w-full origin-left bg-[linear-gradient(180deg,#3d6fa8,#1f4a7c)] transition-transform duration-150 ease-out"
                            style={{ transform: `scaleX(${volume})` }}
                          />
                        </div>
                        <SpeakerGlyph loud className="h-2 w-2.5 shrink-0" />
                      </div>
                    ) : (
                      <div className="h-[19px]">
                        <div className="relative h-[7px] overflow-hidden rounded-full border border-[#16263a]/70 bg-white/60">
                          <div
                            className="absolute inset-y-0 left-0 w-full origin-left bg-[linear-gradient(180deg,#3d6fa8,#1f4a7c)] transition-transform duration-1000 ease-linear"
                            style={{ transform: `scaleX(${progress})` }}
                          />
                        </div>
                        <div className="mt-0.5 flex justify-between text-[8px] tabular-nums">
                          <span>{formatTime(elapsed)}</span>
                          <span>-{formatTime(length - elapsed)}</span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.ul
                    key="menu"
                    initial={{ opacity: 0, x: reduce ? 0 : -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: reduce ? 0 : 8 }}
                    transition={screenTransition}
                    className="flex flex-col py-0.5"
                  >
                    {TRACKS.map((item, i) => (
                      <li
                        key={item.title}
                        className={cn(
                          "flex items-center justify-between gap-1 px-1.5 py-[2px] text-[9px] leading-tight",
                          i === cursor && "bg-[linear-gradient(180deg,#6a9bd8,#2f63a6)] text-white",
                        )}
                      >
                        <span className="truncate">{item.title}</span>
                        <span aria-hidden className="shrink-0">
                          {i === index && playing ? "♪" : "›"}
                        </span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(0,0,0,0.035)_0_1px,transparent_1px_2px)]"
              />
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-[#0d1b2c] transition-opacity duration-700 ease-out",
                  lit ? "opacity-0" : "opacity-30",
                )}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(118deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.1)_36%,transparent_37%)]"
              />
            </div>
          </div>

          <div
            ref={wheelRef}
            onPointerDown={onWheelPointerDown}
            className="relative mx-auto mt-auto aspect-square w-[84%] touch-none select-none rounded-full bg-[radial-gradient(circle_at_50%_30%,#ffffff_0%,#f4f4f2_55%,#e4e4e1_100%)] shadow-[0_0_0_1px_rgba(0,0,0,0.09),0_1px_0_1.5px_rgba(255,255,255,0.9),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-3px_8px_rgba(0,0,0,0.06)]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full opacity-[0.18] mix-blend-overlay"
              style={{ backgroundImage: NOISE }}
            />
            <button
              type="button"
              onClick={press(onMenu)}
              aria-label={view === "menu" ? "Back to now playing" : "Open menu"}
              className={cn(wheelButton, "left-1/2 top-[4%] h-[26%] w-[40%] -translate-x-1/2 text-[9px] font-bold tracking-[0.14em]")}
              style={{ fontFamily: "var(--font-sans), sans-serif" }}
            >
              MENU
            </button>
            <button
              type="button"
              onClick={press(onPrev)}
              aria-label={view === "menu" ? "Move up" : "Previous track"}
              className={cn(wheelButton, "left-[4%] top-1/2 h-[40%] w-[26%] -translate-y-1/2")}
            >
              <SkipGlyph direction="prev" className="h-2.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={press(onNext)}
              aria-label={view === "menu" ? "Move down" : "Next track"}
              className={cn(wheelButton, "right-[4%] top-1/2 h-[40%] w-[26%] -translate-y-1/2")}
            >
              <SkipGlyph direction="next" className="h-2.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={press(() => (playing ? pausePlayback() : playSpotify(track.src) || setPlaying(true)))}
              aria-label={playing ? "Pause" : "Play"}
              className={cn(wheelButton, "bottom-[4%] left-1/2 h-[26%] w-[40%] -translate-x-1/2")}
            >
              <span className="flex items-center">
                <PlayGlyph className="size-2" />
                <PauseGlyph className="-ml-0.5 size-2" />
              </span>
            </button>
            <button
              type="button"
              onClick={press(onSelect)}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label={view === "menu" ? "Play selected track" : playing ? "Pause, center button" : "Play, center button"}
              className="absolute inset-[31%] rounded-full bg-[radial-gradient(circle_at_42%_30%,#ffffff_0%,#f5f5f3_62%,#e9e9e6_100%)] shadow-[0_0_0_1px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.05)] transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
