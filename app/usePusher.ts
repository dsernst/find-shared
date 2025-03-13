import Pusher from 'pusher-js'
import { useEffect } from 'react'

if (!process.env.NEXT_PUBLIC_PUSHER_APP_KEY)
  throw new Error('NEXT_PUBLIC_PUSHER_APP_KEY is not set')
if (!process.env.NEXT_PUBLIC_PUSHER_CLUSTER)
  throw new Error('NEXT_PUBLIC_PUSHER_CLUSTER is not set')

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
})

export function usePusher() {
  const channelName = 'my-channel'

  useEffect(() => {
    const channel = pusher.subscribe(channelName)
    channel.bind('my-event', function (data: unknown) {
      alert(JSON.stringify(data))
    })

    return () => pusher.unsubscribe(channelName)
  }, [])
}
