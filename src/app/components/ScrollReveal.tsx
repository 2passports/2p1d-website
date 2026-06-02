'use client'

/**
 * ScrollReveal
 * Wraps children in a div that fades up into view when it enters the
 * viewport. CSS classes are defined in globals.css under "SCROLL REVEAL".
 * To disable on a section: remove the <ScrollReveal> wrapper in page.tsx.
 */

import { useEffect, useRef, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

export default function ScrollReveal({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('revealed')
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const reveal = () => el.classList.add('revealed')
          if (delay > 0) {
            setTimeout(reveal, delay)
          } else {
            reveal()
          }
          observer.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -44px 0px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`reveal ${className}`.trim()}>
      {children}
    </div>
  )
}
