"use client";

import { useEffect } from "react";

// Mede todo clique em link de WhatsApp do site: "whatsapp_click" no GA4 e
// "Contact" no Meta Pixel. Um ouvinte só, sem precisar mexer em cada botão.
export function WhatsAppTracking() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.("a");
      const href = link?.getAttribute("href") ?? "";
      if (!/api\.whatsapp\.com|wa\.me\//.test(href)) return;
      window.gtag?.("event", "whatsapp_click", {
        page_path: window.location.pathname,
        link_text: link?.textContent?.trim().slice(0, 80),
      });
      window.fbq?.("track", "Contact");
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
