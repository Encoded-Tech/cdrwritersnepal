"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Transition } from "framer-motion";

import {
  ANZSCO_CATEGORIES,
  ALL_OCCUPATIONS,
  NAV_LINKS,
  type NavLink,
  type DropdownType,
} from "./header-data";

// ─── Constants & Types ────────────────────────────────────────────────────────

interface MobileMenuProps {
  open: boolean;
  activeSection: string | null;
  onClose: () => void;
}

const SPRING_SMOOTH: Transition = { type: "spring", stiffness: 380, damping: 38, mass: 0.8 };
const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 520, damping: 42, mass: 0.6 };
const SPRING_MEGA: Transition = { type: "spring", stiffness: 340, damping: 34, mass: 0.9 };
const EASING = [0.16, 1, 0.3, 1] as const;

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollBehavior() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dir = y > lastY.current ? "down" : "up";
        setScrolled(y > 24);
        if (y < 80) setVisible(true);
        else if (dir === "down") setVisible(false);
        else setVisible(true);
        lastY.current = y;
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

// ─── Logo ─────────────────────────────────────────────────────────────────────

function Logo({ scrolled }: { scrolled: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 select-none outline-none group">
      <div className="relative shrink-0">
        <div
          className="absolute inset-0 rounded-lg blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg,#e50914,#b81d24)" }}
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
        <span className="block font-semibold leading-none" style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#1a7a4a" }}>
          Nepal
        </span>
      </motion.div>
    </Link>
  );
}

// ─── Search Bar ───────────────────────────────────────────────────────────────

function OccupationSearch({ onClose, className = "relative w-[280px]" }: { onClose: () => void, className?: string }) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const results = query.trim().length > 1
    ? ALL_OCCUPATIONS.filter(o =>
      o.code.includes(query) ||
      o.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)
    : [];

  return (
    <div className={className} onBlur={(e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) {
        setTimeout(() => setFocused(false), 200);
      }
    }}>
      <div
        className="relative flex items-center"
        style={{
          background: focused ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.03)",
          border: focused ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(255,255,255,0.08)",
          borderRadius: "10px",
          transition: "all 0.2s ease"
        }}
      >
        <svg
          className="ml-3 opacity-40"
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Search occupation/code..."
          className="w-full bg-transparent border-none text-white text-[13px] px-2.5 py-2 outline-none font-sans"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setFocused(true); }}
            className="mr-2 text-white/40 hover:text-white/80 p-1"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>

      <AnimatePresence>
        {focused && query.trim().length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute top-[calc(100%+8px)] left-0 w-full rounded-xl overflow-hidden backdrop-blur-xl"
            style={{
              background: "rgba(10,10,10,0.9)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
              zIndex: 200
            }}
          >
            {results.length > 0 ? (
              <ul className="py-1">
                {results.map(o => {
                  const cat = ANZSCO_CATEGORIES.find(c => c.id === o.category);
                  const color = cat?.accentColor || "#10b981";
                  return (
                    <li key={o.code}>
                      <Link
                        href={`/anzsco-codes/${o.category}?code=${o.code}`}
                        onClick={() => { setFocused(false); onClose(); }}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors no-underline"
                      >
                        <span style={{ color, fontSize: "11px", fontWeight: "bold", fontFamily: "'JetBrains Mono', monospace", background: `${color}15`, padding: "2px 6px", borderRadius: "4px" }}>
                          {o.code}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-white/90 text-[13px] font-medium leading-tight">{o.title}</span>
                          <span className="text-white/40 text-[10px] mt-0.5">{cat?.name}</span>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="p-4 text-center text-white/50 text-[13px] font-medium">
                No matching occupations found
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Mega Menu ────────────────────────────────────────────────────────────────

function AnzscoMegaMenu({
  isVisible,
  onMouseEnter,
  onMouseLeave,
  onItemClick
}: {
  isVisible: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onItemClick: () => void;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={SPRING_MEGA}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 180,
          }}
        >
          <div style={{ height: "1px", background: "linear-gradient(90deg, transparent 0%, rgba(26,122,74,0.65) 30%, rgba(26,122,74,0.65) 70%, transparent 100%)" }} />

          <div
            style={{
              background: "rgba(6,6,6,0.92)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
              backdropFilter: "blur(28px) saturate(160%)",
            }}
          >
            <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "26px 48px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 700, marginBottom: "4px" }}>
                    Occupation Lists
                  </p>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: "19px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.02em" }}>
                    ANZSCO Codes Map
                  </h3>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
                {ANZSCO_CATEGORIES.map((cat, i) => (
                  <Link href={cat.href} key={cat.id} onClick={onItemClick} style={{ textDecoration: "none" }}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04, ease: EASING, duration: 0.3 }}
                      style={{
                        borderRadius: "14px",
                        padding: "16px",
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.04)",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        transition: "all 0.2s"
                      }}
                      className="group hover:bg-white/5 hover:border-white/10"
                    >
                      <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center text-xl transition-all border" style={{ backgroundColor: `${cat.accentColor}1A`, borderColor: `${cat.accentColor}33` }}>
                        {cat.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-white font-bold text-[15px] group-hover:text-white transition-colors">{cat.name}</h4>
                          <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                            {cat.assessingBody}
                          </span>
                        </div>
                        <p className="text-white/60 text-[12px] leading-snug mb-2">{cat.description}</p>
                        <p className="text-[11px] font-semibold" style={{ color: cat.accentColor }}>{cat.subtitle} →</p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 flex justify-between items-center">
                <p className="text-white/40 text-[12px]">Click a category to search and browse all relevant occupation codes for your skills assessment.</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── NavPill ──────────────────────────────────────────────────────────────────

function NavPill({
  link,
  isActive,
  isDropdownOpen,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: {
  link: NavLink;
  isActive: boolean;
  isDropdownOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const showActive = isActive || isDropdownOpen;

  const sharedPillInner = (
    <>
      <AnimatePresence>
        {hovered && !showActive && (
          <motion.span
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
            layoutId="nav-active-bg"
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={SPRING_SMOOTH}
            style={{
              background: "rgba(200,16,46,0.1)",
              border: "1px solid rgba(200,16,46,0.2)",
            }}
          />
        )}
      </AnimatePresence>

      <span className="relative z-10 flex items-center gap-1.5">
        {link.label}
        {link.dropdownType && (
          <motion.svg
            className="w-3 h-3 opacity-50"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
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
            ? "linear-gradient(90deg, transparent, #c8102e, transparent)"
            : "rgba(255,255,255,0.3)",
        }}
      />
    </>
  );

  const pillStyle = {
    fontWeight: showActive ? 600 : 400,
    letterSpacing: showActive ? "0.02em" : "0.01em",
    color: showActive ? "#ffffff" : hovered ? "#d1d5db" : "#9ca3af",
    transition: "color 0.2s ease",
  } as const;

  if (link.dropdownType) {
    return (
      <button
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
        onMouseEnter={() => { setHovered(true); onMouseEnter(); }}
        onMouseLeave={() => { setHovered(false); onMouseLeave(); }}
        onClick={onClick}
        className="relative px-4 py-2 rounded-lg text-sm outline-none flex items-center bg-transparent border-none cursor-pointer"
        style={pillStyle}
      >
        {sharedPillInner}
      </button>
    );
  }

  return (
    <Link
      href={link.href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-4 py-2 rounded-lg text-sm outline-none no-underline"
      style={pillStyle}
    >
      {sharedPillInner}
    </Link>
  );
}

// ─── Mobile Accordion & Menu ─────────────────────────────────────────────────

function MobileAnzscoAccordion({
  isParentActive,
  onItemClick,
}: {
  isParentActive: boolean;
  onItemClick: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-transparent border-none"
      >
        <span className="flex items-center gap-2 font-sans text-[15px] font-medium text-gray-300">
          ANZSCO Codes
        </span>
        <motion.svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} animate={{ rotate: expanded ? 180 : 0 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="flex flex-col gap-1 px-4 pb-2">
              {ANZSCO_CATEGORIES.map((cat) => (
                <Link key={cat.id} href={cat.href} onClick={onItemClick} className="flex gap-3 p-2 rounded-lg hover:bg-white/5 no-underline">
                  <span className="text-xl">{cat.icon}</span>
                  <div>
                    <p className="text-white text-sm font-medium">{cat.name}</p>
                    <p className="text-white/50 text-[11px]">{cat.subtitle}</p>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ open, activeSection, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            key="drawer"
            className="fixed top-0 right-0 bottom-0 z-50 w-[min(340px,90vw)] flex flex-col bg-[#0a0a0a] border-l border-white/10 shadow-[-20px_0_40px_rgba(0,0,0,0.8)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={SPRING_SMOOTH}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
              <Logo scrolled={false} />
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            <div className="px-4 py-4 w-full">
              <OccupationSearch onClose={onClose} />
            </div>

            <nav className="flex-1 px-2 pb-4 overflow-y-auto">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.id;
                  if (link.dropdownType === "anzsco") {
                    return <li key={link.id}><MobileAnzscoAccordion isParentActive={isActive} onItemClick={onClose} /></li>;
                  }
                  return (
                    <li key={link.id}>
                      <Link href={link.href} onClick={onClose} className="flex items-center justify-between px-4 py-3 rounded-xl no-underline hover:bg-white/5">
                        <span className="font-sans text-[15px] text-gray-300">{link.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="p-6 border-t border-white/5">
              <Link href="/contact" onClick={onClose} className="flex items-center justify-center w-full py-3 rounded-xl font-bold text-white text-sm no-underline shadow-lg" style={{ background: "linear-gradient(135deg,#e50914,#b81d24)" }}>
                Get Free CDR Review
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Header Component ───────────────────────────────────────────────────

export default function CDRHeader() {
  const { scrolled, visible } = useScrollBehavior();
  const activeSection = useActiveLink(NAV_LINKS);

  const [activeDropdown, setActiveDropdown] = useState<DropdownType>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const showDropdown = useCallback((type: DropdownType) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setActiveDropdown(type);
  }, []);

  const scheduleHide = useCallback(() => {
    hideTimer.current = setTimeout(() => setActiveDropdown(null), 120);
  }, []);

  return (
    <>
      <style>{`
        .header-glass {
          background: rgba(6,6,6,0.82);
          backdrop-filter: blur(20px) saturate(160%);
        }
        .header-glass-scrolled {
          background: rgba(4,4,4,0.94);
          backdrop-filter: blur(28px) saturate(190%);
        }
      `}</style>

      <motion.header
        id="site-header"
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -88, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 36, mass: 0.9 }}
        onMouseLeave={scheduleHide}
      >
        <div className="w-full">
          <motion.div
            className={`${scrolled ? "header-glass-scrolled" : "header-glass"} transition-all duration-300`}
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.02) inset"
                : "0 4px 20px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.02) inset",
            }}
          >
            <div
              className={`w-full flex items-center justify-between transition-all duration-200 ${scrolled ? "px-4 sm:px-6 lg:px-10 xl:px-16 py-3" : "px-4 sm:px-6 lg:px-10 xl:px-16 py-4 sm:py-5"
                }`}
            >
              <div className="flex items-center shrink-0 min-w-[160px] lg:w-[240px]">
                <Logo scrolled={scrolled} />
              </div>

              <div className="hidden lg:flex items-center gap-4 xl:gap-8 flex-1 justify-center">
                <nav className="flex items-center gap-0.5">
                  {NAV_LINKS.map((link) => (
                    <NavPill
                      key={link.id}
                      link={link}
                      isActive={activeSection === link.id}
                      isDropdownOpen={activeDropdown === link.dropdownType}
                      onMouseEnter={() => link.dropdownType && showDropdown(link.dropdownType)}
                      onMouseLeave={scheduleHide}
                      onClick={() => {
                        closeMenu();
                        if (link.dropdownType) setActiveDropdown(activeDropdown === link.dropdownType ? null : link.dropdownType);
                      }}
                    />
                  ))}
                </nav>

                <div className="w-px h-6 bg-white/10 hidden xl:block" />
                <div className="hidden xl:block w-full max-w-[280px]">
                  <OccupationSearch onClose={scheduleHide} className="relative w-full" />
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 lg:w-[240px] lg:justify-end">
                <Link
                  href="/become-an-agent"
                  className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-emerald-400 no-underline outline-none"
                  style={{
                    border: "1px solid rgba(16,185,129,0.3)",
                    background: "rgba(16,185,129,0.06)",
                    transition: "all 0.2s",
                  }}
                >
                  <span>🤝</span> Become an Agent
                </Link>
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

        {/* ANZSCO Dropdown — only remaining mega menu */}
        <div onMouseEnter={() => activeDropdown && showDropdown(activeDropdown)} onMouseLeave={scheduleHide}>
          <AnzscoMegaMenu
            isVisible={activeDropdown === "anzsco"}
            onMouseEnter={() => showDropdown("anzsco")}
            onMouseLeave={scheduleHide}
            onItemClick={() => setActiveDropdown(null)}
          />
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} activeSection={activeSection} onClose={closeMenu} />
    </>
  );
}