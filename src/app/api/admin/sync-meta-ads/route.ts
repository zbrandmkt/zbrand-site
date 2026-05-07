/**
 * POST /api/admin/sync-meta-ads
 * Body: { client_id: string; month: number; year: number }
 *
 * 1. Busca credenciais do cliente em client_integrations
 * 2. Chama Meta Graph API
 * 3. Salva/atualiza trafego_metrics
 * 4. Retorna as métricas salvas
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { fetchMetaInsights } from "@/lib/meta-ads";

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = createAdminSupabaseClient();

    const body = await req.json();
    const { client_id, month, year } = body as {
      client_id: string;
      month: number;
      year: number;
    };

    if (!client_id || !month || !year) {
      return NextResponse.json({ error: "Parâmetros inválidos: client_id, month e year são obrigatórios" }, { status: 400 });
    }

    // 1. Buscar credenciais
    const { data: integration, error: intErr } = await supabaseAdmin
      .from("client_integrations")
      .select("ad_account_id, access_token, status")
      .eq("client_id", client_id)
      .eq("platform", "meta_ads")
      .single();

    if (intErr || !integration) {
      return NextResponse.json({ error: "Integração Meta Ads não encontrada para este cliente" }, { status: 404 });
    }

    if (integration.status !== "active") {
      return NextResponse.json({ error: "Integração Meta Ads está inativa" }, { status: 400 });
    }

    // 2. Buscar dados da Meta Graph API
    const insights = await fetchMetaInsights(
      integration.ad_account_id,
      integration.access_token,
      month,
      year
    );

    // 3. Salvar no banco
    const { data: saved, error: saveErr } = await supabaseAdmin
      .from("trafego_metrics")
      .upsert({
        client_id,
        platform: "meta",
        month,
        year,
        spend: insights.spend,
        impressions: insights.impressions,
        reach: insights.reach,
        clicks: insights.clicks,
        leads: insights.leads,
        cpc: insights.cpc,
        cpm: insights.cpm,
        cpl: insights.cpl,
        ctr: insights.ctr,
        frequency: insights.frequency,
        campaigns: insights.campaigns,
        synced_at: new Date().toISOString(),
      }, {
        onConflict: "client_id,platform,month,year",
      })
      .select()
      .single();

    if (saveErr) {
      console.error("[sync-meta-ads] save error:", saveErr);
      return NextResponse.json({ error: "Erro ao salvar métricas no banco" }, { status: 500 });
    }

    // 4. Atualizar last_sync em client_integrations
    await supabaseAdmin
      .from("client_integrations")
      .update({ last_sync: new Date().toISOString(), last_error: null })
      .eq("client_id", client_id)
      .eq("platform", "meta_ads");

    return NextResponse.json({ success: true, data: saved, insights });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[sync-meta-ads] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
