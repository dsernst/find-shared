import type { Channel } from 'pusher-js'
import { useEffect, useState } from 'react'
import { pusher } from './initPusherClient'

export function useChannel(channelName: string) {
  const [channel, setChannel] = useState<Channel | null>(null)
  const [subscriptionCount, setSubscriptionCount] = useState(0)

  useEffect(() => {
    if (!pusher) throw new Error('Pusher failed to initialize')

    console.log('🔌 Subscribing to channel:', channelName)
    const channel = pusher.subscribe(channelName)
    setChannel(channel)

    // Update subscription count when it changes
    channel.bind('pusher:subscription_count', (data: unknown) => {
      if (data && typeof data === 'object' && 'subscription_count' in data) {
        if (typeof data.subscription_count === 'number') {
          setSubscriptionCount(data.subscription_count)
        }
      }
    })

    return () => {
      console.log('👋 Unsubscribing from channel:', channelName)
      channel.unbind_all()
      pusher?.unsubscribe(channelName)
    }
  }, [channelName])

  return { channel, subscriptionCount }
}
