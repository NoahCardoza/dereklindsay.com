import type { Metadata } from 'next'
import Script from 'next/script'
import { SpotifyPlayerProvider } from "@/providers/SpotifyPlayer";
import './globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const metadata: Metadata = { 
  title: 'derek lindsay',
  description: 'Derek Lindsay is an audio/visual artist interested in exploring the intersection between humanity, art, and nature.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'derek lindsay',
    images: [
      {
        url: 'https://media.licdn.com/dms/image/D5603AQG3wmh1W_6G6g/profile-displayphoto-shrink_800_800/0/1689728168421?e=1709769600&v=beta&t=-cG66DHHSd-X4Hnt-VsUhGJRpc51DkuzV_8M6reU_j8',
        width: 800,
        height: 800,
        alt: 'derek lindsay',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {

  return (
    <html lang="en">
      <body className="root">
        <SpotifyPlayerProvider>
          {children}
        </SpotifyPlayerProvider>
      </body>
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
    </html>
  )
}
