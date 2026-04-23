import { createServerSupabaseClient } from "@/lib/supabase-server";

interface Lead {
  id: string;
  name: string | null;
  whatsapp: string | null;
  services: string | null;
  business_type: string | null;
  message: string | null;
  created_at: string;
}

export default async function LeadsPage() {
  const supabase = createServerSupabaseClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const allLeads = (leads ?? []) as Lead[];

  return (
    <div className="px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white tracking-tight">Leads do site</h1>
        <p className="text-sm text-white/40 mt-1">{allLeads.length} leads captados pelo formulário</p>
      </div>

      {allLeads.length === 0 ? (
        <div className="bg-white/04 border border-white/08 rounded-2xl px-5 py-16 text-center">
          <p className="text-3xl mb-3">📭</p>
          <p className="text-sm text-white/30 font-medium">Nenhum lead captado ainda.</p>
          <p className="text-xs text-white/20 mt-1">Os leads aparecerão aqui quando alguém preencher o formulário do site.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {allLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white border-2 border-[#1A1A1A] rounded-2xl px-5 py-4 grid grid-cols-1 sm:grid-cols-4 gap-4"
              style={{ boxShadow: "3px 3px 0px 0px #7B2FF7" }}
            >
              {/* Nome + contato */}
              <div>
                <p className="font-black text-[#1A1A1A]">{lead.name ?? "—"}</p>
                {lead.whatsapp && (
                  <a
                    href={`https://wa.me/55${lead.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    className="text-xs text-[#25D366] font-bold hover:underline"
                  >
                    📱 {lead.whatsapp}
                  </a>
                )}
                <p className="text-[10px] text-[#1A1A1A]/30 mt-1">
                  {new Date(lead.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>

              {/* Tipo de negócio */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">Negócio</p>
                <p className="text-sm text-[#1A1A1A]/70 font-medium">{lead.business_type ?? "—"}</p>
              </div>

              {/* Serviços */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">Serviços</p>
                <div className="flex flex-wrap gap-1">
                  {lead.services
                    ? lead.services.split(",").map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-bold px-2 py-0.5 bg-[#FF6100]/10 text-[#FF6100] rounded-full border border-[#FF6100]/20"
                        >
                          {s.trim()}
                        </span>
                      ))
                    : <span className="text-xs text-[#1A1A1A]/40">—</span>
                  }
                </div>
              </div>

              {/* Mensagem */}
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A]/40 mb-1">Mensagem</p>
                <p className="text-xs text-[#1A1A1A]/60 line-clamp-3">{lead.message ?? "—"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
