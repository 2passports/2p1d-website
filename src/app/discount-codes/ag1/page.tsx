import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { ag1 as data } from '../_data/brand-pages'

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.seoDescription,
}

export default function AG1Page() {
  return <BrandPage data={data} />
}
