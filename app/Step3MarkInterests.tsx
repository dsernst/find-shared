import { useState } from 'react'
import { Step } from './Step'

type Checked = { [key: string]: boolean }

export function Step3MarkInterests({
  items,
  activeStep,
  setActiveStep,
}: {
  items: string
  activeStep: number
  setActiveStep: (step: number) => void
}) {
  const [checked, setChecked] = useState<Checked>({})

  return (
    <Step step={3} title="Mark interests" {...{ activeStep, setActiveStep }}>
      <div>
        {items
          .split('\n')
          .filter(Boolean)
          .map((item) => (
            <div
              key={item}
              className="hover:bg-white/10 rounded-md p-1 cursor-pointer"
              onClick={() => setChecked({ ...checked, [item]: !checked[item] })}
            >
              <input
                type="checkbox"
                className="mr-2"
                readOnly
                checked={!!checked[item]}
              />
              {item}
            </div>
          ))}
      </div>
    </Step>
  )
}
