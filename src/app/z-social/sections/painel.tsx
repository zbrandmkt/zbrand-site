"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ─── Feature pills ────────────────────────────────────────────────
const features = [
  { icon: "📅", label: "Calendário de conteúdo" },
  { icon: "✅", label: "Aprovação de posts" },
  { icon: "📊", label: "Métricas de social" },
  { icon: "📈", label: "Evolução de seguidores" },
  { icon: "🔒", label: "Acesso exclusivo" },
];

// ─── Dashboard mockup cards ───────────────────────────────────────
function MockupBrowser({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full rounded-2xl border-2 border-white/10 overflow-hidden"
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,97,0,0.2), 0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(255,97,0,0.08)",
      }}
    >
      {/* Browser bar */}
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
      {/* Content */}
      {children}
    </div>
  );
}

function DashboardMockup() {
  return (
    <div className="bg-[#111111] p-0">
      {/* Sidebar + Main layout */}
      <div className="flex" style={{ minHeight: 420 }}>

        {/* Sidebar */}
        <div className="w-44 bg-[#111111] border-r border-white/08 p-4 flex flex-col gap-1 shrink-0">
          {/* Logo area */}
          <div className="mb-6 px-2">
            <div className="h-6 w-20 bg-white/10 rounded-md" />
          </div>
          {[
            { icon: "📊", label: "Visão Geral", active: false },
            { icon: "📱", label: "Social Media", active: true },
            { icon: "📅", label: "Calendário", active: false },
            { icon: "✅", label: "Aprovações", active: false, badge: "3" },
            { icon: "📈", label: "Tráfego", active: false },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-bold ${
                item.active
                  ? "bg-[#FF6100]/15 text-[#FF6100]"
                  : "text-white/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="w-4 h-4 bg-[#FF6100] text-white text-[9px] font-black rounded-full flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 overflow-hidden">
          {/* Header row */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="h-4 w-36 bg-white/15 rounded mb-1" />
              <div className="h-3 w-24 bg-white/08 rounded" />
            </div>
            <div className="flex items-center gap-2">
              <div className="h-7 w-24 bg-white/08 rounded-lg border border-white/10" />
              <div className="h-7 w-7 rounded-full bg-[#FF6100]/20 border border-[#FF6100]/30 flex items-center justify-center">
                <span className="text-[#FF6100] text-[9px] font-black">R</span>
              </div>
            </div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-4 gap-3 mb-5">
            {[
              { label: "Seguidores", value: "2.847", delta: "+127", color: "#FF6100" },
              { label: "Alcance/post", value: "1.200", delta: "+340", color: "#AAFF00" },
              { label: "Engajamento", value: "4,8%", delta: "+1.2%", color: "#00C2FF" },
              { label: "Posts mês", value: "15/15", delta: "✓ OK", color: "#7B2FF7" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white/04 border border-white/08 rounded-xl p-3">
                <p className="text-[9px] text-white/30 font-black uppercase tracking-wider mb-1">
                  {kpi.label}
                </p>
                <p className="font-black text-base text-white leading-none">{kpi.value}</p>
                <p className="text-[9px] font-bold mt-1" style={{ color: kpi.color }}>
                  {kpi.delta}
                </p>
              </div>
            ))}
          </div>

          {/* Content row: chart + approval queue */}
          <div className="grid grid-cols-3 gap-3">

            {/* Chart area */}
            <div className="col-span-2 bg-white/04 border border-white/08 rounded-xl p-3">
              <p className="text-[9px] text-white/30 font-black uppercase tracking-wider mb-3">
                Evolução de Seguidores
              </p>
              {/* Fake chart bars */}
              <div className="flex items-end gap-1.5 h-20">
                {[40, 52, 48, 60, 65, 55, 72, 68, 78, 82, 90, 88, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${h}%`,
                      background: i === 12
                        ? "#FF6100"
                        : `rgba(255,97,0,${0.15 + i * 0.03})`,
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["Jan", "Fev", "Mar", "Abr"].map((m) => (
                  <span key={m} className="text-[8px] text-white/20">{m}</span>
                ))}
              </div>
            </div>

            {/* Approval queue */}
            <div className="bg-white/04 border border-white/08 rounded-xl p-3">
              <p className="text-[9px] text-white/30 font-black uppercase tracking-wider mb-2">
                Aguardando aprovação
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { title: "Reel — Promoção", date: "15 Abr" },
                  { title: "Post — Bastidores", date: "17 Abr" },
                  { title: "Story — Novidade", date: "18 Abr" },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/04 rounded-lg px-2 py-1.5 border-l-2"
                    style={{ borderLeftColor: "#FF6100" }}
                  >
                    <div className="flex-1">
                      <p className="text-[9px] text-white font-bold truncate">{p.title}</p>
                      <p className="text-[8px] text-white/25">{p.date}</p>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded bg-[#AAFF00]/20 border border-[#AAFF00]/40 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#AAFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="w-4 h-4 rounded bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                          <path d="M3 9l6-6M3 3l6 6" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Scroll-animated container ────────────────────────────────────
function ContainerScroll({ children, header }: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });
  const spring = { stiffness: 200, damping: 50, bounce: 0 };
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 1], [28, 0]), spring);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.85, 1]), spring);

  return (
    <div className="flex flex-col items-center justify-start relative">
      <div className="w-full text-center mb-12 relative z-10">{header}</div>
      <div ref={cardRef} className="w-full max-w-5xl mx-auto" style={{ perspective: "1200px" }}>
        <motion.div style={{ rotateX, scale, transformStyle: "preserve-3d", transformOrigin: "center bottom" }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────
export function ZSocialPainel() {
  return (
    <section className="bg-[#1A1A1A] py-24 lg:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContainerScroll
          header={
            <div className="flex flex-col items-center gap-4">
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[11px] font-black uppercase tracking-[0.25em] text-laranja"
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
                Você acompanha{" "}
                <span className="text-laranja">tudo</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.14 }}
                className="font-display text-base text-white/40 font-medium max-w-xl leading-relaxed"
              >
                Após assinar, você ganha acesso ao painel exclusivo do cliente — onde aprova posts,
                acompanha métricas e vê sua marca crescer em tempo real.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-2 mt-2"
              >
                {features.map((f) => (
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
          <MockupBrowser>
            <DashboardMockup />
          </MockupBrowser>
        </ContainerScroll>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <a
            href="/area-do-cliente"
            className="inline-flex items-center gap-2 bg-laranja border-2 border-laranja text-white font-black uppercase tracking-widest text-sm px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ boxShadow: "4px 4px 0px 0px rgba(255,97,0,0.4)" }}
          >
            Já sou cliente — acessar painel →
          </a>
          <p className="text-white/30 text-xs font-medium">
            Acesso exclusivo para clientes ZBRAND
          </p>
        </motion.div>
      </div>
    </section>
  );
}
