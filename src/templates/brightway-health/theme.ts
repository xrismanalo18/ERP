import type { TemplateThemeVariant } from "@/lib/templates/theme-variants";
export const brightwayHealthThemeVariants = [{
  id: "default",
  name: "Default",
  description: "The baseline Brightway Health theme: sun-yellow accents, cream paper, dark ink, white surfaces, and editorial healthcare typography.",
  tags: ["default", "healthcare", "consulting", "editorial"],
  bestFor: ["Baseline Brightway Health pages", "Healthcare consulting landing pages"],
  swatches: ["#F5C518", "#FFE066", "#FFFCF2", "#FFFFFF", "#E8DDB7", "#1d2118"],
  theme: {
    sun: "#F5C518",
    "sun-soft": "#FBE08A",
    "sun-glow": "#FFE066",
    paper: "#FFFCF2",
    surface: "#FFFFFF",
    "hero-muted": "#E8DDB7",
    "hero-base": "#1d2118",
    "hero-bg-gradient": "radial-gradient(ellipse at 70% 40%, rgba(255, 210, 90, .18) 0%, transparent 60%), linear-gradient(135deg, #2c3326 0%, #1a1d14 50%, #232a1d 100%)",
    "hero-photo-gradient": "radial-gradient(ellipse 600px 400px at 65% 50%, rgba(245, 197, 24, .22) 0%, transparent 70%), radial-gradient(ellipse 800px 500px at 30% 60%, rgba(180, 160, 120, .15) 0%, transparent 70%), linear-gradient(180deg, rgba(22, 23, 14, .45) 0%, rgba(22, 23, 14, .15) 40%, rgba(22, 23, 14, .55) 100%), linear-gradient(135deg, #3d4030 0%, #5a5740 35%, #7a6e4c 60%, #4a4838 100%)",
    ink: "#16170E",
    "ink-2": "#3A3A2C",
    "ink-3": "#6B6A56",
    line: "rgba(22, 23, 14, .14)",
    "line-soft": "rgba(22, 23, 14, .08)",
    serif: '"Fraunces", "Times New Roman", serif',
    sans: '"Inter", system-ui, -apple-system, sans-serif'
  }
}, {
  id: "midnight-clinical-boardroom",
  name: "Midnight Clinical Boardroom",
  description: "A dark healthcare consulting palette with smoked charcoal surfaces, linen text, restrained bronze sun accents, and teal-shadowed hero depth for executive briefings.",
  tags: ["dark", "consulting", "healthcare", "boardroom", "premium"],
  bestFor: ["Healthcare strategy firms presenting executive briefings", "Clinic operators needing a premium dark landing page", "Compliance-focused consulting offers with high-touch booking"],
  swatches: ["#101714", "#18211D", "#F4E9D2", "#7B5829", "#9A763A", "#7FA89A"],
  theme: {
    sun: "#7B5829",
    "sun-soft": "#34281E",
    "sun-glow": "#9A763A",
    paper: "#101714",
    surface: "#18211D",
    "hero-muted": "#B8C7B7",
    "hero-base": "#0B1110",
    "hero-bg-gradient": "radial-gradient(ellipse at 72% 38%, rgba(154, 118, 58, .24) 0%, transparent 58%), linear-gradient(135deg, #18231f 0%, #0b1110 48%, #15201e 100%)",
    "hero-photo-gradient": "radial-gradient(ellipse 600px 400px at 65% 50%, rgba(154, 118, 58, .24) 0%, transparent 70%), radial-gradient(ellipse 800px 500px at 30% 60%, rgba(127, 168, 154, .18) 0%, transparent 70%), linear-gradient(180deg, rgba(6, 10, 9, .58) 0%, rgba(6, 10, 9, .2) 40%, rgba(6, 10, 9, .7) 100%), linear-gradient(135deg, #1f2c28 0%, #253631 35%, #5b4b2b 62%, #111816 100%)",
    ink: "#F4E9D2",
    "ink-2": "#CDC0A8",
    "ink-3": "#9D917C",
    line: "rgba(244, 233, 210, .18)",
    "line-soft": "rgba(244, 233, 210, .09)",
    serif: '"Fraunces", "Times New Roman", serif',
    sans: '"Inter", system-ui, -apple-system, sans-serif'
  }
}] satisfies TemplateThemeVariant[];