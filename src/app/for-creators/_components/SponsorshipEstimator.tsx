'use client'

/**
 * SponsorshipEstimator
 * An illustrative CPM example, not an Agentio rate card. The value is simply
 * median views / 1,000 x CPM. Slider styles live in globals.css under
 * "SPONSORSHIP ESTIMATOR".
 *
 * The slider runs over positions in VIEW_STEPS rather than raw view counts,
 * so the range can reach 25M while the lower values keep fine steps instead
 * of being squeezed into the first sliver of the track.
 */

import { useId, useState, type CSSProperties } from 'react'

// Each band runs from just above the previous band's end up to its own end.
const VIEW_BANDS = [
  { to: 100_000, step: 5_000 },
  { to: 500_000, step: 25_000 },
  { to: 1_000_000, step: 50_000 },
  { to: 5_000_000, step: 500_000 },
  { to: 25_000_000, step: 1_000_000 },
]

const VIEW_STEPS: number[] = [5_000]
for (const { to, step } of VIEW_BANDS) {
  for (let v = VIEW_STEPS[VIEW_STEPS.length - 1] + step; v <= to; v += step) {
    VIEW_STEPS.push(v)
  }
}

const LAST_INDEX = VIEW_STEPS.length - 1
const DEFAULT_INDEX = VIEW_STEPS.indexOf(50_000)

const CPM_OPTIONS = [15, 20, 25, 30, 35]
const DEFAULT_CPM = 25

const formatNumber = (n: number) => n.toLocaleString('en-GB')

// Trims trailing zeros, so 2,500,000 becomes 2.5 and 1,000,000 becomes 1.
const trim = (n: number) => String(Number(n.toFixed(1)))

// Compact display: 5K, 500K, 1M, 2.5M, 25M.
const formatCompact = (n: number) =>
  n >= 1_000_000 ? `${trim(n / 1_000_000)}M` : `${trim(n / 1_000)}K`

// Spoken form for screen readers: "50,000" or "2.5 million".
const formatSpoken = (n: number) =>
  n >= 1_000_000 ? `${trim(n / 1_000_000)} million` : formatNumber(n)
const formatDollars = (n: number) => `$${Math.round(n).toLocaleString('en-GB')}`

export default function SponsorshipEstimator() {
  const [index, setIndex] = useState(DEFAULT_INDEX)
  const [cpm, setCpm] = useState(DEFAULT_CPM)
  const sliderId = useId()

  const views = VIEW_STEPS[index]
  const estimatedCampaignValue = (views / 1000) * cpm
  // How far along the track the thumb sits, used to fill the track in coral.
  const fill = (index / LAST_INDEX) * 100

  return (
    <div className="bg-surface rounded-3xl border border-[#F0DDB0] shadow-sm p-6 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">

        {/* Controls */}
        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-4">
            <label htmlFor={sliderId} className="font-semibold text-primary">
              Estimated median views per video
            </label>
            <p className="text-right tabular-nums leading-tight" aria-hidden="true">
              <span className="block text-2xl font-bold text-primary">
                {formatCompact(views)} views
              </span>
              <span className="block text-xs text-muted">{formatNumber(views)}</span>
            </p>
          </div>

          <input
            id={sliderId}
            type="range"
            min={0}
            max={LAST_INDEX}
            step={1}
            value={index}
            onChange={(e) => setIndex(Number(e.target.value))}
            aria-valuetext={`${formatSpoken(views)} estimated median views, estimated campaign value ${formatDollars(estimatedCampaignValue)} at a $${cpm} CPM`}
            className="estimator-range w-full"
            style={{ '--fill': `${fill}%` } as CSSProperties}
          />
          <div className="flex justify-between text-xs text-muted mt-2 tabular-nums" aria-hidden="true">
            <span>{formatCompact(VIEW_STEPS[0])}</span>
            <span>{formatCompact(VIEW_STEPS[LAST_INDEX])}</span>
          </div>

          {/* Illustrative CPM. Native radios kept for keyboard and screen
              reader support, styled as pills. */}
          <fieldset className="mt-7">
            <legend className="font-semibold text-primary mb-3">Illustrative CPM</legend>
            <div className="flex flex-wrap gap-2">
              {CPM_OPTIONS.map((option) => (
                <label key={option} className="cursor-pointer">
                  <input
                    type="radio"
                    name="cpm"
                    value={option}
                    checked={cpm === option}
                    onChange={() => setCpm(option)}
                    className="peer sr-only"
                  />
                  <span className="inline-flex items-center justify-center min-w-[3.5rem] min-h-[2.75rem] px-4 rounded-full border text-sm font-semibold transition-colors border-stone-200 bg-white text-primary hover:border-accent peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                    ${option}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Result */}
        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-6 sm:p-7 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-1">
            At an illustrative ${cpm} CPM
          </p>
          <p className="text-sm text-muted mb-3">Estimated campaign value:</p>
          <p className="text-4xl sm:text-5xl font-bold tracking-tight text-accent-dark tabular-nums">
            {formatDollars(estimatedCampaignValue)}
          </p>
          <p className="text-xs text-muted mt-3 tabular-nums">
            {formatNumber(views)} views &divide; 1,000 &times; ${cpm}
          </p>
        </div>

      </div>

      <div className="mt-8 pt-6 border-t border-[#F0DDB0] space-y-2">
        <p className="text-sm text-foreground leading-relaxed">
          This is a simple illustrative estimate, not a guaranteed Agentio rate or campaign value.
          Actual sponsorship pricing varies by brand, campaign, audience, content requirements,
          performance and marketplace demand.
        </p>
        <p className="text-sm text-muted leading-relaxed">
          Agentio campaigns can use bidding and performance-based pricing, such as pricing based
          on the views a video is expected to get in its first 30 days, so actual rates may differ.
        </p>
      </div>
    </div>
  )
}
