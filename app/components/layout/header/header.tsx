"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  type Transition,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
}

interface ServiceItem {
  label: string;
  href: string;
  tagline: string;
  description: string;
  icon: string;
  badge?: string;
  highlights: string[];
  accentColor: string;
}

interface LogoProps {
  scrolled: boolean;
}

interface NavPillProps {
  link: NavLink;
  isActive: boolean;
  onClick: () => void;
}

interface MobileMenuProps {
  open: boolean;
  activeSection: string | null;
  activeServiceHref: string | null;
  onClose: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SERVICE_ITEMS: ServiceItem[] = [
  {
    label: "EA CDR Writing",
    href: "/services/ea",
    tagline: "Engineers Australia",
    description: "Professionally written Career Episodes, Summary Statement & CPD that fully meet EA guidelines for skilled migration to Australia.",
    icon: "⚙️",
    badge: "Most Popular",
    highlights: ["Career Episodes", "Summary Statement", "CPD Report"],
    accentColor: "#10b981",
  },
  {
    label: "ACS RPL Writing",
    href: "/services/acs",
    tagline: "Australian Computer Society",
    description: "Expert RPL reports for ICT professionals seeking a skills assessment through the Australian Computer Society pathway.",
    icon: "💻",
    highlights: ["RPL Report", "ICT Assessment", "Project Evidence"],
    accentColor: "#3b82f6",
  },
  {
    label: "VETASSESS Assessment",
    href: "/services/vetassess",
    tagline: "Professional Skills",
    description: "Comprehensive skills assessment documentation for VETASSESS across a wide range of professional and trade occupations.",
    icon: "🎓",
    badge: "New",
    highlights: ["Skills Assessment", "Qualifications Review", "Work Evidence"],
    accentColor: "#a855f7",
  },
  {
    label: "CV Writing Services",
    href: "/services/cv",
    tagline: "Migration-Ready Resume",
    description: "ATS-optimised, Australia-standard CVs crafted to highlight your skills for visa sponsorship and employment applications.",
    icon: "📄",
    highlights: ["ATS Optimised", "Australia Format", "LinkedIn Profile"],
    accentColor: "#f59e0b",
  },
  {
    label: "EOI & Portal Assistance",
    href: "/services/eoi",
    tagline: "End-to-End Lodgement",
    description: "Complete EOI lodgement support, points maximisation strategy, and step-by-step migration portal submission guidance.",
    icon: "🌐",
    highlights: ["EOI Lodgement", "Points Strategy", "Portal Submission"],
    accentColor: "#ef4444",
  },
];

const NAV_LINKS: NavLink[] = [
  { id: "Home",     label: "Home",     href: "/" },
  { id: "About",    label: "About",    href: "/about" },
  { id: "services", label: "Services", href: "/services", hasDropdown: true },
  { id: "pricing",  label: "Pricing",  href: "/pricing" },
  { id: "contact",  label: "Contact",  href: "/contact" },
];

const SPRING_SMOOTH: Transition = { type: "spring", stiffness: 380, damping: 38, mass: 0.8 };
const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 520, damping: 42, mass: 0.6 };
const SPRING_MEGA: Transition   = { type: "spring", stiffness: 340, damping: 34, mass: 0.9 };
const EASING = [0.16, 1, 0.3, 1] as const;

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollBehavior(): { scrolled: boolean; visible: boolean } {
  const [scrolled, setScrolled] = useState(false);
  const [visible,  setVisible]  = useState(true);
  const lastY   = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y   = window.scrollY;
        const dir = y > lastY.current ? "down" : "up";
        setScrolled(y > 24);
        if (y < 80)              setVisible(true);
        else if (dir === "down") setVisible(false);
        else                     setVisible(true);
        lastY.current   = y;
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { scrolled, visible };
}

function useActiveLink(links: NavLink[]): string | null {
  const pathname = usePathname();
  const active = links.reduce<NavLink | null>((best, link) => {
    if (link.href.startsWith("#")) return best;
    if (pathname === link.href) return link;
    if (link.href !== "/" && pathname.startsWith(link.href)) {
      if (!best || link.href.length > best.href.length) return link;
    }
    return best;
  }, null);
  return active?.id ?? null;
}

function useActiveServiceHref(): string | null {
  const pathname = usePathname();
  const match = SERVICE_ITEMS.find(
    (s) => pathname === s.href || pathname.startsWith(s.href + "/")
  );
  return match?.href ?? null;
}

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ scrolled }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2.5 select-none outline-none group">
      <div className="relative shrink-0">
        <div
          className="absolute inset-0 rounded-lg blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg,#ef4444,#b91c1c)" }}
        />
        <motion.div
          className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          transition={SPRING_SNAPPY}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/loogoo.png" alt="CDR Writers Nepal logo" className="w-full h-full object-contain" draggable={false} />
        </motion.div>
      </div>
      <motion.div animate={{ opacity: scrolled ? 0.85 : 1 }} transition={{ duration: 0.2 }}>
        <span className="text-white font-bold tracking-tight leading-none" style={{ fontSize: "15px", letterSpacing: "-0.01em" }}>
          CDR Writers
        </span>
        <span className="block text-green-400 font-semibold leading-none" style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          Nepal
        </span>
      </motion.div>
    </Link>
  );
}

// ─── Mega Menu Service Card ───────────────────────────────────────────────────

function MegaServiceCard({
  item,
  isActive,
  index,
  onClose,
}: {
  item: ServiceItem;
  isActive: boolean;
  index: number;
  onClose: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const lit = hovered || isActive;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, ease: EASING, duration: 0.30 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: "14px",
        padding: "1px",
        background: isActive
          ? `linear-gradient(135deg, ${item.accentColor}66, ${item.accentColor}22)`
          : lit
          ? `linear-gradient(135deg, ${item.accentColor}44, rgba(255,255,255,0.08))`
          : "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
        transition: "background 0.22s ease",
      }}
    >
      <div
        style={{
          borderRadius: "13px",
          background: lit
            ? "linear-gradient(145deg, #1a2a1d 0%, #141f16 100%)"
            : "linear-gradient(145deg, #172019 0%, #121a14 100%)",
          padding: "18px 16px 16px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          transition: "background 0.22s ease",
        }}
      >
        {/* Icon row + badge */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <motion.div
            animate={{
              background: lit ? `${item.accentColor}28` : "rgba(255,255,255,0.07)",
              boxShadow: lit ? `0 0 16px ${item.accentColor}30` : "none",
            }}
            transition={{ duration: 0.22 }}
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "11px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "19px",
              border: `1px solid ${lit ? item.accentColor + "50" : "rgba(255,255,255,0.10)"}`,
              flexShrink: 0,
              transition: "border-color 0.22s",
            }}
          >
            {item.icon}
          </motion.div>

          {item.badge && (
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "8px",
                fontWeight: 800,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: item.accentColor,
                background: `${item.accentColor}20`,
                border: `1px solid ${item.accentColor}45`,
                borderRadius: "5px",
                padding: "3px 7px",
              }}
            >
              {item.badge}
            </span>
          )}
        </div>

        {/* Tagline + Title */}
        <div>
          <p
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "8.5px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: lit ? item.accentColor : "rgba(203,213,225,0.45)",
              marginBottom: "4px",
              transition: "color 0.22s",
            }}
          >
            {item.tagline}
          </p>
          <h4
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "14.5px",
              fontWeight: 800,
              color: lit ? "#ffffff" : "#e2e8f0",
              letterSpacing: "-0.01em",
              lineHeight: 1.25,
              transition: "color 0.22s",
            }}
          >
            {item.label}
          </h4>
        </div>

        {/* Description — brighter text */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            color: lit ? "rgba(226,232,240,0.82)" : "rgba(203,213,225,0.60)",
            lineHeight: 1.65,
            flex: 1,
            transition: "color 0.22s",
          }}
        >
          {item.description}
        </p>

        {/* Highlights */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {item.highlights.map((h) => (
            <div key={h} style={{ display: "flex", alignItems: "center", gap: "7px" }}>
              <span
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: lit ? item.accentColor : "rgba(203,213,225,0.28)",
                  flexShrink: 0,
                  boxShadow: lit ? `0 0 5px ${item.accentColor}` : "none",
                  transition: "background 0.22s, box-shadow 0.22s",
                }}
              />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11.5px",
                  color: lit ? "rgba(226,232,240,0.85)" : "rgba(203,213,225,0.50)",
                  fontWeight: 500,
                  transition: "color 0.22s",
                }}
              >
                {h}
              </span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: lit
              ? `linear-gradient(90deg, ${item.accentColor}50, transparent)`
              : "rgba(255,255,255,0.08)",
            transition: "background 0.22s",
          }}
        />

        {/* Browse Service CTA */}
        <Link href={item.href} onClick={onClose} style={{ textDecoration: "none" }}>
          <motion.div
            animate={{
              background: lit
                ? `linear-gradient(135deg, ${item.accentColor}, ${item.accentColor}cc)`
                : "rgba(255,255,255,0.07)",
              boxShadow: lit ? `0 4px 18px ${item.accentColor}45` : "none",
            }}
            transition={{ duration: 0.22 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "9px 14px",
              borderRadius: "9px",
              border: lit ? `1px solid ${item.accentColor}60` : "1px solid rgba(255,255,255,0.09)",
              cursor: "pointer",
              transition: "border-color 0.22s",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "11.5px",
                fontWeight: 700,
                letterSpacing: "0.03em",
                color: lit ? "#ffffff" : "rgba(203,213,225,0.55)",
                transition: "color 0.22s",
              }}
            >
              Browse Service
            </span>
            <motion.span
              animate={{ x: hovered ? 3 : 0 }}
              transition={SPRING_SNAPPY}
              style={{
                fontSize: "12px",
                color: lit ? "#ffffff" : "rgba(203,213,225,0.35)",
                transition: "color 0.22s",
              }}
            >
              →
            </motion.span>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Full-Width Mega Menu ─────────────────────────────────────────────────────

function ServicesMegaMenu({
  isVisible,
  activeHref,
  onClose,
  onMouseEnter,
  onMouseLeave,
}: {
  isVisible: boolean;
  activeHref: string | null;
  onClose: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="mega-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={SPRING_MEGA}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            position: "fixed",
            top: "var(--mega-top, 64px)",
            left: 0,
            right: 0,
            zIndex: 180,
          }}
        >
          {/* Green accent line */}
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.65) 30%, rgba(52,211,153,0.65) 70%, transparent 100%)" }} />

          {/* Lighter panel background */}
          <div
            style={{
              background: "linear-gradient(170deg, #152018 0%, #111c13 50%, #0f1a11 100%)",
              borderBottom: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.65), 0 6px 24px rgba(0,0,0,0.4)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
            }}
          >
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "26px 48px 22px" }}>

              {/* Header row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <div>
                    <p
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "9px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "rgba(52,211,153,0.90)",
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      Migration & Assessment
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: "19px",
                        fontWeight: 800,
                        color: "#ffffff",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      Our Services
                    </h3>
                  </div>

                  {/* Live badge */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(16,185,129,0.14)",
                      border: "1px solid rgba(16,185,129,0.32)",
                      borderRadius: "99px",
                      padding: "4px 11px",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "#10b981",
                        boxShadow: "0 0 6px rgba(16,185,129,0.9)",
                        animation: "megaPulse 2s infinite",
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "10.5px",
                        fontWeight: 600,
                        color: "rgba(52,211,153,1)",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Accepting Clients
                    </span>
                  </div>
                </div>

                {/* Free CDR Review button — top right */}
                <Link href="/contact" onClick={onClose} style={{ textDecoration: "none" }}>
                  <motion.div
                    whileHover={{ scale: 1.03, boxShadow: "0 6px 28px rgba(239,68,68,0.45)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "7px",
                      background: "linear-gradient(135deg,#ef4444 0%,#b91c1c 100%)",
                      borderRadius: "10px",
                      padding: "9px 18px",
                      boxShadow: "0 4px 20px rgba(239,68,68,0.30)",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "12px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
                      Free CDR Review
                    </span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </motion.div>
                </Link>
              </div>

              {/* 5 service cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: "10px",
                }}
              >
                {SERVICE_ITEMS.map((item, i) => (
                  <MegaServiceCard
                    key={item.href}
                    item={item}
                    isActive={activeHref === item.href}
                    index={i}
                    onClose={onClose}
                  />
                ))}
              </div>

              {/* Bottom trust strip */}
              <div
                style={{
                  marginTop: "16px",
                  paddingTop: "14px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                }}
              >
                {[
                  "✓ EA / ACS / VETASSESS Compliant",
                  "✓ Plagiarism-Free Guarantee",
                  "✓ Unlimited Revisions",
                  "✓ Expert Engineers & Writers",
                ].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "11.5px",
                      color: "rgba(203,213,225,0.55)",
                      fontWeight: 500,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── NavPill ──────────────────────────────────────────────────────────────────

function NavPill({ link, isActive, onClick }: NavPillProps) {
  const [hovered,         setHovered]         = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const activeServiceHref = useActiveServiceHref();
  const containerRef      = useRef<HTMLDivElement>(null);
  const hideTimer         = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!link.hasDropdown) return;
    const update = () => {
      const header = document.getElementById("site-header");
      if (header) {
        document.documentElement.style.setProperty("--mega-top", `${header.getBoundingClientRect().bottom}px`);
      }
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [link.hasDropdown]);

  useEffect(() => {
    if (!link.hasDropdown) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [link.hasDropdown]);

  const showDropdown = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setDropdownVisible(true);
  }, []);

  const scheduleHide = useCallback(() => {
    hideTimer.current = setTimeout(() => setDropdownVisible(false), 120);
  }, []);

  const showActive = isActive || (link.hasDropdown ? dropdownVisible : false);

  const sharedPillInner = (
    <>
      <AnimatePresence>
        {hovered && !showActive && (
          <motion.span
            key="hover-bg"
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            style={{ background: "rgba(255,255,255,0.04)" }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showActive && (
          <motion.span
            key="active-bg"
            layoutId="nav-active-bg"
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING_SMOOTH}
            style={{
              background: "linear-gradient(120deg, rgba(16,185,129,0.13) 0%, rgba(5,150,105,0.07) 100%)",
              border: "1px solid rgba(52,211,153,0.22)",
              boxShadow: "0 0 18px rgba(16,185,129,0.10), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          />
        )}
      </AnimatePresence>

      <span className="relative z-10 flex items-center gap-1.5">
        <AnimatePresence>
          {showActive && (
            <motion.span
              key="dot"
              initial={{ opacity: 0, scale: 0, width: 0 }}
              animate={{ opacity: 1, scale: 1, width: "6px" }}
              exit={{ opacity: 0, scale: 0, width: 0 }}
              transition={SPRING_SNAPPY}
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #6ee7b7 0%, #10b981 60%)",
                boxShadow: "0 0 6px rgba(16,185,129,0.8)",
                flexShrink: 0,
              }}
            />
          )}
        </AnimatePresence>

        {link.label}

        {link.hasDropdown && (
          <motion.svg
            className="w-3 h-3 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            animate={{ rotate: dropdownVisible ? 180 : 0 }}
            transition={SPRING_SNAPPY}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        )}
      </span>

      <motion.span
        className="absolute bottom-[4px] left-1/2 -translate-x-1/2 h-[1.5px] rounded-full"
        animate={{
          width: showActive ? "55%" : hovered ? "30%" : "0%",
          opacity: showActive ? 1 : hovered ? 0.4 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 38 }}
        style={{
          background: showActive
            ? "linear-gradient(90deg, transparent, #34d399, transparent)"
            : "rgba(255,255,255,0.3)",
        }}
      />
    </>
  );

  const pillStyle = {
    fontWeight: showActive ? 600 : 400,
    letterSpacing: showActive ? "0.02em" : "0.01em",
    color: showActive ? "#ffffff" : hovered ? "#d1d5db" : "#6b7280",
    transition: "color 0.2s ease",
  } as const;

  if (link.hasDropdown) {
    return (
      <div
        ref={containerRef}
        style={{ position: "relative" }}
        onMouseEnter={showDropdown}
        onMouseLeave={scheduleHide}
      >
        <button
          aria-haspopup="true"
          aria-expanded={dropdownVisible}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => setDropdownVisible((v) => !v)}
          className="relative px-4 py-2 rounded-lg text-sm outline-none flex items-center"
          style={{ ...pillStyle, background: "none", border: "none", cursor: "pointer" }}
        >
          {sharedPillInner}
        </button>

        <ServicesMegaMenu
          isVisible={dropdownVisible}
          activeHref={activeServiceHref}
          onClose={() => setDropdownVisible(false)}
          onMouseEnter={showDropdown}
          onMouseLeave={scheduleHide}
        />
      </div>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 rounded-lg text-sm outline-none"
      style={{ ...pillStyle, textDecoration: "none" }}
    >
      {sharedPillInner}
    </Link>
  );
}

// ─── CTA Button ───────────────────────────────────────────────────────────────

function CTAButton() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
      transition={SPRING_SNAPPY}
      className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold outline-none overflow-hidden"
      style={{
        letterSpacing: "0.01em",
        background: "linear-gradient(135deg,#ef4444 0%,#b91c1c 100%)",
        boxShadow: hovered
          ? "0 0 0 1px rgba(239,68,68,0.5), 0 4px 24px rgba(239,68,68,0.38)"
          : "0 0 0 1px rgba(239,68,68,0.25), 0 2px 12px rgba(239,68,68,0.22)",
        transition: "box-shadow 0.2s ease",
        textDecoration: "none",
      }}
    >
      <motion.span
        className="absolute inset-0 rounded-lg"
        style={{
          background: "linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.15) 50%,transparent 60%)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: hovered ? ["200% 0", "-200% 0"] : "200% 0" }}
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />
      <span className="relative z-10">Free CDR Review</span>
      <motion.svg
        className="relative z-10 w-3.5 h-3.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2.5}
        animate={{ x: hovered ? 2 : 0 }}
        transition={SPRING_SNAPPY}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </motion.svg>
    </motion.a>
  );
}

// ─── Mobile Services Accordion ────────────────────────────────────────────────

function MobileServicesAccordion({
  isParentActive,
  activeServiceHref,
  onItemClick,
}: {
  isParentActive: boolean;
  activeServiceHref: string | null;
  onItemClick: () => void;
}) {
  const [expanded, setExpanded] = useState(isParentActive);

  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-haspopup="true"
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl"
        style={{
          background: isParentActive ? "rgba(16,185,129,0.10)" : "transparent",
          border: isParentActive ? "1px solid rgba(52,211,153,0.20)" : "1px solid transparent",
          cursor: "pointer",
          transition: "background 0.15s",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans',sans-serif",
            fontSize: "15px",
            fontWeight: isParentActive ? 600 : 400,
            color: isParentActive ? "#f9fafb" : "#9ca3af",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isParentActive && (
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "radial-gradient(circle, #6ee7b7 0%, #10b981 60%)", boxShadow: "0 0 6px rgba(16,185,129,0.8)", display: "inline-block", flexShrink: 0 }} />
          )}
          Services
        </span>
        <motion.svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke={isParentActive ? "#34d399" : "rgba(255,255,255,0.25)"}
          strokeWidth={2}
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={SPRING_SNAPPY}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="mobile-services"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 36, mass: 0.7 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingTop: "6px", paddingLeft: "10px", paddingBottom: "4px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {SERVICE_ITEMS.map((item, i) => {
                const isActive = activeServiceHref === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, ease: EASING, duration: 0.26 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onItemClick}
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "10px 14px",
                        borderRadius: "12px",
                        background: isActive ? `${item.accentColor}18` : "transparent",
                        border: isActive ? `1px solid ${item.accentColor}35` : "1px solid transparent",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                    >
                      <span
                        style={{
                          fontSize: "16px",
                          width: "32px",
                          height: "32px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "9px",
                          background: isActive ? `${item.accentColor}22` : "rgba(255,255,255,0.05)",
                          border: isActive ? `1px solid ${item.accentColor}40` : "1px solid rgba(255,255,255,0.07)",
                          flexShrink: 0,
                        }}
                      >
                        {item.icon}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "13.5px", fontWeight: isActive ? 600 : 400, color: isActive ? "#f9fafb" : "#cbd5e1", lineHeight: 1.3 }}>
                          {item.label}
                        </p>
                        <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "11px", color: isActive ? item.accentColor : "rgba(148,163,184,0.55)", marginTop: "1px" }}>
                          {item.tagline}
                        </p>
                      </div>
                      <span style={{ fontSize: "13px", color: isActive ? item.accentColor : "rgba(148,163,184,0.25)", flexShrink: 0, transition: "color 0.18s" }}>→</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({ open, activeSection, activeServiceHref, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,90vw)] flex flex-col"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 38, mass: 0.8 }}
            style={{
              background: "linear-gradient(160deg,#0a0f0b 0%,#080b09 100%)",
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              boxShadow: "-24px 0 64px rgba(0,0,0,0.7)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <Logo scrolled={false} />
              <motion.button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-white"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={SPRING_SNAPPY}
                aria-label="Close menu"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>

            <nav className="flex-1 px-4 pt-5 pb-4 overflow-y-auto">
              <p className="px-3 mb-3 text-gray-600 font-semibold" style={{ fontFamily: "'Syne',sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}>
                Navigation
              </p>
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.id;
                  if (link.hasDropdown) {
                    return (
                      <motion.li
                        key={link.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.045 + 0.08, ease: EASING, duration: 0.35 }}
                      >
                        <MobileServicesAccordion
                          isParentActive={isActive}
                          activeServiceHref={activeServiceHref}
                          onItemClick={onClose}
                        />
                      </motion.li>
                    );
                  }
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 + 0.08, ease: EASING, duration: 0.35 }}
                    >
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center justify-between px-4 py-3 rounded-xl"
                        style={{
                          background: isActive ? "rgba(16,185,129,0.10)" : "transparent",
                          border: isActive ? "1px solid rgba(52,211,153,0.20)" : "1px solid transparent",
                          textDecoration: "none",
                          transition: "background 0.15s, border-color 0.15s",
                        }}
                        onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
                        onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                      >
                        <span className="flex items-center gap-2.5" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "15px", fontWeight: isActive ? 600 : 400, color: isActive ? "#f9fafb" : "#9ca3af" }}>
                          {isActive && <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "radial-gradient(circle, #6ee7b7 0%, #10b981 60%)", boxShadow: "0 0 6px rgba(16,185,129,0.8)", display: "inline-block", flexShrink: 0 }} />}
                          {link.label}
                        </span>
                        <span style={{ color: isActive ? "#34d399" : "rgba(255,255,255,0.12)", fontSize: "16px" }}>
                          {isActive ? "●" : "›"}
                        </span>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              className="px-4 pb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, ease: EASING, duration: 0.4 }}
            >
              <div className="p-4 rounded-2xl mb-4" style={{ background: "linear-gradient(135deg,rgba(220,38,38,0.10) 0%,rgba(22,163,74,0.07) 100%)", border: "1px solid rgba(220,38,38,0.18)" }}>
                <p className="text-white font-bold mb-1" style={{ fontFamily: "'Syne',sans-serif", fontSize: "14px" }}>Migrate to Australia</p>
                <p className="text-gray-500 mb-3" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", lineHeight: 1.5 }}>Get a free CDR review. Limited slots.</p>
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold text-sm"
                  style={{ fontFamily: "'Syne',sans-serif", background: "linear-gradient(135deg,#ef4444 0%,#b91c1c 100%)", boxShadow: "0 4px 20px rgba(239,68,68,0.30)", textDecoration: "none", letterSpacing: "0.01em" }}
                >
                  Get Free CDR Review
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
              <div className="flex gap-2">
                {[
                  { label: "Email",    href: "mailto:cdrwritersnepal@gmail.com", icon: "✉" },
                  { label: "WhatsApp", href: "https://wa.me/9779840955770",      icon: "💬" },
                ].map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-gray-400 text-xs font-medium"
                    style={{ fontFamily: "'DM Sans',sans-serif", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}
                  >
                    <span>{c.icon}</span>
                    {c.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function CDRHeader() {
  const { scrolled, visible } = useScrollBehavior();
  const activeSection         = useActiveLink(NAV_LINKS);
  const activeServiceHref     = useActiveServiceHref();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu  = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        .header-glass {
          background: rgba(6,9,7,0.82);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
        }
        .header-glass-scrolled {
          background: rgba(4,7,5,0.94);
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
        }
        @keyframes megaPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>

      <motion.header
        id="site-header"
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -88, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 36, mass: 0.9 }}
      >
        <div className="w-full">
          <motion.div
            className={`${scrolled ? "header-glass-scrolled" : "header-glass"} transition-all duration-300`}
            style={{
              borderBottom: scrolled ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(255,255,255,0.07)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05) inset"
                : "0 4px 20px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.04) inset",
            }}
          >
            <div
              className={`w-full flex items-center justify-between transition-all duration-200 ${
                scrolled ? "px-4 sm:px-6 lg:px-10 xl:px-16 py-3" : "px-4 sm:px-6 lg:px-10 xl:px-16 py-4 sm:py-5"
              }`}
            >
              <div className="flex items-center shrink-0 min-w-[160px] lg:min-w-[200px]">
                <Logo scrolled={scrolled} />
              </div>

              <nav className="hidden lg:flex items-center gap-0.5">
                {NAV_LINKS.map((link) => (
                  <NavPill key={link.id} link={link} isActive={activeSection === link.id} onClick={closeMenu} />
                ))}
              </nav>

              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden lg:block">
                  <CTAButton />
                </div>
                <motion.button
                  onClick={toggleMenu}
                  className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl gap-1.5"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  transition={SPRING_SNAPPY}
                  aria-label="Toggle menu"
                >
                  <motion.span className="block w-4 h-px rounded-full bg-gray-300" animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }} transition={SPRING_SMOOTH} />
                  <motion.span className="block w-4 h-px rounded-full bg-gray-300" animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }} transition={{ duration: 0.15 }} />
                  <motion.span className="block w-4 h-px rounded-full bg-gray-300" animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }} transition={SPRING_SMOOTH} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <MobileMenu open={menuOpen} activeSection={activeSection} activeServiceHref={activeServiceHref} onClose={closeMenu} />
      </motion.header>
    </>
  );
}