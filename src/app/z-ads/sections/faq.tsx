"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Quanto custa?",
    a: "O investimento tem duas partes: a gestão da Zibrand e a verba de anúncios, que você paga direto ao Meta ou ao Google. Os valores são definidos no diagnóstico gratuito, de acordo com a sua região e as épocas que você quer encher a agenda.",
  },
  {
    q: "Por que o contrato é de 4 meses?",
    a: "Anúncios têm uma curva de aprendizado. Nos primeiros 30 dias a plataforma ainda está 'aprendendo' quem converter — testamos públicos, criativos e horários. Os resultados sólidos chegam a partir do 2º mês. Por isso, 4 meses é o mínimo para a estratégia funcionar de verdade.",
  },
  {
    q: "Quem grava o conteúdo dos anúncios?",
    a: "Você, no próprio evento, seguindo o roteiro que a gente manda — e a edição profissional fica com a Zibrand. O criativo é o que mais pesa no resultado do anúncio, por isso não usamos banco de imagem: mostramos o seu carrinho, o seu truck, o seu trabalho de verdade.",
  },
  {
    q: "Quanto preciso investir em verba de anúncios?",
    a: "Depende da sua cidade e do tipo de evento. No diagnóstico a gente indica uma verba mínima que dê volume para a plataforma otimizar. Com pouco investimento, os resultados demoram muito mais para aparecer.",
  },
  {
    q: "Dá pra anunciar só na época forte?",
    a: "Dá, mas o ideal é o contrário: começar antes da temporada. Noivas fecham fornecedores com meses de antecedência e empresas planejam confraternizações em setembro e outubro. A gente monta o calendário de campanhas para chegar antes do concorrente e também para preencher os meses mais fracos.",
  },
  {
    q: "E se eu não ver resultado?",
    a: "A gente ajusta estratégia, criativo e público até encontrar o que funciona para o seu serviço. Acompanhamos toda semana — não entregamos relatório e sumimos. Se algo não está trazendo orçamento, mudamos antes de virar problema.",
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
      style={open ? { boxShadow: "4px 4px 0px 0px #00C2FF" } : { boxShadow: "4px 4px 0px 0px #1A1A1A" }}
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
          style={{ color: "#00C2FF" }}
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

export function ZAdsFaq() {
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
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#00C2FF] mb-4">
            Dúvidas frequentes
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Você ainda tem{" "}
            <span className="text-[#00C2FF]">perguntas?</span>
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
