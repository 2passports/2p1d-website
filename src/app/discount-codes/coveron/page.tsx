import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { coveron as data } from '../_data/brand-pages'

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.seoDescription,
}

export default function CoveronPage() {
  return <BrandPage data={data} />
}
