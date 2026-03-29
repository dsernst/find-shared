'use client'

import * as Y from 'yjs'
import { useCallback, useEffect, useRef, useState } from 'react'
import { applyTextDiff } from '../collab/applyTextDiff'
import type { RemoteItemsPayload } from '../collab/remoteItems'

const TEXT_KEY = 'items'

export function useYjsItems(initialItems: string) {
  const docRef = useRef<Y.Doc | null>(null)
  const isRemoteRef = useRef(false)
  const pendingUpdatesRef = useRef<Uint8Array[]>([])
  const [doc, setDoc] = useState<Y.Doc | null>(null)
  const [items, setItemsState] = useState(initialItems || '')
  const seedRef = useRef(initialItems || '')

  const flushPendingUpdates = useCallback((ydoc: Y.Doc) => {
    const pending = pendingUpdatesRef.current
    if (pending.length === 0) return
    pendingUpdatesRef.current = []
    isRemoteRef.current = true
    for (const u of pending) {
      Y.applyUpdate(ydoc, u, 'remote')
    }
    setItemsState(ydoc.getText(TEXT_KEY).toString())
    isRemoteRef.current = false
  }, [])

  useEffect(() => {
    const d = new Y.Doc()
    const text = d.getText(TEXT_KEY)
    const seed = seedRef.current
    if (seed) text.insert(0, seed)
    docRef.current = d
    setDoc(d)
    setItemsState(text.toString())
    flushPendingUpdates(d)
    return () => {
      docRef.current?.destroy()
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
    setItemsState(text.toString())
  }, [])

  const applyRemoteItems = useCallback((payload: RemoteItemsPayload) => {
    if (payload.kind === 'snapshot') {
      pendingUpdatesRef.current = []
      isRemoteRef.current = true
      docRef.current?.destroy()
      const newDoc = new Y.Doc()
      Y.applyUpdate(newDoc, payload.bytes, 'remote')
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
    for (const u of payload.batches) {
      Y.applyUpdate(d, u, 'remote')
    }
    setItemsState(d.getText(TEXT_KEY).toString())
    isRemoteRef.current = false
  }, [])

  return { items, setItems, doc, applyRemoteItems }
}
