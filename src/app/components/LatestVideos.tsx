import Image from 'next/image'

export type LatestVideo = {
  id: string
  title: string
  youtubeUrl: string
  date: string
}

// Presentational only: receives already-fetched, newest-first videos from the
// homepage so there is no duplicate YouTube fetch and no hardcoded video data.
// Every card links directly to YouTube (companion pages are intentionally not
// linked from the homepage while they are being refined).
export default function LatestVideos({ videos }: { videos: LatestVideo[] }) {
  if (videos.length === 0) return null

  return (
    <section
      aria-labelledby="latest-videos-heading"
      className="py-20 px-4 bg-[#FFF9EF] border-t border-[#F0DDB0]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            Latest Videos
          </p>
          <h2 id="latest-videos-heading" className="text-3xl font-bold text-primary mb-4">
            Our 6 latest videos
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-xl mx-auto">
            The newest travel vlogs from the 2Passports1Dream channel. Each one links straight
            through to YouTube.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <a
              key={video.id}
              href={video.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch "${video.title}" on YouTube`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-100 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <div className="relative aspect-video bg-stone-200">
                <Image
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={`Thumbnail for the video ${video.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
                    <svg width="18" height="18" fill="#1C1917" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="font-semibold text-sm leading-snug line-clamp-2 text-foreground flex-1">
                  {video.title}
                </p>
                <div className="flex items-center justify-between gap-3 mt-4">
                  {video.date ? (
                    <span className="text-xs text-muted">{video.date}</span>
                  ) : (
                    <span />
                  )}
                  <span className="text-sm font-medium text-accent group-hover:text-accent-dark transition-colors inline-flex items-center gap-1">
                    Watch on YouTube
                    <svg
                      className="group-hover:translate-x-0.5 transition-transform duration-200"
                      width="12"
                      height="12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@2passports1dream"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See more videos on the 2Passports1Dream YouTube channel"
            className="inline-block bg-accent text-white font-semibold px-7 py-3.5 rounded-full hover:bg-accent-dark hover:-translate-y-1 transition-all duration-200 shadow-md text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            See more on YouTube
          </a>
        </div>
      </div>
    </section>
  )
}
