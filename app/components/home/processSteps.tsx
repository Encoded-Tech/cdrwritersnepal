"use client";

import { useRef, useMemo, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
  type Variants,
  type Transition,
  type MotionValue,
} from "framer-motion";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
interface Step {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  accent: string;
}

const STEPS: Step[] = [
  {
    step: "01",
    title: "Discovery Call",
    description: "We map your skills, experience, and target occupation in a focused 45-minute session. This is where your story begins.",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>),
    color: "#b41e1e", accent: "#ff4040",
  },
  {
    step: "02",
    title: "Evidence Audit",
    description: "We review every document, project, and credential you've accumulated — identifying gaps before they become problems.",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>),
    color: "#b41e1e", accent: "#ff4040",
  },
  {
    step: "03",
    title: "CDR Strategy",
    description: "A tailored submission strategy is built around your profile. Every claim is precise, every competency aligned.",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>),
    color: "#b41e1e", accent: "#ff4040",
  },
  {
    step: "04",
    title: "Expert Authoring",
    description: "Our engineers write your Career Episodes and Summary Statement — technically precise, narratively compelling.",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>),
    color: "#b41e1e", accent: "#ff4040",
  },
  {
    step: "05",
    title: "Review & Refine",
    description: "Iterative refinement with your direct input. Nothing is submitted until you're completely satisfied.",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>),
    color: "#b41e1e", accent: "#ff4040",
  },
  {
    step: "06",
    title: "Submission & Approval",
    description: "We handle the final submission. You wait with confidence — not uncertainty. Most clients hear back within weeks.",
    icon: (<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><polyline points="22 2 11 13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>),
    color: "#b41e1e", accent: "#ff4040",
  },
];

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const EASE_CINEMATIC: [number, number, number, number] = [0.16, 1, 0.3, 1];
const EASE_SCAN: [number, number, number, number] = [0.4, 0, 0.2, 1];
const EASE_FILL: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SPRING_BASE = { type: "spring" as const, stiffness: 120, damping: 28, restDelta: 0.001 };
const SPRING_SNAPPY = { type: "spring" as const, stiffness: 300, damping: 22 };
const SPRING_SOFT = { type: "spring" as const, stiffness: 200, damping: 18 };
const SPRING_ICON = { type: "spring" as const, stiffness: 220, damping: 16 };

/* ─────────────────────────────────────────────
   VARIANT FACTORIES
───────────────────────────────────────────── */
function makeContainerVariants(stagger = 0.06, delay = 0.04): Variants {
  return { hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } satisfies Transition } };
}
function makeItemVariants(): Variants {
  return {
    hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: EASE_CINEMATIC } satisfies Transition },
  };
}
function makeLineVariants(extraDelay = 0.3): Variants {
  return {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE_CINEMATIC, delay: extraDelay } satisfies Transition },
  };
}

/* ─────────────────────────────────────────────
   PARTICLE DATA — module scope (never in render)
───────────────────────────────────────────── */
interface ParticleData { id: number; x: number; y: number; size: number; duration: number; delay: number; driftX: number; driftY: number; }
const PARTICLE_DATA: ParticleData[] = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: Math.random() * 100, y: Math.random() * 100,
  size: 1 + Math.random() * 2.5,
  duration: 8 + Math.random() * 14,
  delay: Math.random() * 8,
  driftX: (Math.random() - 0.5) * 60,
  driftY: -(20 + Math.random() * 60),
}));

/* ─────────────────────────────────────────────
   RED INK-FILL MAGNETIC BUTTON
   Used at the bottom of ProcessSteps.
   Transparent background → red sweep on hover,
   text/arrow flip to white. Magnetic drift.
───────────────────────────────────────────── */
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
      transition={{ type: "spring", stiffness: 300, damping: 22 } satisfies Transition}
      whileHover={{ scale: 1.04 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "13px 28px",
        borderRadius: 100,
        border: "1.5px solid rgba(180,30,30,0.3)",
        background: "transparent",
        color: "#18140e",
        textDecoration: "none",
        fontFamily: "monospace",
        fontSize: "0.66rem",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase" as const,
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Red ink sweeps in from left */}
      <motion.span
        aria-hidden
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_FILL } satisfies Transition}
        style={{ position: "absolute", inset: 0, background: "#b41e1e", transformOrigin: "left", borderRadius: 100, zIndex: 0 }}
      />
      <motion.span
        animate={{ color: hovered ? "#ffffff" : "#18140e" }}
        transition={{ duration: 0.28 } satisfies Transition}
        style={{ position: "relative", zIndex: 1 }}
      >
        {label}
      </motion.span>
      <motion.span
        animate={{ x: hovered ? 3 : 0, color: hovered ? "#ffffff" : "#18140e" }}
        transition={{ duration: 0.25 } satisfies Transition}
        style={{ position: "relative", zIndex: 1, fontSize: "0.85rem" }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

/* ─────────────────────────────────────────────
   PARTICLES / GRAIN / SCAN (unchanged)
───────────────────────────────────────────── */
function Particles() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {PARTICLE_DATA.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 }}
          animate={{ x: [`${p.x}vw`, `${p.x + p.driftX / 10}vw`], y: [`${p.y}vh`, `${p.y + p.driftY / 10}vh`], opacity: [0, 0.35, 0.35, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" } satisfies Transition}
          style={{ position: "absolute", width: p.size, height: p.size, borderRadius: "50%", background: "rgba(180,30,30,0.6)", boxShadow: "0 0 4px 1px rgba(180,30,30,0.3)" }}
        />
      ))}
    </div>
  );
}

function Grain() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10, opacity: 0.028, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "128px 128px", mixBlendMode: "overlay" }} />
  );
}

function ScanLine({ trigger }: { trigger: boolean }) {
  return (
    <AnimatePresence>
      {trigger && (
        <motion.div
          key="scan" aria-hidden
          initial={{ top: "-2px", opacity: 0 }}
          animate={{ top: "102%", opacity: [0, 0.7, 0.7, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.8, ease: EASE_SCAN } satisfies Transition}
          style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(to right, transparent 0%, rgba(180,30,30,0.15) 20%, rgba(220,60,60,0.5) 50%, rgba(180,30,30,0.15) 80%, transparent 100%)", boxShadow: "0 0 24px 4px rgba(180,30,30,0.15), 0 0 60px 12px rgba(180,30,30,0.06)", zIndex: 8, pointerEvents: "none" }}
        />
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   SPINES (unchanged)
───────────────────────────────────────────── */
function AnimatedSpine({ progress }: { progress: MotionValue<number> }) {
  const heightPercent = useTransform(progress, [0, 1], ["0%", "100%"]);
  const springHeight = useSpring(heightPercent, { stiffness: SPRING_BASE.stiffness, damping: SPRING_BASE.damping, restDelta: SPRING_BASE.restDelta });
  return (
    <div aria-hidden style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, transform: "translateX(-50%)", zIndex: 1, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.06)" }} />
      <motion.div style={{ position: "absolute", top: 0, left: 0, right: 0, height: springHeight, background: "linear-gradient(to bottom, rgba(180,30,30,0.1) 0%, rgba(180,30,30,0.8) 40%, rgba(220,60,60,1) 100%)", boxShadow: "0 0 12px 2px rgba(180,30,30,0.3)" }} />
      <motion.div style={{ position: "absolute", left: "50%", top: springHeight, translateX: "-50%", translateY: "-50%", width: 8, height: 8, borderRadius: "50%", background: "#ff4040", boxShadow: "0 0 0 4px rgba(180,30,30,0.15), 0 0 16px 4px rgba(180,30,30,0.4)" }}>
        <motion.div animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }} transition={{ duration: 2, repeat: Infinity, ease: "easeOut" } satisfies Transition} style={{ position: "absolute", inset: -4, borderRadius: "50%", background: "rgba(180,30,30,0.25)" }} />
      </motion.div>
    </div>
  );
}

function MobileSpine({ progress }: { progress: MotionValue<number> }) {
  const heightPercent = useTransform(progress, [0, 1], ["0%", "100%"]);
  const springHeight = useSpring(heightPercent, { stiffness: SPRING_BASE.stiffness, damping: SPRING_BASE.damping, restDelta: SPRING_BASE.restDelta });
  return (
    <div aria-hidden style={{ position: "absolute", left: 24, top: 0, bottom: 0, width: 2, zIndex: 1, overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.06)" }} />
      <motion.div style={{ position: "absolute", top: 0, left: 0, right: 0, height: springHeight, background: "linear-gradient(to bottom, rgba(180,30,30,0.1) 0%, rgba(180,30,30,0.8) 40%, rgba(220,60,60,1) 100%)", boxShadow: "0 0 10px 2px rgba(180,30,30,0.25)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTENT BLOCKS & NODES (unchanged)
───────────────────────────────────────────── */
interface ContentBlockProps { step: Step; isLeft: boolean; inView: boolean; }
function DesktopContentBlock({ step, isLeft, inView }: ContentBlockProps) {
  const containerVariants = useMemo(() => makeContainerVariants(0.06, 0.04), []);
  const itemVariants = useMemo(() => makeItemVariants(), []);
  const lineVariants = useMemo(() => makeLineVariants(0.3), []);
  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5, rotate: isLeft ? -12 : 12 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { ...SPRING_SOFT } satisfies Transition },
  };
  return (
    <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "flex", flexDirection: "column", alignItems: isLeft ? "flex-end" : "flex-start", maxWidth: 340, gap: 10 }}>
      <motion.div variants={iconVariants} whileHover={{ scale: 1.1, rotate: isLeft ? 4 : -4 }} style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(180,30,30,0.07)", border: "1px solid rgba(180,30,30,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#b41e1e", backdropFilter: "blur(8px)" }}>
        {step.icon}
      </motion.div>
      <motion.div variants={itemVariants} style={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "#b41e1e", opacity: 0.6, fontFamily: "monospace" }}>STEP {step.step}</motion.div>
      <motion.h3 variants={itemVariants} style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "1.15rem", fontWeight: 700, color: "#18140e", letterSpacing: "-0.02em", lineHeight: 1.25, margin: 0, textAlign: isLeft ? "right" : "left" }}>{step.title}</motion.h3>
      <motion.p variants={itemVariants} style={{ fontSize: "0.82rem", color: "#6e6862", lineHeight: 1.8, margin: 0, textAlign: isLeft ? "right" : "left" }}>{step.description}</motion.p>
      <motion.div variants={lineVariants} style={{ height: 1, width: 36, background: isLeft ? "linear-gradient(to left, #b41e1e, transparent)" : "linear-gradient(to right, #b41e1e, transparent)", transformOrigin: isLeft ? "right" : "left" }} />
    </motion.div>
  );
}

function DesktopStepNode({ step, inView }: { step: Step; inView: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "32px 0", position: "relative", zIndex: 4 }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ ...SPRING_SNAPPY, delay: 0.05 } satisfies Transition} whileHover={{ scale: 1.15 }}
        style={{ position: "relative", width: 56, height: 56, borderRadius: "50%", background: inView ? "linear-gradient(135deg, rgba(180,30,30,0.1) 0%, rgba(180,30,30,0.04) 100%)" : "#f0eeec", border: `1.5px solid ${inView ? "rgba(180,30,30,0.5)" : "rgba(0,0,0,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(12px)", transition: "border-color 0.6s ease, background 0.6s ease", boxShadow: inView ? "0 0 0 6px rgba(180,30,30,0.05), 0 0 24px rgba(180,30,30,0.1)" : "none" }}
      >
        {inView && (<motion.div initial={{ scale: 1.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: 0.15 } satisfies Transition} style={{ position: "absolute", inset: -8, borderRadius: "50%", border: "1px solid rgba(180,30,30,0.12)", pointerEvents: "none" }} />)}
        <span style={{ fontFamily: "monospace", fontSize: "0.75rem", fontWeight: 700, color: inView ? "#b41e1e" : "#ccc", letterSpacing: "0.02em", transition: "color 0.6s ease" }}>{step.step}</span>
      </motion.div>
    </div>
  );
}

function DesktopStepRow({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });
  const isLeft = index % 2 === 0;
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 88px 1fr", alignItems: "center", position: "relative", zIndex: 2, minHeight: 110 }}>
      <div style={{ display: "flex", justifyContent: "flex-end", paddingRight: 52 }}>
        {isLeft && (<motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease: EASE_CINEMATIC, delay: 0.05 } satisfies Transition}><DesktopContentBlock step={step} isLeft={isLeft} inView={inView} /></motion.div>)}
      </div>
      <DesktopStepNode step={step} inView={inView} />
      <div style={{ display: "flex", justifyContent: "flex-start", paddingLeft: 52 }}>
        {!isLeft && (<motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, ease: EASE_CINEMATIC, delay: 0.05 } satisfies Transition}><DesktopContentBlock step={step} isLeft={isLeft} inView={inView} /></motion.div>)}
      </div>
    </div>
  );
}

function MobileStepRow({ step, isLast }: { step: Step; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });
  const containerVariants = useMemo(() => makeContainerVariants(0.06, 0.06), []);
  const itemVariants = useMemo(() => makeItemVariants(), []);
  const mobileIconVariants: Variants = { hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1, transition: { ...SPRING_ICON } satisfies Transition } };
  const mobileLineVariants: Variants = { hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.55, ease: EASE_CINEMATIC } satisfies Transition } };
  return (
    <div ref={ref} style={{ position: "relative", paddingLeft: 64, paddingBottom: isLast ? 0 : 40, zIndex: 2 }}>
      <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}} transition={{ ...SPRING_SNAPPY, stiffness: 280 } satisfies Transition} style={{ position: "absolute", left: 4, top: 4, width: 44, height: 44, borderRadius: "50%", background: inView ? "rgba(180,30,30,0.06)" : "#f0eeec", border: `1.5px solid ${inView ? "rgba(180,30,30,0.45)" : "rgba(0,0,0,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 3, transition: "border-color 0.5s, background 0.5s", boxShadow: inView ? "0 0 16px rgba(180,30,30,0.1)" : "none" }}>
        <span style={{ fontFamily: "monospace", fontSize: "0.7rem", fontWeight: 700, color: inView ? "#b41e1e" : "#ccc", transition: "color 0.5s" }}>{step.step}</span>
      </motion.div>
      <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 4 }}>
        <motion.div variants={mobileIconVariants} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 34, height: 34, borderRadius: 10, background: "rgba(180,30,30,0.07)", border: "1px solid rgba(180,30,30,0.12)", color: "#b41e1e" }}>{step.icon}</motion.div>
        <motion.div variants={itemVariants} style={{ fontSize: "0.58rem", fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "#b41e1e", opacity: 0.6, fontFamily: "monospace" }}>STEP {step.step}</motion.div>
        <motion.h3 variants={itemVariants} style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "1.05rem", fontWeight: 700, color: "#18140e", letterSpacing: "-0.015em", lineHeight: 1.28, margin: 0 }}>{step.title}</motion.h3>
        <motion.p variants={itemVariants} style={{ fontSize: "0.8rem", color: "#6e6862", lineHeight: 1.78, margin: 0 }}>{step.description}</motion.p>
        <motion.div variants={mobileLineVariants} style={{ height: 1, width: 28, background: "linear-gradient(to right, #b41e1e, transparent)", transformOrigin: "left", marginTop: 2 }} />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER (unchanged)
───────────────────────────────────────────── */
function SectionHeader({ inView }: { inView: boolean }) {
  const containerVariants = useMemo(() => makeContainerVariants(0.09, 0), []);
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE_CINEMATIC } satisfies Transition },
  };
  return (
    <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ textAlign: "center", marginBottom: 80 }}>
      <motion.div variants={itemVariants} style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
        <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-2 px-3 py-1.5 rounded-full border" style={{ color: "var(--red)", background: "rgba(200,16,46,0.05)", borderColor: "rgba(200,16,46,0.18)" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
          How It Works
        </span>
      </motion.div>
      <motion.h2 variants={itemVariants} style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#18140e", letterSpacing: "-0.03em", lineHeight: 1.08, margin: "0 auto 1rem" }}>
        Your path to{" "}<em style={{ color: "#b41e1e", fontStyle: "italic", fontWeight: 600 }}>approval</em>,{" "}<br />
        <span style={{ fontWeight: 400, opacity: 0.55, fontSize: "0.85em" }}>step by step.</span>
      </motion.h2>
      <motion.p variants={itemVariants} style={{ fontSize: "0.84rem", color: "#8a847c", maxWidth: 340, margin: "16px auto 0", lineHeight: 1.76, letterSpacing: "0.01em" }}>
        A transparent, structured process — from first consultation to final CDR submission.
      </motion.p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const scanSentinelRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const scanTriggered = useInView(scanSentinelRef, { once: true, margin: "-5% 0px" });

  const { scrollYProgress: desktopProgress } = useScroll({ target: desktopRef, offset: ["start 70%", "end 30%"] });
  const { scrollYProgress: mobileProgress } = useScroll({ target: mobileRef, offset: ["start 70%", "end 30%"] });
  const { scrollYProgress: sectionScroll } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const glowY = useTransform(sectionScroll, [0, 1], ["-30%", "30%"]);
  const glowOpacity = useTransform(sectionScroll, [0, 0.3, 0.7, 1], [0, 0.6, 0.6, 0]);

  return (
    <section ref={sectionRef} style={{ position: "relative", overflow: "hidden", background: "#f9f8f6", padding: "100px 16px 120px" }}>
      <div ref={scanSentinelRef} aria-hidden style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1, pointerEvents: "none" }} />
      <ScanLine trigger={scanTriggered} />
      <Particles />
      <Grain />
      <motion.div aria-hidden style={{ position: "absolute", top: glowY, left: "50%", translateX: "-50%", width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(180,30,30,0.045) 0%, transparent 70%)", opacity: glowOpacity, pointerEvents: "none", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(240,236,230,0.55) 100%)", pointerEvents: "none", zIndex: 1 }} />

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div ref={headerRef}><SectionHeader inView={headerInView} /></div>

        {/* Desktop */}
        <div className="hidden md:block" ref={desktopRef} style={{ position: "relative" }}>
          <AnimatedSpine progress={desktopProgress} />
          {STEPS.map((step, i) => (<DesktopStepRow key={step.step} step={step} index={i} />))}
        </div>

        {/* Mobile */}
        <div className="md:hidden" ref={mobileRef} style={{ position: "relative" }}>
          <MobileSpine progress={mobileProgress} />
          {STEPS.map((step, i) => (<MobileStepRow key={step.step} step={step} isLast={i === STEPS.length - 1} />))}
        </div>

        {/* ── FOOTER CTA — red ink-fill magnetic button ──
            Replaces the old italic <p> tag.
            Transparent → red sweep on hover, text flips to white.
        ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_CINEMATIC, delay: 0.3 } satisfies Transition}
          style={{ marginTop: 72, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}
        >
          <RedInkButton href="/contact" label="Start Your CDR Journey" />
          <p style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "0.7rem", color: "#b8b0a8", letterSpacing: "0.1em", fontStyle: "italic" }}>
            No confusion. No delays. Just a clear path to approval.
          </p>
        </motion.div>
      </div>
    </section>
  );
}