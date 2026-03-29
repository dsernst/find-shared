import { Checked } from '../room/useRoomState'

export type BroadcastEventType = 'items' | 'submission'
/** Wire format: snapshot replaces the whole doc; updates merge incrementally. */
export type ItemsEventData =
  | { kind: 'snapshot'; enc: string }
  | { kind: 'updates'; enc: string[] }
export type SubmissionEventData = { checked: Checked; clientId: string }
export type BroadcastEventData = ItemsEventData | SubmissionEventData

export type BroadcastEvent<T extends BroadcastEventData> = {
  type: BroadcastEventType
  data: T
  roomId: string
}

export type PusherResponse<T extends BroadcastEventData> = { data: T }

// Type guard helpers
export function isItemsEvent(data: unknown): data is PusherResponse<ItemsEventData> {
  if (!data || typeof data !== 'object' || !('data' in data)) return false
  const d = data.data
  if (!d || typeof d !== 'object' || !('kind' in d)) return false
  if (d.kind === 'snapshot') {
    return 'enc' in d && typeof d.enc === 'string'
  }
  if (d.kind === 'updates') {
    return (
      'enc' in d &&
      Array.isArray(d.enc) &&
      d.enc.every((x: unknown) => typeof x === 'string')
    )
  }
  return false
}

export function isSubmissionEvent(data: unknown): data is PusherResponse<SubmissionEventData> {
  return (
    !!data &&
    typeof data === 'object' &&
    'data' in data &&
    typeof data.data === 'object' &&
    !!data.data &&
    'checked' in data.data &&
    typeof data.data.checked === 'object' &&
    'clientId' in data.data &&
    typeof data.data.clientId === 'string'
  )
}
