"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LIME = "#AAFF00";

const diffs = [
  {
    icon: "🦓",
    color: LIME,
    title: "Sistema, Não Serviço",
    desc: "Não são 3 serviços. É um sistema onde social, ads e bot compartilham estratégia, dados e equipe. O resultado é exponencial.",
  },
  {
    icon: "🎥",
    color: "#FF6100",
    title: "Conteúdo Para Todo o Funil",
    desc: "Filmamos o seu negócio uma vez. O material vai para o feed das 3 redes, para os criativos de ads e para as mensagens do bot — tudo consistente.",
  },
  {
    icon: "🤖",
    color: "#00C2FF",
    title: "Bot + Ads + Social em Sincronia",
    desc: "Campanha de sexta → o bot já está configurado para atender o pico do fim de semana. Quando o anúncio converte, o atendimento está pronto.",
  },
  {
    icon: "📊",
    color: "#FBBC05",
    title: "Dashboard Unificado",
    desc: "Social, ads e bot no mesmo painel. Você vê onde o cliente entrou, o que comprou e se voltou — sem precisar cruzar 3 ferramentas diferentes.",
  },
  {
    icon: "🤝",
    color: "#7B2FF7",
    title: "Uma Equipe, Responsabilidade Plena",
    desc: "Se um canal fraqueja, a equipe ajusta. Não tem 'isso não é comigo'. Você tem um único ponto de contato responsável pelo sistema todo.",
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

export function ZFullDiferenciais() {
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
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: LIME }}
          >
            Por que o Pacote Full
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            O que você ganha com o{" "}
            <span style={{ color: LIME }}>sistema completo</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-xl mx-auto leading-relaxed">
            Cada canal potencializa o outro. Não tem fragmentação, não tem ruído, não tem brecha no ciclo.
          </p>
        </motion.div>

        {/* Cards — row 1: 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {diffs.slice(0, 3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.1 + i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Cards — row 2: 2 centralizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:w-2/3 lg:mx-auto">
          {diffs.slice(3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.4 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
