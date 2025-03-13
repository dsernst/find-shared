'use client'

import { useCallback, useState } from 'react'
import { Header } from './Header'
import { Step1AddItems } from './Step1AddItems'
import { Step2InviteCollaborators } from './Step2InviteCollaborators'
import { Step3MarkInterests } from './Step3MarkInterests'
import { Footer } from './Footer'
import { usePusher } from './usePusher'
import { useRandomRoomId } from './useRandomRoomId'
import { useDebounce } from 'use-debounce'

const joinedAt = new Date()

export default function Home() {
  const [items, setItems] = useState('')
  const [lastReceivedItems, setLastReceivedItems] = useState(items)
  const [debouncedItems] = useDebounce(items, 1000)
  const haveItemsChanged = debouncedItems !== lastReceivedItems
  const [activeStep, setActiveStep] = useState(1)
  const { roomId } = useRandomRoomId()

  const broadcastItems = useBroadcastItems(
    debouncedItems,
    roomId,
    haveItemsChanged
  )
  const { subscriptionCount } = usePusher(
    roomId,
    broadcastItems,
    setItems,
    setLastReceivedItems
  )

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-40 sm:p-20 bg-gradient-to-br from-black to-slate-950">
      <main className="flex flex-col gap-4 items-start w-full max-w-2xl">
        <Header />
        <Step1AddItems {...{ activeStep, setActiveStep, items, setItems }} />
        <Step2InviteCollaborators
          {...{ activeStep, setActiveStep, subscriptionCount }}
        />
        <Step3MarkInterests {...{ activeStep, setActiveStep, items }} />
      </main>
      <Footer />
    </div>
  )
}

function useBroadcastItems(
  items: string,
  roomId: string,
  haveItemsChanged: boolean
) {
  return useCallback(() => {
    // Don't broadcast items if we just joined
    // (Or else we'd overwrite theirs with our blank list)
    const secondsSinceJoined = (+new Date() - +joinedAt) / 1000
    if (secondsSinceJoined < 2)
      return console.log('⏩ Just joined, skipping broadcastItems()')

    // Don't broadcast items if they haven't changed from last received
    if (!haveItemsChanged)
      return console.log("⏩ Items haven't changed, skipping broadcastItems()")

    console.log('🗣️ called broadcastItems()', items, roomId)
    fetch('/api/broadcast-items', {
      method: 'POST',
      body: JSON.stringify({ items, roomId }),
    })
  }, [items, roomId, haveItemsChanged])
}
