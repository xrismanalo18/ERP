import type { ComponentType } from "react";

export type TemplateContentType = "text" | "image" | "video" | "icon";

export type TemplateIconValue = `${string}:${string}`;

export type TemplateContentEntry =
  | {
      type: "text";
      value: string;
      label?: string;
    }
  | {
      type: "image";
      value: string;
      alt: string;
      label?: string;
    }
  | {
      type: "video";
      value: string;
      poster?: string;
      label?: string;
    }
  | {
      type: "icon";
      value: TemplateIconValue;
      label?: string;
    };

export type TemplateContent = Record<string, TemplateContentEntry>;

export type TemplateIconStyle = "outline" | "solid" | "duotone" | "brand";

export type TemplateIconSetEntry = Extract<TemplateContentEntry, { type: "icon" }>;

export type TemplateIconSet = {
  id: string;
  label: string;
  family: string;
  style: TemplateIconStyle;
  source: "local";
  icons: Record<string, TemplateIconSetEntry>;
};

export type TemplateThemeType =
  | "color"
  | "font"
  | "spacing"
  | "background"
  | "border"
  | "motion"
  | "other";

export type TemplateThemeEntry = {
  type: TemplateThemeType;
  value: string;
  label?: string;
};

export type TemplateTheme = Record<string, TemplateThemeEntry>;

export type TemplateMetadata = {
  id: string;
  name: string;
  description: string;
  category: string;
  isListed?: boolean;
  preferredIconSets?: string[];
};

export type TemplateAiSummary = {
  purpose: string;
  audience: string;
  tone: string;
  visualStyle: string;
};

export type TemplateAiSection = {
  id: string;
  name: string;
  purpose: string;
  copyGuidance: string;
  mediaGuidance?: string;
  contentKeys: string[];
  themeKeys?: string[];
};

export type TemplateAiGuide = {
  summary: TemplateAiSummary;
  editingHints: string[];
  sections: TemplateAiSection[];
};

export type TemplateComponentProps = {
  content: TemplateContent;
  theme?: TemplateTheme;
};

export type TemplatePage = {
  slug: string;
  name: string;
  Component: ComponentType<TemplateComponentProps>;
};

export type TemplateDefinition = {
  metadata: TemplateMetadata;
  defaultContent: TemplateContent;
  defaultTheme: TemplateTheme;
  defaultIconSet?: TemplateIconSet;
  ai: TemplateAiGuide;
  Component: ComponentType<TemplateComponentProps>;
  pages?: TemplatePage[];
};

export type MergedTemplateContent = {
  content: TemplateContent;
  missingKeys: string[];
};

export type MergedTemplateTheme = {
  theme: TemplateTheme;
  missingKeys: string[];
};
