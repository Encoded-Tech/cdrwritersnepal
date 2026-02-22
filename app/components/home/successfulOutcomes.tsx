"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
interface Outcome {
  id: number;
  title: string;
  subtitle: string;
  label: string;
  image: string;
  aspect: "wide" | "tall" | "square";
}

const OUTCOMES: Outcome[] = [
  {
    id: 1,
    title: "Structural Engineer",
    subtitle: "EA Recognition — Civil Engineering",
    label: "Featured",
    image: "/outcome1.png",
    aspect: "wide",
  },
  {
    id: 2,
    title: "Mechanical Engineer",
    subtitle: "EA Recognition — Mechanical",
    label: "Approved",
    image: "/positive outcome.pdf.png",
    aspect: "square",
  },
  {
    id: 3,
    title: "Software Engineer",
    subtitle: "ACS Skills Assessment — ICT",
    label: "Approved",
    image: "/success1.png",
    aspect: "square",
  },
  {
    id: 4,
    title: "Civil Engineer",
    subtitle: "EA Recognition — Civil",
    label: "Featured",
    image: "/success2.png",
    aspect: "wide",
  },
  {
    id: 5,
    title: "Electrical Engineer",
    subtitle: "EA Recognition — Electrical",
    label: "Approved",
    image: "/success3.png",
    aspect: "square",
  },
  {
    id: 6,
    title: "Environmental Engineer",
    subtitle: "EA Recognition — Environmental",
    label: "Approved",
    image: "/success4.png",
    aspect: "square",
  },
];

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const EASE_OUT: [number, number, number, number] = [0.0, 0.0, 0.2, 1];
const SPRING_LIGHTBOX = { type: "spring" as const, stiffness: 260, damping: 26 };

/* ─────────────────────────────────────────────
   VARIANTS
───────────────────────────────────────────── */
const sectionContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 } satisfies Transition,
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: EASE } satisfies Transition,
  },
};

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE } satisfies Transition,
  },
};

/* ─────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────── */
interface CounterProps {
  target: number;
  suffix?: string;
  inView: boolean;
}

function AnimatedCounter({ target, suffix = "", inView }: CounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const increment = target / 40;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplay(target);
        clearInterval(interval);
      } else {
        setDisplay(Math.floor(current));
      }
    }, 28);
    return () => clearInterval(interval);
  }, [inView, target]);

  return <span>{display}{suffix}</span>;
}

/* ─────────────────────────────────────────────
   IMAGE CARD
───────────────────────────────────────────── */
interface ImageCardProps {
  outcome: Outcome;
  onOpen: (outcome: Outcome) => void;
  height?: string;
  priority?: boolean;
}

function ImageCard({ outcome, onOpen, height = "h-64", priority = false }: ImageCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover="hover"
      initial="rest"
      animate="rest"
      onClick={() => onOpen(outcome)}
      style={{
        cursor: "pointer",
        position: "relative",
        borderRadius: 16,
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
      className={`group ${height}`}
    >
      {/* Zooming image */}
      <motion.div
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.04, transition: { duration: 0.55, ease: EASE } satisfies Transition },
        }}
        style={{ position: "absolute", inset: 0 }}
      >
        <Image
          src={outcome.image}
          alt={outcome.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
          style={{ objectFit: "cover" }}
        />
      </motion.div>

      {/* Vignette */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(10,8,6,0.55) 0%, rgba(10,8,6,0.06) 50%, transparent 75%)",
          zIndex: 1,
        }}
      />

      {/* Hover overlay */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1, transition: { duration: 0.3 } satisfies Transition },
        }}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(10,8,6,0.2)",
          backdropFilter: "blur(1px)",
          zIndex: 2,
        }}
      />

      {/* Top label */}
      <div style={{ position: "absolute", top: 14, left: 14, zIndex: 3 }}>
        <span style={{
          fontSize: "0.55rem",
          fontWeight: 800,
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          color: "rgba(255,255,255,0.85)",
          fontFamily: "monospace",
        }}>
          {outcome.label}
        </span>
      </div>

      {/* Bottom content */}
      <motion.div
        variants={{
          rest: { y: 4, opacity: 0.85 },
          hover: { y: 0, opacity: 1, transition: { duration: 0.35, ease: EASE } satisfies Transition },
        }}
        style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 18px 18px", zIndex: 3 }}
      >
        <p style={{
          fontFamily: "monospace",
          fontSize: "0.56rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: "rgba(255,255,255,0.6)",
          marginBottom: 4,
        }}>
          {outcome.subtitle}
        </p>
        <h3 style={{
          fontFamily: "'Georgia', 'Times New Roman', serif",
          fontSize: "1rem",
          fontWeight: 700,
          color: "#fff",
          letterSpacing: "-0.015em",
          lineHeight: 1.2,
          marginBottom: 10,
        }}>
          {outcome.title}
        </h3>

        <motion.div
          variants={{
            rest: { opacity: 0, x: -6 },
            hover: { opacity: 1, x: 0, transition: { duration: 0.3, delay: 0.05 } satisfies Transition },
          }}
          style={{ display: "inline-flex", alignItems: "center", gap: 5 }}
        >
          <span style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
            color: "rgba(255,255,255,0.9)",
            fontFamily: "monospace",
          }}>
            View Outcome
          </span>
          <motion.span
            variants={{
              rest: { x: 0 },
              hover: { x: 3, transition: { duration: 0.25 } satisfies Transition },
            }}
            style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.75rem" }}
          >
            →
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Shadow bloom */}
      <motion.div
        variants={{
          rest: { opacity: 0, scale: 0.95 },
          hover: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: EASE } satisfies Transition },
        }}
        style={{
          position: "absolute",
          inset: -1,
          borderRadius: 17,
          boxShadow: "0 24px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.1)",
          pointerEvents: "none",
          zIndex: 4,
        }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   LIGHTBOX — THE FIX
   
   Root cause of image not showing:
   Next.js <Image fill> requires its *direct* parent
   to have position:relative AND an explicit pixel
   height (percentage heights don't propagate from
   flex children). We use a plain <img> tag here
   instead — the lightbox is decorative presentation,
   not an LCP candidate, so next/image's benefits
   don't apply. This guarantees the image renders.
   
   Layout: position:fixed inset:0 → true fullscreen.
   Image sits as a max-w/max-h constrained <img>.
───────────────────────────────────────────── */
interface LightboxProps {
  outcome: Outcome | null;
  onClose: () => void;
}

function Lightbox({ outcome, onClose }: LightboxProps) {
  useEffect(() => {
    if (!outcome) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [outcome, onClose]);

  return (
    <AnimatePresence>
      {outcome && (
        <>
          {/* Backdrop */}
          <motion.div
            key="lb-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT } satisfies Transition}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(4,3,2,0.94)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              zIndex: 9998,
            }}
          />

          {/* Fullscreen wrapper — clicking the dark area around the image closes */}
          <motion.div
            key="lb-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 } satisfies Transition}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "60px 24px 80px",
              boxSizing: "border-box",
            }}
          >
            {/* Image — stop propagation so clicking it doesn't close */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ ...SPRING_LIGHTBOX } satisfies Transition}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={outcome.image}
                alt={outcome.title}
                style={{
                  display: "block",
                  maxWidth: "min(95vw, 1400px)",
                  maxHeight: "calc(100vh - 140px)",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: 8,
                  // Subtle shadow so image pops from dark backdrop
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
                }}
              />
            </motion.div>

            {/* Caption — slides up below image */}
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.18, duration: 0.4, ease: EASE } satisfies Transition}
              style={{
                marginTop: 18,
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <span style={{
                fontFamily: "monospace",
                fontSize: "0.58rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                color: "rgba(255,255,255,0.3)",
              }}>
                {outcome.subtitle}
              </span>
              <span style={{
                width: 3, height: 3,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.18)",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'Georgia', 'Times New Roman', serif",
                fontSize: "0.92rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.75)",
                letterSpacing: "-0.015em",
              }}>
                {outcome.title}
              </span>
            </motion.div>
          </motion.div>

          {/* Close button */}
          <motion.button
            key="lb-close"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ delay: 0.08, duration: 0.22 } satisfies Transition}
            whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.18)" }}
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "fixed",
              top: 18,
              right: 18,
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.14)",
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.25rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000,
              lineHeight: 1,
            }}
          >
            ×
          </motion.button>

          {/* ESC hint */}
          <motion.p
            key="lb-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.35, duration: 0.4 } satisfies Transition}
            style={{
              position: "fixed",
              bottom: 18,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "monospace",
              fontSize: "0.55rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase" as const,
              color: "rgba(255,255,255,0.22)",
              zIndex: 10000,
              pointerEvents: "none",
              whiteSpace: "nowrap",
            }}
          >
            ESC or click outside to close
          </motion.p>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   SEE MORE BUTTON — red on hover
───────────────────────────────────────────── */
function SeeMoreButton() {
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
      href="/successful-outcomes"
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
      {/* Red ink fill */}
      <motion.span
        aria-hidden
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE } satisfies Transition}
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
        animate={{ color: hovered ? "#ffffff" : "#18140e" }}
        transition={{ duration: 0.28 } satisfies Transition}
        style={{ position: "relative", zIndex: 1 }}
      >
        See All Outcomes
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
   STAT PILL
───────────────────────────────────────────── */
interface StatPillProps {
  count: number;
  label: string;
  suffix?: string;
  inView: boolean;
}

function StatPill({ count, label, suffix = "+", inView }: StatPillProps) {
  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 16px 8px 12px",
      borderRadius: 100,
      background: "rgba(180,30,30,0.05)",
      border: "1px solid rgba(180,30,30,0.12)",
    }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#b41e1e", opacity: 0.7, flexShrink: 0 }} />
      <span style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "0.88rem", fontWeight: 700, color: "#b41e1e" }}>
        <AnimatedCounter target={count} suffix={suffix} inView={inView} />
      </span>
      <span style={{ fontFamily: "monospace", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#8a847c" }}>
        {label}
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function SuccessfulOutcomes() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const headerInView = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-8% 0px" });
  const [activeOutcome, setActiveOutcome] = useState<Outcome | null>(null);

  const handleOpen = useCallback((outcome: Outcome) => setActiveOutcome(outcome), []);
  const handleClose = useCallback(() => setActiveOutcome(null), []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const featuredY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const featured = OUTCOMES[0];
  const supporting = OUTCOMES.slice(1, 3);
  const extraRow = OUTCOMES.slice(3, 6);

  return (
    <>
      <section
        ref={sectionRef}
        style={{ position: "relative", overflow: "hidden", background: "#f9f8f6", padding: "100px 24px 120px" }}
      >
        {/* bg accent */}
        <div aria-hidden style={{
          position: "absolute", top: "20%", right: "-10%",
          width: 600, height: 600, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,30,30,0.03) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 0,
        }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>

          {/* HEADER */}
          <motion.div
            ref={headerRef}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } satisfies Transition } }}
            initial="hidden"
            animate={headerInView ? "visible" : "hidden"}
            style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24, marginBottom: 52 }}
          >
            <div style={{ maxWidth: 480 }}>
              <motion.div variants={headerVariants} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
             
                    <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase  px-3 py-1.5 rounded-full border"
            style={{
              color: "var(--red)",
              background: "rgba(200,16,46,0.05)",
              borderColor: "rgba(200,16,46,0.18)",
            }}
          >
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "var(--red)",
                display: "inline-block",
              }}
            />
           Client Results
          </span>
              </motion.div>

              <motion.h2 variants={headerVariants} style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight: 700, color: "#18140e", letterSpacing: "-0.028em", lineHeight: 1.1, marginBottom: 14 }}>
                Successful{" "}
                <em style={{ color: "#b41e1e", fontStyle: "italic", fontWeight: 600 }}>Outcomes</em>
              </motion.h2>

              <motion.p variants={headerVariants} style={{ fontSize: "0.84rem", color: "#8a847c", lineHeight: 1.76, maxWidth: 360 }}>
                Real engineers. Real approvals. Every outcome here represents a career milestone we helped achieve.
              </motion.p>
            </div>

            <motion.div variants={headerVariants} style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <StatPill count={550} label="Engineers Approved" suffix="+" inView={headerInView} />
              <StatPill count={100} label="Success Rate" suffix="%" inView={headerInView} />
            </motion.div>
          </motion.div>

          {/* GRID */}
          <motion.div ref={gridRef} variants={sectionContainerVariants} initial="hidden" animate={gridInView ? "visible" : "hidden"} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Row 1 */}
            <div style={{ display: "grid", gridTemplateColumns: "58fr 42fr", gap: 16 }} className="outcomes-main-row">
              <motion.div variants={cardVariants} style={{ position: "relative", borderRadius: 16, overflow: "hidden" }} className="h-96 md:h-[480px]">
                <motion.div style={{ y: featuredY, position: "absolute", inset: "-8%", borderRadius: 16, overflow: "hidden" }}>
                  <ImageCard outcome={featured} onOpen={handleOpen} height="h-full" priority />
                </motion.div>
              </motion.div>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {supporting.map((outcome) => (
                  <motion.div key={outcome.id} variants={cardVariants} style={{ flex: 1, position: "relative" }}>
                    <ImageCard outcome={outcome} onOpen={handleOpen} height="h-full" />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Row 2 */}
            {extraRow.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }} className="outcomes-extra-row">
                {extraRow.map((outcome) => (
                  <motion.div key={outcome.id} variants={cardVariants} style={{ height: 220 }}>
                    <ImageCard outcome={outcome} onOpen={handleOpen} height="h-full" />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* FOOTER */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.3 } satisfies Transition}
            style={{ marginTop: 52, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 16 }}
          >
            <SeeMoreButton />
            <p style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontSize: "0.72rem", color: "#b8b0a8", letterSpacing: "0.1em", fontStyle: "italic" }}>
              Each outcome is a verified EA or ACS approval.
            </p>
          </motion.div>
        </div>
      </section>

      <Lightbox outcome={activeOutcome} onClose={handleClose} />

      <style>{`
        @media (max-width: 768px) {
          .outcomes-main-row { grid-template-columns: 1fr !important; }
          .outcomes-extra-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .outcomes-extra-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}