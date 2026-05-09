// ─── Shared formatting helpers ──────────────────────────────
// Used across dashboard, meta, google, and future platform pages.

export function fmt(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function fmtCompact(value: number | undefined | null): string {
  if (value == null || value === 0) return "—";
  return `R$ ${value.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function fmtNum(value: number): string {
  return value.toLocaleString("pt-BR");
}

export function fmtNumSafe(value: number | undefined | null, decimals = 0): string {
  if (value == null || value === 0) return "—";
  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtPct(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function fmtDate(dateStr: string): string {
  if (!dateStr) return "—";
  const parts = dateStr.split("-");
  if (parts.length < 3) return dateStr;
  return `${parts[2]}/${parts[1]}`;
}

export function monthName(month: number): string {
  const names = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez",
  ];
  return names[month - 1] ?? "";
}

export function monthNameFull(month: number): string {
  const names = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
  ];
  return names[month - 1] ?? "";
}

export function progressPct(actual: number, target: number): number {
  if (!target || target <= 0) return 0;
  return Math.min(100, Math.round((actual / target) * 100));
}

/**
 * Calculate delta percentage between current and previous values.
 * Returns null if previous is 0 or missing.
 */
export function calcDelta(
  current: number | null | undefined,
  previous: number | null | undefined
): number | null {
  if (current == null || previous == null || previous === 0) return null;
  return ((current - previous) / previous) * 100;
}
