import { useChannel } from './useChannel'
import { useItemsSync } from './useItemsSync'
import { useSubmissions } from './useSubmissions'

export function useRoom(
  channelName: string,
  items: string,
  setItems: (items: string) => void,
  onSubmissionReceived: (data: unknown) => void
) {
  const { channel, subscriptionCount } = useChannel(channelName)

  useItemsSync(channel, items, setItems, subscriptionCount)
  useSubmissions(channel, onSubmissionReceived)

  return { subscriptionCount }
}
