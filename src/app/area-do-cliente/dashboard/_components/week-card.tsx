"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MetricLine } from "./metric-line";
import { DeltaBadge } from "./delta-badge";
import { fmt, fmtNum, fmtDate, calcDelta } from "./format";

// ─── Types ──────────────────────────────────────────────────
export interface WeeklyRow {
  week_id: string;          // "2026-W18" — global ISO week identifier
  week_number: number;      // kept for backward compat
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

interface WeekCardProps {
  weekNum: number;
  metaWeek?: WeeklyRow;
  googleWeek?: WeeklyRow;
  /** Previous week data for WoW delta calculation */
  prevMetaWeek?: WeeklyRow;
  prevGoogleWeek?: WeeklyRow;
  hasGoogleModule: boolean;
  isCurrent: boolean;
  delay: number;
}

// ─── Platform Section ───────────────────────────────────────
export function PlatformSection({
  platform,
  week,
  prevWeek,
  icon,
  label,
  color,
}: {
  platform: "meta" | "google";
  week: WeeklyRow;
  prevWeek?: WeeklyRow;
  icon: string;
  label: string;
  color: string;
}) {
  const spendDelta = calcDelta(week.spend, prevWeek?.spend);
  const clicksDelta = calcDelta(week.clicks, prevWeek?.clicks);
  const cpcDelta = calcDelta(week.cpc, prevWeek?.cpc);
  const leadsDelta = calcDelta(week.leads_total, prevWeek?.leads_total);
  const cplDelta = calcDelta(week.cpl_total, prevWeek?.cpl_total);

  return (
    <div className="px-3 py-2.5 sm:px-4 sm:py-3 border-b border-[#1A1A1A]/6 last:border-b-0">
      <div className="flex items-center gap-1.5 mb-2 sm:mb-2.5">
        <img src={icon} alt={label} className="w-3 h-3 sm:w-3.5 sm:h-3.5 object-contain" />
        <span
          className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest"
          style={{ color }}
        >
          {label}
        </span>
        {spendDelta != null && (
          <DeltaBadge delta={spendDelta} invertColor size="sm" />
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-1.5">
        <MetricLine label="📈 Impressoes" value={fmtNum(week.impressions)} />
        {platform === "meta" && (week.reach ?? 0) > 0 && (
          <MetricLine label="👥 Alcance" value={fmtNum(week.reach!)} />
        )}
        <MetricLine
          label="👆 Cliques"
          value={fmtNum(week.clicks)}
          delta={clicksDelta}
        />
        <MetricLine
          label="💰 CPC"
          value={fmt(week.cpc)}
          delta={cpcDelta}
          invertDelta
        />
        <MetricLine label="💸 Custo" value={fmt(week.spend)} bold />
      </div>

      {/* Conversions */}
      {((week.leads_total ?? 0) > 0 ||
        (week.leads_whatsapp ?? 0) > 0 ||
        (week.leads_form ?? 0) > 0) && (
        <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-[#1A1A1A]/06">
          <p className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-1 sm:mb-1.5">
            Conversoes
          </p>
          <div className="grid grid-cols-2 gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-1.5">
            {(week.leads_whatsapp ?? 0) > 0 && (
              <MetricLine label="💬 WhatsApp" value={String(week.leads_whatsapp)} />
            )}
            {(week.leads_whatsapp ?? 0) > 0 && (week.cpl_whatsapp ?? 0) > 0 && (
              <MetricLine label="⚠️ CPL WA" value={fmt(week.cpl_whatsapp!)} />
            )}
            {(week.leads_form ?? 0) > 0 && (
              <MetricLine label="📄 Formulario" value={String(week.leads_form)} />
            )}
            {(week.leads_form ?? 0) > 0 && (week.cpl_form ?? 0) > 0 && (
              <MetricLine label="⚠️ CPL Form" value={fmt(week.cpl_form!)} />
            )}
            <MetricLine
              label="✅ Total"
              value={String(week.leads_total ?? 0)}
              bold
              delta={leadsDelta}
            />
            {(week.cpl_total ?? 0) > 0 && (
              <MetricLine
                label="⚠️ CPL Total"
                value={fmt(week.cpl_total!)}
                bold
                delta={cplDelta}
                invertDelta
              />
            )}
          </div>
        </div>
      )}

      {/* Google Ads balance */}
      {platform === "google" && (week.balance ?? 0) > 0 && (
        <div className="mt-1.5 pt-1.5 border-t border-[#1A1A1A]/06">
          <MetricLine label="💳 Saldo" value={fmt(week.balance!)} />
        </div>
      )}
    </div>
  );
}

// ─── Main WeekCard ──────────────────────────────────────────
/**
 * Weekly data card showing Meta + Google metrics side by side.
 * Supports WoW deltas via prevMetaWeek / prevGoogleWeek props.
 * Mobile-first: full width, compact spacing, touch-friendly accordion.
 */
export function WeekCard({
  weekNum,
  metaWeek,
  googleWeek,
  prevMetaWeek,
  prevGoogleWeek,
  hasGoogleModule,
  isCurrent,
  delay,
}: WeekCardProps) {
  const [actionOpen, setActionOpen] = useState(false);
  const hasData = !!metaWeek || !!googleWeek;
  const dateStart = metaWeek?.date_start ?? googleWeek?.date_start ?? "";
  const dateEnd = metaWeek?.date_end ?? googleWeek?.date_end ?? "";
  const actionText = metaWeek?.action_text ?? googleWeek?.action_text ?? null;

  // ─── Empty state ────────────────────────────────────────
  if (!hasData) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.35 }}
        className="border-2 border-dashed border-[#1A1A1A]/15 rounded-2xl flex flex-col items-center justify-center py-8 sm:py-10 gap-2 bg-[#F5F5F0]/60"
      >
        <span className="text-xl sm:text-2xl opacity-20">📅</span>
        <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/25">
          Semana {weekNum}
        </p>
        <p className="text-[8px] sm:text-[9px] text-[#1A1A1A]/20 font-medium">
          Aguardando dados
        </p>
      </motion.div>
    );
  }

  // ─── With data ──────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`bg-white border-2 rounded-2xl overflow-hidden flex flex-col ${
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
            Semana {weekNum}
          </span>
          {dateStart && (
            <p className="text-[10px] sm:text-xs font-bold text-[#1A1A1A] leading-tight">
              {fmtDate(dateStart)} a {fmtDate(dateEnd)}
            </p>
          )}
        </div>
        {isCurrent && (
          <span className="text-[7px] sm:text-[8px] font-black uppercase tracking-widest bg-[#FF6100] text-white px-1.5 sm:px-2 py-0.5 rounded-full">
            Atual
          </span>
        )}
      </div>

      <div className="flex flex-col gap-0 flex-1">
        {/* Meta Section */}
        {metaWeek && (
          <PlatformSection
            platform="meta"
            week={metaWeek}
            prevWeek={prevMetaWeek}
            icon="/images/icon_metaads.png"
            label="Meta Ads"
            color="#1877F2"
          />
        )}

        {/* Google Section */}
        {googleWeek && hasGoogleModule && (
          <PlatformSection
            platform="google"
            week={googleWeek}
            prevWeek={prevGoogleWeek}
            icon="/images/icon_googleads.webp"
            label="Google Ads"
            color="#FBBC05"
          />
        )}

        {/* Action Text */}
        {actionText && (
          <div className="px-3 py-2 sm:px-4 sm:py-2.5">
            <button
              onClick={() => setActionOpen((o) => !o)}
              className="flex items-center gap-1.5 text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#FF6100] hover:text-[#FF6100]/70 transition-colors w-full text-left"
            >
              <span>📋 Acao da Semana</span>
              <svg
                className={`w-3 h-3 ml-auto transition-transform ${
                  actionOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
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
