import { createServerSupabaseClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import { ReportEditor } from "./editor";

interface PageProps {
  params: { clientId: string };
}

export default async function ReportClientPage({ params }: PageProps) {
  const supabase = createServerSupabaseClient();

  const [{ data: client }, { data: reports }] = await Promise.all([
    supabase.from("clients").select("id, name, company, plan").eq("id", params.clientId).single(),
    supabase.from("client_reports").select("*").eq("client_id", params.clientId).order("year").order("month"),
  ]);

  if (!client) notFound();

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8 flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FF6100] flex items-center justify-center font-black text-white text-lg shrink-0">
            {client.company.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">{client.company}</h1>
            <p className="text-sm text-white/40">{client.name} · {client.plan ?? "Sem plano"}</p>
          </div>
        </div>
        <a
          href="/admin/relatorios"
          className="text-xs text-white/30 hover:text-white/60 transition-colors font-medium"
        >
          ← Voltar
        </a>
      </div>

      <ReportEditor
        clientId={params.clientId}
        existingReports={reports ?? []}
      />
    </div>
  );
}
