import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'New Year 2026 Insights',
  description: 'Discover insights and trends for the New Year 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
