'use client'

import { useState } from 'react'
import Script from 'next/script'
import { useMarketingConsent, openCookieSettings } from '../../components/CookieConsent'

// Exact widget markup as provided by Klook. Their loader script finds the
// <ins class="klk-aff-widget"> element and replaces it with an iframe, so we
// render the markup verbatim and make sure it is in the DOM before the script
// runs. The inner link is only a fallback shown before the widget renders; it
// uses https and opens securely in a new tab.
const KLOOK_WIDGET_HTML =
  '<ins class="klk-aff-widget" data-adid="1295855" data-lang="" data-currency="" data-cardH="126" data-padding="92" data-lgH="470" data-edgeValue="655" data-cid="-1" data-tid="-1" data-amount="6" data-prod="dynamic_widget"><a href="https://www.klook.com/" target="_blank" rel="noopener noreferrer sponsored">Klook.com</a></ins>'

const KLOOK_WIDGET_SCRIPT = 'https://affiliate.klook.com/widget/fetch-iframe-init.js'

// A clear, button-styled link to our Klook affiliate offer, used in the
// fallback states so the visitor always has a way through.
function BrowseKlookButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="inline-block bg-accent text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-accent-dark transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      Browse Klook experiences
    </a>
  )
}

// Klook affiliate widget for the Klook discount code page only.
//
// This is a third-party marketing widget, so it loads only after the visitor
// has accepted marketing cookies (the same consent the site already uses for
// the Meta Pixel). Until then, or if the widget cannot load, we show a tidy
// fallback so the page always looks complete.
export function KlookWidget({ affiliateUrl }: { affiliateUrl: string }) {
  const marketingAllowed = useMarketingConsent()
  const [scriptFailed, setScriptFailed] = useState(false)

  return (
    <section className="bg-[#FFF9EF] border border-[#F0DDB0] rounded-2xl p-6 sm:p-8">
      <h2 className="text-xl font-bold mb-2">Browse popular Klook experiences</h2>
      <p className="text-muted leading-relaxed mb-5 max-w-3xl">
        You can also browse current Klook experiences and activities below.
      </p>

      {!marketingAllowed ? (
        // Marketing consent not given: do not load the third-party script at all.
        <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 text-sm text-muted">
          <p className="leading-relaxed mb-4">
            Accept marketing cookies to view Klook experiences. The widget is a third-party Klook
            embed that sets marketing cookies, so we only load it once you have agreed. You can
            also browse Klook directly using our link.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={openCookieSettings}
              className="inline-block border border-stone-300 text-foreground font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-surface transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Cookie settings
            </button>
            <BrowseKlookButton href={affiliateUrl} />
          </div>
        </div>
      ) : scriptFailed ? (
        // Consent given but the Klook loader script could not load, usually
        // because affiliate widgets are blocked by an ad blocker or privacy
        // extension. Presented as a helpful prompt, not an error.
        <div className="rounded-xl border border-stone-200 bg-white p-5 sm:p-6 text-sm text-muted">
          <p className="leading-relaxed mb-4">
            Klook experiences may not appear if affiliate widgets are blocked in your browser. You
            can still browse Klook directly using our link.
          </p>
          <BrowseKlookButton href={affiliateUrl} />
        </div>
      ) : (
        <>
          {/* The container is rendered first so the widget element exists in the
              DOM before the Klook loader runs and looks for it. */}
          <div
            className="w-full overflow-hidden rounded-xl min-h-[300px]"
            dangerouslySetInnerHTML={{ __html: KLOOK_WIDGET_HTML }}
          />
          {/* next/script dedupes by id and src, so the loader runs only once,
              even across re-renders or client-side navigations. */}
          <Script
            id="klook-aff-widget"
            src={KLOOK_WIDGET_SCRIPT}
            strategy="afterInteractive"
            onError={() => setScriptFailed(true)}
          />
        </>
      )}
    </section>
  )
}
