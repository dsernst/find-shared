'use client'

// import { useCallback, useState, useEffect } from 'react'
import { useState } from 'react'
import { Header } from './Header'
import { Step1AddItems } from './Step1AddItems'
import { Step2InviteCollaborators } from './Step2InviteCollaborators'
import { Step3MarkInterests } from './Step3MarkInterests'
import { Footer } from './Footer'
import { useRoom } from './pusher/useRoom'
import { useRandomRoomId } from './useRandomRoomId'
import { useDebounce } from 'use-debounce'

// const joinedAt = new Date()

export default function Home() {
  const [items, setItems] = useState('')
  const [debouncedItems] = useDebounce(items, 1000)
  const [activeStep, setActiveStep] = useState(1)
  const { roomId } = useRandomRoomId()
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [otherSubmission, setOtherSubmission] = useState<{
    [key: string]: boolean
  } | null>(null)

  const onSubmissionReceived = (data: unknown) => {
    if (data && typeof data === 'object' && 'checked' in data) {
      alert('Received submission from other user!')
      setOtherSubmission(data.checked as { [key: string]: boolean })
    }
  }

  // Use debounced items for broadcasts
  const { subscriptionCount } = useRoom(
    roomId,
    debouncedItems,
    setItems,
    onSubmissionReceived
  )

  const onSubmit = (checked: { [key: string]: boolean }) => {
    setHasSubmitted(true)

    fetch('/api/broadcast-submission', {
      method: 'POST',
      body: JSON.stringify({ checked, roomId }),
    }).catch(console.error)
  }

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-40 sm:p-20 bg-gradient-to-br from-black to-slate-950">
      <main className="flex flex-col gap-4 items-start w-full max-w-2xl">
        <Header />
        <Step1AddItems {...{ activeStep, setActiveStep, items, setItems }} />
        <Step2InviteCollaborators
          {...{ activeStep, setActiveStep, subscriptionCount }}
        />
        <Step3MarkInterests
          {...{
            activeStep,
            setActiveStep,
            items,
            hasSubmitted,
            otherSubmission,
            onSubmit,
          }}
        />
      </main>
      <Footer />
    </div>
  )
}

// function useBroadcastItems(
//   items: string,
//   roomId: string,
//   haveItemsChanged: boolean
// ) {
//   return useCallback(() => {
//     // Don't broadcast items if we just joined
//     // (Or else we'd overwrite theirs with our blank list)
//     const secondsSinceJoined = (+new Date() - +joinedAt) / 1000
//     if (secondsSinceJoined < 2)
//       return console.log('⏩ Just joined, skipping broadcastItems()')

//     // Don't broadcast items if they haven't changed from last received
//     if (!haveItemsChanged)
//       return console.log("⏩ Items haven't changed, skipping broadcastItems()")

//     console.log('🗣️ called broadcastItems()', items, roomId)
//     fetch('/api/broadcast-items', {
//       method: 'POST',
//       body: JSON.stringify({ items, roomId }),
//     })
//   }, [items, roomId, haveItemsChanged])
// }
