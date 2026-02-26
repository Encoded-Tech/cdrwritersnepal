"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HeroBackground } from "@/app/components/home/landing/bg";
import { AgentForm } from "@/app/components/home/landing/agentForm";

// =============================================================================
// TYPES
// =============================================================================

interface Authority {
  id: string;
  name: string;
  abbr: string;
  description: string;
  scope: string;
}

interface WorkflowStep {
  step: number;
  label: string;
  sublabel: string;
  icon: React.ReactNode;
}

interface Capability {
  label: string;
  detail: string;
  icon: React.ReactNode;
  highlight?: boolean;
}

interface TrustBadge {
  label: string;
}

interface ChecklistItem {
  label: string;
  hot?: boolean;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const EASE_CINEMATIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AUTHORITIES: Authority[] = [
  {
    id: "ea",
    name: "Engineers Australia",
    abbr: "EA",
    description: "CDR · Career Episodes · Summary Statement",
    scope: "Engineering",
  },
  {
    id: "acs",
    name: "Australian Computer Society",
    abbr: "ACS",
    description: "RPL Report · ICT Skills Assessment",
    scope: "ICT & Tech",
  },
  {
    id: "vetassess",
    name: "VETASSESS",
    abbr: "VET",
    description: "Professional Skills Assessment",
    scope: "Professional",
  },
];

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    label: "Scan",
    sublabel: "Document review",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    step: 2,
    label: "Prepare",
    sublabel: "Expert writing",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    step: 3,
    label: "Review",
    sublabel: "Compliance check",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    step: 4,
    label: "Submit",
    sublabel: "Lodgement ready",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
        />
      </svg>
    ),
  },
];

const CAPABILITIES: Capability[] = [
  {
    label: "Document Scanning",
    detail: "AI-assisted gap analysis",
    highlight: true,
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "Expert Writing",
    detail: "Engineer-reviewed content",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },
  {
    label: "Compliance Check",
    detail: "Guideline-verified output",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    label: "EOI Readiness",
    detail: "Expression of Interest support",
    highlight: true,
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    label: "Lodgement Portal",
    detail: "Submission-ready packages",
    highlight: true,
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
        />
      </svg>
    ),
  },
  {
    label: "Revision Workflow",
    detail: "Unlimited revision rounds",
    icon: (
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  },
];

const CHECKLIST_ITEMS: ChecklistItem[] = [
  { label: "Document scanning & gap analysis", hot: true },
  { label: "Career episode writing (CDR / RPL)" },
  { label: "Compliance & guideline verification" },
  { label: "EOI readiness & points calculation", hot: true },
  { label: "Lodgement portal submission prep", hot: true },
  { label: "Revision rounds until approved" },
];

const TRUST_BADGES: TrustBadge[] = [
  { label: "EA Compliant" },
  { label: "ACS Verified" },
  { label: "VETASSESS Ready" },
  { label: "Plagiarism-Free" },
];

// =============================================================================
// ANIMATION VARIANTS
// =============================================================================

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_CINEMATIC },
  },
};

const fadeDown: Variants = {
  hidden: { opacity: 0, y: -14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_CINEMATIC },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, delay: 0.1 },
  },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: EASE_CINEMATIC },
  },
};

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

// ── WorkflowStrip ─────────────────────────────────────────────────────────────

function WorkflowStrip() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex items-center gap-0 mb-8 overflow-x-auto pb-1"
      style={{ scrollbarWidth: "none" }}
      role="list"
      aria-label="Assessment workflow: Scan, Prepare, Review, Submit"
    >
      {WORKFLOW_STEPS.map((step, i) => (
        <div key={step.step} className="flex items-center flex-shrink-0" role="listitem">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(200,16,46,0.25)",
                border: "1px solid rgba(200,16,46,0.5)",
                color: "#ff2244",
              }}
              aria-hidden="true"
            >
              {step.icon}
            </div>
            <div>
              <p className="text-[11px] font-bold text-white leading-none">{step.label}</p>
              <p className="text-[10px] text-white/60 leading-none mt-0.5">{step.sublabel}</p>
            </div>
          </div>

          {i < WORKFLOW_STEPS.length - 1 && (
            <div className="px-1.5 flex-shrink-0" aria-hidden="true">
              <svg className="w-3 h-3 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
}

// ── AuthorityChips ────────────────────────────────────────────────────────────

function AuthorityChips() {
  return (
    <motion.div
      variants={fadeUp}
      className="flex flex-wrap gap-2 mb-6"
      role="list"
      aria-label="Supported migration authorities"
    >
      {AUTHORITIES.map((auth) => (
        <div
          key={auth.id}
          role="listitem"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
          style={{
            background: "rgba(200,16,46,0.18)",
            border: "1px solid rgba(200,16,46,0.45)",
          }}
        >
          <span
            className="text-[9px] font-black tracking-widest leading-none"
            style={{ color: "#ff2244" }}
          >
            {auth.abbr}
          </span>
          <span className="w-px h-3 bg-white/30" aria-hidden="true" />
          <span className="text-[14px] font-medium text-white/85 leading-none">{auth.name}</span>
        </div>
      ))}
    </motion.div>
  );
}

// ── CapabilityGrid ────────────────────────────────────────────────────────────

function CapabilityGrid() {
  return (
    <motion.div
      variants={fadeUp}
      className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-8"
      role="list"
      aria-label="Platform capabilities"
    >
      {CAPABILITIES.map((cap) => (
        <div
          key={cap.label}
          role="listitem"
          className="flex items-start gap-2.5 px-3 py-2.5 rounded-xl"
          style={{
            background: cap.highlight ? "rgba(200,16,46,0.18)" : "rgba(255,255,255,0.07)",
            border: cap.highlight
              ? "1px solid rgba(200,16,46,0.45)"
              : "1px solid rgba(255,255,255,0.14)",
          }}
        >
          <div
            className="mt-0.5 flex-shrink-0"
            style={{ color: cap.highlight ? "#ff2244" : "rgba(255,255,255,0.7)" }}
            aria-hidden="true"
          >
            {cap.icon}
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white leading-tight">{cap.label}</p>
            <p className="text-[10px] text-white/60 leading-tight mt-0.5">{cap.detail}</p>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// ── HandledChecklist ──────────────────────────────────────────────────────────

function HandledChecklist() {
  return (
    <ul className="space-y-2" aria-label="What we handle for you">
      {CHECKLIST_ITEMS.map((item) => (
        <li key={item.label} className="flex items-center gap-2.5">
          <div
            className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
            style={{
              background: item.hot ? "rgba(200,16,46,0.35)" : "rgba(255,255,255,0.12)",
              border: item.hot ? "1px solid rgba(200,16,46,0.65)" : "1px solid rgba(255,255,255,0.2)",
            }}
            aria-hidden="true"
          >
            <svg
              className="w-2 h-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ color: item.hot ? "#ff2244" : "rgba(255,255,255,0.7)" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span
            className="text-[12px] leading-snug flex-1"
            style={{ color: item.hot ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.7)" }}
          >
            {item.label}
          </span>
          {item.hot && (
            <span
              className="text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{
                color: "#ff2244",
                background: "rgba(200,16,46,0.2)",
                border: "1px solid rgba(200,16,46,0.45)",
              }}
              aria-label="Key service"
            >
              KEY
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

// ── AuthorityListRow ──────────────────────────────────────────────────────────

function AuthorityListRow({
  authority,
  index,
}: {
  authority: Authority;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.45 + index * 0.1, duration: 0.55, ease: EASE_CINEMATIC }}
      className="flex items-center gap-3 px-3.5 py-3 rounded-xl"
      style={{
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {/* Abbr badge */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
        style={{
          background: "rgba(200,16,46,0.25)",
          border: "1px solid rgba(200,16,46,0.5)",
        }}
        aria-hidden="true"
      >
        <span className="text-[9px] font-black tracking-widest leading-none" style={{ color: "#ff2244" }}>
          {authority.abbr}
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-white leading-tight truncate">{authority.name}</p>
        <p className="text-[12px] text-white/60 mt-0.5 leading-tight truncate">{authority.description}</p>
      </div>

      {/* Status + scope */}
      <div className="flex flex-col items-end gap-1 flex-shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 opacity-90" aria-hidden="true" />
          <span className="text-[10px] text-white font-medium">Active</span>
        </div>
        <span
          className="text-[9px] font-semibold tracking-wide text-white/75 px-1.5 py-0.5 rounded"
          style={{ background: "rgba(255,255,255,0.1)" }}
        >
          {authority.scope}
        </span>
      </div>
    </motion.div>
  );
}

// ── ReadinessBar ──────────────────────────────────────────────────────────────

function ReadinessBar({
  label,
  value,
  status,
  delay,
  icon,
}: {
  label: string;
  value: string;
  status: string;
  delay: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center"
        style={{ background: "rgba(200,16,46,0.35)" }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="text-[10px] font-semibold text-white/80">{label}</span>
          <span className="text-[10px] font-bold text-red-300">{status}</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: value }}
            transition={{ delay, duration: 1.2, ease: EASE_CINEMATIC }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #c8102e, #ff3355)" }}
          />
        </div>
      </div>
    </div>
  );
}

// ── ProductCard ───────────────────────────────────────────────────────────────

function ProductCard({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <div className="relative w-full lg:max-w-[420px]">
      {/* Ambient glow */}
      <div
        className="absolute -inset-6 rounded-3xl pointer-events-none"
        style={{ background: "rgba(200,16,46,0.08)", filter: "blur(40px)" }}
        aria-hidden="true"
      />

      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow:
            "0 40px 80px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {/* ── Card header: status bar ── */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
        >
          <div className="flex items-center gap-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-[#ff2244] animate-pulse"
              style={{ boxShadow: "0 0 6px rgba(200,16,46,0.9)" }}
              aria-hidden="true"
            />
            <span className="text-[10px] font-bold text-[#ff2244] tracking-[0.18em] uppercase">
              Assessment Platform
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 opacity-90" aria-hidden="true" />
            <span className="text-[9px] text-white/65 font-medium">All systems active</span>
          </div>
        </div>

        {/* ── Authorities section ── */}
        <div className="px-4 pt-4 pb-3">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/55 mb-3 px-1">
            Recognised Authorities
          </p>
          <div className="space-y-2">
            {AUTHORITIES.map((auth, i) => (
              <AuthorityListRow key={auth.id} authority={auth} index={i} />
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div
          className="mx-4"
          style={{ height: "1px", background: "rgba(255,255,255,0.12)" }}
          aria-hidden="true"
        />

        {/* ── Handled checklist ── */}
        <div className="px-5 py-4">
          <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-white/55 mb-3">
            Handled For You
          </p>
          <HandledChecklist />
        </div>

        {/* ── Readiness indicators ── */}
        <div
          className="mx-4 mb-4 p-3.5 rounded-xl"
          style={{
            background: "rgba(200,16,46,0.12)",
            border: "1px solid rgba(200,16,46,0.3)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-white/55">
              Readiness Status
            </p>
            <span className="text-[9px] text-white/55 font-medium">Live</span>
          </div>
          <div className="space-y-2.5">
            <ReadinessBar
              label="EOI Readiness"
              value="92%"
              status="Ready"
              delay={0.8}
              icon={
                <svg className="w-3 h-3 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              }
            />
            <ReadinessBar
              label="Lodgement Portal"
              value="88%"
              status="Prepared"
              delay={1.0}
              icon={
                <svg className="w-3 h-3 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              }
            />
          </div>
        </div>

        {/* ── Card CTA ── */}
        <div className="px-4 pb-5">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenModal}
            className="w-full py-3 rounded-xl text-[12px] font-bold text-white tracking-wide text-center cursor-pointer select-none"
            style={{
              background: "linear-gradient(135deg, #c8102e 0%, #8b0015 100%)",
              boxShadow:
                "0 8px 28px rgba(200,16,46,0.4), inset 0 1px 0 rgba(255,255,255,0.18)",
            }}
            aria-label="Start your free assessment consultation"
          >
            Start Free Assessment →
          </motion.div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute -top-12 -right-12 w-24 h-24 rounded-full"
            style={{ background: "rgba(200,16,46,0.12)" }}
          />
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN EXPORT
// =============================================================================

export default function ServicesHero() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 80]);
  const [agentOpen, setAgentOpen] = useState(false);

  return (
    <>
      {agentOpen && <AgentForm onClose={() => setAgentOpen(false)} />}

      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "#08090c" }}
        aria-label="Migration Skills Assessment Services"
      >
        {/* Shared background — unchanged from original */}
        <HeroBackground bgY={bgY} />

        {/* Layout shell — identical container structure */}
        <div
          className="relative flex container flex-col flex-1 mx-auto px-5"
          style={{ zIndex: 10 }}
        >
          <div className="h-10 flex-shrink-0" />

          <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center gap-10 lg:gap-14 py-10 lg:py-0">

            {/* ──────────────────────────────────────────────────
                LEFT — Messaging hierarchy, workflow, CTAs
            ────────────────────────────────────────────────── */}
            <motion.div
              className="flex-1 min-w-0"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {/* Platform status badge */}
              <motion.div
                variants={fadeDown}
                className="inline-flex items-center gap-2.5 mb-6 mt-2 sm:mt-4 lg:mt-12 xl:mt-0"
                style={{
                  background: "rgba(200,16,46,0.18)",
                  border: "1px solid rgba(200,16,46,0.45)",
                  borderRadius: "9999px",
                  padding: "0.4rem 0.9rem",
                }}
                role="status"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs font-bold tracking-widest uppercase text-red-400">
                  Platform Ready · Expert Reviewed
                </span>
              </motion.div>

              {/* Authority chips */}
              <AuthorityChips />

              {/* H1 */}
              <motion.h1
                variants={fadeUp}
                className="font-black text-white leading-[1.03] tracking-tight mb-4"
                style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.8rem)" }}
              >
                Your Migration Skill
                <br />
                Assessment, Prepared
                <br />
                <span style={{ color: "#ff2244" }}>End-to-End.</span>
              </motion.h1>

              {/* Product clarity sentence */}
              <motion.p
                variants={fadeUp}
                className="text-white/75 leading-relaxed mb-7 max-w-[520px]"
                style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
              >
                We handle everything, from scanning your existing documents to
                writing, compliance verification, EOI readiness, and final
                lodgement preparation for Engineers Australia, ACS, and VETASSESS.
              </motion.p>

              {/* Workflow steps row */}
              <WorkflowStrip />

              {/* Capability grid */}
              <CapabilityGrid />

              {/* CTA row */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
                {/* Primary */}
                <motion.button
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setAgentOpen(true)}
                  className="inline-flex items-center gap-2 font-bold text-white rounded-xl px-6 py-3.5 text-sm"
                  style={{
                    background: "linear-gradient(135deg, #c8102e, #8b0015)",
                    boxShadow:
                      "0 4px 24px rgba(200,16,46,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
                  }}
                  aria-label="Book a free consultation with an expert"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Book Free Consultation
                </motion.button>

                {/* Secondary */}
                <Link href="#services" aria-label="Browse all migration assessment services">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 font-semibold text-white/85 rounded-xl px-6 py-3.5 text-sm transition-colors duration-200 hover:text-white hover:bg-white/10"
                    style={{ border: "1px solid rgba(255,255,255,0.25)" }}
                  >
                    View All Services
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.button>
                </Link>
              </motion.div>

              {/* Micro trust badges */}
              <motion.div
                variants={fadeIn}
                className="flex flex-wrap gap-x-5 gap-y-2"
                role="list"
                aria-label="Quality and compliance indicators"
              >
                {TRUST_BADGES.map((b) => (
                  <span
                    key={b.label}
                    role="listitem"
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-white/65"
                  >
                    <svg
                      className="w-3 h-3 text-green-400 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {b.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* ──────────────────────────────────────────────────
                RIGHT — Product card with float animation
            ────────────────────────────────────────────────── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideRight}
              className="w-full lg:w-auto lg:flex-shrink-0"
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
              >
                <ProductCard onOpenModal={() => setAgentOpen(true)} />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}