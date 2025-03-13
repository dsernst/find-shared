import { useCallback, useState } from 'react'
import { useDebounce } from 'use-debounce'

export type Checked = { [key: string]: boolean }

export function useRoomState() {
  const [items, setItems] = useState('')
  const [debouncedItems] = useDebounce(items, 1000)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [otherSubmission, setOtherSubmission] = useState<Checked | null>(null)

  const onSubmissionReceived = useCallback((data: unknown) => {
    if (data && typeof data === 'object' && 'checked' in data) {
      alert('Received submission from other user!')
      setOtherSubmission(data.checked as Checked)
    }
  }, [])

  const onSubmit = useCallback((checked: Checked, roomId: string) => {
    setHasSubmitted(true)
    fetch('/api/broadcast-submission', {
      method: 'POST',
      body: JSON.stringify({ checked, roomId }),
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
