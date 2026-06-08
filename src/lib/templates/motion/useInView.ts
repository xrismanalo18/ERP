"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

export type UseInViewOptions = {
  once?: boolean;
  threshold?: number | number[];
  rootMargin?: string;
};

export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {},
): { ref: RefObject<T | null>; inView: boolean } {
  const { once = true, threshold = 0.15, rootMargin = "0px 0px -8% 0px" } =
    options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Hidden / backgrounded tabs throttle IO callbacks indefinitely; rather
    // than leave content invisible, reveal immediately. The user can't see
    // the animation anyway. When the tab is later focused, content is
    // already settled.
    if (typeof document !== "undefined" && document.hidden) {
      setInView(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, JSON.stringify(threshold)]);

  return { ref, inView };
}
