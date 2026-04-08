"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const TOP_BAR_H = 36;

const serviceItems = [
  { icon: "🎯", name: "Tráfego Pago",               href: "/servicos/trafego-pago" },
  { icon: "🔍", name: "Tráfego Orgânico",            href: "/servicos/trafego-organico" },
  { icon: "📱", name: "Social Media",                 href: "/servicos/social-media" },
  { icon: "🎬", name: "Captação de Conteúdo Mobile", href: "/servicos/captacao" },
  { icon: "💻", name: "Website & Landing Page",      href: "/servicos/website" },
  { icon: "⚡", name: "Automação",                    href: "/servicos/automacao" },
];

const packageItems = [
  { emoji: "🌱", name: "Starter",      desc: "Para quem está começando",       href: "/pacotes/starter",      color: "#FF6100" },
  { emoji: "🦓", name: "Zebra",        desc: "Para quem quer mais alcance",     href: "/pacotes/zebra",        color: "#00C2FF", popular: true },
  { emoji: "🚀", name: "Full",         desc: "Para quem quer o máximo",         href: "/pacotes/full",         color: "#AAFF00" },
  { emoji: "🎛️", name: "Personalizado", desc: "Do jeito que você precisa",      href: "/pacotes/personalizado", color: "#7B2FF7" },
];

// ─── Social Icons ─────────────────────────────────────────────────
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

// ─── Top Bar ──────────────────────────────────────────────────────
function TopBar({ visible }: { visible: boolean }) {
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] bg-[#1A1A1A] overflow-hidden"
      animate={{ height: visible ? TOP_BAR_H : 0, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="h-9 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Social icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com/zbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#FF6100] transition-colors"
            aria-label="Instagram"
          >
            <IconInstagram />
          </a>
          <a
            href="https://tiktok.com/@zbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#FF6100] transition-colors"
            aria-label="TikTok"
          >
            <IconTikTok />
          </a>
          <a
            href="https://youtube.com/@zbrand"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-[#FF6100] transition-colors"
            aria-label="YouTube"
          >
            <IconYouTube />
          </a>
        </div>

        {/* Contact info */}
        <div className="flex items-center gap-4">
          <a
            href="tel:+5511940502929"
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-[11px] font-medium tracking-wide"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            (11) 94050-2929
          </a>
          <span className="text-white/20 text-xs">|</span>
          <a
            href="mailto:contato@zbrand.com"
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-[11px] font-medium tracking-wide"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contato@zbrand.com
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Dropdown Menu ────────────────────────────────────────────────
function DropdownMenu({ children, open }: { children: React.ReactNode; open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-full left-0 mt-3 bg-white border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] overflow-hidden z-50"
          style={{ minWidth: 220 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Main Header ─────────────────────────────────────────────────
export function Header() {
  const [mobileOpen, setMobileOpen]     = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const [scrolled, setScrolled]         = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setTopBarVisible(y < 40);
      setScrolled(y > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <TopBar visible={topBarVisible} />

      <motion.header
        className="fixed z-50 transition-all duration-500"
        animate={
          scrolled
            ? { top: 12 }
            : { top: topBarVisible ? TOP_BAR_H : 0 }
        }
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={
          scrolled
            ? { left: "50%", translateX: "-50%", width: "min(92%, 780px)" }
            : { left: 0, right: 0, width: "100%" }
        }
      >
        <div
          className={`transition-all duration-500 ${
            scrolled
              ? "border-2 border-[#1A1A1A] rounded-2xl shadow-[4px_4px_0px_0px_#1A1A1A] bg-white"
              : "bg-white/95 backdrop-blur-md border-b border-[#1A1A1A]/10"
          }`}
        >
          <nav
            className={`mx-auto flex items-center justify-between transition-all duration-500 ${
              scrolled
                ? "px-4 sm:px-6 h-12"
                : "max-w-7xl px-4 sm:px-6 lg:px-8 h-14"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/logo-zbrand.png"
                alt="ZBRAND"
                width={120}
                height={36}
                className={`w-auto invert transition-all duration-500 ${scrolled ? "h-5" : "h-7"}`}
                priority
              />
            </Link>

            {/* ── Desktop Nav ── */}
            <div className="hidden lg:flex items-center gap-6">

              {/* Home */}
              <Link href="/" className="font-display text-[11px] font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors uppercase tracking-widest">
                Home
              </Link>

              {/* Sobre Nós */}
              <Link href="/sobre" className="font-display text-[11px] font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors uppercase tracking-widest">
                Sobre Nós
              </Link>

              {/* Serviços dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="font-display text-[11px] font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors flex items-center gap-1 uppercase tracking-widest">
                  Serviços
                  <motion.svg
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <DropdownMenu open={servicesOpen}>
                  <div className="p-1.5">
                    {serviceItems.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#FF6100]/8 transition-colors group"
                      >
                        <span className="text-base w-6 text-center">{s.icon}</span>
                        <span className="font-display font-bold text-[11px] text-[#1A1A1A] group-hover:text-[#FF6100] uppercase tracking-wide">
                          {s.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </DropdownMenu>
              </div>

              {/* Pacotes dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPackagesOpen(true)}
                onMouseLeave={() => setPackagesOpen(false)}
              >
                <button className="font-display text-[11px] font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors flex items-center gap-1 uppercase tracking-widest">
                  Pacotes
                  <motion.svg
                    animate={{ rotate: packagesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <DropdownMenu open={packagesOpen}>
                  <div className="p-1.5">
                    {packageItems.map((p) => (
                      <Link
                        key={p.href}
                        href={p.href}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#1A1A1A]/5 transition-colors group relative"
                      >
                        <span className="text-base w-6 text-center">{p.emoji}</span>
                        <div className="flex-1">
                          <span
                            className="font-display font-black text-[11px] uppercase tracking-wide block"
                            style={{ color: p.color }}
                          >
                            {p.name}
                          </span>
                          <span className="font-display text-[10px] text-[#1A1A1A]/40">
                            {p.desc}
                          </span>
                        </div>
                        {p.popular && (
                          <span className="text-[9px] font-black uppercase tracking-wide bg-[#00C2FF]/15 text-[#00C2FF] px-1.5 py-0.5 rounded-full border border-[#00C2FF]/30">
                            Popular
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </DropdownMenu>
              </div>

              {/* Contato */}
              <Link href="/contato" className="font-display text-[11px] font-bold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors uppercase tracking-widest">
                Contato
              </Link>

              {/* Área do Cliente */}
              <Link
                href="/area-do-cliente"
                className="font-display font-black text-[11px] py-2 px-4 rounded-xl border-2 border-[#1A1A1A] bg-[#FF6100] text-white uppercase tracking-widest transition-all duration-200 hover:-translate-y-px"
                style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
              >
                Área do Cliente
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menu"
            >
              <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-[#1A1A1A]" />
              <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}              className="block w-5 h-0.5 bg-[#1A1A1A]" />
              <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-0.5 bg-[#1A1A1A]" />
            </button>
          </nav>

          {/* ── Mobile Menu ── */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden overflow-hidden bg-white border-t border-[#1A1A1A]/10"
              >
                <div className="px-4 py-5 flex flex-col gap-1">

                  <Link href="/" onClick={() => setMobileOpen(false)} className="font-display font-bold text-sm text-[#1A1A1A] py-2.5 uppercase tracking-wide border-b border-[#1A1A1A]/8">
                    Home
                  </Link>

                  <Link href="/sobre" onClick={() => setMobileOpen(false)} className="font-display font-bold text-sm text-[#1A1A1A] py-2.5 uppercase tracking-wide border-b border-[#1A1A1A]/8">
                    Sobre Nós
                  </Link>

                  {/* Mobile Serviços Accordion */}
                  <div className="border-b border-[#1A1A1A]/8">
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className="w-full flex items-center justify-between font-display font-bold text-sm text-[#1A1A1A] py-2.5 uppercase tracking-wide"
                    >
                      Serviços
                      <motion.svg animate={{ rotate: mobileServicesOpen ? 180 : 0 }} className="w-4 h-4 text-[#1A1A1A]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-3 flex flex-col gap-1">
                            {serviceItems.map((s) => (
                              <Link key={s.href} href={s.href} onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2.5 py-2 text-[#1A1A1A]/70 hover:text-[#FF6100] transition-colors">
                                <span className="text-sm">{s.icon}</span>
                                <span className="font-display font-semibold text-xs uppercase tracking-wide">{s.name}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Mobile Pacotes Accordion */}
                  <div className="border-b border-[#1A1A1A]/8">
                    <button
                      onClick={() => setMobilePackagesOpen(!mobilePackagesOpen)}
                      className="w-full flex items-center justify-between font-display font-bold text-sm text-[#1A1A1A] py-2.5 uppercase tracking-wide"
                    >
                      Pacotes
                      <motion.svg animate={{ rotate: mobilePackagesOpen ? 180 : 0 }} className="w-4 h-4 text-[#1A1A1A]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {mobilePackagesOpen && (
                        <motion.div
                          initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-3 pl-3 flex flex-col gap-1">
                            {packageItems.map((p) => (
                              <Link key={p.href} href={p.href} onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2.5 py-2 transition-colors">
                                <span className="text-sm">{p.emoji}</span>
                                <span className="font-display font-black text-xs uppercase tracking-wide" style={{ color: p.color }}>{p.name}</span>
                                {p.popular && <span className="text-[9px] font-black bg-[#00C2FF]/15 text-[#00C2FF] px-1.5 py-0.5 rounded-full">Popular</span>}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link href="/contato" onClick={() => setMobileOpen(false)} className="font-display font-bold text-sm text-[#1A1A1A] py-2.5 uppercase tracking-wide border-b border-[#1A1A1A]/8">
                    Contato
                  </Link>

                  <Link
                    href="/area-do-cliente"
                    onClick={() => setMobileOpen(false)}
                    className="mt-3 font-display font-black text-sm py-3 px-4 rounded-xl border-2 border-[#1A1A1A] bg-[#FF6100] text-white uppercase tracking-widest text-center"
                    style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
                  >
                    Área do Cliente
                  </Link>

                  {/* Contato rápido no mobile */}
                  <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 flex flex-col gap-2">
                    <a href="tel:+5511940502929" className="flex items-center gap-2 text-xs text-[#1A1A1A]/50">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      (11) 94050-2929
                    </a>
                    <a href="mailto:contato@zbrand.com" className="flex items-center gap-2 text-xs text-[#1A1A1A]/50">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      contato@zbrand.com
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}
