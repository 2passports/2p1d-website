'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { CollageImage } from './PhotoGrid'

const INSTAGRAM_URL = 'https://www.instagram.com/2passports1dream'

// Same layout as PhotoGrid: 2 columns on mobile, 3 from `sm`, so 6 slots
// always fill complete rows.
const DISPLAY_COUNT = 6

// One slot changes every MIN_DELAY to MAX_DELAY milliseconds.
const MIN_DELAY = 4000
const MAX_DELAY = 6000
const FADE_MS = 1000

const SIZES = '(max-width: 640px) 50vw, 33vw'

// Each slot has two stacked image layers. The active layer sits on top. To
// change photo, the new one is loaded into the hidden layer underneath, and
// once it has loaded it becomes the active layer and fades in over the old
// one. Reusing the same two <img> elements avoids remounting, so there is no
// flicker and never more than 12 images in the DOM.
type Slot = {
  layers: [number | null, number | null] // indexes into the image pool
  active: 0 | 1
  loading: boolean // the inactive layer holds a new photo still downloading
}

function randomDelay() {
  return MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY)
}

// Random order of every pool index. Only ever called in the browser (from an
// effect), never during server rendering, so it cannot cause a hydration
// mismatch.
function shuffledIndexes(length: number): number[] {
  const order = Array.from({ length }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

export default function RotatingPhotoGrid({
  images,
  count = DISPLAY_COUNT,
}: {
  images: CollageImage[]
  count?: number
}) {
  const visibleCount = Math.min(count, images.length)

  // The server render (and the matching first client render) shows the six
  // tiles empty, at their full size with the usual background, so there is no
  // layout shift and no photo is downloaded only to be swapped out. Once
  // mounted, a random set of six is chosen below.
  const [slots, setSlots] = useState<Slot[]>(() =>
    Array.from({ length: visibleCount }, () => ({ layers: [null, null], active: 0, loading: false })),
  )
  const orderRef = useRef<number[]>([]) // rotation order, set on mount
  const slotsRef = useRef(slots)
  useEffect(() => {
    slotsRef.current = slots
  }, [slots])

  const cursorRef = useRef(0) // position in the rotation order
  const slotQueueRef = useRef<number[]>([])
  const lastSlotRef = useRef(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Pick six random unique photos for this page load. The rest of the pool,
  // in random order, becomes the rotation queue, with the starting six at
  // the end so they come round again only after everything else has shown.
  useEffect(() => {
    const order = shuffledIndexes(images.length)
    const initial = order.slice(0, visibleCount)
    orderRef.current = [...order.slice(visibleCount), ...initial]
    cursorRef.current = 0
    const initialSlots: Slot[] = initial.map((idx) => ({ layers: [idx, null], active: 0, loading: false }))
    slotsRef.current = initialSlots
    // Deliberate: this value must differ from the server render, so it can
    // only be set after mounting. It is a single one-off update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlots(initialSlots)
  }, [images.length, visibleCount])

  const [onScreen, setOnScreen] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(true) // assume reduced until checked in the browser

  // Respect prefers-reduced-motion, including if it changes while open.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  // Only rotate while the grid is on (or near) screen, so a visitor who never
  // scrolls down never downloads any extra photos.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      rootMargin: '200px 0px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Pause while the tab is in the background.
  useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === 'visible')
    update()
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  const ready = slots.length > 0 && slots.every((s) => s.layers[s.active] !== null)
  const rotating = ready && !reducedMotion && onScreen && pageVisible && images.length > visibleCount

  useEffect(() => {
    if (!rotating) return
    const order = orderRef.current
    let timer: ReturnType<typeof setTimeout>

    // Work through every slot in a shuffled order before repeating, so all
    // six positions get refreshed and the same slot never changes twice in
    // a row.
    const pickSlot = () => {
      if (slotQueueRef.current.length === 0) {
        const queue = Array.from({ length: visibleCount }, (_, i) => i)
        for (let i = queue.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[queue[i], queue[j]] = [queue[j], queue[i]]
        }
        if (queue[0] === lastSlotRef.current && queue.length > 1) queue.push(queue.shift()!)
        slotQueueRef.current = queue
      }
      const slot = slotQueueRef.current.shift()!
      lastSlotRef.current = slot
      return slot
    }

    const tick = () => {
      timer = setTimeout(tick, randomDelay())
      const current = slotsRef.current

      // Only one change at a time: wait if a photo is still loading.
      if (current.some((s) => s.loading)) return

      // Every photo in either layer of any slot is off limits, so the same
      // photo can never appear in two slots at once (even mid-fade).
      const inUse = new Set<number>()
      current.forEach((s) => s.layers.forEach((idx) => idx !== null && inUse.add(idx)))

      let next = -1
      for (let tries = 0; tries < order.length; tries++) {
        const idx = order[cursorRef.current % order.length]
        cursorRef.current = (cursorRef.current + 1) % order.length
        if (!inUse.has(idx)) {
          next = idx
          break
        }
      }
      if (next === -1) return

      const slotIndex = pickSlot()
      const updated = current.map((s, i) => {
        if (i !== slotIndex) return s
        const layers: Slot['layers'] = [...s.layers]
        layers[s.active === 0 ? 1 : 0] = next
        return { ...s, layers, loading: true }
      })
      slotsRef.current = updated
      setSlots(updated)
    }

    timer = setTimeout(tick, randomDelay())
    return () => clearTimeout(timer)
  }, [rotating, images.length, visibleCount])

  // The new photo has downloaded: bring its layer to the front, which fades
  // it in over the previous photo.
  const handleLoad = (slotIndex: number, layer: 0 | 1) => {
    setSlots((prev) =>
      prev.map((s, i) => (i === slotIndex && s.loading && s.active !== layer ? { ...s, active: layer, loading: false } : s)),
    )
  }

  // If a photo fails to load, drop it and keep showing the current one.
  const handleError = (slotIndex: number, layer: 0 | 1) => {
    setSlots((prev) =>
      prev.map((s, i) => {
        if (i !== slotIndex || !s.loading || s.active === layer) return s
        const layers: Slot['layers'] = [...s.layers]
        layers[layer] = null
        return { ...s, layers, loading: false }
      }),
    )
  }

  return (
    <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {slots.map((slot, slotIndex) => (
        <a
          key={slotIndex}
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow 2Passports1Dream on Instagram"
          className="group relative rounded-2xl overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-lg hover:brightness-105 transition-all duration-300 bg-stone-100"
        >
          <div className="relative aspect-[4/5]">
            {slot.layers.map((imageIndex, layerIndex) => {
              if (imageIndex === null) return null
              const layer = layerIndex as 0 | 1
              const img = images[imageIndex]
              const isActive = slot.active === layer
              // The hidden layer stays opaque underneath (covered by the
              // active one) except while a new photo is loading into it, so
              // that it starts from transparent when it comes to the front.
              const hiddenLoading = !isActive && slot.loading
              return (
                <Image
                  key={layer}
                  src={img.src}
                  alt={isActive ? img.alt : ''}
                  aria-hidden={isActive ? undefined : true}
                  fill
                  sizes={SIZES}
                  onLoad={() => handleLoad(slotIndex, layer)}
                  onError={() => handleError(slotIndex, layer)}
                  className={`object-cover group-hover:scale-105 ${hiddenLoading ? 'opacity-0' : 'opacity-100'}`}
                  style={{
                    objectPosition: img.objectPosition ?? 'center center',
                    zIndex: isActive ? 1 : 0,
                    transition: `opacity ${hiddenLoading ? 0 : FADE_MS}ms ease-in-out, transform 300ms`,
                  }}
                />
              )
            })}
          </div>
        </a>
      ))}
    </div>
  )
}
