"use client";

/* ─── AgentForm.tsx ────────────────────────────────────────────────────
   Full-screen modal — step-by-step chat-style consultation form.
   Features:
     • 5 conversational steps with slide animation
     • Animated progress bar
     • Phone step: CountryPicker + number input (placeholder per country)
     • Engineering field step: select + conditional "Other" text input
     • Enter-key navigation (except textarea)
     • Back navigation
     • Personalised success screen
──────────────────────────────────────────────────────────────────────── */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConsultationFormData } from "@/types/frontEnd";
import { AGENT_STEPS, COUNTRIES, ENG_FIELDS, OTHER_FIELD_VALUE } from "./constants";
import { CountryPicker } from "./countryPicker";



interface AgentFormProps { onClose: () => void; }

/* ── shared input style helper ── */
const baseInput: React.CSSProperties = {
  width: "100%", fontFamily: "inherit", fontSize: "0.88rem", color: "white",
  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 10, padding: "10px 14px", outline: "none",
  transition: "border-color .2s, box-shadow .2s", boxSizing: "border-box",
};

const focusStyle  = { borderColor: "rgba(200,16,46,0.55)", boxShadow: "0 0 0 3px rgba(200,16,46,0.1)" };
const blurStyle   = { borderColor: "rgba(255,255,255,0.12)", boxShadow: "none" };

export function AgentForm({ onClose }: AgentFormProps) {
  const [step, setStep]         = useState(0);
  const [done, setDone]         = useState(false);
  const [val,  setVal]          = useState("");
  /* "Other" engineering field text */
  const [otherField, setOtherField] = useState("");
  const [country, setCountry]   = useState(COUNTRIES[0]);
  const [formData, setFD]       = useState<ConsultationFormData>({
    name: "", email: "", phone: "", engineeringField: "", message: "",
  });

  const inputRef    = useRef<HTMLInputElement & HTMLTextAreaElement & HTMLSelectElement>(null);
  const otherRef    = useRef<HTMLInputElement>(null);

  const cur      = AGENT_STEPS[step];
  const progress = (step / AGENT_STEPS.length) * 100;

  const isOtherField = cur.id === "engineeringField" && val === OTHER_FIELD_VALUE;

  /* Focus input whenever step changes */
  useEffect(() => {
    setTimeout(() => {
      if (isOtherField) otherRef.current?.focus();
      else inputRef.current?.focus();
    }, 310);
    const existing = (formData)[cur.id] ?? "";
    setVal(cur.type === "phone" ? existing.replace(/^\+\d+ ?/, "") : existing);
    setOtherField("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  /* Focus other input when "Other" is selected */
  useEffect(() => {
    if (isOtherField) setTimeout(() => otherRef.current?.focus(), 60);
  }, [isOtherField]);

  /* Final value to store for this step */
  const resolvedValue = () => {
    if (cur.type === "phone")                return `${country.dial} ${val}`.trim();
    if (isOtherField)                        return otherField.trim();
    return val.trim();
  };

  const canAdvance = isOtherField ? otherField.trim().length > 0 : val.trim().length > 0;

  const advance = () => {
    const v = resolvedValue();
    if (!v) return;
    setFD(p => ({ ...p, [cur.id]: v }));
    if (step < AGENT_STEPS.length - 1) { setStep(s => s + 1); setVal(""); setOtherField(""); }
    else setDone(true);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && cur.type !== "textarea") { e.preventDefault(); advance(); }
  };

  /* ── render ── */
  return (
    <motion.div
      style={{
        position: "fixed", inset: 0, zIndex: 400,
        background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem",
      }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        style={{
          width: "100%", maxWidth: 480, position: "relative",
          background: "#0d0f14", border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 22, overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.8), 0 0 0 1px rgba(200,16,46,0.12)",
        }}
        initial={{ scale: 0.88, opacity: 0, y: 32 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{   scale: 0.9,  opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      >
        {/* Close */}
        <button
          onClick={onClose} aria-label="Close"
          style={{
            position: "absolute", top: 14, right: 14, zIndex: 10,
            width: 30, height: 30, borderRadius: 8, border: "none", cursor: "pointer",
            background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.55)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background .18s",
          }}
          onMouseOver={e => (e.currentTarget.style.background = "rgba(255,255,255,0.13)")}
          onMouseOut={e  => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {/* Animated top bar */}
        <div style={{
          height: 3,
          background: "linear-gradient(90deg,#c8102e,rgba(200,16,46,.35),#22c55e,rgba(200,16,46,.35),#c8102e)",
          backgroundSize: "300% 100%", animation: "agentBarShim 4s linear infinite",
        }} />

        <AnimatePresence mode="wait">

          {/* ── SUCCESS SCREEN ── */}
          {done ? (
            <motion.div
              key="done"
              style={{ padding: "2.5rem 2rem", textAlign: "center" }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.15 }}
                style={{
                  width: 60, height: 60, borderRadius: "50%", margin: "0 auto 1.2rem",
                  background: "linear-gradient(135deg,#16a34a,#22c55e)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 6px 24px rgba(34,197,94,0.4)",
                }}
              >
                <svg width="28" height="28" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                </svg>
              </motion.div>

              <p style={{ fontSize: "1.35rem", fontWeight: 800, color: "white", marginBottom: "0.5rem" }}>
                You&apos;re all set, {formData.name.split(" ")[0]}!
              </p>
              <p style={{ fontSize: "0.86rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: "1.8rem" }}>
                Our expert team will reach out to{" "}
                <strong style={{ color: "rgba(255,255,255,0.8)" }}>{formData.email}</strong> within 2 hours
                with your personalised CDR strategy.
              </p>

              <button
                onClick={onClose}
                style={{
                  fontFamily: "inherit", fontSize: "0.78rem", fontWeight: 700,
                  letterSpacing: "0.04em", textTransform: "uppercase",
                  color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)", borderRadius: 9,
                  padding: "9px 22px", cursor: "pointer", transition: "background .18s, color .18s",
                }}
                onMouseOver={e => { e.currentTarget.style.background = "rgba(255,255,255,0.11)"; e.currentTarget.style.color = "white"; }}
                onMouseOut={e  => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >← Back to Home</button>
            </motion.div>

          ) : (

            /* ── STEP SCREEN ── */
            <motion.div
              key={step}
              style={{ padding: "1.75rem" }}
              initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }}
              exit={{   opacity: 0, x: -28 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Agent header */}
              <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: "1.2rem" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 11, flexShrink: 0,
                  background: "linear-gradient(135deg,#c8102e,#8b0015)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: "0 4px 14px rgba(200,16,46,0.35)",
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "white" }}>CDR Expert Agent</div>
                  <div style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                      boxShadow: "0 0 5px rgba(34,197,94,0.7)", flexShrink: 0,
                      animation: "bdotPulse 2s infinite",
                    }} />
                    Online - Replies in ~2 hrs
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ height: 2.5, background: "rgba(255,255,255,0.07)", borderRadius: 2, marginBottom: 5, overflow: "hidden" }}>
                <motion.div
                  style={{ height: "100%", background: "linear-gradient(90deg,#c8102e,rgba(200,16,46,0.6))", borderRadius: 2 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
              <span style={{ fontSize: "0.6rem", fontWeight: 600, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "1rem" }}>
                Step {step + 1} of {AGENT_STEPS.length}
              </span>

              {/* Question bubble */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  background: "rgba(200,16,46,0.07)", border: "1px solid rgba(200,16,46,0.15)",
                  borderRadius: "0 14px 14px 14px", padding: "0.9rem 1.1rem", marginBottom: "1.1rem",
                }}
              >
                <p style={{ fontSize: "0.93rem", color: "rgba(255,255,255,0.88)", lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
                  {cur.label}
                </p>
              </motion.div>

              {/* ── INPUTS ── */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                {/* PHONE */}
                {cur.type === "phone" && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <CountryPicker value={country} onChange={c => { setCountry(c); }} />
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      type="tel"
                      placeholder={country.ph}
                      value={val}
                      onChange={e => setVal(e.target.value)}
                      onKeyDown={handleKey}
                      style={{ ...baseInput, flex: 1, minWidth: 0 }}
                      onFocus={e => Object.assign(e.target.style, focusStyle)}
                      onBlur={e  => Object.assign(e.target.style, blurStyle)}
                    />
                  </div>
                )}

                {/* ENGINEERING FIELD select + conditional "Other" text input */}
                {cur.type === "select" && (
                  <>
                    <div style={{ position: "relative" }}>
                      <select
                        ref={inputRef as React.RefObject<HTMLSelectElement>}
                        value={val}
                        onChange={e => { setVal(e.target.value); setOtherField(""); }}
                        onKeyDown={handleKey}
                        style={{
                          ...baseInput,
                          color: val ? "white" : "rgba(255,255,255,0.3)",
                          appearance: "none", cursor: "pointer", paddingRight: 32,
                        }}
                        onFocus={e => Object.assign(e.target.style, focusStyle)}
                        onBlur={e  => Object.assign(e.target.style, blurStyle)}
                      >
                        <option value="" disabled style={{ background: "#0d0f14" }}>Select your field…</option>
                        {ENG_FIELDS.map(f => (
                          <option key={f} value={f} style={{ background: "#0d0f14" }}>{f}</option>
                        ))}
                      </select>
                      {/* chevron icon */}
                      <svg
                        width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="rgba(255,255,255,0.4)" strokeWidth="2.5"
                        style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>

                    {/* "Other" free-text input — animates in when "Other" is selected */}
                    <AnimatePresence>
                      {isOtherField && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 0 }}
                          exit={{   opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          style={{ overflow: "hidden" }}
                        >
                          <input
                            ref={otherRef}
                            type="text"
                            placeholder="e.g. Geotechnical Engineering, Mining Engineering…"
                            value={otherField}
                            onChange={e => setOtherField(e.target.value)}
                            onKeyDown={handleKey}
                            style={baseInput}
                            onFocus={e => Object.assign(e.target.style, focusStyle)}
                            onBlur={e  => Object.assign(e.target.style, blurStyle)}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* TEXTAREA */}
                {cur.type === "textarea" && (
                  <textarea
                    ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                    rows={3}
                    placeholder={cur.ph}
                    value={val}
                    onChange={e => setVal(e.target.value)}
                    style={{ ...baseInput, resize: "none" }}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e  => Object.assign(e.target.style, blurStyle)}
                  />
                )}

                {/* TEXT / EMAIL */}
                {(cur.type === "text" || cur.type === "email") && (
                  <input
                    ref={inputRef as React.RefObject<HTMLInputElement>}
                    type={cur.type}
                    placeholder={cur.ph}
                    value={val}
                    onChange={e => setVal(e.target.value)}
                    onKeyDown={handleKey}
                    style={baseInput}
                    onFocus={e => Object.assign(e.target.style, focusStyle)}
                    onBlur={e  => Object.assign(e.target.style, blurStyle)}
                  />
                )}

                {/* Continue / Submit */}
                <button
                  onClick={advance}
                  disabled={!canAdvance}
                  style={{
                    width: "100%", padding: "12.5px", borderRadius: 10, border: "none",
                    cursor: canAdvance ? "pointer" : "not-allowed",
                    fontFamily: "inherit", fontSize: "0.83rem", fontWeight: 700,
                    letterSpacing: "0.05em", textTransform: "uppercase", color: "white",
                    background: "linear-gradient(135deg,#c8102e,#8b0015)",
                    boxShadow: "0 4px 20px rgba(200,16,46,0.35),inset 0 1px 0 rgba(255,255,255,0.12)",
                    opacity: canAdvance ? 1 : 0.35,
                    transition: "transform .18s, box-shadow .18s, opacity .18s",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                  }}
                  onMouseOver={e => { if (canAdvance) { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 26px rgba(200,16,46,0.44),inset 0 1px 0 rgba(255,255,255,0.12)"; } }}
                  onMouseOut={e  => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,16,46,0.35),inset 0 1px 0 rgba(255,255,255,0.12)"; }}
                >
                  {step < AGENT_STEPS.length - 1 ? (
                    <>Continue <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/></svg></>
                  ) : "Submit Request ✓"}
                </button>
              </div>

              {/* Back */}
              {step > 0 && (
                <button
                  onClick={() => setStep(s => s - 1)}
                  style={{
                    fontFamily: "inherit", fontSize: "0.72rem", fontWeight: 600,
                    color: "rgba(255,255,255,0.38)", background: "none", border: "none",
                    cursor: "pointer", padding: "8px 0", marginTop: 6, transition: "color .18s",
                  }}
                  onMouseOver={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                  onMouseOut={e  => (e.currentTarget.style.color = "rgba(255,255,255,0.38)")}
                >← Back</button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes agentBarShim { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }
          @keyframes bdotPulse    { 0%,100%{opacity:1} 50%{opacity:.45} }
        `}</style>
      </motion.div>
    </motion.div>
  );
}