import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Só as páginas públicas da esteira. Pacotes antigos, ofertas, propostas,
// /links e área do cliente ficam de fora.
const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/servicos/website", priority: 0.9 },
  { path: "/servicos/trafego-pago", priority: 0.9 },
  { path: "/servicos/automacao", priority: 0.9 },
  { path: "/servicos/social-media", priority: 0.8 },
  { path: "/servicos/captacao", priority: 0.6 },
  { path: "/sobre", priority: 0.7 },
  { path: "/politica-de-privacidade", priority: 0.2 },
  { path: "/politica-de-cookies", priority: 0.2 },
  { path: "/politica-antispam", priority: 0.2 },
  { path: "/termos-de-uso", priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
