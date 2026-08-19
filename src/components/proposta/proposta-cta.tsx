"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PropostaCTAData } from "@/types/proposta";

export function PropostaCTA({ data }: { data: PropostaCTAData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#FF6100] py-16 md:py-24">
      <div ref={ref} className="max-w-2xl mx-auto px-5 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="font-display font-black text-white text-3xl md:text-4xl uppercase tracking-tight leading-tight mb-6"
        >
          {data.headline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-white/90 text-base leading-relaxed mb-4"
        >
          {data.texto}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white/70 text-sm italic mb-10"
        >
          {data.reforco}
        </motion.p>

        <motion.a
          href={data.linkWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block bg-[#0A0A0A] text-white font-display font-black text-base uppercase tracking-tight px-10 py-4 rounded-[14px] border-2 border-[#0A0A0A]"
          style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.3)" }}
        >
          {data.textoBotao}
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-white/50 text-xs mt-10"
        >
          {data.rodape}
        </motion.p>
      </div>
    </section>
  );
}
