import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZAutomaçaoHero } from "@/app/z-automacao/sections/hero";
import { ZAutomaçaoProblem } from "@/app/z-automacao/sections/problem";
import { ZAutomaçaoBotPreview } from "@/app/z-automacao/sections/bot-preview";
import { ZAutomaçaoDiferenciais } from "@/app/z-automacao/sections/diferenciais";
import { ZAutomaçaoProcess } from "@/app/z-automacao/sections/process";
import { ZAutomaçaoFaq } from "@/app/z-automacao/sections/faq";
import { ZAutomaçaoCta } from "@/app/z-automacao/sections/cta";

export const metadata = {
  title: "Automação de WhatsApp para Orçamentos de Eventos (Zee)",
  description:
    "A Zee, assistente de IA da Zibrand, responde seu WhatsApp na hora, coleta data, local e número de convidados e entrega o orçamento pronto para você fechar. Para carrinhos gourmet, food trucks e serviços de evento.",
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
        <ZAutomaçaoFaq />
        <ZAutomaçaoCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
