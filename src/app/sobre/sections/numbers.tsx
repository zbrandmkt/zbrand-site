"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ORANGE = "#FF6100";

const stats = [
  {
    value: "1.500",
    arrow: "→",
    value2: "10.000",
    label: "seguidores orgânicos em 1 ano",
    note: "sem anúncio pago",
  },
  {
    value: "3.000",
    label: "inscritos no YouTube em 3 meses",
    note: "conteúdo sobre a marca própria",
  },
  {
    value: "R$ 7k",
    label: "em vendas do primeiro produto digital",
    note: "100% orgânico",
  },
];

export function SobreNumbers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: ORANGE }} className="py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#1A1A1A]/50 mb-4">
            O que a Churruts nos ensinou
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-[#1A1A1A] uppercase tracking-tight leading-tight">
            Não aprendemos{" "}
            <span className="underline decoration-[#1A1A1A]/30 underline-offset-4">em livro.</span>
          </h2>
          <p className="mt-4 font-display text-base text-[#1A1A1A]/70 max-w-md mx-auto leading-relaxed">
            Aprendemos fazendo. E os números provam.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-brutal-lg px-6 py-7 text-center"
              style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.25)" }}
            >
              <div className="font-display font-black text-3xl lg:text-4xl text-white leading-tight mb-1">
                {s.value}
                {s.arrow && (
                  <span className="text-[#FF6100]"> {s.arrow} </span>
                )}
                {s.value2 && (
                  <span style={{ color: ORANGE }}>{s.value2}</span>
                )}
              </div>
              <p className="font-display text-sm font-bold text-white/70 leading-snug mb-1">
                {s.label}
              </p>
              <span
                className="inline-block text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mt-1"
                style={{ background: `${ORANGE}25`, color: ORANGE }}
              >
                {s.note}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Texto de conexão */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.55 }}
          className="max-w-2xl mx-auto text-center"
        >
          <p className="font-display text-lg font-bold text-[#1A1A1A] leading-relaxed">
            &ldquo;Foi aqui que entendemos que conteúdo humanizado, de verdade, com bastidores
            e realidade, é o que conecta.{" "}
            <span className="font-black text-[#1A1A1A]">
              Não é sobre produção perfeita. É sobre ser real.
            </span>&rdquo;
          </p>
          <p className="mt-4 text-sm font-bold text-[#1A1A1A]/60">
            — Bruna e Gui, fundadores da ZBRAND
          </p>
        </motion.div>
      </div>
    </section>
  );
}
