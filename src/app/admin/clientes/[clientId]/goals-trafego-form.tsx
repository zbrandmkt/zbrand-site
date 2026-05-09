"use client";

import { useState, useTransition } from "react";
import { upsertTrafegoGoals } from "./actions";

const MONTHS = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

interface GoalRow {
  month: number;
  year: number;
  leads_meta?: number | null;
  cpl_meta?: number | null;
  budget_meta?: number | null;
  leads_google?: number | null;
  cpl_google?: number | null;
  budget_google?: number | null;
  // 3-tier goals
  leads_meta_conservative?: number | null;
  leads_meta_ideal?: number | null;
  leads_meta_incredible?: number | null;
  cpl_meta_conservative?: number | null;
  cpl_meta_ideal?: number | null;
  cpl_meta_incredible?: number | null;
  leads_google_conservative?: number | null;
  leads_google_ideal?: number | null;
  leads_google_incredible?: number | null;
  cpl_google_conservative?: number | null;
  cpl_google_ideal?: number | null;
  cpl_google_incredible?: number | null;
}

interface Props {
  clientId: string;
  currentMonth: number;
  currentYear: number;
  goalsMap: Record<string, object | null>; // key = "month"
  hasMetaAds: boolean;
  hasGoogleAds: boolean;
}

export function GoalsTrafegoForm({
  clientId,
  currentMonth,
  currentYear,
  goalsMap,
  hasMetaAds,
  hasGoogleAds,
}: Props) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const existing = (goalsMap[selectedMonth] ?? null) as GoalRow | null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await upsertTrafegoGoals(fd);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    });
  }

  return (
    <div>
      {/* Month tabs */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {MONTHS.map((name, i) => {
          const m = i + 1;
          const hasGoal = !!(goalsMap[m]);
          const isSelected = m === selectedMonth;
          return (
            <button
              key={m}
              type="button"
              onClick={() => { setSelectedMonth(m); setSaved(false); }}
              className={`px-2.5 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider transition-all relative ${
                isSelected
                  ? "bg-[#FF6100] border-[#FF6100] text-white"
                  : "border-[#1A1A1A]/20 bg-white text-[#1A1A1A]/50 hover:border-[#1A1A1A]"
              }`}
            >
              {name.slice(0, 3)}
              {hasGoal && !isSelected && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#AAFF00] border border-white" />
              )}
              {m === currentMonth && !isSelected && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#FF6100]" />
              )}
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="clientId" value={clientId} />
        <input type="hidden" name="year"     value={currentYear} />
        <input type="hidden" name="month"    value={selectedMonth} />

        <div className="space-y-6 mb-5">
          {/* Meta Ads goals */}
          {hasMetaAds && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#1877F2] text-white">META</span>
                <p className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">Meta Ads</p>
              </div>

              {/* Leads tiers */}
              <TierRow
                label="Leads"
                emoji={{ conservative: "👍", ideal: "🧡", incredible: "🚀" }}
                names={{
                  conservative: "leads_meta_conservative",
                  ideal: "leads_meta_ideal",
                  incredible: "leads_meta_incredible",
                }}
                defaults={{
                  conservative: existing?.leads_meta_conservative,
                  ideal: existing?.leads_meta_ideal,
                  incredible: existing?.leads_meta_incredible,
                }}
                placeholders={{ conservative: "ex: 25", ideal: "ex: 35", incredible: "ex: 50" }}
                suffix="leads"
              />

              {/* CPL tiers */}
              <TierRow
                label="CPL (máx)"
                emoji={{ conservative: "👍", ideal: "🧡", incredible: "🚀" }}
                names={{
                  conservative: "cpl_meta_conservative",
                  ideal: "cpl_meta_ideal",
                  incredible: "cpl_meta_incredible",
                }}
                defaults={{
                  conservative: existing?.cpl_meta_conservative,
                  ideal: existing?.cpl_meta_ideal,
                  incredible: existing?.cpl_meta_incredible,
                }}
                placeholders={{ conservative: "ex: 60", ideal: "ex: 43", incredible: "ex: 30" }}
                prefix="R$"
              />

              {/* Budget (single value) */}
              <div className="mt-3">
                <GoalInput
                  name="budget_meta"
                  label="💰 Budget Meta"
                  placeholder="ex: 1500"
                  defaultValue={existing?.budget_meta ?? ""}
                  prefix="R$"
                />
              </div>
            </div>
          )}

          {/* Google Ads goals */}
          {hasGoogleAds && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#FBBC05] text-[#1A1A1A]">GOOGLE</span>
                <p className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">Google Ads</p>
              </div>

              {/* Leads tiers */}
              <TierRow
                label="Leads"
                emoji={{ conservative: "👍", ideal: "🧡", incredible: "🚀" }}
                names={{
                  conservative: "leads_google_conservative",
                  ideal: "leads_google_ideal",
                  incredible: "leads_google_incredible",
                }}
                defaults={{
                  conservative: existing?.leads_google_conservative,
                  ideal: existing?.leads_google_ideal,
                  incredible: existing?.leads_google_incredible,
                }}
                placeholders={{ conservative: "ex: 7", ideal: "ex: 10", incredible: "ex: 15" }}
                suffix="leads"
              />

              {/* CPL tiers */}
              <TierRow
                label="CPL (máx)"
                emoji={{ conservative: "👍", ideal: "🧡", incredible: "🚀" }}
                names={{
                  conservative: "cpl_google_conservative",
                  ideal: "cpl_google_ideal",
                  incredible: "cpl_google_incredible",
                }}
                defaults={{
                  conservative: existing?.cpl_google_conservative,
                  ideal: existing?.cpl_google_ideal,
                  incredible: existing?.cpl_google_incredible,
                }}
                placeholders={{ conservative: "ex: 170", ideal: "ex: 120", incredible: "ex: 80" }}
                prefix="R$"
              />

              {/* Budget (single value) */}
              <div className="mt-3">
                <GoalInput
                  name="budget_google"
                  label="💰 Budget Google"
                  placeholder="ex: 500"
                  defaultValue={existing?.budget_google ?? ""}
                  prefix="R$"
                />
              </div>
            </div>
          )}

          {!hasMetaAds && !hasGoogleAds && (
            <div className="border-2 border-dashed border-[#1A1A1A]/10 rounded-xl px-4 py-6 text-center">
              <p className="text-xs text-[#1A1A1A]/30">Ative Meta Ads ou Google Ads nas permissões do cliente primeiro.</p>
            </div>
          )}
        </div>

        {(hasMetaAds || hasGoogleAds) && (
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isPending}
              className="bg-[#FF6100] border-2 border-[#1A1A1A] text-white font-black text-xs uppercase tracking-widest px-5 py-2 rounded-xl hover:-translate-y-0.5 transition-all disabled:opacity-50"
              style={{ boxShadow: "2px 2px 0px 0px #1A1A1A" }}
            >
              {isPending ? "Salvando…" : `Salvar metas — ${MONTHS[selectedMonth - 1]}`}
            </button>
            {saved && (
              <span className="text-xs font-black text-[#5a8a00] bg-[#AAFF00]/20 px-3 py-1.5 rounded-lg border border-[#AAFF00]/40">
                ✓ Salvo!
              </span>
            )}
          </div>
        )}
      </form>
    </div>
  );
}

// ─── Tier Row: 3 inputs in a row with emoji labels ─────────
function TierRow({
  label,
  emoji,
  names,
  defaults,
  placeholders,
  prefix,
  suffix,
}: {
  label: string;
  emoji: { conservative: string; ideal: string; incredible: string };
  names: { conservative: string; ideal: string; incredible: string };
  defaults: { conservative?: number | null; ideal?: number | null; incredible?: number | null };
  placeholders: { conservative: string; ideal: string; incredible: string };
  prefix?: string;
  suffix?: string;
}) {
  const tiers = [
    { key: "conservative" as const, tierLabel: "Conservadora", color: "text-[#1A1A1A]/60" },
    { key: "ideal" as const, tierLabel: "Ideal", color: "text-[#FF6100]" },
    { key: "incredible" as const, tierLabel: "Zebra", color: "text-[#22C55E]" },
  ];

  return (
    <div className="mb-4">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-2">{label}</p>
      <div className="grid grid-cols-3 gap-3">
        {tiers.map((tier) => (
          <GoalInput
            key={tier.key}
            name={names[tier.key]}
            label={`${emoji[tier.key]} ${tier.tierLabel}`}
            placeholder={placeholders[tier.key]}
            defaultValue={defaults[tier.key] ?? ""}
            prefix={prefix}
            suffix={suffix}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Single goal input ─────────────────────────────────────
function GoalInput({
  name,
  label,
  placeholder,
  defaultValue,
  prefix,
  suffix,
}: {
  name: string;
  label: string;
  placeholder?: string;
  defaultValue: number | string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">{label}</label>
      <div className="flex items-center border-2 border-[#1A1A1A]/15 rounded-xl overflow-hidden focus-within:border-[#FF6100] transition-colors">
        {prefix && (
          <span className="pl-3 pr-1 text-xs font-black text-[#1A1A1A]/30 shrink-0">{prefix}</span>
        )}
        <input
          type="number"
          name={name}
          step="0.01"
          min="0"
          placeholder={placeholder}
          defaultValue={defaultValue !== "" && defaultValue !== null && defaultValue !== undefined ? String(defaultValue) : ""}
          className="flex-1 py-2.5 px-3 text-sm font-bold text-[#1A1A1A] outline-none bg-transparent min-w-0"
        />
        {suffix && (
          <span className="pr-3 pl-1 text-xs font-black text-[#1A1A1A]/30 shrink-0">{suffix}</span>
        )}
      </div>
    </div>
  );
}
