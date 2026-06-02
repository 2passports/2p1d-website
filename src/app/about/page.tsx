import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { fetchSubscriberCount } from '../lib/youtube'
import PhotoGrid from '../components/PhotoGrid'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Adriana and Dylan are the couple behind 2Passports1Dream. Based in Wales, they share honest travel experiences through YouTube videos, road trips, cruise reviews, food, hotels and real travel adventures.',
  alternates: { canonical: '/about' },
}

const contentTypes = [
  'Road trips and driving',
  'Cruise voyages',
  'City breaks',
  'First impressions',
  'Food and local experiences',
  'Hotels and accommodation',
  'Transport and getting around',
  'Adventure travel',
  'Travel tips and honest advice',
]

const aboutCollageImages = [
  { src: '/images/AdrianaClamChowderSanFrancisco.jpg', alt: 'Adriana trying clam chowder in San Francisco', caption: 'Food moments', objectPosition: 'center 50%' },
  { src: '/images/AdrianaDylanCruise.jpg', alt: 'Adriana and Dylan on a cruise', caption: 'Cruise days', objectPosition: 'center 30%' },
  { src: '/images/AdrianaMustang.jpg', alt: 'Adriana with a Mustang on a road trip', caption: 'Road trips', objectPosition: 'center 40%' },
  { src: '/images/AdrianaChina.jpg', alt: 'Adriana travelling in China', caption: 'Asia adventures', objectPosition: 'center 30%' },
  { src: '/images/AdrianaDylanAirboat.jpg', alt: 'Adriana and Dylan on an airboat experience', caption: 'Quirky experiences', objectPosition: 'center 35%' },
  { src: '/images/AdrianaDylanAmericaBuccees.jpg', alt: "Adriana and Dylan at a Buc-ee's stop in America", caption: 'Across America', objectPosition: 'center 25%' },
]

const siteLinks = [
  {
    href: '/discount-codes',
    label: 'Discount Codes',
    description: 'Codes and affiliate links for travel gear, eSIMs, tours and more.',
  },
  {
    href: '/work-with-us',
    label: 'Work With Us',
    description: 'Brand partnership and collaboration enquiries for travel and lifestyle brands.',
  },
]

const travelStyleCards = [
  {
    title: 'American Road Trips',
    description: 'Driving across the USA, discovering small towns, big cities and hidden gems.',
    color: '#E76F51',
    bg: 'bg-[#E76F51]/12 group-hover:bg-[#E76F51]/22',
    icon: (
      <svg width="20" height="20" fill="none" stroke="#E76F51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="1" y="3" width="15" height="13" rx="2" />
        <path d="M16 8h4l3 3v5h-4" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    title: 'Cruise Travel',
    description: 'Honest cruise reviews covering ships, cabins, food and everything worth knowing.',
    color: '#174E5D',
    bg: 'bg-[#74C7D8]/20 group-hover:bg-[#74C7D8]/35',
    icon: (
      <svg width="20" height="20" fill="none" stroke="#174E5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 21c.6.5 1.2 1 2.5 1C7 22 7 21 9.5 21c2.6 0 2.4 1 5 1 2.5 0 2.5-1 5-1 1.3 0 1.9.5 2.5 1" />
        <path d="M19.38 20A11.6 11.6 0 0021 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
        <path d="M19 13V7a1 1 0 00-1-1H9" />
        <path d="M12 10V4" />
        <path d="M8 10V6" />
      </svg>
    ),
  },
  {
    title: 'Food & Hotels',
    description: 'Local dishes, street food and the places we stay, from quirky to great value.',
    color: '#B8860B',
    bg: 'bg-[#FFD166]/30 group-hover:bg-[#FFD166]/50',
    icon: (
      <svg width="20" height="20" fill="none" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
        <path d="M7 2v20" />
        <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
      </svg>
    ),
  },
  {
    title: 'Asia Travel',
    description: 'Cities, islands, food markets and the places where our travel story began.',
    color: '#9B5A8A',
    bg: 'bg-[#C77DB6]/15 group-hover:bg-[#C77DB6]/28',
    icon: (
      <svg width="20" height="20" fill="none" stroke="#9B5A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
  },
  {
    title: 'First Impressions',
    description: 'What a destination is actually like when you arrive, not just the guide version.',
    color: '#4a7a44',
    bg: 'bg-[#7EAD78]/20 group-hover:bg-[#7EAD78]/35',
    icon: (
      <svg width="20" height="20" fill="none" stroke="#4a7a44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

export default async function AboutPage() {
  const subscriberCount = await fetchSubscriberCount()
  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-16 px-4 lg:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Image: top on mobile, right on desktop */}
            <div className="lg:order-last flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/15">
                <Image
                  src="/images/AdrianaDylanSanFrancisco.jpg"
                  alt="Adriana and Dylan from 2Passports1Dream"
                  fill
                  sizes="(max-width: 640px) 320px, 384px"
                  className="object-cover"
                  style={{ objectPosition: 'center 25%' }}
                  priority
                />
              </div>
            </div>

            {/* Text: bottom on mobile, left on desktop */}
            <div className="text-white">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                About Us
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold mb-5 leading-tight">
                Hi, we are<br />Adriana &amp; Dylan
              </h1>
              <p className="text-white/80 leading-relaxed mb-4 max-w-md">
                We are the couple behind 2Passports1Dream. Adriana is from Sweden and Dylan is from
                North Wales. Together we make honest travel videos about road trips, cruises, cities,
                food and the places we genuinely love.
              </p>
              <p className="text-white/80 leading-relaxed mb-8 max-w-md">
                We share our adventures on YouTube, always telling you what travel was actually like,
                not just the highlights.
              </p>
              <div className="flex items-center gap-8 mb-8">
                <div>
                  <p className="text-3xl font-bold">{subscriberCount}</p>
                  <p className="text-xs text-white/60 mt-0.5">YouTube subscribers</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-3xl font-bold">600k+</p>
                  <p className="text-xs text-white/60 mt-0.5">Social media followers</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/@2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-accent-dark transition-colors text-sm"
                >
                  Watch on YouTube
                </a>
                <a
                  href="https://www.instagram.com/2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/15 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/25 transition-colors text-sm"
                >
                  Follow on Instagram
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="py-16 px-4 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
                Our Story
              </p>
              <h2 className="text-3xl font-bold mb-5 text-primary">How we got here</h2>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  We started 2Passports1Dream because we loved travel and wanted to share it. At
                  first it was just about filming our adventures. Over time it became something much
                  bigger.
                </p>
                <p>
                  We love showing America through fresh eyes. Road trips, small towns, big cities,
                  classic diners, portion sizes bigger than our heads. That kind of thing. We also
                  love cruise travel and enjoy showing what cruises are really like, from the first
                  step on board to the final honest thoughts at the end of the voyage.
                </p>
                <p>
                  Europe is special to us too. Cities, coastlines, small towns and local food across
                  the UK, Spain, Portugal, Greece, Italy and beyond.
                </p>
                <p>
                  Now we have a community of people who travel with us from their sofas, plan trips
                  from our videos and send us ideas for where to go next. That still feels very
                  special to us.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <blockquote className="bg-[#FFF9EF] border-l-4 border-accent rounded-2xl p-6">
                <p className="text-foreground leading-relaxed italic">
                  &ldquo;People watch us because our videos feel real. We are not making glossy
                  adverts. We are just two people telling you what travel was actually like, the good
                  bits, the funny bits and everything in between.&rdquo;
                </p>
                <footer className="mt-3 text-xs font-bold text-accent uppercase tracking-widest">
                  Adriana &amp; Dylan
                </footer>
              </blockquote>

              <div className="bg-surface rounded-2xl p-6 border border-stone-100">
                <p className="text-xs font-bold uppercase tracking-widest text-muted mb-2">
                  Find us on
                </p>
                <p className="text-sm text-foreground leading-relaxed">
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
                  {' '}under the handle{' '}
                  <span className="font-semibold text-primary">@2passports1dream</span>. The
                  YouTube channel has grown to {subscriberCount} subscribers.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What we explore */}
      <section className="py-16 px-4 lg:py-20 bg-[#FFF9EF]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Our Content
            </p>
            <h2 className="text-3xl font-bold text-primary mb-2">What we explore</h2>
            <p className="text-muted text-sm leading-relaxed max-w-xl">
              From American road trips and cruise ships to street food and first impressions, here
              is what you will find on the 2Passports1Dream channel.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
            {travelStyleCards.map((card) => (
              <div
                key={card.title}
                className="group bg-white rounded-2xl p-5 shadow-sm border border-stone-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors duration-200 ${card.bg}`}>
                  {card.icon}
                </div>
                <p className="font-bold text-sm mb-1 text-foreground">{card.title}</p>
                <p className="text-xs text-muted leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              Also on the channel
            </p>
            <div className="flex flex-wrap gap-2">
              {contentTypes.map((type) => (
                <span
                  key={type}
                  className="bg-white border border-stone-200 text-foreground text-sm px-4 py-1.5 rounded-full"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Moments from the road */}
      <section className="py-16 px-4 lg:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              From the road
            </p>
            <h2 className="text-3xl font-bold text-primary">Moments from the road</h2>
          </div>
          <PhotoGrid images={aboutCollageImages} />
        </div>
      </section>

      {/* Explore the site */}
      <section className="py-16 px-4 lg:py-20 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Explore the site
            </p>
            <h2 className="text-3xl font-bold text-primary mb-2">What you will find here</h2>
            <p className="text-muted text-sm leading-relaxed max-w-xl">
              Alongside our YouTube channel, this website has a couple of sections worth exploring.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {siteLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex flex-col bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border border-stone-100"
              >
                <p className="font-semibold text-base mb-2 group-hover:text-accent transition-colors">
                  {link.label}
                </p>
                <p className="text-sm text-muted leading-relaxed flex-1">{link.description}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-semibold text-accent group-hover:gap-2 transition-all duration-200">
                  Explore
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Follow us */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            Find us online
          </p>
          <h2 className="text-3xl font-bold mb-3 text-primary">Follow 2Passports1Dream</h2>
          <p className="text-muted leading-relaxed mb-8 max-w-lg mx-auto text-sm">
            Subscribe on YouTube so you never miss a new adventure, or follow us on social media
            for shorter clips and real-time travel updates.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.youtube.com/@2passports1dream"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-accent-dark transition-colors text-sm"
            >
              YouTube
            </a>
            <a
              href="https://www.instagram.com/2passports1dream"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-stone-300 text-foreground font-semibold px-6 py-3 rounded-full hover:bg-surface transition-colors text-sm"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@2passports1dream"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-stone-300 text-foreground font-semibold px-6 py-3 rounded-full hover:bg-surface transition-colors text-sm"
            >
              TikTok
            </a>
            <a
              href="https://www.facebook.com/2passports1dream"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-stone-300 text-foreground font-semibold px-6 py-3 rounded-full hover:bg-surface transition-colors text-sm"
            >
              Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-16 px-4 bg-surface">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-3 text-primary">Support the channel</h2>
          <p className="text-muted leading-relaxed mb-8 max-w-md mx-auto text-sm">
            If you enjoy our videos and want to support us directly, you can buy us a coffee.
            It is a small gesture that genuinely helps us keep going.
          </p>
          <a
            href="https://buymeacoffee.com/2p1d/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white font-semibold px-8 py-3 rounded-full hover:bg-accent-dark transition-colors text-sm"
          >
            Buy Us a Coffee
          </a>
        </div>
      </section>
    </>
  )
}
