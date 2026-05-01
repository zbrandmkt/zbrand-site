"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const ORANGE = "#FF6100";

const features = [
  "Gestão de 1 rede social (Instagram ou Facebook)",
  "15 posts/mês + stories diários",
  "Captação presencial 1 dia/mês (4–6h)",
  "Edição profissional dos criativos",
  "Meta Ads: até 4 campanhas ativas",
  "Relatório integrado semanal (social + ads)",
  "Dashboard ZBRAND",
  "Acompanhamento e otimização semanal",
  "Reunião mensal de alinhamento",
];

const notIncluded = [
  { label: "Segunda rede social", note: "ver Pacote Full" },
  { label: "Google Ads", note: "ver Pacote Full" },
  { label: "Automação WhatsApp", note: "ver Pacote Full" },
];

export function ZStarterPricing() {
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
            style={{ color: ORANGE }}
          >
            Investimento
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            O Pacote{" "}
            <span style={{ color: ORANGE }}>Starter</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-lg mx-auto leading-relaxed">
            Social Media + Meta Ads integrados. Uma mensalidade, resultado em dobro.
          </p>
        </motion.div>

        {/* Layout: card + side box */}
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
                style={{ background: ORANGE, color: "#1A1A1A", boxShadow: "2px 2px 0px 0px #1A1A1A" }}
              >
                🌱 Combo Social + Ads
              </span>
            </div>

            <div
              className="border-2 border-preto rounded-brutal-lg p-6 flex flex-col mt-4"
              style={{ background: ORANGE, boxShadow: "5px 5px 0px 0px #1A1A1A" }}
            >
              {/* Label */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 bg-black/10 text-[#1A1A1A]">
                  PACOTE STARTER
                </div>
                <h3 className="font-display font-black text-2xl text-[#1A1A1A] uppercase tracking-tight">
                  Social + Tráfego Pago
                </h3>
                <p className="text-[11px] text-[#1A1A1A]/60 font-medium mt-1">
                  1 rede social · Meta Ads · Captação mensal
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b-2 border-black/10">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-[#1A1A1A]/60">R$</span>
                  <span className="font-display font-black text-5xl leading-none text-[#1A1A1A]">
                    3.000
                  </span>
                  <span className="font-display text-sm font-bold text-[#1A1A1A]/60 mb-1">/mês</span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/60 bg-black/10 px-2 py-0.5 rounded-full">
                    Contrato 4 meses
                  </span>
                  <span className="text-[10px] font-bold text-[#1A1A1A]/60 bg-black/10 px-2 py-0.5 rounded-full">
                    Início em ~15 dias
                  </span>
                </div>
                {/* Verba note */}
                <div className="mt-3 bg-black/10 rounded-xl px-3 py-2">
                  <p className="text-[11px] font-bold text-[#1A1A1A]/70 leading-snug">
                    + Verba de anúncios: R$ 1.000/mês (pago direto ao Meta — não passa pela ZBRAND)
                  </p>
                </div>
                {/* Savings callout */}
                <div className="mt-2 bg-black/10 rounded-xl px-3 py-2">
                  <p className="text-[11px] font-bold text-[#1A1A1A]/70 leading-snug">
                    💡 Contratados separado: R$ 3.300/mês + verba. No combo: R$ 3.000/mês.
                  </p>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {features.map((f) => (
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
                href={getWhatsAppLink("combo1")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal bg-preto text-white transition-all"
                style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.3)" }}
              >
                Quero o Pacote Starter →
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
            {/* Not included */}
            <div className="bg-preto border-2 border-white/10 rounded-brutal-lg p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">
                Não está incluso no Starter
              </p>
              <div className="flex flex-col gap-3">
                {notIncluded.map((e) => (
                  <div key={e.label} className="flex items-start justify-between gap-4 py-3 border-b border-white/08 last:border-0">
                    <span className="font-display text-sm text-white/60 leading-snug flex-1">{e.label}</span>
                    <span className="font-display text-[10px] text-white/30 shrink-0 mt-0.5">{e.note}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-white/25 mt-4 leading-relaxed">
                Quer mais redes, Google Ads ou automação de WhatsApp? Confira o Pacote Full.
              </p>
            </div>

            {/* Total investment */}
            <div className="bg-[#F5F5F0] border-2 border-preto/10 rounded-brutal-lg p-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-preto/40 mb-2">
                Investimento total estimado
              </p>
              <p className="font-display font-black text-2xl text-preto">
                ~R$ 4.000<span className="text-base font-bold text-cinza-text">/mês</span>
              </p>
              <p className="text-[11px] text-cinza-text mt-1 leading-relaxed">
                R$ 3.000 de mensalidade + R$ 1.000 de verba de anúncios (pago direto ao Meta).
              </p>
            </div>

            {/* Compare note */}
            <div
              className="border-2 rounded-brutal-lg p-5"
              style={{ borderColor: `${ORANGE}40`, background: `${ORANGE}08` }}
            >
              <p
                className="text-[11px] font-black uppercase tracking-widest mb-2"
                style={{ color: ORANGE }}
              >
                Por que o combo vale mais
              </p>
              <ul className="flex flex-col gap-1.5">
                <li className="font-display text-sm text-preto/70 leading-snug">
                  ✓ Z-SOCIAL 1 Rede separado: R$ 1.500/mês
                </li>
                <li className="font-display text-sm text-preto/70 leading-snug">
                  ✓ Z-ADS separado: R$ 1.800/mês
                </li>
                <li className="font-display font-black text-sm leading-snug" style={{ color: ORANGE }}>
                  → No combo: R$ 3.000/mês (economia de R$ 300)
                </li>
              </ul>
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
