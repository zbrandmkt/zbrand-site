import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZSocialHero } from "./sections/hero";
import { ZSocialProblem } from "./sections/problem";
import { ZSocialDiferenciais } from "./sections/diferenciais";
import { ZSocialProcess } from "./sections/process";
import { ZSocialCases } from "./sections/cases";
import { ZSocialPricing } from "./sections/pricing";
import { ZSocialFaq } from "./sections/faq";
import { ZSocialCta } from "./sections/cta";

export const metadata = {
  title: "Z-SOCIAL — Gestão de Redes Sociais para Restaurantes | ZBRAND",
  description:
    "A gente filma, edita e publica conteúdo que traz clientes reais. Enquanto você dorme, sua marca está trabalhando. Gestão de Instagram, TikTok e mais.",
};

export default function ZSocialPage() {
  return (
    <>
      <Header />
      <main>
        <ZSocialHero />
        <ZSocialProblem />
        <ZSocialDiferenciais />
        <ZSocialProcess />
        <ZSocialCases />
        <ZSocialPricing />
        <ZSocialFaq />
        <ZSocialCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
