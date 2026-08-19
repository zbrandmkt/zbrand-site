import { PropostaData } from "@/types/proposta";
import { ecoaBrownies } from "./ecoa-brownies";

const propostas: Record<string, PropostaData> = {
  "ecoa-brownies": ecoaBrownies,
};

export function getPropostaBySlug(slug: string): PropostaData | undefined {
  return propostas[slug];
}

export function getAllPropostaSlugs(): string[] {
  return Object.keys(propostas);
}
