"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

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
  synced_at?: string;
}

interface TrafegoGoals {
  leads_google?: number | null;
  cpl_google?:   number | null;
  budget_google?: number | null;
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
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-3 sm:px-5 py-3 sm:py-4 flex flex-col gap-1 sm:gap-1.5 flex-1 min-w-0"
      style={{ boxShadow: `5px 5px 0px 0px ${shadow}` }}
    >
      <span className="text-lg sm:text-xl leading-none">{emoji}</span>
      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">{label}</p>
      <p className={`text-lg sm:text-2xl font-black leading-none ${hasData ? "text-[#1A1A1A]" : "text-[#1A1A1A]/25"}`}>{value}</p>
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
                ? "bg-[#FBBC05] border-[#FBBC05] text-[#1A1A1A]"
                : isCurrent
                ? "border-[#1A1A1A] bg-white text-[#1A1A1A] hover:border-[#FBBC05]"
                : "border-[#1A1A1A]/30 bg-white text-[#1A1A1A]/60 hover:border-[#1A1A1A]"
            }`}
            style={{ boxShadow: isSelected ? "2px 2px 0px 0px #1A1A1A" : "1px 1px 0px 0px #1A1A1A30" }}
          >
            {shortName}
            {isCurrent && !isSelected && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FBBC05]" />
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
  }

  const barColor = status === "good" ? "#AAFF00" : status === "warn" ? "#FBBC05" : status === "bad" ? "#FF3D9A" : "#1A1A1A";

  return (
    <div className="rounded-2xl border-2 border-[#1A1A1A]/08 bg-white p-4 flex flex-col gap-2.5">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{label}</p>
      <p className={`text-2xl font-black leading-none ${hasActual ? "text-[#1A1A1A]" : "text-[#1A1A1A]/20"}`}>
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

export default function GoogleAdsPage({
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

  // Check if any month has data (Google sync integrated)
  const hasAnySyncedData = Object.values(metricsMap).some((v) => v !== null);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-4"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/area-do-cliente/dashboard"
              className="text-[10px] font-bold text-[#1A1A1A]/30 hover:text-[#FBBC05] uppercase tracking-widest transition-colors">
              Dashboard
            </Link>
            <span className="text-[#1A1A1A]/20 text-[10px]">/</span>
            <span className="text-[10px] font-bold text-[#FBBC05] uppercase tracking-widest">Google Ads</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight flex items-center gap-2">
            <img src="/images/icon_googleads.webp" alt="Google Ads" className="w-8 h-8 object-contain" />
            Google Ads
          </h1>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">
            {selectedMonthName} {currentYear}
            {selectedMonth === currentMonth && (
              <span className="ml-2 text-[9px] font-black bg-[#FBBC05]/15 text-[#a07800] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Mês atual
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasData ? (
            <span className="flex items-center gap-1.5 bg-[#AAFF00]/20 border border-[#AAFF00] text-[#1A1A1A] text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] inline-block" />
              Sincronizado
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

      {/* Sync banner */}
      {hasData && metrics.synced_at && (
        <motion.div
          key={`sync-${selectedMonth}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-5 bg-[#AAFF00]/10 border-2 border-[#AAFF00]/40 rounded-2xl px-5 py-3 flex items-center gap-3"
        >
          <span className="text-lg shrink-0">🔄</span>
          <p className="text-xs font-black text-[#1A1A1A]/60">
            Dados de {selectedMonthName} sincronizados em{" "}
            {new Date(metrics.synced_at).toLocaleString("pt-BR")} via Google Ads API
          </p>
        </motion.div>
      )}

      {/* Integration coming soon banner (when no synced data at all) */}
      {!hasAnySyncedData && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-5 bg-white border-2 border-[#FBBC05] rounded-2xl px-6 py-5 flex items-center gap-5"
          style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}
        >
          <span className="text-4xl shrink-0">🔍</span>
          <div>
            <p className="text-base font-black text-[#1A1A1A]">
              Integração Google Ads em breve
            </p>
            <p className="text-sm text-[#1A1A1A]/50 mt-1 leading-relaxed">
              Em breve você verá aqui: leads do Google Search e Display, CPC, Quality Score, campanhas e histórico mensal — integrado com a Google Ads API.
            </p>
            <p className="text-xs text-[#1A1A1A]/30 mt-2 font-medium">
              As metas já podem ser configuradas pelo admin enquanto a integração não está ativa.
            </p>
          </div>
        </motion.div>
      )}

      {/* No data for selected month (but has other months) */}
      {hasAnySyncedData && !hasData && (
        <motion.div
          key={`nodata-${selectedMonth}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-5 bg-white border-2 border-[#1A1A1A]/10 rounded-2xl px-5 py-4 flex items-center gap-4"
          style={{ boxShadow: "3px 3px 0px 0px #FBBC05" }}
        >
          <span className="text-2xl shrink-0">📊</span>
          <div>
            <p className="text-sm font-black text-[#1A1A1A]">
              {selectedMonth < currentMonth
                ? `Dados de ${selectedMonthName} ainda não foram sincronizados`
                : "Métricas de Google Ads em preparação"}
            </p>
            <p className="text-xs text-[#1A1A1A]/50 mt-0.5">
              Entre em contato com a equipe ZBRAND para adicionar dados retroativos.
            </p>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={`content-${selectedMonth}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* KPIs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex gap-2 sm:gap-3 mb-6">
            <KpiCard emoji="💸" label="Total Investido"   value={fmtCurrency(metrics?.spend)}  shadow="#FBBC05" delay={0} />
            <KpiCard emoji="🎯" label="Conversões"        value={fmt(metrics?.leads)}          shadow="#34A853" delay={0.06} />
            <KpiCard emoji="💰" label="Custo/Conversão"   value={fmtCurrency(metrics?.cpl)}    shadow="#EA4335" delay={0.12} />
            <KpiCard emoji="👆" label="CPC Médio"         value={fmtCurrency(metrics?.cpc)}    shadow="#4285F4" delay={0.18} />
            <KpiCard emoji="📊" label="Impressões"        value={fmt(metrics?.impressions)}    shadow="#FBBC05" delay={0.24} />
          </div>

          {/* Metas Google */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
            style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">🎯 Metas do Mês</p>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#FBBC05] text-[#1A1A1A]">GOOGLE</span>
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
                label="Leads Google"
                target={goals?.leads_google}
                actual={metrics?.leads}
                format={(v) => String(Math.round(v))}
              />
              <GoalCard
                label="CPL Google (máx)"
                target={goals?.cpl_google}
                actual={metrics?.cpl}
                format={(v) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                lowerIsBetter
              />
              <GoalCard
                label="Budget Google"
                target={goals?.budget_google}
                actual={metrics?.spend}
                format={(v) => `R$ ${v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
            </div>
          </motion.div>

          {/* Campanhas */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
            style={{ boxShadow: "4px 4px 0px 0px #34A853" }}
          >
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-4">📋 Campanhas — Google Ads</p>
            {hasData && metrics.campaigns && metrics.campaigns.length > 0 ? (
              <div className="overflow-x-auto -mx-4 sm:-mx-5 px-4 sm:px-5">
                <table className="w-full min-w-[640px]">
                  <thead>
                    <tr className="bg-[#F5F5F0] rounded-xl">
                      {["Campanha", "Tipo", "Investido", "Impressões", "Cliques", "Conversões", "CPC", "Custo/Conv."].map((h) => (
                        <th key={h} className="px-3 py-2 text-left text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {metrics.campaigns.map((c, i) => (
                      <tr key={c.campaign_id} className={i % 2 === 0 ? "bg-white" : "bg-[#F5F5F0]/40"}>
                        <td className="px-3 py-3 text-xs font-bold text-[#1A1A1A] max-w-[180px] truncate">{c.campaign_name}</td>
                        <td className="px-3 py-3">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#FBBC05]/20 text-[#a07800] whitespace-nowrap">
                            {c.result_type ?? "Search"}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-xs font-black text-[#FBBC05]">{fmtCurrency(c.spend)}</td>
                        <td className="px-3 py-3 text-xs text-[#1A1A1A]/60">{fmt(c.impressions)}</td>
                        <td className="px-3 py-3 text-xs text-[#1A1A1A]/60">{fmt(c.clicks)}</td>
                        <td className="px-3 py-3 text-xs font-black text-[#34A853]">{c.leads > 0 ? fmt(c.leads) : "—"}</td>
                        <td className="px-3 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(c.cpc)}</td>
                        <td className="px-3 py-3 text-xs font-black text-[#4285F4]">{c.cpl > 0 ? fmtCurrency(c.cpl) : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-24 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
                <p className="text-xs text-[#1A1A1A]/25 font-medium">
                  {hasAnySyncedData ? "Nenhuma campanha neste período" : "Aguardando integração Google Ads"}
                </p>
              </div>
            )}
          </motion.div>

          {/* Budget Google */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
            style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#FBBC05] text-[#1A1A1A]">GOOGLE</span>
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
                    <p className="text-xs sm:text-sm font-black text-[#1A1A1A]/25">{goals?.budget_google ? fmtCurrency(goals.budget_google) : "—"}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Saldo</p>
                    <p className="text-xs sm:text-sm font-black text-[#1A1A1A]/25">
                      {goals?.budget_google && metrics.spend ? fmtCurrency(goals.budget_google - metrics.spend) : "—"}
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
              {hasData && goals?.budget_google && goals.budget_google > 0 && (
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min((metrics.spend / goals.budget_google) * 100, 100)}%`,
                    background: metrics.spend <= goals.budget_google ? "#FBBC05" : "#FF3D9A",
                  }}
                />
              )}
            </div>
            <p className="text-[9px] text-[#1A1A1A]/25 font-medium mt-2">
              {hasData ? "Dados via Google Ads API" : "Aguardando integração Google Ads"}
            </p>
          </motion.div>

          {/* Histórico Mensal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
            style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}
          >
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-4">📅 Histórico Mensal — Google Ads</p>
            <div className="overflow-x-auto -mx-4 sm:-mx-5 px-4 sm:px-5">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="bg-[#F5F5F0]">
                  {["Mês", "Investido", "Conversões", "Custo/Conv.", "CPC", "Var."].map((h) => (
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
                        className={`cursor-pointer transition-colors ${Number(month) === selectedMonth ? "bg-[#FBBC05]/08" : "hover:bg-[#F5F5F0]/60"}`}
                      >
                        <td className="px-3 sm:px-4 py-3 text-xs font-bold text-[#1A1A1A] whitespace-nowrap">
                          {MONTH_NAMES[Number(month) - 1]} {currentYear}
                          {Number(month) === selectedMonth && (
                            <span className="ml-2 text-[9px] font-black text-[#a07800]">← selecionado</span>
                          )}
                        </td>
                        <td className="px-3 sm:px-4 py-3 text-xs font-black text-[#FBBC05]">{fmtCurrency(m.spend)}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs font-black text-[#34A853]">{fmt(m.leads)}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(m.cpl)}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(m.cpc)}</td>
                        <td className="px-3 sm:px-4 py-3 text-xs text-[#1A1A1A]/25">—</td>
                      </tr>
                    );
                  })}
                {Object.values(metricsMap).every((v) => v === null) && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#1A1A1A]/25 font-medium">
                      O histórico de relatórios será exibido aqui após a integração com Google Ads
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </motion.div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
