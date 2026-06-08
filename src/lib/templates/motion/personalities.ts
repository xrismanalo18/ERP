import type { TemplateTheme, TemplateThemeEntry } from "../types";

export type MotionPersonality = "cinematic" | "editorial" | "kinetic" | "utility";

const m = (label: string, value: string): TemplateThemeEntry => ({
  type: "motion",
  label,
  value,
});

/**
 * Per-personality motion token bundles. Each personality establishes a
 * coherent rhythm: durations, easing curves, stagger cadence, reveal
 * distance/scale/blur magnitudes, ticker speed.
 *
 * Templates spread the preset into their `defaultTheme` so motion tokens
 * follow the same strict-theme-contract path as colors and typography:
 * runtime overrides reach the CSS via `themeStyle(theme)` exactly like any
 * other token.
 */
export const motionTokenPresets: Record<MotionPersonality, TemplateTheme> = {
  cinematic: {
    "m-dur-fast": m("Motion duration fast", "320ms"),
    "m-dur-base": m("Motion duration base", "780ms"),
    "m-dur-slow": m("Motion duration slow", "1300ms"),
    "m-ease-out": m("Motion ease out", "cubic-bezier(0.16, 1, 0.3, 1)"),
    "m-ease-emph": m("Motion ease emphasised", "cubic-bezier(0.65, 0, 0.35, 1)"),
    "m-stagger": m("Motion stagger", "90ms"),
    "m-distance": m("Reveal translate distance", "52px"),
    "m-scale": m("Reveal scale start", "0.94"),
    "m-blur": m("Reveal blur start", "14px"),
    "m-ticker-dur": m("Ticker cycle duration", "34s"),
  },
  editorial: {
    "m-dur-fast": m("Motion duration fast", "440ms"),
    "m-dur-base": m("Motion duration base", "920ms"),
    "m-dur-slow": m("Motion duration slow", "1500ms"),
    "m-ease-out": m("Motion ease out", "cubic-bezier(0.22, 1, 0.36, 1)"),
    "m-ease-emph": m("Motion ease emphasised", "cubic-bezier(0.4, 0, 0.2, 1)"),
    "m-stagger": m("Motion stagger", "140ms"),
    "m-distance": m("Reveal translate distance", "20px"),
    "m-scale": m("Reveal scale start", "0.985"),
    "m-blur": m("Reveal blur start", "4px"),
    "m-ticker-dur": m("Ticker cycle duration", "62s"),
  },
  kinetic: {
    "m-dur-fast": m("Motion duration fast", "220ms"),
    "m-dur-base": m("Motion duration base", "440ms"),
    "m-dur-slow": m("Motion duration slow", "780ms"),
    "m-ease-out": m("Motion ease out", "cubic-bezier(0.34, 1.56, 0.64, 1)"),
    "m-ease-emph": m("Motion ease emphasised", "cubic-bezier(0.68, -0.4, 0.27, 1.55)"),
    "m-stagger": m("Motion stagger", "60ms"),
    "m-distance": m("Reveal translate distance", "90px"),
    "m-scale": m("Reveal scale start", "0.84"),
    "m-blur": m("Reveal blur start", "0px"),
    "m-ticker-dur": m("Ticker cycle duration", "20s"),
  },
  utility: {
    "m-dur-fast": m("Motion duration fast", "200ms"),
    "m-dur-base": m("Motion duration base", "460ms"),
    "m-dur-slow": m("Motion duration slow", "760ms"),
    "m-ease-out": m("Motion ease out", "cubic-bezier(0.2, 0.8, 0.2, 1)"),
    "m-ease-emph": m("Motion ease emphasised", "cubic-bezier(0.4, 0, 0.2, 1)"),
    "m-stagger": m("Motion stagger", "70ms"),
    "m-distance": m("Reveal translate distance", "26px"),
    "m-scale": m("Reveal scale start", "0.97"),
    "m-blur": m("Reveal blur start", "0px"),
    "m-ticker-dur": m("Ticker cycle duration", "44s"),
  },
};

/**
 * Sanity helper: spread a personality preset into a theme map. Useful when a
 * template wants to override a single motion token (e.g. a slower ticker
 * because the brand voice is calm).
 */
export function withMotion(
  base: TemplateTheme,
  personality: MotionPersonality,
  overrides?: Partial<Record<string, string>>,
): TemplateTheme {
  const preset = motionTokenPresets[personality];
  const merged: TemplateTheme = { ...base };
  for (const [key, entry] of Object.entries(preset)) {
    merged[key] = entry;
  }
  if (overrides) {
    for (const [key, value] of Object.entries(overrides)) {
      if (value === undefined) continue;
      const existing = merged[key];
      if (existing) {
        merged[key] = { ...existing, value };
      } else {
        merged[key] = m(key, value);
      }
    }
  }
  return merged;
}
