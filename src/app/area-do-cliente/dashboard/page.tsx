"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  trafficMonthsWithStatus,
  socialMonthsWithStatus,
  monthlyTraffic,
  monthlySocial,
  type TrafficWeek,
  type SocialWeek,
} from "./mock-data";

// ─── helpers ────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 0 });
}
function fmtR(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
type Dir = "up" | "down" | "none";
function trend(curr: number, prev: number | undefined): Dir {
  if (prev === undefined) return "none";
  return curr > prev ? "up" : curr < prev ? "down" : "none";
}
function TrendArrow({ dir }: { dir: Dir }) {
  if (dir === "none") return null;
  return (
    <span className={`text-[11px] font-black ${dir === "up" ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
      {dir === "up" ? "↑" : "↓"}
    </span>
  );
}

// ─── KPI Card ────────────────────────────────────────────────
function KpiCard({ emoji, label, value, shadow, alert, delay = 0 }: {
  emoji?: string; label: string; value: string; shadow: string;
  alert?: string; delay?: number;
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
      <p className="text-2xl font-black text-[#1A1A1A] leading-none">{value}</p>
      {alert && <span className="text-[10px] font-bold text-[#FF6100]">⚠ {alert}</span>}
    </motion.div>
  );
}

// ─── Metric Row ──────────────────────────────────────────────
function MetricRow({ label, value, dir }: { label: string; value: string; dir: Dir }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[#1A1A1A]/06 last:border-0">
      <span className="text-[11px] text-[#1A1A1A]/50 font-medium">{label}</span>
      <div className="flex items-center gap-1">
        <span className="text-[12px] font-black text-[#1A1A1A]">{value}</span>
        <TrendArrow dir={dir} />
      </div>
    </div>
  );
}

// ─── Traffic Week Card ───────────────────────────────────────
function TrafficWeekCard({ week, prev, index, weekNumber }: {
  week: (TrafficWeek & { closed: boolean }) | null;
  prev?: TrafficWeek;
  index: number;
  weekNumber: number;
}) {
  if (!week || !week.closed) {
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
        <p className="text-[9px] text-[#1A1A1A]/20 font-medium">Aguardando fechamento</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
      style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
    >
      <div className="bg-[#1A1A1A] px-4 py-2.5 flex items-center justify-between">
        <div>
          <p className="text-xs font-black text-white uppercase tracking-widest">Semana {weekNumber}</p>
          <p className="text-[9px] text-white/40 font-medium">{week.dates}</p>
        </div>
        <span className="text-[9px] font-black text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded-full">✓ Fechada</span>
      </div>

      <div className="p-3 flex flex-col gap-3">
        {/* Meta */}
        <div>
          <span className="text-[9px] font-black bg-[#1877F2] text-white px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block">Meta Ads</span>
          <div className="bg-[#F5F5F0] rounded-xl px-3 py-1">
            <MetricRow label="Invest" value={fmtR(week.meta.invest)} dir="none" />
            <MetricRow label="Leads" value={fmt(week.meta.leads)} dir={trend(week.meta.leads, prev?.meta.leads)} />
            <MetricRow label="CPL" value={fmtR(week.meta.cpl)} dir={trend(prev?.meta.cpl ?? 0, week.meta.cpl)} />
            <MetricRow label="CPC" value={fmtR(week.meta.cpc)} dir={trend(prev?.meta.cpc ?? 0, week.meta.cpc)} />
          </div>
        </div>

        {/* Google */}
        <div>
          <span className="text-[9px] font-black bg-[#FBBC05] text-[#1A1A1A] px-2 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block">Google Ads</span>
          <div className="bg-[#F5F5F0] rounded-xl px-3 py-1">
            <MetricRow label="Invest" value={fmtR(week.google.invest)} dir="none" />
            <MetricRow label="Leads" value={fmt(week.google.leads)} dir={trend(week.google.leads, prev?.google.leads)} />
            <MetricRow label="CPL" value={fmtR(week.google.cpl)} dir={trend(prev?.google.cpl ?? 0, week.google.cpl)} />
            <MetricRow label="CPC" value={fmtR(week.google.cpc)} dir={trend(prev?.google.cpc ?? 0, week.google.cpc)} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Social Week Card ────────────────────────────────────────
function SocialWeekCard({ week, prev, index, weekNumber }: {
  week: (SocialWeek & { closed?: boolean }) | null;
  prev?: SocialWeek;
  index: number;
  weekNumber: number;
}) {
  if (!week) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.06 }}
        className="border-2 border-dashed border-[#1A1A1A]/15 rounded-2xl flex flex-col items-center justify-center py-12 gap-2"
      >
        <span className="text-2xl opacity-20">📱</span>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/25">Semana {weekNumber}</p>
        <p className="text-[9px] text-[#1A1A1A]/20 font-medium">Aguardando fechamento</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
      style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
    >
      <div className="bg-[#1A1A1A] px-4 py-2.5 flex items-center justify-between">
        <div>
          <p className="text-xs font-black text-white uppercase tracking-widest">Semana {weekNumber}</p>
          <p className="text-[9px] text-white/40 font-medium">{week.dates}</p>
        </div>
        <span className="text-[9px] font-black text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded-full">✓ Fechada</span>
      </div>
      <div className="p-3">
        <div className="bg-[#F5F5F0] rounded-xl px-3 py-1">
          <MetricRow label="Visualizações" value={fmt(week.views)} dir={trend(week.views, prev?.views)} />
          <MetricRow label="Seguidores" value={`+${week.newFollowers}`} dir={trend(week.newFollowers, prev?.newFollowers)} />
          <MetricRow label="Posts" value={String(week.posts)} dir={trend(week.posts, prev?.posts)} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────
export default function DashboardPage() {
  const [tab, setTab] = useState<"traffic" | "social">("traffic");
  const [monthIdx, setMonthIdx] = useState(trafficMonthsWithStatus.length - 1);
  const [socialMonthIdx, setSocialMonthIdx] = useState(socialMonthsWithStatus.length - 1);

  const currentMonth = trafficMonthsWithStatus[monthIdx];
  const hasPrev = monthIdx > 0;
  const hasNext = monthIdx < trafficMonthsWithStatus.length - 1;
  const closedWeeks = currentMonth.weeks.filter((w) => w.closed).length;
  const isMonthClosed = closedWeeks === 4;

  // Always show 4 slots
  const weekSlots = Array.from({ length: 4 }, (_, i) => currentMonth.weeks[i] ?? null);

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">Olá, CHURRUTS 👋</h1>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">Aqui estão os seus resultados</p>
        </div>
        <div className="flex items-center gap-3">
          <select className="border-2 border-[#1A1A1A] rounded-xl px-4 py-2 text-sm font-bold text-[#1A1A1A] bg-white outline-none"
            style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}>
            <option>Abril 2026</option>
            <option>Março 2026</option>
          </select>
          <span className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Atualizado
          </span>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["traffic", "social"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-5 py-2 border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-widest transition-all ${tab === t ? "bg-[#FF6100] text-white" : "bg-white text-[#1A1A1A]/50 hover:text-[#1A1A1A]"}`}
            style={{ boxShadow: tab === t ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A" }}
          >
            {t === "traffic" ? "📊 Tráfego Pago" : "📱 Social Media"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── TRÁFEGO PAGO ── */}
        {tab === "traffic" && (
          <motion.div key="traffic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* KPIs — single row */}
            <div className="flex gap-3 mb-6">
              <KpiCard emoji="💸" label="Total Investido" value={fmtR(monthlyTraffic.totalInvest)} shadow="#FF6100" delay={0} />
              <KpiCard emoji="🎯" label="Total de Leads" value={fmt(monthlyTraffic.totalLeads)} shadow="#00C2FF" delay={0.05} />
              <KpiCard emoji="💰" label="CPL Médio" value={fmtR(monthlyTraffic.avgCpl)} shadow="#AAFF00" delay={0.1} />
              <KpiCard emoji="👆" label="CPC Meta" value={fmtR(monthlyTraffic.avgCpcMeta)} shadow="#7B2FF7" delay={0.15} />

              {/* Saldo unificado — ligeiramente mais largo */}
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
                    <p className="text-lg font-black text-[#1A1A1A] leading-none mt-1.5">{fmtR(monthlyTraffic.saldoMeta)}</p>
                    <p className="text-[10px] text-[#FF6100] font-bold mt-1">⚠ Baixo</p>
                  </div>
                  <div className="flex-1 bg-[#FBBC05]/8 border border-[#FBBC05]/30 rounded-xl px-3 py-2">
                    <span className="text-[9px] font-black bg-[#FBBC05] text-[#1A1A1A] px-2 py-0.5 rounded-full">GOOGLE</span>
                    <p className="text-lg font-black text-[#1A1A1A] leading-none mt-1.5">{fmtR(monthlyTraffic.saldoGoogle)}</p>
                    <p className="text-[10px] text-[#22c55e] font-bold mt-1">✓ Ok</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Comparativo semanal */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">Comparativo Semanal</h2>
                {isMonthClosed && (
                  <span className="text-[9px] font-black bg-[#FF6100] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Mês fechado
                  </span>
                )}
                {!isMonthClosed && (
                  <span className="text-[9px] font-bold text-[#1A1A1A]/30 border border-[#1A1A1A]/10 px-2 py-0.5 rounded-full">
                    {closedWeeks}/4 semanas
                  </span>
                )}
              </div>
              <div className="flex-1 h-px bg-[#1A1A1A]/10" />

              {/* Month navigation */}
              <div className="flex items-center gap-2">
                <button onClick={() => hasPrev && setMonthIdx(monthIdx - 1)} disabled={!hasPrev}
                  className="w-7 h-7 flex items-center justify-center border-2 border-[#1A1A1A] rounded-lg bg-white disabled:opacity-20 hover:bg-[#FF6100] hover:text-white transition-all"
                  style={{ boxShadow: hasPrev ? "2px 2px 0px 0px #1A1A1A" : "none" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] min-w-[90px] text-center">
                  {currentMonth.month} {currentMonth.year}
                </span>
                <button onClick={() => hasNext && setMonthIdx(monthIdx + 1)} disabled={!hasNext}
                  className="w-7 h-7 flex items-center justify-center border-2 border-[#1A1A1A] rounded-lg bg-white disabled:opacity-20 hover:bg-[#FF6100] hover:text-white transition-all"
                  style={{ boxShadow: hasNext ? "2px 2px 0px 0px #1A1A1A" : "none" }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 4 week slots — always 4 */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              {weekSlots.map((week, i) => (
                <TrafficWeekCard
                  key={i}
                  week={week}
                  prev={i > 0 && weekSlots[i - 1]?.closed ? weekSlots[i - 1] as TrafficWeek : undefined}
                  index={i}
                  weekNumber={i + 1}
                />
              ))}
            </div>

            {/* Notes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-2xl p-5"
                style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}>
                <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2">📋 Ação da Semana</p>
                <p className="text-sm text-white/80 leading-relaxed font-medium">{monthlyTraffic.acaoDaSemana}</p>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
                style={{ boxShadow: "4px 4px 0px 0px #1877F2" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-black bg-[#1877F2] text-white px-2 py-0.5 rounded-full">META</span>
                  <p className="text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-widest">Metas do Mês</p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {monthlyTraffic.metasDoMes.meta.map((m) => (
                    <li key={m} className="text-xs text-[#1A1A1A]/70 font-medium">{m}</li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
                style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-black bg-[#FBBC05] text-[#1A1A1A] px-2 py-0.5 rounded-full">GOOGLE</span>
                  <p className="text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-widest">Metas do Mês</p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {monthlyTraffic.metasDoMes.google.map((m) => (
                    <li key={m} className="text-xs text-[#1A1A1A]/70 font-medium">{m}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ── SOCIAL MEDIA ── */}
        {tab === "social" && (
          <motion.div key="social" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>

            {/* KPIs */}
            <div className="flex gap-3 mb-6">
              <KpiCard emoji="👁️" label="Visualizações" value={fmt(monthlySocial.views)} shadow="#FF6100" delay={0} />
              <KpiCard emoji="🎯" label="Alcance" value={fmt(monthlySocial.reach)} shadow="#00C2FF" delay={0.05} />
              <KpiCard emoji="👥" label="Seguidores Novos" value={`+${monthlySocial.newFollowers}`} shadow="#AAFF00" delay={0.1} />
              <KpiCard emoji="❤️" label="Interações" value={fmt(monthlySocial.interactions)} shadow="#7B2FF7" delay={0.15} />

              {/* Conteúdo publicado — badges compactos */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-0 flex-1"
                style={{ boxShadow: "5px 5px 0px 0px #1A1A1A" }}
              >
                <span className="text-xl leading-none">📱</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">Conteúdo</p>
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {[
                    { label: `${monthlySocial.reels} Reels`, color: "#FF6100" },
                    { label: `${monthlySocial.stories} Stories`, color: "#7B2FF7" },
                    { label: `${monthlySocial.posts} Post`, color: "#00C2FF" },
                    { label: `${monthlySocial.carrosseis} Carrossel`, color: "#AAFF00" },
                  ].map((t) => (
                    <span key={t.label}
                      className="text-[10px] font-black px-2 py-0.5 rounded-full border border-[#1A1A1A]/10"
                      style={{ background: `${t.color}18`, color: t.color }}>
                      {t.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Comparativo semanal */}
            {(() => {
              const curSocial = socialMonthsWithStatus[socialMonthIdx];
              const hasSocialPrev = socialMonthIdx > 0;
              const hasSocialNext = socialMonthIdx < socialMonthsWithStatus.length - 1;
              const socialClosedWeeks = curSocial.weeks.filter((w) => w.closed).length;
              const isSocialMonthClosed = socialClosedWeeks === 4;
              const socialSlots = Array.from({ length: 4 }, (_, i) => curSocial.weeks[i] ?? null);
              return (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">Comparativo Semanal</h2>
                      {isSocialMonthClosed ? (
                        <span className="text-[9px] font-black bg-[#FF6100] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Mês fechado</span>
                      ) : (
                        <span className="text-[9px] font-bold text-[#1A1A1A]/30 border border-[#1A1A1A]/10 px-2 py-0.5 rounded-full">{socialClosedWeeks}/4 semanas</span>
                      )}
                    </div>
                    <div className="flex-1 h-px bg-[#1A1A1A]/10" />
                    <div className="flex items-center gap-2">
                      <button onClick={() => hasSocialPrev && setSocialMonthIdx(socialMonthIdx - 1)} disabled={!hasSocialPrev}
                        className="w-7 h-7 flex items-center justify-center border-2 border-[#1A1A1A] rounded-lg bg-white disabled:opacity-20 hover:bg-[#FF6100] hover:text-white transition-all"
                        style={{ boxShadow: hasSocialPrev ? "2px 2px 0px 0px #1A1A1A" : "none" }}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] min-w-[90px] text-center">
                        {curSocial.month} {curSocial.year}
                      </span>
                      <button onClick={() => hasSocialNext && setSocialMonthIdx(socialMonthIdx + 1)} disabled={!hasSocialNext}
                        className="w-7 h-7 flex items-center justify-center border-2 border-[#1A1A1A] rounded-lg bg-white disabled:opacity-20 hover:bg-[#FF6100] hover:text-white transition-all"
                        style={{ boxShadow: hasSocialNext ? "2px 2px 0px 0px #1A1A1A" : "none" }}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {socialSlots.map((week, i) => (
                      <SocialWeekCard
                        key={i}
                        week={week as (SocialWeek & { closed: boolean }) | null}
                        prev={i > 0 && socialSlots[i - 1]?.closed ? socialSlots[i - 1] as SocialWeek : undefined}
                        index={i}
                        weekNumber={i + 1}
                      />
                    ))}
                  </div>
                </>
              );
            })()}

            {/* Metas */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
              style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}>
              <p className="text-[9px] font-black text-[#FF6100] uppercase tracking-widest mb-3">🎯 Metas do Mês</p>
              <div className="grid grid-cols-2 gap-2">
                {monthlySocial.metasDoMes.map((m) => (
                  <div key={m} className="flex items-start gap-2 bg-[#F5F5F0] rounded-xl px-3 py-2">
                    <span className="text-xs text-[#1A1A1A]/70 font-medium">{m}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
