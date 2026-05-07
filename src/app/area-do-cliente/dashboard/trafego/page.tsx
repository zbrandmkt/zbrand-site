import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import TrafegoPagoPage from "./trafego-client";

export default async function TrafegoPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";

  const supabaseAdmin = createAdminSupabaseClient();

  // Buscar client_id e permissões
  const { data: link } = await supabaseAdmin
    .from("client_users")
    .select("client_id, clients(permissions)")
    .eq("user_id", user.id)
    .neq("status", "suspended")
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const permissions: string[] = (link?.clients as any)?.permissions ?? ["trafego"];
  if (!isAdmin && !permissions.includes("trafego")) {
    redirect("/area-do-cliente/dashboard");
  }

  const clientId = link?.client_id;

  // Buscar métricas do mês atual
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  let metrics = null;
  if (clientId) {
    const { data } = await supabaseAdmin
      .from("trafego_metrics")
      .select("*")
      .eq("client_id", clientId)
      .eq("platform", "meta")
      .eq("month", month)
      .eq("year", year)
      .single();
    metrics = data;
  }

  return <TrafegoPagoPage metrics={metrics} />;
}
