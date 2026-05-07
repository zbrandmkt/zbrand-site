/**
 * Meta Ads Graph API — helper para buscar métricas de uma conta de anúncios.
 * Documentação: https://developers.facebook.com/docs/marketing-api/insights
 */

const GRAPH_BASE = "https://graph.facebook.com/v20.0";

// ─── Tipos de conversão monitorados ──────────────────────────
// O Meta Ads usa action_types diferentes por objetivo de campanha.
// Somamos todos para obter o "Resultado Total" da conta.
const RESULT_ACTION_TYPES = [
  "lead",                                                 // Leads (formulário)
  "onsite_conversion.messaging_conversation_started_7d",  // Conversas iniciadas (7 dias)
  "onsite_conversion.messaging_first_reply",              // Primeiro resposta WhatsApp/Messenger
  "offsite_conversion.fb_pixel_lead",                     // Leads via pixel no site
  "contact_total",                                        // Contatos totais
  "onsite_conversion.lead_grouped",                       // Leads agrupados (Meta)
];

// Labels amigáveis por action_type
export const ACTION_TYPE_LABELS: Record<string, string> = {
  "lead": "Formulário",
  "onsite_conversion.messaging_conversation_started_7d": "Conversa",
  "onsite_conversion.messaging_first_reply": "1ª Resposta",
  "offsite_conversion.fb_pixel_lead": "Pixel",
  "contact_total": "Contato",
  "onsite_conversion.lead_grouped": "Lead",
};

export interface MetaInsights {
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  leads: number;          // Total de resultados (todos os tipos somados)
  cpc: number;
  cpm: number;
  cpl: number;            // Custo por resultado (spend / leads)
  ctr: number;
  frequency: number;
  campaigns: MetaCampaignInsight[];
}

export interface MetaCampaignInsight {
  campaign_id: string;
  campaign_name: string;
  spend: number;
  impressions: number;
  clicks: number;
  leads: number;           // Resultados desta campanha (tipo primário)
  result_type: string;     // Ex: "Formulário", "Conversa", etc.
  cpc: number;
  cpl: number;
}

interface RawInsight {
  spend?: string;
  impressions?: string;
  reach?: string;
  clicks?: string;
  cpc?: string;
  cpm?: string;
  ctr?: string;
  frequency?: string;
  actions?: { action_type: string; value: string }[];
  cost_per_action_type?: { action_type: string; value: string }[];
  campaign_id?: string;
  campaign_name?: string;
}

function parseNum(v: string | undefined): number {
  return v ? parseFloat(v) : 0;
}

/** Soma todos os tipos de conversão relevantes */
function sumAllResults(
  actions: { action_type: string; value: string }[] | undefined
): number {
  if (!actions) return 0;
  return RESULT_ACTION_TYPES.reduce((sum, type) => {
    return sum + parseNum(actions.find((a) => a.action_type === type)?.value);
  }, 0);
}

/**
 * Identifica o tipo de resultado primário de uma campanha
 * (o action_type com maior valor) e retorna label amigável.
 */
function primaryResultType(
  actions: { action_type: string; value: string }[] | undefined
): { type: string; label: string; count: number } {
  if (!actions) return { type: "lead", label: "Formulário", count: 0 };

  let best = { type: "lead", label: "Formulário", count: 0 };
  for (const actionType of RESULT_ACTION_TYPES) {
    const count = parseNum(actions.find((a) => a.action_type === actionType)?.value);
    if (count > best.count) {
      best = {
        type: actionType,
        label: ACTION_TYPE_LABELS[actionType] ?? actionType,
        count,
      };
    }
  }
  return best;
}

/**
 * Custo por resultado: busca o cost_per_action_type do tipo primário.
 * Se não encontrar, calcula manualmente (spend / results).
 */
function primaryCpl(
  costPerAction: { action_type: string; value: string }[] | undefined,
  primaryType: string,
  spend: number,
  results: number
): number {
  const fromApi = parseNum(costPerAction?.find((a) => a.action_type === primaryType)?.value);
  if (fromApi > 0) return fromApi;
  if (results > 0) return spend / results;
  return 0;
}

/**
 * Busca métricas do Meta Ads para um mês/ano específico.
 * @param adAccountId — ID da conta sem "act_" prefix (ex: "964840479648918")
 * @param accessToken — System User token permanente
 * @param month       — 1–12
 * @param year        — ex: 2026
 */
export async function fetchMetaInsights(
  adAccountId: string,
  accessToken: string,
  month: number,
  year: number
): Promise<MetaInsights> {
  // Range: primeiro e último dia do mês
  const since = `${year}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const until = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  const fields = [
    "spend",
    "impressions",
    "reach",
    "clicks",
    "cpc",
    "cpm",
    "ctr",
    "frequency",
    "actions",
    "cost_per_action_type",
  ].join(",");

  // 1. Insights totais da conta
  const accountUrl = new URL(`${GRAPH_BASE}/act_${adAccountId}/insights`);
  accountUrl.searchParams.set("access_token", accessToken);
  accountUrl.searchParams.set("time_range", JSON.stringify({ since, until }));
  accountUrl.searchParams.set("fields", fields);
  accountUrl.searchParams.set("level", "account");

  const accountRes = await fetch(accountUrl.toString());
  if (!accountRes.ok) {
    const err = await accountRes.text();
    throw new Error(`Meta API error (account insights): ${err}`);
  }
  const accountJson = await accountRes.json();
  const raw: RawInsight = accountJson.data?.[0] ?? {};

  // Soma todos os tipos de resultado
  const totalResults = sumAllResults(raw.actions);
  const spend = parseNum(raw.spend);
  const cpl = totalResults > 0 ? spend / totalResults : 0;

  // 2. Insights por campanha
  const campaignUrl = new URL(`${GRAPH_BASE}/act_${adAccountId}/insights`);
  campaignUrl.searchParams.set("access_token", accessToken);
  campaignUrl.searchParams.set("time_range", JSON.stringify({ since, until }));
  campaignUrl.searchParams.set(
    "fields",
    "campaign_id,campaign_name,spend,impressions,clicks,actions,cost_per_action_type,cpc"
  );
  campaignUrl.searchParams.set("level", "campaign");

  const campaignRes = await fetch(campaignUrl.toString());
  const campaignJson = campaignRes.ok ? await campaignRes.json() : { data: [] };

  const campaigns: MetaCampaignInsight[] = (campaignJson.data ?? []).map((c: RawInsight) => {
    const campSpend = parseNum(c.spend);
    const primary = primaryResultType(c.actions);
    const campCpl = primaryCpl(c.cost_per_action_type, primary.type, campSpend, primary.count);

    return {
      campaign_id: c.campaign_id ?? "",
      campaign_name: c.campaign_name ?? "",
      spend: campSpend,
      impressions: parseNum(c.impressions),
      clicks: parseNum(c.clicks),
      leads: primary.count,
      result_type: primary.label,
      cpc: parseNum(c.cpc),
      cpl: campCpl,
    };
  });

  return {
    spend,
    impressions: parseNum(raw.impressions),
    reach: parseNum(raw.reach),
    clicks: parseNum(raw.clicks),
    leads: totalResults,
    cpc: parseNum(raw.cpc),
    cpm: parseNum(raw.cpm),
    cpl,
    ctr: parseNum(raw.ctr),
    frequency: parseNum(raw.frequency),
    campaigns,
  };
}
