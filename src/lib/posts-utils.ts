import type { PostStatus, PostPlatform } from "@/types/posts";

// ─── Calendar Grid ────────────────────────────────────────────────────────────

export interface CalendarCell {
  date: Date;
  isCurrentMonth: boolean;
}

/**
 * Returns a 6×7 grid of calendar cells for the given year/month (0-indexed month).
 * Weeks start on Monday.
 */
export function buildCalendarGrid(year: number, month: number): CalendarCell[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Monday = 0 offset (getDay returns 0=Sun, so shift)
  const startOffset = (firstDay.getDay() + 6) % 7; // days before month starts

  const cells: CalendarCell[] = [];

  // Leading days from previous month
  for (let i = startOffset - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    cells.push({ date: d, isCurrentMonth: false });
  }

  // Days of current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    cells.push({ date: new Date(year, month, d), isCurrentMonth: true });
  }

  // Trailing days to fill 42 cells (6 rows × 7 cols)
  let trailing = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, trailing++), isCurrentMonth: false });
  }

  // Split into 6 rows of 7
  const grid: CalendarCell[][] = [];
  for (let row = 0; row < 6; row++) {
    grid.push(cells.slice(row * 7, row * 7 + 7));
  }
  return grid;
}

/** Format Date to "YYYY-MM-DD" string for use as map keys */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Group posts by their scheduled date string "YYYY-MM-DD" */
export function groupPostsByDate<T extends { scheduled_at: string | null }>(
  posts: T[]
): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const post of posts) {
    if (!post.scheduled_at) continue;
    const key = post.scheduled_at.slice(0, 10); // "YYYY-MM-DD"
    const arr = map.get(key) ?? [];
    arr.push(post);
    map.set(key, arr);
  }
  return map;
}

// ─── Status Colors ────────────────────────────────────────────────────────────

export const STATUS_COLORS: Record<PostStatus, string> = {
  draft:            "#6b7280",
  pending_approval: "#FF6100",
  approved:         "#AAFF00",
  rejected:         "#ef4444",
  published:        "#00C2FF",
};

export const STATUS_LABELS: Record<PostStatus, string> = {
  draft:            "Rascunho",
  pending_approval: "Aguardando aprovação",
  approved:         "Aprovado",
  rejected:         "Solicitar alteração",
  published:        "Publicado",
};

// ─── Platform Colors & Labels ─────────────────────────────────────────────────

export const PLATFORM_COLORS: Record<PostPlatform, string> = {
  instagram: "#E1306C",
  facebook:  "#1877F2",
  tiktok:    "#1A1A1A",
};

export const PLATFORM_LABELS: Record<PostPlatform, string> = {
  instagram: "Instagram",
  facebook:  "Facebook",
  tiktok:    "TikTok",
};

// ─── Post Type Labels ─────────────────────────────────────────────────────────

export const POST_TYPE_LABELS: Record<string, string> = {
  reel:     "Reel",
  post:     "Post",
  story:    "Story",
  carousel: "Carrossel",
};

// ─── Month nav helpers ────────────────────────────────────────────────────────

export const MONTH_NAMES_PT = [
  "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
  "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro",
];

export const WEEKDAY_NAMES_PT = ["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
