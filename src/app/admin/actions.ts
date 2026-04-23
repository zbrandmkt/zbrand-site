"use server";

import { createServerSupabaseClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

async function getAdminUser() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") {
    throw new Error("Acesso negado.");
  }
  return { supabase, user };
}

export async function approveClient(formData: FormData) {
  const { supabase, user } = await getAdminUser();

  const clientId = formData.get("clientId") as string;
  const company  = formData.get("company")  as string;
  const plan     = formData.get("plan")     as string;
  const slug     = formData.get("slug")     as string;
  const notes    = formData.get("notes")    as string;

  await supabase.from("clients").update({
    status:        "active",
    company,
    plan,
    proposal_slug: slug || null,
    notes:         notes || null,
    approved_at:   new Date().toISOString(),
    approved_by:   user.id,
  }).eq("id", clientId);

  revalidatePath("/admin");
  revalidatePath("/admin/clientes");
}

export async function suspendClient(formData: FormData) {
  const { supabase } = await getAdminUser();
  const clientId = formData.get("clientId") as string;
  await supabase.from("clients").update({ status: "suspended" }).eq("id", clientId);
  revalidatePath("/admin");
  revalidatePath("/admin/clientes");
}

export async function reactivateClient(formData: FormData) {
  const { supabase } = await getAdminUser();
  const clientId = formData.get("clientId") as string;
  await supabase.from("clients").update({ status: "active" }).eq("id", clientId);
  revalidatePath("/admin");
  revalidatePath("/admin/clientes");
}

export async function saveReport(formData: FormData) {
  const { supabase } = await getAdminUser();

  const clientId = formData.get("clientId") as string;
  const month    = parseInt(formData.get("month") as string);
  const year     = parseInt(formData.get("year") as string);
  const dataStr  = formData.get("reportData") as string;

  let reportData: unknown;
  try {
    reportData = JSON.parse(dataStr);
  } catch {
    throw new Error("Dados inválidos.");
  }

  const { error } = await supabase.from("client_reports").upsert(
    { client_id: clientId, month, year, report_data: reportData },
    { onConflict: "client_id,month,year" }
  );

  if (error) throw new Error(error.message);

  revalidatePath("/admin/relatorios");
  revalidatePath(`/admin/relatorios/${clientId}`);
  revalidatePath("/area-do-cliente/dashboard");
  revalidatePath("/area-do-cliente/dashboard/trafego");
  revalidatePath("/area-do-cliente/dashboard/social");
}
