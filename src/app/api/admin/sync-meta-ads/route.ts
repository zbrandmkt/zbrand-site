/**
 * POST /api/admin/sync-meta-ads
 * Body: { client_id: string; month: number; year: number }
 *
 * 1. Busca credenciais do cliente em client_integrations
 * 2. Chama Meta Graph API para métricas + top ads com thumbnails
 * 3. Tenta salvar thumbnails no Supabase Storage (URL permanente)
 *    — se falhar, usa a URL do Meta CDN diretamente (scontent.fbcdn.net)
 * 4. Salva/atualiza trafego_metrics
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminSupabaseClient } from "@/lib/supabase-admin";
import { fetchMetaInsights, fetchTopAds, fetchMetaWeeklyInsights, MetaTopAd } from "@/lib/meta-ads";

/** Tenta copiar thumbnail para Supabase Storage. Se falhar, retorna a URL original. */
async function persistThumbnail(
  supabaseAdmin: ReturnType<typeof createAdminSupabaseClient>,
  ad: MetaTopAd,
  clientId: string,
  year: number,
  month: number
): Promise<string | undefined> {
  const metaUrl = ad.thumbnail_url;
  if (!metaUrl) return undefined;

  try {
    // Tentar download da Meta CDN
    const imgRes = await fetch(metaUrl, {
      redirect: "follow",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    if (!imgRes.ok) {
      console.warn(`[sync-meta-ads] download falhou (${imgRes.status}) ad ${ad.ad_id} — usando URL direta`);
      return metaUrl; // fallback: URL da Meta CDN
    }

    const rawBytes = await imgRes.arrayBuffer();

    // Rejeita respostas muito pequenas (< 2KB = provavelmente HTML de erro)
    if (rawBytes.byteLength < 2048) {
      console.warn(`[sync-meta-ads] resposta muito pequena (${rawBytes.byteLength}b) ad ${ad.ad_id} — usando URL direta`);
      return metaUrl; // fallback
    }

    const contentType = imgRes.headers.get("content-type") ?? "image/jpeg";
    const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
    const storagePath = `${clientId}/${year}-${String(month).padStart(2, "0")}/${ad.ad_id}.${ext}`;
    const imgBuffer = Buffer.from(rawBytes);

    const { error: uploadErr } = await supabaseAdmin.storage
      .from("trafego-creatives")
      .upload(storagePath, imgBuffer, { contentType, upsert: true });

    if (uploadErr) {
      console.warn(`[sync-meta-ads] upload Storage falhou ad ${ad.ad_id}: ${uploadErr.message} — usando URL direta`);
      return metaUrl; // fallback
    }

    const { data: urlData } = supabaseAdmin.storage
      .from("trafego-creatives")
      .getPublicUrl(storagePath);

    console.log(`[sync-meta-ads] ✓ thumbnail no Storage: ${urlData.publicUrl}`);
    return urlData.publicUrl;

  } catch (err) {
    console.warn(`[sync-meta-ads] erro persistThumbnail ad ${ad.ad_id}:`, err);
    return metaUrl; // fallback: URL da Meta CDN
  }
}

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

    // 2. Buscar métricas, top ads e dados semanais em paralelo
    const [insights, rawTopAds, weeklyData] = await Promise.all([
      fetchMetaInsights(integration.ad_account_id, integration.access_token, month, year),
      fetchTopAds(integration.ad_account_id, integration.access_token, month, year).catch((err) => {
        console.warn("[sync-meta-ads] fetchTopAds falhou (não crítico):", err);
        return [] as MetaTopAd[];
      }),
      fetchMetaWeeklyInsights(integration.ad_account_id, integration.access_token, month, year).catch((err) => {
        console.warn("[sync-meta-ads] fetchMetaWeeklyInsights falhou (não crítico):", err);
        return [];
      }),
    ]);

    // 3. Persistir thumbnails no Storage (com fallback para URL direta da Meta CDN)
    const topAdsForDb = await Promise.all(
      rawTopAds.map(async (ad) => {
        const finalUrl = await persistThumbnail(supabaseAdmin, ad, client_id, year, month);
        return { ...ad, thumbnail_url: finalUrl };
      })
    );

    // Log para debug
    console.log(`[sync-meta-ads] top_ads para ${client_id} ${year}/${month}:`,
      topAdsForDb.map((a) => ({ ad_id: a.ad_id, has_thumb: !!a.thumbnail_url, url: a.thumbnail_url?.slice(0, 60) }))
    );

    // 4. Salvar no banco
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
        top_ads: topAdsForDb,
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

    // 5. Salvar dados semanais (upsert por semana, preservar action_text existente)
    if (weeklyData.length > 0) {
      console.log(`[sync-meta-ads] sincronizando ${weeklyData.length} semana(s) para ${client_id} ${year}/${month}`);

      for (const week of weeklyData) {
        // Verificar se já existe action_text para esta semana (não sobrescrever)
        const { data: existing } = await supabaseAdmin
          .from("trafego_weekly")
          .select("action_text")
          .eq("client_id", client_id)
          .eq("platform", "meta")
          .eq("year", year)
          .eq("month", month)
          .eq("week_number", week.weekNumber)
          .single();

        await supabaseAdmin
          .from("trafego_weekly")
          .upsert({
            client_id,
            platform: "meta",
            year,
            month,
            week_number: week.weekNumber,
            date_start: week.dateStart,
            date_end: week.dateEnd,
            spend: week.spend,
            impressions: week.impressions,
            reach: week.reach,
            clicks: week.clicks,
            cpc: week.cpc,
            leads_whatsapp: week.leadsWhatsapp,
            leads_form: week.leadsForm,
            leads_total: week.leadsTotal,
            cpl_whatsapp: week.cplWhatsapp,
            cpl_form: week.cplForm,
            cpl_total: week.cplTotal,
            action_text: existing?.action_text ?? null, // preserva texto existente
            synced_at: new Date().toISOString(),
          }, {
            onConflict: "client_id,platform,year,month,week_number",
          });
      }
    }

    // 6. Atualizar last_sync em client_integrations
    await supabaseAdmin
      .from("client_integrations")
      .update({ last_sync: new Date().toISOString(), last_error: null })
      .eq("client_id", client_id)
      .eq("platform", "meta_ads");

    return NextResponse.json({ success: true, data: saved, insights, top_ads_count: topAdsForDb.length, weekly_weeks: weeklyData.length });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("[sync-meta-ads] error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
