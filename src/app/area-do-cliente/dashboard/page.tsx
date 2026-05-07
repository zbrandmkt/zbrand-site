import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getSelectedClient } from "@/lib/get-selected-client";
import { DashboardUI } from "./_dashboard-ui";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";
  const clientData = await getSelectedClient(user.id);

  const company = clientData?.company ?? (isAdmin ? "Admin" : "Cliente");
  const permissions = isAdmin
    ? ["trafego", "social", "calendario", "aprovacoes"]
    : (clientData?.permissions ?? []);

  return <DashboardUI company={company} permissions={permissions} />;
}
