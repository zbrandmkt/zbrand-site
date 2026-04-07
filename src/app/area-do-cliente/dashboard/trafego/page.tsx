"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  weeklyEvolution,
  trafficFunnel,
  budgetData,
  topCreatives,
  monthHistory,
  platformStats,
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
function pct(curr: number, prev: number) {
  return (((curr - prev) / prev) * 100).toFixed(1);
}

// ─── KPI Card com variação ───────────────────────────────────────
function KpiCard({
  emoji, label, value, shadow, delta, deltaInverted = false, delay = 0,
}: {
  emoji: string; label: string; value: string; shadow: string;
  delta?: { curr: number; prev: number }; deltaInverted?: boolean; delay?: number;
}) {
  const change = delta ? parseFloat(pct(delta.curr, delta.prev)) : null;
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

// ─── Gráfico de Evolução (SVG) ───────────────────────────────────
function EvolutionChart() {
  const [hovered, setHovered] = useState<number | null>(null);
  const data = weeklyEvolution;
  const W = 800, H = 190;
  const PL = 10, PR = 10, PT = 28, PB = 28;
  const cW = W - PL - PR;
  const cH = H - PT - PB;
  const n = data.length;

  const maxLeads = Math.max(...data.map(d => d.leads)) * 1.18;
  const maxInvest = Math.max(...data.map(d => d.invest)) * 1.18;

  const xPos = (i: number) => PL + (i / (n - 1)) * cW;
  const yL = (v: number) => PT + cH - (v / maxLeads) * cH;
  const yI = (v: number) => PT + cH - (v / maxInvest) * cH;

  const smooth = (pts: [number, number][]) =>
    pts.map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = pts[i - 1];
      const cx = (px + x) / 2;
      return `C ${cx} ${py} ${cx} ${y} ${x} ${y}`;
    }).join(" ");

  const leadsPoints: [number, number][] = data.map((d, i) => [xPos(i), yL(d.leads)]);
  const investPoints: [number, number][] = data.map((d, i) => [xPos(i), yI(d.invest)]);

  const leadsPath = smooth(leadsPoints);
  const investPath = smooth(investPoints);
  const areaPath = `${leadsPath} L ${xPos(n - 1)} ${PT + cH} L ${xPos(0)} ${PT + cH} Z`;

  // Divisor de mês entre índice 3 e 4
  const sepX = (xPos(3) + xPos(4)) / 2;

  return (
    <div className="relative w-full">
      {/* Legenda */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-[#FF6100] rounded-full" />
          <span className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-wide">Leads</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-[#00C2FF] rounded-full" style={{ borderTop: "2px dashed #00C2FF", background: "none" }} />
          <div className="w-3 border-t-2 border-dashed border-[#00C2FF]" />
          <span className="text-[10px] font-bold text-[#1A1A1A]/50 uppercase tracking-wide">Investimento</span>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: "170px" }}
      >
        <defs>
          <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF6100" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FF6100" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid horizontal */}
        {[0.25, 0.5, 0.75].map(p => (
          <line key={p}
            x1={PL} y1={PT + cH * (1 - p)}
            x2={W - PR} y2={PT + cH * (1 - p)}
            stroke="#1A1A1A" strokeOpacity="0.06" strokeWidth="1" />
        ))}

        {/* Divisor de mês */}
        <line x1={sepX} y1={PT} x2={sepX} y2={PT + cH}
          stroke="#1A1A1A" strokeOpacity="0.12" strokeDasharray="4 3" strokeWidth="1.5" />
        <text x={(PL + sepX) / 2} y={PT - 8} textAnchor="middle"
          fill="#1A1A1A" fontSize="10" opacity="0.3" fontWeight="700">MARÇO</text>
        <text x={(sepX + W - PR) / 2} y={PT - 8} textAnchor="middle"
          fill="#FF6100" fontSize="10" opacity="0.7" fontWeight="700">ABRIL</text>

        {/* Invest line */}
        <path d={investPath} fill="none" stroke="#00C2FF"
          strokeWidth="1.8" strokeDasharray="7 4" strokeOpacity="0.55" />

        {/* Leads area */}
        <path d={areaPath} fill="url(#leadsGrad)" />
        {/* Leads line */}
        <path d={leadsPath} fill="none" stroke="#FF6100" strokeWidth="2.5" />

        {/* Dots + labels */}
        {leadsPoints.map(([x, y], i) => {
          const isHov = hovered === i;
          return (
            <g key={i}>
              {isHov && (
                <rect x={x - 28} y={y - 26} width={56} height={20} rx="4"
                  fill="#1A1A1A" />
              )}
              {isHov && (
                <text x={x} y={y - 12} textAnchor="middle"
                  fill="white" fontSize="11" fontWeight="800">
                  {data[i].leads} leads
                </text>
              )}
              <circle cx={x} cy={y} r={isHov ? 6 : 4.5}
                fill="white" stroke="#FF6100" strokeWidth="2.5"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)} />
              {/* X label */}
              <text x={x} y={H - 4} textAnchor="middle"
                fill="#1A1A1A" fontSize="9" opacity="0.35" fontWeight="600">
                {data[i].label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Funil de Conversão ──────────────────────────────────────────
function FunnelSection() {
  const { impressions, clicks, leads, estimatedSales } = trafficFunnel;
  const steps = [
    { label: "Impressões",   value: impressions, pct: 100,                                  color: "#1A1A1A", bg: "#1A1A1A10" },
    { label: "Cliques",      value: clicks,      pct: (clicks / impressions) * 100,         color: "#00C2FF", bg: "#00C2FF12" },
    { label: "Leads",        value: leads,        pct: (leads / impressions) * 100,          color: "#FF6100", bg: "#FF610012" },
    { label: "Vendas est.",  value: estimatedSales, pct: (estimatedSales / impressions) * 100, color: "#22c55e", bg: "#22c55e12" },
  ];

  const subLabels = [
    "",
    `CTR ${((clicks / impressions) * 100).toFixed(2)}%`,
    `Conv. ${((leads / clicks) * 100).toFixed(1)}%`,
    `Close rate 20%`,
  ];

  return (
    <div className="flex flex-col gap-2">
      {steps.map((s, i) => {
        const barW = 30 + (s.pct / 100) * 70; // min 30% width
        return (
          <motion.div key={s.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="w-full">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">{s.label}</span>
                <div className="flex items-center gap-2">
                  {subLabels[i] && (
                    <span className="text-[9px] font-bold text-[#1A1A1A]/30">{subLabels[i]}</span>
                  )}
                  <span className="text-sm font-black text-[#1A1A1A]">{fmt(s.value)}</span>
                </div>
              </div>
              <div className="h-5 bg-[#1A1A1A]/05 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barW}%` }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-lg"
                  style={{ background: s.color, opacity: 0.85 }}
                />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ─── Budget Tracker ──────────────────────────────────────────────
function BudgetBar({ label, badge, total, spent, badgeBg, badgeText, shadow, daysLeft }: {
  label: string; badge: string; total: number; spent: number;
  badgeBg: string; badgeText: string; shadow: string; daysLeft: number;
}) {
  const pctSpent = (spent / total) * 100;
  const remaining = total - spent;
  const isLow = pctSpent > 90;

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
        </div>
        <div className="flex items-center gap-3 text-right">
          <div>
            <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Budget</p>
            <p className="text-sm font-black text-[#1A1A1A]">{fmtR(total)}</p>
          </div>
          <div>
            <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Utilizado</p>
            <p className="text-sm font-black text-[#1A1A1A]">{fmtR(spent)}</p>
          </div>
          <div>
            <p className="text-[9px] text-[#1A1A1A]/30 font-bold uppercase tracking-wider">Saldo</p>
            <p className={`text-sm font-black ${isLow ? "text-[#FF6100]" : "text-[#22c55e]"}`}>{fmtR(remaining)}</p>
          </div>
        </div>
      </div>

      {/* Bar */}
      <div className="h-4 bg-[#1A1A1A]/06 rounded-full overflow-hidden border border-[#1A1A1A]/08">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pctSpent}%` }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative"
          style={{ background: isLow ? "#FF6100" : badgeBg }}
        >
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-black text-white">
            {pctSpent.toFixed(0)}%
          </div>
        </motion.div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <span className="text-[9px] text-[#1A1A1A]/30 font-medium">
          {isLow ? "⚠ Saldo baixo — considere recarregar" : `✓ Budget saudável`}
        </span>
        <span className="text-[9px] text-[#1A1A1A]/30 font-medium">{daysLeft} dias restantes no mês</span>
      </div>
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
          <div className="absolute top-0 right-0 w-1/3 h-full opacity-30"
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
      {/* Type badge */}
      <div className="absolute top-2 left-2">
        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide"
          style={{ background: accent, color: bg }}>
          {type === "video" ? "▶ Vídeo" : type === "carousel" ? "⊞ Carr." : "▣ Img"}
        </span>
      </div>
    </div>
  );
}

// Rank medal
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
      {/* Thumbnail */}
      <div className="p-3 pb-0">
        <CreativeThumbnail type={c.type} bg={c.thumbBg} accent={c.thumbAccent} />
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-base leading-none">{medals[c.rank - 1]}</span>
          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide ${
            c.status === "active"
              ? "bg-[#22c55e]/15 text-[#22c55e]"
              : "bg-[#1A1A1A]/10 text-[#1A1A1A]/40"
          }`}>
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

// ─── Platform Stat Row ────────────────────────────────────────────
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
  const prevMonth = monthHistory[monthHistory.length - 2];
  const currMonth = monthHistory[monthHistory.length - 1];

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
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">Análise completa — Abril 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Atualizado
          </span>
        </div>
      </motion.div>

      {/* ── KPIs ── */}
      <div className="flex gap-3 mb-6">
        <KpiCard emoji="💸" label="Total Investido"  value={fmtR(currMonth.invest)}    shadow="#FF6100" delay={0}    delta={{ curr: currMonth.invest,    prev: prevMonth.invest }}    />
        <KpiCard emoji="🎯" label="Total de Leads"   value={fmt(currMonth.leads)}      shadow="#00C2FF" delay={0.06} delta={{ curr: currMonth.leads,     prev: prevMonth.leads }}     />
        <KpiCard emoji="💰" label="CPL Médio"        value={fmtR(currMonth.cpl)}       shadow="#AAFF00" delay={0.12} delta={{ curr: currMonth.cpl,       prev: prevMonth.cpl }}        deltaInverted />
        <KpiCard emoji="👆" label="CPC Médio Meta"   value={fmtR(currMonth.avgCpcMeta)} shadow="#7B2FF7" delay={0.18} delta={{ curr: currMonth.avgCpcMeta, prev: prevMonth.avgCpcMeta }} deltaInverted />
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
            <div className="flex-1 bg-[#1877F2]/08 border border-[#1877F2]/20 rounded-xl px-3 py-2">
              <span className="text-[9px] font-black bg-[#1877F2] text-white px-2 py-0.5 rounded-full">META</span>
              <p className="text-lg font-black text-[#1A1A1A] leading-none mt-1.5">{fmtR(monthlyTraffic.saldoMeta)}</p>
              <p className="text-[10px] text-[#FF6100] font-bold mt-1">⚠ Baixo</p>
            </div>
            <div className="flex-1 bg-[#FBBC05]/08 border border-[#FBBC05]/30 rounded-xl px-3 py-2">
              <span className="text-[9px] font-black bg-[#FBBC05] text-[#1A1A1A] px-2 py-0.5 rounded-full">GOOGLE</span>
              <p className="text-lg font-black text-[#1A1A1A] leading-none mt-1.5">{fmtR(monthlyTraffic.saldoGoogle)}</p>
              <p className="text-[10px] text-[#22c55e] font-bold mt-1">✓ Ok</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Gráfico + Funil ── */}
      <div className="grid grid-cols-5 gap-4 mb-5">
        {/* Gráfico */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="col-span-3 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
        >
          <div className="flex items-center justify-between mb-1">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">📈 Evolução de Leads</p>
              <p className="text-sm font-black text-[#1A1A1A]">Março → Abril 2026</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-[#1A1A1A]/30 font-medium">Crescimento no período</p>
              <p className="text-base font-black text-[#22c55e]">+29.7% leads ↑</p>
            </div>
          </div>
          <EvolutionChart />
        </motion.div>

        {/* Funil */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="col-span-2 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #00C2FF" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">🔻 Funil de Conversão</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">Abril 2026 — Meta + Google</p>
          <FunnelSection />
        </motion.div>
      </div>

      {/* ── Budget Tracker ── */}
      <div className="flex gap-4 mb-5">
        <BudgetBar
          label="Meta Ads" badge="META" badgeBg="#1877F2" badgeText="white"
          total={budgetData.meta.total} spent={budgetData.meta.spent}
          shadow="#1877F2" daysLeft={budgetData.daysLeft}
        />
        <BudgetBar
          label="Google Ads" badge="GOOGLE" badgeBg="#FBBC05" badgeText="#1A1A1A"
          total={budgetData.google.total} spent={budgetData.google.spent}
          shadow="#FBBC05" daysLeft={budgetData.daysLeft}
        />
      </div>

      {/* ── Top 5 Criativos ── */}
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
            <p className="text-sm font-black text-[#1A1A1A]">Top 5 anúncios que mais converteram — Abril 2026</p>
          </div>
          <span className="text-[9px] font-black bg-[#1877F2] text-white px-2 py-1 rounded-full uppercase tracking-wide">Meta Ads</span>
        </div>
        <div className="flex gap-4">
          {topCreatives.map((c, i) => (
            <CreativeCard key={c.rank} c={c} delay={0.05 * i} />
          ))}
        </div>
      </motion.div>

      {/* ── Histórico + Plataformas ── */}
      <div className="grid grid-cols-5 gap-4">
        {/* Tabela histórica */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="col-span-3 bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
          style={{ boxShadow: "4px 4px 0px 0px #7B2FF7" }}
        >
          <div className="p-5 border-b border-[#1A1A1A]/08">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">📅 Histórico Mensal</p>
            <p className="text-sm font-black text-[#1A1A1A]">Janeiro → Abril 2026</p>
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
              {monthHistory.map((m, i) => {
                const prev = monthHistory[i - 1];
                const varLeads = prev ? parseFloat(pct(m.leads, prev.leads)) : null;
                return (
                  <tr key={m.shortMonth}
                    className={`border-t border-[#1A1A1A]/06 transition-colors ${m.isCurrent ? "bg-[#FF6100]/05" : "hover:bg-[#F5F5F0]/60"}`}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-[#1A1A1A]/30 w-6">{m.shortMonth}</span>
                        <span className="text-[11px] font-bold text-[#1A1A1A]">{m.month}</span>
                        {m.isCurrent && (
                          <span className="text-[8px] font-black bg-[#FF6100] text-white px-1.5 py-0.5 rounded-full">Atual</span>
                        )}
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
                      ) : (
                        <span className="text-[#1A1A1A]/20 text-[11px]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Platform comparison */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="col-span-2 flex flex-col gap-4"
        >
          {/* Meta */}
          <div className="flex-1 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
            style={{ boxShadow: "4px 4px 0px 0px #1877F2" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-black bg-[#1877F2] text-white px-2 py-0.5 rounded-full">META ADS</span>
              <p className="text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-widest">Desempenho</p>
            </div>
            <StatRow label="Total de Leads"    value={`${fmt(platformStats.meta.totalLeads)} (${platformStats.meta.percentLeads}%)`} />
            <StatRow label="CPL Médio"         value={fmtR(platformStats.meta.avgCpl)} />
            <StatRow label="Total Investido"   value={`${fmtR(platformStats.meta.totalInvest)} (${platformStats.meta.percentInvest}%)`} />
            <StatRow label="Melhor Semana"     value={platformStats.meta.bestWeek} />
            <StatRow label="Pior Semana"       value={platformStats.meta.worstWeek} />
          </div>

          {/* Google */}
          <div className="flex-1 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
            style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[9px] font-black bg-[#FBBC05] text-[#1A1A1A] px-2 py-0.5 rounded-full">GOOGLE ADS</span>
              <p className="text-[9px] font-black text-[#1A1A1A]/40 uppercase tracking-widest">Desempenho</p>
            </div>
            <StatRow label="Total de Leads"    value={`${fmt(platformStats.google.totalLeads)} (${platformStats.google.percentLeads}%)`} />
            <StatRow label="CPL Médio"         value={fmtR(platformStats.google.avgCpl)} />
            <StatRow label="Total Investido"   value={`${fmtR(platformStats.google.totalInvest)} (${platformStats.google.percentInvest}%)`} />
            <StatRow label="Melhor Semana"     value={platformStats.google.bestWeek} />
            <StatRow label="Pior Semana"       value={platformStats.google.worstWeek} />
          </div>
        </motion.div>
      </div>

    </div>
  );
}
