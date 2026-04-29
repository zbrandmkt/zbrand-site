"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  {
    icon: "📈",
    label: "ROAS",
    desc: "Retorno sobre cada real investido em anúncio",
    detail: "Retorno sobre investimento",
  },
  {
    icon: "💰",
    label: "CAC",
    desc: "Custo exato pra conquistar cada novo cliente",
    detail: "Custo de aquisição",
  },
  {
    icon: "🔁",
    label: "Conversão",
    desc: "Taxa de quem viu o anúncio e tomou uma ação",
    detail: "Taxa de conversão",
  },
  {
    icon: "📊",
    label: "Gastos",
    desc: "Controle total de quanto foi investido na semana",
    detail: "Controle de orçamento",
  },
];

export function Deliverables() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#FF6100] py-20 px-5 relative overflow-hidden">
      {/* Zebra texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "260px",
        }}
      />
      {/* Top-right glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/60 mb-3">
            Relatório semanal
          </p>
          <h2 className="font-black text-3xl sm:text-4xl text-white uppercase leading-tight mb-4">
            Você sabe exatamente onde está cada centavo
          </h2>
          <p className="text-white/75 text-sm leading-relaxed max-w-sm mx-auto">
            Toda semana um relatório completo. Sem jargão, sem enrolação.
            Só os números que importam para o seu negócio.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white/15 border border-white/20 backdrop-blur-sm rounded-2xl p-5"
              style={{ boxShadow: "3px 3px 0px rgba(0,0,0,0.2)" }}
            >
              <span className="text-2xl block mb-2">{metric.icon}</span>
              <p className="font-black text-white text-lg uppercase tracking-tight">
                {metric.label}
              </p>
              <p className="text-white/60 text-xs leading-snug mt-1">
                {metric.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-5 py-2.5">
            <span className="text-sm">📅</span>
            <span className="text-white font-black text-xs uppercase tracking-widest">
              Entregue toda semana, sem exceção
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
