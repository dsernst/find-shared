import Pusher from 'pusher-js'
import { useEffect } from 'react'

// Throw if required env vars missing
if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY)
  throw new Error('NEXT_PUBLIC_PUSHER_APP_KEY is not set')
if (!process.env.NEXT_PUBLIC_PUSHER_CLUSTER)
  throw new Error('NEXT_PUBLIC_PUSHER_CLUSTER is not set')

// Only initialize Pusher on the client, not SSR
const pusher =
  typeof window === 'undefined'
    ? null
    : new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      })

// Clean up on local dev Hot-Module-Reload
// eslint-disable-next-line @next/next/no-assign-module-variable
declare const module: { hot?: { dispose: (callback: () => void) => void } }
if (module.hot) module.hot.dispose(() => pusher?.disconnect())

export function usePusher() {
  const channelName = 'my-channel'

  // Subscribe to channel on initial page load
  useEffect(() => {
    if (!pusher) throw new Error('Pusher failed to initialize, = null')

    const channel = pusher.subscribe(channelName)
    channel.bind('my-event', (data: unknown) => alert(JSON.stringify(data)))

    // Clean up when done
    return () => {
      channel.unbind_all()
      pusher.unsubscribe(channelName)
    }
  }, [])
}
