export const Step = ({
  title,
  children,
  activeStep,
  setActiveStep,
  step,
}: {
  title: string
  children?: React.ReactNode
  activeStep: number
  setActiveStep: (step: number) => void
  step: number
}) => {
  const isOpen = step === activeStep
  return (
    <div className="border border-white/15 rounded-md w-full bg-black/90">
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
      </h3>

      {/* Expanded content */}
      {isOpen && <div className="p-1.5">{children}</div>}
    </div>
  )
}
