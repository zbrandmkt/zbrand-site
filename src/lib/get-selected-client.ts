/**
 * Retorna o cliente atualmente selecionado para o usuário.
 * Suporta múltiplos clientes — lê o cookie "selected_client_id" para decidir qual exibir.
 */
import { cookies } from "next/headers";
import { createAdminSupabaseClient } from "./supabase-admin";

export interface SelectedClient {
  linkId: string;
  clientId: string;
  name: string;
  status: string;
  company: string;
  plan: string;
  permissions: string[];
}

export async function getSelectedClient(userId: string): Promise<SelectedClient | null> {
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: links } = await supabaseAdmin
    .from("client_users")
    .select("id, name, status, client_id, clients(status, company, plan, permissions)")
    .eq("user_id", userId)
    .neq("status", "suspended");

  if (!links || links.length === 0) return null;

  // Auto-activar convidados que já logaram
  for (const l of links) {
    if (l.status === "invited") {
      await supabaseAdmin
        .from("client_users")
        .update({ status: "active", accepted_at: new Date().toISOString() })
        .eq("id", l.id);
      l.status = "active";
    }
  }

  const savedClientId = cookies().get("selected_client_id")?.value;
  const link = links.find((l) => l.client_id === savedClientId) ?? links[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const c = (link.clients as any) ?? {};

  return {
    linkId: link.id as string,
    clientId: link.client_id as string,
    name: link.name as string,
    status: c.status as string ?? "active",
    company: c.company as string ?? "—",
    plan: c.plan as string ?? "—",
    permissions: c.permissions as string[] ?? ["trafego", "social", "calendario", "aprovacoes"],
  };
}

export async function getAllClientsForUser(userId: string): Promise<{ id: string; company: string }[]> {
  const supabaseAdmin = createAdminSupabaseClient();

  const { data: links } = await supabaseAdmin
    .from("client_users")
    .select("client_id, clients(company)")
    .eq("user_id", userId)
    .neq("status", "suspended");

  if (!links) return [];

  return links.map((l) => ({
    id: l.client_id as string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    company: ((l.clients as any)?.company as string) ?? "—",
  }));
}
