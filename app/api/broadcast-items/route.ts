// nextjs api route for broadcasting items to all clients

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { items } = await request.json()
  console.log('[items]\n\n', items)
  return NextResponse.json({ items })
}
