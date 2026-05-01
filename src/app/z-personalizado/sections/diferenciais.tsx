"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PURPLE = "#7B2FF7";
const ORANGE = "#FF6100";
const CYAN = "#00C2FF";
const LIME = "#AAFF00";

const diffs = [
  {
    icon: "🎛️",
    color: PURPLE,
    title: "Só o que você precisa",
    desc: "Nenhum serviço compulsório. Começa com um módulo, adiciona mais conforme o resultado aparecer. Sem bundle inflado.",
  },
  {
    icon: "💰",
    color: LIME,
    title: "Preço Justo",
    desc: "Você paga exatamente pelos serviços que vai usar. O preço é transparente — calculado em tempo real antes mesmo de falar com a gente.",
  },
  {
    icon: "🔄",
    color: CYAN,
    title: "Fácil de Ajustar",
    desc: "Quer adicionar ou tirar um serviço? Conversamos na renovação sem burocracia. O pacote evolui com o momento do negócio.",
  },
  {
    icon: "🦓",
    color: ORANGE,
    title: "Uma equipe, tudo integrado",
    desc: "Não importa o que você escolher: social, ads e bot são gerenciados com a mesma estratégia, o mesmo material e uma só voz.",
  },
];

interface CardProps {
  d: (typeof diffs)[0];
  delay: number;
  inView: boolean;
}

function Card({ d, delay, inView }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-preto rounded-brutal-lg p-6 flex flex-col gap-4"
      style={{ boxShadow: `5px 5px 0px 0px ${d.color}` }}
    >
      <div
        className="w-11 h-11 rounded-brutal flex items-center justify-center text-xl border-2 border-preto"
        style={{ background: `${d.color}20` }}
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
        <p className="font-display text-sm text-cinza-dark leading-relaxed">{d.desc}</p>
      </div>
    </motion.div>
  );
}

export function ZPersonalizadoDiferenciais() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-preto py-20 lg:py-28">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: PURPLE }}
          >
            Por que personalizar
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            Feito pro{" "}
            <span style={{ color: PURPLE }}>Seu Momento</span>
          </h2>
        </motion.div>

        {/* 2×2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {diffs.map((d, i) => (
            <Card key={d.title} d={d} delay={0.1 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
