"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const diffs = [
  { icon: "🔥", title: "Experiência Vivida", desc: "Já tocamos restaurante. Sabemos o que funciona na prática." },
  { icon: "🎥", title: "Conteúdo Humanizado", desc: "Nada de banco de imagem. A gente grava conteúdo real no seu restaurante." },
  { icon: "📸", title: "Captação Incluída", desc: "Foto, vídeo e reels profissionais fazem parte do serviço." },
];

export function Differentials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-light py-16 lg:py-24">
      <div ref={ref} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-section-title text-preto mb-4 uppercase tracking-tight">
              Restaurante{" "}
              <span className="text-laranja">para restaurante</span>
            </h2>
            <p className="font-display text-sm text-cinza-dark leading-relaxed mb-3">
              A ZBRAND nasceu da Churruts — um restaurante que levantamos do zero.
              Sabemos o que funciona porque testamos no nosso próprio negócio.
            </p>
            <p className="font-display text-sm text-cinza-dark leading-relaxed">
              Bruna e Gui são donos de restaurante que aprenderam na prática e
              agora ajudam outros donos a crescer com inteligência.
            </p>

            {/* Photo placeholder */}
            <div className="mt-6 w-full h-48 bg-cinza-light border border-cinza rounded-2xl flex items-center justify-center">
              <p className="font-display text-xs text-cinza-text">
                📷 Foto profissional de Bruna e Gui
              </p>
            </div>
          </motion.div>

          {/* Right - Differentials */}
          <div className="flex flex-col gap-4">
            {diffs.map((d, i) => (
              <motion.div
                key={d.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
                className="card-soft p-5 flex gap-4 items-start"
              >
                <div className="w-10 h-10 bg-laranja-soft border border-laranja/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">{d.icon}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-preto mb-0.5 uppercase">
                    {d.title}
                  </h3>
                  <p className="font-display text-xs text-cinza-text leading-relaxed">
                    {d.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
