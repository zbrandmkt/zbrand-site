"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PURPLE = "#7B2FF7";
const ORANGE = "#FF6100";
const CYAN = "#00C2FF";
const LIME = "#AAFF00";
const AMBER = "#FBBC05";
const PINK = "#FF3D9A";
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511940502929";

// ─── Types ────────────────────────────────────────────────────────────────────

type SocialTier = 1 | 2 | 3;
type CaptacaoTier = "mobile" | "pro";
type SiteTier = "landing" | "completo";

interface Config {
  // Mensais
  socialEnabled: boolean;
  socialTier: SocialTier;
  adsEnabled: boolean;
  metaEnabled: boolean;
  googleEnabled: boolean;
  botEnabled: boolean;
  // Únicos (por sessão / por projeto)
  captacaoEnabled: boolean;
  captacaoTier: CaptacaoTier;
  siteEnabled: boolean;
  siteTier: SiteTier;
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const SOCIAL_PRICES: Record<SocialTier, number> = { 1: 1500, 2: 2000, 3: 3000 };
const META_PRICE = 1800;
const GOOGLE_PRICE = 600;
const BOT_MONTHLY = 600;
const BOT_SETUP = 2000;

const CAPTACAO_PRICES: Record<CaptacaoTier, number> = { mobile: 800, pro: 1500 };
const SITE_PRICES: Record<SiteTier, number> = { landing: 1500, completo: 3900 };

function calcTotal(cfg: Config) {
  // Mensais
  const social = cfg.socialEnabled ? SOCIAL_PRICES[cfg.socialTier] : 0;
  const ads = cfg.adsEnabled
    ? (cfg.metaEnabled ? META_PRICE : 0) + (cfg.googleEnabled ? GOOGLE_PRICE : 0)
    : 0;
  const bot = cfg.botEnabled ? BOT_MONTHLY : 0;
  const monthlySubtotal = social + ads + bot;
  const monthlyCount = [cfg.socialEnabled, cfg.adsEnabled, cfg.botEnabled].filter(Boolean).length;
  const discount = monthlyCount >= 3 ? 0.1 : monthlyCount >= 2 ? 0.05 : 0;
  const totalMonthly = Math.round(monthlySubtotal * (1 - discount));

  // Únicos
  const captacao = cfg.captacaoEnabled ? CAPTACAO_PRICES[cfg.captacaoTier] : 0;
  const site = cfg.siteEnabled ? SITE_PRICES[cfg.siteTier] : 0;
  const botSetup = cfg.botEnabled ? BOT_SETUP : 0;
  const totalUnico = captacao + site + botSetup;

  const totalCount = [
    cfg.socialEnabled, cfg.adsEnabled, cfg.botEnabled,
    cfg.captacaoEnabled, cfg.siteEnabled,
  ].filter(Boolean).length;

  return {
    monthlySubtotal, totalMonthly, totalUnico,
    discount, monthlyCount, totalCount,
    captacao, site, botSetup,
  };
}

// ─── Price Counter Hook ────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 500) {
  const [displayed, setDisplayed] = useState(target);
  const prev = useRef(target);

  useEffect(() => {
    const start = prev.current;
    const end = target;
    prev.current = target;
    if (start === end) return;

    const startTime = performance.now();
    let raf: number;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + (end - start) * eased));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return displayed;
}

// ─── WhatsApp message builder ─────────────────────────────────────────────────

function buildWhatsAppLink(cfg: Config, totalMonthly: number, totalUnico: number) {
  const lines: string[] = ["Oi! Montei um pacote personalizado no site:"];

  if (cfg.socialEnabled) {
    const r = cfg.socialTier;
    lines.push(`✓ Social Media — ${r} rede${r > 1 ? "s" : ""} (R$ ${SOCIAL_PRICES[r].toLocaleString("pt-BR")}/mês)`);
  }
  if (cfg.adsEnabled) {
    const plats = [cfg.metaEnabled && "Meta", cfg.googleEnabled && "Google"].filter(Boolean).join(" + ");
    const p = (cfg.metaEnabled ? META_PRICE : 0) + (cfg.googleEnabled ? GOOGLE_PRICE : 0);
    lines.push(`✓ Tráfego Pago — ${plats} Ads (R$ ${p.toLocaleString("pt-BR")}/mês)`);
  }
  if (cfg.botEnabled) {
    lines.push(`✓ Automação WhatsApp (R$ ${BOT_MONTHLY}/mês + R$ ${BOT_SETUP} setup)`);
  }
  if (cfg.captacaoEnabled) {
    const tier = cfg.captacaoTier === "mobile" ? "Mobile" : "Profissional";
    lines.push(`✓ Captação ${tier} — 1 sessão (R$ ${CAPTACAO_PRICES[cfg.captacaoTier].toLocaleString("pt-BR")})`);
  }
  if (cfg.siteEnabled) {
    const tier = cfg.siteTier === "landing" ? "Landing Page" : "Site Completo";
    const note = cfg.siteTier === "completo" ? " (a partir de)" : "";
    lines.push(`✓ ${tier} (R$ ${SITE_PRICES[cfg.siteTier].toLocaleString("pt-BR")}${note})`);
  }

  lines.push("");
  if (totalMonthly > 0)
    lines.push(`Total mensal: R$ ${totalMonthly.toLocaleString("pt-BR")}/mês`);
  if (totalUnico > 0)
    lines.push(`Investimento único: R$ ${totalUnico.toLocaleString("pt-BR")}`);
  lines.push("Pode me ajudar a começar?");

  const text = encodeURIComponent(lines.join("\n"));
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${text}`;
}

// ─── Toggle Card ──────────────────────────────────────────────────────────────

interface ToggleCardProps {
  enabled: boolean;
  onToggle: () => void;
  color: string;
  emoji: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeType?: "monthly" | "once";
  children?: React.ReactNode;
}

function ToggleCard({
  enabled, onToggle, color, emoji, title, subtitle, badge, badgeType = "monthly", children,
}: ToggleCardProps) {
  return (
    <motion.div
      layout
      animate={{ scale: 1, opacity: enabled ? 1 : 0.75 }}
      transition={{ duration: 0.2 }}
      className="border-2 border-preto rounded-brutal-lg overflow-hidden bg-white transition-shadow"
      style={enabled ? { boxShadow: `5px 5px 0px 0px ${color}` } : { boxShadow: "5px 5px 0px 0px #1A1A1A" }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-branco-off transition-colors"
      >
        <div
          className="w-11 h-11 rounded-brutal flex items-center justify-center text-xl shrink-0 border-2 border-preto transition-colors"
          style={enabled ? { background: color } : { background: "#F5F5F0" }}
        >
          {emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-black text-sm text-preto uppercase tracking-tight">
              {title}
            </span>
            {badge && (
              <span
                className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border"
                style={{ color, borderColor: `${color}40`, background: `${color}12` }}
              >
                {badge}
              </span>
            )}
            {badgeType === "once" && (
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border border-preto/20 text-preto/40 bg-preto/05">
                valor único
              </span>
            )}
          </div>
          <p className="text-[11px] text-cinza-text font-medium mt-0.5 leading-snug">{subtitle}</p>
        </div>

        <div
          className="relative w-11 h-6 rounded-full border-2 border-preto transition-colors shrink-0"
          style={{ background: enabled ? color : "#E5E5E5" }}
        >
          <motion.div
            animate={{ x: enabled ? 18 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-0.5 w-4 h-4 bg-white rounded-full border-2 border-preto"
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {enabled && children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-3 border-t-2 border-preto/10" style={{ background: `${color}08` }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Checkmark helper ─────────────────────────────────────────────────────────

function Check({ color }: { color: string }) {
  return (
    <div
      className="w-4 h-4 rounded-full border-2 border-preto flex items-center justify-center shrink-0"
      style={{ background: color }}
    >
      <svg className="w-2 h-2 text-preto" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 12 12">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 6l3 3 5-5" />
      </svg>
    </div>
  );
}

// ─── Summary Panel ────────────────────────────────────────────────────────────

interface SummaryPanelProps {
  cfg: Config;
  totalMonthly: number;
  displayedMonthly: number;
  totalUnico: number;
  discount: number;
  totalCount: number;
  monthlyCount: number;
}

function SummaryPanel({ cfg, totalMonthly, displayedMonthly, totalUnico, discount, totalCount, monthlyCount }: SummaryPanelProps) {
  const isEmpty = totalCount === 0;
  const waLink = buildWhatsAppLink(cfg, totalMonthly, totalUnico);

  return (
    <div
      className="bg-preto border-2 border-preto rounded-brutal-lg overflow-hidden sticky top-24"
      style={{ boxShadow: `5px 5px 0px 0px ${PURPLE}` }}
    >
      {/* Header */}
      <div className="px-5 py-3 border-b-2 border-white/10 flex items-center gap-2" style={{ background: `${PURPLE}20` }}>
        <span className="text-lg">🛒</span>
        <span className="font-display font-black text-xs text-white uppercase tracking-widest">Seu Pacote</span>
        {totalCount > 0 && (
          <motion.span
            key={totalCount}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-preto"
            style={{ background: PURPLE }}
          >
            {totalCount}
          </motion.span>
        )}
      </div>

      {/* Items */}
      <div className="px-5 py-4 min-h-[80px]">
        {isEmpty ? (
          <p className="text-white/30 text-xs font-medium text-center py-4">
            Selecione ao menos um serviço para montar seu pacote
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
              {cfg.socialEnabled && (
                <motion.div key="social" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                  className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/70 font-medium">
                    <span style={{ color: ORANGE }}>✓</span>
                    Social ({cfg.socialTier} rede{cfg.socialTier > 1 ? "s" : ""})
                  </span>
                  <span className="text-[11px] font-black text-white">R$ {SOCIAL_PRICES[cfg.socialTier].toLocaleString("pt-BR")}</span>
                </motion.div>
              )}
              {cfg.adsEnabled && (
                <motion.div key="ads" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                  className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/70 font-medium">
                    <span style={{ color: CYAN }}>✓</span>
                    Ads ({[cfg.metaEnabled && "Meta", cfg.googleEnabled && "Google"].filter(Boolean).join("+")})
                  </span>
                  <span className="text-[11px] font-black text-white">
                    R$ {((cfg.metaEnabled ? META_PRICE : 0) + (cfg.googleEnabled ? GOOGLE_PRICE : 0)).toLocaleString("pt-BR")}
                  </span>
                </motion.div>
              )}
              {cfg.botEnabled && (
                <motion.div key="bot" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                  className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/70 font-medium">
                    <span style={{ color: LIME }}>✓</span> Bot WhatsApp
                  </span>
                  <span className="text-[11px] font-black text-white">R$ {BOT_MONTHLY.toLocaleString("pt-BR")}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Separator if has one-time items */}
            {(cfg.captacaoEnabled || cfg.siteEnabled) && monthlyCount > 0 && (
              <div className="border-t border-white/10 my-1" />
            )}

            <AnimatePresence mode="popLayout">
              {cfg.captacaoEnabled && (
                <motion.div key="captacao" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                  className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/70 font-medium">
                    <span style={{ color: AMBER }}>✓</span>
                    Captação {cfg.captacaoTier === "mobile" ? "Mobile" : "Pro"}
                    <span className="text-white/30 text-[9px]">(único)</span>
                  </span>
                  <span className="text-[11px] font-black text-white">R$ {CAPTACAO_PRICES[cfg.captacaoTier].toLocaleString("pt-BR")}</span>
                </motion.div>
              )}
              {cfg.siteEnabled && (
                <motion.div key="site" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }}
                  className="flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-[11px] text-white/70 font-medium">
                    <span style={{ color: PINK }}>✓</span>
                    {cfg.siteTier === "landing" ? "Landing Page" : "Site Completo"}
                    <span className="text-white/30 text-[9px]">(único)</span>
                  </span>
                  <span className="text-[11px] font-black text-white">
                    {cfg.siteTier === "completo" ? "a partir de " : ""}R$ {SITE_PRICES[cfg.siteTier].toLocaleString("pt-BR")}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Discount badge */}
      <AnimatePresence>
        {discount > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="px-5 overflow-hidden">
            <div className="flex items-center gap-2 px-3 py-2 rounded-brutal mb-2 border-2 border-preto" style={{ background: LIME, color: "#1A1A1A" }}>
              <span className="text-sm">🎉</span>
              <span className="font-display font-black text-[11px] uppercase tracking-wide">
                Combo mensal {discount * 100}% off
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Price blocks */}
      <div className="px-5 pb-4 border-t-2 border-white/10 pt-4 flex flex-col gap-3">
        {/* Monthly */}
        {monthlyCount > 0 && (
          <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Mensal</p>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xs font-black text-white/50">R$</span>
              <span className="font-display font-black text-3xl text-white leading-none tabular-nums">
                {displayedMonthly.toLocaleString("pt-BR")}
              </span>
              <span className="font-display text-xs font-bold text-white/40">/mês</span>
            </div>
          </div>
        )}

        {/* One-time */}
        {totalUnico > 0 && (
          <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">
              Investimento único
            </p>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xs font-black text-white/50">R$</span>
              <span className="font-display font-black text-2xl text-white/80 leading-none tabular-nums">
                {totalUnico.toLocaleString("pt-BR")}
              </span>
            </div>
            {cfg.siteEnabled && cfg.siteTier === "completo" && (
              <p className="text-[9px] text-white/25 mt-0.5">* site completo: valor a confirmar após briefing</p>
            )}
          </div>
        )}

        {monthlyCount === 0 && totalUnico === 0 && !isEmpty && (
          <div>
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Total estimado</p>
            <span className="font-display font-black text-3xl text-white">—</span>
          </div>
        )}

        {(cfg.adsEnabled) && (
          <p className="text-[10px] text-white/25 font-medium">
            + verba de anúncios às plataformas
          </p>
        )}
      </div>

      {/* CTA */}
      <div className="px-5 pb-5">
        <motion.a
          href={isEmpty ? undefined : waLink}
          target={isEmpty ? undefined : "_blank"}
          rel="noopener noreferrer"
          whileHover={isEmpty ? {} : { scale: 1.02 }}
          whileTap={isEmpty ? {} : { scale: 0.98 }}
          className="flex items-center justify-center gap-2 w-full font-display font-black text-sm uppercase tracking-widest py-3.5 rounded-brutal border-2 border-preto transition-all"
          style={
            isEmpty
              ? { background: "#333", color: "#666", cursor: "not-allowed" }
              : { background: PURPLE, color: "white", boxShadow: `3px 3px 0px 0px ${PURPLE}60` }
          }
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          {isEmpty ? "Selecione serviços" : "Quero Este Pacote"}
        </motion.a>
        <p className="text-[9px] text-white/20 text-center mt-2 font-medium">
          Valores estimados — confirmamos após diagnóstico gratuito
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export function ZPersonalizadoConfigurador() {
  const [cfg, setCfg] = useState<Config>({
    socialEnabled: false,
    socialTier: 1,
    adsEnabled: false,
    metaEnabled: true,
    googleEnabled: false,
    botEnabled: false,
    captacaoEnabled: false,
    captacaoTier: "mobile",
    siteEnabled: false,
    siteTier: "landing",
  });

  const { totalMonthly, totalUnico, discount, monthlyCount, totalCount } = calcTotal(cfg);
  const displayedMonthly = useCountUp(totalMonthly);

  const toggle = useCallback((key: keyof Config) => {
    setCfg((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const handleAdsToggle = useCallback(() => {
    setCfg((prev) => ({ ...prev, adsEnabled: !prev.adsEnabled, metaEnabled: true, googleEnabled: false }));
  }, []);

  const handleGoogleToggle = useCallback(() => {
    setCfg((prev) => {
      if (!prev.metaEnabled) return prev;
      return { ...prev, googleEnabled: !prev.googleEnabled };
    });
  }, []);

  const socialOptions = [
    { value: 1 as SocialTier, label: "1 rede", price: 1500, desc: "Instagram ou Facebook" },
    { value: 2 as SocialTier, label: "2 redes", price: 2000, desc: "Insta + Facebook" },
    { value: 3 as SocialTier, label: "3 redes", price: 3000, desc: "Insta + FB + TikTok" },
  ];

  return (
    <section id="configurador" className="bg-[#F5F5F0] py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-[11px] font-black uppercase tracking-[0.25em] mb-4" style={{ color: PURPLE }}>
            Configurador
          </p>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-preto uppercase tracking-tight leading-tight mb-4">
            Monte Seu <span style={{ color: PURPLE }}>Pacote</span>
          </h2>
          <p className="font-display text-sm text-cinza-dark max-w-md mx-auto">
            Ligue os serviços que você precisa. O preço se atualiza em tempo real.
          </p>
        </div>

        {/* Section labels */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">

          {/* Left: cards */}
          <div className="flex flex-col gap-5">

            {/* ── SERVIÇOS MENSAIS ── */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-preto/40 mb-3 flex items-center gap-2">
                <span className="h-px flex-1 bg-preto/10" />
                Serviços mensais
                <span className="h-px flex-1 bg-preto/10" />
              </p>

              <div className="flex flex-col gap-4">

                {/* 1. Social Media */}
                <ToggleCard
                  enabled={cfg.socialEnabled}
                  onToggle={() => toggle("socialEnabled")}
                  color={ORANGE} emoji="📱"
                  title="Social Media"
                  subtitle="Posts, stories, captação presencial e gestão editorial"
                  badge="15 posts/mês"
                >
                  <p className="text-[11px] font-black uppercase tracking-widest text-preto/50 mb-3">
                    Quantas redes sociais?
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {socialOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setCfg((p) => ({ ...p, socialTier: opt.value }))}
                        className="flex flex-col items-center gap-0.5 px-2 py-3 rounded-brutal border-2 transition-all"
                        style={
                          cfg.socialTier === opt.value
                            ? { borderColor: ORANGE, background: `${ORANGE}15`, boxShadow: `3px 3px 0px 0px ${ORANGE}` }
                            : { borderColor: "rgba(26,26,26,0.15)", background: "white" }
                        }
                      >
                        <span className="font-display font-black text-sm uppercase" style={{ color: cfg.socialTier === opt.value ? ORANGE : "#1A1A1A" }}>
                          {opt.label}
                        </span>
                        <span className="text-[10px] text-cinza-text font-medium">{opt.desc}</span>
                        <span className="font-black text-[11px] mt-0.5" style={{ color: cfg.socialTier === opt.value ? ORANGE : "#1A1A1A" }}>
                          R$ {opt.price.toLocaleString("pt-BR")}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-preto/40 font-medium mt-3">
                    Inclui captação presencial 1 dia/mês (4–6h) + edição + stories diários
                  </p>
                </ToggleCard>

                {/* 2. Tráfego Pago */}
                <ToggleCard
                  enabled={cfg.adsEnabled}
                  onToggle={handleAdsToggle}
                  color={CYAN} emoji="🎯"
                  title="Tráfego Pago"
                  subtitle="Campanhas gerenciadas com criativos, otimização semanal e relatório ROAS"
                  badge="até 4 campanhas"
                >
                  <p className="text-[11px] font-black uppercase tracking-widest text-preto/50 mb-3">
                    Plataformas de anúncio
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between px-4 py-3 rounded-brutal border-2"
                      style={{ borderColor: CYAN, background: `${CYAN}10` }}>
                      <div>
                        <span className="font-display font-black text-sm uppercase text-preto">Meta Ads</span>
                        <p className="text-[10px] text-cinza-text">Instagram + Facebook</p>
                      </div>
                      <div className="text-right">
                        <span className="font-black text-sm" style={{ color: CYAN }}>R$ 1.800</span>
                        <p className="text-[9px] text-cinza-text">incluso</p>
                      </div>
                    </div>
                    <button
                      onClick={handleGoogleToggle}
                      className="flex items-center justify-between px-4 py-3 rounded-brutal border-2 transition-all text-left"
                      style={
                        cfg.googleEnabled
                          ? { borderColor: CYAN, background: `${CYAN}10`, boxShadow: `2px 2px 0px 0px ${CYAN}` }
                          : { borderColor: "rgba(26,26,26,0.15)", background: "white" }
                      }
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-black text-sm uppercase text-preto">+ Google Ads</span>
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full border"
                            style={{ color: CYAN, borderColor: `${CYAN}40`, background: `${CYAN}12` }}>
                            opcional
                          </span>
                        </div>
                        <p className="text-[10px] text-cinza-text">Google Search + Display</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm" style={{ color: cfg.googleEnabled ? CYAN : "#999" }}>+ R$ 600</span>
                        <div className="relative w-9 h-5 rounded-full border-2 border-preto transition-colors"
                          style={{ background: cfg.googleEnabled ? CYAN : "#E5E5E5" }}>
                          <motion.div
                            animate={{ x: cfg.googleEnabled ? 14 : 2 }}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            className="absolute top-0.5 w-3 h-3 bg-white rounded-full border-2 border-preto"
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                  <p className="text-[10px] text-preto/40 font-medium mt-3">
                    Verba de anúncios paga direto às plataformas (+R$ 1.000 Meta / +R$ 500 Google recomendado)
                  </p>
                </ToggleCard>

                {/* 3. WhatsApp Bot */}
                <ToggleCard
                  enabled={cfg.botEnabled}
                  onToggle={() => toggle("botEnabled")}
                  color={LIME} emoji="🤖"
                  title="Automação WhatsApp"
                  subtitle="Bot + IA generativa + 3 disparos em massa por mês"
                  badge="bot 24h"
                >
                  <div className="flex flex-col gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-brutal border-2 border-preto px-3 py-3" style={{ background: `${LIME}20` }}>
                        <p className="text-[10px] font-black uppercase tracking-widest text-preto/60 mb-0.5">Mensalidade</p>
                        <p className="font-display font-black text-xl text-preto leading-none">R$ 600</p>
                        <p className="text-[10px] text-preto/50 mt-0.5">/mês</p>
                      </div>
                      <div className="rounded-brutal border-2 border-preto px-3 py-3" style={{ background: `${LIME}20` }}>
                        <p className="text-[10px] font-black uppercase tracking-widest text-preto/60 mb-0.5">Setup único</p>
                        <p className="font-display font-black text-xl text-preto leading-none">R$ 2.000</p>
                        <p className="text-[10px] text-preto/50 mt-0.5">uma vez</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      {["Chatbot + IA generativa", "Bot de qualificação e pré-atendimento", "3 disparos em massa/mês", "Treinamento + suporte semanal"].map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <Check color={LIME} />
                          <span className="text-[11px] text-preto/70 font-medium">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ToggleCard>
              </div>
            </div>

            {/* ── SERVIÇOS ÚNICOS ── */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-preto/40 mb-3 flex items-center gap-2">
                <span className="h-px flex-1 bg-preto/10" />
                Projetos & sessões (valor único)
                <span className="h-px flex-1 bg-preto/10" />
              </p>

              <div className="flex flex-col gap-4">

                {/* 4. Captação de Conteúdo */}
                <ToggleCard
                  enabled={cfg.captacaoEnabled}
                  onToggle={() => toggle("captacaoEnabled")}
                  color={AMBER} emoji="🎬"
                  title="Captação de Conteúdo"
                  subtitle="Sessão presencial de 5h — vídeos e fotos editados entregues no Drive"
                  badgeType="once"
                >
                  <p className="text-[11px] font-black uppercase tracking-widest text-preto/50 mb-3">
                    Tipo de captação
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Mobile */}
                    <button
                      onClick={() => setCfg((p) => ({ ...p, captacaoTier: "mobile" }))}
                      className="flex flex-col gap-2 p-4 rounded-brutal border-2 text-left transition-all"
                      style={
                        cfg.captacaoTier === "mobile"
                          ? { borderColor: AMBER, background: `${AMBER}15`, boxShadow: `3px 3px 0px 0px ${AMBER}` }
                          : { borderColor: "rgba(26,26,26,0.15)", background: "white" }
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-sm uppercase text-preto">📱 Mobile</span>
                        <span className="font-black text-base" style={{ color: AMBER }}>R$ 800</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {["Sessão 5h presencial", "10 vídeos editados", "Banco de imagens completo no Drive"].map((f) => (
                          <div key={f} className="flex items-center gap-1.5">
                            <Check color={AMBER} />
                            <span className="text-[10px] text-preto/65 font-medium">{f}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                    {/* Profissional */}
                    <button
                      onClick={() => setCfg((p) => ({ ...p, captacaoTier: "pro" }))}
                      className="flex flex-col gap-2 p-4 rounded-brutal border-2 text-left transition-all"
                      style={
                        cfg.captacaoTier === "pro"
                          ? { borderColor: AMBER, background: `${AMBER}15`, boxShadow: `3px 3px 0px 0px ${AMBER}` }
                          : { borderColor: "rgba(26,26,26,0.15)", background: "white" }
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-sm uppercase text-preto">🎥 Profissional</span>
                        <span className="font-black text-base" style={{ color: AMBER }}>R$ 1.500</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {["Sessão 5h presencial", "20 fotos institucionais", "10 vídeos editados", "Banco de imagens no Drive"].map((f) => (
                          <div key={f} className="flex items-center gap-1.5">
                            <Check color={AMBER} />
                            <span className="text-[10px] text-preto/65 font-medium">{f}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  </div>
                  <p className="text-[10px] text-preto/40 font-medium mt-3">
                    Sessão avulsa — pode ser contratada junto com qualquer serviço mensal ou isolada.
                  </p>
                </ToggleCard>

                {/* 5. Website / Landing Page */}
                <ToggleCard
                  enabled={cfg.siteEnabled}
                  onToggle={() => toggle("siteEnabled")}
                  color={PINK} emoji="💻"
                  title="Website & Landing Page"
                  subtitle="Desenvolvimento de página de conversão ou site completo"
                  badgeType="once"
                >
                  <p className="text-[11px] font-black uppercase tracking-widest text-preto/50 mb-3">
                    O que você precisa?
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Landing Page */}
                    <button
                      onClick={() => setCfg((p) => ({ ...p, siteTier: "landing" }))}
                      className="flex flex-col gap-2 p-4 rounded-brutal border-2 text-left transition-all"
                      style={
                        cfg.siteTier === "landing"
                          ? { borderColor: PINK, background: `${PINK}10`, boxShadow: `3px 3px 0px 0px ${PINK}` }
                          : { borderColor: "rgba(26,26,26,0.15)", background: "white" }
                      }
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-display font-black text-sm uppercase text-preto">Landing Page</span>
                        <span className="font-black text-base" style={{ color: PINK }}>R$ 1.500</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        {[
                          "1 página de alta conversão",
                          "Até 6 seções (hero, prova, CTA…)",
                          "Formulário + WhatsApp integrado",
                          "Mobile responsivo",
                          "SEO básico + OG tags",
                          "Entrega em até 10 dias",
                        ].map((f) => (
                          <div key={f} className="flex items-center gap-1.5">
                            <Check color={PINK} />
                            <span className="text-[10px] text-preto/65 font-medium">{f}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                    {/* Site Completo */}
                    <button
                      onClick={() => setCfg((p) => ({ ...p, siteTier: "completo" }))}
                      className="flex flex-col gap-2 p-4 rounded-brutal border-2 text-left transition-all"
                      style={
                        cfg.siteTier === "completo"
                          ? { borderColor: PINK, background: `${PINK}10`, boxShadow: `3px 3px 0px 0px ${PINK}` }
                          : { borderColor: "rgba(26,26,26,0.15)", background: "white" }
                      }
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-display font-black text-sm uppercase text-preto">Site Completo</span>
                        <div className="text-right">
                          <span className="font-black text-base" style={{ color: PINK }}>R$ 3.900</span>
                          <p className="text-[9px] text-preto/40">a partir de</p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        {[
                          "Home + até 6 páginas internas",
                          "Blog / área de conteúdo",
                          "Painel de edição (CMS)",
                          "Formulários e integrações",
                          "SEO técnico completo",
                          "Entrega em até 21 dias",
                        ].map((f) => (
                          <div key={f} className="flex items-center gap-1.5">
                            <Check color={PINK} />
                            <span className="text-[10px] text-preto/65 font-medium">{f}</span>
                          </div>
                        ))}
                      </div>
                    </button>
                  </div>

                  {/* Banco de Horas */}
                  <div className="mt-4 p-4 rounded-brutal border-2 border-preto/15 bg-white">
                    <p className="font-display font-black text-xs text-preto uppercase mb-2 flex items-center gap-2">
                      🕐 Manutenção — Banco de Horas
                      <span className="text-[9px] font-bold text-preto/40 normal-case tracking-normal">contrate quando precisar</span>
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { label: "Avulso", hours: "1h", price: "R$ 100", save: null },
                        { label: "Pack 5h", hours: "5h", price: "R$ 400", save: "1h grátis" },
                        { label: "Pack 10h", hours: "10h", price: "R$ 750", save: "2,5h grátis" },
                        { label: "Pack 20h", hours: "20h", price: "R$ 1.400", save: "6h grátis" },
                      ].map((pack) => (
                        <div key={pack.label}
                          className="flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-brutal border-2 border-preto/10 bg-branco-off text-center">
                          <span className="font-black text-[10px] uppercase text-preto/50">{pack.label}</span>
                          <span className="font-display font-black text-sm text-preto">{pack.hours}</span>
                          <span className="font-black text-xs" style={{ color: PINK }}>{pack.price}</span>
                          {pack.save && (
                            <span className="text-[9px] font-bold text-preto/40">{pack.save}</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-preto/35 font-medium mt-2">
                      R$ 100/hora avulsa — compre um banco de horas e economize. Válido por 12 meses.
                    </p>
                  </div>
                </ToggleCard>
              </div>
            </div>

            {/* Combo callout */}
            <AnimatePresence>
              {monthlyCount >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                  className="flex items-start gap-3 p-4 rounded-brutal-lg border-2 border-preto bg-white"
                  style={{ boxShadow: `4px 4px 0px 0px ${PURPLE}` }}
                >
                  <span className="text-xl shrink-0">💡</span>
                  <div>
                    <p className="font-display font-black text-sm text-preto uppercase">
                      {monthlyCount >= 3
                        ? "Você montou um pacote equivalente ao Full — com 10% off"
                        : "Combo ativo — desconto de 5% nos serviços mensais"}
                    </p>
                    <p className="text-[11px] text-cinza-dark mt-0.5">
                      {monthlyCount >= 3
                        ? "O Pacote Full já tem essa combinação otimizada e com processo integrado."
                        : "Adicione o 3º serviço mensal e o desconto sobe para 10%."}
                    </p>
                    {monthlyCount >= 3 && (
                      <a href="/pacotes/full" className="inline-flex items-center gap-1 font-black text-[11px] uppercase tracking-wide mt-2" style={{ color: PURPLE }}>
                        Ver Pacote Full →
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right: Summary (desktop) */}
          <div className="hidden lg:block">
            <SummaryPanel
              cfg={cfg}
              totalMonthly={totalMonthly}
              displayedMonthly={displayedMonthly}
              totalUnico={totalUnico}
              discount={discount}
              totalCount={totalCount}
              monthlyCount={monthlyCount}
            />
          </div>
        </div>

        {/* Mobile bottom bar */}
        <AnimatePresence>
          {totalCount > 0 && (
            <motion.div
              initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-preto border-t-2 border-white/20 px-4 py-3 flex items-center gap-3"
              style={{ boxShadow: "0 -4px 30px rgba(0,0,0,0.4)" }}
            >
              <div className="flex-1 min-w-0">
                {totalMonthly > 0 && (
                  <>
                    <p className="text-[9px] text-white/40 font-black uppercase tracking-widest leading-none mb-0.5">Mensal</p>
                    <p className="font-display font-black text-xl text-white leading-none">
                      R$ {displayedMonthly.toLocaleString("pt-BR")}
                      <span className="text-xs font-bold text-white/40 ml-1">/mês</span>
                    </p>
                  </>
                )}
                {totalUnico > 0 && totalMonthly === 0 && (
                  <>
                    <p className="text-[9px] text-white/40 font-black uppercase tracking-widest leading-none mb-0.5">Único</p>
                    <p className="font-display font-black text-xl text-white leading-none">
                      R$ {totalUnico.toLocaleString("pt-BR")}
                    </p>
                  </>
                )}
              </div>
              <motion.a
                href={buildWhatsAppLink(cfg, totalMonthly, totalUnico)}
                target="_blank"
                rel="noopener noreferrer"
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 font-display font-black text-xs uppercase tracking-widest px-5 py-3 rounded-brutal border-2 border-preto text-white shrink-0"
                style={{ background: PURPLE, boxShadow: `3px 3px 0px 0px ${PURPLE}50` }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Quero Este Pacote
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
