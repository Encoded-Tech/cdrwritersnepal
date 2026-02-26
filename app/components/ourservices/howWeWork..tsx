"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeDown } from "../animations/animations";
import { ScrollReveal } from "../home/ui";

// ─────────────────────────────────────────────────────────────────────────────
// EASING
// ─────────────────────────────────────────────────────────────────────────────

const SPRING = { type: "spring", stiffness: 260, damping: 28 } as const;
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_IN_OUT: [number, number, number, number] = [0.4, 0, 0.2, 1];

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

interface Stage {
  index: string;
  title: string;
  subtitle: string;
  body: string;
  items: string[];
  metric: { value: string; caption: string };
}

const STAGES: Stage[] = [
  {
    index: "01",
    title: "Discovery",
    subtitle: "Understanding your migration situation",
    body: "You reach out with your documents and occupation details. We review your engineering background, ICT experience, or trade history and identify the correct assessing authority, ANZSCO code, and visa pathway for your situation.",
    items: [
      "Occupation & ANZSCO identification",
      "Assessing body selection (EA / ACS / VETASSESS)",
      "Visa subclass pathway mapping",
      "Free initial consultation",
    ],
    metric: { value: "48h", caption: "Average response time" },
  },
  {
    index: "02",
    title: "Strategy",
    subtitle: "Building your documentation plan",
    body: "Our specialists audit your existing documents, identify gaps in your evidence portfolio, and define the structure of your CDR, RPL, or VETASSESS application. Every engagement begins with a documented compliance plan.",
    items: [
      "Evidence gap analysis",
      "Career episode selection",
      "Competency element mapping",
      "Submission timeline planning",
    ],
    metric: { value: "100%", caption: "Compliance-reviewed plan" },
  },
  {
    index: "03",
    title: "Execution",
    subtitle: "Expert preparation by migration writers",
    body: "Qualified migration writers and engineers prepare your documentation — Career Episodes, Summary Statements, RPL reports, or VETASSESS evidence packages — structured to each authority's evidentiary standard and reviewed for technical accuracy.",
    items: [
      "Career episode writing",
      "Summary statement mapping",
      "Employment reference preparation",
      "Plagiarism & compliance verification",
    ],
    metric: { value: "3×", caption: "Independent review rounds" },
  },
  {
    index: "04",
    title: "Delivery",
    subtitle: "Submission-ready documentation package",
    body: "Your completed, compliance-verified application is delivered as a submission-ready package. We provide a final checklist, authority-specific lodgement instructions, and remain available for follow-up queries throughout your submission.",
    items: [
      "Authority-formatted final files",
      "Lodgement checklist",
      "Post-delivery query support",
      "Unlimited revision rounds",
    ],
    metric: { value: "∞", caption: "Revisions until approved" },
  },
  {
    index: "05",
    title: "Growth",
    subtitle: "Ongoing migration support beyond submission",
    body: "After lodgement, we remain your migration documentation partner — available for responding to requests for further information, preparing EOI documentation, and supporting skills re-assessments as your career progresses.",
    items: [
      "RFI response preparation",
      "EOI points optimisation",
      "Re-assessment support",
      "Career progression documentation",
    ],
    metric: { value: "189/190/491", caption: "Visa subclasses covered" },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// RED INK BUTTON — magnetic fill-from-left
// ─────────────────────────────────────────────────────────────────────────────

function RedInkButton({
  href,
  label,
  ghost = false,
}: {
  href: string;
  label: string;
  ghost?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMagnet({
      x: (e.clientX - (r.left + r.width / 2)) * 0.2,
      y: (e.clientY - (r.top + r.height / 2)) * 0.2,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMagnet({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  if (ghost) {
    return (
      <motion.a
        ref={ref}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setHovered(true)}
        animate={{ x: magnet.x, y: magnet.y }}
        transition={SPRING}
        style={{
          fontFamily: "monospace",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          cursor: "pointer",
        }}
      >
        <motion.span
          animate={{ color: hovered ? "#18140e" : "#9b968f" }}
          transition={{ duration: 0.22, ease: EASE_OUT }}
        >
          {label}
        </motion.span>
        <motion.span
          animate={{ x: hovered ? 4 : 0, color: hovered ? "#18140e" : "#9b968f" }}
          transition={{ duration: 0.2, ease: EASE_OUT }}
          style={{ fontSize: "0.9rem" }}
        >
          →
        </motion.span>
      </motion.a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setHovered(true)}
      animate={{ x: magnet.x, y: magnet.y }}
      transition={SPRING}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 30px",
        borderRadius: 100,
        border: "1.5px solid rgba(180,30,30,0.32)",
        background: "transparent",
        color: "#18140e",
        textDecoration: "none",
        fontFamily: "monospace",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.span
        aria-hidden
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.38, ease: EASE_OUT }}
        style={{
          position: "absolute",
          inset: 0,
          background: "#b41e1e",
          transformOrigin: "left",
          borderRadius: 100,
          zIndex: 0,
        }}
      />
      <motion.span
        animate={{ color: hovered ? "#fff" : "#18140e" }}
        transition={{ duration: 0.26, ease: EASE_OUT }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {label}
      </motion.span>
      <motion.span
        animate={{ x: hovered ? 4 : 0, color: hovered ? "#fff" : "#18140e" }}
        transition={{ duration: 0.22, ease: EASE_OUT }}
        style={{ position: "relative", zIndex: 1, fontSize: "0.9rem" }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VISUAL CARD — left sticky panel
// ─────────────────────────────────────────────────────────────────────────────

function VisualCard({ stage }: { stage: Stage }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stage.index}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "#ffffff",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 4px 16px rgba(0,0,0,0.05), 0 24px 64px rgba(0,0,0,0.07)",
          }}
        >
          {/* Accent stripe */}
          <div
            style={{
              height: 3,
              background: "linear-gradient(90deg, #c8102e, rgba(200,16,46,0.2))",
            }}
          />

          {/* Card header */}
          <div
            style={{
              padding: "20px 28px",
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Index badge */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(200,16,46,0.08)",
                  border: "1px solid rgba(200,16,46,0.2)",
                  flexShrink: 0,
                }}
              >
                <span style={{
                  fontFamily: "monospace",
                  fontSize: "0.65rem",
                  fontWeight: 800,
                  color: "#c8102e",
                  letterSpacing: "0.06em",
                }}>
                  {stage.index}
                </span>
              </div>
              {/* Title */}
              <span style={{
                fontFamily: "var(--font-serif, Georgia, serif)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#18140e",
                letterSpacing: "-0.015em",
              }}>
                {stage.title}
              </span>
            </div>
            {/* Status badge */}
            <span style={{
              fontFamily: "monospace",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "5px 12px",
              borderRadius: 99,
              background: "rgba(200,16,46,0.07)",
              color: "#c8102e",
              border: "1px solid rgba(200,16,46,0.18)",
              flexShrink: 0,
            }}>
              Stage {stage.index} / 05
            </span>
          </div>

          {/* Items list */}
          <div style={{ padding: "24px 28px" }}>
            <p style={{
              fontFamily: "monospace",
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(0,0,0,0.3)",
              margin: "0 0 18px",
            }}>
              What&apos;s covered
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {stage.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.08 + 0.1,
                    duration: 0.42,
                    ease: EASE_OUT,
                  }}
                  style={{ display: "flex", alignItems: "center", gap: 12 }}
                >
                  {/* Checkmark */}
                  <div style={{
                    width: 22,
                    height: 22,
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: "rgba(200,16,46,0.08)",
                    border: "1px solid rgba(200,16,46,0.18)",
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2 5L4.2 7.2L8.5 2.8"
                        stroke="#c8102e"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span style={{
                    fontFamily: "var(--font-serif, Georgia, serif)",
                    fontSize: "0.92rem",
                    color: "#3a3630",
                    lineHeight: 1.5,
                  }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Metric footer */}
          <div style={{
            padding: "16px 28px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "rgba(0,0,0,0.018)",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}>
            <span style={{
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "1.85rem",
              fontWeight: 800,
              color: "#c8102e",
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}>
              {stage.metric.value}
            </span>
            <span style={{
              fontSize: "0.88rem",
              color: "#6f6a63",
              lineHeight: 1.4,
            }}>
              {stage.metric.caption}
            </span>
          </div>
        </div>

        {/* Below-card label */}
        <div style={{
          marginTop: 20,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}>
          <div style={{
            flex: 1,
            height: 1,
            background: "linear-gradient(to right, rgba(200,16,46,0.3), transparent)",
          }} />
          <span style={{
            fontFamily: "monospace",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#c8102e",
            opacity: 0.7,
          }}>
            {stage.subtitle}
          </span>
          <div style={{
            flex: 1,
            height: 1,
            background: "linear-gradient(to left, rgba(200,16,46,0.3), transparent)",
          }} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESS INDICATOR
// ─────────────────────────────────────────────────────────────────────────────

function ProgressBar({ activeIndex }: { activeIndex: number }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 28,
    }}>
      {STAGES.map((_, i) => (
        <motion.div
          key={i}
          animate={{
            width: i === activeIndex ? 32 : 8,
            background: i <= activeIndex ? "#c8102e" : "rgba(0,0,0,0.12)",
            opacity: i <= activeIndex ? 1 : 0.4,
          }}
          transition={{ duration: 0.38, ease: EASE_OUT }}
          style={{ height: 5, borderRadius: 99 }}
        />
      ))}
      <span style={{
        marginLeft: 8,
        fontFamily: "monospace",
        fontSize: "0.68rem",
        fontWeight: 700,
        letterSpacing: "0.12em",
        color: "#b0aa9f",
      }}>
        {String(activeIndex + 1).padStart(2, "0")} / {String(STAGES.length).padStart(2, "0")}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP ROW
// ─────────────────────────────────────────────────────────────────────────────

function StepRow({
  stage,
  index,
  isActive,
  isPast,
  onClick,
}: {
  stage: Stage;
  index: number;
  isActive: boolean;
  isPast: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      onClick={onClick}
      style={{ display: "flex", gap: 20, cursor: "pointer" }}
      whileHover={{ x: 3 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
    >
      {/* Node + connector column */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
        width: 40,
      }}>
        {/* Circle node */}
        <motion.div
          animate={{
            background: isActive
              ? "#c8102e"
              : isPast
              ? "rgba(200,16,46,0.4)"
              : "rgba(0,0,0,0.07)",
            borderColor: isActive
              ? "#c8102e"
              : isPast
              ? "rgba(200,16,46,0.35)"
              : "rgba(0,0,0,0.12)",
            scale: isActive ? 1.14 : 1,
            boxShadow: isActive
              ? "0 0 0 4px rgba(200,16,46,0.12)"
              : "0 0 0 0px rgba(200,16,46,0)",
          }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
            zIndex: 2,
          }}
        >
          <motion.span
            animate={{ color: isActive || isPast ? "#fff" : "rgba(0,0,0,0.3)" }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            style={{
              fontFamily: "monospace",
              fontSize: "0.6rem",
              fontWeight: 800,
              letterSpacing: "0.04em",
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isPast && !isActive ? (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              stage.index
            )}
          </motion.span>
        </motion.div>

        {/* Connector line */}
        {index < STAGES.length - 1 && (
          <div style={{
            flex: 1,
            width: 2,
            marginTop: 6,
            minHeight: 50,
            position: "relative",
            overflow: "hidden",
            borderRadius: 1,
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.08)",
            }} />
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                background: "#c8102e",
                opacity: 0.45,
                borderRadius: 1,
              }}
              animate={{ height: isPast ? "100%" : isActive ? "50%" : "0%" }}
              transition={{ duration: 0.6, ease: EASE_IN_OUT }}
            />
          </div>
        )}
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Title row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 6,
        }}>
          <motion.h3
            animate={{ color: isActive ? "#18140e" : "rgba(0,0,0,0.35)" }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            style={{
              margin: 0,
              fontFamily: "var(--font-serif, Georgia, serif)",
              fontSize: "1.1rem",
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            {stage.title}
          </motion.h3>

          <AnimatePresence>
            {isActive && (
              <motion.span
                initial={{ opacity: 0, scale: 0.75, x: -4 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.75, x: -4 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                style={{
                  fontFamily: "monospace",
                  fontSize: "0.55rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "3px 9px",
                  borderRadius: 99,
                  background: "rgba(200,16,46,0.08)",
                  color: "#c8102e",
                  border: "1px solid rgba(200,16,46,0.2)",
                  flexShrink: 0,
                }}
              >
                Active
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          animate={{ color: isActive ? "#8a847c" : "rgba(0,0,0,0.26)" }}
          transition={{ duration: 0.28, ease: EASE_OUT }}
          style={{
            margin: "0 0 12px",
            fontFamily: "monospace",
            fontSize: "0.72rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {stage.subtitle}
        </motion.p>

        {/* Body — smooth height reveal */}
        <AnimatePresence>
          {isActive && (
            <motion.p
              key="body"
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -6 }}
              transition={{ duration: 0.42, ease: EASE_OUT }}
              style={{
                margin: 0,
                fontSize: "0.935rem",
                color: "#6a6560",
                lineHeight: 1.84,
                overflow: "hidden",
              }}
            >
              {stage.body}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function HowWeServeClients() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualActive, setManualActive] = useState<number | null>(null);
  const stepElRefs = useRef<(HTMLDivElement | null)[]>([]);

  const effectiveActive = manualActive ?? activeIndex;
  const activeStage = STAGES[effectiveActive];

  // Scroll-driven activation
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepElRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        { threshold: 0.45, rootMargin: "-8% 0px -28% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = useCallback((i: number) => {
    setManualActive(i);
    const t = setTimeout(() => setManualActive(null), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative py-32 px-6"
      style={{ background: "#f9f8f6" }}
      aria-labelledby="how-we-work-heading"
    >
      {/* Ambient glow */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(200,16,46,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      {/* Dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section header ── */}
        <ScrollReveal variant={fadeDown}>
          <div className="mb-16">
            {/* Eyebrow pill */}
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
           How we work
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 items-end">
              <h2
                id="how-we-work-heading"
                className="m-0 font-bold text-[#18140e]"
                style={{
                  fontFamily: "var(--font-serif, Georgia, serif)",
                  fontSize: "clamp(2rem, 4vw, 2.75rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                }}
              >
                A structured process built{" "}
                <span style={{ color: "#c8102e", opacity: 0.88 }}>
                  around your outcome.
                </span>
              </h2>
              <p
                className="m-0"
                style={{
                  fontSize: "1rem",
                  color: "#6f6a63",
                  lineHeight: 1.82,
                  letterSpacing: "0.004em",
                }}
              >
                Every engagement follows a defined five-stage process — from initial
                assessment through to post-lodgement support. No guesswork, no gaps.
                You always know exactly where you are and what comes next.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── Two-column body ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* LEFT — sticky visual card */}
          <div className="lg:sticky lg:top-28">
            <ProgressBar activeIndex={effectiveActive} />
            <VisualCard stage={activeStage} />
          </div>

          {/* RIGHT — scrollable step rows */}
          <div>
            <div>
              {STAGES.map((stage, i) => (
                <div
                  key={stage.index}
                  ref={(el) => { stepElRefs.current[i] = el; }}
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                    ...(i === 0 ? { borderTop: "1px solid rgba(0,0,0,0.07)" } : {}),
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.5,
                      ease: EASE_OUT,
                      delay: i * 0.07,
                    }}
                    style={{ padding: "28px 0" }}
                  >
                    <StepRow
                      stage={stage}
                      index={i}
                      isActive={effectiveActive === i}
                      isPast={i < effectiveActive}
                      onClick={() => handleClick(i)}
                    />
                  </motion.div>
                </div>
              ))}
            </div>

            {/* ── CTA strip ── */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
              style={{ paddingTop: 36 }}
            >
              <p style={{
                fontSize: "0.88rem",
                color: "#b0aa9f",
                letterSpacing: "0.02em",
                marginBottom: 20,
              }}>
                Your migration outcome depends on the quality of your documentation.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                <RedInkButton href="/get-started" label=" Let's Get Started" />
                
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}