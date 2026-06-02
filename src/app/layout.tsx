import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import CookieConsent from "./components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://2passports1dream.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "2Passports1Dream | Travel Videos, Guides and Discount Codes",
    template: "%s | 2Passports1Dream",
  },
  description:
    "Join Adriana and Dylan from 2Passports1Dream for honest travel videos, destination guides, cruise adventures, food finds, hotel stays and useful discount codes from the road.",
  applicationName: "2Passports1Dream",
  keywords: [
    "2Passports1Dream",
    "Adriana and Dylan",
    "travel videos",
    "YouTube travel creators",
    "travel guides",
    "discount codes",
    "cruises",
    "America travel",
    "food and hotels",
  ],
  authors: [{ name: "Adriana and Dylan" }],
  creator: "2Passports1Dream",
  publisher: "2Passports1Dream",
  openGraph: {
    type: "website",
    siteName: "2Passports1Dream",
    locale: "en_GB",
    url: siteUrl,
    title: "2Passports1Dream | Travel Videos, Guides and Discount Codes",
    description:
      "Join Adriana and Dylan from 2Passports1Dream for honest travel videos, destination guides, cruise adventures, food finds, hotel stays and useful discount codes from the road.",
  },
  twitter: {
    card: "summary_large_image",
    title: "2Passports1Dream | Travel Videos, Guides and Discount Codes",
    description:
      "Honest travel videos, destination guides, cruise adventures, food and hotel finds and useful discount codes from Adriana and Dylan.",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // Google Search Console verification. The token comes from the
  // GOOGLE_SITE_VERIFICATION environment variable; if it is unset, Next omits
  // the meta tag entirely. Paste the token Google gives you into that variable.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
