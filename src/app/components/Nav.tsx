'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/discount-codes', label: 'Discount Codes' },
  { href: '/work-with-us', label: 'Work With Us' },
]

export default function Nav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-sm border-b border-[#F0DDB0] shadow-sm"
      style={{ background: 'rgba(255, 250, 238, 0.93)' }}
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight shrink-0 text-primary">
          2Passports<span className="text-accent">1Dream</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`transition-colors hover:text-accent ${
                pathname === href ? 'text-accent' : 'text-primary/80'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg hover:bg-[#FFD166]/25 transition-colors"
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" fill="none" stroke="#174E5D" strokeWidth="2" strokeLinecap="round">
            {open ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          className="md:hidden border-t border-[#F0DDB0] px-4 pb-4"
          style={{ background: 'rgba(255, 250, 238, 0.98)' }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block py-3 text-sm font-medium border-b border-[#F0DDB0] last:border-0 transition-colors hover:text-accent ${
                pathname === href ? 'text-accent' : 'text-primary/80'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
