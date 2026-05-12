import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZAdsHero } from "@/app/z-ads/sections/hero";
import { ZAdsProblem } from "@/app/z-ads/sections/problem";
import { ZAdsDiferenciais } from "@/app/z-ads/sections/diferenciais";
import { ZAdsProcess } from "@/app/z-ads/sections/process";
import { ZAdsPainel } from "@/app/z-ads/sections/painel";
import { ZAdsPricing } from "@/app/z-ads/sections/pricing";
import { ZAdsFaq } from "@/app/z-ads/sections/faq";
import { ZAdsCta } from "@/app/z-ads/sections/cta";

export const metadata = {
  title: "Tráfego Pago para Negócios Locais — Z-ADS | ZBRAND",
  description:
    "Meta Ads e Google Ads para o seu negócio. A gente estrutura, filma, edita e otimiza suas campanhas. Contrato 4 meses por R$ 1.500/mês + verba de anúncios.",
};

export default function TrafegoPage() {
  return (
    <>
      <Header />
      <main>
        <ZAdsHero />
        <ZAdsProblem />
        <ZAdsDiferenciais />
        <ZAdsProcess />
        <ZAdsPainel />
        <ZAdsPricing />
        <ZAdsFaq />
        <ZAdsCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
