// Short, practical help for when a code or link offer does not apply. The
// wording stays general so it never adds restrictions that are not confirmed
// for a specific brand.
const codeSteps = [
  'Check the code is spelt exactly as shown, including capital letters. The copy button helps avoid typos.',
  'Make sure you entered it in the discount or promo code field at checkout.',
  'Check the offer applies to the product or plan you have chosen.',
  'Check whether the offer is for new customers only.',
  'Try starting again through our offer link.',
  'Some offers are region-specific or time-limited, so check the terms on the brand’s website.',
]

const linkSteps = [
  'No manual code is needed. The offer should be applied when you arrive through our link.',
  'Try starting again through our offer link and check the price before paying.',
  'Ad blockers or strict privacy settings can sometimes stop link offers from applying.',
  'Check the offer applies to the product or plan you have chosen.',
  'Some offers are for new customers only, region-specific or time-limited, so check the terms on the brand’s website.',
]

export function OfferTroubleshooting({ hasCode }: { hasCode: boolean }) {
  const steps = hasCode ? codeSteps : linkSteps
  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {hasCode ? 'If the discount code does not work' : 'If the offer does not apply'}
      </h2>
      <ul className="space-y-2.5">
        {steps.map((step) => (
          <li key={step} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 mt-2" />
            {step}
          </li>
        ))}
      </ul>
    </section>
  )
}
