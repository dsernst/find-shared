import { useState } from 'react'
import { Checked } from '../room/useRoomState'
import { Step } from './Step'

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

  // Calculate overlapping interests
  const overlappingInterests = otherSubmission
    ? itemsSplit.filter((item) => checked[item] && otherSubmission[item])
    : []

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
        <div className="mb-2 border-b border-white/20 pb-2 text-center text-sm text-white/50">
          {/* Privacy instructions */}
          <span className="text-white/75">Privacy: </span>
          Only <i className="text-white/80">mutual overlaps</i> will be revealed
        </div>

        {hasSubmitted && !otherSubmission && (
          <div className="mb-2 border-b border-white/20 pb-2 text-center text-sm text-white/50">
            Waiting for other person to submit their interests...
          </div>
        )}

        {/* If no items added */}
        {!items.length ? (
          <p className="text-center text-sm italic text-white/50">No items were added in Step 1</p>
        ) : (
          // List of items
          itemsSplit.map((item) => (
            <div
              key={item}
              className="cursor-pointer rounded-md p-1 hover:bg-white/10"
              onClick={() => setChecked({ ...checked, [item]: !checked[item] })}
            >
              <input type="checkbox" className="mr-2" readOnly checked={!!checked[item]} />
              {item}
            </div>
          ))
        )}

        {/* Show overlapping interests when both have submitted */}
        {hasSubmitted && otherSubmission && (
          <div className="mt-4 border-t border-white/20 pt-4">
            <h3 className="mb-2 text-center text-sm font-medium text-white/75">
              🎉 Shared Interests Found!
            </h3>
            {overlappingInterests.length > 0 ? (
              <ul className="space-y-1">
                {overlappingInterests.map((item) => (
                  <li key={item} className="text-center text-sm text-white/90">
                    {item}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-sm text-white/50">
                No overlapping interests found between you and the other person.
              </p>
            )}
          </div>
        )}
      </div>
    </Step>
  )
}
