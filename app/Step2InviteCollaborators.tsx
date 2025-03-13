import { Step } from './Step'

export const Step2InviteCollaborators = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number
  setActiveStep: (step: number) => void
}) => {
  return (
    <Step
      {...{ activeStep, setActiveStep }}
      step={2}
      title="Invite collaborators"
    >
      <p className="text-center text-sm text-white/50">Not implemented yet</p>
    </Step>
  )
}
