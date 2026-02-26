"use client";

/* ─── AboutHero.tsx ─────────────────────────────────────────────────────
   Fix: ease arrays typed as `[number,number,number,number]` (cubic bezier
   tuple) so Framer Motion's Easing type accepts them without error.
──────────────────────────────────────────────────────────────────────── */

import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants, type Transition } from "framer-motion";
import { HeroBackground } from "@/app/components/home/landing/bg";
import { StatPill }        from "@/app/components/home/landing/bgAtoms";
import AboutSection from "@/app/components/aboutus/mission";
import JourneySection from "@/app/components/aboutus/journey";
import AboutCDRServices from "@/app/components/aboutus/about";

/* ─── Shared easing — typed as a const tuple so TS narrows correctly ── */
const E = [0.22, 1, 0.36, 1] as [number, number, number, number];

/* ─── Variants — Variants type imported, ease cast via tuple ── */
const container: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden:  { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: E } as Transition,
  },
};

/* ─── Pillar card ── */
interface PillarProps {
  icon:  React.ReactNode;
  title: string;
  body:  string;
  delay: number;
}
function Pillar({ icon, title, body, delay }: PillarProps) {
  const t: Transition = { duration: 0.65, ease: E, delay };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={t}
      className="rounded-2xl p-5 flex gap-4"
      style={{
        background: "rgba(255,255,255,0.04)",
        border:     "1px solid rgba(255,255,255,0.09)",
      }}
      whileHover={{
        backgroundColor: "rgba(200,16,46,0.07)",
        borderColor:     "rgba(200,16,46,0.28)",
      }}
    >
      <div
        className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
        style={{
          background: "rgba(200,16,46,0.14)",
          border:     "1px solid rgba(200,16,46,0.28)",
        }}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm font-bold text-white mb-1.5">{title}</p>
        <p className="text-[13px] leading-relaxed text-white/60">{body}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main ── */
export default function AboutHero() {
  const heroRef     = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY         = useTransform(scrollY, [0, 600], [0, 80]);

  const slideIn = (delay: number): Transition => ({ duration: 0.75, ease: E, delay });

  return (
 <>
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "#08090c" }}
    >
      {/* Shared background */}
      <HeroBackground bgY={bgY} />

      {/* Top-centre red glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        aria-hidden
        style={{
          width:      720,
          height:     340,
          background: "radial-gradient(ellipse at 50% 0%, rgba(200,16,46,0.16) 0%, transparent 70%)",
          filter:     "blur(40px)",
        }}
      />

      {/* "ABOUT" watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
        style={{ zIndex: 1 }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 2 }}
          style={{
            fontFamily:       "'Playfair Display', serif",
            fontSize:         "clamp(6rem, 20vw, 18rem)",
            fontWeight:       900,
            letterSpacing:    "0.12em",
            textTransform:    "uppercase",
            color:            "transparent",
            WebkitTextStroke: "1px rgba(200,16,46,0.06)",
            userSelect:       "none",
          }}
        >
          ABOUT
        </motion.span>
      </div>

      {/* ── Page content ── */}
      <div
        className="relative flex flex-col flex-1 container mx-auto px-5"
        style={{ zIndex: 10 }}
      >
        <div className="h-10 flex-shrink-0" />

        <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center gap-12 lg:gap-20 py-12 lg:py-0">

          {/* ── LEFT ── */}
          <motion.div
            className="flex-1 min-w-0"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={item}
              className="inline-flex items-center gap-2.5 mt-2 sm:mt-4 md:mt-8 lg:mt-16 xl:mt-0 mb-7"
              style={{
                background:   "rgba(200,16,46,0.12)",
                border:       "1px solid rgba(200,16,46,0.3)",
                borderRadius: "9999px",
                padding:      "0.45rem 1rem",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <span className="text-xs font-bold tracking-widest uppercase text-red-400">
                Nepal&apos;s #1 CDR Writing Studio · Since 2020
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={item}
              className="font-black text-white leading-[1.04] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)" }}
            >
              Built by Engineers.
              <br />
              Obsessed with{" "}
              <span style={{ color: "#c8102e" }}>One Thing.</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={item}
              className="font-semibold text-white/75 mb-6"
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.28rem)" }}
            >
              Getting you approved - on the first attempt.
            </motion.p>

            {/* Body */}
            <motion.p
              variants={item}
              className="text-white/65 leading-[1.8] mb-5 max-w-[520px]"
              style={{ fontSize: "clamp(0.93rem, 1.5vw, 1.02rem)" }}
            >
              CDR Writers Nepal was founded by professional engineers who lived through
              the EA assessment themselves - and were frustrated by how opaque and
              inconsistent the process felt. We built a studio around one principle:
            </motion.p>

            {/* Pull-quote */}
            <motion.blockquote
              variants={item}
              className="mb-10 pl-4"
              style={{ borderLeft: "2px solid #c8102e" }}
            >
              <p
                className="text-white font-semibold leading-[1.75]"
                style={{ fontSize: "clamp(0.93rem, 1.5vw, 1.02rem)" }}
              >
                Every CDR we write is reverse-engineered from the exact competency
                benchmarks Engineers Australia uses to evaluate it. No guesswork.
                No templates. No recycled narratives.
              </p>
            </motion.blockquote>

            {/* Stat pills */}
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <StatPill value="550+" label="Engineers Approved" />
              <StatPill value="98%" label="First-Attempt Rate" />
              <StatPill value="6+ Yrs" label="Experience"        />
              <StatPill value="15+"   label="Engineering Fields" />
            </motion.div>
          </motion.div>

          {/* ── RIGHT — pillar cards ── */}
          <motion.div
            className="w-full lg:w-[420px] flex-shrink-0 flex flex-col gap-3"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={slideIn(0.22)}
          >
               <div className="flex items-center gap-2.5 mb-3">
              <span
                className="w-3 h-px"
                style={{ background: "#c8102e" }}
              />
              <p
                className="text-[10px] font-bold tracking-[0.28em] uppercase"
                style={{ color: "#c8102e" }}
              >
                What drives us
              </p>
            </div>

            <Pillar
              delay={0.50}
              title="Assessment-First Methodology"
              body="Every career episode is explicitly mapped to EA's Stage 2 competency elements - PE1, PE2, PE3. Nothing is left implied."
              icon={
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#c8102e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4h12M2 8h8M2 12h5" />
                </svg>
              }
            />

            <Pillar
              delay={0.63}
              title="Zero Plagiarism, Zero Templates"
              body="Each CDR is written from scratch - your projects, your voice, your decisions. Built to pass Turnitin and survive assessor scrutiny."
              icon={
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#c8102e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 2l1.5 4.5H14l-3.7 2.7 1.4 4.3L8 11 4.3 13.5l1.4-4.3L2 6.5h4.5z" />
                </svg>
              }
            />

            <Pillar
              delay={0.76}
              title="Engineers Writing for Engineers"
              body="Our writers hold chartered status across civil, mechanical, electrical, and software - they understand your work technically, not just narratively."
              icon={
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#c8102e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="8" cy="5" r="3" />
                  <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                </svg>
              }
            />

            <Pillar
              delay={0.89}
              title="Unlimited Revisions Until Approved"
              body="We don't stop until EA confirms your positive outcome. Revisions, rebuttals, and re-submissions - all included, no extra charge."
              icon={
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="#c8102e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13.5 2.5A6.5 6.5 0 112.5 9" />
                  <path d="M2 5.5V9h3.5" />
                </svg>
              }
            />

            {/* Compliance strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="mt-1 rounded-xl px-4 py-3 flex items-center gap-3"
              style={{
                background: "rgba(200,16,46,0.08)",
                border:     "1px solid rgba(200,16,46,0.22)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <p className="text-[13px] text-white/70 leading-snug">
                Fully compliant with{" "}
                <span className="text-white font-semibold">Engineers Australia</span>,{" "}
                <span className="text-white font-semibold">ACS</span>, and{" "}
                <span className="text-white font-semibold">VETASSESS</span> frameworks.
              </p>
            </motion.div>
          </motion.div>
        </div>
       

        <div className="h-10 flex-shrink-0" />
      </div>
    </section>

     <AboutSection />
     <JourneySection />
     <AboutCDRServices />
 </>
  );
}

