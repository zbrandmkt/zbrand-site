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
import { fetchMetaInsights, fetchTopAds, MetaTopAd } from "@/lib/meta-ads";

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

    // 3. Buscar top criativos e fazer download dos thumbnails para o Supabase Storage
    let topAdsForDb: Omit<MetaTopAd, "raw_thumbnail_url">[] = [];
    try {
      const topAds = await fetchTopAds(
        integration.ad_account_id,
        integration.access_token,
        month,
        year
      );

      // Para cada ad, baixar thumbnail e salvar no Storage
      topAdsForDb = await Promise.all(
        topAds.map(async (ad) => {
          const { raw_thumbnail_url, ...adClean } = ad;

          if (!raw_thumbnail_url) return adClean;

          try {
            console.log(`[sync-meta-ads] baixando thumbnail ad ${ad.ad_id}: ${raw_thumbnail_url}`);

            // Baixar imagem do Meta (seguindo redirects automaticamente)
            const imgRes = await fetch(raw_thumbnail_url, {
              redirect: "follow",
              headers: { "User-Agent": "Mozilla/5.0" },
            });
            if (!imgRes.ok) {
              console.warn(`[sync-meta-ads] download falhou (${imgRes.status}) ad ${ad.ad_id}: ${raw_thumbnail_url}`);
              return adClean;
            }

            const contentType = imgRes.headers.get("content-type") ?? "image/jpeg";
            const rawBytes = await imgRes.arrayBuffer();

            // Verificar que baixamos algo (pelo menos 1KB — descarta HTML de auth pages)
            if (rawBytes.byteLength < 1024) {
              console.warn(`[sync-meta-ads] resposta muito pequena (${rawBytes.byteLength}b) ad ${ad.ad_id} — provavelmente não é imagem`);
              return adClean;
            }

            const imgBuffer = Buffer.from(rawBytes);
            const ext = contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg";
            const storagePath = `${client_id}/${year}-${String(month).padStart(2, "0")}/${ad.ad_id}.${ext}`;

            // Upload para Supabase Storage (bucket público)
            const { error: uploadErr } = await supabaseAdmin.storage
              .from("trafego-creatives")
              .upload(storagePath, imgBuffer, {
                contentType,
                upsert: true,
              });

            if (uploadErr) {
              console.warn(`[sync-meta-ads] upload Storage falhou para ad ${ad.ad_id}:`, uploadErr.message);
              return adClean;
            }

            // URL pública permanente
            const { data: urlData } = supabaseAdmin.storage
              .from("trafego-creatives")
              .getPublicUrl(storagePath);

            console.log(`[sync-meta-ads] thumbnail salvo: ${urlData.publicUrl}`);
            return { ...adClean, thumbnail_url: urlData.publicUrl };
          } catch (thumbErr) {
            console.warn(`[sync-meta-ads] erro ao processar thumbnail ad ${ad.ad_id}:`, thumbErr);
            return adClean;
          }
        })
      );
    } catch (topAdsErr) {
      console.warn("[sync-meta-ads] fetchTopAds falhou (não crítico):", topAdsErr);
    }

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

    // 5. Atualizar last_sync em client_integrations
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
