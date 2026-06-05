import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { founderscard as data } from '../_data/brand-pages'

export const metadata: Metadata = {
  // absolute so the layout title template does not append the brand again
  title: { absolute: data.seoTitle },
  description: data.seoDescription,
  alternates: { canonical: '/discount-codes/founderscard' },
}

export default function FoundersCardPage() {
  return <BrandPage data={data} />
}
