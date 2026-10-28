import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZSiteHero } from "@/app/z-site/sections/hero";
import { ZSiteProblem } from "@/app/z-site/sections/problem";
import { ZSiteExemplos } from "@/app/z-site/sections/exemplos";
import { ZSiteDiferenciais } from "@/app/z-site/sections/diferenciais";
import { ZSiteProcess } from "@/app/z-site/sections/process";
import { ZSiteFaq } from "@/app/z-site/sections/faq";
import { ZSiteCta } from "@/app/z-site/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { faqs } from "@/app/z-site/sections/faq-data";

export const metadata = {
  alternates: { canonical: "/servicos/website" },
  title: "Site de Orçamento para Fornecedores de Eventos",
  description:
    "Site e landing page de orçamento para carrinho gourmet, food truck, fotógrafo, doces e serviços de evento. Formulário com data, local e convidados, WhatsApp e SEO local. No ar em até 10 dias.",
};

export default function WebsitePage() {
  return (
    <>
      <Header />
      <main>
        <JsonLd
          data={[
            serviceSchema({ name: "Site de orçamento para fornecedores de eventos", description: metadata.description, path: "/servicos/website" }),
            faqSchema(faqs),
          ]}
        />
        <ZSiteHero />
        <ZSiteProblem />
        <ZSiteExemplos />
        <ZSiteDiferenciais />
        <ZSiteProcess />
        <ZSiteFaq />
        <ZSiteCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
