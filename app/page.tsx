'use client'

import { Step1AddItems } from './Step1AddItems'
import { Footer } from './Footer'
import { Header } from './Header'
import { useState } from 'react'
import { Step3MarkInterests } from './Step3MarkInterests'
import { Step } from './Step'

export default function Home() {
  const [items, setItems] = useState('')

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-start">
        <Header />

        <Step1AddItems items={items} setItems={setItems} />

        <Step title="Step 2: Invite collaborators"></Step>
        <Step3MarkInterests items={items} />
      </main>
      <Footer />
    </div>
  )
}
