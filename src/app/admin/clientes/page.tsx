import { createServerSupabaseClient } from "@/lib/supabase-server";
import { approveClient, suspendClient, reactivateClient } from "../actions";

interface Client {
  id: string;
  user_id: string;
  name: string;
  company: string;
  plan: string | null;
  proposal_slug: string | null;
  status: string;
  notes: string | null;
  approved_at: string | null;
  created_at: string;
}

export default async function ClientesPage() {
  const supabase = createServerSupabaseClient();
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .order("created_at", { ascending: false });

  const allClients = (clients ?? []) as Client[];
  const pending   = allClients.filter((c) => c.status === "pending");
  const active    = allClients.filter((c) => c.status === "active");
  const suspended = allClients.filter((c) => c.status === "suspended");

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">Clientes</h1>
        <p className="text-sm text-white/40 mt-1">
          {allClients.length} clientes · {pending.length} pendentes · {active.length} ativos
        </p>
      </div>

      <div className="flex flex-col gap-10">

        {/* ── PENDENTES ── */}
        {pending.length > 0 && (
          <section>
            <SectionTitle color="#FF6100">🔴 Aguardando ativação ({pending.length})</SectionTitle>
            <div className="flex flex-col gap-4">
              {pending.map((client) => (
                <div
                  key={client.id}
                  className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
                  style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}
                >
                  <div className="px-5 py-4 border-b border-[#1A1A1A]/10 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-black text-[#1A1A1A]">{client.name}</p>
                      <p className="text-xs text-[#1A1A1A]/50 font-medium">
                        Cadastrado em {new Date(client.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-[#FF6100]/15 text-[#FF6100] border border-[#FF6100]/30 rounded-full">
                      Pendente
                    </span>
                  </div>

                  <form action={approveClient} className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="hidden" name="clientId" value={client.id} />

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">Nome da empresa</label>
                      <input
                        name="company"
                        defaultValue={client.company !== "A definir" ? client.company : ""}
                        placeholder="Ex: Churruts Hamburguer"
                        required
                        className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2 text-sm font-medium text-[#1A1A1A] focus:border-[#FF6100] outline-none"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">Plano</label>
                      <select
                        name="plan"
                        required
                        className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2 text-sm font-medium text-[#1A1A1A] focus:border-[#FF6100] outline-none bg-white"
                      >
                        <option value="">Selecionar...</option>
                        <option value="Starter">Starter</option>
                        <option value="Full">Full</option>
                        <option value="Personalizado">Personalizado</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">Slug da proposta (opcional)</label>
                      <input
                        name="slug"
                        defaultValue={client.proposal_slug ?? ""}
                        placeholder="Ex: hub365"
                        className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2 text-sm font-medium text-[#1A1A1A] focus:border-[#FF6100] outline-none"
                      />
                      <p className="text-[10px] text-[#1A1A1A]/35">/proposta/[slug]</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">Observações internas</label>
                      <input
                        name="notes"
                        defaultValue={client.notes ?? ""}
                        placeholder="Ex: cliente desde abril/2026"
                        className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2 text-sm font-medium text-[#1A1A1A] focus:border-[#FF6100] outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <button
                        type="submit"
                        className="bg-[#FF6100] border-2 border-[#1A1A1A] text-white font-black text-sm uppercase tracking-widest px-6 py-3 rounded-xl hover:-translate-y-0.5 transition-transform"
                        style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
                      >
                        ✓ Ativar acesso do cliente
                      </button>
                    </div>
                  </form>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── ATIVOS ── */}
        <section>
          <SectionTitle color="#AAFF00">🟢 Clientes ativos ({active.length})</SectionTitle>
          {active.length === 0 ? (
            <Empty text="Nenhum cliente ativo ainda." />
          ) : (
            <div className="flex flex-col gap-3">
              {active.map((client) => (
                <div
                  key={client.id}
                  className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-4"
                  style={{ boxShadow: "3px 3px 0px 0px #AAFF00" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6100] flex items-center justify-center font-black text-white text-sm shrink-0">
                      {client.company.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-black text-[#1A1A1A]">{client.company}</p>
                      <p className="text-xs text-[#1A1A1A]/50">{client.name}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    {client.plan && (
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#FF6100]/10 text-[#FF6100] rounded-full border border-[#FF6100]/20">
                        {client.plan}
                      </span>
                    )}
                    {client.proposal_slug && (
                      <a
                        href={`/proposta/${client.proposal_slug}`}
                        target="_blank"
                        className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#00C2FF]/10 text-[#00C2FF] rounded-full border border-[#00C2FF]/20 hover:bg-[#00C2FF]/20 transition-colors"
                      >
                        /proposta/{client.proposal_slug} ↗
                      </a>
                    )}
                    {client.notes && (
                      <span className="text-[10px] text-[#1A1A1A]/40 font-medium italic">{client.notes}</span>
                    )}
                    <span className="text-[10px] text-[#1A1A1A]/30 font-medium">
                      Ativo desde {client.approved_at ? new Date(client.approved_at).toLocaleDateString("pt-BR") : "—"}
                    </span>

                    <form action={suspendClient}>
                      <input type="hidden" name="clientId" value={client.id} />
                      <button
                        type="submit"
                        className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-[#1A1A1A]/20 text-[#1A1A1A]/50 rounded-xl hover:border-red-400 hover:text-red-500 transition-colors"
                      >
                        Suspender
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── SUSPENSOS ── */}
        {suspended.length > 0 && (
          <section>
            <SectionTitle color="#00C2FF">🔵 Suspensos ({suspended.length})</SectionTitle>
            <div className="flex flex-col gap-3">
              {suspended.map((client) => (
                <div
                  key={client.id}
                  className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-4 opacity-70"
                  style={{ boxShadow: "3px 3px 0px 0px #00C2FF" }}
                >
                  <div>
                    <p className="font-black text-[#1A1A1A]">{client.company}</p>
                    <p className="text-xs text-[#1A1A1A]/50">{client.name}</p>
                  </div>
                  <form action={reactivateClient}>
                    <input type="hidden" name="clientId" value={client.id} />
                    <button
                      type="submit"
                      className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-[#AAFF00] text-[#5a8a00] rounded-xl hover:bg-[#AAFF00]/10 transition-colors"
                    >
                      Reativar
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color }}>
      {children}
    </h2>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <div className="bg-white/04 border border-white/08 rounded-2xl px-5 py-8 text-center">
      <p className="text-sm text-white/30 font-medium">{text}</p>
    </div>
  );
}
