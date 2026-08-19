"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PropostaHeroData } from "@/types/proposta";

export function PropostaHero({ data }: { data: PropostaHeroData }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-[#0A0A0A] overflow-hidden border-b-[3px] border-[#0A0A0A]">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6100]/10 blur-[200px] rounded-full pointer-events-none" />

      <div
        ref={ref}
        className="relative z-10 max-w-3xl mx-auto px-5 py-20 md:py-28 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="inline-block border-2 border-white/20 rounded-full px-5 py-2 mb-8"
        >
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">
            {data.etiqueta}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white leading-[1.1] mb-8"
        >
          {data.headline}
          <span className="text-[#FF6100]">{data.headlineDestaque}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {data.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.45, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {data.chips.map((chip, i) => (
            <span
              key={i}
              className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-full border-2"
              style={{
                background: chip.destaque ? "#AAFF00" : "transparent",
                color: chip.destaque ? "#0A0A0A" : "rgba(255,255,255,0.5)",
                borderColor: chip.destaque
                  ? "#AAFF00"
                  : "rgba(255,255,255,0.15)",
              }}
            >
              {chip.texto}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
