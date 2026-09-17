import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { discountCodes, supportLinks, type DiscountCode } from '../data/discount-codes'
import { CopyCodeButton } from '../components/CopyCodeButton'
import { SPONSORED_LINK_REL } from '../lib/links'
import { discountSectionMetadata } from './_lib/metadata'
import {
  formatOfferDate,
  isOfferAvailable,
  latestVerifiedDate,
  offerStatusLabels,
  offerStatusOf,
} from './_lib/offer'

export const metadata: Metadata = discountSectionMetadata({
  title: '2Passports1Dream Discount Codes 2026 | Travel, Tech & Creator Deals',
  description:
    'Browse current 2Passports1Dream discount codes and partner offers for travel, tech, lifestyle and creator tools. The codes and deals we share with our audience.',
  path: '/discount-codes',
})

const codeCategories = [
  'Travel Experiences and Tours',
  'Connectivity and Online Safety',
  'Luggage and Packing',
  'Creator Gear',
  'Creator and Business Tools',
  'Travel Health and Lifestyle',
  'Languages and Learning',
  'Skincare and Beauty',
  'Money and Travel Cards',
  'Memberships and Perks',
]

/** Converts a category name into a stable anchor ID, e.g. "Luggage and Packing" -> "luggage-and-packing" */
function categorySlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const categoryIntros: Record<string, string> = {
  'Travel Experiences and Tours':
    'Book tours, activities and experiences in advance so you can focus on the actual trip.',
  'Connectivity and Online Safety':
    'Stay connected and secure while travelling, from the moment you land to hotel WiFi and beyond.',
  'Luggage and Packing':
    'Bags, cases and gear that make packing and travel days feel a bit less chaotic.',
  'Creator Gear':
    'Compact kit for filming and capturing travel as you go.',
  'Creator and Business Tools':
    'Software and services that help creators and small businesses stay organised and connected.',
  'Travel Health and Lifestyle':
    'Tools for tracking and looking after yourself during busy travel schedules.',
  'Languages and Learning':
    'Apps for picking up a new language, whether for a trip or for family.',
  'Skincare and Beauty':
    'Simple skincare tools for keeping your routine manageable while on the road.',
  'Money and Travel Cards':
    'Cards and tools that make spending and managing money abroad feel simpler.',
  'Memberships and Perks':
    'Memberships that can unlock VIP perks and preferred pricing across travel, lifestyle and business brands.',
}

// Descriptive internal link text, e.g. "View Babbel discount code" or, for
// link-only offers, "View AG1 discount details".
function brandLinkText(item: DiscountCode): string {
  return item.code && isOfferAvailable(offerStatusOf(item))
    ? `View ${item.badgeText} discount code`
    : `View ${item.badgeText} discount details`
}

export default function DiscountCodesPage() {
  // Dates come from verifiedDate in the central data, never the build date.
  // The single "checked on" sentence is only shown when every offer shares the
  // same date, otherwise visitors are pointed to each offer's own date.
  const latestChecked = latestVerifiedDate(discountCodes)
  const allCheckedTogether =
    latestChecked !== null && discountCodes.every((item) => item.verifiedDate === latestChecked)
  const summaryRows = [...discountCodes].sort((a, b) => a.name.localeCompare(b.name, 'en-GB'))

  return (
    <>
      {/* Hero: two-column on desktop (text left, photo right), stacked on
          mobile with the photo on top. Mirrors the Work With Us and brand
          page hero style so the section feels warm rather than text-only. */}
      <section className="hero-bg py-12 lg:py-16 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Photo: top on mobile, right on desktop. Kept deliberately
                compact so it supports the text rather than dominating the
                hero. */}
            <div className="lg:order-last flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[16rem] sm:max-w-[17rem] lg:max-w-[18rem] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/15">
                <Image
                  src="/images/DylanAdrianaCruise.jpg"
                  alt="Adriana and Dylan watching the sunset on a cruise with 2Passports1Dream"
                  fill
                  sizes="(max-width: 640px) 256px, 288px"
                  className="object-cover"
                  style={{ objectPosition: 'center 35%' }}
                  priority
                />
              </div>
            </div>

            {/* Text */}
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                Travel Deals &amp; Useful Links
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                2Passports1Dream Discount Codes
              </h1>
              <p className="text-white/80 leading-relaxed max-w-md mx-auto lg:mx-0 text-sm">
                Browse the latest 2Passports1Dream discount codes, offers and travel deals we
                currently share with our community.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Content */}
      <div className="pt-8 pb-14 px-4 bg-[#FFF9EF]">
        <div className="max-w-6xl mx-auto">

          {/* Trust: how the offers are sourced and checked */}
          <section
            aria-labelledby="trust-heading"
            className="mb-6 rounded-2xl border border-[#F0DDB0] bg-white shadow-sm px-6 py-7 sm:px-8"
          >
            <h2 id="trust-heading" className="text-xl font-bold text-primary mb-3">
              Real discount codes, checked by us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 text-sm text-muted leading-relaxed">
              <p>
                We work directly with many of the brands listed here and regularly check the offers
                we share.{' '}
                {allCheckedTogether ? (
                  <>
                    All current offers on this page were checked on{' '}
                    <strong className="font-semibold text-foreground">
                      {formatOfferDate(latestChecked)}
                    </strong>
                    .
                  </>
                ) : (
                  <>Each offer shows the date we last checked it.</>
                )}
              </p>
              <p>
                Where restrictions apply, we show them on the individual offer page. Offers can
                change, so always check the final price and terms before you pay. We do not
                knowingly list expired offers as active.{' '}
                <a href="#all-offers" className="text-accent font-medium underline underline-offset-2 hover:text-accent-dark transition-colors">
                  See every offer in one table
                </a>
                .
              </p>
            </div>
          </section>

          {/* Find what you need */}
          <div className="mb-12 rounded-2xl border border-[#F0DDB0] bg-white shadow-sm px-6 py-7 sm:px-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-accent mb-2">
              Jump to a category
            </p>
            <h2 className="text-xl font-bold text-primary mb-2">
              Find the right travel tool
            </h2>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-xl">
              Whether you are planning activities, sorting data abroad, packing smarter or looking
              for useful creator gear, jump straight to the section that helps most.
            </p>
            <div className="flex flex-wrap gap-2.5">
              {codeCategories.map((category) => {
                const count = discountCodes.filter((c) => c.category === category).length
                if (count === 0) return null
                return (
                  <a
                    key={category}
                    href={`#${categorySlug(category)}`}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-200 bg-[#FFF9EF] text-sm font-semibold text-foreground hover:border-accent/60 hover:bg-white hover:text-accent hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                  >
                    <span>{category}</span>
                    <span className="text-[10px] font-bold text-muted bg-white border border-stone-200 rounded-full px-1.5 py-0.5 leading-none group-hover:border-accent/30 group-hover:text-accent transition-colors">
                      {count}
                    </span>
                    <svg
                      className="w-3 h-3 text-muted group-hover:text-accent group-hover:translate-y-0.5 transition-all duration-200"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <polyline points="19 12 12 19 5 12" />
                    </svg>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Category sections */}
          {codeCategories.map((category) => {
            const items = discountCodes.filter((code) => code.category === category)
            if (items.length === 0) return null
            const intro = categoryIntros[category]
            return (
              <section key={category} id={categorySlug(category)} className="mb-16 scroll-mt-24">
                <div className="mb-7">
                  <h2 className="text-xl font-bold text-primary mb-1">{category}</h2>
                  <div className="w-10 h-0.5 bg-accent rounded mb-2.5" />
                  {intro && <p className="text-sm text-muted">{intro}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 items-stretch">
                  {items.map((item) => (
                    <div
                      key={item.name}
                      className="relative bg-white rounded-2xl shadow-sm border border-stone-100 flex flex-col h-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                    >
                      {/* Logo + offer */}
                      <div className="p-5 pb-4 flex items-center justify-between gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F8F6F2] border border-stone-100 flex items-center justify-center p-1.5 flex-shrink-0">
                          {item.logoImage ? (
                            <img
                              src={item.logoImage}
                              alt={`${item.name} logo`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-[9px] font-bold text-primary leading-tight text-center">
                              {item.badgeText}
                            </span>
                          )}
                        </div>
                        <span className="bg-accent text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm flex-shrink-0">
                          {item.offer}
                        </span>
                      </div>

                      {/* All content above the CTA footer */}
                      <div className="px-5 flex flex-col flex-1">

                        {/* Name */}
                        <p className="font-bold text-sm text-primary leading-snug mb-1">
                          {item.name}
                        </p>

                        {/* Short description - 2 lines, consistent min-height */}
                        <p className="text-xs text-muted leading-relaxed line-clamp-2 min-h-[2.5rem] mb-3">
                          {item.shortDescription}
                        </p>

                        {/* Code / no-code box - matched 3-line structure.
                            The copy button sits above the stretched card link
                            (relative z-10) so clicking it copies the code
                            instead of following the affiliate link. */}
                        <div className="mb-3">
                          {!isOfferAvailable(offerStatusOf(item)) ? (
                            <div className="rounded-xl bg-[#F8F6F2] border border-stone-100 p-3.5">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1.5">
                                Offer status
                              </p>
                              <p className="text-base font-medium text-muted leading-snug">
                                {offerStatusLabels[offerStatusOf(item)]}
                              </p>
                            </div>
                          ) : item.code ? (
                            <div className="relative z-10">
                              <CopyCodeButton code={item.code} />
                            </div>
                          ) : (
                            <div className="rounded-xl bg-[#F8F6F2] border border-stone-100 p-3.5 min-h-[5.875rem] flex items-center">
                              <p className="text-base font-medium text-muted leading-snug">
                                No code needed
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Why useful - 3 lines clamped, consistent min-height */}
                        <div className="mb-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">
                            Why it is useful
                          </p>
                          <p className="text-xs text-muted leading-relaxed line-clamp-3 min-h-[3.5rem]">
                            {item.whyUseIt}
                          </p>
                        </div>

                        {/* Best for chips - consistent min-height row */}
                        <div className="flex flex-wrap gap-1.5 items-start content-start min-h-[2rem] mb-3">
                          {(item.bestForTags ?? []).slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-medium text-[#174E5D] bg-[#E8F4F8] px-2.5 py-1 rounded-full leading-none"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Spacer - absorbs remaining space, pushes note to base */}
                        <div className="flex-1" />

                        {/* Personal note - 2 lines clamped, consistent min-height */}
                        <p className="text-xs text-muted italic leading-relaxed line-clamp-2 min-h-[2.25rem] border-l-2 border-[#F0DDB0] pl-3 mb-3">
                          {item.personalNote ?? ''}
                        </p>

                      </div>

                      {/* CTA footer - mt-auto pins to card bottom.
                          The affiliate button is the card's primary link: its
                          after:inset-0 pseudo-element stretches over the whole
                          card, so clicking anywhere that is not the code box or
                          the brand page link goes to the offer. */}
                      <div className="px-5 pb-5 pt-4 mt-auto border-t border-stone-100 space-y-2.5">
                        {isOfferAvailable(offerStatusOf(item)) && (
                        <a
                          href={item.affiliateUrl}
                          target="_blank"
                          rel={SPONSORED_LINK_REL}
                          className="block text-center bg-accent text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-accent-dark transition-colors after:absolute after:inset-0 after:content-[''] after:rounded-2xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                        >
                          {item.buttonLabel}
                        </a>
                        )}
                        {item.slug && (
                          <Link
                            href={`/discount-codes/${item.slug}`}
                            className="relative z-10 block text-center text-sm font-medium text-muted hover:text-accent transition-colors py-0.5"
                          >
                            {brandLinkText(item)}
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}

          {/* Summary table: every offer in one place. Scrolls sideways on small
              screens rather than squeezing the columns. */}
          <section id="all-offers" aria-labelledby="all-offers-heading" className="scroll-mt-24">
            <div className="mb-6">
              <h2 id="all-offers-heading" className="text-xl font-bold text-primary mb-1">
                All discount codes and offers
              </h2>
              <div className="w-10 h-0.5 bg-accent rounded mb-2.5" />
              <p className="text-sm text-muted">
                {allCheckedTogether
                  ? `All offers below were checked on ${formatOfferDate(latestChecked)}.`
                  : 'Each offer page shows the date we last checked it.'}
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm">
              <table className="w-full min-w-[34rem] text-sm text-left">
                <thead className="bg-[#FFF9EF] text-[11px] uppercase tracking-widest text-muted">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-bold">Brand</th>
                    <th scope="col" className="px-4 py-3 font-bold">Offer</th>
                    <th scope="col" className="px-4 py-3 font-bold">Code</th>
                    <th scope="col" className="px-4 py-3 font-bold">View offer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {summaryRows.map((item) => {
                    const status = offerStatusOf(item)
                    const available = isOfferAvailable(status)
                    return (
                      <tr key={item.name} className="align-top">
                        <th scope="row" className="px-4 py-3 font-semibold text-foreground">
                          {item.name}
                        </th>
                        <td className="px-4 py-3 text-muted">
                          {item.offer}
                          {status !== 'active' && (
                            <span className="block text-xs text-accent font-medium mt-0.5">
                              {offerStatusLabels[status]}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {!available ? (
                            <span className="text-muted">Not available</span>
                          ) : item.code ? (
                            <span className="font-mono font-bold text-primary tracking-wider break-all">
                              {item.code}
                            </span>
                          ) : (
                            <span className="text-muted">No code needed</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {item.slug && (
                            <Link
                              href={`/discount-codes/${item.slug}`}
                              className="font-medium text-accent underline underline-offset-2 hover:text-accent-dark transition-colors"
                            >
                              {brandLinkText(item)}
                            </Link>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </div>

      {/* Buy Us a Coffee - kept visually separate from discount codes */}
      <div className="bg-white border-t border-stone-200 py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold text-primary mb-3">Support the channel</h2>
          {supportLinks.map((link) => (
            <div key={link.name}>
              {link.logoImage && (
                <div className="flex justify-center mb-5">
                  <img
                    src={link.logoImage}
                    alt={`${link.name} logo`}
                    className="h-10 w-auto object-contain"
                  />
                </div>
              )}
              <p className="text-sm text-muted leading-relaxed mb-6">{link.description}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary text-white font-semibold px-8 py-3 rounded-full text-sm hover:opacity-80 transition-opacity"
              >
                {link.buttonLabel}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
