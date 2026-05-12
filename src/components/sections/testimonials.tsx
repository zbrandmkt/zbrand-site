"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── Categorias ───────────────────────────────────────────────────
const categories = [
  {
    id: "social",
    label: "Social Media",
    icon: "📱",
    color: "#E5006D",
    items: [
      { src: "/images/resultados-social-media/IMG_7795.jpg", label: "Crescimento orgânico", portrait: true, real: true },
      { src: "/images/resultados-social-media/IMG_7796.jpg", label: "Conteúdo real", portrait: true, real: true },
      { src: "/images/resultados-social-media/IMG_7797.jpg", label: "Engajamento", portrait: true, real: true },
      { src: "/images/resultados-social-media/IMG_7798.jpg", label: "Resultado", portrait: true, real: true },
    ],
  },
  {
    id: "trafego",
    label: "Tráfego Pago",
    icon: "🎯",
    color: "#00C2FF",
    items: [
      { label: "Retorno de campanha", portrait: false, real: false },
      { label: "Custo por cliente", portrait: false, real: false },
      { label: "Relatório semanal", portrait: false, real: false },
      { label: "Crescimento de leads", portrait: false, real: false },
    ],
  },
  {
    id: "captacao",
    label: "Captação de Conteúdo",
    icon: "🎬",
    color: "#7B2FF7",
    items: [
      { label: "Bastidores do negócio", portrait: true, real: false },
      { label: "Produto em destaque", portrait: true, real: false },
      { label: "Equipe em ação", portrait: true, real: false },
      { label: "Conteúdo humanizado", portrait: true, real: false },
    ],
  },
  {
    id: "sites",
    label: "Sites & Landing Pages",
    icon: "💻",
    color: "#AAFF00",
    items: [
      { label: "Landing page de conversão", portrait: false, real: false },
      { label: "Site institucional", portrait: false, real: false },
      { label: "Página de captação", portrait: false, real: false },
    ],
  },
  {
    id: "automacao",
    label: "Automação",
    icon: "⚡",
    color: "#FBBC05",
    items: [
      { label: "Fluxo de boas-vindas", portrait: false, real: false },
      { label: "Qualificação de leads", portrait: false, real: false },
      { label: "Atendimento 24h", portrait: false, real: false },
    ],
  },
];

type Item = {
  src?: string;
  label: string;
  portrait: boolean;
  real: boolean;
};

// ─── Card ─────────────────────────────────────────────────────────
function PlaceholderCard({ item, color }: { item: Item; color: string }) {
  const { portrait, real, src, label } = item;

  return (
    <div
      className={[
        "relative overflow-hidden rounded-xl border-[3px] w-full",
        // Mobile: aspect ratio fills the grid cell naturally
        portrait ? "aspect-[9/16]" : "aspect-video",
        // Desktop: fixed large size, override aspect ratio
        portrait
          ? "lg:aspect-auto lg:w-[280px] lg:h-[520px] lg:shrink-0"
          : "lg:aspect-auto lg:w-[460px] lg:h-[290px] lg:shrink-0",
        !real ? "flex flex-col items-center justify-center gap-3" : "",
      ].join(" ")}
      style={{
        borderColor: color,
        boxShadow: `4px 4px 0px 0px ${color}`,
        background: !real ? `${color}10` : undefined,
      }}
    >
      {real && src ? (
        <>
          <Image
            src={src}
            alt={label}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 45vw, 300px"
          />
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
            <span
              className="block px-2 py-0.5 sm:px-2.5 sm:py-1 font-black text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#1A1A1A] border border-[#1A1A1A]"
              style={{ background: color, boxShadow: "1px 1px 0px #1A1A1A" }}
            >
              {label}
            </span>
          </div>
        </>
      ) : (
        <>
          {/* Grid lines texture */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          {/* Icon + text */}
          <div className="relative z-10 flex flex-col items-center gap-2 px-4 text-center">
            <div
              className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: `${color}60`, background: `${color}20` }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                style={{ color }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
            <p
              className="font-display font-black text-[11px] uppercase tracking-widest leading-tight"
              style={{ color }}
            >
              {label}
            </p>
            <p
              className="font-display text-[9px] font-medium uppercase tracking-wider"
              style={{ color: `${color}70` }}
            >
              Em breve
            </p>
          </div>
          {/* Bottom badge */}
          <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3">
            <span
              className="block px-2 py-0.5 sm:px-2.5 sm:py-1 font-black text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#1A1A1A] border border-[#1A1A1A]"
              style={{ background: color, boxShadow: "1px 1px 0px #1A1A1A" }}
            >
              {label}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Showcase Section ─────────────────────────────────────────────
export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeId, setActiveId] = useState("social");
  const scrollRef = useRef<HTMLDivElement>(null);

  const active = categories.find((c) => c.id === activeId)!;

  return (
    <section className="bg-[#F5F5F0] py-20 lg:py-32 overflow-hidden">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-laranja mb-4">
            Portfólio
          </p>
          <h2 className="font-display font-black text-4xl lg:text-6xl text-preto uppercase tracking-tight leading-tight">
            Quem confiou{" "}
            <span className="text-laranja">na zebra</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-lg mx-auto leading-relaxed">
            Resultados reais de clientes reais — organizados por serviço.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex justify-center gap-2 overflow-x-auto pb-3 mb-10 no-scrollbar"
        >
          {categories.map((cat) => {
            const isActive = cat.id === activeId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveId(cat.id);
                  scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
                }}
                className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full border-2 font-display font-black text-[11px] uppercase tracking-widest transition-all duration-200"
                style={{
                  borderColor: isActive ? cat.color : "rgba(26,26,26,0.15)",
                  backgroundColor: isActive ? cat.color : "transparent",
                  color: isActive
                    ? cat.color === "#AAFF00" || cat.color === "#FBBC05"
                      ? "#1A1A1A"
                      : "#fff"
                    : "rgba(26,26,26,0.5)",
                  boxShadow: isActive ? `3px 3px 0px 0px ${cat.color}50` : "none",
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Cards Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/*
              Mobile  (< lg): grid 2 colunas, cards empilhados
              Desktop (>= lg): flex row com scroll horizontal
            */}
            <div
              ref={scrollRef}
              className="grid grid-cols-2 gap-4 lg:flex lg:flex-row lg:overflow-x-auto lg:gap-5 lg:pb-6 lg:no-scrollbar"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {active.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className={[
                    // Landscape: full width on mobile (span 2 cols)
                    !item.portrait ? "col-span-2" : "col-span-1",
                    // Desktop: reset col-span, keep shrink-0 handled by card
                    "lg:col-auto",
                  ].join(" ")}
                  style={{ scrollSnapAlign: "start" }}
                >
                  <PlaceholderCard item={item} color={active.color} />
                </motion.div>
              ))}

              {/* End spacer (desktop only) */}
              <div className="hidden lg:block lg:shrink-0 lg:w-4" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center font-display text-xs text-cinza-text mt-10"
        >
          Resultados reais de clientes da ZBRAND •{" "}
          <span className="font-bold text-preto">
            Sem promessa de milagre, só trabalho consistente.
          </span>
        </motion.p>
      </div>
    </section>
  );
}
