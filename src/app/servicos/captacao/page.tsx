import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZCaptacaoHero } from "@/app/z-captacao/sections/hero";
import { ZCaptacaoProblem } from "@/app/z-captacao/sections/problem";
import { ZCaptacaoDia } from "@/app/z-captacao/sections/dia-captacao";
import { ZCaptacaoDiferenciais } from "@/app/z-captacao/sections/diferenciais";
import { ZCaptacaoProcess } from "@/app/z-captacao/sections/process";
import { ZCaptacaoFaq } from "@/app/z-captacao/sections/faq";
import { ZCaptacaoCta } from "@/app/z-captacao/sections/cta";

export const metadata = {
  title: "Captação de Vídeos para Fornecedores de Eventos",
  description:
    "10 vídeos editados em uma sessão de 4h no seu evento ou na sua operação. Conteúdo real do seu carrinho, truck ou serviço para Instagram e anúncios. Entrega em 10 dias.",
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
        <ZCaptacaoFaq />
        <ZCaptacaoCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
