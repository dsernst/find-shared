import { NextRequest, NextResponse } from 'next/server'
import { triggerPusherEvent } from '../pusherAdmin'

const errorResponse = (message: string) =>
  NextResponse.json({ error: message }, { status: 400 })

export async function POST(request: NextRequest) {
  const { type, data, roomId } = await request.json()

  if (!type) return errorResponse('Missing field `type`')
  if (!roomId) return errorResponse('Missing field `roomId`')

  await triggerPusherEvent(roomId, type, data)
  return NextResponse.json({ success: true })
}
