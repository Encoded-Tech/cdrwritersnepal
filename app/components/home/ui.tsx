"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

// ─── ScrollReveal ─────────────────────────────────────────────────────────────
interface ScrollRevealProps {
  children: ReactNode;
  variant: Variants;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  variant,
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={variant}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      // ✅ Delay injected here — NOT via `custom` prop
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

export function Counter({ end, suffix = "", duration = 2 }: CounterProps) {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// ─── TypewriterHeading ────────────────────────────────────────────────────────
const PHRASES = [
  "Expert CDR Writers Nepal",
  "100% Positive Assessment",
  "Your Migration Partner",
];

export function TypewriterHeading() {
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [displayed, setDisplayed] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);

useEffect(() => {
  const current = PHRASES[phraseIndex];
  let timeout: NodeJS.Timeout;

  if (!deleting) {
    if (displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 60);
    } else {
      timeout = setTimeout(() => {
        setDeleting(true);
      }, 1800);
    }
  } else {
    if (displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 35);
    } else {
      timeout = setTimeout(() => {
        setDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      }, 100);
    }
  }

  return () => clearTimeout(timeout);
}, [displayed, deleting, phraseIndex]);

  return (
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white min-h-[3.5rem] leading-tight font-serif">
      {displayed}
      <span className="animate-pulse text-green-300">|</span>
    </h1>
  );
}