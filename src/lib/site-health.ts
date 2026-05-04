export const SITE_PAGES = [
  { path: "/", name: "Home", priority: "critical" },
  { path: "/sobre", name: "Sobre Nós", priority: "high" },
  { path: "/servicos/social-media", name: "Z-SOCIAL", priority: "high" },
  { path: "/servicos/trafego-pago", name: "Z-ADS", priority: "high" },
  { path: "/servicos/captacao", name: "Z-CAPTAÇÃO", priority: "high" },
  { path: "/servicos/website", name: "Z-SITE", priority: "high" },
  { path: "/servicos/automacao", name: "Z-AUTOMAÇÃO", priority: "high" },
  { path: "/pacotes/starter", name: "Pacote Starter", priority: "medium" },
  { path: "/pacotes/full", name: "Pacote Full", priority: "medium" },
  { path: "/pacotes/personalizado", name: "Personalizado", priority: "medium" },
  { path: "/camiseta", name: "Camiseta / QR Code", priority: "medium" },
  { path: "/oferta-trafego", name: "Oferta Tráfego", priority: "low" },
] as const;

export const INTEGRATIONS = [
  { id: "fb_pixel", name: "Facebook Pixel", signal: "connect.facebook.net", doc: "Meta Events Manager" },
  { id: "ga4", name: "Google Analytics (GA4)", signal: "gtag/js?id=G-", doc: "Google Analytics" },
  { id: "gtm", name: "Google Tag Manager", signal: "googletagmanager.com/gtm.js", doc: "GTM Dashboard" },
  { id: "hotjar", name: "Hotjar", signal: "hotjar.com/c/hotjar", doc: "Hotjar" },
  { id: "clarity", name: "Microsoft Clarity", signal: "clarity.ms/tag", doc: "Clarity Dashboard" },
  { id: "whatsapp", name: "WhatsApp Float", signal: "wa.me", doc: "N/A" },
] as const;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PageResult {
  path: string;
  name: string;
  priority: string;
  status: number | null;
  titleOk: boolean;
  titleText: string;
  descOk: boolean;
  ogImageOk: boolean;
  ok: boolean;
}

export interface IntegrationResult {
  id: string;
  name: string;
  found: boolean;
  doc: string;
}

export interface SeoResult {
  sitemapOk: boolean;
  robotsOk: boolean;
}

export interface PerfResult {
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
}

export interface HealthCheckResult {
  pages: PageResult[];
  integrations: IntegrationResult[];
  seo: SeoResult;
  performance: PerfResult;
  score: number;
  checkedAt: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function extractMeta(html: string) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].replace(/\s+/g, " ").trim() : "";

  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)/i)
    ?? html.match(/<meta[^>]+content=["']([^"']*)[^>]+name=["']description["']/i);
  const desc = descMatch ? descMatch[1].trim() : "";

  const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)/i)
    ?? html.match(/<meta[^>]+content=["']([^"']*)[^>]+property=["']og:image["']/i);
  const ogImage = ogImageMatch ? ogImageMatch[1].trim() : "";

  return { title, desc, ogImage };
}

async function safeFetch(url: string, timeoutMs = 8000): Promise<{ status: number; text: string } | null> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const res = await fetch(url, { signal: controller.signal, cache: "no-store" });
    clearTimeout(timer);
    const text = await res.text();
    return { status: res.status, text };
  } catch {
    return null;
  }
}

// ── Checkers ──────────────────────────────────────────────────────────────────

async function checkAllPages(baseUrl: string): Promise<PageResult[]> {
  const results = await Promise.all(
    SITE_PAGES.map(async (page) => {
      const res = await safeFetch(`${baseUrl}${page.path}`);
      if (!res) {
        return {
          path: page.path,
          name: page.name,
          priority: page.priority,
          status: null,
          titleOk: false,
          titleText: "",
          descOk: false,
          ogImageOk: false,
          ok: false,
        };
      }
      const { title, desc, ogImage } = extractMeta(res.text);
      const titleOk = title.length >= 10 && title.length <= 70;
      const descOk = desc.length >= 50 && desc.length <= 170;
      const ogImageOk = ogImage.length > 0;
      return {
        path: page.path,
        name: page.name,
        priority: page.priority,
        status: res.status,
        titleOk,
        titleText: title,
        descOk,
        ogImageOk,
        ok: res.status === 200 && titleOk && descOk,
      };
    })
  );
  return results;
}

async function checkIntegrations(baseUrl: string): Promise<IntegrationResult[]> {
  const res = await safeFetch(baseUrl);
  const html = res?.text ?? "";
  return INTEGRATIONS.map((integ) => ({
    id: integ.id,
    name: integ.name,
    found: html.includes(integ.signal),
    doc: integ.doc,
  }));
}

async function checkSeoTechnical(baseUrl: string): Promise<SeoResult> {
  const [sitemapRes, robotsRes] = await Promise.all([
    safeFetch(`${baseUrl}/sitemap.xml`),
    safeFetch(`${baseUrl}/robots.txt`),
  ]);
  return {
    sitemapOk: (sitemapRes?.status ?? 0) === 200,
    robotsOk: (robotsRes?.status ?? 0) === 200 && (robotsRes?.text ?? "").includes("User-agent"),
  };
}

async function checkPageSpeed(baseUrl: string): Promise<PerfResult> {
  const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
  if (!apiKey) {
    return { performance: null, seo: null, accessibility: null, bestPractices: null };
  }
  try {
    const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(baseUrl)}&key=${apiKey}&strategy=mobile`;
    const res = await safeFetch(url, 30000);
    if (!res || res.status !== 200) {
      return { performance: null, seo: null, accessibility: null, bestPractices: null };
    }
    const data = JSON.parse(res.text);
    const cats = data?.lighthouseResult?.categories;
    const toScore = (val: number | undefined) => val != null ? Math.round(val * 100) : null;
    return {
      performance: toScore(cats?.performance?.score),
      seo: toScore(cats?.seo?.score),
      accessibility: toScore(cats?.accessibility?.score),
      bestPractices: toScore(cats?.["best-practices"]?.score),
    };
  } catch {
    return { performance: null, seo: null, accessibility: null, bestPractices: null };
  }
}

function calcScore(
  pages: PageResult[],
  integrations: IntegrationResult[],
  seo: SeoResult,
  perf: PerfResult
): number {
  // Pages (30%): % de páginas critical+high que retornam 200 e têm título ok
  const importantPages = pages.filter((p) => p.priority === "critical" || p.priority === "high");
  const pagesScore = importantPages.length > 0
    ? (importantPages.filter((p) => p.ok).length / importantPages.length) * 100
    : 100;

  // Integrations (25%): % de integrações encontradas
  const integrationsScore = integrations.length > 0
    ? (integrations.filter((i) => i.found).length / integrations.length) * 100
    : 0;

  // SEO técnico (25%): sitemap + robots (50% cada)
  const seoScore = ((seo.sitemapOk ? 50 : 0) + (seo.robotsOk ? 50 : 0));

  // Performance (20%): score do PageSpeed (ou 0 se não configurado)
  const perfScore = perf.performance ?? 0;

  const total = Math.round(
    pagesScore * 0.30 +
    integrationsScore * 0.25 +
    seoScore * 0.25 +
    perfScore * 0.20
  );

  return Math.min(100, Math.max(0, total));
}

// ── Main ──────────────────────────────────────────────────────────────────────

export async function runSiteHealthCheck(baseUrl: string): Promise<HealthCheckResult> {
  const [pagesResult, integrationsResult, seoResult, perfResult] = await Promise.allSettled([
    checkAllPages(baseUrl),
    checkIntegrations(baseUrl),
    checkSeoTechnical(baseUrl),
    checkPageSpeed(baseUrl),
  ]);

  const pages = pagesResult.status === "fulfilled" ? pagesResult.value : [];
  const integrations = integrationsResult.status === "fulfilled" ? integrationsResult.value : [];
  const seo = seoResult.status === "fulfilled" ? seoResult.value : { sitemapOk: false, robotsOk: false };
  const performance = perfResult.status === "fulfilled" ? perfResult.value : { performance: null, seo: null, accessibility: null, bestPractices: null };

  const score = calcScore(pages, integrations, seo, performance);

  return { pages, integrations, seo, performance, score, checkedAt: new Date().toISOString() };
}
