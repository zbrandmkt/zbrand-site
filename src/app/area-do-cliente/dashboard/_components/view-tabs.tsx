"use client";

interface ViewTabsProps {
  activeView: "semanal" | "mensal";
  onChange: (view: "semanal" | "mensal") => void;
}

/**
 * Toggle between Semanal and Mensal views.
 * Neobrutalism pill buttons, mobile-friendly.
 */
export function ViewTabs({ activeView, onChange }: ViewTabsProps) {
  const tabs = [
    { key: "semanal" as const, label: "Semanal", emoji: "📅" },
    { key: "mensal" as const, label: "Mensal", emoji: "📊" },
  ];

  return (
    <div className="flex gap-1.5 sm:gap-2">
      {tabs.map(({ key, label, emoji }) => {
        const isActive = activeView === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 border-2 border-[#1A1A1A] rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
              isActive
                ? "bg-[#1A1A1A] text-white"
                : "bg-white text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
            }`}
            style={{
              boxShadow: isActive
                ? "3px 3px 0px 0px #FF6100"
                : "2px 2px 0px 0px #1A1A1A20",
            }}
          >
            {emoji} {label}
          </button>
        );
      })}
    </div>
  );
}
