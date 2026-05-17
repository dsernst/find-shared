export const LEVELS: Record<InterestLevel, string> = {
  0: 'Not interested',
  1: 'If you want',
  2: "I'm into it",
  3: 'Love it!',
}

export const INTEREST_COLORS: Record<InterestLevel, string> = {
  0: 'bg-white/20 hover:bg-white/30',
  1: 'bg-blue-500/40 hover:bg-blue-500/50',
  2: 'bg-green-500/40 hover:bg-green-500/50',
  3: 'bg-purple-500/40 hover:bg-purple-500/50',
}

export type InterestLevel = 0 | 1 | 2 | 3
