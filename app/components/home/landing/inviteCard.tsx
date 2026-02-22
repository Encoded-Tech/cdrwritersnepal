"use client";

/* ─── InviteCard.tsx ───────────────────────────────────────────────────
   The right-side hero panel — a clickable "invitation" card that:
     • Shows the agent avatar, status, greeting bubble
     • Shows ghost (disabled) form field previews
     • Has a CTA button
     • Floats + glows on hover
     • Clicking anywhere opens the AgentForm modal
──────────────────────────────────────────────────────────────────────── */

import { motion } from "framer-motion";

interface InviteCardProps { onOpen: () => void; }

export function InviteCard({ onOpen }: InviteCardProps) {
  return (
    <div className="w-full lg:w-[420px] xl:w-[460px] flex-shrink-0">

      {/* ── Main card ── */}
      <motion.div
        onClick={onOpen}
        role="button" tabIndex={0}
        onKeyDown={e => e.key === "Enter" && onOpen()}
        className="rounded-3xl overflow-hidden cursor-pointer"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          animation: "cardFloat 7s ease-in-out infinite",
        }}
        whileHover={{
          scale: 1.012,
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 40px rgba(200,16,46,0.12), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
        transition={{ type: "tween", duration: 0.25 }}
      >
        {/* Shimmer accent bar */}
        <div style={{
          height: 3, width: "100%",
          background: "linear-gradient(90deg,#c8102e,rgba(200,16,46,0.4),#1a7a4a,rgba(200,16,46,0.4),#c8102e)",
          backgroundSize: "300% 100%", animation: "cardBarShim 4s linear infinite",
        }} />

        <div className="p-7 sm:p-8">
          {/* Agent identity */}
          <div className="flex items-center gap-3 mb-5">
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: "linear-gradient(135deg,#c8102e,#8b0015)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(200,16,46,0.35)",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <p className="font-black text-white text-sm leading-tight">Your CDR Expert Agent</p>
              <p className="text-[11px] text-white/40 flex items-center gap-1.5 mt-0.5">
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
                  boxShadow: "0 0 6px rgba(34,197,94,0.7)", flexShrink: 0, display: "inline-block",
                  animation: "bdotPulse 2s infinite",
                }} />
                Online - Ready to help
              </p>
            </div>
          </div>

          {/* Greeting bubble */}
          <div style={{
            background: "rgba(200,16,46,0.08)", border: "1px solid rgba(200,16,46,0.15)",
            borderRadius: "0 14px 14px 14px", padding: "1rem 1.2rem", marginBottom: "1.4rem",
          }}>
            <p className="text-sm text-white/75 leading-relaxed">
              👋 Hi! I&apos;m your dedicated CDR consultation specialist.<br/><br/>
              <strong className="text-white">
                Click to begin - I&apos;ll map out your EA assessment strategy
              </strong>{" "}
              in just 2 minutes. Completely free.
            </p>
          </div>

          {/* Ghost form field previews */}
          <div className="flex flex-col gap-2 mb-5">
            {[
              "Your full name…",
              "Email address…",
              "Phone with country code…",
              "Engineering field…",
            ].map((ph, i) => (
              <div key={i} style={{
                height: 38, borderRadius: 9,
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                display: "flex", alignItems: "center", padding: "0 12px", gap: 8,
                fontSize: "0.76rem", color: "rgba(255,255,255,0.22)",
              }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "rgba(255,255,255,0.15)", flexShrink: 0 }} />
                {ph}
              </div>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={e => { e.stopPropagation(); onOpen(); }}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white"
            style={{
              background: "linear-gradient(135deg, #c8102e, #8b0015)",
              boxShadow: "0 4px 20px rgba(200,16,46,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              border: "none", cursor: "pointer", transition: "transform .18s, box-shadow .18s",
            }}
            onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,16,46,0.45), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
            onMouseOut={e  => { e.currentTarget.style.transform = "scale(1)";    e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,16,46,0.35), inset 0 1px 0 rgba(255,255,255,0.15)"; }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            Start Free Consultation →
          </button>

          {/* Trust strip */}
          <div className="flex items-center justify-between mt-5 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {["🔒 Confidential", "⚡ 2hr Reply", "✅ Free"].map(b => (
              <span key={b} className="text-[11px] text-white/30 font-medium">{b}</span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Social proof */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-4 flex items-center gap-3 px-2"
      >
        <div className="flex -space-x-2.5">
          {[
            { l: "R", bg: "#3b82f6" },
            { l: "P", bg: "#a855f7" },
            { l: "B", bg: "#f59e0b" },
            { l: "S", bg: "#22c55e" },
          ].map(a => (
            <div
              key={a.l}
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-xs font-black flex-shrink-0"
              style={{ background: a.bg, borderColor: "#08090c" }}
            >{a.l}</div>
          ))}
        </div>
        <div>
          <div className="flex gap-0.5 mb-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            ))}
          </div>
          <p className="text-white/40 text-xs">
            Trusted by <strong className="text-white/70">500+ engineers</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
}