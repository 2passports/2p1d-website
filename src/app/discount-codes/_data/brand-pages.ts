// Rich page data for dedicated /discount-codes/[brand] pages.
// Each entry is keyed by the brand slug.
// To add a new brand page:
//   1. Add an entry here.
//   2. Create a folder at src/app/discount-codes/[slug]/ with a page.tsx.
//   3. Set slug on the matching entry in src/app/data/discount-codes.ts.

export type BrandPageData = {
  name: string
  slug: string
  affiliateUrl: string
  offer: string
  code: string | null
  buttonLabel: string
  logoImage: string | null
  badgeText: string
  // Optional secondary call to action, e.g. an Amazon link shown alongside the
  // main affiliate button. Both fields must be set for it to render.
  secondaryUrl?: string
  secondaryLabel?: string
  // When true, occurrences of `code` within the visible body copy are bolded so
  // the discount code is easy to spot. Off by default so other pages are
  // unchanged.
  boldCodeInCopy?: boolean
  seoTitle: string
  seoDescription: string
  heroTagline: string
  intro: string
  whatItIs: string[]
  whyUseful: string[]
  bestFor: string[]
  howToUseSteps: string[]
  importantNotes: string
  // Optional SEO-rich sections. Currently only the Klook page uses these, so
  // they render only when present and other brand pages stay unchanged.
  seoIntro?: string[]
  whatYouCanBook?: string[]
  destinationsIntro?: string
  destinations?: string[]
  faqs?: { question: string; answer: string }[]
  // A real travel example, with a YouTube video and an optional photo.
  realExample?: {
    title: string
    paragraphs: string[]
    videoId: string
    videoUrl: string
    image?: { src: string; alt: string; objectPosition?: string }
  }
  // Optional landing-style hero. When heroImage is set, the page renders a
  // two-column hero (text and code on the left, image on the right).
  heroHeading?: string
  heroImage?: { src: string; alt: string; badge?: string; objectPosition?: string }
  // Optional YouTube video id shown on the right of the two-column hero. Takes
  // precedence over heroImage. Use for a playable feature video in the hero.
  heroVideoId?: string
  // Optional feature videos interleaved between body sections. Each video names
  // the section it should sit after via `placement`, so the page stays spread
  // out rather than stacking every clip together. videosHeading and videosIntro
  // appear once, above the first video group. Rendered only when present.
  videosHeading?: string
  videosIntro?: string
  videos?: BrandVideo[]
  // Optional "other products and ranges" section, shown as grouped cards.
  // Rendered only when present.
  productRangesHeading?: string
  productRangesIntro?: string
  productRanges?: ProductRangeGroup[]
}

export type ProductRangeItem = {
  name: string
  description: string
  // When true, the product name links to the brand's main affiliate URL.
  linked?: boolean
}

export type ProductRangeGroup = {
  title: string
  items: ProductRangeItem[]
}

export type BrandVideoPlacement =
  | 'afterWhatItIs'
  | 'afterWhyBestFor'
  | 'afterHowToUse'
  | 'afterFaqs'

export type BrandVideo = {
  // The YouTube video id, e.g. 'baxHhOHe2Xw'.
  id: string
  caption?: string
  placement: BrandVideoPlacement
}

export const klook: BrandPageData = {
  name: 'Klook',
  slug: 'klook',
  affiliateUrl:
    'https://affiliate.klook.com/redirect?aid=123026&aff_adid=1290323&k_site=https%3A%2F%2Fwww.klook.com%2F',
  offer: 'Up to 10% off',
  code: '2P1DKLOOKOFF',
  buttonLabel: 'Visit Klook',
  logoImage: '/logos/klook.webp',
  badgeText: 'Klook',
  seoTitle: 'Klook Discount Code | Save on Travel Activities, Hotels and Tickets',
  seoDescription:
    'Use our Klook discount code to book travel activities, attraction tickets, tours, hotels, airport transfers and travel essentials around the world with 2Passports1Dream.',
  heroHeading: 'Klook Discount Code',
  heroImage: {
    src: '/images/AdrianaUniversal.jpg',
    alt: 'Adriana at Universal Orlando during our Orlando trip',
    badge: 'Real travel example: Orlando',
    objectPosition: 'center 25%',
  },
  heroTagline:
    'Looking for a Klook discount code for your next trip? Use our 2Passports1Dream Klook code when booking travel activities, attraction tickets, Universal Orlando tickets, hotels, airport transfers, tours and travel essentials around the world.',
  intro:
    'Klook is one of the travel tools we use when we want to browse tours, activities, tickets and transfers before arriving in a destination. It can be especially useful when you want to plan a few experiences in advance instead of figuring everything out on the day.',
  seoIntro: [
    'If you are looking for the best Klook discount code for your next trip, you can use our 2Passports1Dream Klook code to book travel activities, attraction tickets, tours, hotels, airport transfers and other useful travel experiences through Klook.',
    'Whether you want a Klook promo code or voucher code for day tours, theme park tickets, transport passes or an eSIM, Klook is a handy way to sort the fun parts of a trip in advance, so you can spend less time queuing and more time exploring.',
  ],
  whatYouCanBook: [
    'Attraction tickets',
    'Day tours and activities',
    'Hotels and stays',
    'Airport transfers',
    'Transport passes',
    'eSIMs and travel essentials',
    'Food experiences',
    'Theme parks and shows',
  ],
  destinationsIntro:
    'Klook is especially useful for finding things to do around the world, and it is particularly strong across Asia. We have found it handy when planning activities for popular destinations such as:',
  destinations: [
    'Singapore',
    'Hong Kong',
    'Japan',
    'South Korea',
    'Thailand',
    'Bali',
    'Vietnam',
    'Malaysia',
    'Taiwan',
    'Dubai',
    'Australia',
    'Europe',
    'the United States',
  ],
  realExample: {
    title: 'How we used Klook in Orlando',
    paragraphs: [
      'We used Klook during our Orlando trip to book Universal and other travel activities, which is exactly the kind of thing Klook can be useful for when planning a busy trip. If you are looking for theme park tickets, attractions, tours, airport transfers or travel experiences, Klook can be a handy place to compare and book before you go.',
      'We booked Universal and other activities through Klook rather than everything on the trip, and for a city like Orlando it was a handy way to look at Universal Orlando tickets and other Orlando activities in one place. You can use our Klook discount code when booking theme park tickets and travel experiences before you travel.',
    ],
    videoId: 'rhjpGldaU78',
    videoUrl: 'https://www.youtube.com/watch?v=rhjpGldaU78',
  },
  faqs: [
    {
      question: 'What is Klook?',
      answer:
        'Klook is an online platform for booking travel experiences, including attraction tickets, day tours, activities, hotels, airport transfers and transport passes around the world.',
    },
    {
      question: 'What can I book with Klook?',
      answer:
        'You can book attraction tickets, tours and activities, hotels and stays, airport transfers, transport passes, eSIMs, food experiences and theme park or show tickets.',
    },
    {
      question: 'Where can I use Klook?',
      answer:
        'Klook covers destinations worldwide and is especially strong across Asia, including Singapore, Hong Kong, Japan, South Korea, Thailand, Bali, Vietnam, Malaysia and Taiwan, as well as Dubai, Australia, Europe and the United States.',
    },
    {
      question: 'How do I use a Klook discount code?',
      answer:
        'Visit Klook through our link, choose your activity, ticket, hotel or transfer, then enter our Klook discount code at checkout if a promo field is shown. Always check the final price before booking.',
    },
    {
      question: 'Is Klook useful for booking travel activities?',
      answer:
        'Yes. Klook can be a useful way to compare and book activities, tickets and tours in advance, which can save time and queuing once you arrive.',
    },
  ],
  whatItIs: [
    'Klook is an online platform for booking travel experiences, tours, attraction tickets, airport transfers, transport passes and activities around the world. It covers a wide range of destinations globally and is particularly well-known for Asia.',
    'Many bookings can be made in advance, and a lot of them offer flexible cancellation, which can be useful when travel plans are not fully confirmed.',
  ],
  whyUseful: [
    'We like using Klook as a starting point when planning what to actually do in a destination. It gives us a quick way to compare activities, see what is available and sometimes book things before we arrive.',
    'It is particularly handy for airport transfers and attraction tickets, where booking in advance can save both time and stress on the day.',
  ],
  bestFor: [
    'Travellers planning a city break',
    'People who want tickets or tours booked in advance',
    'Families or couples planning activities',
    'Anyone who wants to compare experiences in one place',
  ],
  howToUseSteps: [
    'Click through to Klook using our link.',
    'Choose your activity, hotel, ticket or travel experience.',
    'Enter the Klook discount code 2P1DKLOOKOFF at checkout if a promo field is shown.',
    'Check the final price before booking.',
  ],
  importantNotes:
    'Discount availability and the final amount may vary. Always check the price at checkout before booking.',
}

export const djiMicMini: BrandPageData = {
  name: 'DJI Mic Mini',
  slug: 'dji-mic-mini',
  affiliateUrl:
    'https://click.dji.com/AM1oi0gFfS5Qk8F6oBpZYw?ch=DM300-26Q1-2passports1dream&pm=custom',
  offer: '25% off',
  code: null,
  buttonLabel: 'Shop DJI',
  logoImage: '/logos/djimicmini.webp',
  badgeText: 'DJI',
  seoTitle: 'DJI Mic Mini Discount Code 2026 | 25% Off Through Our Link',
  seoDescription:
    'Looking for a DJI Mic Mini discount code in 2026? Our 25% off offer is applied through our link, so there is no manual code to enter at checkout. Compact wireless audio for travel creators and vloggers.',
  heroTagline: 'Compact wireless audio for creators, vloggers and travel filmmakers.',
  intro:
    'Good audio makes travel videos much easier to watch, especially when filming outdoors, in busy places or on the move. The DJI Mic Mini is a compact wireless microphone setup that can be a useful tool for creators who want to travel light.',
  seoIntro: [
    'Looking for a DJI Mic Mini discount code in 2026? Our DJI Mic Mini offer is applied through our link, so there is no manual code to enter at checkout. Just click through using our link and check the final price before buying.',
    'Whether you are after a DJI promo code, voucher code or the latest DJI Mic Mini deal, there is nothing to type in by hand. The current 25% off offer is applied through our link where available.',
  ],
  whatItIs: [
    'The DJI Mic Mini is a compact wireless microphone system designed for creators, vloggers and anyone who wants clean audio without carrying bulky gear.',
    'It is designed to connect easily to cameras, phones and other recording devices, making it a popular choice for travel content creators who need reliable audio in a small package.',
  ],
  whyUseful: [
    'For travel creators, small gear that actually fits in a bag is always a win. The DJI Mic Mini is compact enough to carry on any trip without adding significant weight or bulk.',
    'We find that audio quality is one of the first things viewers notice in travel videos, especially when filming on streets, in cafes or in outdoor locations where background noise is a factor.',
  ],
  bestFor: [
    'Travel vloggers and content creators',
    'Anyone filming talking-to-camera content outdoors',
    'Lightweight creator setups for trips',
    'People who want compact, reliable wireless audio',
  ],
  howToUseSteps: [
    'Click our DJI link to visit the product page.',
    'Check the current offer and pricing through the link.',
    'Add the product to your basket.',
    'Check the final price at checkout before paying.',
  ],
  faqs: [
    {
      question: 'Do I need a DJI Mic Mini discount code?',
      answer:
        'In this case, no manual code is needed. Our DJI Mic Mini discount is applied through our link, so just click through and check the final price before buying.',
    },
    {
      question: 'How do I get the DJI Mic Mini offer?',
      answer:
        'Click through using our DJI link to the product page. The current offer should be applied through the link where available, so check the final price at checkout before paying.',
    },
  ],
  importantNotes:
    'Offers can change, so always check the current price and availability before buying.',
}

export const gomatic: BrandPageData = {
  name: 'Gomatic',
  slug: 'gomatic',
  affiliateUrl:
    'https://gomatic.co.uk/products/the-gomatic-travel-pack?ref=2Passports1Dream',
  offer: '10% off',
  code: 'PASSPORTSDREAM',
  buttonLabel: 'Shop Gomatic',
  logoImage: '/logos/gomatic.webp',
  badgeText: 'Gomatic',
  seoTitle: 'Gomatic Discount Code | 2Passports1Dream',
  seoDescription:
    'Use our Gomatic discount code PASSPORTSDREAM for 10% off Gomatic travel bags and backpacks. Practical packing gear for short trips, tech gear and everyday travel.',
  heroTagline:
    'Practical travel bags and backpacks for organised packing and shorter trips.',
  intro:
    'A good backpack makes travel days feel calmer, especially when you need camera gear, a laptop and travel essentials all in one place. Gomatic makes travel bags designed around organised packing for people who move around a lot.',
  whatItIs: [
    'Gomatic makes travel bags, backpacks and packing accessories designed for organised, practical travel. Their bags are built for people who want a structured approach to packing without unnecessary bulk.',
    'The brand is particularly known among travellers and creators who want bags that work well for short trips, weekend travel and everyday use.',
  ],
  whyUseful: [
    'We like travel gear that keeps things tidy without feeling overly complicated. A well-organised bag saves time at airports, keeps equipment accessible and makes packing and unpacking quicker on busy travel days.',
    'For trips where you are carrying camera gear, clothes and travel essentials, having a bag with sensible pockets and structure makes a real difference.',
  ],
  bestFor: [
    'Short trips and weekend travel',
    'Hand luggage and carry-on travel',
    'Creators who carry camera gear and tech',
    'Travellers who want organised, structured packing',
  ],
  howToUseSteps: [
    'Click our Gomatic link to visit the product page.',
    'Choose your bag or travel product.',
    'Enter code PASSPORTSDREAM at checkout.',
    'Check the final price before completing your order.',
  ],
  importantNotes:
    'Discount availability may vary. Always check the final price at checkout before paying.',
}

export const holafly: BrandPageData = {
  name: 'Holafly eSIM',
  slug: 'holafly',
  affiliateUrl: 'http://holafly.sjv.io/APoe7a',
  offer: '5% off',
  code: '2passports1dream',
  buttonLabel: 'Get eSIM',
  logoImage: '/logos/holafly.webp',
  badgeText: 'Holafly',
  seoTitle: 'Holafly eSIM Discount Code | 2Passports1Dream',
  seoDescription:
    'Use our Holafly discount code 2passports1dream for 5% off a Holafly eSIM. Stay connected while travelling without buying a physical SIM card.',
  heroTagline:
    'eSIMs for staying connected while travelling without buying a physical SIM card.',
  intro:
    'Having data when you land makes everything easier, from maps and taxis to messages, bookings and finding food. Holafly offers eSIMs for a wide range of destinations, which can be a straightforward way to sort connectivity before a trip.',
  whatItIs: [
    'Holafly is an eSIM provider that offers data plans for travellers visiting destinations around the world. An eSIM is a digital SIM card that you install on your phone before you travel, removing the need to buy a physical SIM card when you arrive.',
    'eSIMs are supported on most modern smartphones, including recent iPhone and Android models. You activate the eSIM before your trip and your phone connects to local networks when you land.',
  ],
  whyUseful: [
    'For us, having data abroad is one of those things that makes travel feel instantly smoother. Getting from an airport to your accommodation is much easier when you have maps, a way to contact your hotel and the ability to check bookings.',
    'Holafly covers a wide range of destinations, which is useful when a trip involves multiple countries or a destination where local SIM cards can be hard to find quickly.',
  ],
  bestFor: [
    'International travel and city breaks',
    'Travellers visiting multiple countries on one trip',
    'People who want to sort connectivity before they leave home',
    'Anyone who wants to avoid the airport SIM card queue',
  ],
  howToUseSteps: [
    'Click our Holafly link and choose your destination.',
    'Select the data plan that works for your trip length.',
    'Enter code 2passports1dream at checkout.',
    'Install the eSIM on your phone before your departure date.',
    'Check the final price before paying.',
  ],
  importantNotes:
    'eSIM compatibility depends on your phone model and the destination. Check that your device supports eSIM before purchasing. Offers can change, so always check the final price before buying.',
}

export const foreo: BrandPageData = {
  name: 'FOREO',
  slug: 'foreo',
  affiliateUrl: 'https://foreo.se/YlEkm',
  offer: '35% off',
  code: 'PASSPORT35',
  buttonLabel: 'Shop FOREO',
  logoImage: '/logos/Foreo.webp',
  badgeText: 'FOREO',
  seoTitle: 'FOREO Discount Code | 2Passports1Dream',
  seoDescription:
    'Use our FOREO discount code PASSPORT35 for 35% off FOREO skincare and beauty devices. Travel-friendly skincare tools for keeping your routine manageable on the road.',
  heroTagline:
    'Skincare and beauty devices that can fit into a simple travel routine.',
  intro:
    'Travel can be rough on skin, especially with flights, changing climates and long days outside. FOREO makes compact skincare devices that can be useful for keeping a simple routine going while you are away.',
  whatItIs: [
    'FOREO is a Swedish brand known for skincare and beauty devices, including facial cleansing and massage tools. Their devices are compact, rechargeable and designed to be used as part of a regular skincare routine.',
    'Several of their products are small enough to fit in hand luggage, which can make them a practical option for travellers who want to maintain a skincare routine while away.',
  ],
  whyUseful: [
    'We like beauty tools that are easy to pack and do not make a skincare routine feel complicated. When travelling, simplicity matters, and having a few compact, reliable tools can make a routine feel manageable even in a hotel room.',
    'Travel often disrupts skin because of dry cabin air, sun exposure, irregular sleep and unfamiliar water, so having a consistent routine can be useful.',
  ],
  bestFor: [
    'Travellers who want to maintain a skincare routine while away',
    'People who prefer compact, easy-to-pack beauty tools',
    'Anyone looking to simplify their travel beauty routine',
    'Those who spend long periods away from home',
  ],
  howToUseSteps: [
    'Click our FOREO link to visit the website.',
    'Browse the product range and choose what suits your needs.',
    'Enter code PASSPORT35 at checkout.',
    'Check the final price before completing your order.',
  ],
  importantNotes:
    'Discount availability may vary by product. Always check the final price at checkout before paying.',
}

export const level8: BrandPageData = {
  name: 'Level8 Luggage',
  slug: 'level8',
  affiliateUrl:
    'https://www.dpbolvw.net/click-101187259-15195329?url=https%3A%2F%2Fuk.level8cases.com%2Fproducts%2Flarge-luggage-with-wide-handle-level8-voyageur%3Fvariant%3D44798341611743',
  offer: '10% off',
  code: '2P1D10',
  buttonLabel: 'Shop Level8',
  logoImage: '/logos/Level8.webp',
  badgeText: 'Level8',
  seoTitle: 'Level8 Luggage Discount Code | 2Passports1Dream',
  seoDescription:
    'Use our Level8 discount code 2P1D10 for 10% off Level8 suitcases and luggage. Practical, sturdy luggage for frequent travellers.',
  heroTagline: 'Suitcases and luggage designed for frequent travellers.',
  intro:
    'When you are moving between airports, hotels, road trips and filming locations, sturdy, practical luggage matters more than it might seem at first. Level8 makes travel cases designed for people who are on the move regularly.',
  whatItIs: [
    'Level8 is a luggage brand that makes suitcases and travel cases focused on durability, practical design and value for frequent travellers.',
    'Their cases are designed with features such as smooth-rolling wheels, organised interiors and sturdy construction, aimed at people who travel regularly rather than occasionally.',
  ],
  whyUseful: [
    'When you travel a lot, sturdy luggage becomes less of a luxury and more of a necessity. Bags that break, wheels that get stuck or cases that are too small or too large all add unnecessary stress to travel days.',
    'We find practical luggage particularly important on trips that involve multiple stops, road trips or long-haul flights where the bag gets handled more than usual.',
  ],
  bestFor: [
    'Frequent travellers who need reliable luggage',
    'Long-haul trips and multi-stop itineraries',
    'Anyone looking for practical, durable checked luggage',
    'Travel days that involve multiple flights or transfers',
  ],
  howToUseSteps: [
    'Click our Level8 link to visit the product page.',
    'Choose your luggage size and style.',
    'Enter code 2P1D10 at checkout.',
    'Check the final price before completing your order.',
  ],
  importantNotes:
    'Discount availability may vary. Always check the final price at checkout before paying.',
}

export const ultrahuman: BrandPageData = {
  name: 'Ultrahuman Smart Ring',
  slug: 'ultrahuman',
  affiliateUrl: 'http://ultrahuman.com/2passports1dream',
  offer: '10% off',
  code: null,
  buttonLabel: 'Shop Ultrahuman',
  logoImage: '/logos/Ultrahuman.webp',
  badgeText: 'Ultrahuman',
  seoTitle: 'Ultrahuman Smart Ring Discount Code 2026 | Our Latest Offer',
  seoDescription:
    'Looking for an Ultrahuman discount code in 2026? Our Ultrahuman Smart Ring offer is applied through our link, so there is no manual code to enter at checkout. A smart ring for tracking sleep, movement and recovery.',
  heroTagline:
    'A smart ring for tracking sleep, movement and recovery.',
  intro:
    'Travel can affect sleep, routine and recovery in ways that are easy to overlook. The Ultrahuman Ring is a wearable for tracking health metrics like sleep quality, movement and recovery, which can be useful when your daily routine is regularly disrupted by travel.',
  seoIntro: [
    'Looking for an Ultrahuman discount code in 2026? Our Ultrahuman Smart Ring offer is applied through our link, so there is no manual code to enter at checkout. Just click through using our link and check the final price before buying.',
    'Whether you are after an Ultrahuman promo code, voucher code or the latest Ultrahuman Ring deal, there is nothing to type in by hand. The current offer is applied through our link where available.',
  ],
  whatItIs: [
    'Ultrahuman makes the Ultrahuman Ring, a smart ring designed to track health metrics including sleep, movement, heart rate variability and recovery without needing to wear a screen-based wearable.',
    'The ring connects to an app that provides insights based on the data it collects, aimed at helping users understand patterns in sleep and recovery over time.',
  ],
  whyUseful: [
    'We find health tracking especially useful when travel days are long and routines are all over the place. Knowing how your sleep is being affected by time zones, early starts or uncomfortable beds can help you adjust.',
    'Unlike screen-based wearables, a ring-form factor means it is easy to forget you are wearing it, which can make it more practical for travel and everyday use.',
  ],
  bestFor: [
    'Travellers who want to track sleep and recovery',
    'People whose routines are regularly disrupted by travel or work',
    'Anyone interested in health data without a screen-based wearable',
    'Those who want to understand how travel affects their body',
  ],
  howToUseSteps: [
    'Click our Ultrahuman link to visit the website.',
    'Check the current offer and sizing information.',
    'The offer should be applied through the link where available.',
    'Check the final price at checkout before paying.',
  ],
  faqs: [
    {
      question: 'Do I need an Ultrahuman discount code?',
      answer:
        'In this case, no manual code is needed. Our Ultrahuman discount is applied through our link, so just click through and check the final price before buying.',
    },
    {
      question: 'How do I get the Ultrahuman offer?',
      answer:
        'Click through using our Ultrahuman link, check the sizing information and the current offer should be applied through the link where available. Always check the final price at checkout before paying.',
    },
  ],
  importantNotes:
    'Offers can change, so always check the current price and availability before buying.',
}

export const nordvpn: BrandPageData = {
  name: 'NordVPN',
  slug: 'nordvpn',
  affiliateUrl: 'https://www.nordvpn.com/2passports',
  offer: '4 months free',
  code: null,
  buttonLabel: 'Get NordVPN',
  logoImage: '/logos/NordVPN.webp',
  badgeText: 'NordVPN',
  seoTitle: 'NordVPN Discount Code 2026 | Get Our Latest NordVPN Offer',
  seoDescription:
    'Looking for a NordVPN discount code in 2026? Our NordVPN offer is applied through our link, so there is no manual code to enter at checkout. Get extra months free and more privacy on public WiFi while travelling.',
  heroTagline:
    'Extra months free when you sign up through our link. Useful for privacy on public WiFi while travelling.',
  intro:
    'We often use public WiFi in airports, hotels and cafes while travelling, so having extra privacy and security while online can be useful. NordVPN is a VPN service that can help with that.',
  seoIntro: [
    'Looking for a NordVPN discount code in 2026? Our NordVPN offer is applied through our link, so there is no manual code to enter at checkout. Just click through using our link and check the final price before signing up.',
    'Whether you are after a NordVPN promo code, voucher code or the latest NordVPN deal, there is nothing to type in by hand here. The current offer, including extra months free where available, is applied when you sign up through our link.',
  ],
  whatItIs: [
    'NordVPN is a virtual private network (VPN) service that encrypts your internet connection and routes it through servers in various locations. This can make your connection more private and secure, particularly on public WiFi networks.',
    'VPNs can also be useful for accessing your usual online accounts and services while abroad, though availability may depend on the destination and service.',
  ],
  whyUseful: [
    'When travelling, we regularly connect to public WiFi in hotels, airports, cafes and co-working spaces. Using a VPN adds a layer of privacy to those connections, which can be reassuring when accessing email, banking or work accounts.',
    'It can also be useful when you want to access streaming services or other accounts from abroad that may behave differently depending on your location.',
  ],
  bestFor: [
    'Travellers who regularly use public WiFi',
    'Anyone who wants extra privacy when online abroad',
    'Remote workers travelling and working from different locations',
    'People who want to access their usual accounts and services while travelling',
  ],
  howToUseSteps: [
    'Click our NordVPN link to visit their website.',
    'Choose a subscription plan.',
    'The offer should be applied through our link where available.',
    'Check the final price before completing your subscription.',
  ],
  faqs: [
    {
      question: 'Do I need a NordVPN discount code?',
      answer:
        'In this case, no manual code is needed. Our NordVPN discount is applied through our link, so just click through and check the final price before signing up.',
    },
    {
      question: 'How do I get the NordVPN offer?',
      answer:
        'Click through using our NordVPN link and choose a plan. The current offer, including extra months free where available, should be applied through the link. Always check the final price and terms before subscribing.',
    },
    {
      question: 'Is NordVPN useful for travel?',
      answer:
        'Yes. We often connect to public WiFi in hotels, airports and cafes while travelling, and a VPN can add a layer of privacy when checking emails, banking or signing into accounts on shared networks.',
    },
  ],
  importantNotes:
    'VPN availability and functionality may vary by destination. Always check the current price, terms and features before subscribing.',
}

export const currensea: BrandPageData = {
  name: 'Currensea',
  slug: 'currensea',
  affiliateUrl:
    'https://www.currensea.com/refer-a-friend?utm_source=refer-a-friend&friend-referral-code=DETJY2',
  offer: '£10 free',
  code: null,
  buttonLabel: 'Get Currensea',
  logoImage: '/logos/Currensea.webp',
  badgeText: 'Currensea',
  seoTitle: 'Currensea Discount Code 2026 | £10 Free Travel Card Offer',
  seoDescription:
    'Looking for a Currensea discount code or referral offer in 2026? Our Currensea offer is applied through our link, so there is no manual code to enter. Get £10 free on a UK travel debit card that connects to your existing bank account. Terms apply.',
  heroTagline:
    'UK travel debit card connected to your existing bank account. £10 free through our referral link.',
  intro:
    'Managing money abroad can feel more complicated than it needs to be. Currensea is a UK travel card that connects directly to your existing bank account, which can make foreign spending feel simpler without needing to move money onto a separate prepaid card.',
  seoIntro: [
    'Looking for a Currensea discount code or referral offer in 2026? Our Currensea offer is applied through our link, so there is no manual code to enter. Just click through using our link and check the current terms before signing up.',
    'Whether you are after a Currensea promo code, voucher code or referral link, there is nothing to type in by hand. The £10 free referral credit is applied through our link where the offer is available. Terms apply.',
  ],
  whatItIs: [
    'Currensea is a travel debit card for UK bank account holders. It works by connecting to your existing current account and applying a competitive exchange rate when you spend abroad, rather than the rate your bank normally charges.',
    'Unlike some travel money cards, you do not need to top it up separately. It draws directly from your bank account, which some people find easier to manage.',
  ],
  whyUseful: [
    'We like travel tools that make money and payments feel simpler while away. Foreign transaction fees and unfavourable exchange rates can add up on a longer trip, so a card that addresses that without much setup effort is useful.',
    'Not having to think about topping up a separate travel card or carrying large amounts of foreign cash can make the financial side of travel feel less stressful.',
  ],
  bestFor: [
    'UK bank account holders who travel frequently',
    'People who want to reduce foreign transaction fees',
    'Travellers who find separate prepaid cards inconvenient',
    'Anyone who wants a simpler approach to spending money abroad',
  ],
  howToUseSteps: [
    'Click our Currensea link to visit their website.',
    'Sign up for an account and link it to your existing UK bank account.',
    'Your referral credit should be applied where the offer is available.',
    'Check the current terms and conditions before signing up.',
  ],
  faqs: [
    {
      question: 'Do I need a Currensea discount code?',
      answer:
        'In this case, no manual code is needed. Our Currensea offer is applied through our link, so just click through and check the current terms before signing up. Terms apply.',
    },
    {
      question: 'How do I get the £10 free offer?',
      answer:
        'Click through using our Currensea link, sign up and link your existing UK bank account. The referral credit should be applied where the offer is available. Always check the current terms before signing up.',
    },
  ],
  importantNotes:
    'Currensea is currently for UK bank account holders. Offers, fees and features can change. Always check the current terms, eligibility and exchange rates before applying.',
}

export const mantaSleep: BrandPageData = {
  name: 'Manta Sleep',
  slug: 'manta-sleep',
  affiliateUrl: 'https://mantasleep.uk',
  offer: '10% off',
  code: '2passports10',
  buttonLabel: 'Shop Manta Sleep',
  logoImage: '/logos/mantasleep.png',
  badgeText: 'Manta Sleep',
  seoTitle: 'Manta Sleep Discount Code | 2Passports1Dream',
  seoDescription:
    'Use our 2Passports1Dream Manta Sleep discount code 2passports10 to save on sleep masks and sleep accessories that can be useful for travel, flights, hotels and light-sensitive sleepers.',
  heroTagline:
    'Sleep masks and accessories that can help you rest better on flights, in hotels and on long travel days.',
  intro:
    'Sleep can be difficult when travelling, especially on long flights or in bright hotel rooms where blackout curtains are not quite doing the job. Manta Sleep makes sleep masks and accessories designed specifically to help with that.',
  whatItIs: [
    'Manta Sleep is a brand that makes sleep masks and sleep accessories focused on blocking out light completely while remaining comfortable for extended wear.',
    'Their products are designed for people who find standard sleep masks uncomfortable, too tight or not dark enough. Several of their items are compact enough to pack easily for travel.',
  ],
  whyUseful: [
    'For travel, anything that genuinely helps with sleep is useful. A proper sleep mask can make a real difference on overnight flights, in bright hotel rooms and on long travel days where you need to rest but the environment is not ideal.',
    'We find that sleep quality on trips affects everything else, from energy levels to how much you actually enjoy the places you visit.',
  ],
  bestFor: [
    'Long-haul and overnight flights',
    'Hotel rooms with thin curtains or bright light',
    'Naps on travel days',
    'Light-sensitive sleepers who struggle to rest in unfamiliar places',
  ],
  howToUseSteps: [
    'Click our Manta Sleep link to visit their website.',
    'Choose the sleep mask or accessory that suits you.',
    'Enter code 2passports10 at checkout.',
    'Check the final price before completing your order.',
  ],
  importantNotes:
    'Offers can change, so always check the final price and availability before buying.',
}

export const vessi: BrandPageData = {
  name: 'Vessi Waterproof Shoes',
  slug: 'vessi',
  affiliateUrl: 'https://vessi.com/2p1d',
  offer: '15% off first purchase',
  code: null,
  buttonLabel: 'Shop Vessi',
  logoImage: '/logos/vessi.webp',
  badgeText: 'Vessi',
  seoTitle: 'Vessi Discount Code 2026 | 15% Off Your First Order',
  seoDescription:
    'Looking for a Vessi discount code in 2026? Our 15% off first purchase offer is applied through our link, so there is no manual code to enter at checkout. Waterproof shoes for rainy cities and walking days.',
  heroTagline:
    'Waterproof shoes for rainy cities, walking days and travel days.',
  intro:
    'Wet shoes can ruin a travel day quickly, especially when you still have hours of walking ahead. Vessi makes waterproof shoes that are designed to look like ordinary trainers, which can be a useful option for destinations with unpredictable weather.',
  seoIntro: [
    'Looking for a Vessi discount code in 2026? Our Vessi offer is applied through our link, so there is no manual code to enter at checkout. Just click through using our link and check the final price before buying.',
    'Whether you are after a Vessi promo code, voucher code or the latest Vessi deal, there is nothing to type in by hand. The 15% off first purchase offer is applied through our link where available.',
  ],
  whatItIs: [
    'Vessi makes waterproof knit shoes and trainers designed to keep your feet dry in wet conditions. They use a proprietary waterproof knit material that allows the shoe to breathe while keeping water out.',
    'Their shoes are designed to look like regular trainers rather than outdoor or technical footwear, which makes them a popular option for city travel and everyday use in wet climates.',
  ],
  whyUseful: [
    'Shoes that look normal but handle bad weather are very useful for travel. Being able to walk around a rainy city without planning around the weather or carrying a change of shoes can make a trip more comfortable.',
    'For travel days that involve a lot of walking, the last thing you want is to spend hours in wet shoes. Waterproof shoes can remove that as a concern.',
  ],
  bestFor: [
    'Rainy cities and destinations with unpredictable weather',
    'Travel days with a lot of walking',
    'City breaks where casual footwear is needed',
    'Travellers who want one pair of shoes that handles most conditions',
  ],
  howToUseSteps: [
    'Click our Vessi link to visit the website.',
    'Browse the range and choose your style and size.',
    'The offer should be applied through the link where available for first purchases.',
    'Check the final price at checkout before paying.',
  ],
  faqs: [
    {
      question: 'Do I need a Vessi discount code?',
      answer:
        'In this case, no manual code is needed. Our Vessi discount is applied through our link, so just click through and check the final price before buying.',
    },
    {
      question: 'How do I get the Vessi offer?',
      answer:
        'Click through using our Vessi link, choose your style and size, and the 15% off first purchase offer should be applied through the link where available. Always check the final price at checkout before paying.',
    },
  ],
  importantNotes:
    'Offers can change, so always check the current price and availability before buying.',
}

export const founderscard: BrandPageData = {
  name: 'FoundersCard',
  slug: 'founderscard',
  affiliateUrl: 'https://founderscard.com/VIP2PASSPORTS',
  offer: 'Free 1-year preview',
  code: 'VIP2PASSPORTS',
  buttonLabel: 'Visit FoundersCard',
  logoImage: '/logos/Founderscard.avif',
  badgeText: 'FoundersCard',
  seoTitle: 'FoundersCard Discount Code | Free Preview and 70% Off Elite Upgrade',
  seoDescription:
    'Use our FoundersCard code VIP2PASSPORTS to get a free one-year preview with access to over 200 perks, plus the option to upgrade to Elite in your first week for 70% off.',
  heroHeading: 'FoundersCard Discount Code',
  heroTagline:
    'FoundersCard is a membership, not a credit card, giving you access to VIP perks and preferred pricing across travel, lifestyle and business brands. Use our code VIP2PASSPORTS to get your free one-year preview.',
  intro:
    'FoundersCard is a membership that gives you access to VIP perks and preferred pricing across travel, lifestyle and business brands. Whether you are booking hotels, flights, car rentals or experiences, it is designed to give you access to benefits you would not normally get when booking everything yourself.',
  seoIntro: [
    'If you are looking for a FoundersCard discount code or FoundersCard promo code, you can use our code VIP2PASSPORTS to start a free one-year preview of the FoundersCard membership, with access to over 200 perks.',
    'FoundersCard membership is built around FoundersCard travel perks and preferred pricing, including hotel perks, flight perks and car rental perks, so it can be worth a look if you want VIP travel benefits before booking your next trip.',
  ],
  whatItIs: [
    'FoundersCard is a membership, not a credit card. It gives you access to VIP perks and preferred pricing across a range of travel, lifestyle and business brands, with over 200 perks available through the membership.',
    'Through our link you can sign up for a free one-year preview of FoundersCard. During your first week you also have the option to upgrade to Elite membership for 70% off, though that upgrade is completely optional.',
  ],
  whyUseful: [
    'We find it useful because it is not about changing your whole trip. It is more about improving the trip you are already taking, with things like upgrades, added perks, preferred pricing or a slightly better overall experience.',
    'It is something worth checking before booking travel, hotels, car hire, food experiences or other trip extras, just to see what benefits are available.',
  ],
  bestFor: [
    'Travellers who like extra perks',
    'People booking hotels, flights or car rentals',
    'People who travel often enough to check for benefits',
    'Anyone who wants to preview FoundersCard before fully committing',
  ],
  howToUseSteps: [
    'Click through to FoundersCard using our link.',
    'Sign up for the free one-year preview.',
    'Use code VIP2PASSPORTS if required.',
    'Check the Elite upgrade option in your first week if you want to upgrade for 70% off.',
  ],
  faqs: [
    {
      question: 'What is FoundersCard?',
      answer:
        'FoundersCard is a membership that gives you access to VIP perks and preferred pricing across travel, lifestyle and business brands. It is a membership, not a credit card.',
    },
    {
      question: 'Is FoundersCard a credit card?',
      answer:
        'No. FoundersCard is a membership, not a credit card. It is designed to give members access to perks and preferred pricing across a range of travel, lifestyle and business brands.',
    },
    {
      question: 'What does the free preview include?',
      answer:
        'The free one-year preview gives you access to the FoundersCard membership and its perks, with over 200 perks available. Perks and partners can change, so it is worth checking what is currently available.',
    },
    {
      question: 'What is the FoundersCard Elite upgrade offer?',
      answer:
        'During your first week as a member, you have the option to upgrade to Elite membership for 70% off. This upgrade is optional, so you can stay on the free preview if you prefer.',
    },
    {
      question: 'How do I use the code VIP2PASSPORTS?',
      answer:
        'Click through using our link, sign up for the free one-year preview and enter the code VIP2PASSPORTS if a code field is shown. Then check the Elite upgrade option in your first week if you want it.',
    },
  ],
  importantNotes:
    'FoundersCard is a membership, not a credit card. Perks, partners and offers can change, and benefits are not guaranteed. The free one-year preview gives you access to the membership, and the option to upgrade to Elite membership for 70% off is optional and available during your first week. Always check the current terms before signing up.',
}

export const protonvpn: BrandPageData = {
  name: 'Proton VPN',
  slug: 'protonvpn',
  affiliateUrl: 'http://protonvpn.com/2passports1dream',
  offer: '70% off',
  code: null,
  buttonLabel: 'Visit Proton VPN',
  logoImage: '/logos/protonvpn.png',
  badgeText: 'Proton VPN',
  seoTitle: 'Proton VPN Discount Code 2026 | 70% Off Proton VPN',
  seoDescription:
    'Looking for a Proton VPN discount code in 2026? Our 70% off Proton VPN offer is applied through our link, so there is no manual code to enter at checkout. A useful travel VPN for public, hotel, airport and cruise WiFi, with a 30-day money-back guarantee.',
  heroHeading: 'Proton VPN Discount',
  heroTagline:
    'Proton VPN helps protect your privacy when travelling, especially on public WiFi in hotels, airports, cafes and cruise ships. Use our link to get 70% off, with a 30-day money-back guarantee.',
  intro:
    'When we travel, we are constantly connecting to public WiFi, from hotels and airports to cafes, trains and cruise ships. That is useful when you need to check emails, upload content, do online banking or just scroll, but public WiFi is not always the most secure place to be.',
  seoIntro: [
    'Looking for a Proton VPN discount code in 2026? Our 70% off Proton VPN offer is applied through our link, so there is no manual code to enter at checkout. Just click through using our link and check the final price before signing up.',
    'Whether you are after a Proton VPN promo code, voucher code or the latest deal, there is nothing to type in by hand. A VPN for travel can be handy for public WiFi protection, whether that is a VPN for hotel WiFi, a VPN for airport WiFi or a VPN for cruise WiFi, and our link includes a 30-day money-back guarantee.',
  ],
  whatItIs: [
    'Proton VPN creates a secure, encrypted connection between your device and the internet, helping protect what you are doing online from people on the same network. It can also help hide your IP address and reduce tracking, which makes it a useful tool to have on your phone, laptop or tablet while travelling.',
    'We like Proton VPN because it is built around privacy, with a strict no-logs policy and a privacy-focused setup based in Switzerland. It is one of those travel tools you might not think about until you are on hotel, airport or cruise WiFi, but it is worth having ready before you need it.',
  ],
  whyUseful: [
    'When travelling, we regularly connect to public WiFi in hotels, airports, cafes, trains and on cruise ships. Public WiFi can be less secure than your connection at home, so having a VPN ready can add a layer of privacy when you are checking emails, banking or signing into accounts.',
    'Proton VPN can also help hide your IP address and reduce tracking, which is useful when you want a bit more online privacy while travelling. It is the kind of tool that is worth setting up before a trip rather than once you are already connected to an unfamiliar network.',
  ],
  bestFor: [
    'Travellers using public WiFi',
    'Hotel, airport and cruise WiFi',
    'People who want more online privacy while travelling',
    'Anyone checking emails, banking or accounts on the road',
    'Creators and remote workers who work online while travelling',
  ],
  howToUseSteps: [
    'Click through to Proton VPN using our link.',
    'Choose the Proton VPN plan that suits you.',
    'The 70% discount should be available through our link.',
    'Check the final price and terms before signing up.',
    'Remember there is a 30-day money-back guarantee.',
  ],
  faqs: [
    {
      question: 'Do I need a Proton VPN discount code?',
      answer:
        'In this case, no manual code is needed. Our 70% off Proton VPN discount is applied through our link, so just click through and check the final price before signing up.',
    },
    {
      question: 'What is Proton VPN?',
      answer:
        'Proton VPN is a VPN service that creates a secure, encrypted connection between your device and the internet. It can help protect what you are doing online from others on the same network, help hide your IP address and reduce tracking.',
    },
    {
      question: 'Why use a VPN when travelling?',
      answer:
        'When travelling, you often connect to public WiFi, which can be less secure than your home network. A VPN can add a layer of privacy when you are checking emails, banking or signing into accounts while away.',
    },
    {
      question: 'Is Proton VPN useful on hotel, airport or cruise WiFi?',
      answer:
        'Yes. Hotel, airport and cruise WiFi are all shared, public networks, so a VPN can be a useful tool to have ready when you connect to them while travelling.',
    },
    {
      question: 'Does Proton VPN hide my IP address?',
      answer:
        'Proton VPN can help hide your IP address and reduce tracking. No VPN makes you completely anonymous, but it can add privacy when you are online while travelling.',
    },
    {
      question: 'How do I get the 70% Proton VPN discount?',
      answer:
        'Click through using our Proton VPN link, choose the plan that suits you and the 70% discount should be available through the link. Always check the final price and terms before signing up.',
    },
    {
      question: 'Does Proton VPN have a money-back guarantee?',
      answer:
        'Our Proton VPN link includes a 30-day money-back guarantee. Check the current terms when you sign up, as offers and terms can change.',
    },
  ],
  importantNotes:
    'Public WiFi can be less secure than your home network, and a VPN adds privacy rather than guaranteeing total protection or complete anonymity. The 70% discount is available through our link, along with a 30-day money-back guarantee. Offers and terms can change, so always check the final price and current terms before signing up.',
}

export const simify: BrandPageData = {
  name: 'Simify',
  slug: 'simify',
  affiliateUrl: 'https://simify.com/PASSPORT?c=1',
  offer: '15% off',
  code: 'PASSPORT',
  buttonLabel: 'Visit Simify',
  logoImage: '/logos/simify.png',
  badgeText: 'Simify',
  seoTitle: 'Simify Discount Code | 15% Off Travel eSIMs',
  seoDescription:
    'Use our Simify discount code PASSPORT for 15% off travel eSIMs. Get mobile data before you fly for holidays, road trips, city breaks and multi-country travel.',
  heroHeading: 'Simify Discount Code',
  heroTagline:
    'Simify offers travel eSIMs that help you get mobile data before you land, so you can stay connected without airport SIM queues or roaming surprises. Use code PASSPORT for 15% off.',
  intro:
    'Simify is a travel eSIM provider that lets you sort your mobile data before you fly. Instead of buying a physical SIM card when you arrive, you can download an eSIM directly to your phone, choose a plan for your destination and get connected shortly after landing.',
  seoIntro: [
    'If you are looking for a Simify discount code or Simify promo code, you can use code PASSPORT to get 15% off a Simify eSIM. It is a travel eSIM that lets you sort mobile data abroad before you fly.',
    'A travel eSIM can be a handy way to get prepaid travel data for holidays, road trips and city breaks. Simify offers an international eSIM that works in many destinations, including options that suit an eSIM for USA, an eSIM for Europe, an eSIM for Asia, an eSIM for Australia and an eSIM for multi-country travel.',
  ],
  whatItIs: [
    'Simify is a travel eSIM provider that lets you sort your mobile data before you fly. Instead of buying a physical SIM card when you arrive, you can download an eSIM directly to your phone, choose a plan for your destination and get connected shortly after landing.',
    'With Simify, you can manage your eSIM through their app, purchase a plan for your destination and install the eSIM before you travel. When you land, you switch to the Simify eSIM in your phone settings, turn on data roaming and get connected. Simify works in over 150 destinations worldwide, with plans starting from under two dollars a day, plus unlimited data options and global plans for travelling between countries. Everything is prepaid, so you can avoid surprise roaming charges when you get home.',
  ],
  whyUseful: [
    'We find Simify useful because it removes a lot of travel friction. There is no need to queue for an airport SIM card, swap tiny plastic SIMs or hunt for a local phone shop after a long flight. It is especially useful when you want maps, messages, transport apps, hotel details or emails as soon as you arrive.',
    'Because everything is prepaid, it can help you avoid surprise roaming charges when you get home. The global and multi-country plans can also be handy when a trip involves more than one country, so you are not sorting out a new SIM at every border.',
  ],
  bestFor: [
    'Travellers who want data ready before they land',
    'Trips where you need maps, messages and transport apps straight away',
    'People who want to avoid airport SIM queues',
    'Multi-country trips',
    'Travellers who want prepaid data instead of surprise roaming charges',
  ],
  howToUseSteps: [
    'Click through to Simify using our link.',
    'Choose the eSIM plan for your destination.',
    'Use code PASSPORT at checkout.',
    'Check the final price, coverage and plan details.',
    'Install the eSIM before you travel and follow Simify’s setup instructions.',
  ],
  faqs: [
    {
      question: 'What is Simify?',
      answer:
        'Simify is a travel eSIM provider that lets you buy mobile data for your destination before you fly. You download the eSIM to your phone, choose a plan and get connected shortly after landing.',
    },
    {
      question: 'What is an eSIM?',
      answer:
        'An eSIM is a digital SIM card built into your phone. Instead of inserting a physical SIM, you install a data plan directly on your device, which you can do before you travel.',
    },
    {
      question: 'How do I use the Simify discount code?',
      answer:
        'Click through using our link, choose your eSIM plan and enter code PASSPORT at checkout for 15% off. Always check the final price, coverage and plan details before buying.',
    },
    {
      question: 'Does Simify work worldwide?',
      answer:
        'Simify works in over 150 destinations worldwide and offers global plans. Coverage varies by destination, so check that your destination is covered before purchasing.',
    },
    {
      question: 'Can I use Simify for multi-country trips?',
      answer:
        'Yes. Simify offers global and multi-country plans, which can be useful if you are travelling between countries on one trip. Check the plan details to make sure it covers everywhere you are going.',
    },
    {
      question: 'Do I need an unlocked phone for Simify?',
      answer:
        'You generally need an eSIM-compatible and unlocked phone to use a travel eSIM. Check your device compatibility before buying an eSIM.',
    },
    {
      question: 'Should I install my eSIM before I fly?',
      answer:
        'It is usually easiest to install the eSIM before you travel while you still have your home connection, then switch to it and turn on data roaming once you land. Follow Simify’s setup instructions.',
    },
  ],
  importantNotes:
    'Check your device compatibility before buying an eSIM, as you generally need an eSIM-compatible, unlocked phone. Coverage, speeds and plans vary, and not every plan is unlimited, so check destination coverage, plan details and the final price before purchasing. Offers and terms can change.',
}

export const wild: BrandPageData = {
  name: 'Wild',
  slug: 'wild',
  affiliateUrl: 'https://shopwildrefill.com/PASSPORTS',
  offer: '20% off Wild',
  code: 'PASSPORTS',
  buttonLabel: 'Visit Wild',
  logoImage: '/logos/wild.png',
  badgeText: 'Wild',
  seoTitle: 'Wild Discount Code | 20% Off Refillable Deodorant',
  seoDescription:
    'Use our Wild discount code PASSPORTS for 20% off refillable deodorant and personal care products through 2Passports1Dream.',
  heroHeading: 'Wild Discount Code',
  heroTagline:
    'Refillable personal care, including natural deodorant. Use our code PASSPORTS for 20% off Wild through our link.',
  intro:
    'Wild is a refillable personal care brand best known for its reusable deodorant cases and plastic-free refills. It is a useful option if you want to make a simple everyday swap without having to completely change your routine.',
  seoIntro: [
    'Looking for a Wild discount code or Wild promo code? Use our code PASSPORTS through our link for 20% off Wild, including refillable deodorant and other personal care products.',
    'Whether you want a Wild deodorant discount code, a Wild refill discount or just to try refillable deodorant for the first time, our code PASSPORTS applies the offer at checkout. Always check the final price before ordering.',
  ],
  whatItIs: [
    'Wild makes refillable personal care products, including natural deodorant. The idea is simple: you buy a reusable case once, then top it up with plastic-free refills rather than buying a brand new plastic deodorant each time.',
    'Alongside natural deodorant, Wild offers a range of scents and other personal care items, so you can choose the options that suit you and swap refills as you go.',
  ],
  whyUseful: [
    'We like that Wild is easy to travel with, simple to use and feels like a more sustainable alternative to buying a new plastic deodorant every time. You keep the case, replace the refill and choose the scents that suit you.',
    'For travel, a tidy and refillable toiletry can be handy. It is a small everyday swap rather than a big change to your routine, which makes it easy to stick with.',
  ],
  bestFor: [
    'People who want a refillable deodorant option',
    'Travellers who want a tidy everyday toiletry',
    'Anyone trying to reduce single-use plastic',
    'People who like choosing different scents',
    'Simple everyday swaps',
  ],
  howToUseSteps: [
    'Click through to Wild using our link.',
    'Choose your products or starter pack.',
    'Use code PASSPORTS at checkout.',
    'Check the final price and terms before ordering.',
  ],
  faqs: [
    {
      question: 'What is the Wild discount code?',
      answer:
        'Our Wild discount code is PASSPORTS. Use it at checkout through our link for 20% off Wild. Offers can change, so check the final price before ordering.',
    },
    {
      question: 'How much can I save with the Wild code?',
      answer:
        'The code PASSPORTS gives you 20% off Wild through our link. The exact saving depends on what you buy, so always check the final price at checkout before ordering.',
    },
    {
      question: 'What does Wild sell?',
      answer:
        'Wild makes refillable personal care products, including natural deodorant. You buy a reusable case and top it up with plastic-free refills, and there is a range of scents to choose from.',
    },
    {
      question: 'Is Wild good for travel?',
      answer:
        'Wild is easy to travel with and simple to use, which can make it a tidy everyday toiletry to pack. As with any personal care product, it may not suit everyone, so it is worth seeing whether it works for you.',
    },
    {
      question: 'How do I use the code PASSPORTS?',
      answer:
        'Click through to Wild using our link, choose your products or starter pack, then enter PASSPORTS at checkout. Check the final price and terms before ordering.',
    },
  ],
  importantNotes:
    'Offers can change, so always check the final price, terms and availability before ordering. Personal care products do not suit everyone, so it is worth checking whether Wild works for you.',
}

export const jackery: BrandPageData = {
  name: 'Jackery',
  slug: 'jackery',
  affiliateUrl: 'https://bit.ly/3LLODgf',
  offer: '5% off all products with code 1Dream05',
  code: '1Dream05',
  buttonLabel: 'Visit Jackery',
  secondaryUrl: 'https://amzn.to/4tRIkZL',
  secondaryLabel: 'Buy on Amazon',
  boldCodeInCopy: true,
  logoImage: '/logos/jackery.png',
  badgeText: 'Jackery',
  seoTitle: 'Jackery Discount Code | 5% Off Portable Power Stations',
  seoDescription:
    'Use our Jackery discount code 1Dream05 for 5% off portable power stations, solar generators and Jackery products. Check the final price and terms before ordering.',
  heroHeading: 'Jackery Discount Code',
  heroVideoId: 'baxHhOHe2Xw',
  heroTagline:
    'Portable power stations and solar generators for travel, camping and filming days. Use our code 1Dream05 for 5% off Jackery products through our link.',
  videosHeading: 'Watch our Jackery features',
  videosIntro:
    'Our ads featured Jackery, including the Jackery Explorer 1000 v2. Here are a few of those features.',
  videos: [
    { id: 'e2Qb6GzUju0', placement: 'afterWhatItIs', caption: 'A look at how we featured Jackery.' },
    { id: '6CIy2QnzNBM', placement: 'afterHowToUse', caption: 'Jackery while filming and travelling.' },
    { id: 'HhdsWx4anuw', placement: 'afterFaqs' },
  ],
  productRangesHeading: 'Other popular Jackery products to look at',
  productRangesIntro:
    'Jackery has a wider range than just the Explorer 1000 v2. If you are comparing portable power stations, it is worth looking at the smaller Explorer models for lighter trips, the mid-size Explorer range for camping, road trips and filming days, and the larger Jackery options for more serious backup power. Our code 1Dream05 can be used sitewide, so it is not limited to the Jackery Explorer 1000 v2.',
  productRanges: [
    {
      title: 'Compact and lighter options',
      items: [
        { name: 'Explorer 100 Plus', description: 'A very compact option for topping up phones and small devices on the go.' },
        { name: 'Explorer 300D', description: 'A small, portable choice for short trips and lighter charging needs.' },
        { name: 'Explorer 300 v2', description: 'A compact power station for day trips and keeping essentials charged.' },
        { name: 'Explorer 600 v2', description: 'A step up in size while staying easy to carry for travel.' },
      ],
    },
    {
      title: 'Road trip, camping and creator-friendly options',
      items: [
        { name: 'Explorer 1000 v2', description: 'Our featured model, a popular mid-size pick for camping, road trips and filming days.', linked: true },
        { name: 'Explorer 1500 v2', description: 'A larger mid-size option for longer trips and more devices.' },
        { name: 'Explorer 1500 Ultra', description: 'A higher-capacity choice for creators and longer time off-grid.' },
      ],
    },
    {
      title: 'Bigger backup power options',
      items: [
        { name: 'Explorer 2000 v2', description: 'A larger option for van life and more demanding power needs.', linked: true },
        { name: 'Explorer 3000 v2 and HomePower 3000', description: 'Bigger options aimed at more serious backup power and home use.' },
      ],
    },
    {
      title: 'Solar and bundles',
      items: [
        { name: 'SolarSaga 200W', description: 'A foldable solar panel for recharging from the sun while away from sockets.' },
        { name: 'SolarSaga 100 range', description: 'Smaller, lighter solar panels in the SolarSaga 100 line-up.' },
        { name: 'Jackery solar generator bundles', description: 'Power station and solar panel bundles for off-grid charging.', linked: true },
      ],
    },
  ],
  intro:
    'Jackery makes portable power stations, solar generators and power solutions for travel, camping, road trips, van life and everyday backup power. Our ad was for the [[Jackery Explorer 1000 v2]], but our code can be used sitewide across Jackery products.',
  seoIntro: [
    'Looking for a Jackery discount code or Jackery promo code? Use our code 1Dream05 through our link for 5% off Jackery products, including the Jackery Explorer 1000 v2 and the wider range of Jackery portable power stations and solar generators.',
    'Whether you want a portable power station discount, a solar generator discount or a power station for travel, our code 1Dream05 applies sitewide where eligible. Offers can change, so check the final price and terms before ordering.',
  ],
  whatItIs: [
    'Jackery makes portable power stations, solar generators and related power solutions. They are designed to give you power away from mains sockets, which can be useful for road trips, camping, van life and filming days.',
    'Our ad featured the [[Jackery Explorer 1000 v2 portable power station]], but the code 1Dream05 is not limited to that model. It can be used sitewide across Jackery products, so you can choose whichever option suits you.',
  ],
  whyUseful: [
    'We find Jackery useful because portable power can make a big difference when you are travelling, filming, camping or spending time away from easy plug sockets. It can help keep cameras, phones, laptops, drones and other essentials charged when you are on the move.',
    'For creators travelling with camera gear, having backup power on hand can take some of the worry out of a long filming day. It is one of those tools that quietly makes travel days run a little more smoothly.',
  ],
  bestFor: [
    'Road trips',
    'Camping',
    'Van life',
    'Filming days',
    'Creators travelling with camera gear',
    'Keeping phones, laptops, drones and essentials charged',
    'Backup power while travelling',
  ],
  howToUseSteps: [
    'Click through to Jackery using our link.',
    'Choose the Jackery product that suits you.',
    'Use code 1Dream05 at checkout.',
    'Check the final price and terms before ordering.',
  ],
  faqs: [
    {
      question: 'What is the Jackery discount code?',
      answer:
        'Our Jackery discount code is 1Dream05. Use it at checkout through our link for 5% off Jackery products. Offers can change, so check the final price and terms before ordering.',
    },
    {
      question: 'How much can I save with the Jackery code?',
      answer:
        'The code 1Dream05 gives you 5% off Jackery products through our link. The exact saving depends on what you buy, so always check the final price at checkout before ordering.',
    },
    {
      question: 'Does the code work only on the Jackery Explorer 1000 v2?',
      answer:
        'No. Our ad featured the Jackery Explorer 1000 v2, but the code 1Dream05 can be used sitewide across Jackery products where eligible, so you are not limited to that one model.',
    },
    {
      question: 'Can I buy Jackery on Amazon?',
      answer:
        'Yes, Jackery products are also available on Amazon, and we include an Amazon link on this page as a secondary option. Discounts and pricing can differ between Jackery and Amazon, so check the final price before ordering.',
    },
    {
      question: 'What is Jackery useful for when travelling?',
      answer:
        'Jackery portable power can be useful for road trips, camping, van life and filming days, helping keep cameras, phones, laptops, drones and other essentials charged when you are away from easy plug sockets.',
    },
  ],
  importantNotes:
    'Our ad featured the Jackery Explorer 1000 v2, but the code 1Dream05 can be used sitewide across Jackery products. Offers can change, so always check the final price, terms and availability before ordering.',
}
