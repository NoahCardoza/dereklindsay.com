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
