import { Checked } from '../room/useRoomState'

export type BroadcastEventType = 'items' | 'submission'
export type ItemsEventData = { items: string }
export type SubmissionEventData = { checked: Checked }
export type BroadcastEventData = ItemsEventData | SubmissionEventData

export type BroadcastEvent<T extends BroadcastEventData> = {
  type: BroadcastEventType
  data: T
  roomId: string
}

export type PusherResponse<T extends BroadcastEventData> = { data: T }

// Type guard helpers
export function isItemsEvent(data: unknown): data is PusherResponse<ItemsEventData> {
  return (
    !!data &&
    typeof data === 'object' &&
    'data' in data &&
    typeof data.data === 'object' &&
    !!data.data &&
    'items' in data.data &&
    typeof data.data.items === 'string'
  )
}

export function isSubmissionEvent(data: unknown): data is PusherResponse<SubmissionEventData> {
  return (
    !!data &&
    typeof data === 'object' &&
    'data' in data &&
    typeof data.data === 'object' &&
    !!data.data &&
    'checked' in data.data &&
    typeof data.data.checked === 'object'
  )
}
