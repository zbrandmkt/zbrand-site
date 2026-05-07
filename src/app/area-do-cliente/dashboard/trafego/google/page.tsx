import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { getSelectedClient } from "@/lib/get-selected-client";
import GoogleAdsPage from "./google-client";

export default async function GoogleAdsServerPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";
  const clientData = await getSelectedClient(user.id);

  // Access: needs explicit "trafego_google" permission
  const perms = clientData?.permissions ?? [];
  const canView = isAdmin || perms.includes("trafego_google");
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
        .eq("platform", "google")
        .eq("year", currentYear),
      supabaseAdmin
        .from("trafego_goals")
        .select("month, leads_google, cpl_google, budget_google")
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
    <GoogleAdsPage
      metricsMap={metricsMap}
      goalsMap={goalsMap}
      currentMonth={currentMonth}
      currentYear={currentYear}
      maxUnlockedMonth={maxUnlockedMonth}
    />
  );
}
