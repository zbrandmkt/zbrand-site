"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

interface TrafegoMetrics {
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  leads: number;       // Total de resultados (todos os tipos somados)
  cpc: number;
  cpm: number;
  cpl: number;         // Custo por resultado
  ctr: number;
  frequency: number;
  campaigns: {
    campaign_id: string;
    campaign_name: string;
    spend: number;
    impressions: number;
    clicks: number;
    leads: number;
    result_type?: string;  // "Formulário" | "Conversa" | "Pixel" | etc.
    cpc: number;
    cpl: number;
  }[];
  synced_at?: string;
}

function fmt(value: number | undefined, decimals = 0): string {
  if (!value || value === 0) return "—";
  return value.toLocaleString("pt-BR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
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

// ─── Upsell Block (reusable) ─────────────────────────────────
function AdsUpsell({
  platform,
  label,
  color,
  badgeTextColor,
  benefits,
}: {
  platform: string;
  label: string;
  color: string;
  badgeTextColor: string;
  benefits: string[];
}) {
  const waText = encodeURIComponent(
    `Oi! Quero saber mais sobre adicionar ${label} ao meu plano na ZBRAND.`
  );
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex-1 relative border-2 rounded-2xl p-5 overflow-hidden"
      style={{ background: "#1A1A1A", borderColor: color, boxShadow: `4px 4px 0px 0px ${color}` }}
    >
      {/* Pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `repeating-linear-gradient(45deg, ${color} 0, ${color} 1px, transparent 0, transparent 50%)`, backgroundSize: "8px 8px" }} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[9px] font-black px-2 py-0.5 rounded-full"
            style={{ background: color, color: badgeTextColor }}>{platform}</span>
          <span className="text-xs font-black uppercase tracking-widest text-white">{label}</span>
          <span className="ml-auto text-base">🔒</span>
        </div>
        <p className="text-sm font-black text-white mb-1">Potencialize seus resultados</p>
        <p className="text-xs text-white/50 mb-3 leading-relaxed">
          Adicione {label} ao seu plano e veja os dados integrados aqui no dashboard.
        </p>
        <div className="flex flex-col gap-1.5 mb-4">
          {benefits.map((b) => (
            <div key={b} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color }} />
              <span className="text-[11px] text-white/60">{b}</span>
            </div>
          ))}
        </div>
        <a
          href={`https://wa.me/5541988338133?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full font-black text-xs uppercase tracking-wider rounded-xl py-2.5 px-4 hover:brightness-110 transition-all"
          style={{ background: color, color: badgeTextColor, boxShadow: "2px 2px 0px 0px rgba(255,255,255,0.15)" }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Adicionar {label}
        </a>
      </div>
    </motion.div>
  );
}

function GoogleAdsUpsell() {
  return (
    <AdsUpsell
      platform="GOOGLE"
      label="Google Ads"
      color="#FBBC05"
      badgeTextColor="#1A1A1A"
      benefits={[
        "Pesquisa Google (intenção de compra)",
        "Display e YouTube Ads",
        "Relatórios integrados no dashboard",
      ]}
    />
  );
}

function MetaAdsUpsell() {
  return (
    <AdsUpsell
      platform="META"
      label="Meta Ads"
      color="#1877F2"
      badgeTextColor="white"
      benefits={[
        "Campanhas no Facebook e Instagram",
        "Remarketing e públicos personalizados",
        "Relatórios de leads e CPL",
      ]}
    />
  );
}

// ─── Month Selector ──────────────────────────────────────────
function MonthSelector({
  currentMonth,
  maxUnlockedMonth,
  selectedMonth,
  onSelect,
  metricsMap,
}: {
  currentMonth: number;
  maxUnlockedMonth: number;
  selectedMonth: number;
  onSelect: (m: number) => void;
  metricsMap: Record<string, object | null>;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {MONTH_NAMES.map((name, i) => {
        const month = i + 1;
        const isLocked = month > maxUnlockedMonth;
        const isCurrent = month === currentMonth;
        const isSelected = month === selectedMonth;
        const hasSynced = !!metricsMap[month];
        const shortName = name.slice(0, 3).toUpperCase();

        if (isLocked) {
          return (
            <div key={month}
              className="px-3 py-1.5 rounded-lg border-2 border-[#1A1A1A]/10 text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]/20 cursor-not-allowed flex items-center gap-1"
            >
              <span className="text-[9px]">🔒</span> {shortName}
            </div>
          );
        }

        return (
          <button
            key={month}
            onClick={() => onSelect(month)}
            className={`px-3 py-1.5 rounded-lg border-2 text-[10px] font-black uppercase tracking-wider transition-all relative ${
              isSelected
                ? "bg-[#FF6100] border-[#FF6100] text-white"
                : isCurrent
                ? "border-[#1A1A1A] bg-white text-[#1A1A1A] hover:border-[#FF6100]"
                : "border-[#1A1A1A]/30 bg-white text-[#1A1A1A]/60 hover:border-[#1A1A1A]"
            }`}
            style={{ boxShadow: isSelected ? "2px 2px 0px 0px #1A1A1A" : "1px 1px 0px 0px #1A1A1A30" }}
          >
            {shortName}
            {isCurrent && !isSelected && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF6100]" />
            )}
            {hasSynced && !isSelected && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#AAFF00]" />
            )}
          </button>
        );
      })}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
export default function TrafegoPagoPage({
  metricsMap,
  currentMonth,
  currentYear,
  maxUnlockedMonth,
  hasMetaAds,
  hasGoogleAds,
}: {
  metricsMap: Record<string, object | null>;
  currentMonth: number;
  currentYear: number;
  maxUnlockedMonth: number;
  hasMetaAds: boolean;
  hasGoogleAds: boolean;
}) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const metrics = metricsMap[selectedMonth] as TrafegoMetrics | null;
  const hasData = !!metrics;
  const selectedMonthName = MONTH_NAMES[selectedMonth - 1];

  return (
    <div className="p-8 max-w-[1400px]">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-4 mb-4"
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
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-0.5">
            {selectedMonthName} {currentYear}
            {selectedMonth === currentMonth && (
              <span className="ml-2 text-[9px] font-black bg-[#FF6100]/15 text-[#FF6100] px-2 py-0.5 rounded-full uppercase tracking-wider">
                Mês atual
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {hasData ? (
            <span className="flex items-center gap-1.5 bg-[#AAFF00]/20 border border-[#AAFF00] text-[#1A1A1A] text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] inline-block" />
              Meta Ads • Sincronizado
            </span>
          ) : (
            <span className="flex items-center gap-1.5 bg-[#1A1A1A]/06 border border-[#1A1A1A]/10 text-[#1A1A1A]/30 text-[11px] font-black uppercase tracking-wider px-3 py-2 rounded-xl">
              Aguardando dados
            </span>
          )}
        </div>
      </motion.div>

      {/* Month Selector */}
      <MonthSelector
        currentMonth={currentMonth}
        maxUnlockedMonth={maxUnlockedMonth}
        selectedMonth={selectedMonth}
        onSelect={setSelectedMonth}
        metricsMap={metricsMap}
      />

      {/* Sync banner — with data */}
      {hasData && metrics.synced_at && (
        <motion.div
          key={`sync-${selectedMonth}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-5 bg-[#AAFF00]/10 border-2 border-[#AAFF00]/40 rounded-2xl px-5 py-3 flex items-center gap-3"
        >
          <span className="text-lg shrink-0">🔄</span>
          <p className="text-xs font-black text-[#1A1A1A]/60">
            Dados de {selectedMonthName} sincronizados em{" "}
            {new Date(metrics.synced_at).toLocaleString("pt-BR")} via Meta Ads API
          </p>
        </motion.div>
      )}

      {/* No data banner */}
      {!hasData && (
        <motion.div
          key={`nodata-${selectedMonth}`}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-5 bg-white border-2 border-[#1A1A1A]/10 rounded-2xl px-5 py-4 flex items-center gap-4"
          style={{ boxShadow: "3px 3px 0px 0px #FF6100" }}
        >
          <span className="text-2xl shrink-0">📊</span>
          <div>
            <p className="text-sm font-black text-[#1A1A1A]">
              {selectedMonth < currentMonth
                ? `Dados de ${selectedMonthName} ainda não foram sincronizados`
                : "Métricas de Tráfego Pago em preparação"}
            </p>
            <p className="text-xs text-[#1A1A1A]/50 mt-0.5">
              {selectedMonth < currentMonth
                ? "Entre em contato com a equipe ZBRAND para adicionar dados retroativos."
                : "Em breve você verá aqui: leads, CPL, CPC, funil de conversão e criativos campeões — integrado com Meta Ads e Google Ads."}
            </p>
          </div>
        </motion.div>
      )}

      {/* KPIs */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`kpis-${selectedMonth}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex gap-3 mb-6">
            <KpiCard emoji="💸" label="Total Investido"    value={fmtCurrency(metrics?.spend)}  shadow="#FF6100" delay={0} />
            <KpiCard emoji="🎯" label="Resultados Totais"  value={fmt(metrics?.leads)}           shadow="#00C2FF" delay={0.06} />
            <KpiCard emoji="💰" label="Custo/Resultado"    value={fmtCurrency(metrics?.cpl)}     shadow="#AAFF00" delay={0.12} />
            <KpiCard emoji="👆" label="CPC Médio Meta"     value={fmtCurrency(metrics?.cpc)}     shadow="#7B2FF7" delay={0.18} />
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

          {/* Métricas Gerais + Funil */}
          <div className="grid grid-cols-5 gap-4 mb-5">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="col-span-3 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
              style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">📈 Métricas Gerais</p>
              <p className="text-sm font-black text-[#1A1A1A] mb-4">{selectedMonthName} {currentYear} — Meta Ads</p>
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
              <p className="text-sm font-black text-[#1A1A1A] mb-4">{selectedMonthName} {currentYear} — Meta</p>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Impressões",  value: hasData ? fmt(metrics.impressions) : "—", pct: 100 },
                  { label: "Cliques",    value: hasData ? fmt(metrics.clicks) : "—",      pct: hasData && metrics.impressions > 0 ? (metrics.clicks / metrics.impressions) * 100 : 0 },
                  { label: "Resultados", value: hasData ? fmt(metrics.leads) : "—",       pct: hasData && metrics.clicks > 0 ? (metrics.leads / metrics.clicks) * 100 : 0 },
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
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-4">📋 Campanhas — Meta Ads</p>
            {hasData && metrics.campaigns && metrics.campaigns.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F5F0] rounded-xl">
                    {["Campanha", "Tipo", "Investido", "Impressões", "Cliques", "Resultados", "CPC", "Custo/Result."].map((h) => (
                      <th key={h} className="px-3 py-2 text-left text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {metrics.campaigns.map((c, i) => (
                    <tr key={c.campaign_id} className={i % 2 === 0 ? "bg-white" : "bg-[#F5F5F0]/40"}>
                      <td className="px-3 py-3 text-xs font-bold text-[#1A1A1A] max-w-[180px] truncate">{c.campaign_name}</td>
                      <td className="px-3 py-3">
                        <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#00C2FF]/15 text-[#006688] whitespace-nowrap">
                          {c.result_type ?? "Formulário"}
                        </span>
                      </td>
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

          {/* Budget — Meta + Google (or upsell) */}
          <div className="flex gap-4 mb-5">
            {/* Meta Ads — show data card or upsell */}
            {hasMetaAds ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
                style={{ boxShadow: "4px 4px 0px 0px #1877F2" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#1877F2] text-white">META</span>
                  <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">Meta Ads</span>
                </div>
                <div className="flex gap-6 mb-4">
                  {hasData ? (
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
                  {hasData ? "Dados via Meta Ads API" : "Aguardando dados de investimento"}
                </p>
              </motion.div>
            ) : (
              <MetaAdsUpsell />
            )}

            {/* Google Ads — show data card or upsell */}
            {hasGoogleAds ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex-1 bg-white border-2 border-[#1A1A1A] rounded-2xl p-5"
                style={{ boxShadow: "4px 4px 0px 0px #FBBC05" }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#FBBC05] text-[#1A1A1A]">GOOGLE</span>
                  <span className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]">Google Ads</span>
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
            ) : (
              <GoogleAdsUpsell />
            )}
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

          {/* Histórico Mensal */}
          <EmptySection title="📅 Histórico Mensal" shadow="#FBBC05">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F5F5F0]">
                  {["Mês", "Investido", "Resultados", "Custo/Result.", "CPC Meta", "Var."].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(metricsMap)
                  .filter(([, v]) => v !== null)
                  .sort(([a], [b]) => Number(b) - Number(a))
                  .map(([month, data]) => {
                    const m = data as TrafegoMetrics;
                    return (
                      <tr
                        key={month}
                        onClick={() => setSelectedMonth(Number(month))}
                        className={`cursor-pointer transition-colors ${Number(month) === selectedMonth ? "bg-[#FF6100]/08" : "hover:bg-[#F5F5F0]/60"}`}
                      >
                        <td className="px-4 py-3 text-xs font-bold text-[#1A1A1A]">
                          {MONTH_NAMES[Number(month) - 1]} {currentYear}
                          {Number(month) === selectedMonth && (
                            <span className="ml-2 text-[9px] font-black text-[#FF6100]">← selecionado</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-xs font-black text-[#FF6100]">{fmtCurrency(m.spend)}</td>
                        <td className="px-4 py-3 text-xs font-black text-[#00C2FF]">{fmt(m.leads)}</td>
                        <td className="px-4 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(m.cpl)}</td>
                        <td className="px-4 py-3 text-xs text-[#1A1A1A]/60">{fmtCurrency(m.cpc)}</td>
                        <td className="px-4 py-3 text-xs text-[#1A1A1A]/25">—</td>
                      </tr>
                    );
                  })}
                {Object.values(metricsMap).every((v) => v === null) && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-xs text-[#1A1A1A]/25 font-medium">
                      O histórico de relatórios será exibido aqui
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </EmptySection>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
