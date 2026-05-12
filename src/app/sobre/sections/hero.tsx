"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: "10 anos", label: "de empreendedorismo" },
  { value: "0 → 10k", label: "seguidores orgânicos" },
  { value: "R$ 7k", label: "primeiro produto digital" },
  { value: "1 bebê", label: "o Zeca que mudou tudo" },
];

export function SobreHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-[#1A1A1A] overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      {/* Zebra texture bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url('/images/zebra-texture-black.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px 280px",
        }}
      />

      {/* Glow laranja sutil */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, #FF6100 0%, transparent 70%)",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-[#FF6100]/40 text-[10px] font-black uppercase tracking-[0.25em]"
            style={{ color: "#FF6100", background: "#FF610015" }}
          >
            🦓 Nossa história
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[1.05] text-center mb-6"
        >
          Antes de ser agência,{" "}
          <span style={{ color: "#FF6100" }}>a gente era</span>{" "}
          <span className="text-white">o cliente.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.22, duration: 0.55 }}
          className="font-display text-base text-white/55 text-center max-w-2xl mx-auto leading-relaxed mb-14"
        >
          Dois empreendedores que aprenderam marketing do jeito difícil —
          na prática, no erro, no dia a dia de um negócio real. Isso é o que nos
          faz diferentes.
        </motion.p>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.55 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.07, duration: 0.45 }}
              className="border-2 border-white/10 rounded-brutal-lg px-4 py-5 text-center flex flex-col gap-1"
              style={{ background: "#FF610010" }}
            >
              <span className="font-display font-black text-xl text-white leading-none" style={{ color: "#FF6100" }}>
                {s.value}
              </span>
              <span className="text-[10px] text-white/45 font-medium leading-snug">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.85 }}
          className="flex justify-center mt-14"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-[10px] font-bold text-white/25 uppercase tracking-[0.2em]">A história</span>
            <svg className="w-5 h-5 text-white/25" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
