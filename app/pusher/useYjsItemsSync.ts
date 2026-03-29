import type { Doc } from 'yjs'
import { encodeStateAsUpdate, mergeUpdates } from 'yjs'
import { Channel } from 'pusher-js'
import { useEffect, useRef } from 'react'
import { base64ToBytes, bytesToBase64 } from '../loro/bytes'
import type { RemoteItemsPayload } from '../loro/remoteItems'
import { BroadcastEvent, isItemsEvent, ItemsEventData } from './types'

const joinedAt = new Date()

export function useYjsItemsSync(
  channel: Channel | null,
  doc: Doc | null,
  subscriptionCount: number,
  roomId: string,
  applyRemoteItems: (payload: RemoteItemsPayload) => void
) {
  const queueRef = useRef<Uint8Array[]>([])
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousSubscriptionCount = useRef(0)
  const subscriptionCountRef = useRef(subscriptionCount)

  useEffect(() => {
    subscriptionCountRef.current = subscriptionCount
  }, [subscriptionCount])

  useEffect(() => {
    if (!channel) return

    const handler = (payload: unknown) => {
      console.log('📥 Received [items] event:', payload)
      if (!isItemsEvent(payload)) return console.warn('❌ Not an items event, skipping', payload)

      const { data } = payload
      let remote: RemoteItemsPayload
      if (data.kind === 'snapshot') {
        remote = { kind: 'snapshot', bytes: base64ToBytes(data.enc) }
      } else {
        remote = { kind: 'updates', batches: data.enc.map((b64) => base64ToBytes(b64)) }
      }
      applyRemoteItems(remote)
    }

    channel.bind('items', handler)
    return () => {
      channel.unbind('items', handler)
    }
  }, [channel, applyRemoteItems])

  useEffect(() => {
    if (!doc) return

    const onUpdate = (update: Uint8Array, origin: unknown) => {
      if (origin === 'remote') return
      if (subscriptionCountRef.current <= 1) return

      queueRef.current.push(update)
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = setTimeout(() => {
        debounceTimerRef.current = null
        const queued = queueRef.current.splice(0)
        if (queued.length === 0) return
        const merged = mergeUpdates(queued)
        broadcastUpdates([bytesToBase64(merged)], roomId)
      }, 250)
    }

    doc.on('update', onUpdate)
    return () => {
      doc.off('update', onUpdate)
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current)
    }
  }, [doc, roomId])

  useEffect(() => {
    if (!doc || !channel) return

    const prev = previousSubscriptionCount.current
    if (subscriptionCount > prev && !didJustJoin()) {
      const text = doc.getText('items').toString()
      if (text.trim()) {
        const snap = encodeStateAsUpdate(doc)
        console.log('🔄 Someone joined, broadcasting Yjs snapshot')
        broadcastSnapshot(bytesToBase64(snap), roomId)
      }
    }

    previousSubscriptionCount.current = subscriptionCount
  }, [subscriptionCount, doc, channel, roomId])
}

function didJustJoin() {
  return (+new Date() - +joinedAt) / 1000 < 2
}

function broadcastUpdates(enc: string[], roomId: string) {
  const event: BroadcastEvent<ItemsEventData> = {
    type: 'items',
    data: { kind: 'updates', enc },
    roomId,
  }

  fetch('/api/broadcast', {
    method: 'POST',
    body: JSON.stringify(event),
  }).catch((err) => console.error('Failed to broadcast items:', err))
}

function broadcastSnapshot(enc: string, roomId: string) {
  const event: BroadcastEvent<ItemsEventData> = {
    type: 'items',
    data: { kind: 'snapshot', enc },
    roomId,
  }

  fetch('/api/broadcast', {
    method: 'POST',
    body: JSON.stringify(event),
  }).catch((err) => console.error('Failed to broadcast snapshot:', err))
}
