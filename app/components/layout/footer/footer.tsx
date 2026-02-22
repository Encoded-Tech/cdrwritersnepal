"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";

// ─── Logo config — edit these two lines only ─────────────────────────────────
const LOGO_SRC = "/loogoo.png"; // path relative to /public
const HAS_LOGO = true;       // set true once your image is in /public
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ────────────────────────────────────────────────────────────────────

interface Profession {
  label: string;
  href: string;
}

interface NavLinkItem {
  label: string;
  href: string;
}

interface NavLinks {
  [section: string]: NavLinkItem[];
}

interface TrustBadge {
  icon: string;
  label: string;
}

interface SocialLink {
  label: string;
  href: string;
  svg: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EngineeringProfessions: Profession[] = [
  { label: "Engineering Manager",               href: "/cdr-osca-codes/engineering-manager" },
  { label: "Chemical Engineer",                 href: "/cdr-osca-codes/chemical-engineer" },
  { label: "Materials Engineer",                href: "/cdr-osca-codes/materials-engineer" },
  { label: "Civil Engineer",                    href: "/cdr-osca-codes/civil-engineer" },
  { label: "Geotechnical Engineer",             href: "/cdr-osca-codes/geotechnical-engineer" },
  { label: "Structural Engineer",               href: "/cdr-osca-codes/structural-engineer" },
  { label: "Transport Engineer",                href: "/cdr-osca-codes/transport-engineer" },
  { label: "Electrical Engineer",               href: "/cdr-osca-codes/electrical-engineer" },
  { label: "Electronics Engineer",              href: "/cdr-osca-codes/electronics-engineer" },
  { label: "Industrial Engineer",               href: "/cdr-osca-codes/industrial-engineer" },
  { label: "Mechanical Engineer",               href: "/cdr-osca-codes/mechanical-engineer" },
  { label: "Plant or Production Engineer",      href: "/cdr-osca-codes/plant-or-production-engineer" },
  { label: "Mining Engineer",                   href: "/cdr-osca-codes/mining-engineer" },
  { label: "Petroleum Engineer",                href: "/cdr-osca-codes/petroleum-engineer" },
  { label: "Biomedical Engineer",               href: "/cdr-osca-codes/biomedical-engineer" },
  { label: "Engineering Technologist",          href: "/cdr-osca-codes/engineering-technologist" },
  { label: "Environmental Engineer",            href: "/cdr-osca-codes/environmental-engineer" },
  { label: "Telecommunications Engineer",       href: "/cdr-osca-codes/telecommunications-engineer" },
  { label: "Engineering Professionals nec",     href: "/cdr-osca-codes/engineering-professionals-nec" },
  { label: "Civil Engineering Draftsperson",    href: "/cdr-osca-codes/civil-engineering-draftperson" },
  { label: "Civil Engineering Technician",      href: "/cdr-osca-codes/civil-engineering-technician" },
  { label: "Electrical Engineering Draftsperson", href: "/cdr-osca-codes/electrical-engineering-draftperson" },
  { label: "Electrical Engineering Technician", href: "/cdr-osca-codes/electrical-engineering-technician" },
  { label: "Telecommunications Field Engineer", href: "/cdr-osca-codes/telecommunications-field-engineer" },
];

const navLinks: NavLinks = {
  Services: [
    { label: "CDR Writing",       href: "/services" },
    { label: "CDR Review",        href: "/services#review" },
    { label: "Career Episode",    href: "/services#career-episode" },
    { label: "Summary Statement", href: "/services#summary" },
    { label: "RPL Report",        href: "/services#rpl" },
  ],
  "Why Us": [
    { label: "AI & Plagiarism Free",          href: "/ai-and-plagiarism-free-content" },
    { label: "Engineers Australia Guidelines", href: "/engineers-australia-guidelines" },
    { label: "Expert Problem Solving",         href: "/demonstrating-engineering-problem-solving" },
    { label: "Technical Detailing",            href: "/technical-detailing" },
  ],
  Company: [
    { label: "About Us",     href: "/about" },
    { label: "ANZSCO Codes", href: "/cdr-osca-codes" },
    { label: "Pricing",      href: "/cdr-pricing" },
    { label: "Contact",      href: "/contact" },
    { label: "Blog",         href: "/blog" },
  ],
};

const trustBadges: TrustBadge[] = [
  { icon: "✦", label: "500+ CDRs Approved" },
  { icon: "◈", label: "Engineers Australia Compliant" },
  { icon: "◉", label: "100% Plagiarism Free" },
  { icon: "✦", label: "Guaranteed Satisfaction" },
];

const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/9779840955770",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

// ─── Logo sub-component ───────────────────────────────────────────────────────

function FooterLogo(): React.ReactElement {
  const [imgError, setImgError] = useState<boolean>(false);
  const showPlaceholder = !HAS_LOGO || imgError;

  return (
    <Link href="/" className="flex items-center gap-3 group select-none outline-none">
      {/* Logo mark */}
      <div className="relative shrink-0">
        {/* Soft red glow */}
        <div
          className="absolute -inset-1 rounded-xl blur-md opacity-40 group-hover:opacity-65 transition-opacity duration-300 pointer-events-none"
          style={{ background: "linear-gradient(135deg,#ef4444,#b91c1c)" }}
        />

        {showPlaceholder ? (
          /* ── Placeholder ── shown when HAS_LOGO = false OR image fails */
          <div
            className="relative w-10 h-10 rounded-xl flex flex-col items-center justify-center gap-0.5"
            style={{
              background: "linear-gradient(135deg,#1c1c1c,#111)",
              border: "1px dashed rgba(239,68,68,0.40)",
            }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={1.5}>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path strokeLinecap="round" d="M21 15l-5-5L5 21" />
            </svg>
            <span
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "7px",
                color: "rgba(239,68,68,0.5)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              logo
            </span>
          </div>
        ) : (
          /* ── Real logo image ── place your file at /public/logo.png */
          <div className="relative w-10 h-10 rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_SRC}
              alt="CDR Writers Nepal"
              width={40}
              height={40}
              className="w-full h-full object-contain"
              draggable={false}
              onError={(): void => setImgError(true)}
            />
          </div>
        )}
      </div>

      {/* Wordmark */}
      <span
        className="font-bold text-white text-lg tracking-tight"
        style={{ fontFamily: "'Syne',sans-serif" }}
      >
        CDR Writers Nepal
      </span>
    </Link>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function CDRFooter(): React.ReactElement {
  const [email, setEmail]                       = useState<string>("");
  const [subscribed, setSubscribed]             = useState<boolean>(false);
  const [showAllProfessions, setShowAllProfessions] = useState<boolean>(false);

  const handleSubscribe = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  const visibleProfessions: Profession[] = showAllProfessions
    ? EngineeringProfessions
    : EngineeringProfessions.slice(0, 12);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .footer-root {
          font-family: 'DM Sans', sans-serif;
          background: #0b0f0c;
          position: relative;
          overflow: hidden;
        }
        .footer-root::before {
          content: '';
          position: absolute;
          top: -180px;
          left: -180px;
          width: 560px;
          height: 560px;
          background: radial-gradient(circle, rgba(220,38,38,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .footer-root::after {
          content: '';
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(22,163,74,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .syne { font-family: 'Syne', sans-serif; }
        .footer-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(220,38,38,0.15), rgba(22,163,74,0.12), transparent);
        }
        .cta-bar {
          background: linear-gradient(135deg, rgba(220,38,38,0.10) 0%, rgba(22,163,74,0.08) 100%);
          border: 1px solid rgba(220,38,38,0.22);
          backdrop-filter: blur(12px);
        }
        .footer-link {
          color: #9ca3af;
          font-size: 14px;
          transition: color 0.2s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .footer-link:hover { color: #22c55e; }
        .footer-link::before {
          content: '→';
          font-size: 11px;
          opacity: 0;
          transform: translateX(-6px);
          transition: opacity 0.2s, transform 0.2s;
          color: #22c55e;
        }
        .footer-link:hover::before { opacity: 1; transform: translateX(0); }
        .newsletter-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: #f9fafb;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .newsletter-input:focus {
          border-color: rgba(220,38,38,0.38);
          background: rgba(220,38,38,0.04);
        }
        .newsletter-input::placeholder { color: #4b5563; }
        .newsletter-btn {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          color: white;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          letter-spacing: 0.02em;
          transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(220,38,38,0.22);
          border: none;
        }
        .newsletter-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
          box-shadow: 0 6px 24px rgba(220,38,38,0.34);
        }
        .social-btn {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: #9ca3af;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          text-decoration: none;
        }
        .social-btn:hover {
          background: rgba(22,163,74,0.12);
          border-color: rgba(22,163,74,0.28);
          color: #22c55e;
          transform: translateY(-2px);
        }
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          background: rgba(22,163,74,0.07);
          border: 1px solid rgba(22,163,74,0.18);
          border-radius: 8px;
          font-size: 13px;
          color: #a3c8a8;
        }
        .trust-badge-icon { color: #22c55e; font-size: 14px; line-height: 1; }
        .profession-chip {
          font-size: 13px;
          color: #6b7280;
          padding: 5px 12px;
          border-radius: 6px;
          text-decoration: none;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          transition: color 0.2s, background 0.2s, border-color 0.2s;
          display: block;
          line-height: 1.4;
        }
        .profession-chip:hover {
          color: #dcfce7;
          background: rgba(22,163,74,0.07);
          border-color: rgba(22,163,74,0.22);
        }
        .cta-primary {
          background: linear-gradient(135deg, #ef4444 0%, #b91c1c 100%);
          color: white;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 0.02em;
          padding: 12px 24px;
          border-radius: 10px;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: opacity 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 4px 24px rgba(239,68,68,0.30);
        }
        .cta-primary:hover {
          opacity: 0.92;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(239,68,68,0.42);
        }
        .show-more-btn {
          color: #ef4444;
          font-size: 13px;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          padding: 6px 0;
          transition: opacity 0.2s;
        }
        .show-more-btn:hover { opacity: 0.75; }
        .section-label {
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          color: #22c55e;
          margin-bottom: 16px;
        }
        .nav-heading {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #e5e7eb;
          margin-bottom: 14px;
        }
        .contact-icon { color: #22c55e; }
      `}</style>

      <footer className="footer-root">

        {/* ── CTA BAR ── */}
        <div className="cta-bar mx-6 mt-8 mb-0 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="syne font-bold text-white text-lg leading-tight">
              Ready to migrate to Australia?
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Get a free CDR review from our certified experts — limited slots available.
            </p>
          </div>
          <a href="/contact" className="cta-primary whitespace-nowrap shrink-0">
            Get Free CDR Review
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">

          {/* Top Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">

            {/* Brand Column */}
            <div className="lg:col-span-4">

              {/* Logo placeholder system */}
              <div className="mb-5">
                <FooterLogo />
              </div>

              <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
                Nepal&apos;s most trusted CDR writing service. We&apos;ve helped 500+ engineers across
                disciplines achieve successful skills assessment through Engineers Australia —
                with precision, integrity, and zero plagiarism.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                {trustBadges.map((b: TrustBadge) => (
                  <span key={b.label} className="trust-badge">
                    <span className="trust-badge-icon">{b.icon}</span>
                    {b.label}
                  </span>
                ))}
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 mr-1">Follow us</span>
                {socialLinks.map((s: SocialLink) => (
                  <a key={s.label} href={s.href} aria-label={s.label} className="social-btn">
                    {s.svg}
                  </a>
                ))}
              </div>
            </div>

            {/* Nav Links */}
            <div className="lg:col-span-5 grid grid-cols-3 gap-6">
              {Object.entries(navLinks).map(([section, links]: [string, NavLinkItem[]]) => (
                <div key={section}>
                  <p className="nav-heading">{section}</p>
                  <ul className="space-y-2">
                    {links.map((link: NavLinkItem) => (
                      <li key={link.label}>
                        <a href={link.href} className="footer-link">{link.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Newsletter + Contact */}
            <div className="lg:col-span-3">
              <p className="nav-heading">Stay Informed</p>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Get CDR tips, EA guidelines updates, and migration insights — directly to your inbox.
              </p>

              {subscribed ? (
                <div
                  className="text-sm py-3"
                  style={{ color: "#22c55e", fontFamily: "Syne, sans-serif", fontWeight: 500 }}
                >
                  ✦ You&apos;re in! Watch your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mb-6">
                  <input
                    type="email"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="newsletter-input rounded-lg px-4 py-2.5 text-sm w-full"
                  />
                  <button type="submit" className="newsletter-btn rounded-lg py-2.5 text-sm w-full">
                    Subscribe
                  </button>
                </form>
              )}

              <div className="footer-divider mb-4" />

              <p className="nav-heading">Get in Touch</p>
              <div className="space-y-2">
                <a href="mailto:cdrwritersnepal@gmail.com" className="footer-link text-sm">
                  <svg className="w-3.5 h-3.5 contact-icon shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  cdrwritersnepal@gmail.com
                </a>
                <a href="tel:+9779840955770" className="footer-link text-sm">
                  <svg className="w-3.5 h-3.5 contact-icon shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +977 9840955770
                </a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider mb-10" />

          {/* Engineering Professions */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="section-label">ANZSCO Codes We Cover</p>
                <p className="syne font-bold text-white text-base">Engineering Professions</p>
              </div>
              <button
                onClick={(): void => setShowAllProfessions(!showAllProfessions)}
                className="show-more-btn"
              >
                {showAllProfessions ? "Show less ↑" : `Show all ${EngineeringProfessions.length} →`}
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {visibleProfessions.map((p: Profession) => (
                <a key={p.href} href={p.href} className="profession-chip">
                  {p.label}
                </a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider mb-6" />

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <p>© {new Date().getFullYear()} CDR Writers Nepal. All rights reserved.</p>
            <div className="flex items-center gap-5">
              <a href="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy Policy</a>
              <a href="/terms"          className="hover:text-gray-400 transition-colors">Terms of Service</a>
              <a href="/refund-policy"  className="hover:text-gray-400 transition-colors">Refund Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}