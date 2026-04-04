"use client";

import { motion } from "framer-motion";
import { TextRotate } from "@/components/ui/text-rotate";
import { InfiniteGrid } from "@/components/ui/infinite-grid";
import { getWhatsAppLink } from "@/lib/whatsapp";

const rotateColors = [
  "text-laranja",
  "text-[#0099CC]",
  "text-[#7B2FF7]",
  "text-[#E5006D]",
];

export function Hero() {
  return (
    <InfiniteGrid
      className="relative min-h-[90vh] flex items-center justify-center pt-14"
      gridColor="rgba(0,0,0,0.07)"
      glowColor="rgba(255,97,0,0.15)"
    >
      {/* Subtle gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-laranja/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
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
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-laranja-soft border border-laranja/20 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 bg-laranja rounded-full animate-pulse-glow" />
            <span className="font-display text-[11px] font-semibold text-laranja uppercase tracking-wider">
              Marketing digital para restaurantes
            </span>
          </motion.div>

          <h1 className="font-display text-hero-mobile lg:text-hero-desktop text-preto mb-6">
            <span className="block">Chega de</span>
            <span className="block">
              <TextRotate
                texts={["zebra", "amadorismo", "promessa vazia", "conteúdo genérico"]}
                colorClasses={rotateColors}
                className="font-extrabold"
                interval={2500}
              />
            </span>
            <span className="block">no seu marketing.</span>
          </h1>

          <p className="font-display text-base text-cinza-dark max-w-xl mx-auto mb-10 leading-relaxed">
            Marketing digital humanizado para restaurantes que querem{" "}
            <span className="text-preto font-semibold">clientes de verdade</span>, não só seguidores.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <motion.a
              href={getWhatsAppLink("geral")}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-sm"
            >
              QUERO FALAR COM A ZBRAND
            </motion.a>
            <motion.a
              href="#servicos"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary text-sm"
            >
              VER SERVIÇOS
            </motion.a>
          </div>
        </motion.div>
      </div>
    </InfiniteGrid>
  );
}
