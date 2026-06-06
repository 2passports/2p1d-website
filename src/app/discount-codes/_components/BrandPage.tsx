import type { ReactNode } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { BrandPageData } from '../_data/brand-pages'
import { CopyCodeButton } from '../../components/CopyCodeButton'

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    viewBox="0 0 24 24"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export function BrandPage({
  data,
  bottomSlot,
}: {
  data: BrandPageData
  // Optional extra content rendered low on the page, after the FAQ section and
  // before the affiliate disclosure. Used by the Klook page to insert the
  // Klook affiliate widget.
  bottomSlot?: ReactNode
}) {
  const {
    name, affiliateUrl, offer, code, buttonLabel,
    logoImage, heroTagline, intro,
    whatItIs, whyUseful, bestFor, howToUseSteps, importantNotes,
    seoIntro, whatYouCanBook, destinationsIntro, destinations, faqs,
    realExample, heroHeading, heroImage,
  } = data

  const hasCode = code !== null

  return (
    <>
      {/* Hero: two-column landing style when a heroImage is provided,
          otherwise the standard centred hero used by other brand pages. */}
      {heroImage ? (
        <section className="hero-bg py-16 lg:py-20 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
          {/* Layered glows for a more premium feel */}
          <div aria-hidden="true" className="absolute -top-16 right-0 w-96 h-96 rounded-full bg-[#FFD166]/15 blur-3xl pointer-events-none" />
          <div aria-hidden="true" className="absolute bottom-0 -left-10 w-80 h-80 rounded-full bg-[#74C7D8]/15 blur-3xl pointer-events-none" />

          <div className="max-w-6xl mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

              {/* Left: logo, heading, intro, code card, CTAs */}
              <div className="text-center lg:text-left">
                {logoImage && (
                  <div className="flex justify-center lg:justify-start mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center p-2.5">
                      <img src={logoImage} alt={`${name} logo`} className="w-full h-full object-contain" />
                    </div>
                  </div>
                )}
                <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
                  Discount Code
                </p>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  {heroHeading ?? name}
                </h1>
                <p className="text-white/80 leading-relaxed text-sm mb-6 max-w-md mx-auto lg:mx-0">
                  {heroTagline}
                </p>

                {/* Offer + code display. For code-based offers the card holds
                    the copy-code button. For link-based offers (no manual code)
                    the whole card links to the affiliate offer. */}
                {hasCode ? (
                  <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-5 mb-6 max-w-sm mx-auto lg:mx-0">
                    <span className="inline-block bg-accent text-white text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm mb-3">
                      {offer}
                    </span>
                    <CopyCodeButton code={code as string} dark />
                    <p className="text-white/40 text-xs mt-2">
                      Offers can change. Check at checkout.
                    </p>
                  </div>
                ) : (
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Get the ${name} offer`}
                    className="block bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-2xl px-6 py-5 mb-6 max-w-sm mx-auto lg:mx-0 transition-colors"
                  >
                    <span className="inline-block bg-accent text-white text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm mb-3">
                      {offer}
                    </span>
                    <p className="text-sm text-white/80 font-medium mt-1">
                      Click here
                    </p>
                    <p className="text-white/40 text-xs mt-2">
                      Offers can change. Check at checkout.
                    </p>
                  </a>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <a
                    href={affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-accent text-white font-semibold px-7 py-3 rounded-full hover:bg-accent-dark transition-colors shadow-md text-sm"
                  >
                    {buttonLabel}
                  </a>
                  <Link
                    href="/discount-codes"
                    className="inline-block bg-white/15 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/25 transition-colors text-sm"
                  >
                    View all discount codes
                  </Link>
                </div>
              </div>

              {/* Right: travel image card with badge */}
              <div className="flex justify-center lg:justify-end">
                <div className="relative w-full max-w-sm">
                  <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-4 ring-white/15">
                    <Image
                      src={heroImage.src}
                      alt={heroImage.alt}
                      fill
                      sizes="(max-width: 1024px) 384px, 420px"
                      className="object-cover"
                      style={{ objectPosition: heroImage.objectPosition ?? 'center center' }}
                      priority
                    />
                  </div>
                  {heroImage.badge && (
                    <span className="absolute -bottom-3 left-4 bg-accent text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
                      {heroImage.badge}
                    </span>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>
      ) : (
        <section className="hero-bg py-16 px-4 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              Discount Code
            </p>

            {/* Logo */}
            {logoImage && (
              <div className="flex justify-center mb-5">
                <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center p-2.5">
                  <img src={logoImage} alt={`${name} logo`} className="w-full h-full object-contain" />
                </div>
              </div>
            )}

            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {name}
            </h1>
            <p className="text-white/80 leading-relaxed max-w-lg mx-auto mb-7 text-sm">
              {heroTagline}
            </p>

            {/* Offer + code display. For code-based offers the card holds the
                copy-code button. For link-based offers (no manual code) the
                whole card links to the affiliate offer. */}
            {hasCode ? (
              <div className="bg-white/10 border border-white/20 rounded-2xl px-6 py-5 mb-6 max-w-xs mx-auto">
                <span className="inline-block bg-accent text-white text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm mb-3">
                  {offer}
                </span>
                <CopyCodeButton code={code as string} dark />
                <p className="text-white/40 text-xs mt-2">
                  Offers can change. Check at checkout.
                </p>
              </div>
            ) : (
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get the ${name} offer`}
                className="block bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-2xl px-6 py-5 mb-6 max-w-xs mx-auto transition-colors"
              >
                <span className="inline-block bg-accent text-white text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm mb-3">
                  {offer}
                </span>
                <p className="text-sm text-white/80 font-medium mt-1">
                  Click here
                </p>
                <p className="text-white/40 text-xs mt-2">
                  Offers can change. Check at checkout.
                </p>
              </a>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-white font-semibold px-7 py-3 rounded-full hover:bg-accent-dark transition-colors shadow-md text-sm"
              >
                {buttonLabel}
              </a>
              <Link
                href="/discount-codes"
                className="inline-block bg-white/15 text-white font-semibold px-7 py-3 rounded-full hover:bg-white/25 transition-colors text-sm"
              >
                View all discount codes
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Body: one layout system. Every section sits in the same max-w-6xl
          container as the hero. Multi-part content fills the width (two-column
          text, grids, side-by-side cards). Only short single statements are
          deliberately centred. */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-14">

          {/* Intro: centred lead, then any SEO paragraphs in two columns */}
          <div>
            <p className="text-lg sm:text-xl text-foreground leading-relaxed max-w-3xl mx-auto text-center">
              {intro}
            </p>
            {seoIntro && seoIntro.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 mt-8">
                {seoIntro.map((para, i) => (
                  <p key={i} className="text-base text-muted leading-relaxed">{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* What is [Brand]: two-column paragraphs fill the width */}
          <section>
            <h2 className="text-xl font-bold mb-5">What is {name}?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {whatItIs.map((para, i) => (
                <p key={i} className="text-muted leading-relaxed">{para}</p>
              ))}
            </div>
          </section>

          {/* What can you book (optional): card grid */}
          {whatYouCanBook && whatYouCanBook.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-5">What can you book with {name}?</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {whatYouCanBook.map((item) => (
                  <div
                    key={item}
                    className="bg-white border border-stone-200 rounded-2xl p-4 shadow-sm flex items-center gap-2.5 text-sm font-medium text-foreground"
                  >
                    <CheckIcon className="w-4 h-4 text-[#174E5D] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Real travel example with video (optional): full-width feature card */}
          {realExample && (
            <section className="bg-[#FFF9EF] border border-[#F0DDB0] rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left: title and copy */}
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent mb-3">
                    Real travel example
                  </span>
                  <h2 className="text-xl font-bold mb-4 leading-tight">{realExample.title}</h2>
                  {realExample.paragraphs.map((para, i) => (
                    <p key={i} className="text-muted leading-relaxed mb-4 last:mb-0">{para}</p>
                  ))}
                </div>
                {/* Right: the video example */}
                <div className="space-y-3">
                  <a
                    href={realExample.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Watch our Orlando trip on YouTube, where we used ${name} to book Universal and other activities`}
                    className="group block relative aspect-video rounded-xl overflow-hidden shadow-md ring-1 ring-black/5 bg-stone-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Image
                      src={`https://img.youtube.com/vi/${realExample.videoId}/hqdefault.jpg`}
                      alt={`Thumbnail for the video ${realExample.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                        <svg width="22" height="22" fill="#1C1917" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </a>
                  <p className="text-xs text-muted">Watch our Orlando trip on YouTube</p>
                </div>
              </div>
            </section>
          )}

          {/* Popular destinations (optional): heading + tidy tag block */}
          {destinations && destinations.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-4">Popular destinations for using {name}</h2>
              {destinationsIntro && (
                <p className="text-muted leading-relaxed mb-5 max-w-3xl">{destinationsIntro}</p>
              )}
              <div className="flex flex-wrap gap-2.5">
                {destinations.map((place) => (
                  <span
                    key={place}
                    className="bg-surface border border-[#F0DDB0] text-foreground text-sm px-4 py-2 rounded-full"
                  >
                    {place}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Our offer: full-width card with a two-column layout */}
          <section className="bg-[#FFF9EF] border border-[#F0DDB0] rounded-2xl p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
              <div>
                <h2 className="text-xl font-bold mb-4">Our {name} offer</h2>
                {hasCode ? (
                  <div>
                    <CopyCodeButton code={code as string} />
                    <div className="mt-3">
                      <span className="inline-block bg-accent text-white text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm">
                        {offer}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div>
                    <span className="inline-block bg-accent text-white text-sm font-bold px-3.5 py-1.5 rounded-full shadow-sm mb-3">
                      {offer}
                    </span>
                    <p className="text-sm text-muted font-medium mt-2">
                      No manual code needed. Use our link to access the current {name} offer.
                    </p>
                  </div>
                )}
              </div>
              <div className="lg:text-right">
                <p className="text-sm text-muted leading-relaxed mb-4 lg:max-w-xs lg:ml-auto">
                  Offers can change, so always check the final price, terms and availability
                  before buying or booking.
                </p>
                <a
                  href={affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-accent text-white font-semibold px-8 py-3.5 rounded-full hover:bg-accent-dark transition-colors shadow-md text-sm"
                >
                  {buttonLabel}
                </a>
              </div>
            </div>
          </section>

          {/* Why we find it useful + Best for: two cards side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
            <section className="bg-surface rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Why we find it useful</h2>
              {whyUseful.map((para, i) => (
                <p key={i} className="text-muted leading-relaxed mb-4 last:mb-0">{para}</p>
              ))}
            </section>
            <section className="bg-surface rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-4">Best for</h2>
              <ul className="space-y-3">
                {bestFor.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <CheckIcon className="w-4 h-4 text-[#174E5D] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* How to use: full-width card, steps in a grid */}
          <section className="bg-surface rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-5">
              How to use {hasCode ? 'the code' : 'our link'}
            </h2>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
              {howToUseSteps.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-muted">
                  <span className="w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Important notes: short, deliberately centred */}
          {importantNotes && (
            <section className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl font-bold mb-3">Important notes</h2>
              <p className="text-sm text-muted leading-relaxed">{importantNotes}</p>
            </section>
          )}

          {/* FAQ (optional): full width, two columns on desktop */}
          {faqs && faqs.length > 0 && (
            <section>
              <h2 className="text-xl font-bold mb-6">Frequently asked questions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 className="font-semibold text-base mb-1.5 text-foreground">{faq.question}</h3>
                    <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Optional slot low on the page (e.g. Klook affiliate widget) */}
          {bottomSlot}

          {/* Affiliate disclosure: full-width slim card */}
          <section className="border border-stone-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-3">Affiliate disclosure</h2>
            <p className="text-sm text-muted leading-relaxed max-w-4xl">
              Some links on this page may be affiliate links, which means we may earn a small
              commission if you buy or book through them. It does not cost you extra and helps
              support our videos. We only share codes and links for brands we have used or
              researched.
            </p>
          </section>

          {/* Final CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <a
              href={affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white font-semibold px-7 py-3 rounded-full hover:bg-accent-dark transition-colors text-sm text-center"
            >
              {buttonLabel}
            </a>
            <Link
              href="/discount-codes"
              className="inline-block border border-stone-300 text-foreground font-semibold px-7 py-3 rounded-full hover:bg-surface transition-colors text-sm text-center"
            >
              View all discount codes
            </Link>
          </div>

        </div>
      </div>
    </>
  )
}
