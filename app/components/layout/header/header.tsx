"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import Link from "next/link";
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
  onClose: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { id: "services", label: "Services", href: "#services" },
  { id: "pricing",  label: "Pricing",  href: "#pricing"  },
  { id: "process",  label: "Process",  href: "#process"  },
  { id: "about",    label: "About",    href: "#about"    },
  { id: "contact",  label: "Contact",  href: "#contact"  },
];

const SPRING_SMOOTH: Transition = { type: "spring", stiffness: 380, damping: 38, mass: 0.8 };
const SPRING_SNAPPY: Transition = { type: "spring", stiffness: 520, damping: 42, mass: 0.6 };

// Typed as const tuple so Framer Motion accepts it as BezierDefinition
const EASING = [0.16, 1, 0.3, 1] as const;

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollBehavior(): { scrolled: boolean; visible: boolean } {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [visible, setVisible]   = useState<boolean>(true);
  const lastY                   = useRef<number>(0);
  const ticking                 = useRef<boolean>(false);

  useEffect(() => {
    const onScroll = (): void => {
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

function useActiveSection(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const idsKey = ids.join(",");

  useEffect(() => {
    const observers = new Map<string, IntersectionObserver>();
    const counts    = new Map<string, number>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          counts.set(id, entry.intersectionRatio);
          let best: string | null = null;
          let bestVal = 0;
          counts.forEach((v, k) => {
            if (v > bestVal) { bestVal = v; best = k; }
          });
          if (best) setActive(best);
        },
        { threshold: [0, 0.25, 0.5, 0.75, 1] },
      );

      obs.observe(el);
      observers.set(id, obs);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return active;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Logo({ scrolled }: LogoProps) {
  // ── Replace this src with your actual logo image path ──────────────────────

  const HAS_LOGO = true; // set to true once you add your real image

  return (
    <Link href="/" className="flex items-center gap-2.5 select-none outline-none group">
      <div className="relative shrink-0">
        {/* Ambient glow behind logo */}
        <div
          className="absolute inset-0 rounded-lg blur-md opacity-50 group-hover:opacity-80 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg,#ef4444,#b91c1c)" }}
        />

        {/* Logo image container — fixed 36×36, swap to your img once ready */}
        <motion.div
          className="relative w-9 h-9 rounded-lg overflow-hidden flex items-center justify-center"
          style={{
            background: HAS_LOGO ? "transparent" : "linear-gradient(135deg,#1a1a1a 0%,#111 100%)",
            border: HAS_LOGO ? "none" : "1px dashed rgba(239,68,68,0.45)",
          }}
          whileHover={{ scale: 1.05 }}
          transition={SPRING_SNAPPY}
        >
          {HAS_LOGO ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/loogoo.png"
              alt="CDR Writers Nepal logo"
              className="w-full h-full object-contain"
              draggable={false}
            />
          ) : (
            /* Placeholder shown until you set HAS_LOGO = true */
            <div className="flex flex-col items-center justify-center gap-0.5">
              <svg
                className="w-4 h-4 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ef4444"
                strokeWidth={1.5}
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path strokeLinecap="round" d="M21 15l-5-5L5 21" />
              </svg>
              <span
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "7px",
                  color: "rgba(239,68,68,0.5)",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                logo
              </span>
            </div>
          )}
        </motion.div>
      </div>
      <motion.div animate={{ opacity: scrolled ? 0.85 : 1 }} transition={{ duration: 0.2 }}>
        <span
          className="text-white font-bold tracking-tight leading-none"
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "15px", letterSpacing: "-0.01em" }}
        >
          CDR Writers
        </span>
        <span
          className="block text-green-400 font-semibold leading-none"
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase" }}
        >
          Nepal
        </span>
      </motion.div>
    </Link>
  );
}

function NavPill({ link, isActive, onClick }: NavPillProps) {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <a
      href={link.href}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative px-3.5 py-1.5 rounded-lg text-sm font-medium outline-none transition-colors duration-150"
      style={{
        fontFamily: "'DM Sans',sans-serif",
        color: isActive ? "#f9fafb" : hovered ? "#e5e7eb" : "#9ca3af",
        textDecoration: "none",
      }}
    >
      <AnimatePresence>
        {(isActive || hovered) && (
          <motion.span
            key={isActive ? "active" : "hover"}
            layoutId={isActive ? "nav-active-pill" : undefined}
            className="absolute inset-0 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              background: isActive
                ? "linear-gradient(135deg,rgba(22,163,74,0.18) 0%,rgba(22,163,74,0.08) 100%)"
                : "rgba(255,255,255,0.05)",
              border: isActive
                ? "1px solid rgba(34,197,94,0.25)"
                : "1px solid rgba(255,255,255,0.06)",
              boxShadow: isActive ? "0 0 12px rgba(34,197,94,0.08)" : "none",
            }}
          />
        )}
      </AnimatePresence>
      <span className="relative z-10">{link.label}</span>
      {isActive && (
        <motion.span
          layoutId="nav-dot"
          className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-green-400"
          transition={SPRING_SMOOTH}
        />
      )}
    </a>
  );
}

function CTAButton() {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <motion.a
      href="/contact"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
      transition={SPRING_SNAPPY}
      className="relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold outline-none overflow-hidden"
      style={{
        fontFamily: "'Syne',sans-serif",
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

function MobileMenu({ open, activeSection, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
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

          {/* Drawer */}
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
            {/* Drawer header */}
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
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

            {/* Nav links */}
            <nav className="flex-1 px-4 pt-5 pb-4 overflow-y-auto">
              <p
                className="px-3 mb-3 text-gray-600 font-semibold"
                style={{ fontFamily: "'Syne',sans-serif", fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}
              >
                Navigation
              </p>
              <ul className="space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.li
                      key={link.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.045 + 0.08, ease: EASING, duration: 0.35 }}
                    >
                      <a
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center justify-between px-4 py-3 rounded-xl"
                        style={{
                          background: isActive ? "rgba(22,163,74,0.10)" : "transparent",
                          border: isActive ? "1px solid rgba(34,197,94,0.18)" : "1px solid transparent",
                          textDecoration: "none",
                          transition: "background 0.15s, border-color 0.15s",
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                        }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                          if (!isActive) e.currentTarget.style.background = "transparent";
                        }}
                      >
                        <span
                          style={{
                            fontFamily: "'DM Sans',sans-serif",
                            fontSize: "15px",
                            fontWeight: 500,
                            color: isActive ? "#f9fafb" : "#9ca3af",
                          }}
                        >
                          {link.label}
                        </span>
                        <span style={{ color: isActive ? "#22c55e" : "rgba(255,255,255,0.12)", fontSize: "16px" }}>
                          {isActive ? "●" : "›"}
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* CTA block */}
            <motion.div
              className="px-4 pb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, ease: EASING, duration: 0.4 }}
            >
              <div
                className="p-4 rounded-2xl mb-4"
                style={{
                  background: "linear-gradient(135deg,rgba(220,38,38,0.10) 0%,rgba(22,163,74,0.07) 100%)",
                  border: "1px solid rgba(220,38,38,0.18)",
                }}
              >
                <p className="text-white font-bold mb-1" style={{ fontFamily: "'Syne',sans-serif", fontSize: "14px" }}>
                  Migrate to Australia
                </p>
                <p className="text-gray-500 mb-3" style={{ fontFamily: "'DM Sans',sans-serif", fontSize: "12px", lineHeight: 1.5 }}>
                  Get a free CDR review. Limited slots.
                </p>
                <a
                  href="/contact"
                  onClick={onClose}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-white font-semibold text-sm"
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    background: "linear-gradient(135deg,#ef4444 0%,#b91c1c 100%)",
                    boxShadow: "0 4px 20px rgba(239,68,68,0.30)",
                    textDecoration: "none",
                    letterSpacing: "0.01em",
                  }}
                >
                  Get Free CDR Review
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              <div className="flex gap-2">
                {[
                  { label: "Email",    href: "mailto:cdrwritersnepal@gmail.com", icon: "✉" },
                  { label: "WhatsApp", href: "https://wa.me/9779840955770",      icon: "💬" },
                ].map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-gray-400 text-xs font-medium"
                    style={{
                      fontFamily: "'DM Sans',sans-serif",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      textDecoration: "none",
                    }}
                  >
                    <span>{c.icon}</span>
                    {c.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function CDRHeader() {
  const { scrolled, visible }   = useScrollBehavior();
  const sectionIds              = useMemo<string[]>(() => NAV_LINKS.map((l) => l.id), []);
  const activeSection           = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const closeMenu  = useCallback((): void => setMenuOpen(false), []);
  const toggleMenu = useCallback((): void => setMenuOpen((o) => !o), []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        /* Darker base — not scrolled */
        .header-glass {
          background: rgba(6,9,7,0.82);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
        }

        /* Darker — scrolled state */
        .header-glass-scrolled {
          background: rgba(4,7,5,0.94);
          backdrop-filter: blur(28px) saturate(190%);
          -webkit-backdrop-filter: blur(28px) saturate(190%);
        }
      `}</style>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -88, opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 340, damping: 36, mass: 0.9 }}
      >
        <div className="w-full">
          <motion.div
            className={`${scrolled ? "header-glass-scrolled" : "header-glass"} transition-all duration-300`}
            style={{
              borderBottom: scrolled
                ? "1px solid rgba(255,255,255,0.10)"
                : "1px solid rgba(255,255,255,0.07)",
              boxShadow: scrolled
                ? "0 8px 32px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.05) inset"
                : "0 4px 20px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.04) inset",
            }}
          >
            <div
              className={`w-full flex items-center justify-between transition-all duration-200 ${
                scrolled
                  ? "px-4 sm:px-6 lg:px-10 xl:px-16 py-3"
                  : "px-4 sm:px-6 lg:px-10 xl:px-16 py-4 sm:py-5"
              }`}
            >
              {/* Logo — reserved container prevents layout shift */}
              <div className="flex items-center shrink-0 min-w-[160px] lg:min-w-[200px]">
                <Logo scrolled={scrolled} />
              </div>

              {/* Desktop nav */}
              <nav className="hidden lg:flex items-center gap-1">
                {NAV_LINKS.map((link) => (
                  <NavPill
                    key={link.id}
                    link={link}
                    isActive={activeSection === link.id}
                    onClick={closeMenu}
                  />
                ))}
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="hidden lg:block">
                  <CTAButton />
                </div>

                {/* Hamburger */}
                <motion.button
                  onClick={toggleMenu}
                  className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl gap-1.5"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.94 }}
                  transition={SPRING_SNAPPY}
                  aria-label="Toggle menu"
                >
                  <motion.span
                    className="block w-4 h-px rounded-full bg-gray-300"
                    animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
                    transition={SPRING_SMOOTH}
                  />
                  <motion.span
                    className="block w-4 h-px rounded-full bg-gray-300"
                    animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
                    transition={{ duration: 0.15 }}
                  />
                  <motion.span
                    className="block w-4 h-px rounded-full bg-gray-300"
                    animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
                    transition={SPRING_SMOOTH}
                  />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        <MobileMenu open={menuOpen} activeSection={activeSection} onClose={closeMenu} />
      </motion.header>
    </>
  );
}