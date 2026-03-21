"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeDown, fadeUp } from "../animations/animations";
import { ScrollReveal } from "../home/ui";

const EASE = [0.22, 1, 0.36, 1] as const;

const REASONS = [
  {
    number: "01",
    title: "Assessor-First Thinking",
    body: "We offer tailored CDR writing, review, and consultation services to engineers worldwide. Our experts ensure that your CDR meets the highest standards set by Engineers Australia.",
  },
  {
    number: "02",
    title: "Framework Specialists",
    body: "We work exclusively within EA Stage 1, ACS ANZSCO, and VETASSESS criteria. This is all we do - no generalist guesswork.",
  },
  {
    number: "03",
    title: "Strategy Before Writing",
    body: "We analyse your profile against your target ANZSCO code before anything is written. Strategy drives outcomes - not volume.",
  },
  {
    number: "04",
    title: "All Three Pathways",
    body: "CDR for Engineers Australia, RPL for ACS, employment evidence for VETASSESS - equal depth across every authority.",
  },
  {
    number: "05",
    title: "Gap Detection Early",
    body: "We identify weak or missing competency evidence before drafting - not after a negative outcome.",
  },
  {
    number: "06",
    title: "Pre-Submission Review",
    body: "Every engagement ends with a final audit against assessor-logic standards. Nothing is submitted with unresolved issues.",
  },
];

const SERVICES = [
  {
    code: "EA",
    name: "Engineers Australia",
    description: "CDR writing, Career Episodes, Summary Statement & CPD structuring.",
    href: "/services/engineers-australia",
  },
  {
    code: "ACS",
    name: "Australian Computer Society",
    description: "Skills assessment support across all ACS pathways including RPL reports.",
    href: "/services/acs-skills-assessment",
  },
  {
    code: "VET",
    name: "VETASSESS",
    description: "Employment evidence, reference letter guidance & qualification mapping.",
    href: "/services/vetassess-skills-assessment",
  },
  {
    code: "EOI",
    name: "EOI Lodgement",
    description: "Expression of Interest preparation, points strategy & SkillSelect lodgement.",
    href: "/services/eoi-lodgement",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="why-choose-us"
      className="sm:max-w-7xl mx-auto py-24 px-4 md:px-8"
      style={{ position: "relative" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(200,16,46,0.05) 0%, transparent 65%)",
        }}
      />

      {/* ══ HEADER ══════════════════════════════════════════════════════ */}
      <ScrollReveal variant={fadeDown}>
        <div className="mb-10 max-w-xl">
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
                width: 5, height: 5, borderRadius: "50%",
                background: "var(--red)", display: "inline-block",
              }}
            />
            Our Expertise
          </span>

          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "var(--ink, #1a1510)" }}
          >
            Why Choose{" "}
            <em style={{ color: "var(--red)", fontStyle: "italic" }}>Us?</em>
          </h2>

          <p className="normal-paragraph leading-relaxed" style={{ width: "1020px" }}>
          We focus on quality and precision. Each report is custom-made to reflect your competencies, providing an edge for your skilled migration applications.
          We have worked with engineers from various countries, providing guidance and support in preparing successful CDR reports, ensuring their engineering dreams come true.
          </p>
        </div>
      </ScrollReveal>

      {/* ══ REASONS GRID ════════════════════════════════════════════════ */}
      <ScrollReveal variant={fadeUp} delay={0.05}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.42, ease: EASE, delay: i * 0.06 }}
              whileHover={{ y: -3, boxShadow: "0 8px 28px rgba(0,0,0,0.09)" }}
              className="rounded-2xl p-6 relative"
              style={{
                background: "white",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
              }}
            >
              <span
                className="block text-3xl font-bold mb-3 select-none"
                style={{
                  fontFamily: "var(--font-serif)",
                  color: "rgba(200,16,46,0.09)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                {reason.number}
              </span>

              <h3
                className="font-bold text-sm mb-2"
                style={{ fontFamily: "var(--font-serif)", color: "var(--ink, #1a1510)" }}
              >
                {reason.title}
              </h3>

              <p style={{ fontSize: "0.82rem", color: "#6e6a65", lineHeight: 1.65 }}>
                {reason.body}
              </p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* ══ SERVICES ════════════════════════════════════════════════════ */}
      <ScrollReveal variant={fadeUp} delay={0.08}>
        <p
          className="text-xs font-bold tracking-widest text-gray-600 uppercase mb-5"
         
        >
          Explore our Services
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.code}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.38, ease: EASE, delay: i * 0.07 }}
            >
              <Link href={svc.href} className="block h-full">
                <motion.div
                  whileHover={{ y: -3, boxShadow: "0 8px 24px rgba(200,16,46,0.09)" }}
                  transition={{ type: "tween", duration: 0.18 }}
                  className="rounded-2xl p-5 h-full flex flex-col"
                  style={{
                    background: "white",
                    border: "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    cursor: "pointer",
                    transition: "border-color 0.22s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(200,16,46,0.28)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(0,0,0,0.08)";
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-md"
                      style={{
                        background: "rgba(200,16,46,0.07)",
                        color: "var(--red)",
                        border: "1px solid rgba(200,16,46,0.14)",
                      }}
                    >
                      {svc.code}
                    </span>
                    <span style={{ fontSize: "0.85rem", color: "rgba(200,16,46,0.4)" }}>→</span>
                  </div>

                  <h3
                    className="font-bold text-sm mb-1.5"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--ink, #1a1510)" }}
                  >
                    {svc.name}
                  </h3>

                  <p className="flex-1" style={{ fontSize: "0.8rem", color: "#6a6560", lineHeight: 1.6 }}>
                    {svc.description}
                  </p>

                  <div
                    className="mt-4 pt-3 flex items-center gap-1"
                    style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
                  >
                    <span className="text-xs font-bold" style={{ color: "var(--red)" }}>
                      View service
                    </span>
                    <span style={{ fontSize: "0.65rem", color: "var(--red)" }}>→</span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

   
    </section>
  );
}