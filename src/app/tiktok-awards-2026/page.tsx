import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

// TikTok Awards UK 2026 nomination page.
// Voting closes on 18 November 2026 and the awards take place on 1 December 2026.
// Remove or update the voting copy after 18 November 2026.

const VOTE_URL = 'https://snssdk1180.onelink.me/BAuo/dp3f0xo2'
const ANNOUNCEMENT_URL = 'https://newsroom.tiktok.com/tiktok-awards-uk-2026?lang=en-GB'
const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@2passports1dream'

const pageTitle = '2Passports1Dream Nominated for TikTok Travel Creator of the Year 2026'
const pageDescription =
  '2Passports1Dream has been nominated for Travel Creator of the Year at the TikTok Awards UK 2026. Find out how to vote, when voting closes and when the awards take place.'
const shareImage = {
  url: '/images/tiktok%201-1.JPG',
  width: 1080,
  height: 1080,
  alt: '2Passports1Dream nominated for Travel Creator of the Year at the TikTok Awards UK 2026',
}

export const metadata: Metadata = {
  // absolute avoids the layout title template appending the brand a second time
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: { canonical: '/tiktok-awards-2026' },
  openGraph: {
    type: 'article',
    title: pageTitle,
    description: pageDescription,
    url: '/tiktok-awards-2026',
    images: [shareImage],
  },
  twitter: {
    // The nomination graphic is square, so the small card shows it uncropped
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
    images: [shareImage],
  },
}

const eventDetails = [
  {
    label: 'Date',
    value: 'Tuesday, 1 December 2026',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    tone: 'text-[#E76F51] bg-[#E76F51]/12',
  },
  {
    label: 'Location',
    value: 'Central London',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    tone: 'text-[#174E5D] bg-[#74C7D8]/20',
  },
  {
    label: 'Watch',
    value: 'TikTok LIVE on @TikTok_UK from 5:30pm',
    icon: (
      <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    ),
    tone: 'text-[#B8860B] bg-[#FFD166]/30',
  },
]

const voteSteps = [
  <>Search &lsquo;TikTok Awards&rsquo; inside the TikTok app</>,
  <>Find the Travel Creator of the Year category</>,
  <>
    Select{' '}
    <a
      href={TIKTOK_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary hover:text-accent transition-colors duration-200"
    >
      @2passports1dream
    </a>
  </>,
]

function TikTokIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3a5.5 5.5 0 004.5 4.5v3a8.5 8.5 0 01-4.5-1.3v6.3a6 6 0 11-6-6c.31 0 .61.03.9.08v3.1a3 3 0 102.1 2.86V3z" />
    </svg>
  )
}

function VoteButton() {
  return (
    <a
      href={VOTE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 bg-accent text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-md hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <TikTokIcon />
      Vote for 2Passports1Dream
    </a>
  )
}

function AnnouncementLink() {
  return (
    <a
      href={ANNOUNCEMENT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary hover:text-accent transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm"
    >
      Read the official TikTok Awards announcement
      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </a>
  )
}

const eligibilityNote = 'Voting takes place in the TikTok app and is available to eligible users in the UK and Ireland.'

export default function TikTokAwards2026Page() {
  return (
    <>
      {/* Hero */}
      <section className="home-hero-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="animate-glow-drift absolute -top-12 right-0 w-[28rem] h-[28rem] rounded-full bg-[#FFD166]/25 blur-3xl" />
          <div className="absolute bottom-0 -left-8 w-80 h-72 rounded-full bg-[#74C7D8]/20 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
            <div className="lg:w-[55%] text-center lg:text-left animate-fade-in-up">
              <span className="inline-flex items-center gap-2 bg-accent/10 text-accent text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
                <TikTokIcon size={12} />
                TikTok Awards UK 2026
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-primary mb-6">
                We&rsquo;ve been nominated for Travel Creator of the Year! <span aria-hidden="true">🏆</span>
              </h1>
              <div className="space-y-4 text-base text-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                <p>
                  We&rsquo;re incredibly happy to have been nominated for Travel Creator of the Year
                  at the TikTok Awards UK 2026.
                </p>
                <p className="text-muted">
                  Travel has taken us to some amazing places over the years, but getting recognised
                  for the videos we make and the community that has grown around them genuinely means
                  a lot to us. We&rsquo;re so grateful to everyone who watches, comments, shares and
                  follows along with our travels.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <VoteButton />
                <a
                  href="#how-to-vote"
                  className="text-sm font-semibold text-primary hover:text-accent transition-colors duration-200"
                >
                  How to vote &darr;
                </a>
              </div>
              <p className="text-xs text-muted mt-4">{eligibilityNote}</p>
            </div>

            <div className="lg:w-[45%] w-full flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-[#25F4EE]/30 via-[#FFD166]/30 to-[#FE2C55]/30 blur-xl" aria-hidden="true" />
                <Image
                  src="/images/tiktok 1-1.JPG"
                  width={1080}
                  height={1080}
                  alt="2Passports1Dream nominated for Travel Creator of the Year at the TikTok Awards UK 2026"
                  sizes="(max-width: 640px) 320px, 384px"
                  priority
                  className="relative w-full h-auto aspect-square rounded-3xl shadow-2xl ring-4 ring-white rotate-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to vote */}
      <section id="how-to-vote" className="scroll-mt-24 py-14 sm:py-16 px-4 bg-[#FFF9EF]">
        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-white border border-[#F0DDB0] shadow-[0_12px_40px_rgba(23,78,93,0.10)]">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#25F4EE] via-[#E76F51] to-[#FE2C55]" aria-hidden="true" />
            <div className="flex flex-col lg:flex-row items-center gap-10 p-6 sm:p-10">
              <div className="flex-1">
                <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
                  TikTok Awards voting
                </p>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">How to vote for us</h2>
                <p className="text-base text-foreground leading-relaxed mb-3">
                  Voting is open now in the TikTok app and closes on{' '}
                  <strong className="font-semibold text-primary">Wednesday, 18 November 2026</strong>.
                </p>
                <p className="text-base text-muted leading-relaxed mb-6">
                  If you&rsquo;re in the UK or Ireland, you can vote through the TikTok Awards voting hub:
                </p>
                <ol className="space-y-3 mb-8">
                  {voteSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="text-base text-foreground leading-relaxed pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
                <VoteButton />
                <p className="text-xs text-muted mt-3">{eligibilityNote}</p>
              </div>

              {/* Phone-style preview of the nomination graphic. Desktop only, so
                  mobile visitors do not see the same graphic twice in a row. */}
              <div className="hidden lg:block flex-shrink-0 w-56">
                <div className="rounded-[2rem] bg-[#1a1a1a] p-2 shadow-2xl -rotate-2">
                  <Image
                    src="/images/tiktok 9-16.JPG"
                    width={1080}
                    height={1920}
                    alt="Travel Creator of the Year nominee graphic for @2passports1dream at the TikTok Awards"
                    sizes="208px"
                    className="w-full h-auto aspect-[9/16] rounded-[1.6rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event details */}
      <section className="py-14 sm:py-16 px-4 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">The big night</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              When are the TikTok Awards UK 2026?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8">
            {eventDetails.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white border border-[#F0DDB0] p-6 shadow-sm text-center sm:text-left">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 mx-auto sm:mx-0 ${item.tone}`}>
                  {item.icon}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1.5">{item.label}</p>
                <p className="font-bold text-base text-foreground leading-snug">{item.value}</p>
              </div>
            ))}
          </div>
          <p className="text-base text-muted leading-relaxed max-w-2xl mx-auto text-center mb-6">
            The TikTok Awards UK 2026 will bring together creators from across the TikTok community,
            with special guest presenters and a live performance from Tinie Tempah.
          </p>
          <div className="text-center">
            <AnnouncementLink />
          </div>
        </div>
      </section>

      {/* Travel Creator of the Year */}
      <section className="relative py-16 sm:py-20 px-4 bg-primary overflow-hidden">
        <div className="absolute -top-24 -right-16 w-96 h-96 rounded-full bg-[#74C7D8]/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute -bottom-24 -left-16 w-80 h-80 rounded-full bg-[#E76F51]/15 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 border border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
            The category
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-5">Travel Creator of the Year</h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed mb-4">
            TikTok describes the category as recognising creators who share travel tips, from local
            haunts to international adventures.
          </p>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed">
            <a
              href={TIKTOK_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline underline-offset-4 decoration-white/40 hover:decoration-white transition-colors duration-200"
            >
              @2passports1dream
            </a>{' '}
            is one of six nominees, and we&rsquo;re incredibly proud to be nominated alongside
            some brilliant travel creators.
          </p>
        </div>
      </section>

      {/* Thank you */}
      <section className="py-16 sm:py-20 px-4 bg-[#FFF9EF]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
            Thank you <span aria-hidden="true">❤️</span>
          </h2>
          <div className="space-y-4 text-base text-foreground leading-relaxed mb-6">
            <p>
              Being nominated already feels like such a special moment for us. We started sharing our
              travels because we loved exploring new places together, and the fact that so many of you
              now choose to come along for the journey still feels surreal.
            </p>
            <p>
              If you&rsquo;ve watched one of our videos, recommended our channel, left us a comment or
              followed us somewhere along the way, thank you. We really appreciate it.
            </p>
          </div>
          <p className="text-lg font-semibold italic text-accent mb-10">Adriana &amp; Dylan</p>

          <div className="flex flex-col items-center gap-4">
            <VoteButton />
            <p className="text-xs text-muted">{eligibilityNote}</p>
            <AnnouncementLink />
            <Link
              href="/"
              className="text-sm font-medium text-muted hover:text-primary transition-colors duration-200"
            >
              &larr; Back to the homepage
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
