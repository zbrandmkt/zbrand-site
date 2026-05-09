"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CarouselNav } from "./carousel-nav";
import { fmt, fmtNum, fmtDate, fmtWeekLabel, calcDelta } from "./format";
import type { WeeklyRow } from "./week-card";
import type { PlatformMode } from "./platform-toggle";

// ─── Types ──────────────────────────────────────────────────
interface WeekGroup {
  weekId: string;
  dateStart: string;
  dateEnd: string;
  meta?: WeeklyRow;
  google?: WeeklyRow;
  actionText?: string | null;
}

interface WeekCarouselProps {
  weeklyData: WeeklyRow[];
  hasGoogleModule: boolean;
  platformMode: PlatformMode;
}

// ─── Metric Row (dark theme) ────────────────────────────────
function MetricRow({
  label,
  value,
  delta,
  invertDelta = false,
}: {
  label: string;
  value: string;
  delta?: number | null;
  invertDelta?: boolean;
}) {
  const hasDelta = delta != null && isFinite(delta) && Math.abs(delta) >= 0.5;
  const isPositive = (delta ?? 0) > 0;
  const isGood = invertDelta ? !isPositive : isPositive;

  return (
    <div className="flex items-center justify-between py-[5px] sm:py-[6px] border-b border-white/[0.06] last:border-b-0">
      <span className="text-[11px] sm:text-xs text-white/50 font-medium">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="text-[12px] sm:text-[13px] font-bold text-white tabular-nums">
          {value}
        </span>
        {hasDelta && (
          <span
            className="text-[10px] sm:text-[11px] font-bold"
            style={{ color: isGood ? "#22C55E" : "#EF4444" }}
          >
            {isPositive ? "↑" : "↓"}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Platform Section (dark card) ───────────────────────────
function DarkPlatformSection({
  week,
  prevWeek,
  label,
  color,
  bgColor,
  icon,
}: {
  week: WeeklyRow;
  prevWeek?: WeeklyRow;
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}) {
  const spendDelta = calcDelta(week.spend, prevWeek?.spend);
  const leadsDelta = calcDelta(week.leads_total, prevWeek?.leads_total);
  const cplDelta = calcDelta(week.cpl_total, prevWeek?.cpl_total);
  const cpcDelta = calcDelta(week.cpc, prevWeek?.cpc);

  return (
    <div className="px-4 sm:px-5 py-3 sm:py-3.5">
      {/* Platform badge */}
      <div className="mb-2.5 sm:mb-3">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md"
          style={{ backgroundColor: bgColor, color }}
        >
          <img src={icon} alt="" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
          {label}
        </span>
      </div>

      {/* Metrics — 1 per line */}
      <div>
        <MetricRow label="Invest" value={fmt(week.spend)} delta={spendDelta} />
        <MetricRow label="Leads" value={String(week.leads_total ?? 0)} delta={leadsDelta} />
        <MetricRow label="CPL" value={(week.cpl_total ?? 0) > 0 ? fmt(week.cpl_total!) : "—"} delta={cplDelta} invertDelta />
        <MetricRow label="CPC" value={week.cpc > 0 ? fmt(week.cpc) : "—"} delta={cpcDelta} invertDelta />
      </div>
    </div>
  );
}

// ─── Consolidated Section (dark card) ───────────────────────
function ConsolidatedSection({
  week,
  prevWeek,
  hasGoogle,
}: {
  week: WeekGroup;
  prevWeek?: WeekGroup;
  hasGoogle: boolean;
}) {
  const spend = (week.meta?.spend ?? 0) + (hasGoogle ? (week.google?.spend ?? 0) : 0);
  const clicks = (week.meta?.clicks ?? 0) + (hasGoogle ? (week.google?.clicks ?? 0) : 0);
  const impressions = (week.meta?.impressions ?? 0) + (hasGoogle ? (week.google?.impressions ?? 0) : 0);
  const leadsTotal = (week.meta?.leads_total ?? 0) + (hasGoogle ? (week.google?.leads_total ?? 0) : 0);
  const cpc = clicks > 0 ? spend / clicks : 0;
  const cpl = leadsTotal > 0 ? spend / leadsTotal : 0;

  const prevSpend = (prevWeek?.meta?.spend ?? 0) + (hasGoogle ? (prevWeek?.google?.spend ?? 0) : 0);
  const prevClicks = (prevWeek?.meta?.clicks ?? 0) + (hasGoogle ? (prevWeek?.google?.clicks ?? 0) : 0);
  const prevImpressions = (prevWeek?.meta?.impressions ?? 0) + (hasGoogle ? (prevWeek?.google?.impressions ?? 0) : 0);
  const prevLeads = (prevWeek?.meta?.leads_total ?? 0) + (hasGoogle ? (prevWeek?.google?.leads_total ?? 0) : 0);
  const prevCpc = prevClicks > 0 ? prevSpend / prevClicks : 0;
  const prevCpl = prevLeads > 0 ? prevSpend / prevLeads : 0;

  return (
    <div className="px-4 sm:px-5 py-3 sm:py-3.5">
      {/* Total badge */}
      <div className="mb-2.5 sm:mb-3">
        <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#FF6100]/15 text-[#FF6100]">
          Total Consolidado
        </span>
      </div>

      {/* Metrics — 1 per line */}
      <div>
        <MetricRow label="Invest" value={fmt(spend)} delta={calcDelta(spend, prevSpend)} />
        <MetricRow label="Impressões" value={fmtNum(impressions)} delta={calcDelta(impressions, prevImpressions)} />
        <MetricRow label="Cliques" value={fmtNum(clicks)} delta={calcDelta(clicks, prevClicks)} />
        <MetricRow label="Leads" value={String(leadsTotal)} delta={calcDelta(leadsTotal, prevLeads)} />
        <MetricRow label="CPL" value={cpl > 0 ? fmt(cpl) : "—"} delta={calcDelta(cpl, prevCpl)} invertDelta />
        <MetricRow label="CPC" value={cpc > 0 ? fmt(cpc) : "—"} delta={calcDelta(cpc, prevCpc)} invertDelta />
      </div>
    </div>
  );
}

// ─── Single Week Card (dark theme) ─────────────────────────
function CarouselCard({
  week,
  prevWeek,
  isCurrent,
  hasGoogleModule,
  platformMode,
}: {
  week: WeekGroup;
  prevWeek?: WeekGroup;
  isCurrent: boolean;
  hasGoogleModule: boolean;
  platformMode: PlatformMode;
}) {
  return (
    <div
      className="bg-[#1A1A1A] rounded-2xl overflow-hidden flex flex-col h-full border-2"
      style={{
        borderColor: isCurrent ? "#FF6100" : "#2A2A2A",
        boxShadow: isCurrent
          ? "4px 4px 0px 0px #FF6100"
          : "3px 3px 0px 0px rgba(0,0,0,0.3)",
      }}
    >
      {/* Header */}
      <div
        className={`px-4 sm:px-5 py-3 sm:py-3.5 flex items-center justify-between border-b ${
          isCurrent ? "border-[#FF6100]/30" : "border-white/[0.06]"
        }`}
        style={{
          background: isCurrent
            ? "linear-gradient(135deg, #FF6100 0%, #E65500 100%)"
            : "linear-gradient(135deg, #222 0%, #1A1A1A 100%)",
        }}
      >
        <div>
          <h3
            className={`text-sm sm:text-base font-black uppercase tracking-wide ${
              isCurrent ? "text-white" : "text-white/90"
            }`}
          >
            Semana {week.weekId.split("-W")[1]?.replace(/^0/, "") ?? week.weekId}
          </h3>
          <p
            className={`text-[10px] sm:text-[11px] font-medium mt-0.5 ${
              isCurrent ? "text-white/80" : "text-white/40"
            }`}
          >
            {fmtDate(week.dateStart)} a {fmtDate(week.dateEnd)}
          </p>
        </div>
        {isCurrent ? (
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider bg-white/20 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
            Atual
          </span>
        ) : (
          <span className="text-[9px] sm:text-[10px] font-bold text-green-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Fechada
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {platformMode === "consolidated" ? (
          <ConsolidatedSection
            week={week}
            prevWeek={prevWeek}
            hasGoogle={hasGoogleModule}
          />
        ) : (
          <>
            {week.meta && (
              <DarkPlatformSection
                week={week.meta}
                prevWeek={prevWeek?.meta}
                label="Meta Ads"
                color="#4599FF"
                bgColor="rgba(24,119,242,0.15)"
                icon="/images/icon_metaads.png"
              />
            )}
            {week.google && hasGoogleModule && (
              <div className="border-t border-white/[0.06]">
                <DarkPlatformSection
                  week={week.google}
                  prevWeek={prevWeek?.google}
                  label="Google Ads"
                  color="#FBBC05"
                  bgColor="rgba(251,188,5,0.12)"
                  icon="/images/icon_googleads.webp"
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ─── Empty Card ─────────────────────────────────────────────
function EmptyCard() {
  return (
    <div className="border-2 border-dashed border-[#333] rounded-2xl flex flex-col items-center justify-center py-8 sm:py-10 gap-2 bg-[#1A1A1A]/60 h-full">
      <span className="text-xl sm:text-2xl opacity-20">📅</span>
      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white/20">
        Sem dados
      </p>
    </div>
  );
}

// ─── Main Carousel ──────────────────────────────────────────
/**
 * Weekly carousel: shows 4 cards at a time, slides 1 per arrow click.
 * Mobile: 1 card. Tablet: 2. Desktop: 4.
 */
export function WeekCarousel({ weeklyData, hasGoogleModule, platformMode }: WeekCarouselProps) {
  // Group weekly data by week_id, sorted chronologically
  const weeks = useMemo(() => {
    const map: Record<string, WeekGroup> = {};
    for (const row of weeklyData) {
      if (!map[row.week_id]) {
        map[row.week_id] = {
          weekId: row.week_id,
          dateStart: row.date_start,
          dateEnd: row.date_end,
          actionText: row.action_text,
        };
      }
      if (row.platform === "meta") map[row.week_id].meta = row;
      if (row.platform === "google") map[row.week_id].google = row;
      // Keep the earliest dateStart and latest dateEnd
      if (row.date_start < map[row.week_id].dateStart) {
        map[row.week_id].dateStart = row.date_start;
      }
      if (row.date_end > map[row.week_id].dateEnd) {
        map[row.week_id].dateEnd = row.date_end;
      }
      // Merge action text
      if (row.action_text && !map[row.week_id].actionText) {
        map[row.week_id].actionText = row.action_text;
      }
    }
    return Object.values(map).sort((a, b) => a.weekId.localeCompare(b.weekId));
  }, [weeklyData]);

  // Position: index of the RIGHTMOST visible card (most recent)
  const [endIndex, setEndIndex] = useState(Math.max(0, weeks.length - 1));

  const visibleCount = 4;
  const startIndex = Math.max(0, endIndex - visibleCount + 1);
  const visibleWeeks = weeks.slice(startIndex, endIndex + 1);
  const paddedSlots = Array.from({ length: visibleCount }, (_, i) => visibleWeeks[i] ?? null);

  const canPrev = startIndex > 0;
  const canNext = endIndex < weeks.length - 1;

  // Current week detection (client-only to avoid hydration mismatch)
  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);
  const currentWeekId = today
    ? weeks.find((w) => w.dateStart <= today && w.dateEnd >= today)?.weekId
    : undefined;

  // Nav label
  const navLabel = visibleWeeks.length > 0
    ? `${fmtWeekLabel(visibleWeeks[0].weekId)} – ${fmtWeekLabel(visibleWeeks[visibleWeeks.length - 1].weekId)}`
    : "";

  if (weeks.length === 0) {
    return (
      <div className="border-2 border-dashed border-[#1A1A1A]/15 rounded-2xl flex flex-col items-center justify-center py-12 gap-3 bg-[#F5F5F0]/60">
        <span className="text-3xl opacity-20">📅</span>
        <p className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/25">
          Nenhuma semana registrada
        </p>
        <p className="text-[10px] text-[#1A1A1A]/20 font-medium">
          Os dados semanais aparecerão aqui após a primeira atualização.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Nav */}
      <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 sm:gap-3">
          <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">
            Comparativo Semanal
          </h2>
          <span className="text-[8px] sm:text-[9px] font-bold text-[#1A1A1A]/30 border border-[#1A1A1A]/10 px-1.5 sm:px-2 py-0.5 rounded-full">
            {weeks.length} semanas
          </span>
        </div>
        <CarouselNav
          onPrev={() => setEndIndex((i) => Math.max(visibleCount - 1, i - 1))}
          onNext={() => setEndIndex((i) => Math.min(weeks.length - 1, i + 1))}
          canPrev={canPrev}
          canNext={canNext}
          label={navLabel}
        />
      </div>

      {/* Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={startIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {paddedSlots.map((week, i) => {
            if (!week) return <EmptyCard key={`empty-${i}`} />;
            const weekIdx = weeks.indexOf(week);
            const prevWeek = weekIdx > 0 ? weeks[weekIdx - 1] : undefined;
            return (
              <CarouselCard
                key={week.weekId}
                week={week}
                prevWeek={prevWeek}
                isCurrent={week.weekId === currentWeekId}
                hasGoogleModule={hasGoogleModule}
                platformMode={platformMode}
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
