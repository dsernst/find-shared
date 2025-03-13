export const Step = ({
  title,
  children,
  activeStep,
  setActiveStep,
  step,
  right,
  buttonText = 'Next',
  buttonOnClick,
  buttonDisabled = false,
}: {
  title: string
  children?: React.ReactNode
  activeStep: number
  setActiveStep: (step: number) => void
  step: number
  right?: string
  buttonText?: string
  buttonOnClick?: () => void
  buttonDisabled?: boolean
}) => {
  const isOpen = step === activeStep

  return (
    <div className="relative w-full rounded-md border border-white/15 bg-black/90">
      <h3
        className={`p-1.5 font-semibold ${
          !isOpen ? 'cursor-pointer hover:bg-white/5' : 'bg-white/5'
        }`}
        onClick={() => !isOpen && setActiveStep(step)}
      >
        {/* Arrow */}
        <span
          className={`duration-400 ml-1 inline-block w-5 text-xs opacity-70 transition-all ${
            isOpen && '-translate-x-1.5 translate-y-1 rotate-90'
          }`}
        >
          ▶
        </span>

        {/* Step */}
        <span className="mr-2.5 text-sm font-medium opacity-80">Step {step}</span>

        {/* Title */}
        {title}

        {/* Option count, on right side */}
        {right && (
          <div className="absolute right-2 top-2.5 text-xs font-bold text-white/70 opacity-80">
            {right}
          </div>
        )}
      </h3>

      {/* Expanded content */}
      {isOpen && (
        <div className="p-1.5">
          {children}

          {/* Next button */}
          <div className="flex justify-end">
            <button
              className="cursor-pointer rounded-md bg-slate-800 px-4 py-2 text-white hover:bg-slate-700/80 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => (buttonOnClick ? buttonOnClick() : setActiveStep(step + 1))}
              disabled={buttonDisabled}
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
