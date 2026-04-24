"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const plans = [
  {
    name: "Z-SOCIAL",
    subtitle: "1 Rede",
    price: "1.500",
    color: "#FF6100",
    popular: false,
    networks: "Instagram, TikTok ou LinkedIn",
    features: [
      "Gestão de 1 rede social",
      "15 posts/mês",
      "Stories diários",
      "Captação in loco (1 dia/mês)",
      "Edição profissional",
      "Calendário mensal",
      "Análise de métricas",
      "Relatório mensal",
      "Reunião mensal de alinhamento",
    ],
    cta: "Quero Começar",
  },
  {
    name: "Z-SOCIAL",
    subtitle: "2 Redes",
    price: "2.000",
    color: "#7B2FF7",
    popular: true,
    networks: "Instagram + TikTok",
    features: [
      "Gestão de 2 redes sociais",
      "15 posts/mês por rede",
      "Stories diários",
      "Captação in loco (1 dia/mês)",
      "Edição profissional",
      "Calendário mensal",
      "Análise de métricas",
      "Relatório mensal",
      "Reunião mensal de alinhamento",
    ],
    cta: "Quero Começar",
  },
  {
    name: "Z-SOCIAL",
    subtitle: "3 Redes",
    price: "3.000",
    color: "#00C2FF",
    popular: false,
    networks: "Instagram + TikTok + LinkedIn",
    features: [
      "Gestão de 3 redes sociais",
      "30 posts/mês no total",
      "Stories diários",
      "Captação in loco (1 dia/mês)",
      "Edição profissional",
      "Calendário mensal",
      "Análise de métricas",
      "Relatório mensal",
      "Reunião mensal de alinhamento",
    ],
    cta: "Quero Começar",
  },
];

export function ZSocialPricing() {
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
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-laranja mb-4">
            Investimento
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Escolha o plano{" "}
            <span className="text-laranja">certo pra você</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-lg mx-auto leading-relaxed">
            Todos os planos incluem captação in loco, edição profissional e relatório mensal.
            Contrato mínimo de 4 meses.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.subtitle}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col"
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-preto border-2 border-preto text-white font-black text-[10px] uppercase tracking-widest rounded-full"
                    style={{ boxShadow: `2px 2px 0px 0px ${plan.color}` }}>
                    ⭐ Mais popular
                  </span>
                </div>
              )}

              <div
                className={`bg-white border-2 border-preto rounded-brutal-lg p-6 flex flex-col flex-1 ${plan.popular ? "mt-4" : ""}`}
                style={{ boxShadow: `5px 5px 0px 0px ${plan.color}` }}
              >
                {/* Plan name + subtitle */}
                <div className="mb-5">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                    style={{ background: `${plan.color}15`, color: plan.color }}
                  >
                    {plan.name}
                  </div>
                  <h3 className="font-display font-black text-2xl text-preto uppercase tracking-tight">
                    {plan.subtitle}
                  </h3>
                  <p className="text-[11px] text-cinza-text font-medium mt-1">
                    {plan.networks}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b-2 border-preto/10">
                  <div className="flex items-end gap-1">
                    <span className="font-display text-sm font-bold text-cinza-text">R$</span>
                    <span className="font-display font-black text-5xl text-preto leading-none" style={{ color: plan.color }}>
                      {plan.price}
                    </span>
                    <span className="font-display text-sm font-bold text-cinza-text mb-1">/mês</span>
                  </div>
                  <div className="flex gap-3 mt-2">
                    <span className="text-[10px] font-bold text-cinza-text bg-cinza-light px-2 py-0.5 rounded-full">
                      Contrato 4 meses
                    </span>
                    <span className="text-[10px] font-bold text-cinza-text bg-cinza-light px-2 py-0.5 rounded-full">
                      Início em 15 dias
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${plan.color}18`, border: `1.5px solid ${plan.color}40` }}
                      >
                        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke={plan.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <span className="font-display text-sm text-cinza-dark leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.a
                  href={getWhatsAppLink("social")}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal text-white transition-all"
                  style={{
                    backgroundColor: plan.color,
                    boxShadow: `3px 3px 0px 0px ${plan.color}40`,
                  }}
                >
                  {plan.cta} →
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center font-display text-sm text-cinza-text mt-8"
        >
          Todos os planos com <span className="font-bold text-preto">implementação em 15 dias</span> •{" "}
          Cancelamento com aviso prévio de 30 dias
        </motion.p>
      </div>
    </section>
  );
}
