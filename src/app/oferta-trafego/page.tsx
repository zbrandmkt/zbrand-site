import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { OfertaTrafegoHero } from "./sections/hero";
import { HowItWorks } from "./sections/how-it-works";
import { Deliverables } from "./sections/deliverables";
import { Pricing } from "./sections/pricing";
import { CreativeWarning } from "./sections/creative-warning";
import { CtaFinal } from "./sections/cta-final";

export const metadata = {
  title: "Tráfego Pago para Restaurantes — R$ 800/mês | ZBRAND",
  description:
    "Gestão completa de Meta Ads para restaurantes. Campanhas estruturadas, otimização semanal e relatório com ROAS, CAC e conversão. Contrato de 3 meses por R$ 800/mês.",
  robots: { index: false, follow: false },
};

export default function OfertaTrafegoPage() {
  return (
    <>
      <Header />
      <main>
        <OfertaTrafegoHero />
        <HowItWorks />
        <Deliverables />
        <Pricing />
        <CreativeWarning />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
