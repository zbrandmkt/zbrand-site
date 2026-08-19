"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PropostaMetodologia } from "@/types/proposta";
import { RichParagraph } from "./rich-text";

export function SecaoMetodologia({ data }: { data: PropostaMetodologia }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#F6F6F6] py-16 md:py-24 border-b-[3px] border-[#0A0A0A]">
      <div ref={ref} className="max-w-3xl mx-auto px-5">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FF6100] mb-6"
        >
          {data.etiqueta}
        </motion.p>

        <div className="space-y-5 mb-12">
          {data.intro.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
            >
              <RichParagraph
                text={p}
                className="text-[#4B5563] text-base leading-relaxed"
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              className="bg-white border-2 border-[#0A0A0A] rounded-[14px] p-6"
              style={{ boxShadow: "4px 4px 0px #0A0A0A" }}
            >
              <h3 className="font-display font-black text-[#0A0A0A] text-sm uppercase tracking-tight mb-3">
                {card.titulo}
              </h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">
                {card.texto}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
