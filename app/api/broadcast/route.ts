import { BroadcastEvent, BroadcastEventData, BroadcastEventType } from '@/app/pusher/types'
import { NextRequest, NextResponse } from 'next/server'
import { triggerPusherEvent } from '../pusherAdmin'

const errorResponse = (message: string) => NextResponse.json({ error: message }, { status: 400 })

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<BroadcastEvent<BroadcastEventData>>
  const { type, data, roomId } = body

  if (!type) return errorResponse('Missing field `type`')
  if (!roomId) return errorResponse('Missing field `roomId`')

  await triggerPusherEvent(roomId, type as BroadcastEventType, data)
  return NextResponse.json({ success: true })
}
