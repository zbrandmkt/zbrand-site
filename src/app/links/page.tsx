import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/lib/site";

// Página de link da bio do Instagram (@zibrand.assessoria).
// Os links internos levam utm_source=instagram para medir a bio no Analytics.

export const metadata: Metadata = {
  title: "Links",
  description: site.tagline,
  robots: { index: false, follow: true },
};

const UTM = "utm_source=instagram&utm_medium=bio&utm_campaign=link_bio";

const links = [
  { icon: "💻", label: "Site de orçamento", desc: "Seu site pedindo orçamento 24h", href: "/servicos/website" },
  { icon: "🎯", label: "Tráfego pago", desc: "Anúncios na época certa", href: "/servicos/trafego-pago" },
  { icon: "⚡", label: "Zee no seu WhatsApp", desc: "Responde e qualifica na hora", href: "/servicos/automacao" },
  { icon: "📱", label: "Social media automatizado", desc: "Instagram ativo sem tirar você do evento", href: "/servicos/social-media" },
  { icon: "🦓", label: "Quem somos", desc: "Nascemos de um carrinho de churros", href: "/sobre" },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-preto relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px 280px",
        }}
      />

      <div className="relative z-10 max-w-md mx-auto px-4 py-12 flex flex-col items-center">
        <Logo variant="claro" height={56} className="h-14 mb-4" priority />
        <p className="font-display text-sm text-white/60 text-center leading-relaxed mb-8">
          Assessoria de marketing para fornecedores de eventos.
          <br />
          Mais orçamentos fechados, do Brasil inteiro.
        </p>

        <a
          href={getWhatsAppLink("geral")}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#FF6100] text-white font-display font-black text-sm uppercase tracking-widest py-4 rounded-2xl border-2 border-[#1A1A1A] mb-5 transition-transform hover:-translate-y-0.5"
          style={{ boxShadow: "4px 4px 0px 0px #FFFFFF" }}
        >
          💬 Pedir orçamento no WhatsApp
        </a>

        <ul className="w-full flex flex-col gap-3">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={`${l.href}?${UTM}`}
                className="w-full flex items-center gap-4 bg-white rounded-2xl border-2 border-[#1A1A1A] px-5 py-4 transition-transform hover:-translate-y-0.5"
                style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
              >
                <span className="text-2xl shrink-0" aria-hidden>
                  {l.icon}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-display font-black text-sm uppercase tracking-tight text-[#1A1A1A]">
                    {l.label}
                  </span>
                  <span className="block font-display text-xs text-[#1A1A1A]/55">{l.desc}</span>
                </span>
                <span className="text-[#FF6100] font-black" aria-hidden>
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href={`/?${UTM}`}
          className="mt-8 font-display text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          Ver o site completo
        </Link>
      </div>
    </main>
  );
}
