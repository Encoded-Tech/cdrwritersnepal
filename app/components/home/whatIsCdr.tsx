"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ui";
import { CdrInfoKey } from "@/types/frontEnd";
import { fadeDown, fadeUp } from "../animations/animations";
import { CDR_INFO } from "@/data/data";

/* ─── Label map ─────────────────────────────────────────────────────── */
const LABELS: Record<CdrInfoKey, { short: string; full: string }> = {
  careerEpisodes:  { short: "Career Episodes",  full: "3 CE's ( Career Episodes )"               },
  summaryStatement:{ short: "Summary Statement", full: "SS ( Summary Statement )"                 },
  cpd:             { short: "CPD",               full: "CPD ( Continuing Professional Development )" },
  cv:              { short: "CV",                full: "CV ( Curriculum Vitae )"                  },
};

/* ─── Easing ────────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Empty-state icon (document + cursor) ─────────────────────────── */
function EmptyIcon() {
  return (
    <motion.svg
      width="40" height="40" viewBox="0 0 40 40" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="8" y="4" width="20" height="26" rx="3" stroke="var(--red)" strokeWidth="1.5" strokeOpacity="0.35"/>
      <line x1="13" y1="13" x2="23" y2="13" stroke="var(--red)" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
      <line x1="13" y1="18" x2="21" y2="18" stroke="var(--red)" strokeWidth="1.5" strokeOpacity="0.3" strokeLinecap="round"/>
      <line x1="13" y1="23" x2="19" y2="23" stroke="var(--red)" strokeWidth="1.5" strokeOpacity="0.2" strokeLinecap="round"/>
      {/* cursor arrow */}
      <motion.path
        d="M26 26 L26 34 L28.5 31.5 L31 35 L32.5 34 L30 30.5 L33.5 30.5 Z"
        fill="var(--red)" fillOpacity="0.55"
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
    </motion.svg>
  );
}

/* ─── Main component ────────────────────────────────────────────────── */
export default function WhatIsCDR() {
  const [activeInfo, setActiveInfo] = useState<CdrInfoKey | null>("careerEpisodes");

  const keys = Object.keys(CDR_INFO) as CdrInfoKey[];

  return (
    <section
    
      id="what-is-cdr"
      className="sm:max-w-7xl mx-auto py-24 px-4 md:px-8" 
    >

        <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(200,16,46,0.05) 0%, transparent 65%)",
        }}
      />
      
      {/* ── 1. Hero explanation block ── */}
      <ScrollReveal variant={fadeDown}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 items-center">
       

          {/* Left — content */}
          <div>
            <span className="inline-flex  items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border"
              style={{
                color: "var(--red)",
            

                background: "rgba(200,16,46,0.05)",
                borderColor: "rgba(200,16,46,0.18)",
              }}
            >
              <span style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "var(--red)", display: "inline-block",
              }} />
              Understanding CDR
            </span>

            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-serif)", color: "var(--ink, #1a1510)" }}
            >
              What is a{" "}
       <em style={{ color: "var(--red)", fontStyle: "italic" }}>CDR Report?</em>
            </h2>

            <p className="normal-paragraph leading-relaxed" style={{ maxWidth: "520px" }}>
   In simple terms, A Competency Demonstration Report (CDR) is a collection of documents through which engineers can prove their competencies in order to get a Skilled Migration visa for Australia. Engineers: Those seeking to immigrate to Australia via one of the skilled migration programs, such as the Skilled Independent Visa (Subclass 189), Skilled Nominated Visa (Subclass 190), or Skilled Work Regional (Provisional) Visa (Subclass 491), are generally required to submit a CDR.
            </p>
          </div>

          {/* Right — accent card */}
          <div
            className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            style={{
              background: "white",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            {/* Subtle top-left accent */}
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
              style={{ background: "var(--red)", opacity: 0.7 }}
            />

            <p className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: "var(--red)", opacity: 0.7 }}
            >
              Who needs it?
            </p>

            <ul className="space-y-3">
              {[
                { visa: "Subclass 189", label: "Skilled Independent Visa" },
                { visa: "Subclass 190", label: "Skilled Nominated Visa" },
                { visa: "Subclass 491", label: "Skilled Work Regional Visa" },
              ].map(({ visa, label }) => (
                <li key={visa} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{
                      background: "rgba(200,16,46,0.08)",
                      color: "var(--red)",
                      border: "1px solid rgba(200,16,46,0.15)",
                    }}
                  >{visa}</span>
                  <span className="text-sm" style={{ color: "#555" }}>{label}</span>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 pt-5 text-sm leading-relaxed"
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)", color: "#666" }}
            >
              Engineers Australia assesses your CDR against the{" "}
              <strong style={{ color: "#333" }}>ANZSCO</strong> competency
              standards before granting a skills assessment outcome.
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ── 2. Toggle buttons ── */}
      <ScrollReveal variant={fadeUp} delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {keys.map((key) => {
            const isActive = activeInfo === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveInfo(isActive ? null : key)}
                className="relative text-sm font-semibold px-5 py-2.5 rounded-full outline-none focus-visible:ring-2"
                style={{
                  border: isActive
                    ? "1.5px solid var(--red)"
                    : "1.5px solid rgba(0,0,0,0.14)",
                  background: isActive ? "var(--red)" : "white",
                  color: isActive ? "white" : "#444",
                  boxShadow: isActive
                    ? "0 4px 16px rgba(200,16,46,0.25)"
                    : "0 1px 4px rgba(0,0,0,0.06)",
                  transition: "background 0.22s, color 0.22s, border-color 0.22s, box-shadow 0.22s",
                  cursor: "pointer",
                }}
                whileHover={!isActive ? { scale: 1.03, borderColor: "rgba(200,16,46,0.4)" } : {}}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "tween", duration: 0.16 }}
                aria-pressed={isActive}
              >
                {/* Active glow ring */}
                {isActive && (
                  <motion.span
                    layoutId="btn-glow"
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ boxShadow: "0 0 0 3px rgba(200,16,46,0.15)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {/* Short label on mobile, full on md+ */}
                <span className="sm:hidden">{LABELS[key].short}</span>
                <span className="hidden sm:inline">{LABELS[key].full}</span>
              </motion.button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ── 3. Info display card ── */}
      <ScrollReveal variant={fadeUp} delay={0.15}>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
            minHeight: 180,
          }}
        >
          <AnimatePresence mode="wait">

            {/* Active info */}
            {activeInfo ? (
              <motion.div
                key={activeInfo}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="p-6 sm:p-8 md:p-10"
              >
                <div className="flex flex-col md:flex-row gap-8 md:gap-0">

                  {/* Left — title + description */}
                  <div className="flex-1 md:pr-8">
                    {/* Numbered step indicator */}
                    <div className="flex items-center gap-2.5 mb-4">
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ background: "var(--red)" }}
                      >
                        {keys.indexOf(activeInfo) + 1}
                      </span>
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: "var(--red)", opacity: 0.8 }}
                      >
                        {LABELS[activeInfo].short}
                      </span>
                    </div>

                    <h3
                      className="text-xl sm:text-2xl font-bold mb-3 leading-snug"
                      style={{
                        fontFamily: "var(--font-serif)",
                        color: "var(--ink, #1a1510)",
                      }}
                    >
                      {CDR_INFO[activeInfo].title}
                    </h3>

                    <p className="normal-paragraph leading-relaxed">
                      {CDR_INFO[activeInfo].description}
                    </p>
                  </div>

                  {/* Vertical divider — desktop only */}
                  <div
                    className="hidden md:block w-px self-stretch flex-shrink-0"
                    style={{ background: "rgba(0,0,0,0.07)" }}
                  />

                  {/* Horizontal divider — mobile only */}
                  <div
                    className="md:hidden h-px w-full"
                    style={{ background: "rgba(0,0,0,0.07)" }}
                  />

                  {/* Right — key points */}
                  <div className="md:pl-8 md:w-64 flex-shrink-0">
                    <p
                      className="text-xs font-bold uppercase tracking-widest mb-4"
                      style={{ color: "#999" }}
                    >
                      Key Points
                    </p>
                    <ul className="space-y-3">
                      {CDR_INFO[activeInfo].points.map((pt, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, ease: EASE, delay: 0.08 + i * 0.06 }}
                          className="flex items-start gap-2.5 text-sm"
                          style={{ color: "#555" }}
                        >
                          <span
                            className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              background: "rgba(200,16,46,0.08)",
                              color: "var(--red)",
                              border: "1px solid rgba(200,16,46,0.15)",
                            }}
                          >✓</span>
                          {pt}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>

            ) : (

              /* Empty state */
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col items-center justify-center gap-4 py-12 px-6 text-center"
                style={{ minHeight: 180 }}
              >
                <EmptyIcon />
                <div>
                  <p
                    className="text-sm font-semibold mb-1"
                    style={{ color: "#444" }}
                  >
                    Select a component above to explore its details.
                  </p>
                  <p className="text-xs" style={{ color: "#aaa" }}>
                    Career Episodes · Summary Statement · CPD · CV
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </ScrollReveal>
    </section>
  );
}