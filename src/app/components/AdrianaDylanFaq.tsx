import Image from 'next/image'
import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import {
  ABOUT_FACTS,
  ANSWER_LINK_PATTERN,
  aboutFaqSections,
  answerPlainText,
  publishedFaqs,
} from '../data/adriana-and-dylan'

// About page building blocks: the Quick facts row (shown after Our Story) and
// "Adriana & Dylan: Your Questions Answered" (shown after Moments from the
// road). All copy and facts live in src/app/data/adriana-and-dylan.ts. The old
// /adriana-and-dylan URL redirects to /about (see next.config.ts).

// The anchor for the questions section, used by the footer link.
export const ABOUT_FAQ_ANCHOR = 'adriana-and-dylan-faq'

// FAQPage only, built from the same data as the visible answers so the two
// always match. Unpublished questions are filtered out of both.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: aboutFaqSections.flatMap((section) =>
    publishedFaqs(section).map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: answerPlainText(faq.answer) },
    })),
  ),
}

const INLINE_LINK =
  'text-accent font-medium underline underline-offset-2 hover:text-accent-dark transition-colors'

// Renders an answer paragraph, turning [[text|href]] markers into links.
// Internal paths use Link; external social links open in a new tab.
function renderAnswer(text: string): ReactNode {
  const nodes: ReactNode[] = []
  let last = 0
  for (const match of text.matchAll(ANSWER_LINK_PATTERN)) {
    const [whole, label, href] = match
    const start = match.index ?? 0
    if (start > last) nodes.push(<Fragment key={`t-${start}`}>{text.slice(last, start)}</Fragment>)
    nodes.push(
      href.startsWith('/') ? (
        <Link key={`l-${start}`} href={href} className={INLINE_LINK}>
          {label}
        </Link>
      ) : (
        <a key={`l-${start}`} href={href} target="_blank" rel="noopener noreferrer" className={INLINE_LINK}>
          {label}
        </a>
      ),
    )
    last = start + whole.length
  }
  if (last < text.length) nodes.push(<Fragment key="t-end">{text.slice(last)}</Fragment>)
  return nodes
}

const quickFacts = [
  { label: 'Adriana', value: 'Sweden', detail: 'From the south of Sweden', tone: 'text-[#174E5D] bg-[#74C7D8]/20' },
  { label: 'Dylan', value: 'Wales', detail: 'From North Wales', tone: 'text-[#E76F51] bg-[#E76F51]/12' },
  {
    label: 'Together',
    value: `${ABOUT_FACTS.yearsTogether} years`,
    detail: `As of ${ABOUT_FACTS.asOfYear}`,
    tone: 'text-[#B8860B] bg-[#FFD166]/30',
  },
  { label: 'Lifestyle', value: 'Nomadic', detail: 'No permanent home base', tone: 'text-[#4a7a44] bg-[#7EAD78]/20' },
]

// One photo per FAQ group, alternating sides on desktop. Alt text describes
// only what is in the photo.
const sectionImages: Record<string, { src: string; alt: string; objectPosition?: string }> = {
  'about-adriana-and-dylan': {
    src: '/images/gallery/DylanAdriana9474.jpg',
    alt: 'Adriana and Dylan from 2Passports1Dream at sunset by the sea',
    objectPosition: 'center 45%',
  },
  'where-they-live': {
    src: '/images/gallery/DylanAdriana6615.jpg',
    alt: 'Adriana and Dylan in a convertible on a road trip',
    objectPosition: 'center 45%',
  },
  'how-2passports1dream-works': {
    src: '/images/gallery/DylanAdriana2323.jpg',
    alt: 'Adriana and Dylan taking a photo together in a mirrored stairway',
    objectPosition: 'center 40%',
  },
  'travel-and-lifestyle': {
    src: '/images/gallery/DylanAdriana0290.jpg',
    alt: 'Adriana and Dylan on a sunny beach',
    objectPosition: 'center 55%',
  },
}

// Quick facts. Sits directly under Our Story on the About page, on the same
// white background so it reads as part of the story rather than a new band.
export function AboutQuickFacts() {
  return (
    <section className="px-4 pb-16 lg:pb-20" aria-labelledby="quick-facts-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="quick-facts-heading" className="text-xs font-semibold tracking-widest uppercase text-accent mb-5">
          Quick facts
        </h2>
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="bg-white rounded-2xl border border-[#F0DDB0] p-5 shadow-sm">
              <dt className="text-[10px] font-bold uppercase tracking-widest text-muted mb-2">{fact.label}</dt>
              <dd>
                <span className={`inline-block rounded-full px-3 py-1 text-base sm:text-lg font-bold ${fact.tone}`}>
                  {fact.value}
                </span>
                <span className="block text-xs text-muted mt-2">{fact.detail}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

// Your Questions Answered. Every question and answer is in the
// server-rendered HTML, with no accordions hiding the copy.
export default function AdrianaDylanFaq() {
  return (
    <section id={ABOUT_FAQ_ANCHOR} className="scroll-mt-24 py-16 px-4 lg:py-20 bg-[#FFF9EF]">
      {/* Structured data: the visible answers below, as FAQPage. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-10 lg:mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">Your questions</p>
          <h2 className="text-3xl font-bold text-primary mb-2">Adriana &amp; Dylan: Your Questions Answered</h2>
          <p className="text-muted text-sm leading-relaxed max-w-xl">
            Where they are from, how long they have been together, where they live and how
            2Passports1Dream became their full-time job.
          </p>
        </div>

        <div className="space-y-14 lg:space-y-16">
          {aboutFaqSections.map((section, sectionIndex) => {
            const faqs = publishedFaqs(section)
            if (faqs.length === 0) return null
            const image = sectionImages[section.id]
            const imageFirst = sectionIndex % 2 === 0

            const faqList = (
              <div>
                <h3 className="text-2xl font-bold text-primary mb-5">{section.heading}</h3>
                <div className={image ? 'space-y-4' : 'grid grid-cols-1 md:grid-cols-2 gap-4'}>
                  {faqs.map((faq) => (
                    <article key={faq.question} className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6">
                      <h4 className="font-bold text-base text-foreground mb-2">{faq.question}</h4>
                      <div className="space-y-3">
                        {faq.answer.map((para, i) => (
                          <p key={i} className="text-sm text-muted leading-relaxed">
                            {renderAnswer(para)}
                          </p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )

            return (
              <div key={section.id} id={section.id} className="scroll-mt-24">
                {image ? (
                  <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-8 lg:gap-12 items-center">
                    <div className={imageFirst ? 'lg:order-last' : ''}>{faqList}</div>
                    <div className={`relative w-full max-w-md mx-auto lg:max-w-none ${faqs.length > 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'} rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 bg-stone-100`}>
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(max-width: 1024px) 448px, 440px"
                        className="object-cover"
                        style={{ objectPosition: image.objectPosition ?? 'center center' }}
                      />
                    </div>
                  </div>
                ) : (
                  faqList
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
