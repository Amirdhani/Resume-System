export function formatDates(start, end) {
  if (!start) return "";
  if (!end) return start;
  return `${start} — ${end}`;
}