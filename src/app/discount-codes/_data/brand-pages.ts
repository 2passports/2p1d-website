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
  seoTitle: 'DJI Mic Mini Discount Link | 2Passports1Dream',
  seoDescription:
    'Our DJI Mic Mini affiliate link for travel creators and vloggers. Compact wireless audio gear for filming on the go. Check the current offer through our link.',
  heroTagline: 'Compact wireless audio for creators, vloggers and travel filmmakers.',
  intro:
    'Good audio makes travel videos much easier to watch, especially when filming outdoors, in busy places or on the move. The DJI Mic Mini is a compact wireless microphone setup that can be a useful tool for creators who want to travel light.',
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
  seoTitle: 'Ultrahuman Smart Ring Discount Link | 2Passports1Dream',
  seoDescription:
    'Our Ultrahuman affiliate link for the smart ring that tracks sleep, movement and recovery. Check the current offer through our link.',
  heroTagline:
    'A smart ring for tracking sleep, movement and recovery.',
  intro:
    'Travel can affect sleep, routine and recovery in ways that are easy to overlook. The Ultrahuman Ring is a wearable for tracking health metrics like sleep quality, movement and recovery, which can be useful when your daily routine is regularly disrupted by travel.',
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
  seoTitle: 'NordVPN Discount Link | 2Passports1Dream',
  seoDescription:
    'Our NordVPN affiliate link. Get extra months free when you sign up through our link. Useful for privacy and security when using public WiFi while travelling.',
  heroTagline:
    'Extra months free when you sign up through our link. Useful for privacy on public WiFi while travelling.',
  intro:
    'We often use public WiFi in airports, hotels and cafes while travelling, so having extra privacy and security while online can be useful. NordVPN is a VPN service that can help with that.',
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
  seoTitle: 'Currensea Travel Card Offer | 2Passports1Dream',
  seoDescription:
    'Our Currensea referral link. UK travel debit card that connects to your existing bank account. Get £10 free when you sign up through our link. Terms apply.',
  heroTagline:
    'UK travel debit card connected to your existing bank account. £10 free through our referral link.',
  intro:
    'Managing money abroad can feel more complicated than it needs to be. Currensea is a UK travel card that connects directly to your existing bank account, which can make foreign spending feel simpler without needing to move money onto a separate prepaid card.',
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
  seoTitle: 'Vessi Waterproof Shoes Discount Link | 2Passports1Dream',
  seoDescription:
    'Our Vessi affiliate link for waterproof shoes. Useful for rainy cities, walking days and travel days where wet shoes would be a problem.',
  heroTagline:
    'Waterproof shoes for rainy cities, walking days and travel days.',
  intro:
    'Wet shoes can ruin a travel day quickly, especially when you still have hours of walking ahead. Vessi makes waterproof shoes that are designed to look like ordinary trainers, which can be a useful option for destinations with unpredictable weather.',
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
  importantNotes:
    'Offers can change, so always check the current price and availability before buying.',
}
