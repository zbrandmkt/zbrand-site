"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const now = new Date();
const MONTH = now.toLocaleDateString("pt-BR", { month: "long" }).replace(/^\w/, (c) => c.toUpperCase());
const YEAR  = now.getFullYear();

interface TrafegoMetrics {
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  leads: number;
  cpc: number;
  cpm: number;
  cpl: number;
  ctr: number;
  frequency: number;
  campaigns: {
    campaign_id: string;
    campaign_name: string;
    spend: number;
    impressions: number;
    clicks: number;
    leads: number;
    cpc: number;
    cpl: number;
  }[];
  synced_at?: string;
}

function fmt(value: number | undefined, prefix = "", decimals = 0): string {
  if (!value || value === 0) return "—";
  return `${prefix}${value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
}

function fmtCurrency(value: number | undefined): string {
  if (!value || value === 0) return "—";
  return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function KpiCard({ emoji, label, value, shadow, delay = 0 }: {
  emoji: string; label: string; value: string; shadow: string; delay?: number;
}) {
  const hasData = value !== "—";
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
      <p className={`text-2xl font-black leading-none ${hasData ? "text-[#1A1A1A]" : "text-[#1A1A1A]/25"}`}>{value}</p>
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

export default function TrafegoPagoPage({ metrics }: { metrics: TrafegoMetrics | null }) {
  const hasData = !!metrics;

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
          {hasData ? (
            <span className="flex items-center gap-1.5 bg-[#AAFF00]/20 border border-[#AAFF00] text-[#1A1A1A] text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] inline-block" />
              Meta Ads • Ao Vivo
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-[#1A1A1A]/06 border border-[#1A1A1A]/10 text-[#1A1A1A]/30 text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
              Aguardando dados
            </span>
          )}
        </div>
      </motion.div>

      {/* Banner — só exibe se não tiver dados */}
      {!hasData && (
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
      )}

      {/* Banner de última sincronização — só com dados */}
      {hasData && metrics.synced_at && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6 bg-[#AAFF00]/10 border-2 border-[#AAFF00]/40 rounded-2xl px-5 py-3 flex items-center gap-3"
        >
          <span className="text-lg shrink-0">🔄</span>
          <p className="text-xs font-black text-[#1A1A1A]/60">
            Dados sincronizados em {new Date(metrics.synced_at).toLocaleString("pt-BR")} via Meta Ads API
          </p>
        </motion.div>
      )}

      {/* KPIs */}
      <div className="flex gap-3 mb-6">
        <KpiCard emoji="💸" label="Total Investido"  value={fmtCurrency(metrics?.spend)}  shadow="#FF6100" delay={0} />
        <KpiCard emoji="🎯" label="Total de Leads"   value={fmt(metrics?.leads)}           shadow="#00C2FF" delay={0.06} />
        <KpiCard emoji="💰" label="CPL Médio"        value={fmtCurrency(metrics?.cpl)}     shadow="#AAFF00" delay={0.12} />
        <KpiCard emoji="👆" label="CPC Médio Meta"   value={fmtCurrency(metrics?.cpc)}     shadow="#7B2FF7" delay={0.18} />
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

      {/* Funil de Conversão */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="col-span-3 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">📈 Métricas Gerais</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">{MONTH} {YEAR} — Meta Ads</p>
          {hasData ? (
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Impressões",  value: fmt(metrics.impressions), color: "#FF6100" },
                { label: "Alcance",     value: fmt(metrics.reach),       color: "#00C2FF" },
                { label: "Cliques",     value: fmt(metrics.clicks),      color: "#AAFF00" },
                { label: "CTR",         value: metrics.ctr ? `${metrics.ctr.toFixed(2)}%` : "—", color: "#7B2FF7" },
                { label: "CPM",         value: fmtCurrency(metrics.cpm),  color: "#FBBC05" },
                { label: "Frequência",  value: metrics.frequency ? metrics.frequency.toFixed(2) : "—", color: "#FF3D9A" },
              ].map(({ label, value, color }) => (
                <div key={label} className="rounded-xl border-2 border-[#1A1A1A]/08 bg-[#F5F5F0]/60 p-3">
                  <p className="text-[9px] font-black uppercase tracking-wider text-[#1A1A1A]/30 mb-1">{label}</p>
                  <p className="text-base font-black" style={{ color }}>{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
              <p className="text-xs text-[#1A1A1A]/25 font-medium">Gráfico disponível após integração com Meta Ads</p>
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="col-span-2 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #00C2FF" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">🔻 Funil de Conversão</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">{MONTH} {YEAR} — Meta</p>
          <div className="flex flex-col gap-3">
            {[
              { label: "Impressões", value: hasData ? fmt(metrics.impressions) : "—", pct: 100 },
              { label: "Cliques",    value: hasData ? fmt(metrics.clicks) : "—",      pct: hasData && metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0 },
              { label: "Leads",      value: hasData ? fmt(metrics.leads) : "—",       pct: hasData && metrics.clicks > 0 ? (metrics.leads / metrics.clicks) * 100 : 0 },
              { label: "Vendas",     value: "—",                                      pct: 0 },
            ].map(({ label, value, pct }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">{label}</span>
                  <span className={`text-sm font-black ${value !== "—" ? "text-[#1A1A1A]" : "text-[#1A1A1A]/20"}`}>{value}</span>
                </div>
                <div className="h-5 bg-[#1A1A1A]/05 rounded-lg overflow-hidden">
                  {pct > 0 && (
                    <div className="h-full bg-[#00C2FF] rounded-lg" style={{ width: `${Math.min(pct, 100)}%` }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Campanhas */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
        style={{ boxShadow: "4px 4px 0px 0px #AAFF00" }}
      >
        <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-4">📋 Campanhas Ativas — Meta Ads</p>
        {hasData && metrics.campaigns && metrics.campaigns.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F0] rounded-xl">
                {["Campanha", "Investido", "Impressões", "Cliques", "Leads", "CPC", "CPL"].map((h) => (
                  <th key={h} className="px-3 py-2 text-left text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.campaigns.map((c, i) => (
                <tr key={c.campaign_id} className={i % 2 === 0 ? "bg-white" : "bg-[#F5F5F0]/40"}>
                  <td className="px-3 py-3 text-xs font-bold text-[#1A1A1A] max-w-[200px] truncate">{c.campaign_name}</td>
                  <td className="px-3 py-3 text-xs font-black text-[#FF6100]">{fmtCurrency(c.spend)}</td>
                  <td className="px-3 py-3 text-xs text-[#1A1A1A]/60">{fmt(c.impressions)}</td>
                  <td className="px-3 py-3 text-xs text-[#1A1A1A]/60">{fmt(c.clicks)}</td>
                  <td className="px-3 py-3 text-xs font-black text-[#00C2FF]">{c.leads > 0 ? fmt(c.leads) : "—"}</td>
                  <td className="px-3 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(c.cpc)}</td>
                  <td className="px-3 py-3 text-xs font-black text-[#7B2FF7]">{c.cpl > 0 ? fmtCurrency(c.cpl) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-[#1A1A1A]/10 rounded-xl">
            <p className="text-xs text-[#1A1A1A]/25 font-medium">Aguardando dados de campanhas</p>
          </div>
        )}
      </motion.div>

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
              {p.label === "Meta Ads" && hasData ? (
                <>
                  <div>
                    <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Investido</p>
                    <p className="text-sm font-black text-[#1A1A1A]">{fmtCurrency(metrics.spend)}</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Budget</p>
                    <p className="text-sm font-black text-[#1A1A1A]/25">—</p>
                  </div>
                  <div>
                    <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Saldo</p>
                    <p className="text-sm font-black text-[#1A1A1A]/25">—</p>
                  </div>
                </>
              ) : (
                ["Budget", "Utilizado", "Saldo"].map((l) => (
                  <div key={l}>
                    <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">{l}</p>
                    <p className="text-sm font-black text-[#1A1A1A]/25">—</p>
                  </div>
                ))
              )}
            </div>
            <div className="h-4 bg-[#1A1A1A]/06 rounded-full border border-[#1A1A1A]/08" />
            <p className="text-[9px] text-[#1A1A1A]/25 font-medium mt-2">
              {p.label === "Meta Ads" && hasData ? "Dados via Meta Ads API" : "Aguardando dados de investimento"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Criativos */}
      <EmptySection title="🏆 Criativos Campeões" shadow="#7B2FF7">
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
      <EmptySection title="📅 Histórico Mensal" shadow="#FBBC05">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F5F5F0]">
              {["Mês", "Investido", "Leads", "CPL", "CPC Meta", "Var. Leads"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {hasData ? (
              <tr>
                <td className="px-4 py-3 text-xs font-bold text-[#1A1A1A]">{MONTH} {YEAR}</td>
                <td className="px-4 py-3 text-xs font-black text-[#FF6100]">{fmtCurrency(metrics.spend)}</td>
                <td className="px-4 py-3 text-xs font-black text-[#00C2FF]">{fmt(metrics.leads)}</td>
                <td className="px-4 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(metrics.cpl)}</td>
                <td className="px-4 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(metrics.cpc)}</td>
                <td className="px-4 py-3 text-xs text-[#1A1A1A]/25">—</td>
              </tr>
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#1A1A1A]/25 font-medium">
                  O histórico de relatórios será exibido aqui
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </EmptySection>

    </div>
  );
}
