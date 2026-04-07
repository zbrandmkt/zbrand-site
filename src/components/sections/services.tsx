"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Pacotes ──────────────────────────────────────────────────────
const packages = [
  {
    id: "starter",
    name: "Starter",
    emoji: "🌱",
    tagline: "Para quem está começando",
    desc: "Seu restaurante merece aparecer. A gente constrói sua presença digital com consistência desde o primeiro dia.",
    color: "#FF6100",
    features: [
      "Gestão completa de redes sociais",
      "4 posts/semana (feed + stories)",
      "Captação de conteúdo mobile (1x/mês)",
      "Relatório mensal de resultados",
      "Suporte via WhatsApp",
    ],
    cta: "Quero começar",
    popular: false,
    rotation: "-rotate-1",
  },
  {
    id: "zebra",
    name: "Zebra",
    emoji: "🦓",
    tagline: "Para quem quer mais alcance",
    desc: "Você já posta, mas quer resultado de verdade. Chegou a hora de aliar conteúdo com anúncio e começar a escalar.",
    color: "#00C2FF",
    features: [
      "Tudo do Starter +",
      "Tráfego Pago (Meta Ads)",
      "Captação de conteúdo 2x/mês",
      "Dashboard exclusivo de resultados",
      "Relatório semanal com insights",
      "Reunião mensal de estratégia",
    ],
    cta: "Quero o Zebra",
    popular: true,
    rotation: "rotate-1",
  },
  {
    id: "full",
    name: "Full",
    emoji: "🚀",
    tagline: "Para quem quer o máximo",
    desc: "Estratégia completa. Do conteúdo ao anúncio, da automação ao site — tudo integrado pra você focar só em servir.",
    color: "#AAFF00",
    features: [
      "Tudo do Zebra +",
      "Tráfego Orgânico (SEO local)",
      "Website ou Landing Page",
      "Automação WhatsApp 24h",
      "Captação de conteúdo 4x/mês",
      "Gestor dedicado exclusivo",
    ],
    cta: "Quero o Full",
    popular: false,
    rotation: "-rotate-1",
  },
  {
    id: "personalizado",
    name: "Personalizado",
    emoji: "🎛️",
    tagline: "Do jeito que você precisa",
    desc: "Não tem um pacote que encaixa no seu momento? A gente monta junto. Só o que faz sentido pro seu negócio.",
    color: "#7B2FF7",
    features: [
      "Serviços sob medida",
      "Sem contrato engessado",
      "Flexível ao seu orçamento",
      "Escala conforme você cresce",
      "Consultoria inicial gratuita",
    ],
    cta: "Montar meu pacote",
    popular: false,
    rotation: "rotate-1",
    dashed: true,
  },
];

// ─── Serviços Avulsos ─────────────────────────────────────────────
const avulsos = [
  {
    icon: "🎯",
    name: "Tráfego Pago",
    desc: "Anúncios no Meta e Google que trazem cliente — não só clique. Cada real investido com estratégia, segmentação local e foco em resultado real.",
    color: "#FF6100",
  },
  {
    icon: "🔍",
    name: "Tráfego Orgânico",
    desc: "SEO local, Google Meu Negócio e conteúdo que aparece quando o cliente pesquisa 'restaurante perto de mim'. Presença gratuita que trabalha por você.",
    color: "#00C2FF",
  },
  {
    icon: "📱",
    name: "Social Media",
    desc: "Feed, Reels, Stories e gestão de comentários. Conteúdo com identidade, calendário estratégico e uma frequência que não para.",
    color: "#FF6100",
  },
  {
    icon: "🎬",
    name: "Captação de Conteúdo Mobile",
    desc: "A gente vai até o seu restaurante e grava. Conteúdo real, roteirizado pra converter, com a identidade visual do seu negócio.",
    color: "#7B2FF7",
  },
  {
    icon: "💻",
    name: "Website & Landing Page",
    desc: "Site rápido, bonito e que converte. Do domínio ao ar em dias — focado em performance, experiência e geração de leads qualificados.",
    color: "#AAFF00",
  },
  {
    icon: "⚡",
    name: "Automação",
    desc: "Fluxos no WhatsApp que respondem, qualificam e convertem enquanto você foca em cozinhar. Zero lead perdido, atendimento 24h.",
    color: "#FBBC05",
  },
];

// ─── Package Card ─────────────────────────────────────────────────
function PackageCard({ pkg, index, inView }: { pkg: typeof packages[0]; index: number; inView: boolean }) {
  const waLink = `https://wa.me/5500000000000?text=Olá! Tenho interesse no pacote ${pkg.name} da ZBRAND.`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`relative group flex flex-col ${pkg.rotation}`}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full border-2 border-[#1A1A1A] text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] bg-[#00C2FF] whitespace-nowrap"
          style={{ boxShadow: "2px 2px 0px 0px #1A1A1A" }}
        >
          ⭐ Mais escolhido
        </div>
      )}

      {/* Shadow */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: pkg.color, transform: "translate(5px,5px)", opacity: 0.35 }}
      />

      {/* Card */}
      <div
        className={`relative bg-white rounded-2xl flex flex-col flex-1 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 overflow-hidden ${
          pkg.dashed ? "border-dashed border-2" : "border-2"
        }`}
        style={{ borderColor: pkg.color }}
      >
        {/* Top color strip */}
        <div className="h-1.5 w-full" style={{ background: pkg.color }} />

        <div className="p-6 flex flex-col flex-1">
          {/* Icon + name */}
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shrink-0"
              style={{ borderColor: pkg.color, background: `${pkg.color}15` }}
            >
              {pkg.emoji}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">
                Pacote
              </p>
              <h3
                className="font-display font-black text-2xl uppercase tracking-tight leading-none"
                style={{ color: pkg.color }}
              >
                {pkg.name}
              </h3>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-2">
            {pkg.tagline}
          </p>

          {/* Desc */}
          <p className="text-sm text-[#1A1A1A]/60 font-medium leading-relaxed mb-4">
            {pkg.desc}
          </p>

          {/* Divider */}
          <div className="h-px mb-4" style={{ background: `${pkg.color}30` }} />

          {/* Features */}
          <ul className="flex flex-col gap-2 flex-1 mb-5">
            {pkg.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5">
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5"
                  style={{ borderColor: pkg.color, background: `${pkg.color}15` }}
                >
                  <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5} style={{ color: pkg.color }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                  </svg>
                </div>
                <span className="text-xs text-[#1A1A1A]/65 font-medium leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center font-black text-xs py-3.5 px-4 rounded-xl border-2 uppercase tracking-widest transition-all duration-200 text-white"
            style={{
              background: pkg.color,
              borderColor: pkg.color,
              boxShadow: `3px 3px 0px 0px ${pkg.color}60`,
            }}
          >
            {pkg.cta} →
          </a>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Avulso Card ──────────────────────────────────────────────────
function AvulsoCard({ s, index, inView }: { s: typeof avulsos[0]; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative group flex flex-col"
    >
      {/* Shadow */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{ background: s.color, transform: "translate(4px,4px)", opacity: 0.3 }}
      />

      {/* Card */}
      <div
        className="relative bg-[#111111] rounded-2xl border-2 p-5 flex flex-col gap-4 flex-1 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ borderColor: `${s.color}50` }}
      >
        {/* Icon circle */}
        <div
          className="w-12 h-12 rounded-full border-2 flex items-center justify-center text-2xl shrink-0"
          style={{ borderColor: s.color, background: `${s.color}20` }}
        >
          {s.icon}
        </div>

        {/* Title */}
        <h4
          className="font-display font-black text-base uppercase tracking-tight text-white leading-tight"
        >
          {s.name}
        </h4>

        {/* Desc */}
        <p className="text-xs text-white/45 font-medium leading-relaxed flex-1">
          {s.desc}
        </p>

        {/* Divider */}
        <div className="h-px" style={{ background: `${s.color}25` }} />

        {/* CTA */}
        <a
          href={`https://wa.me/5500000000000?text=Quero saber mais sobre ${s.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest transition-all duration-200 group-hover:gap-2.5"
          style={{ color: s.color }}
        >
          + Saiba mais
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

// ─── Seção Principal ──────────────────────────────────────────────
export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const avulsosRef = useRef(null);
  const avulsosInView = useInView(avulsosRef, { once: true, margin: "-60px" });

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
            Pacotes
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            O que a gente faz{" "}
            <span className="text-[#FF6100]">(e faz bem)</span>
          </h2>
          <p className="mt-4 text-base text-white/40 font-medium max-w-xl mx-auto leading-relaxed">
            Escolha o pacote que faz sentido pro seu momento — ou monta um personalizado com a gente.
          </p>
        </motion.div>

        {/* ── Pacotes ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-14">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} inView={inView} />
          ))}
        </div>

        {/* ── Divisor Serviços Avulsos ── */}
        <motion.div
          ref={avulsosRef}
          initial={{ opacity: 0, y: 16 }}
          animate={avulsosInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mt-24 mb-10 text-center"
        >
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to right, transparent, rgba(255,97,0,0.4))" }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6100]/70 px-2">
              Serviços Avulsos
            </span>
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to left, transparent, rgba(255,97,0,0.4))" }} />
          </div>
          <h3 className="font-display font-black text-2xl lg:text-3xl text-white uppercase tracking-tight">
            Contrate só o que você precisa
          </h3>
          <p className="mt-3 text-sm text-white/40 font-medium max-w-lg mx-auto">
            Cada serviço pode ser contratado de forma avulsa ou como parte de um pacote personalizado.
          </p>
        </motion.div>

        {/* ── Cards Avulsos ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-0">
          {avulsos.map((s, i) => (
            <AvulsoCard key={s.name} s={s} index={i} inView={avulsosInView} />
          ))}
        </div>

      </div>

      {/* ── Lamp Effect ── */}
      <div className="relative w-full overflow-hidden mt-16" style={{ height: "320px" }}>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-1/2"
          style={{
            height: "320px",
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
            height: "320px",
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
