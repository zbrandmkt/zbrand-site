import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZSocialHero } from "@/app/z-social/sections/hero";
import { ZSocialProblem } from "@/app/z-social/sections/problem";
import { ZSocialDiferenciais } from "@/app/z-social/sections/diferenciais";
import { ZSocialProcess } from "@/app/z-social/sections/process";
import { ZSocialPainel } from "@/app/z-social/sections/painel";
import { ZSocialCases } from "@/app/z-social/sections/cases";
import { ZSocialFaq } from "@/app/z-social/sections/faq";
import { ZSocialCta } from "@/app/z-social/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { faqs } from "@/app/z-social/sections/faq-data";

export const metadata = {
  alternates: { canonical: "/servicos/social-media" },
  title: "Social Media Automatizado para Fornecedores de Eventos",
  description:
    "Instagram ativo o ano inteiro para carrinhos gourmet, food trucks e serviços de evento, com IA, templates e vídeos produzidos em lote. Presença constante sem tirar você da operação.",
};

export default function SocialMediaPage() {
  return (
    <>
      <Header />
      <main>
        <JsonLd
          data={[
            serviceSchema({ name: "Social media automatizado para fornecedores de eventos", description: metadata.description, path: "/servicos/social-media" }),
            faqSchema(faqs),
          ]}
        />
        <ZSocialHero />
        <ZSocialProblem />
        <ZSocialDiferenciais />
        <ZSocialProcess />
        <ZSocialPainel />
        <ZSocialCases />
        <ZSocialFaq />
        <ZSocialCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
