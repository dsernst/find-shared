'use client'

import { useState } from 'react'
import { Header } from './Header'
import { Step1AddItems } from './Step1AddItems'
import { Step2InviteCollaborators } from './Step2InviteCollaborators'
import { Step3MarkInterests } from './Step3MarkInterests'
import { Footer } from './Footer'
import { usePusher } from './usePusher'

export default function Home() {
  const [items, setItems] = useState('')
  const [activeStep, setActiveStep] = useState(1)
  usePusher()

  return (
    <div className="grid items-center justify-items-center min-h-screen p-8 gap-40 sm:p-20">
      <main className="flex flex-col gap-4 items-start w-full max-w-2xl">
        <Header />
        <Step1AddItems {...{ activeStep, setActiveStep, items, setItems }} />
        <Step2InviteCollaborators {...{ activeStep, setActiveStep }} />
        <Step3MarkInterests {...{ activeStep, setActiveStep, items }} />
      </main>
      <Footer />
    </div>
  )
}
