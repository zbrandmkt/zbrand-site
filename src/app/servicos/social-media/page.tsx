import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZSocialHero } from "@/app/z-social/sections/hero";
import { ZSocialProblem } from "@/app/z-social/sections/problem";
import { ZSocialDiferenciais } from "@/app/z-social/sections/diferenciais";
import { ZSocialProcess } from "@/app/z-social/sections/process";
import { ZSocialPainel } from "@/app/z-social/sections/painel";
import { ZSocialCases } from "@/app/z-social/sections/cases";
import { ZSocialPricing } from "@/app/z-social/sections/pricing";
import { ZSocialFaq } from "@/app/z-social/sections/faq";
import { ZSocialCta } from "@/app/z-social/sections/cta";

export const metadata = {
  title: "Social Media para Restaurantes — Z-SOCIAL | ZBRAND",
  description:
    "A gente filma, edita e publica conteúdo que traz clientes reais. Gestão de Instagram, TikTok e LinkedIn para o setor de gastronomia. Conheça o Z-SOCIAL.",
};

export default function SocialMediaPage() {
  return (
    <>
      <Header />
      <main>
        <ZSocialHero />
        <ZSocialProblem />
        <ZSocialDiferenciais />
        <ZSocialProcess />
        <ZSocialPainel />
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
