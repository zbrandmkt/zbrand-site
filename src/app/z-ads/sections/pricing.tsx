"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const features = [
  "Diagnóstico e estratégia de campanhas",
  "Campanhas estruturadas por objetivo de negócio",
  "Captação presencial 1 dia/mês (4–6h)",
  "Edição profissional dos criativos",
  "Relatório semanal (retorno, custo por cliente, conversão, gastos)",
  "Acompanhamento e otimização semanal",
  "Reunião mensal de alinhamento",
];

const extras = [
  { label: "Landing page customizada", price: "R$ 1.500", freq: "único" },
  { label: "Segunda plataforma de anúncios", price: "+ R$ 600", freq: "/mês" },
  { label: "Campanhas extras (além das 4)", price: "+ R$ 300", freq: "/campanha" },
];

export function ZAdsPricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="planos" className="bg-white py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00C2FF] mb-4">
            Investimento
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            O plano{" "}
            <span className="text-[#00C2FF]">Z-ADS</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-lg mx-auto leading-relaxed">
            Um plano completo: estratégia, captação, edição e otimização contínua.
            Contrato mínimo de 4 meses.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

          {/* Card principal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Badge popular */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-preto border-2 border-preto text-white font-black text-[10px] uppercase tracking-widest rounded-full"
                style={{ boxShadow: "2px 2px 0px 0px #00C2FF" }}
              >
                ⚡ Plano completo
              </span>
            </div>

            <div
              className="bg-white border-2 border-preto rounded-brutal-lg p-6 flex flex-col mt-4"
              style={{ boxShadow: "5px 5px 0px 0px #00C2FF" }}
            >
              {/* Label */}
              <div className="mb-5">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                  style={{ background: "#00C2FF15", color: "#00C2FF" }}
                >
                  Z-ADS
                </div>
                <h3 className="font-display font-black text-2xl text-preto uppercase tracking-tight">
                  Gestão Completa
                </h3>
                <p className="text-[11px] text-cinza-text font-medium mt-1">
                  Meta Ads + Google Ads
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b-2 border-preto/10">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-cinza-text">R$</span>
                  <span className="font-display font-black text-5xl leading-none text-[#00C2FF]">
                    1.200
                  </span>
                  <span className="font-display text-sm font-bold text-cinza-text mb-1">/mês</span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] font-bold text-cinza-text bg-cinza-light px-2 py-0.5 rounded-full">
                    Contrato 4 meses
                  </span>
                  <span className="text-[10px] font-bold text-cinza-text bg-cinza-light px-2 py-0.5 rounded-full">
                    Início em 15 dias
                  </span>
                </div>
                {/* Verba note */}
                <div className="mt-3 bg-[#00C2FF]/8 border border-[#00C2FF]/20 rounded-xl px-3 py-2">
                  <p className="text-[11px] font-bold text-[#00C2FF] leading-snug">
                    + Verba de anúncios: R$ 1.000/mês
                  </p>
                  <p className="text-[10px] text-cinza-text mt-0.5">
                    Pago direto ao Meta/Google — não passa pela ZBRAND
                  </p>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "#00C2FF18", border: "1.5px solid #00C2FF40" }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#00C2FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-display text-sm text-cinza-dark leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={getWhatsAppLink("ads")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal text-white transition-all"
                style={{
                  backgroundColor: "#00C2FF",
                  boxShadow: "3px 3px 0px 0px #00C2FF40",
                }}
              >
                Quero Começar →
              </motion.a>
            </div>
          </motion.div>

          {/* Box "Não está incluso" */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Extras card */}
            <div className="bg-preto border-2 border-white/10 rounded-brutal-lg p-6">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-4">
                Não está incluso no plano
              </p>
              <div className="flex flex-col gap-3">
                {extras.map((e) => (
                  <div key={e.label} className="flex items-start justify-between gap-4 py-3 border-b border-white/08 last:border-0">
                    <span className="font-display text-sm text-white/60 leading-snug flex-1">{e.label}</span>
                    <div className="text-right shrink-0">
                      <span className="font-display font-black text-sm text-white/80">{e.price}</span>
                      <span className="font-display text-[10px] text-white/30 ml-1">{e.freq}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-white/25 mt-4 leading-relaxed">
                Esses itens podem ser adicionados ao plano conforme a necessidade do seu negócio.
              </p>
            </div>

            {/* Trust note */}
            <div className="bg-[#F5F5F0] border-2 border-preto/10 rounded-brutal-lg p-5">
              <p className="text-[11px] font-black uppercase tracking-widest text-preto/40 mb-2">
                Investimento total estimado
              </p>
              <p className="font-display font-black text-2xl text-preto">
                ~R$ 2.200<span className="text-base font-bold text-cinza-text">/mês</span>
              </p>
              <p className="text-[11px] text-cinza-text mt-1 leading-relaxed">
                R$ 1.200 de mensalidade + R$ 1.000 de verba de anúncios (pago direto à plataforma).
              </p>
            </div>

            {/* Upsell: Combos */}
            <div
              className="rounded-brutal-lg border-2 border-preto p-5"
              style={{ background: "#1A1A1A", boxShadow: "4px 4px 0px 0px #FF6100" }}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">
                Quer ainda mais resultado?
              </p>
              <p className="font-display font-black text-sm text-white uppercase mb-1">
                Combine com Social Media
              </p>
              <p className="text-[11px] text-white/50 mb-4 leading-snug">
                Social + Ads em uma equipe só. Mesma estratégia, um relatório, e você economiza.
              </p>

              <div className="flex flex-col gap-2">
                <a
                  href="/pacotes/starter"
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-brutal border-2 border-white/10 hover:border-[#FF6100]/60 transition-colors group"
                  style={{ background: "#FF610012" }}
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm">🌱</span>
                      <span className="font-display font-black text-xs text-white uppercase">Pacote Starter</span>
                    </div>
                    <p className="text-[10px] text-white/40">Social (1 rede) + Meta Ads</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm text-[#FF6100]">R$ 3.000</p>
                    <p className="text-[9px] text-white/30">/mês • economize R$ 300</p>
                  </div>
                </a>

                <a
                  href="/pacotes/full"
                  className="flex items-center justify-between gap-3 px-4 py-3 rounded-brutal border-2 border-white/10 hover:border-[#AAFF00]/60 transition-colors group"
                  style={{ background: "#AAFF0010" }}
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm">🚀</span>
                      <span className="font-display font-black text-xs text-white uppercase">Pacote Full</span>
                    </div>
                    <p className="text-[10px] text-white/40">3 redes + Meta + Google + Bot</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-black text-sm text-[#AAFF00]">R$ 7.000</p>
                    <p className="text-[9px] text-white/30">/mês • sistema completo</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Guarantee note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center font-display text-sm text-cinza-text mt-8"
        >
          Todos os planos com <span className="font-bold text-preto">início em até 15 dias</span> •{" "}
          Cancelamento com aviso prévio de 30 dias
        </motion.p>
      </div>
    </section>
  );
}
