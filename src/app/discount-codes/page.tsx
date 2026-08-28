import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { discountCodes, supportLinks } from '../data/discount-codes'
import { CopyCodeButton } from '../components/CopyCodeButton'

export const metadata: Metadata = {
  title: 'Travel Deals and Useful Links',
  description:
    'Codes, links and travel tools from Adriana and Dylan at 2Passports1Dream. Covers travel experiences, eSIMs, luggage, creator gear, skincare and travel money.',
  alternates: { canonical: '/discount-codes' },
}

const codeCategories = [
  'Travel Experiences and Tours',
  'Connectivity and Online Safety',
  'Luggage and Packing',
  'Creator Gear',
  'Creator and Business Tools',
  'Travel Health and Lifestyle',
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
  'Skincare and Beauty':
    'Simple skincare tools for keeping your routine manageable while on the road.',
  'Money and Travel Cards':
    'Cards and tools that make spending and managing money abroad feel simpler.',
  'Memberships and Perks':
    'Memberships that can unlock VIP perks and preferred pricing across travel, lifestyle and business brands.',
}

export default function DiscountCodesPage() {
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
                2Passports1Dream
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Our Travel Deals &amp; Useful Links
              </h1>
              <p className="text-white/80 leading-relaxed max-w-md mx-auto lg:mx-0 text-sm">
                Here are the codes, links and travel tools we currently share with the
                2Passports1Dream community. Some links may be affiliate links, which means we may
                earn a small commission if you buy through them, at no extra cost to you.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Content */}
      <div className="pt-8 pb-14 px-4 bg-[#FFF9EF]">
        <div className="max-w-6xl mx-auto">

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
                          {item.code ? (
                            <div className="relative z-10">
                              <CopyCodeButton code={item.code} />
                            </div>
                          ) : (
                            <div className="rounded-xl bg-[#F8F6F2] border border-stone-100 p-3.5">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1.5">
                                Link offer
                              </p>
                              <p className="text-base font-medium text-muted leading-snug">
                                Click here
                              </p>
                              <p className="text-[10px] text-muted mt-1">
                                Offer applies through our link
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
                          "Read more" goes to the offer. */}
                      <div className="px-5 pb-5 pt-4 mt-auto border-t border-stone-100 space-y-2.5">
                        <a
                          href={item.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-center bg-accent text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-accent-dark transition-colors after:absolute after:inset-0 after:content-[''] after:rounded-2xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
                        >
                          {item.buttonLabel}
                        </a>
                        {item.slug && (
                          <Link
                            href={`/discount-codes/${item.slug}`}
                            className="relative z-10 block text-center text-sm font-medium text-muted hover:text-accent transition-colors py-0.5"
                          >
                            Read more
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}

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
