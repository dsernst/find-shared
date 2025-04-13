import { Checked, InterestLevel } from '../room/useRoomState'

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

type SharedResultsProps = {
  items: string
  hasSubmitted: boolean
  otherSubmission: Checked | null
  ownSubmission: Checked | null
}

export function SharedResults({
  items,
  hasSubmitted,
  otherSubmission,
  ownSubmission,
}: SharedResultsProps) {
  if (!hasSubmitted || !ownSubmission) return null

  return (
    <div className="mt-4 w-full pt-4">
      <div className="mx-auto max-w-md text-center">
        {!otherSubmission ? (
          <div className="text-sm text-white/50">
            Waiting for other person to submit their interests...
          </div>
        ) : (
          <>
            <h3 className="mb-4 text-lg font-medium text-white/75">🎉 Shared Interests Found!</h3>
            {(() => {
              const itemsSplit = items.split('\n').filter(Boolean)
              const overlappingInterests = itemsSplit
                .filter((item) => ownSubmission[item] > 0 && otherSubmission[item] > 0)
                .map((item, index) => ({
                  item,
                  yourLevel: ownSubmission[item],
                  theirLevel: otherSubmission[item],
                  totalLevel: ownSubmission[item] + otherSubmission[item],
                  originalIndex: index,
                }))
                .sort((a, b) => {
                  // Sort by total interest level (descending)
                  if (b.totalLevel !== a.totalLevel) return b.totalLevel - a.totalLevel
                  // For ties, maintain original order
                  return a.originalIndex - b.originalIndex
                })

              return overlappingInterests.length > 0 ? (
                <ul className="mb-2 space-y-2">
                  {overlappingInterests.map(({ item, yourLevel, theirLevel }) => (
                    <li key={item} className="text-sm">
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
                <p className="text-sm text-white/50">
                  No overlapping interests found between you and the other person.
                </p>
              )
            })()}
          </>
        )}
      </div>
    </div>
  )
}
