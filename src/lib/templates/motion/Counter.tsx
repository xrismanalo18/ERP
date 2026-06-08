"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { useInView } from "./useInView";
import { useReducedMotion } from "./useReducedMotion";
import styles from "./motion.module.css";

type CounterProps = {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: (value: number) => string;
  decimals?: number;
  className?: string;
  style?: CSSProperties;
  "aria-label"?: string;
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function Counter({
  to,
  from = 0,
  duration = 1400,
  prefix,
  suffix,
  format,
  decimals = 0,
  className,
  style,
  "aria-label": ariaLabel,
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>({ once: true });
  const reduced = useReducedMotion();
  const [value, setValue] = useState<number>(from);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setValue(to);
      return;
    }

    const startTime =
      typeof performance !== "undefined" ? performance.now() : Date.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(progress);
      const next = from + (to - from) * eased;
      setValue(next);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, from, to, duration]);

  const display = format
    ? format(value)
    : decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString();

  return (
    <span
      ref={ref}
      className={[styles.counter, className].filter(Boolean).join(" ")}
      style={style}
      aria-label={ariaLabel ?? `${prefix ?? ""}${to}${suffix ?? ""}`}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
