/**
 * useScrollDirection.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Detects scroll direction with jitter suppression.
 *
 * Design decisions:
 *  • "JITTER_THRESHOLD" — tiny scrolls (< 6px delta) are ignored entirely.
 *    This prevents rapid show/hide when a user's hand rests on a trackpad.
 *  • "HIDE_AFTER" — we never hide until the user has scrolled at least this
 *    far from the top. The nav stays visible near the top always.
 *  • Returns an enum-like union so consumers switch on a stable string value
 *    (no boolean confusion between "up means show" and "up means direction").
 *  • Uses a ref-based previous position — not useState — to avoid extra
 *    renders on every scroll tick.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use client";

import { useState, useEffect, useRef } from "react";

export type ScrollDirection = "up" | "down" | "top";

interface Options {
  /** Min delta (px) before direction is committed. Prevents jitter. Default 6 */
  jitterThreshold?: number;
  /** Don't hide until user has scrolled past this many px. Default 80 */
  hideAfter?: number;
}

export function useScrollDirection({
  jitterThreshold = 6,
  hideAfter = 80,
}: Options = {}): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>("top");
  const prevScrollY = useRef<number>(0);
  const accumulated = useRef<number>(0); // tracks accumulated delta between commits

  useEffect(() => {
    // SSR guard
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - prevScrollY.current;

      // Always mark "top" when near the top — nav always visible
      if (currentY <= hideAfter) {
        setDirection("top");
        prevScrollY.current = currentY;
        accumulated.current = 0;
        return;
      }

      // Accumulate delta — only commit direction when jitter threshold is exceeded
      accumulated.current += delta;

      if (Math.abs(accumulated.current) >= jitterThreshold) {
        const next: ScrollDirection = accumulated.current > 0 ? "down" : "up";
        setDirection(next);
        accumulated.current = 0;
      }

      prevScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [jitterThreshold, hideAfter]);

  return direction;
}