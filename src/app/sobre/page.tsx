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
  title: "Sobre Nós — ZBRAND | A Agência que Viveu na Pele",
  description:
    "Bruna e Gui fundaram a ZBRAND depois de crescer a própria marca de 1.500 para 10.000 seguidores orgânico. Agora fazem o mesmo pelo seu negócio.",
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
