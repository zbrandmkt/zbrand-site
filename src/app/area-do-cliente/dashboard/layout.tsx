import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { DashboardSidebar } from "./sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  // Admins sempre têm acesso — sem verificação de status
  const isAdmin = user.user_metadata?.role === "admin";

  // Verifica se cliente está ativo
  const { data: client } = await supabase
    .from("clients")
    .select("status, name, company, plan")
    .eq("user_id", user.id)
    .single();

  if (!isAdmin && (!client || client.status !== "active")) {
    redirect("/area-do-cliente/aguardando");
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar clientName={client.name} company={client.company} />
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
