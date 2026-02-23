"use client";

/**
 * JourneySection
 *
 * FIXES IN THIS VERSION:
 * ─────────────────────────────────────────────────────────
 * 1. Full section visible — rows laid out absolutely with
 *    translateY offsets so all content fits in 100vh panel
 * 2. Red/green light — replaces amber/yellow
 * 3. Fast ignition — glow starts at p=0.02 (instant on entry)
 * 4. BG returns to black — rawP drives bg opacity so scroll
 *    up restores darkness (light is NOT forward-locked now,
 *    only row reveals are forward-locked)
 * 5. Bulb goes back up on scroll up (rawP driven)
 * 6. True 1:1 sync — zero springs on master
 *
 * SCROLL MAP  p = scrollYProgress 0→1 over 600vh
 * ─────────────────────────────────────────────────────────
 *  0.00         Black. Bulb at y:-200, opacity:0
 *  0.00–0.10    Bulb drops in. Cord extends.
 *  0.05–0.15    Red/green glow ramps on FAST
 *  0.05–0.85    Room light expands from bulb
 *  0.15–0.25    Row 1 reveals
 *  0.24–0.34    Row 2
 *  0.33–0.43    Row 3
 *  0.42–0.52    Row 4
 *  0.51–0.61    Row 5
 *  0.60–0.70    Row 6
 *
 * SCROLL UP:
 *  - Bulb rises back above frame
 *  - Glow dims → room goes black
 *  - Rows stay revealed (per-row forward lock)
 */

import { useRef, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";

// ─── Config ───────────────────────────────────────────────────────────────────
// Switch "red" | "green"
const LIGHT_MODE: "red" | "green" = "red";

const LIGHT = {
  red: {
    core:   "rgba(255,40,40,1)",
    mid:    "rgba(220,20,20,0.85)",
    outer:  "rgba(180,10,10,0.3)",
    halo1:  "rgba(255,60,60,0.22)",
    halo2:  "rgba(200,15,15,0.08)",
    corona: "rgba(255,80,80,0.92)",
    floor:  "rgba(180,10,10,0.07)",
    text:   ["rgba(255,140,140,0.95)", "rgba(255,100,100,0.60)", "rgba(255,80,80,0.38)"],
    tag:    "rgba(255,120,120,0.50)",
    year:   "rgba(255,80,80,0.06)",
    border: "rgba(255,60,60,0.15)",
    grid:   "rgba(255,60,60,1)",
    svgA:   "rgba(255,80,80,",
    svgS:   "rgba(255,60,60,",
    gFill:  ["#FF4444","#FF2020","#CC0000","#880000"],
  },
  green: {
    core:   "rgba(40,255,120,1)",
    mid:    "rgba(20,220,90,0.85)",
    outer:  "rgba(10,180,60,0.3)",
    halo1:  "rgba(40,255,110,0.22)",
    halo2:  "rgba(10,180,50,0.08)",
    corona: "rgba(60,255,130,0.92)",
    floor:  "rgba(10,160,50,0.07)",
    text:   ["rgba(140,255,180,0.95)", "rgba(100,255,150,0.60)", "rgba(80,220,120,0.38)"],
    tag:    "rgba(80,255,140,0.50)",
    year:   "rgba(40,255,100,0.06)",
    border: "rgba(40,255,100,0.15)",
    grid:   "rgba(40,220,100,1)",
    svgA:   "rgba(80,255,120,",
    svgS:   "rgba(60,220,100,",
    gFill:  ["#22FF88","#10CC60","#088040","#044020"],
  },
} as const;

const L = LIGHT[LIGHT_MODE];

const ROWS = [
  { year:"2020", tag:"Origin",     title:"The Beginning",            rs:0.15, re:0.25, body:"Foundation laid in solitude. A single consultant working independently — building competence one engagement at a time. No team. No infrastructure. Only discipline." },
  { year:"2021", tag:"Expansion",  title:"The First Team",           rs:0.24, re:0.34, body:"Three individuals committed to a shared direction. The work became collaborative — each contributing a distinct discipline to what was becoming a coherent practice." },
  { year:"2022", tag:"Mastery",    title:"Understanding the System", rs:0.33, re:0.43, body:"ACS and VETASSESS frameworks were studied with rigour. Requirements tested against real cases, refined through failure, commanded with confidence." },
  { year:"2024", tag:"Operations", title:"EOI Lodgement",            rs:0.42, re:0.52, body:"EOI submissions became a structured service. Documentation formalised. Practice moved from reactive consulting to proactive, repeatable delivery at scale." },
  { year:"2025", tag:"Launch",     title:"Official Registration",    rs:0.51, re:0.61, body:"Encoded Tech formally incorporated. CDR Writers Nepal launched as a defined product built for engineers pursuing skilled migration to Australia." },
  { year:"2026", tag:"Excellence", title:"Growth & Mastery",         rs:0.60, re:0.70, body:"Focus narrowed to what matters: engineering excellence, assessment authority, sustainable growth. Precision in every document." },
];

// ─── Forward lock ─────────────────────────────────────────────────────────────
function useForwardLock(src: MotionValue<number>): MotionValue<number> {
  const mv = useMotionValue(0);
  useMotionValueEvent(src, "change", (v) => {
    if (v > mv.get()) mv.set(v);
  });
  return mv;
}

// ─── Bulb ──────────────────────────────────────────────────────────────────────
const Bulb = memo(function Bulb({ p }: { p: MotionValue<number> }) {
  const y    = useTransform(p, [0.00, 0.10], [-200, 0]);
  const op   = useTransform(p, [0.00, 0.04], [0,    1]);
  const cordSY = useTransform(p, [0.01, 0.10], [0, 1]);
  const glow   = useTransform(p, [0.05, 0.16], [0, 1]);

  const haloOp = useTransform(glow, [0,0.4,1], [0, 0.52, 0.88]);
  const haloSc = useTransform(glow, [0, 1], [0.02, 1.0]);
  const corOp  = useTransform(glow, [0, 1], [0, 1]);
  const ambOp  = useTransform(glow, [0, 1], [0, 0.65]);
  const ambSc  = useTransform(glow, [0, 1], [0.01, 1.3]);

  const svgF = useTransform(glow, (g) => {
    if (g < 0.01) return "none";
    return `drop-shadow(0 0 ${(8+g*36).toFixed(1)}px ${L.svgA}${(0.15+g*0.78).toFixed(2)}))`;
  });

  return (
    <motion.div style={{
      display:"flex", flexDirection:"column", alignItems:"center",
      y, opacity:op, flexShrink:0, position:"relative",
    }}>
      <motion.div style={{
        width:1, height:80,
        background:`linear-gradient(to bottom, ${L.svgA}0.04), ${L.svgA}0.38))`,
        transformOrigin:"top center", scaleY:cordSY, flexShrink:0,
      }}/>
      <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
        {/* Ambient spread */}
        <motion.div style={{
          position:"absolute", width:460, height:460, borderRadius:"50%",
          background:`radial-gradient(circle, ${L.halo2.replace("0.08","0.12")} 0%, ${L.halo2} 40%, transparent 68%)`,
          opacity:ambOp, scale:ambSc, pointerEvents:"none",
        }}/>
        {/* Mid halo */}
        <motion.div style={{
          position:"absolute", width:260, height:260, borderRadius:"50%",
          background:`radial-gradient(circle, ${L.halo1} 0%, ${L.halo2} 44%, transparent 70%)`,
          opacity:haloOp, scale:haloSc, pointerEvents:"none",
        }}/>
        {/* Inner corona */}
        <motion.div style={{
          position:"absolute", width:84, height:84, borderRadius:"50%",
          background:`radial-gradient(circle, ${L.corona} 0%, ${L.svgA}0.55) 46%, transparent 74%)`,
          opacity:corOp, pointerEvents:"none",
        }}/>
        {/* Glass SVG */}
        <motion.svg viewBox="0 0 64 98" width={50} height={78}
          aria-hidden style={{ position:"relative", zIndex:2, filter:svgF }}>
          <defs>
            <radialGradient id="bfill" cx="50%" cy="40%" r="56%">
              <stop offset="0%"   stopColor={L.gFill[0]} stopOpacity="1.00"/>
              <stop offset="25%"  stopColor={L.gFill[1]} stopOpacity="0.90"/>
              <stop offset="62%"  stopColor={L.gFill[2]} stopOpacity="0.60"/>
              <stop offset="100%" stopColor={L.gFill[3]} stopOpacity="0.18"/>
            </radialGradient>
            <radialGradient id="bspec" cx="30%" cy="24%" r="50%">
              <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.22"/>
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.00"/>
            </radialGradient>
            <filter id="bblur"><feGaussianBlur stdDeviation="0.5"/></filter>
          </defs>
          <path d="M32 6C12 6 4 22 4 36c0 17 13 27 18 36h20c5-9 18-19 18-36C60 22 52 6 32 6z"
            fill="url(#bfill)" stroke={`${L.svgS}0.24)`} strokeWidth="0.6"/>
          <path d="M32 6C12 6 4 22 4 36c0 17 13 27 18 36h20c5-9 18-19 18-36C60 22 52 6 32 6z"
            fill="url(#bspec)"/>
          <ellipse cx="21" cy="20" rx="4" ry="8" fill="rgba(255,255,255,0.18)" filter="url(#bblur)"/>
          <g stroke={`${L.svgA}0.72)`} strokeWidth="0.9" fill="none" strokeLinecap="round">
            <path d="M27 54L27 46Q32 41 37 46L37 39Q32 34 27 39L27 32"/>
          </g>
          <rect x="22" y="72" width="20" height="5"    rx="2"   fill="rgba(80,80,80,0.72)"/>
          <rect x="23" y="77" width="18" height="4.5"  rx="1.5" fill="rgba(60,60,60,0.62)"/>
          <rect x="24" y="81.5" width="16" height="4"  rx="1.5" fill="rgba(45,45,45,0.55)"/>
          <rect x="25" y="85.5" width="14" height="4"  rx="1.5" fill="rgba(32,32,32,0.50)"/>
        </motion.svg>
      </div>
    </motion.div>
  );
});

// ─── Room Light Layers ────────────────────────────────────────────────────────
const RoomLight = memo(function RoomLight({ p }: { p: MotionValue<number> }) {
  // Light tracks rawP so it dims when scrolling back up
  const intensity = useTransform(p, [0.05, 0.18, 0.80, 0.95], [0, 1, 0.85, 0.70]);
  const radius    = useTransform(p, [0.05, 0.20, 0.75], ["0vw", "30vw", "160vw"]);

  const lightBg = useTransform(radius, (r) =>
    `radial-gradient(circle ${r} at 50% 240px, ${L.core.replace("1)","0.20)")} 0%, ${L.mid.replace("0.85)","0.08)")} 28%, ${L.outer.replace("0.3)","0.025)")} 54%, transparent 68%)`
  );

  const floorOp = useTransform(intensity, [0, 1], [0, 0.5]);

  return (
    <>
      <motion.div aria-hidden style={{
        position:"absolute", inset:0,
        background:lightBg,
        opacity:intensity,
        mixBlendMode:"screen",
        zIndex:1, pointerEvents:"none",
      }}/>
      <motion.div aria-hidden style={{
        position:"absolute", bottom:0, left:0, right:0, height:"50%",
        background:`radial-gradient(ellipse 90% 100% at 50% 100%, ${L.floor} 0%, transparent 72%)`,
        opacity:floorOp,
        zIndex:2, pointerEvents:"none",
      }}/>
    </>
  );
});

// ─── Heading ──────────────────────────────────────────────────────────────────
const Heading = memo(function Heading({ p }: { p: MotionValue<number> }) {
  const op  = useTransform(p, [0.05, 0.16], [0, 1]);
  const y   = useTransform(p, [0.05, 0.16], [12, 0]);
  const tc  = useTransform(p, [0.05, 0.20], ["rgba(255,255,255,0.0)", L.text[0]]);
  const sc  = useTransform(p, [0.05, 0.20], ["rgba(255,255,255,0.0)", L.tag]);

  return (
    <motion.div style={{ opacity:op, y, textAlign:"center", marginTop:"clamp(10px,1.6vh,18px)" }}>
      <motion.p style={{
        fontFamily:"monospace", fontSize:"0.55rem",
        letterSpacing:"0.28em", textTransform:"uppercase",
        color:sc, fontWeight:500, margin:"0 0 9px",
      }}>Encoded Tech · CDR Writers Nepal</motion.p>
      <motion.h2 style={{
        fontFamily:"'Cormorant Garamond',Georgia,serif",
        fontSize:"clamp(20px,2.8vw,38px)",
        fontWeight:700, letterSpacing:"-0.028em",
        lineHeight:1.06, color:tc, margin:0,
      }}>Our Journey</motion.h2>
      <motion.div style={{
        width:26, height:1, margin:"10px auto 0",
        backgroundColor:sc,
      }}/>
    </motion.div>
  );
});

// ─── Row ──────────────────────────────────────────────────────────────────────
const Row = memo(function Row({
  row, idx, p,
}: { row:typeof ROWS[0]; idx:number; p:MotionValue<number> }) {
  const isEven = idx % 2 === 0;

  const rawOp = useTransform(p, [row.rs, row.re], [0, 1]);
  const rawY  = useTransform(p, [row.rs, row.re], [46, 0]);

  // Row opacity forward-locked — revealed rows stay visible
  const op = useForwardLock(rawOp);

  return (
    <div style={{
      paddingTop:   idx===0 ? "clamp(32px,5.5vh,68px)" : "clamp(28px,5vh,72px)",
      paddingLeft:  "clamp(16px,5vw,100px)",
      paddingRight: "clamp(16px,5vw,100px)",
    }}>
      <div className="jd" style={{
        maxWidth:1020, margin:"0 auto", display:"flex",
        flexDirection:isEven ? "row" : "row-reverse",
        gap:"clamp(20px,3.5vw,56px)", alignItems:"center",
      }}>
        {/* Text */}
        <motion.div style={{ flex:1, minWidth:0, opacity:op, y:rawY }}>
          <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:11 }}>
            <span style={{ display:"block", width:14, height:1, backgroundColor:L.tag, flexShrink:0 }}/>
            <span style={{
              fontFamily:"monospace", fontSize:"0.56rem",
              fontWeight:600, letterSpacing:"0.22em",
              textTransform:"uppercase", color:L.tag,
            }}>{row.tag}</span>
          </div>
          <div style={{ position:"relative", marginBottom:6 }}>
            <span style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(46px,7vw,88px)",
              fontWeight:700, lineHeight:0.88,
              letterSpacing:"-0.05em",
              color:L.year, display:"block",
              userSelect:"none", pointerEvents:"none",
            }}>{row.year}</span>
            <h3 style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(15px,1.9vw,22px)",
              fontWeight:700, letterSpacing:"-0.02em",
              lineHeight:1.14, color:L.text[0],
              margin:0, position:"absolute", bottom:2, left:1,
            }}>{row.title}</h3>
          </div>
          <p style={{
            fontFamily:"system-ui,sans-serif",
            fontSize:"clamp(11.5px,1.25vw,13.5px)",
            lineHeight:1.80, color:L.text[1],
            fontWeight:400, margin:"12px 0 0", maxWidth:390,
          }}>{row.body}</p>
          <div style={{ marginTop:18, width:26, height:1, backgroundColor:L.tag, opacity:0.38 }}/>
        </motion.div>

        {/* Visual */}
        <motion.div style={{
          flex:1, minWidth:0,
          minHeight:"clamp(110px,17vw,220px)",
          borderRadius:2, position:"relative", overflow:"hidden",
          border:`1px solid ${L.border}`,
          opacity:op, y:rawY,
        }}>
          <svg aria-hidden width="100%" height="100%"
            style={{ position:"absolute", inset:0, opacity:0.07 }}
            preserveAspectRatio="none">
            <defs>
              <pattern id={`gp${idx}`} width="26" height="26" patternUnits="userSpaceOnUse">
                <path d="M26 0L0 0 0 26" fill="none" stroke={L.grid} strokeWidth="0.38"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#gp${idx})`}/>
          </svg>
          <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(38px,5.5vw,76px)",
              fontWeight:700, letterSpacing:"-0.06em",
              color:L.year, lineHeight:1, userSelect:"none",
            }}>{row.year}</span>
          </div>
          <div style={{
            position:"absolute", top:11,
            ...(isEven ? { right:11 } : { left:11 }),
            width:14, height:14,
            borderTop:`1px solid ${L.tag}`,
            ...(isEven ? { borderRight:`1px solid ${L.tag}` } : { borderLeft:`1px solid ${L.tag}` }),
            opacity:0.48,
          }}/>
        </motion.div>
      </div>

      {/* Mobile */}
      <div className="jm" style={{ display:"none", flexDirection:"column" as const, gap:14, maxWidth:470, margin:"0 auto" }}>
        <motion.div style={{ opacity:op, y:rawY }}>
          <p style={{ fontFamily:"monospace", fontSize:"0.54rem", letterSpacing:"0.2em", textTransform:"uppercase", color:L.tag, margin:"0 0 8px" }}>{row.tag}</p>
          <h3 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:"clamp(18px,5vw,26px)", fontWeight:700, color:L.text[0], margin:"0 0 8px" }}>{row.title}</h3>
          <p style={{ fontFamily:"system-ui,sans-serif", fontSize:"13px", lineHeight:1.76, color:L.text[1], margin:0 }}>{row.body}</p>
        </motion.div>
      </div>
    </div>
  );
});

// ─── Root ──────────────────────────────────────────────────────────────────────
export default function JourneySection() {
  const outerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // rawP = raw 0→1 — drives bulb drop AND room light (fully reversible)
  const rawP = scrollYProgress;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&display=swap');
        @media(max-width:720px){.jd{display:none!important}.jm{display:flex!important}}
      `}</style>

      {/*
        OUTER: 600vh → real scroll range.
        INNER: sticky 100vh, overflow:hidden → never scrolls itself.
        CONTENT: position:absolute → fills panel, no own scroll.
        rawP is 1:1 with how far user has scrolled through 600vh.
      */}
      <div ref={outerRef} style={{ height:"600vh", position:"relative" }}>
        <div style={{ position:"sticky", top:0, height:"100vh", overflow:"hidden" }}>

          {/* Permanent black base */}
          <div style={{ position:"absolute", inset:0, backgroundColor:"#060606", zIndex:0 }}/>

          {/* Room light — dims on scroll up */}
          <RoomLight p={rawP}/>

          {/* All content */}
          <div style={{ position:"absolute", inset:0, zIndex:10, display:"flex", flexDirection:"column", alignItems:"stretch" }}>

            {/* Bulb + title */}
            <div style={{
              display:"flex", flexDirection:"column", alignItems:"center",
              paddingTop:"clamp(28px,4vh,56px)",
              flexShrink:0,
            }}>
              <Bulb p={rawP}/>
              <Heading p={rawP}/>
            </div>

            {/* Rows container — fills rest of panel, clips overflow */}
            <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
              {ROWS.map((row, i) => (
                <Row key={row.year} row={row} idx={i} p={rawP}/>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}