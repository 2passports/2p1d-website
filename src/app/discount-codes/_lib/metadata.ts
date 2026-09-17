import type { Metadata } from 'next'
import type { BrandPageData } from '../_data/brand-pages'

// Shared metadata for the Discount Codes section.
//
// Titles are absolute because every seoTitle is already written as the full
// title. Passing it through the root layout's "%s | 2Passports1Dream" template
// doubled the site name on titles that already ended with it.
//
// Canonical and Open Graph URLs are relative paths, resolved against
// metadataBase in the root layout, so they always point at the clean page URL
// with no affiliate or tracking parameters.
//
// openGraph and twitter are set in full because Next.js replaces these nested
// objects rather than merging them. Without them, pages inherited the
// homepage's title, description and URL from the root layout.
//
// Setting openGraph or twitter on a page also drops the image that the root
// opengraph-image and twitter-image files would otherwise add, so the same
// generated share images are referenced here explicitly.
const shareImage = {
  width: 1200,
  height: 630,
  type: 'image/png',
  alt: '2Passports1Dream travel videos, guides and discount codes',
}

export function discountSectionMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: '2Passports1Dream',
      locale: 'en_GB',
      url: path,
      title,
      description,
      images: [{ url: '/opengraph-image', ...shareImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: '/twitter-image', ...shareImage }],
    },
  }
}

// Metadata for a dedicated /discount-codes/{slug} brand page, built from the
// existing seoTitle and seoDescription in brand-pages.ts.
export function brandPageMetadata(data: BrandPageData): Metadata {
  return discountSectionMetadata({
    title: data.seoTitle,
    description: data.seoDescription,
    path: `/discount-codes/${data.slug}`,
  })
}
