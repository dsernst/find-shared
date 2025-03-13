import { useEffect, useState, useRef } from 'react'
import { pusher } from './initPusherClient'

// Keep track of when the user joined
const joinedAt = new Date()

export function usePusher(
  channelName: string,
  items: string,
  setItems: (items: string) => void
) {
  const [subscriptionCount, setSubscriptionCount] = useState(0)
  const isRemoteUpdate = useRef(false)
  const lastReceivedItems = useRef('')
  const lastBroadcastItems = useRef('')

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

      // Someone joined - broadcast our items if we have any
      if (items.trim() && !isJustJoined()) {
        console.log('🔄 Someone joined, broadcasting our items')
        broadcastItems(items, channelName)
      }
    })

    // Subscribe items to items event
    channel.bind('items', (data: unknown) => {
      console.log('📥 Received [items] event:', data)
      if (
        data &&
        typeof data === 'object' &&
        'items' in data &&
        typeof data.items === 'string'
      ) {
        // Skip if we just broadcast these exact items
        if (data.items === lastBroadcastItems.current) {
          console.log('⏩ Skipping our own broadcast')
          return
        }

        // Store last received items
        lastReceivedItems.current = data.items

        // Set flag to prevent rebroadcast, then update items
        isRemoteUpdate.current = true
        setItems(data.items)

        // Reset the flag after a short delay to ensure this render cycle completes
        setTimeout(() => {
          isRemoteUpdate.current = false
        }, 10)
      }
    })

    // Clean up when done
    return () => {
      channel.unbind_all()
      pusher?.unsubscribe(channelName)
    }
  }, [channelName, setItems, items])

  // Broadcast changes when items change
  useEffect(() => {
    // Skip empty items
    if (!items.trim()) return

    // Skip if this is a remote update
    if (isRemoteUpdate.current) {
      console.log('⏩ Remote update, skipping broadcast')
      return
    }

    // Skip if we just joined
    if (isJustJoined()) {
      console.log('⏩ Just joined, skipping broadcast')
      return
    }

    // Skip if nothing changed from what we last received
    if (items === lastReceivedItems.current) {
      console.log('⏩ Items match last received, skipping broadcast')
      return
    }

    // Skip if nothing changed from what we last broadcast
    if (items === lastBroadcastItems.current) {
      console.log('⏩ Items match last broadcast, skipping broadcast')
      return
    }

    // All checks passed - broadcast items
    console.log('🗣️ Broadcasting items update:', items)
    lastBroadcastItems.current = items
    broadcastItems(items, channelName)
  }, [items, channelName])

  return { subscriptionCount }
}

// Helper function to check if user just joined
function isJustJoined() {
  const secondsSinceJoined = (+new Date() - +joinedAt) / 1000
  return secondsSinceJoined < 2
}

// Helper function to broadcast items via API
function broadcastItems(items: string, roomId: string) {
  fetch('/api/broadcast-items', {
    method: 'POST',
    body: JSON.stringify({ items, roomId }),
  }).catch((err) => console.error('Failed to broadcast items:', err))
}
