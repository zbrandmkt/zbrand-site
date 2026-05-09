"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";

async function requireAdmin() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

export async function updateClientPermissions(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const clientId = formData.get("clientId") as string;

  // Top-level modules + platform sub-permissions (extensible for future platforms)
  const allModules = [
    "trafego", "social", "calendario", "aprovacoes",
    // Tráfego sub-platforms
    "trafego_meta", "trafego_google",
    // Future: "trafego_linkedin", "trafego_tiktok",
  ];
  const permissions = allModules.filter((m) => formData.get(`perm_${m}`) === "on");

  await supabase
    .from("clients")
    .update({ permissions })
    .eq("id", clientId);

  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin/clientes");
}

export async function updateClientContract(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const clientId = formData.get("clientId") as string;
  const contractStart = (formData.get("contract_start") as string) || null;
  const contractEnd = (formData.get("contract_end") as string) || null;
  const contractUrl = (formData.get("contract_url") as string).trim() || null;

  await supabase
    .from("clients")
    .update({
      contract_start: contractStart,
      contract_end: contractEnd,
      contract_url: contractUrl,
    })
    .eq("id", clientId);

  revalidatePath(`/admin/clientes/${clientId}`);
}

export async function updateClientNotes(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const clientId = formData.get("clientId") as string;
  const notes = formData.get("notes") as string;

  await supabase.from("clients").update({ notes }).eq("id", clientId);
  revalidatePath(`/admin/clientes/${clientId}`);
}

export async function suspendClientAction(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const clientId = formData.get("clientId") as string;
  await supabase.from("clients").update({ status: "suspended" }).eq("id", clientId);
  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin/clientes");
}

export async function reactivateClientAction(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const clientId = formData.get("clientId") as string;
  await supabase.from("clients").update({ status: "active" }).eq("id", clientId);
  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin/clientes");
}

export async function upsertTrafegoGoals(formData: FormData) {
  await requireAdmin();
  const supabase = createAdminSupabaseClient();
  const clientId = formData.get("clientId") as string;
  const year  = Number(formData.get("year"));
  const month = Number(formData.get("month"));

  const toNum = (key: string) => {
    const v = (formData.get(key) as string)?.trim();
    return v ? parseFloat(v) : null;
  };

  await supabase.from("trafego_goals").upsert(
    {
      client_id:    clientId,
      year,
      month,
      leads_meta:   toNum("leads_meta"),
      cpl_meta:     toNum("cpl_meta"),
      budget_meta:  toNum("budget_meta"),
      leads_google: toNum("leads_google"),
      cpl_google:   toNum("cpl_google"),
      budget_google: toNum("budget_google"),
      // 3-tier goals
      leads_meta_conservative:   toNum("leads_meta_conservative"),
      leads_meta_ideal:          toNum("leads_meta_ideal"),
      leads_meta_incredible:     toNum("leads_meta_incredible"),
      cpl_meta_conservative:     toNum("cpl_meta_conservative"),
      cpl_meta_ideal:            toNum("cpl_meta_ideal"),
      cpl_meta_incredible:       toNum("cpl_meta_incredible"),
      leads_google_conservative: toNum("leads_google_conservative"),
      leads_google_ideal:        toNum("leads_google_ideal"),
      leads_google_incredible:   toNum("leads_google_incredible"),
      cpl_google_conservative:   toNum("cpl_google_conservative"),
      cpl_google_ideal:          toNum("cpl_google_ideal"),
      cpl_google_incredible:     toNum("cpl_google_incredible"),
    },
    { onConflict: "client_id,year,month" }
  );

  revalidatePath(`/admin/clientes/${clientId}`);
}
