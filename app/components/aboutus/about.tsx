"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeDown, fadeUp } from "../animations/animations";
import { ScrollReveal } from "../home/ui";

/* ─── Easing ────────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Types ─────────────────────────────────────────────────────────── */
type TabKey = "careerEpisodes" | "summaryStatement" | "cpd" | "portal";

/* ─── Label map ─────────────────────────────────────────────────────── */
const LABELS: Record<TabKey, { short: string; full: string }> = {
  careerEpisodes:   { short: "Career Episodes",   full: "3 CE's ( Career Episodes )"                  },
  summaryStatement: { short: "Summary Statement",  full: "SS ( Summary Statement )"                    },
  cpd:              { short: "CPD",                full: "CPD ( Continuing Professional Development )" },
  portal:           { short: "Portal & Lodgement", full: "Portal & Final Lodgement"                    },
};

/* ─── Tab content ───────────────────────────────────────────────────── */
const TAB_INFO: Record<
  TabKey,
  { step: number; title: string; description: string; points: string[] }
> = {
  careerEpisodes: {
    step: 1,
    title: "Career Episodes Writing",
    description:
      "Each Career Episode is a structured narrative that documents your real engineering experience, competencies, and problem-solving abilities in a format that meets Engineers Australia's exacting standards. Our writers prepare three distinct episodes that collectively demonstrate the breadth and depth of your engineering practice across different projects and domains.",
    points: [
      "Three episodes covering different engineering domains",
      "Paragraph-level mapping to EA competency elements",
      "First-person, active voice as required by EA",
      "Reviewed by senior CDR specialists before delivery",
    ],
  },
  summaryStatement: {
    step: 2,
    title: "Summary Statement Mapping",
    description:
      "The Summary Statement cross-references every paragraph of your Career Episodes against each competency element required by Engineers Australia. It is one of the most technical and critical components of your CDR — a single gap or misalignment here is among the most common reasons for assessment failure.",
    points: [
      "Precise paragraph-level cross-referencing",
      "All competency units addressed without gaps",
      "Aligned to your nominated ANZSCO occupation",
      "Formatted strictly per official EA guidelines",
    ],
  },
  cpd: {
    step: 3,
    title: "CPD Preparation",
    description:
      "Your Continuing Professional Development (CPD) record demonstrates your ongoing commitment to learning, growth, and engineering practice. We help you structure, categorise, and present CPD activities in a compelling, EA-compliant format that satisfies the minimum requirements for your assessment pathway.",
    points: [
      "Structured chronological CPD log preparation",
      "Activity categorisation per EA CPD framework",
      "Technical and non-technical learning documented",
      "Minimum hours compliance verified and confirmed",
    ],
  },
  portal: {
    step: 4,
    title: "Portal & Final Lodgement",
    description:
      "We manage the complete submission lifecycle — from compiling your final documentation package to navigating the Engineers Australia online portal and confirming successful lodgement. You do not need to interact with the portal alone at any stage of the process.",
    points: [
      "Final document compilation and quality check",
      "Engineers Australia portal account setup support",
      "Application form completion and review",
      "Lodgement confirmation and post-submission guidance",
    ],
  },
};

/* ─── What we handle ────────────────────────────────────────────────── */
const HANDLE_ITEMS = [
  "Career Episodes Writing",
  "Summary Statement Mapping",
  "CPD Preparation",
  "Professional CV Optimisation",
  "ANZSCO Code Alignment",
  "Engineers Australia Portal Handling",
  "ACS & VETASSESS Documentation Support",
  "Final Lodgement Assistance",
];

/* ─── Assessing bodies ──────────────────────────────────────────────── */
const BODIES = [
  {
    code: "EA",
    name: "Engineers Australia",
    desc: "The primary assessing authority for engineering occupations under ANZSCO. Required for most skilled migration visa subclasses including 189, 190, and 491.",
  },
  {
    code: "ACS",
    name: "Australian Computer Society",
    desc: "Assesses ICT professionals including software engineers, systems analysts, and IT specialists for skilled migration pathways.",
  },
  {
    code: "VETASSESS",
    name: "VETASSESS",
    desc: "Covers a broad range of professional, managerial, and technical occupations not assessed by other authorities, including engineering technologists.",
  },
];

/* ══════════════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function AboutCDRServices() {
  const [activeTab, setActiveTab] = useState<TabKey>("careerEpisodes");

  const keys = Object.keys(TAB_INFO) as TabKey[];
  const active = TAB_INFO[activeTab];

  return (
    <section
      id="about-cdr-services"
      className="sm:max-w-7xl mx-auto py-24 px-4 md:px-8"
      style={{ position: "relative" }}
    >
      {/* Radial gradient — matches WhatIsCDR exactly */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(200,16,46,0.05) 0%, transparent 65%)",
        }}
      />

      {/* ══ 1. HERO BLOCK ══════════════════════════════════════════════ */}
      <ScrollReveal variant={fadeDown}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 items-center">

          {/* Left — content */}
          <div>
            {/* Eyebrow — exact pattern from WhatIsCDR / WhyExpert */}
            <span
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border"
              style={{
                color: "var(--red)",
                background: "rgba(200,16,46,0.05)",
                borderColor: "rgba(200,16,46,0.18)",
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  background: "var(--red)",
                  display: "inline-block",
                }}
              />
              Professional CDR Experts
            </span>

            {/* Headline — serif + italic red em, same as WhatIsCDR */}
            <h2
              className="text-3xl sm:text-4xl font-bold leading-tight mb-5"
              style={{ fontFamily: "var(--font-serif)", color: "var(--ink, #1a1510)" }}
            >
              About Our{" "}
              <em style={{ color: "var(--red)", fontStyle: "italic" }}>
                CDR Writing Services
              </em>
            </h2>

            {/* Body — normal-paragraph class */}
            <p className="normal-paragraph leading-relaxed mb-8" style={{ maxWidth: "520px" }}>
              We are a dedicated team of CDR documentation specialists delivering end-to-end
              migration writing support that meets the rigorous standards of Engineers Australia,
              ACS, and VETASSESS. From the first career episode draft to final portal lodgement,
              we handle every step so your application is positioned for first-attempt approval.
            </p>

            {/* CTA buttons — exact style from WhyCDRWritersNepal */}
            <div className="flex flex-wrap gap-3">
              <Link href="/contact">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "tween", duration: 0.2, ease: EASE }}
                  style={{
                    background: "var(--red)",
                    color: "#fff",
                    border: "1.5px solid var(--red)",
                    padding: "12px 26px",
                    borderRadius: 11,
                    fontSize: "0.88rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                    boxShadow: "0 4px 18px rgba(180,30,30,0.22)",
                  }}
                >
                  Start Your CDR Assessment
                </motion.button>
              </Link>

              <Link href="/contact">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "tween", duration: 0.2, ease: EASE }}
                  style={{
                    background: "transparent",
                    color: "#18140e",
                    border: "1.5px solid rgba(0,0,0,0.15)",
                    padding: "12px 26px",
                    borderRadius: 11,
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    letterSpacing: "0.01em",
                    transition: "border-color 0.25s, color 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--red)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--red)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.15)";
                    (e.currentTarget as HTMLButtonElement).style.color = "#18140e";
                  }}
                >
                  Speak to an Expert First
                </motion.button>
              </Link>
            </div>
          </div>

          {/* Right — "What We Handle" accent card — exact pattern from WhatIsCDR */}
          <div
            className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
            style={{
              background: "white",
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
            }}
          >
            {/* Red left accent line */}
            <div
              className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
              style={{ background: "var(--red)", opacity: 0.7 }}
            />

            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: "var(--red)", opacity: 0.7 }}
            >
              What We Handle For You
            </p>

            <ul className="space-y-3">
              {HANDLE_ITEMS.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: "rgba(200,16,46,0.08)",
                      color: "var(--red)",
                      border: "1px solid rgba(200,16,46,0.15)",
                    }}
                  >
                    ✓
                  </span>
                  <span className="text-sm" style={{ color: "#555" }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div
              className="mt-6 pt-5 text-sm leading-relaxed"
              style={{ borderTop: "1px solid rgba(0,0,0,0.07)", color: "#666" }}
            >
              Covering{" "}
              <strong style={{ color: "#333" }}>EA, ACS, and VETASSESS</strong>{" "}
              assessment pathways for skilled migration to Australia.
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ══ 2. ASSESSING BODIES ════════════════════════════════════════ */}
      <ScrollReveal variant={fadeUp} delay={0.05}>
        <div className="mb-16">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-6"
            style={{ color: "#999" }}
          >
            Assessing Authorities We Cover
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BODIES.map((body, i) => (
              <motion.div
                key={body.code}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, ease: EASE, delay: i * 0.08 }}
                className="rounded-2xl p-5"
                style={{
                  background: "white",
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-md"
                    style={{
                      background: "rgba(200,16,46,0.08)",
                      color: "var(--red)",
                      border: "1px solid rgba(200,16,46,0.15)",
                    }}
                  >
                    {body.code}
                  </span>
                  <span
                    className="font-semibold text-sm"
                    style={{ color: "#18140e", letterSpacing: "-0.008em" }}
                  >
                    {body.name}
                  </span>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "0.825rem", color: "#6a6560" }}
                >
                  {body.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ══ 3. TOGGLE BUTTONS — exact pattern from WhatIsCDR ══════════ */}
      <ScrollReveal variant={fadeUp} delay={0.1}>
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
          {keys.map((key) => {
            const isActive = activeTab === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
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
                  transition:
                    "background 0.22s, color 0.22s, border-color 0.22s, box-shadow 0.22s",
                  cursor: "pointer",
                }}
                whileHover={
                  !isActive ? { scale: 1.03, borderColor: "rgba(200,16,46,0.4)" } : {}
                }
                whileTap={{ scale: 0.97 }}
                transition={{ type: "tween", duration: 0.16 }}
                aria-pressed={isActive}
              >
                {/* Active glow ring — identical to WhatIsCDR */}
                {isActive && (
                  <motion.span
                    layoutId="about-btn-glow"
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ boxShadow: "0 0 0 3px rgba(200,16,46,0.15)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="sm:hidden">{LABELS[key].short}</span>
                <span className="hidden sm:inline">{LABELS[key].full}</span>
              </motion.button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ══ 4. INFO DISPLAY CARD — exact layout from WhatIsCDR ════════ */}
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
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="p-6 sm:p-8 md:p-10"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-0">

                {/* Left — title + description */}
                <div className="flex-1 md:pr-8">
                  {/* Numbered step indicator — identical to WhatIsCDR */}
                  <div className="flex items-center gap-2.5 mb-4">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: "var(--red)" }}
                    >
                      {active.step}
                    </span>
                    <span
                      className="text-xs font-bold tracking-widest uppercase"
                      style={{ color: "var(--red)", opacity: 0.8 }}
                    >
                      {LABELS[activeTab].short}
                    </span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-bold mb-3 leading-snug"
                    style={{
                      fontFamily: "var(--font-serif)",
                      color: "var(--ink, #1a1510)",
                    }}
                  >
                    {active.title}
                  </h3>

                  <p className="normal-paragraph leading-relaxed">
                    {active.description}
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
                    {active.points.map((pt, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          ease: EASE,
                          delay: 0.08 + i * 0.06,
                        }}
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
                        >
                          ✓
                        </span>
                        {pt}
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer note — matches WhyExpert */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
          className="pt-7 text-[0.78rem] leading-relaxed"
          style={{ color: "#bbb" }}
        >
          All engagements are handled by qualified engineers with direct experience in
          Engineers Australia, ACS, and VETASSESS competency frameworks.
        </motion.p>
      </ScrollReveal>
    </section>
  );
}