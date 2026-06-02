import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { videos as staticVideos } from '../data/videos'
import { fetchYoutubeVideos, formatPublishDate, getVideoCardBlurb } from '../lib/youtube'

export const metadata: Metadata = {
  title: 'Travel Videos',
  description:
    'Watch honest travel vlogs and destination guides from Adriana and Dylan at 2Passports1Dream. Every video has a written companion page with trip notes and useful travel tips.',
}

export default async function VideosPage() {
  const { longForm: fetchedVideos } = await fetchYoutubeVideos()

  // Build a map of static data keyed by video ID for enrichment
  const staticById = new Map(staticVideos.map(v => [v.id, v]))

  type DisplayVideo = {
    id: string
    title: string
    youtubeUrl: string
    date: string
    destination: string
    description: string
    // Companion slug: prefers the hand-crafted static slug; falls back to the
    // API-generated slug so every card has a working Read companion link.
    companionSlug: string
  }

  // Build the display list from the API result, enriched with static data where available.
  // Falls back to the full static list if the API returns nothing.
  const rssIds = new Set(fetchedVideos.map(v => v.id))

  const staticOnlyDisplayed: DisplayVideo[] = staticVideos
    .filter(v => !rssIds.has(v.id))
    .map(v => ({
      id: v.id,
      title: v.title,
      youtubeUrl: v.youtubeUrl,
      date: v.date !== 'Update date' ? v.date : '',
      destination: v.destination,
      // getVideoCardBlurb always returns a non-empty string
      description: getVideoCardBlurb(v.title, undefined, v.description),
      companionSlug: v.slug,
    }))

  const apiDisplayed: DisplayVideo[] = fetchedVideos.map(v => {
    const s = staticById.get(v.id)
    return {
      id: v.id,
      title: v.title,
      youtubeUrl: v.youtubeUrl,
      date: formatPublishDate(v.publishedAt),
      destination: s?.destination ?? '',
      // Prefer the cleaned YouTube API description; fall back to static summary
      description: getVideoCardBlurb(v.title, v.description, s?.description),
      // Prefer hand-crafted static slug so existing companion URLs keep working
      companionSlug: s?.slug ?? v.slug,
    }
  })

  const allVideos: DisplayVideo[] = apiDisplayed.length > 0
    ? [...apiDisplayed, ...staticOnlyDisplayed]
    : staticVideos.map(v => ({
        id: v.id,
        title: v.title,
        youtubeUrl: v.youtubeUrl,
        date: v.date !== 'Update date' ? v.date : '',
        destination: v.destination,
        description: getVideoCardBlurb(v.title, undefined, v.description),
        companionSlug: v.slug,
      }))

  return (
    <>
      {/* Hero */}
      <section className="hero-bg py-20 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
            All Videos
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Our Travel Videos</h1>
          <p className="text-white/80 leading-relaxed max-w-xl mx-auto">
            Road trips, cruises, city breaks, local food and first impressions of places around
            the world. All of our travel vlogs in one place.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-10 px-4 border-b border-stone-100">
        <div className="max-w-3xl mx-auto">
          <p className="text-muted leading-relaxed text-center">
            On the 2Passports1Dream channel you will find American road trips, honest cruise
            reviews, city breaks, first impressions of new places, local food spots, hotels and the
            kind of travel moments that do not always make it into the glossy highlights. Every
            video below links directly to YouTube. Each one also has a written companion page on
            this site with a summary and useful trip notes for anyone planning a similar trip.
          </p>
        </div>
      </section>

      {/* Video grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 flex flex-col hover:shadow-md transition-shadow duration-200"
              >
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative aspect-video bg-stone-200 group"
                >
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                      <svg width="18" height="18" fill="#1C1917" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </a>

                <div className="p-5 flex flex-col flex-1">
                  <p className="font-semibold text-sm leading-snug line-clamp-2 mb-2">{video.title}</p>
                  <p className="text-sm text-muted leading-relaxed line-clamp-2 flex-1 min-h-[2.5rem]">
                    {video.description}
                  </p>

                  <div className="flex items-center gap-4 mt-5 pt-4 border-t border-stone-100">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent hover:text-accent-dark transition-colors"
                    >
                      Watch on YouTube
                    </a>
                    <Link
                      href={`/videos/${video.companionSlug}`}
                      className="text-sm font-medium text-muted hover:text-accent transition-colors"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe nudge */}
      <section className="py-16 px-4 bg-surface border-t border-stone-200">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            Stay Up to Date
          </p>
          <h2 className="text-2xl font-bold mb-3">New videos every week</h2>
          <p className="text-sm text-muted leading-relaxed mb-7">
            Subscribe on YouTube so you never miss a new adventure from Adriana and Dylan.
          </p>
          <a
            href="https://www.youtube.com/@2passports1dream?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white font-semibold px-7 py-3.5 rounded-full hover:bg-accent-dark transition-colors text-sm"
          >
            Subscribe on YouTube
          </a>
        </div>
      </section>
    </>
  )
}
