"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const diffs = [
  {
    icon: "🔥",
    color: "#FF6100",
    title: "Experiência Vivida",
    desc: "Passamos 10 anos escalando um negócio de churros. Sabemos o que funciona porque vivemos cada desafio que você enfrenta.",
  },
  {
    icon: "🎥",
    color: "#00C2FF",
    title: "Conteúdo Humanizado",
    desc: "Nada de banco de imagem ou IA. A gente grava conteúdo real e humanizado, com o rosto e a história do seu negócio.",
  },
  {
    icon: "📸",
    color: "#AAFF00",
    title: "Captação Incluída",
    desc: "Gravação e edição de conteúdos fazem parte do serviço. A gente vai até você.",
  },
];

export function Differentials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Coluna esquerda: texto + diferenciais ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Tag */}
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-4">
              Quem somos
            </p>

            {/* Título */}
            <h2 className="font-display font-black text-4xl lg:text-5xl text-[#1A1A1A] uppercase tracking-tight leading-[1.05] mb-6">
              De restaurante{" "}
              <span className="text-[#FF6100]">para restaurante</span>
            </h2>

            {/* Texto */}
            <p className="text-sm text-[#1A1A1A]/60 font-medium leading-relaxed mb-4">
              A ZBRAND nasceu da Churruts — uma marca de churros que começou do zero e escalou para lojas, deliverys, carrinhos para eventos e uma comunidade forte e engajada. Por isso sabemos exatamente o que funciona.
            </p>
            <p className="text-sm text-[#1A1A1A]/60 font-medium leading-relaxed mb-10">
              Não falamos de teoria, falamos da experiência real que vivemos e agora ajudamos outras empresas a crescer sem perder tempo.
            </p>

            {/* Cards de diferenciais */}
            <div className="flex flex-col gap-4">
              {diffs.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4 bg-white rounded-2xl border-2 p-4"
                  style={{
                    borderColor: d.color,
                    boxShadow: `4px 4px 0px 0px ${d.color}`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl border-2 flex items-center justify-center text-xl shrink-0"
                    style={{ borderColor: d.color, background: `${d.color}15` }}
                  >
                    {d.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-sm uppercase tracking-wide mb-1" style={{ color: d.color }}>
                      {d.title}
                    </h3>
                    <p className="text-xs text-[#1A1A1A]/55 font-medium leading-relaxed">
                      {d.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Coluna direita: foto + mockup celular ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col gap-5"
          >
            {/* Foto Gui & Bru */}
            <div
              className="relative w-full rounded-2xl overflow-hidden border-2 border-[#1A1A1A]"
              style={{ boxShadow: "6px 6px 0px 0px #FF6100" }}
            >
              <Image
                src="/images/foto-guiebru-loja.png"
                alt="Gui e Bruna — fundadores da ZBRAND e donos da Churruts"
                width={640}
                height={420}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Caption badge */}
              <div className="absolute bottom-3 left-3 bg-[#1A1A1A]/80 backdrop-blur-sm text-white text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl">
                Gui & Bru — Fundadores
              </div>
            </div>

            {/* Mockup celular — placeholder até ter a imagem */}
            <div className="flex items-center gap-4">
              {/* Phone frame */}
              <div
                className="relative shrink-0 w-28 rounded-[20px] border-2 border-[#1A1A1A] bg-[#1A1A1A] overflow-hidden"
                style={{ height: 180, boxShadow: "4px 4px 0px 0px #FF6100" }}
              >
                {/* Screen */}
                <div className="absolute inset-[3px] rounded-[17px] bg-white overflow-hidden flex flex-col">
                  {/* IG header */}
                  <div className="bg-white px-2 pt-2 pb-1 flex items-center gap-1 border-b border-gray-100">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#dc2743] flex items-center justify-center">
                      <span className="text-white text-[7px]">📷</span>
                    </div>
                    <span className="text-[6px] font-black text-[#1A1A1A] tracking-tight">churruts</span>
                    <div className="ml-auto w-3 h-3 rounded-sm bg-gradient-to-tr from-[#f09433] to-[#dc2743]" />
                  </div>
                  {/* Grid de posts simulados */}
                  <div className="grid grid-cols-3 gap-px flex-1 bg-gray-200">
                    {["#FF6100","#1A1A1A","#FF6100","#FBBC05","#FF6100","#1A1A1A","#FF6100","#FBBC05","#FF6100"].map((c, i) => (
                      <div key={i} className="aspect-square" style={{ background: c, opacity: 0.7 + (i % 3) * 0.1 }} />
                    ))}
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-[#1A1A1A] rounded-full" />
              </div>

              {/* Texto ao lado do celular */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#FF6100] mb-1">
                  @churruts
                </p>
                <p className="text-xs font-bold text-[#1A1A1A] leading-snug mb-1">
                  A marca que levantamos do zero
                </p>
                <p className="text-[11px] text-[#1A1A1A]/50 font-medium leading-relaxed">
                  Da churros de evento até lojas, deliverys e comunidade engajada — foi com a Churruts que aprendemos o que funciona.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
