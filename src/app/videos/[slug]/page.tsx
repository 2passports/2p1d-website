import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CopyCodeButton } from '../../components/CopyCodeButton'
import { videos as staticVideos } from '../../data/videos'
import {
  fetchYoutubeVideos,
  formatPublishDate,
  getCuratedSummary,
} from '../../lib/youtube'

// Pre-render companion pages for all static videos at build time.
// API video pages are rendered on demand and cached by Next.js.
export async function generateStaticParams() {
  return staticVideos.map((video) => ({
    slug: video.slug,
  }))
}

type CompanionData = {
  id: string
  title: string
  youtubeUrl: string
  date: string
  destination?: string
  notes?: string
  highlights?: string[]
  externalSource?: { label: string; url: string }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const staticVideo = staticVideos.find(v => v.slug === slug)
  if (staticVideo) {
    const curated = getCuratedSummary(staticVideo.title)
    const base = curated ?? staticVideo.description
    const suffix = staticVideo.destination
      ? ` A 2Passports1Dream travel companion for ${staticVideo.destination}.`
      : ' A written companion from 2Passports1Dream.'
    return {
      title: staticVideo.title,
      description: (base + suffix).slice(0, 160),
    }
  }

  const { longForm } = await fetchYoutubeVideos()
  const apiVideo = longForm.find(v => v.slug === slug)
  if (apiVideo) {
    const curated = getCuratedSummary(apiVideo.title)
    const desc = curated
      ?? `${apiVideo.title}. Watch the full video and read the written companion from 2Passports1Dream.`
    return {
      title: apiVideo.title,
      description: desc.slice(0, 160),
    }
  }

  return {}
}

export default async function VideoRecapPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let video: CompanionData | null = null

  // 1. Try the static data file first (hand-crafted slugs and notes).
  const staticVideo = staticVideos.find(v => v.slug === slug)
  if (staticVideo) {
    video = {
      id: staticVideo.id,
      title: staticVideo.title,
      youtubeUrl: staticVideo.youtubeUrl,
      date: staticVideo.date !== 'Update date' ? staticVideo.date : '',
      destination: staticVideo.destination || undefined,
      notes: staticVideo.notes || undefined,
      highlights: staticVideo.highlights,
      externalSource: staticVideo.externalSource,
    }
  }

  // 2. Look up from the latest API videos by generated slug.
  if (!video) {
    const { longForm } = await fetchYoutubeVideos()
    const apiVideo = longForm.find(v => v.slug === slug)

    if (apiVideo) {
      const enrichment = staticVideos.find(v => v.id === apiVideo.id)
      video = {
        id: apiVideo.id,
        title: apiVideo.title,
        youtubeUrl: apiVideo.youtubeUrl,
        date: formatPublishDate(apiVideo.publishedAt),
        destination: enrichment?.destination || undefined,
        notes: enrichment?.notes || undefined,
        highlights: enrichment?.highlights,
        externalSource: enrichment?.externalSource,
      }
    }
  }

  if (!video) notFound()

  // ---------------------------------------------------------------------------
  // Content is built from manually curated data only.
  // YouTube descriptions are not used: some contain copied or mismatched text.
  // ---------------------------------------------------------------------------

  const curatedSummary = getCuratedSummary(video.title)

  // Opening sentence: curated summary only. Returns null if none is available
  // so the hero paragraph is omitted rather than showing a generic fallback.
  const openingSentence: string | null = curatedSummary ?? null

  // Hero highlights: curated static highlights take priority.
  // Fallback uses only confirmed data; no invented claims.
  const heroHighlights: string[] = video.highlights ?? (
    [
      video.destination || null,
      'Honest impressions from 2Passports1Dream',
      'Full video and written companion in one place',
    ].filter(Boolean) as string[]
  ).slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-10 lg:py-14 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

            {/* Text: top on mobile, left on desktop */}
            <div>
              {video.destination && (
                <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
                  {video.destination}
                </p>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold leading-snug mb-2">
                {video.title}
              </h1>
              {video.date && (
                <p className="text-white/60 text-sm mb-4">{video.date}</p>
              )}
              {openingSentence && (
                <p className="text-white/80 leading-relaxed mb-5 max-w-md text-sm">
                  {openingSentence}
                </p>
              )}
              {heroHighlights.length > 0 && (
                <ul className="space-y-1.5 mb-6">
                  {heroHighlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2 text-white/75 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-3">
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-white font-semibold px-5 py-2.5 rounded-full hover:bg-accent-dark transition-colors text-sm"
                >
                  Watch on YouTube
                </a>
                <Link
                  href="/videos"
                  className="bg-white/15 text-white font-semibold px-5 py-2.5 rounded-full hover:bg-white/25 transition-colors text-sm"
                >
                  Back to videos
                </Link>
              </div>
            </div>

            {/* Thumbnail: below text on mobile, right on desktop */}
            <div>
              <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
                Watch the full video
              </p>
              <a
                href={video.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-video rounded-xl overflow-hidden shadow-xl ring-2 ring-white/20 hover:ring-white/40 transition-all"
              >
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 552px"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                    <svg width="20" height="20" fill="#1C1917" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Main article */}
            <div className="lg:col-span-2 space-y-10">

              {/* Useful travel notes: only shown when manually added to videos.ts */}
              {video.notes && (
                <section>
                  <h2 className="text-xl font-bold mb-3">Useful travel notes</h2>
                  <p className="text-muted leading-relaxed">{video.notes}</p>
                </section>
              )}

              {/* Embedded video */}
              <section>
                <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
                  Watch the Full Video
                </p>
                <div className="aspect-video rounded-xl overflow-hidden shadow-md">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </section>

              {/* Final CTA */}
              <section className="border-t border-stone-100 pt-8">
                <p className="text-sm text-muted leading-relaxed mb-6">
                  The full video is on the 2Passports1Dream YouTube channel. Subscribe so you do not
                  miss the next adventure.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-accent-dark transition-colors text-sm"
                  >
                    Watch on YouTube
                  </a>
                  <a
                    href="https://www.youtube.com/@2passports1dream?sub_confirmation=1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-stone-300 text-foreground font-semibold px-6 py-3 rounded-full hover:bg-surface transition-colors text-sm"
                  >
                    Subscribe to the Channel
                  </a>
                </div>
              </section>

              {/* Back link */}
              <div className="flex justify-start">
                <Link
                  href="/videos"
                  className="text-sm font-medium text-muted hover:text-accent transition-colors flex items-center gap-1.5"
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  Back to all videos
                </Link>
              </div>

              {/* Disclaimer */}
              <p className="text-xs text-muted border-t border-stone-200 pt-6">
                This page is a written companion to the 2Passports1Dream YouTube video.
                Some links on this page are affiliate links, which means 2Passports1Dream may
                earn a small commission if you book through them, at no extra cost to you.
              </p>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 lg:self-start space-y-6">

              {/* Watch card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100">
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-video group"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 384px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-md">
                      <svg width="16" height="16" fill="#1C1917" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>
                <div className="p-4">
                  <p className="font-semibold text-sm mb-3 leading-snug line-clamp-2">
                    {video.title}
                  </p>
                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-accent text-white font-semibold px-5 py-2.5 rounded-full hover:bg-accent-dark transition-colors text-sm"
                  >
                    Watch on YouTube
                  </a>
                </div>
              </div>

              {/* Klook block */}
              <div className="bg-[#FFF9EF] border border-[#F0DDB0] rounded-2xl p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  Planning your trip
                </p>
                <h2 className="text-base font-bold mb-2 text-primary">
                  Planning your trip?
                </h2>
                <p className="text-sm text-muted leading-relaxed mb-4">
                  Klook is useful for booking tours, activities, attraction tickets, transfers
                  and travel experiences before you arrive.
                </p>
                <div className="mb-4">
                  <CopyCodeButton code="2P1DKLOOKOFF" />
                </div>
                <p className="text-xs font-semibold text-foreground mb-1">Up to 10% off on Klook</p>
                <p className="text-xs text-muted mb-4 leading-relaxed">
                  Discount availability and final savings may vary, so always check the price
                  and terms at checkout.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://affiliate.klook.com/redirect?aid=123026&aff_adid=1290323&k_site=https%3A%2F%2Fwww.klook.com%2F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-accent text-white font-semibold px-5 py-2.5 rounded-full hover:bg-accent-dark transition-colors text-sm"
                  >
                    Browse Klook
                  </a>
                  <Link
                    href="/discount-codes/klook"
                    className="block text-center border border-stone-300 text-foreground font-semibold px-5 py-2.5 rounded-full hover:bg-white transition-colors text-sm"
                  >
                    See our Klook page
                  </Link>
                </div>
              </div>

              {/* External source */}
              {video.externalSource && (
                <div className="bg-white border border-stone-200 rounded-2xl p-5">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-2">
                    Useful extra reading
                  </p>
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    If you want more background on this destination, this is a useful place to start.
                  </p>
                  <a
                    href={video.externalSource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark transition-colors"
                  >
                    {video.externalSource.label}
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </>
  )
}
