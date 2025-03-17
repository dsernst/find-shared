import type { Metadata } from 'next'
import { Home } from '../../Home'
import { metadata } from '../metadata'

type Props = {
  params: Promise<{ items: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const items = resolvedParams.items || []
  return metadata({ items })
}

export default async function ItemsPage({ params }: Props) {
  const resolvedParams = await params
  const items = (resolvedParams.items || []).map(decodeURIComponent)
  return <Home initialItems={items.join('\n')} />
}
