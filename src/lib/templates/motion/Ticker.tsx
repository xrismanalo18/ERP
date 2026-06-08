import type { CSSProperties, ReactNode } from "react";
import styles from "./motion.module.css";

type TickerProps = {
  children: ReactNode;
  /** Total cycle duration as a CSS value (e.g. "32s") or theme var */
  duration?: string;
  /** Gap between repeated copies */
  gap?: number | string;
  /** Scroll direction */
  direction?: "left" | "right";
  /** Whether to pause on hover */
  pauseOnHover?: boolean;
  /** Disable the fade-mask gradient on each edge */
  hardEdges?: boolean;
  /** Optional class on outer wrapper */
  className?: string;
  /** Number of duplicate groups (default 2). Increase for very short content. */
  copies?: number;
  /** Aria label for screen readers */
  "aria-label"?: string;
  style?: CSSProperties;
};

/**
 * SSR-safe horizontally scrolling marquee. Duplicates children to produce a
 * seamless loop. Relies on CSS animation (no JS state) and reduced-motion
 * media query disables motion automatically.
 */
export function Ticker({
  children,
  duration,
  gap = 32,
  direction = "left",
  pauseOnHover = true,
  hardEdges = false,
  className,
  copies = 2,
  style,
  ...rest
}: TickerProps) {
  const gapValue = typeof gap === "number" ? `${gap}px` : gap;
  const composed: CSSProperties = {
    ...style,
    ...(duration ? ({ ["--m-ticker-dur" as never]: duration } as CSSProperties) : {}),
    ...({ ["--m-ticker-gap" as never]: gapValue } as CSSProperties),
    ...({
      ["--m-ticker-dir" as never]: direction === "right" ? "reverse" : "normal",
    } as CSSProperties),
  };

  const copyArr = Array.from({ length: Math.max(2, copies) });

  return (
    <div
      className={[styles.ticker, className].filter(Boolean).join(" ")}
      data-pause={pauseOnHover ? "hover" : "never"}
      data-edges={hardEdges ? "hard" : "soft"}
      style={composed}
      {...rest}
    >
      <div className={styles.tickerTrack}>
        {copyArr.map((_, idx) => (
          <div
            key={idx}
            className={styles.tickerGroup}
            aria-hidden={idx > 0 ? true : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
