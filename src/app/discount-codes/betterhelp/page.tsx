import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { betterhelp as data } from '../_data/brand-pages'

export const metadata: Metadata = {
  title: data.seoTitle,
  description: data.seoDescription,
}

export default function BetterHelpPage() {
  return <BrandPage data={data} />
}
