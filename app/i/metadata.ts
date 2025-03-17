import type { Metadata } from 'next'

export async function metadata({ items }: { items: string[] }): Promise<Metadata> {
  const baseUrl = 'https://find-shared.vercel.app'

  const imageUrl =
    items.length > 0
      ? `${baseUrl}/api/og?items=${encodeURIComponent(items.join(','))}`
      : `${baseUrl}/screenshot.png`

  return {
    title: 'Find Shared',
    description: 'Privately mark interests— only mutual overlaps get revealed',
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: 'Find Shared',
      description:
        items.length > 0
          ? `Share interests list: ${items.slice(0, 3).join(', ')}${items.length > 3 ? '...' : ''}`
          : 'Privately mark interests— only mutual overlaps get revealed',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: 'Find Shared interests preview',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Find Shared',
      description:
        items.length > 0
          ? `Share interests list: ${items.slice(0, 3).join(', ')}${items.length > 3 ? '...' : ''}`
          : 'Privately mark interests— only mutual overlaps get revealed',
      images: [imageUrl],
    },
  }
}
