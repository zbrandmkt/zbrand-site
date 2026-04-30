"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const AMBER = "#FBBC05";

const featuresSimples = [
  "Chatbot com menus e respostas automáticas",
  "IA generativa para dúvidas fora do script",
  "Bot de qualificação e pré-atendimento",
  "Fluxo de boas-vindas personalizado",
  "Relatório mensal (mensagens, leads, conversão)",
  "Acompanhamento e otimização semanal",
  "Treinamento completo incluído",
];

const featuresComplexa = [
  "Tudo do plano Simples",
  "Integrações customizadas (site, CRM)",
  "Fluxos avançados com múltiplos produtos",
  "Campanhas segmentadas por perfil de cliente",
  "Integração com cardápio web próprio",
];

const exclusoes = [
  { label: "Disparos além de 3/mês", price: "R$ 50", freq: "/disparo" },
  { label: "Integrações fora dos parceiros", price: "A avaliar", freq: "" },
  { label: "Garantia de resultado", price: "—", freq: "" },
];

export function ZAutomaçaoPricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="planos" className="bg-white py-20 lg:py-28 overflow-hidden">
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
            style={{ color: AMBER }}
          >
            Investimento
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Escolha o plano{" "}
            <span style={{ color: AMBER }}>Z-AUTOMAÇÃO</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-lg mx-auto leading-relaxed">
            Dois planos para diferentes níveis de complexidade. Mensalidade idêntica —
            a diferença está na implementação.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-8">

          {/* Card 1: Simples */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 border-2 border-preto text-[#1A1A1A] font-black text-[10px] uppercase tracking-widest rounded-full"
                style={{ background: AMBER, boxShadow: `2px 2px 0px 0px #1A1A1A` }}
              >
                ⚡ Ideal para começar
              </span>
            </div>

            <div
              className="border-2 border-preto rounded-brutal-lg p-6 flex flex-col mt-4"
              style={{ background: AMBER, boxShadow: "5px 5px 0px 0px #1A1A1A" }}
            >
              {/* Label */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 bg-black/10 text-[#1A1A1A]">
                  Z-AUTOMAÇÃO SIMPLES
                </div>
                <h3 className="font-display font-black text-2xl text-[#1A1A1A] uppercase tracking-tight">
                  WhatsApp Automático
                </h3>
                <p className="text-[11px] text-[#1A1A1A]/60 font-medium mt-1">
                  Bot + IA · Sem integrações externas
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b-2 border-black/10">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-[#1A1A1A]/60">R$</span>
                  <span className="font-display font-black text-5xl leading-none text-[#1A1A1A]">
                    2.000
                  </span>
                  <span className="font-display text-sm font-bold text-[#1A1A1A]/60 mb-1">implementação</span>
                </div>
                <div className="flex items-center gap-1 mt-2">
                  <span className="font-display text-sm font-bold text-[#1A1A1A]/70">+</span>
                  <span className="font-display font-black text-xl text-[#1A1A1A]">R$ 600</span>
                  <span className="font-display text-sm font-bold text-[#1A1A1A]/60">/mês</span>
                </div>
                <div className="mt-2 bg-black/10 rounded-xl px-3 py-2">
                  <p className="text-[11px] font-bold text-[#1A1A1A]/70 leading-snug">
                    Mensalidade inclui: plataforma (R$297) + manutenção + até 3 disparos (mensagens em massa) por mês
                  </p>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/60 bg-black/10 px-2 py-0.5 rounded-full">
                    Implementação 15–20 dias
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {featuresSimples.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-black/15">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-display text-sm text-[#1A1A1A]/80 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={getWhatsAppLink("automacao")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal bg-preto text-white transition-all"
                style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.3)" }}
              >
                Quero Começar →
              </motion.a>
            </div>
          </motion.div>

          {/* Card 2: Complexa */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-preto border-2 border-preto text-white font-black text-[10px] uppercase tracking-widest rounded-full"
                style={{ boxShadow: `2px 2px 0px 0px ${AMBER}` }}
              >
                🚀 Para quem quer escalar
              </span>
            </div>

            <div
              className="bg-[#1A1A1A] border-2 rounded-brutal-lg p-6 flex flex-col mt-4"
              style={{ borderColor: AMBER, boxShadow: `5px 5px 0px 0px ${AMBER}` }}
            >
              {/* Label */}
              <div className="mb-5">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                  style={{ background: `${AMBER}20`, color: AMBER }}
                >
                  Z-AUTOMAÇÃO COMPLEXA
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  WhatsApp + Integrações
                </h3>
                <p className="text-[11px] text-white/40 font-medium mt-1">
                  Fluxos avançados · Site · CRM
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b-2 border-white/10">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-white/40">A partir de R$</span>
                  <span className="font-display font-black text-5xl leading-none" style={{ color: AMBER }}>
                    3.500
                  </span>
                </div>
                <p className="text-[10px] text-white/30 mt-1">implementação (definido após diagnóstico)</p>
                <div className="flex items-center gap-1 mt-2">
                  <span className="font-display text-sm font-bold text-white/50">+</span>
                  <span className="font-display font-black text-xl text-white">R$ 600</span>
                  <span className="font-display text-sm font-bold text-white/50">/mês</span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] font-bold text-white/30 bg-white/10 px-2 py-0.5 rounded-full">
                    Implementação ~30 dias
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {featuresComplexa.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${AMBER}20`, border: `1.5px solid ${AMBER}40` }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={AMBER} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-display text-sm text-white/70 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={getWhatsAppLink("automacao")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal text-[#1A1A1A] transition-all"
                style={{ backgroundColor: AMBER, boxShadow: `3px 3px 0px 0px ${AMBER}60` }}
              >
                Solicitar Diagnóstico →
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Box "Não está incluso" */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-preto border-2 border-white/10 rounded-brutal-lg p-6"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">
            Não está incluso em nenhum plano
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {exclusoes.map((e) => (
              <div key={e.label} className="flex flex-col gap-1 py-3 border-b sm:border-b-0 sm:border-r border-white/08 last:border-0 pr-4">
                <span className="font-display text-sm text-white/60 leading-snug">{e.label}</span>
                <div>
                  <span className="font-display font-black text-sm text-white/80">{e.price}</span>
                  {e.freq && (
                    <span className="font-display text-[10px] text-white/30 ml-1">{e.freq}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-white/20 mt-4 leading-relaxed">
            Esses itens podem ser adicionados conforme a necessidade do seu negócio.
          </p>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center font-display text-sm text-cinza-text mt-8"
        >
          Todos os planos com <span className="font-bold text-preto">contrato de 4 meses</span> •{" "}
          Cancelamento com aviso prévio de 30 dias
        </motion.p>
      </div>
    </section>
  );
}
