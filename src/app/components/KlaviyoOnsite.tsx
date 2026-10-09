'use client'

import Script from 'next/script'
import { useMarketingConsent } from './CookieConsent'

// Klaviyo onsite tracking and signup forms, loaded site-wide from the root
// layout so every route gets it without any page opting in.
//
// CONSENT:
//   Klaviyo sets its own cookies and tracks onsite behaviour, so it is treated
//   as a marketing script and loads only once the visitor has accepted
//   marketing cookies. This matches how the Meta Pixel is already gated in
//   CookieConsent.tsx. Rejecting optional cookies keeps Klaviyo off entirely,
//   and clearing the choice via the footer "Cookie settings" link unloads it on
//   the next page view.
//
//   Do not replace this with Klaviyo's __kla_off flag to let signup forms load
//   before consent. That was tried and tested in October 2026: with
//   __kla_off=true set before klaviyo.js initialised, the __kla_id identifying
//   cookie was still written on a fresh visit. __kla_off suppresses event
//   collection, not the cookie, so blocking the script is the only way to keep
//   Klaviyo cookies off until consent. The cost is that signup forms cannot
//   appear until marketing cookies are accepted.
//
// COMPANY ID:
//   Klaviyo puts this identifier in the script URL that every visitor's browser
//   requests, so it is a public value rather than a secret. It is kept here
//   exactly as issued.
const KLAVIYO_COMPANY_ID = 'Rz68mJ'

// Klaviyo's own initialisation snippet, unmodified. It creates a queue so that
// any klaviyo.* calls made before klaviyo.js has finished downloading are
// replayed once it arrives. The leading if(!window.klaviyo) guard means a
// second execution would be a no-op.
const KLAVIYO_INIT = `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`

export default function KlaviyoOnsite() {
  const marketingConsent = useMarketingConsent()

  if (!marketingConsent) return null

  // Both scripts carry an id, so next/script loads and runs each one only once
  // across the whole app, including client-side navigations between routes.
  // afterInteractive keeps them off the critical rendering path.
  return (
    <>
      <Script
        id="klaviyo-onsite"
        src={`https://static.klaviyo.com/onsite/js/${KLAVIYO_COMPANY_ID}/klaviyo.js?company_id=${KLAVIYO_COMPANY_ID}`}
        strategy="afterInteractive"
      />
      <Script id="klaviyo-init" strategy="afterInteractive">
        {KLAVIYO_INIT}
      </Script>
    </>
  )
}
