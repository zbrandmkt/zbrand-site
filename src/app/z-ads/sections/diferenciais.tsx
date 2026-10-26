"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const diffs = [
  {
    icon: "🦓",
    color: "#FBBC05",
    title: "A Gente Vive Eventos",
    desc: "10 anos com carrinhos de churros em eventos. Sabemos quando o cliente começa a procurar fornecedor e o que ele precisa ver pra pedir orçamento.",
  },
  {
    icon: "🎥",
    color: "#FF6100",
    title: "Criativos com Seu Evento",
    desc: "A gente manda o roteiro, você grava no próprio evento e nós editamos. Anúncio com o seu carrinho, o seu truck, o seu trabalho — nada de banco de imagem.",
  },
  {
    icon: "📊",
    color: "#00C2FF",
    title: "Resultado Transparente",
    desc: "Relatório semanal com retorno real: quanto você gastou, quantos pedidos de orçamento chegaram e quanto custou cada um. Sem enrolação.",
  },
  {
    icon: "🎯",
    color: "#AAFF00",
    title: "Estratégia Real",
    desc: "Campanhas planejadas pelo calendário de eventos: temporada de casamentos, 15 anos, festas juninas, confraternizações de fim de ano. Remarketing e Google Ads incluídos. Funil completo, não anúncio avulso.",
  },
  {
    icon: "🤝",
    color: "#7B2FF7",
    title: "Parceria de 4 Meses",
    desc: "Não é 'faço e tchau'. Contrato de 4 meses com acompanhamento semanal e otimizações contínuas — porque resultado de anúncio leva tempo e consistência.",
  },
];

function Card({ d, delay, inView }: { d: typeof diffs[0]; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-preto rounded-brutal-lg p-6 flex flex-col gap-4"
      style={{ boxShadow: `5px 5px 0px 0px ${d.color}` }}
    >
      <div
        className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shrink-0"
        style={{ borderColor: d.color, background: `${d.color}15` }}
      >
        {d.icon}
      </div>
      <div>
        <h3
          className="font-display font-black text-base uppercase tracking-tight mb-2"
          style={{ color: d.color }}
        >
          {d.title}
        </h3>
        <p className="font-display text-sm text-cinza-dark leading-relaxed">
          {d.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function ZAdsDiferenciais() {
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
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00C2FF] mb-4">
            Por que a Zibrand
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            O que nos faz{" "}
            <span className="text-[#00C2FF]">diferentes</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-xl mx-auto leading-relaxed">
            Não somos mais uma agência de tráfego com relatório bonito e resultado de mentira.
            Somos a assessoria que vive eventos e mede o que importa: orçamento fechado.
          </p>
        </motion.div>

        {/* Cards — row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {diffs.slice(0, 3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.1 + i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Cards — row 2: 2 cards centralizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:w-2/3 lg:mx-auto">
          {diffs.slice(3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.4 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
