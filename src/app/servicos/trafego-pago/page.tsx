import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { ZAdsHero } from "@/app/z-ads/sections/hero";
import { ZAdsProblem } from "@/app/z-ads/sections/problem";
import { ZAdsDiferenciais } from "@/app/z-ads/sections/diferenciais";
import { ZAdsProcess } from "@/app/z-ads/sections/process";
import { ZAdsPainel } from "@/app/z-ads/sections/painel";
import { ZAdsFaq } from "@/app/z-ads/sections/faq";
import { ZAdsCta } from "@/app/z-ads/sections/cta";
import { JsonLd } from "@/components/seo/json-ld";
import { faqSchema, serviceSchema } from "@/lib/schema";
import { faqs } from "@/app/z-ads/sections/faq-data";

export const metadata = {
  alternates: { canonical: "/servicos/trafego-pago" },
  title: "Tráfego Pago para Food Truck, Carrinho Gourmet e Eventos",
  description:
    "Anúncios no Meta e no Google para fornecedores de eventos receberem pedidos de orçamento na época certa: casamentos, 15 anos, corporativos e festas. Relatório semanal e atendimento remoto."
};

export default function TrafegoPage() {
  return (
    <>
      <Header />
      <main>
        <JsonLd
          data={[
            serviceSchema({ name: "Tráfego pago para fornecedores de eventos", description: metadata.description, path: "/servicos/trafego-pago" }),
            faqSchema(faqs),
          ]}
        />
        <ZAdsHero />
        <ZAdsProblem />
        <ZAdsDiferenciais />
        <ZAdsProcess />
        <ZAdsPainel />
        <ZAdsFaq />
        <ZAdsCta />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
