import type { Doc } from 'yjs'
import { useEffect, useRef } from 'react'
import type { RemoteItemsPayload } from '../collab/remoteItems'
import { useChannel } from '../pusher/useChannel'
import { useYjsItemsSync } from '../pusher/useYjsItemsSync'
import { useSubmissions } from '../pusher/useSubmissions'

export function usePusherRoom(
  channelName: string,
  doc: Doc | null,
  applyRemoteItems: (payload: RemoteItemsPayload) => void,
  onSubmissionReceived: (data: unknown) => void,
  onSubscriptionCountChange: (newCount: number, prevCount: number, roomId: string) => void
) {
  const { channel, subscriptionCount } = useChannel(channelName)
  const previousSubscriptionCount = useRef(subscriptionCount)

  useYjsItemsSync(channel, doc, subscriptionCount, channelName, applyRemoteItems)
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
