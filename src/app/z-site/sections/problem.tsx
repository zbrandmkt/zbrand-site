"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PINK = "#FF3D9A";

const problems = [
  {
    emoji: "🔍",
    title: "Invisível no Google",
    text: "Quando o cliente pesquisa 'negócio perto de mim', você não aparece. Seu concorrente aparece. O cliente vai pra lá.",
  },
  {
    emoji: "📱",
    title: "Link na Bio Que Distrai",
    text: "Você manda o cliente pro Instagram. Ele vê story, rola o feed, abre outro perfil — e esquece de fazer o pedido.",
  },
  {
    emoji: "💸",
    title: "Dependente de Marketplace",
    text: "Plataformas de terceiros cobram comissões altas e controlam a experiência. Com site próprio, o lucro e o cliente são seus.",
  },
  {
    emoji: "📋",
    title: "Informações Desatualizadas em Todo Lugar",
    text: "Preço mudou? Serviço novo? Você atualiza no WhatsApp, no Instagram, no Google… são 4 lugares. Com site, é um só.",
  },
  {
    emoji: "📅",
    title: "Seus Serviços Sem Vitrine",
    text: "Você faz um trabalho incrível, mas sem uma página com fotos, depoimentos e formulário, o cliente não te encontra — e fecha com quem tem.",
  },
  {
    emoji: "🔄",
    title: "Dependente do Algoritmo",
    text: "Hoje o Instagram entrega seu conteúdo. Amanhã muda o algoritmo. Com site, o tráfego do Google é seu — e não some.",
  },
];

export function ZSiteProblem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative">
      {/* White → dark transition */}
      <div
        className="h-16 lg:h-20"
        style={{ background: "linear-gradient(to bottom, #FFFFFF, #1A1A1A)" }}
      />

      <div className="relative bg-preto overflow-hidden">
        {/* Lamp effect — pink */}
        <div className="relative w-full overflow-hidden" style={{ height: "220px" }}>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="absolute top-0 left-0 w-1/2"
            style={{
              height: "220px",
              background: `linear-gradient(to bottom, ${PINK}cc 0%, ${PINK}1f 60%, transparent 100%)`,
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
              background: `linear-gradient(to bottom, ${PINK}cc 0%, ${PINK}1f 60%, transparent 100%)`,
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
              background: `radial-gradient(ellipse at 50% 0%, ${PINK}80 0%, ${PINK}2e 40%, transparent 75%)`,
            }}
          />
          <motion.div
            initial={{ width: "8rem", opacity: 0 }}
            whileInView={{ width: "36rem", opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              height: "2px",
              background: `linear-gradient(to right, transparent, ${PINK}, #FFFFFF, ${PINK}, transparent)`,
              boxShadow: `0 0 10px 3px ${PINK}, 0 0 30px 8px ${PINK}99, 0 0 70px 20px ${PINK}40`,
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
            <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: PINK }}>
              Você enfrenta isso?
            </p>
            <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
              Por que seu negócio{" "}
              <span style={{ color: PINK }}>precisa de um site</span>
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
                className="flex items-start gap-3 rounded-2xl px-5 py-4 border transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: `${PINK}20`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-base"
                  style={{ background: `${PINK}18`, border: `1.5px solid ${PINK}35` }}
                >
                  {p.emoji}
                </div>
                <div>
                  <p className="font-display font-black text-xs uppercase tracking-tight mb-1" style={{ color: PINK }}>
                    {p.title}
                  </p>
                  <p className="font-display text-sm font-medium text-white/70 leading-snug">
                    {p.text}
                  </p>
                </div>
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
              &ldquo;Se você se identificou com mais de um, a gente sabe exatamente como resolver.
              A gente constrói sites que trabalham por você — 24h por dia, sem algoritmo.&rdquo;
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
