import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZSiteHero } from "@/app/z-site/sections/hero";
import { ZSiteProblem } from "@/app/z-site/sections/problem";
import { ZSiteExemplos } from "@/app/z-site/sections/exemplos";
import { ZSiteDiferenciais } from "@/app/z-site/sections/diferenciais";
import { ZSiteProcess } from "@/app/z-site/sections/process";
import { ZSitePricing } from "@/app/z-site/sections/pricing";
import { ZSiteFaq } from "@/app/z-site/sections/faq";
import { ZSiteCta } from "@/app/z-site/sections/cta";

export const metadata = {
  title: "Websites e Landing Pages para Negócios Locais — Z-SITE | ZBRAND",
  description:
    "Criamos o site do seu negócio com foco em conversão. Landing page em 10 dias por R$ 1.500. Site completo a partir de R$ 3.900. SEO local incluído.",
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
        <ZSitePricing />
        <ZSiteFaq />
        <ZSiteCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
