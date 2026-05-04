"use server";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";

async function requireAdmin() {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function createClientAction(formData: FormData) {
  await requireAdmin();

  const name = (formData.get("name") as string).trim();
  const company = (formData.get("company") as string).trim();
  const email = (formData.get("email") as string).trim().toLowerCase();
  const plan = (formData.get("plan") as string) || null;
  const contractStart = (formData.get("contract_start") as string) || null;
  const contractEnd = (formData.get("contract_end") as string) || null;
  const contractUrl = (formData.get("contract_url") as string).trim() || null;

  const modules = ["trafego", "social", "calendario", "aprovacoes"];
  const permissions = modules.filter((m) => formData.get(`perm_${m}`) === "on");

  const supabaseAdmin = createAdminSupabaseClient();

  // 1. Invite user via Auth (sends branded invite email)
  const { data: inviteData, error: inviteError } =
    await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      redirectTo: "https://www.zbrand.com.br/area-do-cliente/nova-senha",
      data: {
        role: "client",
        name,
      },
    });

  if (inviteError) {
    throw new Error(`Erro ao enviar convite: ${inviteError.message}`);
  }

  const userId = inviteData.user.id;

  // 2. Insert client record linked to the new user
  const { data: client, error: clientError } = await supabaseAdmin
    .from("clients")
    .insert({
      user_id: userId,
      name,
      company,
      plan,
      permissions,
      status: "active",
      contract_start: contractStart || null,
      contract_end: contractEnd || null,
      contract_url: contractUrl || null,
      approved_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (clientError) {
    throw new Error(`Erro ao criar cliente: ${clientError.message}`);
  }

  redirect(`/admin/clientes/${client.id}`);
}
