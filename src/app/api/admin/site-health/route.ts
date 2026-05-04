import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { runSiteHealthCheck } from "@/lib/site-health";

const BASE_URL = process.env.SITE_BASE_URL ?? "https://zbrand.com.br";

async function requireAdmin() {
  const supabase = createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user || user.user_metadata?.role !== "admin") return null;
  return { supabase, user };
}

// GET — retorna o último resultado salvo
export async function GET() {
  const auth = await requireAdmin();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { supabase } = auth;
  const { data } = await supabase
    .from("site_health_results")
    .select("*")
    .order("checked_at", { ascending: false })
    .limit(1)
    .single();

  return NextResponse.json(data ?? null);
}

// POST — roda a verificação completa e salva
export async function POST() {
  const auth = await requireAdmin();
  if (!auth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { supabase, user } = auth;

  try {
    const result = await runSiteHealthCheck(BASE_URL);

    const { data, error } = await supabase
      .from("site_health_results")
      .insert({
        checked_by: user.id,
        results: result as unknown as Record<string, unknown>,
        score: result.score,
      })
      .select()
      .single();

    if (error) throw error;

    // Mantém apenas os últimos 30 registros
    const { data: old } = await supabase
      .from("site_health_results")
      .select("id")
      .order("checked_at", { ascending: false })
      .range(30, 999);

    if (old && old.length > 0) {
      await supabase
        .from("site_health_results")
        .delete()
        .in("id", old.map((r: { id: string }) => r.id));
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Site health check error:", err);
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}
