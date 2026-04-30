"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const AMBER = "#FBBC05";

const steps = [
  {
    number: "01",
    icon: "🔍",
    color: AMBER,
    title: "Descoberta & Mapeamento",
    subtitle: "Dias 1–3",
    desc: "Reunião de briefing para entender seu modelo de negócio. Mapeamos todos os fluxos necessários (boas-vindas, pedido, reserva, feedback, upsell). Nenhum fluxo vai ao ar sem sua aprovação.",
  },
  {
    number: "02",
    icon: "⚙️",
    color: "#FF6100",
    title: "Setup Técnico",
    subtitle: "Dias 4–12",
    desc: "Configuração do WhatsApp Business, Bot Conversa, integração com cardápio web, Mailchimp e Manychat. Toda a infraestrutura do seu bot conectada e testada internamente.",
  },
  {
    number: "03",
    icon: "💬",
    color: "#00C2FF",
    title: "Criação dos Fluxos",
    subtitle: "Dias 8–15",
    desc: "Programação de cada fluxo: mensagens, menus de opção, respostas automáticas, qualificação de leads e escalação para humano quando necessário. Testes completos antes do lançamento.",
  },
  {
    number: "04",
    icon: "🚀",
    color: "#7B2FF7",
    title: "Treinamento & Lançamento",
    subtitle: "Dias 16–20",
    desc: "Reunião ao vivo onde você aprende: como usar o painel, como disparar promoções (mensagens em massa) para toda a base, como ver os relatórios e como escalar para atendimento humano.",
  },
  {
    number: "05",
    icon: "📊",
    color: "#AAFF00",
    title: "Otimização Contínua",
    subtitle: "Mês 2+",
    desc: "Reunião semanal de 30 min para análise de performance: mensagens enviadas, leads qualificados, taxa de conversão e receita gerada pelo bot. Ajustes de fluxo e novos disparos conforme necessário.",
  },
];

export function ZAutomaçaoProcess() {
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
            style={{ color: AMBER }}
          >
            Processo
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Como a gente{" "}
            <span style={{ color: AMBER }}>implementa</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-xl mx-auto leading-relaxed">
            Do primeiro contato até o bot no ar — você acompanha cada etapa sem nenhuma surpresa.
            Implementação em 20 dias para o plano Simples, 30 dias para o Complexo.
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
                  style={{ boxShadow: `3px 3px 0px 0px ${step.color}`, color: step.color === "#AAFF00" ? "#5a8a00" : step.color }}
                >
                  {step.number}
                </motion.div>

                {/* Card */}
                <div
                  className="bg-white border-2 border-preto rounded-2xl p-6"
                  style={{ boxShadow: `5px 5px 0px 0px ${step.color}` }}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="font-display font-black text-xl text-preto uppercase tracking-tight">
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className="font-display text-[10px] font-black uppercase tracking-widest mb-3"
                    style={{ color: step.color === "#AAFF00" ? "#5a8a00" : step.color }}
                  >
                    {step.subtitle}
                  </p>
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
