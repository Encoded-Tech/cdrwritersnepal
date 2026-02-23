"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const CLICKABLE =
  "a,button,[role='button'],input,select,textarea,label,summary";

const TIGHT = { stiffness: 1100, damping: 55, mass: 0.18 };

function detectTouch() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer:coarse)").matches
  );
}

export default function CustomCursor() {
  const [isTouch] = useState(detectTouch);
  const [isPointer, setIsPointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState("#16a34a");

  /* 🔴 Toggle red ↔ green */
  useEffect(() => {
    if (isTouch) return;
    let red = false;
    const id = setInterval(() => {
      red = !red;
      setColor(red ? "#dc2626" : "#16a34a");
    }, 500);
    return () => clearInterval(id);
  }, [isTouch]);

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const x = useSpring(rawX, TIGHT);
  const y = useSpring(rawY, TIGHT);
  const transform = useTransform([x, y], ([x, y]) => `translate3d(${x}px,${y}px,0)`);

  useEffect(() => {
    if (isTouch) return;

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);

      const el = document.elementFromPoint(e.clientX, e.clientY);
      setIsPointer(!!el?.closest(CLICKABLE));
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [isTouch, rawX, rawY]);

  /* Hide native cursor */
  useEffect(() => {
    if (isTouch) return;
    const style = document.createElement("style");
    style.innerHTML = "html,body,*{cursor:none!important}";
    document.head.appendChild(style);
    return () => style.remove();
  }, [isTouch]);

  if (isTouch || !visible) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        top: -2,
        left: -3,
        width: 26,
        height: 30,
        pointerEvents: "none",
        zIndex: 99999,
        transform,
      }}
    >
      {/* Arrow */}
      {!isPointer ? (
        <svg width="26" height="30" viewBox="0 0 24 28">
          <path
            d="M3 2 L3 22 L7.5 17.5 L11.5 26 L14 25 L10 16.5 L16.5 16.5 Z"
            fill={color}
          />
        </svg>
      ) : (
        /* Hand → use emoji or simple svg */
        <div style={{ fontSize: 22 }}>👆</div>
      )}
    </motion.div>
  );
}