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
    .select("status, name, company, plan, id")
    .eq("user_id", user.id)
    .single();

  if (!isAdmin && (!client || client.status !== "active")) {
    redirect("/area-do-cliente/aguardando");
  }

  // Badge de aprovações pendentes
  let pendingCount = 0;
  if (client?.id) {
    const { count } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("client_id", client.id)
      .eq("status", "pending_approval");
    pendingCount = count ?? 0;
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar clientName={client?.name ?? "Admin"} company={client?.company ?? "ZBRAND"} pendingCount={pendingCount} />
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
