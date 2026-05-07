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

  const now = new Date();
  const currentMonth = now.getMonth() + 1; // 1–12
  const currentYear = now.getFullYear();

  // Next month unlocks on the last day of the current month
  const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
  const isLastDayOfMonth = now.getDate() === lastDayOfMonth;
  const maxUnlockedMonth = isLastDayOfMonth ? currentMonth + 1 : currentMonth;

  // Platform permissions are always based on the CLIENT's permissions,
  // never on isAdmin — the dashboard must reflect what the client contracted.
  // Backward compat: old clients with only "trafego" (no sub-perms) get Meta by default.
  const perms = clientData?.permissions ?? [];
  const hasAnyPlatformPerm = perms.some((p: string) => p.startsWith("trafego_"));
  const hasMetaAds  = hasAnyPlatformPerm ? perms.includes("trafego_meta") : true;
  const hasGoogleAds = perms.includes("trafego_google");

  const metricsMap: Record<string, object | null> = {};
  const goalsMap: Record<string, object | null> = {};

  if (clientData?.clientId) {
    const supabaseAdmin = createAdminSupabaseClient();

    // Fetch all trafego_metrics + goals for this year
    const [{ data: allMetrics }, { data: allGoals }] = await Promise.all([
      supabaseAdmin
        .from("trafego_metrics")
        .select("*")
        .eq("client_id", clientData.clientId)
        .eq("year", currentYear),
      supabaseAdmin
        .from("trafego_goals")
        .select("month, leads_meta, cpl_meta, budget_meta, leads_google, cpl_google, budget_google")
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
    <TrafegoPagoPage
      metricsMap={metricsMap}
      goalsMap={goalsMap}
      currentMonth={currentMonth}
      currentYear={currentYear}
      maxUnlockedMonth={maxUnlockedMonth}
      hasMetaAds={hasMetaAds}
      hasGoogleAds={hasGoogleAds}
    />
  );
}
