import { useState } from 'react'
import { Checked, InterestLevel } from '../room/useRoomState'
import { Step } from './Step'

const INTEREST_LABELS: Record<InterestLevel, string> = {
  0: 'Not interested',
  1: 'If you want',
  2: "I'm into it",
  3: 'Love it!',
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
  onSubmit,
}: {
  items: string
  activeStep: number
  setActiveStep: (step: number) => void
  hasSubmitted: boolean
  onSubmit: (checked: Checked) => void
}) {
  const [checked, setChecked] = useState<Checked>({})
  const itemsSplit = items.split('\n').filter(Boolean)

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
          Only rows where everyone is{' '}
          <span className="text-white/80">
            <i>at least</i>{' '}
            <span className={`px-1 py-0.5 ${INTEREST_COLORS[1]} pointer-events-none`}>
              &quot;If&nbsp;you&nbsp;want&quot;
            </span>
          </span>{' '}
          will be revealed
        </div>

        {/* If no items added */}
        {!items.length ? (
          <p className="text-center text-sm italic text-white/50">No items were added in Step 1</p>
        ) : (
          // List of items
          <div className="mb-3 space-y-8">
            {itemsSplit.map((item) => (
              <div key={item} className="space-y-3">
                <div className="border-l-2 border-white/20 pl-3">
                  <div className="text-base font-medium text-white">{item}</div>
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {INTEREST_LEVELS.map((level) => (
                    <button
                      key={level}
                      onClick={() => setInterestLevel(item, level)}
                      disabled={hasSubmitted}
                      className={`rounded-md px-2 py-2.5 text-xs transition-all duration-150 ${
                        checked[item] === level
                          ? INTEREST_COLORS[level]
                          : 'bg-white/5 hover:bg-white/10 active:bg-white/15'
                      } ${hasSubmitted ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                    >
                      {INTEREST_LABELS[level]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Step>
  )
}
