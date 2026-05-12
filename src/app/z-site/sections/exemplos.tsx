"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const PINK = "#FF3D9A";

interface BusinessType {
  emoji: string;
  label: string;
  color: string;
  slug: string;
  tagline: string;
  benefits: string[];
  mockup: React.FC<{ color: string }>;
}

// ——— Mockup Components ———

function MockupClinica({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Hero */}
      <div className="rounded-lg p-4 text-center" style={{ background: `${color}15` }}>
        <p className="font-black text-xs uppercase tracking-wider mb-1" style={{ color }}>
          CLÍNICA VIDA PLENA
        </p>
        <p className="text-[10px] text-gray-500 mb-2">Agende sua consulta com especialistas</p>
        <div className="flex gap-2 justify-center">
          <span className="text-[9px] font-black px-2 py-1 rounded-full text-white" style={{ background: color }}>
            AGENDAR CONSULTA
          </span>
          <span className="text-[9px] font-black px-2 py-1 rounded-full border" style={{ borderColor: color, color }}>
            ESPECIALIDADES
          </span>
        </div>
      </div>
      {/* Especialidades */}
      <div className="grid grid-cols-3 gap-1.5">
        {["🦷 Odonto", "💆 Fisio", "🧠 Psicologia"].map((cat) => (
          <div key={cat} className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-2 text-center">
            <p className="text-[9px] font-bold text-gray-700">{cat}</p>
          </div>
        ))}
      </div>
      {/* Info row */}
      <div className="flex gap-2">
        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[8px] font-black uppercase text-gray-400">Horário</p>
          <p className="text-[10px] font-bold text-gray-700">Seg-Sex * 8h-18h</p>
        </div>
        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[8px] font-black uppercase text-gray-400">Agendar</p>
          <p className="text-[10px] font-bold" style={{ color }}>WhatsApp →</p>
        </div>
      </div>
    </div>
  );
}

function MockupAcademia({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Hero */}
      <div className="rounded-lg p-3" style={{ background: "#1A1A1A" }}>
        <div className="flex items-center justify-between mb-2">
          <p className="font-black text-xs text-white uppercase tracking-tight">STUDIO FIT</p>
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: color, color: "#fff" }}>
            AULA GRÁTIS
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black" style={{ color }}>1ª aula</span>
          <span className="text-[9px] text-white/60">experimental sem compromisso</span>
        </div>
      </div>
      {/* Modalidades */}
      <div className="flex flex-col gap-1.5">
        {[
          { name: "Musculação", price: "R$ 89/mês" },
          { name: "CrossFit", price: "R$ 129/mês" },
          { name: "Pilates", price: "R$ 149/mês" },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-700">{item.name}</p>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black" style={{ color }}>{item.price}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full text-white" style={{ background: color }}>→</span>
            </div>
          </div>
        ))}
      </div>
      {/* Banner */}
      <div className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <span className="text-base">📅</span>
        <p className="text-[9px] font-bold" style={{ color }}>Veja o horário completo de aulas</p>
      </div>
    </div>
  );
}

function MockupSalao({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="rounded-lg p-3 text-center" style={{ background: `${color}12` }}>
        <p className="font-black text-xs uppercase tracking-widest mb-0.5" style={{ color }}>
          STUDIO BELLA
        </p>
        <p className="text-[9px] text-gray-500">Agende seu horário com as melhores profissionais</p>
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-[9px] bg-white border border-gray-200 rounded-full px-2 py-0.5 font-bold text-gray-600">
            500+ clientes
          </span>
          <span className="text-[9px] bg-white border border-gray-200 rounded-full px-2 py-0.5 font-bold text-gray-600">
            ⭐ 4.9
          </span>
        </div>
      </div>
      {/* Gallery — transformações */}
      <div className="grid grid-cols-3 gap-1">
        {[color, `${color}99`, `${color}60`].map((bg, i) => (
          <div key={i} className="h-10 rounded-lg flex items-center justify-center" style={{ background: bg }}>
            <span className="text-white text-xs">✨</span>
          </div>
        ))}
      </div>
      {/* Agendamento */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
        <p className="text-[9px] font-black uppercase text-gray-400 mb-2">Agendar horário</p>
        <div className="flex flex-col gap-1">
          <div className="bg-white rounded border border-gray-200 px-2 py-1 text-[9px] text-gray-400">
            Serviço desejado
          </div>
          <div className="bg-white rounded border border-gray-200 px-2 py-1 text-[9px] text-gray-400">
            Data e horário
          </div>
          <div
            className="text-center rounded py-1 text-[9px] font-black text-white"
            style={{ background: color }}
          >
            AGENDAR →
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupLoja({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="rounded-lg p-3" style={{ background: "#1A1A1A" }}>
        <p className="font-black text-xs text-white uppercase tracking-tight mb-0.5">LOJA ESSENCIAL 🛍️</p>
        <p className="text-[9px] text-white/50">Compre direto pelo site com entrega rápida</p>
      </div>
      {/* Produtos grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { name: "Camiseta Premium", price: "R$ 89" },
          { name: "Bolsa Couro", price: "R$ 199" },
          { name: "Acessório Gold", price: "R$ 59" },
          { name: "Kit Presente", price: "R$ 149" },
        ].map((item) => (
          <div key={item.name} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
            <p className="text-[9px] font-bold text-gray-700">{item.name}</p>
            <p className="text-[10px] font-black" style={{ color }}>{item.price}</p>
          </div>
        ))}
      </div>
      {/* CTA */}
      <div className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <span className="text-base">💬</span>
        <p className="text-[9px] font-bold" style={{ color }}>Compre pelo WhatsApp — frete grátis acima de R$ 150</p>
      </div>
    </div>
  );
}

function MockupRestaurante({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Hero */}
      <div className="rounded-lg p-4 text-center" style={{ background: `${color}15` }}>
        <p className="font-black text-xs uppercase tracking-wider mb-1" style={{ color }}>
          BURGER DA VILA
        </p>
        <p className="text-[10px] text-gray-500 mb-2">Reserve sua mesa no melhor burger artesanal</p>
        <div className="flex gap-2 justify-center">
          <span className="text-[9px] font-black px-2 py-1 rounded-full text-white" style={{ background: color }}>
            VER CARDÁPIO
          </span>
          <span className="text-[9px] font-black px-2 py-1 rounded-full border" style={{ borderColor: color, color }}>
            RESERVAR MESA
          </span>
        </div>
      </div>
      {/* Categorias */}
      <div className="grid grid-cols-3 gap-1.5">
        {["🥗 Entradas", "🍔 Principais", "🍰 Sobremesas"].map((cat) => (
          <div key={cat} className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-2 text-center">
            <p className="text-[9px] font-bold text-gray-700">{cat}</p>
          </div>
        ))}
      </div>
      {/* Info row */}
      <div className="flex gap-2">
        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[8px] font-black uppercase text-gray-400">Horário</p>
          <p className="text-[10px] font-bold text-gray-700">Seg-Dom * 11h-23h</p>
        </div>
        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[8px] font-black uppercase text-gray-400">Reserva</p>
          <p className="text-[10px] font-bold" style={{ color }}>WhatsApp →</p>
        </div>
      </div>
    </div>
  );
}

function MockupEscritorio({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="rounded-lg p-3 flex items-center justify-between" style={{ background: `${color}12` }}>
        <div>
          <p className="font-black text-xs uppercase tracking-tight" style={{ color }}>
            CONSULTING PRO 🏢
          </p>
          <p className="text-[9px] text-gray-500">Consultoria estratégica para empresas</p>
        </div>
        <span className="text-[9px] font-black px-2 py-1 rounded-full border-2 border-[#1A1A1A] text-[#1A1A1A] bg-white">
          📩 Proposta
        </span>
      </div>
      {/* Cases */}
      <div className="grid grid-cols-3 gap-1">
        {[color, `${color}bb`, `${color}60`].map((bg, i) => (
          <div
            key={i}
            className="rounded-lg flex items-center justify-center"
            style={{ background: bg, height: "36px" }}
          >
            <span className="text-xs text-white">📊</span>
          </div>
        ))}
      </div>
      {/* Form contato */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
        <p className="text-[9px] font-black uppercase text-gray-400 mb-2">Solicite uma proposta</p>
        <div className="grid grid-cols-2 gap-1 mb-1.5">
          <div className="bg-white rounded border border-gray-200 px-2 py-1 text-[9px] text-gray-400">Empresa</div>
          <div className="bg-white rounded border border-gray-200 px-2 py-1 text-[9px] text-gray-400">Serviço</div>
        </div>
        <div
          className="text-center rounded py-1 text-[9px] font-black text-white"
          style={{ background: color }}
        >
          SOLICITAR →
        </div>
      </div>
    </div>
  );
}

// ——— Data ———

const businesses: BusinessType[] = [
  {
    emoji: "🏥",
    label: "Clínica / Saúde",
    color: "#FF6100",
    slug: "clinica",
    tagline: "Agendamento online + portfólio de serviços + depoimentos",
    benefits: [
      "Agendamento online — paciente marca consulta sem ligar",
      "Portfólio de especialidades e serviços em destaque",
      "Depoimentos de pacientes que geram confiança imediata",
      "Localização com Google Maps integrado na página",
      "Botão de WhatsApp fixo para dúvidas e agendamentos",
    ],
    mockup: MockupClinica,
  },
  {
    emoji: "💪",
    label: "Academia / Estúdio",
    color: "#00C2FF",
    slug: "academia",
    tagline: "Planos e preços online + aula experimental + horários",
    benefits: [
      "Planos e preços sempre atualizados — sem dúvida na hora de fechar",
      "Botão de aula experimental gratuita que converte visitante em aluno",
      "Grade de horários das aulas visível e fácil de consultar",
      "Galeria de modalidades com fotos e descrições completas",
      "Aparece no Google para 'academia em [seu bairro]'",
    ],
    mockup: MockupAcademia,
  },
  {
    emoji: "💇",
    label: "Salão de Beleza",
    color: "#7B2FF7",
    slug: "salao",
    tagline: "Portfólio de trabalhos + agendamento + preços",
    benefits: [
      "Galeria de transformações que funciona como vitrine do seu trabalho",
      "Agendamento online: serviço, data e horário direto pelo site",
      "Tabela de preços organizada — cliente já chega decidido",
      "Depoimentos de clientes que geram confiança imediata",
      "Aparece para buscas como 'salão de beleza em [bairro]'",
    ],
    mockup: MockupSalao,
  },
  {
    emoji: "🛍️",
    label: "Loja / E-commerce",
    color: "#FBBC05",
    slug: "loja",
    tagline: "Catálogo de produtos + vendas online + WhatsApp",
    benefits: [
      "Catálogo de produtos com fotos, preços e descrições",
      "Botão de compra via WhatsApp — venda direta sem marketplace",
      "Promoções e kits em destaque na página principal",
      "Link único para compartilhar no Instagram, WhatsApp e TikTok",
      "Frete e condições de pagamento visíveis — menos dúvidas",
    ],
    mockup: MockupLoja,
  },
  {
    emoji: "🍔",
    label: "Restaurante",
    color: "#AAFF00",
    slug: "restaurante",
    tagline: "Cardápio digital + reservas + localização",
    benefits: [
      "Cardápio digital sempre atualizado (sem custo de redesign)",
      "Reserva de mesa online — cliente agenda sem ligar",
      "Localização com Google Maps integrado na página",
      "Galeria dos seus pratos principais em destaque",
      "Botão de WhatsApp fixo para pedidos e reservas",
    ],
    mockup: MockupRestaurante,
  },
  {
    emoji: "🏢",
    label: "Escritório / Consultoria",
    color: PINK,
    slug: "escritorio",
    tagline: "Portfólio de cases + formulário de contato + institucional",
    benefits: [
      "Portfólio de cases com resultados reais e depoimentos",
      "Formulário de contato que filtra leads qualificados",
      "Página institucional que transmite autoridade e credibilidade",
      "Seção de serviços detalhada — cliente entende o que você faz",
      "Aparece no Google para buscas do seu segmento na região",
    ],
    mockup: MockupEscritorio,
  },
];

// ——— Browser Mockup Frame ———

function BrowserMockup({
  business,
  color,
}: {
  business: BusinessType;
  color: string;
}) {
  const MockupContent = business.mockup;

  return (
    <div className="w-full rounded-2xl border-2 border-preto overflow-hidden" style={{ boxShadow: `5px 5px 0px 0px ${color}` }}>
      {/* Browser bar */}
      <div className="bg-[#1A1A1A] px-3 py-2.5 flex items-center gap-2">
        {/* Dots */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        {/* URL bar */}
        <div className="flex-1 flex items-center">
          <div className="mx-auto bg-white/10 rounded-full px-3 py-0.5 flex items-center gap-1.5 min-w-0">
            <svg className="w-2.5 h-2.5 text-white/40 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-[9px] text-white/50 font-mono truncate">
              zbrand.com.br/{business.slug}
            </span>
          </div>
        </div>
      </div>

      {/* Page content */}
      <div className="bg-white p-4 min-h-[280px]">
        <MockupContent color={color} />
      </div>
    </div>
  );
}

// ——— Main Component ———

export function ZSiteExemplos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const current = businesses[active];

  return (
    <section className="bg-[#1A1A1A] py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: PINK }}>
            Casos de uso
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            Veja como fica para{" "}
            <span style={{ color: PINK }}>o seu negócio</span>
          </h2>
          <p className="mt-4 font-display text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            Clique no seu tipo de negócio e veja um exemplo de como seria o seu site.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide"
        >
          {businesses.map((b, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full border-2 font-display font-black text-xs uppercase tracking-wide whitespace-nowrap transition-all shrink-0"
              style={
                active === i
                  ? {
                      backgroundColor: b.color,
                      borderColor: b.color,
                      color: "#1A1A1A",
                      boxShadow: `2px 2px 0px 0px ${b.color}80`,
                    }
                  : {
                      backgroundColor: "transparent",
                      borderColor: "rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.55)",
                    }
              }
            >
              <span>{b.emoji}</span>
              <span>{b.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            {/* Left: description */}
            <div>
              {/* Tag */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-5"
                style={{ background: `${current.color}18`, color: current.color }}
              >
                {current.emoji} {current.label}
              </div>

              <h3 className="font-display font-black text-2xl lg:text-3xl text-white uppercase tracking-tight leading-tight mb-3">
                {current.tagline}
              </h3>

              {/* Benefits */}
              <ul className="flex flex-col gap-3 mb-8">
                {current.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${current.color}20`, border: `1.5px solid ${current.color}40` }}
                    >
                      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke={current.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="font-display text-sm text-white/70 leading-snug">{b}</p>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={getWhatsAppLink("website")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-brutal border-2 border-preto font-display font-black text-sm uppercase tracking-widest transition-all hover:scale-[1.02] text-[#1A1A1A]"
                style={{ backgroundColor: current.color, boxShadow: `3px 3px 0px 0px ${current.color}50` }}
              >
                Quero um site assim →
              </a>
            </div>

            {/* Right: browser mockup */}
            <BrowserMockup business={current} color={current.color} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
