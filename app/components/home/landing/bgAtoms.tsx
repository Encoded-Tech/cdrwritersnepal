"use client";

/* ─── HeroAtoms.tsx ────────────────────────────────────────────────────
   Small reusable atoms used in the hero left column:
     • Typewriter  – animated phrase cycling
     • StatPill    – single metric pill
──────────────────────────────────────────────────────────────────────── */

import { useState, useEffect } from "react";
import { PHRASES } from "./constants";


/* ── Typewriter ── */
export function Typewriter() {
  const [idx, setIdx]          = useState(0);
  const [text, setText]        = useState("");
  const [isDeleting, setIsDel] = useState(false);

  useEffect(() => {
    const current = PHRASES[idx];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text.length < current.length)
      timeout = setTimeout(() => setText(current.substring(0, text.length + 1)), 60);
    else if (!isDeleting && text.length === current.length)
      timeout = setTimeout(() => setIsDel(true), 2000);
    else if (isDeleting && text.length > 0)
      timeout = setTimeout(() => setText(current.substring(0, text.length - 1)), 35);
    else
      timeout = setTimeout(() => { setIsDel(false); setIdx(p => (p + 1) % PHRASES.length); }, 200);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, idx]);

  return (
    <span>
      {text}
      <span className="inline-block w-[3px] h-[1em] ml-1 bg-red-500 animate-pulse" />
    </span>
  );
}

/* ── StatPill ── */
interface StatPillProps { value: string; label: string; }

export function StatPill({ value, label }: StatPillProps) {
  return (
    <div
      className="flex flex-col items-center px-5 py-3 rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
      }}
    >
      <span className="text-2xl font-black text-white leading-none tracking-tight">{value}</span>
      <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest mt-0.5">{label}</span>
    </div>
  );
}