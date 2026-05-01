"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const ORANGE = "#FF6100";

const faqs = [
  {
    q: "O que está incluso no Pacote Starter?",
    a: "Gestão de 1 rede social (Instagram ou Facebook) com 15 posts/mês + stories diários, captação presencial 1 dia/mês (4–6h), edição profissional, Meta Ads com até 4 campanhas ativas, relatório integrado semanal cobrindo social e ads, dashboard ZBRAND e reunião mensal de alinhamento.",
  },
  {
    q: "Por que não contratar social media e tráfego pago separado?",
    a: "Separado você paga R$ 1.500 (Z-SOCIAL) + R$ 1.800 (Z-ADS) = R$ 3.300/mês. No Starter são R$ 3.000 — você já economiza R$ 300/mês. Mas o maior ganho é estratégico: uma equipe gerenciando os dois canais com a mesma voz, mesmo material de captação e um relatório único. Dois fornecedores separados nunca geram esse nível de coerência.",
  },
  {
    q: "Qual a diferença entre o Starter e o Pacote Full?",
    a: "O Starter cobre 1 rede social + Meta Ads. O Full cobre 3 redes sociais + Meta + Google Ads + Automação de WhatsApp (bot + IA). Se você quer começar com estrutura sólida antes de escalar para tudo, o Starter é o ponto de entrada ideal. Depois de 4 meses, pode migrar para o Full.",
  },
  {
    q: "Em quanto tempo começo a ver resultado?",
    a: "O perfil nas redes sociais já sobe profissional na semana 3–4. Os anúncios vão ao ar na mesma semana. O resultado dos ads aparece nos primeiros 30 dias — a plataforma aprende o público no 1º mês e otimiza a partir do 2º. O relatório integrado do mês 2 já mostra o ciclo completo funcionando.",
  },
  {
    q: "Posso migrar para o Pacote Full depois?",
    a: "Sim. Ao final do contrato de 4 meses (ou na renovação), você pode migrar para o Full e adicionar mais redes, Google Ads e automação de WhatsApp. A equipe já conhece seu negócio — a migração é fluida.",
  },
  {
    q: "E se eu quiser cancelar antes dos 4 meses?",
    a: "O contrato é de 4 meses porque a estratégia integrada de social + ads precisa de tempo para amadurecer — os melhores resultados aparecem no 2º e 3º mês. Em caso de cancelamento antecipado, cobramos aviso prévio de 30 dias.",
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
      style={open ? { boxShadow: `4px 4px 0px 0px ${ORANGE}` } : { boxShadow: "4px 4px 0px 0px #1A1A1A" }}
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
          style={{ color: ORANGE }}
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

export function ZStarterFaq() {
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
            style={{ color: ORANGE }}
          >
            Dúvidas frequentes
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Você ainda tem{" "}
            <span style={{ color: ORANGE }}>perguntas?</span>
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
