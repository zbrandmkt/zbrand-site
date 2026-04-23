import Image from "next/image";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { approveClient, suspendClient, reactivateClient } from "./actions";

// ─── Types ───────────────────────────────────────────────────────────────────
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

interface Lead {
  id: string;
  name: string | null;
  whatsapp: string | null;
  services: string | null;
  business_type: string | null;
  message: string | null;
  created_at: string;
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function AdminPage() {
  const supabase = createServerSupabaseClient();

  const [{ data: clients }, { data: leads }] = await Promise.all([
    supabase.from("clients").select("*").order("created_at", { ascending: false }),
    supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(50),
  ]);

  const pending   = (clients ?? []).filter((c: Client) => c.status === "pending");
  const active    = (clients ?? []).filter((c: Client) => c.status === "active");
  const suspended = (clients ?? []).filter((c: Client) => c.status === "suspended");

  return (
    <main className="min-h-screen bg-[#0A0A0A] text-white">
      {/* Header */}
      <header className="border-b border-white/08 bg-[#111] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image src="/images/logo-zbrand.png" alt="ZBRAND" width={100} height={30} className="h-7 w-auto" />
          <div className="w-px h-5 bg-white/15" />
          <span className="text-xs font-black uppercase tracking-widest text-[#FF6100]">Painel Admin</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#AAFF00] rounded-full animate-pulse" />
          <span className="text-xs text-white/40 font-medium">Sistema ativo</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Pendentes",  value: pending.length,   color: "#FF6100" },
            { label: "Ativos",     value: active.length,    color: "#AAFF00" },
            { label: "Suspensos",  value: suspended.length, color: "#00C2FF" },
            { label: "Leads site", value: leads?.length ?? 0, color: "#7B2FF7" },
          ].map((s) => (
            <div key={s.label} className="bg-white/05 border border-white/10 rounded-2xl p-4">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-1">{s.label}</p>
              <p className="text-3xl font-black" style={{ color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── PENDENTES ── */}
        <section>
          <SectionTitle color="#FF6100">
            🔴 Aguardando ativação ({pending.length})
          </SectionTitle>

          {pending.length === 0 ? (
            <Empty text="Nenhum cliente pendente. 🎉" />
          ) : (
            <div className="flex flex-col gap-4">
              {pending.map((client: Client) => (
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

                  {/* Approve form */}
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
                        placeholder="Ex: hub365"
                        className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2 text-sm font-medium text-[#1A1A1A] focus:border-[#FF6100] outline-none"
                      />
                      <p className="text-[10px] text-[#1A1A1A]/35">/proposta/[slug]</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">Observações internas</label>
                      <input
                        name="notes"
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
          )}
        </section>

        {/* ── ATIVOS ── */}
        <section>
          <SectionTitle color="#AAFF00">
            🟢 Clientes ativos ({active.length})
          </SectionTitle>

          {active.length === 0 ? (
            <Empty text="Nenhum cliente ativo ainda." />
          ) : (
            <div className="flex flex-col gap-3">
              {active.map((client: Client) => (
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
            <SectionTitle color="#00C2FF">
              🔵 Suspensos ({suspended.length})
            </SectionTitle>
            <div className="flex flex-col gap-3">
              {suspended.map((client: Client) => (
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

        {/* ── LEADS ── */}
        <section>
          <SectionTitle color="#7B2FF7">
            💜 Leads do site ({leads?.length ?? 0})
          </SectionTitle>

          {!leads || leads.length === 0 ? (
            <Empty text="Nenhum lead ainda." />
          ) : (
            <div className="flex flex-col gap-3">
              {leads.map((lead: Lead) => (
                <div
                  key={lead.id}
                  className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
                  style={{ boxShadow: "3px 3px 0px 0px #7B2FF7" }}
                >
                  <div>
                    <p className="font-black text-[#1A1A1A] text-sm">{lead.name ?? "—"}</p>
                    <p className="text-xs text-[#1A1A1A]/50 font-medium">{lead.whatsapp ?? "—"}</p>
                    <p className="text-[10px] text-[#1A1A1A]/30 mt-1">
                      {new Date(lead.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">Serviços</p>
                    <p className="text-xs text-[#1A1A1A]/70">{lead.services ?? "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">Mensagem</p>
                    <p className="text-xs text-[#1A1A1A]/70 line-clamp-2">{lead.message ?? "—"}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function SectionTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h2
      className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2"
      style={{ color }}
    >
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
