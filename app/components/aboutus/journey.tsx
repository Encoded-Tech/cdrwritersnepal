"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  MotionValue,
} from "framer-motion";

// ─── DATA ────────────────────────────────────────────────────────────────────

const TIMELINE = [
  { year: "2020", title: "Freelancing Phase",          description: "The founder worked independently with individual clients, building technical skills, trust, and real-world CDR experience from the ground up." },
  { year: "2021", title: "Research & Strategy",        description: "Focused on researching international markets, agents, and systems required to scale client acquisition and establish repeatable workflows." },
  { year: "2022", title: "Foundation of the Team",     description: "Built the first small team and began structured collaboration with agents, introducing quality processes for CDR documentation." },
  { year: "2023", title: "Agent Client Expansion",     description: "Started delivering consistent professional project results directly for agents, earning trust through reliability and EA-aligned outputs." },
  { year: "2024", title: "Team Expansion",             description: "Expanded to a team of 6 specialists and successfully delivered numerous professional client projects across engineering disciplines." },
  { year: "2025", title: "Official Company Formation", description: "Encoded Tech was officially established as a company. CDR Writers Nepal was launched as a dedicated product and service brand." },
  { year: "2026", title: "Scaling & Market Expansion", description: "Focused on marketing, research, and expansion strategies targeting ACS, EA, VETASSESS, and global technical migration clients." },
];

// ─── GRAIN ───────────────────────────────────────────────────────────────────

const GRAIN_SVG = encodeURIComponent(
  `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    <filter id="g"><feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="4" stitchTiles="stitch"/></filter>
    <rect width="100%" height="100%" filter="url(#g)"/>
  </svg>`
);

// ─── FLOATING DUST ───────────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  dx: Math.sin(i * 2.3) * 80,
  dy: Math.cos(i * 1.7) * 55 + 36,
  size: 1.0 + (i % 3) * 0.5,
  delay: i * 0.30,
  duration: 3.4 + (i % 4) * 0.9,
}));

function FloatingDust({ glowIntensity }: { glowIntensity: MotionValue<number> }) {
  const op = useTransform(glowIntensity, [0.18, 0.38, 0.85, 1], [0, 0.50, 0.60, 0.40], { clamp: true });
  return (
    <motion.div style={{ position: "absolute", top: "42%", left: "50%", x: "-50%", pointerEvents: "none", opacity: op }}>
      {PARTICLES.map((p) => (
        <motion.div key={p.id} style={{
          position: "absolute", width: p.size, height: p.size, borderRadius: "50%",
          background: "rgba(255,220,180,0.9)", left: p.dx, top: p.dy,
          boxShadow: "0 0 3px 1px rgba(255,180,80,0.4)",
        }}
          animate={{ y: [0, -16, 5, -10, 0], opacity: [0.2, 0.85, 0.45, 0.75, 0.2], scale: [0.6, 1.3, 0.85, 1.1, 0.6] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </motion.div>
  );
}

// ─── LIGHT BULB ──────────────────────────────────────────────────────────────

function LightBulb({ glowIntensity, scale: bulbScale = 1 }: { glowIntensity: MotionValue<number>; scale?: number }) {

  const bulbFill = useTransform(glowIntensity,
    [0,         0.08,      0.40,      0.82,      0.86,      0.94,      1      ],
    ["#0d0000", "#6b0000", "#aa0000", "#bb0000", "#003d00", "#005500", "#006200"]
  );

  const globeGlow = useTransform(glowIntensity,
    [0,    0.08,                    0.40,                    0.82,                    0.86,                    0.94,                    1    ],
    [
      "rgba(0,0,0,0)",
      "rgba(255,30,0,0.50)",
      "rgba(255,20,0,0.82)",
      "rgba(255,10,0,0.88)",
      "rgba(0,200,50,0.60)",
      "rgba(0,230,70,0.82)",
      "rgba(10,245,80,0.88)",
    ]
  );

  const coreGlow = useTransform(glowIntensity,
    [0,    0.08,                    0.45,                    0.82,                    0.86,                    1    ],
    [
      "rgba(0,0,0,0)",
      "rgba(255,200,140,0.90)",
      "rgba(255,230,180,0.96)",
      "rgba(255,240,200,0.96)",
      "rgba(160,255,180,0.90)",
      "rgba(180,255,200,0.96)",
    ]
  );

  const filamentOp = useTransform(glowIntensity, [0.05, 0.18], [0, 1], { clamp: true });

  const filamentCol = useTransform(glowIntensity,
    [0.06, 0.20, 0.50, 0.82, 0.86, 1],
    ["#cc2200", "#ff6622", "#ffcc88", "#ffe8cc", "#88ffaa", "#44ffaa"]
  );

  const sheenOp = useTransform(glowIntensity, [0, 0.12, 1], [0.04, 0.18, 0.28], { clamp: true });

  const neckGlow = useTransform(glowIntensity,
    [0, 0.08, 0.82, 0.86, 1],
    ["rgba(0,0,0,0)", "rgba(200,20,0,0.60)", "rgba(200,20,0,0.65)", "rgba(0,190,50,0.60)", "rgba(0,210,60,0.65)"]
  );

  const h1Size = useTransform(glowIntensity, [0, 1], [10 * bulbScale, 240 * bulbScale], { clamp: true });
  const h1Op   = useTransform(glowIntensity, [0, 0.08, 0.96, 1], [0, 1, 1, 0.92], { clamp: true });
  const h1Col  = useTransform(glowIntensity,
    [0,    0.08,                   0.50,                   0.82,                   0.86,                   1    ],
    ["rgba(0,0,0,0)", "rgba(255,20,0,0.98)", "rgba(255,40,0,0.94)", "rgba(255,30,0,0.94)", "rgba(0,230,70,0.94)", "rgba(0,250,80,0.88)"]
  );
  const h2Size = useTransform(glowIntensity, [0, 1], [20 * bulbScale, 600 * bulbScale], { clamp: true });
  const h2Op   = useTransform(glowIntensity, [0, 0.08, 0.90, 1], [0, 0.85, 0.90, 0.75], { clamp: true });
  const h2Col  = useTransform(glowIntensity,
    [0,    0.10,                   0.50,                   0.82,                   0.86,                   1    ],
    ["rgba(0,0,0,0)", "rgba(220,15,0,0.65)", "rgba(230,30,0,0.60)", "rgba(225,20,0,0.60)", "rgba(0,200,55,0.55)", "rgba(0,220,65,0.48)"]
  );
  const h3Size = useTransform(glowIntensity, [0, 1], [40 * bulbScale, 1300 * bulbScale], { clamp: true });
  const h3Op   = useTransform(glowIntensity, [0, 0.15, 0.88, 1], [0, 0.50, 0.58, 0.46], { clamp: true });
  const h3Col  = useTransform(glowIntensity,
    [0,    0.15,                   0.50,                   0.82,                   0.86,                   1    ],
    ["rgba(0,0,0,0)", "rgba(200,8,0,0.30)", "rgba(210,20,0,0.26)", "rgba(205,12,0,0.26)", "rgba(0,168,40,0.24)", "rgba(0,185,50,0.20)"]
  );

  const breatheScale = { animate: { scale: [1, 1.008, 1] }, transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const } };

  const w = 80 * bulbScale;
  const h = 230 * bulbScale;

  return (
    <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", isolation: "isolate" }}>

      {/* ── Halos */}
      <motion.div style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", width: h3Size, height: h3Size, top: "50%", left: "50%", x: "-50%", y: "-50%", background: h3Col, filter: "blur(90px)", opacity: h3Op }} />
      <motion.div style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", width: h2Size, height: h2Size, top: "50%", left: "50%", x: "-50%", y: "-50%", background: h2Col, filter: "blur(50px)", opacity: h2Op }} />
      <motion.div style={{ position: "absolute", borderRadius: "50%", pointerEvents: "none", width: h1Size, height: h1Size, top: "50%", left: "50%", x: "-50%", y: "-50%", background: h1Col, filter: "blur(14px)", opacity: h1Op }} />

      <svg
        width={w} height={h} viewBox="0 0 80 230" fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "relative", zIndex: 2, flexShrink: 0, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))" }}
      >
        <defs>
          <radialGradient id="glassGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.01)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.18)" />
          </radialGradient>
          <radialGradient id="rimDark" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.45)" />
          </radialGradient>
          <radialGradient id="coreSpot" cx="50%" cy="48%" r="38%">
            <stop offset="0%" stopColor="rgba(255,255,240,0.95)" />
            <stop offset="60%" stopColor="rgba(255,255,200,0.30)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <clipPath id="globeClip">
            <path d="M40 52 C18 52,4 72,4 96 C4 120,14 144,26 158 C30 163,34 167,34 172 L46 172 C46 167,50 163,54 158 C66 144,76 120,76 96 C76 72,62 52,40 52 Z" />
          </clipPath>
          <linearGradient id="capGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="30%" stopColor="#3a3a3a" />
            <stop offset="55%" stopColor="#4e4e4e" />
            <stop offset="80%" stopColor="#2e2e2e" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
          <linearGradient id="threadGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#111" />
            <stop offset="40%" stopColor="#555" />
            <stop offset="60%" stopColor="#666" />
            <stop offset="100%" stopColor="#111" />
          </linearGradient>
        </defs>

        <rect x="27" y="0" width="26" height="52" rx="4" fill="url(#capGrad)" />
        {[8, 14, 20, 26, 32, 38, 44].map((y) => (
          <rect key={y} x="27" y={y} width="26" height="1.5" rx="0.5" fill="url(#threadGrad)" opacity="0.8" />
        ))}
        {[9, 15, 21, 27, 33, 39, 45].map((y) => (
          <rect key={y} x="28" y={y} width="24" height="0.5" rx="0.2" fill="rgba(255,255,255,0.08)" />
        ))}

        <path d="M25 50 Q25 66,40 68 Q55 66,55 50 Z" fill="#282828" />
        <path d="M27 50 Q27 64,40 66 Q53 64,53 50 Z" fill="#363636" />
        <path d="M30 52 Q30 60,40 62" stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="none" />
        <motion.path
          d="M30 58 Q30 66,40 68 Q50 66,50 58"
          stroke={neckGlow as unknown as string}
          strokeWidth="1.5" fill="none" strokeLinecap="round"
          style={{ opacity: filamentOp }}
        />

        <motion.path
          d="M40 52 C18 52,4 72,4 96 C4 120,14 144,26 158 C30 163,34 167,34 172 L46 172 C46 167,50 163,54 158 C66 144,76 120,76 96 C76 72,62 52,40 52 Z"
          style={{ fill: bulbFill }}
        />
        <motion.path
          d="M40 52 C18 52,4 72,4 96 C4 120,14 144,26 158 C30 163,34 167,34 172 L46 172 C46 167,50 163,54 158 C66 144,76 120,76 96 C76 72,62 52,40 52 Z"
          style={{ fill: globeGlow }}
          {...breatheScale}
        />
        <path
          d="M40 52 C18 52,4 72,4 96 C4 120,14 144,26 158 C30 163,34 167,34 172 L46 172 C46 167,50 163,54 158 C66 144,76 120,76 96 C76 72,62 52,40 52 Z"
          fill="url(#rimDark)"
        />

        <motion.line x1="36" y1="172" x2="33" y2="148" stroke={filamentCol as unknown as string} strokeWidth="1.0" style={{ opacity: filamentOp }} strokeLinecap="round" />
        <motion.line x1="44" y1="172" x2="47" y2="148" stroke={filamentCol as unknown as string} strokeWidth="1.0" style={{ opacity: filamentOp }} strokeLinecap="round" />
        <motion.path
          d="M33 148 L31 136 L35 124 L31 112 L33 100"
          stroke={filamentCol as unknown as string} strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          style={{ opacity: filamentOp }}
        />
        <motion.path
          d="M47 148 L49 136 L45 124 L49 112 L47 100"
          stroke={filamentCol as unknown as string} strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round" fill="none"
          style={{ opacity: filamentOp }}
        />
        <motion.path
          d="M33 100 Q34 92,40 90 Q46 92,47 100"
          stroke={filamentCol as unknown as string} strokeWidth="1.8"
          strokeLinecap="round" fill="none"
          style={{ opacity: filamentOp }}
        />
        <motion.ellipse cx="40" cy="115" rx="12" ry="22" style={{ fill: coreGlow }} />

        <path
          d="M40 52 C18 52,4 72,4 96 C4 120,14 144,26 158 C30 163,34 167,34 172 L46 172 C46 167,50 163,54 158 C66 144,76 120,76 96 C76 72,62 52,40 52 Z"
          fill="url(#glassGrad)"
        />
        <motion.ellipse
          cx="28" cy="80" rx="9" ry="18"
          fill="white" style={{ opacity: sheenOp }}
          transform="rotate(-15 28 80)"
        />
        <motion.ellipse
          cx="22" cy="70" rx="3" ry="5"
          fill="white"
          style={{ opacity: sheenOp }}
          animate={{ opacity: [0.08, 0.20, 0.08] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <path
          d="M70 90 Q74 108,70 128"
          stroke="rgba(255,255,255,0.05)" strokeWidth="3"
          strokeLinecap="round" fill="none"
        />

        <rect x="34" y="172" width="12" height="6" rx="1" fill="#3a3a3a" />
        <rect x="35" y="178" width="10" height="4" rx="1" fill="#2e2e2e" />
        <rect x="36" y="182" width="8" height="5" rx="2" fill="#242424" />
        <ellipse cx="40" cy="187" rx="4" ry="2.5" fill="#5a4a28" />
        <ellipse cx="40" cy="186" rx="3" ry="1.5" fill="#7a6636" />
      </svg>
    </div>
  );
}

// ─── SPARKS ───────────────────────────────────────────────────────────────────

function Sparks({ glowIntensity }: { glowIntensity: MotionValue<number> }) {
  const op = useTransform(glowIntensity, [0.10, 0.25, 0.86, 1], [0, 0.88, 0.92, 0.70], { clamp: true });

  const sparkBg = useTransform(glowIntensity,
    [0.10, 0.50, 0.82, 0.86, 1],
    [
      "radial-gradient(circle,#ff9966,#cc1100)",
      "radial-gradient(circle,#ffcc88,#dd3300)",
      "radial-gradient(circle,#ffaa66,#cc2200)",
      "radial-gradient(circle,#aaffcc,#00cc55)",
      "radial-gradient(circle,#88ffbb,#00bb44)",
    ]
  );
  const sparkShadow = useTransform(glowIntensity,
    [0.10, 0.50, 0.82, 0.86, 1],
    [
      "0 0 7px 3px rgba(220,20,0,0.85)",
      "0 0 7px 3px rgba(200,60,0,0.85)",
      "0 0 7px 3px rgba(210,30,0,0.85)",
      "0 0 7px 3px rgba(0,200,70,0.85)",
      "0 0 7px 3px rgba(0,210,80,0.85)",
    ]
  );

  const pts = [
    { dx: -22, dy: 16, d: 0.0 }, { dx: 24,  dy: 20, d: 0.30 },
    { dx: -32, dy: 8,  d: 0.62 }, { dx: 30,  dy: 28, d: 0.94 },
    { dx: -14, dy: 36, d: 1.26 }, { dx: 18,  dy: -4, d: 1.58 },
    { dx: -6,  dy: 44, d: 1.85 }, { dx: 10,  dy: 10, d: 2.10 },
  ];

  return (
    <motion.div style={{ position: "absolute", top: "100%", left: "50%", x: "-50%", pointerEvents: "none", opacity: op }}>
      {pts.map((p, i) => (
        <motion.div key={i} style={{
          position: "absolute", width: 3, height: 3, borderRadius: "50%",
          background: sparkBg as unknown as string,
          boxShadow: sparkShadow as unknown as string,
          left: p.dx, top: p.dy,
        }}
          animate={{ y: [0, -15, 4, -9, 0], opacity: [0.3, 1, 0.4, 0.8, 0.3], scale: [0.7, 1.6, 0.8, 1.3, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: p.d }}
        />
      ))}
    </motion.div>
  );
}

// ─── PREMIUM TIMELINE CARD ────────────────────────────────────────────────────

function CardContent({ entry, align }: { entry: typeof TIMELINE[0]; align: "left" | "right" }) {
  const isRight = align === "right";

  return (
    <motion.div
      whileHover="hover"
      style={{ position: "relative", maxWidth: 340, width: "100%", cursor: "default" }}
    >
      {/* Outer glow on hover */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.30 }}
        style={{
          position: "absolute", inset: -1, borderRadius: 18, pointerEvents: "none",
          boxShadow: "0 0 0 1px rgba(60,210,80,0.20), 0 0 32px 4px rgba(30,190,60,0.14)",
        }}
      />

      {/* Card body */}
      <div style={{
        position: "relative", borderRadius: 18, overflow: "hidden",
        background: "linear-gradient(145deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.022) 55%, rgba(0,0,0,0.12) 100%)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: [
          "0 1px 0 rgba(255,255,255,0.07) inset",
          "0 -1px 0 rgba(0,0,0,0.28) inset",
          "0 24px 64px rgba(0,0,0,0.58)",
          "0 6px 20px rgba(0,0,0,0.38)",
        ].join(", "),
        padding: "20px 20px 18px",
      }}>

        {/* Top-edge highlight */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(to ${isRight ? "left" : "right"}, transparent, rgba(255,255,255,0.13) 45%, rgba(255,255,255,0.04) 100%)`,
        }} />

        {/* Hover light sweep */}
        <motion.div
          variants={{ hover: { x: "240%" } }}
          initial={{ x: "-100%" }}
          transition={{ duration: 0.60, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "absolute", top: 0, left: 0, bottom: 0, width: "55%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.045), transparent)",
            pointerEvents: "none", transform: "skewX(-14deg)",
          }}
        />

        {/* Vertical accent bar */}
        <div style={{
          position: "absolute",
          top: 20, bottom: 20,
          left: 0,
          width: 3, borderRadius: 2,
          background: "linear-gradient(to bottom, rgba(60,210,80,0.95) 0%, rgba(30,170,60,0.45) 60%, transparent 100%)",
          boxShadow: "0 0 10px 2px rgba(40,200,70,0.40)",
        }} />

        {/* Year badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 12,
          justifyContent: "flex-start",
        }}>
          <div style={{
            position: "relative", display: "inline-flex", alignItems: "center", gap: 7,
            padding: "5px 13px 5px 10px", borderRadius: 6,
            background: "linear-gradient(135deg, rgba(30,200,70,0.14) 0%, rgba(20,160,50,0.06) 100%)",
            border: "1px solid rgba(60,210,80,0.30)",
            boxShadow: "0 0 14px rgba(40,200,60,0.16), inset 0 1px 0 rgba(255,255,255,0.07)",
          }}>
            <motion.div
              animate={{ opacity: [0.7, 1, 0.7], scale: [0.9, 1.15, 0.9] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                background: "radial-gradient(circle, #aaffcc 30%, #22cc55 100%)",
                boxShadow: "0 0 7px 2px rgba(40,200,80,0.65)",
              }}
            />
            <span style={{
              fontSize: "0.60rem", fontFamily: "'Courier New', monospace",
              fontWeight: 800, letterSpacing: "0.28em",
              textTransform: "uppercase" as const,
              color: "rgba(80,230,110,0.96)",
              textShadow: "0 0 12px rgba(40,200,70,0.55)",
            }}>{entry.year}</span>
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "clamp(0.9rem, 2.5vw, 1.08rem)", fontWeight: 600,
          color: "rgba(255,255,255,1)",
          letterSpacing: "-0.022em", lineHeight: 1.30, marginBottom: 10,
          textAlign: "left",
          textShadow: "0 2px 12px rgba(0,0,0,0.65)",
        }}>{entry.title}</h3>

        {/* Divider */}
        <div style={{
          height: 1, marginBottom: 11,
          background: "linear-gradient(to right, rgba(60,200,80,0.28) 0%, rgba(255,255,255,0.04) 70%, transparent 100%)",
        }} />

        {/* Description */}
        <p style={{
          fontSize: "clamp(0.74rem, 2vw, 0.81rem)", color: "rgba(220,230,215,0.92)",
          lineHeight: 1.78, margin: 0,
          textAlign: "left",
        }}>{entry.description}</p>

        {/* Corner bracket */}
        <div style={{
          position: "absolute",
          right: 14,
          bottom: 14, width: 16, height: 16,
          borderRight: "1px solid rgba(60,200,80,0.18)",
          borderBottom: "1px solid rgba(60,200,80,0.18)",
          borderRadius: "0 0 3px 0",
        }} />
      </div>
    </motion.div>
  );
}

function TimelineCard({
  entry, index, isLast, glowIntensity,
}: {
  entry: typeof TIMELINE[0]; index: number; isLast: boolean; glowIntensity: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px 0px" });
  const isLeft = index % 2 === 0;

  // Gate card reveal: both physically in viewport AND glow has reached threshold
  const [glowReady, setGlowReady] = React.useState(false);
  React.useEffect(() => {
    // Fire once when glowIntensity first crosses 0.65
    const unsubscribe = glowIntensity.on("change", (v) => {
      if (v >= 0.65) { setGlowReady(true); unsubscribe(); }
    });
    return unsubscribe;
  }, [glowIntensity]);

  const revealed = inView && glowReady;

  const dot = (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={revealed ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.45, ease: "backOut", delay: 0.22 }}
      style={{ position: "relative", flexShrink: 0 }}
    >
      <motion.div
        animate={{ scale: [1, 2.2, 1], opacity: [0.55, 0, 0.55] }}
        transition={{ duration: 3.0, repeat: Infinity, ease: "easeOut" }}
        style={{ position: "absolute", inset: -5, borderRadius: "50%", border: "1px solid rgba(60,210,80,0.50)" }}
      />
      <div style={{
        width: 13, height: 13, borderRadius: "50%",
        background: "radial-gradient(circle, #ccffaa 15%, #33cc55 75%, #117733 100%)",
        boxShadow: "0 0 14px 5px rgba(50,200,70,0.55)",
      }} />
    </motion.div>
  );

  return (
    <div ref={ref} style={{ width: "100%" }}>

      {/* ─── DESKTOP: alternating left/right ─── */}
      <div
        style={{ display: "none", width: "100%" }}
        className="md-grid-timeline"
      >
        <style>{`
          @media (min-width: 640px) {
            .md-grid-timeline {
              display: grid !important;
              grid-template-columns: 1fr 48px 1fr;
              align-items: start;
            }
            .mobile-timeline { display: none !important; }
          }
        `}</style>

        <motion.div
          initial={{ opacity: 0, x: -40, y: 10 }}
          animate={revealed ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.80, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          style={{ paddingRight: 24, paddingTop: 6, display: "flex", justifyContent: "flex-end" }}
        >
          {isLeft && <CardContent entry={entry} align="right" />}
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginTop: 12 }}>{dot}</div>
          {!isLast && (
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              animate={revealed ? { scaleY: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.38 }}
              style={{
                width: 1, flex: 1, minHeight: 56, marginTop: 5,
                background: "linear-gradient(to bottom, rgba(50,200,70,0.35), rgba(30,160,50,0.06))",
                transformOrigin: "top",
              }}
            />
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, y: 10 }}
          animate={revealed ? { opacity: 1, x: 0, y: 0 } : {}}
          transition={{ duration: 0.80, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          style={{ paddingLeft: 24, paddingTop: 6 }}
        >
          {!isLeft && <CardContent entry={entry} align="left" />}
        </motion.div>
      </div>

      {/* ─── MOBILE: single column with left-rail ─── */}
      <div className="mobile-timeline" style={{ display: "flex", gap: 14, alignItems: "flex-start", width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 10, flexShrink: 0 }}>
          {dot}
          {!isLast && (
            <div style={{
              width: 1, height: 40, marginTop: 4,
              background: "linear-gradient(to bottom, rgba(50,200,70,0.30), rgba(30,160,50,0.04))",
            }} />
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          style={{ flex: 1, minWidth: 0 }}
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

  const rawDropY = useTransform(s, [0, 0.14], [-420, 0], { clamp: true });
  const dropY = useSpring(rawDropY, {
    stiffness: 46,
    damping: 13,
    mass: 1.8,
    restDelta: 0.4,
  });

  const rawSwing = useTransform(s, [0.06, 0.11, 0.14, 0.17], [0, -5.5, 2.8, 0], { clamp: true });
  const swing = useSpring(rawSwing, { stiffness: 26, damping: 8, mass: 1.3, restDelta: 0.08 });

  const rawScale = useTransform(s, [0, 0.08, 0.14], [0.82, 1.05, 1.0], { clamp: true });
  const scale = useSpring(rawScale, { stiffness: 58, damping: 15, mass: 1.0 });

  const assemblyOp = useTransform(s, [0, 0.014], [0, 1], { clamp: true });
  const glowIntensity = useTransform(s, [0.06, 0.52], [0, 1], { clamp: true });

  const bgColor = useTransform(glowIntensity,
    [0,         0.10,        0.50,        0.82,        0.86,        0.94,        1        ],
    ["#000000", "#0e0000",   "#1c0000",   "#1c0000",   "#020e00",   "#020e00",   "#010b00"]);

  const castGradient = useTransform(glowIntensity,
    [0,    0.10,  0.50,  0.82,  0.86,  0.94,  1    ],
    [
      "radial-gradient(ellipse 55% 30% at 50% 0%, rgba(0,0,0,0) 0%, transparent 60%)",
      "radial-gradient(ellipse 65% 38% at 50% 0%, rgba(200,0,0,0.32) 0%, rgba(65,0,0,0.12) 40%, transparent 65%)",
      "radial-gradient(ellipse 88% 55% at 50% 0%, rgba(220,10,0,0.46) 0%, rgba(75,0,0,0.16) 50%, transparent 72%)",
      "radial-gradient(ellipse 95% 62% at 50% 0%, rgba(215,8,0,0.46) 0%, rgba(72,0,0,0.16) 54%, transparent 74%)",
      "radial-gradient(ellipse 105% 68% at 50% 0%, rgba(0,210,55,0.34) 0%, rgba(0,60,12,0.11) 58%, transparent 76%)",
      "radial-gradient(ellipse 115% 74% at 50% 0%, rgba(0,215,60,0.36) 0%, rgba(0,65,14,0.12) 62%, transparent 78%)",
      "radial-gradient(ellipse 120% 80% at 50% 0%, rgba(0,200,70,0.34) 0%, rgba(0,60,15,0.10) 65%, transparent 80%)",
    ]);

  const orbSize    = useTransform(glowIntensity, [0, 1], [40, 1100], { clamp: true });
  const orbOpacity = useTransform(glowIntensity, [0, 0.10, 0.88, 1], [0, 0.55, 0.65, 0.55], { clamp: true });
  const orbColor   = useTransform(glowIntensity,
    [0,    0.10,                   0.50,                   0.82,                   0.86,                   1    ],
    ["rgba(0,0,0,0)", "rgba(200,10,0,0.48)", "rgba(215,15,0,0.56)", "rgba(210,10,0,0.54)", "rgba(0,195,55,0.42)", "rgba(0,205,65,0.36)"]
  );
  const scatterSize = useTransform(glowIntensity, [0, 1], [100, 1600], { clamp: true });
  const scatterOp   = useTransform(glowIntensity, [0, 0.22, 0.50, 0.88, 1], [0, 0, 0.20, 0.28, 0.22], { clamp: true });
  const scatterCol  = useTransform(glowIntensity,
    [0,    0.28,                   0.55,                   0.82,                   0.86,                   1    ],
    ["rgba(0,0,0,0)", "rgba(160,5,0,0.20)", "rgba(165,10,0,0.18)", "rgba(160,5,0,0.18)", "rgba(0,148,38,0.15)", "rgba(0,158,46,0.12)"]
  );
  const vigOp = useTransform(glowIntensity, [0, 0.12, 0.42, 0.78, 1], [0, 0, 0.30, 0.52, 0.65], { clamp: true });

  // ── Everything is hidden until the light has glowed enough (green phase ~0.72+)
  // Heading fades in as the green glow takes over
  const headingOp = useTransform(glowIntensity, [0.55, 0.78], [0, 1], { clamp: true });
  const headingY  = useTransform(glowIntensity, [0.55, 0.78], [28, 0], { clamp: true });
  // Timeline list reveals just after heading, as glow reaches full brightness
  const listOp    = useTransform(glowIntensity, [0.68, 0.88], [0, 1], { clamp: true });
  const listY     = useTransform(glowIntensity, [0.68, 0.88], [30, 0], { clamp: true });
  const hintOp    = useTransform(s, [0, 0.03, 0.10], [1, 1, 0], { clamp: true });

  const accentColor = useTransform(glowIntensity,
    [0, 0.20, 0.82, 0.86, 1],
    ["rgba(220,40,0,0.95)", "rgba(240,30,0,0.95)", "rgba(235,25,0,0.95)", "rgba(60,225,80,0.95)", "rgba(50,235,90,0.95)"]
  );
  const accentShadow = useTransform(glowIntensity,
    [0, 0.20, 0.82, 0.86, 1],
    ["0 0 16px rgba(200,30,0,0.55)", "0 0 16px rgba(220,20,0,0.60)", "0 0 16px rgba(215,15,0,0.60)", "0 0 16px rgba(40,210,70,0.55)", "0 0 16px rgba(30,220,75,0.55)"]
  );

  const WIRE_H = 72;

  return (
    <>
      {/* ─── Global responsive styles ─── */}
      <style>{`
        @media (min-width: 640px) {
          .md-grid-timeline {
            display: grid !important;
          }
          .mobile-timeline {
            display: none !important;
          }
        }
        @media (max-width: 639px) {
          .md-grid-timeline {
            display: none !important;
          }
          .mobile-timeline {
            display: flex !important;
          }
        }
      `}</style>

      <div ref={sectionRef} style={{ position: "relative" }}>

        {/* ── STICKY CINEMATIC SCENE ─────────────────────────── */}
        <div style={{
          position: "sticky", top: 0, height: "100svh",
          overflow: "hidden", zIndex: 5, pointerEvents: "none",
        }} aria-hidden>

          <motion.div style={{ position: "absolute", inset: 0, backgroundColor: bgColor }} />
          <motion.div style={{ position: "absolute", inset: 0, background: castGradient }} />
          <motion.div style={{
            position: "absolute", borderRadius: "50%",
            top: 0, left: "50%", x: "-50%", y: "-22%",
            width: orbSize, height: orbSize,
            background: orbColor, filter: "blur(130px)", opacity: orbOpacity,
          }} />
          <motion.div style={{
            position: "absolute", borderRadius: "50%",
            top: 0, left: "50%", x: "-50%", y: "-30%",
            width: scatterSize, height: scatterSize,
            background: scatterCol, filter: "blur(170px)", opacity: scatterOp,
          }} />
          <motion.div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse 60% 50% at 50% 0%, transparent 25%, rgba(0,0,0,0.46) 60%, rgba(0,0,0,0.90) 100%)",
            opacity: vigOp,
          }} />
          <div style={{
            position: "absolute", inset: 0, opacity: 0.024,
            backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
            backgroundSize: "128px", mixBlendMode: "overlay",
          }} />

          {/* ─── WIRE + BULB ASSEMBLY ─── */}
          <div style={{
            position: "absolute", top: 0, left: "50%",
            transform: "translateX(-50%)", zIndex: 10,
          }}>
            <motion.div style={{
              y: dropY,
              rotate: swing,
              scale: scale,
              opacity: assemblyOp,
              transformOrigin: "top center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <div style={{
                width: 2, height: WIRE_H, flexShrink: 0,
                background: "linear-gradient(to bottom, #909090, #3c3c3c)",
                borderRadius: 1,
              }} />
              {/* Scale bulb down on small screens via a wrapper */}
              <div style={{ transform: "scale(var(--bulb-scale, 1))", transformOrigin: "top center" }}>
                <style>{`
                  @media (max-width: 400px) { :root { --bulb-scale: 0.72; } }
                  @media (min-width: 401px) and (max-width: 639px) { :root { --bulb-scale: 0.85; } }
                  @media (min-width: 640px) { :root { --bulb-scale: 1; } }
                `}</style>
                <LightBulb glowIntensity={glowIntensity} />
                <FloatingDust glowIntensity={glowIntensity} />
                <Sparks glowIntensity={glowIntensity} />
              </div>
            </motion.div>
          </div>

          {/* Scroll hint */}
          <motion.div style={{
            position: "absolute", bottom: 28, left: "50%", x: "-50%",
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 8, opacity: hintOp, zIndex: 20,
          }}>
            <span style={{
              fontSize: "0.55rem", textTransform: "uppercase" as const,
              letterSpacing: "0.30em", color: "rgba(255,255,255,0.13)", fontFamily: "monospace",
            }}>Scroll</span>
            <motion.div style={{
              width: 1, height: 28,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.20), transparent)",
            }}
              animate={{ scaleY: [1, 0.2, 1], opacity: [0.25, 1, 0.25] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* ── SCROLLABLE CONTENT ──────────────────────────────── */}
        <div style={{ position: "relative", zIndex: 10, marginTop: "-100svh" }}>
          <div style={{ height: "50svh" }} />

          <motion.div style={{
            textAlign: "center",
            padding: "0 16px 48px",
            opacity: headingOp,
            y: headingY,
          }}>
            <p
              style={{
                fontSize: "clamp(0.6rem, 2vw, 0.78rem)",
                textTransform: "uppercase" as const,
                letterSpacing: "0.44em", fontFamily: "monospace", marginBottom: 14,
                color: accentColor as unknown as string,
                textShadow: accentShadow as unknown as string,
                fontWeight: 700,
              }}>Since 2020</p>
            <h2 style={{
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: "clamp(1.75rem, 6vw, 3.6rem)",
              fontWeight: 300, color: "rgba(255,252,245,0.96)",
              letterSpacing: "-0.026em", lineHeight: 1.1, margin: 0,
            }}>Our Journey</h2>
            <div style={{
              margin: "16px auto 0", height: 1, width: 80,
              background: "linear-gradient(to right, transparent, rgba(60,200,80,0.55), transparent)",
            }} />
          </motion.div>

          <motion.div style={{
            opacity: listOp, y: listY,
            maxWidth: 860,
            margin: "0 auto",
            padding: "0 12px 100px",
            boxSizing: "border-box" as const,
            width: "100%",
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {TIMELINE.map((entry, i) => (
                <TimelineCard key={entry.year} entry={entry} index={i} isLast={i === TIMELINE.length - 1} glowIntensity={glowIntensity} />
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 56, gap: 10 }}>
              <motion.div
                animate={{ boxShadow: ["0 0 18px 5px rgba(40,200,70,0.50)", "0 0 30px 10px rgba(40,200,70,0.28)", "0 0 18px 5px rgba(40,200,70,0.50)"] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: 14, height: 14, borderRadius: "50%",
                  background: "radial-gradient(circle, #bbffcc 20%, #22cc55 80%)",
                  boxShadow: "0 0 18px 5px rgba(40,200,70,0.50)",
                }}
              />
              <p style={{
                fontSize: "clamp(0.55rem, 1.8vw, 0.62rem)",
                textTransform: "uppercase" as const,
                letterSpacing: "0.30em", color: "rgba(100,220,120,0.45)", fontFamily: "monospace",
              }}>The story continues…</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}