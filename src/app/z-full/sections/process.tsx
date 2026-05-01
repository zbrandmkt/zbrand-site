"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const LIME = "#AAFF00";

const steps = [
  {
    number: "01",
    icon: "🔍",
    color: LIME,
    title: "Diagnóstico Completo",
    time: "Semana 1",
    desc: "Briefing unificado: social, ads e automação mapeados na mesma reunião. Fluxos do bot, perfis de plataforma, público dos anúncios — tudo com a mesma estratégia base.",
  },
  {
    number: "02",
    icon: "⚙️",
    color: "#FF6100",
    title: "Setup Integrado",
    time: "Semanas 2–3",
    desc: "Calendário editorial para 3 redes + configuração das campanhas Meta e Google + fluxos do bot montados em paralelo. Mesma voz de marca em todos os canais.",
  },
  {
    number: "03",
    icon: "🎬",
    color: "#00C2FF",
    title: "Captação Presencial",
    time: "Semanas 2–3",
    desc: "1 dia no negócio (4–6h). O material serve para as 3 redes, stories, criativos de ads e mensagens do bot de WhatsApp. Zero produção duplicada.",
  },
  {
    number: "04",
    icon: "🚀",
    color: "#FBBC05",
    title: "Lançamento Coordenado",
    time: "Semanas 3–4",
    desc: "Perfil ativo nas 3 redes + campanhas no ar + bot configurado — tudo simultâneo. Quando o anúncio converte, o bot já está pronto para atender o pico.",
  },
  {
    number: "05",
    icon: "📊",
    color: "#7B2FF7",
    title: "Otimização do Sistema",
    time: "Meses 2+",
    desc: "Relatório unificado toda semana cobrindo social, ads e bot. Ajustes coordenados a partir dos mesmos dados. Disparo mensal de promoção via bot para a base de clientes.",
  },
];

export function ZFullProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F5F5F0] py-20 lg:py-28 overflow-hidden">
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
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Como o sistema{" "}
            <span style={{ color: LIME }}>entra em operação</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-xl mx-auto leading-relaxed">
            Do briefing ao sistema completo no ar — integrado, sem surpresas, no prazo.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-preto/10" />

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
                  className="absolute left-0 top-4 w-12 h-12 rounded-full border-2 border-preto bg-white flex items-center justify-center font-display font-black text-sm -translate-y-1/2"
                  style={{ boxShadow: `3px 3px 0px 0px ${step.color}`, color: step.color }}
                >
                  {step.number}
                </motion.div>

                {/* Card */}
                <div
                  className="bg-white border-2 border-preto rounded-2xl p-6"
                  style={{ boxShadow: `5px 5px 0px 0px ${step.color}` }}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{step.icon}</span>
                      <h3 className="font-display font-black text-xl text-preto uppercase tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                    <span
                      className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shrink-0"
                      style={{ background: `${step.color}18`, color: step.color }}
                    >
                      {step.time}
                    </span>
                  </div>
                  <p className="font-display text-sm text-cinza-dark leading-relaxed">
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
