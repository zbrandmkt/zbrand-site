import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { getSelectedClient } from "@/lib/get-selected-client";
import MetaAdsPage from "./meta-client";

export default async function MetaAdsServerPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";
  const clientData = await getSelectedClient(user.id);

  // Access: needs "trafego" (legacy) OR "trafego_meta"
  const perms = clientData?.permissions ?? [];
  const canView = isAdmin || perms.includes("trafego") || perms.includes("trafego_meta");
  if (!canView) {
    redirect("/area-do-cliente/dashboard");
  }

  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
  const isLastDayOfMonth = now.getDate() === lastDayOfMonth;
  const maxUnlockedMonth = isLastDayOfMonth ? currentMonth + 1 : currentMonth;

  const metricsMap: Record<string, object | null> = {};
  const goalsMap: Record<string, object | null> = {};

  if (clientData?.clientId) {
    const supabaseAdmin = createAdminSupabaseClient();

    const [{ data: allMetrics }, { data: allGoals }] = await Promise.all([
      supabaseAdmin
        .from("trafego_metrics")
        .select("*")
        .eq("client_id", clientData.clientId)
        .eq("platform", "meta")
        .eq("year", currentYear),
      supabaseAdmin
        .from("trafego_goals")
        .select("month, leads_meta, cpl_meta, budget_meta")
        .eq("client_id", clientData.clientId)
        .eq("year", currentYear),
    ]);

    for (const row of allMetrics ?? []) {
      metricsMap[row.month] = row;
    }
    for (const row of allGoals ?? []) {
      goalsMap[row.month] = row;
    }
  }

  return (
    <MetaAdsPage
      metricsMap={metricsMap}
      goalsMap={goalsMap}
      currentMonth={currentMonth}
      currentYear={currentYear}
      maxUnlockedMonth={maxUnlockedMonth}
    />
  );
}
