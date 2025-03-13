// nextjs api route for broadcasting items to all clients

import { NextRequest, NextResponse } from 'next/server'
import Pusher from 'pusher'

export async function POST(request: NextRequest) {
  const { items, roomId } = await request.json()
  console.log('[items]\n\n', items)

  const { pusher } = initPusherAdmin()

  await pusher.trigger(roomId, 'items', { items })

  return NextResponse.json({ success: true, items })
}

function initPusherAdmin() {
  if (!process.env.PUSHER_APP_ID)
    throw new Error('process.env.PUSHER_APP_ID is not set')
  if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY)
    throw new Error('process.env.NEXT_PUBLIC_PUSHER_APP_KEY is not set')
  if (!process.env.PUSHER_SECRET)
    throw new Error('process.env.PUSHER_SECRET is not set')
  if (!process.env.NEXT_PUBLIC_PUSHER_CLUSTER)
    throw new Error('process.env.NEXT_PUBLIC_PUSHER_CLUSTER is not set')

  return {
    pusher: new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    }),
  }
}
