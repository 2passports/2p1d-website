import Image from 'next/image'

export type CollageImage = {
  src: string
  alt: string
  caption?: string
  objectPosition?: string
}

const INSTAGRAM_URL = 'https://www.instagram.com/2passports1dream'

// The grid is laid out as 2 columns on mobile and 3 on desktop, so a multiple
// of 6 always fills complete rows with no awkward empty gap. We therefore show
// a fixed window of 6 photos even when the pool is larger.
const DISPLAY_COUNT = 6

// Pick a balanced window of `count` photos from a larger pool. The starting
// point advances by one each day, wrapping around, so every photo gets shown
// over time without any client-side randomness (which would risk a hydration
// mismatch). On the homepage (regenerated daily via ISR) this rotates day to
// day; on fully static pages it advances on each new build. Pools of `count`
// or fewer are returned unchanged.
function selectPhotos(images: CollageImage[], count: number): CollageImage[] {
  if (images.length <= count) return images
  const dayIndex = Math.floor(Date.now() / 86_400_000)
  const start = dayIndex % images.length
  return Array.from({ length: count }, (_, i) => images[(start + i) % images.length])
}

export default function PhotoGrid({
  images,
  count = DISPLAY_COUNT,
}: {
  images: CollageImage[]
  count?: number
}) {
  const displayed = selectPhotos(images, count)

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {displayed.map((img) => (
        <a
          key={img.src}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow 2Passports1Dream on Instagram"
          className="group relative rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg hover:brightness-105 transition-all duration-300 bg-stone-100"
        >
          <div className="relative aspect-[4/5]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              style={{ objectPosition: img.objectPosition ?? 'center center' }}
            />
          </div>
          {img.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent px-3 py-3 pt-6">
              <p className="text-white text-xs font-medium">{img.caption}</p>
            </div>
          )}
        </a>
      ))}
    </div>
  )
}
