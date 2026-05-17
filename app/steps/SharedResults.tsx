import { INTEREST_COLORS, LEVELS } from '../room/interestLevels'
import { Checked } from '../room/useRoomState'

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
                  difference: Math.abs(ownSubmission[item] - otherSubmission[item]),
                  originalIndex: index,
                }))
                .sort((a, b) => {
                  // Sort by total interest level (descending)
                  if (b.totalLevel !== a.totalLevel) return b.totalLevel - a.totalLevel
                  // For ties, prefer more balanced interests (smaller difference)
                  if (a.difference !== b.difference) return a.difference - b.difference
                  // For complete ties, maintain original order
                  return a.originalIndex - b.originalIndex
                })

              return overlappingInterests.length > 0 ? (
                <ul className="mb-2 space-y-2">
                  {overlappingInterests.map(({ item, yourLevel, theirLevel }) => (
                    <li key={item} className="text-sm">
                      <div className="text-white/90">{item}</div>
                      <div className="mt-1 flex items-center justify-center gap-2 text-xs">
                        <span className={`${INTEREST_COLORS[yourLevel]} rounded px-2 py-0.5`}>
                          You: {LEVELS[yourLevel]}
                        </span>
                        <span className="text-white/50">•</span>
                        <span className={`${INTEREST_COLORS[theirLevel]} rounded px-2 py-0.5`}>
                          Them: {LEVELS[theirLevel]}
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
