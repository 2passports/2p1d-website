'use client'

import { useCallback, useSyncExternalStore } from 'react'
import Script from 'next/script'

// Cookie consent + analytics loader for a UK-based site (PECR/UK GDPR friendly).
//
// How it works:
//   - Optional cookies (analytics + marketing) do NOT load until the visitor
//     accepts them. Rejecting keeps them off.
//   - Analytics (GA4) and marketing (Meta Pixel) scripts only ever load in a
//     production build AND only when the matching consent has been given AND
//     only when the relevant environment variable is set.
//   - The choice is stored in localStorage so the banner does not reappear.
//     Consent state is read with useSyncExternalStore so it stays in sync
//     across tabs and avoids hydration issues.
//
// Environment variables (none are hard-coded here):
//   NEXT_PUBLIC_GA_MEASUREMENT_ID  e.g. G-XXXXXXXXXX   (Google Analytics 4)
//   NEXT_PUBLIC_META_PIXEL_ID      e.g. 1234567890     (Meta Pixel)

type Consent = { analytics: boolean; marketing: boolean }

const STORAGE_KEY = '2p1d-cookie-consent'

// Minimal external store over localStorage so consent can be read during
// render without setting state inside an effect.
const listeners = new Set<() => void>()

function subscribe(callback: () => void) {
  listeners.add(callback)
  window.addEventListener('storage', callback)
  return () => {
    listeners.delete(callback)
    window.removeEventListener('storage', callback)
  }
}

function getSnapshot(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function getServerSnapshot(): string | null {
  return null
}

function persistConsent(consent: Consent) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent))
  } catch {
    // Ignore storage errors (for example private browsing); consent then
    // applies for this page view only.
  }
  listeners.forEach((listener) => listener())
}

// Clears the stored choice so the banner shows again. Used by the footer
// "Cookie settings" link so visitors can change their mind.
export function openCookieSettings() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  listeners.forEach((listener) => listener())
}

function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<Consent>
    if (typeof parsed.analytics === 'boolean' && typeof parsed.marketing === 'boolean') {
      return { analytics: parsed.analytics, marketing: parsed.marketing }
    }
  } catch {
    // fall through
  }
  return null
}

export default function CookieConsent() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const consent = parseConsent(raw)
  const saveChoice = useCallback((next: Consent) => persistConsent(next), [])

  const isProduction = process.env.NODE_ENV === 'production'
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  const loadAnalytics = isProduction && Boolean(gaId) && consent?.analytics === true
  const loadMarketing = isProduction && Boolean(pixelId) && consent?.marketing === true
  const showBanner = consent === null

  return (
    <>
      {/* Google Analytics 4: loads only in production, after analytics consent */}
      {loadAnalytics && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
          </Script>
        </>
      )}

      {/* Meta Pixel: loads only in production, after marketing consent */}
      {loadMarketing && (
        <Script id="meta-pixel-init" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
fbq('track', 'PageView');`}
        </Script>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6"
        >
          <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-stone-200 p-5 sm:p-6">
            <h2 className="text-sm font-bold text-primary mb-2">We use cookies</h2>
            <p className="text-sm text-muted leading-relaxed">
              We use cookies to understand site performance and improve our content. You can accept
              optional analytics and marketing cookies, or reject them. Essential cookies needed for
              the site to work are always on.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:justify-end">
              <button
                type="button"
                onClick={() => saveChoice({ analytics: false, marketing: false })}
                className="order-2 sm:order-1 border border-stone-300 text-foreground font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-surface transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Reject optional
              </button>
              <button
                type="button"
                onClick={() => saveChoice({ analytics: true, marketing: true })}
                className="order-1 sm:order-2 bg-accent text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-accent-dark transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
