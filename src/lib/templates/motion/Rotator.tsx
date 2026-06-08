"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "./useReducedMotion";
import styles from "./motion.module.css";

type RotatorProps = {
  slides: ReactNode[];
  interval?: number;
  controls?: boolean;
  dots?: boolean;
  ariaLabel?: string;
  className?: string;
  stageClassName?: string;
  buttonLabelPrev?: string;
  buttonLabelNext?: string;
  renderControls?: (api: RotatorApi) => ReactNode;
  pauseOnHover?: boolean;
  stacked?: boolean;
};

export type RotatorApi = {
  index: number;
  count: number;
  next: () => void;
  prev: () => void;
  goTo: (i: number) => void;
};

export function Rotator({
  slides,
  interval = 5500,
  controls = true,
  dots = true,
  ariaLabel = "Carousel",
  className,
  stageClassName,
  buttonLabelPrev = "Previous slide",
  buttonLabelNext = "Next slide",
  renderControls,
  pauseOnHover = true,
  stacked = true,
}: RotatorProps) {
  const reduced = useReducedMotion();
  const n = slides.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => setI((x) => (x + 1) % n), [n]);
  const prev = useCallback(() => setI((x) => (x - 1 + n) % n), [n]);
  const goTo = useCallback(
    (target: number) => setI(((target % n) + n) % n),
    [n],
  );

  useEffect(() => {
    if (reduced || n <= 1 || paused || interval <= 0) return;
    const id = window.setInterval(() => {
      setI((x) => (x + 1) % n);
    }, interval);
    return () => window.clearInterval(id);
  }, [reduced, n, paused, interval]);

  const api: RotatorApi = { index: i, count: n, next, prev, goTo };

  return (
    <div
      ref={containerRef}
      className={[styles.rotator, className].filter(Boolean).join(" ")}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
    >
      <div
        className={[
          styles.rotatorStage,
          stacked ? styles.rotatorStageStacked : "",
          stageClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={styles.rotatorSlide}
            data-active={idx === i ? "true" : "false"}
            aria-hidden={idx !== i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${idx + 1} of ${n}`}
          >
            {slide}
          </div>
        ))}
      </div>

      {renderControls
        ? renderControls(api)
        : (controls || dots) && n > 1 && (
            <div
              className={styles.rotatorControls}
              style={{ marginTop: 24, gap: 16, display: "flex" }}
            >
              {controls && (
                <div className={styles.rotatorControls}>
                  <button
                    type="button"
                    className={styles.rotatorButton}
                    onClick={prev}
                    aria-label={buttonLabelPrev}
                  >
                    <span aria-hidden="true">←</span>
                  </button>
                  <button
                    type="button"
                    className={styles.rotatorButton}
                    onClick={next}
                    aria-label={buttonLabelNext}
                  >
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              )}
              {dots && (
                <div
                  className={styles.rotatorDots}
                  role="tablist"
                  aria-label={ariaLabel}
                >
                  {slides.map((_, idx) => (
                    <button
                      type="button"
                      key={idx}
                      role="tab"
                      aria-selected={idx === i}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={styles.rotatorDot}
                      data-active={idx === i ? "true" : "false"}
                      onClick={() => goTo(idx)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
    </div>
  );
}
