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

        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Meta Ads goals */}
          {hasMetaAds && (
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#1877F2] text-white">META</span>
                <p className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">Meta Ads</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <GoalInput
                  name="leads_meta"
                  label="Leads Meta"
                  placeholder="ex: 50"
                  defaultValue={existing?.leads_meta ?? ""}
                  prefix=""
                  suffix="leads"
                />
                <GoalInput
                  name="cpl_meta"
                  label="CPL Meta (máx)"
                  placeholder="ex: 30"
                  defaultValue={existing?.cpl_meta ?? ""}
                  prefix="R$"
                />
                <GoalInput
                  name="budget_meta"
                  label="Budget Meta"
                  placeholder="ex: 1500"
                  defaultValue={existing?.budget_meta ?? ""}
                  prefix="R$"
                />
              </div>
            </div>
          )}

          {/* Google Ads goals */}
          {hasGoogleAds && (
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3 mt-1">
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#FBBC05] text-[#1A1A1A]">GOOGLE</span>
                <p className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/50">Google Ads</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <GoalInput
                  name="leads_google"
                  label="Leads Google"
                  placeholder="ex: 20"
                  defaultValue={existing?.leads_google ?? ""}
                  suffix="leads"
                />
                <GoalInput
                  name="cpl_google"
                  label="CPL Google (máx)"
                  placeholder="ex: 25"
                  defaultValue={existing?.cpl_google ?? ""}
                  prefix="R$"
                />
                <GoalInput
                  name="budget_google"
                  label="Budget Google"
                  placeholder="ex: 500"
                  defaultValue={existing?.budget_google ?? ""}
                  prefix="R$"
                />
              </div>
            </div>
          )}

          {!hasMetaAds && !hasGoogleAds && (
            <div className="col-span-2 border-2 border-dashed border-[#1A1A1A]/10 rounded-xl px-4 py-6 text-center">
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
