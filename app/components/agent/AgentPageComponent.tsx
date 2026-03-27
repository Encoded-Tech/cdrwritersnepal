"use client";

import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import AgentForm from "./AgentForm";
import { HeroBackground } from "../home/landing/bg";

const TRUST_POINTS = [
  { icon: "💰", label: "High Commission",  desc: "Earn top-tier commissions on every successful referral" },
  { icon: "⚡", label: "Fast Support",     desc: "Dedicated team available for you and your clients" },
  { icon: "🌍", label: "Global Network",   desc: "Trusted by 550+ clients across 30+ countries" },
  { icon: "🎁", label: "Bonus Structure",  desc: "Guaranteed bonuses - earn more than you expect" },
];

export default function AgentPageContent() {
  const router = useRouter();
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 600], [0, 80]);

  const handleSuccess = () => router.push("/");

  return (
    <main
      className="agp-root"
      style={{ background: "radial-gradient(ellipse at top, #0d1a12 0%, #060606 60%)" }}
    >
      {/* ── Animated background ── */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <HeroBackground bgY={bgY} />
      </div>

      {/* ── Page content ── */}
      <div className="agp-wrapper">
        <div className="agp-grid">

          {/* ══════════════════════════════
              LEFT COLUMN — sticky scroll
          ══════════════════════════════ */}
          <motion.div
            className="agp-left"
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Badge — GREEN dot */}
            <motion.div
              className="agp-badge"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
            >
              <span className="agp-badge-dot" />
              <span className="agp-badge-text">Referral Partner Program</span>
            </motion.div>

            <h1 className="agp-headline">
              Partner With Us &amp;<br />
              <span className="agp-headline-accent">Grow Together</span>
            </h1>

            <p className="agp-subtext">
              Refer clients for Skill Assessment &amp; Migration Services - earn
              industry-leading commissions with a guaranteed bonus structure.
            </p>

            {/* Trust points */}
            <div className="agp-trust-list">
              {TRUST_POINTS.map((pt, i) => (
                <motion.div
                  key={pt.label}
                  className="agp-trust-item"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="agp-trust-icon">{pt.icon}</div>
                  <div>
                    <p className="agp-trust-label">{pt.label}</p>
                    <p className="agp-trust-desc">{pt.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer tag */}
            <div className="agp-footer-tag">
              <p className="agp-footer-text">
                Trusted across Nepal, Australia &amp; beyond
              </p>
            </div>
          </motion.div>

          {/* ══════════════════════════════
              RIGHT COLUMN — White form card
          ══════════════════════════════ */}
          <motion.div
            className="agp-card"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 26, delay: 0.2 }}
          >
            {/* Accent top bar */}
            <div className="agp-card-bar" />

            {/* Card header */}
            <div className="agp-card-header">
              <div className="agp-card-header-inner">
                <div className="agp-card-icon">🤝</div>
                <div>
                  <p className="agp-card-title">Register as a Partner Agent</p>
                  <p className="agp-card-subtitle">
                    Fill in your details - we&apos;ll get back to you within 24 hours
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="agp-form-wrap agent-white-form">
              <AgentForm onSuccess={handleSuccess} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════
          STYLES
      ══════════════════════════════════════════════ */}
      <style>{`

        /* ── Root ── */
        .agp-root {
          position: relative;
          min-height: 100svh;
          overflow: hidden;
        }

        /* ── Outer wrapper ── */
        .agp-wrapper {
          position: relative;
          z-index: 10;
          min-height: 100svh;
          display: flex;
          align-items: flex-start;        /* flex-start so sticky works correctly */
          justify-content: center;             
          padding: 128px 40px 80px;       
          box-sizing: border-box;               
        }

        /* ── Grid — 7xl wide (1400px) matching your landing sections ── */
        .agp-grid {
          width: 100%;
          max-width: 1490px;              /* 7xl */
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 60px;
          align-items: flex-start;       /* MUST be flex-start for sticky to work */
        }

        /* ─────────────────────────────────────
           LEFT — sticky: slides with the page
        ───────────────────────────────────── */
        .agp-left {
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 128px;                    /* sticks 128px from top of viewport */
          align-self: flex-start;        /* prevents stretching to grid height */
        }

        /* Badge */
        .agp-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          padding: 7px 16px;
          border-radius: 999px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.3);
          width: fit-content;
        }

        /* Green pulsing dot */
        .agp-badge-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.7);
          animation: agp-pulse 2s infinite;
        }

        @keyframes agp-pulse {
          0%   { box-shadow: 0 0 0 0   rgba(34,197,94,0.7); }
          70%  { box-shadow: 0 0 0 7px rgba(34,197,94,0);   }
          100% { box-shadow: 0 0 0 0   rgba(34,197,94,0);   }
        }

        .agp-badge-text {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4ade80;
        }

        /* Headline */
        .agp-headline {
          font-family: 'Georgia', serif;
          font-size: clamp(1.85rem, 2.6vw, 3rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: #fff;
          margin: 0 0 16px;
          text-shadow: 0 2px 40px rgba(200,16,46,0.3);
        }

        .agp-headline-accent { color: rgba(200,16,46,0.9); }

        .agp-subtext {
          color: rgba(255,255,255,0.5);
          font-size: 0.92rem;
          line-height: 1.75;
          margin: 0 0 28px;
        }

        /* Trust list */
        .agp-trust-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 28px;
        }

        .agp-trust-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .agp-trust-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          flex-shrink: 0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .agp-trust-label {
          margin: 0 0 2px;
          color: #fff;
          font-weight: 700;
          font-size: 0.82rem;
        }

        .agp-trust-desc {
          margin: 0;
          color: rgba(255,255,255,0.4);
          font-size: 0.76rem;
          line-height: 1.5;
        }

        .agp-footer-tag {
          border-top: 1px solid rgba(255,255,255,0.07);
          padding-top: 18px;
        }

        .agp-footer-text {
          margin: 0;
          color: rgba(255,255,255,0.22);
          font-size: 0.68rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        /* ─── RIGHT: White card ─── */
        .agp-card {
          background: #ffffff;
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 40px 100px rgba(0,0,0,0.65),
            0 0 0 1px rgba(255,255,255,0.06) inset;
        }

        .agp-card-bar {
          height: 3px;
          background: linear-gradient(90deg, #C8102E, #1a7a4a, #C8102E);
        }

        .agp-card-header {
          padding: 20px 28px 16px;
          border-bottom: 1px solid #f1f5f9;
        }

        .agp-card-header-inner {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .agp-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          flex-shrink: 0;
          background: rgba(200,16,46,0.07);
          border: 1px solid rgba(200,16,46,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
        }

        .agp-card-title {
          margin: 0 0 2px;
          color: #0f172a;
          font-weight: 700;
          font-size: 0.88rem;
        }

        .agp-card-subtitle {
          margin: 0;
          color: #94a3b8;
          font-size: 0.71rem;
        }

        .agp-form-wrap {
          padding: 24px 28px 28px;
        }

        /* ─── Form overrides: dark → white ─── */
        .agent-white-form input,
        .agent-white-form textarea,
        .agent-white-form select {
          background: #f8fafc !important;
          border: 1.5px solid #e2e8f0 !important;
          border-radius: 10px !important;
          color: #0f172a !important;
          font-size: 0.875rem !important;
        }
        .agent-white-form input::placeholder,
        .agent-white-form textarea::placeholder { color: #94a3b8 !important; }
        .agent-white-form input:focus,
        .agent-white-form textarea:focus,
        .agent-white-form select:focus {
          border-color: #C8102E !important;
          background: #fff !important;
          box-shadow: 0 0 0 3px rgba(200,16,46,0.1) !important;
          outline: none !important;
        }
        .agent-white-form input:hover:not(:focus),
        .agent-white-form textarea:hover:not(:focus),
        .agent-white-form select:hover:not(:focus) {
          border-color: #cbd5e1 !important;
          background: #fff !important;
        }
        .agent-white-form label,
        .agent-white-form span,
        .agent-white-form p { color: #475569 !important; }
        .agent-white-form h4 { color: #334155 !important; }
        .agent-white-form [class*="h-px"] { background: #e2e8f0 !important; }
        .agent-white-form [class*="border-white"] { border-color: #cbd5e1 !important; }
        .agent-white-form [class*="text-white"] { color: #334155 !important; }
        .agent-white-form .text-red-400,
        .agent-white-form [class*="text-red"] { color: #ef4444 !important; }
        .agent-white-form [class*="bg-red"] {
          background: #fef2f2 !important;
          border-color: #fecaca !important;
          color: #dc2626 !important;
        }
        .agent-white-form [class*="bg-white\\/5"],
        .agent-white-form [class*="bg-white/5"] { background: #f1f5f9 !important; }
        .agent-white-form [class*="text-white\\/30"],
        .agent-white-form [class*="text-white/30"] { color: #94a3b8 !important; }
        .agent-white-form select option { background: #fff !important; color: #0f172a !important; }

        /* Submit button */
        .agent-white-form button[type="submit"] {
          background: linear-gradient(135deg, #C8102E, #a00d24) !important;
          color: #fff !important;
          box-shadow: 0 4px 20px rgba(200,16,46,0.28) !important;
          border: none !important;
          transition: transform 0.18s ease, box-shadow 0.18s ease !important;
        }
        .agent-white-form button[type="submit"] span,
        .agent-white-form button[type="submit"] svg { color: #fff !important; }
        .agent-white-form button[type="submit"]:hover:not(:disabled) {
          transform: translateY(-1px) !important;
          box-shadow: 0 8px 28px rgba(200,16,46,0.38) !important;
        }
        .agent-white-form button[type="submit"]:disabled {
          background: #f1f5f9 !important;
          color: #94a3b8 !important;
          box-shadow: none !important;
        }
        .agent-white-form button[type="submit"]:disabled span { color: #94a3b8 !important; }


        /* ═══════════════════════════════════════════
           RESPONSIVE BREAKPOINTS
           Sticky is disabled below 768px — no point
           on single-column layouts
        ═══════════════════════════════════════════ */

        /* 7xl desktop ≥ 1536px — more air */
        @media (min-width: 1536px) {
          .agp-wrapper { padding: 148px 80px 96px; }
          .agp-grid    { gap: 80px; }
          .agp-left    { top: 148px; }
          .agp-headline { font-size: 3.15rem; }
        }

        /* 2xl 1400px–1535px */
        @media (max-width: 1535px) and (min-width: 1400px) {
          .agp-wrapper { padding: 136px 60px 88px; }
          .agp-grid    { gap: 68px; }
          .agp-left    { top: 136px; }
        }

        /* xl 1280px–1399px */
        @media (max-width: 1399px) and (min-width: 1280px) {
          .agp-wrapper { padding: 132px 52px 84px; }
          .agp-grid    { max-width: 1280px; gap: 60px; }
          .agp-left    { top: 132px; }
        }

        /* lg 1024px–1279px — base grid is fine */
        @media (max-width: 1279px) and (min-width: 1024px) {
          .agp-wrapper { padding: 128px 40px 80px; }
          .agp-grid    { max-width: 1040px; gap: 52px; }
          .agp-left    { top: 128px; }
        }

        /* md tablet landscape 768px–1023px — tighter two-column */
        @media (max-width: 1023px) and (min-width: 768px) {
          .agp-wrapper {
            padding: 112px 32px 64px;
          }
          .agp-grid {
            grid-template-columns: 1fr 1.35fr;
            gap: 36px;
            max-width: 100%;
          }
          .agp-left    { top: 112px; }
          .agp-headline { font-size: clamp(1.6rem, 2.6vw, 2.2rem); }
          .agp-subtext  { font-size: 0.85rem; }
          .agp-card-header { padding: 18px 22px 14px; }
          .agp-form-wrap   { padding: 20px 22px 24px; }
        }

        /* sm tablet portrait 640px–767px — single column, sticky OFF */
        @media (max-width: 767px) and (min-width: 640px) {
          .agp-wrapper {
            padding: 104px 28px 56px;
            align-items: flex-start;
          }
          .agp-grid {
            grid-template-columns: 1fr;
            gap: 32px;
            max-width: 100%;
          }
          /* Disable sticky on single-column */
          .agp-left {
            position: static;
          }
          .agp-headline { font-size: clamp(1.75rem, 5.5vw, 2.2rem); }
          .agp-card-header { padding: 18px 24px 14px; }
          .agp-form-wrap   { padding: 20px 24px 26px; }
        }

        /* Mobile 480px–639px */
        @media (max-width: 639px) and (min-width: 480px) {
          .agp-wrapper {
            padding: 96px 20px 52px;
            align-items: flex-start;
          }
          .agp-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            max-width: 100%;
          }
          .agp-left        { position: static; }
          .agp-headline    { font-size: clamp(1.65rem, 6.5vw, 2.1rem); }
          .agp-trust-icon  { width: 33px; height: 33px; font-size: 0.9rem; }
          .agp-card        { border-radius: 16px; }
          .agp-card-header { padding: 16px 20px 13px; }
          .agp-form-wrap   { padding: 18px 20px 22px; }
        }

        /* Small mobile < 480px */
        @media (max-width: 479px) {
          .agp-wrapper {
            padding: 88px 14px 48px;
            align-items: flex-start;
          }
          .agp-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            max-width: 100%;
          }
          .agp-left        { position: static; }
          .agp-badge       { padding: 6px 12px; gap: 6px; }
          .agp-badge-dot   { width: 7px; height: 7px; }
          .agp-badge-text  { font-size: 0.62rem; letter-spacing: 0.08em; }
          .agp-headline    { font-size: clamp(1.5rem, 7.5vw, 1.9rem); }
          .agp-subtext     { font-size: 0.84rem; }
          .agp-trust-list  { gap: 12px; }
          .agp-trust-icon  { width: 32px; height: 32px; font-size: 0.88rem; }
          .agp-trust-label { font-size: 0.79rem; }
          .agp-trust-desc  { font-size: 0.72rem; }
          .agp-footer-text { font-size: 0.62rem; }
          .agp-card        { border-radius: 14px; }
          .agp-card-header { padding: 15px 16px 12px; }
          .agp-form-wrap   { padding: 16px 16px 20px; }
          .agp-card-title  { font-size: 0.82rem; }
          .agp-card-subtitle { font-size: 0.67rem; }
        }

        /* Very small < 360px */
        @media (max-width: 359px) {
          .agp-wrapper  { padding: 80px 10px 36px; }
          .agp-headline { font-size: 1.4rem; }
          .agp-card     { border-radius: 12px; }
          .agp-card-header { padding: 13px 14px 11px; }
          .agp-form-wrap   { padding: 14px 14px 18px; }
        }

      `}</style>
    </main>
  );
}