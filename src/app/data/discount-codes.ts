// This file controls all discount codes and the support link shown on the Discount Codes page.
//
// HOW TO UPDATE A CODE OR LINK:
//   1. Find the entry by name in the discountCodes array below.
//   2. Edit whichever fields need updating: offer, code, affiliateUrl, description, buttonLabel.
//   3. Save the file. The website updates automatically.
//
// HOW TO ADD A NEW CODE:
//   1. Copy an existing entry.
//   2. Fill in all fields. Set code to null if there is no discount code.
//   3. Set slug to null unless you are also creating a dedicated page at /discount-codes/{slug}.
//   4. Add it to the discountCodes array and save.
//
// HOW TO ADD A DEDICATED PAGE FOR A CODE:
//   1. Create a folder inside src/app/discount-codes/ matching the slug (e.g. gomatic).
//   2. Add a page.tsx file inside it.
//   3. Set slug: 'gomatic' on the entry. The main page card will then link to /discount-codes/gomatic.
//
// LOGO BADGES:
//   Official logo files can be replaced later by adding files to public/logos/
//   and updating the logoImage field below.
//   Recommended format: SVG or PNG/WebP with a transparent background.
//   If logoImage is null, the card falls back to the badgeText field.

export type DiscountCode = {
  name: string
  offer: string
  code: string | null
  affiliateUrl: string
  // description: kept for SEO metadata and companion pages
  description: string
  // shortDescription: one-line summary shown on the card
  shortDescription: string
  // whyUseIt: a short reason why this tool is useful for travel
  whyUseIt: string
  // bestFor: comma-separated situations or use cases
  bestFor: string
  // personalNote: optional personal take shown as a subtle card quote
  personalNote: string
  buttonLabel: string
  slug: string | null
  badgeText: string
  logoImage: string | null
  category: string
  // Short chip labels shown on listing cards (2-3 words each, max 3 displayed).
  // The full bestFor string is kept for dedicated pages.
  bestForTags?: string[]
  // Optional fields for dedicated brand pages.
  // Populate these when creating a page at /discount-codes/{slug}.
  seoTitle?: string
  seoDescription?: string
  reviewIntro?: string
  useCases?: string[]
  whoItIsFor?: string[]
  whyWeLikeIt?: string
  importantNotes?: string
}

export type SupportLink = {
  name: string
  url: string
  description: string
  buttonLabel: string
  // Official logo files can be replaced later by adding files to public/logos/
  // and updating the logoImage field.
  logoImage: string | null
}

export const discountCodes: DiscountCode[] = [
  {
    name: 'Klook',
    offer: 'Up to 10% off',
    code: '2P1DKLOOKOFF',
    affiliateUrl:
      'https://affiliate.klook.com/redirect?aid=123026&aff_adid=1290323&k_site=https%3A%2F%2Fwww.klook.com%2F',
    description:
      'Klook is useful for booking tours, transport, activities, attraction tickets and travel experiences around the world.',
    shortDescription:
      'Book tours, activities, attraction tickets, airport transfers and travel experiences around the world.',
    whyUseIt:
      'Klook is useful when we want to plan experiences in advance instead of figuring everything out on the day.',
    bestFor: 'Tours, tickets, day trips, airport transfers and activities.',
    personalNote:
      'We like using it as a starting point when planning what to actually do in a destination.',
    bestForTags: ['Tours', 'Day trips', 'Tickets'],
    buttonLabel: 'Visit Klook',
    slug: 'klook',
    badgeText: 'Klook',
    logoImage: '/logos/klook.webp',
    category: 'Travel Experiences and Tours',
    seoTitle: 'Klook Discount Code 2026 | 2Passports1Dream',
    seoDescription:
      'Use our 2Passports1Dream Klook discount code 2P1DKLOOKOFF to save up to 10% on tours, activities, attraction tickets, airport transfers and travel experiences. Discount availability may vary.',
    reviewIntro:
      'Klook is one of the travel tools we use when we want to browse tours, activities, tickets and transfers before arriving in a destination.',
    whyWeLikeIt:
      'We like using Klook as a starting point when planning what to actually do in a destination. It gives us a quick way to compare activities, see what is available and sometimes book things before we arrive.',
    importantNotes:
      'Discount availability and the final amount may vary. Always check the price at checkout before booking.',
  },
  {
    name: 'Holafly eSIM',
    offer: '5% off',
    code: '2passports1dream',
    affiliateUrl: 'http://holafly.sjv.io/APoe7a',
    description:
      'Holafly eSIMs are useful for staying connected while travelling without needing to buy a physical SIM card.',
    shortDescription:
      'eSIMs for staying connected while travelling without buying a physical SIM card.',
    whyUseIt:
      'Having data when we land makes everything easier, from maps and taxis to messages, bookings and finding food.',
    bestFor: 'International travel, short trips, city breaks and avoiding airport SIM card stress.',
    personalNote:
      'For us, having data abroad is one of those things that makes travel feel instantly smoother.',
    bestForTags: ['eSIMs', 'International travel', 'Connectivity'],
    buttonLabel: 'Get eSIM',
    slug: 'holafly',
    badgeText: 'Holafly',
    logoImage: '/logos/holafly.webp',
    category: 'Connectivity and Online Safety',
  },
  {
    name: 'Simify',
    offer: '15% off',
    code: 'PASSPORT',
    affiliateUrl: 'https://simify.com/PASSPORT?c=1',
    description:
      'Simify offers travel eSIMs that help you get mobile data before you land, so you can stay connected without airport SIM queues or roaming surprises.',
    shortDescription:
      'Travel eSIMs that let you get mobile data before you land, without airport SIM queues or roaming surprises.',
    whyUseIt:
      'It removes a lot of travel friction, with no need to queue for an airport SIM card or hunt for a local phone shop after a long flight.',
    bestFor: 'International travel, multi-country trips, city breaks and avoiding surprise roaming charges.',
    personalNote:
      'It is especially useful when you want maps, messages and transport apps working as soon as you arrive.',
    bestForTags: ['Travel eSIMs', 'Multi-country trips', 'Data on arrival'],
    buttonLabel: 'Visit Simify',
    slug: 'simify',
    badgeText: 'Simify',
    logoImage: '/logos/simify.png',
    category: 'Connectivity and Online Safety',
  },
  {
    name: 'NordVPN',
    offer: '4 months free',
    code: null,
    affiliateUrl: 'https://www.nordvpn.com/2passports',
    description:
      'NordVPN can be useful for travellers who want extra privacy and security when using public WiFi.',
    shortDescription:
      'A VPN that can be useful for privacy and security when using public WiFi while travelling.',
    whyUseIt:
      'We often use public WiFi in airports, hotels and cafes, so having extra privacy while online is useful.',
    bestFor: 'Public WiFi, travel days, hotels, airports and online privacy.',
    personalNote:
      'It can also be useful when accessing your usual accounts while abroad, where available.',
    bestForTags: ['Public WiFi', 'Privacy', 'Travel security'],
    buttonLabel: 'Get NordVPN',
    slug: 'nordvpn',
    badgeText: 'NordVPN',
    logoImage: '/logos/NordVPN.webp',
    category: 'Connectivity and Online Safety',
  },
  {
    name: 'Proton VPN',
    offer: '70% off',
    code: null,
    affiliateUrl: 'http://protonvpn.com/2passports1dream',
    description:
      'Proton VPN helps protect your privacy when travelling, especially when using public WiFi in hotels, airports, cafes and cruise ships.',
    shortDescription:
      'Helps protect your privacy when travelling, especially on public WiFi in hotels, airports, cafes and cruise ships.',
    whyUseIt:
      'When travelling we are constantly connecting to public WiFi, which is not always the most secure place to be, so having extra privacy ready can be useful.',
    bestFor: 'Public WiFi, hotel WiFi, airport WiFi, cruise WiFi and everyday online privacy while travelling.',
    personalNote:
      'It is one of those tools you might not think about until you are on hotel, airport or cruise WiFi.',
    bestForTags: ['Public WiFi', 'Hotel & airport WiFi', 'Travel privacy'],
    buttonLabel: 'Visit Proton VPN',
    slug: 'protonvpn',
    badgeText: 'Proton VPN',
    logoImage: '/logos/protonvpn.png',
    category: 'Connectivity and Online Safety',
  },
  {
    name: 'Gomatic',
    offer: '10% off',
    code: 'PASSPORTSDREAM',
    affiliateUrl: 'https://gomatic.co.uk/products/the-gomatic-travel-pack?ref=2Passports1Dream',
    description:
      'Gomatic makes practical travel bags and backpacks designed for organised packing, short trips and everyday travel.',
    shortDescription:
      'Practical travel bags and backpacks designed for organised packing and everyday travel.',
    whyUseIt:
      'A good backpack makes travel days feel calmer, especially when we need camera gear, laptops and travel essentials close by.',
    bestFor: 'Short trips, hand luggage, tech gear and organised packing.',
    personalNote: 'We like travel gear that keeps things tidy without feeling too complicated.',
    bestForTags: ['Short trips', 'Hand luggage', 'Tech gear'],
    buttonLabel: 'Shop Gomatic',
    slug: 'gomatic',
    badgeText: 'Gomatic',
    logoImage: '/logos/gomatic.webp',
    category: 'Luggage and Packing',
  },
  {
    name: 'Level8 Luggage',
    offer: '10% off',
    code: '2P1D10',
    affiliateUrl:
      'https://www.dpbolvw.net/click-101187259-15195329?url=https%3A%2F%2Fuk.level8cases.com%2Fproducts%2Flarge-luggage-with-wide-handle-level8-voyageur%3Fvariant%3D44798341611743',
    description:
      'Level8 makes luggage and travel cases designed for frequent travellers who want sturdy, practical suitcases.',
    shortDescription: 'Suitcases and travel cases designed for frequent travellers.',
    whyUseIt:
      'Good luggage matters when we are moving between airports, hotels, road trips and filming locations.',
    bestFor: 'Frequent travel, longer trips, checked luggage and organised packing.',
    personalNote:
      'When you travel a lot, sturdy luggage becomes less of a luxury and more of a necessity.',
    bestForTags: ['Checked luggage', 'Long trips', 'Frequent travel'],
    buttonLabel: 'Shop Level8',
    slug: 'level8',
    badgeText: 'Level8',
    logoImage: '/logos/Level8.webp',
    category: 'Luggage and Packing',
  },
  {
    name: 'DJI Mic Mini',
    offer: '25% off',
    code: null,
    affiliateUrl:
      'https://click.dji.com/AM1oi0gFfS5Qk8F6oBpZYw?ch=DM300-26Q1-2passports1dream&pm=custom',
    description:
      'DJI microphones are useful for creators, vloggers and travellers who want compact, reliable audio while filming on the go.',
    shortDescription:
      'A compact wireless microphone setup for creators, vloggers and travellers.',
    whyUseIt:
      'Good audio makes travel videos much easier to watch, especially when filming outside, in busy places or on the move.',
    bestFor: 'Vlogging, travel filming, talking to camera and lightweight creator setups.',
    personalNote: 'For travel creators, small gear that actually fits in a bag is always a win.',
    bestForTags: ['Vlogging', 'Travel filming', 'Creators'],
    buttonLabel: 'Shop DJI',
    slug: 'dji-mic-mini',
    badgeText: 'DJI',
    logoImage: '/logos/djimicmini.webp',
    category: 'Creator Gear',
  },
  {
    name: 'Jackery',
    offer: '5% off',
    code: '1Dream05',
    affiliateUrl: 'https://bit.ly/3LLODgf',
    description:
      'Jackery makes portable power stations and solar generators that can be useful for road trips, camping, van life, filming days and keeping devices charged while travelling.',
    shortDescription:
      'Portable power stations and solar generators for road trips, camping, van life and filming days.',
    whyUseIt:
      'Portable power can make a big difference when you are away from easy plug sockets, helping keep cameras, phones, laptops, drones and other essentials charged on the move.',
    bestFor: 'Road trips, camping, van life, filming days and keeping camera gear charged.',
    personalNote:
      'Our ad featured the Jackery Explorer 1000 v2, but our code can be used sitewide across Jackery products.',
    bestForTags: ['Road trips', 'Camping', 'Creator power'],
    buttonLabel: 'Visit Jackery',
    slug: 'jackery',
    badgeText: 'Jackery',
    logoImage: '/logos/jackery.png',
    category: 'Creator Gear',
  },
  {
    name: 'FOREO',
    offer: '35% off',
    code: 'PASSPORT35',
    affiliateUrl: 'https://foreo.se/YlEkm',
    description:
      'FOREO makes beauty and skincare devices that can be useful for keeping a simple skincare routine while travelling.',
    shortDescription:
      'Skincare and beauty devices that can fit into a simple travel routine.',
    whyUseIt:
      'Travel can be rough on skin, especially with flights, changing climates and long days out.',
    bestFor: 'Skincare routines, travel beauty and keeping things simple while away.',
    personalNote:
      'We like beauty tools that are easy to pack and do not make a routine feel complicated.',
    bestForTags: ['Skincare', 'Travel routines', 'Compact beauty'],
    buttonLabel: 'Shop FOREO',
    slug: 'foreo',
    badgeText: 'FOREO',
    logoImage: '/logos/Foreo.webp',
    category: 'Skincare and Beauty',
  },
  {
    name: 'Wild',
    offer: '20% off',
    code: 'PASSPORTS',
    affiliateUrl: 'https://shopwildrefill.com/PASSPORTS',
    description:
      'Wild makes refillable personal care products, including natural deodorant, designed to reduce single-use plastic and make everyday swaps easier.',
    shortDescription:
      'Refillable personal care, including natural deodorant, built around reusable cases and plastic-free refills.',
    whyUseIt:
      'Wild is easy to travel with and simple to use. You keep the case, replace the refill and choose the scents that suit you, instead of buying a new plastic deodorant every time.',
    bestFor: 'Refillable deodorant, everyday swaps, tidy toiletries and choosing different scents.',
    personalNote:
      'We like that it is easy to travel with and feels like a more sustainable alternative to a new plastic deodorant each time.',
    bestForTags: ['Refillable deodorant', 'Everyday swaps', 'Travel toiletry'],
    buttonLabel: 'Visit Wild',
    slug: 'wild',
    badgeText: 'Wild',
    logoImage: '/logos/wild.png',
    category: 'Skincare and Beauty',
  },
  {
    name: 'Ultrahuman Smart Ring',
    offer: '10% off',
    code: null,
    affiliateUrl: 'http://ultrahuman.com/2passports1dream',
    description:
      'Ultrahuman is a smart ring for tracking health metrics such as sleep, movement and recovery.',
    shortDescription:
      'A smart ring for tracking sleep, movement and recovery.',
    whyUseIt:
      'Travel can affect sleep, routine and recovery, so it is useful to see how your body is handling busy days.',
    bestFor: 'Sleep tracking, recovery, steps, travel routines and health awareness.',
    personalNote:
      'We find health tracking especially useful when travel days are long and routines are all over the place.',
    bestForTags: ['Sleep tracking', 'Recovery', 'Health data'],
    buttonLabel: 'Shop Ultrahuman',
    slug: 'ultrahuman',
    badgeText: 'Ultrahuman',
    logoImage: '/logos/Ultrahuman.webp',
    category: 'Travel Health and Lifestyle',
  },
  {
    name: 'Vessi Waterproof Shoes',
    offer: '15% off first purchase',
    code: null,
    affiliateUrl: 'https://vessi.com/2p1d',
    description:
      'Vessi makes waterproof shoes that can be useful for city breaks, rainy destinations and travel days.',
    shortDescription:
      'Waterproof shoes that can be useful for rainy destinations, city breaks and travel days.',
    whyUseIt:
      'Wet shoes can ruin a travel day quickly, especially when you still have hours of walking ahead.',
    bestFor: 'Rainy cities, travel days, walking trips and changeable weather.',
    personalNote:
      'Shoes that look normal but handle bad weather are very useful for travel.',
    bestForTags: ['Rainy cities', 'Walking days', 'Waterproof'],
    buttonLabel: 'Shop Vessi',
    slug: 'vessi',
    badgeText: 'Vessi',
    logoImage: '/logos/vessi.webp',
    category: 'Travel Health and Lifestyle',
  },
  {
    name: 'Manta Sleep',
    offer: '10% off',
    code: '2passports10',
    affiliateUrl: 'https://mantasleep.uk',
    description:
      'Manta Sleep makes sleep masks and sleep accessories that can be useful for travel, flights, hotels and light-sensitive sleepers.',
    shortDescription:
      'Sleep masks and sleep accessories that can be useful for travel, flights, hotels and light-sensitive sleepers.',
    whyUseIt:
      'Sleep can be difficult when travelling, especially on flights, in bright hotel rooms or when routines are all over the place. A good sleep mask can make it easier to rest properly.',
    bestFor: 'Flights, hotel rooms, bright bedrooms, naps, long travel days and light-sensitive sleepers.',
    personalNote:
      'For travel, anything that helps us sleep better is genuinely useful because tired travel days are so much harder.',
    bestForTags: ['Flights', 'Hotel rooms', 'Light-sensitive sleepers'],
    buttonLabel: 'Shop Manta Sleep',
    slug: 'manta-sleep',
    badgeText: 'Manta Sleep',
    logoImage: '/logos/mantasleep.png',
    category: 'Travel Health and Lifestyle',
    seoTitle: 'Manta Sleep Discount Code | 2Passports1Dream',
    seoDescription:
      'Use our 2Passports1Dream Manta Sleep discount code 2passports10 to save on sleep masks and sleep accessories that can be useful for travel, flights, hotels and light-sensitive sleepers.',
    reviewIntro:
      'Sleep can be difficult when travelling, especially on long flights or in bright hotel rooms. Manta Sleep makes sleep masks and accessories designed to help with that.',
    whyWeLikeIt:
      'For travel, anything that genuinely helps with sleep is useful. A proper sleep mask can make a real difference on overnight flights, in unfamiliar hotel rooms and on long travel days.',
    importantNotes:
      'Always check the final price at checkout before paying.',
  },
  {
    name: 'Currensea',
    offer: '£10 free',
    code: null,
    affiliateUrl:
      'https://www.currensea.com/refer-a-friend?utm_source=refer-a-friend&friend-referral-code=DETJY2',
    description:
      'Currensea is a travel debit card for UK users that connects to your existing bank account and can help reduce foreign exchange fees.',
    shortDescription:
      'A UK travel debit card that connects to your existing bank account.',
    whyUseIt:
      'It can be useful for spending abroad without needing to move money onto a separate prepaid card.',
    bestFor: 'UK travellers, foreign spending and reducing unnecessary travel money faff.',
    personalNote:
      'We like travel tools that make money and payments feel simpler while away.',
    bestForTags: ['UK travellers', 'Foreign spending', 'Travel card'],
    buttonLabel: 'Get Currensea',
    slug: 'currensea',
    badgeText: 'Currensea',
    logoImage: '/logos/Currensea.webp',
    category: 'Money and Travel Cards',
  },
  {
    name: 'FoundersCard',
    offer: 'Free 1-year preview',
    code: 'VIP2PASSPORTS',
    affiliateUrl: 'https://founderscard.com/VIP2PASSPORTS',
    description:
      'FoundersCard is a membership, not a credit card, that gives you access to VIP perks and preferred pricing across travel, lifestyle and business brands.',
    shortDescription:
      'A membership that gives you access to VIP perks and preferred pricing across travel, lifestyle and business brands.',
    whyUseIt:
      'It is less about changing your whole trip and more about improving the trip you are already taking, with things like upgrades, added perks and preferred pricing.',
    bestFor: 'Hotels, flights, car rentals, food experiences and other trip extras.',
    personalNote:
      'We think it is worth a quick check before booking travel, just to see what benefits are available.',
    bestForTags: ['Travel perks', 'Hotels & flights', 'Frequent travellers'],
    buttonLabel: 'Visit FoundersCard',
    slug: 'founderscard',
    badgeText: 'FoundersCard',
    logoImage: '/logos/Founderscard.avif',
    category: 'Memberships and Perks',
  },
  {
    name: 'BetterHelp',
    offer: '10% off first month',
    code: null,
    affiliateUrl: 'https://betterhelp.com/2passports1dream',
    description:
      'BetterHelp is an online therapy platform that connects you with licensed therapists for remote sessions.',
    shortDescription:
      'An online therapy platform that connects you with licensed therapists for remote sessions.',
    whyUseIt:
      'Being able to access therapy remotely can be convenient if you travel often or simply prefer appointments from wherever you are.',
    bestFor: 'Frequent travellers, remote appointments and anyone thinking about trying online therapy.',
    personalNote:
      'BetterHelp is a paid partner of ours. This offer gives 10% off your first month through our link.',
    bestForTags: ['Online therapy', 'Remote sessions', 'Frequent travellers'],
    buttonLabel: 'Visit BetterHelp',
    slug: 'betterhelp',
    badgeText: 'BetterHelp',
    logoImage: '/logos/betterhelp.png',
    category: 'Travel Health and Lifestyle',
  },
  {
    name: 'Coveron',
    offer: '20% off',
    code: '2passports1dream',
    affiliateUrl: 'https://coveron.com/2passports1dream',
    description:
      'Coveron is a digital protection service focused on helping you stay safer from online scams.',
    shortDescription:
      'A digital protection service focused on helping you stay safer from online scams.',
    whyUseIt:
      'While travelling we rely on lots of online accounts and services, so extra protection against scams can be reassuring.',
    bestFor: 'Online safety, scam protection and staying safer across the accounts you use while travelling.',
    personalNote:
      'The first 100 users get 20% off with code 2passports1dream through our link.',
    bestForTags: ['Online safety', 'Scam protection', 'Digital security'],
    buttonLabel: 'Visit Coveron',
    slug: 'coveron',
    badgeText: 'Coveron',
    logoImage: '/logos/coveron.png',
    category: 'Connectivity and Online Safety',
  },
  {
    name: 'Fitnexa SomniPods 3',
    offer: '$10 off',
    code: null,
    affiliateUrl: 'https://go.fitnexa.com/BsH8X7',
    description:
      'The Fitnexa SomniPods 3 are a compact, sleep-focused audio product, with $10 off applied through our link.',
    shortDescription:
      'A compact, sleep-focused audio product, with $10 off applied through our link.',
    whyUseIt:
      'A small sleep and audio product can be handy for travel days, such as when you are trying to rest on a flight or in an unfamiliar room.',
    bestFor: 'Travel days, flights, sleep routines and packing light.',
    personalNote:
      'No code needed. The $10 discount is applied through our link.',
    bestForTags: ['Sleep audio', 'Travel', 'Compact'],
    buttonLabel: 'Shop SomniPods 3',
    slug: 'fitnexa-somnipods-3',
    badgeText: 'Fitnexa',
    logoImage: '/logos/fitnexa.jpeg',
    category: 'Travel Health and Lifestyle',
  },
  {
    name: 'Brevo',
    offer: '50% off for 3 months',
    code: 'ADRIANA50',
    affiliateUrl:
      'https://www.brevo.com/partners/adriana/?utm_medium=partnership&utm_source=adriana&utm_campaign=youtube',
    description:
      'Brevo is a platform for email marketing and customer communications, useful for creators, small businesses and online businesses.',
    shortDescription:
      'An email marketing and customer communications platform for creators and small businesses.',
    whyUseIt:
      'If you run a channel, shop or small business, keeping in touch with your audience by email can be genuinely useful.',
    bestFor: 'Creators, small businesses and online businesses managing email and customer communications.',
    personalNote:
      'Use code ADRIANA50 for 50% off Starter and Standard Plans for the first 3 months. New paying customers only.',
    bestForTags: ['Email marketing', 'Creators', 'Small business'],
    buttonLabel: 'Visit Brevo',
    slug: 'brevo',
    badgeText: 'Brevo',
    logoImage: '/logos/brevo.png',
    category: 'Creator and Business Tools',
  },
  {
    name: 'AG1',
    offer: 'Extra 20% off',
    code: null,
    affiliateUrl: 'https://drinkag1.com/2passports1dream',
    description:
      'AG1 is a daily greens and nutritional supplement drink, with an extra 20% off your first subscription order through our link.',
    shortDescription:
      'A daily greens and nutritional supplement drink, with an extra 20% off your first subscription order.',
    whyUseIt:
      'Some travellers like the convenience of a simple daily routine they can keep up while away from home.',
    bestFor: 'Daily routines, travel convenience and anyone who likes keeping things simple on the road.',
    personalNote:
      'No code needed. This limited-time offer gives an extra 20% off your first subscription order through our link.',
    bestForTags: ['Daily routine', 'Greens drink', 'Travel convenience'],
    buttonLabel: 'Visit AG1',
    slug: 'ag1',
    badgeText: 'AG1',
    logoImage: '/logos/ag1.webp',
    category: 'Travel Health and Lifestyle',
  },
]

export const supportLinks: SupportLink[] = [
  {
    name: 'Buy Us a Coffee',
    url: 'https://buymeacoffee.com/2p1d/',
    description:
      'If you enjoy our videos and want to support the channel directly, you can buy us a coffee. It helps us keep creating more travel videos.',
    buttonLabel: 'Support the channel',
    logoImage: '/logos/buymeacoffee.webp',
  },
]
