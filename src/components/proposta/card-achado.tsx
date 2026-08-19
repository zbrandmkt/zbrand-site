"use client";

import { motion } from "framer-motion";
import { Achado } from "@/types/proposta";
import { RichParagraph } from "./rich-text";

const ROTULO_COLORS: Record<string, string> = {
  "O QUE VIMOS": "#00C2FF",
  "O QUE MUDA": "#AAFF00",
};

function getRotuloColor(rotulo: string): string {
  if (ROTULO_COLORS[rotulo]) return ROTULO_COLORS[rotulo];
  if (rotulo.startsWith("POR QUE") || rotulo.startsWith("E TEM"))
    return "#FFD600";
  return "#FF6100";
}

export function CardAchado({
  achado,
  index,
}: {
  achado: Achado;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: 0.05 + index * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-2 border-[#0A0A0A] rounded-[14px] overflow-hidden"
      style={{ boxShadow: "6px 6px 0px #0A0A0A" }}
    >
      <div
        className="px-6 py-4 border-b-2 border-[#0A0A0A]"
        style={{ background: "#FFD600" }}
      >
        <div className="flex items-baseline gap-4">
          <span className="font-display font-black text-3xl text-[#0A0A0A]/20">
            {achado.numero}
          </span>
          <h3 className="font-display font-black text-[#0A0A0A] text-base md:text-lg uppercase tracking-tight leading-snug">
            {achado.titulo}
          </h3>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 space-y-6">
        {achado.blocos.map((bloco, bi) => {
          const color = getRotuloColor(bloco.rotulo);
          return (
            <div key={bi}>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: color }}
                />
                <span
                  className="text-[10px] font-black uppercase tracking-[0.2em]"
                  style={{ color }}
                >
                  {bloco.rotulo}
                </span>
              </div>
              <div className="space-y-3 pl-4 border-l-2 border-[#E5E5E5]">
                {bloco.conteudo.map((p, pi) => (
                  <RichParagraph
                    key={pi}
                    text={p}
                    className="text-[#4B5563] text-sm leading-relaxed"
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
