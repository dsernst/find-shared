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
        className="w-full h-48 outline-1 outline-slate-700 focus:outline-slate-600 rounded-md p-2"
        value={items}
        placeholder="Add one item per line"
        onChange={(e) => setItems(e.target.value)}
      />
      <div className="flex justify-end">
        <button
          className="bg-slate-800 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-slate-700/80"
          onClick={() => setActiveStep(2)}
        >
          Save
        </button>
      </div>
    </Step>
  )
}
