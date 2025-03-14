import { useCallback, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { BroadcastEvent, isSubmissionEvent, SubmissionEventData } from '../pusher/types'

export type InterestLevel = 0 | 1 | 2 | 3
export type Checked = { [key: string]: InterestLevel }

// Generate a unique client ID that persists across re-renders
const clientId = Math.random().toString(36).substring(2)

export function useRoomState() {
  const [items, setItems] = useState('')
  const [debouncedItems] = useDebounce(items, 1000)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [otherSubmission, setOtherSubmission] = useState<Checked | null>(null)

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

  const onSubmit = useCallback((checked: Checked, roomId: string) => {
    if (!confirm('Ready to submit your final answers?')) return

    setHasSubmitted(true)

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

  return {
    items,
    setItems,
    debouncedItems,
    hasSubmitted,
    otherSubmission,
    onSubmissionReceived,
    onSubmit,
  }
}
