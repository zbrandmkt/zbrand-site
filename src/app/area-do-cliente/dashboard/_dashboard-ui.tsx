"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export interface WeeklyRow {
  week_number: number;
  date_start: string;
  date_end: string;
  platform: "meta" | "google";
  spend: number;
  impressions: number;
  reach?: number;
  clicks: number;
  cpc: number;
  leads_whatsapp?: number;
  leads_form?: number;
  leads_total?: number;
  cpl_whatsapp?: number;
  cpl_form?: number;
  cpl_total?: number;
  balance?: number;
  action_text?: string | null;
}

export interface GoalsRow {
  leads_meta?: number | null;
  cpl_meta?: number | null;
  budget_meta?: number | null;
  leads_google?: number | null;
  cpl_google?: number | null;
  budget_google?: number | null;
}

// ─── Helpers ─────────────────────────────────────────────────
function fmt(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtNum(value: number): string {
  return value.toLocaleString("pt-BR");
}
function fmtDate(dateStr: string): string {
  if (!dateStr) return "—";
  const parts = dateStr.split("-");
  if (parts.length < 3) return dateStr;
  return `${parts[2]}/${parts[1]}`;
}
function monthName(month: number): string {
  const names = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
  return names[month - 1] ?? "";
}
function progressPct(actual: number, target: number): number {
  if (!target || target <= 0) return 0;
  return Math.min(100, Math.round((actual / target) * 100));
}

// ─── KPI Card ────────────────────────────────────────────────
function KpiCard({ emoji, label, value, shadow, delay = 0, dim = false }: {
  emoji?: string; label: string; value: string; shadow: string; delay?: number; dim?: boolean;
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
      <p className={`text-2xl font-black leading-none ${dim ? "text-[#1A1A1A]/30" : "text-[#1A1A1A]"}`}>{value}</p>
    </motion.div>
  );
}

// ─── Goal Progress Card ──────────────────────────────────────
function GoalBar({ label, actual, target, isMax = false, formatFn, color }: {
  label: string; actual: number; target?: number | null; isMax?: boolean; formatFn: (v: number) => string; color: string;
}) {
  if (!target) return null;
  const pct = isMax
    ? (actual <= target ? 100 : Math.max(0, Math.round(100 - ((actual - target) / target) * 100)))
    : progressPct(actual, target);
  const isGood = isMax ? actual <= target : actual >= target;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">{label}</span>
        <span className="text-[10px] font-bold text-[#1A1A1A]/50">{formatFn(actual)} / meta {formatFn(target)}</span>
      </div>
      <div className="h-2 bg-[#1A1A1A]/8 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: isGood ? "#AAFF00" : color }}
        />
      </div>
      <p className="text-[9px] text-[#1A1A1A]/30 font-medium">{pct}% {isMax ? "dentro da meta" : "atingido"}</p>
    </div>
  );
}

// ─── Week Card ───────────────────────────────────────────────
function WeekCard({ weekNum, metaWeek, googleWeek, hasGoogleModule, isCurrent, delay }: {
  weekNum: number;
  metaWeek?: WeeklyRow;
  googleWeek?: WeeklyRow;
  hasGoogleModule: boolean;
  isCurrent: boolean;
  delay: number;
}) {
  const [actionOpen, setActionOpen] = useState(false);
  const hasData = !!metaWeek || !!googleWeek;
  const dateStart = metaWeek?.date_start ?? googleWeek?.date_start ?? "";
  const dateEnd = metaWeek?.date_end ?? googleWeek?.date_end ?? "";
  const actionText = metaWeek?.action_text ?? googleWeek?.action_text ?? null;

  if (!hasData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.35 }}
        className="border-2 border-dashed border-[#1A1A1A]/15 rounded-2xl flex flex-col items-center justify-center py-10 gap-2 bg-[#F5F5F0]/60"
      >
        <span className="text-2xl opacity-20">📅</span>
        <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/25">Semana {weekNum}</p>
        <p className="text-[9px] text-[#1A1A1A]/20 font-medium">Aguardando dados</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white border-2 rounded-2xl overflow-hidden flex flex-col ${isCurrent ? "border-[#FF6100]" : "border-[#1A1A1A]/20"}`}
      style={{ boxShadow: isCurrent ? "4px 4px 0px 0px #FF6100" : "3px 3px 0px 0px #1A1A1A20" }}
    >
      {/* Header */}
      <div className={`px-4 py-2.5 flex items-center justify-between border-b ${isCurrent ? "bg-[#FF6100]/8 border-[#FF6100]/20" : "bg-[#F5F5F0] border-[#1A1A1A]/8"}`}>
        <div>
          <span className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Semana {weekNum}</span>
          {dateStart && (
            <p className="text-xs font-bold text-[#1A1A1A] leading-tight">
              {fmtDate(dateStart)} a {fmtDate(dateEnd)}
            </p>
          )}
        </div>
        {isCurrent && (
          <span className="text-[8px] font-black uppercase tracking-widest bg-[#FF6100] text-white px-2 py-0.5 rounded-full">
            Atual
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0 flex-1">
        {/* Meta Section */}
        {metaWeek && (
          <div className="px-4 py-3 border-b border-[#1A1A1A]/6">
            <div className="flex items-center gap-1.5 mb-2.5">
              <img src="/images/icon_metaads.png" alt="Meta" className="w-3.5 h-3.5 object-contain" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[#1877F2]">Meta Ads</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              <MetricLine label="📈 Impressões" value={fmtNum(metaWeek.impressions)} />
              {(metaWeek.reach ?? 0) > 0 && <MetricLine label="👥 Alcance" value={fmtNum(metaWeek.reach!)} />}
              <MetricLine label="👆 Cliques" value={fmtNum(metaWeek.clicks)} />
              <MetricLine label="💰 CPC" value={fmt(metaWeek.cpc)} />
              <MetricLine label="💸 Custo" value={fmt(metaWeek.spend)} bold />
            </div>
            {((metaWeek.leads_total ?? 0) > 0 || (metaWeek.leads_whatsapp ?? 0) > 0 || (metaWeek.leads_form ?? 0) > 0) && (
              <div className="mt-2 pt-2 border-t border-[#1877F2]/10">
                <p className="text-[8px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-1.5">Conversões</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                  {(metaWeek.leads_whatsapp ?? 0) > 0 && (
                    <MetricLine label="💬 WhatsApp" value={String(metaWeek.leads_whatsapp ?? 0)} />
                  )}
                  {(metaWeek.leads_whatsapp ?? 0) > 0 && (metaWeek.cpl_whatsapp ?? 0) > 0 && (
                    <MetricLine label="⚠️ CPL WA" value={fmt(metaWeek.cpl_whatsapp!)} />
                  )}
                  {(metaWeek.leads_form ?? 0) > 0 && (
                    <MetricLine label="📄 Formulário" value={String(metaWeek.leads_form ?? 0)} />
                  )}
                  {(metaWeek.leads_form ?? 0) > 0 && (metaWeek.cpl_form ?? 0) > 0 && (
                    <MetricLine label="⚠️ CPL Form" value={fmt(metaWeek.cpl_form!)} />
                  )}
                  <MetricLine label="✅ Total" value={String(metaWeek.leads_total ?? 0)} bold />
                  {(metaWeek.cpl_total ?? 0) > 0 && (
                    <MetricLine label="⚠️ CPL Total" value={fmt(metaWeek.cpl_total!)} bold />
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Google Section */}
        {googleWeek && hasGoogleModule && (
          <div className="px-4 py-3 border-b border-[#1A1A1A]/6">
            <div className="flex items-center gap-1.5 mb-2.5">
              <img src="/images/icon_googleads.webp" alt="Google" className="w-3.5 h-3.5 object-contain" />
              <span className="text-[9px] font-black uppercase tracking-widest text-[#FBBC05]">Google Ads</span>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              <MetricLine label="🔍 Impressões" value={fmtNum(googleWeek.impressions)} />
              <MetricLine label="👆 Cliques" value={fmtNum(googleWeek.clicks)} />
              <MetricLine label="💰 CPC" value={fmt(googleWeek.cpc)} />
              <MetricLine label="💸 Custo" value={fmt(googleWeek.spend)} bold />
              {(googleWeek.leads_total ?? 0) > 0 && (
                <MetricLine label="📩 Conversões" value={String(googleWeek.leads_total ?? 0)} bold />
              )}
              {(googleWeek.cpl_total ?? 0) > 0 && (
                <MetricLine label="⚠️ CPL" value={fmt(googleWeek.cpl_total!)} bold />
              )}
              {(googleWeek.balance ?? 0) > 0 && (
                <MetricLine label="💳 Saldo" value={fmt(googleWeek.balance!)} />
              )}
            </div>
          </div>
        )}

        {/* Ação da Semana */}
        {actionText && (
          <div className="px-4 py-2.5">
            <button
              onClick={() => setActionOpen((o) => !o)}
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#FF6100] hover:text-[#FF6100]/70 transition-colors w-full text-left"
            >
              <span>📋 Ação da Semana</span>
              <svg className={`w-3 h-3 ml-auto transition-transform ${actionOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {actionOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] text-[#1A1A1A]/60 font-medium mt-1.5 leading-relaxed overflow-hidden"
                >
                  {actionText}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MetricLine({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-1 min-w-0">
      <span className="text-[9px] text-[#1A1A1A]/40 font-medium truncate shrink-0">{label}</span>
      <span className={`text-[10px] ${bold ? "font-black text-[#1A1A1A]" : "font-bold text-[#1A1A1A]/70"} text-right`}>{value}</span>
    </div>
  );
}

// ─── Goals Panel ─────────────────────────────────────────────
function GoalsPanel({ title, icon, spend, leads, cpl, goalLeads, goalCpl, goalBudget, color, shadow }: {
  title: string; icon: React.ReactNode;
  spend: number; leads: number; cpl: number;
  goalLeads?: number | null; goalCpl?: number | null; goalBudget?: number | null;
  color: string; shadow: string;
}) {
  const hasAnyGoal = goalLeads || goalCpl || goalBudget;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex flex-col gap-4"
      style={{ boxShadow: `4px 4px 0px 0px ${shadow}` }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">{title}</h3>
      </div>

      {/* Current values */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">Investido</p>
          <p className="text-sm font-black text-[#1A1A1A]">{fmt(spend)}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">Leads</p>
          <p className="text-sm font-black text-[#1A1A1A]">{fmtNum(leads)}</p>
        </div>
        <div className="text-center">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">CPL</p>
          <p className="text-sm font-black text-[#1A1A1A]">{cpl > 0 ? fmt(cpl) : "—"}</p>
        </div>
      </div>

      {/* Goal bars */}
      {hasAnyGoal ? (
        <div className="flex flex-col gap-3 pt-1 border-t border-[#1A1A1A]/6">
          <GoalBar
            label="Leads"
            actual={leads}
            target={goalLeads}
            formatFn={fmtNum}
            color={color}
          />
          <GoalBar
            label="CPL Máx"
            actual={cpl}
            target={goalCpl}
            isMax
            formatFn={fmt}
            color={color}
          />
          <GoalBar
            label="Budget"
            actual={spend}
            target={goalBudget}
            formatFn={fmt}
            color={color}
          />
        </div>
      ) : (
        <p className="text-[10px] text-[#1A1A1A]/30 font-medium text-center py-2">
          Metas não configuradas ainda
        </p>
      )}
    </motion.div>
  );
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
      <div className="flex gap-3 mb-6">
        {(["👁️ Visualizações", "🎯 Alcance", "👥 Seguidores", "❤️ Interações"] as const).map((label, i) => (
          <KpiCard key={label} emoji="" label={label.split(" ").slice(1).join(" ")} value="—" shadow={["#FF6100","#00C2FF","#AAFF00","#7B2FF7"][i]} delay={i * 0.05} dim />
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-8 flex flex-col items-center gap-4 text-center"
        style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
      >
        <span className="text-4xl">📱</span>
        <div>
          <p className="text-sm font-black text-[#1A1A1A]">Métricas de Social Media em breve</p>
          <p className="text-xs text-[#1A1A1A]/40 mt-1 max-w-sm">
            A integração com Instagram e Facebook está sendo preparada. Em breve você verá seus resultados de social media aqui.
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
  metaMetrics,
  googleMetrics,
  weeklyData = [],
  goals,
}: {
  company: string;
  permissions?: string[];
  currentMonth?: number;
  currentYear?: number;
  metaMetrics?: MetricsRow | null;
  googleMetrics?: MetricsRow | null;
  weeklyData?: WeeklyRow[];
  goals?: GoalsRow | null;
}) {
  const month = currentMonth ?? (new Date().getMonth() + 1);
  const year = currentYear ?? new Date().getFullYear();

  const hasTrafico = permissions.length === 0 || permissions.some(
    (p) => p === "trafego" || p.startsWith("trafego_")
  );
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

  // ── Weekly data grouping ──────────────────────────
  type WeekGroup = { meta?: WeeklyRow; google?: WeeklyRow };
  const weekMap: Record<number, WeekGroup> = {};
  for (const row of weeklyData) {
    const wn = row.week_number;
    if (!weekMap[wn]) weekMap[wn] = {};
    if (row.platform === "meta") weekMap[wn].meta = row;
    if (row.platform === "google") weekMap[wn].google = row;
  }

  // Build list: up to 5 slots, filling from existing data
  const existingWeeks = Object.keys(weekMap).map(Number).sort((a, b) => a - b);
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

  // Current action text: from current week, or latest week
  const currentActionWeek = currentWeekNum
    ? weekMap[currentWeekNum]
    : existingWeeks.length > 0 ? weekMap[existingWeeks[existingWeeks.length - 1]] : undefined;
  const currentActionText = currentActionWeek?.meta?.action_text ?? currentActionWeek?.google?.action_text ?? null;

  const weeksWithData = weekSlots.filter((wn) => weekMap[wn]);
  const gridCols = weekSlots.length <= 4 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5";

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
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">
            {monthName(month)} {year} · Visão macro do mês
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasAnyData && (
            <span className="text-[9px] font-black uppercase tracking-widest bg-[#AAFF00] text-[#1A1A1A] px-3 py-1.5 rounded-full border-2 border-[#1A1A1A]">
              ✓ Dados sincronizados
            </span>
          )}
        </div>
      </motion.div>

      {/* Tabs */}
      {(hasTrafico || hasSocial) && (
        <div className="flex gap-2 mb-6">
          {hasTrafico && (
            <button
              onClick={() => setTab("traffic")}
              className={`px-5 py-2 border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                tab === "traffic" ? "bg-[#FF6100] text-white" : "bg-white text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
              }`}
              style={{ boxShadow: tab === "traffic" ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A" }}
            >
              📊 Tráfego Pago
            </button>
          )}
          {hasSocial && (
            <button
              onClick={() => setTab("social")}
              className={`px-5 py-2 border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                tab === "social" ? "bg-[#FF6100] text-white" : "bg-white text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
              }`}
              style={{ boxShadow: tab === "social" ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A" }}
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
            {/* KPIs */}
            <div className="flex gap-3 mb-6 flex-wrap">
              <KpiCard
                emoji="💸"
                label="Total Investido"
                value={hasAnyData ? fmt(totalSpend) : "—"}
                shadow="#FF6100"
                delay={0}
                dim={!hasAnyData}
              />
              <KpiCard
                emoji="🎯"
                label="Total de Leads"
                value={hasAnyData ? fmtNum(totalLeads) : "—"}
                shadow="#00C2FF"
                delay={0.05}
                dim={!hasAnyData}
              />
              <KpiCard
                emoji="💰"
                label="CPL Médio"
                value={avgCpl > 0 ? fmt(avgCpl) : "—"}
                shadow="#AAFF00"
                delay={0.1}
                dim={avgCpl === 0}
              />
              <KpiCard
                emoji="👆"
                label="CPC Meta"
                value={metaCpc > 0 ? fmt(metaCpc) : "—"}
                shadow="#7B2FF7"
                delay={0.15}
                dim={metaCpc === 0}
              />

              {/* Budget mini-cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-0"
                style={{ boxShadow: "5px 5px 0px 0px #1A1A1A", flex: "1.5" }}
              >
                <span className="text-xl leading-none">💳</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">Budget Restante</p>
                <div className="flex gap-2 flex-1 items-end mt-1">
                  <div className="flex-1 bg-[#1877F2]/8 border border-[#1877F2]/20 rounded-xl px-3 py-2">
                    <img src="/images/icon_metaads.png" alt="Meta" className="w-3.5 h-3.5 object-contain mb-1" />
                    <p className={`text-sm font-black leading-none ${goals?.budget_meta && metaSpend ? "text-[#1A1A1A]" : "text-[#1A1A1A]/30"}`}>
                      {goals?.budget_meta ? fmt(Math.max(0, (goals.budget_meta ?? 0) - metaSpend)) : "—"}
                    </p>
                  </div>
                  {hasGoogleModule && (
                    <div className="flex-1 bg-[#FBBC05]/8 border border-[#FBBC05]/30 rounded-xl px-3 py-2">
                      <img src="/images/icon_googleads.webp" alt="Google" className="w-3.5 h-3.5 object-contain mb-1" />
                      <p className={`text-sm font-black leading-none ${goals?.budget_google && googleSpend ? "text-[#1A1A1A]" : "text-[#1A1A1A]/30"}`}>
                        {goals?.budget_google ? fmt(Math.max(0, (goals.budget_google ?? 0) - googleSpend)) : "—"}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Weekly Section Header */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">Comparativo Semanal</h2>
              <span className="text-[9px] font-bold text-[#1A1A1A]/30 border border-[#1A1A1A]/10 px-2 py-0.5 rounded-full">
                {weeksWithData.length}/{weekSlots.length} semanas
              </span>
              <div className="flex-1 h-px bg-[#1A1A1A]/10" />
            </div>

            {/* Weekly Grid */}
            <div className={`grid ${gridCols} gap-4 mb-8`}>
              {weekSlots.map((wn, i) => (
                <WeekCard
                  key={wn}
                  weekNum={wn}
                  metaWeek={weekMap[wn]?.meta}
                  googleWeek={weekMap[wn]?.google}
                  hasGoogleModule={hasGoogleModule}
                  isCurrent={wn === currentWeekNum}
                  delay={i * 0.07}
                />
              ))}
            </div>

            {/* Bottom row: Action + Goals */}
            <div className={`grid gap-4 ${hasGoogleModule ? "grid-cols-1 lg:grid-cols-3" : "grid-cols-1 lg:grid-cols-2"}`}>
              {/* Ação da Semana */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-2xl p-5 flex flex-col gap-3"
                style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">📋</span>
                  <h3 className="text-[10px] font-black uppercase tracking-widest text-white/50">Ação da Semana</h3>
                  {currentWeekNum && (
                    <span className="ml-auto text-[8px] font-black uppercase tracking-widest text-[#FF6100] border border-[#FF6100]/40 px-2 py-0.5 rounded-full">
                      Semana {currentWeekNum}
                    </span>
                  )}
                </div>
                {currentActionText ? (
                  <p className="text-sm text-white/70 font-medium leading-relaxed flex-1">
                    {currentActionText}
                  </p>
                ) : (
                  <p className="text-xs text-white/25 font-medium flex-1">
                    Nossa equipe irá publicar aqui o foco estratégico da semana.
                  </p>
                )}
              </motion.div>

              {/* Meta Goals */}
              <GoalsPanel
                title="Meta Ads · Metas do Mês"
                icon={<img src="/images/icon_metaads.png" alt="Meta" className="w-4 h-4 object-contain" />}
                spend={metaSpend}
                leads={metaLeads}
                cpl={metaMetrics?.cpl ?? 0}
                goalLeads={goals?.leads_meta}
                goalCpl={goals?.cpl_meta}
                goalBudget={goals?.budget_meta}
                color="#1877F2"
                shadow="#1877F2"
              />

              {/* Google Goals (only if has google module) */}
              {hasGoogleModule && (
                <GoalsPanel
                  title="Google Ads · Metas do Mês"
                  icon={<img src="/images/icon_googleads.webp" alt="Google" className="w-4 h-4 object-contain" />}
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
