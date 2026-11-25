"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Optional click sounds. Off by default; the visitor's choice is remembered in
 * localStorage. When on, every link and button click plays a short, quiet tick
 * made with the Web Audio API (no audio files).
 */

type SoundState = { on: boolean; toggle: () => void; tick: () => void };

const SoundContext = createContext<SoundState>({ on: false, toggle: () => {}, tick: () => {} });

const STORAGE_KEY = "herteoh:sound";

export function SoundProvider({ children }: { children: ReactNode }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const onRef = useRef(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) === "on";
      setOn(saved);
      onRef.current = saved;
    } catch {
      /* storage unavailable: stay off */
    }
  }, []);

  const play = useCallback(() => {
    try {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      ctxRef.current = ctxRef.current ?? new AC();
      const ac = ctxRef.current;
      const t = ac.currentTime;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1400, t);
      osc.frequency.exponentialRampToValueAtTime(600, t + 0.05);
      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start(t);
      osc.stop(t + 0.07);
    } catch {
      /* audio unavailable: stay silent */
    }
  }, []);

  const tick = useCallback(() => {
    if (onRef.current) play();
  }, [play]);

  const toggle = useCallback(() => {
    const next = !onRef.current;
    onRef.current = next;
    setOn(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    } catch {
      /* ignore */
    }
    if (next) play();
  }, [play]);

  // One listener for the whole site: any link or button click ticks when sound is on.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el?.closest("a, button") && !el.closest("[data-sound-toggle]")) tick();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [tick]);

  return <SoundContext.Provider value={{ on, toggle, tick }}>{children}</SoundContext.Provider>;
}

export const useSound = () => useContext(SoundContext);

export function SoundToggle({ className = "" }: { className?: string }) {
  const { on, toggle } = useSound();
  return (
    <button
      type="button"
      data-sound-toggle
      onClick={toggle}
      aria-pressed={on}
      aria-label="Sound"
      className={`press inline-flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 rounded-[10px] border border-border bg-background px-3 font-sans text-[13px] font-medium text-foreground hover:bg-card ${className}`}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="sm:hidden">
        <path d="M11 5 6 9H3v6h3l5 4V5z" />
        {on ? <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" /> : <path d="m16 9 5 6m0-6-5 6" />}
      </svg>
      <span className="hidden sm:inline" aria-hidden="true">Sound: {on ? "on" : "off"}</span>
    </button>
  );
}
