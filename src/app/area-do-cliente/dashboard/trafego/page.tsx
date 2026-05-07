import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { getSelectedClient } from "@/lib/get-selected-client";
import TrafegoPagoPage from "./trafego-client";

export default async function TrafegoPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";
  const clientData = await getSelectedClient(user.id);

  if (!isAdmin && !clientData?.permissions?.includes("trafego")) {
    redirect("/area-do-cliente/dashboard");
  }

  // Buscar métricas do mês atual
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  let metrics = null;
  if (clientData?.clientId) {
    const supabaseAdmin = createAdminSupabaseClient();
    const { data } = await supabaseAdmin
      .from("trafego_metrics")
      .select("*")
      .eq("client_id", clientData.clientId)
      .eq("platform", "meta")
      .eq("month", month)
      .eq("year", year)
      .single();
    metrics = data;
  }

  return <TrafegoPagoPage metrics={metrics} />;
}
