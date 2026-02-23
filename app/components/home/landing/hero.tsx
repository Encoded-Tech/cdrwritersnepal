"use client";

/* ─── HeroSection.tsx ──────────────────────────────────────────────────
   Root hero component. Composes:
     HeroBackground  – orbs, sparks, shooting stars, grid, circle
     HeroBackground  – (imported from ./hero/HeroBackground)
     Typewriter      – cycling headline phrases
     StatPill        – metric display
     InviteCard      – right-side clickable agent preview card
     AgentForm       – step-by-step consultation modal
     constants       – all shared data

   This file owns ONLY:
     • scroll parallax hook
     • agentOpen state
     • layout / animation wrappers
     • marquee bar
──────────────────────────────────────────────────────────────────────── */

import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { AgentForm } from "./agentForm";
import { HeroBackground } from "./bg";
import { StatPill, Typewriter } from "./bgAtoms";
import { MARQUEE_ITEMS, TRUST_BADGES } from "./constants";
import { InviteCard } from "./inviteCard";



export default function HeroSection() {
  const [agentOpen, setAgentOpen] = useState(false);

  const heroRef     = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY         = useTransform(scrollY, [0, 600], [0, 80]);

  return (
    <>
      {/* Agent modal — rendered outside section so it's above everything */}
      <AnimatePresence>
        {agentOpen && <AgentForm onClose={() => setAgentOpen(false)} />}
      </AnimatePresence>

      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "#08090c" }}
      >
        {/* ── All background layers ── */}
        <HeroBackground bgY={bgY} />

        {/* ── Content ── */}
        <div className="relative flex container flex-col flex-1 mx-auto px-5" style={{ zIndex: 10 }}>

          {/* Spacer (no navbar) */}
          <div className="h-10 flex-shrink-0" />

          {/* ── Two-column body ── */}
          <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-16 py-12 lg:py-0">

            {/* ── LEFT — text / CTAs ── */}
            <motion.div
              className="flex-1 min-w-0"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
              }}
            >
              {/* Status badge */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: -16 }, visible: { opacity: 1, y: 0, transition: { duration: .5, ease: [0.22,1,0.36,1] } } }}
                className="inline-flex items-center gap-2.5 mb-7 mt-2 sm:mt-4 md:mt-8 lg:mt-16 xl:mt-0"
                style={{
                  background: "rgba(200,16,46,0.12)", border: "1px solid rgba(200,16,46,0.3)",
                  borderRadius: "9999px", padding: "0.45rem 1rem",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
                <span className="text-xs font-bold tracking-widest uppercase text-red-400">
                  Engineers Australia Approved Service
                </span>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.22,1,0.36,1] } } }}
                className="font-black text-white leading-[1.04] tracking-tight mb-2"
                style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)" }}
              >
                100% Positive CDR
                <br />
                Assessment.{" "}
                <span style={{ color: "#c8102e", }}>Guaranteed.</span>
              </motion.h1>

              {/* Typewriter */}
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .5, delay: .1 } } }}
                className="font-semibold text-white/40 mb-6"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)" }}
              >
                <Typewriter />
              </motion.div>

              {/* Description */}
              <motion.p
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: .6, ease: [0.22,1,0.36,1] } } }}
                className="text-white/55 leading-relaxed mb-8 max-w-lg"
                style={{ fontSize: "clamp(0.95rem, 1.5vw, 1.05rem)" }}
              >
                Expert engineers write your CDR including 3 Career Episodes, a Summary
                Statement &amp; a CPD aligned precisely to EA competency
                frameworks. First attempt. Zero plagiarism.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: .55, ease: [0.22,1,0.36,1] } } }}
                className="flex flex-wrap gap-3 mb-10"
              >
                <button
                  onClick={() => setAgentOpen(true)}
                  className="inline-flex items-center gap-2 font-bold text-white rounded-xl px-6 py-3.5 text-sm transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl active:scale-[0.98]"
                  style={{
                    background: "linear-gradient(135deg, #c8102e, #8b0015)",
                    boxShadow: "0 4px 24px rgba(200,16,46,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
                  }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                  </svg>
                  Get Free Consultation
                </button>

                <Link href="#services">
                  <button
                    className="inline-flex items-center gap-2 font-semibold text-white/80 rounded-xl px-6 py-3.5 text-sm transition-all duration-200 hover:text-white hover:bg-white/10 active:scale-[0.98]"
                    style={{ border: "1px solid rgba(255,255,255,0.15)" }}
                  >
                    View Services
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: .6, delay: .1 } } }}
                className="flex flex-wrap gap-x-6 gap-y-2 mb-10"
              >
                {TRUST_BADGES.map(b => (
                  <span key={b.label} className="flex items-center gap-1.5 text-xs font-semibold text-white/50">
                    <span className="text-green-500 font-black">{b.icon}</span>
                    {b.label}
                  </span>
                ))}
              </motion.div>

              {/* Stat pills */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: .6, delay: .1 } } }}
                className="flex flex-wrap gap-3"
              >
                <StatPill value="550+" label="Engineers Helped" />
                <StatPill value="100%" label="Success Rate" />
                <StatPill value="6+ Yrs" label="Experience" />
              </motion.div>
            </motion.div>

            {/* ── RIGHT — invite card ── */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .75, delay: .22, ease: [0.22,1,0.36,1] }}
            >
              <InviteCard onOpen={() => setAgentOpen(true)} />
            </motion.div>
          </div>

          {/* ── Bottom marquee ── */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: .9 }}
            className="pb-8"
          >
            <div
              className="rounded-2xl mt-4 overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}
            >
              <div className="py-3.5 overflow-hidden">
                <div
                  className="flex gap-10 whitespace-nowrap"
                  style={{ animation: "marquee-scroll 30s linear infinite", width: "max-content" }}
                >
                  {[...Array(3)].flatMap(() => MARQUEE_ITEMS).map((item, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold tracking-widest uppercase"
                      style={{ color: item.accent ? "#c8102e" : "rgba(255,255,255,0.3)" }}
                    >{item.text}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Global keyframes ── */}
        <style>{`
          @keyframes marquee-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
          @keyframes cardFloat      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
          @keyframes cardBarShim    { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
          @keyframes bdotPulse      { 0%,100%{opacity:1} 50%{opacity:.4} }
        `}</style>
      </section>
    </>
  );
}