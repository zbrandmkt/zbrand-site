"use client";

import { motion } from "framer-motion";
import { fmtDate, fmtWeekLabel } from "./format";

interface ActionBlockProps {
  actionText: string | null;
  weekId: string | null;
  dateStart?: string;
  dateEnd?: string;
}

/**
 * Full-width action block for weekly strategic focus.
 * Displayed below the charts section with multi-paragraph support.
 */
export function ActionBlock({ actionText, weekId, dateStart, dateEnd }: ActionBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-[#1A1A1A] border-2 border-[#2A2A2A] rounded-2xl overflow-hidden"
      style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
    >
      {/* Header */}
      <div className="px-5 sm:px-6 lg:px-8 py-3 sm:py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-lg sm:text-xl">📋</span>
          <h3 className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-white/50">
            Ação da Semana
          </h3>
        </div>
        {weekId && (
          <div className="flex items-center gap-2">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#FF6100] border border-[#FF6100]/40 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
              {fmtWeekLabel(weekId)}
            </span>
            {dateStart && dateEnd && (
              <span className="hidden sm:inline text-[9px] sm:text-[10px] font-medium text-white/25">
                {fmtDate(dateStart)} a {fmtDate(dateEnd)}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="px-5 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
        {actionText ? (
          <p className="text-xs sm:text-sm text-white/70 font-medium leading-relaxed whitespace-pre-line">
            {actionText}
          </p>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 sm:py-6 gap-2">
            <span className="text-2xl opacity-20">📝</span>
            <p className="text-[10px] sm:text-xs text-white/20 font-medium text-center max-w-sm">
              Nossa equipe irá publicar aqui o foco estratégico da semana, com resumo da semana anterior e plano de ação.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
