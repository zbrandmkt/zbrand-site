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

  // Calculate previous month for MoM comparison
  let prevMonth = viewMonth - 1;
  let prevYear = viewYear;
  if (prevMonth < 1) {
    prevMonth = 12;
    prevYear -= 1;
  }

  let metaMetrics: MetricsRow | null = null;
  let googleMetrics: MetricsRow | null = null;
  let weeklyData: WeeklyRow[] = [];
  let goals: GoalsRow | null = null;
  let prevMetaMetrics: MetricsRow | null = null;
  let prevGoogleMetrics: MetricsRow | null = null;

  const hasTrafico = isAdmin || permissions.some(
    (p) => p === "trafego" || p.startsWith("trafego_")
  );

  if (hasTrafico && clientData?.clientId) {
    const supabaseAdmin = createAdminSupabaseClient();

    const [metricsRes, weeklyRes, goalsRes, prevMetricsRes] = await Promise.all([
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
      // Fetch previous month metrics for MoM deltas
      supabaseAdmin
        .from("trafego_metrics")
        .select("*")
        .eq("client_id", clientData.clientId)
        .eq("year", prevYear)
        .eq("month", prevMonth),
    ]);

    for (const row of metricsRes.data ?? []) {
      if (row.platform === "meta") metaMetrics = row as MetricsRow;
      if (row.platform === "google") googleMetrics = row as MetricsRow;
    }
    weeklyData = (weeklyRes.data ?? []) as WeeklyRow[];
    goals = goalsRes.data as GoalsRow | null;

    // Previous month metrics for MoM comparison
    for (const row of prevMetricsRes.data ?? []) {
      if (row.platform === "meta") prevMetaMetrics = row as MetricsRow;
      if (row.platform === "google") prevGoogleMetrics = row as MetricsRow;
    }
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
      prevMetaMetrics={prevMetaMetrics}
      prevGoogleMetrics={prevGoogleMetrics}
    />
  );
}
