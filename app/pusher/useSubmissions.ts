import { useEffect } from 'react'
import { Channel } from 'pusher-js'

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
