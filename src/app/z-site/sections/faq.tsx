"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const PINK = "#FF3D9A";

const faqs = [
  {
    q: "Qual a diferença entre landing page e site completo?",
    a: "A landing page é uma página única de alta conversão — ideal para divulgar um serviço, capturar leads ou vender um produto específico. O site completo tem home + páginas internas (catálogo, sobre, contato, blog), painel de edição (CMS) e estrutura para escalar com o tempo. Para começar, a landing page já resolve muito. O site completo é para quem quer uma presença digital robusta.",
  },
  {
    q: "O site vai aparecer no Google?",
    a: "Sim. Todos os nossos projetos incluem SEO básico (title, meta description, Open Graph, sitemap, schema markup de negócio local). O site completo inclui SEO técnico completo + Google Analytics. Com o tempo, seu site vai aparecer para buscas locais como '[seu serviço] em [seu bairro]' — tráfego orgânico e gratuito todo mês.",
  },
  {
    q: "Preciso comprar domínio e hospedagem?",
    a: "Sim, mas é simples e barato — em torno de R$ 80/ano para domínio (.com.br). A gente orienta onde comprar e configura tudo para você. A hospedagem pode ser incluída dependendo do projeto — combinamos antes de começar.",
  },
  {
    q: "Posso editar o conteúdo depois de lançar?",
    a: "O site completo vem com CMS (painel de edição) — você atualiza textos, fotos e conteúdo direto, sem precisar de programador. A landing page não tem CMS, mas qualquer alteração pode ser feita pelo Banco de Horas: você compra um pacote de horas e usa quando precisar, com desconto progressivo.",
  },
  {
    q: "O que acontece se eu precisar de mais páginas depois?",
    a: "No site completo, páginas adicionais podem ser adicionadas via Banco de Horas. Se você começou com landing page e quer escalar para um site completo, fazemos isso — o valor pago na landing é descontado do projeto maior.",
  },
  {
    q: "Vocês fazem site para qualquer tipo de negócio?",
    a: "Sim! Atendemos clínicas, academias, salões de beleza, lojas, restaurantes, escritórios, consultórios, estúdios e qualquer tipo de negócio local. Quanto mais específico for seu negócio, mais a gente consegue criar algo que realmente converte para o seu público.",
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
      style={open ? { boxShadow: `4px 4px 0px 0px ${PINK}` } : { boxShadow: "4px 4px 0px 0px #1A1A1A" }}
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
          style={{ color: PINK }}
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

export function ZSiteFaq() {
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
          <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: PINK }}>
            Dúvidas frequentes
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Você ainda tem{" "}
            <span style={{ color: PINK }}>perguntas?</span>
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
