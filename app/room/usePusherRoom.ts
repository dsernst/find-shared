import { useEffect, useRef } from 'react'
import { useChannel } from '../pusher/useChannel'
import { useItemsSync } from '../pusher/useItemsSync'
import { useSubmissions } from '../pusher/useSubmissions'

export function usePusherRoom(
  channelName: string,
  items: string,
  setItems: (items: string) => void,
  onSubmissionReceived: (data: unknown) => void,
  onSubscriptionCountChange: (newCount: number, prevCount: number, roomId: string) => void
) {
  const { channel, subscriptionCount } = useChannel(channelName)
  const previousSubscriptionCount = useRef(subscriptionCount)

  useItemsSync(channel, items, setItems, subscriptionCount)
  useSubmissions(channel, onSubmissionReceived)

  useEffect(() => {
    const prevCount = previousSubscriptionCount.current
    if (prevCount !== subscriptionCount) {
      onSubscriptionCountChange(subscriptionCount, prevCount, channelName)
      previousSubscriptionCount.current = subscriptionCount
    }
  }, [subscriptionCount, channelName, onSubscriptionCountChange])

  return { subscriptionCount }
}
