'use client'

import { useState } from 'react'

type Props = {
  code: string
  // dark: true when rendered on a dark hero background (white text, no fill)
  dark?: boolean
}

export function CopyCodeButton({ code, dark = false }: Props) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      // Fallback for browsers where clipboard API is unavailable
      const el = document.createElement('textarea')
      el.value = code
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.focus()
      el.select()
      try { document.execCommand('copy') } catch { /* silent */ }
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  if (dark) {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy discount code ${code}`}
        className="group block w-full text-left cursor-pointer rounded-lg py-1 hover:bg-white/10 transition-all duration-150"
      >
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-1.5">
          Use code
        </p>
        <p className="font-mono text-2xl font-bold tracking-widest text-white break-all">
          {code}
        </p>
        <p
          className={`text-[10px] mt-1.5 transition-colors ${copied ? 'text-white' : 'text-white/40'}`}
          aria-live="polite"
        >
          {copied ? 'Copied!' : 'Click to copy'}
        </p>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy discount code ${code}`}
      className="group block w-full text-left rounded-xl bg-[#FFF9EF] border border-[#F0DDB0] hover:border-accent/60 hover:bg-white cursor-pointer transition-all duration-150 p-3.5"
    >
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted mb-1.5">
        Use code
      </p>
      <p className="font-mono text-base font-bold text-primary tracking-widest break-all mb-1">
        {code}
      </p>
      <p
        className={`text-[10px] transition-colors ${copied ? 'text-[#4a7a44] font-semibold' : 'text-muted group-hover:text-accent'}`}
        aria-live="polite"
      >
        {copied ? 'Copied!' : 'Click to copy'}
      </p>
    </button>
  )
}
