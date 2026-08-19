"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PropostaContaQueImporta } from "@/types/proposta";
import { RichParagraph } from "./rich-text";

export function SecaoContaQueImporta({
  data,
}: {
  data: PropostaContaQueImporta;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#F6F6F6] py-16 md:py-24 border-b-[3px] border-[#0A0A0A]">
      <div ref={ref} className="max-w-3xl mx-auto px-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-4"
        >
          {data.etiqueta}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-display font-black text-[#0A0A0A] text-3xl md:text-4xl uppercase tracking-tight leading-tight mb-4"
        >
          {data.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="font-display font-black text-[#0A0A0A] text-sm uppercase tracking-tight mb-8"
        >
          {data.subtituloExplicacao}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-white border-2 border-[#0A0A0A] rounded-[14px] p-6"
            style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
          >
            <div className="w-8 h-8 rounded-full bg-[#00C2FF]/10 border-2 border-[#00C2FF]/30 flex items-center justify-center text-sm mb-3">
              💰
            </div>
            <RichParagraph
              text={data.explicacaoVerba}
              className="text-[#4B5563] text-sm leading-relaxed"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white border-2 border-[#0A0A0A] rounded-[14px] p-6"
            style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
          >
            <div className="w-8 h-8 rounded-full bg-[#FF6100]/10 border-2 border-[#FF6100]/30 flex items-center justify-center text-sm mb-3">
              🎯
            </div>
            <RichParagraph
              text={data.explicacaoGestao}
              className="text-[#4B5563] text-sm leading-relaxed"
            />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center text-[#6B7280] text-sm italic mb-12"
        >
          {data.separador}
        </motion.p>

        <div className="border-t-2 border-[#0A0A0A]/10 pt-10 space-y-5 mb-8">
          {data.corpo.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
            >
              <RichParagraph
                text={p}
                className="text-[#4B5563] text-base leading-relaxed"
              />
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.75, duration: 0.5 }}
          className="font-display font-black text-[#0A0A0A] text-lg mb-4"
        >
          {data.perguntaDestaque}
        </motion.p>

        <div className="text-[#4B5563] text-base leading-relaxed mb-8 space-y-4">
          {data.respostaDestaque.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 + i * 0.08, duration: 0.5 }}
            >
              <RichParagraph text={p} className="text-[#4B5563] text-base leading-relaxed" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="bg-[#0A0A0A] border-2 border-[#0A0A0A] rounded-[14px] p-6 mb-8"
          style={{ boxShadow: "6px 6px 0px #FF6100" }}
        >
          <RichParagraph
            text={data.cardDestaque}
            className="text-white/80 text-sm leading-relaxed"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <RichParagraph
            text={data.fechamento}
            className="text-[#4B5563] text-base leading-relaxed"
          />
        </motion.div>
      </div>
    </section>
  );
}
