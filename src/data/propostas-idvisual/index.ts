import { IdVisualData } from "@/types/proposta-idvisual";
import { janainaHirata } from "./janaina-hirata";

const propostas: Record<string, IdVisualData> = {
  "janaina-hirata": janainaHirata,
};

export function getIdVisualBySlug(slug: string): IdVisualData | undefined {
  return propostas[slug];
}

export function getAllIdVisualSlugs(): string[] {
  return Object.keys(propostas);
}
