"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { HealthCheckResult } from "@/lib/site-health";

// ── Score Ring ────────────────────────────────────────────────────────────────

function ScoreRing({ score }: { score: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? "#AAFF00" : score >= 50 ? "#FF6100" : "#ef4444";

  return (
    <svg width="140" height="140" className="rotate-[-90deg]">
      <circle cx="70" cy="70" r={r} fill="none" stroke="#1A1A1A" strokeWidth="10" />
      <circle
        cx="70" cy="70" r={r} fill="none"
        stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <text
        x="70" y="70"
        textAnchor="middle" dominantBaseline="central"
        className="rotate-90 fill-white font-black text-3xl"
        style={{ transform: "rotate(90deg)", transformOrigin: "70px 70px", fontSize: 36, fontWeight: 900 }}
        fill="white"
      >
        {score}
      </text>
    </svg>
  );
}

// ── Re-check Button ───────────────────────────────────────────────────────────

export function ReCheckButton() {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCheck() {
    setLoading(true);
    try {
      await fetch("/api/admin/site-health", { method: "POST" });
      startTransition(() => { router.refresh(); });
    } finally {
      setLoading(false);
    }
  }

  const busy = loading || isPending;

  return (
    <button
      onClick={handleCheck}
      disabled={busy}
      className="flex items-center gap-2 bg-[#FF6100] border-2 border-[#1A1A1A] text-white font-black text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
      style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
    >
      {busy ? (
        <>
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Verificando...
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Re-verificar agora
        </>
      )}
    </button>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export function SiteHealthDashboard({
  data,
  checkedAt,
  score,
}: {
  data: HealthCheckResult;
  checkedAt: string;
  score: number;
}) {
  return (
    <div className="flex flex-col gap-6">

      {/* ── Score + Meta ── */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6"
        style={{ boxShadow: "5px 5px 0px 0px #FF6100" }}
      >
        <div className="relative shrink-0">
          <ScoreRing score={score} />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-white leading-none">{score}</span>
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-0.5">/ 100</span>
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h2 className="text-xl font-black text-[#1A1A1A] tracking-tight">
            {score >= 80 ? "Site saudável 🟢" : score >= 50 ? "Atenção necessária 🟡" : "Problemas críticos 🔴"}
          </h2>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mt-1">
            Última verificação:{" "}
            <span className="font-bold text-[#1A1A1A]/70">
              {new Date(checkedAt).toLocaleString("pt-BR", {
                day: "2-digit", month: "2-digit", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
            </span>
          </p>
          <div className="flex flex-wrap gap-3 mt-3 justify-center sm:justify-start text-xs font-bold text-[#1A1A1A]/50">
            <span>Páginas: <strong className="text-[#1A1A1A]">30%</strong></span>
            <span>Integrações: <strong className="text-[#1A1A1A]">25%</strong></span>
            <span>SEO técnico: <strong className="text-[#1A1A1A]">25%</strong></span>
            <span>Performance: <strong className="text-[#1A1A1A]">20%</strong></span>
          </div>
        </div>

        <ReCheckButton />
      </div>

      {/* ── Páginas ── */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
        style={{ boxShadow: "5px 5px 0px 0px #00C2FF" }}
      >
        <div className="px-6 py-4 border-b border-[#1A1A1A]/10 flex items-center justify-between">
          <h3 className="font-black text-[#1A1A1A] tracking-tight">Páginas do site</h3>
          <span className="text-xs font-bold text-[#1A1A1A]/40">
            {data.pages.filter((p) => p.ok).length}/{data.pages.length} ok
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1A1A1A]/08 bg-[#F5F5F0]">
                {["Página", "Status", "Título", "Descrição", "OG Image", "Prioridade"].map((h) => (
                  <th key={h} className="text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-[#1A1A1A]/40">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.pages.map((page) => (
                <tr key={page.path} className="border-b border-[#1A1A1A]/06 hover:bg-[#F5F5F0]/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-bold text-[#1A1A1A]">{page.name}</p>
                    <p className="text-[11px] text-[#1A1A1A]/40 font-mono">{page.path}</p>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge ok={page.status === 200} label={page.status?.toString() ?? "—"} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <CheckDot ok={page.titleOk} />
                      <span className="text-[11px] text-[#1A1A1A]/50 max-w-[140px] truncate" title={page.titleText}>
                        {page.titleText || "—"}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><CheckDot ok={page.descOk} /></td>
                  <td className="px-4 py-3"><CheckDot ok={page.ogImageOk} /></td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={page.priority} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Integrações + SEO ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Integrações */}
        <div
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
          style={{ boxShadow: "5px 5px 0px 0px #AAFF00" }}
        >
          <div className="px-6 py-4 border-b border-[#1A1A1A]/10 flex items-center justify-between">
            <h3 className="font-black text-[#1A1A1A] tracking-tight">Integrações</h3>
            <span className="text-xs font-bold text-[#1A1A1A]/40">
              {data.integrations.filter((i) => i.found).length}/{data.integrations.length} ativas
            </span>
          </div>
          <div className="p-4 flex flex-col gap-2">
            {data.integrations.map((integ) => (
              <div
                key={integ.id}
                className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 border-[#1A1A1A]/08"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${integ.found ? "bg-[#AAFF00]" : "bg-red-400"}`}
                  />
                  <span className="text-sm font-bold text-[#1A1A1A]">{integ.name}</span>
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
                    integ.found
                      ? "bg-[#AAFF00]/15 text-[#5a8a00]"
                      : "bg-red-50 text-red-400"
                  }`}
                >
                  {integ.found ? "Ativo" : "Não encontrado"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SEO + Performance */}
        <div className="flex flex-col gap-6">
          {/* SEO técnico */}
          <div
            className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
            style={{ boxShadow: "5px 5px 0px 0px #7B2FF7" }}
          >
            <div className="px-6 py-4 border-b border-[#1A1A1A]/10">
              <h3 className="font-black text-[#1A1A1A] tracking-tight">SEO Técnico</h3>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <SeoItem label="Sitemap XML (/sitemap.xml)" ok={data.seo.sitemapOk} />
              <SeoItem label="Robots.txt (/robots.txt)" ok={data.seo.robotsOk} />
            </div>
          </div>

          {/* PageSpeed */}
          <div
            className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
            style={{ boxShadow: "5px 5px 0px 0px #FF3D9A" }}
          >
            <div className="px-6 py-4 border-b border-[#1A1A1A]/10 flex items-center justify-between">
              <h3 className="font-black text-[#1A1A1A] tracking-tight">PageSpeed (Mobile)</h3>
              {data.performance.performance === null && (
                <span className="text-[10px] font-bold text-[#1A1A1A]/30 bg-[#1A1A1A]/05 px-2 py-1 rounded-full">
                  API key não configurada
                </span>
              )}
            </div>
            <div className="p-4 grid grid-cols-2 gap-3">
              {[
                { label: "Performance", value: data.performance.performance },
                { label: "SEO", value: data.performance.seo },
                { label: "Acessibilidade", value: data.performance.accessibility },
                { label: "Boas práticas", value: data.performance.bestPractices },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center justify-center p-4 bg-[#F5F5F0] rounded-xl border border-[#1A1A1A]/08">
                  <span
                    className="text-2xl font-black leading-none"
                    style={{
                      color: value == null ? "#1A1A1A30"
                        : value >= 90 ? "#AAFF00"
                        : value >= 50 ? "#FF6100"
                        : "#ef4444"
                    }}
                  >
                    {value ?? "—"}
                  </span>
                  <span className="text-[10px] font-bold text-[#1A1A1A]/40 uppercase tracking-wider mt-1 text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function CheckDot({ ok }: { ok: boolean }) {
  return (
    <span
      className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-black shrink-0 ${
        ok ? "bg-[#AAFF00]/20 text-[#5a8a00]" : "bg-red-50 text-red-400"
      }`}
    >
      {ok ? "✓" : "✗"}
    </span>
  );
}

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`text-[10px] font-black px-2 py-1 rounded-full ${
        ok ? "bg-[#AAFF00]/15 text-[#5a8a00]" : "bg-red-50 text-red-400"
      }`}
    >
      {label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    critical: "bg-red-50 text-red-500",
    high: "bg-[#FF6100]/10 text-[#FF6100]",
    medium: "bg-[#00C2FF]/10 text-[#00C2FF]",
    low: "bg-[#1A1A1A]/08 text-[#1A1A1A]/40",
  };
  return (
    <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider ${map[priority] ?? ""}`}>
      {priority}
    </span>
  );
}

function SeoItem({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 border-[#1A1A1A]/08">
      <span className="text-sm font-bold text-[#1A1A1A]">{label}</span>
      <span
        className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${
          ok ? "bg-[#AAFF00]/15 text-[#5a8a00]" : "bg-red-50 text-red-400"
        }`}
      >
        {ok ? "OK" : "Erro"}
      </span>
    </div>
  );
}
