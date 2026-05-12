"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PINK = "#FF3D9A";

const diffs = [
  {
    icon: "💻",
    color: PINK,
    title: "Feito para Vender",
    desc: "Não é vitrine, é funil. Cada seção foi pensada para levar o visitante do 'tô vendo' pro 'quero contratar' em menos de 30 segundos.",
  },
  {
    icon: "📱",
    color: "#00C2FF",
    title: "Mobile-First",
    desc: "80% dos acessos vêm do celular. Seu site carrega em 2 segundos, funciona no 4G e tem botão de WhatsApp sempre visível.",
  },
  {
    icon: "🔍",
    color: "#FF6100",
    title: "SEO Local Incluído",
    desc: "Seu site aparece no Google quando alguém pesquisa seu serviço + bairro. Tráfego orgânico e gratuito, todo mês.",
  },
  {
    icon: "🚀",
    color: "#AAFF00",
    title: "Entrega em até 10–21 Dias",
    desc: "Landing page em 10 dias. Site completo em até 3 semanas. Você aprova cada etapa antes de ir ao ar.",
  },
  {
    icon: "🔧",
    color: "#7B2FF7",
    title: "Sem Precisar de Tecnologia",
    desc: "A gente entrega, explica e dá suporte. Se precisar mudar algo depois, tem o Banco de Horas — simples e sem mistério.",
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

export function ZSiteDiferenciais() {
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
          <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: PINK }}>
            Por que ZBRAND
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Sites que{" "}
            <span style={{ color: PINK }}>trabalham por você</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-xl mx-auto leading-relaxed">
            Cada detalhe pensado para negócios locais. Seu site atrai, converte e fideliza — enquanto você cuida do que faz de melhor.
          </p>
        </motion.div>

        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {diffs.slice(0, 3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.1 + i * 0.1} inView={inView} />
          ))}
        </div>

        {/* Row 2: 2 cards centralizados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 lg:w-2/3 lg:mx-auto">
          {diffs.slice(3).map((d, i) => (
            <Card key={d.title} d={d} delay={0.4 + i * 0.1} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
