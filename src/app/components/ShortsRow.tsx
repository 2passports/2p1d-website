'use client'

import { useRef } from 'react'
import Image from 'next/image'

export type ShortVideo = {
  id: string
  title: string
  youtubeUrl: string
}

// Presentational only: receives already-fetched, newest-first Shorts from the
// homepage. Shorts come from the live YouTube API; there is no static fallback,
// so this renders nothing when the list is empty rather than showing a gap.
// Every card links directly to YouTube. This is a horizontal scrolling carousel:
// swipeable on mobile, with scroll-snap and desktop arrow controls.
export default function ShortsRow({ shorts }: { shorts: ShortVideo[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (shorts.length === 0) return null

  function scrollByCards(direction: 'left' | 'right') {
    const el = scrollRef.current
    if (!el) return
    const amount = el.clientWidth * 0.8
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section
      aria-labelledby="shorts-heading"
      className="py-14 px-4 bg-surface border-t border-[#F0DDB0] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-3">
            Short form
          </p>
          <h2 id="shorts-heading" className="text-3xl font-bold text-primary mb-3">
            Quick travel moments
          </h2>
          <p className="text-muted text-sm leading-relaxed max-w-xl mx-auto">
            Short clips and travel moments from our latest trips.
          </p>
        </div>

        {/* Carousel: relative wrapper holds the edge fades and the desktop
            arrow controls. The inner row is the scrollable, snapping track. */}
        <div className="relative -mx-4">
          {/* Edge fades hint that more content is available */}
          <div
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-[#FFF4DF] to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-[#FFF4DF] to-transparent z-10"
            aria-hidden="true"
          />

          {/* Desktop arrow controls */}
          <button
            type="button"
            onClick={() => scrollByCards('left')}
            aria-label="Scroll Shorts left"
            className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/90 border border-stone-200 text-primary shadow-md hover:bg-white hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCards('right')}
            aria-label="Scroll Shorts right"
            className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/90 border border-stone-200 text-primary shadow-md hover:bg-white hover:scale-105 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <div
            ref={scrollRef}
            className="flex gap-5 lg:gap-6 overflow-x-auto pb-4 px-4 lg:px-12 snap-x snap-mandatory scroll-smooth"
            role="list"
            aria-label="Latest YouTube Shorts"
          >
            {shorts.map((short) => (
              <a
                key={short.id}
                href={short.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                aria-label={`Watch the Short "${short.title}" on YouTube`}
                className="group flex-shrink-0 w-44 sm:w-48 lg:w-56 snap-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-2xl"
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-stone-200 shadow-md ring-1 ring-black/5 group-hover:shadow-xl group-hover:-translate-y-1.5 transition-all duration-300">
                  <Image
                    src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
                    alt={`Short: ${short.title}`}
                    fill
                    sizes="(max-width: 640px) 176px, (max-width: 1024px) 192px, 224px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Soft wash that lifts on hover. No caption text: the cards
                      stay clean and visual, with the title carried by the link
                      aria-label and image alt for accessibility. */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" aria-hidden="true" />
                  <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <div className="w-11 h-11 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200">
                      <svg width="15" height="15" fill="#1C1917" viewBox="0 0 24 24" className="ml-0.5">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href="https://www.youtube.com/@2passports1dream/shorts"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="See more Shorts on the 2Passports1Dream YouTube channel"
            className="inline-block border-2 border-primary text-primary font-semibold px-7 py-3.5 rounded-full hover:bg-primary hover:text-white hover:-translate-y-1 transition-all duration-200 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            More Shorts on YouTube
          </a>
        </div>
      </div>
    </section>
  )
}
