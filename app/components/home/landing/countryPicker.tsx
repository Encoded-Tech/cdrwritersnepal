"use client";

/* ─── CountryPicker.tsx ────────────────────────────────────────────────
   Searchable country-code dropdown.
   Search works by:  country name ("Nepal"), code ("NP"), or dial ("+977")
──────────────────────────────────────────────────────────────────────── */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COUNTRIES, Country } from "./constants";

interface CountryPickerProps {
  value: Country;
  onChange: (c: Country) => void;
}

export function CountryPicker({ value, onChange }: CountryPickerProps) {
  const [open, setOpen]       = useState(false);
  const [query, setQuery]     = useState("");
  const wrapRef               = useRef<HTMLDivElement>(null);
  const searchRef             = useRef<HTMLInputElement>(null);

  // close on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // auto-focus search on open
  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 60);
  }, [open]);

  const filtered = COUNTRIES.filter(c => {
    const q = query.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q) ||
      c.dial.includes(q)
    );
  });

  const handleSelect = (c: Country) => {
    onChange(c);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={wrapRef} style={{ position: "relative", flexShrink: 0 }}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setQuery(""); }}
        style={{
          height: 42, minWidth: 100, padding: "0 10px",
          display: "flex", alignItems: "center", gap: 6,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 10, cursor: "pointer", whiteSpace: "nowrap",
          fontFamily: "inherit", transition: "border-color .2s, background .2s",
        }}
        onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(200,16,46,0.45)"; e.currentTarget.style.background = "rgba(200,16,46,0.06)"; }}
        onMouseOut={e  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
        aria-label="Select country code"
      >
        <span style={{ fontSize: "1.05rem", lineHeight: 1 }}>{value.flag}</span>
        <span style={{ fontSize: "0.8rem", fontWeight: 600, color: "white" }}>{value.dial}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d={open ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}/>
        </svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{   opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute", top: "calc(100% + 6px)", left: 0,
              width: 255, zIndex: 60, borderRadius: 12,
              background: "#0d0f14", border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.85)", overflow: "hidden",
            }}
          >
            {/* Search */}
            <div style={{ padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ position: "relative" }}>
                <svg
                  style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}
                  width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2.5"
                >
                  <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  ref={searchRef}
                  placeholder="Search country, code, or +dial…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    width: "100%", padding: "8px 10px 8px 30px", fontSize: "0.8rem",
                    color: "white", background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8, outline: "none", boxSizing: "border-box", fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* List */}
            <div style={{ maxHeight: 200, overflowY: "auto" }}>
              {filtered.length === 0 && (
                <p style={{ padding: "12px 14px", fontSize: "0.78rem", color: "rgba(255,255,255,0.3)", margin: 0 }}>
                  No countries found
                </p>
              )}
              {filtered.map(c => (
                <button
                  key={c.code} type="button"
                  onClick={() => handleSelect(c)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 8,
                    padding: "8px 14px", border: "none", cursor: "pointer", textAlign: "left",
                    background: c.code === value.code ? "rgba(200,16,46,0.14)" : "transparent",
                    fontFamily: "inherit", transition: "background .15s",
                  }}
                  onMouseOver={e => { if (c.code !== value.code) e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                  onMouseOut={e  => { if (c.code !== value.code) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ fontSize: "1rem", flexShrink: 0 }}>{c.flag}</span>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "white", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {c.name}
                  </span>
                  <span style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.38)", flexShrink: 0 }}>{c.dial}</span>
                  {c.code === value.code && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" style={{ flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}