// Facts and FAQs for the About page: the Quick facts row and the
// "Adriana & Dylan: Your Questions Answered" section, both rendered by
// src/app/components/AdrianaDylanFaq.tsx. The old /adriana-and-dylan URL
// redirects to /about.
//
// HOW TO UPDATE AGES AND YEARS TOGETHER:
//   Edit ABOUT_FACTS below. Every answer, the quick facts row and the FAQPage
//   structured data read from it, so one change updates the whole page. When
//   you update the ages, update asOfYear too so the "As of" wording stays true.
//
// HOW TO ADD OR CHANGE AN ANSWER:
//   Each answer is a list of paragraphs. To add a link inside an answer, wrap
//   the link text like this: [[link text|/about]] for a page on this site, or
//   [[link text|https://...]] for an external site. The visible answer and the
//   structured data are built from the same text, so they always match.
//
// UNPUBLISHED QUESTIONS:
//   Set answer to null to keep a question out of the page and out of the
//   structured data until we have written the answer. Never publish
//   placeholder copy.

export const ABOUT_FACTS = {
  // The year the ages and years together below were last checked.
  asOfYear: 2026,
  dylanAge: 34,
  adrianaAge: 37,
  yearsTogether: 8,
  yearsTogetherWords: 'eight',
}

export const SOCIAL_URLS = {
  youtube: 'https://www.youtube.com/@2passports1dream',
  tiktok: 'https://www.tiktok.com/@2passports1dream',
  instagram: 'https://www.instagram.com/2passports1dream',
  facebook: 'https://www.facebook.com/2passports1dream',
}

export type AboutFaq = {
  question: string
  // null keeps the question unpublished. See the guide at the top of this file.
  answer: string[] | null
}

export type AboutFaqSection = {
  id: string
  heading: string
  faqs: AboutFaq[]
}

const { asOfYear, dylanAge, adrianaAge, yearsTogetherWords } = ABOUT_FACTS

// Answers are written in our own voice, first person ("we", "our"), naming
// Adriana or Dylan individually when an answer is about just one of us.
export const aboutFaqSections: AboutFaqSection[] = [
  {
    id: 'about-adriana-and-dylan',
    heading: 'About Adriana and Dylan',
    faqs: [
      {
        question: 'Who are Adriana and Dylan?',
        answer: [
          `We’re Adriana and Dylan, the couple behind 2Passports1Dream. We make travel videos on [[YouTube|${SOCIAL_URLS.youtube}]] and share our travels on TikTok, Instagram and Facebook as @2passports1dream.`,
          'Two passports, one dream, and an awful lot of footage to edit.',
        ],
      },
      {
        question: 'Are Adriana and Dylan married?',
        answer: [
          `Not yet! We’ve been together for ${yearsTogetherWords} years, but we’re not married.`,
          `That said, ${yearsTogetherWords} years of travelling the world together feels like a pretty good test run.`,
        ],
      },
      {
        question: 'How long have Adriana and Dylan been together?',
        answer: [
          `As of ${asOfYear}, we’ve been together for ${yearsTogetherWords} years. And yes, we still like each other.`,
        ],
      },
      {
        question: 'How old are Adriana and Dylan?',
        answer: [`As of ${asOfYear}, Dylan is ${dylanAge} and Adriana is ${adrianaAge}. Not that anyone’s counting.`],
      },
      {
        question: 'Where are Adriana and Dylan from?',
        answer: [
          'Adriana is from the south of Sweden, and Dylan is from North Wales. Two very different places, and somehow we ended up with one shared dream.',
        ],
      },
      {
        question: 'Do Adriana and Dylan have children?',
        answer: ['Not at the moment. For now, it’s just the two of us and a lot of camera gear.'],
      },
      {
        // TODO: High-interest question that people regularly ask. Adriana and
        // Dylan still need to write this answer. Keep answer as null until
        // then so nothing is shown on the page or in the structured data.
        question: 'How did Adriana and Dylan meet?',
        answer: null,
      },
    ],
  },
  {
    id: 'where-they-live',
    heading: 'Where they live',
    faqs: [
      {
        question: 'Where do Adriana and Dylan live?',
        answer: [
          'Honestly, right now we don’t really live anywhere. We’re completely nomadic and don’t have a permanent home base at the moment.',
          'One day, we’d love a home of our own somewhere, a place we can come back to and live between trips. Until then, home is wherever our bags are.',
        ],
      },
    ],
  },
  {
    id: 'how-2passports1dream-works',
    heading: 'How 2Passports1Dream works',
    faqs: [
      {
        question: 'How did 2Passports1Dream start?',
        answer: [
          `It all started with us making [[YouTube videos|${SOCIAL_URLS.youtube}]] while travelling in Thailand. The channel grew bit by bit from there, and our [[TikTok|${SOCIAL_URLS.tiktok}]], [[Instagram|${SOCIAL_URLS.instagram}]] and [[Facebook|${SOCIAL_URLS.facebook}]] accounts followed.`,
          'What began as us documenting our travels slowly turned into the full-time creator business we run today. We still find that a little surreal.',
        ],
      },
      {
        question: 'How does 2Passports1Dream make money?',
        answer: [
          '2Passports1Dream is our full-time job. Like most creator businesses, our income comes from a few places, including advertising on our videos, paid [[brand partnerships|/work-with-us]] and affiliate links when people use some of the [[recommendations on this website|/discount-codes]].',
          'It took us several years to get to the point where making travel content was sustainable, and we’re very aware it only works because people choose to watch and support what we make. Thank you for that.',
        ],
      },
      {
        question: 'What is 2Passports1Dream’s net worth?',
        answer: [
          'We don’t share a personal net worth figure. We feel incredibly privileged that travelling and making videos has become our job, but it definitely didn’t start that way.',
          'For the first few years, we were putting our own money into travelling and filming, and often losing money in the process. Not the best business plan! What we gained instead was experience, memories and a growing community.',
          'Today, thanks to everyone watching, sharing and engaging with our videos, we’re lucky to have turned 2Passports1Dream into something sustainable. We never take that support for granted.',
        ],
      },
    ],
  },
  {
    id: 'travel-and-lifestyle',
    heading: 'Travel & Lifestyle',
    faqs: [
      {
        question: 'Does Adriana like wearing bikinis?',
        answer: [
          'Put it this way: if it’s hot, sunny and there’s a beach nearby, there’s a very good chance Adriana is in a bikini. Being by the sea in the sunshine is pretty much her happy place. Factor 50 is always invited too.',
          'After years of chasing warm weather, she’s tried a lot of swimwear, so we might share a few of the swimwear and travel clothing brands she genuinely likes here one day.',
        ],
      },
    ],
  },
]

// Link markers look like [[text|href]].
export const ANSWER_LINK_PATTERN = /\[\[(.+?)\|(.+?)\]\]/g

// The answer as plain text, exactly as it reads on the page, for the FAQPage
// structured data. Paragraphs are joined with a single space.
export function answerPlainText(paragraphs: string[]): string {
  return paragraphs.map((p) => p.replace(ANSWER_LINK_PATTERN, '$1')).join(' ')
}

// Only answered questions are published, on the page and in the schema.
export function publishedFaqs(section: AboutFaqSection) {
  return section.faqs.filter(
    (faq): faq is AboutFaq & { answer: string[] } => faq.answer !== null,
  )
}
