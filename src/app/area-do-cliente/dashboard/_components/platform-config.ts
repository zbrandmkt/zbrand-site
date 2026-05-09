// ─── Platform Configuration ─────────────────────────────────
// Central config for colors, icons, and labels per ad platform.
// Adding a new platform (TikTok, LinkedIn) = add one entry here.

export type PlatformKey = "meta" | "google" | "tiktok" | "linkedin";

export interface PlatformConfig {
  key: PlatformKey;
  label: string;
  shortLabel: string;
  icon: string;        // path to icon in /public/images
  color: string;       // primary brand color
  colorLight: string;  // light bg tint
  colorBorder: string; // subtle border
  shadow: string;      // neobrutalism shadow color
}

export const PLATFORMS: Record<PlatformKey, PlatformConfig> = {
  meta: {
    key: "meta",
    label: "Meta Ads",
    shortLabel: "META",
    icon: "/images/icon_metaads.png",
    color: "#1877F2",
    colorLight: "#1877F210",
    colorBorder: "#1877F230",
    shadow: "#1877F2",
  },
  google: {
    key: "google",
    label: "Google Ads",
    shortLabel: "GOOGLE",
    icon: "/images/icon_googleads.webp",
    color: "#FBBC05",
    colorLight: "#FBBC0510",
    colorBorder: "#FBBC0530",
    shadow: "#FBBC05",
  },
  tiktok: {
    key: "tiktok",
    label: "TikTok Ads",
    shortLabel: "TIKTOK",
    icon: "/images/icon_tiktokads.png",
    color: "#00F2EA",
    colorLight: "#00F2EA10",
    colorBorder: "#00F2EA30",
    shadow: "#00F2EA",
  },
  linkedin: {
    key: "linkedin",
    label: "LinkedIn Ads",
    shortLabel: "LINKEDIN",
    icon: "/images/icon_linkedinads.png",
    color: "#0A66C2",
    colorLight: "#0A66C210",
    colorBorder: "#0A66C230",
    shadow: "#0A66C2",
  },
};

/**
 * Get platform config by key, with fallback
 */
export function getPlatform(key: string): PlatformConfig {
  return PLATFORMS[key as PlatformKey] ?? PLATFORMS.meta;
}

// ─── KPI Shadow Colors (for aggregate dashboard) ────────────
export const KPI_SHADOWS = {
  spend: "#FF6100",
  leads: "#00C2FF",
  cpl: "#AAFF00",
  cpc: "#7B2FF7",
  budget: "#1A1A1A",
  impressions: "#FBBC05",
  ctr: "#7B2FF7",
  cpm: "#FBBC05",
  frequency: "#FF3D9A",
} as const;

// ─── Status Colors ──────────────────────────────────────────
export const STATUS_COLORS = {
  good: "#AAFF00",
  warn: "#FBBC05",
  bad: "#FF3D9A",
  neutral: "#1A1A1A",
} as const;
