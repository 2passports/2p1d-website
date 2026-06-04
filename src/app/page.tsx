import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { videos as staticVideos } from './data/videos'
import { shorts as staticShorts } from './data/shorts'
import { fetchYoutubeVideos, formatPublishDate, fetchSubscriberCount } from './lib/youtube'
import ScrollReveal from './components/ScrollReveal'
import PhotoGrid from './components/PhotoGrid'
import DiscountCarousel from './components/DiscountCarousel'
import LatestVideos from './components/LatestVideos'
import ShortsRow from './components/ShortsRow'

// Revalidate the whole homepage at most once every 24 hours (ISR). The live
// YouTube data fetches in lib/youtube.ts each carry the same revalidate, so
// the YouTube API is hit on a background regeneration roughly once a day rather
// than on every page view. Setting it here too makes the 24h cadence explicit
// at the route level. 86400 seconds = 24 hours.
export const revalidate = 86400

const homeDescription =
  'Join Adriana and Dylan from 2Passports1Dream for honest travel videos, destination guides, cruises, food, hotels and useful discount codes.'

export const metadata: Metadata = {
  // absolute avoids the layout title template appending the brand a second time
  title: { absolute: '2Passports1Dream | Travel Videos, Guides and Discount Codes' },
  description: homeDescription,
  alternates: { canonical: '/' },
  openGraph: {
    title: '2Passports1Dream | Travel Videos, Guides and Discount Codes',
    description: homeDescription,
    url: '/',
  },
  twitter: {
    title: '2Passports1Dream | Travel Videos, Guides and Discount Codes',
    description: homeDescription,
  },
}

// Stacking order is intentional: the first entry (the latest video, since
// latestVideos is sorted newest-first) gets the highest z-index so it sits
// fully visible on top, with older videos fanning out behind it.
const collagePositions = [
  'top-0 left-0 -rotate-3 z-20',
  'top-24 left-20 rotate-[1deg] z-10',
  'top-48 left-40 rotate-[3deg]',
]

const homepageCollageImages = [
  { src: '/images/AdrianaDylanSanFrancisco.jpg', alt: 'Adriana and Dylan travelling in San Francisco', objectPosition: 'center 25%' },
  { src: '/images/AdrianaMustang.jpg', alt: 'Adriana with a Mustang on a road trip', objectPosition: 'center 40%' },
  { src: '/images/AdrianaDylanCruise.jpg', alt: 'Adriana and Dylan on a cruise', objectPosition: 'center 30%' },
  { src: '/images/AdrianaDylanAmericaBuccees.jpg', alt: "Adriana and Dylan at Buc-ee's in America", objectPosition: 'center 25%' },
  { src: '/images/AdrianaDylanAirboat.jpg', alt: 'Adriana and Dylan on an airboat experience', objectPosition: 'center 35%' },
  { src: '/images/AdrianaUniversal.jpg', alt: 'Adriana at Universal', objectPosition: 'center 30%' },
]

type DisplayVideo = {
  id: string
  title: string
  youtubeUrl: string
  date: string
  destination: string
}

export default async function Home() {
  const [youtubeResult, subscriberCount] = await Promise.all([
    fetchYoutubeVideos(),
    fetchSubscriberCount(),
  ])

  const { longForm, shorts } = youtubeResult

  // Shorts come from the live YouTube API (sorted newest-first by
  // lib/youtube.ts). When the live fetch returns none, for example on a deploy
  // with no API key where the RSS feed cannot separate Shorts from long-form,
  // fall back to the curated static set so the section never disappears.
  // Titles are stripped of hashtags so accessible labels stay clean. Cap at 10.
  const shortsSource = shorts.length > 0 ? shorts : staticShorts
  const latestShorts = shortsSource.slice(0, 10).map((s) => ({
    id: s.id,
    title: s.title.replace(/#\S+/g, '').replace(/\s{2,}/g, ' ').trim(),
    youtubeUrl: s.youtubeUrl,
  }))

  // Homepage hero collage: 3 latest long-form videos linking directly to YouTube.
  const latestVideos: DisplayVideo[] = longForm.length > 0
    ? longForm.slice(0, 6).map((v) => ({
        id: v.id,
        title: v.title,
        youtubeUrl: v.youtubeUrl,
        date: formatPublishDate(v.publishedAt),
        destination: '',
      }))
    : staticVideos.map((v) => ({
        id: v.id,
        title: v.title,
        youtubeUrl: v.youtubeUrl,
        date: v.date !== 'Update date' ? v.date : '',
        destination: v.destination,
      }))

  return (
    <>
      {/* Hero */}
      <section className="home-hero-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Warm sun glow, animated drift behind thumbnail area */}
          <div className="animate-glow-drift absolute -top-12 right-0 w-[28rem] h-[28rem] rounded-full bg-[#FFD166]/25 blur-3xl" />
          {/* Cool sky wash behind text area */}
          <div className="absolute bottom-0 -left-8 w-80 h-72 rounded-full bg-[#74C7D8]/20 blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12 sm:py-14 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Text */}
            <div className="lg:w-1/2 animate-fade-in-up text-center lg:text-left">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                Adriana &amp; Dylan&rsquo;s Travel World
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5 text-primary max-w-xl mx-auto lg:mx-0">
                Honest travel videos, useful guides and discount codes from the road
              </h1>

              {/* Mobile-only personal photo. Shown high in the hero, just after
                  the headline, so the page immediately feels like Adriana and
                  Dylan rather than a wall of text. Kept compact (a constrained
                  square) so it does not push the CTA buttons too far down.
                  Hidden on desktop, where the thumbnail collage fills the
                  right-hand column instead. */}
              <div className="lg:hidden mb-7 flex justify-center">
                <div className="relative w-44 sm:w-52 aspect-square rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                  <Image
                    src="/images/about-adriana-dylan.jpg"
                    alt="Adriana and Dylan, the couple behind 2Passports1Dream, smiling together"
                    fill
                    sizes="(max-width: 640px) 176px, 208px"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <p className="text-base text-foreground leading-relaxed mb-4 max-w-md mx-auto lg:mx-0">
                We&rsquo;re Adriana &amp; Dylan, the couple behind 2Passports1Dream. We make fun,
                honest travel videos about places we actually visit, from American road trips and
                cruises to food, hotels and the occasional travel surprise.
              </p>
              <p className="text-sm text-muted leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                Use this site to find our latest videos, favourite travel tools, discount codes and
                useful links from our trips.
              </p>

              {/* Button group: YouTube is the primary (solid) action, with
                  Browse Discount Codes as a lighter secondary beside it, and a
                  social links row underneath. Buttons stack on mobile
                  and sit side by side from the sm breakpoint up. */}
              <div className="max-w-md mx-auto lg:mx-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a
                    href="https://www.youtube.com/@2passports1dream"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Watch 2Passports1Dream on YouTube"
                    className="inline-flex items-center justify-center bg-accent text-white font-semibold text-sm px-6 py-3 rounded-full shadow-sm hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Watch on YouTube
                  </a>
                  <Link
                    href="/discount-codes"
                    aria-label="Browse 2Passports1Dream discount codes"
                    className="inline-flex items-center justify-center border border-primary/30 text-primary font-semibold text-sm px-6 py-3 rounded-full hover:border-primary hover:bg-primary hover:text-white hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    Browse Discount Codes
                  </Link>
                </div>
                {/* Social links row: subtle icon badges that wrap neatly on
                    smaller screens. Each opens in a new tab with a clear label. */}
                <div className="mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <span className="text-sm font-medium text-muted mr-0.5">Follow us:</span>
                  <a
                    href="https://www.youtube.com/@2passports1dream"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow 2Passports1Dream on YouTube"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/60 border border-white/70 text-primary shadow-sm hover:bg-white/80 hover:text-accent hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.5 15.5v-7l6.3 3.5z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/2passports1dream"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow 2Passports1Dream on Instagram"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/60 border border-white/70 text-primary shadow-sm hover:bg-white/80 hover:text-accent hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a
                    href="https://www.tiktok.com/@2passports1dream"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow 2Passports1Dream on TikTok"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/60 border border-white/70 text-primary shadow-sm hover:bg-white/80 hover:text-accent hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M16.5 3a5.5 5.5 0 004.5 4.5v3a8.5 8.5 0 01-4.5-1.3v6.3a6 6 0 11-6-6c.31 0 .61.03.9.08v3.1a3 3 0 102.1 2.86V3z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/2passports1dream"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow 2Passports1Dream on Facebook"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full bg-white/60 border border-white/70 text-primary shadow-sm hover:bg-white/80 hover:text-accent hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.46 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.58V12h2.78l-.44 2.9h-2.34v7A10 10 0 0022 12z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Stats as a neat three-card row. Each card is a link to the
                  YouTube channel, opening in a new tab, with a subtle hover lift. */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-10 max-w-md mx-auto lg:mx-0">
                <a
                  href="https://www.youtube.com/@2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${subscriberCount} YouTube subscribers. Visit the 2Passports1Dream YouTube channel`}
                  className="block rounded-xl bg-white/60 border border-white/70 shadow-sm px-2.5 py-3 sm:px-3 text-center lg:text-left hover:bg-white/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <p className="text-lg sm:text-xl font-bold text-primary leading-none">{subscriberCount}</p>
                  <p className="text-[11px] text-muted mt-1 leading-tight">YouTube subscribers</p>
                </a>
                <a
                  href="https://www.youtube.com/@2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="600k+ followers across all platforms. Visit the 2Passports1Dream YouTube channel"
                  className="block rounded-xl bg-white/60 border border-white/70 shadow-sm px-2.5 py-3 sm:px-3 text-center lg:text-left hover:bg-white/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <p className="text-lg sm:text-xl font-bold text-primary leading-none">600k+</p>
                  <p className="text-[11px] text-muted mt-1 leading-tight">across all platforms</p>
                </a>
                <a
                  href="https://www.youtube.com/@2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="New videos every week. Visit the 2Passports1Dream YouTube channel"
                  className="block rounded-xl bg-white/60 border border-white/70 shadow-sm px-2.5 py-3 sm:px-3 text-center lg:text-left hover:bg-white/80 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <p className="text-lg sm:text-xl font-bold text-primary leading-none">New videos</p>
                  <p className="text-[11px] text-muted mt-1 leading-tight">every week</p>
                </a>
              </div>
            </div>

            {/* Thumbnail collage */}
            <div className="lg:w-1/2 w-full">
              {/* Mobile: horizontal scroll row */}
              <div className="flex lg:hidden gap-3 overflow-x-auto pb-3 -mx-1 px-1">
                {latestVideos.slice(0, 3).map((video) => (
                  <a
                    key={video.id}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-52 rounded-xl overflow-hidden shadow-lg ring-2 ring-white hover:-translate-y-1 transition-transform duration-200"
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        fill
                        sizes="208px"
                        className="object-cover"
                      />
                    </div>
                  </a>
                ))}
              </div>

              {/* Desktop: stacked collage. Cards sized to balance the headline
                  on the left while keeping the stack fun and prominent. */}
              <div className="hidden lg:block relative h-[27rem]">
                {/* Soft sun glow behind the stack */}
                <div className="absolute -top-10 right-0 w-80 h-80 rounded-full bg-[#FFD166]/30 blur-3xl pointer-events-none" aria-hidden="true" />
                {latestVideos.slice(0, 3).map((video, index) => (
                  <a
                    key={video.id}
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`absolute w-80 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white hover:-translate-y-2 hover:z-30 hover:shadow-[0_24px_48px_rgba(23,78,93,0.18)] transition-all duration-300 ${collagePositions[index] ?? ''}`}
                  >
                    <div className="relative aspect-video">
                      <Image
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt={video.title}
                        fill
                        sizes="320px"
                        className="object-cover"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Explore the website */}
      <section className="relative pt-14 pb-20 px-4 overflow-hidden bg-[#FFF9EF] border-b border-[#F0DDB0]">
        {/* Decorative background glows */}
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[#FFD166]/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 -left-16 w-72 h-72 rounded-full bg-[#74C7D8]/10 blur-3xl pointer-events-none" aria-hidden="true" />
        {/* Decorative sun rings - concentric circles, clipped by overflow-hidden */}
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-56 h-56 rounded-full border border-[#FFD166]/25 pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/2 -right-6 -translate-y-1/2 w-96 h-96 rounded-full border border-[#FFD166]/12 pointer-events-none" aria-hidden="true" />

        <div className="max-w-6xl mx-auto relative">
          {/* Pill label */}
          <div className="flex justify-center mb-5">
            <span className="inline-block bg-accent/10 text-accent text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
              Start here
            </span>
          </div>

          <h2 className="text-3xl font-bold text-center text-primary mb-4">
            Explore 2Passports1Dream
          </h2>
          <p className="text-center text-muted text-sm leading-relaxed max-w-xl mx-auto mb-12">
            Whether you want to find useful discount codes, learn more about us, follow us on Instagram or work with the channel, this is the place to start.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Instagram */}
            <a
              href="https://www.instagram.com/2passports1dream"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl p-6 border border-[#C77DB6]/20 bg-gradient-to-br from-[#FDF0FA] to-[#F5EEF8] shadow-sm hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(199,125,182,0.26)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#C77DB6]/15 flex items-center justify-center mb-4 group-hover:bg-[#C77DB6]/25 transition-colors duration-200">
                <svg width="20" height="20" fill="none" stroke="#C77DB6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C77DB6] mb-1.5">Instagram</span>
              <p className="font-bold text-base mb-2 text-foreground">Follow Us</p>
              <p className="text-xs text-muted leading-relaxed flex-1">
                Behind-the-scenes moments, food finds and real-time travel updates from the road.
              </p>
              <div className="flex items-center gap-1.5 mt-5 text-xs font-semibold text-[#C77DB6]">
                Follow us
                <svg className="group-hover:translate-x-1 transition-transform duration-200" width="13" height="13" fill="none" stroke="#C77DB6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </a>

            {/* Discount Codes */}
            <Link
              href="/discount-codes"
              className="group flex flex-col rounded-2xl p-6 border border-[#B8860B]/20 bg-gradient-to-br from-[#FFFBEA] to-[#FFF4C2] shadow-sm hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(184,134,11,0.26)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FFD166]/40 flex items-center justify-center mb-4 group-hover:bg-[#FFD166]/60 transition-colors duration-200">
                <svg width="20" height="20" fill="none" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1.5">Codes</span>
              <p className="font-bold text-base mb-2 text-foreground">Discount Codes</p>
              <p className="text-xs text-muted leading-relaxed flex-1">
                Our latest travel codes and links for eSIMs, tours, luggage, creator gear and more.
              </p>
              <div className="flex items-center gap-1.5 mt-5 text-xs font-semibold text-[#B8860B]">
                View codes
                <svg className="group-hover:translate-x-1 transition-transform duration-200" width="13" height="13" fill="none" stroke="#B8860B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>

            {/* About Us */}
            <Link
              href="/about"
              className="group flex flex-col rounded-2xl p-6 border border-[#174E5D]/15 bg-gradient-to-br from-[#E8F6FB] to-[#E8F4F0] shadow-sm hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(23,78,93,0.22)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#74C7D8]/25 flex items-center justify-center mb-4 group-hover:bg-[#74C7D8]/40 transition-colors duration-200">
                <svg width="20" height="20" fill="none" stroke="#174E5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#174E5D] mb-1.5">Meet us</span>
              <p className="font-bold text-base mb-2 text-foreground">About Us</p>
              <p className="text-xs text-muted leading-relaxed flex-1">
                Meet Adriana and Dylan, the couple behind 2Passports1Dream.
              </p>
              <div className="flex items-center gap-1.5 mt-5 text-xs font-semibold text-[#174E5D]">
                Get to know us
                <svg className="group-hover:translate-x-1 transition-transform duration-200" width="13" height="13" fill="none" stroke="#174E5D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>

            {/* Work with Us */}
            <Link
              href="/work-with-us"
              className="group flex flex-col rounded-2xl p-6 border border-[#4a7a44]/20 bg-gradient-to-br from-[#EDF5EB] to-[#F5F3E8] shadow-sm hover:-translate-y-2 hover:shadow-[0_12px_40px_rgba(74,122,68,0.22)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#7EAD78]/25 flex items-center justify-center mb-4 group-hover:bg-[#7EAD78]/40 transition-colors duration-200">
                <svg width="20" height="20" fill="none" stroke="#4a7a44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                </svg>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#4a7a44] mb-1.5">Brands</span>
              <p className="font-bold text-base mb-2 text-foreground">Work with Us</p>
              <p className="text-xs text-muted leading-relaxed flex-1">
                Partnership enquiries for brands that feel like a natural fit for our audience.
              </p>
              <div className="flex items-center gap-1.5 mt-5 text-xs font-semibold text-[#4a7a44]">
                Contact us
                <svg className="group-hover:translate-x-1 transition-transform duration-200" width="13" height="13" fill="none" stroke="#4a7a44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-14 px-4 bg-[#FFF9EF]">
        <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Image - top on mobile, right on desktop */}
            <div className="lg:order-last">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg max-w-xs sm:max-w-sm mx-auto">
                <Image
                  src="/images/AdrianaDylanSanFrancisco.jpg"
                  alt="Adriana and Dylan travelling in San Francisco"
                  fill
                  sizes="(max-width: 640px) 320px, 384px"
                  className="object-cover"
                  style={{ objectPosition: 'center 25%' }}
                />
              </div>
            </div>

            {/* Text - bottom on mobile, left on desktop */}
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
                About Us
              </p>
              <h2 className="text-3xl font-bold mb-4 text-primary">
                Hi, we&rsquo;re Adriana and Dylan
              </h2>
              <p className="text-muted leading-relaxed mb-4 text-base max-w-md">
                We are the couple behind 2Passports1Dream. Adriana is from Sweden and Dylan is
                from North Wales. Together we make honest travel videos about road trips, cruises,
                cities, food and the places we genuinely love.
              </p>
              <p className="text-muted leading-relaxed mb-8 text-base max-w-md">
                People watch us because our videos feel real. We are not making glossy adverts.
                We are two people telling you what travel was actually like, the good bits,
                the funny bits and everything in between.
              </p>
              <div className="flex items-center gap-8 mb-8">
                <div>
                  <p className="text-2xl font-bold text-foreground">{subscriberCount}</p>
                  <p className="text-xs text-muted mt-0.5">YouTube subscribers</p>
                </div>
                <div className="w-px h-10 bg-stone-200" />
                <div>
                  <p className="text-2xl font-bold text-foreground">600k+</p>
                  <p className="text-xs text-muted mt-0.5">Social media followers</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/@2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-white font-semibold px-7 py-3.5 rounded-full hover:bg-accent-dark transition-colors"
                >
                  Watch on YouTube
                </a>
                <Link
                  href="/about"
                  className="border border-stone-300 text-foreground font-semibold px-7 py-3.5 rounded-full hover:bg-surface transition-colors"
                >
                  More about us
                </Link>
              </div>
            </div>

          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* What we explore */}
      <section className="explore-section relative py-24 px-4 overflow-hidden">
        {/* Drifting background glows */}
        <div className="animate-glow-drift absolute -top-28 -right-16 w-[36rem] h-[36rem] rounded-full bg-[#74C7D8]/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="animate-glow-drift absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-[#FFD166]/10 blur-3xl pointer-events-none" style={{ animationDelay: '-9s' }} aria-hidden="true" />
        {/* Dot grid overlay */}
        <div className="explore-dots absolute inset-0 pointer-events-none" aria-hidden="true" />
        {/* Concentric ring accents */}
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full border border-white/[0.04] translate-x-1/4 translate-y-1/4 pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-0 w-[48rem] h-[48rem] rounded-full border border-white/[0.025] translate-x-1/4 translate-y-1/4 pointer-events-none" aria-hidden="true" />

        {/* Animated travel route line + moving marker */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 400"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="explore-route"
              d="M -10 310 C 180 240 360 350 600 282 S 950 222 1210 282"
              fill="none"
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="1.5"
              strokeDasharray="5 9"
              strokeLinecap="round"
            />
            {/* Outer glow halo around dot */}
            <circle r="10" fill="rgba(231,111,81,0.18)" className="explore-route-dot-glow">
              <animateMotion dur="18s" repeatCount="indefinite" rotate="none">
                <mpath href="#explore-route" />
              </animateMotion>
            </circle>
            {/* Core marker dot */}
            <circle r="4" fill="rgba(231,111,81,0.90)" className="explore-route-dot-circle">
              <animateMotion dur="18s" repeatCount="indefinite" rotate="none">
                <mpath href="#explore-route" />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0;1;1;0"
                keyTimes="0;0.04;0.10;0.90;1"
                dur="18s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
        </div>

        <ScrollReveal>
        <div className="max-w-6xl mx-auto relative">

          {/* Section header */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
              Our Content
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What we explore
            </h2>
            <p className="text-white/65 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
              From American road trips and cruise ships to city breaks and local food,
              here is what you will find on the 2Passports1Dream channel.
            </p>
          </div>

          {/* Cards: 1-col mobile / 2-col tablet / 3-col lg / 5-col xl
              At lg, cards 4+5 are centred using col-start so the second
              row sits beneath columns 2-3 rather than flush left. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">

            {/* 01 American Road Trips */}
            <Link
              href="/about"
              aria-label="American road trips: read more about us"
              className="stagger-card explore-card group relative bg-white rounded-2xl p-6 shadow-xl ring-1 ring-white/25 flex flex-col overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E76F51] to-[#FF9B6C] rounded-t-2xl" aria-hidden="true" />
              <span className="absolute top-4 right-4 text-[10px] font-bold text-stone-300 tabular-nums select-none" aria-hidden="true">01</span>
              <div className="w-12 h-12 rounded-2xl bg-[#E76F51]/15 flex items-center justify-center mb-5 mt-1 flex-shrink-0 group-hover:bg-[#E76F51]/25 group-hover:shadow-[0_0_14px_rgba(231,111,81,0.38)] transition-all duration-300">
                <svg width="24" height="24" fill="none" stroke="#E76F51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <path d="M16 8h4l3 3v5h-4" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <p className="font-bold text-base mb-2 text-foreground">American Road Trips</p>
              <p className="text-sm text-muted leading-relaxed flex-1">
                Driving across the USA, discovering small towns, big cities, classic diners and
                places many visitors never find.
              </p>
            </Link>

            {/* 02 Cruise Travel */}
            <Link
              href="/about"
              aria-label="Cruise travel: read more about us"
              className="stagger-card stagger-2 explore-card group relative bg-white rounded-2xl p-6 shadow-xl ring-1 ring-white/25 flex flex-col overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#74C7D8] to-[#A5DCE7] rounded-t-2xl" aria-hidden="true" />
              <span className="absolute top-4 right-4 text-[10px] font-bold text-stone-300 tabular-nums select-none" aria-hidden="true">02</span>
              <div className="w-12 h-12 rounded-2xl bg-[#74C7D8]/20 flex items-center justify-center mb-5 mt-1 flex-shrink-0 group-hover:bg-[#74C7D8]/35 group-hover:shadow-[0_0_14px_rgba(116,199,216,0.42)] transition-all duration-300">
                <svg width="24" height="24" fill="none" stroke="#174E5D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2 21c.6.5 1.2 1 2.5 1C7 22 7 21 9.5 21c2.6 0 2.4 1 5 1 2.5 0 2.5-1 5-1 1.3 0 1.9.5 2.5 1" />
                  <path d="M19.38 20A11.6 11.6 0 0021 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
                  <path d="M19 13V7a1 1 0 00-1-1H9" />
                  <path d="M12 10V4" />
                  <path d="M8 10V6" />
                </svg>
              </div>
              <p className="font-bold text-base mb-2 text-foreground">Cruise Travel</p>
              <p className="text-sm text-muted leading-relaxed flex-1">
                Honest cruise reviews covering ships, cabins, food, ports and everything
                worth knowing before you book.
              </p>
            </Link>

            {/* 03 Food & Hotels */}
            <Link
              href="/about"
              aria-label="Food and hotels: read more about us"
              className="stagger-card stagger-3 explore-card group relative bg-white rounded-2xl p-6 shadow-xl ring-1 ring-white/25 flex flex-col overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD166] to-[#FFBC2D] rounded-t-2xl" aria-hidden="true" />
              <span className="absolute top-4 right-4 text-[10px] font-bold text-stone-300 tabular-nums select-none" aria-hidden="true">03</span>
              <div className="w-12 h-12 rounded-2xl bg-[#FFD166]/30 flex items-center justify-center mb-5 mt-1 flex-shrink-0 group-hover:bg-[#FFD166]/50 group-hover:shadow-[0_0_14px_rgba(255,209,102,0.45)] transition-all duration-300">
                <svg width="24" height="24" fill="none" stroke="#B8860B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2a5 5 0 00-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
                </svg>
              </div>
              <p className="font-bold text-base mb-2 text-foreground">Food &amp; Hotels</p>
              <p className="text-sm text-muted leading-relaxed flex-1">
                Local dishes, street food, comfort meals and the places they stay, from
                quirky stays to great-value hotels.
              </p>
            </Link>

            {/* 04 City Breaks & Europe - col-start-2 at lg creates the centred 2nd row */}
            <Link
              href="/about"
              aria-label="City breaks and Europe: read more about us"
              className="stagger-card stagger-4 explore-card group relative bg-white rounded-2xl p-6 shadow-xl ring-1 ring-white/25 flex flex-col overflow-hidden lg:col-start-2 xl:[grid-column-start:auto]"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7EAD78] to-[#A8C9A2] rounded-t-2xl" aria-hidden="true" />
              <span className="absolute top-4 right-4 text-[10px] font-bold text-stone-300 tabular-nums select-none" aria-hidden="true">04</span>
              <div className="w-12 h-12 rounded-2xl bg-[#7EAD78]/20 flex items-center justify-center mb-5 mt-1 flex-shrink-0 group-hover:bg-[#7EAD78]/35 group-hover:shadow-[0_0_14px_rgba(126,173,120,0.42)] transition-all duration-300">
                <svg width="24" height="24" fill="none" stroke="#4a7a44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                </svg>
              </div>
              <p className="font-bold text-base mb-2 text-foreground">City Breaks &amp; Europe</p>
              <p className="text-sm text-muted leading-relaxed flex-1">
                Cities, coastlines, small towns and local experiences across Europe and
                beyond, seen through fresh eyes.
              </p>
            </Link>

            {/* 05 Asia Travel */}
            <Link
              href="/about"
              aria-label="Asia travel: read more about us"
              className="stagger-card stagger-5 explore-card group relative bg-white rounded-2xl p-6 shadow-xl ring-1 ring-white/25 flex flex-col overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C77DB6] to-[#E0A5D4] rounded-t-2xl" aria-hidden="true" />
              <span className="absolute top-4 right-4 text-[10px] font-bold text-stone-300 tabular-nums select-none" aria-hidden="true">05</span>
              <div className="w-12 h-12 rounded-2xl bg-[#C77DB6]/15 flex items-center justify-center mb-5 mt-1 flex-shrink-0 group-hover:bg-[#C77DB6]/28 group-hover:shadow-[0_0_14px_rgba(199,125,182,0.42)] transition-all duration-300">
                <svg width="24" height="24" fill="none" stroke="#9B5A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
              <p className="font-bold text-base mb-2 text-foreground">Asia Travel</p>
              <p className="text-sm text-muted leading-relaxed flex-1">
                Cities, islands, food markets and the places where our travel story really began.
              </p>
            </Link>

          </div>
        </div>
        </ScrollReveal>
      </section>

      <LatestVideos videos={latestVideos} />

      <ShortsRow shorts={latestShorts} />

      <DiscountCarousel />

      {/* Follow the journey */}
      <section className="py-20 px-4 bg-[#FFF9EF] border-t border-[#F0DDB0]">
        <ScrollReveal>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Instagram
            </p>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Follow the journey beyond YouTube
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-xl mx-auto">
              Some moments make it into the full videos, and some are the little in-between bits from the road. Follow us on Instagram for more behind-the-scenes travel days, food finds and real-time updates.
            </p>
          </div>
          <PhotoGrid images={homepageCollageImages} />
          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/2passports1dream"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white font-semibold px-7 py-3.5 rounded-full hover:bg-accent-dark hover:-translate-y-1 transition-all duration-200 shadow-md"
            >
              Follow us on Instagram
            </a>
          </div>
        </div>
        </ScrollReveal>
      </section>

      {/* ----------------------------------------------------------------
          RETRO CAR DIVIDER
          Sits in the gap between the About section and Plan Your Adventure.
          Hidden on mobile (hidden sm:block). The car drives across a thin
          road line from left to right, looping continuously.
          To remove: delete from here to the matching closing comment.
          To pause the car: remove the 'car-drive' class from the inner div.
          ---------------------------------------------------------------- */}
      <div className="relative h-[52px] overflow-hidden hidden sm:block bg-[#FFF9EF]" aria-hidden="true">
        <div className="absolute left-0 right-0 top-[44px] h-px bg-stone-200" />
        <div className="car-drive absolute top-[44px] -translate-y-full">
          <svg width="90" height="44" viewBox="0 0 90 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="19" width="86" height="16" rx="4" fill="#C2664A" />
            <path d="M17,19 Q22,7 36,6 Q54,6 66,19Z" fill="#C2664A" />
            <path d="M21,18 Q25,9 36,8 Q52,8 63,18Z" fill="#B5D5E8" opacity="0.9" />
            <line x1="42" y1="8" x2="42" y2="18" stroke="#8B6E5A" strokeWidth="1" opacity="0.7" />
            <circle cx="22" cy="35" r="7" fill="#1a1a1a" />
            <circle cx="22" cy="35" r="4" fill="#3a3a3a" />
            <circle cx="22" cy="35" r="2" fill="#666" />
            <circle cx="68" cy="35" r="7" fill="#1a1a1a" />
            <circle cx="68" cy="35" r="4" fill="#3a3a3a" />
            <circle cx="68" cy="35" r="2" fill="#666" />
            <ellipse cx="87" cy="25" rx="3" ry="2.5" fill="#FFF9C4" opacity="0.95" />
            <rect x="2" y="23" width="3.5" height="4" rx="1" fill="#ff8877" opacity="0.8" />
            <rect x="24" y="5" width="30" height="2.5" rx="1" fill="#8B5E45" opacity="0.65" />
            <line x1="28" y1="5" x2="28" y2="7.5" stroke="#8B5E45" strokeWidth="1.2" opacity="0.55" />
            <line x1="38" y1="5" x2="38" y2="7.5" stroke="#8B5E45" strokeWidth="1.2" opacity="0.55" />
            <line x1="48" y1="5" x2="48" y2="7.5" stroke="#8B5E45" strokeWidth="1.2" opacity="0.55" />
            <rect x="25" y="1" width="14" height="5" rx="1.5" fill="#D4896B" opacity="0.85" />
            <rect x="41" y="2" width="10" height="4" rx="1" fill="#E8A87C" opacity="0.85" />
            <line x1="42" y1="19" x2="42" y2="33" stroke="#b05540" strokeWidth="0.8" opacity="0.45" />
          </svg>
        </div>
      </div>
      {/* ----------------------------------------------------------------
          END RETRO CAR DIVIDER
          ---------------------------------------------------------------- */}

      {/* Support the channel */}
      <section className="py-16 px-4 bg-surface">
        <ScrollReveal>
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
            Support the Channel
          </p>
          <h2 className="text-2xl font-bold mb-3">Enjoy our content?</h2>
          <p className="text-sm text-muted leading-relaxed mb-3">
            If you enjoy what we make, there are a few simple ways to support 2Passports1Dream.
            Subscribing to the channel, liking our videos and leaving a comment genuinely helps
            more than people realise.
          </p>
          <p className="text-sm text-muted leading-relaxed mb-7">
            If you want to support us directly, you can also buy us a coffee. Every bit helps
            us keep travelling and creating.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://www.youtube.com/@2passports1dream?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-white font-semibold px-7 py-3.5 rounded-full hover:bg-accent-dark transition-colors text-sm"
            >
              Subscribe on YouTube
            </a>
            <a
              href="https://buymeacoffee.com/2p1d/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-stone-300 text-foreground font-semibold px-7 py-3.5 rounded-full hover:bg-background transition-colors text-sm"
            >
              Buy Us a Coffee
            </a>
          </div>
        </div>
        </ScrollReveal>
      </section>
    </>
  )
}
