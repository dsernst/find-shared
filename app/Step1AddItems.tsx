import { Step } from './Step'

export function Step1AddItems({
  items,
  setItems,
  activeStep,
  setActiveStep,
}: {
  items: string
  setItems: (items: string) => void
  activeStep: number
  setActiveStep: (step: number) => void
}) {
  return (
    <Step
      title="List possible items"
      step={1}
      {...{ activeStep, setActiveStep }}
    >
      <textarea
        className="w-full h-48 border border-green-900 rounded-md p-2 mt-1.5"
        value={items}
        placeholder="Add one item per line"
        onChange={(e) => setItems(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="bg-green-800 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-green-900"
          onClick={() => setActiveStep(2)}
        >
          Save
        </button>
      </div>
    </Step>
  )
}
