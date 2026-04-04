"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const services = [
  {
    tag: "Z-SOCIAL",
    title: "Presença que vende",
    desc: "Para restaurantes que precisam de conteúdo real, sem pauta para gravar sozinho.",
    features: [
      "Captação de Conteúdo (vamos até vc)",
      "Foto e Vídeo Mobile",
      "Reels, feed e stories diários",
      "Gestão completa de comentários",
    ],
    icon: "📱",
    href: "/servicos/social",
    rotation: "-rotate-1",
    borderColor: "#FF6100",
    shadowColor: "#FF6100",
  },
  {
    tag: "Z-ADS",
    title: "Tráfego que converte",
    desc: "Para restaurantes que querem saber exatamente de onde vem cada cliente.",
    features: [
      "Anúncios no Meta e Google",
      "Criativos feitos para restaurantes",
      "Segmentação local precisa",
      "Trackeamento avançado",
    ],
    icon: "🎯",
    href: "/servicos/ads",
    rotation: "rotate-1",
    borderColor: "#00C2FF",
    shadowColor: "#00C2FF",
  },
  {
    tag: "Z-AUTOMAÇÃO",
    title: "Atendimento no automático",
    desc: "Para restaurantes que perdem venda por não responder rápido no WhatsApp.",
    features: [
      "Fluxo de boas-vindas automático",
      "Qualificação e triagem de leads",
      "Agendamento de reservas 24h",
      "Integração com CRM simples",
    ],
    icon: "⚡",
    href: "/servicos/automacao",
    rotation: "-rotate-1",
    borderColor: "#AAFF00",
    shadowColor: "#AAFF00",
  },
];

export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="servicos" className="bg-preto pt-16 lg:pt-24">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-section-title text-white uppercase tracking-tight">
            O que a gente faz{" "}
            <span className="text-laranja">(e faz bem)</span>
          </h2>
          <p className="font-display text-sm text-white/40 mt-3">
            Três produtos, um foco: fazer o seu restaurante crescer de verdade.
          </p>
        </motion.div>

        {/* Cards — mesmo height via grid items-stretch */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {services.map((s, i) => (
            <motion.div
              key={s.tag}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.5 }}
              className={cn("relative group flex flex-col", s.rotation)}
            >
              {/* Shadow layer */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: s.borderColor,
                  transform: "translate(5px, 5px)",
                  opacity: 0.4,
                }}
              />

              {/* Card */}
              <div
                className={cn(
                  "relative bg-white rounded-2xl p-6 flex flex-col flex-1",
                  "border-2",
                  "transition-all duration-300",
                  "group-hover:-translate-x-1 group-hover:-translate-y-1",
                )}
                style={{ borderColor: s.borderColor }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-2"
                  style={{ borderColor: s.borderColor, background: `${s.borderColor}18` }}
                >
                  <span className="text-lg">{s.icon}</span>
                </div>

                {/* Tag name - large, below icon */}
                <span
                  className="font-display font-extrabold text-sm uppercase tracking-widest mb-4"
                  style={{ color: s.borderColor }}
                >
                  {s.tag}
                </span>

                {/* Title */}
                <h3 className="font-display font-bold text-lg text-preto mb-2 uppercase tracking-tight">
                  {s.title}
                </h3>

                {/* Desc */}
                <p className="font-display text-xs text-cinza-dark leading-relaxed mb-4">
                  {s.desc}
                </p>

                {/* Divider */}
                <div className="h-px bg-cinza mb-4" />

                {/* Features */}
                <ul className="flex flex-col gap-2.5 mb-6 flex-1">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <div
                        className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ borderColor: s.borderColor, background: `${s.borderColor}15` }}
                      >
                        <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5} style={{ color: s.borderColor }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                        </svg>
                      </div>
                      <span className="font-display text-xs text-cinza-dark leading-relaxed">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={s.href}
                  className="block w-full text-center font-display font-bold text-xs py-3 px-4 rounded-xl border-2 uppercase tracking-wide transition-all duration-200 text-white"
                  style={{
                    background: s.borderColor,
                    borderColor: s.borderColor,
                    boxShadow: `3px 3px 0px 0px ${s.shadowColor}80`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0px 0px ${s.shadowColor}80`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow = `3px 3px 0px 0px ${s.shadowColor}80`;
                  }}
                >
                  Saiba mais →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Combos teaser */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center font-display text-sm text-white/30 mt-14 pb-0"
        >
          Quer combinar serviços?{" "}
          <span className="text-laranja/60">Temos combos exclusivos — fale com a gente.</span>
        </motion.p>
      </div>

      {/* Lamp effect — upside down (light from bottom going up) */}
      <div className="relative w-full overflow-hidden mt-4" style={{ height: "320px" }}>

        {/* Left beam — triangle from center-bottom spreading left+up */}
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

        {/* Right beam — triangle from center-bottom spreading right+up */}
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

        {/* Glow ellipse at the bottom */}
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

        {/* Neon line at the bottom */}
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

      {/* Smooth preto → branco transition */}
      <div style={{ height: "100px", background: "linear-gradient(to bottom, #1A1A1A, #FFFFFF)" }} />
    </section>
  );
}
