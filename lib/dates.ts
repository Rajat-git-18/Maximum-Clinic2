const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function isRealIsoDate(iso: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

export function utcTodayIso(now = new Date()): string {
  return now.toISOString().slice(0, 10);
}

export function addUtcDays(iso: string, days: number): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/** Allows a one-day margin so a patient's local "today" is not rejected by UTC. */
export function isPreferredDateAcceptable(iso: string, now = new Date()): boolean {
  if (!isRealIsoDate(iso)) return false;
  const today = utcTodayIso(now);
  const earliest = addUtcDays(today, -1);
  const latest = addUtcDays(today, 366);
  return iso >= earliest && iso <= latest;
}

export function formatDisplayDate(iso: string): string {
  if (!isRealIsoDate(iso)) return iso;
  const [, year, month, day] = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso) ?? [];
  const label = MONTHS[Number(month) - 1];
  if (!label || !year || !day) return iso;
  return `${Number(day)} ${label} ${year}`;
}
