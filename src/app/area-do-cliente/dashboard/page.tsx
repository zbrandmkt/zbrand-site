"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  trafficWeeks,
  socialWeeks,
  monthlyTraffic,
  monthlySocial,
  type TrafficWeek,
  type SocialWeek,
} from "./mock-data";

// ─── helpers ────────────────────────────────────────────────
function fmt(n: number) {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 0 });
}
function fmtR(n: number) {
  return `R$ ${n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

type Dir = "up" | "down" | "none";
function trend(curr: number, prev: number | undefined): Dir {
  if (prev === undefined) return "none";
  if (curr > prev) return "up";
  if (curr < prev) return "down";
  return "none";
}

function TrendArrow({ dir }: { dir: Dir }) {
  if (dir === "none") return null;
  return (
    <span
      className={`inline-flex items-center text-[11px] font-black ${
        dir === "up" ? "text-[#22c55e]" : "text-[#ef4444]"
      }`}
    >
      {dir === "up" ? "↑" : "↓"}
    </span>
  );
}

// ─── KPI Card ───────────────────────────────────────────────
interface KpiProps {
  emoji: string;
  label: string;
  value: string;
  shadow: string;
  alert?: string;
  delay?: number;
}

function KpiCard({ emoji, label, value, shadow, alert, delay = 0 }: KpiProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex flex-col gap-2"
      style={{ boxShadow: `4px 4px 0px 0px ${shadow}` }}
    >
      <span className="text-2xl">{emoji}</span>
      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">{label}</p>
      <p className="text-2xl font-black text-[#1A1A1A] leading-none">{value}</p>
      {alert && (
        <span className="text-[10px] font-bold text-[#FF6100] bg-[#FF6100]/10 px-2 py-0.5 rounded-full self-start">
          ⚠ {alert}
        </span>
      )}
    </motion.div>
  );
}

// ─── Metric Row ─────────────────────────────────────────────
function MetricRow({
  label,
  value,
  dir,
}: {
  label: string;
  value: string;
  dir: Dir;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[#1A1A1A]/06 last:border-0">
      <span className="text-[11px] text-[#1A1A1A]/50 font-medium">{label}</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[12px] font-black text-[#1A1A1A]">{value}</span>
        <TrendArrow dir={dir} />
      </div>
    </div>
  );
}

// ─── Traffic Week Column ────────────────────────────────────
function TrafficWeekCol({ week, prev, index }: { week: TrafficWeek; prev?: TrafficWeek; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
      style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
    >
      {/* Week header */}
      <div className="bg-[#1A1A1A] px-4 py-3">
        <p className="text-xs font-black text-white uppercase tracking-widest">
          <span className="hidden xl:inline">SEMANA {index + 1}</span>
          <span className="xl:hidden">{week.label}</span>
        </p>
        <p className="text-[10px] text-white/40 font-medium mt-0.5">{week.dates}</p>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Meta Ads */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black bg-[#1877F2] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
              Meta Ads
            </span>
          </div>
          <div className="bg-[#F5F5F0] rounded-xl px-3 py-2">
            <MetricRow label="Invest" value={fmtR(week.meta.invest)} dir="none" />
            <MetricRow
              label="Leads"
              value={fmt(week.meta.leads)}
              dir={trend(week.meta.leads, prev?.meta.leads)}
            />
            <MetricRow
              label="CPL"
              value={fmtR(week.meta.cpl)}
              dir={trend(prev?.meta.cpl ?? 0, week.meta.cpl)}
            />
            <MetricRow
              label="CPC"
              value={fmtR(week.meta.cpc)}
              dir={trend(prev?.meta.cpc ?? 0, week.meta.cpc)}
            />
          </div>
        </div>

        {/* Google Ads */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black bg-[#FBBC05] text-[#1A1A1A] px-2 py-0.5 rounded-full uppercase tracking-wider">
              Google Ads
            </span>
          </div>
          <div className="bg-[#F5F5F0] rounded-xl px-3 py-2">
            <MetricRow label="Invest" value={fmtR(week.google.invest)} dir="none" />
            <MetricRow
              label="Leads"
              value={fmt(week.google.leads)}
              dir={trend(week.google.leads, prev?.google.leads)}
            />
            <MetricRow
              label="CPL"
              value={fmtR(week.google.cpl)}
              dir={trend(prev?.google.cpl ?? 0, week.google.cpl)}
            />
            <MetricRow
              label="CPC"
              value={fmtR(week.google.cpc)}
              dir={trend(prev?.google.cpc ?? 0, week.google.cpc)}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Social Week Column ─────────────────────────────────────
function SocialWeekCol({ week, prev, index }: { week: SocialWeek; prev?: SocialWeek; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
      style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
    >
      <div className="bg-[#1A1A1A] px-4 py-3">
        <p className="text-xs font-black text-white uppercase tracking-widest">
          <span className="hidden xl:inline">SEMANA {index + 1}</span>
          <span className="xl:hidden">{week.label}</span>
        </p>
        <p className="text-[10px] text-white/40 font-medium mt-0.5">{week.dates}</p>
      </div>

      <div className="p-4">
        <div className="bg-[#F5F5F0] rounded-xl px-3 py-2">
          <MetricRow
            label="Visualizações"
            value={fmt(week.views)}
            dir={trend(week.views, prev?.views)}
          />
          <MetricRow
            label="Seguidores"
            value={`+${week.newFollowers}`}
            dir={trend(week.newFollowers, prev?.newFollowers)}
          />
          <MetricRow
            label="Posts"
            value={String(week.posts)}
            dir={trend(week.posts, prev?.posts)}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Page ──────────────────────────────────────────────
export default function DashboardPage() {
  const [tab, setTab] = useState<"traffic" | "social">("traffic");

  return (
    <div className="p-8 max-w-[1400px]">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">
            Olá, STAYTRIX 👋
          </h1>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">
            Aqui estão os seus resultados
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select className="border-2 border-[#1A1A1A] rounded-xl px-4 py-2 text-sm font-bold text-[#1A1A1A] bg-white outline-none cursor-pointer"
            style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
          >
            <option>Abril 2026</option>
            <option>Março 2026</option>
            <option>Fevereiro 2026</option>
          </select>
          <span className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Atualizado
          </span>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {(["traffic", "social"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2.5 border-2 border-[#1A1A1A] rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 ${
              tab === t
                ? "bg-[#FF6100] text-white"
                : "bg-white text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
            }`}
            style={{
              boxShadow: tab === t ? "3px 3px 0px 0px #1A1A1A" : "2px 2px 0px 0px #1A1A1A",
            }}
          >
            {t === "traffic" ? "📊 Tráfego Pago" : "📱 Social Media"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── TRÁFEGO PAGO ── */}
        {tab === "traffic" && (
          <motion.div
            key="traffic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
              <KpiCard emoji="💸" label="Total Investido" value={fmtR(monthlyTraffic.totalInvest)} shadow="#FF6100" delay={0} />
              <KpiCard emoji="🎯" label="Total de Leads" value={fmt(monthlyTraffic.totalLeads)} shadow="#00C2FF" delay={0.05} />
              <KpiCard emoji="💰" label="CPL Médio" value={fmtR(monthlyTraffic.avgCpl)} shadow="#AAFF00" delay={0.1} />
              <KpiCard emoji="👆" label="CPC Médio Meta" value={fmtR(monthlyTraffic.avgCpcMeta)} shadow="#7B2FF7" delay={0.15} />
              <KpiCard
                emoji="💬"
                label="Saldo Meta Ads"
                value={fmtR(monthlyTraffic.saldoMeta)}
                shadow="#1A1A1A"
                alert="Saldo baixo"
                delay={0.2}
              />
              <KpiCard
                emoji="🔵"
                label="Saldo Google Ads"
                value={fmtR(monthlyTraffic.saldoGoogle)}
                shadow="#FBBC05"
                delay={0.25}
              />
            </div>

            {/* Divisor */}
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50 whitespace-nowrap">
                Comparativo Semanal
              </h2>
              <div className="flex-1 h-px bg-[#1A1A1A]/10" />
            </div>

            {/* Weekly grid */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {trafficWeeks.map((week, i) => (
                <TrafficWeekCol
                  key={week.label}
                  week={week}
                  prev={i > 0 ? trafficWeeks[i - 1] : undefined}
                  index={i}
                />
              ))}
            </div>

            {/* Notes + Metas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Ação da semana */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="bg-[#1A1A1A] border-2 border-[#1A1A1A] rounded-2xl p-6"
                style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
              >
                <p className="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">
                  📋 Ação da Semana
                </p>
                <p className="text-sm text-white/80 leading-relaxed font-medium">
                  {monthlyTraffic.acaoDaSemana}
                </p>
              </motion.div>

              {/* Metas Meta Ads */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6"
                style={{ boxShadow: "4px 4px 0px 0px #1877F2" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black bg-[#1877F2] text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Meta Ads</span>
                  <p className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-widest">Metas do Mês</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {monthlyTraffic.metasDoMes.meta.map((m) => (
                    <li key={m} className="text-sm text-[#1A1A1A]/80 font-medium flex items-start gap-2">
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Metas Google Ads */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6"
                style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[10px] font-black bg-[#FBBC05] text-[#1A1A1A] px-2 py-0.5 rounded-full uppercase tracking-wider">Google Ads</span>
                  <p className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-widest">Metas do Mês</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {monthlyTraffic.metasDoMes.google.map((m) => (
                    <li key={m} className="text-sm text-[#1A1A1A]/80 font-medium flex items-start gap-2">
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* ── SOCIAL MEDIA ── */}
        {tab === "social" && (
          <motion.div
            key="social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
              <KpiCard emoji="👁️" label="Visualizações" value={fmt(monthlySocial.views)} shadow="#FF6100" delay={0} />
              <KpiCard emoji="🎯" label="Alcance" value={fmt(monthlySocial.reach)} shadow="#00C2FF" delay={0.05} />
              <KpiCard emoji="👥" label="Seguidores Novos" value={`+${monthlySocial.newFollowers}`} shadow="#AAFF00" delay={0.1} />
              <KpiCard emoji="❤️" label="Interações" value={fmt(monthlySocial.interactions)} shadow="#7B2FF7" delay={0.15} />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 flex flex-col gap-2"
                style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
              >
                <span className="text-2xl">📱</span>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Conteúdo</p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {[
                    { label: `${monthlySocial.reels} Reels`, color: "#FF6100" },
                    { label: `${monthlySocial.stories} Stories`, color: "#7B2FF7" },
                    { label: `${monthlySocial.posts} Post`, color: "#00C2FF" },
                    { label: `${monthlySocial.carrosseis} Carrossel`, color: "#AAFF00" },
                  ].map((t) => (
                    <span
                      key={t.label}
                      className="text-[10px] font-black px-2 py-0.5 rounded-full border border-[#1A1A1A]/10"
                      style={{ background: `${t.color}18`, color: t.color }}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Divisor */}
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50 whitespace-nowrap">
                Comparativo Semanal
              </h2>
              <div className="flex-1 h-px bg-[#1A1A1A]/10" />
            </div>

            {/* Weekly grid */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
              {socialWeeks.map((week, i) => (
                <SocialWeekCol
                  key={week.label}
                  week={week}
                  prev={i > 0 ? socialWeeks[i - 1] : undefined}
                  index={i}
                />
              ))}
            </div>

            {/* Metas Social */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6"
              style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
            >
              <p className="text-[10px] font-black text-[#FF6100] uppercase tracking-widest mb-4">
                🎯 Metas do Mês
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {monthlySocial.metasDoMes.map((m) => (
                  <div key={m} className="flex items-start gap-2 bg-[#F5F5F0] rounded-xl px-3 py-2.5">
                    <span className="text-sm text-[#1A1A1A]/80 font-medium">{m}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
