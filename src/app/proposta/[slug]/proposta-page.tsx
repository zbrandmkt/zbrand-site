"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PropostaData } from "@/types/proposta";
import { PropostaHero } from "@/components/proposta/proposta-hero";
import { SecaoMetodologia } from "@/components/proposta/secao-metodologia";
import { CardAchado } from "@/components/proposta/card-achado";
import { SecaoRecomendacao } from "@/components/proposta/secao-recomendacao";
import { CardFase } from "@/components/proposta/card-fase";
import { SecaoProva } from "@/components/proposta/secao-prova";
import { SecaoContaQueImporta } from "@/components/proposta/secao-conta-que-importa";
import { TabelaInvestimento } from "@/components/proposta/tabela-investimento";
import { PropostaCTA } from "@/components/proposta/proposta-cta";
import { RichParagraph } from "@/components/proposta/rich-text";

function SecaoAchados({ data }: { data: PropostaData["achados"] }) {
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
          className="font-display font-black text-[#0A0A0A] text-3xl md:text-4xl uppercase tracking-tight leading-tight mb-4"
        >
          {data.titulo}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mb-12"
        >
          <RichParagraph
            text={data.intro}
            className="text-[#6B7280] text-base leading-relaxed"
          />
        </motion.div>

        <div className="space-y-8">
          {data.items.map((achado, i) => (
            <CardAchado key={i} achado={achado} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SecaoFases({ data }: { data: PropostaData["fases"] }) {
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

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-[#6B7280] text-base leading-relaxed mb-10"
        >
          {data.intro}
        </motion.p>

        <div className="space-y-8">
          {data.items.map((fase, i) => (
            <CardFase key={i} fase={fase} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Rodape({ data }: { data: PropostaData["rodape"] }) {
  return (
    <footer className="bg-[#0A0A0A] py-10 text-center">
      <p className="font-display font-black text-white text-lg tracking-tight mb-1">
        {data.marca}
      </p>
      <p className="text-white/40 text-xs mb-3">{data.tagline}</p>
      <p className="text-white/30 text-[10px] tracking-wide">{data.links}</p>
    </footer>
  );
}

export function PropostaPage({ data }: { data: PropostaData }) {
  return (
    <main className="min-h-screen">
      <PropostaHero data={data.hero} />
      <SecaoMetodologia data={data.metodologia} />
      <SecaoAchados data={data.achados} />
      <SecaoRecomendacao data={data.recomendacao} />
      <SecaoFases data={data.fases} />
      <SecaoProva data={data.prova} />
      <SecaoContaQueImporta data={data.contaQueImporta} />
      <TabelaInvestimento data={data.investimento} />
      <PropostaCTA data={data.cta} />
      <Rodape data={data.rodape} />
    </main>
  );
}
