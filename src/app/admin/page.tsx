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
    { label: "Pendentes",    value: pending.length,   color: "#FF6100", href: "/admin/clientes?tab=pending" },
    { label: "Ativos",       value: active.length,    color: "#AAFF00", href: "/admin/clientes?tab=active" },
    { label: "Suspensos",    value: suspended.length, color: "#00C2FF", href: "/admin/clientes?tab=suspended" },
    { label: "Leads no site",value: leads?.length ?? 0, color: "#7B2FF7", href: "/admin/leads" },
  ];

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">Overview</h1>
        <p className="text-sm text-white/40 mt-1">Visão geral da agência</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="bg-white/04 border border-white/08 rounded-2xl p-5 hover:border-white/15 transition-colors group"
          >
            <p className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2">{s.label}</p>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-[10px] text-white/20 mt-2 group-hover:text-white/40 transition-colors">Ver detalhes →</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Atividade recente — pendentes */}
        <div className="bg-white/04 border border-white/08 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/50">Aguardando ativação</h2>
            <Link href="/admin/clientes" className="text-[10px] text-[#FF6100] font-bold hover:text-[#FF6100]/70 transition-colors">
              Ver todos →
            </Link>
          </div>
          {pending.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-2xl mb-1">🎉</p>
              <p className="text-xs text-white/30">Nenhum pendente</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {pending.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-white/04 rounded-xl px-3 py-2.5">
                  <div>
                    <p className="text-xs font-bold text-white">{c.name}</p>
                    <p className="text-[10px] text-white/30">{new Date(c.created_at).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <Link
                    href="/admin/clientes"
                    className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#FF6100] text-white rounded-lg hover:bg-[#FF6100]/80 transition-colors"
                  >
                    Ativar
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Relatórios recentes */}
        <div className="bg-white/04 border border-white/08 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/50">Relatórios recentes</h2>
            <Link href="/admin/relatorios" className="text-[10px] text-[#FF6100] font-bold hover:text-[#FF6100]/70 transition-colors">
              Ver todos →
            </Link>
          </div>
          {!reports || reports.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-2xl mb-1">📊</p>
              <p className="text-xs text-white/30">Nenhum relatório ainda</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {reports.map((r) => {
                const client = allClients.find((c) => c.id === r.client_id);
                const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
                return (
                  <div key={r.id} className="flex items-center justify-between bg-white/04 rounded-xl px-3 py-2.5">
                    <div>
                      <p className="text-xs font-bold text-white">{client?.company ?? "—"}</p>
                      <p className="text-[10px] text-white/30">{months[r.month - 1]}/{r.year}</p>
                    </div>
                    <Link
                      href={`/admin/relatorios/${r.client_id}`}
                      className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 border border-white/15 text-white/50 rounded-lg hover:border-[#FF6100] hover:text-[#FF6100] transition-colors"
                    >
                      Editar
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Clientes ativos */}
        <div className="bg-white/04 border border-white/08 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/50">Clientes ativos</h2>
            <Link href="/admin/clientes?tab=active" className="text-[10px] text-[#FF6100] font-bold hover:text-[#FF6100]/70 transition-colors">
              Ver todos →
            </Link>
          </div>
          {active.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-xs text-white/30">Nenhum cliente ativo</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {active.slice(0, 5).map((c) => (
                <div key={c.id} className="flex items-center justify-between bg-white/04 rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#FF6100] flex items-center justify-center font-black text-white text-xs shrink-0">
                      {c.company.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{c.company}</p>
                      <p className="text-[10px] text-white/30">{c.plan ?? "Sem plano"}</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-[#AAFF00]" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Leads recentes */}
        <div className="bg-white/04 border border-white/08 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-white/50">Leads recentes</h2>
            <Link href="/admin/leads" className="text-[10px] text-[#FF6100] font-bold hover:text-[#FF6100]/70 transition-colors">
              Ver todos →
            </Link>
          </div>
          {!leads || leads.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-xs text-white/30">Nenhum lead ainda</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {leads.map((l) => (
                <div key={l.id} className="flex items-center justify-between bg-white/04 rounded-xl px-3 py-2.5">
                  <p className="text-xs font-bold text-white">{l.name ?? "—"}</p>
                  <p className="text-[10px] text-white/30">{new Date(l.created_at).toLocaleDateString("pt-BR")}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
