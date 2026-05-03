"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const LIME = "#AAFF00";

const featuresMobile = [
  "Sessão presencial 4h",
  "Celular profissional + lapela + iluminação",
  "Roteiro pré-montado incluído",
  "10 vídeos editados (legendas + trilha + cor)",
  "Banco de imagens bruto no Drive",
  "Formato vertical 9:16 (Reels e TikTok)",
  "Entrega em 10 dias",
];

const featuresPro = [
  "Sessão presencial 4h",
  "Câmera profissional + lapela + iluminação",
  "Roteiro pré-montado incluído",
  "10 vídeos editados (legendas + trilha + cor)",
  "20 fotos editadas com tratamento de cor",
  "Formatos horizontal e vertical",
  "Entrega em 10 dias",
];

const featuresEventos = [
  "Cobertura real time do evento",
  "Stories ao vivo durante o evento",
  "1 vídeo resumo editado",
  "Entrega do vídeo em 24h após o evento",
  "Câmera + mobile para cobertura completa",
];

function CheckIcon({ color }: { color: string }) {
  return (
    <div
      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
      style={{ background: `${color}20`, border: `1.5px solid ${color}50` }}
    >
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6l3 3 5-5"
          stroke={color}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function ZCaptacaoPricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="planos" className="bg-white py-20 lg:py-28 overflow-hidden">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p
            className="text-[11px] font-black uppercase tracking-[0.25em] mb-4"
            style={{ color: LIME }}
          >
            Investimento
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight">
            Escolha o plano{" "}
            <span style={{ color: LIME }}>Z-CAPTAÇÃO</span>
          </h2>
          <p className="mt-4 font-display text-base text-cinza-dark max-w-lg mx-auto leading-relaxed">
            Três formatos para diferentes objetivos. Todos incluem roteiro, edição profissional e entrega no Drive.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Card 1 — Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 border-2 border-preto text-[#1A1A1A] font-black text-[10px] uppercase tracking-widest rounded-full whitespace-nowrap"
                style={{ background: LIME, boxShadow: "2px 2px 0px 0px #1A1A1A" }}
              >
                📱 Mais contratado
              </span>
            </div>

            <div
              className="border-2 border-preto rounded-brutal-lg p-6 flex flex-col mt-4 h-full"
              style={{ background: LIME, boxShadow: "5px 5px 0px 0px #1A1A1A" }}
            >
              {/* Label */}
              <div className="mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 bg-black/10 text-[#1A1A1A]">
                  Z-CAPTAÇÃO MOBILE
                </div>
                <h3 className="font-display font-black text-2xl text-[#1A1A1A] uppercase tracking-tight">
                  Celular Profissional
                </h3>
                <p className="text-[11px] text-[#1A1A1A]/60 font-medium mt-1">
                  Social media · Reels · TikTok
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b-2 border-black/10">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-[#1A1A1A]/60">R$</span>
                  <span className="font-display font-black text-5xl leading-none text-[#1A1A1A]">
                    800
                  </span>
                  <span className="font-display text-sm font-bold text-[#1A1A1A]/60 mb-1">/ sessão</span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] font-bold text-[#1A1A1A]/60 bg-black/10 px-2 py-0.5 rounded-full">
                    Entrega em 10 dias
                  </span>
                  <span className="text-[10px] font-bold text-[#1A1A1A]/60 bg-black/10 px-2 py-0.5 rounded-full">
                    Sessão 4h
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {featuresMobile.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon color="#1A1A1A" />
                    <span className="font-display text-sm text-[#1A1A1A]/80 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={getWhatsAppLink("captacao")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal bg-preto text-white transition-all"
                style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.3)" }}
              >
                Agendar sessão Mobile →
              </motion.a>
            </div>
          </motion.div>

          {/* Card 2 — Profissional */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-preto border-2 border-preto text-white font-black text-[10px] uppercase tracking-widest rounded-full whitespace-nowrap"
                style={{ boxShadow: `2px 2px 0px 0px ${LIME}` }}
              >
                🎥 Câmera profissional
              </span>
            </div>

            <div
              className="bg-[#1A1A1A] border-2 rounded-brutal-lg p-6 flex flex-col mt-4 h-full"
              style={{ borderColor: LIME, boxShadow: `5px 5px 0px 0px ${LIME}` }}
            >
              {/* Label */}
              <div className="mb-5">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                  style={{ background: `${LIME}20`, color: LIME }}
                >
                  Z-CAPTAÇÃO PRO
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Câmera Profissional
                </h3>
                <p className="text-[11px] text-white/40 font-medium mt-1">
                  Institucional · Site · LinkedIn
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b-2 border-white/10">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-white/40">R$</span>
                  <span
                    className="font-display font-black text-5xl leading-none"
                    style={{ color: LIME }}
                  >
                    1.500
                  </span>
                  <span className="font-display text-sm font-bold text-white/40 mb-1">/ sessão</span>
                </div>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] font-bold text-white/30 bg-white/10 px-2 py-0.5 rounded-full">
                    Entrega em 10 dias
                  </span>
                  <span className="text-[10px] font-bold text-white/30 bg-white/10 px-2 py-0.5 rounded-full">
                    Sessão 4h
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {featuresPro.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon color={LIME} />
                    <span className="font-display text-sm text-white/70 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={getWhatsAppLink("captacao")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 border-2 border-preto rounded-brutal text-[#1A1A1A] transition-all"
                style={{ backgroundColor: LIME, boxShadow: `3px 3px 0px 0px ${LIME}60` }}
              >
                Agendar sessão Pro →
              </motion.a>
            </div>
          </motion.div>

          {/* Card 3 — Eventos */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span
                className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#1A1A1A] border-2 font-black text-[10px] uppercase tracking-widest rounded-full whitespace-nowrap"
                style={{ borderColor: `${LIME}50`, color: LIME }}
              >
                🎪 Cobertura de eventos
              </span>
            </div>

            <div
              className="bg-[#1A1A1A] rounded-brutal-lg p-6 flex flex-col mt-4 h-full"
              style={{
                border: `2px dashed ${LIME}60`,
                boxShadow: `5px 5px 0px 0px ${LIME}40`,
              }}
            >
              {/* Label */}
              <div className="mb-5">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
                  style={{ background: `${LIME}15`, color: `${LIME}CC` }}
                >
                  Z-CAPTAÇÃO EVENTOS
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-tight">
                  Cobertura Real Time
                </h3>
                <p className="text-[11px] text-white/40 font-medium mt-1">
                  Inaugurações · Festas · Eventos gastronômicos
                </p>
              </div>

              {/* Price */}
              <div className="mb-4 pb-4 border-b-2 border-white/10">
                <div className="flex items-end gap-1">
                  <span className="font-display text-sm font-bold text-white/40">A partir de R$</span>
                  <span
                    className="font-display font-black text-4xl leading-none"
                    style={{ color: `${LIME}CC` }}
                  >
                    1.500
                  </span>
                </div>
                <p className="text-[10px] text-white/30 mt-1">valor varia conforme duração e estrutura</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="text-[10px] font-bold text-white/30 bg-white/10 px-2 py-0.5 rounded-full">
                    Vídeo resumo em 24h
                  </span>
                  <span className="text-[10px] font-bold text-white/30 bg-white/10 px-2 py-0.5 rounded-full">
                    Proposta personalizada
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="flex flex-col gap-3 flex-1 mb-6">
                {featuresEventos.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <CheckIcon color={`${LIME}CC`} />
                    <span className="font-display text-sm text-white/60 leading-snug">{f}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <motion.a
                href={getWhatsAppLink("captacao")}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center font-display font-black text-sm uppercase tracking-widest px-5 py-3.5 rounded-brutal text-[#1A1A1A] transition-all border-2 border-preto"
                style={{
                  backgroundColor: `${LIME}CC`,
                  boxShadow: `3px 3px 0px 0px ${LIME}40`,
                }}
              >
                Solicitar proposta →
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center font-display text-sm text-cinza-text mt-10"
        >
          Todos os planos com <span className="font-bold text-preto">pagamento por sessão</span> •{" "}
          Sem contrato de fidelidade • Pode contratar avulso ou recorrente
        </motion.p>
      </div>
    </section>
  );
}
