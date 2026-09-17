import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { brandPageMetadata } from '../_lib/metadata'
import { vessi as data } from '../_data/brand-pages'

export const metadata: Metadata = brandPageMetadata(data)

export default function VessiPage() {
  return <BrandPage data={data} />
}
