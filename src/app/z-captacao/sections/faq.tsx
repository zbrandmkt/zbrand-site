"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const LIME = "#AAFF00";

const faqs = [
  {
    q: "Qual a diferença entre Mobile e Profissional?",
    a: "Mobile = celular profissional com setup completo (lapela + iluminação). O resultado é ótimo para redes sociais — Instagram, TikTok, Reels. Profissional = câmera DSLR/mirrorless, ideal para conteúdo institucional, site, LinkedIn e materiais que exigem aspecto mais corporativo. No Mobile você recebe banco de imagens bruto; no Pro você recebe 20 fotos editadas.",
  },
  {
    q: "Preciso aparecer no conteúdo?",
    a: "Recomendamos que sim — dono ou equipe no vídeo é o que mais engaja e converte. Mas adaptamos: se preferir foco em produto e ambiente, fazemos isso. A gente te orienta no briefing sobre o que funciona melhor para o seu tipo de negócio.",
  },
  {
    q: "O que preciso preparar para o dia de captação?",
    a: "Deixar o ambiente organizado, ter um prato ou produto disponível para filmagem e avisar a equipe que haverá filmagem. A gente chega com roteiro pronto — você só precisa estar presente e à vontade. Nada de improvisar.",
  },
  {
    q: "Posso contratar captação sem ter Social Media ou Ads com a ZBRAND?",
    a: "Sim, 100%. Captação é um serviço standalone. Muitos clientes contratam para usar com sua própria agência ou equipe interna de marketing. O conteúdo é entregue no Drive e você usa como quiser.",
  },
  {
    q: "Posso contratar mais de uma sessão por mês?",
    a: "Sim, sem problema. Cada sessão adicional segue o mesmo valor. Clientes com maior volume de conteúdo costumam fazer 2 sessões por mês — uma focada em produtos, outra em conteúdo de bastidores e talking head.",
  },
  {
    q: "O conteúdo já vem pronto para publicar?",
    a: "Sim. Vídeos editados com legenda automática, corte dinâmico e trilha — no formato vertical 9:16 para Reels e TikTok. No plano Profissional, as fotos vêm com tratamento de cor. Você baixa do Drive e posta direto — sem precisar editar nada.",
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

export function ZCaptacaoFaq() {
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
