import { ImageResponse } from 'next/og'

// On-brand social share image, generated at build time. 1200x630 is the
// standard Open Graph and Twitter large-card size.
export const alt = '2Passports1Dream travel videos, guides and discount codes'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 80,
          background:
            'linear-gradient(145deg, #ddf2fb 0%, #fff9ef 55%, #fff2d8 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            letterSpacing: 8,
            fontWeight: 700,
            textTransform: 'uppercase',
            color: '#E76F51',
          }}
        >
          Adriana and Dylan
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 92,
            fontWeight: 800,
            color: '#174E5D',
            marginTop: 20,
          }}
        >
          2Passports1Dream
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 36,
            color: '#243238',
            marginTop: 28,
            maxWidth: 900,
            textAlign: 'center',
          }}
        >
          Honest travel videos, guides and discount codes from the road
        </div>
      </div>
    ),
    { ...size }
  )
}
