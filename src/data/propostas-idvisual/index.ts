import { IdVisualData } from "@/types/proposta-idvisual";
import { jahaina } from "./jahaina";

const propostas: Record<string, IdVisualData> = {
  jahaina,
};

export function getIdVisualBySlug(slug: string): IdVisualData | undefined {
  return propostas[slug];
}

export function getAllIdVisualSlugs(): string[] {
  return Object.keys(propostas);
}
