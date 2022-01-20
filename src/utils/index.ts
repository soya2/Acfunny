export function dateParse (time: string): string {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const h = date.getHours()
  const mi = date.getMinutes()
  return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d} ${h}:${mi < 10 ? `0${mi}` : mi}`
}
