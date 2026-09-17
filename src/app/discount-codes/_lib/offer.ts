import {
  discountCodes,
  type DiscountCode,
  type OfferStatus,
} from '../../data/discount-codes'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Formats a stored YYYY-MM-DD date as "17 September 2026". The string is split
// by hand rather than passed to Date, so the output never depends on the build
// date, the server time zone or the visitor's browser.
export function formatOfferDate(isoDate: string | null | undefined): string | null {
  if (!isoDate) return null
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate)
  if (!match) return null
  const [, year, month, day] = match
  const monthName = MONTHS[Number(month) - 1]
  if (!monthName) return null
  return `${Number(day)} ${monthName} ${year}`
}

export function getDiscountBySlug(slug: string): DiscountCode | undefined {
  return discountCodes.find((item) => item.slug === slug)
}

// Offers with no status set are treated as active.
export function offerStatusOf(item: DiscountCode | undefined): OfferStatus {
  return item?.offerStatus ?? 'active'
}

// Paused and ended offers keep their pages, but their codes and offer buttons
// are not presented as usable.
export function isOfferAvailable(status: OfferStatus): boolean {
  return status === 'active' || status === 'limited'
}

export const offerStatusLabels: Record<OfferStatus, string> = {
  active: 'Active',
  limited: 'Active, limited availability',
  paused: 'Temporarily unavailable',
  ended: 'Ended',
}

// The most recent verifiedDate across the given offers, or null if none are set.
// YYYY-MM-DD strings sort correctly as plain text.
export function latestVerifiedDate(items: DiscountCode[]): string | null {
  const dates = items.map((item) => item.verifiedDate).filter((d): d is string => Boolean(d))
  return dates.length > 0 ? dates.sort().at(-1)! : null
}
