"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  fmt,
  fmtNum,
  calcDelta,
  KpiCard,
  GoalsPanel,
  WeekCard,
  MonthNav,
} from "./_components";
import type { WeeklyRow } from "./_components";

// ─── Types ───────────────────────────────────────────────────
export interface MetricsRow {
  spend: number;
  impressions: number;
  reach?: number;
  clicks: number;
  leads: number;
  cpc: number;
  cpm?: number;
  cpl: number;
  ctr?: number;
  frequency?: number;
}

export { type WeeklyRow };

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
            A integracao com Instagram e Facebook esta sendo preparada. Em breve voce vera seus
            resultados de social media aqui.
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
  currentMonth,
  currentYear,
  todayMonth,
  todayYear,
  metaMetrics,
  googleMetrics,
  weeklyData = [],
  goals,
  prevMetaMetrics,
  prevGoogleMetrics,
}: {
  company: string;
  permissions?: string[];
  currentMonth?: number;
  currentYear?: number;
  todayMonth?: number;
  todayYear?: number;
  metaMetrics?: MetricsRow | null;
  googleMetrics?: MetricsRow | null;
  weeklyData?: WeeklyRow[];
  goals?: GoalsRow | null;
  /** Previous month metrics for MoM deltas */
  prevMetaMetrics?: MetricsRow | null;
  prevGoogleMetrics?: MetricsRow | null;
  /** Previous month weekly data (reserved for future use) */
  prevWeeklyData?: WeeklyRow[];
}) {
  const router = useRouter();
  const month = currentMonth ?? new Date().getMonth() + 1;
  const year = currentYear ?? new Date().getFullYear();
  const tMonth = todayMonth ?? new Date().getMonth() + 1;
  const tYear = todayYear ?? new Date().getFullYear();
  const isCurrentMonth = month === tMonth && year === tYear;

  function navigateMonth(dir: -1 | 1) {
    let m = month + dir;
    let y = year;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    if (m > 12) {
      m = 1;
      y += 1;
    }
    if (y > tYear || (y === tYear && m > tMonth)) return;
    router.push(`/area-do-cliente/dashboard?month=${m}&year=${y}`);
  }

  const hasTrafico =
    permissions.length === 0 ||
    permissions.some((p) => p === "trafego" || p.startsWith("trafego_"));
  const hasSocial = permissions.includes("social");
  const hasGoogleModule = permissions.includes("trafego_google");

  const defaultTab = hasTrafico ? "traffic" : "social";
  const [tab, setTab] = useState<"traffic" | "social">(defaultTab as "traffic" | "social");

  // ── Aggregate KPIs ────────────────────────────────
  const metaSpend = metaMetrics?.spend ?? 0;
  const googleSpend = googleMetrics?.spend ?? 0;
  const totalSpend = metaSpend + googleSpend;

  const metaLeads = metaMetrics?.leads ?? 0;
  const googleLeads = googleMetrics?.leads ?? 0;
  const totalLeads = metaLeads + (hasGoogleModule ? googleLeads : 0);

  const avgCpl = totalLeads > 0 ? totalSpend / totalLeads : 0;
  const metaCpc = metaMetrics?.cpc ?? 0;

  const hasAnyData = !!metaMetrics || !!googleMetrics;

  // ── MoM Deltas ────────────────────────────────────
  const prevTotalSpend = (prevMetaMetrics?.spend ?? 0) + (prevGoogleMetrics?.spend ?? 0);
  const prevTotalLeads =
    (prevMetaMetrics?.leads ?? 0) + (hasGoogleModule ? (prevGoogleMetrics?.leads ?? 0) : 0);
  const prevAvgCpl = prevTotalLeads > 0 ? prevTotalSpend / prevTotalLeads : 0;

  const spendDelta = calcDelta(totalSpend, prevTotalSpend);
  const leadsDelta = calcDelta(totalLeads, prevTotalLeads);
  const cplDelta = calcDelta(avgCpl, prevAvgCpl);
  const cpcDelta = calcDelta(metaCpc, prevMetaMetrics?.cpc);

  // ── Weekly data grouping ──────────────────────────
  type WeekGroup = { meta?: WeeklyRow; google?: WeeklyRow };
  const weekMap: Record<number, WeekGroup> = {};
  for (const row of weeklyData) {
    const wn = row.week_number;
    if (!weekMap[wn]) weekMap[wn] = {};
    if (row.platform === "meta") weekMap[wn].meta = row;
    if (row.platform === "google") weekMap[wn].google = row;
  }

  const existingWeeks = Object.keys(weekMap)
    .map(Number)
    .sort((a, b) => a - b);
  const maxWeek = Math.max(existingWeeks.length > 0 ? Math.max(...existingWeeks) : 0, 4);
  const weekSlots = Array.from({ length: maxWeek }, (_, i) => i + 1);

  // Current week detection
  const today = typeof window === "undefined" ? "" : new Date().toISOString().split("T")[0];
  const currentWeekNum = existingWeeks.find((wn) => {
    const w = weekMap[wn];
    const start = w.meta?.date_start ?? w.google?.date_start ?? "";
    const end = w.meta?.date_end ?? w.google?.date_end ?? "";
    return start && end && today >= start && today <= end;
  });

  // Current action text
  const currentActionWeek = currentWeekNum
    ? weekMap[currentWeekNum]
    : existingWeeks.length > 0
    ? weekMap[existingWeeks[existingWeeks.length - 1]]
    : undefined;
  const currentActionText =
    currentActionWeek?.meta?.action_text ?? currentActionWeek?.google?.action_text ?? null;

  const weeksWithData = weekSlots.filter((wn) => weekMap[wn]);

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
            Visao macro do mes
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <MonthNav
            month={month}
            year={year}
            isCurrentMonth={isCurrentMonth}
            onNavigate={navigateMonth}
          />
          {hasAnyData && (
            <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest bg-[#AAFF00] text-[#1A1A1A] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border-2 border-[#1A1A1A]">
              ✓ Sincronizado
            </span>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
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
                boxShadow:
                  tab === "traffic" ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A",
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
                boxShadow:
                  tab === "social" ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A",
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
            {/* KPIs — 2 cols mobile, 4+ cols desktop */}
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
                    <img
                      src="/images/icon_metaads.png"
                      alt="Meta"
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain mb-1"
                    />
                    <p
                      className={`text-xs sm:text-sm font-black leading-none ${
                        goals?.budget_meta && metaSpend
                          ? "text-[#1A1A1A]"
                          : "text-[#1A1A1A]/30"
                      }`}
                    >
                      {goals?.budget_meta
                        ? fmt(Math.max(0, (goals.budget_meta ?? 0) - metaSpend))
                        : "—"}
                    </p>
                  </div>
                  {hasGoogleModule && (
                    <div className="flex-1 bg-[#FBBC05]/8 border border-[#FBBC05]/30 rounded-xl px-2.5 sm:px-3 py-2">
                      <img
                        src="/images/icon_googleads.webp"
                        alt="Google"
                        className="w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain mb-1"
                      />
                      <p
                        className={`text-xs sm:text-sm font-black leading-none ${
                          goals?.budget_google && googleSpend
                            ? "text-[#1A1A1A]"
                            : "text-[#1A1A1A]/30"
                        }`}
                      >
                        {goals?.budget_google
                          ? fmt(Math.max(0, (goals.budget_google ?? 0) - googleSpend))
                          : "—"}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Weekly Section Header */}
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">
                Comparativo Semanal
              </h2>
              <span className="text-[8px] sm:text-[9px] font-bold text-[#1A1A1A]/30 border border-[#1A1A1A]/10 px-1.5 sm:px-2 py-0.5 rounded-full">
                {weeksWithData.length}/{weekSlots.length} semanas
              </span>
              <div className="flex-1 h-px bg-[#1A1A1A]/10" />
            </div>

            {/* Weekly Grid — 1 col mobile, 2 cols tablet, 4-5 cols desktop */}
            <div
              className={`grid gap-3 sm:gap-4 mb-6 sm:mb-8 ${
                weekSlots.length <= 4
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              }`}
            >
              {weekSlots.map((wn, i) => (
                <WeekCard
                  key={wn}
                  weekNum={wn}
                  metaWeek={weekMap[wn]?.meta}
                  googleWeek={weekMap[wn]?.google}
                  prevMetaWeek={wn > 1 ? weekMap[wn - 1]?.meta : undefined}
                  prevGoogleWeek={wn > 1 ? weekMap[wn - 1]?.google : undefined}
                  hasGoogleModule={hasGoogleModule}
                  isCurrent={isCurrentMonth && wn === currentWeekNum}
                  delay={i * 0.07}
                />
              ))}
            </div>

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
                  {currentWeekNum && (
                    <span className="ml-auto text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-[#FF6100] border border-[#FF6100]/40 px-1.5 sm:px-2 py-0.5 rounded-full">
                      Semana {currentWeekNum}
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
                icon={
                  <img
                    src="/images/icon_metaads.png"
                    alt="Meta"
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                  />
                }
                spend={metaSpend}
                leads={metaLeads}
                cpl={metaMetrics?.cpl ?? 0}
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
                  icon={
                    <img
                      src="/images/icon_googleads.webp"
                      alt="Google"
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain"
                    />
                  }
                  spend={googleSpend}
                  leads={googleLeads}
                  cpl={googleMetrics?.cpl ?? 0}
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
