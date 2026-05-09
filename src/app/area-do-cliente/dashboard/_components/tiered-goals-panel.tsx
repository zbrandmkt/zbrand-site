"use client";

import { motion } from "framer-motion";
import { fmt, fmtNum } from "./format";

// ─── Types ──────────────────────────────────────────────────
interface TierValues {
  conservative?: number | null;
  ideal?: number | null;
  incredible?: number | null;
}

interface PlatformGoals {
  leads: TierValues;
  cpl: TierValues;
  budget?: number | null;
}

interface TieredGoalsPanelProps {
  metaLeads: number;
  metaSpend: number;
  metaGoals: PlatformGoals;
  hasGoogle: boolean;
  googleLeads: number;
  googleSpend: number;
  googleGoals: PlatformGoals;
}

// ─── Tier config ────────────────────────────────────────────
const TIER_MARKERS = [
  { key: "conservative" as const, emoji: "👍", label: "Conservadora" },
  { key: "ideal" as const, emoji: "🧡", label: "Ideal" },
  { key: "incredible" as const, emoji: "🚀", label: "Zebra" },
];

// ─── Standard metric colors (same for both platforms) ───────
const COLOR_LEADS  = "#7B2FF7"; // roxo
const COLOR_CPL    = "#FF6100"; // laranja
const COLOR_BUDGET = "#22C55E"; // verde

// ─── Milestone Bar ──────────────────────────────────────────
function MilestoneBar({
  actual,
  tiers,
  formatFn,
  baseColor,
  isMax = false,
}: {
  actual: number;
  tiers: TierValues;
  formatFn: (v: number) => string;
  baseColor: string;
  isMax?: boolean;
}) {
  const conservative = tiers.conservative ?? 0;
  const ideal = tiers.ideal ?? 0;
  const incredible = tiers.incredible ?? 0;

  const maxTarget = isMax
    ? Math.max(conservative, ideal, incredible)
    : incredible;

  if (maxTarget <= 0) return null;

  const scaleMax = maxTarget * 1.15;
  const fillPct = Math.min(100, (actual / scaleMax) * 100);

  const milestones = TIER_MARKERS.map((tier) => {
    const target = tiers[tier.key];
    if (!target || target <= 0) return null;
    const position = Math.min(100, (target / scaleMax) * 100);
    const isReached = isMax ? actual <= target : actual >= target;
    return { ...tier, target, position, isReached };
  }).filter(Boolean) as Array<{
    key: string;
    emoji: string;
    label: string;
    target: number;
    position: number;
    isReached: boolean;
  }>;

  const reachedCount = milestones.filter((m) => m.isReached).length;
  const fillColor =
    reachedCount >= 1
      ? baseColor
      : "#EF4444";

  return (
    <div className="relative">
      {/* Milestone labels above the bar */}
      <div className="relative h-8 sm:h-9 mb-1">
        {milestones.map((m) => (
          <div
            key={m.key}
            className="absolute flex flex-col items-center -translate-x-1/2"
            style={{ left: `${m.position}%` }}
          >
            <span
              className={`text-sm sm:text-base ${
                m.isReached ? "grayscale-0" : "grayscale opacity-40"
              } transition-all duration-500`}
            >
              {m.emoji}
            </span>
            <span
              className={`text-[8px] sm:text-[9px] font-black tabular-nums ${
                m.isReached ? "text-[#1A1A1A]/50" : "text-[#1A1A1A]/20"
              }`}
            >
              {formatFn(m.target)}
            </span>
          </div>
        ))}
      </div>

      {/* The bar itself */}
      <div className="relative h-3.5 sm:h-4 bg-[#1A1A1A]/[0.06] border border-[#1A1A1A]/10 rounded-full overflow-hidden">
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${fillPct}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${fillColor}CC, ${fillColor})`,
          }}
        />

        {/* Milestone tick marks */}
        {milestones.map((m) => (
          <div
            key={m.key}
            className="absolute top-0 bottom-0 w-[2px]"
            style={{
              left: `${m.position}%`,
              backgroundColor: m.isReached ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.08)",
            }}
          />
        ))}
      </div>

      {/* Current value indicator */}
      <div
        className="absolute -translate-x-1/2"
        style={{
          left: `clamp(8%, ${fillPct}%, 92%)`,
          bottom: "-20px",
        }}
      >
        <span className="text-[10px] sm:text-xs font-black text-[#1A1A1A] bg-[#1A1A1A]/[0.06] px-2 py-0.5 rounded border border-[#1A1A1A]/10">
          {formatFn(actual)}
        </span>
      </div>
    </div>
  );
}

// ─── Metric Row ─────────────────────────────────────────────
function GoalMetricRow({
  label,
  actual,
  tiers,
  formatFn,
  baseColor,
  isMax = false,
}: {
  label: string;
  actual: number;
  tiers: TierValues;
  formatFn: (v: number) => string;
  baseColor: string;
  isMax?: boolean;
}) {
  const hasAnyTier = tiers.conservative || tiers.ideal || tiers.incredible;

  return (
    <div className="py-3.5 sm:py-4 border-b border-[#1A1A1A]/[0.06] last:border-b-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1A1A1A]/40">
          {label}
        </span>
      </div>

      {hasAnyTier ? (
        <div className="pb-5">
          <MilestoneBar
            actual={actual}
            tiers={tiers}
            formatFn={formatFn}
            baseColor={baseColor}
            isMax={isMax}
          />
        </div>
      ) : (
        <p className="text-[10px] sm:text-xs text-[#1A1A1A]/20 font-medium py-1">
          Metas não configuradas
        </p>
      )}
    </div>
  );
}

// ─── Budget Bar (simpler, no tiers) ─────────────────────────
function BudgetBar({
  spend,
  budget,
}: {
  spend: number;
  budget: number;
}) {
  const pct = Math.min(100, Math.round((spend / budget) * 100));
  const remaining = Math.max(0, budget - spend);

  return (
    <div className="py-3.5 sm:py-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#1A1A1A]/40">
          Budget
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs font-bold text-[#1A1A1A]/30">
            {fmt(spend)} / {fmt(budget)}
          </span>
          <span
            className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded border"
            style={{
              color: pct >= 95 ? "#EF4444" : pct >= 80 ? "#F59E0B" : "#22C55E",
              borderColor:
                pct >= 95
                  ? "rgba(239,68,68,0.3)"
                  : pct >= 80
                  ? "rgba(245,158,11,0.3)"
                  : "rgba(34,197,94,0.3)",
              backgroundColor:
                pct >= 95
                  ? "rgba(239,68,68,0.08)"
                  : pct >= 80
                  ? "rgba(245,158,11,0.08)"
                  : "rgba(34,197,94,0.08)",
            }}
          >
            Restam {fmt(remaining)}
          </span>
        </div>
      </div>
      <div className="h-2.5 sm:h-3 bg-[#1A1A1A]/[0.06] border border-[#1A1A1A]/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{
            backgroundColor:
              pct >= 95 ? "#EF4444" : pct >= 80 ? "#F59E0B" : COLOR_BUDGET,
          }}
        />
      </div>
    </div>
  );
}

// ─── Platform Section ───────────────────────────────────────
function PlatformGoalsSection({
  label,
  icon,
  color,
  bgColor,
  leads,
  spend,
  goals,
}: {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  leads: number;
  spend: number;
  goals: PlatformGoals;
}) {
  const cpl = leads > 0 ? spend / leads : 0;

  return (
    <div className="flex-1 min-w-0">
      {/* Platform badge */}
      <div className="mb-1">
        <span
          className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border-2"
          style={{ backgroundColor: bgColor, color, borderColor: `${color}30` }}
        >
          <img
            src={icon}
            alt=""
            className="w-4 h-4 sm:w-5 sm:h-5 object-contain"
          />
          {label}
        </span>
      </div>

      {/* Leads bar — roxo */}
      <GoalMetricRow
        label="Leads"
        actual={leads}
        tiers={goals.leads}
        formatFn={fmtNum}
        baseColor={COLOR_LEADS}
      />

      {/* CPL bar — laranja */}
      <GoalMetricRow
        label="CPL"
        actual={cpl}
        tiers={goals.cpl}
        formatFn={fmt}
        baseColor={COLOR_CPL}
        isMax
      />

      {/* Budget bar */}
      {goals.budget && goals.budget > 0 && (
        <BudgetBar spend={spend} budget={goals.budget} />
      )}
    </div>
  );
}

// ─── Main Panel ─────────────────────────────────────────────
export function TieredGoalsPanel({
  metaLeads,
  metaSpend,
  metaGoals,
  hasGoogle,
  googleLeads,
  googleSpend,
  googleGoals,
}: TieredGoalsPanelProps) {
  const hasAnyGoal =
    metaGoals.leads.conservative ||
    metaGoals.leads.ideal ||
    metaGoals.leads.incredible ||
    googleGoals.leads.conservative ||
    googleGoals.leads.ideal ||
    googleGoals.leads.incredible;

  if (!hasAnyGoal) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
      style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
    >
      {/* Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 border-b-2 border-[#1A1A1A]/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg sm:text-xl">🎯</span>
          <h3 className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#1A1A1A]/40">
            Metas do Mês
          </h3>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-3 sm:gap-5">
          {TIER_MARKERS.map((tier) => (
            <div key={tier.key} className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base">{tier.emoji}</span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]/30 hidden sm:inline">
                {tier.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Content — side by side on desktop */}
      <div className={`flex flex-col ${hasGoogle ? "lg:flex-row" : ""}`}>
        <div
          className={`px-4 sm:px-6 py-3 sm:py-4 ${
            hasGoogle
              ? "lg:flex-1 lg:border-r-2 lg:border-[#1A1A1A]/[0.06]"
              : "flex-1"
          }`}
        >
          <PlatformGoalsSection
            label="Meta Ads"
            icon="/images/icon_metaads.png"
            color="#1877F2"
            bgColor="rgba(24,119,242,0.08)"
            leads={metaLeads}
            spend={metaSpend}
            goals={metaGoals}
          />
        </div>
        {hasGoogle && (
          <div className="px-4 sm:px-6 py-3 sm:py-4 lg:flex-1 border-t-2 lg:border-t-0 border-[#1A1A1A]/[0.06]">
            <PlatformGoalsSection
              label="Google Ads"
              icon="/images/icon_googleads.webp"
              color="#EA4335"
              bgColor="rgba(234,67,53,0.06)"
              leads={googleLeads}
              spend={googleSpend}
              goals={googleGoals}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
