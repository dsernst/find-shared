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
      step={1}
      title="Add items"
      {...{ activeStep, setActiveStep }}
      right={items.split('\n').filter(Boolean).length + ' items'}
    >
      <textarea
        className="h-32 w-full rounded-md border border-white/20 bg-transparent p-2 text-sm"
        placeholder="Add items, one per line..."
        value={items}
        onChange={(e) => setItems(e.target.value)}
      />
    </Step>
  )
}
