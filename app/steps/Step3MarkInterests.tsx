import { useState } from 'react'
import { Checked, InterestLevel } from '../room/useRoomState'
import { Step } from './Step'

const INTEREST_LABELS: Record<InterestLevel, string> = {
  0: 'Not interested',
  1: 'If you want',
  2: "I'm into it",
  3: 'Hell yes!',
}

const INTEREST_COLORS: Record<InterestLevel, string> = {
  0: 'bg-white/20 hover:bg-white/30',
  1: 'bg-blue-500/40 hover:bg-blue-500/50',
  2: 'bg-green-500/40 hover:bg-green-500/50',
  3: 'bg-purple-500/40 hover:bg-purple-500/50',
}

const INTEREST_LEVELS: InterestLevel[] = [0, 1, 2, 3]

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

  // Calculate overlapping interests with their levels
  const overlappingInterests = otherSubmission
    ? itemsSplit
        .filter((item) => checked[item] > 0 && otherSubmission[item] > 0)
        .map((item) => ({
          item,
          yourLevel: checked[item],
          theirLevel: otherSubmission[item],
        }))
    : []

  const setInterestLevel = (item: string, level: InterestLevel) => {
    setChecked({ ...checked, [item]: level })
  }

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

        {/* If no items added */}
        {!items.length ? (
          <p className="text-center text-sm italic text-white/50">No items were added in Step 1</p>
        ) : (
          // List of items
          <div className="mb-3 space-y-4">
            {itemsSplit.map((item) => (
              <div key={item} className="space-y-2">
                <div className="text-sm font-medium text-white/90">{item}</div>
                <div className="grid grid-cols-4 gap-1">
                  {INTEREST_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setInterestLevel(item, level)}
                      disabled={hasSubmitted}
                      className={`rounded px-2 py-1 text-xs transition-colors ${
                        checked[item] === level
                          ? INTEREST_COLORS[level]
                          : 'bg-white/5 hover:bg-white/10'
                      } ${hasSubmitted ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      {INTEREST_LABELS[level]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom section for status and results */}
        {hasSubmitted && (
          <div className="mt-4 border-t border-white/20 pt-4">
            {!otherSubmission ? (
              <p className="text-center text-sm text-white/50">
                Waiting for other person to submit their interests...
              </p>
            ) : (
              <>
                <h3 className="mb-2 text-center text-sm font-medium text-white/75">
                  🎉 Shared Interests Found!
                </h3>
                {overlappingInterests.length > 0 ? (
                  <ul className="mb-2 space-y-2">
                    {overlappingInterests.map(({ item, yourLevel, theirLevel }) => (
                      <li key={item} className="text-center text-sm">
                        <div className="text-white/90">{item}</div>
                        <div className="mt-1 flex items-center justify-center gap-2 text-xs">
                          <span className={`${INTEREST_COLORS[yourLevel]} rounded px-2 py-0.5`}>
                            You: {INTEREST_LABELS[yourLevel]}
                          </span>
                          <span className="text-white/50">•</span>
                          <span className={`${INTEREST_COLORS[theirLevel]} rounded px-2 py-0.5`}>
                            Them: {INTEREST_LABELS[theirLevel]}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-sm text-white/50">
                    No overlapping interests found between you and the other person.
                  </p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Step>
  )
}
