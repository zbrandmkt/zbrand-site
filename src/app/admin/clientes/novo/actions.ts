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

  const company = (formData.get("company") as string).trim();
  const plan = (formData.get("plan") as string) || null;
  const whatsapp = (formData.get("whatsapp") as string).trim() || null;
  const contractStart = (formData.get("contract_start") as string) || null;
  const contractEnd = (formData.get("contract_end") as string) || null;
  const contractUrl = (formData.get("contract_url") as string).trim() || null;

  const modules = ["trafego", "social", "calendario", "aprovacoes"];
  const permissions = modules.filter((m) => formData.get(`perm_${m}`) === "on");

  const supabaseAdmin = createAdminSupabaseClient();

  const { data: client, error: clientError } = await supabaseAdmin
    .from("clients")
    .insert({
      company,
      plan,
      whatsapp,
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
    redirect(
      `/admin/clientes/novo?error=${encodeURIComponent(
        `Erro ao salvar empresa: ${clientError.message}`
      )}`
    );
  }

  redirect(`/admin/clientes/${client.id}`);
}
