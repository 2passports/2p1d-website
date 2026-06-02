import type { Metadata } from 'next'
import Link from 'next/link'
import { categories, resources } from '../data/travel-resources'

export const metadata: Metadata = {
  title: 'Travel Resources',
  description:
    'Apps, tools and services Adriana and Dylan use when travelling. Covering flights, accommodation, transport, insurance, money and more. Coming soon.',
}

const isPlaceholderData = resources.length === 0 || resources[0]?.name?.startsWith('Replace')

const upcomingCategories = [
  'Flights',
  'Accommodation',
  'Travel insurance',
  'Transport and car hire',
  'Money and travel cards',
  'Apps and planning tools',
]

export default function TravelResourcesPage() {
  if (isPlaceholderData) {
    return (
      <>
        <section className="hero-bg py-20 px-4 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
              Coming Soon
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Travel Resources</h1>
            <p className="text-white/80 leading-relaxed max-w-xl mx-auto">
              A curated list of the apps, tools and services Adriana and Dylan use when
              planning and travelling.
            </p>
          </div>
        </section>

        <div className="py-16 px-4">
          <div className="max-w-2xl mx-auto">

            <div className="bg-surface rounded-2xl p-8 text-center mb-12">
              <p className="text-2xl font-bold mb-3">Being put together now</p>
              <p className="text-muted leading-relaxed">
                We are currently putting together our favourite travel resources, apps and tools.
                This page will be updated soon with genuine recommendations from Adriana and Dylan,
                covering everything from flights and accommodation to travel cards and packing apps.
              </p>
            </div>

            <h2 className="text-xl font-bold mb-6">What to expect</h2>
            <p className="text-muted leading-relaxed mb-8">
              When this page is ready, you will find useful, honest recommendations across the
              following categories.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {upcomingCategories.map((cat) => (
                <div
                  key={cat}
                  className="bg-white border border-stone-100 rounded-2xl p-5 flex items-center gap-3 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                  <p className="text-sm font-medium">{cat}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-sm text-muted mb-6">
                In the meantime, you can browse our available discount codes for gear and
                travel services, or head back to the homepage.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/discount-codes"
                  className="inline-block bg-accent text-white font-semibold px-6 py-3 rounded-full hover:bg-accent-dark transition-colors text-sm text-center"
                >
                  View Discount Codes
                </Link>
                <Link
                  href="/"
                  className="inline-block border border-stone-300 text-foreground font-semibold px-6 py-3 rounded-full hover:bg-surface transition-colors text-sm text-center"
                >
                  Back to Homepage
                </Link>
              </div>
            </div>

          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <section className="hero-bg py-14 px-4 text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Travel Resources</h1>
          <p className="text-white/80 leading-relaxed">
            A collection of tools, apps and services we use when travelling. We only include
            things we have personally used or researched.
          </p>
        </div>
      </section>

      <div className="bg-surface border-b border-stone-200 px-4 py-3 text-center">
        <p className="text-xs text-muted max-w-2xl mx-auto">
          Some links on this page may be affiliate links. If you book or buy through them, we may
          earn a small commission at no extra cost to you.
        </p>
      </div>

      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto space-y-14">
          {categories.map((category) => {
            const items = resources.filter((r) => r.category === category)
            if (items.length === 0) return null

            return (
              <section key={category}>
                <h2 className="text-xl font-bold mb-6 pb-3 border-b border-stone-200">
                  {category}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((resource, index) => (
                    <div
                      key={`${resource.name}-${index}`}
                      className="bg-white rounded-xl p-6 shadow-sm border border-stone-100 flex flex-col"
                    >
                      <p className="font-semibold text-foreground mb-2">{resource.name}</p>
                      <p className="text-sm text-muted leading-relaxed flex-1">
                        {resource.description}
                      </p>
                      {resource.note && (
                        <p className="text-xs text-primary mt-3 pt-3 border-t border-stone-100">
                          {resource.note}
                        </p>
                      )}
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-sm font-medium text-primary hover:text-accent transition-colors"
                      >
                        Visit resource
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </>
  )
}
