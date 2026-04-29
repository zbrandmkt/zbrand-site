"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: "📁",
    title: "Você envia o material",
    desc: "Manda o banco de imagens e vídeos que já tem do seu negócio. Não precisa de nada profissional para começar.",
    color: "#00C2FF",
  },
  {
    number: "02",
    icon: "🧠",
    title: "A gente estrutura as campanhas",
    desc: "Criamos a segmentação, definimos públicos, criativos e orçamento ideal para o Meta Ads do seu restaurante.",
    color: "#00C2FF",
  },
  {
    number: "03",
    icon: "🔁",
    title: "Otimizamos toda semana",
    desc: "Monitoramos os resultados e ajustamos público, criativo e horário semana a semana. Sem deixar dinheiro na mesa.",
    color: "#00C2FF",
  },
  {
    number: "04",
    icon: "📊",
    title: "Você recebe o relatório",
    desc: "Todo semana um relatório completo com ROAS, CAC, conversão e gastos. Você sabe exatamente onde está cada centavo.",
    color: "#FF6100",
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-5 items-start"
    >
      {/* Linha conectora vertical */}
      {index < steps.length - 1 && (
        <div
          className="absolute left-[22px] top-14 w-[2px] h-[calc(100%+28px)]"
          style={{
            background: "linear-gradient(to bottom, #00C2FF40, #00C2FF10)",
          }}
        />
      )}

      {/* Número / círculo */}
      <div
        className="shrink-0 w-11 h-11 rounded-full border-2 flex items-center justify-center font-black text-sm z-10"
        style={{
          borderColor: step.color,
          color: step.color,
          background: `${step.color}12`,
        }}
      >
        {step.number}
      </div>

      {/* Conteúdo */}
      <div
        className="flex-1 bg-[#111] border-2 border-white/06 rounded-2xl p-5 mb-7"
        style={{ borderLeftColor: step.color, borderLeftWidth: 3 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{step.icon}</span>
          <h3
            className="font-black text-sm uppercase tracking-tight"
            style={{ color: step.color }}
          >
            {step.title}
          </h3>
        </div>
        <p className="text-white/45 text-sm leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="como-funciona" className="bg-[#1A1A1A] py-20 px-5">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00C2FF] mb-3">
            Processo
          </p>
          <h2 className="font-black text-3xl sm:text-4xl text-white uppercase leading-tight">
            Como funciona
          </h2>
          <p className="text-white/35 text-sm mt-3 max-w-xs mx-auto">
            Simples, direto e sem enrolação. Em 4 passos seu restaurante começa a aparecer pra quem importa.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
