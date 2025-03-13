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
    </Step>
  )
}
