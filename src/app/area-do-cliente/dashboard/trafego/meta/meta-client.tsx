"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

interface TopAd {
  ad_id: string;
  ad_name: string;
  campaign_name: string;
  leads: number;
  result_type: string;
  spend: number;
  cpl: number;
  thumbnail_url?: string;
  creative_type?: "video" | "image";
}

interface TrafegoMetrics {
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  leads: number;
  cpc: number;
  cpm: number;
  cpl: number;
  ctr: number;
  frequency: number;
  campaigns: {
    campaign_id: string;
    campaign_name: string;
    spend: number;
    impressions: number;
    clicks: number;
    leads: number;
    result_type?: string;
    cpc: number;
    cpl: number;
  }[];
  top_ads?: TopAd[];
  synced_at?: string;
}

interface TrafegoGoals {
  leads_meta?:   number | null;
  cpl_meta?:     number | null;
  budget_meta?:  number | null;
}

function fmt(value: number | undefined, decimals = 0): string {
  if (!value || value === 0) return "—";
  return value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function fmtCurrency(value: number | undefined): string {
  if (!value || value === 0) return "—";
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function KpiCard({ emoji, label, value, shadow, delay = 0 }: {
  emoji: string; label: string; value: string; shadow: string; delay?: number;
}) {
  const hasData = value !== "—";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-xl sm:rounded-2xl px-2.5 sm:px-5 py-2.5 sm:py-4 flex flex-col gap-0.5 sm:gap-1.5 flex-1 min-w-0"
      style={{ boxShadow: `3px 3px 0px 0px ${shadow}` }}
    >
      <span className="text-base sm:text-xl leading-none">{emoji}</span>
      <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider sm:tracking-widest text-[#1A1A1A]/40 leading-none">{label}</p>
      <p className={`text-sm sm:text-2xl font-black leading-none ${hasData ? "text-[#1A1A1A]" : "text-[#1A1A1A]/25"}`}>{value}</p>
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
      className="bg-white border-2 border-[#1A1A1A] rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-4 sm:mb-5"
      style={{ boxShadow: `3px 3px 0px 0px ${shadow}` }}
    >
      <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-3 sm:mb-4">{title}</p>
      {children ?? (
        <div className="h-24 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
          <p className="text-xs text-[#1A1A1A]/25 font-medium">Dados serão preenchidos em breve</p>
        </div>
      )}
    </motion.div>
  );
}

function MonthSelector({
  currentMonth,
  maxUnlockedMonth,
  selectedMonth,
  onSelect,
  metricsMap,
}: {
  currentMonth: number;
  maxUnlockedMonth: number;
  selectedMonth: number;
  onSelect: (m: number) => void;
  metricsMap: Record<string, object | null>;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {MONTH_NAMES.map((name, i) => {
        const month = i + 1;
        const isLocked = month > maxUnlockedMonth;
        const isCurrent = month === currentMonth;
        const isSelected = month === selectedMonth;
        const hasSynced = !!metricsMap[month];
        const shortName = name.slice(0, 3).toUpperCase();

        if (isLocked) {
          return (
            <div key={month}
              className="px-3 py-1.5 rounded-lg border-2 border-[#1A1A1A]/10 text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]/20 cursor-not-allowed flex items-center gap-1"
            >
              <span className="text-[9px]">🔒</span> {shortName}
            </div>
          );
        }

        return (
          <button
            key={month}
            onClick={() => onSelect(month)}
            className={`px-3 py-1.5 rounded-lg border-2 text-[10px] font-black uppercase tracking-wider transition-all relative ${
              isSelected
                ? "bg-[#1877F2] border-[#1877F2] text-white"
                : isCurrent
                ? "border-[#1A1A1A] bg-white text-[#1A1A1A] hover:border-[#1877F2]"
                : "border-[#1A1A1A]/30 bg-white text-[#1A1A1A]/60 hover:border-[#1A1A1A]"
            }`}
            style={{ boxShadow: isSelected ? "2px 2px 0px 0px #1A1A1A" : "1px 1px 0px 0px #1A1A1A30" }}
          >
            {shortName}
            {isCurrent && !isSelected && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#1877F2]" />
            )}
            {hasSynced && !isSelected && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#AAFF00]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function GoalCard({
  label,
  target,
  actual,
  format,
  lowerIsBetter = false,
}: {
  label: string;
  target: number | null | undefined;
  actual: number | null | undefined;
  format: (v: number) => string;
  lowerIsBetter?: boolean;
}) {
  const hasTarget = target != null && target > 0;
  const hasActual = actual != null && actual > 0;

  let pct = 0;
  let status: "good" | "warn" | "bad" | "empty" = "empty";

  if (hasTarget && hasActual) {
    if (lowerIsBetter) {
      pct = Math.min((target / actual) * 100, 100);
    } else {
      pct = Math.min((actual / target) * 100, 100);
    }
    status = pct >= 100 ? "good" : pct >= 60 ? "warn" : "bad";
  } else if (!hasTarget) {
    status = "empty";
  }

  const barColor = status === "good" ? "#AAFF00" : status === "warn" ? "#FBBC05" : status === "bad" ? "#FF3D9A" : "#1A1A1A";

  return (
    <div className="rounded-xl sm:rounded-2xl border-2 border-[#1A1A1A]/08 bg-white p-3 sm:p-4 flex flex-col gap-2">
      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{label}</p>
      <p className={`text-xl sm:text-2xl font-black leading-none ${hasActual ? "text-[#1A1A1A]" : "text-[#1A1A1A]/20"}`}>
        {hasActual ? format(actual!) : "—"}
      </p>
      <div className="h-2 bg-[#1A1A1A]/06 rounded-full overflow-hidden">
        {hasTarget && hasActual && (
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{ width: `${pct}%`, background: barColor }}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-bold text-[#1A1A1A]/30">
          {hasTarget ? `Meta: ${format(target!)}` : "Meta não definida"}
        </p>
        {hasTarget && hasActual && (
          <p className="text-[9px] font-black" style={{ color: barColor }}>
            {pct.toFixed(0)}%
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function MetaAdsPage({
  metricsMap,
  goalsMap,
  currentMonth,
  currentYear,
  maxUnlockedMonth,
}: {
  metricsMap: Record<string, object | null>;
  goalsMap: Record<string, object | null>;
  currentMonth: number;
  currentYear: number;
  maxUnlockedMonth: number;
}) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const metrics = metricsMap[selectedMonth] as TrafegoMetrics | null;
  const goals   = goalsMap[selectedMonth] as TrafegoGoals | null;
  const hasData = !!metrics;
  const selectedMonthName = MONTH_NAMES[selectedMonth - 1];

  return (
    <div className="p-3 sm:p-6 lg:p-8 max-w-[1400px] overflow-x-hidden w-full">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/area-do-cliente/dashboard"
              className="text-[10px] font-bold text-[#1A1A1A]/30 hover:text-[#1877F2] uppercase tracking-widest transition-colors">
              Dashboard
            </Link>
            <span className="text-[#1A1A1A]/20 text-[10px]">/</span>
            <span className="text-[10px] font-bold text-[#1877F2] uppercase tracking-widest">Meta Ads</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight flex items-center gap-2">
            <img src="/images/icon_metaads.png" alt="Meta Ads" className="w-8 h-8 object-contain" />
            Meta Ads
          </h1>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">
            {selectedMonthName} {currentYear}
            {selectedMonth === currentMonth && (
              <span className="ml-2 text-[9px] font-black bg-[#1877F2]/15 text-[#1877F2] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Mês atual
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasData ? (
            <span className="flex items-center gap-1.5 bg-[#AAFF00]/20 border border-[#AAFF00] text-[#1A1A1A] text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] inline-block" />
              Sincronizado{metrics.synced_at && ` · ${new Date(metrics.synced_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" })}`}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-[#1A1A1A]/06 border border-[#1A1A1A]/10 text-[#1A1A1A]/30 text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
              Aguardando dados
            </span>
          )}
        </div>
      </motion.div>

      {/* Month Selector */}
      <MonthSelector
        currentMonth={currentMonth}
        maxUnlockedMonth={maxUnlockedMonth}
        selectedMonth={selectedMonth}
        onSelect={setSelectedMonth}
        metricsMap={metricsMap}
      />

      {/* No data banner */}
      {!hasData && (
        <motion.div
          key={`nodata-${selectedMonth}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-5 bg-white border-2 border-[#1A1A1A]/10 rounded-xl sm:rounded-2xl px-3 sm:px-5 py-3 sm:py-4 flex items-center gap-3 sm:gap-4"
          style={{ boxShadow: "3px 3px 0px 0px #1877F2" }}
        >
          <span className="text-2xl shrink-0">📊</span>
          <div>
            <p className="text-sm font-black text-[#1A1A1A]">
              {selectedMonth < currentMonth
                ? `Dados de ${selectedMonthName} ainda não foram sincronizados`
                : "Métricas de Meta Ads em preparação"}
            </p>
            <p className="text-xs text-[#1A1A1A]/50 mt-0.5">
              {selectedMonth < currentMonth
                ? "Entre em contato com a equipe ZBRAND para adicionar dados retroativos."
                : "Em breve você verá aqui: leads, CPL, CPC, funil de conversão e criativos campeões do Meta Ads."}
            </p>
          </div>
        </motion.div>
      )}

      {/* KPIs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`kpis-${selectedMonth}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-2 sm:gap-3 mb-6">
            <KpiCard emoji="💸" label="Total Investido"    value={fmtCurrency(metrics?.spend)}  shadow="#1877F2" delay={0} />
            <KpiCard emoji="🎯" label="Resultados Totais"  value={fmt(metrics?.leads)}           shadow="#00C2FF" delay={0.06} />
            <KpiCard emoji="💰" label="Custo/Resultado"    value={fmtCurrency(metrics?.cpl)}     shadow="#AAFF00" delay={0.12} />
            <KpiCard emoji="👆" label="CPC Médio"          value={fmtCurrency(metrics?.cpc)}     shadow="#7B2FF7" delay={0.18} />
            {/* Budget vs Investido */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-2 sm:col-span-3 lg:col-span-1 bg-white border-2 border-[#1A1A1A] rounded-xl sm:rounded-2xl px-2.5 sm:px-5 py-2.5 sm:py-4 flex flex-col gap-1.5 min-w-0"
              style={{ boxShadow: "3px 3px 0px 0px #1877F2", flex: "1.5" }}
            >
              <span className="text-xl leading-none">💳</span>
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">Budget do Mês</p>
              <div className="flex gap-2 flex-1 items-end">
                {(() => {
                  const budget = goals?.budget_meta;
                  const spent  = metrics?.spend ?? 0;
                  const pct    = budget && budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
                  const saldo  = budget ? budget - spent : null;
                  return (
                    <div className="flex-1 rounded-xl px-3 py-2" style={{ background: "#1877F210", border: "1px solid #1877F230" }}>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#1877F2] text-white">META</span>
                      {budget ? (
                        <>
                          <p className="text-sm font-black text-[#1A1A1A] leading-none mt-1.5">
                            {saldo !== null && saldo >= 0
                              ? `${fmtCurrency(saldo)} restante`
                              : <span className="text-[#FF3D9A]">Estourado</span>}
                          </p>
                          <div className="h-1.5 bg-[#1A1A1A]/06 rounded-full mt-1.5 overflow-hidden">
                            <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct >= 100 ? "#FF3D9A" : "#1877F2" }} />
                          </div>
                          <p className="text-[9px] text-[#1A1A1A]/30 mt-1">{fmtCurrency(spent)} de {fmtCurrency(budget)}</p>
                        </>
                      ) : (
                        <p className="text-sm font-black text-[#1A1A1A]/25 leading-none mt-1.5">
                          {hasData ? fmtCurrency(spent) : "—"}
                        </p>
                      )}
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          </div>

          {/* Metas */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#1A1A1A] rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-4 sm:mb-5"
            style={{ boxShadow: "3px 3px 0px 0px #1877F2" }}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">🎯 Metas do Mês</p>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#1877F2] text-white">META</span>
              </div>
              {goals ? (
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#AAFF00]/20 text-[#3a6000] border border-[#AAFF00]/40">
                  Definidas
                </span>
              ) : (
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#1A1A1A]/06 text-[#1A1A1A]/30">
                  Sem metas definidas
                </span>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <GoalCard
                label="Leads Meta"
                target={goals?.leads_meta}
                actual={metrics?.leads}
                format={(v) => String(Math.round(v))}
              />
              <GoalCard
                label="CPL Meta (máx)"
                target={goals?.cpl_meta}
                actual={metrics?.cpl}
                format={(v) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                lowerIsBetter
              />
              <GoalCard
                label="Budget Meta"
                target={goals?.budget_meta}
                actual={metrics?.spend}
                format={(v) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
            </div>
          </motion.div>

          {/* Métricas Gerais + Funil */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 sm:gap-4 mb-4 sm:mb-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="lg:col-span-3 bg-white border-2 border-[#1A1A1A] rounded-xl sm:rounded-2xl p-3 sm:p-5"
              style={{ boxShadow: "3px 3px 0px 0px #1877F2" }}
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">📈 Métricas Gerais</p>
              <p className="text-sm font-black text-[#1A1A1A] mb-4">{selectedMonthName} {currentYear} — Meta Ads</p>
              {hasData ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                  {[
                    { label: "Impressões",  value: fmt(metrics.impressions), color: "#1877F2" },
                    { label: "Alcance",     value: fmt(metrics.reach),       color: "#00C2FF" },
                    { label: "Cliques",     value: fmt(metrics.clicks),      color: "#AAFF00" },
                    { label: "CTR",         value: metrics.ctr ? `${metrics.ctr.toFixed(2)}%` : "—", color: "#7B2FF7" },
                    { label: "CPM",         value: fmtCurrency(metrics.cpm),  color: "#FBBC05" },
                    { label: "Frequência",  value: metrics.frequency ? metrics.frequency.toFixed(2) : "—", color: "#FF3D9A" },
                  ].map(({ label, value, color }) => (
                    <div key={label} className="rounded-xl border-2 border-[#1A1A1A]/08 bg-[#F5F5F0]/60 p-3">
                      <p className="text-[9px] font-black uppercase tracking-wider text-[#1A1A1A]/30 mb-1">{label}</p>
                      <p className="text-base font-black" style={{ color }}>{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-40 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
                  <p className="text-xs text-[#1A1A1A]/25 font-medium">Disponível após sincronização com Meta Ads</p>
                </div>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="lg:col-span-2 bg-white border-2 border-[#1A1A1A] rounded-xl sm:rounded-2xl p-3 sm:p-5"
              style={{ boxShadow: "3px 3px 0px 0px #00C2FF" }}
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">🔻 Funil de Conversão</p>
              <p className="text-sm font-black text-[#1A1A1A] mb-4">{selectedMonthName} {currentYear}</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Impressões",  value: hasData ? fmt(metrics.impressions) : "—", pct: 100 },
                  { label: "Cliques",    value: hasData ? fmt(metrics.clicks) : "—",      pct: hasData && metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0 },
                  { label: "Resultados", value: hasData ? fmt(metrics.leads) : "—",       pct: hasData && metrics.clicks > 0 ? (metrics.leads / metrics.clicks) * 100 : 0 },
                  { label: "Vendas",     value: "—",                                      pct: 0 },
                ].map(({ label, value, pct }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">{label}</span>
                      <span className={`text-sm font-black ${value !== "—" ? "text-[#1A1A1A]" : "text-[#1A1A1A]/20"}`}>{value}</span>
                    </div>
                    <div className="h-5 bg-[#1A1A1A]/05 rounded-lg overflow-hidden">
                      {pct > 0 && (
                        <div className="h-full bg-[#00C2FF] rounded-lg" style={{ width: `${Math.min(pct, 100)}%` }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Campanhas */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#1A1A1A] rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-4 sm:mb-5"
            style={{ boxShadow: "3px 3px 0px 0px #AAFF00" }}
          >
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-3 sm:mb-4">📋 Campanhas — Meta Ads</p>
            {hasData && metrics.campaigns && metrics.campaigns.length > 0 ? (
              <div className="overflow-x-auto -mx-3 sm:-mx-5 px-3 sm:px-5">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-[#F5F5F0] rounded-xl">
                      {["Campanha", "Tipo", "Investido", "Impressões", "Cliques", "Resultados", "CPC", "Custo/Result."].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.campaigns.map((c, i) => (
                      <tr key={c.campaign_id} className={i % 2 === 0 ? "bg-white" : "bg-[#F5F5F0]/40"}>
                        <td className="px-3 py-3 text-xs font-bold text-[#1A1A1A] max-w-[180px] truncate">{c.campaign_name}</td>
                        <td className="px-3 py-3">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#1877F2]/15 text-[#1877F2] whitespace-nowrap">
                            {c.result_type ?? "Formulário"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-xs font-black text-[#1877F2]">{fmtCurrency(c.spend)}</td>
                        <td className="px-3 py-3 text-xs text-[#1A1A1A]/60">{fmt(c.impressions)}</td>
                        <td className="px-3 py-3 text-xs text-[#1A1A1A]/60">{fmt(c.clicks)}</td>
                        <td className="px-3 py-3 text-xs font-black text-[#00C2FF]">{c.leads > 0 ? fmt(c.leads) : "—"}</td>
                        <td className="px-3 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(c.cpc)}</td>
                        <td className="px-3 py-3 text-xs font-black text-[#7B2FF7]">{c.cpl > 0 ? fmtCurrency(c.cpl) : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
                <p className="text-xs text-[#1A1A1A]/25 font-medium">Aguardando dados de campanhas</p>
              </div>
            )}
          </motion.div>

          {/* Budget Meta */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#1A1A1A] rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-4 sm:mb-5"
            style={{ boxShadow: "3px 3px 0px 0px #1877F2" }}
          >
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#1877F2] text-white">META</span>
              <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">Controle de Budget</span>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-4">
              {hasData ? (
                <>
                  <div>
                    <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Investido</p>
                    <p className="text-xs sm:text-sm font-black text-[#1A1A1A]">{fmtCurrency(metrics.spend)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Budget</p>
                    <p className="text-xs sm:text-sm font-black text-[#1A1A1A]/25">{goals?.budget_meta ? fmtCurrency(goals.budget_meta) : "—"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Saldo</p>
                    <p className="text-xs sm:text-sm font-black text-[#1A1A1A]/25">
                      {goals?.budget_meta && metrics.spend ? fmtCurrency(goals.budget_meta - metrics.spend) : "—"}
                    </p>
                  </div>
                </>
              ) : (
                ["Budget", "Utilizado", "Saldo"].map((l) => (
                  <div key={l}>
                    <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">{l}</p>
                    <p className="text-xs sm:text-sm font-black text-[#1A1A1A]/25">—</p>
                  </div>
                ))
              )}
            </div>
            <div className="h-4 bg-[#1A1A1A]/06 rounded-full border border-[#1A1A1A]/08 overflow-hidden">
              {hasData && goals?.budget_meta && goals.budget_meta > 0 && (
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min((metrics.spend / goals.budget_meta) * 100, 100)}%`,
                    background: metrics.spend <= goals.budget_meta ? "#1877F2" : "#FF3D9A",
                  }}
                />
              )}
            </div>
            <p className="text-[9px] text-[#1A1A1A]/25 font-medium mt-2">
              {hasData ? "Dados via Meta Ads API" : "Aguardando dados de investimento"}
            </p>
          </motion.div>

          {/* Criativos Campeões */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#1A1A1A] rounded-xl sm:rounded-2xl p-3 sm:p-5 mb-4 sm:mb-5"
            style={{ boxShadow: "3px 3px 0px 0px #7B2FF7" }}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">🏆 Criativos Campeões</p>
              {metrics?.top_ads && metrics.top_ads.length > 0 && (
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#7B2FF7]/10 text-[#7B2FF7] border border-[#7B2FF7]/20">
                  Top {metrics.top_ads.length} anúncios
                </span>
              )}
            </div>

            {metrics?.top_ads && metrics.top_ads.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {metrics.top_ads.map((ad, idx) => (
                  <div
                    key={ad.ad_id}
                    className="min-w-0 rounded-2xl border-2 border-[#1A1A1A]/08 bg-[#F5F5F0]/60 overflow-hidden flex flex-col"
                  >
                    <div className="relative aspect-[4/5] bg-[#1A1A1A]/06 overflow-hidden">
                      {ad.thumbnail_url ? (
                        <img
                          src={ad.thumbnail_url}
                          alt={ad.ad_name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl opacity-20">🖼️</span>
                        </div>
                      )}
                      <div
                        className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black border-2 border-white"
                        style={{
                          background: idx === 0 ? "#FBBC05" : idx === 1 ? "#C0C0C0" : idx === 2 ? "#CD7F32" : "#7B2FF7",
                          color: idx <= 2 ? "#1A1A1A" : "white",
                        }}
                      >
                        {idx + 1}
                      </div>
                      {ad.creative_type && (
                        <div className="absolute top-2 right-2 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-black/50 text-white">
                          {ad.creative_type === "video" ? "▶ VID" : "IMG"}
                        </div>
                      )}
                    </div>
                    <div className="p-3 flex flex-col gap-1.5 flex-1">
                      <p className="text-[10px] font-black text-[#1A1A1A] leading-tight line-clamp-2">{ad.ad_name}</p>
                      <p className="text-[9px] text-[#1A1A1A]/40 truncate">{ad.campaign_name}</p>
                      <div className="flex items-center gap-1 mt-auto pt-1.5 border-t border-[#1A1A1A]/06">
                        <div className="flex-1">
                          <p className="text-[8px] text-[#1A1A1A]/30 uppercase font-bold tracking-wider">Resultados</p>
                          <p className="text-sm font-black text-[#00C2FF]">{ad.leads > 0 ? ad.leads : "—"}</p>
                        </div>
                        <div className="flex-1">
                          <p className="text-[8px] text-[#1A1A1A]/30 uppercase font-bold tracking-wider">Custo</p>
                          <p className="text-sm font-black text-[#7B2FF7]">
                            {ad.cpl > 0
                              ? `R$ ${ad.cpl.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
                              : "—"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {Array.from({ length: Math.max(0, 5 - metrics.top_ads.length) }).map((_, i) => (
                  <div
                    key={`ph-${i}`}
                    className="hidden lg:flex border-2 border-dashed border-[#1A1A1A]/08 rounded-2xl aspect-[4/5] items-center justify-center"
                  >
                    <span className="text-lg opacity-10">🖼️</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n}
                    className={`border-2 border-dashed border-[#1A1A1A]/10 rounded-2xl aspect-[4/5] flex flex-col items-center justify-center gap-2 ${n > 2 ? "hidden sm:flex" : ""} ${n > 3 ? "hidden lg:flex" : ""}`}>
                    <span className="text-xl opacity-20">🖼️</span>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/20">{n}º lugar</p>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[9px] text-[#1A1A1A]/25 font-medium mt-3">
              {metrics?.top_ads && metrics.top_ads.length > 0
                ? "Ordenados por número de resultados. Atualizado a cada sincronização."
                : hasData
                  ? "Sincronize novamente para carregar os criativos campeões."
                  : "Criativos aparecerão aqui após a primeira sincronização com Meta Ads."}
            </p>
          </motion.div>

          {/* Histórico Mensal */}
          <EmptySection title="📅 Histórico Mensal — Meta Ads" shadow="#FBBC05">
            <div className="overflow-x-auto -mx-3 sm:-mx-5 px-3 sm:px-5">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-[#F5F5F0]">
                  {["Mês", "Investido", "Resultados", "Custo/Result.", "CPC", "Var."].map((h) => (
                    <th key={h} className="px-3 sm:px-4 py-3 text-left text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(metricsMap)
                  .filter(([, v]) => v !== null)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([month, data]) => {
                    const m = data as TrafegoMetrics;
                    return (
                      <tr
                        key={month}
                        onClick={() => setSelectedMonth(Number(month))}
                        className={`cursor-pointer transition-colors ${Number(month) === selectedMonth ? "bg-[#1877F2]/08" : "hover:bg-[#F5F5F0]/60"}`}
                      >
                        <td className="px-3 sm:px-4 py-3 text-xs font-bold text-[#1A1A1A] whitespace-nowrap">
                          {MONTH_NAMES[Number(month) - 1]} {currentYear}
                          {Number(month) === selectedMonth && (
                            <span className="ml-2 text-[9px] font-black text-[#1877F2]">← selecionado</span>
                          )}
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-xs font-black text-[#1877F2]">{fmtCurrency(m.spend)}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs font-black text-[#00C2FF]">{fmt(m.leads)}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(m.cpl)}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(m.cpc)}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs text-[#1A1A1A]/25">—</td>
                      </tr>
                    );
                  })}
                {Object.values(metricsMap).every((v) => v === null) && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#1A1A1A]/25 font-medium">
                      O histórico de relatórios será exibido aqui
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </EmptySection>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
