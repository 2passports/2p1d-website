'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { useMarketingConsent } from './CookieConsent'

// Klaviyo onsite tracking and signup forms, loaded site-wide from the root
// layout so every route gets it without any page opting in.
//
// CONSENT MODEL:
//   klaviyo.js loads for every visitor so that signup forms always work, but
//   Klaviyo's own __kla_off flag is set before it initialises, which keeps
//   behavioural tracking and visitor identification off until marketing consent
//   is given. Klaviyo documents __kla_off as the supported way to "maintain
//   Klaviyo JavaScript but remove a cookie", and states that forms continue to
//   appear whether tracking is on or off.
//
//   This is deliberately NOT how GA4 and the Meta Pixel work. Those stay fully
//   gated in CookieConsent.tsx and do not load at all without consent, because
//   neither has any user-facing function worth preserving.
//
// COMPANY ID:
//   Klaviyo puts this identifier in the script URL that every visitor's browser
//   requests, so it is a public value rather than a secret. It is kept here
//   exactly as issued.
const KLAVIYO_COMPANY_ID = 'Rz68mJ'

// Must match STORAGE_KEY in CookieConsent.tsx. It is repeated here rather than
// imported because the flag script below is a plain string that runs before any
// module is loaded, so it cannot import anything. If that key is ever changed,
// change it here too, otherwise this falls back to tracking disabled.
const CONSENT_STORAGE_KEY = '2p1d-cookie-consent'

// Runs during HTML parsing, before hydration and therefore before next/script
// injects and executes klaviyo.js. It reads the stored choice straight from
// localStorage so it never has to wait for React. Tracking stays off unless
// marketing consent is explicitly true, so a parse or storage failure fails
// closed rather than open.
const KLAVIYO_CONSENT_FLAG = `(function(){function setFlag(on){var s=location.protocol==='https:'?';Secure':'';document.cookie=on?'__kla_off=;path=/;max-age=0'+s:'__kla_off=true;path=/;max-age=31536000;SameSite=Lax'+s}try{var raw=window.localStorage.getItem('${CONSENT_STORAGE_KEY}');var consented=false;if(raw){var parsed=JSON.parse(raw);consented=!!parsed&&parsed.marketing===true}setFlag(consented)}catch(e){setFlag(false)}})();`

// Klaviyo's own initialisation snippet, unmodified. It creates a queue so that
// any klaviyo.* calls made before klaviyo.js has finished downloading are
// replayed once it arrives. The leading if(!window.klaviyo) guard means a
// second execution would be a no-op.
const KLAVIYO_INIT = `!function(){if(!window.klaviyo){window._klOnsite=window._klOnsite||[];try{window.klaviyo=new Proxy({},{get:function(n,i){return"push"===i?function(){var n;(n=window._klOnsite).push.apply(n,arguments)}:function(){for(var n=arguments.length,o=new Array(n),w=0;w<n;w++)o[w]=arguments[w];var t="function"==typeof o[o.length-1]?o.pop():void 0,e=new Promise((function(n){window._klOnsite.push([i].concat(o,[function(i){t&&t(i),n(i)}]))}));return e}}})}catch(n){window.klaviyo=window.klaviyo||[],window.klaviyo.push=function(){var n;(n=window._klOnsite).push.apply(n,arguments)}}}}();`

export default function KlaviyoOnsite() {
  const marketingConsent = useMarketingConsent()

  // Keeps the flag in step when the visitor accepts or rejects during this page
  // view. The inline script above already covered the initial page load, so
  // this only matters for a change made after that. Klaviyo reads the flag when
  // it initialises, so tracking begins on the next page view rather than
  // immediately.
  useEffect(() => {
    const secure = location.protocol === 'https:' ? ';Secure' : ''
    document.cookie = marketingConsent
      ? `__kla_off=;path=/;max-age=0${secure}`
      : `__kla_off=true;path=/;max-age=31536000;SameSite=Lax${secure}`
  }, [marketingConsent])

  // Always rendered, so forms work for every visitor. Each script carries an
  // id, so next/script loads and runs it only once across the whole app,
  // including client-side navigations between routes.
  return (
    <>
      <Script id="klaviyo-consent-flag" strategy="beforeInteractive">
        {KLAVIYO_CONSENT_FLAG}
      </Script>
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
