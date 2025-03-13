import { Footer } from './Footer'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        {/* Header*/}
        <div className="text-center w-full">
          <h1 className="text-4xl font-bold">Find Shared</h1>
          <h2>Privately mark interests</h2>
          <h3 className="opacity-50">
            ...only <i>mutual overlaps</i> get revealed
          </h3>
        </div>

        {/* Step 1: Add items */}
        <div>
          <h4>Step 1: Add your list of possible items, one per line:</h4>
          <textarea className="w-full h-48 border border-green-800 rounded-md p-2" />
          <div className="flex justify-end">
            <button className="bg-green-800 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-900">
              Save
            </button>
          </div>
        </div>

        <div className="">Step 2: Invite collaborators</div>
      </main>
      <Footer />
    </div>
  )
}
