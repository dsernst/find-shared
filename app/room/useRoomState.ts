import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { BroadcastEvent, isSubmissionEvent, SubmissionEventData } from '../pusher/types'
import { generatePath } from '../utils/url'

export type InterestLevel = 0 | 1 | 2 | 3
export type Checked = Record<string, InterestLevel>

// Generate a unique client ID that persists across re-renders
const clientId = Math.random().toString(36).substring(2)

export function useRoomState(initialItems?: string) {
  const [items, setItems] = useState(initialItems || '')
  const [debouncedItems] = useDebounce(items, 1000)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [otherSubmission, setOtherSubmission] = useState<Checked | null>(null)
  const [ownSubmission, setOwnSubmission] = useState<Checked | null>(null)

  // Update URL when items change
  useEffect(() => {
    if (typeof window === 'undefined') return // Skip on server

    const newPath = generatePath(items)
    const currentHash = window.location.hash

    // Update URL without creating new history entry, preserving the hash
    window.history.replaceState(null, '', newPath + currentHash)
  }, [items])

  const onSubmissionReceived = useCallback((data: unknown) => {
    if (isSubmissionEvent(data)) {
      const receivedChecked = data.data.checked
      const isFromCurrentUser = data.data.clientId === clientId

      console.log(
        isFromCurrentUser
          ? '📤 Received our own submission'
          : '📥 Received submission from other user!',
        receivedChecked
      )

      if (!isFromCurrentUser) setOtherSubmission(receivedChecked)
    }
  }, [])

  const broadcastSubmission = useCallback((checked: Checked, roomId: string) => {
    const event: BroadcastEvent<SubmissionEventData> = {
      type: 'submission',
      data: { checked, clientId },
      roomId,
    }

    fetch('/api/broadcast', {
      method: 'POST',
      body: JSON.stringify(event),
    }).catch(console.error)
  }, [])

  const onSubmit = useCallback(
    (checked: Checked, roomId: string, setActiveStep: (step: number) => void) => {
      if (!confirm('Ready to submit your final answers?')) return

      setHasSubmitted(true)
      setOwnSubmission(checked)
      broadcastSubmission(checked, roomId)
      setActiveStep(0) // Close all steps immediately after submission
    },
    [broadcastSubmission]
  )

  const onSubscriptionCountChange = useCallback(
    (newCount: number, prevCount: number, roomId: string) => {
      if (newCount > prevCount && ownSubmission) {
        console.log('🔄 Someone joined, rebroadcasting our submission')
        broadcastSubmission(ownSubmission, roomId)
      }
    },
    [ownSubmission, broadcastSubmission]
  )

  return {
    items,
    setItems,
    debouncedItems,
    hasSubmitted,
    otherSubmission,
    ownSubmission,
    onSubmissionReceived,
    onSubmit,
    onSubscriptionCountChange,
  }
}
