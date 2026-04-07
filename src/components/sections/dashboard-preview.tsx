"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

// ─── Container Scroll Animation (estilo Aceternity UI) ───────────
function ContainerScroll({ children, header }: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const spring = { stiffness: 300, damping: 60, bounce: 0 };

  // Rotação 3D: começa inclinado, termina flat
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.35], [25, 0]),
    spring
  );
  // Escala: começa um pouco menor
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 0.35], [0.88, 1]),
    spring
  );
  // O header sobe e some enquanto o card cresce
  const headerY = useSpring(
    useTransform(scrollYProgress, [0, 0.25], [0, -60]),
    spring
  );
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.35], [60, 0]),
    spring
  );

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-start relative"
      style={{ perspective: "1000px" }}
    >
      {/* Header animado */}
      <motion.div
        style={{ y: headerY, opacity: headerOpacity }}
        className="w-full text-center mb-10 relative z-10"
      >
        {header}
      </motion.div>

      {/* Card com rotação 3D */}
      <motion.div
        style={{
          rotateX,
          scale,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full max-w-5xl mx-auto"
      >
        {children}
      </motion.div>
    </div>
  );
}

// ─── Seção Principal ──────────────────────────────────────────────
export function DashboardPreview() {
  return (
    <section className="bg-[#1A1A1A] py-24 lg:py-40 overflow-hidden">
      {/* Altura extra para dar espaço ao scroll */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContainerScroll
          header={
            <div className="flex flex-col items-center gap-4">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black uppercase tracking-[0.25em] text-[#FF6100]"
              >
                Área do Cliente
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.07 }}
                className="font-display text-4xl lg:text-5xl font-black text-white uppercase tracking-tight leading-tight"
              >
                Resultados em tempo{" "}
                <span className="text-[#FF6100]">real</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.14 }}
                className="text-base text-white/40 font-medium max-w-xl leading-relaxed"
              >
                Após todo o processo, você acompanha cada resultado pelo nosso
                dashboard exclusivo — leads, investimento, metas e muito mais,
                tudo num lugar só.
              </motion.p>

              {/* Pills de features */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 mt-2"
              >
                {[
                  { icon: "📊", label: "KPIs em tempo real" },
                  { icon: "🎯", label: "Metas com progresso" },
                  { icon: "📈", label: "Evolução semanal" },
                  { icon: "🏆", label: "Criativos campeões" },
                  { icon: "🔒", label: "Acesso exclusivo" },
                ].map((f) => (
                  <span
                    key={f.label}
                    className="flex items-center gap-1.5 text-[11px] font-black px-3 py-1.5 rounded-full border border-white/10 text-white/60 bg-white/05"
                  >
                    <span>{f.icon}</span> {f.label}
                  </span>
                ))}
              </motion.div>
            </div>
          }
        >
          {/* ── Dashboard mockup ── */}
          <div
            className="w-full rounded-2xl border-2 border-white/10 overflow-hidden"
            style={{
              boxShadow: "0 0 0 1px rgba(255,97,0,0.2), 0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(255,97,0,0.08)",
            }}
          >
            {/* Barra do browser */}
            <div className="bg-[#0F0F0F] border-b border-white/08 px-4 py-3 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <div className="flex-1 bg-white/06 rounded-lg px-4 py-1 text-[11px] text-white/30 font-medium text-center">
                zbrand.com.br/area-do-cliente/dashboard
              </div>
            </div>

            {/* Screenshot real do dashboard */}
            <div className="relative bg-[#0F0F0F] aspect-[16/9]">
              <Image
                src="/images/dashboard.png"
                alt="Dashboard ZBRAND — Área do Cliente"
                fill
                className="object-cover object-top"
                priority
              />
              {/* Overlay gradiente na parte de baixo */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1A1A1A]/50 to-transparent pointer-events-none" />
            </div>
          </div>
        </ContainerScroll>

        {/* CTA abaixo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <a
            href="/area-do-cliente"
            className="inline-flex items-center gap-2 bg-[#FF6100] border-2 border-[#FF6100] text-white font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ boxShadow: "4px 4px 0px 0px rgba(255,97,0,0.4)" }}
          >
            Acessar minha área →
          </a>
          <p className="text-white/30 text-xs font-medium">
            Exclusivo para clientes ZBRAND
          </p>
        </motion.div>
      </div>
    </section>
  );
}
