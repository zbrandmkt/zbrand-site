"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  IdVisualData,
  IdVisualPacote,
  IdVisualPortfolio,
} from "@/types/proposta-idvisual";

const ease = [0.22, 1, 0.36, 1] as const;

function Hero({ data }: { data: IdVisualData["hero"] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section className="relative bg-[#0A0A0A] min-h-[80vh] flex items-center overflow-hidden border-b-[3px] border-[#0A0A0A]">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#FF6100]/10 blur-[120px]" />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-5 py-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-6"
        >
          {data.etiqueta}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          className="text-white/60 text-lg mb-4"
        >
          {data.saudacao}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease }}
          className="font-display font-black text-white text-4xl md:text-5xl uppercase tracking-tight leading-[1.1] mb-6"
        >
          {data.headline}
          <span className="text-[#FF6100]">{data.headlineDestaque}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.35, duration: 0.5, ease }}
          className="text-white/50 text-base leading-relaxed max-w-xl mb-10"
        >
          {data.subtexto}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5, ease }}
          className="flex flex-wrap gap-2"
        >
          {data.chips.map((chip, i) => (
            <span
              key={i}
              className={`text-xs font-bold px-4 py-2 rounded-full border-2 ${
                chip.destaque
                  ? "bg-[#AAFF00] text-[#0A0A0A] border-[#AAFF00]"
                  : "bg-white/5 text-white/60 border-white/10"
              }`}
            >
              {chip.texto}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function SecaoPacote({ pacote, index }: { pacote: IdVisualPacote; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLime = pacote.cor === "#AAFF00";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease }}
      className="border-2 border-[#0A0A0A] rounded-[14px] overflow-hidden"
      style={{ boxShadow: "6px 6px 0px #0A0A0A" }}
    >
      <div
        className="px-6 py-5 border-b-2 border-[#0A0A0A] flex items-center gap-4"
        style={{ background: pacote.cor }}
      >
        <span
          className="font-display font-black text-4xl leading-none"
          style={{
            color: isLime ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)",
          }}
        >
          {pacote.numero}.
        </span>
        <h3
          className="font-display font-black text-xl uppercase tracking-tight"
          style={{ color: isLime ? "#0A0A0A" : "#fff" }}
        >
          {pacote.titulo}
        </h3>
      </div>

      <div className="bg-white p-6 md:p-8">
        <ul className="space-y-3">
          {pacote.entregaveis.map((item, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.04, duration: 0.4 }}
              className="flex gap-3 items-start"
            >
              <div
                className="w-2 h-2 rounded-full shrink-0 mt-2"
                style={{ background: pacote.cor }}
              />
              <span className="text-[#4B5563] text-sm leading-relaxed">
                {item.texto}
              </span>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function SecaoPacotes({ data }: { data: IdVisualData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#F6F6F6] py-16 md:py-24 border-b-[3px] border-[#0A0A0A]">
      <div ref={ref} className="max-w-3xl mx-auto px-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-4"
        >
          O que está incluso
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-display font-black text-[#0A0A0A] text-3xl md:text-4xl uppercase tracking-tight leading-tight mb-4"
        >
          {data.investimento.nomePacote}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-[#6B7280] text-base mb-12"
        >
          Segue o que está incluso:
        </motion.p>

        <div className="space-y-8">
          {data.pacotes.map((pacote, i) => (
            <SecaoPacote key={i} pacote={pacote} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SecaoPortfolio({ data }: { data: IdVisualPortfolio }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  if (data.itens.length === 0) return null;

  return (
    <section className="bg-[#0A0A0A] py-16 md:py-24 border-b-[3px] border-[#0A0A0A] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-5">
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
          className="font-display font-black text-white text-3xl md:text-4xl uppercase tracking-tight leading-tight mb-4"
        >
          {data.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-white/50 text-base mb-12"
        >
          {data.subtexto}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {data.itens.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="border-2 border-white/10 rounded-[14px] overflow-hidden group"
            >
              <div className="relative aspect-square overflow-hidden bg-white/5">
                <Image
                  src={item.src}
                  alt={item.legenda}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-2.5 bg-white/5 border-t border-white/5">
                <p className="text-white/50 text-[11px] leading-snug">
                  {item.legenda}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SecaoInvestimento({ data }: { data: IdVisualData["investimento"] }) {
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
          className="font-display font-black text-[#0A0A0A] text-3xl md:text-4xl uppercase tracking-tight leading-tight mb-10"
        >
          {data.headline}
        </motion.h2>

        {/* Valor total */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-[#0A0A0A] border-2 border-[#0A0A0A] rounded-[14px] p-8 mb-8 text-center"
          style={{ boxShadow: "6px 6px 0px #FF6100" }}
        >
          <p className="text-white/50 text-sm uppercase tracking-wide mb-2">
            {data.nomePacote}
          </p>
          <p className="font-display font-black text-white text-5xl md:text-6xl tracking-tight">
            {data.valorTotal}
          </p>
        </motion.div>

        {/* Opções de pagamento */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {data.opcoesPagamento.map((opcao, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className={`border-2 border-[#0A0A0A] rounded-[14px] overflow-hidden ${
                opcao.destaque ? "ring-2 ring-[#FF6100] ring-offset-2" : ""
              }`}
              style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
            >
              <div
                className={`px-6 py-3 border-b-2 border-[#0A0A0A] ${
                  opcao.destaque ? "bg-[#FF6100]" : "bg-[#F6F6F6]"
                }`}
              >
                <h3
                  className={`font-display font-black text-sm uppercase tracking-tight ${
                    opcao.destaque ? "text-white" : "text-[#0A0A0A]"
                  }`}
                >
                  {opcao.titulo}
                </h3>
              </div>
              <div className="bg-white px-6 py-5">
                {opcao.linhas.map((linha, li) => (
                  <p
                    key={li}
                    className="text-[#4B5563] text-sm leading-relaxed"
                  >
                    {linha}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Prazo e inclui */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-[#F6F6F6] border-2 border-[#0A0A0A] rounded-[14px] p-5"
            style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6100] mb-2">
              Prazo estimado
            </p>
            <p className="font-display font-black text-[#0A0A0A] text-lg">
              {data.prazo}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-[#F6F6F6] border-2 border-[#0A0A0A] rounded-[14px] p-5"
            style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF6100] mb-2">
              Inclui
            </p>
            <p className="text-[#4B5563] text-sm leading-relaxed">
              {data.inclui}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTA({ data }: { data: IdVisualData["cta"] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-[#0A0A0A] py-20 md:py-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#FF6100]/15 blur-[140px]" />

      <div ref={ref} className="relative z-10 max-w-2xl mx-auto px-5 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease }}
          className="inline-block bg-[#FF6100] text-white text-[10px] font-black uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-8"
        >
          Proposta exclusiva
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease }}
          className="font-display font-black text-white text-3xl md:text-[42px] uppercase tracking-tight leading-[1.1] mb-8"
        >
          {data.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5, ease }}
          className="text-white/70 text-base md:text-lg leading-relaxed mb-10"
        >
          {data.texto}
        </motion.p>

        <motion.a
          href={data.linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block bg-[#FF6100] text-white font-display font-black text-base md:text-lg uppercase tracking-tight px-12 py-5 rounded-[14px] border-2 border-[#FF6100]"
          style={{ boxShadow: "6px 6px 0px #FF6100" }}
        >
          {data.textoBotao}
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-[#FF6100]/80 text-xs font-bold uppercase tracking-widest mt-8"
        >
          {data.reforco}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-white/30 text-xs mt-6"
        >
          {data.rodape}
        </motion.p>
      </div>
    </section>
  );
}

function Rodape({ data }: { data: IdVisualData["rodape"] }) {
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

export function IdVisualPage({ data }: { data: IdVisualData }) {
  return (
    <main className="min-h-screen">
      <Hero data={data.hero} />
      <SecaoPacotes data={data} />
      <SecaoPortfolio data={data.portfolio} />
      <SecaoInvestimento data={data.investimento} />
      <CTA data={data.cta} />
      <Rodape data={data.rodape} />
    </main>
  );
}
