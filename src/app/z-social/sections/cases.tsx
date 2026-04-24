"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cases = [
  {
    emoji: "🍽️",
    type: "Restaurante",
    color: "#FF6100",
    before: [
      { metric: "500", label: "seguidores" },
      { metric: "50", label: "alcance/post" },
      { metric: "0", label: "leads/mês" },
    ],
    after: [
      { metric: "2.100", label: "seguidores" },
      { metric: "800", label: "alcance/post" },
      { metric: "45", label: "leads/mês" },
    ],
    growth: "+320% seguidores",
    highlight: "12 clientes novos/mês",
    quote: "Pela primeira vez eu vejo que social media gera clientes reais. A ZBRAND transformou meu Instagram.",
    author: "João, Restaurante XYZ",
  },
  {
    emoji: "🥐",
    type: "Padaria",
    color: "#00C2FF",
    before: [
      { metric: "300", label: "seguidores" },
      { metric: "0", label: "estratégia" },
      { metric: "—", label: "leads" },
    ],
    after: [
      { metric: "1.200", label: "seguidores" },
      { metric: "✓", label: "conteúdo constante" },
      { metric: "30", label: "novos clientes/mês" },
    ],
    growth: "+300% seguidores",
    highlight: "30 novos clientes/mês",
    quote: "Eles foram até minha padaria, filmaram, editaram tudo. Ficou profissional mas com toque humano.",
    author: "Maria, Padaria ABC",
  },
  {
    emoji: "🎂",
    type: "Confeitaria",
    color: "#AAFF00",
    before: [
      { metric: "800", label: "seguidores" },
      { metric: "Sazonal", label: "vendas" },
      { metric: "Baixo", label: "ticket médio" },
    ],
    after: [
      { metric: "3.500", label: "seguidores" },
      { metric: "Booked", label: "o ano todo" },
      { metric: "+40%", label: "ticket médio" },
    ],
    growth: "+337% seguidores",
    highlight: "Booked meses antecipados",
    quote: "Meus bolos são uma obra de arte, mas ninguém sabia. A ZBRAND mostrou isso. Agora estou booked!",
    author: "Ana, Confeitaria Premium",
  },
];

function MetricRow({ items, label, dark = false }: { items: { metric: string; label: string }[]; label: string; dark?: boolean }) {
  return (
    <div className={`rounded-xl p-4 ${dark ? "bg-white/06" : "bg-preto/04"}`}>
      <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${dark ? "text-white/30" : "text-preto/30"}`}>
        {label}
      </p>
      <div className="flex gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex flex-col">
            <span className={`font-display font-black text-xl leading-none ${dark ? "text-white/50" : "text-preto/50"}`}>
              {item.metric}
            </span>
            <span className={`text-[10px] font-medium mt-0.5 ${dark ? "text-white/25" : "text-preto/25"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ZSocialCases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-preto py-20 lg:py-28 overflow-hidden">
      {/* Zebra texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px 280px",
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-laranja mb-4">
            Resultados reais
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            Veja o que entregamos{" "}
            <span className="text-laranja">em 4 meses</span>
          </h2>
          <p className="mt-4 font-display text-sm text-white/40 max-w-lg mx-auto leading-relaxed">
            Clientes reais, números reais. Sem promessa de milagre — só trabalho consistente.
          </p>
        </motion.div>

        {/* Cases grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => (
            <motion.div
              key={c.type}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-preto-soft border-2 border-white/10 rounded-2xl p-5 flex flex-col gap-4"
              style={{ boxShadow: `4px 4px 0px 0px ${c.color}40` }}
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl border-2 flex items-center justify-center text-2xl"
                  style={{ borderColor: c.color, background: `${c.color}15` }}
                >
                  {c.emoji}
                </div>
                <div>
                  <p className="font-display font-black text-sm text-white uppercase tracking-tight">
                    {c.type}
                  </p>
                  <p className="text-[10px] font-bold" style={{ color: c.color }}>
                    {c.growth}
                  </p>
                </div>
              </div>

              {/* Before */}
              <MetricRow items={c.before} label="Antes" dark />

              {/* Arrow */}
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-white/10" />
                <div
                  className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                  style={{ backgroundColor: `${c.color}20`, color: c.color }}
                >
                  4 meses depois
                </div>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* After */}
              <div className={`rounded-xl p-4 border`} style={{ background: `${c.color}10`, borderColor: `${c.color}30` }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: c.color }}>
                  Depois
                </p>
                <div className="flex gap-4">
                  {c.after.map((item, j) => (
                    <div key={j} className="flex flex-col">
                      <span className="font-display font-black text-xl leading-none text-white">
                        {item.metric}
                      </span>
                      <span className="text-[10px] font-medium mt-0.5 text-white/40">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight */}
              <div
                className="px-3 py-2 rounded-xl text-center"
                style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}
              >
                <p className="text-xs font-black" style={{ color: c.color }}>
                  ★ {c.highlight}
                </p>
              </div>

              {/* Quote */}
              <blockquote className="border-l-2 pl-3" style={{ borderColor: c.color }}>
                <p className="font-display text-xs text-white/50 leading-relaxed italic">
                  &ldquo;{c.quote}&rdquo;
                </p>
                <p className="text-[10px] font-black text-white/30 mt-1.5 uppercase tracking-wider">
                  — {c.author}
                </p>
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
