"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const LIME = "#AAFF00";

const faqs = [
  {
    q: "O que está incluso no Pacote Full?",
    a: "Gestão de 3 redes sociais (Instagram, Facebook, TikTok) com 30 posts/mês + stories diários, captação presencial 1 dia/mês, edição profissional, Meta Ads + Google Ads (até 4 campanhas ativas), Automação WhatsApp com Bot + IA generativa + 3 disparos de promoção por mês, relatório integrado semanal cobrindo todos os canais, dashboard ZBRAND e reunião mensal de alinhamento.",
  },
  {
    q: "A implementação da automação de WhatsApp está inclusa?",
    a: "Sim. O valor de implementação da automação (R$ 2.000) está incluso no Pacote Full — não é cobrado separado. A automação entra no ar junto com os demais serviços, nos primeiros 15–20 dias.",
  },
  {
    q: "Qual a diferença entre o Starter e o Full?",
    a: "O Starter cobre 1 rede social + Meta Ads. O Full adiciona 2 redes a mais, Google Ads e a Automação de WhatsApp (bot + IA + disparos em massa). Se você está pronto para ter o sistema completo rodando, o Full é para você. Se quer começar com estrutura sólida e escalar depois, comece pelo Starter.",
  },
  {
    q: "Em quanto tempo o sistema todo está funcionando?",
    a: "Social e ads entram no ar entre a semana 3 e 4. O bot de WhatsApp fica pronto entre os dias 15–20. No 1º mês completo você já tem o sistema operando, dados de conversão e o primeiro relatório integrado. Os melhores resultados aparecem no 2º e 3º mês.",
  },
  {
    q: "Posso contratar o Full se já tenho um serviço com a ZBRAND?",
    a: "Sim. Se você já tem Z-SOCIAL ou Z-ADS com a gente, podemos migrar o contrato para o Pacote Full. A equipe já conhece o seu negócio — a transição é mais rápida e o sistema fica sincronizado desde o início.",
  },
  {
    q: "E se eu quiser cancelar antes dos 4 meses?",
    a: "O contrato é de 4 meses porque um sistema integrado de social, ads e automação precisa de tempo para amadurecer e gerar dados reais. Os melhores resultados aparecem no 2º e 3º mês. Em caso de cancelamento antecipado, cobramos aviso prévio de 30 dias.",
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
      style={open ? { boxShadow: `4px 4px 0px 0px ${LIME}` } : { boxShadow: "4px 4px 0px 0px #1A1A1A" }}
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
          style={{ color: LIME }}
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

export function ZFullFaq() {
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
            style={{ color: LIME }}
          >
            Dúvidas frequentes
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Você ainda tem{" "}
            <span style={{ color: LIME }}>perguntas?</span>
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
