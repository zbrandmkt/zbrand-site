"use client";

import { motion } from "framer-motion";

interface EmptySectionProps {
  title: string;
  shadow: string;
  children?: React.ReactNode;
}

/**
 * Empty state wrapper with neobrutalism shadow.
 * Shows a dashed placeholder when no children are provided.
 */
export function EmptySection({ title, shadow, children }: EmptySectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-4 sm:p-5 mb-4 sm:mb-5"
      style={{ boxShadow: `4px 4px 0px 0px ${shadow}` }}
    >
      <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-3 sm:mb-4">
        {title}
      </p>
      {children ?? (
        <div className="h-20 sm:h-24 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
          <p className="text-[10px] sm:text-xs text-[#1A1A1A]/25 font-medium">
            Dados serao preenchidos em breve
          </p>
        </div>
      )}
    </motion.div>
  );
}
