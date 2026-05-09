"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CarouselNav } from "./carousel-nav";
import { PlatformSection } from "./week-card";
import { MetricLine } from "./metric-line";
import { DeltaBadge } from "./delta-badge";
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

// ─── Consolidated Section ───────────────────────────────────
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
  const prevLeads = (prevWeek?.meta?.leads_total ?? 0) + (hasGoogle ? (prevWeek?.google?.leads_total ?? 0) : 0);
  const prevCpc = prevClicks > 0 ? prevSpend / prevClicks : 0;
  const prevCpl = prevLeads > 0 ? prevSpend / prevLeads : 0;

  return (
    <div className="px-3 py-2.5 sm:px-4 sm:py-3">
      <div className="flex items-center gap-1.5 mb-2 sm:mb-2.5">
        <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#FF6100]">
          Total
        </span>
        {prevWeek && (
          <DeltaBadge delta={calcDelta(spend, prevSpend)} invertColor size="sm" />
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-1.5">
        <MetricLine label="📈 Impressoes" value={fmtNum(impressions)} />
        <MetricLine label="👆 Cliques" value={fmtNum(clicks)} delta={calcDelta(clicks, prevClicks)} />
        <MetricLine label="💰 CPC" value={cpc > 0 ? fmt(cpc) : "—"} delta={calcDelta(cpc, prevCpc)} invertDelta />
        <MetricLine label="💸 Custo" value={fmt(spend)} bold />
        {leadsTotal > 0 && (
          <>
            <MetricLine label="✅ Leads" value={String(leadsTotal)} bold delta={calcDelta(leadsTotal, prevLeads)} />
            <MetricLine label="⚠️ CPL" value={cpl > 0 ? fmt(cpl) : "—"} bold delta={calcDelta(cpl, prevCpl)} invertDelta />
          </>
        )}
      </div>
    </div>
  );
}

// ─── Single Week Card ───────────────────────────────────────
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
  const [actionOpen, setActionOpen] = useState(false);

  return (
    <div
      className={`bg-white border-2 rounded-2xl overflow-hidden flex flex-col h-full ${
        isCurrent ? "border-[#FF6100]" : "border-[#1A1A1A]/20"
      }`}
      style={{
        boxShadow: isCurrent
          ? "4px 4px 0px 0px #FF6100"
          : "3px 3px 0px 0px #1A1A1A20",
      }}
    >
      {/* Header */}
      <div
        className={`px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between border-b ${
          isCurrent
            ? "bg-[#FF6100]/8 border-[#FF6100]/20"
            : "bg-[#F5F5F0] border-[#1A1A1A]/8"
        }`}
      >
        <div>
          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">
            {fmtWeekLabel(week.weekId)}
          </span>
          <p className="text-[10px] sm:text-xs font-bold text-[#1A1A1A] leading-tight">
            {fmtDate(week.dateStart)} a {fmtDate(week.dateEnd)}
          </p>
        </div>
        {isCurrent && (
          <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest bg-[#FF6100] text-white px-1.5 sm:px-2 py-0.5 rounded-full">
            Atual
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
              <PlatformSection
                platform="meta"
                week={week.meta}
                prevWeek={prevWeek?.meta}
                icon="/images/icon_metaads.png"
                label="Meta Ads"
                color="#1877F2"
              />
            )}
            {week.google && hasGoogleModule && (
              <PlatformSection
                platform="google"
                week={week.google}
                prevWeek={prevWeek?.google}
                icon="/images/icon_googleads.webp"
                label="Google Ads"
                color="#FBBC05"
              />
            )}
          </>
        )}

        {/* Action Text */}
        {week.actionText && (
          <div className="px-3 py-2 sm:px-4 sm:py-2.5 border-t border-[#1A1A1A]/6">
            <button
              onClick={() => setActionOpen((o) => !o)}
              className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#FF6100] hover:text-[#FF6100]/70 transition-colors w-full text-left"
            >
              <span>📋 Acao</span>
              <svg
                className={`w-3 h-3 ml-auto transition-transform ${actionOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <AnimatePresence>
              {actionOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[9px] sm:text-[10px] text-[#1A1A1A]/60 font-medium mt-1.5 leading-relaxed overflow-hidden"
                >
                  {week.actionText}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Empty Card ─────────────────────────────────────────────
function EmptyCard() {
  return (
    <div className="border-2 border-dashed border-[#1A1A1A]/15 rounded-2xl flex flex-col items-center justify-center py-8 sm:py-10 gap-2 bg-[#F5F5F0]/60 h-full">
      <span className="text-xl sm:text-2xl opacity-20">📅</span>
      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/25">
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
  // Start at the end (most recent weeks visible)
  const [endIndex, setEndIndex] = useState(Math.max(0, weeks.length - 1));

  // On desktop show 4, compute start index
  const visibleCount = 4; // CSS handles responsive via hidden overflow
  const startIndex = Math.max(0, endIndex - visibleCount + 1);

  const visibleWeeks = weeks.slice(startIndex, endIndex + 1);

  // Pad if less than 4 weeks
  const paddedSlots = Array.from({ length: visibleCount }, (_, i) => visibleWeeks[i] ?? null);

  const canPrev = startIndex > 0;
  const canNext = endIndex < weeks.length - 1;

  // Current week detection
  const today = typeof window === "undefined" ? "" : new Date().toISOString().split("T")[0];
  const currentWeekId = weeks.find((w) => w.dateStart <= today && w.dateEnd >= today)?.weekId;

  // Nav label
  const navLabel = visibleWeeks.length > 0
    ? `${fmtWeekLabel(visibleWeeks[0].weekId)} - ${fmtWeekLabel(visibleWeeks[visibleWeeks.length - 1].weekId)}`
    : "";

  if (weeks.length === 0) {
    return (
      <div className="border-2 border-dashed border-[#1A1A1A]/15 rounded-2xl flex flex-col items-center justify-center py-12 gap-3 bg-[#F5F5F0]/60">
        <span className="text-3xl opacity-20">📅</span>
        <p className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/25">
          Nenhuma semana registrada
        </p>
        <p className="text-[10px] text-[#1A1A1A]/20 font-medium">
          Os dados semanais aparecerao aqui apos a primeira atualizacao.
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
