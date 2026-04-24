import { createServerSupabaseClient } from "@/lib/supabase-server";
import Link from "next/link";

export default async function RelatoriosPage() {
  const supabase = createServerSupabaseClient();

  const [{ data: clients }, { data: reports }] = await Promise.all([
    supabase.from("clients").select("id, name, company, plan, status").eq("status", "active").order("company"),
    supabase.from("client_reports").select("id, client_id, month, year, updated_at").order("updated_at", { ascending: false }),
  ]);

  const activeClients = clients ?? [];
  const allReports = reports ?? [];
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

  return (
    <div className="px-8 py-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Relatórios</h1>
        <p className="text-sm text-[#1A1A1A]/40 mt-1">Edite os dados de tráfego e social de cada cliente</p>
      </div>

      {activeClients.length === 0 ? (
        <div className="bg-white border border-[#e8e8e8] rounded-2xl px-5 py-16 text-center">
          <p className="text-3xl mb-3">📊</p>
          <p className="text-sm text-[#1A1A1A]/40 font-medium">Nenhum cliente ativo ainda.</p>
          <p className="text-xs text-[#1A1A1A]/25 mt-1">Ative clientes na aba Clientes para editar relatórios.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {activeClients.map((client) => {
            const clientReports = allReports.filter((r) => r.client_id === client.id);
            const lastReport = clientReports[0];

            return (
              <div
                key={client.id}
                className="bg-white border border-[#e8e8e8] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 hover:border-[#FF6100]/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#FF6100] flex items-center justify-center font-black text-white text-lg shrink-0">
                    {client.company.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-black text-[#1A1A1A]">{client.company}</p>
                    <p className="text-xs text-[#1A1A1A]/40">{client.name}</p>
                    {client.plan && (
                      <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 bg-[#FF6100]/10 text-[#FF6100] rounded-full">
                        {client.plan}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  {clientReports.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#1A1A1A]/30 font-medium mr-1">Meses:</span>
                      {clientReports.slice(0, 6).map((r) => (
                        <span key={r.id} className="text-[10px] font-black px-2 py-0.5 bg-[#f6f6f6] text-[#1A1A1A]/50 rounded-full border border-[#e8e8e8]">
                          {months[r.month - 1]}/{String(r.year).slice(2)}
                        </span>
                      ))}
                    </div>
                  )}
                  {lastReport && (
                    <p className="text-[10px] text-[#1A1A1A]/25">
                      Atualizado {new Date(lastReport.updated_at).toLocaleDateString("pt-BR")}
                    </p>
                  )}
                  <Link
                    href={`/admin/relatorios/${client.id}`}
                    className="bg-[#FF6100] text-white font-black text-[11px] uppercase tracking-widest px-4 py-2 rounded-xl hover:-translate-y-0.5 transition-transform"
                    style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,0.15)" }}
                  >
                    Editar relatório
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
