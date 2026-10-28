import { NextResponse } from "next/server";

// Recebe os leads dos formulários e repassa para o Google Apps Script, que
// grava na planilha e envia o e-mail de aviso. Configuração em docs/LEADS.md.

const FIELDS = [
  "name",
  "whatsapp",
  "business_type",
  "message",
  "services",
  "source",
  "page",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

function clean(value: unknown) {
  return typeof value === "string" ? value.trim().slice(0, 1000) : "";
}

export async function POST(req: Request) {
  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (!webhook) {
    console.error("[lead] LEADS_WEBHOOK_URL não configurada");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const lead = Object.fromEntries(FIELDS.map((f) => [f, clean(body[f])]));
  if (!lead.name || lead.whatsapp.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        secret: process.env.LEADS_WEBHOOK_SECRET ?? "",
        received_at: new Date().toISOString(),
      }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok) throw new Error(`webhook ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] falha ao enviar para a planilha", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
