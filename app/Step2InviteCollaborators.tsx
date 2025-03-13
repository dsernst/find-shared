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
    ></Step>
  )
}
