import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { ultrahuman as data } from '../_data/brand-pages'

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.seoDescription,
}

export default function UltrahumanPage() {
  return <BrandPage data={data} />
}
