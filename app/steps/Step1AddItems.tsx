import { Step } from './Step'

export function Step1AddItems({
  items,
  setItems,
  activeStep,
  setActiveStep,
  itemsReady = true,
}: {
  items: string
  setItems: (items: string) => void
  activeStep: number
  setActiveStep: (step: number) => void
  /** Shared Yjs doc ready; textarea disabled until then. */
  itemsReady?: boolean
}) {
  return (
    <Step
      step={1}
      title="Add items"
      {...{ activeStep, setActiveStep }}
      right={items.split('\n').filter(Boolean).length + ' items'}
    >
      <textarea
        className="h-32 w-full rounded-md border border-white/20 bg-transparent p-2 text-sm disabled:cursor-wait disabled:opacity-60"
        placeholder="Add items, one per line..."
        value={items}
        disabled={!itemsReady}
        onChange={(e) => setItems(e.target.value)}
      />
    </Step>
  )
}
