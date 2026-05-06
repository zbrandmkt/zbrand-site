"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const now = new Date();
const MONTH = now.toLocaleDateString("pt-BR", { month: "long" }).replace(/^\w/, (c) => c.toUpperCase());
const YEAR  = now.getFullYear();

function KpiCard({ emoji, label, shadow, delay = 0 }: {
  emoji: string; label: string; shadow: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 flex-1"
      style={{ boxShadow: `5px 5px 0px 0px ${shadow}` }}
    >
      <span className="text-xl leading-none">{emoji}</span>
      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">{label}</p>
      <p className="text-2xl font-black text-[#1A1A1A]/25 leading-none">—</p>
    </motion.div>
  );
}

function EmptySection({ title, shadow, children }: {
  title: string; shadow: string; children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
      style={{ boxShadow: `4px 4px 0px 0px ${shadow}` }}
    >
      <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-4">{title}</p>
      {children ?? (
        <div className="h-24 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
          <p className="text-xs text-[#1A1A1A]/25 font-medium">Dados serão preenchidos em breve</p>
        </div>
      )}
    </motion.div>
  );
}

export default function SocialMediaPage() {
  return (
    <div className="p-8 max-w-[1400px]">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/area-do-cliente/dashboard"
              className="text-[10px] font-bold text-[#1A1A1A]/30 hover:text-[#FF6100] uppercase tracking-widest transition-colors">
              Dashboard
            </Link>
            <span className="text-[#1A1A1A]/20 text-[10px]">/</span>
            <span className="text-[10px] font-bold text-[#FF6100] uppercase tracking-widest">Social Media</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">📱 Social Media</h1>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">Análise completa — {MONTH} {YEAR}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border-2 border-[#1A1A1A] rounded-xl px-4 py-2"
            style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}>
            <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] min-w-[110px] text-center">
              {MONTH} {YEAR}
            </span>
          </div>
          <span className="flex items-center gap-1.5 bg-[#1A1A1A]/06 border border-[#1A1A1A]/10 text-[#1A1A1A]/30 text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
            Aguardando dados
          </span>
        </div>
      </motion.div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 bg-white border-2 border-[#1A1A1A]/10 rounded-2xl px-5 py-4 flex items-center gap-4"
        style={{ boxShadow: "3px 3px 0px 0px #FF6100" }}
      >
        <span className="text-2xl shrink-0">📱</span>
        <div>
          <p className="text-sm font-black text-[#1A1A1A]">Métricas de Social Media em preparação</p>
          <p className="text-xs text-[#1A1A1A]/50 mt-0.5">
            Em breve você verá aqui: visualizações, alcance, seguidores novos, taxa de engajamento, análise por formato, presença diária e top posts — integrado diretamente com Instagram e Facebook.
          </p>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="flex gap-3 mb-6">
        <KpiCard emoji="👁️" label="Visualizações"   shadow="#FF6100" delay={0} />
        <KpiCard emoji="🎯" label="Alcance"          shadow="#00C2FF" delay={0.06} />
        <KpiCard emoji="👥" label="Seguidores Novos" shadow="#AAFF00" delay={0.12} />
        <KpiCard emoji="❤️" label="Interações"       shadow="#7B2FF7" delay={0.18} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-0 flex-1"
          style={{ boxShadow: "5px 5px 0px 0px #1A1A1A" }}
        >
          <span className="text-xl leading-none">📱</span>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">Conteúdo</p>
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {["Reels", "Stories", "Posts", "Carr."].map(t => (
              <span key={t} className="text-[10px] font-black px-2 py-0.5 rounded-full border border-[#1A1A1A]/10 text-[#1A1A1A]/25 bg-[#1A1A1A]/05">
                — {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Metas */}
      <EmptySection title="🎯 Metas do Mês" shadow="#FF6100">
        <div className="grid grid-cols-4 gap-3">
          {["Visualizações", "Seguidores Novos", "Interações", "Taxa de Engajamento"].map((label) => (
            <div key={label}
              className="rounded-2xl border-2 border-[#1A1A1A]/08 bg-[#F5F5F0]/60 p-4 flex flex-col gap-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{label}</p>
              <p className="text-xl font-black text-[#1A1A1A]/20">—</p>
              <div className="h-2 bg-[#1A1A1A]/06 rounded-full" />
            </div>
          ))}
        </div>
      </EmptySection>

      {/* Gráfico */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
        style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
      >
        <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">📈 Evolução</p>
        <p className="text-sm font-black text-[#1A1A1A] mb-4">{MONTH} {YEAR} — semana a semana</p>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {["Visualizações", "Seguidores", "Interações", "Posts"].map(m => (
            <div key={m}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 border-[#1A1A1A]/10 text-[10px] font-black uppercase tracking-wide text-[#1A1A1A]/25">
              <span className="w-2 h-2 rounded-full bg-[#1A1A1A]/20" />
              {m}
            </div>
          ))}
        </div>
        <div className="h-40 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
          <p className="text-xs text-[#1A1A1A]/25 font-medium">Gráfico disponível após integração com Instagram</p>
        </div>
      </motion.div>

      {/* Presença Diária */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
        style={{ boxShadow: "4px 4px 0px 0px #00C2FF" }}
      >
        <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">📅 Presença Diária × Resultado</p>
        <p className="text-sm font-black text-[#1A1A1A] mb-4">{MONTH} {YEAR}</p>
        <div className="h-32 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
          <p className="text-xs text-[#1A1A1A]/25 font-medium">Disponível após integração com Instagram</p>
        </div>
      </motion.div>

      {/* Análise por Formato + Engajamento */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="col-span-2 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #AAFF00" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">📊 Análise por Formato</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">Visualizações médias por tipo de conteúdo — {MONTH}</p>
          <div className="flex flex-col gap-4">
            {[
              { label: "Reels",    emoji: "▶" },
              { label: "Post",     emoji: "▣" },
              { label: "Carrossel",emoji: "⊞" },
              { label: "Story",    emoji: "○" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-3">
                <div className="w-20 flex items-center gap-1.5 shrink-0">
                  <span className="text-base opacity-30">{f.emoji}</span>
                  <span className="text-[10px] font-black text-[#1A1A1A]/30 uppercase tracking-wide">{f.label}</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] text-[#1A1A1A]/20 font-medium">— publicações</span>
                    <span className="text-[11px] font-black text-[#1A1A1A]/25">—</span>
                  </div>
                  <div className="h-4 bg-[#1A1A1A]/06 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex flex-col"
          style={{ boxShadow: "4px 4px 0px 0px #7B2FF7" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">❤️ Taxa de Engajamento</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">(Interações / Alcance) × 100</p>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-[#1A1A1A]/10 flex items-center justify-center">
                <span className="text-2xl font-black text-[#1A1A1A]/20">—</span>
              </div>
              <p className="text-[9px] text-[#1A1A1A]/25 font-medium">Aguardando dados</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Top Posts */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
        style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">🏆 Top Posts do Mês</p>
            <p className="text-sm font-black text-[#1A1A1A]">5 conteúdos que mais geraram visualizações — {MONTH} {YEAR}</p>
          </div>
          <span className="text-[9px] font-black bg-[#1A1A1A]/10 text-[#1A1A1A]/30 px-2 py-1 rounded-full uppercase tracking-wide">Instagram</span>
        </div>
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n}
              className="flex-1 border-2 border-dashed border-[#1A1A1A]/10 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center gap-2">
              <span className="text-xl opacity-20">🖼️</span>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/20">{n}º lugar</p>
            </div>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
