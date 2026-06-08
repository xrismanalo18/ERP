import type {
  MergedTemplateContent,
  TemplateContent,
  TemplateContentEntry,
  TemplateIconValue,
} from "./types";

export type ContentReplacement = {
  type?: TemplateContentEntry["type"];
  value?: string;
  url?: string;
  alt?: string;
  poster?: string;
};

export type ContentReplacements = Record<string, string | ContentReplacement>;

export function mergeTemplateContent(
  defaults: TemplateContent,
  replacements: ContentReplacements,
): MergedTemplateContent {
  const content: TemplateContent = structuredClone(defaults);
  const missingKeys: string[] = [];

  for (const [key, replacement] of Object.entries(replacements)) {
    const existing = content[key];

    if (!existing) {
      missingKeys.push(key);
      continue;
    }

    const value =
      typeof replacement === "string"
        ? replacement
        : replacement.value ?? replacement.url;

    if (!value) {
      continue;
    }

    if (existing.type === "text") {
      content[key] = {
        ...existing,
        value,
      };
      continue;
    }

    if (existing.type === "video") {
      content[key] = {
        ...existing,
        value,
        poster:
          typeof replacement === "string"
            ? existing.poster
            : replacement.poster ?? existing.poster,
      };
      continue;
    }

    if (existing.type === "icon") {
      content[key] = {
        ...existing,
        value: value as TemplateIconValue,
      };
      continue;
    }

    content[key] = {
      ...existing,
      value,
      alt:
        typeof replacement === "string"
          ? existing.alt
          : replacement.alt ?? existing.alt,
    };
  }

  return { content, missingKeys };
}

export function textValue(content: TemplateContent, key: string): string {
  const entry = content[key];

  if (!entry || entry.type !== "text") {
    throw new Error(`Missing text content key: ${key}`);
  }

  return entry.value;
}

export function imageValue(
  content: TemplateContent,
  key: string,
): { src: string; alt: string } {
  const entry = content[key];

  if (!entry || entry.type !== "image") {
    throw new Error(`Missing image content key: ${key}`);
  }

  return { src: entry.value, alt: entry.alt };
}

export function videoValue(
  content: TemplateContent,
  key: string,
): { src: string; poster?: string } {
  const entry = content[key];

  if (!entry || entry.type !== "video") {
    throw new Error(`Missing video content key: ${key}`);
  }

  return { src: entry.value, poster: entry.poster };
}

export function iconValue(
  content: TemplateContent,
  key: string,
): TemplateIconValue {
  const entry = content[key];

  if (!entry || entry.type !== "icon") {
    throw new Error(`Missing icon content key: ${key}`);
  }

  return entry.value;
}
