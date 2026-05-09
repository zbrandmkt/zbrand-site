import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { getSelectedClient } from "@/lib/get-selected-client";
import { DashboardUI } from "./_dashboard-ui";
import type { WeeklyRow, MonthlyRow } from "./_components";

export default async function DashboardPage() {
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

  let weeklyData: WeeklyRow[] = [];
  let monthlyData: MonthlyRow[] = [];
  let goals: {
    leads_meta?: number | null;
    cpl_meta?: number | null;
    budget_meta?: number | null;
    leads_google?: number | null;
    cpl_google?: number | null;
    budget_google?: number | null;
    leads_meta_conservative?: number | null;
    leads_meta_ideal?: number | null;
    leads_meta_incredible?: number | null;
    cpl_meta_conservative?: number | null;
    cpl_meta_ideal?: number | null;
    cpl_meta_incredible?: number | null;
    leads_google_conservative?: number | null;
    leads_google_ideal?: number | null;
    leads_google_incredible?: number | null;
    cpl_google_conservative?: number | null;
    cpl_google_ideal?: number | null;
    cpl_google_incredible?: number | null;
  } | null = null;

  const hasTrafico = isAdmin || permissions.some(
    (p) => p === "trafego" || p.startsWith("trafego_")
  );

  if (hasTrafico && clientData?.clientId) {
    const supabaseAdmin = createAdminSupabaseClient();

    const [weeklyRes, monthlyRes, goalsRes] = await Promise.all([
      // Fetch last ~20 weeks (40 rows = 20 weeks × 2 platforms)
      supabaseAdmin
        .from("trafego_weekly")
        .select("*")
        .eq("client_id", clientData.clientId)
        .order("week_id", { ascending: false })
        .limit(40),
      // Fetch last 12 months (24 rows = 12 months × 2 platforms)
      supabaseAdmin
        .from("trafego_metrics")
        .select("*")
        .eq("client_id", clientData.clientId)
        .order("year", { ascending: false })
        .order("month", { ascending: false })
        .limit(24),
      // Current month goals
      supabaseAdmin
        .from("trafego_goals")
        .select("*")
        .eq("client_id", clientData.clientId)
        .eq("year", todayYear)
        .eq("month", todayMonth)
        .maybeSingle(),
    ]);

    weeklyData = (weeklyRes.data ?? []) as WeeklyRow[];
    monthlyData = (monthlyRes.data ?? []) as MonthlyRow[];
    goals = goalsRes.data as typeof goals;
  }

  return (
    <DashboardUI
      company={company}
      permissions={permissions}
      todayMonth={todayMonth}
      todayYear={todayYear}
      weeklyData={weeklyData}
      monthlyData={monthlyData}
      goals={goals}
    />
  );
}
