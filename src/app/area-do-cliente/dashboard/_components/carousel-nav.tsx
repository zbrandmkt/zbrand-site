"use client";

interface CarouselNavProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  /** Central label (e.g., "S18 · 28/04-04/05" or "Abr 2026") */
  label?: string;
}

/**
 * Reusable arrow navigation for carousels and tables.
 * Used by WeekCarousel and MonthlyTable.
 */
export function CarouselNav({ onPrev, onNext, canPrev, canNext, label }: CarouselNavProps) {
  return (
    <div
      className="flex items-center gap-1 sm:gap-1.5 bg-white border-2 border-[#1A1A1A] rounded-xl px-1 py-1"
      style={{ boxShadow: "2px 2px 0px 0px #1A1A1A" }}
    >
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#1A1A1A]/08 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-[#1A1A1A]"
        aria-label="Anterior"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {label && (
        <span className="text-[9px] sm:text-[10px] font-black text-[#1A1A1A] uppercase tracking-wide min-w-[80px] sm:min-w-[120px] text-center select-none whitespace-nowrap">
          {label}
        </span>
      )}
      <button
        onClick={onNext}
        disabled={!canNext}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#1A1A1A]/08 disabled:opacity-20 disabled:cursor-not-allowed transition-colors text-[#1A1A1A]"
        aria-label="Proximo"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
