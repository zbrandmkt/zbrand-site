"use client";

import { monthName } from "./format";

interface MonthNavProps {
  month: number;
  year: number;
  isCurrentMonth: boolean;
  onNavigate: (dir: -1 | 1) => void;
}

/**
 * Month arrow navigation used in the main dashboard.
 * Mobile-first: compact on mobile, slightly larger on desktop.
 */
export function MonthNav({ month, year, isCurrentMonth, onNavigate }: MonthNavProps) {
  return (
    <div
      className="flex items-center gap-1 sm:gap-1.5 bg-white border-2 border-[#1A1A1A] rounded-xl px-1 py-1"
      style={{ boxShadow: "2px 2px 0px 0px #1A1A1A" }}
    >
      <button
        onClick={() => onNavigate(-1)}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#1A1A1A]/08 transition-colors text-[#1A1A1A]"
        aria-label="Mes anterior"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <span className="text-[10px] sm:text-xs font-black text-[#1A1A1A] uppercase tracking-wide min-w-[80px] sm:min-w-[100px] text-center select-none">
        {monthName(month)} {year}
      </span>
      <button
        onClick={() => onNavigate(1)}
        disabled={isCurrentMonth}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#1A1A1A]/08 disabled:opacity-25 disabled:cursor-not-allowed transition-colors text-[#1A1A1A]"
        aria-label="Proximo mes"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
