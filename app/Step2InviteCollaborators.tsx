import { Step } from './Step'
import { useRandomRoomId } from './useRandomRoomId'

export const Step2InviteCollaborators = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number
  setActiveStep: (step: number) => void
}) => {
  const { roomId, assignNewRoomId } = useRandomRoomId()

  return (
    <Step
      {...{ activeStep, setActiveStep }}
      step={2}
      title="Invite collaborators"
    >
      <p className="text-center text-sm text-white/50">
        {/* List Room ID */}
        Room ID: {roomId}
        {/* Reassign room ID button */}
        <button
          className="text-white/50 border border-white/20 text-xs rounded-md py-0.5 px-1 ml-5"
          onClick={() => assignNewRoomId()}
        >
          Reassign
        </button>
      </p>
      <div className="">
        Share this link:{' '}
        <a
          href={`/#${roomId}`}
          target="_blank"
          className="text-blue-400 underline underline-offset-2"
        >
          {window.location.origin}/{window.location.hash}
        </a>
      </div>
    </Step>
  )
}
