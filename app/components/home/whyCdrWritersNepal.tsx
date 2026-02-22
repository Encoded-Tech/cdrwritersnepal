"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Animated counter hook ─────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, active = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return value;
}

/* ── Single stat cell ──────────────────────────────────────────────── */
function StatCell({
  target,
  suffix,
  label,
  delay,
  active,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
  active: boolean;
}) {
  const count = useCountUp(target, 1600, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        paddingRight: 28,
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
          fontWeight: 700,
          color: "#18140e",
          letterSpacing: "-0.03em",
          lineHeight: 1,
        }}
      >
        {count}
        <span style={{ color: "var(--red)" }}>{suffix}</span>
      </div>
      <div
        style={{
          fontSize: "0.75rem",
          color: "#8a847c",
          fontWeight: 500,
          letterSpacing: "0.01em",
          lineHeight: 1.4,
          maxWidth: 120,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

/* ── Trust chip ────────────────────────────────────────────────────── */
function TrustChip({ label }: { label: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 100,
        border: "1px solid rgba(0,0,0,0.1)",
        background: "rgba(255,255,255,0.7)",
        fontSize: "0.72rem",
        color: "#5c5750",
        fontWeight: 500,
        letterSpacing: "0.01em",
        whiteSpace: "nowrap" as const,
      }}
    >
      <div
        style={{
          width: 5,
          height: 5,
          borderRadius: "50%",
          background: "var(--red)",
          opacity: 0.7,
          flexShrink: 0,
        }}
      />
      {label}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function WhyCDRWritersNepal() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const STATS = [
    { target: 500, suffix: "+", label: "Engineers Successfully Assessed" },
    { target: 100, suffix: "%", label: "First-Attempt Success Rate" },
    { target: 4,   suffix: "+", label: "Years of CDR-Specific Expertise" },
    { target: 24,  suffix: "h", label: "Average Response Time" },
  ];

  const TRUST_CHIPS = [
    "100% Confidential",
    "EA Aligned",
    "Plagiarism-Free",
    "Free Consultation",
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-32 px-4"
      style={{ background: "white", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "5%",
          left: "-6%",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,30,30,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-20 items-center">

          {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
          <div>

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              
              }}
            >
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
         Why choose CDR Writers Nepal
            </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.48, ease: EASE, delay: 0.06 }}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
                fontWeight: 700,
                color: "#18140e",
                lineHeight: 1.1,
                letterSpacing: "-0.028em",
                marginBottom: "1.1rem",
                maxWidth: 520,
              }}
            >
              Your CDR approval is not{" "}
              <em
                style={{
                  color: "var(--red)",
                  fontStyle: "italic",
                  fontWeight: 600,
                }}
              >
                a guessing game.
              </em>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.44, ease: EASE, delay: 0.12 }}
              style={{
                fontSize: "0.97rem",
                color: "#5c5750",
                lineHeight: 1.82,
                maxWidth: 460,
                marginBottom: "2.5rem",
              }}
            >
              One flawed career episode. One missed competency mapping.
              Thats all it takes for Engineers Australia to reject your CDR.
              We make sure that never happens.
              <br />
              When you choose <span className="bg-red-50 rounded-xl px-2 py-1.5 text-customRed">CDR Writers Nepal</span>, you’re choosing a dedicated partner who will guide you through the entire process.
            </motion.p>

            {/* ── Animated Stats Grid ── */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px 0",
                paddingBottom: 32,
                marginBottom: 32,
                borderBottom: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              {STATS.map((s, i) => (
                <StatCell
                  key={s.label}
                  target={s.target}
                  suffix={s.suffix}
                  label={s.label}
                  delay={i * 0.08}
                  active={statsInView}
                />
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.44, ease: EASE, delay: 0.18 }}
              style={{
                display: "flex",
                flexWrap: "wrap" as const,
                gap: 12,
                marginBottom: 14,
              }}
            >
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
                  Start Your CDR Assessment Now
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
            </motion.div>

            {/* Urgency microcopy */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.24 }}
              style={{
                fontSize: "0.72rem",
                color: "var(--red)",
                fontWeight: 500,
                letterSpacing: "0.02em",
                marginBottom: 18,
                opacity: 0.8,
              }}
            >
              Limited consultation slots available this week.
            </motion.p>

            {/* Trust chips */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE, delay: 0.28 }}
              style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}
            >
              {TRUST_CHIPS.map((chip) => (
                <TrustChip key={chip} label={chip} />
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Image ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ position: "relative", width: "100%", maxWidth: 520 }}>

              {/* Subtle red frame accent */}
              <div
                style={{
                  position: "absolute",
                  inset: -10,
                  borderRadius: 22,
                  background: "rgba(180,30,30,0.04)",
                  zIndex: 0,
                }}
              />

              {/* Main image */}
              <div style={{ position: "relative", zIndex: 1 }}>
                <Image
                  src="/cdrwritersnepal.jpg"
                  alt="Professional CDR Writing — CDR Writers Nepal"
                  width={560}
                  height={420}
                  className="w-full object-cover"
                  style={{
                    borderRadius: 18,
                    boxShadow:
                      "0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.06)",
                    display: "block",
                  }}
                />

                {/* Floating success badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    bottom: -18,
                    left: -18,
                    background: "#fff",
                    borderRadius: 14,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    border: "1px solid rgba(0,0,0,0.06)",
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(180,30,30,0.07)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        stroke="var(--red)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.68rem",
                        color: "#999",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        marginBottom: 2,
                      }}
                    >
                      First-Attempt
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: "var(--red)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      100% Success
                    </div>
                  </div>
                </motion.div>

                {/* Overlay stat card — top right */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, ease: EASE, delay: 0.3 }}
                  style={{
                    position: "absolute",
                    top: -16,
                    right: -16,
                    background: "#18140e",
                    borderRadius: 12,
                    padding: "12px 16px",
                    boxShadow: "0 8px 28px rgba(0,0,0,0.18)",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.64rem",
                      color: "rgba(255,255,255,0.45)",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      marginBottom: 4,
                    }}
                  >
                    Engineers Assessed
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.55rem",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "-0.025em",
                      lineHeight: 1,
                    }}
                  >
                    500
                    <span style={{ color: "var(--red)" }}>+</span>
                  </div>
                </motion.div>
              </div>

              {/* Subtle ambient accent */}
              <div
                style={{
                  position: "absolute",
                  bottom: -30,
                  right: -30,
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(180,30,30,0.06) 0%, transparent 70%)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}