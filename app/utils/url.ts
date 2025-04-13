export function generatePath(items: string): string {
  const itemsList = items.split('\n').filter(Boolean)
  return itemsList.length > 0
    ? `/i/${itemsList.map((item) => encodeURIComponent(item).replaceAll('/', '%2F')).join('/')}`
    : '/'
}

export function generateShareUrl(items: string, roomId: string, origin: string): string {
  return `${origin}${generatePath(items)}#${roomId}`
}
