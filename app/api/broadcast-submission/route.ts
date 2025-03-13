import { NextRequest, NextResponse } from 'next/server'
import { triggerPusherEvent } from '../pusherAdmin'

export async function POST(request: NextRequest) {
  const { checked, roomId } = await request.json()

  await triggerPusherEvent(roomId, 'submission', { checked })

  return NextResponse.json({ success: true })
}
