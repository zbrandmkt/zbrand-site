"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const diffs = [
  {
    icon: "🔥",
    color: "#FF6100",
    title: "A gente vive eventos",
    desc: "10 anos vivendo de gastronomia e eventos com a Churruts. Sabemos o que é montar carrinho no sábado e responder orçamento às 23h.",
  },
  {
    icon: "🎥",
    color: "#00C2FF",
    title: "Um nicho só",
    desc: "Só assessoramos fornecedores de eventos. Falamos a sua língua: data, convidados, sazonalidade, cerimonialista, orçamento.",
  },
  {
    icon: "📸",
    color: "#AAFF00",
    title: "Remoto, Brasil inteiro",
    desc: "Tudo acontece online. Você manda fotos e informações, a gente monta, roda e acompanha — sem tirar você da operação.",
  },
];

export function Differentials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Coluna esquerda: título + texto + foto ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            {/* Tag */}
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-4">
              Quem somos
            </p>

            {/* Título */}
            <h2 className="font-display font-black text-4xl lg:text-5xl text-[#1A1A1A] uppercase tracking-tight leading-[1.05] mb-6">
              Nascemos de um{" "}
              <span className="text-[#FF6100]">carrinho de churros</span>
            </h2>

            {/* Texto */}
            <p className="text-sm text-[#1A1A1A]/60 font-medium leading-relaxed mb-4">
              A Zibrand nasceu da Churruts, nossa marca de carrinhos de churros para eventos. Foram 10 anos de casamentos, 15 anos, eventos corporativos e festas juninas — e de todas as dores que vêm junto: o orçamento que se perde, o mês parado, a dependência de indicação.
            </p>
            <p className="text-sm text-[#1A1A1A]/60 font-medium leading-relaxed mb-8">
              Hoje a gente assessora outros fornecedores de eventos com o que funcionou pra nós. Entre os nossos clientes está a Promo Indoor, rede que leva food trucks, food bikes e carrinhos gourmet a cerca de 70 prédios em São Paulo e reúne mais de 130 parceiros.
            </p>

            {/* Foto limpa, sem moldura */}
            <Image
              src="/images/foto-guiebru-loja.png"
              alt="Gui e Bruna, fundadores da Zibrand e da Churruts"
              width={640}
              height={480}
              className="w-full h-auto object-contain"
              priority
            />
          </motion.div>

          {/* ── Coluna direita: cards de diferenciais ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5 justify-center"
          >
            {diffs.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 bg-white rounded-2xl border-2 p-5"
                style={{
                  borderColor: d.color,
                  boxShadow: `4px 4px 0px 0px ${d.color}`,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl border-2 flex items-center justify-center text-2xl shrink-0"
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
          </motion.div>

        </div>
      </div>
    </section>
  );
}
