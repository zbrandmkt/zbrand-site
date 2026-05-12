"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const addons = [
  {
    icon: "🎥",
    type: "Gravação Presencial",
    detail: "2h no seu negócio",
    price: "R$ 300",
    deliverable: "3 vídeos prontos pra usar",
    color: "#AAFF00",
  },
  {
    icon: "📦",
    type: "Envio de Produto",
    detail: "Você envia, a gente grava",
    price: "R$ 100",
    deliverable: "3 vídeos prontos pra usar",
    color: "#AAFF00",
  },
];

export function CreativeWarning() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#1A1A1A] py-20 px-5 relative overflow-hidden">
      {/* Zebra texture sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />
      {/* Verde-limão glow no canto */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#AAFF00]/06 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#AAFF00] mb-3">
            Atenção importante
          </p>
          <h2 className="font-black text-3xl sm:text-4xl text-white uppercase leading-tight">
            Criativo é{" "}
            <span
              className="text-[#AAFF00]"
              style={{ textShadow: "0 0 30px rgba(170,255,0,0.3)" }}
            >
              80%
            </span>{" "}
            do resultado.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Coluna esquerda — Alerta */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="bg-[#111] border-2 border-white/08 rounded-2xl p-7"
              style={{ borderLeftColor: "#ef4444", borderLeftWidth: 3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl">
                  ⚠️
                </div>
                <h3 className="font-black text-white text-sm uppercase tracking-tight">
                  O risco do material genérico
                </h3>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-4">
                Se você enviar banco de imagem genérico — foto de stock, imagens sem identidade,
                vídeos sem o seu produto e o seu rosto —{" "}
                <strong className="text-white/70">não podemos garantir resultado.</strong>
              </p>
              <p className="text-white/40 text-sm leading-relaxed">
                Público de Meta Ads para de rolar o feed quando vê algo real.
                Foto de banco de imagem passa batido. Seu rosto, sua história,
                seu produto: isso para.
              </p>
            </div>
          </motion.div>

          {/* Coluna direita — Solução */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="text-center mb-2">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#AAFF00]">
                A solução — add-on opcional
              </span>
            </div>

            {addons.map((addon, i) => (
              <motion.div
                key={addon.type}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="bg-[#111] border-2 rounded-2xl p-5"
                style={{
                  borderColor: "#AAFF00",
                  boxShadow: "3px 3px 0px rgba(170,255,0,0.2)",
                }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: "rgba(170,255,0,0.1)" }}
                  >
                    {addon.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <h4 className="font-black text-white text-sm uppercase tracking-tight">
                        {addon.type}
                      </h4>
                      <span
                        className="font-black text-sm shrink-0"
                        style={{ color: addon.color }}
                      >
                        {addon.price}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs mb-2">{addon.detail}</p>
                    <div
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-1"
                      style={{ background: "rgba(170,255,0,0.1)", border: "1px solid rgba(170,255,0,0.25)" }}
                    >
                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 10" stroke="#AAFF00" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1 5l3.5 3.5L11 1" />
                      </svg>
                      <span className="text-[10px] font-black uppercase tracking-wide" style={{ color: "#AAFF00" }}>
                        {addon.deliverable}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.a
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 }}
              href={getWhatsAppLink("trafego")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full border-2 border-[#AAFF00]/40 text-[#AAFF00] font-black uppercase tracking-widest text-xs py-3.5 rounded-xl hover:bg-[#AAFF00]/05 transition-all mt-1"
            >
              Quero incluir captação no pacote →
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
