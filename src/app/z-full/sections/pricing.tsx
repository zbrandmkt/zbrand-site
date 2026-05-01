"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const LIME = "#AAFF00";

const features = [
  "Gestão de 3 redes sociais (Instagram, Facebook, TikTok)",
  "30 posts/mês + stories diários",
  "Captação presencial 1 dia/mês (4–6h)",
  "Edição profissional dos criativos",
  "Meta Ads + Google Ads: até 4 campanhas ativas",
  "Automação WhatsApp (Bot + IA generativa + 3 disparos/mês)",
  "Relatório integrado semanal (social + ads + bot)",
  "Dashboard ZBRAND unificado",
  "Acompanhamento e otimização semanal",
  "Reunião mensal de alinhamento",
];

const replaces = [
  { label: "Z-SOCIAL 3 Redes", price: "R$ 3.000/mês" },
  { label: "Z-ADS (Meta + Google)", price: "R$ 2.400/mês" },
  { label: "Z-AUTOMAÇÃO Simples", price: "R$ 600/mês + R$ 2.000 impl." },
];

export function ZFullPricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="incluso" className="bg-white py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: LIME }}
          >
            Investimento
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            O Pacote{" "}
            <span style={{ color: LIME }}>Full</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-lg mx-auto leading-relaxed">
            O sistema completo. Social + Ads + Automação — uma mensalidade, um resultado integrado.
          </p>
        </motion.div>

        {/* Layout: card + side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Main card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 border-2 border-preto font-black text-[10px] uppercase tracking-widest rounded-full"
                style={{ background: LIME, color: "#1A1A1A", boxShadow: "2px 2px 0px 0px #1A1A1A" }}
              >
                🚀 Sistema Completo
              </span>
            </div>

            <div
              className="bg-[#1A1A1A] border-2 rounded-brutal-lg p-6 flex flex-col mt-4"
              style={{ borderColor: LIME, boxShadow: `5px 5px 0px 0px ${LIME}` }}
            >
              {/* Label */}
              <div className="mb-5">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                  style={{ background: `${LIME}20`, color: LIME }}
                >
                  PACOTE FULL
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Social + Ads + Automação
                </h3>
                <p className="text-[11px] text-white/40 font-medium mt-1">
                  3 redes · Meta+Google · Bot WhatsApp
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b-2 border-white/10">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-white/40">R$</span>
                  <span className="font-display font-black text-5xl leading-none" style={{ color: LIME }}>
                    7.000
                  </span>
                  <span className="font-display text-sm font-bold text-white/40 mb-1">/mês</span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] font-bold text-white/30 bg-white/10 px-2 py-0.5 rounded-full">
                    Contrato 4 meses
                  </span>
                  <span className="text-[10px] font-bold text-white/30 bg-white/10 px-2 py-0.5 rounded-full">
                    Sistema no ar em ~30 dias
                  </span>
                </div>
                {/* Verba note */}
                <div
                  className="mt-3 rounded-xl px-3 py-2"
                  style={{ background: `${LIME}12`, border: `1px solid ${LIME}25` }}
                >
                  <p className="text-[11px] font-bold leading-snug" style={{ color: LIME }}>
                    + Verba: R$ 1.000/mês Meta + R$ 500/mês Google
                  </p>
                  <p className="text-[10px] text-white/30 mt-0.5">
                    Pago direto às plataformas — não passa pela ZBRAND
                  </p>
                </div>
                {/* Automation note */}
                <div className="mt-2 bg-white/05 rounded-xl px-3 py-2">
                  <p className="text-[11px] font-bold text-white/50 leading-snug">
                    💡 Implementação da automação inclusa no pacote (valor de R$ 2.000)
                  </p>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${LIME}20`, border: `1.5px solid ${LIME}40` }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={LIME} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-display text-sm text-white/70 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={getWhatsAppLink("combo2")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal text-[#1A1A1A] transition-all"
                style={{ backgroundColor: LIME, boxShadow: `3px 3px 0px 0px ${LIME}60` }}
              >
                Quero o Pacote Full →
              </motion.a>
            </div>
          </motion.div>

          {/* Side column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* What it replaces */}
            <div className="bg-preto border-2 border-white/10 rounded-brutal-lg p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">
                O que esse pacote substitui
              </p>
              <div className="flex flex-col gap-3">
                {replaces.map((e) => (
                  <div key={e.label} className="flex items-start justify-between gap-4 py-3 border-b border-white/08 last:border-0">
                    <span className="font-display text-sm text-white/60 leading-snug flex-1">{e.label}</span>
                    <span className="font-display font-black text-sm text-white/50 shrink-0 text-right">{e.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-white/10">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-display text-sm text-white/50">Total separado</span>
                  <span className="font-display font-black text-sm line-through text-white/30">R$ 8.000+/mês</span>
                </div>
                <div className="flex items-start justify-between gap-2 mt-1">
                  <span className="font-display font-black text-sm" style={{ color: LIME }}>No Pacote Full</span>
                  <span className="font-display font-black text-sm" style={{ color: LIME }}>R$ 7.000/mês</span>
                </div>
                <p className="text-[11px] text-white/25 mt-2">+ implementação da automação inclusa no pacote</p>
              </div>
            </div>

            {/* Total investment */}
            <div className="bg-[#F5F5F0] border-2 border-preto/10 rounded-brutal-lg p-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-preto/40 mb-2">
                Investimento total estimado
              </p>
              <p className="font-display font-black text-2xl text-preto">
                ~R$ 8.500<span className="text-base font-bold text-cinza-text">/mês</span>
              </p>
              <p className="text-[11px] text-cinza-text mt-1 leading-relaxed">
                R$ 7.000 mensalidade + R$ 1.000 Meta + R$ 500 Google (verbas pagas direto às plataformas).
              </p>
            </div>

            {/* Compare with Starter */}
            <div
              className="border-2 rounded-brutal-lg p-5"
              style={{ borderColor: `${LIME}40`, background: `${LIME}08` }}
            >
              <p
                className="text-[11px] font-black uppercase tracking-widest mb-2"
                style={{ color: LIME }}
              >
                Começando pelo Starter?
              </p>
              <p className="font-display text-sm text-preto/70 leading-relaxed">
                Você pode começar com o Pacote Starter (R$ 3.000/mês) e migrar para o Full após os 4 meses iniciais.
                A equipe já conhece seu negócio — a transição é fluida.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center font-display text-sm text-cinza-text mt-8"
        >
          Contrato de <span className="font-bold text-preto">4 meses</span> •{" "}
          Cancelamento com aviso prévio de 30 dias
        </motion.p>
      </div>
    </section>
  );
}
