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

// Keep backward compat
export const trafficWeeks = trafficMonths[1].weeks;

export const socialWeeks: SocialWeek[] = [
  { label: "SEM 1", dates: "01-07 ABR", views: 980, newFollowers: 1, posts: 3 },
  { label: "SEM 2", dates: "08-14 ABR", views: 1240, newFollowers: 2, posts: 2 },
  { label: "SEM 3", dates: "15-21 ABR", views: 1890, newFollowers: 3, posts: 4 },
  { label: "SEM 4", dates: "22-28 ABR", views: 2100, newFollowers: 1, posts: 3 },
];

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
