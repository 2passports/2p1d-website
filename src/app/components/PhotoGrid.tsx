import Image from 'next/image'

export type CollageImage = {
  src: string
  alt: string
  caption?: string
  objectPosition?: string
}

const INSTAGRAM_URL = 'https://www.instagram.com/2passports1dream'

export default function PhotoGrid({ images }: { images: CollageImage[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {images.map((img) => (
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
