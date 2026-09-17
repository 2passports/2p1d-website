import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { brandPageMetadata } from '../_lib/metadata'
import { level8 as data } from '../_data/brand-pages'

export const metadata: Metadata = brandPageMetadata(data)

export default function Level8Page() {
  return <BrandPage data={data} />
}
