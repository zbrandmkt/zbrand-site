"use client";

import { motion } from "framer-motion";
import { DeltaBadge } from "./delta-badge";

interface KpiCardProps {
  emoji?: string;
  label: string;
  value: string;
  shadow: string;
  delay?: number;
  dim?: boolean;
  /** Delta percentage vs previous period (WoW or MoM) */
  delta?: number | null;
  /** If true, negative delta = good (for CPL, CPC) */
  invertDelta?: boolean;
  /** Optional subtitle shown below the label */
  subtitle?: string;
}

/**
 * KPI card with neobrutalism shadow, optional delta badge.
 * Mobile-first: stacks vertically on small screens, side-by-side on lg+.
 */
export function KpiCard({
  emoji,
  label,
  value,
  shadow,
  delay = 0,
  dim = false,
  delta,
  invertDelta = false,
  subtitle,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-4 py-3 sm:px-5 sm:py-4 flex flex-col gap-1 sm:gap-1.5 min-w-0 flex-1"
      style={{ boxShadow: `4px 4px 0px 0px ${shadow}` }}
    >
      {emoji && <span className="text-lg sm:text-xl leading-none">{emoji}</span>}
      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">
        {label}
      </p>
      <div className="flex items-end gap-1.5 flex-wrap">
        <p
          className={`text-xl sm:text-2xl font-black leading-none ${
            dim ? "text-[#1A1A1A]/30" : "text-[#1A1A1A]"
          }`}
        >
          {value}
        </p>
        <DeltaBadge delta={delta} invertColor={invertDelta} size="sm" />
      </div>
      {subtitle && (
        <p className="text-[8px] sm:text-[9px] text-[#1A1A1A]/30 font-medium leading-none">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
