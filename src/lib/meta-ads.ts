/**
 * Meta Ads Graph API — helper para buscar métricas de uma conta de anúncios.
 * Documentação: https://developers.facebook.com/docs/marketing-api/insights
 */

const GRAPH_BASE = "https://graph.facebook.com/v20.0";

export interface MetaInsights {
  spend: number;
  impressions: number;
  reach: number;
  clicks: number;
  leads: number;
  cpc: number;
  cpm: number;
  cpl: number;
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
  leads: number;
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

function extractAction(actions: { action_type: string; value: string }[] | undefined, type: string): number {
  return parseNum(actions?.find((a) => a.action_type === type)?.value);
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

  const leads = extractAction(raw.actions, "lead");
  const cpl = extractAction(raw.cost_per_action_type, "lead");

  // 2. Insights por campanha
  const campaignUrl = new URL(`${GRAPH_BASE}/act_${adAccountId}/insights`);
  campaignUrl.searchParams.set("access_token", accessToken);
  campaignUrl.searchParams.set("time_range", JSON.stringify({ since, until }));
  campaignUrl.searchParams.set("fields", "campaign_id,campaign_name,spend,impressions,clicks,actions,cost_per_action_type,cpc");
  campaignUrl.searchParams.set("level", "campaign");

  const campaignRes = await fetch(campaignUrl.toString());
  const campaignJson = campaignRes.ok ? await campaignRes.json() : { data: [] };

  const campaigns: MetaCampaignInsight[] = (campaignJson.data ?? []).map((c: RawInsight) => ({
    campaign_id: c.campaign_id ?? "",
    campaign_name: c.campaign_name ?? "",
    spend: parseNum(c.spend),
    impressions: parseNum(c.impressions),
    clicks: parseNum(c.clicks),
    leads: extractAction(c.actions, "lead"),
    cpc: parseNum(c.cpc),
    cpl: extractAction(c.cost_per_action_type, "lead"),
  }));

  return {
    spend: parseNum(raw.spend),
    impressions: parseNum(raw.impressions),
    reach: parseNum(raw.reach),
    clicks: parseNum(raw.clicks),
    leads,
    cpc: parseNum(raw.cpc),
    cpm: parseNum(raw.cpm),
    cpl,
    ctr: parseNum(raw.ctr),
    frequency: parseNum(raw.frequency),
    campaigns,
  };
}
