import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Find Shared',
  description: 'Privately mark interests— only mutual overlaps get revealed',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
