import { Channel } from 'pusher-js'
import { useEffect, useRef } from 'react'
import { BroadcastEvent, isItemsEvent, ItemsEventData } from './types'

// Keep track of when the user joined
const joinedAt = new Date()

export function useItemsSync(
  channel: Channel | null,
  items: string,
  setItems: (items: string) => void,
  subscriptionCount: number
) {
  const isRemoteUpdate = useRef(false)
  const lastReceivedItems = useRef('')
  const lastBroadcastItems = useRef('')
  const itemsRef = useRef(items)
  const previousSubscriptionCount = useRef(0)

  // Keep ref in sync with props
  useEffect(() => {
    itemsRef.current = items
  }, [items])

  useEffect(() => {
    if (!channel) return

    // Subscribe items to items event
    channel.bind('items', (data: unknown) => {
      console.log('📥 Received [items] event:', data)
      if (!isItemsEvent(data)) return console.warn('❌ Not an items event, skipping', data)

      const receivedItems = data.data.items

      // Skip if we just broadcast these exact items
      if (receivedItems === lastBroadcastItems.current)
        return console.log('⏩ Skipping our own broadcast')

      // Store last received items
      lastReceivedItems.current = receivedItems

      // Set flag to prevent rebroadcast, then update items
      isRemoteUpdate.current = true
      setItems(receivedItems)

      // Reset the flag after a short delay to ensure this render cycle completes
      setTimeout(() => {
        isRemoteUpdate.current = false
      }, 50)
    })

    return () => {
      channel.unbind('items')
    }
  }, [channel, setItems])

  // Handle subscription count changes
  useEffect(() => {
    const prevCount = previousSubscriptionCount.current

    // Did someone just join? (count increased)
    if (subscriptionCount > prevCount && !didJustJoin()) {
      const currentItems = itemsRef.current
      if (currentItems.trim()) {
        console.log('🔄 Someone joined, broadcasting our items')
        broadcastItems(currentItems, channel?.name || '')
      }
    }

    previousSubscriptionCount.current = subscriptionCount
  }, [subscriptionCount, channel])

  // Broadcast changes when items change
  useEffect(() => {
    if (!channel) return

    // Skip empty items
    if (!items.trim()) return

    // Skip if this is a remote update
    if (isRemoteUpdate.current) return console.log('⏩ Remote update, skipping broadcast')

    // Skip if we just joined
    if (didJustJoin()) return console.log('⏩ Just joined, skipping broadcast')

    // Skip if there's only us connected
    if (previousSubscriptionCount.current <= 1)
      return console.log('⏩ No other users connected, skipping broadcast')

    // Skip if nothing changed from what we last received
    if (items === lastReceivedItems.current)
      return console.log('⏩ Items match last received, skipping broadcast')

    // Skip if nothing changed from what we last broadcast
    if (items === lastBroadcastItems.current)
      return console.log('⏩ Items match last broadcast, skipping broadcast')

    // All checks passed - broadcast items
    console.log('🗣️ Broadcasting items update:', items)
    lastBroadcastItems.current = items
    broadcastItems(items, channel.name)
  }, [items, channel])
}

// Helper function to check if user just joined
function didJustJoin() {
  const secondsSinceJoined = (+new Date() - +joinedAt) / 1000
  return secondsSinceJoined < 2
}

// Helper function to broadcast items via API
function broadcastItems(items: string, roomId: string) {
  const event: BroadcastEvent<ItemsEventData> = {
    type: 'items',
    data: { items },
    roomId,
  }

  fetch('/api/broadcast', {
    method: 'POST',
    body: JSON.stringify(event),
  }).catch((err) => console.error('Failed to broadcast items:', err))
}
