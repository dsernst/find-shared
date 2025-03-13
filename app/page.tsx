'use client'

import { useState } from 'react'
import { Header } from './Header'
import { Step1AddItems } from './steps/Step1AddItems'
import { Step2InviteCollaborators } from './steps/Step2InviteCollaborators'
import { Step3MarkInterests } from './steps/Step3MarkInterests'
import { Footer } from './Footer'
import { usePusherRoom } from './room/usePusherRoom'
import { useRandomRoomId } from './room/useRandomRoomId'
import { useRoomState } from './room/useRoomState'

export default function Home() {
  const [activeStep, setActiveStep] = useState(1)
  const { roomId } = useRandomRoomId()
  const {
    items,
    setItems,
    debouncedItems,
    hasSubmitted,
    otherSubmission,
    onSubmissionReceived,
    onSubmit,
  } = useRoomState()

  // Use debounced items for broadcasts
  const { subscriptionCount } = usePusherRoom(
    roomId,
    debouncedItems,
    setItems,
    onSubmissionReceived
  )

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
            onSubmit: (checked) => onSubmit(checked, roomId),
          }}
        />
      </main>
      <Footer />
    </div>
  )
}
