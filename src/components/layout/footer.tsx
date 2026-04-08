"use client";

import Link from "next/link";
import Image from "next/image";
import { getWhatsAppLink } from "@/lib/whatsapp";

const footerLinks = {
  servicos: [
    { name: "Social Media", href: "/servicos/social-media" },
    { name: "Tráfego Pago", href: "/servicos/trafego-pago" },
    { name: "Tráfego Orgânico", href: "/servicos/trafego-organico" },
    { name: "Captação de Conteúdo", href: "/servicos/captacao" },
    { name: "Website & Landing Page", href: "/servicos/website" },
    { name: "Automação WhatsApp", href: "/servicos/automacao" },
  ],
  pacotes: [
    { name: "Starter", href: "/#servicos" },
    { name: "Full", href: "/#servicos" },
    { name: "Personalizado", href: "/#servicos" },
  ],
  empresa: [
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
    { name: "Área do Cliente", href: "/area-do-cliente" },
  ],
  legal: [
    { name: "Política de Privacidade", href: "/politica-privacidade" },
    { name: "Termos e Condições", href: "/termos" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-preto border-t border-white/05">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Top row: Logo + tagline + socials */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12 pb-12 border-b border-white/08">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-zbrand.png"
                alt="ZBRAND"
                width={180}
                height={54}
                className="h-14 w-auto"
              />
            </Link>
            <p className="font-display text-xs text-white/40 leading-relaxed">
              Marketing digital sem mimimi.
              <br />
              Feito por quem já tocou restaurante.
            </p>
          </div>

          {/* Socials + contact */}
          <div className="flex flex-col gap-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/25">
              Nos acompanhe
            </p>
            <div className="flex gap-2.5">
              {/* Instagram */}
              <a
                href="https://instagram.com/zbrand.mkt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-white/10 rounded-xl flex items-center justify-center text-white/50 hover:border-[#FF6100] hover:text-[#FF6100] hover:bg-[#FF6100]/10 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="https://tiktok.com/@zbrand.mkt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-white/10 rounded-xl flex items-center justify-center text-white/50 hover:border-[#FF6100] hover:text-[#FF6100] hover:bg-[#FF6100]/10 transition-all"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.1a8.16 8.16 0 005.58 2.2V11.3a4.85 4.85 0 01-3.77-1.85V6.69h3.77z" />
                </svg>
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com/@zbrand.mkt"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-white/10 rounded-xl flex items-center justify-center text-white/50 hover:border-[#FF6100] hover:text-[#FF6100] hover:bg-[#FF6100]/10 transition-all"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href={getWhatsAppLink("geral")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border-2 border-white/10 rounded-xl flex items-center justify-center text-white/50 hover:border-[#25D366] hover:text-[#25D366] hover:bg-[#25D366]/10 transition-all"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-white/30 font-medium">
              (11) 94050-2929 &middot;{" "}
              <a href="mailto:contato@zbrand.com.br" className="hover:text-white/60 transition-colors">
                contato@zbrand.com.br
              </a>
            </p>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Serviços */}
          <div>
            <h3 className="font-display font-black text-[10px] uppercase tracking-widest text-[#FF6100] mb-4">
              Serviços
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.servicos.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-xs text-white/40 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pacotes */}
          <div>
            <h3 className="font-display font-black text-[10px] uppercase tracking-widest text-[#FF6100] mb-4">
              Pacotes
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.pacotes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="font-display text-xs text-white/40 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-display font-black text-[10px] uppercase tracking-widest text-[#FF6100] mb-4">
              Empresa
            </h3>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-xs text-white/40 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-display font-black text-[10px] uppercase tracking-widest text-[#FF6100] mb-4">
              Contato
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <a
                  href={getWhatsAppLink("geral")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs text-white/40 hover:text-[#25D366] transition-colors"
                >
                  (11) 94050-2929
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@zbrand.com.br"
                  className="font-display text-xs text-white/40 hover:text-white transition-colors"
                >
                  contato@zbrand.com.br
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/zbrand.mkt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-xs text-white/40 hover:text-white transition-colors"
                >
                  @zbrand.mkt
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/05 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-display text-[10px] text-white/20">
            &copy; {new Date().getFullYear()} ZBRAND. Todos os direitos reservados.
          </p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-[10px] text-white/20 hover:text-white/40 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
