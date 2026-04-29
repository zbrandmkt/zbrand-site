"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Qual o investimento total por mês?",
    a: "R$ 1.200 de mensalidade + R$ 1.000 de verba de anúncios (paga direto ao Meta ou Google — esse valor não passa pela ZBRAND). No total, são aproximadamente R$ 2.200/mês para ter tráfego pago profissional rodando no seu restaurante.",
  },
  {
    q: "Por que o contrato é de 4 meses?",
    a: "Anúncios têm uma curva de aprendizado. Nos primeiros 30 dias a plataforma ainda está 'aprendendo' quem converter — testamos públicos, criativos e horários. Os resultados sólidos chegam a partir do 2º mês. Por isso, 4 meses é o mínimo para a estratégia funcionar de verdade.",
  },
  {
    q: "Vocês filmam o conteúdo para os anúncios?",
    a: "Sim. 1 dia/mês de captação presencial (4–6h) com edição profissional incluída. O criativo (vídeo ou arte) é responsável por 80% do resultado do anúncio — por isso não usamos banco de imagem: filmamos você, seu produto e seu ambiente.",
  },
  {
    q: "Quanto preciso investir em verba de anúncios?",
    a: "R$ 1.000/mês de verba mínima. Com menos que isso, a plataforma não tem volume de dados suficiente para otimizar e os resultados demoram muito mais para aparecer. Quanto mais verba, mais rápido a campanha escala.",
  },
  {
    q: "Posso usar os anúncios para vender no iFood ou Rappi?",
    a: "Sim — e essa é uma estratégia poderosa. Em vez de anunciar dentro dos apps de delivery (que só mostram cardápio para quem já está com fome e comparando preço), a gente cria anúncios no Meta ou Google que apresentam seu produto com vídeo ou imagem atrativa. Quem vê se interessa, segue sua página, interage — e quando quiser pedir, já vai direto pro seu iFood ou Rappi. A margem é menor por conta da comissão da plataforma, mas você conquista um cliente que te conhece, confia e volta. É muito mais eficiente do que aparecer só no cardápio.",
  },
  {
    q: "E se eu não ver resultado?",
    a: "A gente ajusta estratégia, criativo e público até encontrar o que funciona para o seu restaurante. Acompanhamos toda semana — não entregamos relatório e sumimos. Se algo não está convertendo, mudamos antes de virar problema.",
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
