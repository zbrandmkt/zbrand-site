import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getSelectedClient } from "@/lib/get-selected-client";
import SocialMediaPage from "./social-client";

export default async function SocialPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";
  const clientData = await getSelectedClient(user.id);

  if (!isAdmin && !clientData?.permissions?.includes("social")) {
    redirect("/area-do-cliente/dashboard");
  }

  return <SocialMediaPage />;
}
