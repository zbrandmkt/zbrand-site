"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  trafficPageMonths,
  topCreatives,
  monthHistory,
  monthlyTraffic,
  type Creative,
} from "../mock-data";

// ─── Helpers ────────────────────────────────────────────────────
function fmtR(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function fmt(n: number) {
  return n.toLocaleString("pt-BR");
}
function pctChange(curr: number, prev: number) {
  return (((curr - prev) / prev) * 100).toFixed(1);
}

// ─── KPI Card com variação ───────────────────────────────────────
function KpiCard({ emoji, label, value, shadow, delta, deltaInverted = false, delay = 0 }: {
  emoji: string; label: string; value: string; shadow: string;
  delta?: { curr: number; prev: number }; deltaInverted?: boolean; delay?: number;
}) {
  const change = delta ? parseFloat(pctChange(delta.curr, delta.prev)) : null;
  const isPositive = change !== null ? (deltaInverted ? change < 0 : change > 0) : null;
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
      <p className="text-2xl font-black text-[#1A1A1A] leading-none">{value}</p>
      {change !== null && (
        <span className={`text-[10px] font-bold ${isPositive ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
          {change > 0 ? "↑" : "↓"} {Math.abs(change)}% vs mês anterior
        </span>
      )}
    </motion.div>
  );
}

// ─── Gráfico de Evolução ─────────────────────────────────────────
function EvolutionChart({ weeks }: { weeks: { label: string; leads: number; invest: number }[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const W = 800, H = 190;
  const PL = 10, PR = 10, PT = 28, PB = 28;
  const cW = W - PL - PR, cH = H - PT - PB;
  const n = weeks.length;

  const maxLeads  = Math.max(...weeks.map(d => d.leads))  * 1.2;
  const maxInvest = Math.max(...weeks.map(d => d.invest)) * 1.2;

  const xPos = (i: number) => PL + (n === 1 ? cW / 2 : (i / (n - 1)) * cW);
  const yL   = (v: number) => PT + cH - (v / maxLeads)  * cH;
  const yI   = (v: number) => PT + cH - (v / maxInvest) * cH;

  const smooth = (pts: [number, number][]) =>
    pts.map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = pts[i - 1];
      const cx = (px + x) / 2;
      return `C ${cx} ${py} ${cx} ${y} ${x} ${y}`;
    }).join(" ");

  const leadsPoints:  [number, number][] = weeks.map((d, i) => [xPos(i), yL(d.leads)]);
  const investPoints: [number, number][] = weeks.map((d, i) => [xPos(i), yI(d.invest)]);
  const leadsPath  = smooth(leadsPoints);
  const investPath = smooth(investPoints);
  const areaPath   = `${leadsPath} L ${xPos(n - 1)} ${PT + cH} L ${xPos(0)} ${PT + cH} Z`;

  return (
    <div className="w-full">
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-0.5 bg-[#FF6100] rounded-full" />
          <span className="text-[10px] font-bold text-[#1A1A1A]/40 uppercase tracking-wide">Leads</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 border-t-2 border-dashed border-[#00C2FF]" />
          <span className="text-[10px] font-bold text-[#1A1A1A]/40 uppercase tracking-wide">Investimento</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: "170px" }}>
        <defs>
          <linearGradient id="leadsGradTraf" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#FF6100" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF6100" stopOpacity="0"    />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map(p => (
          <line key={p} x1={PL} y1={PT + cH * (1 - p)} x2={W - PR} y2={PT + cH * (1 - p)}
            stroke="#1A1A1A" strokeOpacity="0.06" strokeWidth="1" />
        ))}
        <path d={investPath} fill="none" stroke="#00C2FF" strokeWidth="1.8" strokeDasharray="7 4" strokeOpacity="0.55" />
        <path d={areaPath}  fill="url(#leadsGradTraf)" />
        <path d={leadsPath} fill="none" stroke="#FF6100" strokeWidth="2.5" />
        {leadsPoints.map(([x, y], i) => {
          const isHov = hovered === i;
          return (
            <g key={i}>
              {isHov && <rect x={x - 30} y={y - 28} width={60} height={20} rx="4" fill="#1A1A1A" />}
              {isHov && (
                <text x={x} y={y - 13} textAnchor="middle" fill="white" fontSize="11" fontWeight="800">
                  {weeks[i].leads} leads
                </text>
              )}
              <circle cx={x} cy={y} r={isHov ? 6 : 4.5} fill="white" stroke="#FF6100" strokeWidth="2.5"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)} />
              <text x={x} y={H - 4} textAnchor="middle" fill="#1A1A1A" fontSize="9" opacity="0.35" fontWeight="600">
                {weeks[i].label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Funil de Conversão ──────────────────────────────────────────
function FunnelSection({ funnel }: { funnel: { impressions: number; clicks: number; leads: number; sales: number } }) {
  const { impressions, clicks, leads, sales } = funnel;
  const steps = [
    { label: "Impressões",         value: impressions, barW: 100,                              color: "#1A1A1A", sub: "" },
    { label: "Cliques",            value: clicks,      barW: (clicks / impressions) * 100 * 1.8 + 20, color: "#00C2FF", sub: `CTR ${((clicks / impressions) * 100).toFixed(2)}%` },
    { label: "Leads",              value: leads,       barW: (leads  / impressions) * 100 * 6 + 15,   color: "#FF6100", sub: `Conv. ${((leads  / clicks)      * 100).toFixed(1)}%` },
    { label: "Vendas realizadas",  value: sales,       barW: (sales  / impressions) * 100 * 14 + 10,  color: "#22c55e", sub: `Close rate ${((sales / leads) * 100).toFixed(0)}%` },
  ];

  return (
    <div className="flex flex-col gap-3">
      {steps.map((s, i) => (
        <motion.div key={s.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">{s.label}</span>
            <div className="flex items-center gap-2">
              {s.sub && <span className="text-[9px] font-bold text-[#1A1A1A]/30">{s.sub}</span>}
              <span className="text-sm font-black text-[#1A1A1A]">{fmt(s.value)}</span>
            </div>
          </div>
          <div className="h-5 bg-[#1A1A1A]/05 rounded-lg overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(s.barW, 100)}%` }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-lg"
              style={{ background: s.color, opacity: 0.85 }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Budget Tracker ──────────────────────────────────────────────
function BudgetBar({ label, badge, total, spent, badgeBg, badgeText, shadow, daysLeft, isClosed }: {
  label: string; badge: string; total: number; spent: number;
  badgeBg: string; badgeText: string; shadow: string; daysLeft: number; isClosed: boolean;
}) {
  const pctSpent  = Math.min((spent / total) * 100, 100);
  const remaining = total - spent;
  const isLow     = !isClosed && pctSpent > 90;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex-1"
      style={{ boxShadow: `4px 4px 0px 0px ${shadow}` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
            style={{ background: badgeBg, color: badgeText }}>{badge}</span>
          <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">{label}</span>
          {isClosed && (
            <span className="text-[8px] font-black bg-[#1A1A1A]/10 text-[#1A1A1A]/40 px-1.5 py-0.5 rounded-full uppercase">Mês encerrado</span>
          )}
        </div>
        <div className="flex items-center gap-3 text-right">
          <div><p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Budget</p>
            <p className="text-sm font-black text-[#1A1A1A]">{fmtR(total)}</p></div>
          <div><p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Utilizado</p>
            <p className="text-sm font-black text-[#1A1A1A]">{fmtR(spent)}</p></div>
          <div><p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Saldo</p>
            <p className={`text-sm font-black ${remaining <= 0 ? "text-[#1A1A1A]/30" : isLow ? "text-[#FF6100]" : "text-[#22c55e]"}`}>
              {remaining > 0 ? fmtR(remaining) : "—"}
            </p></div>
        </div>
      </div>
      <div className="h-4 bg-[#1A1A1A]/06 rounded-full overflow-hidden border border-[#1A1A1A]/08">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctSpent}%` }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative"
          style={{ background: isClosed ? "#1A1A1A50" : isLow ? "#FF6100" : badgeBg }}
        >
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-black text-white">
            {pctSpent.toFixed(0)}%
          </div>
        </motion.div>
      </div>
      <p className="text-[9px] text-[#1A1A1A]/30 font-medium mt-2">
        {isClosed ? "✓ Mês encerrado" : isLow ? "⚠ Saldo baixo — considere recarregar" : `✓ Budget saudável · ${daysLeft} dias restantes`}
      </p>
    </motion.div>
  );
}

// ─── Creative Thumbnail ──────────────────────────────────────────
function CreativeThumbnail({ type, bg, accent }: { type: string; bg: string; accent: string }) {
  return (
    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border-2 border-black/20"
      style={{ background: bg }}>
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 60% 30%, ${accent}55 0%, transparent 65%)` }} />
      {type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: `${accent}40`, border: `2px solid ${accent}` }}>
            <div style={{ width: 0, height: 0, borderTop: "6px solid transparent", borderBottom: "6px solid transparent", borderLeft: `10px solid ${accent}`, marginLeft: 2 }} />
          </div>
        </div>
      )}
      {type === "carousel" && (
        <>
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-25"
            style={{ background: accent, borderLeft: `1px solid ${accent}` }} />
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 rounded-full"
                style={{ background: i === 0 ? accent : "white", opacity: i === 0 ? 1 : 0.35 }} />
            ))}
          </div>
        </>
      )}
      {type === "image" && (
        <div className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{ background: `linear-gradient(to top, ${accent}50, transparent)` }} />
      )}
      <div className="absolute top-2 left-2">
        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide"
          style={{ background: accent, color: bg }}>
          {type === "video" ? "▶ Vídeo" : type === "carousel" ? "⊞ Carr." : "▣ Img"}
        </span>
      </div>
    </div>
  );
}

const medals = ["🥇", "🥈", "🥉", "4º", "5º"];

function CreativeCard({ c, delay }: { c: Creative; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden flex-1"
      style={{ boxShadow: c.rank === 1 ? "4px 4px 0px 0px #FF6100" : "3px 3px 0px 0px #1A1A1A" }}
    >
      <div className="p-3 pb-0">
        <CreativeThumbnail type={c.type} bg={c.thumbBg} accent={c.thumbAccent} />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-base leading-none">{medals[c.rank - 1]}</span>
          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide ${c.status === "active" ? "bg-[#22c55e]/15 text-[#22c55e]" : "bg-[#1A1A1A]/10 text-[#1A1A1A]/40"}`}>
            {c.status === "active" ? "● Ativo" : "○ Pausado"}
          </span>
        </div>
        <p className="text-[11px] font-black text-[#1A1A1A] leading-tight mb-2.5 line-clamp-2">{c.name}</p>
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <span className="text-[9px] text-[#1A1A1A]/40 font-medium">Leads</span>
            <span className="text-[11px] font-black text-[#1A1A1A]">{c.leads}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] text-[#1A1A1A]/40 font-medium">CPL</span>
            <span className="text-[11px] font-black text-[#22c55e]">{fmtR(c.cpl)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[9px] text-[#1A1A1A]/40 font-medium">Investido</span>
            <span className="text-[11px] font-black text-[#1A1A1A]">{fmtR(c.invest)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stat Row ────────────────────────────────────────────────────
function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-[#1A1A1A]/06 last:border-0">
      <span className="text-[11px] text-[#1A1A1A]/50 font-medium">{label}</span>
      <span className="text-[12px] font-black text-[#1A1A1A]">{value}</span>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function TrafegoPagoPage() {
  const [monthIdx, setMonthIdx] = useState(trafficPageMonths.length - 1);

  const cur  = trafficPageMonths[monthIdx];
  const prev = trafficPageMonths[monthIdx - 1] ?? null;
  const hist = monthHistory[cur.historyIdx];
  const prevHist = prev ? monthHistory[prev.historyIdx] : null;
  const hasPrev = monthIdx > 0;
  const hasNext = monthIdx < trafficPageMonths.length - 1;
  const isClosed = cur.budget.daysLeft === 0;

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
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">Análise completa — {cur.month} {cur.year}</p>
        </div>

        {/* Navegação de mês */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white border-2 border-[#1A1A1A] rounded-xl px-3 py-2"
            style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}>
            <button onClick={() => hasPrev && setMonthIdx(monthIdx - 1)} disabled={!hasPrev}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[#FF6100] hover:text-white transition-all disabled:opacity-20">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A] min-w-[110px] text-center">
              {cur.month} {cur.year}
            </span>
            <button onClick={() => hasNext && setMonthIdx(monthIdx + 1)} disabled={!hasNext}
              className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[#FF6100] hover:text-white transition-all disabled:opacity-20">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {isClosed ? (
            <span className="flex items-center gap-1.5 bg-[#1A1A1A]/08 border border-[#1A1A1A]/15 text-[#1A1A1A]/40 text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
              ✓ Mês encerrado
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
              Atualizado
            </span>
          )}
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="flex gap-3 mb-6">
        <KpiCard emoji="💸" label="Total Investido"   value={fmtR(hist.invest)}      shadow="#FF6100" delay={0}    delta={prevHist ? { curr: hist.invest,      prev: prevHist.invest }      : undefined} />
        <KpiCard emoji="🎯" label="Total de Leads"    value={fmt(hist.leads)}         shadow="#00C2FF" delay={0.06} delta={prevHist ? { curr: hist.leads,       prev: prevHist.leads }       : undefined} />
        <KpiCard emoji="💰" label="CPL Médio"         value={fmtR(hist.cpl)}          shadow="#AAFF00" delay={0.12} delta={prevHist ? { curr: hist.cpl,         prev: prevHist.cpl }         : undefined} deltaInverted />
        <KpiCard emoji="👆" label="CPC Médio Meta"    value={fmtR(hist.avgCpcMeta)}   shadow="#7B2FF7" delay={0.18} delta={prevHist ? { curr: hist.avgCpcMeta,  prev: prevHist.avgCpcMeta }  : undefined} deltaInverted />
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
              { label: "META",   bg: "#1877F2", value: cur.budget.meta.total   - cur.budget.meta.spent,   low: (cur.budget.meta.total   - cur.budget.meta.spent)   < 50 },
              { label: "GOOGLE", bg: "#FBBC05", value: cur.budget.google.total - cur.budget.google.spent, low: (cur.budget.google.total - cur.budget.google.spent) < 50 },
            ].map(s => (
              <div key={s.label} className="flex-1 rounded-xl px-3 py-2"
                style={{ background: `${s.bg}10`, border: `1px solid ${s.bg}30` }}>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                  style={{ background: s.bg, color: s.label === "META" ? "white" : "#1A1A1A" }}>{s.label}</span>
                <p className="text-lg font-black text-[#1A1A1A] leading-none mt-1.5">
                  {s.value > 0 ? fmtR(s.value) : "—"}
                </p>
                <p className={`text-[10px] font-bold mt-1 ${isClosed ? "text-[#1A1A1A]/30" : s.low ? "text-[#FF6100]" : "text-[#22c55e]"}`}>
                  {isClosed ? "Mês encerrado" : s.low ? "⚠ Baixo" : "✓ Ok"}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Gráfico + Funil */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        <motion.div
          key={`chart-${monthIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="col-span-3 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
        >
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">📈 Evolução de Leads</p>
              <p className="text-sm font-black text-[#1A1A1A]">{cur.month} {cur.year} — semana a semana</p>
            </div>
            {prevHist && (
              <div className="text-right">
                <p className="text-[9px] text-[#1A1A1A]/30 font-medium">vs {prev?.month}</p>
                <p className={`text-base font-black ${hist.leads >= prevHist.leads ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                  {hist.leads >= prevHist.leads ? "+" : ""}{pctChange(hist.leads, prevHist.leads)}% leads
                  {hist.leads >= prevHist.leads ? " ↑" : " ↓"}
                </p>
              </div>
            )}
          </div>
          <EvolutionChart weeks={cur.evolutionWeeks} />
        </motion.div>

        <motion.div
          key={`funnel-${monthIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="col-span-2 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #00C2FF" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">🔻 Funil de Conversão</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">{cur.month} {cur.year} — Meta + Google</p>
          <FunnelSection funnel={cur.funnel} />
        </motion.div>
      </div>

      {/* Budget Tracker */}
      <div className="flex gap-4 mb-5">
        <BudgetBar label="Meta Ads"   badge="META"   badgeBg="#1877F2" badgeText="white"    shadow="#1877F2"
          total={cur.budget.meta.total}   spent={cur.budget.meta.spent}
          daysLeft={cur.budget.daysLeft}  isClosed={isClosed} />
        <BudgetBar label="Google Ads" badge="GOOGLE" badgeBg="#FBBC05" badgeText="#1A1A1A" shadow="#FBBC05"
          total={cur.budget.google.total} spent={cur.budget.google.spent}
          daysLeft={cur.budget.daysLeft}  isClosed={isClosed} />
      </div>

      {/* Top 5 Criativos */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
        style={{ boxShadow: "4px 4px 0px 0px #AAFF00" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">🏆 Criativos Campeões</p>
            <p className="text-sm font-black text-[#1A1A1A]">Top 5 anúncios que mais converteram — {cur.month} {cur.year}</p>
          </div>
          <span className="text-[9px] font-black bg-[#1877F2] text-white px-2 py-1 rounded-full uppercase tracking-wide">Meta Ads</span>
        </div>
        <div className="flex gap-4">
          {topCreatives.map((c, i) => <CreativeCard key={c.rank} c={c} delay={0.05 * i} />)}
        </div>
      </motion.div>

      {/* Histórico + Plataformas */}
      <div className="grid grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="col-span-3 bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
          style={{ boxShadow: "4px 4px 0px 0px #7B2FF7" }}
        >
          <div className="p-5 border-b border-[#1A1A1A]/08">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">📅 Histórico Mensal</p>
            <p className="text-sm font-black text-[#1A1A1A]">Janeiro → {cur.month} {cur.year}</p>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-[#F5F5F0]">
                {["Mês", "Investido", "Leads", "CPL", "CPC Meta", "Var. Leads"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {monthHistory.slice(0, cur.historyIdx + 1).map((m, i) => {
                const prevM = monthHistory[i - 1];
                const varLeads = prevM ? parseFloat(pctChange(m.leads, prevM.leads)) : null;
                const isSelected = i === cur.historyIdx;
                return (
                  <tr key={m.shortMonth}
                    className={`border-t border-[#1A1A1A]/06 transition-colors ${isSelected ? "bg-[#FF6100]/05" : "hover:bg-[#F5F5F0]/60"}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#1A1A1A]/30 w-6">{m.shortMonth}</span>
                        <span className="text-[11px] font-bold text-[#1A1A1A]">{m.month}</span>
                        {isSelected && !m.isCurrent && <span className="text-[8px] font-black bg-[#FF6100]/20 text-[#FF6100] px-1.5 py-0.5 rounded-full">Selecionado</span>}
                        {m.isCurrent && <span className="text-[8px] font-black bg-[#FF6100] text-white px-1.5 py-0.5 rounded-full">Atual</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[12px] font-black text-[#1A1A1A]">{fmtR(m.invest)}</td>
                    <td className="px-4 py-3 text-[12px] font-black text-[#1A1A1A]">{fmt(m.leads)}</td>
                    <td className="px-4 py-3 text-[12px] font-black text-[#1A1A1A]">{fmtR(m.cpl)}</td>
                    <td className="px-4 py-3 text-[12px] font-black text-[#1A1A1A]">{fmtR(m.avgCpcMeta)}</td>
                    <td className="px-4 py-3">
                      {varLeads !== null ? (
                        <span className={`text-[11px] font-black ${varLeads >= 0 ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                          {varLeads >= 0 ? "↑" : "↓"} {Math.abs(varLeads)}%
                        </span>
                      ) : <span className="text-[#1A1A1A]/20 text-[11px]">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Platform comparison */}
        <motion.div
          key={`plat-${monthIdx}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="col-span-2 flex flex-col gap-4"
        >
          <div className="flex-1 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
            style={{ boxShadow: "4px 4px 0px 0px #1877F2" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-black bg-[#1877F2] text-white px-2 py-0.5 rounded-full">META ADS</span>
              <p className="text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-widest">Desempenho · {cur.shortMonth}</p>
            </div>
            <StatRow label="Total de Leads"  value={`${fmt(cur.platform.meta.totalLeads)} (${cur.platform.meta.percentLeads}%)`} />
            <StatRow label="CPL Médio"        value={fmtR(cur.platform.meta.avgCpl)} />
            <StatRow label="Total Investido"  value={`${fmtR(cur.platform.meta.totalInvest)} (${cur.platform.meta.percentInvest}%)`} />
            <StatRow label="Melhor Semana"    value={cur.platform.meta.bestWeek} />
            <StatRow label="Pior Semana"      value={cur.platform.meta.worstWeek} />
          </div>
          <div className="flex-1 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
            style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-black bg-[#FBBC05] text-[#1A1A1A] px-2 py-0.5 rounded-full">GOOGLE ADS</span>
              <p className="text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-widest">Desempenho · {cur.shortMonth}</p>
            </div>
            <StatRow label="Total de Leads"  value={`${fmt(cur.platform.google.totalLeads)} (${cur.platform.google.percentLeads}%)`} />
            <StatRow label="CPL Médio"        value={fmtR(cur.platform.google.avgCpl)} />
            <StatRow label="Total Investido"  value={`${fmtR(cur.platform.google.totalInvest)} (${cur.platform.google.percentInvest}%)`} />
            <StatRow label="Melhor Semana"    value={cur.platform.google.bestWeek} />
            <StatRow label="Pior Semana"      value={cur.platform.google.worstWeek} />
          </div>
        </motion.div>
      </div>

    </div>
  );
}
