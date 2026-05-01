"use client";

import { motion } from "framer-motion";
import { InfiniteGrid } from "@/components/ui/infinite-grid";

const PURPLE = "#7B2FF7";

const stats = [
  { value: "3", label: "serviços disponíveis" },
  { value: "Tempo real", label: "preço atualizado" },
  { value: "Contrato", label: "4 meses" },
  { value: "1 equipe", label: "tudo integrado" },
];

export function ZPersonalizadoHero() {
  return (
    <InfiniteGrid
      className="relative min-h-[88vh] flex items-center justify-center pt-[88px]"
      gridColor="rgba(0,0,0,0.06)"
      glowColor="rgba(123,47,247,0.10)"
    >
      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none"
        style={{ background: `${PURPLE}0C` }}
      />

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
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8 border"
            style={{ background: `${PURPLE}18`, borderColor: `${PURPLE}35` }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse-glow"
              style={{ background: PURPLE }}
            />
            <span
              className="font-display text-[11px] font-black uppercase tracking-widest"
              style={{ color: PURPLE }}
            >
              🎛️ PACOTE PERSONALIZADO — Só o que você precisa
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-display font-black text-hero-mobile lg:text-hero-desktop text-preto uppercase tracking-tight leading-[1.05] mb-6"
          >
            Monte o Pacote{" "}
            <span style={{ color: PURPLE }}>Perfeito</span>
            <br />
            Para o Seu <span className="text-[#1A1A1A]">Negócio.</span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="font-display text-base lg:text-lg text-cinza-dark max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Escolha os serviços que fazem sentido para o seu momento.{" "}
            <span className="text-preto font-semibold">
              Veja o preço se compor em tempo real.
            </span>{" "}
            Sem pacote inflado, sem serviço sobrando.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-14"
          >
            <motion.a
              href="#configurador"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 font-display font-black text-sm uppercase tracking-widest px-8 py-3.5 border-2 border-preto rounded-brutal text-white transition-all"
              style={{ backgroundColor: PURPLE, boxShadow: "4px 4px 0px 0px #1A1A1A" }}
            >
              MONTAR MEU PACOTE
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="border-2 border-preto rounded-brutal-lg overflow-hidden shadow-brutal"
          >
            <div className="grid grid-cols-2 sm:grid-cols-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center px-6 py-4 bg-white
                    ${i % 2 === 0 ? "border-r-2 border-preto" : ""}
                    ${i < 2 ? "border-b-2 sm:border-b-0 border-preto" : ""}
                    ${i === 1 ? "sm:border-r-2 sm:border-preto" : ""}
                    ${i === 2 ? "sm:border-r-2 sm:border-preto" : ""}
                  `}
                >
                  <span
                    className="font-display font-black text-lg leading-none"
                    style={{ color: PURPLE }}
                  >
                    {s.value}
                  </span>
                  <span className="font-display text-[10px] font-semibold text-cinza-text uppercase tracking-wider mt-0.5">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </InfiniteGrid>
  );
}
