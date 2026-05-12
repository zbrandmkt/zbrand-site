import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZAutomaçaoHero } from "@/app/z-automacao/sections/hero";
import { ZAutomaçaoProblem } from "@/app/z-automacao/sections/problem";
import { ZAutomaçaoBotPreview } from "@/app/z-automacao/sections/bot-preview";
import { ZAutomaçaoDiferenciais } from "@/app/z-automacao/sections/diferenciais";
import { ZAutomaçaoProcess } from "@/app/z-automacao/sections/process";
import { ZAutomaçaoPricing } from "@/app/z-automacao/sections/pricing";
import { ZAutomaçaoFaq } from "@/app/z-automacao/sections/faq";
import { ZAutomaçaoCta } from "@/app/z-automacao/sections/cta";

export const metadata = {
  title: "Automação de WhatsApp para Negócios — Z-AUTOMAÇÃO | ZBRAND",
  description:
    "Bot + IA generativa no WhatsApp do seu negócio. Atendimento 24h, respostas automáticas, disparos de promoção. Implementação em 20 dias por R$ 2.000.",
};

export default function AutomacaoPage() {
  return (
    <>
      <Header />
      <main>
        <ZAutomaçaoHero />
        <ZAutomaçaoProblem />
        <ZAutomaçaoBotPreview />
        <ZAutomaçaoDiferenciais />
        <ZAutomaçaoProcess />
        <ZAutomaçaoPricing />
        <ZAutomaçaoFaq />
        <ZAutomaçaoCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
