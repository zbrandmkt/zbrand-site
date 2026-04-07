"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ─── Dados dos Pacotes ────────────────────────────────────────────
const packages = [
  {
    id: "starter",
    name: "Starter",
    emoji: "🌱",
    tagline: "Para quem está começando",
    desc: "Comece a movimentar sua presença digital com consistência. Ideal para quem não tem tempo e entende que precisa manter a frequência.",
    color: "#FF6100",
    features: [
      "Gestão completa de 1 rede social",
      "Post dia sim dia não",
      "Captação de conteúdo mobile",
      "Gestão de Tráfego — Meta Ads",
      "Edição dos Criativos",
      "Dashboard Interativo de Resultado",
      "Suporte via WhatsApp",
    ],
    cta: "Quero começar",
  },
  {
    id: "full",
    name: "Full",
    emoji: "🚀",
    tagline: "Para quem quer escalar",
    desc: "Tudo integrado para quem já tem presença digital, mas busca maiores resultados. Ideal para empresas com identidade bem definida, funil de vendas estruturado e que precisam escalar.",
    color: "#AAFF00",
    features: [
      "Gestão completa de 3 redes sociais",
      "Post todos os dias",
      "Captação de conteúdo mobile",
      "Gestão de Tráfego — Meta e Google Ads",
      "Automação WhatsApp",
      "Dashboard Interativo de Resultado",
      "Suporte via WhatsApp",
    ],
    cta: "Quero o Full",
  },
];

// ─── Serviços para o card Personalizado ──────────────────────────
const ALL_SERVICES = [
  { name: "Social Media",           icon: "📱" },
  { name: "Tráfego Pago",           icon: "🎯" },
  { name: "Captação de Conteúdo",   icon: "🎬" },
  { name: "Tráfego Orgânico",       icon: "🔍" },
  { name: "Website & Landing Page", icon: "💻" },
  { name: "Automação WhatsApp",     icon: "⚡" },
];

const DEFAULT_SELECTED = ["Social Media", "Tráfego Pago", "Captação de Conteúdo"];

// ─── Serviços Avulsos ─────────────────────────────────────────────
const avulsos = [
  {
    icon: "🎯",
    name: "Tráfego Pago",
    desc: "Gestão estratégica de campanhas para Meta e Google Ads, com foco em geração de demanda, vendas e reconhecimento.",
    color: "#FF6100",
  },
  {
    icon: "🔍",
    name: "Tráfego Orgânico",
    desc: "Estratégia de SEO, GEO, Google Meu Negócio e conteúdo para que o ecossistema da sua marca se fortaleça e as buscas te entregue.",
    color: "#00C2FF",
  },
  {
    icon: "📱",
    name: "Social Media",
    desc: "Conteúdo humanizado, calendário estratégico e frequência. Tudo para fortalecer a presença digital da sua marca e melhorar a comunicação com o seu público alvo.",
    color: "#FF6100",
  },
  {
    icon: "🎬",
    name: "Captação de Conteúdo Mobile",
    desc: "Vamos até a sua empresa ou evento para gravar. Conteúdo real, roteirizado pra converter, com o tom de voz e identidade visual do seu negócio.",
    color: "#7B2FF7",
  },
  {
    icon: "💻",
    name: "Website & Landing Page",
    desc: "Desenvolvimento de sites e landing pages otimizadas para conversão, com foco em performance, experiência do usuário e geração de oportunidades comerciais.",
    color: "#AAFF00",
  },
  {
    icon: "⚡",
    name: "Automação",
    desc: "Fluxos no WhatsApp que respondem, qualificam e convertem enquanto você foca no seu negócio. Zero lead perdido, atendimento 24h.",
    color: "#FBBC05",
  },
];

// ─── Checkmark icon ───────────────────────────────────────────────
function Check({ color }: { color: string }) {
  return (
    <div
      className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5"
      style={{ borderColor: color, background: `${color}18` }}
    >
      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5} style={{ color }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
      </svg>
    </div>
  );
}

// ─── Package Card (Starter / Full) ───────────────────────────────
function PackageCard({ pkg, index, inView }: { pkg: typeof packages[0]; index: number; inView: boolean }) {
  const waLink = `https://wa.me/5511940502929?text=Olá! Tenho interesse no pacote ${pkg.name} da ZBRAND.`;
  const isGreen = pkg.color === "#AAFF00";

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      <div
        className="relative bg-white rounded-2xl border-2 p-6 flex flex-col flex-1 transition-all duration-200 cursor-default"
        style={{
          borderColor: pkg.color,
          boxShadow: `5px 5px 0px 0px ${pkg.color}`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `2px 2px 0px 0px ${pkg.color}`;
          (e.currentTarget as HTMLElement).style.transform = "translate(3px,3px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = `5px 5px 0px 0px ${pkg.color}`;
          (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
        }}
      >
        {/* Icon + name */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shrink-0"
            style={{ borderColor: pkg.color, background: `${pkg.color}18` }}
          >
            {pkg.emoji}
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/35">
              Pacote
            </p>
            <h3
              className="font-display font-black text-2xl uppercase tracking-tight leading-none"
              style={{ color: isGreen ? "#5a8a00" : pkg.color }}
            >
              {pkg.name}
            </h3>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/35 mb-2">
          {pkg.tagline}
        </p>

        {/* Desc */}
        <p className="text-sm text-[#1A1A1A]/55 font-medium leading-relaxed mb-4">
          {pkg.desc}
        </p>

        {/* Divider */}
        <div className="h-px mb-4" style={{ background: `${pkg.color}35` }} />

        {/* Features */}
        <ul className="flex flex-col gap-2.5 flex-1 mb-6">
          {pkg.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check color={pkg.color} />
              <span className="text-xs text-[#1A1A1A]/60 font-medium leading-relaxed">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center font-black text-xs py-3.5 px-4 rounded-xl border-2 border-[#1A1A1A] uppercase tracking-widest transition-all duration-200 text-white"
          style={{
            background: pkg.color,
            boxShadow: "3px 3px 0px 0px #1A1A1A",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "1px 1px 0px 0px #1A1A1A";
            (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0px 0px #1A1A1A";
            (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
          }}
        >
          {pkg.cta} →
        </a>
      </div>
    </motion.div>
  );
}

// ─── Personalizado Card (interativo) ─────────────────────────────
function PersonalizadoCard({ index, inView }: { index: number; inView: boolean }) {
  const COLOR = "#7B2FF7";
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTED);
  const [showPicker, setShowPicker] = useState(false);

  function toggle(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  const unselected = ALL_SERVICES.filter((s) => !selected.includes(s.name));

  function buildWaLink() {
    const msg =
      selected.length > 0
        ? `Olá! Quero montar um pacote personalizado com: ${selected.join(", ")}.`
        : `Olá! Quero saber mais sobre o pacote Personalizado da ZBRAND.`;
    return `https://wa.me/5511940502929?text=${encodeURIComponent(msg)}`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      <div
        className="relative bg-white rounded-2xl border-2 p-6 flex flex-col flex-1"
        style={{ borderColor: COLOR, boxShadow: `5px 5px 0px 0px ${COLOR}` }}
      >
        {/* Icon + name */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl border-2 flex items-center justify-center text-2xl shrink-0" style={{ borderColor: COLOR, background: `${COLOR}18` }}>
            🎛️
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/35">Pacote</p>
            <h3 className="font-display font-black text-2xl uppercase tracking-tight leading-none" style={{ color: COLOR }}>
              Personalizado
            </h3>
          </div>
        </div>

        <p className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/35 mb-2">
          Do jeito que você precisa
        </p>
        <p className="text-sm text-[#1A1A1A]/55 font-medium leading-relaxed mb-4">
          Monte o seu pacote aqui mesmo. Selecione os serviços que fazem sentido pro seu momento e a gente entra em contato.
        </p>

        <div className="h-px mb-4" style={{ background: `${COLOR}35` }} />

        {/* Serviços selecionados */}
        <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-2.5">
          Serviços selecionados
        </p>

        <ul className="flex flex-col gap-2 mb-3 flex-1">
          <AnimatePresence initial={false}>
            {selected.length === 0 && (
              <motion.li
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-xs text-[#1A1A1A]/30 italic py-1"
              >
                Nenhum serviço selecionado ainda
              </motion.li>
            )}
            {selected.map((name) => {
              const s = ALL_SERVICES.find((o) => o.name === name)!;
              return (
                <motion.li
                  key={name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" style={{ borderColor: COLOR, background: `${COLOR}18` }}>
                    <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5} style={{ color: COLOR }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold text-[#1A1A1A]/70 flex-1">{s.icon} {name}</span>
                  <button
                    onClick={() => toggle(name)}
                    className="text-[9px] font-black text-red-400 hover:text-red-600 transition-colors uppercase tracking-wide px-1.5 py-0.5 rounded-full hover:bg-red-50"
                  >
                    — Remover
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        {/* Adicionar serviços */}
        {unselected.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowPicker(!showPicker)}
              className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest transition-colors mb-2"
              style={{ color: COLOR }}
            >
              <motion.span animate={{ rotate: showPicker ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-base leading-none inline-block">
                +
              </motion.span>
              Adicionar serviço
            </button>

            <AnimatePresence>
              {showPicker && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-1 pb-1">
                    {unselected.map((s) => (
                      <button
                        key={s.name}
                        onClick={() => toggle(s.name)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-[11px] font-bold transition-all duration-150 hover:-translate-y-px"
                        style={{ borderColor: `${COLOR}50`, color: COLOR, background: `${COLOR}08`, boxShadow: `2px 2px 0px 0px ${COLOR}40` }}
                      >
                        {s.icon} {s.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="h-px mb-3" style={{ background: `${COLOR}20` }} />

        {/* Contador */}
        <p className="text-[11px] text-[#1A1A1A]/40 font-medium mb-4">
          {selected.length} serviço{selected.length !== 1 ? "s" : ""} selecionado{selected.length !== 1 ? "s" : ""}
          {selected.length === 0 && <span className="text-[#1A1A1A]/25"> — adicione ao menos um</span>}
        </p>

        {/* CTA */}
        <a
          href={buildWaLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center font-black text-xs py-3.5 px-4 rounded-xl border-2 border-[#1A1A1A] uppercase tracking-widest text-white transition-all duration-150"
          style={{ background: COLOR, boxShadow: "3px 3px 0px 0px #1A1A1A" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "1px 1px 0px 0px #1A1A1A";
            (e.currentTarget as HTMLElement).style.transform = "translate(2px,2px)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = "3px 3px 0px 0px #1A1A1A";
            (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
          }}
        >
          Enviar meu pacote →
        </a>
      </div>
    </motion.div>
  );
}

// ─── Avulso Card ──────────────────────────────────────────────────
function AvulsoCard({ s, index, inView }: { s: typeof avulsos[0]; index: number; inView: boolean }) {
  const isLight = s.color === "#AAFF00" || s.color === "#FBBC05";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.05 + index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col"
    >
      <div
        className="relative rounded-2xl border-2 border-white/30 p-6 flex flex-col items-center text-center gap-4 flex-1 transition-all duration-200"
        style={{
          background: s.color,
          boxShadow: "4px 4px 0px 0px rgba(255,255,255,0.25)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "1px 1px 0px 0px rgba(255,255,255,0.25)";
          (e.currentTarget as HTMLElement).style.transform = "translate(3px,3px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow = "4px 4px 0px 0px rgba(255,255,255,0.25)";
          (e.currentTarget as HTMLElement).style.transform = "translate(0,0)";
        }}
      >
        {/* Icon */}
        <div
          className="w-14 h-14 rounded-full border-2 border-white/40 flex items-center justify-center text-3xl"
          style={{ background: "rgba(255,255,255,0.15)" }}
        >
          {s.icon}
        </div>

        {/* Title */}
        <h4
          className="font-display font-black text-base uppercase tracking-tight leading-tight"
          style={{ color: isLight ? "#1A1A1A" : "#FFFFFF" }}
        >
          {s.name}
        </h4>

        {/* Desc */}
        <p
          className="text-xs font-medium leading-relaxed flex-1"
          style={{ color: isLight ? "rgba(26,26,26,0.7)" : "rgba(255,255,255,0.8)" }}
        >
          {s.desc}
        </p>

        {/* Divider */}
        <div className="w-full h-px" style={{ background: isLight ? "rgba(26,26,26,0.15)" : "rgba(255,255,255,0.2)" }} />

        {/* CTA */}
        <a
          href={`https://wa.me/5511940502929?text=Quero saber mais sobre ${encodeURIComponent(s.name)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest transition-all duration-200 hover:gap-3"
          style={{ color: isLight ? "#1A1A1A" : "#FFFFFF" }}
        >
          + Saiba mais
          <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h8M6 2l4 4-4 4" />
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

// ─── Seção Principal ──────────────────────────────────────────────
export function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const avulsosRef = useRef(null);
  const avulsosInView = useInView(avulsosRef, { once: true, margin: "-60px" });

  return (
    <section id="servicos" className="bg-[#1A1A1A] pt-16 lg:pt-24">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-0">

        {/* ── Título ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-3">
            Pacotes
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            O que a gente faz{" "}
            <span className="text-[#FF6100]">(e faz bem)</span>
          </h2>
          <p className="mt-4 text-base text-white/40 font-medium max-w-xl mx-auto leading-relaxed">
            Escolha o pacote que faz mais sentido pro seu momento ou monte um personalizado.
          </p>
        </motion.div>

        {/* ── Pacotes (3 colunas) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-14 items-stretch">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.id} pkg={pkg} index={i} inView={inView} />
          ))}
          <PersonalizadoCard index={2} inView={inView} />
        </div>

        {/* ── Divisor Serviços Avulsos ── */}
        <motion.div
          ref={avulsosRef}
          initial={{ opacity: 0, y: 16 }}
          animate={avulsosInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mt-24 mb-10 text-center"
        >
          <div className="flex items-center gap-4 justify-center mb-6">
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to right, transparent, rgba(255,97,0,0.4))" }} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FF6100]/70 px-2">
              Serviços Avulsos
            </span>
            <div className="h-px flex-1 max-w-[120px]" style={{ background: "linear-gradient(to left, transparent, rgba(255,97,0,0.4))" }} />
          </div>
          <h3 className="font-display font-black text-2xl lg:text-3xl text-white uppercase tracking-tight">
            Contrate só o que você precisa
          </h3>
          <p className="mt-3 text-sm text-white/40 font-medium max-w-lg mx-auto">
            Cada serviço pode ser contratado de forma avulsa ou compor um pacote personalizado.
          </p>
        </motion.div>

        {/* ── Cards Avulsos ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-0">
          {avulsos.map((s, i) => (
            <AvulsoCard key={s.name} s={s} index={i} inView={avulsosInView} />
          ))}
        </div>

      </div>

      {/* ── Lamp Effect ── */}
      <div className="relative w-full overflow-hidden mt-16" style={{ height: "320px" }}>
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

      {/* Smooth transition */}
      <div style={{ height: "100px", background: "linear-gradient(to bottom, #1A1A1A, #FFFFFF)" }} />
    </section>
  );
}
