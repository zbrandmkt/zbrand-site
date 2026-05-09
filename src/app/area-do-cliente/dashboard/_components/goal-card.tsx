"use client";

import { motion } from "framer-motion";
import { STATUS_COLORS } from "./platform-config";

interface GoalCardProps {
  label: string;
  target: number | null | undefined;
  actual: number | null | undefined;
  format: (v: number) => string;
  /** If true, being below target is "good" (e.g., CPL max) */
  lowerIsBetter?: boolean;
}

/**
 * Goal progress card with bar indicator.
 * Used in platform detail pages (Meta Ads, Google Ads).
 * Mobile-first: full width on mobile, grid on desktop.
 */
export function GoalCard({
  label,
  target,
  actual,
  format,
  lowerIsBetter = false,
}: GoalCardProps) {
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

  const barColor =
    status === "good"
      ? STATUS_COLORS.good
      : status === "warn"
      ? STATUS_COLORS.warn
      : status === "bad"
      ? STATUS_COLORS.bad
      : STATUS_COLORS.neutral;

  return (
    <div className="rounded-2xl border-2 border-[#1A1A1A]/08 bg-white p-3 sm:p-4 flex flex-col gap-2 sm:gap-2.5">
      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">
        {label}
      </p>
      <p
        className={`text-xl sm:text-2xl font-black leading-none ${
          hasActual ? "text-[#1A1A1A]" : "text-[#1A1A1A]/20"
        }`}
      >
        {hasActual ? format(actual!) : "—"}
      </p>
      <div className="h-1.5 sm:h-2 bg-[#1A1A1A]/06 rounded-full overflow-hidden">
        {hasTarget && hasActual && (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full"
            style={{ background: barColor }}
          />
        )}
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[8px] sm:text-[9px] font-bold text-[#1A1A1A]/30">
          {hasTarget ? `Meta: ${format(target!)}` : "Meta nao definida"}
        </p>
        {hasTarget && hasActual && (
          <p className="text-[8px] sm:text-[9px] font-black" style={{ color: barColor }}>
            {pct.toFixed(0)}%
          </p>
        )}
      </div>
    </div>
  );
}

// ─── GoalBar (compact variant for main dashboard) ───────────
interface GoalBarProps {
  label: string;
  actual: number;
  target?: number | null;
  /** If true, being below target is "good" */
  isMax?: boolean;
  formatFn: (v: number) => string;
  color: string;
}

/**
 * Compact goal progress bar for the main dashboard's goals panel.
 */
export function GoalBar({
  label,
  actual,
  target,
  isMax = false,
  formatFn,
  color,
}: GoalBarProps) {
  if (!target) return null;

  const pct = isMax
    ? actual <= target
      ? 100
      : Math.max(0, Math.round(100 - ((actual - target) / target) * 100))
    : Math.min(100, Math.round((actual / target) * 100));

  const isGood = isMax ? actual <= target : actual >= target;

  return (
    <div className="flex flex-col gap-1 sm:gap-1.5">
      <div className="flex items-center justify-between">
        <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">
          {label}
        </span>
        <span className="text-[8px] sm:text-[10px] font-bold text-[#1A1A1A]/50">
          {formatFn(actual)} / meta {formatFn(target)}
        </span>
      </div>
      <div className="h-1.5 sm:h-2 bg-[#1A1A1A]/8 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: isGood ? STATUS_COLORS.good : color }}
        />
      </div>
      <p className="text-[8px] sm:text-[9px] text-[#1A1A1A]/30 font-medium">
        {pct}% {isMax ? "dentro da meta" : "atingido"}
      </p>
    </div>
  );
}
