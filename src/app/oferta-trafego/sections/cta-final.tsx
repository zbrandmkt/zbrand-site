"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function CtaFinal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-[#00C2FF] py-24 px-5 relative overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(#1A1A1A 1px, transparent 1px), linear-gradient(90deg, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dark glow bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#1A1A1A]/20 blur-[100px] rounded-full pointer-events-none" />

      <div ref={ref} className="relative z-10 max-w-lg mx-auto text-center">

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#1A1A1A]/15 border-2 border-[#1A1A1A]/20 text-3xl mb-8"
        >
          🎯
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-black text-[#1A1A1A] uppercase tracking-tight leading-[1.0] mb-4"
          style={{ fontSize: "clamp(2rem, 7vw, 3.2rem)" }}
        >
          Em 30 dias você já vê resultado.
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.16, duration: 0.5 }}
          className="text-[#1A1A1A]/60 text-base leading-relaxed mb-10 max-w-sm mx-auto"
        >
          Sem papo de vendedor. Sem promessa vazia. Só uma conversa honesta
          sobre como a gente pode transformar o digital do seu restaurante.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.24, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <a
            href={getWhatsAppLink("trafego")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 bg-[#1A1A1A] border-2 border-[#1A1A1A] text-white font-black uppercase tracking-widest text-sm py-4 px-8 rounded-2xl"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.25)" }}
          >
            <svg className="w-4 h-4 shrink-0 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Falar com a ZBRAND agora
          </a>
        </motion.div>

        {/* Social + CNPJ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.45 }}
          className="mt-12 pt-8 border-t border-[#1A1A1A]/15 flex flex-col items-center gap-3"
        >
          <a
            href="https://instagram.com/zbrand.mkt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1A1A1A]/50 hover:text-[#1A1A1A]/80 transition-colors text-sm font-black"
          >
            @zbrand.mkt
          </a>
          <p className="text-[#1A1A1A]/30 text-[10px] font-medium">
            ZBRAND CONSULTORIA EM PUBLICIDADE LTDA · CNPJ 63.534.147/0001-81
          </p>
        </motion.div>
      </div>
    </section>
  );
}
