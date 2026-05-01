"use client";

import { motion } from "framer-motion";

const milestones = [
  {
    year: "2015",
    color: "#00C2FF",
    emoji: "🤝",
    title: "O começo",
    text: "Bruna e Gui se conhecem na Decathlon — e são demitidos no mesmo dia. Com o dinheiro da rescisão dos dois, decidiram empreender.",
  },
  {
    year: "2016",
    color: "#FF6100",
    emoji: "🌮",
    title: "Churruts nasce",
    text: "Um carrinho de churros na rua. Sem plano de negócio, sem manual. Cresceu com muita raça, eventos, feiras e clientes apaixonados.",
  },
  {
    year: "2020",
    color: "#FBBC05",
    emoji: "🔒",
    title: "A pandemia muda tudo",
    text: "Os eventos pararam. Criaram delivery e se jogaram no marketing digital. Em 1 ano: de 1.500 para 10.000 seguidores — tudo orgânico, sem anúncio.",
  },
  {
    year: "2022",
    color: "#AAFF00",
    emoji: "🎬",
    title: "YouTube + infoproduto",
    text: "Canal com 3.000 inscritos em 3 meses. Primeiro produto digital: R$ 7.000 em vendas, orgânico. A ficha caiu — marketing de verdade funciona.",
  },
  {
    year: "2023",
    color: "#7B2FF7",
    emoji: "👶",
    title: "O Zeca chega",
    text: "Com o bebê, perceberam que queriam flexibilidade de tempo e lugar. A ZBRAND nasce — ainda com avental de churros.",
  },
  {
    year: "2026",
    color: "#FF3D9A",
    emoji: "🦓",
    title: "Foco total na ZBRAND",
    text: "Churruts fecha em março de 2026. ZBRAND 100%. A agência que entende de gastronomia porque viveu na pele cada desafio.",
  },
];

export function SobreOrigin() {
  return (
    <section className="bg-[#F5F5F0] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: "#FF6100" }}>
            A nossa história
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            De churros na rua{" "}
            <span style={{ color: "#FF6100" }}>para agência</span>{" "}
            de marketing.
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-lg mx-auto leading-relaxed">
            Não foi planejado. Aconteceu.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-preto/10" />

          <div className="flex flex-col gap-8">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-20"
              >
                {/* Bolinha */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.06 + i * 0.1, duration: 0.4, type: "spring" }}
                  className="absolute left-0 top-4 w-12 h-12 rounded-full border-2 border-preto bg-white flex items-center justify-center font-display font-black text-xs -translate-y-1/2"
                  style={{ boxShadow: `3px 3px 0px 0px ${m.color}`, color: m.color }}
                >
                  {m.year.slice(2)}
                </motion.div>

                {/* Card */}
                <div
                  className="bg-white border-2 border-preto rounded-2xl p-5"
                  style={{ boxShadow: `5px 5px 0px 0px ${m.color}` }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xl">{m.emoji}</span>
                    <div>
                      <span
                        className="text-[10px] font-black uppercase tracking-widest"
                        style={{ color: m.color }}
                      >
                        {m.year}
                      </span>
                      <h3 className="font-display font-black text-lg text-preto uppercase tracking-tight leading-tight">
                        {m.title}
                      </h3>
                    </div>
                  </div>
                  <p className="font-display text-sm text-cinza-dark leading-relaxed">
                    {m.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
