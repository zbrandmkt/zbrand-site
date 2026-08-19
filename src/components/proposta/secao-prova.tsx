"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { PropostaProva } from "@/types/proposta";
import { RichParagraph } from "./rich-text";

export function SecaoProva({ data }: { data: PropostaProva }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#0A0A0A] py-16 md:py-24 border-b-[3px] border-[#0A0A0A] relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px",
        }}
      />

      <div ref={ref} className="relative z-10 max-w-3xl mx-auto px-5">
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
          className="font-display font-black text-white text-3xl md:text-4xl uppercase tracking-tight leading-tight mb-10"
        >
          {data.headline}
        </motion.h2>

        <div className="space-y-5 mb-12">
          {data.paragrafos.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
            >
              <RichParagraph
                text={p}
                className="text-white/60 text-base leading-relaxed"
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14">
          {data.numeros.map((num, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              className="bg-white/5 border-2 border-white/10 rounded-[14px] p-5 text-center"
            >
              <div className="font-display font-black text-2xl text-[#FF6100] mb-1">
                {num.valor}
              </div>
              <div className="text-white/40 text-xs leading-snug">
                {num.label}
              </div>
            </motion.div>
          ))}
        </div>

        {data.imagens.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mb-8"
            >
              <h3 className="font-display font-black text-white text-lg uppercase tracking-tight mb-1">
                {data.subtituloImagens}
              </h3>
              <p className="text-white/40 text-sm italic">
                {data.subSubtituloImagens}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
              {data.imagens.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  className="border-2 border-white/10 rounded-[14px] overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.legenda}
                    width={800}
                    height={450}
                    className="w-full h-auto"
                  />
                  <div className="px-4 py-3 bg-white/5">
                    <p className="text-white/50 text-xs">{img.legenda}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
