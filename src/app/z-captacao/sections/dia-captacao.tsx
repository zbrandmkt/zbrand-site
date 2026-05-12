"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    time: "Chegada",
    icon: "📋",
    color: "#AAFF00",
    title: "Briefing & Setup",
    desc: "Alinhamos o roteiro do dia, conferimos os takes prioritários e montamos o equipamento. Você não precisa improvisar — chegamos com tudo planejado. 15 minutos.",
  },
  {
    number: "02",
    time: "Hora 1",
    icon: "🏠",
    color: "#FF6100",
    title: "Bastidores & Ambiente",
    desc: "Captamos o ambiente do negócio: bastidores em ação, espaço, equipe trabalhando. O conteúdo que humaniza a marca e cria conexão com o cliente.",
  },
  {
    number: "03",
    time: "Hora 2",
    icon: "📦",
    color: "#00C2FF",
    title: "Produtos & Serviços",
    desc: "Filmagem dos produtos com apresentação, detalhe e textura. O conteúdo que chama atenção, desperta desejo e converte visualização em venda.",
  },
  {
    number: "04",
    time: "Hora 3–4",
    icon: "🎤",
    color: "#7B2FF7",
    title: "Talking Head & Depoimentos",
    desc: "Você ou sua equipe aparece. Apresentações, bastidores falados, histórias reais com roteiro. É o formato que mais engaja — e o que mais converte.",
  },
  {
    number: "05",
    time: "Wrap",
    icon: "✅",
    color: "#FF3D9A",
    title: "Edição & Entrega",
    desc: "Material vai para pós-produção: corte, legendas, cor, trilha. Em 10 dias os vídeos editados chegam no seu Drive, prontos para publicar.",
  },
];

export function ZCaptacaoDia() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F5F5F0] py-20 lg:py-28 overflow-hidden">
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
            style={{ color: "#AAFF00" }}
          >
            Na prática
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Como é um{" "}
            <span style={{ color: "#AAFF00" }}>dia de captação</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-xl mx-auto leading-relaxed">
            Uma sessão de 4h estruturada do início ao fim. Você não precisa pensar no que gravar —
            a gente chega com roteiro, setup e equipe pronta.
          </p>
        </motion.div>

        {/* Steps — vertical timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical connector line */}
          <div className="absolute left-[1.75rem] top-8 bottom-8 w-0.5 bg-preto/10 hidden sm:block" />

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-5 sm:pl-0"
              >
                {/* Step number circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.08 + i * 0.12, duration: 0.4, type: "spring" }}
                  className="shrink-0 w-14 h-14 rounded-full border-2 border-preto bg-white flex flex-col items-center justify-center font-display font-black relative z-10"
                  style={{ boxShadow: `3px 3px 0px 0px ${step.color}`, color: step.color }}
                >
                  <span className="text-xs leading-none">{step.number}</span>
                  <span className="text-[8px] font-bold text-preto/40 uppercase tracking-wide leading-none mt-0.5">
                    {step.time}
                  </span>
                </motion.div>

                {/* Card */}
                <div
                  className="flex-1 bg-white border-2 border-preto rounded-brutal-lg p-5"
                  style={{ boxShadow: `5px 5px 0px 0px ${step.color}` }}
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className="text-xl">{step.icon}</span>
                    <h3
                      className="font-display font-black text-lg uppercase tracking-tight"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-display text-sm text-cinza-dark leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.75, duration: 0.55 }}
          className="mt-12 text-center"
        >
          <div
            className="inline-block border-2 border-preto rounded-brutal-lg px-8 py-5"
            style={{ background: "#AAFF00", boxShadow: "5px 5px 0px 0px #1A1A1A" }}
          >
            <p className="font-display font-black text-xl text-preto uppercase tracking-tight">
              Uma sessão de 4h = conteúdo para 30 dias de postagem.
            </p>
            <p className="font-display text-sm text-preto/60 font-medium mt-1">
              Sem gravar toda semana. Sem improvisar. Sem estresse.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
