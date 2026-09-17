import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { brandPageMetadata } from '../_lib/metadata'
import { KlookWidget } from '../_components/KlookWidget'
import { klook as data } from '../_data/brand-pages'

export const metadata: Metadata = brandPageMetadata(data)

export default function KlookPage() {
  return (
    <BrandPage
      data={data}
      bottomSlot={<KlookWidget affiliateUrl={data.affiliateUrl} />}
    />
  )
}
