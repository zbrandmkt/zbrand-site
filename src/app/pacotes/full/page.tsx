import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZFullHero } from "@/app/z-full/sections/hero";
import { ZFullProblem } from "@/app/z-full/sections/problem";
import { ZFullSynergy } from "@/app/z-full/sections/synergy";
import { ZFullDiferenciais } from "@/app/z-full/sections/diferenciais";
import { ZFullProcess } from "@/app/z-full/sections/process";
import { ZFullPainel } from "@/app/z-full/sections/painel";
import { ZFullPricing } from "@/app/z-full/sections/pricing";
import { ZFullFaq } from "@/app/z-full/sections/faq";
import { ZFullCta } from "@/app/z-full/sections/cta";

export const metadata = {
  title: "Pacote Full — Social + Ads + Automação WhatsApp | ZBRAND",
  description:
    "3 redes sociais + Meta & Google Ads + Bot de WhatsApp. O sistema completo para atrair, converter e fidelizar clientes. R$ 7.000/mês.",
};

export default function FullPage() {
  return (
    <>
      <Header />
      <main>
        <ZFullHero />
        <ZFullProblem />
        <ZFullSynergy />
        <ZFullDiferenciais />
        <ZFullProcess />
        <ZFullPainel />
        <ZFullPricing />
        <ZFullFaq />
        <ZFullCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
