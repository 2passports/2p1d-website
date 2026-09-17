import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { brandPageMetadata } from '../_lib/metadata'
import { ag1 as data } from '../_data/brand-pages'

export const metadata: Metadata = brandPageMetadata(data)

export default function AG1Page() {
  return <BrandPage data={data} />
}
