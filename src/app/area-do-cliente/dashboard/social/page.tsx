import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import SocialMediaPage from "./social-client";

export default async function SocialPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const { data: client } = await supabase
    .from("clients")
    .select("permissions")
    .eq("user_id", user.id)
    .single();

  const isAdmin = user.user_metadata?.role === "admin";
  const permissions: string[] = client?.permissions ?? ["social"];
  if (!isAdmin && !permissions.includes("social")) {
    redirect("/area-do-cliente/dashboard");
  }

  return <SocialMediaPage />;
}
