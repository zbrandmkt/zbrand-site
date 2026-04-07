export interface TrafficWeek {
  label: string;
  dates: string;
  meta: { invest: number; leads: number; cpl: number; cpc: number };
  google: { invest: number; leads: number; cpl: number; cpc: number };
}

export interface SocialWeek {
  label: string;
  dates: string;
  views: number;
  newFollowers: number;
  posts: number;
}

export interface SocialMonthData {
  month: string;
  shortMonth: string;
  year: number;
  weeks: SocialWeek[];
}

export interface MonthData {
  month: string;
  shortMonth: string;
  year: number;
  weeks: TrafficWeek[];
}

export const trafficMonths: MonthData[] = [
  {
    month: "Março",
    shortMonth: "MAR",
    year: 2026,
    weeks: [
      {
        label: "SEM 1",
        dates: "02-08 MAR",
        meta: { invest: 195, leads: 88, cpl: 2.22, cpc: 0.74 },
        google: { invest: 230, leads: 3, cpl: 76.67, cpc: 5.8 },
      },
      {
        label: "SEM 2",
        dates: "09-15 MAR",
        meta: { invest: 202, leads: 93, cpl: 2.17, cpc: 0.72 },
        google: { invest: 238, leads: 4, cpl: 59.5, cpc: 5.6 },
      },
      {
        label: "SEM 3",
        dates: "16-22 MAR",
        meta: { invest: 208, leads: 97, cpl: 2.14, cpc: 0.70 },
        google: { invest: 245, leads: 4, cpl: 61.25, cpc: 5.45 },
      },
      {
        label: "SEM 4",
        dates: "23-30 MAR",
        meta: { invest: 212, leads: 99, cpl: 2.14, cpc: 0.69 },
        google: { invest: 250, leads: 4, cpl: 62.5, cpc: 5.35 },
      },
    ],
  },
  {
    month: "Abril",
    shortMonth: "ABR",
    year: 2026,
    weeks: [
      {
        label: "SEM 1",
        dates: "01-07 ABR",
        meta: { invest: 210, leads: 95, cpl: 2.21, cpc: 0.71 },
        google: { invest: 240, leads: 4, cpl: 60.0, cpc: 5.5 },
      },
      {
        label: "SEM 2",
        dates: "08-14 ABR",
        meta: { invest: 218, leads: 101, cpl: 2.16, cpc: 0.68 },
        google: { invest: 255, leads: 5, cpl: 51.0, cpc: 5.28 },
      },
      {
        label: "SEM 3",
        dates: "15-21 ABR",
        meta: { invest: 224, leads: 108, cpl: 2.07, cpc: 0.65 },
        google: { invest: 260, leads: 5, cpl: 52.0, cpc: 5.24 },
      },
      {
        label: "SEM 4",
        dates: "22-28 ABR",
        meta: { invest: 226, leads: 112, cpl: 2.02, cpc: 0.63 },
        google: { invest: 262, leads: 6, cpl: 43.67, cpc: 5.1 },
      },
    ],
  },
];

// Simula semanas já fechadas no mês atual (Abril tem 3 de 4 fechadas)
export const trafficMonthsWithStatus = trafficMonths.map((m, mi) => ({
  ...m,
  weeks: m.weeks.map((w, wi) => ({
    ...w,
    closed: mi < trafficMonths.length - 1 || wi < 3, // Março todo fechado, Abril só 3 semanas
  })),
}));

// Keep backward compat
export const trafficWeeks = trafficMonths[1].weeks;

export const socialMonths: SocialMonthData[] = [
  {
    month: "Março",
    shortMonth: "MAR",
    year: 2026,
    weeks: [
      { label: "SEM 1", dates: "02-08 MAR", views: 750, newFollowers: 1, posts: 2 },
      { label: "SEM 2", dates: "09-15 MAR", views: 890, newFollowers: 2, posts: 3 },
      { label: "SEM 3", dates: "16-22 MAR", views: 1100, newFollowers: 1, posts: 3 },
      { label: "SEM 4", dates: "23-30 MAR", views: 930, newFollowers: 2, posts: 2 },
    ],
  },
  {
    month: "Abril",
    shortMonth: "ABR",
    year: 2026,
    weeks: [
      { label: "SEM 1", dates: "01-07 ABR", views: 980, newFollowers: 1, posts: 3 },
      { label: "SEM 2", dates: "08-14 ABR", views: 1240, newFollowers: 2, posts: 2 },
      { label: "SEM 3", dates: "15-21 ABR", views: 1890, newFollowers: 3, posts: 4 },
      { label: "SEM 4", dates: "22-28 ABR", views: 2100, newFollowers: 1, posts: 3 },
    ],
  },
];

// Simula semanas fechadas (Março todo fechado, Abril 3/4 fechadas)
export const socialMonthsWithStatus = socialMonths.map((m, mi) => ({
  ...m,
  weeks: m.weeks.map((w, wi) => ({
    ...w,
    closed: mi < socialMonths.length - 1 || wi < 3,
  })),
}));

// Keep backward compat
export const socialWeeks = socialMonths[1].weeks;

export const monthlyTraffic = {
  totalInvest: 1895,
  totalLeads: 436,
  avgCpl: 4.35,
  avgCpcMeta: 0.67,
  saldoMeta: 34.21,
  saldoGoogle: 345.16,
  acaoDaSemana:
    "Avaliar qualidade dos leads, novos criativos e filtrar termos de busca negativos para otimizar o custo por lead.",
  metasDoMes: {
    meta: [
      "🎯 500 leads no mês",
      "💰 CPL abaixo de R$ 2,50",
      "💸 Budget: R$ 900",
      "📈 Testar 2 novos criativos",
    ],
    google: [
      "🎯 25 leads no mês",
      "💰 CPL abaixo de R$ 50,00",
      "💸 Budget: R$ 1.000",
      "🔍 Refinar palavras negativas",
    ],
  },
};

export const monthlySocial = {
  views: 4670,
  reach: 2213,
  newFollowers: 7,
  interactions: 107,
  reels: 8,
  stories: 103,
  posts: 1,
  carrosseis: 1,
  metasDoMes: [
    "👁️ 5.000 visualizações no mês",
    "👥 +15 seguidores novos",
    "🎬 8 Reels publicados",
    "❤️ Taxa de engajamento acima de 3%",
  ],
};

// ─── TRÁFEGO PAGO — PÁGINA DEDICADA ────────────────────────────

// Evolução semanal (Março + Abril combinados Meta+Google)
export const weeklyEvolution = [
  { label: "S1 MAR", leads: 91,  invest: 425, month: "Março" },
  { label: "S2 MAR", leads: 97,  invest: 440, month: "Março" },
  { label: "S3 MAR", leads: 101, invest: 453, month: "Março" },
  { label: "S4 MAR", leads: 103, invest: 462, month: "Março" },
  { label: "S1 ABR", leads: 99,  invest: 450, month: "Abril" },
  { label: "S2 ABR", leads: 106, invest: 473, month: "Abril" },
  { label: "S3 ABR", leads: 113, invest: 484, month: "Abril" },
  { label: "S4 ABR", leads: 118, invest: 488, month: "Abril" },
];

// Funil de conversão
export const trafficFunnel = {
  impressions: 284500,
  clicks: 12300,
  leads: 436,
  estimatedSales: 87,
};

// Budget tracker
export const budgetData = {
  meta:   { total: 900,  spent: 856.79, label: "Meta Ads" },
  google: { total: 1000, spent: 654.84, label: "Google Ads" },
  daysLeft: 23,
  daysTotal: 30,
};

// Top 5 criativos campeões
export interface Creative {
  rank: number;
  name: string;
  type: "video" | "image" | "carousel";
  platform: "meta";
  leads: number;
  cpl: number;
  invest: number;
  status: "active" | "paused";
  thumbBg: string;
  thumbAccent: string;
}

export const topCreatives: Creative[] = [
  { rank: 1, name: "Reels — Quarto com vista",         type: "video",    platform: "meta", leads: 89, cpl: 1.87, invest: 166.43, status: "active", thumbBg: "#1A1A1A", thumbAccent: "#FF6100" },
  { rank: 2, name: "Carrossel — Experiência completa",  type: "carousel", platform: "meta", leads: 74, cpl: 2.01, invest: 148.74, status: "active", thumbBg: "#0F2744", thumbAccent: "#00C2FF" },
  { rank: 3, name: "Imagem — Oferta fim de semana",     type: "image",    platform: "meta", leads: 67, cpl: 2.14, invest: 143.38, status: "paused", thumbBg: "#1E1035", thumbAccent: "#7B2FF7" },
  { rank: 4, name: "Reels — Depoimento de hóspede",    type: "video",    platform: "meta", leads: 58, cpl: 2.29, invest: 132.82, status: "active", thumbBg: "#0D2B1A", thumbAccent: "#AAFF00" },
  { rank: 5, name: "Imagem — Café da manhã incluso",   type: "image",    platform: "meta", leads: 42, cpl: 2.43, invest: 102.06, status: "active", thumbBg: "#2B1A08", thumbAccent: "#FBBC05" },
];

// Histórico mensal
export interface MonthHistory {
  month: string;
  shortMonth: string;
  year: number;
  invest: number;
  leads: number;
  cpl: number;
  avgCpcMeta: number;
  isCurrent?: boolean;
}

export const monthHistory: MonthHistory[] = [
  { month: "Janeiro",   shortMonth: "JAN", year: 2026, invest: 1520, leads: 312, cpl: 4.87, avgCpcMeta: 0.81 },
  { month: "Fevereiro", shortMonth: "FEV", year: 2026, invest: 1680, leads: 358, cpl: 4.69, avgCpcMeta: 0.78 },
  { month: "Março",     shortMonth: "MAR", year: 2026, invest: 1800, leads: 396, cpl: 4.54, avgCpcMeta: 0.71 },
  { month: "Abril",     shortMonth: "ABR", year: 2026, invest: 1895, leads: 436, cpl: 4.35, avgCpcMeta: 0.67, isCurrent: true },
];

// Dados completos por mês para a página de Tráfego Pago
export interface TrafficPageMonth {
  month: string;
  shortMonth: string;
  year: number;
  historyIdx: number; // índice em monthHistory
  funnel: { impressions: number; clicks: number; leads: number; sales: number };
  budget: { meta: { total: number; spent: number }; google: { total: number; spent: number }; daysLeft: number; daysTotal: number };
  platform: {
    meta:   { avgCpl: number; totalLeads: number; percentLeads: number; totalInvest: number; percentInvest: number; bestWeek: string; worstWeek: string };
    google: { avgCpl: number; totalLeads: number; percentLeads: number; totalInvest: number; percentInvest: number; bestWeek: string; worstWeek: string };
  };
  evolutionWeeks: { label: string; leads: number; invest: number; cpl: number; cpcMeta: number }[];
}

export const trafficPageMonths: TrafficPageMonth[] = [
  {
    month: "Janeiro", shortMonth: "JAN", year: 2026, historyIdx: 0,
    funnel: { impressions: 198000, clicks: 8400, leads: 312, sales: 62 },
    budget: { meta: { total: 800, spent: 800 }, google: { total: 900, spent: 900 }, daysLeft: 0, daysTotal: 31 },
    platform: {
      meta:   { avgCpl: 1.98, totalLeads: 295, percentLeads: 94.6, totalInvest: 720, percentInvest: 47.4, bestWeek: "Sem 2 · Jan", worstWeek: "Sem 4 · Jan" },
      google: { avgCpl: 58.40, totalLeads: 17, percentLeads: 5.4,  totalInvest: 800, percentInvest: 52.6, bestWeek: "Sem 3 · Jan", worstWeek: "Sem 1 · Jan" },
    },
    evolutionWeeks: [
      { label: "S1 JAN", leads: 68,  invest: 358, cpl: 5.26, cpcMeta: 0.84 },
      { label: "S2 JAN", leads: 79,  invest: 372, cpl: 4.71, cpcMeta: 0.80 },
      { label: "S3 JAN", leads: 84,  invest: 384, cpl: 4.57, cpcMeta: 0.79 },
      { label: "S4 JAN", leads: 81,  invest: 386, cpl: 4.77, cpcMeta: 0.81 },
    ],
  },
  {
    month: "Fevereiro", shortMonth: "FEV", year: 2026, historyIdx: 1,
    funnel: { impressions: 224000, clicks: 9600, leads: 358, sales: 71 },
    budget: { meta: { total: 850, spent: 850 }, google: { total: 950, spent: 950 }, daysLeft: 0, daysTotal: 28 },
    platform: {
      meta:   { avgCpl: 2.06, totalLeads: 338, percentLeads: 94.4, totalInvest: 817, percentInvest: 46.2, bestWeek: "Sem 3 · Fev", worstWeek: "Sem 1 · Fev" },
      google: { avgCpl: 61.25, totalLeads: 20, percentLeads: 5.6,  totalInvest: 863, percentInvest: 53.8, bestWeek: "Sem 4 · Fev", worstWeek: "Sem 1 · Fev" },
    },
    evolutionWeeks: [
      { label: "S1 FEV", leads: 79,  invest: 398, cpl: 5.04, cpcMeta: 0.79 },
      { label: "S2 FEV", leads: 88,  invest: 415, cpl: 4.72, cpcMeta: 0.76 },
      { label: "S3 FEV", leads: 98,  invest: 430, cpl: 4.39, cpcMeta: 0.73 },
      { label: "S4 FEV", leads: 93,  invest: 424, cpl: 4.56, cpcMeta: 0.75 },
    ],
  },
  {
    month: "Março", shortMonth: "MAR", year: 2026, historyIdx: 2,
    funnel: { impressions: 241200, clicks: 10400, leads: 396, sales: 79 },
    budget: { meta: { total: 900, spent: 900 }, google: { total: 1000, spent: 963 }, daysLeft: 0, daysTotal: 31 },
    platform: {
      meta:   { avgCpl: 2.17, totalLeads: 377, percentLeads: 95.2, totalInvest: 817, percentInvest: 45.9, bestWeek: "Sem 4 · Mar", worstWeek: "Sem 1 · Mar" },
      google: { avgCpl: 64.78, totalLeads: 15, percentLeads: 4.8, totalInvest: 963, percentInvest: 54.1, bestWeek: "Sem 2 · Mar", worstWeek: "Sem 1 · Mar" },
    },
    evolutionWeeks: [
      { label: "S1 MAR", leads: 91,  invest: 425, cpl: 4.67, cpcMeta: 0.74 },
      { label: "S2 MAR", leads: 97,  invest: 440, cpl: 4.54, cpcMeta: 0.72 },
      { label: "S3 MAR", leads: 101, invest: 453, cpl: 4.48, cpcMeta: 0.70 },
      { label: "S4 MAR", leads: 103, invest: 462, cpl: 4.49, cpcMeta: 0.69 },
    ],
  },
  {
    month: "Abril", shortMonth: "ABR", year: 2026, historyIdx: 3,
    funnel: { impressions: 284500, clicks: 12300, leads: 436, sales: 87 },
    budget: { meta: { total: 900, spent: 856.79 }, google: { total: 1000, spent: 654.84 }, daysLeft: 23, daysTotal: 30 },
    platform: {
      meta:   { avgCpl: 2.11, totalLeads: 415, percentLeads: 95.2, totalInvest: 895,  percentInvest: 47.2, bestWeek: "Sem 3 · Abr", worstWeek: "Sem 1 · Abr" },
      google: { avgCpl: 51.83, totalLeads: 21, percentLeads: 4.8,  totalInvest: 1000, percentInvest: 52.8, bestWeek: "Sem 4 · Abr", worstWeek: "Sem 1 · Abr" },
    },
    evolutionWeeks: [
      { label: "S1 ABR", leads: 99,  invest: 450, cpl: 4.55, cpcMeta: 0.71 },
      { label: "S2 ABR", leads: 106, invest: 473, cpl: 4.46, cpcMeta: 0.68 },
      { label: "S3 ABR", leads: 113, invest: 484, cpl: 4.28, cpcMeta: 0.65 },
      { label: "S4 ABR", leads: 118, invest: 488, cpl: 4.14, cpcMeta: 0.63 },
    ],
  },
];

// ─── METAS ──────────────────────────────────────────────────────

export type MetaStatus = "achieved" | "ontrack" | "attention";

export interface GoalItem {
  id: string;
  label: string;
  emoji: string;
  current: number;
  target: number;
  unit: string;
  lowerIsBetter?: boolean; // para CPL, CPC
  platform?: "meta" | "google" | "social";
}

export interface MonthGoals {
  month: string;
  shortMonth: string;
  year: number;
  traffic: GoalItem[];
  social: GoalItem[];
}

export const monthGoals: MonthGoals[] = [
  {
    month: "Janeiro", shortMonth: "JAN", year: 2026,
    traffic: [
      { id: "leads-meta",   label: "Leads Meta",    emoji: "🎯", current: 295, target: 400, unit: "leads",    platform: "meta"   },
      { id: "cpl-meta",     label: "CPL Meta",       emoji: "💰", current: 1.98, target: 2.50, unit: "R$",   lowerIsBetter: true, platform: "meta"   },
      { id: "leads-google", label: "Leads Google",  emoji: "🎯", current: 17,  target: 20,  unit: "leads",    platform: "google" },
      { id: "cpl-google",   label: "CPL Google",    emoji: "💰", current: 58.40, target: 60.00, unit: "R$", lowerIsBetter: true, platform: "google" },
      { id: "budget-meta",  label: "Budget Meta",   emoji: "💸", current: 800, target: 800, unit: "R$",       platform: "meta"   },
    ],
    social: [
      { id: "views",       label: "Visualizações",   emoji: "👁️", current: 3200, target: 4000,  unit: "views" },
      { id: "followers",   label: "Seguidores novos",emoji: "👥", current: 5,    target: 10,    unit: "seguidores" },
      { id: "reels",       label: "Reels publicados",emoji: "🎬", current: 6,    target: 8,     unit: "reels" },
      { id: "engagement",  label: "Engajamento",     emoji: "❤️", current: 3.8,  target: 3.0,   unit: "%", lowerIsBetter: false },
    ],
  },
  {
    month: "Fevereiro", shortMonth: "FEV", year: 2026,
    traffic: [
      { id: "leads-meta",   label: "Leads Meta",    emoji: "🎯", current: 338, target: 440, unit: "leads",    platform: "meta"   },
      { id: "cpl-meta",     label: "CPL Meta",       emoji: "💰", current: 2.06, target: 2.50, unit: "R$",   lowerIsBetter: true, platform: "meta"   },
      { id: "leads-google", label: "Leads Google",  emoji: "🎯", current: 20,  target: 22,  unit: "leads",    platform: "google" },
      { id: "cpl-google",   label: "CPL Google",    emoji: "💰", current: 61.25, target: 60.00, unit: "R$", lowerIsBetter: true, platform: "google" },
      { id: "budget-meta",  label: "Budget Meta",   emoji: "💸", current: 850, target: 850, unit: "R$",       platform: "meta"   },
    ],
    social: [
      { id: "views",       label: "Visualizações",   emoji: "👁️", current: 3670, target: 4500,  unit: "views" },
      { id: "followers",   label: "Seguidores novos",emoji: "👥", current: 6,    target: 12,    unit: "seguidores" },
      { id: "reels",       label: "Reels publicados",emoji: "🎬", current: 7,    target: 8,     unit: "reels" },
      { id: "engagement",  label: "Engajamento",     emoji: "❤️", current: 4.1,  target: 3.0,   unit: "%", lowerIsBetter: false },
    ],
  },
  {
    month: "Março", shortMonth: "MAR", year: 2026,
    traffic: [
      { id: "leads-meta",   label: "Leads Meta",    emoji: "🎯", current: 377, target: 460, unit: "leads",    platform: "meta"   },
      { id: "cpl-meta",     label: "CPL Meta",       emoji: "💰", current: 2.17, target: 2.50, unit: "R$",   lowerIsBetter: true, platform: "meta"   },
      { id: "leads-google", label: "Leads Google",  emoji: "🎯", current: 15,  target: 22,  unit: "leads",    platform: "google" },
      { id: "cpl-google",   label: "CPL Google",    emoji: "💰", current: 64.78, target: 60.00, unit: "R$", lowerIsBetter: true, platform: "google" },
      { id: "budget-meta",  label: "Budget Meta",   emoji: "💸", current: 900, target: 900, unit: "R$",       platform: "meta"   },
    ],
    social: [
      { id: "views",       label: "Visualizações",   emoji: "👁️", current: 3670, target: 5000,  unit: "views" },
      { id: "followers",   label: "Seguidores novos",emoji: "👥", current: 6,    target: 15,    unit: "seguidores" },
      { id: "reels",       label: "Reels publicados",emoji: "🎬", current: 7,    target: 8,     unit: "reels" },
      { id: "engagement",  label: "Engajamento",     emoji: "❤️", current: 4.3,  target: 3.0,   unit: "%", lowerIsBetter: false },
    ],
  },
  {
    month: "Abril", shortMonth: "ABR", year: 2026,
    traffic: [
      { id: "leads-meta",   label: "Leads Meta",    emoji: "🎯", current: 415,  target: 500,   unit: "leads",    platform: "meta"   },
      { id: "cpl-meta",     label: "CPL Meta",       emoji: "💰", current: 2.11, target: 2.50,  unit: "R$",      lowerIsBetter: true, platform: "meta"   },
      { id: "leads-google", label: "Leads Google",  emoji: "🎯", current: 21,   target: 25,    unit: "leads",    platform: "google" },
      { id: "cpl-google",   label: "CPL Google",    emoji: "💰", current: 51.83,target: 50.00, unit: "R$",      lowerIsBetter: true, platform: "google" },
      { id: "budget-meta",  label: "Budget Meta",   emoji: "💸", current: 857,  target: 900,   unit: "R$",       platform: "meta"   },
    ],
    social: [
      { id: "views",       label: "Visualizações",   emoji: "👁️", current: 4670, target: 5000,  unit: "views" },
      { id: "followers",   label: "Seguidores novos",emoji: "👥", current: 7,    target: 15,    unit: "seguidores" },
      { id: "reels",       label: "Reels publicados",emoji: "🎬", current: 8,    target: 8,     unit: "reels" },
      { id: "engagement",  label: "Engajamento",     emoji: "❤️", current: 4.83, target: 3.0,   unit: "%", lowerIsBetter: false },
    ],
  },
];

// ─── SOCIAL MEDIA — PÁGINA DEDICADA ─────────────────────────────

export interface SocialTopPost {
  rank: number;
  title: string;
  type: "reel" | "post" | "carousel" | "story";
  views: number;
  likes: number;
  comments: number;
  shares: number;
  thumbBg: string;
  thumbAccent: string;
}

export interface FormatStat {
  format: string;
  emoji: string;
  count: number;
  avgViews: number;
  avgEngagement: number;
  color: string;
}

export interface DayPresence {
  day: number;
  weekday: number; // 0=dom ... 6=sab
  posts: number;
  views: number;
}

export interface SocialPageMonth {
  month: string;
  shortMonth: string;
  year: number;
  kpis: { views: number; reach: number; newFollowers: number; interactions: number; reels: number; stories: number; posts: number; carrosseis: number };
  evolutionWeeks: { label: string; views: number; followers: number; interactions: number; posts: number }[];
  formatStats: FormatStat[];
  topPosts: SocialTopPost[];
  engagementRate: number;
  dailyPresence: DayPresence[];
}

export const socialPageMonths: SocialPageMonth[] = [
  {
    month: "Março", shortMonth: "MAR", year: 2026,
    kpis: { views: 3670, reach: 1820, newFollowers: 6, interactions: 84, reels: 6, stories: 89, posts: 1, carrosseis: 1 },
    evolutionWeeks: [
      { label: "S1 MAR", views: 750,  followers: 1, interactions: 18, posts: 2 },
      { label: "S2 MAR", views: 890,  followers: 2, interactions: 22, posts: 3 },
      { label: "S3 MAR", views: 1100, followers: 1, interactions: 28, posts: 3 },
      { label: "S4 MAR", views: 930,  followers: 2, interactions: 16, posts: 2 },
    ],
    formatStats: [
      { format: "Reels",    emoji: "🎬", count: 6,   avgViews: 412,  avgEngagement: 5.2, color: "#FF6100" },
      { format: "Stories",  emoji: "📲", count: 89,  avgViews: 28,   avgEngagement: 1.8, color: "#7B2FF7" },
      { format: "Posts",    emoji: "🖼️", count: 1,   avgViews: 310,  avgEngagement: 3.9, color: "#00C2FF" },
      { format: "Carrossel",emoji: "📑", count: 1,   avgViews: 280,  avgEngagement: 4.1, color: "#AAFF00" },
    ],
    topPosts: [
      { rank: 1, title: "Quarto com vista para o mar — transformação", type: "reel",     views: 2900, likes: 87,  comments: 12, shares: 24, thumbBg: "#1A1A1A", thumbAccent: "#FF6100" },
      { rank: 2, title: "Café da manhã incluído — novidade!",          type: "reel",     views: 1840, likes: 64,  comments: 8,  shares: 11, thumbBg: "#0F2744", thumbAccent: "#00C2FF" },
      { rank: 3, title: "5 razões para se hospedar na Staytrix",       type: "carousel", views: 980,  likes: 41,  comments: 6,  shares: 9,  thumbBg: "#1E1035", thumbAccent: "#7B2FF7" },
      { rank: 4, title: "Check-in sem filas — tecnologia no hotel",    type: "post",     views: 760,  likes: 28,  comments: 3,  shares: 5,  thumbBg: "#0D2B1A", thumbAccent: "#AAFF00" },
      { rank: 5, title: "Tour pelo lobby renovado",                    type: "reel",     views: 640,  likes: 22,  comments: 4,  shares: 7,  thumbBg: "#2B1A08", thumbAccent: "#FBBC05" },
    ],
    engagementRate: 4.3,
    dailyPresence: [
      { day: 1,  weekday: 0, posts: 0, views: 0   }, { day: 2,  weekday: 1, posts: 1, views: 210 },
      { day: 3,  weekday: 2, posts: 0, views: 0   }, { day: 4,  weekday: 3, posts: 1, views: 180 },
      { day: 5,  weekday: 4, posts: 0, views: 0   }, { day: 6,  weekday: 5, posts: 1, views: 360 },
      { day: 7,  weekday: 6, posts: 0, views: 0   }, { day: 8,  weekday: 0, posts: 1, views: 195 },
      { day: 9,  weekday: 1, posts: 1, views: 220 }, { day: 10, weekday: 2, posts: 0, views: 0   },
      { day: 11, weekday: 3, posts: 1, views: 285 }, { day: 12, weekday: 4, posts: 1, views: 310 },
      { day: 13, weekday: 5, posts: 1, views: 395 }, { day: 14, weekday: 6, posts: 0, views: 0   },
      { day: 15, weekday: 0, posts: 1, views: 240 }, { day: 16, weekday: 1, posts: 1, views: 265 },
      { day: 17, weekday: 2, posts: 0, views: 0   }, { day: 18, weekday: 3, posts: 1, views: 310 },
      { day: 19, weekday: 4, posts: 1, views: 340 }, { day: 20, weekday: 5, posts: 1, views: 420 },
      { day: 21, weekday: 6, posts: 0, views: 0   }, { day: 22, weekday: 0, posts: 1, views: 195 },
      { day: 23, weekday: 1, posts: 0, views: 0   }, { day: 24, weekday: 2, posts: 1, views: 215 },
      { day: 25, weekday: 3, posts: 1, views: 230 }, { day: 26, weekday: 4, posts: 0, views: 0   },
      { day: 27, weekday: 5, posts: 1, views: 285 }, { day: 28, weekday: 6, posts: 0, views: 0   },
      { day: 29, weekday: 0, posts: 1, views: 200 }, { day: 30, weekday: 1, posts: 0, views: 0   },
      { day: 31, weekday: 2, posts: 1, views: 220 },
    ],
  },
  {
    month: "Abril", shortMonth: "ABR", year: 2026,
    kpis: { views: 4670, reach: 2213, newFollowers: 7, interactions: 107, reels: 8, stories: 103, posts: 1, carrosseis: 1 },
    evolutionWeeks: [
      { label: "S1 ABR", views: 980,  followers: 1, interactions: 22, posts: 3 },
      { label: "S2 ABR", views: 1240, followers: 2, interactions: 28, posts: 2 },
      { label: "S3 ABR", views: 1890, followers: 3, interactions: 38, posts: 4 },
      { label: "S4 ABR", views: 2100, followers: 1, interactions: 19, posts: 3 },
    ],
    formatStats: [
      { format: "Reels",    emoji: "🎬", count: 8,   avgViews: 481,  avgEngagement: 5.8, color: "#FF6100" },
      { format: "Stories",  emoji: "📲", count: 103, avgViews: 31,   avgEngagement: 2.1, color: "#7B2FF7" },
      { format: "Posts",    emoji: "🖼️", count: 1,   avgViews: 390,  avgEngagement: 4.2, color: "#00C2FF" },
      { format: "Carrossel",emoji: "📑", count: 1,   avgViews: 340,  avgEngagement: 4.6, color: "#AAFF00" },
    ],
    topPosts: [
      { rank: 1, title: "Quarto com vista — estilo Twitter corto",     type: "reel",     views: 2900, likes: 112, comments: 18, shares: 34, thumbBg: "#1A1A1A", thumbAccent: "#FF6100" },
      { rank: 2, title: "Depoimento real de hóspede satisfeito",       type: "reel",     views: 2100, likes: 89,  comments: 14, shares: 21, thumbBg: "#0F2744", thumbAccent: "#00C2FF" },
      { rank: 3, title: "5 experiências únicas na Staytrix",           type: "carousel", views: 1240, likes: 52,  comments: 9,  shares: 15, thumbBg: "#1E1035", thumbAccent: "#7B2FF7" },
      { rank: 4, title: "Bastidores: preparando o café da manhã",      type: "reel",     views: 980,  likes: 38,  comments: 6,  shares: 12, thumbBg: "#0D2B1A", thumbAccent: "#AAFF00" },
      { rank: 5, title: "Vista do pôr do sol pelo terraço",            type: "post",     views: 760,  likes: 31,  comments: 5,  shares: 8,  thumbBg: "#2B1A08", thumbAccent: "#FBBC05" },
    ],
    engagementRate: 4.83,
    dailyPresence: [
      { day: 1,  weekday: 2, posts: 1, views: 210 }, { day: 2,  weekday: 3, posts: 0, views: 0   },
      { day: 3,  weekday: 4, posts: 1, views: 185 }, { day: 4,  weekday: 5, posts: 1, views: 310 },
      { day: 5,  weekday: 6, posts: 0, views: 0   }, { day: 6,  weekday: 0, posts: 1, views: 195 },
      { day: 7,  weekday: 1, posts: 1, views: 280 }, { day: 8,  weekday: 2, posts: 1, views: 245 },
      { day: 9,  weekday: 3, posts: 0, views: 0   }, { day: 10, weekday: 4, posts: 1, views: 320 },
      { day: 11, weekday: 5, posts: 1, views: 415 }, { day: 12, weekday: 6, posts: 0, views: 0   },
      { day: 13, weekday: 0, posts: 1, views: 260 }, { day: 14, weekday: 1, posts: 1, views: 295 },
      { day: 15, weekday: 2, posts: 1, views: 380 }, { day: 16, weekday: 3, posts: 1, views: 440 },
      { day: 17, weekday: 4, posts: 1, views: 510 }, { day: 18, weekday: 5, posts: 1, views: 620 },
      { day: 19, weekday: 6, posts: 0, views: 0   }, { day: 20, weekday: 0, posts: 1, views: 350 },
      { day: 21, weekday: 1, posts: 1, views: 390 }, { day: 22, weekday: 2, posts: 1, views: 460 },
      { day: 23, weekday: 3, posts: 1, views: 520 }, { day: 24, weekday: 4, posts: 1, views: 580 },
      { day: 25, weekday: 5, posts: 1, views: 695 }, { day: 26, weekday: 6, posts: 0, views: 0   },
      { day: 27, weekday: 0, posts: 1, views: 420 }, { day: 28, weekday: 1, posts: 1, views: 480 },
    ],
  },
];

// Comparação por plataforma
export const platformStats = {
  meta: {
    bestWeek: "Sem 3 · Abril",
    worstWeek: "Sem 1 · Março",
    avgCpl: 2.11,
    totalLeads: 415,
    percentLeads: 95.2,
    totalInvest: 895,
    percentInvest: 47.2,
  },
  google: {
    bestWeek: "Sem 4 · Abril",
    worstWeek: "Sem 1 · Março",
    avgCpl: 51.83,
    totalLeads: 21,
    percentLeads: 4.8,
    totalInvest: 1000,
    percentInvest: 52.8,
  },
};
