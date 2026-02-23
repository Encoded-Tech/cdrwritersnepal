"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  LayoutGroup,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";

/* ══════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════ */
type ThemeName = "red" | "green";
type Direction = "next" | "prev";

interface ThemeConfig {
  color: string;
  colorDim: string;
  colorGlow: string;
  colorText: string;
  gradient: string;
  hue: number;
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  theme: ThemeName;
  quote: string;
}

/* ══════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════ */
const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1", name: "Amara Okonkwo", role: "Head of Product", company: "Meridian Labs",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Amara&backgroundColor=1a1a1a",
    rating: 5, theme: "red",
    quote: "This didn't feel like adopting software. It felt like gaining a collaborator who understood exactly what we were trying to build — before we did.",
  },
  {
    id: "t2", name: "Felix Hartmann", role: "CTO", company: "Strata Systems",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Felix&backgroundColor=1a1a1a",
    rating: 5, theme: "green",
    quote: "I've shipped systems at three companies. Nothing has compressed the distance between idea and production the way this has.",
  },
  {
    id: "t3", name: "Soo-Jin Park", role: "VP Engineering", company: "Canopy AI",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=SooJin&backgroundColor=1a1a1a",
    rating: 5, theme: "red",
    quote: "Our velocity didn't just improve. The entire texture of how we work changed. Meetings shorter. Decisions faster. Confidence higher.",
  },
  {
    id: "t4", name: "Rafael Mendes", role: "Founder", company: "Volta Studio",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Rafael&backgroundColor=1a1a1a",
    rating: 5, theme: "green",
    quote: "The ROI wasn't a spreadsheet exercise. It was the moment my team stopped dreading Monday morning standups.",
  },
  {
    id: "t5", name: "Ingrid Solberg", role: "Design Lead", company: "Northfield",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Ingrid&backgroundColor=1a1a1a",
    rating: 5, theme: "red",
    quote: "I've never written a recommendation for a B2B tool before. I'm writing this one because someone needs to.",
  },
];

/* ══════════════════════════════════════════════════
   THEMES
══════════════════════════════════════════════════ */
const THEMES: Record<ThemeName, ThemeConfig> = {
  red: {
    color: "#ef4444", colorDim: "rgba(239,68,68,0.12)",
    colorGlow: "rgba(239,68,68,0.4)", colorText: "#fca5a5",
    gradient: "linear-gradient(135deg,#7f1d1d,#991b1b,#450a0a)", hue: 355,
  },
  green: {
    color: "#22c55e", colorDim: "rgba(34,197,94,0.12)",
    colorGlow: "rgba(34,197,94,0.4)", colorText: "#86efac",
    gradient: "linear-gradient(135deg,#14532d,#166534,#052e16)", hue: 142,
  },
};

/* ══════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════ */
const CARD_MS      = 5000;
const STACK_W      = 300;
const STACK_CARD_H = 100;
const PEEK         = 28;
const ROTATIONS: number[] = [0.6, -0.9, 1.2, -0.5, 0.8];
const SPRING_TILT  = { stiffness: 180, damping: 22 };

/*
  ══════════════════════════════════════════════════
  LAYOUT SPRING — drives the FLIP animation.
  
  stiffness: 260  → confident, not sluggish
  damping:   28   → settles cleanly, zero bounce
  mass:      1    → natural weight
  
  This single spring governs ALL card position
  transitions (stack ↔ center). No easing curves,
  no duration — purely physical spring physics.
  ══════════════════════════════════════════════════
*/
const LAYOUT_SPRING = {
  type: "spring" as const,
  stiffness: 260,
  damping: 28,
  mass: 1,
};

/* ══════════════════════════════════════════════════
   TILT CARD — 3-D cursor tilt (unchanged)
══════════════════════════════════════════════════ */
function TiltCard({ children, th }: { children: React.ReactNode; th: ThemeConfig }) {
  const ref  = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx   = useSpring(rawX, SPRING_TILT);
  const sy   = useSpring(rawY, SPRING_TILT);
  const rotX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const rotY = useTransform(sx, [-0.5, 0.5], [-7, 7]);
  const glowX = useTransform(sx, [-0.5, 0.5], [15, 85]);
  const glowY = useTransform(sy, [-0.5, 0.5], [15, 85]);
  const bgImg = useTransform(
    [glowX, glowY],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${th.colorDim.replace("0.12", "0.28")} 0%, transparent 65%)`,
  );

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r  = el.getBoundingClientRect();
    rawX.set((e.clientX - r.left) / r.width  - 0.5);
    rawY.set((e.clientY - r.top)  / r.height - 0.5);
  }, [rawX, rawY]);
  const onLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX: rotX, rotateY: rotY,
        transformStyle: "preserve-3d", transformPerspective: 1100,
        position: "relative", width: "100%", borderRadius: 26, overflow: "hidden",
        background: "rgba(8,8,14,0.98)",
        border: `1px solid ${th.colorGlow.replace("0.4", "0.40")}`,
        boxShadow: `0 40px 100px rgba(0,0,0,0.85), 0 0 60px ${th.colorGlow.replace("0.4","0.14")}, inset 0 1px 0 rgba(255,255,255,0.07)`,
      }}
    >
      <motion.div aria-hidden style={{ position:"absolute",inset:0,pointerEvents:"none",zIndex:0,backgroundImage:bgImg }} />
      <div aria-hidden style={{
        position:"absolute",top:0,left:"5%",right:"5%",height:2,
        background:`linear-gradient(90deg,transparent,${th.color},transparent)`,
        opacity:0.7,zIndex:1,
      }} />
      <div style={{ position:"relative", zIndex:2 }}>{children}</div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   RATING BARS
══════════════════════════════════════════════════ */
function RatingBars({ rating, th }: { rating: number; th: ThemeConfig }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:22 }}>
      {[0.4, 0.65, 0.85, 0.7, 1.0].map((h, i) => (
        <div key={i} style={{
          width:3, height:22*h, borderRadius:99,
          background: i < rating ? th.color : "rgba(255,255,255,0.08)",
          boxShadow:  i < rating ? `0 0 6px ${th.colorGlow}` : "none",
          transition:"background 0.5s, box-shadow 0.5s",
        }} />
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   ROOT COMPONENT
   
   ANIMATION ARCHITECTURE:
   ──────────────────────────────────────────────
   Every card (stack + center) is rendered at all
   times and carries layoutId="card-{t.id}".
   
   When the deck array rotates (goNext/goPrev), the
   card that was at deck[1] (top of stack) moves to
   deck[0] (center). Because its layoutId is stable,
   Framer Motion measures the old and new DOM rects
   and runs a FLIP tween between them using
   LAYOUT_SPRING — a single spring that makes the
   card physically travel from stack to center.
   
   The departing center card moves to deck[N-1] and
   its layoutId also travels to its new stack position
   via the same spring, shrinking and rotating as it
   settles into the stack depth geometry.
   
   This gives spatial continuity with zero manual
   x/y calculations and zero AnimatePresence.
══════════════════════════════════════════════════ */
export default function TestimonialDeck() {
  const [deck, setDeck]               = useState<Testimonial[]>(TESTIMONIALS);
  const [activeIdx, setActiveIdx]     = useState<number>(0);
  const [paused, setPaused]           = useState<boolean>(false);
  const [forcedTheme, setForcedTheme] = useState<ThemeName | null>(null);
  const total = TESTIMONIALS.length;

  const active       = deck[0];
  const displayTheme: ThemeName = forcedTheme ?? active.theme;
  const th           = THEMES[displayTheme];

  const goNext = useCallback(() => {
    setDeck((p) => { const [h, ...t] = p; return [...t, h]; });
    setActiveIdx((i) => (i + 1) % total);
  }, [total]);

  const goPrev = useCallback(() => {
    setDeck((p) => [p[p.length - 1], ...p.slice(0, -1)]);
    setActiveIdx((i) => (i - 1 + total) % total);
  }, [total]);

  const goTo = useCallback((deckIdx: number) => {
    if (deckIdx === 0) return;
    setDeck((p) => {
      const next = [...p.slice(deckIdx), ...p.slice(0, deckIdx)];
      const origIdx = TESTIMONIALS.findIndex((t) => t.id === next[0].id);
      setActiveIdx(origIdx);
      return next;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(goNext, CARD_MS);
    return () => clearTimeout(id);
  }, [deck, paused, goNext]);

  const stackCards = deck.slice(1);
  const N      = stackCards.length;
  const stackH = STACK_CARD_H + (N - 1) * PEEK;

  return (
    /*
      LayoutGroup scopes all layoutId cards so Framer can
      track them across the stack and center subtrees.
    */
    <LayoutGroup>
      <div style={{
        minHeight:"100vh", width:"100%", background:"#05050a",
        display:"flex", flexDirection:"column",
        alignItems:"center", justifyContent:"center",
        padding:"60px 24px", boxSizing:"border-box",
        fontFamily:"Georgia, serif", overflow:"hidden", position:"relative",
      }}>
        {/* bg glow */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",
          background:`radial-gradient(ellipse 60% 50% at 60% 50%, ${th.colorDim} 0%, transparent 70%)`,
          transition:"background 0.7s ease",
        }} />
        {/* grid */}
        <div style={{
          position:"absolute",inset:0,pointerEvents:"none",
          backgroundImage:`linear-gradient(${th.colorGlow.replace("0.4","0.025")} 1px,transparent 1px),linear-gradient(90deg,${th.colorGlow.replace("0.4","0.025")} 1px,transparent 1px)`,
          backgroundSize:"60px 60px",
        }} />

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity:0, y:-20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
          style={{ position:"relative",zIndex:10,textAlign:"center",marginBottom:48 }}
        >
          <div style={{
            display:"inline-flex",alignItems:"center",gap:8,
            padding:"5px 14px",borderRadius:99,marginBottom:16,
            border:`1px solid ${th.colorGlow.replace("0.4","0.3")}`,
            background:th.colorDim,transition:"all 0.5s",
          }}>
            <div style={{
              width:6,height:6,borderRadius:"50%",background:th.color,
              boxShadow:`0 0 8px ${th.colorGlow}`,animation:"pulse 2s infinite",
            }} />
            <span style={{
              fontFamily:"monospace",fontSize:"0.52rem",fontWeight:800,
              letterSpacing:"0.2em",textTransform:"uppercase",
              color:th.colorText,transition:"color 0.5s",
            }}>Client Voices</span>
          </div>

          <h2 style={{
            fontSize:"clamp(1.8rem,3.5vw,2.8rem)",fontWeight:700,
            color:"rgba(255,255,255,0.93)",letterSpacing:"-0.035em",
            lineHeight:1.1,margin:"0 0 22px",
          }}>
            Words that{" "}
            <motion.em
              key={displayTheme}
              initial={{ color:"rgba(255,255,255,0.5)",textShadow:"none" }}
              animate={{ color:th.color,textShadow:`0 0 30px ${th.colorGlow}` }}
              transition={{ duration:0.7 }}
              style={{ fontStyle:"italic",fontWeight:700 }}
            >stay with us.</motion.em>
          </h2>

          {/* theme toggle */}
          <div style={{
            display:"inline-flex",borderRadius:99,
            border:"1px solid rgba(255,255,255,0.1)",
            background:"rgba(255,255,255,0.04)",padding:3,
          }}>
            {(["red","green"] as ThemeName[]).map((name) => {
              const tth = THEMES[name];
              const isActive = displayTheme === name;
              return (
                <button key={name} onClick={() => setForcedTheme(name)} style={{
                  display:"flex",alignItems:"center",gap:6,
                  padding:"5px 14px",borderRadius:99,border:"none",cursor:"pointer",
                  background:isActive ? tth.colorDim : "transparent",
                  boxShadow:isActive ? `0 0 12px ${tth.colorGlow.replace("0.4","0.18")}` : "none",
                  transition:"all 0.3s ease",
                }}>
                  <div style={{
                    width:7,height:7,borderRadius:"50%",background:tth.color,
                    boxShadow:isActive ? `0 0 8px ${tth.colorGlow}` : "none",
                    transition:"box-shadow 0.3s",
                  }} />
                  <span style={{
                    fontFamily:"monospace",fontSize:"0.5rem",fontWeight:800,
                    letterSpacing:"0.15em",textTransform:"uppercase",
                    color:isActive ? tth.colorText : "rgba(255,255,255,0.3)",
                    transition:"color 0.3s",
                  }}>{name === "red" ? "Premium" : "Growth"}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── ARENA ── */}
        <motion.div
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.18, duration:0.7, ease:[0.16,1,0.3,1] }}
          style={{
            position:"relative",zIndex:10,
            width:"100%",maxWidth:1200,
            height:Math.max(stackH, 520) + 20,
            overflow:"visible",
          }}
        >
          {/* ══════════════════════════════════════════
              LEFT STACK
              
              Each card gets:
              - layoutId="card-{t.id}"  → FLIP identity
              - animate: y/scale/rotate → stack geometry
              - transition: LAYOUT_SPRING → spring physics
              
              When a card leaves the stack to become center,
              Framer sees the same layoutId appear elsewhere
              and animates it there physically.
          ══════════════════════════════════════════ */}
          <div style={{
            position:"absolute",left:0,top:"50%",
            transform:"translateY(-50%)",
            width:STACK_W,height:stackH,
            overflow:"visible",zIndex:5,
          }}>
            {[...stackCards].reverse().map((t, ri) => {
              const depth  = (N - 1) - ri;
              const topY   = depth * PEEK;
              const scale  = Math.max(0.88, 1 - depth * 0.03);
              const rotate = ROTATIONS[depth % ROTATIONS.length] ?? 0;
              /*
                zIndex: shallowest card (depth=0) gets highest z.
                During the FLIP transition the animating card needs
                to travel above all others — Framer handles this
                automatically by lifting the layout-animating element.
              */
              const zIdx = N - depth;
              const sth  = THEMES[t.theme];

              return (
                <motion.div
                  key={t.id}
                  layoutId={`card-${t.id}`}   /* ← FLIP identity */
                  layout
                  /* Stack geometry — Framer animates FROM these values
                     when this card travels to center (and back). */
                  animate={{
                    y:      topY,
                    scale,
                    rotate,
                    opacity: Math.max(0.72, 1 - depth * 0.10),
                    zIndex:  zIdx,
                  }}
                  transition={LAYOUT_SPRING}
                  onClick={() => {
                    const gi = deck.findIndex((d) => d.id === t.id);
                    if (gi > 0) goTo(gi);
                  }}
                  whileHover={{
                    y: topY - 8,
                    transition:{ type:"spring", stiffness:400, damping:30 },
                  }}
                  style={{
                    position:"absolute",top:0,left:0,right:0,
                    height:STACK_CARD_H,cursor:"pointer",borderRadius:14,
                    background:"rgba(18,18,28,0.98)",
                    border:`1px solid ${sth.colorGlow.replace("0.4","0.30")}`,
                    boxShadow:"0 6px 24px rgba(0,0,0,0.65)",
                    transformOrigin:"top center",overflow:"hidden",
                    willChange:"transform",
                  }}
                >
                  {/* left accent bar */}
                  <div style={{
                    position:"absolute",left:0,top:0,bottom:0,width:4,
                    background:`linear-gradient(180deg,${sth.color},${sth.colorGlow.replace("0.4","0.25")})`,
                    opacity:depth===0?1:0.5,
                    boxShadow:depth===0?`2px 0 10px ${sth.colorGlow}`:"none",
                  }} />
                  <div style={{ display:"flex",alignItems:"center",height:"100%",paddingLeft:16,gap:12,paddingRight:16 }}>
                    <Image unoptimized
                      src={t.image} alt={t.name} width={38} height={38}
                      style={{ width:38,height:38,borderRadius:"50%",flexShrink:0,border:`2px solid ${sth.color}`,boxShadow:`0 0 10px ${sth.colorGlow}` }}
                    />
                    <div style={{ flex:1,minWidth:0 }}>
                      <p style={{
                        margin:0,fontWeight:700,
                        fontSize:depth===0?"0.8rem":"0.72rem",
                        color:depth===0?"rgba(255,255,255,0.92)":"rgba(255,255,255,0.65)",
                        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
                      }}>{t.name}</p>
                      <p style={{
                        margin:"3px 0 0",fontFamily:"monospace",
                        fontSize:"0.46rem",fontWeight:700,
                        letterSpacing:"0.1em",textTransform:"uppercase",
                        color:depth===0?sth.colorText:`${sth.colorText}80`,
                        whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",
                      }}>{t.company}</p>
                    </div>
                    <div style={{
                      width:8,height:8,borderRadius:"50%",flexShrink:0,
                      background:sth.color,opacity:depth===0?1:0.4,
                      boxShadow:depth===0?`0 0 10px ${sth.colorGlow}`:"none",
                    }} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* ══════════════════════════════════════════
              CENTER CARD
              
              Also carries layoutId="card-{active.id}".
              When deck rotates, this card's layoutId changes
              to match the new active card — but the card that
              WAS center (now heading to stack) keeps its own
              layoutId and Framer springs it to its new stack
              position automatically.
              
              No AnimatePresence. No manual x/y.
              The FLIP engine handles all position math.
          ══════════════════════════════════════════ */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            style={{
              position:"absolute",left:"50%",top:"50%",
              transform:"translate(-50%,-50%)",
              width:580,zIndex:20,
              display:"flex",flexDirection:"column",alignItems:"center",gap:18,
            }}
          >
            <motion.div
              key={active.id}              /* re-key so content swaps instantly */
              layoutId={`card-${active.id}`}  /* ← FLIP identity — same as stack */
              layout
              /* Center geometry — card animates FROM stack geometry TO these values */
              animate={{ scale:1, rotate:0, opacity:1, y:0 }}
              transition={LAYOUT_SPRING}
              style={{
                width:"100%",
                borderRadius:26,
                zIndex:30,
                willChange:"transform",
              }}
            >
              <TiltCard th={th}>
                {/* decorative quote mark */}
                <div aria-hidden style={{
                  position:"absolute",top:-10,left:32,
                  fontFamily:"'Georgia',serif",fontSize:"10rem",lineHeight:1,
                  color:th.color,opacity:0.07,
                  userSelect:"none",pointerEvents:"none",fontWeight:900,
                  transition:"color 0.5s",
                }}>&ldquo;</div>

                <div style={{ padding:"48px 52px 44px", display:"flex", flexDirection:"column", gap:24 }}>

                  {/* ── AUTHOR ROW ── */}
                  <div style={{ display:"flex", alignItems:"center", gap:18 }}>
                    <div style={{ position:"relative", flexShrink:0 }}>
                      <div style={{
                        position:"absolute",inset:-4,borderRadius:"50%",
                        background:th.gradient,opacity:0.55,
                      }} />
                      <div style={{
                        width:68,height:68,borderRadius:"50%",overflow:"hidden",
                        border:`2.5px solid ${th.color}`,
                        boxShadow:`0 0 28px ${th.colorGlow}, 0 0 0 5px ${th.colorDim}`,
                        position:"relative",
                        transition:"border-color 0.5s, box-shadow 0.5s",
                      }}>
                        <Image unoptimized
                          src={active.image} alt={`Portrait of ${active.name}`}
                          width={68} height={68}
                          style={{ width:"100%",height:"100%",objectFit:"cover" }}
                        />
                      </div>
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{
                        margin:0,fontWeight:800,fontSize:"1.22rem",
                        color:"#ffffff",letterSpacing:"-0.025em",
                        textShadow:"0 0 20px rgba(255,255,255,0.15)",
                      }}>{active.name}</p>
                      <p style={{
                        margin:"6px 0 0",fontFamily:"monospace",
                        fontSize:"0.62rem",fontWeight:700,
                        letterSpacing:"0.14em",textTransform:"uppercase",
                        color:th.colorText,
                        textShadow:`0 0 12px ${th.colorGlow}`,
                        transition:"color 0.5s",
                      }}>{active.role}&nbsp;&middot;&nbsp;{active.company}</p>
                    </div>
                    <RatingBars rating={active.rating} th={th} />
                  </div>

                  {/* ── DIVIDER ── */}
                  <div style={{
                    height:1,
                    background:`linear-gradient(90deg,${th.colorGlow.replace("0.4","0.6")},transparent)`,
                    transition:"background 0.5s",
                  }} />

                  {/* ── QUOTE ── */}
                  <blockquote style={{
                    margin:0,fontStyle:"italic",
                    fontSize:"1.18rem",
                    color:"rgba(255,255,255,0.95)",
                    lineHeight:1.85,letterSpacing:"-0.012em",
                    textShadow:"0 1px 8px rgba(0,0,0,0.6)",
                  }}>&ldquo;{active.quote}&rdquo;</blockquote>

                  {/* ── FOOTER ── */}
                  <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:4 }}>
                    <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                      <div style={{
                        width:7,height:7,borderRadius:"50%",
                        background:th.color,boxShadow:`0 0 10px ${th.colorGlow}`,
                        transition:"background 0.5s,box-shadow 0.5s",
                      }} />
                      <span style={{
                        fontFamily:"monospace",fontSize:"0.5rem",fontWeight:800,
                        letterSpacing:"0.2em",textTransform:"uppercase",
                        color:"rgba(255,255,255,0.45)",
                      }}>Verified Client</span>
                    </div>
                    <div style={{
                      display:"flex",alignItems:"center",gap:6,
                      padding:"5px 14px",borderRadius:99,
                      background:th.colorDim,
                      border:`1px solid ${th.colorGlow.replace("0.4","0.35")}`,
                      transition:"all 0.5s",
                    }}>
                      <div style={{ width:6,height:6,borderRadius:"50%",background:th.color }} />
                      <span style={{
                        fontFamily:"monospace",fontSize:"0.5rem",fontWeight:800,
                        letterSpacing:"0.14em",textTransform:"uppercase",
                        color:th.colorText,
                        textShadow:`0 0 10px ${th.colorGlow}`,
                        transition:"color 0.5s",
                      }}>{active.theme==="red"?"Premium":"Growth"}</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            {/* Timer bar */}
            <div style={{ width:"100%",height:2,borderRadius:99,background:"rgba(255,255,255,0.06)",overflow:"hidden" }}>
              <motion.div
                key={active.id+(paused?"p":"r")}
                initial={{ width:"0%" }}
                animate={{ width:paused?undefined:"100%" }}
                transition={{ duration:paused?0:CARD_MS/1000, ease:"linear" }}
                style={{
                  height:"100%",background:th.color,
                  boxShadow:`0 0 8px ${th.colorGlow}`,borderRadius:99,
                  transition:"background 0.5s,box-shadow 0.5s",
                }}
              />
            </div>

            {/* Controls row */}
            <div style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              {/* nav buttons */}
              <div style={{ display:"flex",gap:8 }}>
                {(["prev","next"] as Direction[]).map((dir) => (
                  <motion.button
                    key={dir}
                    onClick={dir==="prev"?goPrev:goNext}
                    whileHover={{ scale:1.12,background:th.colorDim }}
                    whileTap={{ scale:0.88 }}
                    transition={{ type:"spring",stiffness:380,damping:26 }}
                    style={{
                      width:36,height:36,borderRadius:"50%",
                      border:`1px solid ${th.colorGlow.replace("0.4","0.28")}`,
                      background:"rgba(255,255,255,0.04)",
                      color:th.colorText,fontSize:"1rem",cursor:"pointer",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      transition:"border-color 0.5s,color 0.5s",
                    }}
                  >{dir==="prev"?"←":"→"}</motion.button>
                ))}
              </div>

              {/* progress dots */}
              <div style={{ display:"flex",gap:6,alignItems:"center" }}>
                {deck.map((t,i) => (
                  <button key={t.id} onClick={() => goTo(i)} aria-label={`Go to ${t.name}`} style={{
                    width:i===0?26:6,height:6,borderRadius:99,padding:0,
                    background:i===0?th.color:"rgba(255,255,255,0.15)",
                    border:"none",cursor:"pointer",
                    boxShadow:i===0?`0 0 10px ${th.colorGlow}`:"none",
                    transition:"width 0.4s ease,background 0.3s,box-shadow 0.3s",
                  }} />
                ))}
              </div>

              {/* counter pill */}
              <div style={{
                display:"flex",alignItems:"center",gap:4,
                padding:"5px 12px",borderRadius:99,
                background:th.colorDim,
                border:`1px solid ${th.colorGlow.replace("0.4","0.35")}`,
                boxShadow:`0 0 18px ${th.colorGlow.replace("0.4","0.18")}`,
                transition:"all 0.5s",
              }}>
                <motion.span
                  key={activeIdx}
                  initial={{ opacity:0,y:-6 }}
                  animate={{ opacity:1,y:0 }}
                  transition={{ duration:0.28 }}
                  style={{
                    fontFamily:"monospace",fontSize:"0.85rem",fontWeight:900,
                    color:th.color,
                    textShadow:`0 0 14px ${th.colorGlow},0 0 4px ${th.color}`,
                    transition:"color 0.5s,text-shadow 0.5s",
                  }}
                >{activeIdx+1}</motion.span>
                <span style={{ fontFamily:"monospace",fontSize:"0.7rem",color:"rgba(255,255,255,0.28)" }}>/</span>
                <span style={{ fontFamily:"monospace",fontSize:"0.75rem",fontWeight:700,color:"rgba(255,255,255,0.5)" }}>{total}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <style>{`
          @keyframes pulse {
            0%,100%{opacity:0.3;transform:scale(0.9)}
            50%{opacity:1;transform:scale(1.1)}
          }
        `}</style>
      </div>
    </LayoutGroup>
  );
}