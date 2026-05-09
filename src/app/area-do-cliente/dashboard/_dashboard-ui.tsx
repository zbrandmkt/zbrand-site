"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  fmt,
  fmtNum,
  calcDelta,
  KpiCard,
  GoalsPanel,
  ViewTabs,
  PlatformToggle,
  WeekCarousel,
  MonthlyTable,
} from "./_components";
import type { WeeklyRow, MonthlyRow, PlatformMode } from "./_components";

// ─── Types ───────────────────────────────────────────────────
export type { WeeklyRow, MonthlyRow };

export interface GoalsRow {
  leads_meta?: number | null;
  cpl_meta?: number | null;
  budget_meta?: number | null;
  leads_google?: number | null;
  cpl_google?: number | null;
  budget_google?: number | null;
}

// ─── Social Media Placeholder ─────────────────────────────────
function SocialMediaTab() {
  return (
    <motion.div
      key="social"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
        {(["👁️ Visualizacoes", "🎯 Alcance", "👥 Seguidores", "❤️ Interacoes"] as const).map(
          (label, i) => (
            <KpiCard
              key={label}
              emoji=""
              label={label.split(" ").slice(1).join(" ")}
              value="—"
              shadow={["#FF6100", "#00C2FF", "#AAFF00", "#7B2FF7"][i]}
              delay={i * 0.05}
              dim
            />
          )
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 sm:p-8 flex flex-col items-center gap-4 text-center"
        style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
      >
        <span className="text-4xl">📱</span>
        <div>
          <p className="text-sm font-black text-[#1A1A1A]">Metricas de Social Media em breve</p>
          <p className="text-xs text-[#1A1A1A]/40 mt-1 max-w-sm">
            A integracao com Instagram e Facebook esta sendo preparada.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────
export function DashboardUI({
  company,
  permissions = [],
  todayMonth,
  todayYear,
  weeklyData = [],
  monthlyData = [],
  goals,
}: {
  company: string;
  permissions?: string[];
  todayMonth: number;
  todayYear: number;
  weeklyData?: WeeklyRow[];
  monthlyData?: MonthlyRow[];
  goals?: GoalsRow | null;
}) {
  const [tab, setTab] = useState<"traffic" | "social">("traffic");
  const [view, setView] = useState<"semanal" | "mensal">("semanal");
  const [platformMode, setPlatformMode] = useState<PlatformMode>("consolidated");

  const hasTrafico =
    permissions.length === 0 ||
    permissions.some((p) => p === "trafego" || p.startsWith("trafego_"));
  const hasSocial = permissions.includes("social");
  const hasGoogleModule = permissions.includes("trafego_google");

  // ── Current month metrics (from monthlyData) ──────────
  const currentMonthData = useMemo(() => {
    const meta = monthlyData.find(
      (r) => r.month === todayMonth && r.year === todayYear && r.platform === "meta"
    );
    const google = monthlyData.find(
      (r) => r.month === todayMonth && r.year === todayYear && r.platform === "google"
    );
    return { meta, google };
  }, [monthlyData, todayMonth, todayYear]);

  // Previous month for MoM deltas
  const prevMonthData = useMemo(() => {
    const pm = todayMonth === 1 ? 12 : todayMonth - 1;
    const py = todayMonth === 1 ? todayYear - 1 : todayYear;
    const meta = monthlyData.find(
      (r) => r.month === pm && r.year === py && r.platform === "meta"
    );
    const google = monthlyData.find(
      (r) => r.month === pm && r.year === py && r.platform === "google"
    );
    return { meta, google };
  }, [monthlyData, todayMonth, todayYear]);

  // ── Aggregate KPIs ────────────────────────────────
  const metaSpend = currentMonthData.meta?.spend ?? 0;
  const googleSpend = hasGoogleModule ? (currentMonthData.google?.spend ?? 0) : 0;
  const totalSpend = metaSpend + googleSpend;

  const metaLeads = currentMonthData.meta?.leads ?? 0;
  const googleLeads = hasGoogleModule ? (currentMonthData.google?.leads ?? 0) : 0;
  const totalLeads = metaLeads + googleLeads;

  const avgCpl = totalLeads > 0 ? totalSpend / totalLeads : 0;
  const metaCpc = currentMonthData.meta?.cpc ?? 0;

  const hasAnyData = !!currentMonthData.meta || !!currentMonthData.google;

  // MoM deltas
  const prevTotalSpend = (prevMonthData.meta?.spend ?? 0) + (hasGoogleModule ? (prevMonthData.google?.spend ?? 0) : 0);
  const prevTotalLeads = (prevMonthData.meta?.leads ?? 0) + (hasGoogleModule ? (prevMonthData.google?.leads ?? 0) : 0);
  const prevAvgCpl = prevTotalLeads > 0 ? prevTotalSpend / prevTotalLeads : 0;

  const spendDelta = calcDelta(totalSpend, prevTotalSpend);
  const leadsDelta = calcDelta(totalLeads, prevTotalLeads);
  const cplDelta = calcDelta(avgCpl, prevAvgCpl);
  const cpcDelta = calcDelta(metaCpc, prevMonthData.meta?.cpc);

  // ── Current action text (from most recent week) ───────
  const currentActionText = useMemo(() => {
    const sorted = [...weeklyData].sort((a, b) => b.week_id.localeCompare(a.week_id));
    return sorted.find((r) => r.action_text)?.action_text ?? null;
  }, [weeklyData]);

  const currentActionWeekId = useMemo(() => {
    const today = new Date().toISOString().split("T")[0];
    const sorted = [...weeklyData].sort((a, b) => b.week_id.localeCompare(a.week_id));
    const current = sorted.find((r) => r.date_start <= today && r.date_end >= today);
    return current?.week_id ?? sorted[0]?.week_id ?? null;
  }, [weeklyData]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">
            Ola, {company.toUpperCase()} 👋
          </h1>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/40 font-medium mt-0.5">
            Painel de resultados
          </p>
        </div>
        {hasAnyData && (
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest bg-[#AAFF00] text-[#1A1A1A] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border-2 border-[#1A1A1A] self-start sm:self-auto">
            ✓ Sincronizado
          </span>
        )}
      </motion.div>

      {/* Main Tabs: Trafego / Social */}
      {(hasTrafico || hasSocial) && (
        <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto">
          {hasTrafico && (
            <button
              onClick={() => setTab("traffic")}
              className={`px-4 sm:px-5 py-2 border-2 border-[#1A1A1A] rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                tab === "traffic"
                  ? "bg-[#FF6100] text-white"
                  : "bg-white text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
              }`}
              style={{
                boxShadow: tab === "traffic" ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A",
              }}
            >
              📊 Trafego Pago
            </button>
          )}
          {hasSocial && (
            <button
              onClick={() => setTab("social")}
              className={`px-4 sm:px-5 py-2 border-2 border-[#1A1A1A] rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                tab === "social"
                  ? "bg-[#FF6100] text-white"
                  : "bg-white text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
              }`}
              style={{
                boxShadow: tab === "social" ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A",
              }}
            >
              📱 Social Media
            </button>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ── TRÁFEGO PAGO ── */}
        {tab === "traffic" && (
          <motion.div
            key="traffic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* KPIs — 2 cols mobile, flex desktop */}
            <div className="grid grid-cols-2 sm:flex gap-2 sm:gap-3 mb-4 sm:mb-6">
              <KpiCard
                emoji="💸"
                label="Total Investido"
                value={hasAnyData ? fmt(totalSpend) : "—"}
                shadow="#FF6100"
                delay={0}
                dim={!hasAnyData}
                delta={spendDelta}
                invertDelta
                subtitle="vs. mes anterior"
              />
              <KpiCard
                emoji="🎯"
                label="Total de Leads"
                value={hasAnyData ? fmtNum(totalLeads) : "—"}
                shadow="#00C2FF"
                delay={0.05}
                dim={!hasAnyData}
                delta={leadsDelta}
                subtitle="vs. mes anterior"
              />
              <KpiCard
                emoji="💰"
                label="CPL Medio"
                value={avgCpl > 0 ? fmt(avgCpl) : "—"}
                shadow="#AAFF00"
                delay={0.1}
                dim={avgCpl === 0}
                delta={cplDelta}
                invertDelta
                subtitle="vs. mes anterior"
              />
              <KpiCard
                emoji="👆"
                label="CPC Meta"
                value={metaCpc > 0 ? fmt(metaCpc) : "—"}
                shadow="#7B2FF7"
                delay={0.15}
                dim={metaCpc === 0}
                delta={cpcDelta}
                invertDelta
                subtitle="vs. mes anterior"
              />

              {/* Budget mini-cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="col-span-2 sm:col-span-1 bg-white border-2 border-[#1A1A1A] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-1.5 min-w-0"
                style={{ boxShadow: "4px 4px 0px 0px #1A1A1A", flex: "1.5" }}
              >
                <span className="text-lg sm:text-xl leading-none">💳</span>
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">
                  Budget Restante
                </p>
                <div className="flex gap-2 flex-1 items-end mt-1">
                  <div className="flex-1 bg-[#1877F2]/8 border border-[#1877F2]/20 rounded-xl px-2.5 sm:px-3 py-2">
                    <img src="/images/icon_metaads.png" alt="Meta" className="w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain mb-1" />
                    <p className={`text-xs sm:text-sm font-black leading-none ${goals?.budget_meta && metaSpend ? "text-[#1A1A1A]" : "text-[#1A1A1A]/30"}`}>
                      {goals?.budget_meta ? fmt(Math.max(0, (goals.budget_meta ?? 0) - metaSpend)) : "—"}
                    </p>
                  </div>
                  {hasGoogleModule && (
                    <div className="flex-1 bg-[#FBBC05]/8 border border-[#FBBC05]/30 rounded-xl px-2.5 sm:px-3 py-2">
                      <img src="/images/icon_googleads.webp" alt="Google" className="w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain mb-1" />
                      <p className={`text-xs sm:text-sm font-black leading-none ${goals?.budget_google && googleSpend ? "text-[#1A1A1A]" : "text-[#1A1A1A]/30"}`}>
                        {goals?.budget_google ? fmt(Math.max(0, (goals.budget_google ?? 0) - googleSpend)) : "—"}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* View Tabs + Platform Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
              <ViewTabs activeView={view} onChange={setView} />
              <PlatformToggle mode={platformMode} onChange={setPlatformMode} />
            </div>

            {/* ── SEMANAL VIEW ── */}
            <AnimatePresence mode="wait">
              {view === "semanal" && (
                <motion.div
                  key="semanal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6 sm:mb-8"
                >
                  <WeekCarousel
                    weeklyData={weeklyData}
                    hasGoogleModule={hasGoogleModule}
                    platformMode={platformMode}
                  />
                </motion.div>
              )}

              {/* ── MENSAL VIEW ── */}
              {view === "mensal" && (
                <motion.div
                  key="mensal"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6 sm:mb-8"
                >
                  <MonthlyTable
                    monthlyData={monthlyData}
                    todayMonth={todayMonth}
                    todayYear={todayYear}
                    platformMode={platformMode}
                    hasGoogleModule={hasGoogleModule}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bottom row: Action + Goals */}
            <div
              className={`grid gap-3 sm:gap-4 ${
                hasGoogleModule
                  ? "grid-cols-1 lg:grid-cols-3"
                  : "grid-cols-1 lg:grid-cols-2"
              }`}
            >
              {/* Acao da Semana */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-2xl p-4 sm:p-5 flex flex-col gap-2 sm:gap-3"
                style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base sm:text-lg">📋</span>
                  <h3 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/50">
                    Acao da Semana
                  </h3>
                  {currentActionWeekId && (
                    <span className="ml-auto text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-[#FF6100] border border-[#FF6100]/40 px-1.5 sm:px-2 py-0.5 rounded-full">
                      {currentActionWeekId}
                    </span>
                  )}
                </div>
                {currentActionText ? (
                  <p className="text-xs sm:text-sm text-white/70 font-medium leading-relaxed flex-1">
                    {currentActionText}
                  </p>
                ) : (
                  <p className="text-[10px] sm:text-xs text-white/25 font-medium flex-1">
                    Nossa equipe ira publicar aqui o foco estrategico da semana.
                  </p>
                )}
              </motion.div>

              {/* Meta Goals */}
              <GoalsPanel
                title="Meta Ads · Metas do Mes"
                icon={<img src="/images/icon_metaads.png" alt="Meta" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />}
                spend={metaSpend}
                leads={metaLeads}
                cpl={currentMonthData.meta?.cpl ?? 0}
                goalLeads={goals?.leads_meta}
                goalCpl={goals?.cpl_meta}
                goalBudget={goals?.budget_meta}
                color="#1877F2"
                shadow="#1877F2"
              />

              {/* Google Goals */}
              {hasGoogleModule && (
                <GoalsPanel
                  title="Google Ads · Metas do Mes"
                  icon={<img src="/images/icon_googleads.webp" alt="Google" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />}
                  spend={googleSpend}
                  leads={googleLeads}
                  cpl={currentMonthData.google?.cpl ?? 0}
                  goalLeads={goals?.leads_google}
                  goalCpl={goals?.cpl_google}
                  goalBudget={goals?.budget_google}
                  color="#FBBC05"
                  shadow="#FBBC05"
                />
              )}
            </div>
          </motion.div>
        )}

        {/* ── SOCIAL MEDIA ── */}
        {tab === "social" && <SocialMediaTab />}
      </AnimatePresence>
    </div>
  );
}
