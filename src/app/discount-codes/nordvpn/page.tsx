import type { Metadata } from 'next'
import { BrandPage } from '../_components/BrandPage'
import { nordvpn as data } from '../_data/brand-pages'

export const metadata: Metadata = {
  // absolute so the layout title template does not append the brand again
  title: { absolute: data.seoTitle },
  description: data.seoDescription,
}

export default function NordVpnPage() {
  return <BrandPage data={data} />
}
