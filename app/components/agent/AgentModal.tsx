"use client";

import { motion, AnimatePresence } from "framer-motion";
import AgentForm from "./AgentForm";

const TRUST_POINTS = [
  "High commission on every referral",
  "Fast & dedicated support team",
  "Trusted by 100+ clients worldwide",
  "Earn more than you expected — guaranteed bonus structure",
];

export default function AgentModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="agent-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="agent-modal"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl pointer-events-auto"
              style={{
                background: "rgba(10,10,10,0.96)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset",
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="px-8 pt-8 pb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                    <span className="text-lg">🤝</span>
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold tracking-tight">Partner With Us</h2>
                    <p className="text-white/50 text-xs">Earn by referring clients for Skill Assessment & Migration Services</p>
                  </div>
                </div>

                {/* Trust Points */}
                <div className="grid grid-cols-2 gap-2 mt-5">
                  {TRUST_POINTS.map((point) => (
                    <div key={point} className="flex items-start gap-2 text-[12px]">
                      <svg className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-white/60">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-white/10 mt-5" />
              </div>

              {/* Form */}
              <div className="px-8 pb-8">
                <AgentForm onSuccess={onClose} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
