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

// Bloco de orçamento comum a todos os exemplos: o coração do site de orçamento
function QuoteForm({ color, fields, cta }: { color: string; fields: string[]; cta: string }) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
      <p className="text-[9px] font-black uppercase text-gray-400 mb-2">Peça seu orçamento</p>
      <div className="grid grid-cols-2 gap-1 mb-1.5">
        {fields.map((f) => (
          <div key={f} className="bg-white rounded border border-gray-200 px-2 py-1 text-[9px] text-gray-400">
            {f}
          </div>
        ))}
      </div>
      <div className="text-center rounded py-1 text-[9px] font-black text-white" style={{ background: color }}>
        {cta}
      </div>
    </div>
  );
}

function MockupCarrinho({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg p-4 text-center" style={{ background: `${color}15` }}>
        <p className="font-black text-xs uppercase tracking-wider mb-1" style={{ color }}>
          CHURROS DA PRAÇA 🍩
        </p>
        <p className="text-[10px] text-gray-500 mb-2">Carrinho de churros gourmet para casamentos, 15 anos e eventos</p>
        <div className="flex gap-2 justify-center">
          <span className="text-[9px] font-black px-2 py-1 rounded-full text-white" style={{ background: color }}>
            PEDIR ORÇAMENTO
          </span>
          <span className="text-[9px] font-black px-2 py-1 rounded-full border" style={{ borderColor: color, color }}>
            VER SABORES
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {["💍 Casamento", "🎉 15 anos", "🏢 Corporativo"].map((cat) => (
          <div key={cat} className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-2 text-center">
            <p className="text-[9px] font-bold text-gray-700">{cat}</p>
          </div>
        ))}
      </div>
      <QuoteForm color={color} fields={["Data do evento", "Nº de convidados", "Cidade", "Tipo de evento"]} cta="RECEBER ORÇAMENTO →" />
    </div>
  );
}

function MockupFoodTruck({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg p-3" style={{ background: "#1A1A1A" }}>
        <div className="flex items-center justify-between mb-2">
          <p className="font-black text-xs text-white uppercase tracking-tight">BURGER ON WHEELS 🚚</p>
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: color, color: "#1A1A1A" }}>
            AGENDA ABERTA
          </span>
        </div>
        <p className="text-[9px] text-white/60">Food truck para festas, feiras e eventos corporativos</p>
      </div>
      <div className="flex flex-col gap-1.5">
        {["Cardápio para eventos", "Fotos do truck em ação", "Eventos que já atendemos"].map((item) => (
          <div key={item} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-700">{item}</p>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full text-[#1A1A1A]" style={{ background: color }}>→</span>
          </div>
        ))}
      </div>
      <QuoteForm color={color} fields={["Data", "Local do evento", "Convidados", "Horário"]} cta="CHECAR DISPONIBILIDADE →" />
    </div>
  );
}

function MockupEstacao({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg p-3 text-center" style={{ background: `${color}12` }}>
        <p className="font-black text-xs uppercase tracking-widest mb-0.5" style={{ color }}>
          ESTAÇÃO MASSA FINA
        </p>
        <p className="text-[9px] text-gray-500">Estações de massas e risotos montadas no seu evento</p>
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {["🍝 Massas", "🍚 Risotos", "🥗 Saladas"].map((cat) => (
          <div key={cat} className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-2 text-center">
            <p className="text-[9px] font-bold text-gray-700">{cat}</p>
          </div>
        ))}
      </div>
      <div className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <span className="text-base">📋</span>
        <p className="text-[9px] font-bold" style={{ color }}>Monte seu cardápio e receba a proposta no WhatsApp</p>
      </div>
      <QuoteForm color={color} fields={["Data", "Convidados", "Estações", "Cidade"]} cta="MONTAR MEU EVENTO →" />
    </div>
  );
}

function MockupFotografo({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg p-3" style={{ background: "#1A1A1A" }}>
        <p className="font-black text-xs text-white uppercase tracking-tight mb-0.5">ANA LIMA FOTOGRAFIA 📸</p>
        <p className="text-[9px] text-white/50">Fotografia e filme de casamentos e eventos</p>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[color, `${color}bb`, `${color}70`].map((bg, i) => (
          <div key={i} className="h-10 rounded-lg flex items-center justify-center" style={{ background: bg }}>
            <span className="text-white text-xs">🖼️</span>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[8px] font-black uppercase text-gray-400">Portfólio</p>
          <p className="text-[10px] font-bold text-gray-700">Casamentos · 15 anos</p>
        </div>
        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[8px] font-black uppercase text-gray-400">Depoimentos</p>
          <p className="text-[10px] font-bold" style={{ color }}>Ver casais →</p>
        </div>
      </div>
      <QuoteForm color={color} fields={["Data", "Cidade", "Tipo de evento", "Foto + vídeo?"]} cta="VER SE MINHA DATA ESTÁ LIVRE →" />
    </div>
  );
}

function MockupDoces({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg p-4 text-center" style={{ background: `${color}15` }}>
        <p className="font-black text-xs uppercase tracking-wider mb-1" style={{ color }}>
          ATELIÊ DOCE MEL 🎂
        </p>
        <p className="text-[10px] text-gray-500">Bolos, doces finos e mesas de festa sob encomenda</p>
      </div>
      <div className="grid grid-cols-2 gap-1.5">
        {["Bolos de casamento", "Doces finos", "Mesa de festa", "Lembrancinhas"].map((item) => (
          <div key={item} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
            <p className="text-[9px] font-bold text-gray-700">{item}</p>
            <p className="text-[9px] font-black" style={{ color }}>Ver fotos →</p>
          </div>
        ))}
      </div>
      <QuoteForm color={color} fields={["Data da festa", "Convidados", "Sabores", "Retirada/entrega"]} cta="PEDIR ORÇAMENTO →" />
    </div>
  );
}

function MockupDecoracao({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-lg p-3 flex items-center justify-between" style={{ background: `${color}12` }}>
        <div>
          <p className="font-black text-xs uppercase tracking-tight" style={{ color }}>
            DJ LUCAS SOUND 🎧
          </p>
          <p className="text-[9px] text-gray-500">Som, luz e pista para casamentos e festas</p>
        </div>
        <span className="text-[9px] font-black px-2 py-1 rounded-full border-2 border-[#1A1A1A] text-[#1A1A1A] bg-white">
          ▶ Ouvir set
        </span>
      </div>
      <div className="grid grid-cols-3 gap-1">
        {["🎶 Pacotes", "💡 Iluminação", "🎤 Cerimônia"].map((cat) => (
          <div key={cat} className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-2 text-center">
            <p className="text-[9px] font-bold text-gray-700">{cat}</p>
          </div>
        ))}
      </div>
      <QuoteForm color={color} fields={["Data", "Local", "Convidados", "Duração"]} cta="RESERVAR MINHA DATA →" />
    </div>
  );
}

// ——— Data ———

const businesses: BusinessType[] = [
  {
    emoji: "🍩",
    label: "Carrinho gourmet",
    color: "#FF6100",
    slug: "carrinho-gourmet",
    tagline: "Sabores, fotos dos eventos e orçamento em 1 clique",
    benefits: [
      "Formulário que já pergunta data, cidade e número de convidados",
      "Fotos do carrinho em casamentos, 15 anos e eventos corporativos",
      "Sabores e opções de cardápio organizados, sem precisar mandar PDF",
      "Depoimentos de noivas e cerimonialistas que geram confiança",
      "Aparece no Google para 'carrinho de churros para casamento em [sua cidade]'",
    ],
    mockup: MockupCarrinho,
  },
  {
    emoji: "🚚",
    label: "Food truck / food bike",
    color: "#AAFF00",
    slug: "food-truck",
    tagline: "Cardápio para eventos + agenda + disponibilidade",
    benefits: [
      "Página de eventos separada do dia a dia do truck",
      "Galeria com o truck montado em festas, feiras e empresas",
      "Pedido de orçamento com data, local, horário e convidados",
      "Lista de eventos e marcas que você já atendeu",
      "Botão de WhatsApp fixo para fechar rápido",
    ],
    mockup: MockupFoodTruck,
  },
  {
    emoji: "🍝",
    label: "Estação / buffet",
    color: "#FBBC05",
    slug: "estacao",
    tagline: "Monte o evento: estações, cardápio e proposta",
    benefits: [
      "Cardápio por estação, com fotos de cada montagem",
      "O cliente escolhe as estações antes de falar com você",
      "Proposta chega no WhatsApp já com o número de convidados",
      "Seção para cerimonialistas e casas de eventos indicarem você",
      "Aparece no Google para 'estação de massas para festa em [cidade]'",
    ],
    mockup: MockupEstacao,
  },
  {
    emoji: "📸",
    label: "Fotografia / filmagem",
    color: "#00C2FF",
    slug: "fotografia",
    tagline: "Portfólio que encanta + consulta de data livre",
    benefits: [
      "Portfólio por tipo de evento: casamento, 15 anos, corporativo",
      "Filmes e fotos carregando rápido, mesmo no 4G",
      "Formulário que confere a data antes de você responder",
      "Depoimentos de casais e clientes em destaque",
      "Aparece no Google para 'fotógrafo de casamento em [cidade]'",
    ],
    mockup: MockupFotografo,
  },
  {
    emoji: "🎂",
    label: "Doces / bolos",
    color: PINK,
    slug: "doces",
    tagline: "Catálogo de encomendas + orçamento por festa",
    benefits: [
      "Catálogo de bolos, doces finos e mesas de festa com fotos",
      "Pedido com data, número de convidados e sabores",
      "Prazos de encomenda claros — menos perguntas repetidas",
      "Link único para a bio do Instagram e para o WhatsApp",
      "Aparece no Google para 'bolo de casamento em [cidade]'",
    ],
    mockup: MockupDoces,
  },
  {
    emoji: "🎧",
    label: "Decoração / DJ",
    color: "#7B2FF7",
    slug: "dj",
    tagline: "Pacotes, vídeos e reserva de data",
    benefits: [
      "Pacotes de serviço explicados sem mandar tabela no WhatsApp",
      "Vídeos e fotos de eventos realizados",
      "Reserva de data com local, convidados e duração",
      "Seção de parceiros: cerimonialistas, buffets e casas de eventos",
      "Aparece no Google para buscas do seu serviço na sua região",
    ],
    mockup: MockupDecoracao,
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
              seunegocio.com.br/{business.slug}
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
    <section id="exemplos" className="bg-[#1A1A1A] py-20 lg:py-28 overflow-hidden scroll-mt-24">
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
            <span style={{ color: PINK }}>o seu evento</span>
          </h2>
          <p className="mt-4 font-display text-base text-white/50 max-w-xl mx-auto leading-relaxed">
            Escolha o seu tipo de serviço e veja um exemplo de site de orçamento. Os nomes são fictícios.
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
