import type { OfferStatus } from '../../data/discount-codes'

// Replaces the code and offer card when an offer is paused or ended, so an old
// code is never presented as usable. The page itself stays live.
export function OfferUnavailableNotice({
  status,
  name,
  dark = false,
  className = '',
}: {
  status: Extract<OfferStatus, 'paused' | 'ended'>
  name: string
  dark?: boolean
  className?: string
}) {
  const heading =
    status === 'ended' ? `This ${name} offer has ended` : `This ${name} offer is temporarily unavailable`
  const body =
    status === 'ended'
      ? 'We no longer have an active code or link offer for this brand. We have kept this page so you can see what the offer was.'
      : 'The offer is paused for now. We will update this page if it becomes available again.'

  return (
    <div
      role="status"
      className={`rounded-2xl px-6 py-5 ${
        dark ? 'bg-white/10 border border-white/20' : 'bg-[#FFF9EF] border border-[#F0DDB0]'
      } ${className}`}
    >
      <p className={`font-bold text-sm mb-1 ${dark ? 'text-white' : 'text-foreground'}`}>{heading}</p>
      <p className={`text-xs leading-relaxed ${dark ? 'text-white/70' : 'text-muted'}`}>{body}</p>
    </div>
  )
}
