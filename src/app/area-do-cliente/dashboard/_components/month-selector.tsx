"use client";

import { monthNameFull } from "./format";

interface MonthSelectorProps {
  currentMonth: number;
  maxUnlockedMonth: number;
  selectedMonth: number;
  onSelect: (month: number) => void;
  /** Record of month numbers that have synced data */
  syncedMonths?: Record<string | number, boolean>;
  /** Accent color for selected state (defaults to #1877F2) */
  accentColor?: string;
}

/**
 * Monthly pill selector. Shows all 12 months with lock/active/synced states.
 * Mobile-first: wraps naturally, pills are touch-friendly (min 44px tap target).
 */
export function MonthSelector({
  currentMonth,
  maxUnlockedMonth,
  selectedMonth,
  onSelect,
  syncedMonths = {},
  accentColor = "#1877F2",
}: MonthSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => {
        const isLocked = month > maxUnlockedMonth;
        const isCurrent = month === currentMonth;
        const isSelected = month === selectedMonth;
        const hasSynced = !!syncedMonths[month];
        const shortName = monthNameFull(month).slice(0, 3).toUpperCase();

        if (isLocked) {
          return (
            <div
              key={month}
              className="px-2.5 py-1.5 sm:px-3 rounded-lg border-2 border-[#1A1A1A]/10 text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]/20 cursor-not-allowed flex items-center gap-1"
            >
              <span className="text-[8px] sm:text-[9px]">&#128274;</span> {shortName}
            </div>
          );
        }

        return (
          <button
            key={month}
            onClick={() => onSelect(month)}
            className={`px-2.5 py-1.5 sm:px-3 rounded-lg border-2 text-[9px] sm:text-[10px] font-black uppercase tracking-wider transition-all relative min-h-[32px] ${
              isSelected
                ? "text-white"
                : isCurrent
                ? "border-[#1A1A1A] bg-white text-[#1A1A1A]"
                : "border-[#1A1A1A]/30 bg-white text-[#1A1A1A]/60 hover:border-[#1A1A1A]"
            }`}
            style={{
              ...(isSelected
                ? {
                    backgroundColor: accentColor,
                    borderColor: accentColor,
                    boxShadow: "2px 2px 0px 0px #1A1A1A",
                  }
                : {
                    boxShadow: "1px 1px 0px 0px #1A1A1A30",
                  }),
            }}
          >
            {shortName}
            {isCurrent && !isSelected && (
              <span
                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            )}
            {hasSynced && !isSelected && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#AAFF00]" />
            )}
          </button>
        );
      })}
    </div>
  );
}
