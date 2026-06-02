import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'We could not find the page you were looking for. Head back to the 2Passports1Dream homepage to carry on exploring.',
}

export default function NotFound() {
  return (
    <section className="home-hero-bg px-4 py-24 sm:py-32">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">
          Error 404
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight">
          Oops, we seem to have taken a wrong turn.
        </h1>
        <p className="text-muted leading-relaxed mb-8 max-w-md mx-auto">
          The page you are looking for has moved or never existed. Let us get you back on the road.
        </p>
        <Link
          href="/"
          className="inline-block bg-accent text-white font-semibold px-7 py-3.5 rounded-full shadow-md hover:bg-accent-dark hover:-translate-y-0.5 transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Back to homepage
        </Link>
      </div>
    </section>
  )
}
