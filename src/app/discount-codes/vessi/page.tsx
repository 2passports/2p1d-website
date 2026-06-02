import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { vessi as data } from '../_data/brand-pages'

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.seoDescription,
}

export default function VessiPage() {
  return <BrandPage data={data} />
}
