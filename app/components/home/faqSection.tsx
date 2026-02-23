"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FAQS } from "@/data/data";

const E: [number, number, number, number] = [0.32, 0, 0.16, 1];
const EASE_FILL: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
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
        textTransform: "uppercase",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <motion.span
        aria-hidden
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_FILL }}
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
        transition={{ duration: 0.28 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {label}
      </motion.span>
      <motion.span
        animate={{ x: hovered ? 3 : 0, color: hovered ? "#ffffff" : "#18140e" }}
        transition={{ duration: 0.25 }}
        style={{ position: "relative", zIndex: 1, fontSize: "0.85rem" }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

function PlusIcon({ isOpen }: { isOpen: boolean }) {
  const col = isOpen ? "var(--red)" : "rgba(0,0,0,0.3)";
  return (
    <div style={{ position: "relative", width: 16, height: 16, marginTop: 4, flexShrink: 0 }}>
      <motion.span
        style={{ position: "absolute", top: "50%", left: 0, width: "100%", height: 1.5, marginTop: -0.75, borderRadius: 2, background: col, transition: "background 0.2s ease" }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.26, ease: E }}
      />
      <motion.span
        style={{ position: "absolute", left: "50%", top: 0, width: 1.5, height: "100%", marginLeft: -0.75, borderRadius: 2, background: col, transition: "background 0.2s ease" }}
        animate={{ rotate: isOpen ? 45 : 0, opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.22, ease: E }}
      />
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section className="relative py-32 px-6" style={{ background: "#f9f8f6" }}>
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(200,16,46,0.04) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <div className="relative max-w-2xl mx-auto">

        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: E }}
        >
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border"
            style={{ color: "var(--red)", background: "rgba(200,16,46,0.05)", borderColor: "rgba(200,16,46,0.18)" }}
          >
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
            Common Questions
          </span>

          <h2
            style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 700, letterSpacing: "-0.03em", color: "#18140e", lineHeight: 1.1, marginBottom: 14 }}
          >
            Frequently Asked{" "}
            <span style={{ color: "var(--red)", opacity: 0.85 }}>Questions</span>
          </h2>

          <p style={{ fontSize: "0.92rem", color: "#8a847c", maxWidth: 360, lineHeight: 1.8 }}>
            Clear answers to the most important questions about CDR preparation and assessment.
          </p>
        </motion.div>

        <div>
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            const isHovered = hoveredIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-32px" }}
                transition={{ duration: 0.5, ease: E, delay: i * 0.05 }}
                style={{ position: "relative", borderBottom: "1px solid rgba(0,0,0,0.07)" }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.div
                  aria-hidden
                  style={{ position: "absolute", left: -20, top: 0, width: 2, borderRadius: 2, background: "var(--red)", transformOrigin: "top", height: "100%" }}
                  animate={{ scaleY: isOpen ? 1 : 0, opacity: isOpen ? 0.6 : 0 }}
                  transition={{ duration: 0.35, ease: E }}
                />
                <motion.div
                  aria-hidden
                  style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 100% at 5% 50%, rgba(200,16,46,0.035) 0%, transparent 70%)", pointerEvents: "none", borderRadius: 4 }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: E }}
                />
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  style={{ width: "100%", textAlign: "left", padding: "1.55rem 0", display: "flex", alignItems: "flex-start", gap: "1.2rem", background: "none", border: "none", cursor: "pointer", position: "relative" }}
                >
                  <motion.span
                    animate={{ color: isOpen ? "var(--red)" : "rgba(0,0,0,0.18)" }}
                    transition={{ duration: 0.25, ease: E }}
                    style={{ fontFamily: "var(--font-serif)", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", marginTop: 4, minWidth: 20, userSelect: "none" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                  <motion.span
                    animate={{ x: isHovered || isOpen ? 3 : 0 }}
                    transition={{ duration: 0.22, ease: E }}
                    style={{ flex: 1, fontWeight: 600, fontSize: "0.97rem", lineHeight: 1.55, letterSpacing: "-0.012em", color: isOpen ? "#0e0b08" : "#2a2620", transition: "color 0.2s ease" }}
                  >
                    {faq.question}
                  </motion.span>
                  <PlusIcon isOpen={isOpen} />
                </button>
                <motion.div
                  style={{ overflow: "hidden" }}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  initial={false}
                  transition={{
                    height: { duration: 0.38, ease: E },
                    opacity: { duration: isOpen ? 0.28 : 0.18, ease: E, delay: isOpen ? 0.05 : 0 },
                  }}
                >
                  <div style={{ paddingBottom: "1.6rem", paddingLeft: 32, paddingRight: 4 }}>
                    <motion.div
                      style={{ height: 1, background: "linear-gradient(to right, rgba(200,16,46,0.3), transparent)", marginBottom: 16, transformOrigin: "left center" }}
                      animate={{ scaleX: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: E, delay: isOpen ? 0.14 : 0 }}
                    />
                    <p style={{ fontSize: "0.92rem", color: "#6f6a63", lineHeight: 1.82, letterSpacing: "0.005em" }}>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* ── CTA — red ink-fill magnetic button (was solid red button) ── */}
        <motion.div
          className="mt-12 flex items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: E }}
        >
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.07))" }} />
          <div className="text-center shrink-0">
            <p style={{ fontSize: "0.82rem", color: "#b0aa9f", marginBottom: 14, letterSpacing: "0.03em" }}>
              Still have questions?
            </p>
            <RedInkButton href="/contact" label="Contact Our Experts" />
          </div>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, rgba(0,0,0,0.07))" }} />
        </motion.div>

      </div>
    </section>
  );
}