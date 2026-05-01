"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PURPLE = "#7B2FF7";

const faqs = [
  {
    q: "Posso montar qualquer combinação de serviços?",
    a: "Sim. Você pode contratar apenas Social Media, apenas Tráfego Pago, apenas o Bot de WhatsApp, ou qualquer combinação entre os três. O único requisito é que para adicionar Google Ads você precisa ter Meta Ads — as duas plataformas são gerenciadas como um conjunto coeso.",
  },
  {
    q: "Os preços do configurador são os valores finais?",
    a: "São valores estimados — calculados com base na tabela padrão de serviços. Após uma conversa de diagnóstico (gratuita), confirmamos tudo por escrito. Em alguns casos o valor pode ser ajustado para cima ou para baixo dependendo da complexidade do projeto.",
  },
  {
    q: "Por que os combos Starter e Full costumam ser mais baratos?",
    a: "Quando dois ou mais serviços são contratados juntos aplicamos um desconto de combo (5% para 2 serviços, 10% para 3). Além disso, o Pacote Starter e o Pacote Full têm preços específicos otimizados para quem sabe exatamente o que quer. No Personalizado você tem a flexibilidade de ajustar — e o mesmo desconto de combo se aplica.",
  },
  {
    q: "Posso mudar de plano depois — por exemplo, migrar para o Full?",
    a: "Sim. Na renovação (após os 4 meses do contrato) você pode adicionar serviços, remover, ou migrar para um pacote fechado (Starter ou Full). A equipe já conhece seu negócio — a transição é fluida.",
  },
  {
    q: "Qual o contrato mínimo?",
    a: "4 meses para todos os serviços. Isso garante tempo suficiente para a estratégia amadurecer: social media cresce do 1º mês, ads otimizam a partir do 2º, automação começa a gerar dados a partir do 1º mês. Em caso de cancelamento antecipado, solicitamos aviso prévio de 30 dias.",
  },
];

function FaqItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.4 }}
      className="border-2 border-preto rounded-brutal-lg overflow-hidden transition-shadow"
      style={
        open
          ? { boxShadow: `4px 4px 0px 0px ${PURPLE}` }
          : { boxShadow: "4px 4px 0px 0px #1A1A1A" }
      }
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 bg-white text-left hover:bg-branco-off transition-colors"
      >
        <span className="font-display font-black text-sm text-preto uppercase tracking-tight leading-snug flex-1">
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="font-black text-xl shrink-0"
          style={{ color: PURPLE }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 bg-branco-off border-t-2 border-preto/08">
              <p className="font-display text-sm text-cinza-dark leading-relaxed pt-4">
                {faq.a}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ZPersonalizadoFaq() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F5F5F0] py-20 lg:py-28">
      <div ref={ref} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: PURPLE }}
          >
            Dúvidas frequentes
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Você ainda tem{" "}
            <span style={{ color: PURPLE }}>perguntas?</span>
          </h2>
        </motion.div>

        {/* FAQ list */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FaqItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
