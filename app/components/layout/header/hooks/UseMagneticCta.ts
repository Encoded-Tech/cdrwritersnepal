/**
 * useMagneticCTA.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Subtle magnetic cursor attraction for the CTA button.
 *
 * Design decisions:
 *  • "Magnetic" = the element nudges slightly toward the cursor when the
 *    cursor is within a proximity radius. NOT a gimmick — kept subtle (≤8px).
 *  • Uses Framer Motion useSpring for smooth, interruptible movement.
 *    The spring config is deliberately light (low stiffness) so it trails
 *    gently rather than snapping — premium feel.
 *  • Effect disabled automatically when:
 *    – prefers-reduced-motion is set
 *    – window width ≤ 1024px (touch/mobile)
 *  • On mouse-leave the spring naturally returns to 0 — no jarring reset.
 *  • Returns MotionValues (not states) — zero re-renders on mouse move.
 *    Consumers bind them directly to `style` on a motion element.
 *
 * Usage:
 *   const { ref, x, y } = useMagneticCTA();
 *   <motion.button ref={ref} style={{ x, y }}>...</motion.button>
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useRef, useEffect } from "react";
import { useSpring, useMotionValue, MotionValue } from "framer-motion";

interface MagneticOptions {
  /** Max pixel nudge. Default 8 */
  strength?: number;
  /** Cursor proximity in px that activates the effect. Default 80 */
  radius?: number;
  /** Spring stiffness. Default 150 */
  stiffness?: number;
  /** Spring damping. Default 18 */
  damping?: number;
}

interface MagneticReturn {
  ref: React.RefObject<HTMLButtonElement | null>;
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export function useMagneticCTA({
  strength = 8,
  radius = 80,
  stiffness = 150,
  damping = 18,
}: MagneticOptions = {}): MagneticReturn {
  const ref = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness, damping, mass: 0.6 });
  const y = useSpring(rawY, { stiffness, damping, mass: 0.6 });

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Disable on reduced-motion or touch devices
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.innerWidth <= 1024;
    if (prefersReduced || isTouchDevice) return;

    const el = ref.current;
    if (!el) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        // Map distance to nudge: closer = stronger pull
        const factor = (1 - dist / radius) * strength;
        rawX.set((dx / dist) * factor);
        rawY.set((dy / dist) * factor);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [rawX, rawY, strength, radius]);

  return { ref, x, y };
}