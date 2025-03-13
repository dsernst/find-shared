import { useState } from 'react'
import { Step } from './Step'
import { Checked } from '../room/useRoomState'

export function Step3MarkInterests({
  items,
  activeStep,
  setActiveStep,
  hasSubmitted,
  otherSubmission,
  onSubmit,
}: {
  items: string
  activeStep: number
  setActiveStep: (step: number) => void
  hasSubmitted: boolean
  otherSubmission: Checked | null
  onSubmit: (checked: Checked) => void
}) {
  const [checked, setChecked] = useState<Checked>({})
  const itemsSplit = items.split('\n').filter(Boolean)

  return (
    <Step
      step={3}
      title="Mark interests"
      {...{ activeStep, setActiveStep }}
      buttonText={!hasSubmitted ? 'Submit' : 'Submitted.'}
      buttonOnClick={() => onSubmit(checked)}
      buttonDisabled={hasSubmitted || !Object.keys(checked).length}
    >
      <div>
        <div className="text-sm text-white/50 text-center mb-2 border-b pb-2 border-white/20">
          {/* Privacy instructions */}
          <span className="text-white/75">Privacy: </span>
          Only <i className="text-white/80">mutual overlaps</i> will be revealed
        </div>

        {hasSubmitted && !otherSubmission && (
          <div className="text-sm text-white/50 text-center mb-2 border-b pb-2 border-white/20">
            Waiting for other person to submit their interests...
          </div>
        )}

        {/* If no items added */}
        {!items.length ? (
          <p className="text-center text-sm text-white/50 italic">
            No items were added in Step 1
          </p>
        ) : (
          // List of items
          itemsSplit.map((item) => (
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
          ))
        )}
      </div>
    </Step>
  )
}
