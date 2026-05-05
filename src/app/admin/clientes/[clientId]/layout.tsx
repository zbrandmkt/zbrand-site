import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { ClientPanelSidebar } from "./client-panel-sidebar";

export default async function ClientPanelLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { clientId: string };
}) {
  const supabase = createServerSupabaseClient();

  const { data: client } = await supabase
    .from("clients")
    .select("id, company, plan, status")
    .eq("id", params.clientId)
    .single();

  if (!client) notFound();

  return (
    <div className="flex min-h-screen">
      <ClientPanelSidebar
        clientId={client.id}
        company={client.company}
        plan={client.plan ?? null}
        status={client.status}
      />
      <main className="flex-1 min-h-screen bg-[#f5f5f0] overflow-auto">
        {children}
      </main>
    </div>
  );
}
