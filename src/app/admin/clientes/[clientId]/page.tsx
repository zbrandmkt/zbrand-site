import { notFound } from "next/navigation";
import Link from "next/link";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import {
  updateClientPermissions,
  updateClientNotes,
  updateClientContract,
  suspendClientAction,
  reactivateClientAction,
} from "./actions";
import { SyncMetaButton } from "./sync-meta-button";

const MODULES = [
  {
    id: "trafego",
    label: "Tráfego Pago",
    description: "Relatórios de Meta Ads e Google Ads",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: "#00C2FF",
  },
  {
    id: "social",
    label: "Social Media",
    description: "Métricas de Instagram, Facebook e TikTok",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    color: "#FF3D9A",
  },
  {
    id: "calendario",
    label: "Calendário",
    description: "Calendário de conteúdo e posts agendados",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "#AAFF00",
  },
  {
    id: "aprovacoes",
    label: "Aprovações",
    description: "Fila de aprovação de posts e criativos",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "#FF6100",
  },
];

interface Props {
  params: { clientId: string };
}

export default async function ClientDetailPage({ params }: Props) {
  const supabaseAdmin = createAdminSupabaseClient();

  const [{ data: client }, { data: clientUsers }, { data: reports }, { count: pendingCount }, { data: integration }] =
    await Promise.all([
      supabaseAdmin.from("clients").select("*").eq("id", params.clientId).single(),
      supabaseAdmin
        .from("client_users")
        .select("id, name, email, role, status")
        .eq("client_id", params.clientId),
      supabaseAdmin
        .from("client_reports")
        .select("id, month, year, updated_at")
        .eq("client_id", params.clientId)
        .order("year", { ascending: false })
        .order("month", { ascending: false })
        .limit(3),
      supabaseAdmin
        .from("posts")
        .select("id", { count: "exact", head: true })
        .eq("client_id", params.clientId)
        .eq("status", "pending_approval"),
      supabaseAdmin
        .from("client_integrations")
        .select("platform, ad_account_id, status, last_sync, last_error")
        .eq("client_id", params.clientId)
        .eq("platform", "meta_ads")
        .maybeSingle(),
    ]);

  if (!client) notFound();

  const users = clientUsers ?? [];
  const recentReports = reports ?? [];
  const permissions: string[] = client.permissions ?? ["trafego", "social", "calendario", "aprovacoes"];
  const isActive = client.status === "active";
  const isSuspended = client.status === "suspended";
  const months = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

  return (
    <div className="px-8 py-8 max-w-3xl">
      <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight mb-1">{client.company}</h1>
      <p className="text-sm text-[#1A1A1A]/40 font-medium mb-8">Visão geral da empresa</p>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard
          label="Usuários"
          value={users.filter((u) => u.status === "active").length}
          sub={`${users.length} total`}
          color="#7B2FF7"
          href={`/admin/clientes/${params.clientId}/usuarios`}
        />
        <StatCard
          label="Relatórios"
          value={recentReports.length}
          sub="últimos salvos"
          color="#00C2FF"
          href={`/admin/clientes/${params.clientId}/relatorios`}
        />
        <StatCard
          label="Aprovações"
          value={pendingCount ?? 0}
          sub="pendentes"
          color="#FF6100"
          href={`/admin/clientes/${params.clientId}/aprovacoes`}
        />
        <StatCard
          label="Módulos"
          value={permissions.length}
          sub="ativos"
          color="#AAFF00"
        />
      </div>

      {/* Info + Users side-by-side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Company info */}
        <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5" style={{ boxShadow: "4px 4px 0px 0px #FF6100" }}>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-3">Dados</p>
          <div className="flex flex-col gap-2.5">
            <InfoRow label="WhatsApp" value={client.whatsapp ?? "—"} />
            <InfoRow
              label="Cliente desde"
              value={client.approved_at ? new Date(client.approved_at).toLocaleDateString("pt-BR") : "—"}
            />
            <InfoRow
              label="Plano"
              value={client.plan ?? "—"}
            />
            {client.contract_start && (
              <InfoRow
                label="Contrato"
                value={`${new Date(client.contract_start).toLocaleDateString("pt-BR")} → ${
                  client.contract_end ? new Date(client.contract_end).toLocaleDateString("pt-BR") : "..."
                }`}
              />
            )}
            {client.contract_url && (
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-0.5">Contrato</p>
                <a
                  href={client.contract_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#00C2FF] hover:underline"
                >
                  Ver documento ↗
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Users quick view */}
        <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5" style={{ boxShadow: "4px 4px 0px 0px #7B2FF7" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">Usuários</p>
            <Link
              href={`/admin/clientes/${params.clientId}/usuarios`}
              className="text-[10px] font-black text-[#7B2FF7] hover:underline"
            >
              Gerenciar →
            </Link>
          </div>
          {users.length === 0 ? (
            <div className="text-center py-4">
              <p className="text-xl mb-1">👤</p>
              <p className="text-xs text-[#1A1A1A]/30">Nenhum usuário</p>
              <Link
                href={`/admin/clientes/${params.clientId}/usuarios`}
                className="text-[10px] text-[#7B2FF7] hover:underline font-bold"
              >
                + Convidar
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {users.slice(0, 4).map((u) => (
                <div key={u.id} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#7B2FF7]/15 flex items-center justify-center font-black text-[#7B2FF7] text-xs shrink-0">
                    {(u.name || u.email).charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-[#1A1A1A] truncate">{u.name || u.email}</p>
                  </div>
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0 ${
                      u.status === "active"
                        ? "bg-[#AAFF00]/20 text-[#5a8a00]"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {u.status === "active" ? "●" : "○"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent reports */}
      {recentReports.length > 0 && (
        <div className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-5 mb-6" style={{ boxShadow: "4px 4px 0px 0px #00C2FF" }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30">Relatórios recentes</p>
            <Link
              href={`/admin/clientes/${params.clientId}/relatorios`}
              className="text-[10px] font-black text-[#00C2FF] hover:underline"
            >
              Ver todos →
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {recentReports.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-3 py-2 bg-[#f6f6f6] rounded-xl">
                <p className="text-xs font-bold text-[#1A1A1A]">
                  {months[r.month - 1]}/{r.year}
                </p>
                <p className="text-[10px] text-[#1A1A1A]/30">
                  Atualizado {new Date(r.updated_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Permissions */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 mb-6"
        style={{ boxShadow: "4px 4px 0px 0px #AAFF00" }}
      >
        <div className="mb-5">
          <h2 className="font-black text-[#1A1A1A] text-base tracking-tight">Permissões de acesso</h2>
          <p className="text-xs text-[#1A1A1A]/40 font-medium mt-1">
            Módulos visíveis no dashboard desta empresa.
          </p>
        </div>

        <form action={updateClientPermissions} className="flex flex-col gap-3">
          <input type="hidden" name="clientId" value={client.id} />

          {MODULES.map((mod) => {
            const enabled = permissions.includes(mod.id);
            return (
              <label
                key={mod.id}
                className="flex items-center justify-between gap-4 p-4 border-2 border-[#1A1A1A]/10 rounded-xl cursor-pointer hover:border-[#1A1A1A]/25 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${mod.color}20`, color: mod.color }}
                  >
                    {mod.icon}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#1A1A1A] tracking-tight">{mod.label}</p>
                    <p className="text-[11px] text-[#1A1A1A]/40 font-medium">{mod.description}</p>
                  </div>
                </div>
                <div className="relative shrink-0">
                  <input type="checkbox" name={`perm_${mod.id}`} defaultChecked={enabled} className="sr-only peer" />
                  <div className="w-11 h-6 rounded-full border-2 border-[#1A1A1A]/20 peer-checked:border-[#1A1A1A] transition-all"
                    style={{ background: enabled ? "#1A1A1A" : undefined }} />
                  <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${enabled ? "left-6 bg-[#AAFF00]" : "left-1 bg-[#1A1A1A]/20"}`} />
                </div>
              </label>
            );
          })}

          <button
            type="submit"
            className="mt-2 w-full bg-[#1A1A1A] border-2 border-[#1A1A1A] text-white font-black text-sm uppercase tracking-widest py-3 rounded-xl hover:-translate-y-0.5 transition-transform"
            style={{ boxShadow: "3px 3px 0px 0px #AAFF00" }}
          >
            Salvar permissões
          </button>
        </form>
      </div>

      {/* Notes */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 mb-6"
        style={{ boxShadow: "4px 4px 0px 0px #00C2FF" }}
      >
        <h2 className="font-black text-[#1A1A1A] text-base tracking-tight mb-4">Observações internas</h2>
        <form action={updateClientNotes} className="flex flex-col gap-3">
          <input type="hidden" name="clientId" value={client.id} />
          <textarea
            name="notes"
            defaultValue={client.notes ?? ""}
            rows={3}
            placeholder="Ex: prefere contato por WhatsApp, reunião toda segunda..."
            className="w-full border-2 border-[#1A1A1A]/15 rounded-xl px-4 py-3 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#00C2FF] outline-none resize-none"
          />
          <button
            type="submit"
            className="self-start bg-[#00C2FF] border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-sm uppercase tracking-widest px-6 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform"
            style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
          >
            Salvar nota
          </button>
        </form>
      </div>

      {/* Contract */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 mb-6"
        style={{ boxShadow: "4px 4px 0px 0px #00C2FF" }}
      >
        <h2 className="font-black text-[#1A1A1A] text-base tracking-tight mb-4">Contrato</h2>
        <form action={updateClientContract} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="hidden" name="clientId" value={client.id} />
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">Início</label>
            <input name="contract_start" type="date" defaultValue={client.contract_start ?? ""}
              className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] focus:border-[#00C2FF] outline-none transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">Término</label>
            <input name="contract_end" type="date" defaultValue={client.contract_end ?? ""}
              className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] focus:border-[#00C2FF] outline-none transition-colors" />
          </div>
          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">Link do contrato</label>
            <input name="contract_url" type="url" defaultValue={client.contract_url ?? ""} placeholder="https://drive.google.com/..."
              className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#00C2FF] outline-none transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <button type="submit"
              className="bg-[#00C2FF] border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-sm uppercase tracking-widest px-6 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform"
              style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}>
              Salvar contrato
            </button>
          </div>
        </form>
      </div>

      {/* Integrações — Meta Ads */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 mb-6"
        style={{ boxShadow: "4px 4px 0px 0px #1877F2" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-[#1877F2]/15 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </div>
          <div>
            <h2 className="font-black text-[#1A1A1A] text-base tracking-tight">Integrações — Meta Ads</h2>
            <p className="text-xs text-[#1A1A1A]/40 font-medium">Sincronizar métricas de campanhas</p>
          </div>
          {integration ? (
            <span className={`ml-auto text-[10px] font-black px-2.5 py-1 rounded-full border ${
              integration.status === "active"
                ? "bg-[#AAFF00]/20 border-[#AAFF00]/40 text-[#3a6000]"
                : "bg-red-50 border-red-200 text-red-600"
            }`}>
              {integration.status === "active" ? "● Conectado" : "○ Inativo"}
            </span>
          ) : (
            <span className="ml-auto text-[10px] font-black px-2.5 py-1 rounded-full border border-[#1A1A1A]/15 text-[#1A1A1A]/30">
              Sem integração
            </span>
          )}
        </div>

        {integration ? (
          <>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-[#F5F5F0] rounded-xl px-3 py-2.5">
                <p className="text-[9px] font-black uppercase tracking-wider text-[#1A1A1A]/30 mb-0.5">Conta de Anúncios</p>
                <p className="text-xs font-bold text-[#1A1A1A]">act_{integration.ad_account_id}</p>
              </div>
              <div className="bg-[#F5F5F0] rounded-xl px-3 py-2.5">
                <p className="text-[9px] font-black uppercase tracking-wider text-[#1A1A1A]/30 mb-0.5">Última Sync</p>
                <p className="text-xs font-bold text-[#1A1A1A]">
                  {integration.last_sync
                    ? new Date(integration.last_sync).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })
                    : "Nunca"}
                </p>
              </div>
            </div>
            {integration.last_error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-3 py-2 mb-4">
                <p className="text-[10px] font-bold text-red-600">Último erro: {integration.last_error}</p>
              </div>
            )}
            <SyncMetaButton clientId={params.clientId} />
          </>
        ) : (
          <div className="border-2 border-dashed border-[#1A1A1A]/10 rounded-xl px-4 py-6 text-center">
            <p className="text-xs text-[#1A1A1A]/30 font-medium">
              Nenhuma integração Meta Ads cadastrada para este cliente.<br/>
              Adicione o token de acesso via Supabase → client_integrations.
            </p>
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="bg-white border-2 border-[#1A1A1A]/20 rounded-2xl p-6">
        <h2 className="font-black text-[#1A1A1A]/50 text-sm tracking-tight mb-4 uppercase">Zona de perigo</h2>
        {isActive ? (
          <form action={suspendClientAction} className="flex items-center justify-between gap-4">
            <input type="hidden" name="clientId" value={client.id} />
            <p className="text-sm text-[#1A1A1A]/50 font-medium">
              Suspender remove o acesso de todos os usuários desta empresa.
            </p>
            <button type="submit"
              className="shrink-0 border-2 border-red-300 text-red-500 font-black text-xs uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-red-50 transition-colors">
              Suspender
            </button>
          </form>
        ) : isSuspended ? (
          <form action={reactivateClientAction} className="flex items-center justify-between gap-4">
            <input type="hidden" name="clientId" value={client.id} />
            <p className="text-sm text-[#1A1A1A]/50 font-medium">
              Reativar restaura o acesso ao dashboard.
            </p>
            <button type="submit"
              className="shrink-0 border-2 border-[#AAFF00] text-[#5a8a00] font-black text-xs uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-[#AAFF00]/10 transition-colors">
              Reativar
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, color, href }: { label: string; value: number; sub: string; color: string; href?: string }) {
  const content = (
    <div className="bg-white border border-[#e8e8e8] rounded-2xl p-4 hover:border-[#1A1A1A]/20 transition-all">
      <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-1">{label}</p>
      <p className="text-2xl font-black" style={{ color }}>{value}</p>
      <p className="text-[10px] text-[#1A1A1A]/25 mt-1">{sub}</p>
    </div>
  );
  if (href) return <Link href={href}>{content}</Link>;
  return content;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30 shrink-0">{label}</p>
      <p className="text-xs font-bold text-[#1A1A1A] text-right">{value}</p>
    </div>
  );
}
