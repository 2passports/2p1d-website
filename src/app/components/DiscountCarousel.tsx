'use client'

import Image from 'next/image'
import Link from 'next/link'
import { discountCodes, type DiscountCode } from '../data/discount-codes'

function DealCard({
  item,
  isDuplicate = false,
  mobile = false,
}: {
  item: DiscountCode
  isDuplicate?: boolean
  mobile?: boolean
}) {
  const href = item.slug ? `/discount-codes/${item.slug}` : item.affiliateUrl
  const isExternal = !item.slug

  return (
    <a
      href={href}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-hidden={isDuplicate ? true : undefined}
      tabIndex={isDuplicate ? -1 : undefined}
      aria-label={
        isDuplicate
          ? undefined
          : `${item.name}: ${item.offer}${item.code ? `. Discount code: ${item.code}` : '. No code needed'}.`
      }
      className={`${isDuplicate ? 'deals-card-dup' : ''} flex-shrink-0 ${mobile ? 'w-52 snap-start' : 'w-56'} bg-white rounded-2xl shadow-sm border border-stone-100 p-4 flex flex-col gap-3 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(23,78,93,0.12)] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2`}
    >
      {/* Logo badge */}
      <div className="w-11 h-11 rounded-xl bg-[#FFF4DF] border border-[#F0DDB0] flex items-center justify-center flex-shrink-0 overflow-hidden">
        {item.logoImage ? (
          <Image
            src={item.logoImage}
            alt=""
            width={32}
            height={32}
            className="object-contain w-8 h-8"
          />
        ) : (
          <span className="text-[9px] font-bold text-primary text-center leading-tight px-1">
            {item.badgeText}
          </span>
        )}
      </div>

      {/* Brand name and offer */}
      <div>
        <p className="font-bold text-sm text-foreground leading-snug">{item.name}</p>
        <span className="mt-1.5 inline-block bg-accent text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
          {item.offer}
        </span>
      </div>

      {/* Code chip */}
      <div className="rounded-lg bg-[#FFF9EF] border border-[#F0DDB0] px-2.5 py-2 min-h-[44px] flex flex-col justify-center">
        {item.code ? (
          <>
            <p className="text-[9px] font-bold uppercase tracking-widest text-muted mb-0.5">
              Code
            </p>
            <p className="font-mono text-xs font-bold text-primary tracking-wider break-all">
              {item.code}
            </p>
          </>
        ) : (
          <p className="text-[10px] font-medium text-muted">No code needed</p>
        )}
      </div>

      {/* View deal */}
      <p className="text-[11px] font-semibold text-accent mt-auto flex items-center gap-1">
        View deal
        <svg
          width="10"
          height="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </p>
    </a>
  )
}

export default function DiscountCarousel() {
  return (
    <section
      aria-labelledby="deals-heading"
      className="py-14 bg-[#FFF9EF] border-t border-[#F0DDB0] overflow-hidden"
    >
      {/* Section header */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
          <div>
            <span className="inline-block bg-accent/10 text-accent text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
              Travel Deals
            </span>
            <h2 id="deals-heading" className="text-3xl font-bold text-primary mb-3">
              Travel deals we currently use
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-xl">
              A few useful codes and links for travel, packing, staying connected, creator gear and more.
            </p>
          </div>
          <Link
            href="/discount-codes"
            className="self-start sm:self-auto flex-shrink-0 bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-200 text-sm whitespace-nowrap"
          >
            View all discount codes
          </Link>
        </div>
      </div>

      {/* Desktop: auto-scrolling marquee */}
      <div className="hidden sm:block relative">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#FFF9EF] to-transparent z-10"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#FFF9EF] to-transparent z-10"
          aria-hidden="true"
        />

        <div className="deals-track-wrapper overflow-hidden" aria-label="Discount code deals">
          <div className="deals-track flex gap-5 w-max py-3 px-6" role="list">
            {discountCodes.map((item) => (
              <DealCard key={item.name} item={item} />
            ))}
            {discountCodes.map((item) => (
              <DealCard key={`${item.name}-dup`} item={item} isDuplicate />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: swipeable horizontal scroll */}
      <div
        className="sm:hidden flex gap-4 overflow-x-auto pb-3 px-4 snap-x snap-mandatory"
        role="list"
        aria-label="Discount code deals"
      >
        {discountCodes.map((item) => (
          <DealCard key={item.name} item={item} mobile />
        ))}
      </div>

      {/* Mobile CTA */}
      <div className="sm:hidden text-center mt-5 px-4">
        <Link
          href="/discount-codes"
          className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-accent-dark transition-colors text-sm"
        >
          View all discount codes
        </Link>
      </div>

      {/* Friendly affiliate disclosure */}
      <p className="max-w-6xl mx-auto px-4 mt-6 text-center text-xs text-muted">
        Some links are affiliate links. If you buy through them we may earn a small commission, at no extra cost to you.
      </p>
    </section>
  )
}
