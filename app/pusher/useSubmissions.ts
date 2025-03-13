import { Channel } from 'pusher-js'
import { useEffect } from 'react'

export function useSubmissions(
  channel: Channel | null,
  onSubmissionReceived: (data: unknown) => void
) {
  useEffect(() => {
    if (!channel) return

    channel.bind('submission', onSubmissionReceived)

    return () => {
      channel.unbind('submission')
    }
  }, [channel, onSubmissionReceived])
}
