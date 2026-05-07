import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { WeeklyActionEditor } from "./weekly-action-editor";

interface Props {
  params: { clientId: string };
  searchParams: { month?: string; year?: string };
}

function monthName(month: number): string {
  const names = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  return names[month - 1] ?? "";
}
function fmtDate(dateStr: string): string {
  if (!dateStr) return "—";
  const parts = dateStr.split("-");
  if (parts.length < 3) return dateStr;
  return `${parts[2]}/${parts[1]}`;
}
function fmt(value: number | null | undefined): string {
  if (!value) return "—";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
function fmtNum(value: number | null | undefined): string {
  if (!value && value !== 0) return "—";
  return value.toLocaleString("pt-BR");
}

export default async function AdminTrafegoPage({ params, searchParams }: Props) {
  const supabase = createAdminSupabaseClient();
  const now = new Date();
  const currentMonth = parseInt(searchParams.month ?? String(now.getMonth() + 1));
  const currentYear = parseInt(searchParams.year ?? String(now.getFullYear()));

  // Fetch weekly data for both platforms
  const { data: weeklyData } = await supabase
    .from("trafego_weekly")
    .select("*")
    .eq("client_id", params.clientId)
    .eq("year", currentYear)
    .eq("month", currentMonth)
    .order("platform")
    .order("week_number");

  // Group by week_number
  type WeekRow = {
    id: string;
    week_number: number;
    date_start: string;
    date_end: string;
    platform: "meta" | "google";
    spend: number;
    impressions: number;
    reach?: number;
    clicks: number;
    cpc: number;
    leads_whatsapp?: number;
    leads_form?: number;
    leads_total?: number;
    cpl_total?: number;
    balance?: number;
    action_text?: string | null;
  };

  const allWeeks: WeekRow[] = (weeklyData ?? []) as WeekRow[];
  const weekMap: Record<number, { meta?: WeekRow; google?: WeekRow }> = {};
  for (const row of allWeeks) {
    const wn = row.week_number;
    if (!weekMap[wn]) weekMap[wn] = {};
    if (row.platform === "meta") weekMap[wn].meta = row;
    if (row.platform === "google") weekMap[wn].google = row;
  }
  const sortedWeeks = Object.keys(weekMap).map(Number).sort((a, b) => a - b);

  // Month navigation: previous and next months
  const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1;
  const nextYear = currentMonth === 12 ? currentYear + 1 : currentYear;

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#1A1A1A] uppercase tracking-tight">
            Tráfego Pago
          </h1>
          <p className="text-sm text-[#1A1A1A]/40 mt-0.5">
            Editar Ação da Semana — dados sincronizados via API
          </p>
        </div>

        {/* Month selector */}
        <div className="flex items-center gap-2">
          <a
            href={`?month=${prevMonth}&year=${prevYear}`}
            className="w-8 h-8 flex items-center justify-center border-2 border-[#1A1A1A] rounded-xl hover:bg-[#1A1A1A] hover:text-white transition-all text-[#1A1A1A]"
            style={{ boxShadow: "2px 2px 0px 0px #1A1A1A" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <span className="text-sm font-black text-[#1A1A1A] uppercase tracking-wider min-w-[120px] text-center">
            {monthName(currentMonth)} {currentYear}
          </span>
          <a
            href={`?month=${nextMonth}&year=${nextYear}`}
            className="w-8 h-8 flex items-center justify-center border-2 border-[#1A1A1A] rounded-xl hover:bg-[#1A1A1A] hover:text-white transition-all text-[#1A1A1A]"
            style={{ boxShadow: "2px 2px 0px 0px #1A1A1A" }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {sortedWeeks.length === 0 ? (
        <div className="bg-white border-2 border-[#1A1A1A]/10 rounded-2xl p-12 flex flex-col items-center gap-4 text-center">
          <span className="text-4xl opacity-30">📅</span>
          <div>
            <p className="text-sm font-black text-[#1A1A1A]">Nenhuma semana sincronizada</p>
            <p className="text-xs text-[#1A1A1A]/40 mt-1">
              Execute o sync de Meta Ads para {monthName(currentMonth)} {currentYear} para ver os dados semanais aqui.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {sortedWeeks.map((wn) => {
            const { meta, google } = weekMap[wn];
            const dateStart = meta?.date_start ?? google?.date_start ?? "";
            const dateEnd = meta?.date_end ?? google?.date_end ?? "";
            const actionId = meta?.id ?? google?.id ?? "";
            const currentAction = meta?.action_text ?? google?.action_text ?? "";

            return (
              <div
                key={wn}
                className="bg-white border-2 border-[#1A1A1A] rounded-2xl overflow-hidden"
                style={{ boxShadow: "4px 4px 0px 0px #1A1A1A" }}
              >
                {/* Week header */}
                <div className="px-6 py-4 border-b border-[#1A1A1A]/10 bg-[#F5F5F0] flex items-center gap-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#1A1A1A]/40">Semana {wn}</p>
                    <p className="text-sm font-black text-[#1A1A1A]">
                      {fmtDate(dateStart)} a {fmtDate(dateEnd)}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-auto">
                    {meta && (
                      <span className="text-[9px] font-black uppercase tracking-widest bg-[#1877F2] text-white px-2.5 py-1 rounded-full">
                        Meta Ads
                      </span>
                    )}
                    {google && (
                      <span className="text-[9px] font-black uppercase tracking-widest bg-[#FBBC05] text-[#1A1A1A] px-2.5 py-1 rounded-full">
                        Google Ads
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Meta metrics */}
                  {meta && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <img src="/images/icon_metaads.png" alt="Meta" className="w-4 h-4 object-contain" />
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#1877F2]">Meta Ads</p>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        <StatRow label="Investimento" value={fmt(meta.spend)} />
                        <StatRow label="Impressões" value={fmtNum(meta.impressions)} />
                        <StatRow label="Alcance" value={meta.reach ? fmtNum(meta.reach) : "—"} />
                        <StatRow label="Cliques" value={fmtNum(meta.clicks)} />
                        <StatRow label="CPC" value={fmt(meta.cpc)} />
                        <StatRow label="WhatsApp" value={fmtNum(meta.leads_whatsapp)} />
                        <StatRow label="Formulário" value={fmtNum(meta.leads_form)} />
                        <StatRow label="Total Leads" value={fmtNum(meta.leads_total)} bold />
                        <StatRow label="CPL" value={fmt(meta.cpl_total)} bold />
                      </div>
                    </div>
                  )}

                  {/* Google metrics */}
                  {google && (
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <img src="/images/icon_googleads.webp" alt="Google" className="w-4 h-4 object-contain" />
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#EA8600]">Google Ads</p>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        <StatRow label="Investimento" value={fmt(google.spend)} />
                        <StatRow label="Impressões" value={fmtNum(google.impressions)} />
                        <StatRow label="Cliques" value={fmtNum(google.clicks)} />
                        <StatRow label="CPC" value={fmt(google.cpc)} />
                        <StatRow label="Conversões" value={fmtNum(google.leads_total)} bold />
                        <StatRow label="CPL" value={fmt(google.cpl_total)} bold />
                        {(google.balance ?? 0) > 0 && (
                          <StatRow label="Saldo Conta" value={fmt(google.balance)} />
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action text editor */}
                  <div className={!meta && !google ? "lg:col-span-3" : meta && google ? "" : "lg:col-span-1"}>
                    <WeeklyActionEditor
                      weekId={actionId}
                      initialText={currentAction ?? ""}
                      clientId={params.clientId}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function StatRow({ label, value, bold = false }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-1">
      <span className="text-[10px] text-[#1A1A1A]/40 font-medium">{label}</span>
      <span className={`text-[10px] text-right ${bold ? "font-black text-[#1A1A1A]" : "font-bold text-[#1A1A1A]/60"}`}>{value}</span>
    </div>
  );
}
