export function pad2(n) { return String(n).padStart(2, '0') }
export function toISODate(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return `${x.getFullYear()}-${pad2(x.getMonth() + 1)}-${pad2(x.getDate())}`
}
export function fromISODate(s) {
  const [y, m, d] = s.split('-').map(Number)
  const dt = new Date(y, m - 1, d)
  dt.setHours(0, 0, 0, 0)
  return dt
}
export function addDays(d, n) {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}
export function fmtDayHeader(d) {
  return d.toLocaleDateString('ru-RU', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' }).replace(',', '')
}
export function startOfWeek(d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  const day = x.getDay()
  const diff = day === 0 ? -6 : 1 - day
  x.setDate(x.getDate() + diff)
  return x
}
export function firstFullWeekStartOfMonth(year, monthIndex) {
  const first = new Date(year, monthIndex, 1)
  const start = startOfWeek(first)
  if (start.getMonth() !== monthIndex) return addDays(start, 7)
  return start
}
export function fmtWeekLabel(startDate) {
  const endDate = addDays(startDate, 6)
  const a = startDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const b = endDate.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' })
  return `${a} — ${b}`
}
