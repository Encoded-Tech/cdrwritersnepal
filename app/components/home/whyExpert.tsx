"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "./ui";
import { fadeDown } from "../animations/animations";
import { EXPERT_LINKS } from "@/data/data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Feature data ──────────────────────────────────────────────────── */
const FEATURES = [
  {
    title: "Compliance with EA Competency Framework",
    desc:  "Engineers Australia applies precise standards when assessing CDR submissions. Expert writers ensure every career episode is mapped accurately to the required competency elements, leaving no gaps that could lead to rejection.",
  },
  {
    title: "Original, Human-Written Content",
    desc:  "AI-generated or plagiarised content is grounds for immediate disqualification. A professionally authored CDR demonstrates genuine engineering experience through specific, verifiable language.",
  },
  {
    title: "Technical Depth and Problem-Solving Narrative",
    desc:  "A strong CDR does more than list responsibilities. It articulates the engineering challenges you faced, the decisions you made, and the outcomes you delivered — with the precision EA assessors expect.",
  },
  {
    title: "Alignment with Australian Engineering Standards",
    desc:  "International engineers often use terminology and project structures unfamiliar to Australian assessors. Expert guidance reframes your experience within the ANZSCO framework without misrepresenting your role.",
  },
] as const;

/* ─── Minimal SVG line icon ─────────────────────────────────────────── */
function AccentMark({ index }: { index: number }) {
  return (
    <div
      className="flex-shrink-0 mt-1"
      style={{
        width: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
      }}
    >
      {/* Index numeral */}
      <span
        style={{
          fontSize: "0.6rem",
          fontWeight: 700,
          color: "var(--red)",
          opacity: 0.55,
          letterSpacing: "0.04em",
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      {/* Thin vertical rule */}
      <div
        style={{
          width: 1,
          height: 32,
          background: "var(--red)",
          opacity: 0.18,
          borderRadius: 1,
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function WhyExpert() {
  return (
    <section className="relative py-32 px-6" style={{ background: "#f9f8f6" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(200,16,46,0.04) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
   
      <div className="max-w-7xl mx-auto md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-14 lg:gap-24 items-start">
           

          {/* ── LEFT — authority column ────────────────────────────── */}
          <ScrollReveal variant={fadeDown}>
            <div className="lg:sticky lg:top-28">

              

              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                
               <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase  px-3 py-1.5 rounded-full border"
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
              Why Expert Assistance
            </span>

              </div>

              {/* Headline */}
              <h2
                className="font-bold leading-[1.18] mb-7"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                  color: "#18140e",
                  letterSpacing: "-0.022em",
                }}
              >
                CDR assessment is not
                a process to navigate{" "}
                <em style={{ color: "var(--red)", fontStyle: "italic" }}>alone.</em>
              </h2>

              {/* Body */}
              <p
                className=" leading-[1.85] text-justify mb-10"
                style={{
                  fontSize: "0.96rem",
                  color: "#5c5750",
               
                }}
              >
           Engineers Australia (EA) has strict guidelines and requirements for CDR submissions. A CDR requires well-written career episodes that highlight your engineering skills, projects, and experience. The Summary Statement is one of the most critical parts of the CDR, as it links your career episodes to the competencies Engineers Australia requires. CDR experts ensure that your engineering practices and skills are aligned with Australian standards. If you&apos;re an international engineer, they help you demonstrate that your knowledge meets the local engineering requirements in Australia.
              </p>

              {/* Credibility indicators */}
     

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3">
                {EXPERT_LINKS.map((link, i) => (
                  <Link key={link.href} href={link.href} target="_blank">
                    <motion.button
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "tween", duration: 0.18 }}
                      style={
                        i === 0
                          ? {
                              background: "var(--red)",
                              color: "white",
                              marginTop: 6,
                              border: "1.5px solid var(--red)",
                              padding: "9px 20px",
                              borderRadius: 8,
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              letterSpacing: "0.01em",
                              transition: "opacity 0.2s",
                            }
                          : {
                              background: "transparent",
                              color: "#444",
                               marginTop: 6,
                              border: "1.5px solid rgba(0,0,0,0.14)",
                              padding: "9px 20px",
                              borderRadius: 8,
                              fontSize: "0.82rem",
                              fontWeight: 600,
                              cursor: "pointer",
                              letterSpacing: "0.01em",
                              transition: "border-color 0.2s, color 0.2s",
                            }
                      }
                    >
                      {link.label}
                    </motion.button>
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* ── RIGHT — feature list ───────────────────────────────── */}
          <div className="space-y-0">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.42, ease: EASE, delay: i * 0.08 }}
              >
                <div
                  className="flex gap-5 py-8 group"
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                    ...(i === 0 ? { borderTop: "1px solid rgba(0,0,0,0.07)" } : {}),
                  }}
                >
                  {/* Accent mark */}
                  <AccentMark index={i} />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-semibold mb-2 leading-snug"
                      style={{
                        fontSize: "0.97rem",
                        color: "#18140e",
                        letterSpacing: "-0.008em",
                        transition: "color 0.2s",
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="leading-[1.82]"
                      style={{ fontSize: "0.875rem", color: "#6a6560" }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Footer note */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
              className="pt-7 text-[0.78rem] leading-relaxed"
              style={{ color: "#bbb" }}
            >
              All engagements are handled by qualified engineers with
              direct experience in Engineers Australia competency frameworks.
            </motion.p>
          </div>

        </div>
      </div>
    </section>
  );
}