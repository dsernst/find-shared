/** Incoming Pusher payload after base64 decode (Yjs updates or full snapshot). */
export type RemoteItemsPayload =
  | { kind: 'snapshot'; bytes: Uint8Array }
  | { kind: 'updates'; batches: Uint8Array[] }
