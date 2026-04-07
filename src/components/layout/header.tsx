"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { name: "Z-SOCIAL", href: "/servicos/social", desc: "Gestão de redes sociais" },
  { name: "Z-ADS", href: "/servicos/ads", desc: "Tráfego pago" },
  { name: "Z-AUTOMAÇÃO", href: "/servicos/automacao", desc: "Automação WhatsApp" },
  { name: "Z-COMBO 1", href: "/servicos/combo-1", desc: "Social + Ads" },
  { name: "Z-COMBO 2", href: "/servicos/combo-2", desc: "Social + Ads + Automação" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed z-50 transition-all duration-500"
      style={
        scrolled
          ? {
              top: 12,
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(90%, 720px)",
            }
          : {
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
            }
      }
    >
    <div
      className={`transition-all duration-500 ${
        scrolled
          ? "border-2 border-preto rounded-brutal-lg shadow-brutal bg-white"
          : "bg-white/90 backdrop-blur-md border-b border-cinza/30"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? "px-4 sm:px-5 h-12"
            : "max-w-7xl px-4 sm:px-6 lg:px-8 h-14"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-zbrand.png"
            alt="ZBRAND"
            width={120}
            height={36}
            className={`w-auto invert transition-all duration-500 ${scrolled ? "h-5" : "h-7"}`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-5">
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="font-display text-xs font-medium text-cinza-dark hover:text-preto transition-colors flex items-center gap-1 uppercase tracking-wide">
              Serviços
              <svg
                className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-56 bg-white border-2 border-preto rounded-brutal-lg shadow-brutal p-1.5"
                >
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-3 py-2 rounded-lg hover:bg-laranja-soft transition-colors group"
                    >
                      <span className="font-display font-semibold text-xs text-preto group-hover:text-laranja">
                        {s.name}
                      </span>
                      <span className="block text-[11px] text-cinza-text mt-0.5">
                        {s.desc}
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/sobre"
            className="font-display text-xs font-medium text-cinza-dark hover:text-preto transition-colors uppercase tracking-wide"
          >
            Sobre
          </Link>

          <Link
            href="/area-do-cliente"
            className="btn-brutal !py-1.5 !px-4 text-xs bg-laranja text-white border-preto"
          >
            ÁREA DO CLIENTE
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-preto"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-5 h-0.5 bg-preto"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-5 h-0.5 bg-preto"
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white border-t border-cinza/30"
          >
            <div className="px-4 py-6 flex flex-col gap-3">
              <p className="font-display font-bold text-[10px] text-cinza-text uppercase tracking-widest">
                Serviços
              </p>
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-sm font-medium text-preto hover:text-laranja pl-3 border-l-2 border-cinza hover:border-laranja transition-colors"
                >
                  {s.name}
                </Link>
              ))}

              <div className="h-px bg-cinza my-2" />

              <Link href="/sobre" onClick={() => setMobileOpen(false)} className="font-display text-sm font-medium text-preto">
                Sobre
              </Link>

              <Link
                href="/area-do-cliente"
                className="btn-brutal bg-laranja text-white border-preto text-sm text-center mt-2"
              >
                ÁREA DO CLIENTE
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </header>
  );
}
