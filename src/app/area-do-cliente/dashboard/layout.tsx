import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { getSelectedClient, getAllClientsForUser } from "@/lib/get-selected-client";
import { switchClientAction } from "./switch-client";
import { DashboardSidebar } from "./sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/area-do-cliente");

  const isAdmin = user.user_metadata?.role === "admin";

  // Busca cliente selecionado + todos os clientes do usuário
  const [clientData, allClients] = await Promise.all([
    getSelectedClient(user.id),
    getAllClientsForUser(user.id),
  ]);

  if (!isAdmin && (!clientData || clientData.status !== "active")) {
    redirect("/area-do-cliente/aguardando");
  }

  // Badge de aprovações pendentes
  let pendingCount = 0;
  if (clientData?.clientId) {
    const { count } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("client_id", clientData.clientId)
      .eq("status", "pending_approval");
    pendingCount = count ?? 0;
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar
        clientName={clientData?.name ?? "Admin"}
        company={clientData?.company ?? "ZBRAND"}
        selectedClientId={clientData?.clientId}
        allClients={allClients}
        pendingCount={pendingCount}
        permissions={clientData?.permissions ?? ["trafego", "social", "calendario", "aprovacoes"]}
        switchClient={switchClientAction}
      />
      <main className="flex-1 lg:ml-64 pt-14 lg:pt-0 min-h-screen overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
