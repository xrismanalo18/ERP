import type { CSSProperties } from "react";

import type {
  MergedTemplateTheme,
  TemplateTheme,
  TemplateThemeEntry,
} from "./types";

export type ThemeReplacement = {
  type?: TemplateThemeEntry["type"];
  value: string;
};

export type ThemeReplacements = Record<string, string | ThemeReplacement>;

export function mergeTemplateTheme(
  defaults: TemplateTheme,
  replacements: ThemeReplacements,
): MergedTemplateTheme {
  const theme: TemplateTheme = structuredClone(defaults);
  const missingKeys: string[] = [];

  for (const [key, replacement] of Object.entries(replacements)) {
    const existing = theme[key];

    if (!existing) {
      missingKeys.push(key);
      continue;
    }

    const value =
      typeof replacement === "string" ? replacement : replacement.value;

    theme[key] = {
      ...existing,
      value,
      ...(typeof replacement === "string"
        ? {}
        : replacement.type
          ? { type: replacement.type }
          : {}),
    };
  }

  return { theme, missingKeys };
}

export function themeStyle(theme?: TemplateTheme): CSSProperties {
  if (!theme) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(theme).map(([key, entry]) => [`--${key}`, entry.value]),
  ) as CSSProperties;
}
