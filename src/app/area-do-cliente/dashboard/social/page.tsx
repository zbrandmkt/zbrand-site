"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  socialPageMonths,
  monthGoals,
  type SocialTopPost,
  type GoalItem,
} from "../mock-data";

// ─── Helpers ─────────────────────────────────────────────────────
function fmt(n: number) { return n.toLocaleString("pt-BR"); }

// ─── Metas (shared logic) ─────────────────────────────────────────
function getGoalStatus(g: GoalItem): { status: "achieved" | "ontrack" | "attention"; pct: number } {
  if (g.lowerIsBetter) {
    const pct = Math.min((g.target / g.current) * 100, 100);
    const status = g.current <= g.target ? "achieved" : g.current <= g.target * 1.1 ? "ontrack" : "attention";
    return { status, pct };
  }
  const pct = Math.min((g.current / g.target) * 100, 100);
  const status = pct >= 100 ? "achieved" : pct >= 70 ? "ontrack" : "attention";
  return { status, pct };
}
const statusCfg = {
  achieved:  { label: "✓ Atingida",   bg: "#22c55e15", border: "#22c55e40", bar: "#22c55e", text: "#22c55e" },
  ontrack:   { label: "→ No caminho", bg: "#FBBC0515", border: "#FBBC0540", bar: "#FBBC05", text: "#ca8a04" },
  attention: { label: "⚠ Atenção",   bg: "#ef444415", border: "#ef444440", bar: "#ef4444", text: "#ef4444" },
};

function GoalsSection({ goals, delay = 0 }: { goals: GoalItem[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
      style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
    >
      <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-4">🎯 Metas do Mês</p>
      <div className="grid grid-cols-4 gap-3">
        {goals.map((g, i) => {
          const { status, pct } = getGoalStatus(g);
          const cfg = statusCfg[status];
          const displayCurrent = g.unit === "%" ? `${g.current}%` : g.unit === "R$" ? `R$ ${g.current.toFixed(2)}` : `${g.current} ${g.unit}`;
          const displayTarget  = g.unit === "%" ? `${g.target}%`  : g.unit === "R$" ? `R$ ${g.target.toFixed(2)}`  : `${g.target} ${g.unit}`;
          return (
            <motion.div key={g.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: delay + i * 0.06, duration: 0.35 }}
              className="rounded-2xl border-2 p-4 flex flex-col gap-2"
              style={{ background: cfg.bg, borderColor: cfg.border }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl leading-none">{g.emoji}</span>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
                  style={{ background: cfg.bar + "25", color: cfg.text }}>{cfg.label}</span>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50 leading-none mb-1">{g.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-[#1A1A1A] leading-none">{displayCurrent}</span>
                  <span className="text-[10px] text-[#1A1A1A]/30 font-medium">/ {displayTarget}</span>
                </div>
              </div>
              <div className="h-2 bg-[#1A1A1A]/08 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                  transition={{ delay: delay + i * 0.06 + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full" style={{ background: cfg.bar }} />
              </div>
              <p className="text-[10px] font-black text-right" style={{ color: cfg.text }}>{pct.toFixed(0)}%</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────
function KpiCard({ emoji, label, value, shadow, delta, deltaInverted = false, delay = 0 }: {
  emoji: string; label: string; value: string; shadow: string;
  delta?: { curr: number; prev: number }; deltaInverted?: boolean; delay?: number;
}) {
  const change = delta ? parseFloat((((delta.curr - delta.prev) / delta.prev) * 100).toFixed(1)) : null;
  const isPositive = change !== null ? (deltaInverted ? change < 0 : change > 0) : null;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
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

// ─── Gráfico Social ───────────────────────────────────────────────
type SocialMetric = "views" | "followers" | "interactions" | "posts";
type ChartPeriod  = "week" | "month";
interface SocialPoint { label: string; views: number; followers: number; interactions: number; posts: number; }

const socialMetricDefs: Record<SocialMetric, { label: string; color: string; fmt: (n: number) => string }> = {
  views:        { label: "Visualizações", color: "#FF6100", fmt: (n) => `${fmt(Math.round(n))} views` },
  followers:    { label: "Seguidores",    color: "#00C2FF", fmt: (n) => `+${Math.round(n)} seg.` },
  interactions: { label: "Interações",    color: "#AAFF00", fmt: (n) => `${Math.round(n)} inter.` },
  posts:        { label: "Posts",         color: "#7B2FF7", fmt: (n) => `${Math.round(n)} posts` },
};

function SocialChart({ weekPoints, monthPoints }: { weekPoints: SocialPoint[]; monthPoints: SocialPoint[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [metric, setMetric]   = useState<SocialMetric>("views");
  const [period, setPeriod]   = useState<ChartPeriod>("week");

  const data   = period === "week" ? weekPoints : monthPoints;
  const def    = socialMetricDefs[metric];
  const values = data.map(d => d[metric]);
  const W = 800, H = 190, PL = 10, PR = 10, PT = 28, PB = 28;
  const cW = W - PL - PR, cH = H - PT - PB;
  const n = data.length;
  const minV = Math.min(...values) * 0.82;
  const maxV = Math.max(...values) * 1.2;
  const xPos = (i: number) => PL + (n <= 1 ? cW / 2 : (i / (n - 1)) * cW);
  const yPos = (v: number) => PT + cH - ((v - minV) / (maxV - minV)) * cH;
  const smooth = (pts: [number, number][]) =>
    pts.map(([x, y], i) => {
      if (i === 0) return `M ${x} ${y}`;
      const [px, py] = pts[i - 1]; const cx = (px + x) / 2;
      return `C ${cx} ${py} ${cx} ${y} ${x} ${y}`;
    }).join(" ");
  const points: [number, number][] = data.map((d, i) => [xPos(i), yPos(d[metric])]);
  const linePath = smooth(points);
  const areaPath = `${linePath} L ${xPos(n - 1)} ${PT + cH} L ${xPos(0)} ${PT + cH} Z`;
  const gradId   = `socialGrad_${metric}`;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {(Object.keys(socialMetricDefs) as SocialMetric[]).map(m => {
            const d = socialMetricDefs[m]; const active = metric === m;
            return (
              <button key={m} onClick={() => { setMetric(m); setHovered(null); }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border-2 transition-all text-[10px] font-black uppercase tracking-wide"
                style={{ borderColor: active ? d.color : "#1A1A1A20", background: active ? `${d.color}18` : "transparent", color: active ? d.color : "#1A1A1A50" }}>
                <span className="w-2 h-2 rounded-full" style={{ background: active ? d.color : "#1A1A1A25" }} />
                {d.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center border-2 border-[#1A1A1A] rounded-xl overflow-hidden"
          style={{ boxShadow: "2px 2px 0px 0px #1A1A1A" }}>
          {(["week", "month"] as ChartPeriod[]).map(p => (
            <button key={p} onClick={() => { setPeriod(p); setHovered(null); }}
              className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wide transition-all"
              style={{ background: period === p ? "#1A1A1A" : "white", color: period === p ? "white" : "#1A1A1A60" }}>
              {p === "week" ? "Semana" : "Mês"}
            </button>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="none" style={{ height: "160px" }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={def.color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={def.color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map(p => (
          <line key={p} x1={PL} y1={PT + cH * (1 - p)} x2={W - PR} y2={PT + cH * (1 - p)}
            stroke="#1A1A1A" strokeOpacity="0.06" strokeWidth="1" />
        ))}
        <path d={areaPath} fill={`url(#${gradId})`} />
        <path d={linePath} fill="none" stroke={def.color} strokeWidth="2.5" />
        {points.map(([x, y], i) => {
          const isHov = hovered === i; const val = values[i];
          const tooltip = def.fmt(val); const tW = tooltip.length * 7 + 16;
          const tX = Math.min(Math.max(x - tW / 2, PL), W - PR - tW);
          return (
            <g key={i} style={{ cursor: "pointer" }}
              onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              {isHov && <rect x={tX} y={y - 28} width={tW} height={20} rx="4" fill="#1A1A1A" />}
              {isHov && <text x={tX + tW / 2} y={y - 13} textAnchor="middle" fill="white" fontSize="11" fontWeight="800">{tooltip}</text>}
              <circle cx={x} cy={y} r={isHov ? 6 : 4.5} fill="white" stroke={def.color} strokeWidth="2.5" />
              <text x={x} y={H - 4} textAnchor="middle" fill="#1A1A1A" fontSize="9" opacity="0.35" fontWeight="600">{data[i].label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Presença Diária (contribution graph) ────────────────────────
function DailyPresence({ days, month }: { days: { day: number; weekday: number; posts: number; views: number }[]; month: string }) {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const weeks: (typeof days[0] | null)[][] = [];
  let week: (typeof days[0] | null)[] = [];

  // pad início
  for (let i = 0; i < days[0].weekday; i++) week.push(null);
  days.forEach(d => {
    week.push(d);
    if (week.length === 7) { weeks.push(week); week = []; }
  });
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const postDays  = days.filter(d => d.posts > 0).length;
  const totalDays = days.length;
  const withPostViews    = days.filter(d => d.posts > 0).reduce((s, d) => s + d.views, 0);
  const withoutPostViews = days.filter(d => d.posts === 0 && d.views > 0).reduce((s, d) => s + d.views, 0);
  const postDaysCount    = days.filter(d => d.posts > 0).length;
  const noDaysCount      = days.filter(d => d.posts === 0 && d.views > 0).length;
  const avgWithPost    = postDaysCount    ? Math.round(withPostViews / postDaysCount)    : 0;
  const avgWithoutPost = noDaysCount      ? Math.round(withoutPostViews / noDaysCount)   : 0;
  const multiplier = avgWithoutPost ? (avgWithPost / avgWithoutPost).toFixed(1) : "∞";

  return (
    <div>
      {/* Insight bar */}
      <div className="flex items-center gap-3 mb-4 bg-[#FF6100]/08 border border-[#FF6100]/20 rounded-xl px-4 py-3">
        <span className="text-lg">💡</span>
        <p className="text-[11px] font-bold text-[#1A1A1A]/70">
          Em <span className="font-black text-[#1A1A1A]">{month}</span>, dias com post tiveram em média{" "}
          <span className="font-black text-[#FF6100]">{multiplier}x mais visualizações</span>{" "}
          do que dias sem conteúdo. ({postDays} de {totalDays} dias postados)
        </p>
      </div>

      {/* Grid */}
      <div className="flex gap-3">
        {/* Labels dias da semana */}
        <div className="flex flex-col gap-1.5 pt-7">
          {weekdays.map(d => (
            <div key={d} className="h-8 flex items-center">
              <span className="text-[8px] font-bold text-[#1A1A1A]/25 uppercase tracking-widest w-6">{d}</span>
            </div>
          ))}
        </div>

        {/* Semanas */}
        <div className="flex gap-1.5 flex-1">
          {weeks.map((week, wi) => {
            const weekViews = week.reduce((s, d) => s + (d?.views ?? 0), 0);
            return (
              <div key={wi} className="flex flex-col gap-1.5 flex-1">
                <div className="text-center">
                  <span className="text-[8px] font-black text-[#1A1A1A]/30 uppercase">S{wi + 1}</span>
                </div>
                {week.map((d, di) => {
                  if (!d) return <div key={di} className="h-8 rounded-lg" />;
                  const isHov = hoveredDay === d.day;
                  const hasPost = d.posts > 0;
                  return (
                    <motion.div key={di}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: wi * 0.04 + di * 0.01 }}
                      className="h-8 rounded-lg relative flex items-center justify-center cursor-pointer transition-all"
                      style={{
                        background: hasPost
                          ? isHov ? "#FF6100" : "#FF610080"
                          : isHov ? "#1A1A1A15" : "#1A1A1A08",
                        border: hasPost ? "1px solid #FF610040" : "1px solid #1A1A1A10",
                        transform: isHov ? "scale(1.1)" : "scale(1)",
                      }}
                      onMouseEnter={() => setHoveredDay(d.day)}
                      onMouseLeave={() => setHoveredDay(null)}
                    >
                      <span className="text-[9px] font-black" style={{ color: hasPost ? "white" : "#1A1A1A30" }}>
                        {d.day}
                      </span>
                      {isHov && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 bg-[#1A1A1A] text-white text-[9px] font-black px-2 py-1 rounded-lg whitespace-nowrap z-10">
                          {hasPost ? `${d.posts} post · ${fmt(d.views)} views` : "Sem post"}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
                {/* Views da semana */}
                <div className="text-center mt-0.5">
                  <span className="text-[8px] font-bold text-[#FF6100]">
                    {weekViews > 0 ? `${fmt(weekViews)}` : "—"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legenda */}
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-[#FF6100]/50 border border-[#FF6100]/30" />
          <span className="text-[9px] font-bold text-[#1A1A1A]/40 uppercase tracking-wide">Com post</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-[#1A1A1A]/08 border border-[#1A1A1A]/10" />
          <span className="text-[9px] font-bold text-[#1A1A1A]/40 uppercase tracking-wide">Sem post</span>
        </div>
        <span className="text-[9px] text-[#1A1A1A]/30 font-medium ml-auto">Números abaixo = total de views na semana</span>
      </div>
    </div>
  );
}

// ─── Análise por Formato ──────────────────────────────────────────
function FormatAnalysis({ formats }: { formats: { format: string; emoji: string; count: number; avgViews: number; avgEngagement: number; color: string }[] }) {
  const maxViews = Math.max(...formats.map(f => f.avgViews));
  const best = formats.reduce((a, b) => a.avgViews > b.avgViews ? a : b);

  return (
    <div className="flex flex-col gap-4">
      {formats.map((f, i) => (
        <motion.div key={f.format}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.07 }}
          className="flex items-center gap-3"
        >
          <div className="w-20 flex items-center gap-1.5 shrink-0">
            <span className="text-base">{f.emoji}</span>
            <span className="text-[10px] font-black text-[#1A1A1A]/60 uppercase tracking-wide">{f.format}</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] text-[#1A1A1A]/30 font-medium">{f.count} publicações · {f.avgEngagement}% eng.</span>
              <div className="flex items-center gap-1">
                {f.format === best.format && (
                  <span className="text-[8px] font-black bg-[#FF6100] text-white px-1.5 py-0.5 rounded-full">🏆 Melhor</span>
                )}
                <span className="text-[11px] font-black text-[#1A1A1A]">{fmt(f.avgViews)} views</span>
              </div>
            </div>
            <div className="h-4 bg-[#1A1A1A]/06 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(f.avgViews / maxViews) * 100}%` }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="h-full rounded-full"
                style={{ background: f.color, opacity: 0.85 }}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Gauge de Engajamento ─────────────────────────────────────────
function EngagementGauge({ rate, prevRate }: { rate: number; prevRate?: number }) {
  // 0-2% baixo, 2-4% médio, 4-6% bom, 6%+ excelente
  const clamp = Math.min(rate, 8);
  const angle = (clamp / 8) * 180 - 90; // -90 a +90 graus
  const getColor = (r: number) => r < 2 ? "#ef4444" : r < 4 ? "#FBBC05" : r < 6 ? "#AAFF00" : "#22c55e";
  const getLabel = (r: number) => r < 2 ? "Baixo" : r < 4 ? "Médio" : r < 6 ? "Bom" : "Excelente";
  const color = getColor(rate);
  const sectors = [
    { label: "Baixo",     range: "0-2%",  color: "#ef4444", from: -90, to: -45 },
    { label: "Médio",     range: "2-4%",  color: "#FBBC05", from: -45, to:   0 },
    { label: "Bom",       range: "4-6%",  color: "#AAFF00", from:   0, to:  45 },
    { label: "Excelente", range: "6%+",   color: "#22c55e", from:  45, to:  90 },
  ];

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arcPath = (from: number, to: number, r: number) => {
    const x1 = 100 + r * Math.cos(toRad(from));
    const y1 = 100 + r * Math.sin(toRad(from));
    const x2 = 100 + r * Math.cos(toRad(to));
    const y2 = 100 + r * Math.sin(toRad(to));
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  const needleX = 100 + 55 * Math.cos(toRad(angle));
  const needleY = 100 + 55 * Math.sin(toRad(angle));

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 115" className="w-full max-w-[240px]">
        {/* Arcos de fundo */}
        {sectors.map(s => (
          <path key={s.label} d={arcPath(s.from, s.to, 70)} fill="none"
            stroke={s.color} strokeWidth="14" strokeOpacity="0.15" strokeLinecap="round" />
        ))}
        {/* Arco ativo até o valor */}
        {sectors.map(s => {
          const anglePct = angle;
          if (anglePct < s.from) return null;
          const clampedTo = Math.min(anglePct, s.to);
          return (
            <path key={`active-${s.label}`} d={arcPath(s.from, clampedTo, 70)} fill="none"
              stroke={getColor(rate)} strokeWidth="14" strokeLinecap="round" strokeOpacity="0.9" />
          );
        })}
        {/* Agulha */}
        <motion.line
          x1="100" y1="100"
          animate={{ x2: needleX, y2: needleY }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round"
        />
        <circle cx="100" cy="100" r="5" fill="#1A1A1A" />
        {/* Valor central */}
        <text x="100" y="92" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1A1A1A">{rate}%</text>
        <text x="100" y="108" textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{getLabel(rate)}</text>
      </svg>

      {/* Labels sectores */}
      <div className="flex justify-between w-full max-w-[240px] mt-1 px-2">
        {sectors.map(s => (
          <div key={s.label} className="text-center">
            <p className="text-[8px] font-black uppercase" style={{ color: s.color }}>{s.label}</p>
            <p className="text-[8px] text-[#1A1A1A]/30 font-medium">{s.range}</p>
          </div>
        ))}
      </div>

      {prevRate !== undefined && (
        <div className="mt-3 text-center">
          <span className={`text-[10px] font-black ${rate >= prevRate ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
            {rate >= prevRate ? "↑" : "↓"} {Math.abs(rate - prevRate).toFixed(2)}% vs mês anterior
          </span>
        </div>
      )}
      <p className="text-[9px] text-[#1A1A1A]/30 font-medium mt-1">Média do setor: 2-3%</p>
    </div>
  );
}

// ─── Top Posts ────────────────────────────────────────────────────
const medals = ["🥇", "🥈", "🥉", "4º", "5º"];
const typeCfg: Record<string, { label: string; icon: string }> = {
  reel:     { label: "Reel",     icon: "▶" },
  post:     { label: "Post",     icon: "▣" },
  carousel: { label: "Carrossel",icon: "⊞" },
  story:    { label: "Story",    icon: "○" },
};

function PostThumbnail({ type, bg, accent }: { type: string; bg: string; accent: string }) {
  return (
    <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden border-2 border-black/20"
      style={{ background: bg }}>
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(circle at 60% 30%, ${accent}55 0%, transparent 65%)` }} />
      {type === "reel" && (
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
      {type === "post" && (
        <div className="absolute bottom-0 left-0 right-0 h-1/3"
          style={{ background: `linear-gradient(to top, ${accent}50, transparent)` }} />
      )}
      <div className="absolute top-2 left-2">
        <span className="text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide"
          style={{ background: accent, color: bg }}>
          {typeCfg[type]?.icon} {typeCfg[type]?.label}
        </span>
      </div>
    </div>
  );
}

function TopPostCard({ p, delay }: { p: SocialTopPost; delay: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden flex-1"
      style={{ boxShadow: p.rank === 1 ? "4px 4px 0px 0px #FF6100" : "3px 3px 0px 0px #1A1A1A" }}
    >
      <div className="p-3 pb-0">
        <PostThumbnail type={p.type} bg={p.thumbBg} accent={p.thumbAccent} />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-base leading-none">{medals[p.rank - 1]}</span>
          <span className="text-[9px] font-black bg-[#FF6100]/10 text-[#FF6100] px-1.5 py-0.5 rounded-full">
            {fmt(p.views)} views
          </span>
        </div>
        <p className="text-[11px] font-black text-[#1A1A1A] leading-tight mb-2.5 line-clamp-2">{p.title}</p>
        <div className="grid grid-cols-3 gap-1">
          {[
            { icon: "❤️", val: p.likes },
            { icon: "💬", val: p.comments },
            { icon: "↗️", val: p.shares },
          ].map(s => (
            <div key={s.icon} className="flex items-center gap-1 bg-[#F5F5F0] rounded-lg px-2 py-1 justify-center">
              <span className="text-[9px]">{s.icon}</span>
              <span className="text-[10px] font-black text-[#1A1A1A]">{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function SocialMediaPage() {
  const [monthIdx, setMonthIdx] = useState(socialPageMonths.length - 1);
  const cur      = socialPageMonths[monthIdx];
  const prev     = socialPageMonths[monthIdx - 1] ?? null;
  const hasPrev  = monthIdx > 0;
  const hasNext  = monthIdx < socialPageMonths.length - 1;
  const curGoals = monthGoals.find(g => g.month === cur.month && g.year === cur.year)?.social
                ?? monthGoals[monthGoals.length - 1].social;

  // Month points para gráfico mensal
  const monthPoints = socialPageMonths.slice(0, monthIdx + 1).map(m => ({
    label: m.shortMonth,
    views: m.kpis.views,
    followers: m.kpis.newFollowers,
    interactions: m.kpis.interactions,
    posts: m.kpis.reels + m.kpis.posts + m.kpis.carrosseis,
  }));

  return (
    <div className="p-8 max-w-[1400px]">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/area-do-cliente/dashboard"
              className="text-[10px] font-bold text-[#1A1A1A]/30 hover:text-[#FF6100] uppercase tracking-widest transition-colors">
              Dashboard
            </Link>
            <span className="text-[#1A1A1A]/20 text-[10px]">/</span>
            <span className="text-[10px] font-bold text-[#FF6100] uppercase tracking-widest">Social Media</span>
          </div>
          <h1 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">📱 Social Media</h1>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">Análise completa — {cur.month} {cur.year}</p>
        </div>

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
          <span className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Atualizado
          </span>
        </div>
      </motion.div>

      {/* KPIs */}
      <div className="flex gap-3 mb-5">
        <KpiCard emoji="👁️" label="Visualizações"   value={fmt(cur.kpis.views)}          shadow="#FF6100" delay={0}    delta={prev ? { curr: cur.kpis.views,          prev: prev.kpis.views }          : undefined} />
        <KpiCard emoji="🎯" label="Alcance"          value={fmt(cur.kpis.reach)}           shadow="#00C2FF" delay={0.06} delta={prev ? { curr: cur.kpis.reach,          prev: prev.kpis.reach }          : undefined} />
        <KpiCard emoji="👥" label="Seguidores Novos" value={`+${cur.kpis.newFollowers}`}   shadow="#AAFF00" delay={0.12} delta={prev ? { curr: cur.kpis.newFollowers,   prev: prev.kpis.newFollowers }   : undefined} />
        <KpiCard emoji="❤️" label="Interações"       value={fmt(cur.kpis.interactions)}    shadow="#7B2FF7" delay={0.18} delta={prev ? { curr: cur.kpis.interactions,   prev: prev.kpis.interactions }   : undefined} />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-col gap-1.5 min-w-0 flex-1"
          style={{ boxShadow: "5px 5px 0px 0px #1A1A1A" }}
        >
          <span className="text-xl leading-none">📱</span>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 leading-none">Conteúdo</p>
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {[
              { label: `${cur.kpis.reels} Reels`,     color: "#FF6100" },
              { label: `${cur.kpis.stories} Stories`,  color: "#7B2FF7" },
              { label: `${cur.kpis.posts} Post`,       color: "#00C2FF" },
              { label: `${cur.kpis.carrosseis} Carr.`, color: "#AAFF00" },
            ].map(t => (
              <span key={t.label} className="text-[10px] font-black px-2 py-0.5 rounded-full border border-[#1A1A1A]/10"
                style={{ background: `${t.color}18`, color: t.color }}>{t.label}</span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Metas */}
      <GoalsSection goals={curGoals} delay={0.28} />

      {/* Gráfico */}
      <motion.div key={`chart-${monthIdx}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
        style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
      >
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">📈 Evolução</p>
            <p className="text-sm font-black text-[#1A1A1A]">{cur.month} {cur.year}</p>
          </div>
          {prev && (
            <div className="text-right">
              <p className="text-[9px] text-[#1A1A1A]/30 font-medium">vs {prev.month}</p>
              <p className={`text-base font-black ${cur.kpis.views >= prev.kpis.views ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
                {cur.kpis.views >= prev.kpis.views ? "+" : ""}
                {(((cur.kpis.views - prev.kpis.views) / prev.kpis.views) * 100).toFixed(1)}% views
                {cur.kpis.views >= prev.kpis.views ? " ↑" : " ↓"}
              </p>
            </div>
          )}
        </div>
        <SocialChart
          weekPoints={cur.evolutionWeeks.map(w => ({ label: w.label, views: w.views, followers: w.followers, interactions: w.interactions, posts: w.posts }))}
          monthPoints={monthPoints}
        />
      </motion.div>

      {/* Presença Diária */}
      <motion.div key={`presence-${monthIdx}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-5"
        style={{ boxShadow: "4px 4px 0px 0px #00C2FF" }}
      >
        <div className="mb-4">
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">📅 Presença Diária × Resultado</p>
          <p className="text-sm font-black text-[#1A1A1A]">Postagem diária gera mais visualizações — {cur.month} {cur.year}</p>
        </div>
        <DailyPresence days={cur.dailyPresence} month={cur.month} />
      </motion.div>

      {/* Análise por Formato + Engajamento */}
      <div className="grid grid-cols-3 gap-4 mb-5">
        <motion.div key={`formats-${monthIdx}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="col-span-2 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
          style={{ boxShadow: "4px 4px 0px 0px #AAFF00" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">📊 Análise por Formato</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">Visualizações médias por tipo de conteúdo — {cur.month}</p>
          <FormatAnalysis formats={cur.formatStats} />
        </motion.div>

        <motion.div key={`gauge-${monthIdx}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex flex-col"
          style={{ boxShadow: "4px 4px 0px 0px #7B2FF7" }}
        >
          <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">❤️ Taxa de Engajamento</p>
          <p className="text-sm font-black text-[#1A1A1A] mb-4">(Interações / Alcance) × 100</p>
          <div className="flex-1 flex items-center justify-center">
            <EngagementGauge rate={cur.engagementRate} prevRate={prev?.engagementRate} />
          </div>
        </motion.div>
      </div>

      {/* Top Posts */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
        style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">🏆 Top Posts do Mês</p>
            <p className="text-sm font-black text-[#1A1A1A]">5 conteúdos que mais geraram visualizações — {cur.month} {cur.year}</p>
          </div>
          <span className="text-[9px] font-black bg-[#FF6100] text-white px-2 py-1 rounded-full uppercase tracking-wide">Instagram</span>
        </div>
        <div className="flex gap-4">
          {cur.topPosts.map((p, i) => <TopPostCard key={p.rank} p={p} delay={0.05 * i} />)}
        </div>
      </motion.div>

    </div>
  );
}
