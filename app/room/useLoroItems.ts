'use client'

import type { LoroDoc } from 'loro-crdt'
import { useCallback, useEffect, useRef, useState } from 'react'
import { applyTextDiff } from '../loro/applyTextDiff'
import type { RemoteItemsPayload } from '../loro/remoteItems'

const TEXT_KEY = 'items'

export function useLoroItems(initialItems: string) {
  const docRef = useRef<LoroDoc | null>(null)
  const isRemoteRef = useRef(false)
  const pendingUpdatesRef = useRef<Uint8Array[]>([])
  const [doc, setDoc] = useState<LoroDoc | null>(null)
  const [items, setItemsState] = useState(initialItems || '')
  const seedRef = useRef(initialItems || '')

  const flushPendingUpdates = useCallback((d: LoroDoc) => {
    const pending = pendingUpdatesRef.current
    if (pending.length === 0) return
    pendingUpdatesRef.current = []
    isRemoteRef.current = true
    d.importUpdateBatch(pending)
    setItemsState(d.getText(TEXT_KEY).toString())
    isRemoteRef.current = false
  }, [])

  useEffect(() => {
    let cancelled = false
    import('loro-crdt').then(({ LoroDoc }) => {
      if (cancelled) return
      if (docRef.current !== null) return

      const d = new LoroDoc()
      const text = d.getText(TEXT_KEY)
      const seed = seedRef.current
      if (seed) text.insert(0, seed)
      d.commit()
      docRef.current = d
      setDoc(d)
      setItemsState(text.toString())
      flushPendingUpdates(d)
    })
    return () => {
      cancelled = true
      docRef.current = null
    }
  }, [flushPendingUpdates])

  const setItems = useCallback((newValue: string) => {
    const d = docRef.current
    if (!d || isRemoteRef.current) return
    const text = d.getText(TEXT_KEY)
    const oldStr = text.toString()
    if (oldStr === newValue) return
    applyTextDiff(text, oldStr, newValue)
    d.commit()
    setItemsState(text.toString())
  }, [])

  const applyRemoteItems = useCallback((payload: RemoteItemsPayload) => {
    import('loro-crdt').then(({ LoroDoc }) => {
      if (payload.kind === 'snapshot') {
        pendingUpdatesRef.current = []
        isRemoteRef.current = true
        const newDoc = LoroDoc.fromSnapshot(payload.bytes)
        docRef.current = newDoc
        setDoc(newDoc)
        setItemsState(newDoc.getText(TEXT_KEY).toString())
        isRemoteRef.current = false
        return
      }

      const d = docRef.current
      if (!d) {
        pendingUpdatesRef.current.push(...payload.batches)
        return
      }
      if (payload.batches.length === 0) return
      isRemoteRef.current = true
      d.importUpdateBatch(payload.batches)
      setItemsState(d.getText(TEXT_KEY).toString())
      isRemoteRef.current = false
    })
  }, [])

  return { items, setItems, doc, applyRemoteItems }
}
