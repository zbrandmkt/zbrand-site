"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const entregaveis = [
  "Estrutura completa de campanhas Meta Ads",
  "Segmentação de público e definição de orçamento",
  "Otimização semanal (público, criativo, horário)",
  "Relatório semanal: ROAS, CAC, conversão e gastos",
];

export function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#111] py-20 px-5">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#00C2FF] mb-3">
            Investimento
          </p>
          <h2 className="font-black text-3xl sm:text-4xl text-white uppercase leading-tight mb-3">
            A oferta
          </h2>
          <p className="text-white/35 text-sm max-w-xs mx-auto">
            Preço de entrada para quem quer escalar com inteligência, não com achismo.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card principal — R$800 */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#1A1A1A] border-2 border-[#00C2FF] rounded-2xl p-7 flex flex-col"
            style={{ boxShadow: "6px 6px 0px #00C2FF30" }}
          >
            {/* Badge popular */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div
                className="flex items-center gap-1.5 bg-[#00C2FF] border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-[10px] uppercase tracking-[0.18em] px-4 py-1 rounded-full"
                style={{ boxShadow: "2px 2px 0px #1A1A1A" }}
              >
                ⚡ Oferta de entrada
              </div>
            </div>

            {/* Preço */}
            <div className="mt-2 mb-6">
              <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-1">
                por mês
              </p>
              <div className="flex items-end gap-1">
                <span className="text-white/50 text-xl font-black">R$</span>
                <span
                  className="font-black text-white leading-none"
                  style={{ fontSize: "clamp(3rem, 10vw, 4rem)" }}
                >
                  800
                </span>
              </div>
              <p className="text-[#00C2FF] text-xs font-black uppercase tracking-widest mt-1">
                Contrato 3 meses
              </p>
            </div>

            {/* Entregáveis */}
            <ul className="flex flex-col gap-3 flex-1 mb-8">
              {entregaveis.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#00C2FF]/15 border border-[#00C2FF]/40 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-[#00C2FF]" fill="none" viewBox="0 0 12 10" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1 5l3.5 3.5L11 1" />
                    </svg>
                  </div>
                  <span className="text-white/70 text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={getWhatsAppLink("trafego")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#00C2FF] border-2 border-[#1A1A1A] text-[#1A1A1A] font-black uppercase tracking-widest text-sm py-4 rounded-xl"
              style={{ boxShadow: "4px 4px 0px #1A1A1A" }}
            >
              <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Quero começar agora
            </a>
          </motion.div>

          {/* Card upgrade — R$1.200 */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#1A1A1A] border-2 border-white/10 rounded-2xl p-7 flex flex-col"
          >
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1.5 bg-white/10 border border-white/20 text-white/50 font-black text-[10px] uppercase tracking-[0.18em] px-4 py-1 rounded-full">
                🔓 Próximo passo
              </div>
            </div>

            {/* Preço */}
            <div className="mt-2 mb-6">
              <p className="text-white/25 text-xs font-black uppercase tracking-widest mb-1">
                por mês
              </p>
              <div className="flex items-end gap-1">
                <span className="text-white/25 text-xl font-black">R$</span>
                <span
                  className="font-black text-white/30 leading-none"
                  style={{ fontSize: "clamp(3rem, 10vw, 4rem)" }}
                >
                  1.200
                </span>
              </div>
              <p className="text-white/25 text-xs font-black uppercase tracking-widest mt-1">
                Contrato 6 meses — após resultado
              </p>
            </div>

            {/* Entregáveis */}
            <ul className="flex flex-col gap-3 flex-1 mb-8">
              {[...entregaveis, "Ida ao seu negócio para gravar os criativos", "Estratégia de crescimento mensal"].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-white/05 border border-white/15 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-2.5 h-2.5 text-white/30" fill="none" viewBox="0 0 12 10" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M1 5l3.5 3.5L11 1" />
                    </svg>
                  </div>
                  <span className="text-white/30 text-sm leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            {/* Nota */}
            <div className="border border-white/10 rounded-xl p-4 text-center">
              <p className="text-white/35 text-xs leading-relaxed">
                Este plano é a evolução natural após os primeiros 3 meses.
                <br />
                <span className="text-white/50 font-bold">Você decide se quer continuar.</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* Rodapé explicativo */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center text-white/25 text-xs mt-8 max-w-sm mx-auto leading-relaxed"
        >
          O preço de R$ 800 é porque a ZBRAND acredita que microempreendedores merecem
          a chance de escalar com investimento acessível. Simples assim.
        </motion.p>
      </div>
    </section>
  );
}
