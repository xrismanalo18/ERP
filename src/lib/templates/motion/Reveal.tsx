"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "./useInView";
import styles from "./motion.module.css";

export type RevealVariant =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-scale"
  | "scale-in"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "wipe-right"
  | "wipe-up"
  | "mask-up"
  | "mask-right"
  | "blur-in"
  | "spotlight"
  | "drift-in"
  | "roll-in"
  | "skew-in";

const variantClass: Record<RevealVariant, string> = {
  "fade": styles.fade,
  "fade-up": styles.fadeUp,
  "fade-down": styles.fadeDown,
  "fade-left": styles.fadeLeft,
  "fade-right": styles.fadeRight,
  "fade-scale": styles.fadeScale,
  "scale-in": styles.scaleIn,
  "slide-up": styles.slideUp,
  "slide-down": styles.slideDown,
  "slide-left": styles.slideLeft,
  "slide-right": styles.slideRight,
  "wipe-right": styles.wipeRight,
  "wipe-up": styles.wipeUp,
  "mask-up": styles.maskUp,
  "mask-right": styles.maskRight,
  "blur-in": styles.blurIn,
  "spotlight": styles.spotlight,
  "drift-in": styles.driftIn,
  "roll-in": styles.rollIn,
  "skew-in": styles.skewIn,
};

type RevealOwnProps = {
  as?: ElementType;
  children?: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  index?: number;
  stagger?: string | number;
  duration?: string;
  distance?: string;
  scale?: string | number;
  blur?: string;
  ease?: string;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
};

// Permissive pass-through for tag-specific attributes (href on <a>, open on
// <details>, type/onSubmit on <form>, role/aria-*, etc.). Per-tag typing
// would require generic-polymorphic plumbing that buys us very little here —
// every caller is in this repo and we already validate at runtime via React.
type RevealProps = RevealOwnProps & Record<string, unknown>;

export function Reveal({
  as: Tag = "div",
  children,
  variant = "fade-up",
  delay = 0,
  index,
  stagger,
  duration,
  distance,
  scale,
  blur,
  ease,
  className,
  style,
  once = true,
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
  ...rest
}: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>({ once, threshold, rootMargin });

  const composedStyle: CSSProperties = {
    ...style,
    ...(delay ? ({ ["--m-delay" as never]: `${delay}ms` } as CSSProperties) : {}),
    ...(typeof index === "number"
      ? ({ ["--m-i" as never]: index } as CSSProperties)
      : {}),
    ...(stagger
      ? ({
          ["--m-stagger" as never]:
            typeof stagger === "number" ? `${stagger}ms` : stagger,
        } as CSSProperties)
      : {}),
    ...(duration ? ({ ["--m-dur" as never]: duration } as CSSProperties) : {}),
    ...(ease ? ({ ["--m-ease" as never]: ease } as CSSProperties) : {}),
    ...(distance
      ? ({ ["--m-distance" as never]: distance } as CSSProperties)
      : {}),
    ...(scale
      ? ({
          ["--m-scale" as never]:
            typeof scale === "number" ? String(scale) : scale,
        } as CSSProperties)
      : {}),
    ...(blur ? ({ ["--m-blur" as never]: blur } as CSSProperties) : {}),
  };

  const classes = [styles.reveal, variantClass[variant], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      ref={ref}
      data-motion={variant}
      data-motion-in={inView ? "true" : "false"}
      className={classes}
      style={composedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}
