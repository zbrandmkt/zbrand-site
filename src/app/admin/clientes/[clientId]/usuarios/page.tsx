import { notFound } from "next/navigation";
import Link from "next/link";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { inviteUserAction, removeUserAction, resendInviteAction } from "./actions";

interface Props {
  params: { clientId: string };
  searchParams: { error?: string; success?: string };
}

export default async function UsuariosPage({ params, searchParams }: Props) {
  const supabase = createServerSupabaseClient();
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: client } = await supabase
    .from("clients")
    .select("id, company, status")
    .eq("id", params.clientId)
    .single();

  if (!client) notFound();

  const { data: users } = await supabaseAdmin
    .from("client_users")
    .select("id, name, email, role, status, invited_at, accepted_at")
    .eq("client_id", params.clientId)
    .order("invited_at", { ascending: true });

  const allUsers = users ?? [];

  return (
    <div className="px-8 py-8 max-w-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          href="/admin/clientes"
          className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors"
        >
          ← Clientes
        </Link>
        <span className="text-[#1A1A1A]/20">/</span>
        <Link
          href={`/admin/clientes/${params.clientId}`}
          className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]/40 hover:text-[#FF6100] transition-colors"
        >
          {client.company}
        </Link>
        <span className="text-[#1A1A1A]/20">/</span>
        <span className="text-[11px] font-black uppercase tracking-widest text-[#1A1A1A]">
          Usuários
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">
          Usuários — {client.company}
        </h1>
        <p className="text-sm text-[#1A1A1A]/40 mt-1">
          Gerencie quem tem acesso ao dashboard desta empresa.
        </p>
      </div>

      {/* Error/success banners */}
      {searchParams.error && (
        <div
          className="mb-6 bg-red-50 border-2 border-red-300 rounded-2xl px-5 py-4 flex items-start gap-3"
          style={{ boxShadow: "3px 3px 0px 0px #ef4444" }}
        >
          <span className="text-red-500 text-lg shrink-0">⚠</span>
          <div>
            <p className="font-black text-red-600 text-sm">Erro</p>
            <p className="text-xs text-red-500 mt-0.5">{searchParams.error}</p>
          </div>
        </div>
      )}

      {searchParams.success === "invited" && (
        <div
          className="mb-6 bg-[#AAFF00]/10 border-2 border-[#AAFF00] rounded-2xl px-5 py-4 flex items-start gap-3"
          style={{ boxShadow: "3px 3px 0px 0px #AAFF00" }}
        >
          <span className="text-[#5a8a00] text-lg shrink-0">✓</span>
          <div>
            <p className="font-black text-[#5a8a00] text-sm">Convite enviado!</p>
            <p className="text-xs text-[#5a8a00]/80 mt-0.5">
              O usuário receberá um email para criar a senha e acessar o dashboard.
            </p>
          </div>
        </div>
      )}

      {searchParams.success === "resent" && (
        <div
          className="mb-6 bg-[#00C2FF]/10 border-2 border-[#00C2FF] rounded-2xl px-5 py-4 flex items-start gap-3"
          style={{ boxShadow: "3px 3px 0px 0px #00C2FF" }}
        >
          <span className="text-[#00C2FF] text-lg shrink-0">✉</span>
          <div>
            <p className="font-black text-[#1A1A1A] text-sm">Convite reenviado!</p>
            <p className="text-xs text-[#1A1A1A]/60 mt-0.5">
              Um novo link de acesso foi enviado para o email do usuário.
            </p>
          </div>
        </div>
      )}

      {/* Users list */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6 mb-6"
        style={{ boxShadow: "5px 5px 0px 0px #7B2FF7" }}
      >
        <h2 className="font-black text-[#1A1A1A] text-base tracking-tight mb-4">
          Usuários cadastrados
          {allUsers.length > 0 && (
            <span className="ml-2 text-[11px] font-black bg-[#7B2FF7]/15 text-[#7B2FF7] px-2 py-0.5 rounded-full">
              {allUsers.length}
            </span>
          )}
        </h2>

        {allUsers.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-[#1A1A1A]/15 rounded-xl">
            <p className="text-3xl mb-2">👤</p>
            <p className="text-sm font-black text-[#1A1A1A]/40">Nenhum usuário ainda</p>
            <p className="text-xs text-[#1A1A1A]/25 mt-1">Convide o primeiro usuário usando o formulário abaixo.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {allUsers.map((u) => (
              <div
                key={u.id}
                className="flex items-center justify-between gap-3 p-4 border-2 border-[#1A1A1A]/10 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7B2FF7]/15 flex items-center justify-center font-black text-[#7B2FF7] shrink-0">
                    {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-black text-[#1A1A1A]">{u.name || "—"}</p>
                    <p className="text-[11px] text-[#1A1A1A]/50">{u.email}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 border border-[#1A1A1A]/15 rounded-full text-[#1A1A1A]/40">
                        {u.role}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                          u.status === "active"
                            ? "bg-[#AAFF00]/20 text-[#5a8a00]"
                            : u.status === "suspended"
                            ? "bg-red-50 text-red-500"
                            : "bg-yellow-50 text-yellow-600"
                        }`}
                      >
                        {u.status === "active" ? "● Ativo" : u.status === "suspended" ? "Suspenso" : "○ Convite enviado"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {u.status === "invited" && (
                    <form action={resendInviteAction}>
                      <input type="hidden" name="clientId" value={params.clientId} />
                      <input type="hidden" name="email" value={u.email} />
                      <input type="hidden" name="name" value={u.name} />
                      <button
                        type="submit"
                        className="text-[11px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-[#00C2FF]/40 text-[#00C2FF] rounded-xl hover:bg-[#00C2FF]/10 transition-colors"
                      >
                        Reenviar
                      </button>
                    </form>
                  )}
                  <form action={removeUserAction}>
                    <input type="hidden" name="clientId" value={params.clientId} />
                    <input type="hidden" name="linkId" value={u.id} />
                    <button
                      type="submit"
                      className="text-[11px] font-black uppercase tracking-wider px-3 py-1.5 border-2 border-red-200 text-red-400 rounded-xl hover:bg-red-50 transition-colors"
                    >
                      Remover
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Invite form */}
      <div
        className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-6"
        style={{ boxShadow: "5px 5px 0px 0px #FF6100" }}
      >
        <h2 className="font-black text-[#1A1A1A] text-base tracking-tight mb-1">Convidar usuário</h2>
        <p className="text-xs text-[#1A1A1A]/40 font-medium mb-5">
          Um email de boas-vindas será enviado automaticamente com o link de acesso.
        </p>

        <form action={inviteUserAction} className="flex flex-col gap-4">
          <input type="hidden" name="clientId" value={params.clientId} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                Nome completo *
              </label>
              <input
                name="name"
                required
                placeholder="Ex: João Silva"
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#FF6100] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                E-mail *
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="joao@empresa.com.br"
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 focus:border-[#FF6100] outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/50">
                Papel
              </label>
              <select
                name="role"
                className="border-2 border-[#1A1A1A]/20 rounded-xl px-3 py-2.5 text-sm font-medium text-[#1A1A1A] focus:border-[#FF6100] outline-none bg-white transition-colors"
              >
                <option value="owner">Owner — acesso completo</option>
                <option value="viewer">Viewer — somente leitura</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="self-start bg-[#FF6100] border-2 border-[#1A1A1A] text-white font-black text-sm uppercase tracking-widest px-8 py-3 rounded-xl hover:-translate-y-0.5 transition-transform"
            style={{ boxShadow: "3px 3px 0px 0px #1A1A1A" }}
          >
            ✉ Enviar convite
          </button>
        </form>
      </div>
    </div>
  );
}
