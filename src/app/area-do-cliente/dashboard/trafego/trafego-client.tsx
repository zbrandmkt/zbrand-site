"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const now = new Date();
const MONTH = now.toLocaleDateString("pt-BR", { month: "long" }).replace(/^\w/, (c) => c.toUpperCase());
const YEAR  = now.getFullYear();

function KpiCard({ emoji, label, shadow, delay = 0 }: {
  emoji: string; label: string; shadow: string; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 flex-1"
      style={{ boxShadow: `5px 5px 0px 0px ${shadow}` }}
    >
      <span className="text-xl leading-none">{emoji}</span>
      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">{label}</p>
      <p className="text-2xl font-black text-[#1A1A1A]/25 leading-none">—</p>
    </motion.div>
  );
}

function EmptySection({ title, shadow, children }: {
  title: string; shadow: string; children?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
      style={{ boxShadow: `4px 4px 0px 0px ${shadow}` }}
    >
      <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-4">{title}</p>
      {children ?? (
        <div className="h-24 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
          <p className="text-xs text-[#1A1A1A]/25 font-medium">Dados serão preenchidos em breve</p>
        </div>
      )}
    </motion.div>
  );
}

export default function TrafegoPagoPage() {
  return (
    <div className="p-8 max-w-[1400px]">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/area-do-cliente/dashboard"
              className="text-[10px] font-bold text-[#1A1A1A]/30 hover:text-[#FF6100] uppercase tracking-widest transition-colors">
              Dashboard
            </Link>
            <span className="text-[#1A1A1A]/20 text-[10px]">/</span>
            <span className="text-[10px] font-bold text-[#FF6100] uppercase tracking-widest">Tráfego Pago</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">📊 Tráfego Pago</h1>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">Análise completa — {MONTH} {YEAR}</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border-2 border-[#1A1A1A] rounded-xl px-4 py-2"
            style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}>
            <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] min-w-[110px] text-center">
              {MONTH} {YEAR}
            </span>
          </div>
          <span className="flex items-center gap-1.5 bg-[#1A1A1A]/06 border border-[#1A1A1A]/10 text-[#1A1A1A]/30 text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
            Aguardando dados
          </span>
        </div>
      </motion.div>

      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 bg-white border-2 border-[#1A1A1A]/10 rounded-2xl px-5 py-4 flex items-center gap-4"
        style={{ boxShadow: "3px 3px 0px 0px #FF6100" }}
      >
        <span className="text-2xl shrink-0">📊</span>
        <div>
          <p className="text-sm font-black text-[#1A1A1A]">Métricas de Tráfego Pago em preparação</p>
          <p className="text-xs text-[#1A1A1A]/50 mt-0.5">
            Em breve você verá aqui: leads gerados, CPL, CPC, gráfico de evolução, funil de conversão, budget tracker e criativos campeões — integrado diretamente com Meta Ads e Google Ads.
          </p>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="flex gap-3 mb-6">
        <KpiCard emoji="💸" label="Total Investido"  shadow="#FF6100" delay={0} />
        <KpiCard emoji="🎯" label="Total de Leads"   shadow="#00C2FF" delay={0.06} />
        <KpiCard emoji="💰" label="CPL Médio"        shadow="#AAFF00" delay={0.12} />
        <KpiCard emoji="👆" label="CPC Médio Meta"   shadow="#7B2FF7" delay={0.18} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-0"
          style={{ boxShadow: "5px 5px 0px 0px #1A1A1A", flex: "1.5" }}
        >
          <span className="text-xl leading-none">💳</span>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">Saldo em Conta</p>
          <div className="flex gap-2 flex-1 items-end">
            {[
              { label: "META",   bg: "#1877F2", badgeText: "white" },
              { label: "GOOGLE", bg: "#FBBC05", badgeText: "#1A1A1A" },
            ].map((s) => (
              <div key={s.label} className="flex-1 rounded-xl px-3 py-2"
                style={{ background: `${s.bg}10`, border: `1px solid ${s.bg}30` }}>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                  style={{ background: s.bg, color: s.badgeText }}>{s.label}</span>
                <p className="text-lg font-black text-[#1A1A1A]/25 leading-none mt-1.5">—</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Metas */}
      <EmptySection title="🎯 Metas do Mês" shadow="#FF6100">
        <div className="grid grid-cols-5 gap-3">
          {["Leads Meta", "CPL Meta", "Leads Google", "CPL Google", "Budget Meta"].map((label) => (
            <div key={label}
              className="rounded-2xl border-2 border-[#1A1A1A]/08 bg-[#F5F5F0]/60 p-4 flex flex-col gap-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{label}</p>
              <p className="text-xl font-black text-[#1A1A1A]/20">—</p>
              <div className="h-2 bg-[#1A1A1A]/06 rounded-full" />
            </div>
          ))}
        </div>
      </EmptySection>

      {/* Gráfico + Funil */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="col-span-3 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">📈 Evolução de Leads</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">{MONTH} {YEAR} — semana a semana</p>
          <div className="h-40 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
            <p className="text-xs text-[#1A1A1A]/25 font-medium">Gráfico disponível após integração com Meta Ads</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="col-span-2 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #00C2FF" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">🔻 Funil de Conversão</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">{MONTH} {YEAR} — Meta + Google</p>
          <div className="flex flex-col gap-3">
            {["Impressões", "Cliques", "Leads", "Vendas"].map((label) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">{label}</span>
                  <span className="text-sm font-black text-[#1A1A1A]/20">—</span>
                </div>
                <div className="h-5 bg-[#1A1A1A]/05 rounded-lg" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Budget */}
      <div className="flex gap-4 mb-5">
        {[
          { label: "Meta Ads",   badge: "META",   bg: "#1877F2", tc: "white",    shadow: "#1877F2" },
          { label: "Google Ads", badge: "GOOGLE", bg: "#FBBC05", tc: "#1A1A1A", shadow: "#FBBC05" },
        ].map((p) => (
          <motion.div key={p.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
            style={{ boxShadow: `4px 4px 0px 0px ${p.shadow}` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                style={{ background: p.bg, color: p.tc }}>{p.badge}</span>
              <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">{p.label}</span>
            </div>
            <div className="flex gap-6 mb-4">
              {["Budget", "Utilizado", "Saldo"].map((l) => (
                <div key={l}>
                  <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">{l}</p>
                  <p className="text-sm font-black text-[#1A1A1A]/25">—</p>
                </div>
              ))}
            </div>
            <div className="h-4 bg-[#1A1A1A]/06 rounded-full border border-[#1A1A1A]/08" />
            <p className="text-[9px] text-[#1A1A1A]/25 font-medium mt-2">Aguardando dados de investimento</p>
          </motion.div>
        ))}
      </div>

      {/* Criativos */}
      <EmptySection title="🏆 Criativos Campeões" shadow="#AAFF00">
        <div className="flex gap-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <div key={n}
              className="flex-1 border-2 border-dashed border-[#1A1A1A]/10 rounded-2xl aspect-[3/4] flex flex-col items-center justify-center gap-2">
              <span className="text-xl opacity-20">🖼️</span>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/20">{n}º lugar</p>
            </div>
          ))}
        </div>
      </EmptySection>

      {/* Histórico */}
      <EmptySection title="📅 Histórico Mensal" shadow="#7B2FF7">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5F5F0]">
              {["Mês", "Investido", "Leads", "CPL", "CPC Meta", "Var. Leads"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#1A1A1A]/25 font-medium">
                O histórico de relatórios será exibido aqui
              </td>
            </tr>
          </tbody>
        </table>
      </EmptySection>

    </div>
  );
}
