import type { MetadataRoute } from 'next'
import { discountCodes } from './data/discount-codes'

// Public, launch-ready pages only. The videos and travel-resources sections are
// intentionally excluded while they are hidden from the live site.
const siteUrl = 'https://2passports1dream.com'

// lastModified comes from dates stored in the data, never the build date, so a
// deployment on its own does not make every page look newly changed. Pages with
// no reliable stored date omit lastModified rather than guessing.
export default function sitemap(): MetadataRoute.Sitemap {
  // Dedicated discount brand pages exist only for entries that define a slug.
  // contentUpdated wins when the page copy changed, otherwise verifiedDate.
  const discountPages = discountCodes.filter((code) => code.slug)
  const brandPageDates = discountPages
    .map((code) => code.contentUpdated ?? code.verifiedDate)
    .filter((date): date is string => Boolean(date))

  // The hub changes whenever any offer on it changes. YYYY-MM-DD sorts as text.
  const hubLastModified = brandPageDates.length > 0 ? [...brandPageDates].sort().at(-1) : undefined

  const corePages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    {
      url: `${siteUrl}/discount-codes`,
      ...(hubLastModified ? { lastModified: hubLastModified } : {}),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    { url: `${siteUrl}/work-with-us`, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const brandPages: MetadataRoute.Sitemap = discountPages.map((code) => {
    const lastModified = code.contentUpdated ?? code.verifiedDate
    return {
      url: `${siteUrl}/discount-codes/${code.slug}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: 'monthly',
      priority: 0.6,
    }
  })

  return [...corePages, ...brandPages]
}
