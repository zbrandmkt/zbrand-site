// ─── Dashboard Shared Components ────────────────────────────
// Barrel export for all shared components.
// Import from "@/app/area-do-cliente/dashboard/_components"

// Formatters
export {
  fmt,
  fmtCompact,
  fmtNum,
  fmtNumSafe,
  fmtPct,
  fmtDate,
  monthName,
  monthNameFull,
  progressPct,
  calcDelta,
  fmtWeekLabel,
  fmtWeekRange,
  fmtMonthYear,
} from "./format";

// Platform config
export {
  PLATFORMS,
  getPlatform,
  KPI_SHADOWS,
  STATUS_COLORS,
} from "./platform-config";
export type { PlatformKey, PlatformConfig } from "./platform-config";

// UI Components
export { KpiCard } from "./kpi-card";
export { GoalCard, GoalBar } from "./goal-card";
export { GoalsPanel } from "./goals-panel";
export { MonthSelector } from "./month-selector";
export { MonthNav } from "./month-nav";
export { MetricLine } from "./metric-line";
export { WeekCard, PlatformSection } from "./week-card";
export { DeltaBadge } from "./delta-badge";
export { EmptySection } from "./empty-section";
export { ViewTabs } from "./view-tabs";
export { PlatformToggle } from "./platform-toggle";
export type { PlatformMode } from "./platform-toggle";
export { CarouselNav } from "./carousel-nav";
export { WeekCarousel } from "./week-carousel";
export { MonthlyTable } from "./monthly-table";
export { TieredGoalsPanel } from "./tiered-goals-panel";
export { ActionBlock } from "./action-block";

// Types
export type { WeeklyRow } from "./week-card";
export type { MonthlyRow } from "./monthly-table";
