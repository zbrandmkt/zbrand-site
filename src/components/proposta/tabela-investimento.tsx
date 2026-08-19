"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PropostaInvestimento } from "@/types/proposta";

export function TabelaInvestimento({ data }: { data: PropostaInvestimento }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-white py-16 md:py-24 border-b-[3px] border-[#0A0A0A]">
      <div ref={ref} className="max-w-3xl mx-auto px-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-4"
        >
          {data.etiqueta}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-display font-black text-[#0A0A0A] text-3xl md:text-4xl uppercase tracking-tight leading-tight mb-3"
        >
          {data.titulo}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-[#6B7280] text-base mb-10"
        >
          {data.intro}
        </motion.p>

        {/* Itens de investimento */}
        <div className="space-y-4 mb-14">
          {data.itens.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="bg-[#F6F6F6] border-2 border-[#0A0A0A] rounded-[14px] p-5 md:p-6 relative overflow-hidden"
              style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
            >
              {item.selo && (
                <div className="absolute top-0 right-0 bg-[#FF6100] text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                  {item.selo}
                </div>
              )}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="font-display font-black text-[#0A0A0A] text-base uppercase tracking-tight mb-2">
                    {item.nome}
                  </h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">
                    {item.descricao}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  {item.valorRiscado && (
                    <span className="text-[#6B7280] text-sm line-through block">
                      {item.valorRiscado}
                    </span>
                  )}
                  <span className="font-display font-black text-xl text-[#0A0A0A]">
                    {item.valor}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cenários */}
        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="font-display font-black text-[#0A0A0A] text-xl uppercase tracking-tight mb-6"
        >
          {data.titulosCenarios}
        </motion.h3>

        <div className="space-y-6 mb-6">
          {data.cenarios.map((cenario, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + ci * 0.15, duration: 0.5 }}
              className="border-2 border-[#0A0A0A] rounded-[14px] overflow-hidden"
              style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
            >
              <div className="bg-[#0A0A0A] px-5 py-3">
                <h4 className="font-display font-black text-white text-sm uppercase tracking-tight">
                  {cenario.titulo}
                </h4>
                {cenario.subtitulo && (
                  <p className="text-white/50 text-xs mt-0.5">
                    {cenario.subtitulo}
                  </p>
                )}
              </div>

              {/* Desktop: tabela */}
              <div className="hidden md:block bg-white">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-[#E5E5E5]">
                      <th className="text-left font-black text-[#0A0A0A] uppercase text-xs tracking-wide px-5 py-3">
                        Período
                      </th>
                      <th className="text-left font-black text-[#0A0A0A] uppercase text-xs tracking-wide px-5 py-3">
                        Composição
                      </th>
                      <th className="text-right font-black text-[#0A0A0A] uppercase text-xs tracking-wide px-5 py-3">
                        Valor
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cenario.linhas.map((l, li) => (
                      <tr
                        key={li}
                        className="border-b border-[#E5E5E5] last:border-b-0"
                      >
                        <td className="px-5 py-3 text-[#4B5563] text-sm">
                          {l.periodo}
                        </td>
                        <td className="px-5 py-3 text-[#6B7280] text-sm">
                          {l.composicao}
                        </td>
                        <td className="px-5 py-3 text-right font-bold text-[#0A0A0A]">
                          {l.valor}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile: cards empilhados */}
              <div className="md:hidden bg-white divide-y divide-[#E5E5E5]">
                {cenario.linhas.map((l, li) => (
                  <div key={li} className="px-5 py-4">
                    <div className="text-xs font-bold text-[#6B7280] uppercase tracking-wide mb-1">
                      {l.periodo}
                    </div>
                    <div className="text-[#4B5563] text-sm mb-2">
                      {l.composicao}
                    </div>
                    <div className="font-display font-black text-[#0A0A0A] text-lg">
                      {l.valor}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-[#6B7280] text-sm italic text-center mb-10"
        >
          {data.notaCenarios}
        </motion.p>

        {/* Cards de justificativa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.cardsJustificativa.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
              className="bg-[#F6F6F6] border-2 border-[#0A0A0A] rounded-[14px] p-5"
              style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
            >
              <h4 className="font-display font-black text-[#0A0A0A] text-sm uppercase tracking-tight mb-2">
                {card.titulo}
              </h4>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                {card.texto}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
