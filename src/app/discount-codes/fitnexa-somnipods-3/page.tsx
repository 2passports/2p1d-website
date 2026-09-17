import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { brandPageMetadata } from '../_lib/metadata'
import { fitnexaSomnipods3 as data } from '../_data/brand-pages'

export const metadata: Metadata = brandPageMetadata(data)

export default function FitnexaSomniPods3Page() {
  return <BrandPage data={data} />
}
