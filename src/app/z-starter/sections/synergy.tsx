"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ORANGE = "#FF6100";

const nodes = [
  {
    icon: "🎬",
    title: "Conteúdo → vira Anúncio",
    desc: "O mesmo vídeo que gravamos vai para o feed E para as campanhas de ads. Nenhum custo dobrado, máximo de aproveitamento.",
    color: ORANGE,
  },
  {
    icon: "🎯",
    title: "Tráfego → traz Seguidores",
    desc: "O anúncio leva o cliente para um perfil ativo e profissional. Ele segue, confia, e a probabilidade de comprar aumenta.",
    color: "#FF8533",
  },
  {
    icon: "💬",
    title: "Engajamento → melhora o Anúncio",
    desc: "Perfil com prova social — curtidas, comentários, seguidores — reduz o custo por clique nos ads. Um alimenta o outro.",
    color: "#FFAA66",
  },
];

export function ZStarterSynergy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-[#1A1A1A] py-20 lg:py-28 overflow-hidden">
      {/* Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: `${ORANGE}18` }}
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
            style={{ color: ORANGE }}
          >
            A vantagem do combo
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            Como Social + Ads{" "}
            <span style={{ color: ORANGE }}>se complementam</span>
          </h2>
          <p className="mt-4 font-display text-base text-white/50 max-w-lg mx-auto leading-relaxed">
            Não são dois serviços separados. É um ciclo onde cada parte potencializa a outra.
          </p>
        </motion.div>

        {/* Nodes */}
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-4 lg:gap-0">
          {nodes.map((node, i) => (
            <div key={i} className="flex flex-col lg:flex-row items-center flex-1">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 w-full lg:w-auto border-2 border-white/10 rounded-brutal-lg p-6 flex flex-col gap-4 relative"
                style={{ boxShadow: `4px 4px 0px 0px ${node.color}40` }}
              >
                {/* Step number */}
                <div
                  className="absolute -top-3 -left-3 w-7 h-7 rounded-full border-2 border-preto flex items-center justify-center font-display font-black text-xs"
                  style={{ background: node.color, color: "#1A1A1A" }}
                >
                  {i + 1}
                </div>

                <div
                  className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl"
                  style={{ borderColor: `${node.color}40`, background: `${node.color}15` }}
                >
                  {node.icon}
                </div>

                <div>
                  <h3
                    className="font-display font-black text-base uppercase tracking-tight mb-2"
                    style={{ color: node.color }}
                  >
                    {node.title}
                  </h3>
                  <p className="font-display text-sm text-white/60 leading-relaxed">
                    {node.desc}
                  </p>
                </div>
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
                    style={{ color: `${ORANGE}60` }}
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
                    style={{ color: `${ORANGE}60` }}
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 border-2 rounded-brutal-lg p-6 flex flex-col sm:flex-row items-center gap-4"
          style={{ borderColor: `${ORANGE}40`, background: `${ORANGE}0D` }}
        >
          <div
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl shrink-0"
            style={{ borderColor: `${ORANGE}40`, background: `${ORANGE}20` }}
          >
            🦓
          </div>
          <div>
            <p className="font-display font-black text-sm text-white uppercase tracking-tight mb-1">
              Uma equipe. Uma estratégia. Um resultado.
            </p>
            <p className="font-display text-sm text-white/50 leading-relaxed">
              No Pacote Starter, social e ads são gerenciados pela mesma equipe com a mesma voz e o mesmo objetivo.
              Você não coordena fornecedor — você acompanha resultado.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
