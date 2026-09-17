import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { brandPageMetadata } from '../_lib/metadata'
import { ultrahuman as data } from '../_data/brand-pages'

export const metadata: Metadata = brandPageMetadata(data)

export default function UltrahumanPage() {
  return <BrandPage data={data} />
}
