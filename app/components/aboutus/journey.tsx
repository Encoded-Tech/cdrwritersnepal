"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: "2020", title: "Freelancing Phase",           description: "The founder worked independently with individual clients, building technical skills, trust, and real-world CDR experience from the ground up." },
  { year: "2021", title: "Research & Strategy",         description: "Focused on researching international markets, agents, and systems required to scale client acquisition and establish repeatable workflows." },
  { year: "2022", title: "Foundation of the Team",      description: "Built the first small team and began structured collaboration with agents, introducing quality processes for CDR documentation." },
  { year: "2023", title: "Agent Client Expansion",      description: "Started delivering consistent professional project results directly for agents, earning trust through reliability and EA-aligned outputs." },
  { year: "2024", title: "Team Expansion",              description: "Expanded to a team of 6 specialists and successfully delivered numerous professional client projects across engineering disciplines." },
  { year: "2025", title: "Official Company Formation",  description: "Encoded Tech was officially established as a company. CDR Writers Nepal was launched as a dedicated product and service brand." },
  { year: "2026", title: "Scaling & Market Expansion",  description: "Focused on marketing, research, and expansion strategies targeting ACS, EA, VETASSESS, and global technical migration clients." },
];

// ─── GRAIN ───────────────────────────────────────────────────────────────────

const GRAIN_SVG = encodeURIComponent(
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/></filter>
    <rect width="100%" height="100%" filter="url(#g)"/>
  </svg>`
);

// ─── LIGHT BULB ──────────────────────────────────────────────────────────────

function LightBulb({ glowIntensity }: { glowIntensity: MotionValue<number> }) {
  const bulbFill = useTransform(
    glowIntensity,
    [0,         0.15,      0.40,      0.65,      0.92,      1      ],
    ["#060606", "#1e0000", "#500000", "#7a0000", "#003d00", "#00bb00"]
  );
  const filamentOp = useTransform(glowIntensity, [0.08, 0.28], [0, 1], { clamp: true });
  const filamentCol = useTransform(
    glowIntensity,
    [0.10, 0.30, 0.70, 0.92, 1],
    ["#550000", "#cc0000", "#ff1100", "#00aa00", "#aaffaa"]
  );
  const coreGlow = useTransform(
    glowIntensity,
    [0, 0.15, 0.55, 0.90, 1],
    ["rgba(0,0,0,0)", "rgba(160,0,0,0.28)", "rgba(210,0,0,0.75)", "rgba(0,160,20,0.88)", "rgba(0,210,40,0.96)"]
  );
  const sheenOp = useTransform(glowIntensity, [0, 0.6, 1], [0.01, 0.06, 0.18], { clamp: true });

  // Three halo rings
  const h1Size = useTransform(glowIntensity, [0, 1], [10, 180], { clamp: true });
  const h1Op   = useTransform(glowIntensity, [0, 0.12, 0.95, 1], [0, 1, 1, 0.80], { clamp: true });
  const h1Col  = useTransform(glowIntensity, [0, 0.18, 0.65, 0.92, 1],
    ["rgba(0,0,0,0)", "rgba(200,0,0,0.88)", "rgba(230,0,0,0.80)", "rgba(0,195,0,0.72)", "rgba(0,230,50,0.65)"]);

  const h2Size = useTransform(glowIntensity, [0, 1], [20, 420], { clamp: true });
  const h2Op   = useTransform(glowIntensity, [0, 0.14, 0.90, 1], [0, 0.65, 0.70, 0.55], { clamp: true });
  const h2Col  = useTransform(glowIntensity, [0, 0.20, 0.65, 0.92, 1],
    ["rgba(0,0,0,0)", "rgba(180,0,0,0.45)", "rgba(210,0,0,0.38)", "rgba(0,165,0,0.32)", "rgba(0,200,35,0.25)"]);

  const h3Size = useTransform(glowIntensity, [0, 1], [40, 900], { clamp: true });
  const h3Op   = useTransform(glowIntensity, [0, 0.22, 0.88, 1], [0, 0.28, 0.36, 0.28], { clamp: true });
  const h3Col  = useTransform(glowIntensity, [0, 0.24, 0.68, 0.93, 1],
    ["rgba(0,0,0,0)", "rgba(160,0,0,0.20)", "rgba(190,0,0,0.16)", "rgba(0,140,10,0.14)", "rgba(0,170,22,0.11)"]);

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", isolation: "isolate" }}>
      {/* Halo 3 — outermost */}
      <motion.div style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: h3Size, height: h3Size, top: "54%", left: "50%", x: "-50%", y: "-50%",
        background: h3Col, filter: "blur(70px)", opacity: h3Op }} />
      {/* Halo 2 */}
      <motion.div style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: h2Size, height: h2Size, top: "54%", left: "50%", x: "-50%", y: "-50%",
        background: h2Col, filter: "blur(42px)", opacity: h2Op }} />
      {/* Halo 1 — tightest */}
      <motion.div style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none",
        width: h1Size, height: h1Size, top: "54%", left: "50%", x: "-50%", y: "-50%",
        background: h1Col, filter: "blur(10px)", opacity: h1Op }} />

      <svg width="72" height="190" viewBox="0 0 72 200" fill="none"
        xmlns="http://www.w3.org/2000/svg" style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
        {/* Globe */}
        <motion.path
          d="M36 70 C18 70,6 84,6 102 C6 120,18 136,29 140 L29 150 Q29 154 33 154 L39 154 Q43 154 43 150 L43 140 C54 136,66 120,66 102 C66 84,54 70,36 70 Z"
          style={{ fill: bulbFill }} stroke="#2e2e2e" strokeWidth="1" />
        {/* Cap */}
        <rect x="26" y="50" width="20" height="21" rx="3" fill="#2e2e2e" />
        <rect x="24" y="57" width="24" height="7" rx="2" fill="#3a3a3a" />
        {/* Sheen */}
        <motion.ellipse cx="22" cy="88" rx="6" ry="12" fill="white" style={{ opacity: sheenOp }} />
        {/* Base rings */}
        <rect x="29" y="150" width="14" height="5" rx="1" fill="#444" />
        <rect x="30" y="155" width="12" height="4" rx="1" fill="#383838" />
        <rect x="31" y="159" width="10" height="4" rx="1" fill="#2e2e2e" />
        {/* Filament left */}
        <motion.path d="M32 140 L30 128 L34 116 L30 104 L32 92"
          stroke={filamentCol as unknown as string} strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ opacity: filamentOp }} />
        {/* Filament right */}
        <motion.path d="M40 140 L42 128 L38 116 L42 104 L40 92"
          stroke={filamentCol as unknown as string} strokeWidth="1.4"
          strokeLinecap="round" strokeLinejoin="round" fill="none" style={{ opacity: filamentOp }} />
        {/* Bridge */}
        <motion.path d="M32 92 Q34 87 36 88 Q38 89 40 92"
          stroke={filamentCol as unknown as string} strokeWidth="1.4"
          strokeLinecap="round" fill="none" style={{ opacity: filamentOp }} />
        {/* Core glow */}
        <motion.ellipse cx="36" cy="112" rx="10" ry="14" style={{ fill: coreGlow }} />
      </svg>
    </div>
  );
}

// ─── SPARKS ───────────────────────────────────────────────────────────────────

function Sparks({ glowIntensity }: { glowIntensity: MotionValue<number> }) {
  const op = useTransform(glowIntensity, [0.35, 0.60, 0.90, 1], [0, 0.7, 0.9, 0.55], { clamp: true });
  const pts = [
    { dx: -20, dy: 14, d: 0.0 }, { dx: 22, dy: 18, d: 0.35 },
    { dx: -30, dy: 6,  d: 0.7 }, { dx: 28, dy: 26, d: 1.05 },
    { dx: -12, dy: 34, d: 1.4 }, { dx: 16, dy: -2, d: 1.75 },
  ];
  return (
    <motion.div style={{ position: "absolute", top: "100%", left: "50%", x: "-50%", pointerEvents: "none", opacity: op }}>
      {pts.map((p, i) => (
        <motion.div key={i} style={{
          position: "absolute", width: 2.5, height: 2.5, borderRadius: "50%",
          background: "radial-gradient(circle, #ccff88, #44cc10)",
          boxShadow: "0 0 4px 1px rgba(100,255,40,0.7)",
          left: p.dx, top: p.dy,
        }}
          animate={{ y: [0, -14, 0], opacity: [0.4, 1, 0.3], scale: [0.8, 1.4, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: p.d }}
        />
      ))}
    </motion.div>
  );
}

// ─── TIMELINE CARD ────────────────────────────────────────────────────────────

function CardContent({ entry, align }: { entry: typeof TIMELINE[0]; align: "left" | "right" }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(140,255,70,0.10)",
      borderRadius: 14,
      padding: "18px 22px",
      backdropFilter: "blur(6px)",
      boxShadow: "0 4px 28px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.04)",
      textAlign: align,
      maxWidth: 340,
      width: "100%",
    }}>
      <span style={{
        display: "inline-block", marginBottom: 8, padding: "3px 10px",
        borderRadius: 4, fontSize: "0.65rem", fontFamily: "monospace",
        fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const,
        background: "rgba(140,255,70,0.08)", border: "1px solid rgba(140,255,70,0.22)",
        color: "rgba(140,255,70,0.92)",
      }}>{entry.year}</span>
      <h3 style={{
        fontFamily: "'Georgia', serif", fontSize: "1.05rem", fontWeight: 600,
        color: "rgba(255,255,255,0.92)", letterSpacing: "-0.018em",
        lineHeight: 1.35, marginBottom: 8,
      }}>{entry.title}</h3>
      <p style={{
        fontFamily: "'Georgia', serif", fontSize: "0.82rem",
        color: "rgba(180,200,170,0.72)", lineHeight: 1.72, margin: 0,
      }}>{entry.description}</p>
    </div>
  );
}

function TimelineCard({ entry, index, isLast }: { entry: typeof TIMELINE[0]; index: number; isLast: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} style={{ width: "100%" }}>
      {/* Desktop: 3-col grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 40px 1fr", width: "100%", alignItems: "start" }}
        className="hidden md:grid">
        {/* Left col */}
        <motion.div
          initial={{ opacity: 0, x: -32, y: 8 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          style={{ paddingRight: 28, paddingTop: 4, display: "flex", justifyContent: "flex-end" }}
        >
          {isLeft && <CardContent entry={entry} align="right" />}
        </motion.div>
        {/* Center dot + connector */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: "backOut", delay: 0.18 }}
            style={{
              width: 12, height: 12, borderRadius: "50%", flexShrink: 0, marginTop: 8,
              background: "radial-gradient(circle, #c8ff80 20%, #44cc10 80%)",
              boxShadow: "0 0 12px 4px rgba(100,255,40,0.45)",
            }}
          />
          {!isLast && (
            <div style={{
              width: 1, flex: 1, minHeight: 60, marginTop: 4,
              background: "linear-gradient(to bottom, rgba(100,220,50,0.22), rgba(100,220,50,0.05))",
            }} />
          )}
        </div>
        {/* Right col */}
        <motion.div
          initial={{ opacity: 0, x: 32, y: 8 }}
          animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          style={{ paddingLeft: 28, paddingTop: 4 }}
        >
          {!isLeft && <CardContent entry={entry} align="left" />}
        </motion.div>
      </div>

      {/* Mobile: stacked */}
      <div className="md:hidden flex gap-4 items-start w-full">
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6, flexShrink: 0 }}>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: "backOut", delay: 0.12 }}
            style={{
              width: 10, height: 10, borderRadius: "50%",
              background: "radial-gradient(circle, #c8ff80 20%, #44cc10 80%)",
              boxShadow: "0 0 10px 3px rgba(100,255,40,0.40)",
            }}
          />
          {!isLast && (
            <div style={{
              width: 1, height: 40, marginTop: 4,
              background: "linear-gradient(to bottom, rgba(100,220,50,0.22), rgba(100,220,50,0.04))",
            }} />
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          style={{ flex: 1 }}
        >
          <CardContent entry={entry} align="left" />
        </motion.div>
      </div>
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────

export default function OurJourneySection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: s } = useScroll({
    target: sectionRef,
    offset: ["start 0.5", "end end"],
  });

  const bulbDropY = useTransform(s, [0, 0.08], [-240, 0], { clamp: true });
  const bulbSwing = useTransform(s,
    [0.08, 0.10, 0.13, 0.135, 0.14, 0.145, 0.15],
    [0,    -7,    5,   -2.2,   0.9,  -0.2,   0],
    { clamp: true }
  );
  const bulbScale  = useTransform(s, [0, 0.06], [0.9, 1], { clamp: true });
  const bulbOpacity = useTransform(s, [0, 0.02], [0, 1], { clamp: true });

  const glowIntensity = useTransform(s, [0.06, 0.52], [0, 1], { clamp: true });

  // ── bgColor: red dominates until 0.96, green only at the very end
  const bgColor = useTransform(glowIntensity,
    [0,          0.15,        0.40,        0.70,        0.96,        1        ],
    ["#000000",  "#0e0000",   "#1a0000",   "#200000",   "#040d02",   "#030d02"]);

  // ── castGradient: red through 0.88, green only at 0.93+
  const castGradient = useTransform(glowIntensity,
    [0,    0.12,  0.30,  0.55,  0.88,  0.93,  1    ],
    [
      "radial-gradient(ellipse 55% 30% at 50% 0%, rgba(0,0,0,0) 0%, transparent 60%)",
      "radial-gradient(ellipse 65% 38% at 50% 0%, rgba(140,0,0,0.26) 0%, rgba(48,0,0,0.10) 40%, transparent 65%)",
      "radial-gradient(ellipse 78% 48% at 50% 0%, rgba(168,0,0,0.36) 0%, rgba(62,0,0,0.14) 48%, transparent 70%)",
      "radial-gradient(ellipse 92% 60% at 50% 0%, rgba(188,0,0,0.44) 0%, rgba(76,0,0,0.16) 54%, transparent 74%)",
      "radial-gradient(ellipse 102% 68% at 50% 0%, rgba(192,0,0,0.42) 0%, rgba(78,0,0,0.15) 57%, transparent 76%)",
      "radial-gradient(ellipse 112% 74% at 50% 0%, rgba(0,160,18,0.30) 0%, rgba(0,56,5,0.10) 62%, transparent 78%)",
      "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,180,24,0.28) 0%, rgba(0,65,6,0.09) 65%, transparent 80%)",
    ]);

  const orbSize    = useTransform(glowIntensity, [0, 1], [40, 1000], { clamp: true });
  const orbOpacity = useTransform(glowIntensity, [0, 0.10, 0.88, 1], [0, 0.50, 0.62, 0.50], { clamp: true });
  // ── orbColor: deep red through 0.96, green only at the very end
  const orbColor   = useTransform(glowIntensity, [0, 0.12, 0.40, 0.72, 0.96, 1],
    ["rgba(0,0,0,0)", "rgba(160,0,0,0.38)", "rgba(200,0,0,0.50)", "rgba(210,0,0,0.44)", "rgba(0,150,18,0.26)", "rgba(0,185,26,0.22)"]);

  const scatterSize = useTransform(glowIntensity, [0, 1], [100, 1400], { clamp: true });
  const scatterOp   = useTransform(glowIntensity, [0, 0.22, 0.50, 0.85, 1], [0, 0, 0.16, 0.24, 0.20], { clamp: true });
  // ── scatterCol: green only at 0.90+ (was 0.85)
  const scatterCol  = useTransform(glowIntensity, [0, 0.28, 0.55, 0.90, 1],
    ["rgba(0,0,0,0)", "rgba(120,0,0,0.16)", "rgba(150,0,0,0.14)", "rgba(0,115,10,0.12)", "rgba(0,148,18,0.09)"]);

  const vigOp = useTransform(glowIntensity, [0, 0.10, 0.40, 0.75, 1], [0, 0, 0.32, 0.50, 0.65], { clamp: true });

  const headingOp = useTransform(s, [0.09, 0.17], [0, 1], { clamp: true });
  const headingY  = useTransform(s, [0.09, 0.17], [20, 0], { clamp: true });
  const listOp    = useTransform(glowIntensity, [0.10, 0.26], [0, 1], { clamp: true });
  const listY     = useTransform(glowIntensity, [0.10, 0.26], [28, 0], { clamp: true });
  const hintOp    = useTransform(s, [0, 0.03, 0.08], [1, 1, 0], { clamp: true });

  const WIRE_HEIGHT = 64;

  return (
    <div ref={sectionRef} style={{ position: "relative" }}>

      <div style={{
        position: "sticky",
        top: 0,
        height: "100svh",
        overflow: "hidden",
        zIndex: 5,
        pointerEvents: "none",
      }} aria-hidden>

        <motion.div style={{ position: "absolute", inset: 0, backgroundColor: bgColor }} />
        <motion.div style={{ position: "absolute", inset: 0, background: castGradient }} />
        <motion.div style={{
          position: "absolute", borderRadius: "50%",
          top: 0, left: "50%", x: "-50%", y: "-22%",
          width: orbSize, height: orbSize,
          background: orbColor, filter: "blur(120px)", opacity: orbOpacity,
        }} />
        <motion.div style={{
          position: "absolute", borderRadius: "50%",
          top: 0, left: "50%", x: "-50%", y: "-28%",
          width: scatterSize, height: scatterSize,
          background: scatterCol, filter: "blur(160px)", opacity: scatterOp,
        }} />
        <motion.div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, transparent 25%, rgba(0,0,0,0.45) 58%, rgba(0,0,0,0.88) 100%)",
          opacity: vigOp,
        }} />
        <div style={{
          position: "absolute", inset: 0, opacity: 0.022,
          backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
          backgroundSize: "128px",
        }} />

        <div style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10,
        }}>
          <div style={{
            width: 2,
            height: WIRE_HEIGHT,
            background: "linear-gradient(to bottom, #0d0d0d, #565656)",
            flexShrink: 0,
          }} />

          <motion.div style={{
            y: bulbDropY,
            rotate: bulbSwing,
            scale: bulbScale,
            opacity: bulbOpacity,
            transformOrigin: "top center",
            position: "relative",
          }}>
            <LightBulb glowIntensity={glowIntensity} />
            <Sparks glowIntensity={glowIntensity} />
          </motion.div>
        </div>

        <motion.div style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          x: "-50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: hintOp,
          zIndex: 20,
        }}>
          <span style={{
            fontSize: "0.55rem", textTransform: "uppercase" as const,
            letterSpacing: "0.30em", color: "rgba(255,255,255,0.16)",
            fontFamily: "monospace",
          }}>Scroll</span>
          <motion.div style={{
            width: 1, height: 28,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.24), transparent)",
          }}
            animate={{ scaleY: [1, 0.2, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

      </div>

      <div style={{
        position: "relative",
        zIndex: 10,
        marginTop: "-100svh",
      }}>

        <div style={{ height: "50svh" }} />

        <motion.div style={{
          textAlign: "center",
          padding: "0 16px 48px",
          opacity: headingOp,
          y: headingY,
        }}>
          <p style={{
            fontSize: "0.65rem", textTransform: "uppercase" as const,
            letterSpacing: "0.38em", color: "rgba(140,255,70,0.70)",
            fontFamily: "monospace", marginBottom: 12,
          }}>Since 2020</p>
          <h2 style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(2rem, 5vw, 3.6rem)",
            fontWeight: 300, color: "rgba(255,255,255,0.96)",
            letterSpacing: "-0.026em", lineHeight: 1.1, margin: 0,
          }}>Our Journey</h2>
          <div style={{
            margin: "16px auto 0", height: 1, width: 80,
            background: "linear-gradient(to right, transparent, rgba(140,255,70,0.50), transparent)",
          }} />
        </motion.div>

        <motion.div style={{
          opacity: listOp, y: listY,
          maxWidth: 820, margin: "0 auto",
          padding: "0 16px 100px",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            {TIMELINE.map((entry, i) => (
              <TimelineCard key={entry.year} entry={entry} index={i} isLast={i === TIMELINE.length - 1} />
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 56, gap: 10 }}>
            <div style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "radial-gradient(circle, #88ff88 20%, #33cc33 80%)",
              boxShadow: "0 0 18px 6px rgba(60,200,60,0.50)",
            }} />
            <p style={{
              fontSize: "0.62rem", textTransform: "uppercase" as const,
              letterSpacing: "0.30em", color: "rgba(180,255,180,0.55)", fontFamily: "monospace",
            }}>The story continues…</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}