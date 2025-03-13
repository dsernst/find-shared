import { Step } from './Step'

export function Step1AddItems({
  items,
  setItems,
}: {
  items: string
  setItems: (items: string) => void
}) {
  return (
    <Step title="Step 1: Add your list of possible items:">
      <p className="opacity-70">One per line</p>
      <textarea
        className="w-full h-48 border border-green-800 rounded-md p-2"
        value={items}
        onChange={(e) => setItems(e.target.value)}
      />
      <div className="flex justify-end">
        <button className="bg-green-800 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-900">
          Save
        </button>
      </div>
    </Step>
  )
}
