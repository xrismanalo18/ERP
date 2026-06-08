"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";
import { useReducedMotion } from "./useReducedMotion";
import styles from "./motion.module.css";

type ParallaxProps = {
  children: ReactNode;
  as?: ElementType;
  /** Speed coefficient — 0.1 subtle, 0.4 strong, negative reverses */
  speed?: number;
  /** Axis to translate */
  axis?: "y" | "x";
  className?: string;
  style?: CSSProperties;
};

export function Parallax({
  children,
  as: Tag = "div",
  speed = 0.25,
  axis = "y",
  className,
  style,
}: ParallaxProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    let raf = 0;
    let lastY = window.scrollY;

    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (elementCenter - viewportCenter) * -speed;
      el.style.setProperty("--m-parallax", `${offset.toFixed(2)}px`);
    };

    const onScroll = () => {
      lastY = window.scrollY;
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      void lastY;
    };
  }, [speed, reduced]);

  const transform =
    axis === "y"
      ? "translate3d(0, var(--m-parallax, 0px), 0)"
      : "translate3d(var(--m-parallax, 0px), 0, 0)";

  return (
    <Tag
      ref={ref}
      className={[styles.parallax, className].filter(Boolean).join(" ")}
      style={{ ...style, transform }}
    >
      {children}
    </Tag>
  );
}
