"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LIME = "#AAFF00";

const problems = [
  {
    text: "Sem conteúdo, sem presença — o Instagram fica parado e o concorrente não",
  },
  {
    text: "Stock photo e vídeo sem rosto: o cliente não vê o seu negócio e não compra",
  },
  {
    text: "Você gere o restaurante, atende cliente, gerencia equipe — não sobra tempo para gravar e editar",
  },
  {
    text: "Vídeo tremido, luz ruim, áudio da cozinha — às vezes é pior postar do que não postar",
  },
  {
    text: "Você grava num fim de semana e o material acaba em 2 semanas — sem constância, o algoritmo te pune",
  },
  {
    text: "Produtora cobrou R$ 3k por 4 vídeos — com a ZBRAND são 10 vídeos editados a partir de R$ 800",
  },
];

export function ZCaptacaoProblem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative">
      {/* Transition white → dark */}
      <div
        className="h-16 lg:h-20"
        style={{ background: "linear-gradient(to bottom, #FFFFFF, #1A1A1A)" }}
      />

      <div className="relative bg-preto overflow-hidden">
        {/* Lamp effect — lime */}
        <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 w-1/2"
            style={{
              height: "220px",
              background: `linear-gradient(to bottom, ${LIME}CC 0%, ${LIME}1F 60%, transparent 100%)`,
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
              background: `linear-gradient(to bottom, ${LIME}CC 0%, ${LIME}1F 60%, transparent 100%)`,
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
              background: `radial-gradient(ellipse at 50% 0%, ${LIME}80 0%, ${LIME}2E 40%, transparent 75%)`,
            }}
          />
          <motion.div
            initial={{ width: "8rem", opacity: 0 }}
            whileInView={{ width: "36rem", opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              height: "2px",
              background: `linear-gradient(to right, transparent, ${LIME}, #FFFFFF, ${LIME}, transparent)`,
              boxShadow: `0 0 10px 3px ${LIME}, 0 0 30px 8px ${LIME}99, 0 0 70px 20px ${LIME}40`,
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
            <p
              className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
              style={{ color: LIME }}
            >
              Você enfrenta isso?
            </p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
              Parece que a gente{" "}
              <span style={{ color: LIME }}>te conhece</span>
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
                className="flex items-center gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 transition-colors"
                style={{ ["--hover-border" as string]: `${LIME}4D` }}
              >
                {/* X icon */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: `${LIME}26`, border: `1px solid ${LIME}4D` }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke={LIME}
                  >
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
              &ldquo;Se você se identificou com mais de um, a gente sabe exatamente o que fazer.
              Somos especialistas em conteúdo para gastronomia — porque fomos donos de restaurante.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
