import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import SocialMediaPage from "./social-client";

export default async function SocialPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";

  const supabaseAdmin = createAdminSupabaseClient();
  const { data: link } = await supabaseAdmin
    .from("client_users")
    .select("client_id, clients(permissions)")
    .eq("user_id", user.id)
    .neq("status", "suspended")
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const permissions: string[] = (link?.clients as any)?.permissions ?? ["social"];
  if (!isAdmin && !permissions.includes("social")) {
    redirect("/area-do-cliente/dashboard");
  }

  return <SocialMediaPage />;
}
