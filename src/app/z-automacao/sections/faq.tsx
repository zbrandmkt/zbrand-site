"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const AMBER = "#FBBC05";

const faqs = [
  {
    q: "Qual a diferença entre o plano Simples e o Complexo?",
    a: "O Simples inclui chatbot + IA generativa para atendimento básico (boas-vindas, agendamento, dúvidas frequentes) sem integração com sistemas externos — ideal para a maioria dos negócios locais. O Complexo adiciona integrações customizadas com site próprio, CRM ou plataformas parceiras, além de fluxos avançados para negócios com múltiplos produtos ou pontos de venda. O diagnóstico inicial define qual se encaixa melhor para você.",
  },
  {
    q: "O bot substitui minha equipe de atendimento?",
    a: "Não — e nem deveria. O bot cuida do repetitivo: responder horário de funcionamento, confirmar agendamentos, enviar catálogo de serviços, coletar dados do cliente. Quando o cliente precisa de atenção especial ou solicita, o bot escala para atendimento humano com um clique. Você mantém controle total e a equipe foca no que realmente exige atenção.",
  },
  {
    q: "O que são os 'disparos em massa' inclusos no plano?",
    a: "Disparos são mensagens promocionais enviadas de uma vez para toda a sua base de contatos via WhatsApp — por exemplo: 'SEXTA ESPECIAL: 30% OFF em todos os serviços hoje!' com um botão de agendamento. Cada plano inclui até 3 disparos por mês. Disparos adicionais são R$50 cada. É muito mais eficiente que um story: a mensagem chega diretamente no celular de quem já é seu cliente.",
  },
  {
    q: "Em quanto tempo começo a ver resultado?",
    a: "Os primeiros fluxos já atendem automaticamente no dia do lançamento (dia 18–20). Mas os dados de conversão (quantos leads viraram clientes) e receita gerada pelo bot ficam claros no relatório do 1º mês completo. Ao contrário de anúncios que precisam de curva de aprendizado, o bot converte desde o primeiro atendimento.",
  },
  {
    q: "O bot funciona com marketplaces e plataformas de terceiros?",
    a: "O bot opera no seu WhatsApp Business. Mas pode direcionar clientes para seu site, loja online ou qualquer plataforma que você use — o cliente vê a promoção no WhatsApp, clica e vai direto para onde você precisa. Também é possível capturar solicitações diretas pelo WhatsApp, sem comissão de plataformas de terceiros. Você define qual fluxo faz mais sentido para o seu negócio.",
  },
  {
    q: "E se eu quiser cancelar antes dos 4 meses?",
    a: "O contrato é de 4 meses porque a automação precisa de tempo para ser ajustada e otimizada — os melhores resultados aparecem no 2º e 3º mês. A implementação é cobrada separado da mensalidade, então o investimento em configuração é seu independente da continuidade. Em caso de cancelamento antecipado, cobramos aviso prévio de 30 dias.",
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
      style={open ? { boxShadow: `4px 4px 0px 0px ${AMBER}` } : { boxShadow: "4px 4px 0px 0px #1A1A1A" }}
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
          style={{ color: AMBER }}
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

export function ZAutomaçaoFaq() {
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
            style={{ color: AMBER }}
          >
            Dúvidas frequentes
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Você ainda tem{" "}
            <span style={{ color: AMBER }}>perguntas?</span>
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
