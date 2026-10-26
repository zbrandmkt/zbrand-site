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

export const metadata = {
  title: "Site de Orçamento para Fornecedores de Eventos",
  description:
    "Site e landing page de orçamento para carrinho gourmet, food truck, fotógrafo, doces e serviços de evento. Formulário com data, local e convidados, WhatsApp e SEO local. No ar em até 10 dias.",
};

export default function WebsitePage() {
  return (
    <>
      <Header />
      <main>
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
