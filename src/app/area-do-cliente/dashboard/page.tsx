import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { getSelectedClient } from "@/lib/get-selected-client";
import { DashboardUI } from "./_dashboard-ui";
import type { MetricsRow, WeeklyRow, GoalsRow } from "./_dashboard-ui";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { month?: string; year?: string };
}) {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";
  const clientData = await getSelectedClient(user.id);

  const company = clientData?.company ?? (isAdmin ? "Admin" : "Cliente");
  const permissions: string[] = isAdmin
    ? ["trafego", "trafego_meta", "trafego_google", "social", "calendario", "aprovacoes"]
    : (clientData?.permissions ?? []);

  const now = new Date();
  const todayMonth = now.getMonth() + 1;
  const todayYear = now.getFullYear();

  // Use search params if provided, otherwise default to current month
  const selectedMonth = searchParams?.month ? parseInt(searchParams.month) : todayMonth;
  const selectedYear = searchParams?.year ? parseInt(searchParams.year) : todayYear;

  // Clamp to valid month range
  const viewMonth = Math.max(1, Math.min(12, isNaN(selectedMonth) ? todayMonth : selectedMonth));
  const viewYear = isNaN(selectedYear) ? todayYear : selectedYear;

  let metaMetrics: MetricsRow | null = null;
  let googleMetrics: MetricsRow | null = null;
  let weeklyData: WeeklyRow[] = [];
  let goals: GoalsRow | null = null;

  const hasTrafico = isAdmin || permissions.some(
    (p) => p === "trafego" || p.startsWith("trafego_")
  );

  if (hasTrafico && clientData?.clientId) {
    const supabaseAdmin = createAdminSupabaseClient();

    const [metricsRes, weeklyRes, goalsRes] = await Promise.all([
      supabaseAdmin
        .from("trafego_metrics")
        .select("*")
        .eq("client_id", clientData.clientId)
        .eq("year", viewYear)
        .eq("month", viewMonth),
      supabaseAdmin
        .from("trafego_weekly")
        .select("*")
        .eq("client_id", clientData.clientId)
        .eq("year", viewYear)
        .eq("month", viewMonth)
        .order("platform")
        .order("week_number"),
      supabaseAdmin
        .from("trafego_goals")
        .select("*")
        .eq("client_id", clientData.clientId)
        .eq("year", viewYear)
        .eq("month", viewMonth)
        .maybeSingle(),
    ]);

    for (const row of metricsRes.data ?? []) {
      if (row.platform === "meta") metaMetrics = row as MetricsRow;
      if (row.platform === "google") googleMetrics = row as MetricsRow;
    }
    weeklyData = (weeklyRes.data ?? []) as WeeklyRow[];
    goals = goalsRes.data as GoalsRow | null;
  }

  return (
    <DashboardUI
      company={company}
      permissions={permissions}
      currentMonth={viewMonth}
      currentYear={viewYear}
      todayMonth={todayMonth}
      todayYear={todayYear}
      metaMetrics={metaMetrics}
      googleMetrics={googleMetrics}
      weeklyData={weeklyData}
      goals={goals}
    />
  );
}
