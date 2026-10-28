import { absoluteUrl, site } from "@/lib/site";

// Dados estruturados (schema.org) para Google e buscadores de IA.

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": absoluteUrl("/#organizacao"),
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    slogan: "Chega de zebra no seu marketing.",
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/brand/logo-zibrand.svg"),
    image: absoluteUrl("/opengraph-image"),
    email: site.email,
    telephone: site.phone,
    areaServed: { "@type": "Country", name: "Brasil" },
    knowsAbout: [
      "marketing para fornecedores de eventos",
      "site de orçamento para carrinho gourmet",
      "tráfego pago para food truck",
      "automação de WhatsApp para orçamentos",
      "social media para eventos",
    ],
    founder: [
      { "@type": "Person", name: "Bruna" },
      { "@type": "Person", name: "Guilherme" },
    ],
    sameAs: [site.social.instagram],
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.path),
    serviceType: opts.name,
    provider: { "@id": absoluteUrl("/#organizacao") },
    areaServed: { "@type": "Country", name: "Brasil" },
    audience: {
      "@type": "BusinessAudience",
      audienceType:
        "Fornecedores de eventos: carrinhos gourmet, food trucks, estações, fotógrafos, doces, decoração e DJs",
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
