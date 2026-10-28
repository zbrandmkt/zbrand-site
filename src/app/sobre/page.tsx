import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { SobreHero } from "@/app/sobre/sections/hero";
import { SobreOrigin } from "@/app/sobre/sections/origin";
import { SobreNumbers } from "@/app/sobre/sections/numbers";
import { SobreFounders } from "@/app/sobre/sections/founders";
import { SobreValues } from "@/app/sobre/sections/values";
import { SobreCta } from "@/app/sobre/sections/cta";

export const metadata = {
  alternates: { canonical: "/sobre" },
  title: "Sobre a Zibrand — Nascemos de um Carrinho de Churros",
  description:
    "Bruna e Gui viveram 10 anos de eventos com a Churruts, seus carrinhos de churros. Hoje a Zibrand assessora fornecedores de eventos do Brasil inteiro a fechar mais orçamentos.",
};

export default function SobrePage() {
  return (
    <>
      <Header />
      <main>
        <SobreHero />
        <SobreOrigin />
        <SobreNumbers />
        <SobreFounders />
        <SobreValues />
        <SobreCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
