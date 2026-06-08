import * as templateModule from "@/templates/brightway-health";
import type { TemplateDefinition } from "@/lib/templates/types";

import { content, theme } from "./generated-data";

function isTemplateDefinition(value: unknown): value is TemplateDefinition {
  return Boolean(
    value &&
      typeof value === "object" &&
      "metadata" in value &&
      "Component" in value,
  );
}

const template = Object.values(templateModule).find(isTemplateDefinition);

if (!template) {
  throw new Error("Template definition was not found in copied template source.");
}

const Template = template.Component;

export default function Home() {
  return <Template content={content} theme={theme} />;
}
