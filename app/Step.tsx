export const Step = ({
  title,
  children,
  activeStep,
  setActiveStep,
  step,
  right,
  buttonText = 'Next',
  buttonOnClick,
}: {
  title: string
  children?: React.ReactNode
  activeStep: number
  setActiveStep: (step: number) => void
  step: number
  right?: string
  buttonText?: string
  buttonOnClick?: () => void
}) => {
  const isOpen = step === activeStep

  return (
    <div className="border border-white/15 rounded-md w-full bg-black/90 relative">
      <h3
        className={`font-semibold p-1.5 ${
          !isOpen ? 'hover:bg-white/5 cursor-pointer' : 'bg-white/5'
        }`}
        onClick={() => !isOpen && setActiveStep(step)}
      >
        {/* Arrow */}
        <span
          className={`ml-1 text-xs transition-all duration-400 opacity-70 w-5 inline-block ${
            isOpen && 'rotate-90 translate-y-1 -translate-x-1.5'
          }`}
        >
          ▶
        </span>

        {/* Step */}
        <span className="text-sm mr-2.5 opacity-80 font-medium">
          Step {step}
        </span>

        {/* Title */}
        {title}

        {/* Option count, on right side */}
        {right && (
          <div className="right-2 top-2.5 absolute text-xs opacity-80 font-bold text-white/70">
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
              className="bg-slate-800 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-slate-700/80"
              onClick={() =>
                buttonOnClick ? buttonOnClick() : setActiveStep(step + 1)
              }
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
