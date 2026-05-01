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

function MockupRestaurante({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Hero */}
      <div className="rounded-lg p-4 text-center" style={{ background: `${color}15` }}>
        <p className="font-black text-xs uppercase tracking-wider mb-1" style={{ color }}>
          BURGER DA VILA
        </p>
        <p className="text-[10px] text-gray-500 mb-2">Burger artesanal no coração do bairro</p>
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
          <p className="text-[10px] font-bold text-gray-700">Seg–Dom • 11h–23h</p>
        </div>
        <div className="flex-1 bg-gray-50 rounded-lg px-3 py-2">
          <p className="text-[8px] font-black uppercase text-gray-400">Reserva</p>
          <p className="text-[10px] font-bold" style={{ color }}>WhatsApp →</p>
        </div>
      </div>
    </div>
  );
}

function MockupDelivery({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Hero */}
      <div className="rounded-lg p-3" style={{ background: "#1A1A1A" }}>
        <div className="flex items-center justify-between mb-2">
          <p className="font-black text-xs text-white uppercase tracking-tight">COZINHA DO PEDRO</p>
          <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full" style={{ background: color, color: "#fff" }}>
            ABERTO
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-black" style={{ color }}>0%</span>
          <span className="text-[9px] text-white/60">de comissão — pedido direto</span>
        </div>
      </div>
      {/* Pratos */}
      <div className="flex flex-col gap-1.5">
        {[
          { name: "Marmita Fit", price: "R$ 19" },
          { name: "Combo Família", price: "R$ 49" },
          { name: "Prato do Dia", price: "R$ 24" },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
            <p className="text-[10px] font-bold text-gray-700">{item.name}</p>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black" style={{ color }}>{item.price}</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full text-white" style={{ background: color }}>+</span>
            </div>
          </div>
        ))}
      </div>
      {/* Banner */}
      <div className="rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <span className="text-base">🛵</span>
        <p className="text-[9px] font-bold" style={{ color }}>Frete grátis acima de R$ 50</p>
      </div>
    </div>
  );
}

function MockupBuffet({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="rounded-lg p-3 text-center" style={{ background: `${color}12` }}>
        <p className="font-black text-xs uppercase tracking-widest mb-0.5" style={{ color }}>
          BUFFET BELLAGIO
        </p>
        <p className="text-[9px] text-gray-500">Eventos Corporativos & Casamentos</p>
        <div className="flex justify-center gap-2 mt-2">
          <span className="text-[9px] bg-white border border-gray-200 rounded-full px-2 py-0.5 font-bold text-gray-600">
            300+ eventos
          </span>
          <span className="text-[9px] bg-white border border-gray-200 rounded-full px-2 py-0.5 font-bold text-gray-600">
            ⭐ 4.9
          </span>
        </div>
      </div>
      {/* Gallery */}
      <div className="grid grid-cols-3 gap-1">
        {[color, `${color}99`, `${color}60`].map((bg, i) => (
          <div key={i} className="h-10 rounded-lg flex items-center justify-center" style={{ background: bg }}>
            <span className="text-white text-xs">📸</span>
          </div>
        ))}
      </div>
      {/* Form snippet */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
        <p className="text-[9px] font-black uppercase text-gray-400 mb-2">Solicitar orçamento</p>
        <div className="flex flex-col gap-1">
          <div className="bg-white rounded border border-gray-200 px-2 py-1 text-[9px] text-gray-400">
            Tipo de evento
          </div>
          <div className="bg-white rounded border border-gray-200 px-2 py-1 text-[9px] text-gray-400">
            Nº de pessoas
          </div>
          <div
            className="text-center rounded py-1 text-[9px] font-black text-white"
            style={{ background: color }}
          >
            ENVIAR →
          </div>
        </div>
      </div>
    </div>
  );
}

function MockupCarrinho({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="rounded-lg p-3" style={{ background: "#1A1A1A" }}>
        <p className="font-black text-xs text-white uppercase tracking-tight mb-0.5">CHURRUTS 🌮</p>
        <p className="text-[9px] text-white/50">Churrasco artesanal itinerante</p>
      </div>
      {/* Onde estamos */}
      <div className="rounded-lg p-3 border-2" style={{ borderColor: color }}>
        <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color }}>
          📍 Onde estamos essa semana
        </p>
        <div className="flex flex-col gap-1">
          {[
            { day: "Sex 17", place: "Vila Madalena" },
            { day: "Sáb 18", place: "Pinheiros" },
            { day: "Dom 19", place: "Itaim Bibi" },
          ].map((loc) => (
            <div key={loc.day} className="flex items-center justify-between bg-gray-50 rounded px-2 py-1">
              <span className="text-[9px] font-bold text-gray-500">{loc.day}</span>
              <span className="text-[9px] font-black" style={{ color }}>{loc.place}</span>
            </div>
          ))}
        </div>
      </div>
      {/* CTA evento */}
      <button
        className="w-full rounded-lg py-2 text-[9px] font-black uppercase tracking-widest border-2 border-[#1A1A1A] text-white"
        style={{ background: color }}
      >
        RESERVE PARA SEU EVENTO →
      </button>
    </div>
  );
}

function MockupCafeteria({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="rounded-lg p-3" style={{ background: `${color}12` }}>
        <p className="font-black text-xs uppercase tracking-tight mb-1" style={{ color }}>
          CAFÉ MOMENTO ☕
        </p>
        <div className="flex gap-2">
          <span className="text-[9px] bg-white border border-gray-200 rounded-full px-2 py-0.5 font-bold text-gray-600">
            🐾 Pet friendly
          </span>
          <span className="text-[9px] bg-white border border-gray-200 rounded-full px-2 py-0.5 font-bold text-gray-600">
            📶 WiFi
          </span>
        </div>
      </div>
      {/* Cardápio grid */}
      <div className="grid grid-cols-2 gap-1.5">
        {[
          { name: "Espresso", price: "R$ 7" },
          { name: "Capuccino", price: "R$ 12" },
          { name: "Brownie", price: "R$ 10" },
          { name: "Croissant", price: "R$ 9" },
        ].map((item) => (
          <div key={item.name} className="bg-gray-50 rounded-lg p-2 border border-gray-100">
            <p className="text-[9px] font-bold text-gray-700">{item.name}</p>
            <p className="text-[10px] font-black" style={{ color }}>{item.price}</p>
          </div>
        ))}
      </div>
      {/* Clube */}
      <div
        className="rounded-lg p-2.5 flex items-center gap-2"
        style={{ background: "#1A1A1A" }}
      >
        <span className="text-base">☕</span>
        <div>
          <p className="text-[9px] font-black text-white uppercase">Clube do Café</p>
          <p className="text-[8px] text-white/50">R$ 89/mês — café ilimitado</p>
        </div>
        <span className="ml-auto text-[8px] font-black px-2 py-0.5 rounded-full" style={{ background: color, color: "#fff" }}>
          VER
        </span>
      </div>
    </div>
  );
}

function MockupConfeitaria({ color }: { color: string }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Header */}
      <div className="rounded-lg p-3 flex items-center justify-between" style={{ background: `${color}12` }}>
        <div>
          <p className="font-black text-xs uppercase tracking-tight" style={{ color }}>
            DOCES DA CAROL 🍰
          </p>
          <p className="text-[9px] text-gray-500">Bolos artesanais sob encomenda</p>
        </div>
        <span className="text-[9px] font-black px-2 py-1 rounded-full border-2 border-[#1A1A1A] text-[#1A1A1A] bg-white">
          ⏰ 5 dias
        </span>
      </div>
      {/* Gallery masonry */}
      <div className="grid grid-cols-3 gap-1">
        {[color, `${color}bb`, "#f9e4ef", color, `${color}80`, "#ffe0ef"].map((bg, i) => (
          <div
            key={i}
            className={`rounded-lg flex items-center justify-center ${i === 0 || i === 3 ? "row-span-1" : ""}`}
            style={{ background: bg, height: i % 2 === 0 ? "36px" : "28px" }}
          >
            <span className="text-xs">🎂</span>
          </div>
        ))}
      </div>
      {/* Encomenda form */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
        <p className="text-[9px] font-black uppercase text-gray-400 mb-2">Encomendar</p>
        <div className="grid grid-cols-2 gap-1 mb-1.5">
          <div className="bg-white rounded border border-gray-200 px-2 py-1 text-[9px] text-gray-400">Sabor</div>
          <div className="bg-white rounded border border-gray-200 px-2 py-1 text-[9px] text-gray-400">Tamanho</div>
        </div>
        <div
          className="text-center rounded py-1 text-[9px] font-black text-white"
          style={{ background: color }}
        >
          ENCOMENDAR →
        </div>
      </div>
    </div>
  );
}

// ——— Data ———

const businesses: BusinessType[] = [
  {
    emoji: "🍔",
    label: "Restaurante",
    color: "#FF6100",
    slug: "restaurante",
    tagline: "Cardápio digital + reserva de mesa + Google Maps",
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
    emoji: "🛵",
    label: "Delivery",
    color: "#00C2FF",
    slug: "delivery",
    tagline: "Pedido direto — 0% de comissão de app",
    benefits: [
      "Pedido direto pelo site — sem pagar 12–30% de comissão ao app",
      "Link único para compartilhar no Instagram, WhatsApp e TikTok",
      "Promoções e combos em destaque na página principal",
      "Cardápio com fotos, preços e descrições completas",
      "Banner de frete grátis que incentiva ticket médio maior",
    ],
    mockup: MockupDelivery,
  },
  {
    emoji: "🎪",
    label: "Buffet para Eventos",
    color: "#7B2FF7",
    slug: "buffet",
    tagline: "Portfólio + orçamento online + depoimentos",
    benefits: [
      "Galeria fotográfica de eventos realizados (a sua vitrine)",
      "Formulário de orçamento: data, nº de pessoas, tipo de evento",
      "Depoimentos de clientes que geram confiança imediata",
      "Pacotes com tudo incluso — cliente sabe o que vai pagar",
      "Aparece para buscas como 'buffet para casamento em [cidade]'",
    ],
    mockup: MockupBuffet,
  },
  {
    emoji: "🌮",
    label: "Carrinho Gourmet",
    color: "#FBBC05",
    slug: "carrinho",
    tagline: "Agenda itinerante + reserva de eventos privados",
    benefits: [
      '"Onde estamos essa semana" — agenda rotativa por bairro',
      "Formulário para reservar o carrinho para eventos privados",
      "Cardápio visual com fotos dos produtos em destaque",
      "Histórico de locações que mostra movimento e credibilidade",
      "Clientes te seguem e sabem onde você estará no fim de semana",
    ],
    mockup: MockupCarrinho,
  },
  {
    emoji: "☕",
    label: "Cafeteria",
    color: "#AAFF00",
    slug: "cafeteria",
    tagline: "Cardápio visual + clube de fidelidade + produtos",
    benefits: [
      "Cardápio visual de bebidas e doces com fotos e preços",
      "Informações de horários, WiFi e pet friendly em destaque",
      "Clube de fidelidade / assinatura que fideliza o cliente",
      "Loja de produtos próprios: blend, merchandise, kits",
      "Aparece no Google para 'cafeteria em [bairro]'",
    ],
    mockup: MockupCafeteria,
  },
  {
    emoji: "🍰",
    label: "Confeitaria",
    color: PINK,
    slug: "confeitaria",
    tagline: "Catálogo + encomenda online + portfólio",
    benefits: [
      "Catálogo de bolos com fotos reais, sabores e tamanhos",
      "Formulário de encomenda: sabor, tamanho, data, mensagem",
      "Prazo mínimo de 5 dias em destaque — evita pedidos impossíveis",
      "Galeria de portfolio que mostra a qualidade do trabalho",
      "Depoimentos de clientes que aumentam a conversão",
    ],
    mockup: MockupConfeitaria,
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
