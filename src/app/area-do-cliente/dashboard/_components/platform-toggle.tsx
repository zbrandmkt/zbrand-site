"use client";

export type PlatformMode = "consolidated" | "separated";

interface PlatformToggleProps {
  mode: PlatformMode;
  onChange: (mode: PlatformMode) => void;
}

/**
 * Toggle between consolidated (Meta+Google summed) and separated view.
 * Compact segmented control, neobrutalism style.
 */
export function PlatformToggle({ mode, onChange }: PlatformToggleProps) {
  return (
    <div className="flex items-center bg-white border-2 border-[#1A1A1A]/20 rounded-lg overflow-hidden">
      <button
        onClick={() => onChange("consolidated")}
        className={`px-2.5 py-1.5 sm:px-3 text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${
          mode === "consolidated"
            ? "bg-[#1A1A1A] text-white"
            : "text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70"
        }`}
      >
        Consolidado
      </button>
      <div className="w-px h-5 bg-[#1A1A1A]/10" />
      <button
        onClick={() => onChange("separated")}
        className={`px-2.5 py-1.5 sm:px-3 text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all ${
          mode === "separated"
            ? "bg-[#1A1A1A] text-white"
            : "text-[#1A1A1A]/40 hover:text-[#1A1A1A]/70"
        }`}
      >
        Por Plataforma
      </button>
    </div>
  );
}
