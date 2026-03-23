"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { agentApplicationSchema, type AgentApplicationData } from "@/lib/validation/agentSchema";
import { submitAgentApplication, type ActionResult } from "@/lib/actions/agentActions";

const PROFESSIONS = ["Engineer", "IT Professional", "Trades", "Business", "Healthcare", "Finance", "Other"] as const;
const CLIENT_RANGES = ["1-5", "5-10", "10+"] as const;

const inputStyle = `
  w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3
  text-white text-sm placeholder:text-white/30
  outline-none transition-all duration-200
  focus:border-emerald-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]
`;

const selectStyle = `
  w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3
  text-white text-sm appearance-none cursor-pointer
  outline-none transition-all duration-200
  focus:border-emerald-500/50 focus:bg-white/[0.06] focus:shadow-[0_0_0_3px_rgba(16,185,129,0.1)]
`;

const labelStyle = "block text-white/70 text-xs font-semibold uppercase tracking-wider mb-2";
const errorStyle = "text-red-400 text-[11px] mt-1.5 font-medium";

function SectionLabel({ icon, title }: { icon: string; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 mt-2">
      <span className="text-base">{icon}</span>
      <h4 className="text-white/90 text-[13px] font-bold uppercase tracking-wider">{title}</h4>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

export default function AgentForm({ onSuccess }: { onSuccess: () => void }) {
  const [result, setResult] = useState<ActionResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<AgentApplicationData>({
    resolver: zodResolver(agentApplicationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: AgentApplicationData) => {
    setSubmitting(true);
    setResult(null);
    try {
      const res = await submitAgentApplication(data);
      setResult(res);
      if (res.success) {
        setTimeout(onSuccess, 2500);
      }
    } catch {
      setResult({ success: false, message: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (result?.success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-12 px-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-5"
        >
          <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-white text-xl font-bold mb-2">Application Received!</h3>
        <p className="text-white/60 text-sm max-w-xs">{result.message}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 overflow-x-hidden">
      {/* Error banner */}
      {result && !result.success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-sm text-center"
        >
          {result.message}
        </motion.div>
      )}

      {/* SECTION 1: Personal Info */}
      <SectionLabel icon="👤" title="Personal Info" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelStyle}>Full Name *</label>
          <input {...register("fullName")} placeholder="John Doe" className={inputStyle} />
          {errors.fullName && <p className={errorStyle}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label className={labelStyle}>Email *</label>
          <input {...register("email")} type="email" placeholder="john@example.com" className={inputStyle} />
          {errors.email && <p className={errorStyle}>{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label className={labelStyle}>Phone *</label>
        <input {...register("phone")} type="tel" placeholder="+977 98XXXXXXXX" className={inputStyle} />
        {errors.phone && <p className={errorStyle}>{errors.phone.message}</p>}
      </div>

      {/* SECTION 2: Background */}
      <SectionLabel icon="🌍" title="Background" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelStyle}>Country *</label>
          <input {...register("country")} placeholder="e.g. Nepal" className={inputStyle} />
          {errors.country && <p className={errorStyle}>{errors.country.message}</p>}
        </div>
        <div>
          <label className={labelStyle}>Profession *</label>
          <select {...register("profession")} className={selectStyle} defaultValue="">
            <option value="" disabled className="bg-[#111]">Select profession</option>
            {PROFESSIONS.map((p) => (
              <option key={p} value={p} className="bg-[#111]">{p}</option>
            ))}
          </select>
          {errors.profession && <p className={errorStyle}>{errors.profession.message}</p>}
        </div>
      </div>
      <div>
        <label className={labelStyle}>Do you have migration knowledge? *</label>
        <div className="flex gap-4 mt-1">
          {(["yes", "no"] as const).map((val) => (
            <label key={val} className="flex items-center gap-2 cursor-pointer group">
              <input type="radio" value={val} {...register("hasMigrationKnowledge")} className="sr-only peer" />
              <div className="w-5 h-5 rounded-full border-2 border-white/20 peer-checked:border-emerald-500 peer-checked:bg-emerald-500/20 transition-all flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-emerald-400 opacity-0 peer-checked:opacity-100 transition-opacity scale-0 peer-checked:scale-100" />
              </div>
              <span className="text-white/70 text-sm capitalize group-hover:text-white/90 transition-colors">{val}</span>
            </label>
          ))}
        </div>
        {errors.hasMigrationKnowledge && <p className={errorStyle}>{errors.hasMigrationKnowledge.message}</p>}
      </div>

      {/* SECTION 3: Agent Capability */}
      <SectionLabel icon="🚀" title="Agent Capability" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelStyle}>Do you have existing clients? *</label>
          <select {...register("hasExistingClients")} className={selectStyle} defaultValue="">
            <option value="" disabled className="bg-[#111]">Select</option>
            <option value="yes" className="bg-[#111]">Yes</option>
            <option value="no" className="bg-[#111]">No</option>
          </select>
          {errors.hasExistingClients && <p className={errorStyle}>{errors.hasExistingClients.message}</p>}
        </div>
        <div>
          <label className={labelStyle}>Expected clients/month *</label>
          <select {...register("expectedClientsPerMonth")} className={selectStyle} defaultValue="">
            <option value="" disabled className="bg-[#111]">Select range</option>
            {CLIENT_RANGES.map((r) => (
              <option key={r} value={r} className="bg-[#111]">{r} clients</option>
            ))}
          </select>
          {errors.expectedClientsPerMonth && <p className={errorStyle}>{errors.expectedClientsPerMonth.message}</p>}
        </div>
      </div>
      <div>
        <label className={labelStyle}>Target Audience *</label>
        <textarea
          {...register("targetAudience")}
          rows={3}
          placeholder="Describe who you'd refer (e.g., Nepali engineers looking to migrate to Australia)"
          className={`${inputStyle} resize-none`}
        />
        {errors.targetAudience && <p className={errorStyle}>{errors.targetAudience.message}</p>}
      </div>

      {/* SECTION 4: Additional */}
      <SectionLabel icon="💬" title="Additional Info" />
      <div>
        <label className={labelStyle}>Message (optional)</label>
        <textarea
          {...register("message")}
          rows={2}
          placeholder="Anything else you'd like us to know?"
          className={`${inputStyle} resize-none`}
        />
      </div>

      {/* Submit */}
      <motion.button
        type="submit"
        disabled={!isValid || submitting}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200
          ${isValid && !submitting
            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
            : "bg-white/5 text-white/30 cursor-not-allowed"
          }
        `}
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </span>
        ) : (
          "Submit Application →"
        )}
      </motion.button>
    </form>
  );
}
