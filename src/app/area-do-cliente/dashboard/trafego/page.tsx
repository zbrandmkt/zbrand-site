import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import TrafegoPagoPage from "./trafego-client";

export default async function TrafegoPage() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const { data: client } = await supabase
    .from("clients")
    .select("permissions")
    .eq("user_id", user.id)
    .single();

  const isAdmin = user.user_metadata?.role === "admin";
  const permissions: string[] = client?.permissions ?? ["trafego"];
  if (!isAdmin && !permissions.includes("trafego")) {
    redirect("/area-do-cliente/dashboard");
  }

  return <TrafegoPagoPage />;
}
