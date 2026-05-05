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

  // Verifica se cliente está ativo via junction table client_users
  const { data: link } = await supabase
    .from("client_users")
    .select("name, status, client_id, clients(status, company, plan, permissions)")
    .eq("user_id", user.id)
    .eq("status", "active")
    .single();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const linkedCompany = (link?.clients as any) ?? null;

  const clientData = link
    ? {
        id: link.client_id as string,
        name: link.name as string,
        status: linkedCompany?.status as string | undefined,
        company: linkedCompany?.company as string | undefined,
        plan: linkedCompany?.plan as string | undefined,
        permissions: linkedCompany?.permissions as string[] | undefined,
      }
    : null;

  if (!isAdmin && (!clientData || clientData.status !== "active")) {
    redirect("/area-do-cliente/aguardando");
  }

  // Badge de aprovações pendentes
  let pendingCount = 0;
  if (link?.client_id) {
    const { count } = await supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("client_id", link.client_id)
      .eq("status", "pending_approval");
    pendingCount = count ?? 0;
  }

  return (
    <div className="flex min-h-screen bg-[#F5F5F0]">
      <DashboardSidebar
        clientName={clientData?.name ?? "Admin"}
        company={clientData?.company ?? "ZBRAND"}
        pendingCount={pendingCount}
        permissions={(clientData?.permissions as string[] | undefined) ?? ["trafego", "social", "calendario", "aprovacoes"]}
      />
      <main className="flex-1 ml-64 min-h-screen">
        {children}
      </main>
    </div>
  );
}
