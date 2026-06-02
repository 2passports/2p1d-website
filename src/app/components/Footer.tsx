import Link from 'next/link'
import CookieSettingsLink from './CookieSettingsLink'

export default function Footer() {
  return (
    <footer className="bg-primary text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          <div>
            <p className="font-bold text-lg mb-3">
              2Passports<span className="text-accent">1Dream</span>
            </p>
            <p className="text-sm text-white/70 leading-relaxed">
              Adriana and Dylan are a travel-loving couple from Sweden and Wales. We share honest
              travel experiences through YouTube videos, destination guides and travel tips.
            </p>
          </div>

          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Quick Links
            </p>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li><Link href="/" className="hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">About</Link></li>
              <li><Link href="/discount-codes" className="hover:text-accent transition-colors">Discount Codes</Link></li>
              <li><Link href="/discount-codes/klook" className="hover:text-accent transition-colors">Klook Discount Code</Link></li>
              <li><Link href="/work-with-us" className="hover:text-accent transition-colors">Work With Us</Link></li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Follow Us
            </p>
            <ul className="space-y-2.5 text-sm text-white/80 mb-6">
              <li>
                <a
                  href="https://www.youtube.com/@2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/2passports1dream"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>

            <p className="font-semibold text-sm uppercase tracking-wider text-white/50 mb-4">
              Support the Channel
            </p>
            <a
              href="https://buymeacoffee.com/2p1d/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-accent transition-colors"
            >
              Buy Us a Coffee
            </a>
          </div>

        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} 2Passports1Dream. All rights reserved.</p>
          <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
          <CookieSettingsLink />
        </div>
      </div>
    </footer>
  )
}
