"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Descoberta",
    desc: "Ouvimos tudo sobre o seu restaurante — público, diferenciais, objetivos e desafios. Nada de receita pronta.",
    icon: "🔍",
    tag: "Reunião inicial",
    photoAlt: "Equipe ZBRAND em reunião de briefing com o cliente",
    photoBg: "#1A1A1A",
    photoAccent: "#FF6100",
    photoIcon: "🤝",
    photoCaption: "Briefing presencial ou online",
  },
  {
    number: "02",
    title: "Planejamento",
    desc: "Criamos a estratégia completa — calendário de conteúdo, campanhas de tráfego, metas e KPIs para medir resultado.",
    icon: "📋",
    tag: "Estratégia",
    photoAlt: "Time ZBRAND planejando estratégia no quadro",
    photoBg: "#0F2744",
    photoAccent: "#00C2FF",
    photoIcon: "🗺️",
    photoCaption: "Estratégia personalizada",
  },
  {
    number: "03",
    title: "Captação",
    desc: "Nosso time vai até o seu restaurante gravar. Conteúdo real, com identidade visual forte e roteiro pensado para converter.",
    icon: "🎬",
    tag: "Produção in loco",
    photoAlt: "Equipe ZBRAND gravando conteúdo no restaurante do cliente",
    photoBg: "#1E1035",
    photoAccent: "#7B2FF7",
    photoIcon: "📸",
    photoCaption: "Gravação no seu restaurante",
  },
  {
    number: "04",
    title: "Execução",
    desc: "Publicamos, gerenciamos anúncios, respondemos comentários e monitoramos tudo. Você foca em servir, a gente foca em vender.",
    icon: "🚀",
    tag: "Gestão completa",
    photoAlt: "Analistas ZBRAND monitorando campanhas e resultados",
    photoBg: "#0D2B1A",
    photoAccent: "#AAFF00",
    photoIcon: "💻",
    photoCaption: "Gestão diária das campanhas",
  },
  {
    number: "05",
    title: "Otimização",
    desc: "Toda semana analisamos os dados, ajustamos criativos e verbas. Você recebe relatórios claros e uma equipe que não para de melhorar.",
    icon: "📈",
    tag: "Melhoria contínua",
    photoAlt: "Reunião de análise de resultados com o cliente ZBRAND",
    photoBg: "#2B1A08",
    photoAccent: "#FBBC05",
    photoIcon: "📊",
    photoCaption: "Relatórios e reuniões mensais",
  },
];

// Placeholder de foto com estilo de "foto real por vir"
function PhotoPlaceholder({
  bg, accent, icon, caption, delay,
}: {
  bg: string; accent: string; icon: string; caption: string; delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#1A1A1A]"
      style={{ boxShadow: `5px 5px 0px 0px ${accent}`, background: bg }}
    >
      {/* Gradient radial */}
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 60% 40%, ${accent}35 0%, transparent 70%)` }} />

      {/* Grid lines decorativas */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${accent}50 1px, transparent 1px), linear-gradient(90deg, ${accent}50 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }} />

      {/* Conteúdo central */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
        <div className="w-16 h-16 rounded-2xl border-2 flex items-center justify-center"
          style={{ background: `${accent}20`, borderColor: `${accent}60` }}>
          <span className="text-3xl">{icon}</span>
        </div>
        <div className="text-center">
          <p className="text-[11px] font-black uppercase tracking-widest"
            style={{ color: accent }}>Foto em breve</p>
          <p className="text-[10px] font-medium text-white/40 mt-0.5">{caption}</p>
        </div>
      </div>

      {/* Badge canto */}
      <div className="absolute top-3 right-3">
        <span className="text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-wider"
          style={{ background: `${accent}30`, color: accent, border: `1px solid ${accent}50` }}>
          📷 ZBRAND Team
        </span>
      </div>
    </motion.div>
  );
}

// Card de texto
function StepCard({
  step, delay, align,
}: {
  step: typeof steps[0]; delay: number; align: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 flex flex-col gap-3"
      style={{ boxShadow: `5px 5px 0px 0px #1A1A1A` }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#FF6100]">
          {step.number}
        </span>
        <span className="text-[9px] font-black uppercase tracking-widest bg-[#FF6100]/10 text-[#FF6100] px-2 py-0.5 rounded-full border border-[#FF6100]/20">
          {step.tag}
        </span>
      </div>
      <div>
        <h3 className="font-display font-black text-xl text-[#1A1A1A] uppercase tracking-tight mb-2">
          {step.title}
        </h3>
        <p className="text-sm text-[#1A1A1A]/60 leading-relaxed font-medium">
          {step.desc}
        </p>
      </div>
      <div className="flex items-center gap-2 pt-1 border-t border-[#1A1A1A]/08">
        <span className="text-lg">{step.icon}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{step.tag}</span>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F5F5F0] py-20 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Título */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-3">
            Processo
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-[#1A1A1A] uppercase tracking-tight">
            Como a gente <span className="text-[#FF6100]">trabalha</span>
          </h2>
          <p className="mt-4 text-base text-[#1A1A1A]/50 font-medium max-w-xl mx-auto leading-relaxed">
            Do briefing ao resultado, nossa equipe cuida de cada etapa —
            você só precisa focar no seu restaurante.
          </p>
        </motion.div>

        {/* ── DESKTOP: timeline alternada ── */}
        <div className="hidden lg:block relative">
          {/* Linha central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#1A1A1A]/12 -translate-x-1/2" />

          <div className="flex flex-col gap-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0; // texto esquerda, foto direita
              return (
                <div key={step.number} className="relative grid grid-cols-2 gap-0 items-center">

                  {/* Nó da timeline */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4, type: "spring" }}
                    className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#1A1A1A] bg-white font-display font-black text-sm text-[#FF6100]"
                    style={{ boxShadow: "3px 3px 0px 0px #FF6100" }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Lado esquerdo */}
                  <div className="pr-10">
                    {isLeft ? (
                      <StepCard step={step} delay={0.2 + i * 0.08} align="left" />
                    ) : (
                      <PhotoPlaceholder bg={step.photoBg} accent={step.photoAccent} icon={step.photoIcon} caption={step.photoCaption} delay={0.2 + i * 0.08} />
                    )}
                  </div>

                  {/* Lado direito */}
                  <div className="pl-10">
                    {isLeft ? (
                      <PhotoPlaceholder bg={step.photoBg} accent={step.photoAccent} icon={step.photoIcon} caption={step.photoCaption} delay={0.25 + i * 0.08} />
                    ) : (
                      <StepCard step={step} delay={0.2 + i * 0.08} align="right" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE: timeline lateral esquerda ── */}
        <div className="lg:hidden relative">
          {/* Linha lateral */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-[#1A1A1A]/12" />

          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14"
              >
                {/* Nó da timeline */}
                <div className="absolute left-0 top-0 w-10 h-10 rounded-full border-2 border-[#1A1A1A] bg-white flex items-center justify-center font-display font-black text-xs text-[#FF6100]"
                  style={{ boxShadow: "2px 2px 0px 0px #FF6100" }}>
                  {step.number}
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col gap-3">
                  {/* Foto placeholder — compacta no mobile */}
                  <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-2 border-[#1A1A1A]"
                    style={{ boxShadow: `3px 3px 0px 0px ${step.photoAccent}`, background: step.photoBg }}>
                    <div className="absolute inset-0"
                      style={{ background: `radial-gradient(ellipse at 60% 40%, ${step.photoAccent}35 0%, transparent 70%)` }} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <span className="text-2xl">{step.photoIcon}</span>
                      <p className="text-[9px] font-black uppercase tracking-widest"
                        style={{ color: step.photoAccent }}>Foto em breve</p>
                    </div>
                  </div>

                  {/* Card de texto */}
                  <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4"
                    style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[9px] font-black text-[#FF6100] uppercase tracking-widest">{step.number}</span>
                      <span className="text-[8px] font-black bg-[#FF6100]/10 text-[#FF6100] px-1.5 py-0.5 rounded-full">{step.tag}</span>
                    </div>
                    <h3 className="font-display font-black text-base text-[#1A1A1A] uppercase tracking-tight mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-[13px] text-[#1A1A1A]/55 leading-relaxed font-medium">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
