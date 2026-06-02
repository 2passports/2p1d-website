import type { MetadataRoute } from 'next'

const siteUrl = 'https://2passports1dream.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Keep the hidden, not-yet-launched sections out of search results.
      disallow: ['/videos', '/travel-resources'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
