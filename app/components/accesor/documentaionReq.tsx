"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeDown, fadeUp } from "../animations/animations";
import { ScrollReveal } from "../home/ui";

/* ─── Easing ────────────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

/* ─── Types ─────────────────────────────────────────────────────────── */
type AuthorityKey = "ea" | "acs" | "vetassess";
type OccupationType = "engineering" | "ict" | "other";

/* ─── Occupation selector ───────────────────────────────────────────── */
const OCCUPATION_OPTIONS: { key: OccupationType; label: string; authority: AuthorityKey }[] = [
  { key: "engineering", label: "Engineering",                authority: "ea"       },
  { key: "ict",         label: "Information Technology",     authority: "acs"      },
  { key: "other",       label: "Other Technical Occupations", authority: "vetassess" },
];
/* ─── Authority meta ─────────────────────────────────────────────────── */
const AUTHORITY_META: Record<AuthorityKey, { code: string; name: string; tag: string }> = {
  ea:        { code: "EA",        name: "Engineers Australia",          tag: "Engineering occupations"          },
  acs:       { code: "ACS",       name: "Australian Computer Society",   tag: "ICT occupations"                  },
  vetassess: { code: "VETASSESS", name: "VETASSESS",                     tag: "Professional & technical occupations" },
};

/* ─── Authority detail content ───────────────────────────────────────── */
type AuthorityDetail = {
  description: string;
  whoShouldApply: string;
  methodology: string;
  outcome: string;
  requiresCDR: boolean;
  requiresRPL: "yes" | "no" | "sometimes";
  requiresExperienceLetters: boolean;
  requiresCompetencyWriting: "yes" | "no" | "rpl-only";
  documents: { category: string; items: string[]; optional?: boolean }[];
  ctaInternal: { label: string; href: string };
  ctaExternal: { label: string; href: string };
  serviceHref: string;
};

const AUTHORITY_DETAIL: Record<AuthorityKey, AuthorityDetail> = {
  ea: {
    description:
      "Engineers Australia assesses engineering professionals under the Migration Skills Assessment (MSA) program. Applicants without an accredited engineering degree must submit a Competency Demonstration Report (CDR) — the most technically demanding documentation framework in the Australian skilled migration system. Each element must be evidenced at the paragraph level against EA's Stage 1 Competency Standard.",
    whoShouldApply:
      "Civil, mechanical, electrical, structural, chemical, software, and all other engineering professionals seeking skilled migration to Australia under subclass 189, 190, or 491 visas.",
    methodology:
      "EA assessors evaluate whether your documented engineering experience demonstrates the knowledge, skills, and judgement defined in the Stage 1 Competency Standard. Assessment is competency-based, not purely qualification-based — your writing must make the evidence explicit.",
    outcome:
      "Successful assessment recognises the applicant as a Professional Engineer, Engineering Technologist, Engineering Associate, or Engineering Manager depending on ANZSCO code and experience level.",
    requiresCDR: true,
    requiresRPL: "no",
    requiresExperienceLetters: true,
    requiresCompetencyWriting: "yes",
    documents: [
      {
        category: "CDR Documents (Core)",
        items: [
          "Career Episodes × 3 — detailed first-person engineering narratives demonstrating Stage 1 Competencies",
          "Summary Statement — paragraph-level cross-referencing of competency elements against Career Episodes",
          "CPD (Continuing Professional Development) — structured list of courses, training, and seminars",
        ],
      },
      {
        category: "Supporting Documents",
        items: [
          "Curriculum Vitae — complete engineering career history",
          "Degree certificates and academic transcripts",
          "Passport and personal identification",
          "Employment reference letters",
        ],
      },
      {
        category: "Optional",
        optional: true,
        items: ["English language test results (IELTS, PTE, OET)"],
      },
    ],
    ctaInternal: { label: "See EA Requirements", href: "/services/engineers-australia" },
    ctaExternal: { label: "Visit Official EA Website", href: "https://www.engineersaustralia.org.au" },
    serviceHref: "/services/engineers-australia",
  },
  acs: {
    description:
      "The Australian Computer Society assesses ICT professionals based on qualifications and employment experience aligned with ANZSCO ICT occupation standards. Critically, ACS does not require a CDR. Assessment follows one of three pathways depending on your educational background — from accredited ICT degrees through to full RPL for applicants without relevant formal qualifications.",
    whoShouldApply:
      "Software engineers, developer programmers, systems analysts, ICT business analysts, network engineers, and all other IT professionals seeking skilled migration to Australia.",
    methodology:
      "ACS evaluates qualification relevance and experience duration. Pathway 1 (accredited ICT degree) is the most straightforward. Pathway 3 (RPL) requires submission of two Project Reports demonstrating technical ICT contribution — a demanding but achievable alternative for non-ICT graduates.",
    outcome:
      "Positive skills assessment for ICT ANZSCO occupations including Software Engineer, Developer Programmer, Systems Analyst, ICT Business Analyst, and Network Engineer.",
    requiresCDR: false,
    requiresRPL: "sometimes",
    requiresExperienceLetters: true,
    requiresCompetencyWriting: "rpl-only",
    documents: [
      {
        category: "Pathway 1 — Accredited ICT Degree",
        items: [
          "Degree certificate and academic transcript",
          "Curriculum Vitae",
          "Employment reference letters",
          "Passport",
        ],
      },
      {
        category: "Pathway 2 — Non-ICT or Partially Related Degree",
        items: [
          "CV and employment reference letters",
          "Education documents",
          "ACS evaluates if work experience compensates for education gaps",
        ],
      },
      {
        category: "Pathway 3 — RPL (No ICT Degree / Unrelated Degree)",
        items: [
          "RPL Report — two Project Reports (Project 1: within last 3 years; Project 2: older project)",
          "Each project must detail your role, technologies used, system design, and personal contribution",
          "CV and employment references",
          "Passport and identification documents",
        ],
      },
    ],
    ctaInternal: { label: "See ACS Requirements", href: "/services/acs-skills-assessment" },
    ctaExternal: { label: "Visit Official ACS Website", href: "https://www.acs.org.au" },
    serviceHref: "/services/acs-skills-assessment",
  },
  vetassess: {
    description:
      "VETASSESS assesses a broad range of professional, managerial, and technical occupations outside the scope of specialist authorities. For engineering technologists, applied engineering roles, and many other technical specialists, VETASSESS provides a qualification-anchored pathway. No CDR, no RPL, and no competency writing is required — assessment is based on formal education and documented work experience.",
    whoShouldApply:
      "Engineering technologists, technical specialists, managers, and professionals in occupations not covered by EA or ACS, including some applied engineering and multidisciplinary technical roles.",
    methodology:
      "VETASSESS maps formal qualifications and employment history against defined criteria for the nominated ANZSCO occupation. The quality and specificity of employment evidence — particularly reference letters — is a primary determinant of assessment outcomes.",
    outcome:
      "Confirmation of qualification and employment suitability for the nominated ANZSCO occupation, enabling skilled migration visa applications.",
    requiresCDR: false,
    requiresRPL: "no",
    requiresExperienceLetters: true,
    requiresCompetencyWriting: "no",
    documents: [
      {
        category: "Core Documents",
        items: [
          "Curriculum Vitae — full employment history with roles, responsibilities, and dates",
          "Employment reference letters — must state job title, tasks performed, hours worked, and duration",
          "Degree certificate and academic transcripts",
          "Passport and identification documents",
        ],
      },
      {
        category: "Sometimes Required",
        optional: true,
        items: [
          "Payslips, tax records, or contracts as supplementary employment evidence",
        ],
      },
    ],
    ctaInternal: { label: "See VETASSESS Requirements", href: "/services/vetassess-skills-assessment" },
    ctaExternal: { label: "Visit Official VETASSESS Website", href: "https://www.vetassess.com.au" },
    serviceHref: "/services/vetassess-skills-assessment",
  },
};

/* ─── Comparison table data ──────────────────────────────────────────── */
const COMPARISON_ROWS = [
  {
    label: "Requires Career Episodes",
    ea: "Yes",
    acs: "No",
    vetassess: "No",
    eaPos: true,
    acsPos: false,
    vetassessPos: false,
  },
  {
    label: "Requires RPL Report",
    ea: "No",
    acs: "Pathway 3 only",
    vetassess: "No",
    eaPos: false,
    acsPos: null,
    vetassessPos: false,
  },
  {
    label: "Requires Experience Letters",
    ea: "Yes",
    acs: "Yes",
    vetassess: "Yes",
    eaPos: true,
    acsPos: true,
    vetassessPos: true,
  },
  {
    label: "Requires Competency Writing",
    ea: "Yes",
    acs: "RPL only",
    vetassess: "No",
    eaPos: true,
    acsPos: null,
    vetassessPos: false,
  },
  {
    label: "Qualification Anchor",
    ea: "Stage 1 Competency",
    acs: "ANZSCO ICT Standard",
    vetassess: "Formal qualification",
    eaPos: null,
    acsPos: null,
    vetassessPos: null,
  },
];

/* ══════════════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function AssessingAuthoritiesSection() {
  const [activeAuthority, setActiveAuthority] = useState<AuthorityKey>("ea");
  const [occupationType, setOccupationType] = useState<OccupationType | null>(null);

  const authorities = Object.keys(AUTHORITY_DETAIL) as AuthorityKey[];
  const active = AUTHORITY_DETAIL[activeAuthority];
  const activeMeta = AUTHORITY_META[activeAuthority];

  const handleOccupationSelect = (occ: OccupationType) => {
    setOccupationType(occ);
    const matched = OCCUPATION_OPTIONS.find((o) => o.key === occ);
    if (matched) setActiveAuthority(matched.authority);
  };

  const pillColor = (val: boolean | null) => {
    if (val === true)  return { bg: "rgba(200,16,46,0.08)", color: "var(--red)", border: "rgba(200,16,46,0.2)" };
    if (val === false) return { bg: "rgba(0,0,0,0.04)",    color: "#888",        border: "rgba(0,0,0,0.1)"     };
    return               { bg: "rgba(200,16,46,0.05)",     color: "#b07020",     border: "rgba(200,16,46,0.12)" };
  };

  return (
    <section
      id="assessing-authorities"
      className="sm:max-w-7xl mx-auto py-24 px-4 md:px-8"
      style={{ position: "relative" }}
    >
      {/* Radial gradient */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 35% at 50% 0%, rgba(200,16,46,0.04) 0%, transparent 65%)",
        }}
      />

      {/* ══ 1. HEADER ══════════════════════════════════════════════════ */}
      <ScrollReveal variant={fadeDown}>
        <div className="mb-14 max-w-2xl">
          <span
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full border"
            style={{
              color: "var(--red)",
              background: "rgba(200,16,46,0.05)",
              borderColor: "rgba(200,16,46,0.18)",
            }}
          >
            <span
              style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "var(--red)", display: "inline-block",
              }}
            />
            Documentation Requirements
          </span>

          <h2
            className="text-3xl sm:text-4xl font-bold leading-tight mb-4"
            style={{ fontFamily: "var(--font-serif)", color: "var(--ink, #1a1510)" }}
          >
            Assessing Authorities &{" "}
            <em style={{ color: "var(--red)", fontStyle: "italic" }}>
              Documentation Requirements
            </em>
          </h2>

          <p className="normal-paragraph leading-relaxed" style={{ maxWidth: "580px" }}>
            Each migration skills authority applies a different assessment methodology.
            Understanding which documents are required — and why — is critical to achieving
            a successful outcome.
          </p>
        </div>
      </ScrollReveal>

      {/* ══ 2. OCCUPATION SELECTOR ═════════════════════════════════════ */}
      <ScrollReveal variant={fadeUp} delay={0.05}>
        <div
          className="mb-10 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
          }}
        >
          <span
            className="text-xs font-bold tracking-widest uppercase flex-shrink-0"
            style={{ color: "#999" }}
          >
            Select your occupation type
          </span>
          <div className="flex flex-wrap gap-2">
            {OCCUPATION_OPTIONS.map((opt) => {
              const isSelected = occupationType === opt.key;
              return (
                <motion.button
                  key={opt.key}
                  onClick={() => handleOccupationSelect(opt.key)}
                  className="text-sm font-semibold px-4 py-2 rounded-full outline-none focus-visible:ring-2"
                  style={{
                    border: isSelected ? "1.5px solid var(--red)" : "1.5px solid rgba(0,0,0,0.13)",
                    background: isSelected ? "var(--red)" : "transparent",
                    color: isSelected ? "white" : "#555",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    boxShadow: isSelected ? "0 3px 12px rgba(200,16,46,0.22)" : "none",
                  }}
                  whileHover={!isSelected ? { scale: 1.03 } : {}}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "tween", duration: 0.16 }}
                >
                  {opt.label}
                </motion.button>
              );
            })}
          </div>
          {occupationType && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="text-xs ml-auto flex-shrink-0"
              style={{ color: "#aaa" }}
            >
              Showing:{" "}
              <strong style={{ color: "var(--red)" }}>
                {AUTHORITY_META[OCCUPATION_OPTIONS.find((o) => o.key === occupationType)!.authority].name}
              </strong>
            </motion.span>
          )}
        </div>
      </ScrollReveal>

      {/* ══ 3. AUTHORITY TABS ══════════════════════════════════════════ */}
      <ScrollReveal variant={fadeUp} delay={0.1}>
        <div className="flex flex-wrap gap-3 mb-8">
          {authorities.map((key) => {
            const isActive = activeAuthority === key;
            const meta = AUTHORITY_META[key];
            return (
              <motion.button
                key={key}
                onClick={() => setActiveAuthority(key)}
                className="relative flex items-center gap-2.5 px-5 py-3 rounded-2xl outline-none focus-visible:ring-2"
                style={{
                  border: isActive ? "1.5px solid var(--red)" : "1.5px solid rgba(0,0,0,0.1)",
                  background: isActive ? "var(--red)" : "white",
                  color: isActive ? "white" : "#444",
                  boxShadow: isActive
                    ? "0 4px 18px rgba(200,16,46,0.25)"
                    : "0 1px 6px rgba(0,0,0,0.05)",
                  cursor: "pointer",
                  transition: "all 0.22s",
                }}
                whileHover={!isActive ? { y: -2, boxShadow: "0 4px 14px rgba(0,0,0,0.1)" } : {}}
                whileTap={{ scale: 0.975 }}
                transition={{ type: "tween", duration: 0.18 }}
                aria-pressed={isActive}
              >
                {isActive && (
                  <motion.span
                    layoutId="authority-btn-glow"
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    style={{ boxShadow: "0 0 0 3px rgba(200,16,46,0.13)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className="text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{
                    background: isActive ? "rgba(255,255,255,0.18)" : "rgba(200,16,46,0.07)",
                    color: isActive ? "rgba(255,255,255,0.9)" : "var(--red)",
                    border: isActive ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(200,16,46,0.15)",
                  }}
                >
                  {meta.code}
                </span>
                <span className="font-semibold text-sm">{meta.name}</span>
              </motion.button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* ══ 4. DETAIL PANEL ════════════════════════════════════════════ */}
      <ScrollReveal variant={fadeUp} delay={0.12}>
        <div
          className="rounded-2xl overflow-hidden mb-12"
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
            minHeight: 220,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeAuthority}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              {/* Panel header */}
              <div
                className="px-6 sm:px-8 md:px-10 py-5 flex flex-wrap items-center justify-between gap-4"
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                  background: "rgba(200,16,46,0.02)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg"
                    style={{
                      background: "rgba(200,16,46,0.08)",
                      color: "var(--red)",
                      border: "1px solid rgba(200,16,46,0.15)",
                    }}
                  >
                    {activeMeta.code}
                  </span>
                  <h3
                    className="font-bold text-lg sm:text-xl"
                    style={{ fontFamily: "var(--font-serif)", color: "var(--ink, #1a1510)" }}
                  >
                    {activeMeta.name}
                  </h3>
                  <span
                    className="hidden sm:inline text-xs px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(0,0,0,0.04)",
                      color: "#888",
                      border: "1px solid rgba(0,0,0,0.08)",
                    }}
                  >
                    {activeMeta.tag}
                  </span>
                </div>

                {/* CDR badge */}
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={
                    active.requiresCDR
                      ? { background: "rgba(200,16,46,0.08)", color: "var(--red)", border: "1px solid rgba(200,16,46,0.2)" }
                      : { background: "rgba(0,0,0,0.04)", color: "#888", border: "1px solid rgba(0,0,0,0.1)" }
                  }
                >
                  {active.requiresCDR ? "CDR Required" : "No CDR Required"}
                </span>
              </div>

              {/* Panel body */}
              <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">

                {/* Col 1 — description + who */}
                <div className="lg:col-span-1">
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-3"
                    style={{ color: "#999" }}
                  >
                    Overview
                  </p>
                  <p className="normal-paragraph leading-relaxed mb-5" style={{ fontSize: "0.875rem" }}>
                    {active.description}
                  </p>

                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-2"
                    style={{ color: "#999" }}
                  >
                    Who Should Apply
                  </p>
                  <p style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.65 }}>
                    {active.whoShouldApply}
                  </p>

                  <div className="mt-5 pt-5" style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                    <p
                      className="text-xs font-bold tracking-widest uppercase mb-2"
                      style={{ color: "#999" }}
                    >
                      Assessment Outcome
                    </p>
                    <p style={{ fontSize: "0.84rem", color: "#666", lineHeight: 1.65 }}>
                      {active.outcome}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="mt-6 flex flex-col gap-2.5">
                    <Link href={active.ctaInternal.href}>
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ type: "tween", duration: 0.18, ease: EASE }}
                        className="w-full text-sm font-bold py-2.5 rounded-xl"
                        style={{
                          background: "var(--red)",
                          color: "#fff",
                          border: "1.5px solid var(--red)",
                          cursor: "pointer",
                          boxShadow: "0 3px 14px rgba(200,16,46,0.22)",
                        }}
                      >
                        {active.ctaInternal.label}
                      </motion.button>
                    </Link>
                    <a href={active.ctaExternal.href} target="_blank" rel="noopener noreferrer">
                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ type: "tween", duration: 0.18, ease: EASE }}
                        className="w-full text-sm font-semibold py-2.5 rounded-xl"
                        style={{
                          background: "transparent",
                          color: "#555",
                          border: "1.5px solid rgba(0,0,0,0.13)",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--red)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--red)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0,0,0,0.13)";
                          (e.currentTarget as HTMLButtonElement).style.color = "#555";
                        }}
                      >
                        {active.ctaExternal.label} ↗
                      </motion.button>
                    </a>
                  </div>
                </div>

                {/* Vertical divider */}
                <div
                  className="hidden lg:block w-px"
                  style={{ background: "rgba(0,0,0,0.07)" }}
                />

                {/* Col 2-3 — documents */}
                <div className="lg:col-span-1">
                  <p
                    className="text-xs font-bold tracking-widest uppercase mb-5"
                    style={{ color: "#999" }}
                  >
                    Required Documents
                  </p>

                  <div className="space-y-5">
                    {active.documents.map((docGroup, gi) => (
                      <motion.div
                        key={gi}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: EASE, delay: 0.06 + gi * 0.07 }}
                      >
                        <div className="flex items-center gap-2 mb-2.5">
                          <span
                            className="text-xs font-bold tracking-wide"
                            style={{
                              color: docGroup.optional ? "#aaa" : "var(--red)",
                              opacity: docGroup.optional ? 0.85 : 0.9,
                            }}
                          >
                            {docGroup.category}
                          </span>
                          {docGroup.optional && (
                            <span
                              className="text-xs px-1.5 py-0.5 rounded"
                              style={{
                                background: "rgba(0,0,0,0.04)",
                                color: "#bbb",
                                border: "1px solid rgba(0,0,0,0.07)",
                              }}
                            >
                              Optional
                            </span>
                          )}
                        </div>
                        <ul className="space-y-2">
                          {docGroup.items.map((item, ii) => (
                            <li key={ii} className="flex items-start gap-2.5">
                              <span
                                className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                                style={{
                                  background: docGroup.optional
                                    ? "rgba(0,0,0,0.04)"
                                    : "rgba(200,16,46,0.07)",
                                  border: docGroup.optional
                                    ? "1px solid rgba(0,0,0,0.1)"
                                    : "1px solid rgba(200,16,46,0.14)",
                                  fontSize: "9px",
                                  color: docGroup.optional ? "#bbb" : "var(--red)",
                                  fontWeight: 700,
                                }}
                              >
                                ✓
                              </span>
                              <span
                                className="leading-relaxed"
                                style={{ fontSize: "0.82rem", color: "#5a5a5a" }}
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </ScrollReveal>

      {/* ══ 5. COMPARISON TABLE ════════════════════════════════════════ */}
      <ScrollReveal variant={fadeUp} delay={0.1}>
        <div className="mb-12">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-5"
            style={{ color: "#999" }}
          >
            Authority Comparison
          </p>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid rgba(0,0,0,0.07)",
              boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
              background: "white",
            }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-4 px-5 py-3"
              style={{
                background: "rgba(200,16,46,0.02)",
                borderBottom: "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <div
                className="col-span-1 text-xs font-bold tracking-widest uppercase"
                style={{ color: "#bbb" }}
              >
                Requirement
              </div>
              {(["ea", "acs", "vetassess"] as AuthorityKey[]).map((key) => (
                <div key={key} className="text-center">
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded"
                    style={{
                      background: "rgba(200,16,46,0.07)",
                      color: "var(--red)",
                      border: "1px solid rgba(200,16,46,0.14)",
                    }}
                  >
                    {AUTHORITY_META[key].code}
                  </span>
                </div>
              ))}
            </div>

            {COMPARISON_ROWS.map((row, ri) => (
              <div
                key={ri}
                className="grid grid-cols-4 px-5 py-3.5 items-center"
                style={{
                  borderBottom: ri < COMPARISON_ROWS.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  background: ri % 2 === 0 ? "transparent" : "rgba(0,0,0,0.012)",
                }}
              >
                <div
                  className="col-span-1 text-sm"
                  style={{ color: "#444", fontWeight: 500 }}
                >
                  {row.label}
                </div>
                {(
                  [
                    { val: row.ea, pos: row.eaPos },
                    { val: row.acs, pos: row.acsPos },
                    { val: row.vetassess, pos: row.vetassessPos },
                  ] as { val: string; pos: boolean | null }[]
                ).map((cell, ci) => {
                  const style = pillColor(cell.pos);
                  return (
                    <div key={ci} className="flex justify-center">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full text-center"
                        style={{
                          background: style.bg,
                          color: style.color,
                          border: `1px solid ${style.border}`,
                          maxWidth: 120,
                          display: "inline-block",
                        }}
                      >
                        {cell.val}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* ══ 6. FOOTER TRUST NOTE ═══════════════════════════════════════ */}
      <ScrollReveal variant={fadeUp} delay={0.12}>
        <div
          className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8"
          style={{
            background: "white",
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 14px rgba(0,0,0,0.05)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Accent line */}
          <div
            className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
            style={{ background: "var(--red)", opacity: 0.65 }}
          />

          <div className="flex-1">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-2"
              style={{ color: "var(--red)", opacity: 0.75 }}
            >
              Our Role in Your Application
            </p>
            <p style={{ fontSize: "0.875rem", color: "#5a5a5a", lineHeight: 1.7 }}>
              We guide applicants through EA CDR preparation, ACS RPL report development, and
              VETASSESS documentation review — ensuring alignment with assessor expectations
              before submission. Portal submission is completed by you; our role is to ensure
              you are fully prepared before you lodge.
            </p>
          </div>

          <Link href="/contact" className="flex-shrink-0">
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: "tween", duration: 0.2, ease: EASE }}
              className="text-sm font-bold px-6 py-3 rounded-xl whitespace-nowrap"
              style={{
                background: "var(--red)",
                color: "#fff",
                border: "1.5px solid var(--red)",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(200,16,46,0.22)",
              }}
            >
              Speak to a Specialist
            </motion.button>
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}