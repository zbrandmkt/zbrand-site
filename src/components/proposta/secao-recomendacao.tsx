"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PropostaRecomendacao } from "@/types/proposta";
import { RichText } from "./rich-text";

export function SecaoRecomendacao({ data }: { data: PropostaRecomendacao }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const introParagraphs = data.intro.split("\n\n");

  return (
    <section className="bg-[#FF6100] py-16 md:py-24 border-b-[3px] border-[#0A0A0A]">
      <div ref={ref} className="max-w-3xl mx-auto px-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70 mb-6"
        >
          {data.etiqueta}
        </motion.p>

        <div className="space-y-4 mb-12">
          {introParagraphs.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className="text-white/90 text-base leading-relaxed"
            >
              <RichText text={p} />
            </motion.p>
          ))}
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="font-display font-black text-white text-xl md:text-2xl uppercase tracking-tight mb-8"
        >
          Nossa recomendação em três movimentos
        </motion.h2>

        <div className="space-y-5 mb-10">
          {data.movimentos.map((mov, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                delay: 0.4 + i * 0.12,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-[#0A0A0A] border-2 border-[#0A0A0A] rounded-[14px] p-6"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-start gap-4">
                <span className="font-display font-black text-4xl text-[#FF6100] shrink-0 leading-none">
                  {mov.numero}.
                </span>
                <div>
                  <h3 className="font-display font-black text-white text-base uppercase tracking-tight mb-2">
                    {mov.titulo}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {mov.texto}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-white/80 text-sm italic text-center"
        >
          {data.fechamento}
        </motion.p>
      </div>
    </section>
  );
}
