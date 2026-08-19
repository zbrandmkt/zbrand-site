"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Fase } from "@/types/proposta";
import { RichText } from "./rich-text";

export function CardFase({ fase, index }: { fase: Fase; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.15,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-2 border-[#0A0A0A] rounded-[14px] overflow-hidden"
      style={{ boxShadow: "6px 6px 0px #0A0A0A" }}
    >
      <div
        className="px-6 py-5 border-b-2 border-[#0A0A0A]"
        style={{ background: fase.cor }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <span
              className="text-[10px] font-black uppercase tracking-[0.2em] block mb-1"
              style={{
                color:
                  fase.cor === "#AAFF00"
                    ? "rgba(0,0,0,0.5)"
                    : "rgba(255,255,255,0.7)",
              }}
            >
              {fase.tag}
            </span>
            <h3
              className="font-display font-black text-xl uppercase tracking-tight"
              style={{
                color: fase.cor === "#AAFF00" ? "#0A0A0A" : "#fff",
              }}
            >
              {fase.titulo}
            </h3>
          </div>
          <span
            className="text-xs font-bold px-3 py-1 rounded-full border-2"
            style={{
              color: fase.cor === "#AAFF00" ? "#0A0A0A" : "#fff",
              borderColor:
                fase.cor === "#AAFF00"
                  ? "rgba(0,0,0,0.2)"
                  : "rgba(255,255,255,0.3)",
            }}
          >
            {fase.prazo}
          </span>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8">
        <p className="text-[#4B5563] text-sm leading-relaxed mb-8">
          <RichText text={fase.intro} />
        </p>

        <div className="space-y-6">
          {fase.entregaveis.map((ent, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
              className="flex gap-4"
            >
              <div
                className="w-1.5 shrink-0 rounded-full mt-1"
                style={{ background: fase.cor, minHeight: "24px" }}
              />
              <div>
                <h4 className="font-display font-black text-[#0A0A0A] text-sm uppercase tracking-tight mb-1">
                  {ent.titulo}
                </h4>
                <p className="text-[#6B7280] text-sm leading-relaxed">
                  {ent.descricao}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
