"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

const E: [number, number, number, number] = [0.32, 0, 0.16, 1];
const EASE_FILL: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Pillar {
  index: string;
  tag: string;
  headline: string;
  body: string;
  accent: string;
}

interface Value {
  icon: string;
  label: string;
  description: string;
}

const PILLARS: Pillar[] = [
  {
    index: "01",
    tag: "CDR — Engineers Australia",
    headline: "Competency Demonstration Report (CDR) for EA Migration Skills Assessment.",
    body: "A CDR is required by Engineers Australia (EA) for skilled migration. It includes three Career Episodes, a Summary Statement, and a Continuing Professional Development list. We craft CDRs that align precisely with EA's competency elements across all engineering disciplines.",
    accent: "#ef4444",
  },
  {
    index: "02",
    tag: "VETASSES — Trades & Vocational",
    headline: "VETASSES Skills Assessment for trade and vocational occupations.",
    body: "VETASSES assesses overseas-qualified tradespeople and vocational workers for Australian skilled migration. We prepare your skills assessment application, supporting documentation, and employment evidence packages to meet VETASSES criteria.",
    accent: "#6366f1",
  },
  {
    index: "03",
    tag: "ACS — ICT Professionals",
    headline: "ACS Skills Assessment for IT and computing professionals.",
    body: "The Australian Computer Society (ACS) assesses ICT professionals for skilled migration visas. Our team prepares ACS RPL reports, employment reference documentation, and qualification evidence tailored to your nominated ANZSCO occupation.",
    accent: "#10b981",
  },
];

const VALUES: Value[] = [
  {
    icon: "◎",
    label: "Engineers Australia (EA)",
    description: "CDR writing for Chartered Professional Engineer, Engineering Technologist, and Engineering Associate pathways across all disciplines.",
  },
  {
    icon: "⬡",
    label: "VETASSES",
    description: "Trade skills assessment support for electricians, plumbers, carpenters, chefs, and other vocational occupations applying for Australian migration.",
  },
  {
    icon: "▲",
    label: "ACS — ICT Skills",
    description: "RPL and skills assessment reports for software engineers, network analysts, IT project managers, and all ICT ANZSCO categories.",
  },
  {
    icon: "◇",
    label: "Visa & ANZSCO Guidance",
    description: "We help you identify the correct ANZSCO code, assessing body, and visa subclass — whether 189, 190, 491, or employer-sponsored streams.",
  },
];

/* ── Red Ink Button ── */
function RedInkButton({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMagnet({
      x: (e.clientX - (rect.left + rect.width / 2)) * 0.22,
      y: (e.clientY - (rect.top + rect.height / 2)) * 0.22,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMagnet({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      animate={{ x: magnet.x, y: magnet.y }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      whileHover={{ scale: 1.04 }}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "13px 28px", borderRadius: 100,
        border: "1.5px solid rgba(180,30,30,0.3)",
        background: "transparent", color: "#18140e",
        textDecoration: "none", fontFamily: "monospace",
        fontSize: "0.66rem", fontWeight: 700,
        letterSpacing: "0.18em", textTransform: "uppercase",
        cursor: "pointer", position: "relative", overflow: "hidden",
      }}
    >
      <motion.span
        aria-hidden
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_FILL }}
        style={{
          position: "absolute", inset: 0, background: "#b41e1e",
          transformOrigin: "left", borderRadius: 100, zIndex: 0,
        }}
      />
      <motion.span
        animate={{ color: hovered ? "#ffffff" : "#18140e" }}
        transition={{ duration: 0.28 }}
        style={{ position: "relative", zIndex: 1 }}
      >{label}</motion.span>
      <motion.span
        animate={{ x: hovered ? 3 : 0, color: hovered ? "#ffffff" : "#18140e" }}
        transition={{ duration: 0.25 }}
        style={{ position: "relative", zIndex: 1, fontSize: "0.85rem" }}
      >→</motion.span>
    </motion.a>
  );
}

/* ── Pillar Card ── */
function PillarCard({ p, i, inView }: { p: Pillar; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: i * 0.10 + 0.2, duration: 0.6, ease: E }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        background: hovered ? "#ffffff" : "#fafaf9",
        padding: "32px 28px 28px",
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 4px 12px rgba(0,0,0,0.06), 0 20px 48px rgba(0,0,0,0.08)"
          : "0 1px 4px rgba(0,0,0,0.03)",
      }}
    >
      <motion.div
        aria-hidden
        animate={{ scaleY: hovered ? 1 : 0.4, opacity: hovered ? 0.7 : 0.35 }}
        transition={{ duration: 0.3, ease: E }}
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm"
        style={{ background: p.accent, transformOrigin: "top" }}
      />
      <motion.div
        aria-hidden
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 5% 50%, ${p.accent}06 0%, transparent 70%)`,
        }}
      />
      <div className="flex items-center gap-2 mb-4">
        <motion.span
          animate={{ color: hovered ? p.accent : "rgba(0,0,0,0.18)" }}
          transition={{ duration: 0.25 }}
          className="text-[0.7rem] font-bold tracking-[0.1em]"
          style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
        >{p.index}</motion.span>
        <div className="w-5 h-px bg-black/10" />
        <span className="font-mono text-[0.52rem] font-extrabold tracking-[0.18em] uppercase"
          style={{ color: p.accent }}>{p.tag}</span>
      </div>
      <h3 className="m-0 mb-3 text-[1.05rem] font-bold leading-[1.38] tracking-[-0.022em] text-[#18140e]"
        style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}>
        {p.headline}
      </h3>
      <p className="m-0 text-[0.875rem] text-[#6f6a63] leading-[1.78] tracking-[0.004em]">
        {p.body}
      </p>
    </motion.article>
  );
}

/* ── Value Chip ── */
function ValueChip({ v, i, inView }: { v: Value; i: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ delay: i * 0.07 + 0.5, duration: 0.5, ease: E }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex gap-4 items-start p-5 rounded-xl cursor-default"
      style={{
        border: "1px solid rgba(0,0,0,0.07)",
        background: hovered ? "#fff" : "transparent",
        transition: "background 0.25s ease, box-shadow 0.25s ease",
        boxShadow: hovered ? "0 2px 8px rgba(0,0,0,0.05)" : "none",
      }}
    >
      <div className="w-9 h-9 rounded-[9px] shrink-0 flex items-center justify-center text-[0.85rem]"
        style={{
          background: "rgba(200,16,46,0.06)",
          border: "1px solid rgba(200,16,46,0.14)",
          color: "#c8102e",
        }}>
        {v.icon}
      </div>
      <div>
        <p className="m-0 mb-1 text-[0.9rem] font-bold text-[#18140e] tracking-[-0.015em]"
          style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}>
          {v.label}
        </p>
        <p className="m-0 text-[0.8rem] text-[#8a847c] leading-[1.7]">
          {v.description}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="about-heading"
      itemScope
      itemType="https://schema.org/Organization"
      className="relative py-24 px-6"
      style={{ background: "#f9f8f6" }}
    >
      {/* ambient glow */}
      <div aria-hidden className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(200,16,46,0.04) 0%, transparent 65%)",
        }} />

      {/* dot grid */}
      <div aria-hidden className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }} />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, ease: E }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border font-mono"
            style={{
              color: "#c8102e",
              background: "rgba(200,16,46,0.05)",
              borderColor: "rgba(200,16,46,0.18)",
            }}>
            <span className="w-[5px] h-[5px] rounded-full inline-block" style={{ background: "#c8102e" }} />
            We Provide Skill Assessment Services
          </span>

          {/* Two-col header: 1-col on mobile/tablet, 2-col on lg+ */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-16 items-end">
            <h2
              id="about-heading"
              itemProp="name"
              className="m-0 text-[clamp(2rem,4vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[#18140e]"
              style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
            >
              Your pathway to{" "}
              <span style={{ color: "#c8102e", opacity: 0.85 }}>
                Australian migration
              </span>{" "}
              starts here.
            </h2>

            <p
              itemProp="description"
              className="text-[0.95rem] text-[#6f6a63] leading-[1.82] m-0 tracking-[0.004em]"
            >
              We specialise in skills assessments for Australian skilled migration visas - including
              CDR reports for Engineers Australia (EA), VETASSES for trade occupations, and ACS
              assessments for ICT professionals. Our experts guide you through every step of the
              process with precision and clarity.
            </p>
          </div>
        </motion.div>

        {/* ── Pillar Cards: 1-col mobile, 2-col md, 3-col lg ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          {PILLARS.map((p, i) => (
            <PillarCard key={p.index} p={p} i={i} inView={inView} />
          ))}
        </div>

        {/* ── Values Grid: 1-col mobile, 2-col sm+ ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-16">
          {VALUES.map((v, i) => (
            <ValueChip key={v.label} v={v} i={i} inView={inView} />
          ))}
        </div>

        {/* ── CTA Strip ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: E }}
          className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6"
        >
          <div className="hidden sm:block flex-1 h-px"
            style={{ background: "linear-gradient(to right, transparent, rgba(0,0,0,0.07))" }} />

          <div className="text-center shrink-0">
            <p className="text-[0.82rem] text-[#b0aa9f] mb-3 tracking-[0.03em]">
              Ready to get your skills assessed?
            </p>
            <div className="flex gap-3 items-center justify-center flex-wrap">
              <RedInkButton href="/get-started" label="Start My Assessment" />
              <a
                href="/contact"
                className="font-mono text-[0.6rem] font-bold tracking-[0.16em] uppercase text-[#b0aa9f] no-underline transition-colors duration-200 hover:text-[#18140e]"
              >
                Talk to an Expert →
              </a>
            </div>
          </div>

          <div className="hidden sm:block flex-1 h-px"
            style={{ background: "linear-gradient(to left, transparent, rgba(0,0,0,0.07))" }} />
        </motion.div>

      </div>
    </section>
  );
}