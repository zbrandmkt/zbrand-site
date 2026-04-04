"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  { number: "01", title: "Descoberta", desc: "Conhecemos seu restaurante, público e objetivos.", icon: "🔍" },
  { number: "02", title: "Planejamento", desc: "Estratégia sob medida para o seu negócio.", icon: "📋" },
  { number: "03", title: "Captação", desc: "Vamos até você gravar conteúdo real.", icon: "🎬" },
  { number: "04", title: "Execução", desc: "Publicamos, gerenciamos e otimizamos tudo.", icon: "🚀" },
  { number: "05", title: "Otimização", desc: "Analisamos dados e ajustamos para crescer.", icon: "📈" },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-warm py-16 lg:py-24 zebra-stripes">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-section-title text-preto uppercase tracking-tight">
            Como a gente <span className="text-laranja">trabalha</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white border-2 border-laranja rounded-full shadow-soft mb-3">
                <span className="text-xl">{step.icon}</span>
              </div>
              <p className="font-display font-bold text-[10px] text-laranja uppercase tracking-widest mb-1">
                {step.number}
              </p>
              <h3 className="font-display font-bold text-sm text-preto mb-1">
                {step.title}
              </h3>
              <p className="font-display text-xs text-cinza-text leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
