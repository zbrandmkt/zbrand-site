import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { DashboardUI } from "./_dashboard-ui";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";
  let company = "Cliente";

  if (!isAdmin) {
    const supabaseAdmin = createAdminSupabaseClient();
    const { data: link } = await supabaseAdmin
      .from("client_users")
      .select("clients(company)")
      .eq("user_id", user.id)
      .neq("status", "suspended")
      .single();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    company = (link?.clients as any)?.company ?? "Cliente";
  } else {
    company = "Admin";
  }

  return <DashboardUI company={company} />;
}
