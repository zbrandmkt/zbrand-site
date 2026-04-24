"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const problems = [
  {
    text: "Tenho Instagram mas não consigo manter frequência",
    color: "#FF6100",
  },
  {
    text: "Não vejo crescimento de seguidores",
    color: "#FF6100",
  },
  {
    text: "Conteúdo genérico não conecta com meu público",
    color: "#FF6100",
  },
  {
    text: "Não tenho tempo para cuidar de social media",
    color: "#FF6100",
  },
  {
    text: "Agências que contratei não entregaram resultado",
    color: "#FF6100",
  },
  {
    text: "Não sei se social media está gerando clientes",
    color: "#FF6100",
  },
];

export function ZSocialProblem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative">
      {/* Transition */}
      <div
        className="h-16 lg:h-20"
        style={{ background: "linear-gradient(to bottom, #FFFFFF, #1A1A1A)" }}
      />

      <div className="relative bg-preto overflow-hidden">
        {/* Lamp effect */}
        <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 w-1/2"
            style={{
              height: "220px",
              background:
                "linear-gradient(to bottom, rgba(255,97,0,0.9) 0%, rgba(255,97,0,0.15) 60%, transparent 100%)",
              clipPath: "polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="absolute top-0 right-0 w-1/2"
            style={{
              height: "220px",
              background:
                "linear-gradient(to bottom, rgba(255,97,0,0.9) 0%, rgba(255,97,0,0.15) 60%, transparent 100%)",
              clipPath: "polygon(0% 0%, 0% 0%, 100% 100%, 100% 100%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scaleX: 0.3 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="absolute left-1/2 -translate-x-1/2 rounded-full blur-3xl"
            style={{
              top: "0px",
              width: "600px",
              height: "140px",
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,97,0,0.55) 0%, rgba(255,97,0,0.2) 40%, transparent 75%)",
            }}
          />
          <motion.div
            initial={{ width: "8rem", opacity: 0 }}
            whileInView={{ width: "36rem", opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              height: "2px",
              background:
                "linear-gradient(to right, transparent, #FF8C42, #FFFFFF, #FF8C42, transparent)",
              boxShadow:
                "0 0 10px 3px rgba(255,97,0,1), 0 0 30px 8px rgba(255,97,0,0.6), 0 0 70px 20px rgba(255,97,0,0.25)",
            }}
          />
        </div>

        {/* Content */}
        <div
          ref={ref}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 lg:pb-28 -mt-8 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-laranja mb-4">
              Você enfrenta isso?
            </p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
              Parece que a gente{" "}
              <span className="text-laranja">te conhece</span>
            </h2>
          </motion.div>

          {/* Problems grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-3 bg-white/04 border border-white/10 rounded-2xl px-5 py-4 hover:border-laranja/30 transition-colors"
              >
                {/* X icon */}
                <div className="w-8 h-8 rounded-full bg-laranja/15 border border-laranja/30 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-laranja" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="font-display text-sm font-medium text-white/80 leading-snug">
                  {p.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
            className="text-center"
          >
            <p className="font-display text-sm text-white/40 italic max-w-xl mx-auto leading-relaxed">
              &ldquo;Se você marcou mais de um, a gente sabe exatamente como resolver. Porque vivemos
              na pele os mesmos desafios que você enfrenta.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
