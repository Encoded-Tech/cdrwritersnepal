"use client";

/**
 * AboutPage — Ultra-Premium About Us Component
 *
 * Sections:
 *  1. Hero          — parallax background, headline, breadcrumb
 *  2. Story         — two-column editorial narrative
 *  3. Stats         — animated scroll-triggered counters
 *  4. Services      — staggered hover cards
 *  5. Team          — member photos with social hover overlay
 *  6. Trusted By    — client logo grid
 *  7. CTA           — conversion prompt with micro-interaction
 *
 * Stack: Next.js App Router · Tailwind CSS · Framer Motion
 */

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,

  type Variants,
} from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   CONSTANTS & SHARED TOKENS
═══════════════════════════════════════════════════════════════ */

const EASE = [0.22, 1, 0.36, 1] as const;
const SPRING = { type: "spring", stiffness: 240, damping: 22 } as const;

/** Reusable stagger container */
const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/** Generic fade-up item */
const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.52, ease: EASE },
  },
};

/* ═══════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════ */

const STATS = [
  { value: 500, suffix: "+", label: "Engineers Assessed" },
  { value: 4,   suffix: "+", label: "Years of Expertise" },
  { value: 480, suffix: "+", label: "Successful Projects" },
  { value: 100, suffix: "%", label: "Positive Outcomes" },
];

const SERVICES = [
  {
    title: "Our Expertise",
    desc: "Tailored CDR writing, review, and consultation services for engineers worldwide. Every report built to meet Engineers Australia's exact standards.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Why Choose Us",
    desc: "Quality and precision, not volume. Each CDR is custom-built to reflect your unique competencies — giving your skilled migration application a decisive edge.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Global Reach",
    desc: "Engineers from 30+ countries trust us to reframe their international experience within the ANZSCO framework — accurately, and without misrepresentation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const TEAM = [
  { name: "Anil Sharma", role: "Lead CDR Consultant", img: "/team/anil.jpg" },
  { name: "Priya Joshi",  role: "Senior Technical Writer", img: "/team/priya.jpg" },
  { name: "Rajesh KC",   role: "EA Compliance Specialist", img: "/team/rajesh.jpg" },
];

const LOGOS = [
  "Engineers Australia",
  "ANZSCO",
  "Migration Alliance",
  "IEAust",
  "EA Skills",
  "CDR Pro",
];

/* ═══════════════════════════════════════════════════════════════
   HOOK — animated counter
═══════════════════════════════════════════════════════════════ */
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return count;
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 1 — HERO
═══════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Subtle parallax: image moves slower than scroll
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "clamp(280px, 45vw, 420px)",
        overflow: "hidden",
        background: "#18140e",
      }}
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY, position: "absolute", inset: "-20%", zIndex: 0 }}
      >
        <Image
          src="/herobanner.png"
          alt="About CDR Writers Nepal"
          fill
          priority
          className="object-cover"
          style={{ opacity: 0.45 }}
        />
      </motion.div>

      {/* Grain overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Gradient vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(24,20,14,0.85) 0%, rgba(24,20,14,0.3) 50%, rgba(24,20,14,0.5) 100%)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity, position: "relative", zIndex: 3 }}
        className="h-full flex flex-col items-center justify-center text-center px-4"
      >
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 20,
            fontSize: "0.72rem",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <Link href="/" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}
            className="hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "rgba(255,255,255,0.75)" }}>About Us</span>
        </motion.nav>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 5vw, 3.6rem)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.03em",
            lineHeight: 1.08,
            maxWidth: 680,
          }}
        >
          About{" "}
          <em style={{ color: "var(--red)", fontStyle: "italic" }}>
            CDR Writers Nepal
          </em>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
          style={{
            marginTop: 14,
            fontSize: "0.88rem",
            color: "rgba(255,255,255,0.5)",
            letterSpacing: "0.02em",
            maxWidth: 420,
            lineHeight: 1.7,
          }}
        >
          Nepal&apos;s most trusted CDR advisory — helping engineers migrate
          to Australia since 2020.
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 2 — COMPANY STORY
═══════════════════════════════════════════════════════════════ */
function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4"
      style={{ background: "#fff" }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

        {/* Left — editorial text */}
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {/* Eyebrow */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <div style={{ width: 22, height: 1.5, background: "var(--red)", opacity: 0.5, borderRadius: 1 }} />
            <span style={{
              fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.22em",
              textTransform: "uppercase" as const, color: "var(--red)", opacity: 0.75,
            }}>
              Our Story
            </span>
          </div>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
              fontWeight: 700,
              color: "#18140e",
              letterSpacing: "-0.025em",
              lineHeight: 1.12,
              marginBottom: "1.25rem",
            }}
          >
            Built on a single promise:{" "}
            <em style={{ color: "var(--red)", fontStyle: "italic" }}>
              no engineer left behind.
            </em>
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              "Welcome to CDR Writers Nepal — Nepal's dedicated CDR advisory firm. We specialize in helping engineers prepare Competency Demonstration Reports (CDR) for skilled migration to Australia through Engineers Australia.",
              "Founded in 2020, we've spent four years refining our process. Every CDR we produce is written by qualified engineers who understand not just the language, but the precise competency framework EA assessors use.",
              "We don't chase volume. We chase outcomes. That's why 100% of our first-attempt submissions have received positive assessments.",
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: EASE, delay: 0.1 + i * 0.08 }}
                style={{
                  fontSize: "0.92rem",
                  color: "#5c5750",
                  lineHeight: 1.84,
                }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Right — image with floating badge */}
        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE, delay: 0.1 }}
          style={{ position: "relative" }}
        >
          <div
            style={{
              position: "absolute",
              inset: -12,
              borderRadius: 24,
              background: "rgba(180,30,30,0.04)",
            }}
          />
          <Image
            src="/cdrwritersnepal.jpg"
            alt="CDR Writers Nepal team"
            width={580}
            height={420}
            className="w-full object-cover rounded-2xl"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)", position: "relative" }}
          />
          {/* Floating badge */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              bottom: -18,
              left: -18,
              background: "#fff",
              borderRadius: 14,
              boxShadow: "0 8px 32px rgba(0,0,0,0.11)",
              border: "1px solid rgba(0,0,0,0.06)",
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              zIndex: 2,
            }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 9,
              background: "rgba(180,30,30,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: "0.65rem", color: "#aaa", fontWeight: 500, marginBottom: 2 }}>
                Established
              </div>
              <div style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem", fontWeight: 700,
                color: "var(--red)", letterSpacing: "-0.02em", lineHeight: 1,
              }}>
                Since 2020
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 3 — STATS
═══════════════════════════════════════════════════════════════ */
function StatCell({
  stat,
  index,
  active,
}: {
  stat: (typeof STATS)[number];
  index: number;
  active: boolean;
}) {
  const count = useCountUp(stat.value, 1700, active);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={active ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: EASE, delay: index * 0.1 }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "28px 24px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        textAlign: "center" as const,
      }}
    >
      <div style={{
        fontFamily: "var(--font-serif)",
        fontSize: "clamp(2.2rem, 4vw, 3rem)",
        fontWeight: 700,
        color: "#fff",
        letterSpacing: "-0.035em",
        lineHeight: 1,
      }}>
        {count}
        <span style={{ color: "var(--red)" }}>{stat.suffix}</span>
      </div>
      <div style={{
        fontSize: "0.75rem",
        color: "rgba(255,255,255,0.45)",
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase" as const,
      }}>
        {stat.label}
      </div>
    </motion.div>
  );
}

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-24 px-4"
      style={{
        background: "#18140e",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(180,30,30,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="max-w-5xl mx-auto" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="text-center mb-12">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 18, height: 1.5, background: "var(--red)", opacity: 0.5, borderRadius: 1 }} />
            <span style={{
              fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.22em",
              textTransform: "uppercase" as const, color: "var(--red)", opacity: 0.75,
            }}>Our Impact</span>
            <div style={{ width: 18, height: 1.5, background: "var(--red)", opacity: 0.5, borderRadius: 1 }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
            fontWeight: 700, color: "#f0ece4",
            letterSpacing: "-0.024em", lineHeight: 1.12,
          }}>
            Numbers that{" "}
            <em style={{ color: "var(--red)", fontStyle: "italic" }}>tell the story</em>
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {STATS.map((s, i) => (
            <StatCell key={s.label} stat={s} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 4 — SERVICES CARDS
═══════════════════════════════════════════════════════════════ */
function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4"
      style={{ background: "#f9f8f6" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 18, height: 1.5, background: "var(--red)", opacity: 0.5, borderRadius: 1 }} />
            <span style={{
              fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.22em",
              textTransform: "uppercase" as const, color: "var(--red)", opacity: 0.75,
            }}>What We Do</span>
            <div style={{ width: 18, height: 1.5, background: "var(--red)", opacity: 0.5, borderRadius: 1 }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
            fontWeight: 700, color: "#18140e",
            letterSpacing: "-0.024em", lineHeight: 1.12,
          }}>
            Expertise built for{" "}
            <em style={{ color: "var(--red)", fontStyle: "italic" }}>your success</em>
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.title} svc={svc} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ svc }: { svc: (typeof SERVICES)[number] }) {
  return (
    <motion.div
      variants={fadeUpItem}
      whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.09)" }}
      transition={{ duration: 0.3, ease: EASE }}
      style={{
        background: "#fff",
        border: "1px solid rgba(0,0,0,0.06)",
        borderRadius: 16,
        padding: "32px 28px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: "var(--red)", opacity: 0.6,
      }} />

      {/* Icon */}
      <div style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: 44, height: 44, borderRadius: 11,
        background: "rgba(180,30,30,0.07)", color: "var(--red)",
        marginBottom: 18,
      }}>
        {svc.icon}
      </div>

      <h3 style={{
        fontFamily: "var(--font-serif)",
        fontSize: "1.08rem", fontWeight: 700,
        color: "#18140e", letterSpacing: "-0.015em",
        lineHeight: 1.28, marginBottom: 10,
      }}>
        {svc.title}
      </h3>

      <p style={{
        fontSize: "0.83rem", color: "#7a7470", lineHeight: 1.78,
      }}>
        {svc.desc}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 5 — TEAM
═══════════════════════════════════════════════════════════════ */
function TeamSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4"
      style={{ background: "#fff" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{ width: 18, height: 1.5, background: "var(--red)", opacity: 0.5, borderRadius: 1 }} />
            <span style={{
              fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.22em",
              textTransform: "uppercase" as const, color: "var(--red)", opacity: 0.75,
            }}>The Team</span>
            <div style={{ width: 18, height: 1.5, background: "var(--red)", opacity: 0.5, borderRadius: 1 }} />
          </div>
          <h2 style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 3.2vw, 2.5rem)",
            fontWeight: 700, color: "#18140e",
            letterSpacing: "-0.024em", lineHeight: 1.12,
          }}>
            The people behind your{" "}
            <em style={{ color: "var(--red)", fontStyle: "italic" }}>approval</em>
          </h2>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
            justifyItems: "center",
          }}
        >
          {TEAM.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: (typeof TEAM)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeUpItem}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        maxWidth: 300,
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        border: "1px solid rgba(0,0,0,0.06)",
        cursor: "default",
      }}
    >
      {/* Photo */}
      <div style={{ position: "relative", paddingTop: "120%", background: "#f0ece4" }}>
        <Image
          src={member.img}
          alt={member.name}
          fill
          className="object-cover"
          style={{ transition: "transform 0.5s ease", transform: hovered ? "scale(1.04)" : "scale(1)" }}
        />
        {/* Hover overlay */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          style={{
            position: "absolute", inset: 0,
            background: "rgba(24,20,14,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div style={{ display: "flex", gap: 14 }}>
            {/* LinkedIn placeholder */}
            <motion.a
              href="#"
              animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.28, ease: EASE, delay: 0.05 }}
              style={{
                width: 36, height: 36, borderRadius: 9,
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", textDecoration: "none",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <div style={{ padding: "16px 18px 18px", background: "#fff" }}>
        <div style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1rem", fontWeight: 700,
          color: "#18140e", letterSpacing: "-0.012em",
          marginBottom: 4,
        }}>
          {member.name}
        </div>
        <div style={{
          fontSize: "0.72rem", color: "var(--red)",
          fontWeight: 600, letterSpacing: "0.04em",
          textTransform: "uppercase" as const, opacity: 0.8,
        }}>
          {member.role}
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 6 — TRUSTED BY
═══════════════════════════════════════════════════════════════ */
function TrustedBySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-20 px-4"
      style={{ background: "#f9f8f6", borderTop: "1px solid rgba(0,0,0,0.05)" }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            textAlign: "center",
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: "#b8b2aa",
            marginBottom: 28,
          }}
        >
          Aligned with & trusted by
        </motion.p>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "flex",
            flexWrap: "wrap" as const,
            justifyContent: "center",
            gap: 10,
          }}
        >
          {LOGOS.map((logo) => (
            <motion.div
              key={logo}
              variants={fadeUpItem}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.08)",
                background: "#fff",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#7a7470",
                letterSpacing: "0.03em",
                whiteSpace: "nowrap" as const,
              }}
            >
              {logo}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   SECTION 7 — CTA
═══════════════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 px-4"
      style={{ background: "#18140e", position: "relative", overflow: "hidden" }}
    >
      {/* Ambient */}
      <div aria-hidden style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 400, borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(180,30,30,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-2xl mx-auto text-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.div variants={fadeUpItem}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 20 }}
        >
          <div style={{ width: 18, height: 1.5, background: "var(--red)", opacity: 0.5, borderRadius: 1 }} />
          <span style={{
            fontSize: "0.64rem", fontWeight: 700, letterSpacing: "0.22em",
            textTransform: "uppercase" as const, color: "var(--red)", opacity: 0.75,
          }}>Get Started</span>
          <div style={{ width: 18, height: 1.5, background: "var(--red)", opacity: 0.5, borderRadius: 1 }} />
        </motion.div>

        <motion.h2
          variants={fadeUpItem}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
            fontWeight: 700, color: "#f0ece4",
            letterSpacing: "-0.026em", lineHeight: 1.1,
            marginBottom: "1rem",
          }}
        >
          Ready to start your{" "}
          <em style={{ color: "var(--red)", fontStyle: "italic" }}>CDR journey?</em>
        </motion.h2>

        <motion.p
          variants={fadeUpItem}
          style={{
            fontSize: "0.9rem", color: "rgba(240,236,228,0.5)",
            lineHeight: 1.78, maxWidth: 420, margin: "0 auto 2rem",
          }}
        >
          Book a free consultation. We&apos;ll review your background, assess
          your eligibility, and outline exactly what your CDR needs.
        </motion.p>

        <motion.div
          variants={fadeUpItem}
          style={{ display: "flex", flexWrap: "wrap" as const, gap: 12, justifyContent: "center" }}
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "tween", duration: 0.2, ease: EASE }}
              style={{
                background: "var(--red)", color: "#fff",
                border: "1.5px solid var(--red)",
                padding: "13px 30px", borderRadius: 11,
                fontSize: "0.875rem", fontWeight: 700,
                cursor: "pointer", letterSpacing: "0.01em",
                boxShadow: "0 4px 20px rgba(180,30,30,0.3)",
              }}
            >
              Book Free Consultation
            </motion.button>
          </Link>
          <Link href="/services">
            <motion.button
              whileHover={{ y: -2, borderColor: "rgba(240,236,228,0.4)" }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "tween", duration: 0.2, ease: EASE }}
              style={{
                background: "transparent", color: "rgba(240,236,228,0.65)",
                border: "1.5px solid rgba(255,255,255,0.12)",
                padding: "13px 30px", borderRadius: 11,
                fontSize: "0.875rem", fontWeight: 600,
                cursor: "pointer", letterSpacing: "0.01em",
                transition: "border-color 0.25s, color 0.25s",
              }}
            >
              Explore Services
            </motion.button>
          </Link>
        </motion.div>

        <motion.p
          variants={fadeUpItem}
          style={{
            marginTop: 18,
            fontSize: "0.7rem", color: "rgba(180,30,30,0.7)",
            fontWeight: 500, letterSpacing: "0.03em",
          }}
        >
          ↳ Limited consultation slots available this week.
        </motion.p>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE EXPORT
═══════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <StorySection />
      <StatsSection />
      <ServicesSection />
      <TeamSection />
      <TrustedBySection />
      <CTASection />
    </main>
  );
}