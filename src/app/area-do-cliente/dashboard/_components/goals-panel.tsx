"use client";

import { motion } from "framer-motion";
import { GoalBar } from "./goal-card";
import { fmt, fmtNum } from "./format";

interface GoalsPanelProps {
  title: string;
  icon: React.ReactNode;
  spend: number;
  leads: number;
  cpl: number;
  goalLeads?: number | null;
  goalCpl?: number | null;
  goalBudget?: number | null;
  color: string;
  shadow: string;
}

/**
 * Goals panel for the main dashboard.
 * Shows current values + progress bars toward monthly goals.
 * Mobile: full-width stacked. Desktop: side by side in grid.
 */
export function GoalsPanel({
  title,
  icon,
  spend,
  leads,
  cpl,
  goalLeads,
  goalCpl,
  goalBudget,
  color,
  shadow,
}: GoalsPanelProps) {
  const hasAnyGoal = goalLeads || goalCpl || goalBudget;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4 sm:p-5 flex flex-col gap-3 sm:gap-4"
      style={{ boxShadow: `4px 4px 0px 0px ${shadow}` }}
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
          {title}
        </h3>
      </div>

      {/* Current values */}
      <div className="grid grid-cols-3 gap-2">
        <div className="text-center">
          <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">
            Investido
          </p>
          <p className="text-xs sm:text-sm font-black text-[#1A1A1A]">{fmt(spend)}</p>
        </div>
        <div className="text-center">
          <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">
            Leads
          </p>
          <p className="text-xs sm:text-sm font-black text-[#1A1A1A]">{fmtNum(leads)}</p>
        </div>
        <div className="text-center">
          <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">
            CPL
          </p>
          <p className="text-xs sm:text-sm font-black text-[#1A1A1A]">
            {cpl > 0 ? fmt(cpl) : "—"}
          </p>
        </div>
      </div>

      {/* Goal bars */}
      {hasAnyGoal ? (
        <div className="flex flex-col gap-2.5 sm:gap-3 pt-1 border-t border-[#1A1A1A]/6">
          <GoalBar
            label="Leads"
            actual={leads}
            target={goalLeads}
            formatFn={fmtNum}
            color={color}
          />
          <GoalBar
            label="CPL Max"
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
        <p className="text-[9px] sm:text-[10px] text-[#1A1A1A]/30 font-medium text-center py-2">
          Metas nao configuradas ainda
        </p>
      )}
    </motion.div>
  );
}
