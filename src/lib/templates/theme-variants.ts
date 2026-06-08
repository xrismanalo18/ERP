import type { ThemeReplacements } from "./theme";

export type TemplateThemeVariant = {
  id: string;
  name: string;
  description: string;
  tags: string[];
  bestFor: string[];
  swatches: string[];
  theme: ThemeReplacements;
};

export type ThemeVariantReviewStatus = "approved" | "rejected";

export type ThemeVariantReview = {
  templateId: string;
  variantId: string;
  status: ThemeVariantReviewStatus;
  updatedAt: string;
};
