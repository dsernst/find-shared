import { useEffect } from 'react'

/** On initial load, check for hash in URL.
    If present, they were probably invited by someone else,
    so start on step 3 */
export function useInitialStep(setActiveStep: (step: number) => void) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) setActiveStep(3)
  }, [setActiveStep])
}
