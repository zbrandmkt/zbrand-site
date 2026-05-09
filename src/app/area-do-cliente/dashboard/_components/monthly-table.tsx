"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CarouselNav } from "./carousel-nav";
import { DeltaBadge } from "./delta-badge";
import { fmtCompact, fmtNumSafe, fmtPct, fmtMonthYear, calcDelta } from "./format";
import type { PlatformMode } from "./platform-toggle";

// ─── Types ──────────────────────────────────────────────────
export interface MonthlyRow {
  client_id: string;
  platform: "meta" | "google";
  month: number;
  year: number;
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
  synced_at?: string;
}

interface MonthlyTableProps {
  monthlyData: MonthlyRow[];
  todayMonth: number;
  todayYear: number;
  platformMode: PlatformMode;
  hasGoogleModule: boolean;
}

// ─── Helpers ────────────────────────────────────────────────
interface MonthSlot {
  month: number;
  year: number;
  key: string; // "2026-04"
  meta?: MonthlyRow;
  google?: MonthlyRow;
}

function monthKey(m: number, y: number): string {
  return `${y}-${String(m).padStart(2, "0")}`;
}

// Metrics config: what rows appear in the table
interface MetricDef {
  key: string;
  label: string;
  getValue: (meta?: MonthlyRow, google?: MonthlyRow, hasGoogle?: boolean) => number;
  format: (v: number) => string;
  /** If true, lower is better (CPL, CPC) — delta colors inverted */
  invertDelta?: boolean;
}

const METRIC_ROWS: MetricDef[] = [
  {
    key: "spend",
    label: "Investido",
    getValue: (m, g, hg) => (m?.spend ?? 0) + (hg ? (g?.spend ?? 0) : 0),
    format: (v) => fmtCompact(v),
    invertDelta: true,
  },
  {
    key: "clicks",
    label: "Cliques",
    getValue: (m, g, hg) => (m?.clicks ?? 0) + (hg ? (g?.clicks ?? 0) : 0),
    format: (v) => fmtNumSafe(v),
  },
  {
    key: "impressions",
    label: "Impressoes",
    getValue: (m, g, hg) => (m?.impressions ?? 0) + (hg ? (g?.impressions ?? 0) : 0),
    format: (v) => fmtNumSafe(v),
  },
  {
    key: "leads",
    label: "Conversoes",
    getValue: (m, g, hg) => (m?.leads ?? 0) + (hg ? (g?.leads ?? 0) : 0),
    format: (v) => fmtNumSafe(v),
  },
  {
    key: "cpc",
    label: "CPC",
    getValue: (m, g, hg) => {
      const spend = (m?.spend ?? 0) + (hg ? (g?.spend ?? 0) : 0);
      const clicks = (m?.clicks ?? 0) + (hg ? (g?.clicks ?? 0) : 0);
      return clicks > 0 ? spend / clicks : 0;
    },
    format: (v) => fmtCompact(v),
    invertDelta: true,
  },
  {
    key: "cpl",
    label: "CPL",
    getValue: (m, g, hg) => {
      const spend = (m?.spend ?? 0) + (hg ? (g?.spend ?? 0) : 0);
      const leads = (m?.leads ?? 0) + (hg ? (g?.leads ?? 0) : 0);
      return leads > 0 ? spend / leads : 0;
    },
    format: (v) => fmtCompact(v),
    invertDelta: true,
  },
  {
    key: "conv_rate",
    label: "Taxa conv.",
    getValue: (m, g, hg) => {
      const clicks = (m?.clicks ?? 0) + (hg ? (g?.clicks ?? 0) : 0);
      const leads = (m?.leads ?? 0) + (hg ? (g?.leads ?? 0) : 0);
      return clicks > 0 ? (leads / clicks) * 100 : 0;
    },
    format: (v) => (v > 0 ? fmtPct(v) : "—"),
  },
];

// Per-platform metric rows (for separated mode)
const PLATFORM_METRIC_ROWS: { key: string; label: string; getValue: (row?: MonthlyRow) => number; format: (v: number) => string; invertDelta?: boolean }[] = [
  { key: "spend", label: "Investido", getValue: (r) => r?.spend ?? 0, format: (v) => fmtCompact(v), invertDelta: true },
  { key: "clicks", label: "Cliques", getValue: (r) => r?.clicks ?? 0, format: (v) => fmtNumSafe(v) },
  { key: "impressions", label: "Impressoes", getValue: (r) => r?.impressions ?? 0, format: (v) => fmtNumSafe(v) },
  { key: "leads", label: "Conversoes", getValue: (r) => r?.leads ?? 0, format: (v) => fmtNumSafe(v) },
  { key: "cpc", label: "CPC", getValue: (r) => r?.cpc ?? 0, format: (v) => fmtCompact(v), invertDelta: true },
  { key: "cpl", label: "CPL", getValue: (r) => r?.cpl ?? 0, format: (v) => fmtCompact(v), invertDelta: true },
  {
    key: "conv_rate", label: "Taxa conv.",
    getValue: (r) => (r?.clicks ?? 0) > 0 ? ((r?.leads ?? 0) / (r?.clicks ?? 1)) * 100 : 0,
    format: (v) => (v > 0 ? fmtPct(v) : "—"),
  },
];

// ─── Main Component ─────────────────────────────────────────
/**
 * Monthly comparison table: 3 months visible + optional projection.
 * Navigate 1 month at a time with arrows.
 */
export function MonthlyTable({
  monthlyData,
  todayMonth,
  todayYear,
  platformMode,
  hasGoogleModule,
}: MonthlyTableProps) {
  // Build month slots sorted chronologically
  const months = useMemo(() => {
    const map: Record<string, MonthSlot> = {};
    for (const row of monthlyData) {
      const k = monthKey(row.month, row.year);
      if (!map[k]) {
        map[k] = { month: row.month, year: row.year, key: k };
      }
      if (row.platform === "meta") map[k].meta = row;
      if (row.platform === "google") map[k].google = row;
    }
    return Object.values(map).sort((a, b) => a.key.localeCompare(b.key));
  }, [monthlyData]);

  // endIndex = index of the rightmost visible month (most recent)
  const [endIndex, setEndIndex] = useState(Math.max(0, months.length - 1));
  const startIndex = Math.max(0, endIndex - 2); // show 3 months
  const visibleMonths = months.slice(startIndex, endIndex + 1);

  const canPrev = startIndex > 0;
  const canNext = endIndex < months.length - 1;

  // Check if current month is visible (for projection column)
  const currentKey = monthKey(todayMonth, todayYear);
  const showProjection = visibleMonths.some((m) => m.key === currentKey);
  const currentSlot = months.find((m) => m.key === currentKey);

  // Projection: extrapolate current month to full month
  const dayOfMonth = new Date().getDate();
  const daysInMonth = new Date(todayYear, todayMonth, 0).getDate();
  const projectionMultiplier = dayOfMonth > 0 ? daysInMonth / dayOfMonth : 1;

  // Nav label
  const navLabel = visibleMonths.length > 0
    ? `${fmtMonthYear(visibleMonths[0].month, visibleMonths[0].year)} - ${fmtMonthYear(visibleMonths[visibleMonths.length - 1].month, visibleMonths[visibleMonths.length - 1].year)}`
    : "";

  if (months.length === 0) {
    return (
      <div className="border-2 border-dashed border-[#1A1A1A]/15 rounded-2xl flex flex-col items-center justify-center py-12 gap-3 bg-[#F5F5F0]/60">
        <span className="text-3xl opacity-20">📊</span>
        <p className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/25">
          Nenhum mes registrado
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Nav */}
      <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
        <h2 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">
          Comparativo Mensal
        </h2>
        <CarouselNav
          onPrev={() => setEndIndex((i) => Math.max(2, i - 1))}
          onNext={() => setEndIndex((i) => Math.min(months.length - 1, i + 1))}
          canPrev={canPrev}
          canNext={canNext}
          label={navLabel}
        />
      </div>

      {/* Table */}
      <AnimatePresence mode="wait">
        <motion.div
          key={startIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
          style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              {/* Header */}
              <thead>
                <tr className="bg-[#F5F5F0] border-b-2 border-[#1A1A1A]/10">
                  <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-left text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 w-[120px] sm:w-[140px]">
                    Metrica
                  </th>
                  {visibleMonths.map((slot) => {
                    const isCurrent = slot.key === currentKey;
                    const daysLabel = isCurrent ? `(${dayOfMonth} dias)` : "";
                    return (
                      <th
                        key={slot.key}
                        className={`px-3 sm:px-4 py-2.5 sm:py-3 text-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest ${
                          isCurrent ? "text-[#FF6100]" : "text-[#1A1A1A]/60"
                        }`}
                      >
                        <div>{fmtMonthYear(slot.month, slot.year)}</div>
                        {daysLabel && (
                          <div className="text-[7px] sm:text-[8px] font-bold text-[#1A1A1A]/30 normal-case tracking-normal mt-0.5">
                            {daysLabel}
                          </div>
                        )}
                      </th>
                    );
                  })}
                  {showProjection && (
                    <th className="px-3 sm:px-4 py-2.5 sm:py-3 text-center text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#AAFF00] bg-[#1A1A1A]">
                      <div>Projecao 30d</div>
                      <div className="text-[7px] sm:text-[8px] font-bold text-white/30 normal-case tracking-normal mt-0.5">
                        estimativa
                      </div>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {platformMode === "consolidated" ? (
                  // ─── Consolidated rows ────────────────
                  METRIC_ROWS.map((metric, rowIdx) => (
                    <tr
                      key={metric.key}
                      className={rowIdx % 2 === 0 ? "bg-white" : "bg-[#F5F5F0]/40"}
                    >
                      <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">
                        {metric.label}
                      </td>
                      {visibleMonths.map((slot, colIdx) => {
                        const value = metric.getValue(slot.meta, slot.google, hasGoogleModule);
                        // Get previous month for delta
                        const prevIdx = months.indexOf(slot) - 1;
                        const prevSlot = prevIdx >= 0 ? months[prevIdx] : undefined;
                        const prevValue = prevSlot
                          ? metric.getValue(prevSlot.meta, prevSlot.google, hasGoogleModule)
                          : undefined;
                        const delta = calcDelta(value, prevValue ?? undefined);

                        return (
                          <td
                            key={slot.key}
                            className="px-3 sm:px-4 py-2 sm:py-2.5 text-center"
                          >
                            <span className="text-xs sm:text-sm font-black text-[#1A1A1A]">
                              {metric.format(value)}
                            </span>
                            {colIdx > 0 && delta != null && (
                              <div className="mt-0.5">
                                <DeltaBadge
                                  delta={delta}
                                  invertColor={metric.invertDelta}
                                  size="sm"
                                />
                              </div>
                            )}
                          </td>
                        );
                      })}
                      {showProjection && currentSlot && (
                        <td className="px-3 sm:px-4 py-2 sm:py-2.5 text-center bg-[#1A1A1A]/[0.03]">
                          <span className="text-xs sm:text-sm font-black text-[#1A1A1A]/50">
                            ~{metric.format(
                              metric.getValue(currentSlot.meta, currentSlot.google, hasGoogleModule) * projectionMultiplier
                            )}
                          </span>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  // ─── Separated by platform ────────────
                  <>
                    {/* Meta section */}
                    <tr className="bg-[#1877F2]/5 border-b border-[#1877F2]/10">
                      <td colSpan={visibleMonths.length + 1 + (showProjection ? 1 : 0)} className="px-3 sm:px-4 py-1.5 sm:py-2">
                        <div className="flex items-center gap-1.5">
                          <img src="/images/icon_metaads.png" alt="Meta" className="w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain" />
                          <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#1877F2]">Meta Ads</span>
                        </div>
                      </td>
                    </tr>
                    {PLATFORM_METRIC_ROWS.map((metric, rowIdx) => (
                      <tr key={`meta-${metric.key}`} className={rowIdx % 2 === 0 ? "bg-white" : "bg-[#F5F5F0]/40"}>
                        <td className="px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[9px] font-bold text-[#1A1A1A]/30 pl-6 sm:pl-8">
                          {metric.label}
                        </td>
                        {visibleMonths.map((slot, colIdx) => {
                          const value = metric.getValue(slot.meta);
                          const prevIdx = months.indexOf(slot) - 1;
                          const prevValue = prevIdx >= 0 ? metric.getValue(months[prevIdx].meta) : undefined;
                          const delta = calcDelta(value, prevValue ?? undefined);
                          return (
                            <td key={slot.key} className="px-3 sm:px-4 py-1.5 sm:py-2 text-center">
                              <span className="text-[10px] sm:text-xs font-black text-[#1A1A1A]">{metric.format(value)}</span>
                              {colIdx > 0 && delta != null && (
                                <div className="mt-0.5"><DeltaBadge delta={delta} invertColor={metric.invertDelta} size="sm" /></div>
                              )}
                            </td>
                          );
                        })}
                        {showProjection && currentSlot && (
                          <td className="px-3 sm:px-4 py-1.5 sm:py-2 text-center bg-[#1A1A1A]/[0.03]">
                            <span className="text-[10px] sm:text-xs font-black text-[#1A1A1A]/50">
                              ~{metric.format(metric.getValue(currentSlot.meta) * projectionMultiplier)}
                            </span>
                          </td>
                        )}
                      </tr>
                    ))}

                    {/* Google section */}
                    {hasGoogleModule && (
                      <>
                        <tr className="bg-[#FBBC05]/5 border-b border-[#FBBC05]/10 border-t border-t-[#1A1A1A]/6">
                          <td colSpan={visibleMonths.length + 1 + (showProjection ? 1 : 0)} className="px-3 sm:px-4 py-1.5 sm:py-2">
                            <div className="flex items-center gap-1.5">
                              <img src="/images/icon_googleads.webp" alt="Google" className="w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain" />
                              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#FBBC05]">Google Ads</span>
                            </div>
                          </td>
                        </tr>
                        {PLATFORM_METRIC_ROWS.map((metric, rowIdx) => (
                          <tr key={`google-${metric.key}`} className={rowIdx % 2 === 0 ? "bg-white" : "bg-[#F5F5F0]/40"}>
                            <td className="px-3 sm:px-4 py-1.5 sm:py-2 text-[8px] sm:text-[9px] font-bold text-[#1A1A1A]/30 pl-6 sm:pl-8">
                              {metric.label}
                            </td>
                            {visibleMonths.map((slot, colIdx) => {
                              const value = metric.getValue(slot.google);
                              const prevIdx = months.indexOf(slot) - 1;
                              const prevValue = prevIdx >= 0 ? metric.getValue(months[prevIdx].google) : undefined;
                              const delta = calcDelta(value, prevValue ?? undefined);
                              return (
                                <td key={slot.key} className="px-3 sm:px-4 py-1.5 sm:py-2 text-center">
                                  <span className="text-[10px] sm:text-xs font-black text-[#1A1A1A]">{metric.format(value)}</span>
                                  {colIdx > 0 && delta != null && (
                                    <div className="mt-0.5"><DeltaBadge delta={delta} invertColor={metric.invertDelta} size="sm" /></div>
                                  )}
                                </td>
                              );
                            })}
                            {showProjection && currentSlot && (
                              <td className="px-3 sm:px-4 py-1.5 sm:py-2 text-center bg-[#1A1A1A]/[0.03]">
                                <span className="text-[10px] sm:text-xs font-black text-[#1A1A1A]/50">
                                  ~{metric.format(metric.getValue(currentSlot.google) * projectionMultiplier)}
                                </span>
                              </td>
                            )}
                          </tr>
                        ))}
                      </>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
