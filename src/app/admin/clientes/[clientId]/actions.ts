"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase-server";

async function requireAdmin() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return supabase;
}

export async function updateClientPermissions(formData: FormData) {
  const supabase = await requireAdmin();
  const clientId = formData.get("clientId") as string;

  const modules = ["trafego", "social", "calendario", "aprovacoes"];
  const permissions = modules.filter((m) => formData.get(`perm_${m}`) === "on");

  await supabase
    .from("clients")
    .update({ permissions })
    .eq("id", clientId);

  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin/clientes");
}

export async function updateClientContract(formData: FormData) {
  const supabase = await requireAdmin();
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
  const supabase = await requireAdmin();
  const clientId = formData.get("clientId") as string;
  const notes = formData.get("notes") as string;

  await supabase.from("clients").update({ notes }).eq("id", clientId);
  revalidatePath(`/admin/clientes/${clientId}`);
}

export async function suspendClientAction(formData: FormData) {
  const supabase = await requireAdmin();
  const clientId = formData.get("clientId") as string;
  await supabase.from("clients").update({ status: "suspended" }).eq("id", clientId);
  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin/clientes");
}

export async function reactivateClientAction(formData: FormData) {
  const supabase = await requireAdmin();
  const clientId = formData.get("clientId") as string;
  await supabase.from("clients").update({ status: "active" }).eq("id", clientId);
  revalidatePath(`/admin/clientes/${clientId}`);
  revalidatePath("/admin/clientes");
}
