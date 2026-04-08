"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Descoberta",
    desc: "Ouvimos tudo sobre a sua empresa, público, diferenciais, objetivos e desafios. Vamos extrair o que já funciona e lapidar o que pode ficar melhor.",
    icon: "🔍",
    color: "#FF6100",
  },
  {
    number: "02",
    title: "Planejamento",
    desc: "Criamos a estratégia completa, calendário de conteúdo, campanhas de tráfego, metas e KPIs para medir resultado.",
    icon: "📋",
    color: "#00C2FF",
  },
  {
    number: "03",
    title: "Captação",
    desc: "Nosso time vai até o seu negócio gravar. Conteúdo real, roteirizado pra converter, com o tom de voz e identidade visual do seu negócio.",
    icon: "🎬",
    color: "#7B2FF7",
  },
  {
    number: "04",
    title: "Execução",
    desc: "Publicamos, gerenciamos anúncios e monitoramos tudo. Você foca em receber bem o cliente e vender.",
    icon: "🚀",
    color: "#AAFF00",
  },
  {
    number: "05",
    title: "Otimização",
    desc: "Toda semana analisamos os dados, ficamos de olho em tendências, ajustamos criativos e verbas. E você recebe tudo em seu painel do parceiro para acompanhamento de métricas.",
    icon: "📊",
    color: "#FBBC05",
  },
];

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F5F5F0] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Título */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-3">
            Processo
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-[#1A1A1A] uppercase tracking-tight">
            Como a gente <span className="text-[#FF6100]">trabalha</span>
          </h2>
          <p className="mt-4 text-base text-[#1A1A1A]/50 font-medium max-w-xl mx-auto leading-relaxed">
            Do briefing ao resultado, nossa equipe cuida de cada etapa — você só precisa focar estrategicamente no seu negócio.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[#1A1A1A]/10" />

          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-20"
              >
                {/* Círculo com número */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.1, duration: 0.4, type: "spring" }}
                  className="absolute left-0 top-4 w-12 h-12 rounded-full border-2 border-[#1A1A1A] bg-white flex items-center justify-center font-display font-black text-sm -translate-y-1/2"
                  style={{ boxShadow: `3px 3px 0px 0px ${step.color}`, color: step.color }}
                >
                  {step.number}
                </motion.div>

                {/* Card */}
                <div
                  className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6"
                  style={{ boxShadow: `5px 5px 0px 0px ${step.color}` }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="font-display font-black text-xl text-[#1A1A1A] uppercase tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#1A1A1A]/55 leading-relaxed font-medium">
                    {step.desc}
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
