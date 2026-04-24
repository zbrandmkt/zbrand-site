"use client";

import { motion } from "framer-motion";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { getWhatsAppLink } from "@/lib/whatsapp";

const stats = [
  { value: "15+", label: "posts/mês" },
  { value: "Stories", label: "diários" },
  { value: "4 meses", label: "de parceria" },
  { value: "In loco", label: "captação" },
];

export function ZSocialHero() {
  return (
    <InfiniteGrid
      className="relative min-h-[92vh] flex items-center justify-center pt-[88px]"
      gridColor="rgba(0,0,0,0.07)"
      glowColor="rgba(255,97,0,0.15)"
    >
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-laranja/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-laranja-soft border border-laranja/20 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 bg-laranja rounded-full animate-pulse-glow" />
            <span className="font-display text-[11px] font-black text-laranja uppercase tracking-widest">
              Z-SOCIAL — Gestão de Redes Sociais
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display font-black text-hero-mobile lg:text-hero-desktop text-preto uppercase tracking-tight leading-[1.05] mb-6"
          >
            Seu Restaurante{" "}
            <span className="text-laranja">Merecia</span>
            <br />
            Estar Cheio Todo Dia
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-display text-base lg:text-lg text-cinza-dark max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A gente <span className="text-preto font-semibold">filma, edita e publica</span> conteúdo que traz clientes reais.{" "}
            Enquanto você dorme, sua marca está trabalhando.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-14"
          >
            <motion.a
              href={getWhatsAppLink("social")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-sm"
            >
              QUERO MAIS CLIENTES
            </motion.a>
            <motion.a
              href="#planos"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-sm"
            >
              VER PLANOS E PREÇOS
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-px border-2 border-preto rounded-brutal-lg overflow-hidden shadow-brutal"
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col items-center px-6 py-3 bg-white ${
                  i < stats.length - 1 ? "border-r-2 border-preto" : ""
                }`}
              >
                <span className="font-display font-black text-lg text-laranja leading-none">
                  {s.value}
                </span>
                <span className="font-display text-[10px] font-semibold text-cinza-text uppercase tracking-wider mt-0.5">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </InfiniteGrid>
  );
}
