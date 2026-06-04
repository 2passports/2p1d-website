// Static fallback for the homepage short-form row.
//
// Shorts are normally pulled live from the YouTube API (see lib/youtube.ts).
// This list is only used when the live fetch returns no Shorts, for example
// on a deploy with no YOUTUBE_API_KEY, where the RSS fallback cannot tell
// Shorts and long-form apart. Keeping a small curated set here means the
// "Quick travel moments" section never silently disappears.
//
// HOW TO UPDATE:
//   Replace the id with a real Short video ID (the part after /shorts/ in the
//   URL) and give it a short, clean title with no hashtags. Keep the youtubeUrl
//   in the /shorts/<id> format. Save the file when done.

export type StaticShort = {
  id: string
  title: string
  youtubeUrl: string
}

export const shorts: StaticShort[] = [
  { id: 'tEfRWhbXDOQ', title: 'One sip in and the regret is instant', youtubeUrl: 'https://www.youtube.com/shorts/tEfRWhbXDOQ' },
  { id: 'KUS5slaGofU', title: 'A Happy Days themed motel room', youtubeUrl: 'https://www.youtube.com/shorts/KUS5slaGofU' },
  { id: 'sqf3yif6S8k', title: 'Us versus the New Mexico wind', youtubeUrl: 'https://www.youtube.com/shorts/sqf3yif6S8k' },
  { id: '4O6qPMUzapg', title: 'Give us one reason not to move to the USA', youtubeUrl: 'https://www.youtube.com/shorts/4O6qPMUzapg' },
  { id: 'yZvrLY837nY', title: 'Welcome to the USA', youtubeUrl: 'https://www.youtube.com/shorts/yZvrLY837nY' },
  { id: 'RHmc2XhjLuM', title: 'Two hundred and fifty dollars well spent at the Grand Canyon', youtubeUrl: 'https://www.youtube.com/shorts/RHmc2XhjLuM' },
  { id: '4W3zxDj2i7I', title: 'We cannot believe we stayed here', youtubeUrl: 'https://www.youtube.com/shorts/4W3zxDj2i7I' },
  { id: '5CJzuVVx2aQ', title: 'Sunset in Arizona just hits different', youtubeUrl: 'https://www.youtube.com/shorts/5CJzuVVx2aQ' },
]
