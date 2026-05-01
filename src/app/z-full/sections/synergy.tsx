"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LIME = "#AAFF00";

const nodes = [
  {
    icon: "🎬",
    label: "Social",
    title: "Atrai",
    desc: "Conteúdo profissional nas 3 redes cria autoridade, seguidores orgânicos e prova social. O cliente te conhece antes de comprar.",
    color: "#FF6100",
    accent: "#FF6100",
  },
  {
    icon: "🎯",
    label: "Ads",
    title: "Converte",
    desc: "Meta + Google levam clientes prontos para comprar direto para o pedido. O anúncio certo chega para a pessoa certa na hora certa.",
    color: "#00C2FF",
    accent: "#00C2FF",
  },
  {
    icon: "🤖",
    label: "Bot",
    title: "Fideliza",
    desc: "O WhatsApp captura o pedido, confirma, reenvia promoção semanas depois. O cliente volta sozinho — sem você fazer nada.",
    color: LIME,
    accent: LIME,
  },
];

export function ZFullSynergy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-[#1A1A1A] py-20 lg:py-28 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] rounded-full blur-[140px] pointer-events-none"
        style={{ background: `${LIME}10` }}
      />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: LIME }}
          >
            O sistema completo
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            O Ciclo que{" "}
            <span style={{ color: LIME }}>não para</span>
          </h2>
          <p className="mt-4 font-display text-base text-white/50 max-w-lg mx-auto leading-relaxed">
            Cada serviço alimenta o próximo. Resultado maior que a soma das partes.
          </p>
        </motion.div>

        {/* Flywheel nodes */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 lg:gap-0">
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-center flex-1">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 w-full lg:w-auto border-2 rounded-brutal-lg p-6 flex flex-col gap-4 relative"
                style={{ borderColor: `${node.color}40`, boxShadow: `4px 4px 0px 0px ${node.color}50` }}
              >
                {/* Step badge */}
                <div
                  className="absolute -top-3 -left-3 w-7 h-7 rounded-full border-2 border-preto flex items-center justify-center font-display font-black text-xs"
                  style={{ background: node.color, color: "#1A1A1A" }}
                >
                  {i + 1}
                </div>

                {/* Icon + label */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl"
                    style={{ borderColor: `${node.color}40`, background: `${node.color}18` }}
                  >
                    {node.icon}
                  </div>
                  <div>
                    <p
                      className="font-display text-[10px] font-black uppercase tracking-widest"
                      style={{ color: `${node.color}80` }}
                    >
                      {node.label}
                    </p>
                    <h3
                      className="font-display font-black text-2xl uppercase tracking-tight"
                      style={{ color: node.color }}
                    >
                      {node.title}
                    </h3>
                  </div>
                </div>

                <p className="font-display text-sm text-white/60 leading-relaxed">
                  {node.desc}
                </p>
              </motion.div>

              {/* Arrow between cards */}
              {i < nodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="flex items-center justify-center lg:px-3 my-2 lg:my-0 shrink-0"
                >
                  {/* Down arrow on mobile */}
                  <svg
                    className="w-6 h-6 lg:hidden"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: `${LIME}50` }}
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  {/* Right arrow on desktop */}
                  <svg
                    className="w-6 h-6 hidden lg:block"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: `${LIME}50` }}
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Cycle back arrow — desktop only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="hidden lg:flex items-center justify-center mt-4"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{ borderColor: `${LIME}30`, background: `${LIME}08` }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: `${LIME}60` }} strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span className="font-display text-xs font-bold uppercase tracking-widest" style={{ color: `${LIME}60` }}>
              E o ciclo recomeça — cliente fidelizado volta para as redes e fortalece os ads
            </span>
          </div>
        </motion.div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 border-2 rounded-brutal-lg p-6 flex flex-col sm:flex-row items-center gap-4"
          style={{ borderColor: `${LIME}30`, background: `${LIME}08` }}
        >
          <div
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl shrink-0"
            style={{ borderColor: `${LIME}40`, background: `${LIME}18` }}
          >
            🦓
          </div>
          <div>
            <p className="font-display font-black text-sm text-white uppercase tracking-tight mb-1">
              Sistema, não serviços.
            </p>
            <p className="font-display text-sm text-white/50 leading-relaxed">
              No Pacote Full, social, ads e bot são gerenciados por uma equipe com uma estratégia.
              Quando a campanha sobe, o bot já está configurado para o pico. Quando o bot capta um lead, o social está ativo para convertê-lo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
