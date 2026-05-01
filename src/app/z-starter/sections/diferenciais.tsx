"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ORANGE = "#FF6100";

const diffs = [
  {
    icon: "🦓",
    color: ORANGE,
    title: "Tudo em Um Lugar",
    desc: "Uma equipe, uma estratégia, um relatório. Você para de coordenar fornecedor e começa a ver resultado de verdade.",
  },
  {
    icon: "🎥",
    color: "#FBBC05",
    title: "Conteúdo Que Vira Anúncio",
    desc: "Filmamos o seu negócio uma vez. O mesmo material vai para o feed e para as campanhas — sem custo extra, sem gravação duplicada.",
  },
  {
    icon: "📊",
    color: "#00C2FF",
    title: "Dashboard Integrado",
    desc: "Você vê social e tráfego no mesmo painel. Resultado transparente, sem achismo. Sabe exatamente o que está funcionando.",
  },
  {
    icon: "🎯",
    color: "#AAFF00",
    title: "Estratégia Coerente",
    desc: "Campanha e perfil falam a mesma linguagem. Mesma promoção, mesmo visual, mesmo público-alvo. Mais impacto com menos esforço.",
  },
  {
    icon: "🤝",
    color: "#7B2FF7",
    title: "Uma Equipe, Responsabilidade Única",
    desc: "Se o resultado não aparece, nós otimizamos. Não tem 'cada um no seu'. Somos responsáveis pelo todo.",
  },
];

function Card({ d, delay, inView }: { d: typeof diffs[0]; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-preto rounded-brutal-lg p-6 flex flex-col gap-4"
      style={{ boxShadow: `5px 5px 0px 0px ${d.color}` }}
    >
      <div
        className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shrink-0"
        style={{ borderColor: d.color, background: `${d.color}15` }}
      >
        {d.icon}
      </div>
      <div>
        <h3
          className="font-display font-black text-base uppercase tracking-tight mb-2"
          style={{ color: d.color }}
        >
          {d.title}
        </h3>
        <p className="font-display text-sm text-cinza-dark leading-relaxed">
          {d.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function ZStarterDiferenciais() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

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
            Por que o Pacote Starter
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            O que você ganha{" "}
            <span style={{ color: ORANGE }}>combinando</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-xl mx-auto leading-relaxed">
            Não é só economizar R$300/mês. É ter uma estratégia que funciona como sistema.
          </p>
        </motion.div>

        {/* Cards — row 1: 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {diffs.slice(0, 3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.1 + i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Cards — row 2: 2 centralizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:w-2/3 lg:mx-auto">
          {diffs.slice(3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.4 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
