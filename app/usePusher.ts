import { useEffect, useState } from 'react'
import { pusher } from './initPusher'

export function usePusher(channelName: string) {
  const [subscriptionCount, setSubscriptionCount] = useState(0)

  // Subscribe to channel on initial page load
  useEffect(() => {
    if (!pusher) throw new Error('Pusher failed to initialize, = null')

    const channel = pusher.subscribe(channelName)

    // Listen for generic test event
    channel.bind('my-event', (data: unknown) => alert(JSON.stringify(data)))

    // Update subscription count when it changes
    channel.bind('pusher:subscription_count', (data: unknown) => {
      if (data && typeof data === 'object')
        if ('subscription_count' in data)
          if (typeof data.subscription_count === 'number')
            setSubscriptionCount(data.subscription_count)
    })

    // Clean up when done
    return () => {
      channel.unbind_all()
      pusher?.unsubscribe(channelName)
    }
  }, [channelName])

  return { subscriptionCount }
}
