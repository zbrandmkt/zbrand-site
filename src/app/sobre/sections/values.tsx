"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const values = [
  {
    emoji: "🤝",
    title: "Confiança",
    color: "#FF6100",
    desc: "Métricas reais, relatórios transparentes, nada de enrolar. Você sabe exatamente o que está acontecendo com o seu negócio — sempre.",
  },
  {
    emoji: "😮‍💨",
    title: "Alívio",
    color: "#00C2FF",
    desc: "Tiramos o peso do marketing das suas costas. Para você focar no que faz de melhor: o seu negócio.",
  },
  {
    emoji: "❤️",
    title: "Humanidade",
    color: "#AAFF00",
    desc: "Pessoas compram de pessoas. Conteúdo real, com rosto, bastidores e história. Nada de banco de imagem ou conteúdo genérico.",
  },
  {
    emoji: "⚡",
    title: "Inovação",
    color: "#7B2FF7",
    desc: "Automação, IA, novas ferramentas. Estamos sempre buscando como fazer mais resultado com menos esforço para o seu negócio.",
  },
];

export function SobreValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#1A1A1A] py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: "#FF6100" }}>
            Valores
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            O que guia{" "}
            <span style={{ color: "#FF6100" }}>cada decisão.</span>
          </h2>
          <p className="mt-4 font-display text-base text-white/45 max-w-md mx-auto leading-relaxed">
            Não são palavras na parede. São os princípios que colocamos em prática todo dia.
          </p>
        </motion.div>

        {/* Grid 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="border-2 border-white/10 rounded-brutal-lg p-6 flex flex-col gap-4"
              style={{ boxShadow: `4px 4px 0px 0px ${v.color}` }}
            >
              {/* Ícone + título */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-brutal border-2 border-white/10 flex items-center justify-center text-xl shrink-0"
                  style={{ background: `${v.color}18` }}
                >
                  {v.emoji}
                </div>
                <h3
                  className="font-display font-black text-xl uppercase tracking-tight"
                  style={{ color: v.color }}
                >
                  {v.title}
                </h3>
              </div>

              {/* Descrição */}
              <p className="font-display text-sm text-white/60 leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
