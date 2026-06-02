import type { Metadata } from 'next'
import Image from 'next/image'
import { fetchSubscriberCount } from '../lib/youtube'
import { discountCodes } from '../data/discount-codes'

export const metadata: Metadata = {
  title: 'Work With Us',
  description:
    'Partner with 2Passports1Dream. Adriana and Dylan are travel content creators with over 280,000 YouTube subscribers. Contact us for relevant travel, lifestyle and tech brand partnerships.',
  alternates: { canonical: '/work-with-us' },
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
                Brand Partnerships
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Work With Us</h1>
              <p className="text-white/80 leading-relaxed max-w-md mx-auto lg:mx-0 mb-8">
                We partner with travel brands, tourism boards, cruise lines, hotels and lifestyle
                brands that feel like a genuine fit for our audience of curious, engaged travellers.
              </p>
              <div className="flex flex-col items-center lg:items-start gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-block bg-accent text-white font-semibold px-8 py-3.5 rounded-full hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-200 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  Email Us
                </a>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-sm text-white/85 underline underline-offset-4 hover:text-white transition-colors break-all"
                >
                  {EMAIL}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-16">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-5 text-primary">Who we are</h2>
          <p className="text-muted leading-relaxed max-w-3xl mb-10">
            We are Adriana and Dylan, the couple behind 2Passports1Dream. Adriana is from Sweden
            and Dylan is from North Wales. We create honest, easy-to-watch travel content covering
            road trips, cruises, city breaks, food, hotels, first impressions and real travel
            experiences. Our style is laid-back, curious and straightforward. People watch us
            because our videos feel real, not like adverts.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-6 text-center border border-stone-100 shadow-sm">
              <p className="text-2xl font-bold">{subscriberCount}</p>
              <p className="text-xs text-muted mt-1">YouTube subscribers</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border border-stone-100 shadow-sm">
              <p className="text-2xl font-bold">600k+</p>
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
              href="https://www.youtube.com/@2passports1dream"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2Passports1Dream on YouTube"
              className="text-accent font-medium underline underline-offset-2 hover:text-accent-dark transition-colors"
            >
              YouTube
            </a>
            ,{' '}
            <a
              href="https://www.instagram.com/2passports1dream"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2Passports1Dream on Instagram"
              className="text-accent font-medium underline underline-offset-2 hover:text-accent-dark transition-colors"
            >
              Instagram
            </a>
            ,{' '}
            <a
              href="https://www.tiktok.com/@2passports1dream"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="2Passports1Dream on TikTok"
              className="text-accent font-medium underline underline-offset-2 hover:text-accent-dark transition-colors"
            >
              TikTok
            </a>
            {' '}and{' '}
            <a
              href="https://www.facebook.com/2passports1dream"
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
          <h2 className="text-2xl font-bold mb-8 text-primary">What we create</h2>
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
            <h2 className="text-2xl font-bold mb-3 text-primary">Brands we&rsquo;ve worked with</h2>
            <p className="text-muted text-sm leading-relaxed max-w-2xl">
              A few of the travel, lifestyle and creator-friendly brands we&rsquo;ve featured across
              our content.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {discountCodes.map((brand) => (
              <div
                key={brand.name}
                className="bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col items-center justify-center text-center min-h-[150px]"
              >
                {brand.logoImage && (
                  <div className="relative w-full h-12 mb-3">
                    <Image
                      src={brand.logoImage}
                      alt=""
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership categories */}
      <section className="py-16 bg-surface">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-6 text-primary">Partnership categories we consider</h2>
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

      {/* Get in touch */}
      <section className="py-16 bg-surface">
        <div className={CONTAINER}>
          <h2 className="text-2xl font-bold mb-4 text-primary">Get in touch</h2>
          <p className="text-muted leading-relaxed max-w-3xl mb-3">
            For partnership and collaboration enquiries, please email:
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
              Send an Enquiry
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
