import { useCallback, useState } from 'react'
import { useDebounce } from 'use-debounce'
import {
  BroadcastEvent,
  isSubmissionEvent,
  SubmissionEventData,
} from '../pusher/types'

export type Checked = { [key: string]: boolean }

export function useRoomState() {
  const [items, setItems] = useState('')
  const [debouncedItems] = useDebounce(items, 1000)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [otherSubmission, setOtherSubmission] = useState<Checked | null>(null)

  const onSubmissionReceived = useCallback((data: unknown) => {
    if (isSubmissionEvent(data)) {
      alert('Received submission from other user!')
      setOtherSubmission(data.data.checked)
    }
  }, [])

  const onSubmit = useCallback((checked: Checked, roomId: string) => {
    setHasSubmitted(true)

    const event: BroadcastEvent<SubmissionEventData> = {
      type: 'submission',
      data: { checked },
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
