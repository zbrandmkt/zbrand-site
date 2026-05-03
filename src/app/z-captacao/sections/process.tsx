"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LIME = "#AAFF00";

const steps = [
  {
    number: "01",
    icon: "🔍",
    color: "#AAFF00",
    title: "Briefing & Agendamento",
    desc: "Reunião rápida de 30 minutos para entender o seu negócio, definir a pauta do dia — os takes prioritários, os produtos em destaque e quem aparece — e agendar a sessão presencial.",
  },
  {
    number: "02",
    icon: "🎬",
    color: "#FF6100",
    title: "Dia de Captação (4h)",
    desc: "Nossa equipe vai até o seu negócio com equipamento completo e roteiro na mão. Bastidores, pratos, equipe, talking head. Você foca no negócio — a gente cuida do conteúdo.",
  },
  {
    number: "03",
    icon: "✂️",
    color: "#00C2FF",
    title: "Edição Profissional",
    desc: "Material vai para pós-produção: corte dinâmico, legendas, tratamento de cor e trilha. Padrão de rede social — vertical, com gancho nos primeiros 3 segundos.",
  },
  {
    number: "04",
    icon: "📁",
    color: "#7B2FF7",
    title: "Entrega no Drive",
    desc: "Em 10 dias, os vídeos editados chegam organizados no Google Drive. Prontos para postar no Instagram, TikTok e YouTube — com ou sem agência.",
  },
];

export function ZCaptacaoProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-preto py-20 lg:py-28 overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: LIME }}
          >
            Processo
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            Do briefing ao{" "}
            <span style={{ color: LIME }}>Drive em 10 dias</span>
          </h2>
          <p className="mt-4 font-display text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            Quatro passos simples. Você envolve em apenas duas delas — o resto é com a gente.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />

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
                {/* Circle */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.1, duration: 0.4, type: "spring" }}
                  className="absolute left-0 top-4 w-12 h-12 rounded-full border-2 border-preto bg-[#1A1A1A] flex items-center justify-center font-display font-black text-sm -translate-y-1/2"
                  style={{ boxShadow: `3px 3px 0px 0px ${step.color}`, color: step.color, borderColor: `${step.color}50` }}
                >
                  {step.number}
                </motion.div>

                {/* Card */}
                <div
                  className="border-2 border-white/10 rounded-2xl p-6 bg-white/[0.04]"
                  style={{ boxShadow: `5px 5px 0px 0px ${step.color}30` }}
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <span className="text-xl">{step.icon}</span>
                    <h3
                      className="font-display font-black text-xl uppercase tracking-tight"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className="font-display text-sm text-white/60 leading-relaxed">
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
