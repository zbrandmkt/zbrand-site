"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

// ─── Esteira: o cliente entra pelo degrau 1 e vai subindo ─────────
const esteira = [
  {
    step: 1,
    icon: "💻",
    name: "Site de orçamento",
    desc: "Sua vitrine profissional: fotos, cardápio, eventos que você atende e um botão de orçamento que já pergunta data, local e número de convidados.",
    result: "Mais pedidos de orçamento qualificados",
    color: "#FF6100",
    href: "/servicos/website",
  },
  {
    step: 2,
    icon: "🎯",
    name: "Tráfego pago",
    desc: "Anúncios no Meta e no Google para quem está organizando casamento, 15 anos ou evento corporativo — na época certa, para encher a agenda antes dos meses vazios.",
    result: "Demanda na data que você precisa",
    color: "#E5006D",
    href: "/servicos/trafego-pago",
  },
  {
    step: 3,
    icon: "⚡",
    name: "WhatsApp automático (Zee)",
    desc: "A Zee, nossa assistente de IA, responde na hora, coleta data, local e convidados e entrega o orçamento pronto pra você fechar — mesmo quando você está no evento.",
    result: "Nenhum orçamento esquecido",
    color: "#7B2FF7",
    href: "/servicos/automacao",
  },
  {
    step: 4,
    icon: "📱",
    name: "Social media automatizado",
    desc: "Presença constante no Instagram com IA, templates e vídeos produzidos em lote. Seu perfil ativo sem tirar você da operação.",
    result: "Perfil vivo o ano inteiro",
    color: "#0099CC",
    href: "/servicos/social-media",
  },
];

// ─── Card de um degrau ────────────────────────────────────────────
function StepCard({ s, index, inView }: { s: (typeof esteira)[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.05 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      <div
        className="relative bg-white rounded-2xl border-2 p-6 flex flex-col gap-4 flex-1 transition-all duration-200"
        style={{ borderColor: s.color, boxShadow: `5px 5px 0px 0px ${s.color}` }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px 0px ${s.color}`;
          (e.currentTarget as HTMLElement).style.transform = "translate(3px,3px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0px 0px ${s.color}`;
          (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
        }}
      >
        {/* Degrau + ícone */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shrink-0"
            style={{ borderColor: s.color, background: `${s.color}18` }}
          >
            {s.icon}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/35">
              Passo {s.step}
            </p>
            <h3
              className="font-display font-black text-lg uppercase tracking-tight leading-tight"
              style={{ color: s.color }}
            >
              {s.name}
            </h3>
          </div>
        </div>

        <p className="text-sm text-[#1A1A1A]/55 font-medium leading-relaxed flex-1">{s.desc}</p>

        <div className="h-px" style={{ background: `${s.color}25` }} />

        <p className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/60">
          ✓ {s.result}
        </p>

        <Link
          href={s.href}
          className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest transition-all duration-200 hover:gap-3"
          style={{ color: s.color }}
        >
          Ver como funciona
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Seção Principal ──────────────────────────────────────────────
export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicos" className="bg-[#1A1A1A] pt-16 lg:pt-24">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">

        {/* ── Título ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-3">
            Como a Zibrand assessora você
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Um sistema para{" "}
            <span className="text-[#FF6100]">vender mais eventos</span>
          </h2>
          <p className="mt-4 text-base text-white/40 font-medium max-w-2xl mx-auto leading-relaxed">
            Não vendemos posts. Montamos o caminho completo, do primeiro clique ao orçamento fechado.
            Você começa pelo passo que faz mais falta hoje e vai subindo.
          </p>
        </motion.div>

        {/* ── Esteira (4 passos) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 items-stretch">
          {esteira.map((s, i) => (
            <StepCard key={s.name} s={s} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Complemento: captação ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-white/40 font-medium">
            🎬 Precisa de vídeos do seu carrinho ou do seu trabalho em ação?{" "}
            <Link href="/servicos/captacao" className="text-[#FF6100] font-bold hover:underline">
              Conheça a captação de conteúdo
            </Link>
            .
          </p>
          <a
            href={getWhatsAppLink("geral")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm inline-block mt-8"
          >
            NÃO SEI POR ONDE COMEÇAR
          </a>
        </motion.div>

      </div>

      {/* ── Lamp Effect ── */}
      <div className="relative w-full overflow-hidden mt-4" style={{ height: "220px" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-1/2"
          style={{
            height: "220px",
            background: "linear-gradient(to top, rgba(255,97,0,0.9) 0%, rgba(255,97,0,0.15) 60%, transparent 100%)",
            clipPath: "polygon(100% 100%, 100% 100%, 0% 0%, 0% 0%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="absolute bottom-0 right-0 w-1/2"
          style={{
            height: "220px",
            background: "linear-gradient(to top, rgba(255,97,0,0.9) 0%, rgba(255,97,0,0.15) 60%, transparent 100%)",
            clipPath: "polygon(0% 100%, 0% 100%, 100% 0%, 100% 0%)",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scaleX: 0.3 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
          className="absolute left-1/2 -translate-x-1/2 rounded-full blur-3xl"
          style={{
            bottom: "0px",
            width: "700px",
            height: "180px",
            background: "radial-gradient(ellipse at 50% 100%, rgba(255,97,0,0.55) 0%, rgba(255,97,0,0.2) 40%, transparent 75%)",
          }}
        />
        <motion.div
          initial={{ width: "8rem", opacity: 0 }}
          whileInView={{ width: "42rem", opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.9, ease: "easeOut" }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          style={{
            height: "2px",
            background: "linear-gradient(to right, transparent, #FF8C42, #FFFFFF, #FF8C42, transparent)",
            boxShadow: "0 0 10px 3px rgba(255,97,0,1), 0 0 30px 8px rgba(255,97,0,0.6), 0 0 70px 20px rgba(255,97,0,0.25)",
          }}
        />
      </div>

      {/* Smooth transition */}
      <div style={{ height: "100px", background: "linear-gradient(to bottom, #1A1A1A, #FFFFFF)" }} />
    </section>
  );
}
