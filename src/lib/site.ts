// Dados da marca num lugar só. Para trocar o domínio, basta mudar
// NEXT_PUBLIC_SITE_URL (ex.: https://www.zibrand.com.br) na Vercel.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.zbrand.com.br"
).replace(/\/$/, "");

export const site = {
  name: "Zibrand",
  legalName: "ZBRAND CONSULTORIA EM PUBLICIDADE LTDA",
  tagline: "Assessoria de marketing para fornecedores de eventos",
  description:
    "A Zibrand é a assessoria de marketing dos fornecedores de eventos: site de orçamento, tráfego pago, automação de WhatsApp e social media para carrinhos gourmet, food trucks, estações, fotógrafos e serviços de evento. Atendimento remoto no Brasil inteiro.",
  url: SITE_URL,
  email: "contato@zbrand.com.br",
  phone: "+5511940502929",
  phoneDisplay: "(11) 94050-2929",
  social: {
    instagram: "https://instagram.com/zbrand.mkt",
    instagramHandle: "@zbrand.mkt",
    tiktok: "https://tiktok.com/@zbrand.mkt",
    youtube: "https://youtube.com/@zbrand.mkt",
  },
} as const;

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
