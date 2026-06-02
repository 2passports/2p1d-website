'use client'

import { openCookieSettings } from './CookieConsent'

// Small footer control that lets visitors reopen the cookie banner and change
// their analytics/marketing choice.
export default function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={openCookieSettings}
      className="hover:text-accent transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      Cookie settings
    </button>
  )
}
