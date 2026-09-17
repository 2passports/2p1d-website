import type { ReactNode } from 'react'
import type { DiscountCode } from '../../data/discount-codes'
import {
  formatOfferDate,
  offerStatusLabels,
  offerStatusOf,
} from '../_lib/offer'

// A compact summary of the offer and the trust details we hold for it. Every
// row is optional and only renders when the central data has a real value, so
// nothing is shown that has not been confirmed.
export function OfferAtAGlance({
  item,
  offer,
  code,
}: {
  item: DiscountCode
  // Offer and code come from the brand page data, so the block always matches
  // the wording used elsewhere on the same page.
  offer: string
  code: string | null
}) {
  const status = offerStatusOf(item)
  const lastChecked = formatOfferDate(item.verifiedDate)
  const expiry = formatOfferDate(item.offerExpiry)
  const showCode = status === 'active' || status === 'limited'

  const rows: { label: string; value: ReactNode }[] = []

  rows.push({ label: 'Offer', value: offer })
  if (showCode) {
    rows.push({
      label: 'Code',
      value: code ? (
        <span className="font-mono font-bold text-primary tracking-wider break-all">{code}</span>
      ) : (
        'No code needed, applied through our link'
      ),
    })
  }
  rows.push({ label: 'Status', value: offerStatusLabels[status] })
  if (lastChecked) rows.push({ label: 'Last checked', value: lastChecked })
  if (expiry) rows.push({ label: 'Expires', value: expiry })
  if (item.eligibility && item.eligibility.length > 0) {
    rows.push({
      label: 'Eligibility',
      value:
        item.eligibility.length === 1 ? (
          item.eligibility[0]
        ) : (
          <ul className="space-y-1">
            {item.eligibility.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ),
    })
  }
  if (item.regions && item.regions.length > 0) {
    rows.push({ label: 'Region', value: item.regions.join(', ') })
  }
  if (item.personallyUsed) {
    rows.push({
      label: 'Personally used by us',
      value: item.personalUseNote ? `Yes. ${item.personalUseNote}` : 'Yes',
    })
  }
  if (item.termsNote) rows.push({ label: 'Terms', value: item.termsNote })

  return (
    <section className="border border-stone-200 rounded-2xl p-6 sm:p-8">
      <h2 className="text-lg font-bold mb-5">Offer at a glance</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-[11px] font-bold uppercase tracking-widest text-muted mb-1">
              {row.label}
            </dt>
            <dd className="text-sm text-foreground leading-relaxed">{row.value}</dd>
          </div>
        ))}
      </dl>
      {status === 'limited' && (
        <p className="text-sm text-muted leading-relaxed mt-5">
          Availability may be limited, so this offer could end sooner than expected.
        </p>
      )}
    </section>
  )
}
