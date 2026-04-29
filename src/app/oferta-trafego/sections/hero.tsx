"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function OfertaTrafegoHero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-5 pt-36 pb-24 overflow-hidden bg-[#1A1A1A]"
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(#00C2FF 1px, transparent 1px), linear-gradient(90deg, #00C2FF 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ciano glow — topo centro */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00C2FF]/10 blur-[140px] rounded-full pointer-events-none" />

      {/* Laranja glow — base */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-[#FF6100]/08 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-[#00C2FF]/15 border border-[#00C2FF]/40 rounded-full px-4 py-1.5 mb-8"
        >
          <span className="text-sm">🎯</span>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00C2FF]">
            Meta Ads para Restaurantes
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-black text-white uppercase tracking-tight leading-[1.0] mb-6"
          style={{ fontSize: "clamp(2.2rem, 7vw, 4rem)" }}
        >
          Seus anúncios rodando.{" "}
          <br className="hidden sm:block" />
          <span className="text-[#00C2FF]">Toda semana.</span>
          <br className="hidden sm:block" />
          Por{" "}
          <span
            className="relative inline-block"
            style={{
              textDecoration: "none",
              WebkitTextStroke: "2px #FF6100",
              color: "transparent",
            }}
          >
            R$ 800.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.18, duration: 0.55 }}
          className="text-white/50 text-base leading-relaxed mb-10 max-w-lg mx-auto"
        >
          Gestão completa de campanhas no Meta Ads — segmentação, otimização semanal
          e relatório com ROAS, CAC e conversão. Resultado em 30 dias.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-8"
        >
          <a
            href={getWhatsAppLink("trafego")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-[#00C2FF] border-2 border-[#1A1A1A] text-[#1A1A1A] font-black uppercase tracking-widest text-sm py-4 px-8 rounded-2xl w-full sm:w-auto"
            style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
          >
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Quero começar agora
          </a>
          <a
            href="#como-funciona"
            className="flex items-center justify-center gap-2 border-2 border-white/15 text-white/50 font-black uppercase tracking-widest text-xs py-4 px-8 rounded-2xl hover:border-white/30 hover:text-white/70 transition-all w-full sm:w-auto"
          >
            Ver como funciona ↓
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.42, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {[
            { icon: "📅", text: "Contrato 3 meses" },
            { icon: "🔓", text: "Sem fidelidade forçada" },
            { icon: "📊", text: "Relatório toda semana" },
            { icon: "⚡", text: "Início rápido" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-1.5 text-white/30 text-xs font-medium"
            >
              <span className="text-sm">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">
          Role pra baixo
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.4 }}
          className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/25 text-sm"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
