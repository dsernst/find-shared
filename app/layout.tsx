import './globals.css'
import { metadata } from './i/metadata'

export const generateMetadata = () => metadata({ items: [] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
