import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZStarterHero } from "@/app/z-starter/sections/hero";
import { ZStarterProblem } from "@/app/z-starter/sections/problem";
import { ZStarterSynergy } from "@/app/z-starter/sections/synergy";
import { ZStarterDiferenciais } from "@/app/z-starter/sections/diferenciais";
import { ZStarterProcess } from "@/app/z-starter/sections/process";
import { ZStarterPricing } from "@/app/z-starter/sections/pricing";
import { ZStarterFaq } from "@/app/z-starter/sections/faq";
import { ZStarterCta } from "@/app/z-starter/sections/cta";

export const metadata = {
  title: "Pacote Starter — Social Media + Tráfego Pago | ZBRAND",
  description:
    "Social Media + Meta Ads integrados. Uma equipe, uma estratégia, um dashboard. R$ 3.000/mês para restaurantes que querem crescer.",
};

export default function StarterPage() {
  return (
    <>
      <Header />
      <main>
        <ZStarterHero />
        <ZStarterProblem />
        <ZStarterSynergy />
        <ZStarterDiferenciais />
        <ZStarterProcess />
        <ZStarterPricing />
        <ZStarterFaq />
        <ZStarterCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
