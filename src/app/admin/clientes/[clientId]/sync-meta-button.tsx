"use client";

import { useState } from "react";

interface Props {
  clientId: string;
}

const MONTHS = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

export function SyncMetaButton({ clientId }: Props) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success?: boolean; error?: string; leads?: number; spend?: number } | null>(null);

  async function handleSync() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/admin/sync-meta-ads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId, month, year }),
      });
      const json = await res.json();
      if (!res.ok) {
        setResult({ error: json.error ?? "Erro desconhecido" });
      } else {
        setResult({
          success: true,
          leads: json.insights?.leads ?? 0,
          spend: json.insights?.spend ?? 0,
        });
      }
    } catch (e) {
      setResult({ error: String(e) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-end flex-wrap">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Mês</label>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2 text-sm font-bold text-[#1A1A1A] focus:border-[#1877F2] outline-none bg-white"
          >
            {MONTHS.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Ano</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2 text-sm font-bold text-[#1A1A1A] focus:border-[#1877F2] outline-none bg-white"
          >
            {[2024, 2025, 2026].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleSync}
          disabled={loading}
          className="flex items-center gap-2 bg-[#1877F2] border-2 border-[#1A1A1A] text-white font-black text-sm uppercase tracking-widest px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
        >
          {loading ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sincronizando...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sincronizar {MONTHS[month - 1]}/{year}
            </>
          )}
        </button>
      </div>

      {result && (
        <div className={`rounded-xl px-4 py-3 border-2 text-sm font-bold ${
          result.success
            ? "bg-[#AAFF00]/15 border-[#AAFF00]/40 text-[#3a6000]"
            : "bg-red-50 border-red-200 text-red-700"
        }`}>
          {result.success
            ? `✅ Sincronizado! ${result.leads} leads · R$ ${result.spend?.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} investidos`
            : `❌ ${result.error}`
          }
        </div>
      )}
    </div>
  );
}
