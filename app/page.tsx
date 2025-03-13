import { Step1AddItems } from './Step1AddItems'
import { Footer } from './Footer'
import { Header } from './Header'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-start">
        <Header />

        <Step1AddItems />

        <div>Step 2: Invite collaborators</div>
        <div>Step 3: Mark interests</div>
      </main>
      <Footer />
    </div>
  )
}
