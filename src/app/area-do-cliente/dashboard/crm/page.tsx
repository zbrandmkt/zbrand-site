"use client";

import { motion } from "framer-motion";

export default function CrmPage() {
  return (
    <div className="p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full text-center"
      >
        <div
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-10 py-12"
          style={{ boxShadow: "6px 6px 0px 0px #7B2FF7" }}
        >
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 2 }}
            className="text-5xl mb-6"
          >
            🧩
          </motion.div>

          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 bg-[#7B2FF7]/10 border border-[#7B2FF7]/20 text-[#7B2FF7] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-[#7B2FF7]"
            />
            Em breve
          </span>

          <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight mb-3">
            CRM está a caminho
          </h1>
          <p className="text-sm text-[#1A1A1A]/50 leading-relaxed">
            Estamos desenvolvendo um CRM integrado para você acompanhar seus leads, clientes e oportunidades direto no painel.
          </p>

          <div className="mt-8 pt-6 border-t-2 border-[#1A1A1A]/08 grid grid-cols-3 gap-4">
            {[
              { icon: "👥", label: "Leads" },
              { icon: "📊", label: "Pipeline" },
              { icon: "🤖", label: "Automação" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-xl bg-[#7B2FF7]/08 border border-[#7B2FF7]/15 flex items-center justify-center text-lg">
                  {icon}
                </div>
                <span className="text-[10px] font-bold text-[#1A1A1A]/30 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
