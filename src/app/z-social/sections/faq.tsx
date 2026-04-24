"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "Quanto tempo leva para ver resultados?",
    a: "Escala não é rápida. Normalmente em 4–6 semanas você já vê crescimento de seguidores e engajamento. Mas a mágica acontece nos meses 2 e 3, quando a comunidade está engajada e gerando leads de verdade.",
  },
  {
    q: "Vocês garantem crescimento de seguidores?",
    a: "Não prometemos milagres. A gente trabalha com 'melhores esforços'. Se você fizer sua parte (atender bem, entregar bom produto), a gente faz a nossa (conteúdo que conecta, estratégia que vende). Juntos, crescimento é consequência.",
  },
  {
    q: "Posso cancelar antes dos 4 meses?",
    a: "Sim, mas com aviso prévio de 30 dias + multa equivalente a 1 mês. Recomendamos os 4 meses porque é o tempo mínimo para refinar e escalar a estratégia com consistência.",
  },
  {
    q: "Vocês fazem conteúdo com IA?",
    a: "Não. A gente filma você, seu negócio, seus clientes. Conteúdo real, humanizado. Nada de banco de imagem ou IA. Porque pessoas compram de pessoas — e seus clientes sentem a diferença.",
  },
  {
    q: "Como funciona o acompanhamento mensal?",
    a: "Reunião mensal de 30 minutos + relatório mensal com métricas e recomendações. Você acompanha tudo em tempo real no nosso painel do parceiro, com acesso a seguidores, alcance, engajamento e leads gerados.",
  },
  {
    q: "Qual é a melhor rede para começar?",
    a: "Depende do seu público e negócio. Restaurante? Instagram. Confeitaria ou delivery? Instagram + TikTok. B2B ou consultoria? LinkedIn. A gente recomenda na conversa de descoberta — sem compromisso.",
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
      className={`border-2 border-preto rounded-brutal-lg overflow-hidden transition-shadow ${
        open ? "shadow-brutal-laranja" : "shadow-brutal"
      }`}
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
          className="text-laranja font-black text-xl shrink-0"
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

export function ZSocialFaq() {
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
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-laranja mb-4">
            Dúvidas frequentes
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Você ainda tem{" "}
            <span className="text-laranja">perguntas?</span>
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
