"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AMBER = "#FBBC05";

const diffs = [
  {
    icon: "🦓",
    color: AMBER,
    title: "Feito para Alimentação",
    desc: "Não é chatbot genérico. Configuramos fluxos que entendem pedido, reserva, feedback e promoção do seu negócio específico — restaurante, delivery ou cafeteria.",
  },
  {
    icon: "🤖",
    color: "#FF6100",
    title: "Bot + IA Generativa",
    desc: "Perguntas fora do script? A IA generativa responde com linguagem natural. Nenhum cliente fica sem resposta, mesmo quando a dúvida é inesperada.",
  },
  {
    icon: "📊",
    color: "#00C2FF",
    title: "Relatório Real",
    desc: "Mensagens enviadas, leads qualificados, taxa de conversão (quantos viraram pedido), receita gerada pelo bot. Você vê exatamente o retorno do investimento.",
  },
  {
    icon: "📋",
    color: "#AAFF00",
    title: "Você Aprova Tudo",
    desc: "Nenhum fluxo vai ao ar sem sua aprovação. A gente mapeia as conversas, você revisa cada mensagem e aí a gente implementa. Zero surpresa.",
  },
  {
    icon: "🤝",
    color: "#7B2FF7",
    title: "Treinamento + Suporte Semanal",
    desc: "Você aprende a usar o painel, a disparar promoções (mensagens em massa) e a escalar atendimentos para humano. Reunião semanal incluída — não é entrega e tchau.",
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
          style={{ color: d.color === "#AAFF00" ? "#5a8a00" : d.color }}
        >
          {d.title}
        </h3>
        <p className="font-display text-sm text-cinza-dark leading-relaxed">{d.desc}</p>
      </div>
    </motion.div>
  );
}

export function ZAutomaçaoDiferenciais() {
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
            style={{ color: AMBER }}
          >
            Por que ZBRAND
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            O que nos faz{" "}
            <span style={{ color: AMBER }}>diferentes</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-xl mx-auto leading-relaxed">
            Não é só instalar um bot. É configurar, testar, treinar e acompanhar semanal
            para garantir que seu WhatsApp esteja convertendo de verdade.
          </p>
        </motion.div>

        {/* Cards row 1: 3 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {diffs.slice(0, 3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.1 + i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Cards row 2: 2 centralizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:w-2/3 lg:mx-auto">
          {diffs.slice(3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.4 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
