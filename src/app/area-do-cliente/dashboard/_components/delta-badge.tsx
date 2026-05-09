"use client";

import { motion } from "framer-motion";

interface DeltaBadgeProps {
  /** Percentage change (e.g., 12.5 = +12.5%, -8.3 = -8.3%) */
  delta: number | null | undefined;
  /** If true, a negative delta is "good" (e.g., CPL going down) */
  invertColor?: boolean;
  /** Size variant */
  size?: "sm" | "md";
}

/**
 * Compact delta indicator: ↑ 12% or ↓ 8%
 * Used in KpiCards, WeekCards, and history tables for WoW/MoM comparison.
 * Mobile-friendly: always visible, compact footprint.
 */
export function DeltaBadge({ delta, invertColor = false, size = "sm" }: DeltaBadgeProps) {
  if (delta == null || !isFinite(delta)) return null;

  const isPositive = delta > 0;
  const isNeutral = Math.abs(delta) < 0.5;

  // Determine color: green = good, red = bad
  // For metrics where lower is better (CPL, CPC), invert the logic
  const isGood = invertColor ? !isPositive : isPositive;
  const color = isNeutral ? "#1A1A1A" : isGood ? "#22C55E" : "#EF4444";
  const bgColor = isNeutral ? "#1A1A1A08" : isGood ? "#22C55E12" : "#EF444412";
  const arrow = isNeutral ? "→" : isPositive ? "↑" : "↓";

  const sizeClasses = size === "sm"
    ? "text-[8px] px-1.5 py-0.5 gap-0.5"
    : "text-[10px] px-2 py-1 gap-1";

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center font-black rounded-full whitespace-nowrap ${sizeClasses}`}
      style={{ color, backgroundColor: bgColor }}
    >
      <span>{arrow}</span>
      <span>{Math.abs(delta).toFixed(1)}%</span>
    </motion.span>
  );
}
