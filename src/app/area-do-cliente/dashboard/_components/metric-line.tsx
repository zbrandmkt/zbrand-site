"use client";

import { DeltaBadge } from "./delta-badge";

interface MetricLineProps {
  label: string;
  value: string;
  bold?: boolean;
  /** Optional delta for WoW comparison */
  delta?: number | null;
  /** If true, negative delta = good */
  invertDelta?: boolean;
}

/**
 * Compact metric row: label on left, value on right, optional delta badge.
 * Used inside WeekCards and detail sections.
 * Mobile-friendly: text sizes are already small and compact.
 */
export function MetricLine({
  label,
  value,
  bold = false,
  delta,
  invertDelta = false,
}: MetricLineProps) {
  return (
    <div className="flex items-baseline justify-between gap-1 min-w-0">
      <span className="text-[8px] sm:text-[9px] text-[#1A1A1A]/40 font-medium truncate shrink-0">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        {delta != null && (
          <DeltaBadge delta={delta} invertColor={invertDelta} size="sm" />
        )}
        <span
          className={`text-[9px] sm:text-[10px] ${
            bold
              ? "font-black text-[#1A1A1A]"
              : "font-bold text-[#1A1A1A]/70"
          } text-right`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}
