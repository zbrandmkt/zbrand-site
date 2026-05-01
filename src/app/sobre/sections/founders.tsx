"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const PINK = "#FF3D9A";
const CYAN = "#00C2FF";

const founders = [
  {
    name: "Bruna",
    age: "33 anos · Geminiana · Mãe do Zeca",
    color: PINK,
    emoji: "✨",
    role: "Estratégia · Conteúdo · Comercial",
    personality:
      "Carismática, direta e criativa. Não tem medo de se posicionar e bater de frente. Apaixonada por storytelling e por construir comunidade.",
    tags: ["Estratégia de Conteúdo", "Comercial", "Mídia Paga"],
    quote: "A gente não faz post bonito. A gente faz conteúdo que vende.",
    details: [
      "Planejamento editorial e calendário de conteúdo",
      "Roteirização e edição dos criativos",
      "Atendimento e relacionamento com clientes",
      "Estruturação de funil de mídia paga",
    ],
  },
  {
    name: "Guilherme",
    age: "30 anos · Aquariano · Pai do Zeca",
    color: CYAN,
    emoji: "⚡",
    role: "Tecnologia · Tráfego · Automação",
    personality:
      "Autodidata por natureza. Aprende qualquer ferramenta sozinho. Leve, leva tudo na boa — mas é obcecado por resultado e inovação.",
    tags: ["Tráfego Pago", "Automação", "Desenvolvimento"],
    quote: "Se precisa ser feito, eu aprendo a fazer. Simples assim.",
    details: [
      "Gestão e otimização de campanhas Meta + Google",
      "Desenvolvimento web e landing pages",
      "Automação de WhatsApp e integrações",
      "Análise de dados e relatórios ROAS",
    ],
  },
];

export function SobreFounders() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: "#FF6100" }}>
            Quem somos
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Dois.{" "}
            <span style={{ color: "#FF6100" }}>Complementares.</span>{" "}
            Obcecados por resultado.
          </h2>
        </motion.div>

        {/* Foto central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-12"
        >
          <div
            className="relative w-full max-w-md rounded-brutal-lg border-2 border-preto overflow-hidden"
            style={{ boxShadow: "6px 6px 0px 0px #FF6100" }}
          >
            <Image
              src="/images/foto-guiebru-loja.png"
              alt="Gui e Bruna — fundadores da ZBRAND"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A1A]/80 to-transparent px-5 py-4">
              <p className="font-display font-black text-sm text-white uppercase tracking-tight">
                Gui e Bruna
              </p>
              <p className="text-[10px] text-white/60 font-medium">Fundadores da ZBRAND · Ex-donos da Churruts</p>
            </div>
          </div>
        </motion.div>

        {/* Cards dos fundadores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {founders.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="border-2 border-preto rounded-brutal-lg p-6 flex flex-col gap-4"
              style={{ boxShadow: `5px 5px 0px 0px ${f.color}` }}
            >
              {/* Nome e idade */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{f.emoji}</span>
                  <h3 className="font-display font-black text-2xl text-preto uppercase tracking-tight">
                    {f.name}
                  </h3>
                </div>
                <p className="text-[11px] text-cinza-text font-medium">{f.age}</p>
                <p
                  className="text-[10px] font-black uppercase tracking-widest mt-1.5"
                  style={{ color: f.color }}
                >
                  {f.role}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border"
                    style={{ color: f.color, borderColor: `${f.color}40`, background: `${f.color}10` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Personalidade */}
              <p className="font-display text-sm text-cinza-dark leading-relaxed">
                {f.personality}
              </p>

              {/* O que faz */}
              <ul className="flex flex-col gap-2">
                {f.details.map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <div
                      className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${f.color}20`, border: `1.5px solid ${f.color}50` }}
                    >
                      <svg className="w-2 h-2" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={f.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="text-[11px] text-cinza-dark font-medium leading-snug">{d}</span>
                  </li>
                ))}
              </ul>

              {/* Quote */}
              <blockquote
                className="border-l-4 pl-4 mt-1"
                style={{ borderColor: f.color }}
              >
                <p className="font-display text-sm font-bold italic text-preto leading-snug">
                  &ldquo;{f.quote}&rdquo;
                </p>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
