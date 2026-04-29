"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const results = [
  {
    src: "/images/resultados-social-media/IMG_7795.jpg",
    alt: "Resultado de Social Media — cliente ZBRAND",
    borderColor: "#FF6100",
    shadowColor: "#FF6100",
    label: "Social Media",
    rotate: "-1.5deg",
  },
  {
    src: "/images/resultados-social-media/IMG_7796.jpg",
    alt: "Resultado de Social Media — cliente ZBRAND",
    borderColor: "#00C2FF",
    shadowColor: "#00C2FF",
    label: "Conteúdo Real",
    rotate: "1deg",
  },
  {
    src: "/images/resultados-social-media/IMG_7797.jpg",
    alt: "Resultado de Social Media — cliente ZBRAND",
    borderColor: "#AAFF00",
    shadowColor: "#AAFF00",
    label: "Resultado",
    rotate: "-0.8deg",
  },
  {
    src: "/images/resultados-social-media/IMG_7798.jpg",
    alt: "Resultado de Social Media — cliente ZBRAND",
    borderColor: "#FF6100",
    shadowColor: "#FF6100",
    label: "Crescimento",
    rotate: "1.2deg",
  },
];

export function ZSocialCases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative bg-preto py-20 lg:py-28 overflow-hidden">
      {/* Zebra texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "url('/images/zebra-texture-white.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "280px 280px",
        }}
      />

      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-laranja mb-4">
            Resultados reais
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white uppercase tracking-tight leading-tight">
            Veja o que entregamos{" "}
            <span className="text-laranja">de verdade</span>
          </h2>
          <p className="mt-4 font-display text-sm text-white/40 max-w-lg mx-auto leading-relaxed">
            Prints reais de clientes reais. Sem promessa de milagre — só trabalho consistente.
          </p>
        </motion.div>

        {/* Galeria — 1 coluna mobile, 4 colunas desktop */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 lg:gap-6 items-start">
          {results.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 + i * 0.12,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group"
            >
              <div
                className="relative overflow-hidden rounded-xl border-[3px] transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  borderColor: item.borderColor,
                  boxShadow: `5px 5px 0px 0px ${item.shadowColor}`,
                }}
              >
                {/* Imagem na proporção real (~1:2 retrato) */}
                <div className="relative w-full" style={{ aspectRatio: "1170 / 2383" }}>
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>

                {/* Label badge */}
                <div
                  className="absolute bottom-3 left-3"
                  style={{
                    background: item.borderColor,
                    boxShadow: "2px 2px 0px #1A1A1A",
                  }}
                >
                  <span className="block px-3 py-1 font-black text-[10px] uppercase tracking-[0.2em] text-[#1A1A1A] border-2 border-[#1A1A1A]">
                    {item.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rodapé */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="text-center text-white/20 text-xs mt-10 font-medium"
        >
          Resultados de clientes reais da ZBRAND
        </motion.p>
      </div>
    </section>
  );
}
