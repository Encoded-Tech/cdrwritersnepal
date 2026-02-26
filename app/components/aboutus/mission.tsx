"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const E: [number, number, number, number] = [0.32, 0, 0.16, 1];

const MV = [
  {
    index: "01",
    label: "Our Mission",
    accent: "#c8102e",
    headline: "Every skilled professional deserves a clear path into Australia.",
    text: "We exist to remove the confusion, paperwork, and stress from skills assessments. Whether it's a CDR for Engineers Australia, a VETASSES application, or an ACS report — we make sure the right people reach the right opportunities, without wasted time or rejected applications.",
  },
  {
    index: "02",
    label: "Our Vision",
    accent: "#1a1a2e",
    headline: "A migration system where qualifications speak for themselves.",
    text: "We envision a future where no qualified engineer, tradesperson, or ICT professional is held back by documentation barriers. Our goal is to be Australia's most trusted skills assessment partner — one application, one expert team, zero guesswork.",
  },
];

const STATS = [
  { num: 15,  suffix: "",  label: "Team Members",             red: true  },
  { num: 1,   suffix: "",  label: "Office",                   red: false },
  { num: 3,   suffix: "",  label: "Assessing Bodies Covered", red: false },
  { num: 15,  suffix: "+", label: "Engineering Disciplines",  red: false },
];

/* ── Animated counter — only starts when active ── */
function Counter({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const duration = 1400;
    const totalFrames = Math.round(duration / 16);

    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [active, target]);

  return <span>{count}{suffix}</span>;
}

/* ── Individual card — has its OWN inView ref ── */
function MVCard({ item, i }: { item: (typeof MV)[0]; i: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  // amount: 0.3 means 30% of the card must be visible before it triggers
  const cardInView = useInView(cardRef, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ delay: i * 0.15, duration: 0.7, ease: E }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative rounded-3xl overflow-hidden cursor-default flex flex-col"
      style={{
        background: hovered ? "#ffffff" : "#f4f3f0",
        border: "1px solid rgba(0,0,0,0.08)",
        transition: "background 0.35s ease, box-shadow 0.35s ease",
        boxShadow: hovered
          ? "0 16px 48px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.04)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Thick top accent bar */}
      <div className="w-full h-[3px]" style={{ background: item.accent }} />

      <div className="p-9 flex flex-col flex-1">
        {/* Index + label */}
        <div className="flex items-center gap-3 mb-7">
          <span
            className="font-mono font-black tracking-widest"
            style={{ fontSize: "0.7rem", color: item.accent, opacity: 0.5 }}
          >{item.index}</span>
          <div className="w-5 h-px" style={{ background: "rgba(0,0,0,0.1)" }} />
          <span
            className="inline-flex items-center gap-1.5 font-mono font-black tracking-widest uppercase px-3 py-1 rounded-full"
            style={{
              fontSize: "0.62rem",
              color: item.accent,
              background: `${item.accent}10`,
              border: `1px solid ${item.accent}22`,
              letterSpacing: "0.16em",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.accent }} />
            {item.label}
          </span>
        </div>

        {/* Headline */}
        <h3
          className="m-0 mb-5 font-bold text-[#16110c] leading-tight"
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(1.25rem, 2vw, 1.55rem)",
            letterSpacing: "-0.025em",
          }}
        >{item.headline}</h3>

        {/* Body */}
        <p
          className="m-0 flex-1"
          style={{ fontSize: "0.92rem", color: "#5c5650", lineHeight: 1.85, letterSpacing: "0.005em" }}
        >{item.text}</p>
      </div>

      {/* Hover glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        className="absolute inset-0 pointer-events-none rounded-3xl"
        style={{
          background: `radial-gradient(ellipse 80% 55% at 50% 0%, ${item.accent}07 0%, transparent 65%)`,
        }}
      />
    </motion.div>
  );
}

/* ── Main Section ── */
export default function MissionVisionSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef  = useRef<HTMLDivElement>(null);

  // amount: 0.4 — 40% of the element must enter viewport before animating
  const headerInView = useInView(headerRef, { once: true, amount: 0.4 });
  const statsInView  = useInView(statsRef,  { once: true, amount: 0.5 });

  return (
    <section
      aria-labelledby="mv-heading"
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: "#f9f8f6" }}
    >
      {/* Dot grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.055) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          opacity: 0.5,
        }}
      />
      {/* Top red glow */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 65% 40% at 50% 0%, rgba(200,16,46,0.055) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* ══ HEADER ══ */}
        <motion.div
          ref={headerRef}
          className="text-center"
          style={{ marginBottom: "4.5rem" }}
          initial={{ opacity: 0, y: 32 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
          transition={{ duration: 0.75, ease: E }}
        >
                {/* Eyebrow */}
              <div className="flex justify-center gap-3 mb-8">
                
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
              Who Are We
            </span>

              </div>

          <h2
            id="mv-heading"
            className="m-0 mb-5 font-black text-[#16110c] leading-none"
            style={{
              fontFamily: " serif",
              fontSize: "clamp(2rem, 4.5vw, 3.25rem)",
              letterSpacing: "-0.04em",
            }}
          >
            Built to get{" "}
            <em style={{ color: "#c8102e", fontStyle: "italic", fontWeight: 900 }}>
              skilled professionals
            </em>{" "}
            into Australia.
          </h2>

          <p
            className="mx-auto m-0 max-w-lg"
            style={{ fontSize: "0.95rem", color: "#7a746e", lineHeight: 1.82, letterSpacing: "0.005em" }}
          >
            A dedicated skills assessment consultancy helping engineers, tradespeople,
            and ICT professionals navigate CDR, VETASSES, and ACS applications with confidence.
          </p>
        </motion.div>

        {/* ══ CARDS — each animates on its own scroll trigger ══ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {MV.map((item, i) => (
            <MVCard key={item.label} item={item} i={i} />
          ))}
        </div>

        {/* ══ STAT STRIP — own scroll trigger ══ */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: E }}
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#f2f1ee" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center py-8 px-5 text-center relative"
              >
                {i > 0 && (
                  <div
                    className="absolute left-0 top-1/4 bottom-1/4 w-px hidden md:block"
                    style={{ background: "rgba(0,0,0,0.07)" }}
                  />
                )}
                <span
                  className="font-black mb-1 tabular-nums"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.25rem)",
                    letterSpacing: "-0.04em",
                    color: stat.red ? "#c8102e" : "#16110c",
                  }}
                >
                  <Counter target={stat.num} suffix={stat.suffix} active={statsInView} />
                </span>
                <span
                  className="font-mono font-bold uppercase tracking-widest"
                  style={{ fontSize: "0.6rem", color: "#9a948c", letterSpacing: "0.16em" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}