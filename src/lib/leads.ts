"use client";

import { site } from "@/lib/site";

// Envio dos formulários de lead. O navegador manda para /api/lead, que grava
// na planilha e dispara o e-mail (ver docs/LEADS.md). Se o envio falhar, o
// lead não se perde: abrimos o WhatsApp com os dados já preenchidos.

export interface LeadInput {
  name: string;
  whatsapp: string;
  business_type?: string;
  message?: string;
  services?: string;
  source: string;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function trackLead(lead: LeadInput) {
  window.gtag?.("event", "generate_lead", {
    form_source: lead.source,
    business_type: lead.business_type,
  });
  window.fbq?.("track", "Lead", { content_name: lead.source });
}

function whatsappFallback(lead: LeadInput) {
  const text = [
    "Oi! Tentei mandar o formulário do site da Zibrand e não foi. Seguem meus dados:",
    `Nome: ${lead.name}`,
    lead.business_type && `Negócio: ${lead.business_type}`,
    lead.services && `Interesse: ${lead.services}`,
    lead.message && `Mensagem: ${lead.message}`,
  ]
    .filter(Boolean)
    .join("\n");
  const phone = site.phone.replace("+", "");
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}

export async function submitLead(lead: LeadInput): Promise<boolean> {
  const utm = new URLSearchParams(window.location.search);
  const payload = {
    ...lead,
    page: window.location.pathname,
    utm_source: utm.get("utm_source"),
    utm_medium: utm.get("utm_medium"),
    utm_campaign: utm.get("utm_campaign"),
    utm_content: utm.get("utm_content"),
  };

  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`lead ${res.status}`);
    trackLead(lead);
    return true;
  } catch {
    window.location.href = whatsappFallback(lead);
    return false;
  }
}
