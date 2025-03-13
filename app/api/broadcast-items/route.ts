import { NextRequest, NextResponse } from 'next/server'
import { triggerPusherEvent } from '../pusherAdmin'

export async function POST(request: NextRequest) {
  const { items, roomId } = await request.json()
  // console.log('[items]\n\n', items)

  await triggerPusherEvent(roomId, 'items', { items })

  return NextResponse.json({ success: true, items })
}
