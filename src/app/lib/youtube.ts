import { videoSummaries } from '../data/video-summaries'

// Channel ID is read from YOUTUBE_CHANNEL_ID when set, otherwise it falls back
// to the known 2Passports1Dream channel ID. Server-side only, never exposed.
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID || 'UCBQjTfMEcxMlI49KCQAHwYQ'
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`

// ---------------------------------------------------------------------------
// Subscriber count
// Requires YOUTUBE_API_KEY in .env.local (server-side only, never exposed).
// Falls back to FALLBACK_SUBSCRIBER_COUNT if the key is absent or the
// request fails. Result is cached by Next.js for 24 hours (ISR).
// ---------------------------------------------------------------------------

// Safe fallback shown only when the API key is missing or the request fails.
const FALLBACK_SUBSCRIBER_COUNT = '280k+'

/** Converts a raw subscriber number to a friendly rounded string, e.g. 280k+ or 1.2m+ */
export function formatSubscriberCount(count: number): string {
  if (count >= 1_000_000) {
    const tenths = Math.floor(count / 100_000) / 10
    const display = tenths % 1 === 0 ? `${Math.floor(tenths)}` : `${tenths}`
    return `${display}m+`
  }
  if (count >= 1_000) {
    return `${Math.floor(count / 1_000)}k+`
  }
  return `${count}+`
}

/**
 * Fetches the public subscriber count for the 2Passports1Dream channel.
 * Runs server-side only. Cached for 24 hours via Next.js ISR.
 * Returns a formatted string such as "280k+" or "1.2m+".
 * If YOUTUBE_API_KEY is not set, or if the request fails, returns the
 * hardcoded fallback so the page always renders without errors.
 */
export async function fetchSubscriberCount(): Promise<string> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) return FALLBACK_SUBSCRIBER_COUNT

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return FALLBACK_SUBSCRIBER_COUNT

    const data: {
      items?: Array<{ statistics?: { subscriberCount?: string } }>
    } = await res.json()

    const raw = data?.items?.[0]?.statistics?.subscriberCount
    const count = raw ? Number(raw) : NaN
    if (!count || isNaN(count)) return FALLBACK_SUBSCRIBER_COUNT

    return formatSubscriberCount(count)
  } catch {
    return FALLBACK_SUBSCRIBER_COUNT
  }
}

// ---------------------------------------------------------------------------
// Slug helper
// Converts a video title to a URL-safe slug. Used to generate companion page
// paths for API videos that are not in the static data file.
// ---------------------------------------------------------------------------

/** Converts a video title to a URL-safe slug, e.g. "First Time in San Diego!" -> "first-time-in-san-diego" */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-|-$/g, '')
}

export type YoutubeVideo = {
  id: string
  title: string
  slug: string
  publishedAt: string
  youtubeUrl: string
  description?: string
}

export type YoutubeVideosResult = {
  longForm: YoutubeVideo[]
  shorts: YoutubeVideo[]
}

// ---------------------------------------------------------------------------
// Video fetch: YouTube Data API (preferred) with RSS fallback
//
// When YOUTUBE_API_KEY is set the function uses two API calls:
//   1. playlistItems.list  - gets the 50 latest uploads
//   2. videos.list         - gets durations to separate Shorts from long-form
//
// Videos of 3 minutes (180 s) or less are treated as Shorts.
// Videos longer than 3 minutes are treated as long-form.
//
// When no API key is set the function falls back to the RSS feed, which
// is capped at 15 entries. Shorts are detected by /shorts/ in the URL.
//
// Both paths cache for 24 hours via Next.js ISR (revalidate: 86400).
// ---------------------------------------------------------------------------

// The uploads playlist ID is derived from the channel ID by replacing the
// leading "UC" with "UU".
const UPLOADS_PLAYLIST_ID = 'UU' + CHANNEL_ID.slice(2)

type PlaylistItemsResponse = {
  items?: Array<{
    snippet?: {
      resourceId?: { videoId?: string }
    }
  }>
}

type VideosListResponse = {
  items?: Array<{
    id?: string
    snippet?: { title?: string; publishedAt?: string; description?: string }
    contentDetails?: { duration?: string }
  }>
}

/** Returns true if an ISO 8601 duration string represents 3 minutes or less (YouTube Short threshold). */
function isDurationShort(isoDuration: string): boolean {
  const m = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/)
  if (!m) return true
  const h = parseInt(m[1] ?? '0')
  const min = parseInt(m[2] ?? '0')
  const s = parseInt(m[3] ?? '0')
  return h * 3600 + min * 60 + s <= 180
}

async function fetchYoutubeVideosFromAPI(apiKey: string): Promise<YoutubeVideosResult> {
  try {
    // Step 1: fetch the 50 most recent uploads from the channel's playlist.
    const playlistRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${UPLOADS_PLAYLIST_ID}&maxResults=50&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    )
    if (!playlistRes.ok) return { longForm: [], shorts: [] }

    const playlistData: PlaylistItemsResponse = await playlistRes.json()
    const videoIds = (playlistData.items ?? [])
      .map(item => item.snippet?.resourceId?.videoId ?? '')
      .filter(Boolean)

    if (videoIds.length === 0) return { longForm: [], shorts: [] }

    // Step 2: fetch video details (snippet + contentDetails) to get durations.
    const videosRes = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds.join(',')}&key=${apiKey}`,
      { next: { revalidate: 86400 } }
    )
    if (!videosRes.ok) return { longForm: [], shorts: [] }

    const videosData: VideosListResponse = await videosRes.json()

    const longForm: YoutubeVideo[] = []
    const shorts: YoutubeVideo[] = []

    for (const v of videosData.items ?? []) {
      if (!v.id || !v.snippet?.title) continue
      const isShort = isDurationShort(v.contentDetails?.duration ?? '')
      const video: YoutubeVideo = {
        id: v.id,
        title: v.snippet.title,
        slug: slugify(v.snippet.title),
        publishedAt: v.snippet.publishedAt ?? '',
        youtubeUrl: isShort
          ? `https://www.youtube.com/shorts/${v.id}`
          : `https://www.youtube.com/watch?v=${v.id}`,
        description: v.snippet.description || undefined,
      }
      if (isShort) {
        shorts.push(video)
      } else {
        longForm.push(video)
      }
    }

    // videos.list returns items in arbitrary order, not playlist order.
    // Sort both arrays newest-first so callers can safely use slice(0, n).
    const byDateDesc = (a: YoutubeVideo, b: YoutubeVideo) =>
      b.publishedAt.localeCompare(a.publishedAt)
    longForm.sort(byDateDesc)
    shorts.sort(byDateDesc)

    if (process.env.NODE_ENV === 'development') {
      // Temporary targeted debug check - remove once diagnosis is complete.
      const DEBUG_VIDEO_ID = 'KUS5slaGofU'
      const foundInUploadsPlaylist = (playlistData.items ?? []).some(
        item => item.snippet?.resourceId?.videoId === DEBUG_VIDEO_ID
      )
      const foundInVideoIds = videoIds.includes(DEBUG_VIDEO_ID)
      const debugEntry = (videosData.items ?? []).find(v => v.id === DEBUG_VIDEO_ID)
      const foundInVideosList = debugEntry !== undefined
      console.log(`[2p1d] DEBUG check for ${DEBUG_VIDEO_ID}:`)
      console.log(`  foundInUploadsPlaylist: ${foundInUploadsPlaylist}`)
      console.log(`  foundInVideoIds: ${foundInVideoIds}`)
      console.log(`  foundInVideosList: ${foundInVideosList}`)
      if (debugEntry) {
        const dur = debugEntry.contentDetails?.duration ?? 'PT0S'
        const isShortFlag = isDurationShort(dur)
        console.log(`  title: "${debugEntry.snippet?.title ?? '(none)'}"`)
        console.log(`  publishedAt: ${debugEntry.snippet?.publishedAt ?? '(none)'}`)
        console.log(`  duration: ${dur}`)
        console.log(`  isShort: ${isShortFlag}`)
        console.log(`  bucket: ${isShortFlag ? 'shorts' : 'longForm'}`)
      }
    }

    if (process.env.NODE_ENV === 'development') {
      console.log(
        '[2p1d] YouTube API fetch complete:',
        `total=${videoIds.length}`,
        `longForm=${longForm.length}`,
        `shorts=${shorts.length}`,
        `newestLongForm="${longForm[0]?.title ?? 'none'}"`,
        `newestShort="${shorts[0]?.title ?? 'none'}"`,
      )
    }

    return { longForm, shorts }
  } catch {
    return { longForm: [], shorts: [] }
  }
}

// ---------------------------------------------------------------------------
// RSS fallback (used when no API key is set)
// YouTube's Atom feed is capped at 15 entries. Shorts are detected by URL.
// ---------------------------------------------------------------------------

function extractTagContent(xml: string, tag: string): string {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`))
  return match ? match[1].trim() : ''
}

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

async function fetchYoutubeVideosFromRSS(): Promise<YoutubeVideosResult> {
  try {
    const res = await fetch(RSS_URL, { next: { revalidate: 86400 } })
    if (!res.ok) return { longForm: [], shorts: [] }
    const xml = await res.text()

    const longForm: YoutubeVideo[] = []
    const shorts: YoutubeVideo[] = []

    for (const entry of xml.split('<entry>').slice(1)) {
      const linkMatch = entry.match(/<link rel="alternate" href="([^"]+)"/)
      const youtubeUrl = linkMatch ? linkMatch[1] : ''
      if (!youtubeUrl) continue

      const id = extractTagContent(entry, 'yt:videoId')
      const title = decodeEntities(extractTagContent(entry, 'title'))
      const publishedAt = extractTagContent(entry, 'published')

      if (id && title) {
        const video: YoutubeVideo = { id, title, slug: slugify(title), publishedAt, youtubeUrl }
        if (youtubeUrl.includes('/shorts/')) {
          shorts.push(video)
        } else {
          longForm.push(video)
        }
      }
    }

    return { longForm, shorts }
  } catch {
    return { longForm: [], shorts: [] }
  }
}

// ---------------------------------------------------------------------------
// Description helpers for companion pages
//
// These work on the raw YouTube description string returned by the API.
// They are intentionally simple: no AI, no transcript fetching.
// Richer companion pages can be created later by supplying a manually
// saved transcript file alongside the static video entry in data/videos.ts.
// ---------------------------------------------------------------------------

// Video descriptions often include sponsor and affiliate blocks, so summaries
// must be generated from cleaned story text only.

/**
 * Internal: returns true when a line should be removed as promo, admin or
 * social content.
 *
 * ALWAYS patterns fire regardless of line length.
 * SHORT patterns fire only on lines under 100 characters to reduce false
 * positives in longer narrative sentences.
 */
function isPromoLine(content: string): boolean {
  const ALWAYS: RegExp[] = [
    /https?:\/\/|www\./i,
    /\d+%\s*off/i,
    /get\s+\d+%/i,
    /save\s+\d+%/i,
    /valid\s+until/i,
    /discount\s+valid/i,
    /use\s+(?:the\s+)?(?:discount\s+|promo\s+)?code\b/i,
    /promo\s+code|discount\s+code/i,
    /referral\s+code/i,
    /\baffiliate\b/i,
    /access\s+it\s+through/i,
    /click\s+(?:here|the\s+link|this\s+link|below)/i,
    /link\s+in\s+(?:bio|description|below)/i,
    /\bsponsored\b/i,
    /\bpartnership\b/i,
    /\b(klook|epidemic\s*sound|buymeacoffee|buy\s*me\s*a\s*coffee|paypal|dada\.link|hover\s*air|hoverair|hovaair|hova\s*air)\b/i,
    /\b(amex|american\s*express|level8|halara)\b/i,
    /\bsuitcase\b/i,
    /\bmerch\b/i,
    /links?\s+to\s+my\s+picks?/i,
    /colou?r\s*:/i,
    /size\s*:/i,
    /\b(instagram|tiktok|facebook)\b/i,
  ]

  if (ALWAYS.some(p => p.test(content))) return true

  if (content.length < 100) {
    const SHORT: RegExp[] = [
      /\b(twitter|discord|youtube\.com)\b/i,
      /\b(subscribe|follow us|follow along|tap here|click here)\b/i,
      /^(check out|grab our|get our|join our|find us|follow me)\b/i,
      /\b(business@|for business|work with us)\b/i,
      /^(sound|music|edit|filmed by|produced by|camera|drone|equipment)\s*(by|:)/i,
      /\b(donate|support\s+us)\b/i,
      /\b(leggings|overalls|jeans)\b/i,
      /\b(?:our|filming|camera|travel)\s+gear\b/i,
    ]
    if (SHORT.some(p => p.test(content))) return true
  }

  return false
}

// Matches admin section headers at the start of a line.
// Scanning stops here whether or not story text follows on the same line.
// Stopping entirely (rather than stripping the label) prevents text from
// other videos, pasted into admin sections as templates, from appearing
// in summaries for the current video.
const ADMIN_SECTION_STOP =
  /^[\s◆▶►•\-]*(?:LINKS?\s*[&]+\s*DISCOUNTS?|LINKS?\s+AND\s+DISCOUNTS?|LINKS?\s*TO\s*MY\s*PICKS?|MY\s*PICKS?|BUSINESS\s*ENQUIR(?:Y|IES)|SUPPORT\s*US|SOCIAL\s*MEDIA|VIDEO\s*CHAPTERS?|CHAPTERS?|PRODUCTS?\s*MENTIONED|WHERE\s*WE\s*(?:STAYED|SLEPT)|MUSIC\s*:|SOUND\s*:|EDIT\s*:|FOLLOW\s*US|FIND\s*US|GET\s*IN\s*TOUCH|SUBSCRIBE)\s*:?/i

/**
 * Cleans a raw YouTube description for display on companion pages and cards.
 *
 * Stops at the first admin section header (LINKS & DISCOUNTS, BUSINESS
 * ENQUIRIES, SOCIAL MEDIA, SOUND:, EDIT:, etc.), chapter timestamps and
 * hashtag blocks. Individual promo lines within the story section are also
 * removed by isPromoLine.
 *
 * Stopping at admin headers prevents text pasted into admin sections from
 * other videos from leaking into summaries for the current video.
 */
export function cleanVideoDescription(raw: string): string {
  if (!raw) return ''

  const lines = raw.split('\n')
  const kept: string[] = []

  for (const line of lines) {
    const t = line.trim()

    if (t === '') { kept.push(''); continue }

    // Stop at admin section headers
    if (ADMIN_SECTION_STOP.test(t)) break

    // Stop at chapter timestamps
    if (/^\d{1,2}:\d{2}/.test(t)) break

    // Stop at hashtag-dominated lines
    {
      const words = t.split(/\s+/).filter(Boolean)
      const hashCount = words.filter(w => /^#\w/.test(w)).length
      if (hashCount >= 3 && hashCount / words.length >= 0.6) break
    }

    if (t.length < 15) continue
    if (isPromoLine(t)) continue

    kept.push(t)
  }

  return kept.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

/**
 * Returns the first 2 to 3 story paragraphs from a cleaned description,
 * capped at 800 characters total. Prevents walls of description text from
 * appearing verbatim on companion pages.
 */
export function extractUsefulTravelStory(clean: string): string {
  if (!clean) return ''

  const paragraphs = clean
    .split('\n\n')
    .map(p => p.trim())
    .filter(p => p.length > 30)

  const kept: string[] = []
  let total = 0

  for (const para of paragraphs) {
    if (kept.length >= 3) break
    if (total > 0 && total + para.length > 800) break
    kept.push(para)
    total += para.length
  }

  if (kept.length === 0 && paragraphs.length > 0) {
    return (paragraphs[0] ?? '').slice(0, 500).trimEnd()
  }

  return kept.join('\n\n')
}

/**
 * Extracts chapter/timestamp entries from a raw YouTube description.
 * Always called on the raw string, not the cleaned version.
 * Returns an empty array when no chapters are present.
 */
export function extractChapters(raw: string): string[] {
  return raw
    .split('\n')
    .map(l => l.trim())
    .filter(l => /^\d{1,2}:\d{2}/.test(l))
}

/**
 * Extracts explicit bullet/list items from a cleaned description.
 * Only returns items that are literally present as list lines (-, •, *, 1.).
 * Returns an empty array when no structured list is found, so callers can
 * simply skip the section rather than generating invented bullets.
 */
export function extractBulletPoints(clean: string): string[] {
  return clean
    .split('\n')
    .map(l => l.trim())
    .filter(l => /^[-•*]\s+.{5,}/.test(l) || /^\d+\.\s+.{5,}/.test(l))
    .map(l => l.replace(/^[-•*\d.]+\s+/, '').trim())
}

/**
 * Returns a short, clean blurb for a video card on the /videos page.
 * Always returns a non-empty string so every card has a consistent blurb area.
 *
 * Priority:
 *   1. First sentence of the cleaned YouTube API description (if substantial)
 *   2. The static hand-written description from data/videos.ts
 *   3. A title-based fallback (slightly specific when a place is in the title)
 *
 * The result is safe to render directly: no URLs, admin headings, sponsor
 * lines or hashtags will appear.
 */
/**
 * Extracts meaningful tokens from a video title for mismatch detection.
 * Returns lower-cased words of 4+ characters that look like place names or
 * topic keywords (initial capital in the original title, or all-caps).
 * Short words, articles and common verbs are ignored.
 */
function extractTitleTokens(title: string): string[] {
  const IGNORE = new Set([
    'this', 'that', 'with', 'from', 'what', 'have', 'were',
    'they', 'their', 'here', 'there', 'when', 'where', 'will',
    'just', 'only', 'also', 'more', 'some', 'than', 'then',
    'time', 'road', 'trip', 'first', 'last', 'best', 'most',
    'know', 'went', 'came', 'said', 'told', 'find', 'found',
    'like', 'love', 'hate', 'show', 'take', 'make', 'came',
    'hour', 'days', 'week', 'year', 'night', 'video', 'vlog',
    'travel', 'visit', 'tried', 'spent', 'honest', 'shocked',
    'never', 'every', 'about', 'think', 'really', 'amazing',
    'world', 'actually', 'expected',
  ])
  // Strip emoji and non-ASCII, then split on spaces/punctuation
  const cleaned = title.replace(/[^\x00-\x7F]/g, ' ').replace(/[^\w\s]/g, ' ')
  return cleaned
    .split(/\s+/)
    .filter(w => w.length >= 4)
    .filter(w => /^[A-Z]/.test(w) || /^[A-Z]{3,}/.test(w))
    .map(w => w.toLowerCase())
    .filter(w => !IGNORE.has(w))
}

/**
 * Returns true when the cleaned description appears to be about the same
 * subject as the title. If the title contains recognisable place/topic tokens
 * and none of them appear in the description, we treat that as a mismatch and
 * refuse to use the description so a safe fallback is used instead.
 *
 * The check is intentionally lenient: if the title yields no usable tokens, or
 * if even one token matches, the description is accepted. This avoids false
 * positives on titles like "We Survived 72h on a Cruise Ship" where the
 * description may not repeat the exact wording.
 */
function descriptionMatchesTitle(cleanDesc: string, titleTokens: string[]): boolean {
  if (titleTokens.length === 0) return true
  const lower = cleanDesc.toLowerCase()
  return titleTokens.some(token => lower.includes(token))
}

/**
 * Returns the curated summary for a video by title, or undefined when none exists.
 * The lookup is slug-based so it works for both API titles and static titles.
 */
export function getCuratedSummary(title: string): string | undefined {
  return videoSummaries[slugify(title)]
}

export function getVideoCardBlurb(
  title: string,
  rawApiDesc?: string,
  staticDesc?: string,
): string {
  const titleTokens = extractTitleTokens(title)

  // Priority 1: curated summary override
  const curated = getCuratedSummary(title)
  if (curated) return curated

  // Priority 2: first sentence of the cleaned YouTube API description,
  // only when it appears topically related to the video title.
  if (rawApiDesc) {
    const clean = cleanVideoDescription(rawApiDesc)
    if (clean.length > 60 && descriptionMatchesTitle(clean, titleTokens)) {
      const firstSentence = clean.split(/(?<=[.!?])\s/)[0]?.trim() ?? ''
      if (firstSentence.length > 40) return firstSentence
      return clean.slice(0, 120).trimEnd() + (clean.length > 120 ? '...' : '')
    }
  }

  // Priority 3: static hand-written description
  if (staticDesc && staticDesc.trim().length > 20) return staticDesc.trim()

  // Priority 4: safe title-based fallback
  // Only match properly-cased place names (Title Case, not ALL CAPS) after "in"
  const cleanTitle = title.replace(/[^\x00-\x7F]/g, '').replace(/\s{2,}/g, ' ').trim()
  const placeMatch = cleanTitle
    .match(/\bin\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})\b/)?.[1]
    ?.trim()
  if (placeMatch) {
    return `Join us as we visit ${placeMatch} and find out what it is really like.`
  }
  return 'Join us as we share what we found and what really stood out on this trip.'
}

export function formatPublishDate(isoDate: string): string {
  if (!isoDate) return ''
  try {
    return new Date(isoDate).toLocaleDateString('en-GB', {
      month: 'long',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

/**
 * Returns long-form videos and Shorts for the 2Passports1Dream channel.
 * Uses the YouTube Data API when YOUTUBE_API_KEY is set (fetches 50 recent
 * uploads, splits by duration: >180s = long-form, <=180s = Short).
 * Falls back to the RSS feed (15 entries max, split by URL pattern) when
 * no API key is present or when both arrays come back empty.
 */
// Note on revalidate: 86400 (set on each fetch call above).
// This is stale-while-revalidate, not a cron job. After 24 hours the cached
// response is marked stale. The next incoming request triggers a background
// re-fetch, but that visitor still receives the old data. Only the request
// after that sees the fresh result. New videos may therefore take up to
// ~48 hours to appear in the worst case (stale window + one background cycle).
// To force fresh data locally: restart the dev server.
export async function fetchYoutubeVideos(): Promise<YoutubeVideosResult> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (apiKey) {
    const result = await fetchYoutubeVideosFromAPI(apiKey)
    if (result.longForm.length > 0 || result.shorts.length > 0) return result
  }
  return fetchYoutubeVideosFromRSS()
}
