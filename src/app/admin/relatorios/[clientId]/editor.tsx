"use client";

import { useState, useTransition } from "react";
import { saveReport } from "../../actions";

// ─── Types ────────────────────────────────────────────────────────────────────

interface WeekTraffic {
  label: string;
  dates: string;
  meta: { invest: number; leads: number; cpl: number; cpc: number };
  google: { invest: number; leads: number; cpl: number; cpc: number };
}

interface WeekSocial {
  label: string;
  dates: string;
  views: number;
  newFollowers: number;
  posts: number;
}

interface ReportData {
  trafficWeeks: WeekTraffic[];
  socialWeeks: WeekSocial[];
  metaBudget: number;
  googleBudget: number;
  acaoDaSemana: string;
  metasTrafficMeta: string;
  metasTrafficGoogle: string;
  metasSocial: string;
  socialKpis: {
    reach: number;
    interactions: number;
    reels: number;
    stories: number;
    posts: number;
    carrosseis: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExistingReport = { id: string; client_id: string; month: number; year: number; report_data: any; updated_at: string };

// ─── Helpers ─────────────────────────────────────────────────────────────────

const MONTH_NAMES = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];

function makeEmptyWeekTraffic(i: number): WeekTraffic {
  return {
    label: `SEM ${i + 1}`,
    dates: "",
    meta: { invest: 0, leads: 0, cpl: 0, cpc: 0 },
    google: { invest: 0, leads: 0, cpl: 0, cpc: 0 },
  };
}

function makeEmptyWeekSocial(i: number): WeekSocial {
  return { label: `SEM ${i + 1}`, dates: "", views: 0, newFollowers: 0, posts: 0 };
}

function makeEmptyReport(): ReportData {
  return {
    trafficWeeks: [0,1,2,3].map(makeEmptyWeekTraffic),
    socialWeeks: [0,1,2,3].map(makeEmptyWeekSocial),
    metaBudget: 900,
    googleBudget: 1000,
    acaoDaSemana: "",
    metasTrafficMeta: "🎯 500 leads no mês\n💰 CPL abaixo de R$ 2,50\n💸 Budget: R$ 900",
    metasTrafficGoogle: "🎯 25 leads no mês\n💰 CPL abaixo de R$ 50,00\n💸 Budget: R$ 1.000",
    metasSocial: "👁️ 5.000 visualizações no mês\n👥 +15 seguidores novos\n🎬 8 Reels publicados",
    socialKpis: { reach: 0, interactions: 0, reels: 0, stories: 0, posts: 0, carrosseis: 0 },
  };
}

function parseReportData(raw: ExistingReport["report_data"]): ReportData {
  if (!raw) return makeEmptyReport();
  const base = makeEmptyReport();
  return {
    trafficWeeks: raw.trafficWeeks ?? base.trafficWeeks,
    socialWeeks: raw.socialWeeks ?? base.socialWeeks,
    metaBudget: raw.metaBudget ?? base.metaBudget,
    googleBudget: raw.googleBudget ?? base.googleBudget,
    acaoDaSemana: raw.acaoDaSemana ?? base.acaoDaSemana,
    metasTrafficMeta: raw.metasTrafficMeta ?? base.metasTrafficMeta,
    metasTrafficGoogle: raw.metasTrafficGoogle ?? base.metasTrafficGoogle,
    metasSocial: raw.metasSocial ?? base.metasSocial,
    socialKpis: raw.socialKpis ?? base.socialKpis,
  };
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ReportEditor({
  clientId,
  existingReports,
}: {
  clientId: string;
  existingReports: ExistingReport[];
}) {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const existing = existingReports.find(
    (r) => r.month === selectedMonth && r.year === selectedYear
  );

  const [data, setData] = useState<ReportData>(() => parseReportData(existing?.report_data));
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  // When month/year changes, load existing data or reset
  function handlePeriodChange(month: number, year: number) {
    setSelectedMonth(month);
    setSelectedYear(year);
    const found = existingReports.find((r) => r.month === month && r.year === year);
    setData(parseReportData(found?.report_data));
    setSaved(false);
  }

  function handleSave() {
    startTransition(async () => {
      const formData = new FormData();
      formData.set("clientId", clientId);
      formData.set("month", String(selectedMonth));
      formData.set("year", String(selectedYear));
      formData.set("reportData", JSON.stringify(data));
      await saveReport(formData);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    });
  }

  // ─── Traffic week helpers ─────────────────────────────────────────
  function setTrafficField(weekIdx: number, platform: "meta" | "google", field: string, value: number) {
    setData((prev) => {
      const weeks = [...prev.trafficWeeks];
      weeks[weekIdx] = {
        ...weeks[weekIdx],
        [platform]: { ...weeks[weekIdx][platform], [field]: value },
      };
      return { ...prev, trafficWeeks: weeks };
    });
  }

  function setTrafficDate(weekIdx: number, field: "label" | "dates", value: string) {
    setData((prev) => {
      const weeks = [...prev.trafficWeeks];
      weeks[weekIdx] = { ...weeks[weekIdx], [field]: value };
      return { ...prev, trafficWeeks: weeks };
    });
  }

  function setSocialField(weekIdx: number, field: keyof WeekSocial, value: string | number) {
    setData((prev) => {
      const weeks = [...prev.socialWeeks];
      weeks[weekIdx] = { ...weeks[weekIdx], [field]: value };
      return { ...prev, socialWeeks: weeks };
    });
  }

  // ─── Computed totals ──────────────────────────────────────────────
  const totalMetaLeads    = data.trafficWeeks.reduce((s, w) => s + w.meta.leads, 0);
  const totalGoogleLeads  = data.trafficWeeks.reduce((s, w) => s + w.google.leads, 0);
  const totalMetaInvest   = data.trafficWeeks.reduce((s, w) => s + w.meta.invest, 0);
  const totalGoogleInvest = data.trafficWeeks.reduce((s, w) => s + w.google.invest, 0);
  const avgMetaCpl = totalMetaLeads > 0 ? totalMetaInvest / totalMetaLeads : 0;

  const totalViews     = data.socialWeeks.reduce((s, w) => s + w.views, 0);
  const totalFollowers = data.socialWeeks.reduce((s, w) => s + w.newFollowers, 0);

  return (
    <div className="flex flex-col gap-6">

      {/* Period selector + Save */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-[#e8e8e8] rounded-2xl px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-[#1A1A1A]/40 font-black uppercase tracking-widest">Mês</label>
            <select
              value={selectedMonth}
              onChange={(e) => handlePeriodChange(parseInt(e.target.value), selectedYear)}
              className="bg-white border border-[#e0e0e0] rounded-lg px-3 py-1.5 text-sm text-[#1A1A1A] font-bold focus:border-[#FF6100] outline-none"
            >
              {MONTH_NAMES.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] text-[#1A1A1A]/40 font-black uppercase tracking-widest">Ano</label>
            <select
              value={selectedYear}
              onChange={(e) => handlePeriodChange(selectedMonth, parseInt(e.target.value))}
              className="bg-white border border-[#e0e0e0] rounded-lg px-3 py-1.5 text-sm text-[#1A1A1A] font-bold focus:border-[#FF6100] outline-none"
            >
              {[2025, 2026, 2027].map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className="mt-5 flex items-center gap-2">
            {existing && (
              <span className="text-[10px] text-[#AAFF00] font-bold px-2.5 py-1 bg-[#AAFF00]/10 rounded-full border border-[#AAFF00]/20">
                Relatório existente
              </span>
            )}
            {!existing && (
              <span className="text-[10px] text-[#1A1A1A]/40 font-bold px-2.5 py-1 bg-[#f6f6f6] rounded-full border border-[#e0e0e0]">
                Novo relatório
              </span>
            )}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-[#FF6100] text-white font-black text-sm uppercase tracking-widest px-6 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform disabled:opacity-50"
          style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.15)" }}
        >
          {isPending ? "Salvando..." : saved ? "✓ Salvo!" : "Salvar relatório"}
        </button>
      </div>

      {/* Totals preview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Leads Meta",    value: totalMetaLeads,   color: "#FF6100", prefix: "" },
          { label: "Leads Google",  value: totalGoogleLeads, color: "#FBBC05", prefix: "" },
          { label: "Invest. Total", value: `R$ ${(totalMetaInvest + totalGoogleInvest).toLocaleString("pt-BR", { minimumFractionDigits: 0 })}`, color: "#16a34a", prefix: "" },
          { label: "Views Social",  value: totalViews,       color: "#7B2FF7", prefix: "" },
          { label: "CPL Meta",      value: `R$ ${avgMetaCpl.toFixed(2)}`, color: "#0284c7", prefix: "" },
          { label: "Seguidores +",  value: totalFollowers,   color: "#FF6100", prefix: "+" },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-[#e8e8e8] rounded-xl p-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">{s.label}</p>
            <p className="text-2xl font-black" style={{ color: s.color }}>
              {s.prefix}{typeof s.value === "number" ? s.value.toLocaleString("pt-BR") : s.value}
            </p>
          </div>
        ))}
      </div>

      {/* ─── META ADS ─────────────────────────────────────────────── */}
      <Section title="Meta Ads" color="#FF6100" emoji="📘">
        <div className="flex flex-col gap-3">
          {data.trafficWeeks.map((week, wi) => (
            <div key={wi} className="bg-[#f6f6f6] border border-[#e8e8e8] rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 bg-[#1A1A1A]/08 px-2 py-0.5 rounded-full">{week.label}</span>
                <input
                  type="text"
                  value={week.dates}
                  onChange={(e) => setTrafficDate(wi, "dates", e.target.value)}
                  placeholder="Ex: 01-07 ABR"
                  className="bg-transparent border-b border-[#1A1A1A]/15 text-xs text-[#1A1A1A]/60 focus:text-[#1A1A1A] focus:border-[#FF6100] outline-none pb-0.5 w-32"
                />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <NumInput label="Investido (R$)" value={week.meta.invest} onChange={(v) => setTrafficField(wi, "meta", "invest", v)} />
                <NumInput label="Leads" value={week.meta.leads} onChange={(v) => setTrafficField(wi, "meta", "leads", v)} />
                <NumInput label="CPL (R$)" value={week.meta.cpl} onChange={(v) => setTrafficField(wi, "meta", "cpl", v)} step={0.01} />
                <NumInput label="CPC (R$)" value={week.meta.cpc} onChange={(v) => setTrafficField(wi, "meta", "cpc", v)} step={0.01} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <NumInput label="Budget total Meta (R$)" value={data.metaBudget} onChange={(v) => setData((p) => ({ ...p, metaBudget: v }))} />
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Metas Meta Ads (uma por linha)</label>
            <textarea
              value={data.metasTrafficMeta}
              onChange={(e) => setData((p) => ({ ...p, metasTrafficMeta: e.target.value }))}
              rows={3}
              className="bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-xs text-[#1A1A1A]/70 focus:border-[#FF6100] outline-none resize-none"
            />
          </div>
        </div>
      </Section>

      {/* ─── GOOGLE ADS ───────────────────────────────────────────── */}
      <Section title="Google Ads" color="#FBBC05" emoji="🔍">
        <div className="flex flex-col gap-3">
          {data.trafficWeeks.map((week, wi) => (
            <div key={wi} className="bg-[#f6f6f6] border border-[#e8e8e8] rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 bg-[#1A1A1A]/08 px-2 py-0.5 rounded-full">{week.label}</span>
                <span className="text-xs text-[#1A1A1A]/40">{week.dates}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <NumInput label="Investido (R$)" value={week.google.invest} onChange={(v) => setTrafficField(wi, "google", "invest", v)} />
                <NumInput label="Leads" value={week.google.leads} onChange={(v) => setTrafficField(wi, "google", "leads", v)} />
                <NumInput label="CPL (R$)" value={week.google.cpl} onChange={(v) => setTrafficField(wi, "google", "cpl", v)} step={0.01} />
                <NumInput label="CPC (R$)" value={week.google.cpc} onChange={(v) => setTrafficField(wi, "google", "cpc", v)} step={0.01} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
          <NumInput label="Budget total Google (R$)" value={data.googleBudget} onChange={(v) => setData((p) => ({ ...p, googleBudget: v }))} />
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Metas Google Ads (uma por linha)</label>
            <textarea
              value={data.metasTrafficGoogle}
              onChange={(e) => setData((p) => ({ ...p, metasTrafficGoogle: e.target.value }))}
              rows={3}
              className="bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-xs text-[#1A1A1A]/70 focus:border-[#FBBC05] outline-none resize-none"
            />
          </div>
        </div>
      </Section>

      {/* ─── SOCIAL MEDIA ─────────────────────────────────────────── */}
      <Section title="Social Media" color="#7B2FF7" emoji="📱">
        <div className="flex flex-col gap-3 mb-4">
          {data.socialWeeks.map((week, wi) => (
            <div key={wi} className="bg-[#f6f6f6] border border-[#e8e8e8] rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 bg-[#1A1A1A]/08 px-2 py-0.5 rounded-full">{week.label}</span>
                <input
                  type="text"
                  value={week.dates}
                  onChange={(e) => setSocialField(wi, "dates", e.target.value)}
                  placeholder="Ex: 01-07 ABR"
                  className="bg-transparent border-b border-[#1A1A1A]/15 text-xs text-[#1A1A1A]/60 focus:text-[#1A1A1A] focus:border-[#7B2FF7] outline-none pb-0.5 w-32"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <NumInput label="Views" value={week.views} onChange={(v) => setSocialField(wi, "views", v)} />
                <NumInput label="Seguidores novos" value={week.newFollowers} onChange={(v) => setSocialField(wi, "newFollowers", v)} />
                <NumInput label="Posts" value={week.posts} onChange={(v) => setSocialField(wi, "posts", v)} />
              </div>
            </div>
          ))}
        </div>

        {/* Social KPIs mensais */}
        <div className="bg-[#f6f6f6] border border-[#e8e8e8] rounded-xl p-4 mb-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-3">KPIs mensais</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <NumInput label="Alcance (reach)" value={data.socialKpis.reach} onChange={(v) => setData((p) => ({ ...p, socialKpis: { ...p.socialKpis, reach: v } }))} />
            <NumInput label="Interações" value={data.socialKpis.interactions} onChange={(v) => setData((p) => ({ ...p, socialKpis: { ...p.socialKpis, interactions: v } }))} />
            <NumInput label="Reels publicados" value={data.socialKpis.reels} onChange={(v) => setData((p) => ({ ...p, socialKpis: { ...p.socialKpis, reels: v } }))} />
            <NumInput label="Stories" value={data.socialKpis.stories} onChange={(v) => setData((p) => ({ ...p, socialKpis: { ...p.socialKpis, stories: v } }))} />
            <NumInput label="Posts" value={data.socialKpis.posts} onChange={(v) => setData((p) => ({ ...p, socialKpis: { ...p.socialKpis, posts: v } }))} />
            <NumInput label="Carrosseis" value={data.socialKpis.carrosseis} onChange={(v) => setData((p) => ({ ...p, socialKpis: { ...p.socialKpis, carrosseis: v } }))} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Ação da semana / Observação</label>
            <textarea
              value={data.acaoDaSemana}
              onChange={(e) => setData((p) => ({ ...p, acaoDaSemana: e.target.value }))}
              rows={3}
              placeholder="Ex: Avaliar qualidade dos leads, novos criativos..."
              className="bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-xs text-[#1A1A1A]/70 focus:border-[#7B2FF7] outline-none resize-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Metas Social (uma por linha)</label>
            <textarea
              value={data.metasSocial}
              onChange={(e) => setData((p) => ({ ...p, metasSocial: e.target.value }))}
              rows={3}
              className="bg-white border border-[#e0e0e0] rounded-xl px-3 py-2 text-xs text-[#1A1A1A]/70 focus:border-[#7B2FF7] outline-none resize-none"
            />
          </div>
        </div>
      </Section>

      {/* Save bottom */}
      <div className="flex justify-end pb-8">
        <button
          onClick={handleSave}
          disabled={isPending}
          className="bg-[#FF6100] text-white font-black text-sm uppercase tracking-widest px-8 py-3 rounded-xl hover:-translate-y-0.5 transition-transform disabled:opacity-50"
          style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.15)" }}
        >
          {isPending ? "Salvando..." : saved ? "✓ Salvo com sucesso!" : "Salvar relatório"}
        </button>
      </div>

    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Section({ title, color, emoji, children }: { title: string; color: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-[#e8e8e8] rounded-2xl overflow-hidden">
      <div className="px-5 py-3 border-b border-[#e8e8e8]" style={{ backgroundColor: `${color}12` }}>
        <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2" style={{ color }}>
          <span>{emoji}</span> {title}
        </h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function NumInput({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">{label}</label>
      <input
        type="number"
        value={value}
        step={step}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="bg-white border border-[#e0e0e0] rounded-lg px-3 py-1.5 text-sm text-[#1A1A1A] font-bold focus:border-[#FF6100] outline-none"
      />
    </div>
  );
}
