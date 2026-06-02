// This file controls the videos shown on your website.
// Update it whenever you publish a new video.
//
// HOW TO FIND YOUR VIDEO ID:
//   1. Open your video on YouTube.
//   2. Look at the web address in your browser. It looks like this:
//      https://www.youtube.com/watch?v=dQw4w9WgXcQ
//   3. The video ID is everything after "?v="
//      In the example above, the ID is: dQw4w9WgXcQ
//
// HOW TO UPDATE A VIDEO:
//   Replace any field below with your real details.
//   Keep the same format and punctuation. Save the file when done.
//
// HOW TO ADD TRAVEL NOTES TO A VIDEO PAGE:
//   Each video has a commented-out notes line. To add notes, remove the //
//   at the start of that line and replace the placeholder text with your notes.
//   Notes appear in the "Useful travel notes" section on each video recap page.
//
// COMPANION PAGE ACCURACY RULE:
//   Only use specific place names in highlights or notes when confirmed by
//   the video description, video title or manually verified notes.
//   Do not name restaurants, hotels, ships, attractions or routes unless confirmed.

export type Video = {
  id: string
  slug: string
  title: string
  description: string
  destination: string
  date: string
  youtubeUrl: string
  notes?: string
  // Optional curated fields for richer companion pages.
  // highlights: up to 3 short bullet points shown in the hero. Only include
  //   things clearly supported by the title or description.
  highlights?: string[]
  // externalSource: one credible official link (tourism board, NPS, etc.).
  //   Leave undefined rather than adding a source you are not certain about.
  externalSource?: { label: string; url: string }
}

export const videos: Video[] = [
  {
    id: 'MyIYs-IMFqo',
    slug: 'americas-route-66-is-stranger-than-we-thought',
    title: "America's Route 66 is Stranger Than We Thought! 🇺🇸",
    description: "We continue our first Route 66 road trip and discover just how strange, nostalgic and surprising this famous American highway can be.",
    destination: 'Route 66, USA',
    date: 'Update date',
    youtubeUrl: 'https://www.youtube.com/watch?v=MyIYs-IMFqo',
    // notes: 'Add your travel notes here. They will appear on the video recap page.',
    highlights: [
      'Continuing the first Route 66 road trip',
      'Small towns, old trading posts and desert landscapes',
      'Old Americana and unexpected roadside stops',
    ],
  },
  {
    id: 'V_91E-44i6E',
    slug: 'route-66-not-expected',
    title: 'Route 66 Was NOT What We Expected 🇺🇸',
    description: 'Our honest take on driving Route 66. Not everything lived up to the hype, and some things surprised us completely.',
    destination: 'Route 66, USA',
    date: 'Update date',
    youtubeUrl: 'https://www.youtube.com/watch?v=V_91E-44i6E',
    // notes: 'Add your travel notes here. They will appear on the video recap page.',
    highlights: [
      'Honest take on driving Route 66',
      'What lived up to the hype and what did not',
      'The real Route 66 experience',
    ],
  },
  {
    id: 'bBH2HyOizeg',
    slug: 'grand-canyon-first-time',
    title: 'First Time in Grand Canyon National Park 🇺🇸 We are Amazed!',
    description: 'Our first visit to Grand Canyon National Park. One of the most breathtaking places we have ever seen.',
    destination: 'Grand Canyon, USA',
    date: 'Update date',
    youtubeUrl: 'https://www.youtube.com/watch?v=bBH2HyOizeg',
    // notes: 'Add your travel notes here. They will appear on the video recap page.',
    highlights: [
      'Our first visit to Grand Canyon National Park',
      'Honest first impressions of one of America\'s great wonders',
      'What the Grand Canyon is actually like to visit',
    ],
    externalSource: {
      label: 'Grand Canyon National Park – National Park Service',
      url: 'https://www.nps.gov/grca/index.htm',
    },
  },
  {
    id: 'ycOdrUHzG0U',
    slug: 'arizona-not-expected',
    title: 'Arizona Was NOT What We Expected 🇺🇸',
    description: 'Arizona caught us off guard in ways we did not expect. Here is what we found when we explored the state.',
    destination: 'Arizona, USA',
    date: 'Update date',
    youtubeUrl: 'https://www.youtube.com/watch?v=ycOdrUHzG0U',
    // notes: 'Add your travel notes here. They will appear on the video recap page.',
    highlights: [
      'Exploring Arizona for the first time',
      'What caught us off guard about the state',
      'Honest first impressions of Arizona',
    ],
    externalSource: {
      label: 'Arizona Tourism – Official State Travel Site',
      url: 'https://tourism.az.gov',
    },
  },
  {
    id: '2Q2Nhgn0tKw',
    slug: 'norwegian-luna',
    title: "We Tried the World’s Newest Mega Ship (Norwegian Luna)",
    description: "We sailed on Norwegian Luna, the world’s newest mega cruise ship, and shared our honest thoughts on the experience.",
    destination: 'Norwegian Luna',
    date: 'Update date',
    youtubeUrl: 'https://www.youtube.com/watch?v=2Q2Nhgn0tKw',
    // notes: 'Add your travel notes here. They will appear on the video recap page.',
    highlights: [
      "Norwegian Luna, the world's newest mega cruise ship",
      'Our honest review of what the ship is like',
      'Is Norwegian Luna worth booking?',
    ],
  },
  {
    id: 'ktPAcknCphA',
    slug: 'san-diego-first-time',
    title: 'First Time in San Diego 🇺🇸 So THIS is California?',
    description: 'Our first time exploring San Diego and what surprised us about this corner of California.',
    destination: 'San Diego, USA',
    date: 'Update date',
    youtubeUrl: 'https://www.youtube.com/watch?v=ktPAcknCphA',
    // notes: 'Add your travel notes here. They will appear on the video recap page.',
    highlights: [
      'Our first time in San Diego, California',
      'What surprised us about this corner of the USA',
      'Honest first impressions of San Diego',
    ],
    externalSource: {
      label: 'San Diego Tourism Authority – Official Visitor Site',
      url: 'https://www.sandiego.org',
    },
  },
]
