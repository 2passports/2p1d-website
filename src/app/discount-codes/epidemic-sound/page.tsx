import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { brandPageMetadata } from '../_lib/metadata'
import { epidemicSound as data } from '../_data/brand-pages'

export const metadata: Metadata = brandPageMetadata(data)

export default function EpidemicSoundPage() {
  return <BrandPage data={data} />
}
