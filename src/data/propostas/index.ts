import { PropostaData } from "@/types/proposta";
import { ecoaBrownies } from "./ecoa-brownies";
import { graficaF4Color } from "./grafica-f4-color";

const propostas: Record<string, PropostaData> = {
  "ecoa-brownies": ecoaBrownies,
  "grafica-f4-color": graficaF4Color,
};

export function getPropostaBySlug(slug: string): PropostaData | undefined {
  return propostas[slug];
}

export function getAllPropostaSlugs(): string[] {
  return Object.keys(propostas);
}
