import { notFound } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { ReportEditor } from "@/app/admin/relatorios/[clientId]/editor";

interface Props {
  params: { clientId: string };
}

export default async function ClientRelatoriosPage({ params }: Props) {
  const supabase = createServerSupabaseClient();

  const [{ data: client }, { data: reports }] = await Promise.all([
    supabase.from("clients").select("id, company, plan").eq("id", params.clientId).single(),
    supabase
      .from("client_reports")
      .select("*")
      .eq("client_id", params.clientId)
      .order("year")
      .order("month"),
  ]);

  if (!client) notFound();

  return (
    <div className="px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Relatórios</h1>
        <p className="text-sm text-[#1A1A1A]/40 mt-1">
          {client.company} · {client.plan ?? "Sem plano"}
        </p>
      </div>

      <ReportEditor clientId={params.clientId} existingReports={reports ?? []} />
    </div>
  );
}
