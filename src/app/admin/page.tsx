import { createServerSupabaseClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function AdminOverviewPage() {
  const supabase = createServerSupabaseClient();

  const [{ data: clients }, { data: leads }, { data: reports }] = await Promise.all([
    supabase.from("clients").select("id, name, company, plan, status, created_at, approved_at").order("created_at", { ascending: false }),
    supabase.from("leads").select("id, name, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("client_reports").select("id, client_id, month, year, updated_at").order("updated_at", { ascending: false }).limit(5),
  ]);

  const allClients = clients ?? [];
  const pending   = allClients.filter((c) => c.status === "pending");
  const active    = allClients.filter((c) => c.status === "active");
  const suspended = allClients.filter((c) => c.status === "suspended");

  const stats = [
    { label: "Pendentes",    value: pending.length,     color: "#FF6100", bg: "#FF6100", href: "/admin/clientes" },
    { label: "Ativos",       value: active.length,      color: "#16a34a", bg: "#AAFF00", href: "/admin/clientes" },
    { label: "Suspensos",    value: suspended.length,   color: "#0284c7", bg: "#00C2FF", href: "/admin/clientes" },
    { label: "Leads no site",value: leads?.length ?? 0, color: "#7B2FF7", bg: "#7B2FF7", href: "/admin/leads" },
  ];

  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

  return (
    <div className="px-8 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Overview</h1>
        <p className="text-sm text-[#1A1A1A]/40 mt-1">Visão geral da agência ZBRAND</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white border border-[#e8e8e8] rounded-2xl p-5 hover:border-[#FF6100]/40 hover:shadow-sm transition-all group"
          >
            <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-2">{s.label}</p>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-[#1A1A1A]/20 mt-2 group-hover:text-[#FF6100] transition-colors">Ver detalhes →</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Aguardando ativação */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40">Aguardando ativação</h2>
            <Link href="/admin/clientes" className="text-[10px] text-[#FF6100] font-bold hover:underline">
              Ver todos →
            </Link>
          </div>
          {pending.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-2xl mb-1">🎉</p>
              <p className="text-xs text-[#1A1A1A]/30">Nenhum pendente</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {pending.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-[#f6f6f6] rounded-xl px-3 py-2.5">
                  <div>
                    <p className="text-xs font-bold text-[#1A1A1A]">{c.name}</p>
                    <p className="text-[10px] text-[#1A1A1A]/30">{new Date(c.created_at).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <Link href="/admin/clientes" className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#FF6100] text-white rounded-lg hover:bg-[#e55500] transition-colors">
                    Ativar
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Relatórios recentes */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40">Relatórios recentes</h2>
            <Link href="/admin/relatorios" className="text-[10px] text-[#FF6100] font-bold hover:underline">
              Ver todos →
            </Link>
          </div>
          {!reports || reports.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-2xl mb-1">📊</p>
              <p className="text-xs text-[#1A1A1A]/30">Nenhum relatório ainda</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {reports.map((r) => {
                const client = allClients.find((c) => c.id === r.client_id);
                return (
                  <div key={r.id} className="flex items-center justify-between bg-[#f6f6f6] rounded-xl px-3 py-2.5">
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">{client?.company ?? "—"}</p>
                      <p className="text-[10px] text-[#1A1A1A]/30">{months[r.month - 1]}/{r.year}</p>
                    </div>
                    <Link href={`/admin/relatorios/${r.client_id}`} className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 border border-[#e0e0e0] text-[#1A1A1A]/50 rounded-lg hover:border-[#FF6100] hover:text-[#FF6100] transition-colors">
                      Editar
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Clientes ativos */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40">Clientes ativos</h2>
            <Link href="/admin/clientes" className="text-[10px] text-[#FF6100] font-bold hover:underline">
              Ver todos →
            </Link>
          </div>
          {active.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-xs text-[#1A1A1A]/30">Nenhum cliente ativo</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {active.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-[#f6f6f6] rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FF6100] flex items-center justify-center font-black text-white text-xs shrink-0">
                      {c.company.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1A1A1A]">{c.company}</p>
                      <p className="text-[10px] text-[#1A1A1A]/30">{c.plan ?? "Sem plano"}</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leads recentes */}
        <div className="bg-white border border-[#e8e8e8] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#1A1A1A]/40">Leads recentes</h2>
            <Link href="/admin/leads" className="text-[10px] text-[#FF6100] font-bold hover:underline">
              Ver todos →
            </Link>
          </div>
          {!leads || leads.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-xs text-[#1A1A1A]/30">Nenhum lead ainda</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {leads.map((l) => (
                <div key={l.id} className="flex items-center justify-between bg-[#f6f6f6] rounded-xl px-3 py-2.5">
                  <p className="text-xs font-bold text-[#1A1A1A]">{l.name ?? "—"}</p>
                  <p className="text-[10px] text-[#1A1A1A]/30">{new Date(l.created_at).toLocaleDateString("pt-BR")}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
