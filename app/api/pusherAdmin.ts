import { BroadcastEventData, BroadcastEventType, PusherResponse } from '@/app/pusher/types'
import Pusher from 'pusher'

export function initPusherAdmin() {
  if (!process.env.PUSHER_APP_ID) throw new Error('process.env.PUSHER_APP_ID is not set')
  if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY)
    throw new Error('process.env.NEXT_PUBLIC_PUSHER_APP_KEY is not set')
  if (!process.env.PUSHER_SECRET) throw new Error('process.env.PUSHER_SECRET is not set')
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

export async function triggerPusherEvent<T extends BroadcastEventData>(
  roomId: string,
  eventName: BroadcastEventType,
  data: T
): Promise<void> {
  const { pusher } = initPusherAdmin()
  const response: PusherResponse<T> = { data }
  await pusher.trigger(roomId, eventName, response)
}
