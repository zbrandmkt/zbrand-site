"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    name: "Cliente 1",
    business: "Restaurante Exemplo 1",
    text: "A ZBRAND transformou nosso Instagram. Passamos de 500 para 5.000 seguidores e o melhor: clientes novos aparecendo todo dia.",
    stars: 5,
  },
  {
    name: "Cliente 2",
    business: "Restaurante Exemplo 2",
    text: "Pela primeira vez eu sei exatamente quanto cada real investido em anúncio trouxe de retorno. Transparência total.",
    stars: 5,
  },
  {
    name: "Cliente 3",
    business: "Restaurante Exemplo 3",
    text: "Eles vão até o restaurante, filmam, editam e publicam. Eu não preciso me preocupar com nada.",
    stars: 5,
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-warm py-16 lg:py-24">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-section-title text-preto uppercase tracking-tight">
            Quem confiou <span className="text-laranja">na zebra</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              className="card-soft p-5 flex flex-col"
            >
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-amarelo" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="font-display text-xs text-cinza-dark leading-relaxed flex-1 mb-4">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-2.5 pt-3 border-t border-cinza/50">
                <div className="w-8 h-8 bg-laranja-soft rounded-full flex items-center justify-center">
                  <span className="font-display font-bold text-[10px] text-laranja">
                    {t.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-xs text-preto">{t.name}</p>
                  <p className="font-display text-[10px] text-cinza-text">{t.business}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
