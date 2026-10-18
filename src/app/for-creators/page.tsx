import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import ScrollReveal from '../components/ScrollReveal'
import SponsorshipEstimator from './_components/SponsorshipEstimator'
import referralCard from '../../../public/images/agentio-referral-card QR code.png'

const PAGE_TITLE = 'Agentio for Creators | YouTube Sponsorships & Brand Partnerships'
const PAGE_DESCRIPTION =
  'Looking for an Agentio invite or more YouTube sponsorship opportunities? See how 2Passports1Dream uses Agentio to find and manage brand deals, UGC and creator campaigns.'

// The same generated share images used elsewhere on the site. Next replaces
// these nested objects rather than merging them, so setting openGraph here
// would otherwise drop the share image.
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
  alternates: { canonical: '/for-creators' },
  openGraph: {
    type: 'website',
    siteName: '2Passports1Dream',
    locale: 'en_GB',
    url: '/for-creators',
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

// Our Agentio referral link. Every Agentio CTA on this page uses it, always
// opening in a new tab and marked as sponsored because it is a referral.
const AGENTIO_URL = 'https://agentio.com/r/C752A5C8'
const REFERRAL_REL = 'sponsored noopener noreferrer'

// One shared page container used by every section so the content has the
// same left and right visual boundaries from top to bottom.
const CONTAINER = 'max-w-6xl mx-auto px-6 sm:px-8 lg:px-10'

const CTA_BUTTON =
  'inline-block bg-accent text-white font-semibold px-8 py-3.5 rounded-full hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-200 shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

// Brands we have worked with through Agentio, using local logo files only.
// Each card links to our own discount code page when one exists (Babbel).
// Otherwise it goes to the brand's official homepage, as the project holds no
// affiliate or referral link for the others.
type AgentioBrand = {
  name: string
  logo: string
  href: string
  label: string
  internal?: boolean
}

const agentioBrands: AgentioBrand[] = [
  {
    name: 'Unbound Merino',
    logo: '/logos/unboundmerino.png',
    href: 'https://unboundmerino.com/',
    label: 'Unbound Merino website (opens in a new tab)',
  },
  {
    name: 'Babbel',
    logo: '/logos/babbel.webp',
    href: '/discount-codes/babbel',
    label: 'Our Babbel discount code page',
    internal: true,
  },
  {
    name: 'Bombas',
    logo: '/logos/bombas.png',
    href: 'https://bombas.com/',
    label: 'Bombas website (opens in a new tab)',
  },
  {
    name: 'Uber',
    logo: '/logos/uber.png',
    href: 'https://www.uber.com/',
    label: 'Uber website (opens in a new tab)',
  },
  {
    name: 'Uber Eats',
    logo: '/logos/ubereats.png',
    href: 'https://www.ubereats.com/',
    label: 'Uber Eats website (opens in a new tab)',
  },
]

// What Agentio can see once a channel is connected. Kept to what Agentio
// documents, with no thresholds or acceptance criteria.
const evaluationSignals = [
  {
    title: 'First-party audience data',
    description: 'Channels connect through API access, not just public profile numbers.',
  },
  {
    title: 'Real viewership',
    description: 'Median views show what a typical video actually achieves.',
  },
  {
    title: 'Engagement',
    description: 'How your audience responds to your content, not just how big it is.',
  },
]

const steps = [
  {
    title: 'Connect your channel',
    description:
      'Sign up and securely connect your YouTube account so Agentio can verify your channel and understand its recent performance.',
  },
  {
    title: 'See relevant opportunities',
    description:
      'Agentio uses metrics including your 30-day YouTube view median to surface campaign opportunities available to your channel.',
  },
  {
    title: 'Manage the campaign',
    description:
      'View the brief, requirements, campaign information and any relevant access directly through the platform.',
  },
  {
    title: 'Submit and get approval',
    description:
      'Submit your content through Agentio and manage feedback and approval in one place rather than chasing long email threads.',
  },
]

const benefits = [
  {
    title: 'Less email back-and-forth',
    description:
      'Sponsorships usually mean long threads just to confirm dates, details and drafts. With Agentio, a lot of that conversation simply does not need to happen.',
  },
  {
    title: 'Briefs kept in one place',
    description:
      'The campaign brief, talking points and requirements sit inside the campaign, so we are never digging through old emails to find them.',
  },
  {
    title: 'A clear submission and approval process',
    description:
      'We upload our draft, the brand reviews it and any feedback comes back in the same place. It is easy to see exactly where things stand.',
  },
  {
    title: 'Access to recognised brands',
    description:
      'Through Agentio we have worked with well-known names like Babbel, Bombas and Uber, alongside brands such as Unbound Merino.',
  },
  {
    title: 'Useful for YouTube sponsorships',
    description:
      'Long-form YouTube is the heart of our channel, and Agentio fits neatly around the way we already plan integrations into our videos.',
  },
  {
    title: 'Short-form and UGC opportunities',
    description:
      'Alongside long-form sponsorships, there can also be campaigns built around short-form content and UGC.',
  },
  {
    title: 'Easier to keep campaigns organised',
    description:
      'When a few campaigns overlap, having each one in its own workspace keeps deadlines and deliverables from getting muddled.',
  },
]

// Shown in the FAQ section and mirrored word for word in the FAQPage
// structured data below, so the schema always matches the visible answers.
// An answer containing AGENTIO_URL renders that URL as a referral link.
const faqs = [
  {
    question: 'What is Agentio?',
    answer:
      'Agentio is a creator sponsorship platform that connects eligible creators with brand campaign opportunities and manages briefs, submissions and approvals in one place.',
  },
  {
    question: 'How do creators join Agentio?',
    answer:
      'Creators can sign up to Agentio and connect their YouTube channel for verification. We also have a referral link on this page if you want to take a look. Signing up does not guarantee acceptance or campaigns, as availability depends on your channel and what each brand is looking for.',
  },
  {
    question: 'Can Agentio help with YouTube sponsorships?',
    answer:
      'Yes. We use Agentio for YouTube brand collaborations, and the platform can also include short-form and UGC opportunities, depending on the campaigns available.',
  },
  {
    question: 'How does Agentio decide which campaigns I can see?',
    answer:
      'Creators connect their YouTube account so Agentio can verify the channel and calculate metrics such as the 30-day view median. Available campaigns depend on the creator, audience, performance and brand requirements.',
  },
]

// FAQPage only. No Product, Offer or Review schema, as this page recommends a
// platform we use rather than selling anything.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
}

function ReferralButton({ label, className = '' }: { label: string; className?: string }) {
  return (
    <a
      href={AGENTIO_URL}
      target="_blank"
      rel={REFERRAL_REL}
      aria-label={`${label} using our referral link (opens in a new tab)`}
      className={`${CTA_BUTTON} ${className}`.trim()}
    >
      {label}
    </a>
  )
}

// An inline referral link for a single mention of Agentio in body copy. Teal
// text with a coral underline keeps contrast high on white and cream.
function AgentioLink() {
  return (
    <a
      href={AGENTIO_URL}
      target="_blank"
      rel={REFERRAL_REL}
      className="font-medium text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm"
    >
      Agentio
      <span className="sr-only">{' '}(our referral link, opens in a new tab)</span>
    </a>
  )
}

export default function ForCreatorsPage() {
  return (
    <>
      {/* Structured data: the FAQ section below, as FAQPage. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      {/* Hero: referral card on the left and text on the right on desktop,
          stacked with the card first on mobile. */}
      <section className="home-hero-bg relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="animate-glow-drift absolute -top-16 left-0 w-[26rem] h-[26rem] rounded-full bg-[#FFD166]/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-72 rounded-full bg-[#74C7D8]/20 blur-3xl" />
        </div>

        <div className={`${CONTAINER} relative py-12 sm:py-14 lg:py-20`}>
          <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-16 items-center">

            {/* Referral card. Kept at its natural 9:16 ratio and framed like a
                card rather than stretched into a full-width photo. The whole
                card is a referral link, so it straightens and lifts on hover. */}
            <div className="flex justify-center animate-fade-in-up">
              <a
                href={AGENTIO_URL}
                target="_blank"
                rel={REFERRAL_REL}
                aria-label="Explore Agentio through the 2Passports1Dream referral link (opens in a new tab)"
                className="block w-full max-w-[260px] sm:max-w-[300px] lg:max-w-[360px] rounded-[2rem] bg-white p-2 shadow-xl ring-1 ring-[#F0DDB0] rotate-[-1.5deg] hover:rotate-0 hover:-translate-y-1 hover:shadow-2xl focus-visible:rotate-0 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Image
                  src={referralCard}
                  alt="Our Agentio referral card for Dylan Evans of 2Passports1Dream, showing brands we have worked with on Agentio (Uber, Unbound Merino, Babbel and Bombas) and a QR code for our referral link, agentio.com/r/C752A5C8"
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 360px"
                  placeholder="blur"
                  className="w-full h-auto rounded-[1.6rem]"
                  priority
                />
              </a>
            </div>

            <div className="text-center lg:text-left animate-fade-in-up">
              <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
                For Creators
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-5 text-primary max-w-xl mx-auto lg:mx-0">
                How we manage brand partnerships as creators
              </h1>
              <p className="text-base sm:text-lg text-foreground leading-relaxed mb-4 max-w-xl mx-auto lg:mx-0">
                We use <AgentioLink />{' '}to manage a number of our creator partnerships, from
                YouTube sponsorships to short-form campaigns and UGC opportunities. It brings briefs,
                submissions and approvals into one place and cuts down a lot of the usual email
                back-and-forth.
              </p>
              <p className="text-muted leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                We&rsquo;re Adriana and Dylan from 2Passports1Dream. Agentio is a sponsorship
                platform for creators, and we genuinely enjoy working through it, so we wanted to
                share how it works for us in case it&rsquo;s useful for other creators looking for
                YouTube brand deals.
              </p>

              <div className="flex flex-col items-center lg:items-start gap-3">
                <ReferralButton label="Explore Agentio" />
                <p className="text-xs text-muted">Our Agentio referral link</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Brands we've worked with through Agentio. Sits directly below the
          hero as social proof. Local logo files only. */}
      <section className="py-16 bg-surface">
        <div className={CONTAINER}>
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Brands we&rsquo;ve worked with
            </p>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              Brands we&rsquo;ve worked with through Agentio
            </h2>
            <p className="text-muted leading-relaxed max-w-3xl mb-8">
              We&rsquo;ve used Agentio to work with brands including Unbound Merino, Babbel, Bombas,
              Uber and Uber Eats. Having the campaign details, brief, submissions and approvals in
              one place makes the whole process much easier to manage.
            </p>
            {/* Flex wrap rather than a grid so an odd card on the last row
                stays centred instead of sitting alone on the left. */}
            <ul className="flex flex-wrap justify-center gap-4">
              {agentioBrands.map((brand, i) => {
                // Every logo sits in the same square tile with a soft ring, so
                // the white-background logos match the app-icon style ones.
                const content = (
                  <>
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={72}
                      height={72}
                      className="w-[72px] h-[72px] rounded-2xl object-contain ring-1 ring-stone-200 mb-3"
                    />
                    <p className="text-sm font-semibold text-primary leading-snug">{brand.name}</p>
                  </>
                )
                const cardClass =
                  'h-full bg-white rounded-2xl border border-stone-100 shadow-sm p-5 flex flex-col items-center justify-center text-center min-h-[150px] hover:shadow-md hover:border-stone-200 hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

                return (
                  <li
                    key={brand.name}
                    className={`stagger-card ${i > 0 ? `stagger-${i + 1}` : ''} w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-auto lg:flex-1`}
                  >
                    {/* Internal pages use Link with no sponsored rel. Brand
                        homepages are plain external links, not referrals. */}
                    {brand.internal ? (
                      <Link href={brand.href} aria-label={brand.label} className={cardClass}>
                        {content}
                      </Link>
                    ) : (
                      <a
                        href={brand.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={brand.label}
                        className={cardClass}
                      >
                        {content}
                      </a>
                    )}
                  </li>
                )
              })}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* Sponsorship estimator: an illustrative CPM example only */}
      <section className="py-16">
        <div className={CONTAINER}>
          <ScrollReveal>
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
              Sponsorship estimator
            </p>
            <h2 className="text-2xl font-bold mb-4 text-primary">
              What could a sponsorship be worth?
            </h2>
            <p className="text-muted leading-relaxed max-w-3xl mb-8">
              Brand deals are often discussed using CPM, or cost per thousand views. Use the slider
              below to see a simple example of what a campaign could be worth at a $25 CPM, or pick
              a different rate to compare.
            </p>
            <SponsorshipEstimator />
          </ScrollReveal>
        </div>
      </section>

      {/* How it works: four numbered cards */}
      <section className="py-16 border-t border-stone-100">
        <div className={CONTAINER}>
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-4 text-primary">How Agentio works for creators</h2>
            <p className="text-muted leading-relaxed max-w-3xl mb-8">
              Anyone who has done a few sponsorships knows how much of the work happens outside the
              video itself. <AgentioLink />{' '}puts that process in one place. Once your channel is
              connected and verified, it calculates your 30-day view median and surfaces
              campaign opportunities available to your channel. If a campaign needs you to
              access a brand&rsquo;s website, product, service or platform, the access and
              instructions come through the campaign workflow too.
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((step, i) => (
                <li
                  key={step.title}
                  className={`stagger-card ${i > 0 ? `stagger-${i + 1}` : ''} bg-white rounded-2xl p-6 border border-stone-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
                >
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-[#74C7D8]/20 text-primary font-bold mb-4"
                  >
                    {i + 1}
                  </span>
                  <p className="font-semibold text-base mb-2">{step.title}</p>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      {/* Why we like it */}
      <section className="py-16 border-t border-stone-100">
        <div className={CONTAINER}>
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-4 text-primary">Why we like using Agentio</h2>
            <p className="text-muted leading-relaxed max-w-3xl mb-8">
              One of our favourite things about <AgentioLink />{' '}is how much admin it removes from creator
              partnerships. Instead of having a campaign spread across long email chains, most of
              what you need lives inside the platform.
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {benefits.map((benefit) => (
                <li
                  key={benefit.title}
                  className="bg-surface rounded-2xl p-6 border border-stone-100 flex items-start gap-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-accent/10 text-accent mt-0.5"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <div>
                    <p className="font-semibold text-base mb-1.5">{benefit.title}</p>
                    <p className="text-sm text-muted leading-relaxed">{benefit.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      {/* How creators are evaluated: copy on the left, the signals Agentio
          looks at on the right. Stacks on mobile. */}
      <section className="py-16 border-t border-stone-100">
        <div className={CONTAINER}>
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-14 items-center">
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
                  How creators are evaluated
                </p>
                <h2 className="text-2xl font-bold mb-4 text-primary">
                  It&rsquo;s not just about subscriber count
                </h2>
                <p className="text-muted leading-relaxed mb-4">
                  One thing we like about Agentio is that it looks beyond a headline subscriber
                  number. Creators connect their channels directly through API access, giving the
                  platform real first-party audience, viewership and engagement data. That means
                  things like consistent median views and how your audience actually responds to
                  your content can matter more than simply having the biggest subscriber count.
                </p>
                <p className="text-muted leading-relaxed">
                  For creators, that can be encouraging. A smaller channel with a loyal audience and
                  consistent views can still be commercially interesting to brands, even if its
                  subscriber total is not enormous. Subscribers still count for something, but a big
                  number that does not turn into views tells a brand much less.
                </p>
              </div>

              <ul className="space-y-3">
                {evaluationSignals.map((signal, i) => (
                  <li
                    key={signal.title}
                    className={`stagger-card ${i > 0 ? `stagger-${i + 1}` : ''} bg-white rounded-2xl p-5 border border-stone-100 shadow-sm flex items-start gap-4`}
                  >
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-[#74C7D8]/20 text-primary"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 17 9 11 13 15 21 7" />
                        <polyline points="15 7 21 7 21 13" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-semibold text-base mb-1">{signal.title}</p>
                      <p className="text-sm text-muted leading-relaxed">{signal.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Who it is for */}
      <section className="py-16 bg-surface">
        <div className={CONTAINER}>
          <ScrollReveal>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-100 shadow-sm max-w-3xl">
              <h2 className="text-2xl font-bold mb-4 text-primary">Who is Agentio for?</h2>
              <p className="text-muted leading-relaxed mb-5">
                Agentio is worth exploring if you already create content and want another way to
                find and manage paid brand opportunities. It is particularly relevant for YouTube
                creators, but the platform can also include opportunities involving short-form
                content and UGC.
              </p>
              <p className="text-sm text-muted leading-relaxed border-l-2 border-secondary pl-4">
                Campaign availability and eligibility vary by creator, audience, channel performance
                and brand requirements.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ: compact, two columns on desktop, matching the brand pages */}
      <section className="py-16 border-t border-stone-100">
        <div className={CONTAINER}>
          <ScrollReveal>
            <h2 className="text-2xl font-bold mb-8 text-primary">Agentio FAQ for creators</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              {faqs.map((faq) => {
                const [before, after] = faq.answer.split(AGENTIO_URL)
                return (
                  <div key={faq.question}>
                    <h3 className="font-semibold text-base mb-1.5 text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {before}
                      {after !== undefined && (
                        <>
                          <a
                            href={AGENTIO_URL}
                            target="_blank"
                            rel={REFERRAL_REL}
                            className="font-medium text-primary underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-dark transition-colors break-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-sm"
                          >
                            {AGENTIO_URL}
                            <span className="sr-only"> (opens in a new tab)</span>
                          </a>
                          {after}
                        </>
                      )}
                    </p>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="hero-bg py-16 lg:py-20 text-white">
        <div className={`${CONTAINER} text-center`}>
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Want to see what opportunities are available?
            </h2>
            <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
              If you&rsquo;re already creating content and want a simpler way to discover and
              manage brand collaborations, you can take a look at Agentio through our referral link.
            </p>
            <ReferralButton label="Join Agentio" />
            <p className="text-xs text-white/60 mt-4">This is our Agentio referral link.</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
