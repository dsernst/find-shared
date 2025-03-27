'use client'

import { useState } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'
import { useInitialStep } from './hooks/useInitialStep'
import { usePusherRoom } from './room/usePusherRoom'
import { useRandomRoomId } from './room/useRandomRoomId'
import { useRoomState } from './room/useRoomState'
import { SharedResults } from './steps/SharedResults'
import { Step1AddItems } from './steps/Step1AddItems'
import { Step2InviteCollaborators } from './steps/Step2InviteCollaborators'
import { Step3MarkInterests } from './steps/Step3MarkInterests'

export type HomeProps = {
  initialItems?: string
}

export function Home({ initialItems }: HomeProps) {
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
    onSubscriptionCountChange,
    ownSubmission,
  } = useRoomState(initialItems)

  useInitialStep(setActiveStep)

  // Use debounced items for broadcasts
  const { subscriptionCount } = usePusherRoom(
    roomId,
    debouncedItems,
    setItems,
    onSubmissionReceived,
    onSubscriptionCountChange
  )

  return (
    <div className="grid min-h-screen items-center justify-items-center gap-40 bg-gradient-to-br from-black to-slate-950 p-6 sm:p-20">
      <main className="flex w-full max-w-2xl flex-col items-start gap-4">
        <Header />
        <Step1AddItems {...{ activeStep, setActiveStep, items, setItems }} />
        <Step2InviteCollaborators {...{ activeStep, setActiveStep, subscriptionCount, items }} />
        <Step3MarkInterests
          {...{
            activeStep,
            setActiveStep,
            items,
            hasSubmitted,
            onSubmit: (checked) => onSubmit(checked, roomId, setActiveStep),
          }}
        />
        <SharedResults
          items={items}
          hasSubmitted={hasSubmitted}
          otherSubmission={otherSubmission}
          ownSubmission={ownSubmission}
        />
      </main>
      <Footer />
    </div>
  )
}
