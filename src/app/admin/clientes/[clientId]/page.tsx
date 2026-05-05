import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import {
  updateClientPermissions,
  updateClientNotes,
  updateClientContract,
  suspendClientAction,
  reactivateClientAction,
} from "./actions";

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
  const supabase = createServerSupabaseClient();
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: client } = await supabase
    .from("clients")
    .select("*")
    .eq("id", params.clientId)
    .single();

  if (!client) notFound();

  // Fetch users linked to this company
  const { data: clientUsers } = await supabaseAdmin
    .from("client_users")
    .select("id, name, email, role, status, invited_at, accepted_at")
    .eq("client_id", params.clientId)
    .order("invited_at", { ascending: true });

  const users = clientUsers ?? [];

  const permissions: string[] = client.permissions ?? ["trafego", "social", "calendario", "aprovacoes"];
  const isActive = client.status === "active";
  const isSuspended = client.status === "suspended";

  return (
    <div className="px-8 py-8 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/admin/clientes"
          className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors"
        >
          ← Clientes
        </Link>
        <span className="text-[#1A1A1A]/20">/</span>
        <span className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
          {client.company}
        </span>
      </div>

      {/* Header Card */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 mb-6"
        style={{ boxShadow: "5px 5px 0px 0px #FF6100" }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-white text-xl border-2 border-[#1A1A1A] shrink-0"
              style={{ background: "#FF6100", boxShadow: "3px 3px 0px 0px #1A1A1A" }}
            >
              {client.company.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-xl font-black text-[#1A1A1A] tracking-tight">{client.company}</h1>
              <p className="text-sm text-[#1A1A1A]/50 font-medium">
                {users.length > 0
                  ? `${users.length} usuário${users.length > 1 ? "s" : ""} cadastrado${users.length > 1 ? "s" : ""}`
                  : "Nenhum usuário ainda"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {client.plan && (
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 bg-[#FF6100]/10 text-[#FF6100] rounded-full border border-[#FF6100]/25">
                {client.plan}
              </span>
            )}
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full border ${
                isActive
                  ? "bg-[#AAFF00]/15 text-[#5a8a00] border-[#AAFF00]/40"
                  : isSuspended
                  ? "bg-red-50 text-red-500 border-red-200"
                  : "bg-yellow-50 text-yellow-600 border-yellow-200"
              }`}
            >
              {client.status === "active" ? "✓ Ativo" : client.status === "suspended" ? "Suspenso" : "Pendente"}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-[#1A1A1A]/10 grid grid-cols-2 sm:grid-cols-3 gap-4">
          <InfoItem label="WhatsApp" value={client.whatsapp ?? "—"} />
          <InfoItem
            label="Cliente desde"
            value={client.approved_at ? new Date(client.approved_at).toLocaleDateString("pt-BR") : "—"}
          />
          <InfoItem
            label="Cadastro"
            value={new Date(client.created_at).toLocaleDateString("pt-BR")}
          />
          {client.contract_start && (
            <InfoItem
              label="Início do contrato"
              value={new Date(client.contract_start).toLocaleDateString("pt-BR")}
            />
          )}
          {client.contract_end && (
            <InfoItem
              label="Término do contrato"
              value={new Date(client.contract_end).toLocaleDateString("pt-BR")}
            />
          )}
          {client.contract_url && (
            <div className="col-span-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-0.5">Contrato</p>
              <a
                href={client.contract_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-[#00C2FF] hover:underline truncate block"
              >
                Ver contrato ↗
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Users Card */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 mb-6"
        style={{ boxShadow: "5px 5px 0px 0px #7B2FF7" }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-black text-[#1A1A1A] text-base tracking-tight">Usuários com acesso</h2>
            <p className="text-xs text-[#1A1A1A]/40 font-medium mt-0.5">
              Pessoas que podem acessar o dashboard desta empresa.
            </p>
          </div>
          <Link
            href={`/admin/clientes/${params.clientId}/usuarios`}
            className="bg-[#7B2FF7] border-2 border-[#1A1A1A] text-white font-black text-[11px] uppercase tracking-widest px-4 py-2 rounded-xl hover:-translate-y-0.5 transition-transform shrink-0"
            style={{ boxShadow: "2px 2px 0px 0px #1A1A1A" }}
          >
            Gerenciar →
          </Link>
        </div>

        {users.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-[#1A1A1A]/15 rounded-xl">
            <p className="text-2xl mb-2">👤</p>
            <p className="text-sm font-black text-[#1A1A1A]/40">Nenhum usuário cadastrado</p>
            <p className="text-xs text-[#1A1A1A]/25 mt-1">
              <Link href={`/admin/clientes/${params.clientId}/usuarios`} className="underline hover:text-[#7B2FF7]">
                Clique em gerenciar para convidar um usuário
              </Link>
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {users.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between gap-3 px-4 py-3 border border-[#1A1A1A]/10 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#7B2FF7]/15 flex items-center justify-center font-black text-[#7B2FF7] text-sm shrink-0">
                    {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#1A1A1A]">{u.name || u.email}</p>
                    {u.name && <p className="text-[11px] text-[#1A1A1A]/40">{u.email}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 border border-[#1A1A1A]/15 rounded-full text-[#1A1A1A]/40">
                    {u.role}
                  </span>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      u.status === "active"
                        ? "bg-[#AAFF00]/20 text-[#5a8a00]"
                        : u.status === "suspended"
                        ? "bg-red-50 text-red-500"
                        : "bg-yellow-50 text-yellow-600"
                    }`}
                  >
                    {u.status === "active" ? "Ativo" : u.status === "suspended" ? "Suspenso" : "Convidado"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Permissions */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 mb-6"
        style={{ boxShadow: "5px 5px 0px 0px #AAFF00" }}
      >
        <div className="mb-5">
          <h2 className="font-black text-[#1A1A1A] text-base tracking-tight">Permissões de acesso</h2>
          <p className="text-xs text-[#1A1A1A]/40 font-medium mt-1">
            Defina quais módulos esta empresa pode visualizar no dashboard.
          </p>
        </div>

        <form action={updateClientPermissions} className="flex flex-col gap-3">
          <input type="hidden" name="clientId" value={client.id} />

          {MODULES.map((mod) => {
            const enabled = permissions.includes(mod.id);
            return (
              <label
                key={mod.id}
                className="flex items-center justify-between gap-4 p-4 border-2 border-[#1A1A1A]/10 rounded-xl cursor-pointer hover:border-[#1A1A1A]/25 transition-colors group"
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

                {/* Toggle switch */}
                <div className="relative shrink-0">
                  <input
                    type="checkbox"
                    name={`perm_${mod.id}`}
                    defaultChecked={enabled}
                    className="sr-only peer"
                  />
                  <div
                    className="w-11 h-6 rounded-full border-2 border-[#1A1A1A]/20 peer-checked:border-[#1A1A1A] transition-all"
                    style={{ background: enabled ? "#1A1A1A" : undefined }}
                  />
                  <div
                    className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                      enabled ? "left-6 bg-[#AAFF00]" : "left-1 bg-[#1A1A1A]/20"
                    }`}
                  />
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
        style={{ boxShadow: "5px 5px 0px 0px #00C2FF" }}
      >
        <h2 className="font-black text-[#1A1A1A] text-base tracking-tight mb-4">Observações internas</h2>
        <form action={updateClientNotes} className="flex flex-col gap-3">
          <input type="hidden" name="clientId" value={client.id} />
          <textarea
            name="notes"
            defaultValue={client.notes ?? ""}
            rows={3}
            placeholder="Ex: cliente muito pontual, prefere contato por WhatsApp..."
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
        style={{ boxShadow: "5px 5px 0px 0px #00C2FF" }}
      >
        <h2 className="font-black text-[#1A1A1A] text-base tracking-tight mb-4">Contrato</h2>
        <form action={updateClientContract} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="hidden" name="clientId" value={client.id} />

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
              Início do contrato
            </label>
            <input
              name="contract_start"
              type="date"
              defaultValue={client.contract_start ?? ""}
              className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] focus:border-[#00C2FF] outline-none transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
              Término do contrato
            </label>
            <input
              name="contract_end"
              type="date"
              defaultValue={client.contract_end ?? ""}
              className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] focus:border-[#00C2FF] outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
              Link do contrato
            </label>
            <input
              name="contract_url"
              type="url"
              defaultValue={client.contract_url ?? ""}
              placeholder="https://drive.google.com/..."
              className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#00C2FF] outline-none transition-colors"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="bg-[#00C2FF] border-2 border-[#1A1A1A] text-[#1A1A1A] font-black text-sm uppercase tracking-widest px-6 py-2.5 rounded-xl hover:-translate-y-0.5 transition-transform"
              style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
            >
              Salvar contrato
            </button>
          </div>
        </form>
      </div>

      {/* Danger zone */}
      <div className="bg-white border-2 border-[#1A1A1A]/20 rounded-2xl p-6">
        <h2 className="font-black text-[#1A1A1A]/50 text-sm tracking-tight mb-4 uppercase">Zona de perigo</h2>
        {isActive ? (
          <form action={suspendClientAction} className="flex items-center justify-between gap-4">
            <input type="hidden" name="clientId" value={client.id} />
            <p className="text-sm text-[#1A1A1A]/50 font-medium">
              Suspender remove o acesso de todos os usuários desta empresa imediatamente.
            </p>
            <button
              type="submit"
              className="shrink-0 border-2 border-red-300 text-red-500 font-black text-xs uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-red-50 transition-colors"
            >
              Suspender acesso
            </button>
          </form>
        ) : isSuspended ? (
          <form action={reactivateClientAction} className="flex items-center justify-between gap-4">
            <input type="hidden" name="clientId" value={client.id} />
            <p className="text-sm text-[#1A1A1A]/50 font-medium">
              Reativar restaura o acesso ao dashboard com as permissões salvas.
            </p>
            <button
              type="submit"
              className="shrink-0 border-2 border-[#AAFF00] text-[#5a8a00] font-black text-xs uppercase tracking-widest px-4 py-2 rounded-xl hover:bg-[#AAFF00]/10 transition-colors"
            >
              Reativar acesso
            </button>
          </form>
        ) : null}
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/30 mb-0.5">{label}</p>
      <p className="text-sm font-bold text-[#1A1A1A] truncate">{value}</p>
    </div>
  );
}
