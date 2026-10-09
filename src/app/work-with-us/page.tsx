import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { fetchSubscriberCount } from '../lib/youtube'
import { discountCodes } from '../data/discount-codes'
import { SOCIAL_FOLLOWERS } from '../data/stats'
import { brandLinkText } from '../discount-codes/_lib/offer'

const siteUrl = 'https://2passports1dream.com'

// The title names the creator relationship outright rather than the generic
// "Work With Us", which reads like a supplier page to people and to automated
// systems alike.
const PAGE_TITLE = 'Work With 2Passports1Dream Creators | Brand Partnerships'
const PAGE_DESCRIPTION =
  'Partner with travel creators Adriana and Dylan from 2Passports1Dream for YouTube sponsorships, tourism campaigns and social media collaborations.'

// The same generated share images used elsewhere on the site. Next replaces
// these nested objects rather than merging them, so setting openGraph here
// would otherwise drop both the share image and the creator wording.
const shareImage = {
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: '2Passports1Dream travel videos, guides and discount codes',
}

export const metadata: Metadata = {
  // Absolute so the root "%s | 2Passports1Dream" template does not repeat the
  // channel name that the title already carries.
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: '/work-with-us' },
  openGraph: {
    type: 'website',
    siteName: '2Passports1Dream',
    locale: 'en_GB',
    url: '/work-with-us',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: '/opengraph-image', ...shareImage }],
  },
  twitter: {
    card: 'summary_large_image',
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [{ url: '/twitter-image', ...shareImage }],
  },
}

// Our own channels. Shared by the audience links below and by the sameAs list
// in the structured data, so the two can never drift apart.
const SOCIAL_LINKS = {
  youtube: 'https://www.youtube.com/@2passports1dream',
  instagram: 'https://www.instagram.com/2passports1dream',
  tiktok: 'https://www.tiktok.com/@2passports1dream',
  facebook: 'https://www.facebook.com/2passports1dream',
}

// One shared page container used by every section so the content has the
// same left and right visual boundaries from top to bottom.
const CONTAINER = 'max-w-6xl mx-auto px-6 sm:px-8 lg:px-10'

const brandCategories = [
  'Travel and tourism',
  'Accommodation',
  'Cruises',
  'Airlines',
  'Car hire',
  'Travel insurance',
  'Finance and travel cards',
  'Tech and gadgets',
  'eSIM and connectivity',
  'Luggage and packing',
  'Food and drink',
  'Lifestyle',
  'Useful everyday products',
]

const whatWeCreate = [
  {
    type: 'Long-form YouTube videos',
    description:
      'In-depth travel vlogs covering destinations, road trips, cruise voyages, food, accommodation and first impressions. Typically 10 to 30 minutes and the core of the channel.',
  },
  {
    type: 'Short-form social content',
    description:
      'Shorter videos and clips on Instagram, TikTok and Facebook, highlighting specific moments and destinations from our travels.',
  },
]

const EMAIL = 'business@2passports1dream.com'

// Who the partnership inbox is for, and who it is not. The welcoming list comes
// first and is the one styled as primary, because genuine brand enquiries are
// still the point of this page.
const contactYes = [
  'A brand interested in sponsoring our content',
  'A tourism board or destination',
  'A hotel, cruise line, airline or travel company',
  'A PR or influencer agency representing a relevant brand',
  'A company looking for a creator partnership with 2Passports1Dream',
]

const contactNo = [
  'Creators looking for paid work from us',
  'Agencies selling marketing services to us',
  'SEO or lead-generation services',
  'Social media management pitches',
  'Web development services',
  'Mass outreach offering to “grow our brand”',
]

// Structured data describing who we actually are, for search engines and the
// automated systems that classify sites. Everything here is stated on the page
// itself. The entity is deliberately typed as a creator brand with its own
// channels and a partnership contact point, and never as a LocalBusiness,
// ProfessionalService or anything else implying we sell services.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: {
    '@type': 'Organization',
    name: '2Passports1Dream',
    url: siteUrl,
    description:
      'Travel content creators. Adriana and Dylan publish travel videos and social content to their own 2Passports1Dream audience, and work with brands on sponsored content and creator partnerships.',
    founder: [
      { '@type': 'Person', name: 'Adriana' },
      { '@type': 'Person', name: 'Dylan' },
    ],
    sameAs: Object.values(SOCIAL_LINKS),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Brand partnerships',
      email: EMAIL,
      url: `${siteUrl}/work-with-us`,
    },
  },
}

// Shared by the linked and unlinked brand cards so both look identical. The
// linked variant adds only a subtle lift and shadow on hover.
const BRAND_CARD =
  'bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col items-center justify-center text-center min-h-[150px]'

// Short, skimmable labels for the brand cards, mapped from the longer
// category names used in the discount code data.
const brandCategoryLabels: Record<string, string> = {
  'Travel Experiences and Tours': 'Travel experiences',
  'Connectivity and Online Safety': 'Connectivity',
  'Luggage and Packing': 'Luggage',
  'Creator Gear': 'Creator gear',
  'Travel Health and Lifestyle': 'Travel and lifestyle',
  'Skincare and Beauty': 'Skincare',
  'Money and Travel Cards': 'Travel money',
}

export default async function WorkWithUsPage() {
  const subscriberCount = await fetchSubscriberCount()
  return (
    <>
      {/* Structured data: identifies 2Passports1Dream as a creator brand run by
          Adriana and Dylan, publishing to its own channels. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero: two columns on desktop (text + email left, photo right),
          stacked on mobile. Sits inside the shared CONTAINER. */}
      <section className="hero-bg py-16 lg:py-20 text-white">
        <div className={CONTAINER}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Photo: top on mobile, right on desktop */}
            <div className="lg:order-last flex justify-center lg:justify-end">
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/15">
                <Image
                  src="/images/about-adriana-dylan.jpg"
                  alt="Adriana and Dylan, the travel creators behind 2Passports1Dream"
                  fill
                  sizes="(max-width: 640px) 320px, 384px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Text and email CTA */}
            <div className="text-center lg:text-left">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                Creator Partnerships
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Partner With 2Passports1Dream
              </h1>
              <p className="text-white/80 leading-relaxed max-w-md mx-auto lg:mx-0 mb-6">
                We are Adriana and Dylan, the travel creators behind 2Passports1Dream. We create
                travel content for our own audience across YouTube, Instagram, TikTok and Facebook,
                and work directly with brands on sponsored content and creator partnerships.
              </p>

              {/* Role clarification, kept high on the page so both people and
                  automated systems see it before anything else. */}
              <div className="bg-white/10 border border-white/20 rounded-2xl px-5 py-4 mb-6 max-w-md mx-auto lg:mx-0 text-left">
                <p className="text-sm text-white font-medium leading-relaxed">
                  Are you a brand, tourism board or agency looking to partner with creators?
                  You&rsquo;re in the right place.
                </p>
                <p className="text-xs text-white/60 leading-relaxed mt-2">
                  Please note: we are content creators, not a brand looking to hire creators,
                  purchase marketing services or outsource content production.
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-block bg-accent text-white font-semibold px-8 py-3.5 rounded-full hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-200 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Brand Partnership Enquiries
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-white/85 underline underline-offset-4 hover:text-white transition-colors break-all"
                >
                  {EMAIL}
                </a>
                <p className="text-xs text-white/60 leading-relaxed max-w-sm">
                  For sponsorships, creator campaigns, tourism collaborations and media
                  partnerships.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-16">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-5 text-primary">Who we are</h2>
          <p className="text-muted leading-relaxed max-w-3xl mb-4">
            We are Adriana and Dylan, full-time travel content creators and the couple behind
            2Passports1Dream. Adriana is from Sweden and Dylan is from North Wales. We create
            honest, easy-to-watch travel content covering road trips, cruises, city breaks, food,
            hotels, first impressions and real travel experiences. Our style is laid-back, curious
            and straightforward. People watch us because our videos feel real, not like adverts.
          </p>
          <p className="text-muted leading-relaxed max-w-3xl mb-10">
            Everything we make is published on our own 2Passports1Dream channels, and the audience
            below is our own. Brands partner with us to reach that audience through sponsored
            content and creator campaigns. We are not a marketing agency, a production company or a
            content service provider.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 text-center border border-stone-100 shadow-sm">
              <p className="text-2xl font-bold">{subscriberCount}</p>
              <p className="text-xs text-muted mt-1">YouTube subscribers</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-stone-100 shadow-sm">
              <p className="text-2xl font-bold">{SOCIAL_FOLLOWERS}</p>
              <p className="text-xs text-muted mt-1">Social media followers</p>
            </div>
            <div className="bg-surface rounded-2xl p-6 text-center col-span-2 sm:col-span-1">
              <p className="text-2xl font-bold">4</p>
              <p className="text-xs text-muted mt-1">Active platforms</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our audience */}
      <section className="py-16 bg-surface">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-5 text-primary">Our audience</h2>
          <p className="text-muted leading-relaxed max-w-3xl">
            Our viewers are mostly adults, with a strong proportion aged 35 and above. They are
            curious, engaged travellers who watch us to plan trips, discover destinations and get
            honest recommendations before they go. Our community spans{' '}
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2Passports1Dream on YouTube"
              className="text-accent font-medium underline underline-offset-2 hover:text-accent-dark transition-colors"
            >
              YouTube
            </a>
            ,{' '}
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2Passports1Dream on Instagram"
              className="text-accent font-medium underline underline-offset-2 hover:text-accent-dark transition-colors"
            >
              Instagram
            </a>
            ,{' '}
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2Passports1Dream on TikTok"
              className="text-accent font-medium underline underline-offset-2 hover:text-accent-dark transition-colors"
            >
              TikTok
            </a>
            {' '}and{' '}
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2Passports1Dream on Facebook"
              className="text-accent font-medium underline underline-offset-2 hover:text-accent-dark transition-colors"
            >
              Facebook
            </a>
            {' '}as @2passports1dream, with YouTube our largest platform.
          </p>
        </div>
      </section>

      {/* What we create */}
      <section className="py-16">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-4 text-primary">Creator content we produce</h2>
          <p className="text-muted leading-relaxed max-w-3xl mb-8">
            This content is published on our own 2Passports1Dream channels as part of creator
            campaigns. We do not produce unbranded or white-label content for other companies to
            publish as their own.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {whatWeCreate.map((item) => (
              <div
                key={item.type}
                className="bg-surface rounded-2xl p-6 border border-stone-100"
              >
                <p className="font-semibold text-base mb-2">{item.type}</p>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands we've worked with */}
      <section className="py-16 border-t border-stone-100">
        <div className={CONTAINER}>
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-3 text-primary">
              Brands that have partnered with us as creators
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-2xl">
              A selection of companies that have sponsored or collaborated with 2Passports1Dream
              across our creator content.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {discountCodes.map((brand) => {
              // The card contents are identical either way. Brands with a
              // dedicated page become an internal link to it; any brand without
              // a slug stays a plain card rather than inventing a route.
              const content = (
                <>
                  {brand.logoImage && (
                    <div className="relative w-full h-12 mb-3">
                      <Image
                        src={brand.logoImage}
                        alt={`${brand.name} logo`}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 200px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <p className="text-sm font-semibold text-primary leading-snug">
                    {brand.name}
                  </p>
                  {brandCategoryLabels[brand.category] && (
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted">
                      {brandCategoryLabels[brand.category]}
                    </p>
                  )}
                </>
              )

              if (!brand.slug) {
                return (
                  <div key={brand.name} className={BRAND_CARD}>
                    {content}
                  </div>
                )
              }

              // A normal crawlable internal link. No sponsored or nofollow rel
              // here, unlike the outbound affiliate links elsewhere on the site.
              return (
                <Link
                  key={brand.name}
                  href={`/discount-codes/${brand.slug}`}
                  aria-label={brandLinkText(brand)}
                  className={`${BRAND_CARD} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2`}
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Partnership categories */}
      <section className="py-16 bg-surface">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-4 text-primary">Brand partnerships we consider</h2>
          <p className="text-muted leading-relaxed max-w-3xl mb-6">
            We consider sponsorship and creator campaign opportunities from brands in areas that are
            relevant to our travel audience.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {brandCategories.map((cat) => (
              <span
                key={cat}
                className="bg-white border border-stone-200 text-foreground text-sm px-4 py-2 rounded-full shadow-sm"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why relevance matters */}
      <section className="py-16">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-5 text-primary">Why relevance matters to us</h2>
          <p className="text-muted leading-relaxed max-w-3xl mb-4">
            Our audience trusts that what we say reflects what we actually think, and that trust
            matters more to us than any single partnership. So we only say yes when a product or
            service is something our viewers would genuinely find useful.
          </p>
          <p className="text-muted leading-relaxed max-w-3xl">
            When we do work with a brand, we integrate it naturally and we are always clear about
            what is sponsored.
          </p>
        </div>
      </section>

      {/* Who should contact us: the welcoming list is styled as the primary
          card, with the quieter one beside it, so the page still reads as an
          invitation rather than a warning. */}
      <section className="py-16 border-t border-stone-100">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-8 text-primary">Who should contact us?</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">

            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-100 shadow-sm">
              <p className="font-semibold text-base mb-4">
                We&rsquo;d love to hear from you if you are:
              </p>
              <ul className="space-y-3">
                {contactYes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-surface rounded-2xl p-6 sm:p-7 border border-stone-100">
              <p className="font-semibold text-base mb-4">This inbox is not for:</p>
              <ul className="space-y-3">
                {contactNo.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-stone-300 flex-shrink-0 mt-2"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
          <p className="text-muted leading-relaxed max-w-3xl mt-6">
            We are creators seeking brand partnerships, not a company recruiting creators or
            marketing suppliers. Thank you for understanding.
          </p>
        </div>
      </section>

      {/* Brand partnership enquiries */}
      <section className="py-16 bg-surface">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-4 text-primary">Brand partnership enquiries</h2>
          <p className="text-muted leading-relaxed max-w-3xl mb-3">
            If you represent a brand, tourism board or agency and would like to discuss a
            sponsorship or creator partnership with 2Passports1Dream, we&rsquo;d love to hear from
            you.
          </p>
          <a
            href={`mailto:${EMAIL}`}
            className="inline-block text-accent font-semibold underline underline-offset-4 hover:text-accent-dark transition-colors mb-7 break-all"
          >
            {EMAIL}
          </a>
          <div>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-block bg-accent text-white font-semibold px-8 py-3.5 rounded-full hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-200 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Send a Partnership Enquiry
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
