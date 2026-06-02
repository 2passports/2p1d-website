import type { MetadataRoute } from 'next'
import { discountCodes } from './data/discount-codes'

// Public, launch-ready pages only. The videos and travel-resources sections are
// intentionally excluded while they are hidden from the live site.
const siteUrl = 'https://2passports1dream.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const corePages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${siteUrl}/discount-codes`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${siteUrl}/work-with-us`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ]

  // Dedicated discount brand pages exist only for entries that define a slug.
  const brandPages: MetadataRoute.Sitemap = discountCodes
    .filter((code) => code.slug)
    .map((code) => ({
      url: `${siteUrl}/discount-codes/${code.slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    }))

  return [...corePages, ...brandPages]
}
