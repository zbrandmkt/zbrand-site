import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZPersonalizadoHero } from "@/app/z-personalizado/sections/hero";
import { ZPersonalizadoConfigurador } from "@/app/z-personalizado/sections/configurador";
import { ZPersonalizadoDiferenciais } from "@/app/z-personalizado/sections/diferenciais";
import { ZPersonalizadoFaq } from "@/app/z-personalizado/sections/faq";
import { ZPersonalizadoCta } from "@/app/z-personalizado/sections/cta";

export const metadata = {
  title: "Pacote Personalizado — Monte o Seu | ZBRAND",
  description:
    "Escolha os serviços que você precisa: Social Media, Tráfego Pago ou WhatsApp Bot. Veja o preço em tempo real e monte o pacote ideal para o seu negócio.",
};

export default function PersonalizadoPage() {
  return (
    <>
      <Header />
      <main>
        <ZPersonalizadoHero />
        <ZPersonalizadoConfigurador />
        <ZPersonalizadoDiferenciais />
        <ZPersonalizadoFaq />
        <ZPersonalizadoCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
