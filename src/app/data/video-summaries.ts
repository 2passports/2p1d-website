/**
 * Curated one-to-two sentence summaries for video cards and companion pages.
 * Keyed by the slug generated from the video title via slugify().
 * These take priority over cleaned YouTube descriptions.
 * Add a new entry here whenever a new video is published.
 *
 * To find the correct key for a title, apply these rules:
 *   1. Lowercase the full title
 *   2. Remove apostrophes, punctuation, emoji and brackets
 *   3. Replace spaces with hyphens, collapse consecutive hyphens
 */
export const videoSummaries: Record<string, string> = {
  // Route 66 and New Mexico
  'we-spent-24h-in-americas-forgotten-route-66-town':
    "We spend 24 hours in Tucumcari, New Mexico, one of Route 66's most talked-about towns, to see what is left of its old roadside magic.",
  'our-first-time-in-albuquerque-shocked-us':
    'We visit Albuquerque for the first time and share our honest first impressions of this New Mexico city.',
  'americas-route-66-is-stranger-than-we-thought':
    'We continue our first Route 66 road trip and discover just how strange, nostalgic and surprising this famous American highway can be.',
  'route-66-was-not-what-we-expected':
    'We begin our first Route 66 road trip after leaving the Grand Canyon and find out what the Mother Road is really like.',

  // Grand Canyon and Arizona
  'first-time-in-grand-canyon-national-park-we-are-amazed':
    'We visit our first ever American national park and finally see the Grand Canyon for ourselves.',
  'arizona-was-not-what-we-expected':
    'We explore Arizona for the first time and discover a side of the state that surprised us more than we expected.',

  // Norwegian Luna
  '72-hours-on-the-worlds-newest-mega-ship-norwegian-luna':
    'We spend 72 hours onboard Norwegian Luna to explore the ship, the food, the cabin and the overall cruise experience.',
  'we-tried-the-worlds-newest-mega-ship-norwegian-luna':
    "We step onboard Norwegian Cruise Line's brand new Norwegian Luna for the first time and share our honest thoughts.",

  // California
  'first-time-in-san-diego-so-this-is-california':
    "We visit San Diego for the first time and explore why so many people say this is one of California's best cities.",
  'we-stayed-in-americas-strangest-motel':
    'We stay at the Madonna Inn in California, one of the most unusual and memorable motels in the country.',
  'we-finally-visited-palm-springs-not-what-we-expected':
    'We visit Palm Springs for the first time to see what this famous desert city is really like.',
  'we-road-tripped-into-the-american-desert':
    'We head into the California desert and explore Joshua Tree to see what makes this part of America so special.',

  // Carnival cruise
  'we-survived-72h-on-carnivals-cheapest-cruise-ship':
    "We spend 72 hours on one of Carnival's cheapest cruise options to see what the experience is really like.",

  // Florida Keys
  'we-road-tripped-americas-florida-keys-not-what-we-expected':
    'We drive through the Florida Keys for the first time and find out whether this famous road trip lives up to the hype.',

  // Virgin Atlantic
  'we-tried-virgin-atlantic-upper-class-uk-to-america':
    'We fly Virgin Atlantic Upper Class from London Heathrow to America and share what the premium experience is really like.',

  // Japan
  'we-tried-skiing-in-japan-the-worlds-snowiest-country-niseko-hokkaido':
    'We travel to Niseko in Hokkaido to try skiing in one of the snowiest places in the world.',
  'we-tried-japans-most-expensive-shinkansen-train-gran-class':
    'We travel through Japan in Gran Class, the most premium Shinkansen experience, to see whether it feels worth it.',
  'we-survived-the-uks-cheapest-flight-to-japan':
    'We take one of the cheapest flight options from the UK to Japan and see what the journey is really like.',

  // Texas
  'we-were-completely-wrong-about-texas':
    'We explore Texas and realise it is not quite what we expected from the outside.',
  'europeans-react-to-the-texas-rodeo-americas-craziest-sport':
    'We experience a Texas rodeo for the first time and see why it is such a big part of local culture.',
  'first-time-in-texas-we-were-not-ready-for-this':
    'We arrive in Texas for the first time and start discovering why so many viewers told us we had to visit.',

  // Margaritaville at Sea
  'we-tried-americas-cheapest-cruise-margaritaville-at-sea':
    "We try one of America's cheapest cruises to see what you actually get for the price.",

  // Orlando
  'our-first-time-in-orlando-florida-we-are-shocked':
    "We visit Orlando for the first time and explore one of America's most famous holiday destinations.",

  // Paris
  'paris-at-christmas-is-magical-dreamy-winter-in-france':
    'We visit Paris at Christmas to experience the lights, cosy cafes and winter atmosphere.',
}
