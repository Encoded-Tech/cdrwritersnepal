"use client";

/* ─── HeroBackground.tsx ───────────────────────────────────────────────
   All background visual layers:
     • Parallax orbs
     • Floating sparks (rising embers)
     • Shooting stars
     • Noise texture overlay
     • Engineering grid
     • Rotating decorative SVG circle
──────────────────────────────────────────────────────────────────────── */

import { motion, MotionValue } from "framer-motion";
import { SHOOTING_STARS, SPARKS } from "./constants";


/* ── Orb ── */
interface OrbProps { size: number; top: string; left: string; color: string; delay: number; }

function Orb({ size, top, left, color, delay }: OrbProps) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size, top, left,
        background: `radial-gradient(circle at 40% 40%, ${color}, transparent 70%)`,
        filter: "blur(40px)",
      }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ── Floating spark (rising ember) ── */
interface SparkProps { x: number; delay: number; dur: number; size: number; }

function Spark({ x, delay, dur, size }: SparkProps) {
  return (
    <motion.div
      style={{
        position: "absolute", bottom: -10, left: `${x}%`,
        width: size, height: size, borderRadius: "50%",
        background: "rgba(200,16,46,0.6)",
        boxShadow: "0 0 6px 2px rgba(200,16,46,0.25)",
        pointerEvents: "none",
      }}
      animate={{ y: [0, -700], opacity: [0, 0.75, 0], scale: [1, 0.3] }}
      transition={{ duration: dur, delay, repeat: Infinity, ease: "easeOut" }}
    />
  );
}

/* ── Shooting star ── */
interface ShootingStarProps { top: string; delay: number; dur: number; }

function ShootingStar({ top, delay, dur }: ShootingStarProps) {
  return (
    <motion.div
      style={{
        position: "absolute", top, left: "-5%",
        width: 100, height: 1.5, borderRadius: 99,
        background: "linear-gradient(90deg, transparent, rgba(200,16,46,0.65), rgba(255,255,255,0.4), transparent)",
        pointerEvents: "none",
      }}
      animate={{ x: ["0vw", "115vw"], opacity: [0, 1, 1, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
    />
  );
}

/* ── Main export ── */
interface HeroBackgroundProps { bgY: MotionValue<number>; }

export function HeroBackground({ bgY }: HeroBackgroundProps) {
  return (
    <>
      {/* Parallax orb layer */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <Orb size={600} top="-10%" left="-8%"  color="rgba(200,16,46,0.5)"  delay={0} />
        <Orb size={500} top="30%"  left="60%"  color="rgba(26,122,74,0.35)" delay={2} />
        <Orb size={400} top="65%"  left="10%"  color="rgba(200,16,46,0.25)" delay={4} />
        <Orb size={300} top="-5%"  left="70%"  color="rgba(255,200,0,0.1)"  delay={1} />
      </motion.div>

      {/* Sparks + shooting stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {SPARKS.map((s, i) => <Spark key={i} {...s} />)}
        {SHOOTING_STARS.map((s, i) => <ShootingStar key={i} {...s} />)}
      </div>

      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Engineering grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Rotating decorative circle — desktop only */}
      <div className="absolute right-[-120px] top-1/2 -translate-y-1/2 pointer-events-none hidden lg:block">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}>
          <svg width="520" height="520" viewBox="0 0 520 520" fill="none" opacity="0.07">
            <circle cx="260" cy="260" r="250" stroke="white" strokeWidth="1"/>
            <circle cx="260" cy="260" r="180" stroke="white" strokeWidth="0.5"/>
            <circle cx="260" cy="260" r="110" stroke="white" strokeWidth="1"/>
            <circle cx="260" cy="260" r="40"  stroke="white" strokeWidth="2"/>
            <line x1="10"  y1="260" x2="510" y2="260" stroke="white" strokeWidth="0.5"/>
            <line x1="260" y1="10"  x2="260" y2="510" stroke="white" strokeWidth="0.5"/>
            <line x1="82"  y1="82"  x2="438" y2="438" stroke="white" strokeWidth="0.5"/>
            <line x1="438" y1="82"  x2="82"  y2="438" stroke="white" strokeWidth="0.5"/>
            <circle cx="260" cy="10"  r="4" fill="white"/>
            <circle cx="260" cy="510" r="4" fill="white"/>
            <circle cx="10"  cy="260" r="4" fill="white"/>
            <circle cx="510" cy="260" r="4" fill="white"/>
          </svg>
        </motion.div>
      </div>
    </>
  );
}