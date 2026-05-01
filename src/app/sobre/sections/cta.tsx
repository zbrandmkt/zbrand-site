"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";

const ORANGE = "#FF6100";

export function SobreCta() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#F5F5F0] py-20 lg:py-28">
      <div ref={ref} className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 text-[10px] font-black uppercase tracking-[0.25em]"
            style={{ color: ORANGE, borderColor: `${ORANGE}40`, background: `${ORANGE}10` }}
          >
            💬 Vamos conversar
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-black text-5xl lg:text-6xl text-preto uppercase tracking-tight leading-tight mb-6"
        >
          Bora{" "}
          <span style={{ color: ORANGE }}>conversar?</span>
        </motion.h2>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.55 }}
          className="font-display text-base text-cinza-dark leading-relaxed mb-10 max-w-md mx-auto"
        >
          Sem pitch de vendas. Uma conversa real sobre o seu negócio —
          e se faz sentido trabalhar juntos.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.55 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.a
            href={getWhatsAppLink("sobre")}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 font-display font-black text-sm uppercase tracking-widest px-8 py-4 border-2 border-preto rounded-brutal text-white"
            style={{
              backgroundColor: ORANGE,
              boxShadow: "4px 4px 0px 0px #1A1A1A",
            }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chamar no WhatsApp
          </motion.a>

          <a
            href="/"
            className="font-display text-xs font-bold text-cinza-text hover:text-preto transition-colors uppercase tracking-widest"
          >
            ← Voltar para o site
          </a>
        </motion.div>

        {/* Assinatura */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.55 }}
          className="mt-12 font-display text-sm text-cinza-text"
        >
          Com carinho,{" "}
          <span className="font-black text-preto" style={{ color: ORANGE }}>
            Bruna e Gui 🦓
          </span>
        </motion.p>
      </div>
    </section>
  );
}
