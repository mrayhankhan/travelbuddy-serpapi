import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDurationFromDays(dayCount: number): string {
  const safeDays = Math.max(0, Math.floor(dayCount))
  const nights = Math.max(0, safeDays - 1)
  const dayLabel = safeDays === 1 ? "Day" : "Days"
  const nightLabel = nights === 1 ? "Night" : "Nights"
  return `${safeDays} ${dayLabel} / ${nights} ${nightLabel}`
}

export function deriveDurationLabel(
  days: unknown[] | null | undefined,
  fallback = "",
): string {
  const dayCount = Array.isArray(days) ? days.length : 0
  if (dayCount > 0) return formatDurationFromDays(dayCount)
  return fallback
}
