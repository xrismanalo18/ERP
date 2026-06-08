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

type MagneticProps = {
  children: ReactNode;
  as?: ElementType;
  strength?: number;
  className?: string;
  style?: CSSProperties;
};

export function Magnetic({
  children,
  as: Tag = "span",
  strength = 0.35,
  className,
  style,
}: MagneticProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const y = (e.clientY - (rect.top + rect.height / 2)) * strength;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onLeave = () => {
      el.style.transform = "translate3d(0, 0, 0)";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength, reduced]);

  return (
    <Tag
      ref={ref}
      className={[styles.magnetic, className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </Tag>
  );
}
