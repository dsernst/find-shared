import { useEffect, useState } from 'react'
import { pusher } from './initPusherClient'

export function usePusher(
  channelName: string,
  broadcastItems: () => void,
  setItems: (items: string) => void
) {
  const [subscriptionCount, setSubscriptionCount] = useState(0)

  // Subscribe to channel on initial page load
  useEffect(() => {
    if (!pusher) throw new Error('Pusher failed to initialize, = null')

    const channel = pusher.subscribe(channelName)

    // Listen for generic test event
    channel.bind('my-event', (data: unknown) => alert(JSON.stringify(data)))

    // Update subscription count when it changes
    channel.bind('pusher:subscription_count', (data: unknown) => {
      // Use type-guards to validate data is the expected shape
      if (data && typeof data === 'object')
        if ('subscription_count' in data)
          if (typeof data.subscription_count === 'number')
            setSubscriptionCount(data.subscription_count)

      // Also since someone just joined (or left), let's broadcast our current items list
      broadcastItems()
    })

    // Subscribe items to [items] event
    channel.bind('items', (data: unknown) => {
      console.log('received [items] event:', data)
      if (data && typeof data === 'object')
        if ('items' in data && typeof data.items === 'string')
          setItems(data.items)
    })

    // Clean up when done
    return () => {
      channel.unbind_all()
      pusher?.unsubscribe(channelName)
    }
  }, [channelName, broadcastItems, setItems])

  return { subscriptionCount }
}
