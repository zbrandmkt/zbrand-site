"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const PINK = "#FF3D9A";

const landingFeatures = [
  "1 página de alta conversão",
  "Até 6 seções (hero, problema, serviço, processo, depoimentos, CTA)",
  "Formulário de captura + integração WhatsApp",
  "Mobile responsivo e rápido",
  "SEO básico (title, meta, OG tags, sitemap)",
  "Até 1 rodada de revisão",
  "Entrega em até 10 dias",
];

const fullFeatures = [
  "Home + até 6 páginas internas",
  "Blog / área de novidades",
  "Painel de edição (CMS — você edita sem programar)",
  "Formulários e integrações customizadas",
  "SEO técnico completo + Google Analytics",
  "Até 2 rodadas de revisão",
  "Entrega em até 21 dias",
];

const horasPlans = [
  { label: "Avulso", price: "R$ 100", per: "/hora", savings: null, desc: "Sem fidelidade" },
  { label: "Pack 5h", price: "R$ 400", per: "", savings: "1h grátis — 20% off", desc: "5 horas disponíveis" },
  { label: "Pack 10h", price: "R$ 750", per: "", savings: "2,5h grátis — 25% off", desc: "10 horas disponíveis" },
  { label: "Pack 20h", price: "R$ 1.400", per: "", savings: "6h grátis — 30% off", desc: "20 horas disponíveis" },
];

export function ZSitePricing() {
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
          <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: PINK }}>
            Investimento
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Escolha o que{" "}
            <span style={{ color: PINK }}>você precisa</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-lg mx-auto leading-relaxed">
            Comece com a landing page e escale para o site completo quando quiser. Sem fidelidade forçada.
          </p>
        </motion.div>

        {/* 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-12">

          {/* Card 1 — Landing Page */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 border-2 border-preto text-[#1A1A1A] font-black text-[10px] uppercase tracking-widest rounded-full"
                style={{ background: PINK, boxShadow: "2px 2px 0px 0px #1A1A1A" }}
              >
                ⚡ Mais rápido
              </span>
            </div>

            <div
              className="border-2 border-preto rounded-brutal-lg p-6 flex flex-col mt-4 h-full"
              style={{ background: PINK, boxShadow: "5px 5px 0px 0px #1A1A1A" }}
            >
              {/* Label */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 bg-black/10 text-[#1A1A1A]">
                  Z-SITE
                </div>
                <h3 className="font-display font-black text-2xl text-[#1A1A1A] uppercase tracking-tight">
                  Landing Page
                </h3>
                <p className="text-[11px] text-[#1A1A1A]/70 font-medium mt-1">
                  1 página que converte
                </p>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b-2 border-[#1A1A1A]/15">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-[#1A1A1A]/70">R$</span>
                  <span className="font-display font-black text-5xl text-[#1A1A1A] leading-none">1.500</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/60 bg-black/10 px-2 py-0.5 rounded-full">
                    Valor único
                  </span>
                  <span className="text-[10px] font-bold text-[#1A1A1A]/60 bg-black/10 px-2 py-0.5 rounded-full">
                    Entrega em 10 dias
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {landingFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-black/10">
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-display text-sm text-[#1A1A1A]/80 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={getWhatsAppLink("website")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal bg-[#1A1A1A] text-white transition-all"
                style={{ boxShadow: "3px 3px 0px 0px #1A1A1A80" }}
              >
                QUERO UMA LANDING PAGE →
              </motion.a>
            </div>
          </motion.div>

          {/* Card 2 — Site Completo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="bg-[#1A1A1A] border-2 border-preto rounded-brutal-lg p-6 flex flex-col mt-4 h-full"
              style={{ boxShadow: `5px 5px 0px 0px ${PINK}` }}
            >
              {/* Label */}
              <div className="mb-5">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                  style={{ background: `${PINK}18`, color: PINK }}
                >
                  Z-SITE
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Site Completo
                </h3>
                <p className="text-[11px] text-white/50 font-medium mt-1">
                  Home + páginas internas + CMS
                </p>
              </div>

              {/* Price */}
              <div className="mb-6 pb-6 border-b-2 border-white/10">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-white/50">A partir de R$</span>
                </div>
                <div className="flex items-end gap-1 mt-1">
                  <span className="font-display font-black text-5xl text-white leading-none" style={{ color: PINK }}>3.900</span>
                </div>
                <div className="flex gap-3 mt-2">
                  <span className="text-[10px] font-bold text-white/40 bg-white/8 px-2 py-0.5 rounded-full">
                    Valor único
                  </span>
                  <span className="text-[10px] font-bold text-white/40 bg-white/8 px-2 py-0.5 rounded-full">
                    Entrega em 21 dias
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {fullFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${PINK}18`, border: `1.5px solid ${PINK}40` }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={PINK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-display text-sm text-white/70 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={getWhatsAppLink("website")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal text-[#1A1A1A] transition-all"
                style={{ backgroundColor: PINK, boxShadow: `3px 3px 0px 0px ${PINK}40` }}
              >
                QUERO O SITE COMPLETO →
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Banco de Horas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rounded-brutal-lg border-2 border-preto overflow-hidden"
          style={{ boxShadow: `5px 5px 0px 0px ${PINK}` }}
        >
          {/* Header bar */}
          <div className="bg-preto px-6 py-4 flex items-center gap-3">
            <span className="text-xl">🕐</span>
            <div>
              <p className="font-display font-black text-sm text-white uppercase tracking-tight">
                Banco de Horas — Manutenção & Atualizações
              </p>
              <p className="text-[11px] text-white/50">
                Precisa mudar algo depois do lançamento? Compre horas com desconto e use quando quiser.
              </p>
            </div>
          </div>

          {/* Plans grid */}
          <div className="bg-white grid grid-cols-2 sm:grid-cols-4 divide-x-0 sm:divide-x-2 divide-y-2 sm:divide-y-0 divide-preto/10">
            {horasPlans.map((plan, i) => (
              <div key={i} className="flex flex-col items-center text-center px-5 py-5">
                <p className="font-display font-black text-xs uppercase tracking-widest text-preto/40 mb-2">
                  {plan.label}
                </p>
                <p className="font-display font-black text-2xl text-preto" style={{ color: PINK }}>
                  {plan.price}
                  {plan.per && <span className="text-sm font-bold text-cinza-text">{plan.per}</span>}
                </p>
                <p className="text-[10px] text-cinza-text mt-1">{plan.desc}</p>
                {plan.savings && (
                  <span
                    className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full border mt-2"
                    style={{ color: PINK, borderColor: `${PINK}30`, background: `${PINK}10` }}
                  >
                    {plan.savings}
                  </span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center font-display text-sm text-cinza-text mt-6"
        >
          Todos os projetos com <span className="font-bold text-preto">orçamento gratuito</span> •{" "}
          Pagamento em até 2x sem juros
        </motion.p>
      </div>
    </section>
  );
}
