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
