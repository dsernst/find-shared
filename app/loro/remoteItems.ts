/** Incoming Pusher payload after base64 decode. */
export type RemoteItemsPayload =
  | { kind: 'snapshot'; bytes: Uint8Array }
  | { kind: 'updates'; batches: Uint8Array[] }
