import { createServerSupabaseClient } from "@/lib/supabase-server";
import { SiteHealthDashboard, ReCheckButton } from "./site-health-client";
import type { HealthCheckResult } from "@/lib/site-health";

export const dynamic = "force-dynamic";

export default async function AdminSitePage() {
  const supabase = createServerSupabaseClient();

  const { data: latest } = await supabase
    .from("site_health_results")
    .select("*")
    .order("checked_at", { ascending: false })
    .limit(1)
    .single();

  // Se ainda não tem nenhum resultado salvo, exibe tela de primeiro uso
  if (!latest) {
    return (
      <div className="px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Saúde do Site</h1>
          <p className="text-sm text-[#1A1A1A]/40 mt-1">
            Verificação automática de integrações, SEO, páginas e performance.
          </p>
        </div>

        <div
          className="bg-white border-2 border-[#1A1A1A] rounded-2xl p-12 text-center"
          style={{ boxShadow: "5px 5px 0px 0px #FF6100" }}
        >
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-black text-xl text-[#1A1A1A] tracking-tight mb-2">
            Nenhuma verificação realizada ainda
          </h2>
          <p className="text-sm text-[#1A1A1A]/40 font-medium mb-6 max-w-sm mx-auto">
            Clique no botão abaixo para rodar a primeira verificação do site.
            Leva cerca de 10–30 segundos.
          </p>
          <ReCheckButton />
        </div>
      </div>
    );
  }

  const result = latest.results as unknown as HealthCheckResult;

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#1A1A1A] tracking-tight">Saúde do Site</h1>
        <p className="text-sm text-[#1A1A1A]/40 mt-1">
          Verificação automática de integrações, SEO, páginas e performance.
        </p>
      </div>

      <SiteHealthDashboard
        data={result}
        checkedAt={latest.checked_at}
        score={latest.score}
      />
    </div>
  );
}
