"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── KPI Card ────────────────────────────────────────────────
function KpiCard({ emoji, label, value, shadow, delay = 0 }: {
  emoji?: string; label: string; value: string; shadow: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-0 flex-1"
      style={{ boxShadow: `5px 5px 0px 0px ${shadow}` }}
    >
      <span className="text-xl leading-none">{emoji}</span>
      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">{label}</p>
      <p className="text-2xl font-black text-[#1A1A1A]/30 leading-none">{value}</p>
    </motion.div>
  );
}

// ─── Empty Week Slot ─────────────────────────────────────────
function EmptyWeekSlot({ index, weekNumber }: { index: number; weekNumber: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="border-2 border-dashed border-[#1A1A1A]/15 rounded-2xl flex flex-col items-center justify-center py-12 gap-2 bg-[#F5F5F0]/60"
    >
      <span className="text-2xl opacity-20">📅</span>
      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/25">
        Semana {weekNumber}
      </p>
      <p className="text-[9px] text-[#1A1A1A]/20 font-medium">Aguardando dados</p>
    </motion.div>
  );
}

// ─── Info Banner ─────────────────────────────────────────────
function InfoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6 bg-white border-2 border-[#1A1A1A]/10 rounded-2xl px-5 py-4 flex items-center gap-4"
      style={{ boxShadow: "3px 3px 0px 0px #FF6100" }}
    >
      <span className="text-2xl shrink-0">🦓</span>
      <div>
        <p className="text-sm font-black text-[#1A1A1A]">Painel em preparação</p>
        <p className="text-xs text-[#1A1A1A]/50 mt-0.5">
          Nossa equipe está configurando suas métricas. Assim que os dados estiverem prontos, você verá seus resultados aqui.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main ────────────────────────────────────────────────────
export function DashboardUI({ company, permissions = [] }: { company: string; permissions?: string[] }) {
  const hasTrafico = permissions.length === 0 || permissions.includes("trafego");
  const hasSocial = permissions.length === 0 || permissions.includes("social");

  const defaultTab = hasTrafico ? "traffic" : "social";
  const [tab, setTab] = useState<"traffic" | "social">(defaultTab as "traffic" | "social");

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">
            Olá, {company.toUpperCase()} 👋
          </h1>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">Aqui estão os seus resultados</p>
        </div>
      </motion.div>

      {/* Info banner */}
      <InfoBanner />

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {hasTrafico && (
          <button onClick={() => setTab("traffic")}
            className={`px-5 py-2 border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === "traffic" ? "bg-[#FF6100] text-white" : "bg-white text-[#1A1A1A]/50 hover:text-[#1A1A1A]"}`}
            style={{ boxShadow: tab === "traffic" ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A" }}
          >
            📊 Tráfego Pago
          </button>
        )}
        {hasSocial && (
          <button onClick={() => setTab("social")}
            className={`px-5 py-2 border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === "social" ? "bg-[#FF6100] text-white" : "bg-white text-[#1A1A1A]/50 hover:text-[#1A1A1A]"}`}
            style={{ boxShadow: tab === "social" ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A" }}
          >
            📱 Social Media
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* ── TRÁFEGO PAGO ── */}
        {tab === "traffic" && (
          <motion.div key="traffic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {/* KPIs */}
            <div className="flex gap-3 mb-6">
              <KpiCard emoji="💸" label="Total Investido" value="—" shadow="#FF6100" delay={0} />
              <KpiCard emoji="🎯" label="Total de Leads" value="—" shadow="#00C2FF" delay={0.05} />
              <KpiCard emoji="💰" label="CPL Médio" value="—" shadow="#AAFF00" delay={0.1} />
              <KpiCard emoji="👆" label="CPC Meta" value="—" shadow="#7B2FF7" delay={0.15} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-0"
                style={{ boxShadow: "5px 5px 0px 0px #1A1A1A", flex: "1.5" }}
              >
                <span className="text-xl leading-none">💳</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">Saldo em Conta</p>
                <div className="flex gap-2 flex-1 items-end">
                  <div className="flex-1 bg-[#1877F2]/8 border border-[#1877F2]/20 rounded-xl px-3 py-2">
                    <span className="text-[9px] font-black bg-[#1877F2] text-white px-2 py-0.5 rounded-full">META</span>
                    <p className="text-lg font-black text-[#1A1A1A]/30 leading-none mt-1.5">—</p>
                  </div>
                  <div className="flex-1 bg-[#FBBC05]/8 border border-[#FBBC05]/30 rounded-xl px-3 py-2">
                    <span className="text-[9px] font-black bg-[#FBBC05] text-[#1A1A1A] px-2 py-0.5 rounded-full">GOOGLE</span>
                    <p className="text-lg font-black text-[#1A1A1A]/30 leading-none mt-1.5">—</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Comparativo semanal */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">Comparativo Semanal</h2>
              <span className="text-[9px] font-bold text-[#1A1A1A]/30 border border-[#1A1A1A]/10 px-2 py-0.5 rounded-full">
                0/4 semanas
              </span>
              <div className="flex-1 h-px bg-[#1A1A1A]/10" />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((n, i) => (
                <EmptyWeekSlot key={n} index={i} weekNumber={n} />
              ))}
            </div>

            {/* Notes empty */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: "📋 Ação da Semana", shadow: "#FF6100", dark: true },
                { label: "META · Metas do Mês", shadow: "#1877F2", dark: false },
                { label: "GOOGLE · Metas do Mês", shadow: "#FBBC05", dark: false },
              ].map(({ label, shadow, dark }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className={`border-2 border-[#1A1A1A] rounded-2xl p-5 flex items-center justify-center ${dark ? "bg-[#1A1A1A]" : "bg-white"}`}
                  style={{ boxShadow: `4px 4px 0px 0px ${shadow}` }}
                >
                  <p className={`text-xs font-medium ${dark ? "text-white/30" : "text-[#1A1A1A]/30"}`}>
                    Em breve
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── SOCIAL MEDIA ── */}
        {tab === "social" && (
          <motion.div key="social" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            {/* KPIs */}
            <div className="flex gap-3 mb-6">
              <KpiCard emoji="👁️" label="Visualizações" value="—" shadow="#FF6100" delay={0} />
              <KpiCard emoji="🎯" label="Alcance" value="—" shadow="#00C2FF" delay={0.05} />
              <KpiCard emoji="👥" label="Seguidores Novos" value="—" shadow="#AAFF00" delay={0.1} />
              <KpiCard emoji="❤️" label="Interações" value="—" shadow="#7B2FF7" delay={0.15} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-0 flex-1"
                style={{ boxShadow: "5px 5px 0px 0px #1A1A1A" }}
              >
                <span className="text-xl leading-none">📱</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">Conteúdo</p>
                <p className="text-xs text-[#1A1A1A]/30 font-medium mt-1">Em breve</p>
              </motion.div>
            </div>

            {/* Comparativo semanal */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">Comparativo Semanal</h2>
              <span className="text-[9px] font-bold text-[#1A1A1A]/30 border border-[#1A1A1A]/10 px-2 py-0.5 rounded-full">
                0/4 semanas
              </span>
              <div className="flex-1 h-px bg-[#1A1A1A]/10" />
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((n, i) => (
                <EmptyWeekSlot key={n} index={i} weekNumber={n} />
              ))}
            </div>

            {/* Metas empty */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex items-center justify-center h-24"
              style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
            >
              <p className="text-xs text-[#1A1A1A]/30 font-medium">Metas do mês serão definidas em breve</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
