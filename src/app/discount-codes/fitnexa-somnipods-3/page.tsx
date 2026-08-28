import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { fitnexaSomnipods3 as data } from '../_data/brand-pages'

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.seoDescription,
}

export default function FitnexaSomniPods3Page() {
  return <BrandPage data={data} />
}
