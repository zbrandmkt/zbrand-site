import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZCaptacaoHero } from "@/app/z-captacao/sections/hero";
import { ZCaptacaoProblem } from "@/app/z-captacao/sections/problem";
import { ZCaptacaoDia } from "@/app/z-captacao/sections/dia-captacao";
import { ZCaptacaoDiferenciais } from "@/app/z-captacao/sections/diferenciais";
import { ZCaptacaoProcess } from "@/app/z-captacao/sections/process";
import { ZCaptacaoPricing } from "@/app/z-captacao/sections/pricing";
import { ZCaptacaoFaq } from "@/app/z-captacao/sections/faq";
import { ZCaptacaoCta } from "@/app/z-captacao/sections/cta";

export const metadata = {
  title: "Captação de Conteúdo Presencial — Z-CAPTAÇÃO | ZBRAND",
  description:
    "10 vídeos editados em 1 sessão de 4h. Captação presencial com celular profissional ou câmera. Entrega em 10 dias a partir de R$ 800. Para qualquer tipo de negócio.",
};

export default function CaptacaoPage() {
  return (
    <>
      <Header />
      <main>
        <ZCaptacaoHero />
        <ZCaptacaoProblem />
        <ZCaptacaoDia />
        <ZCaptacaoDiferenciais />
        <ZCaptacaoProcess />
        <ZCaptacaoPricing />
        <ZCaptacaoFaq />
        <ZCaptacaoCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
