import { Step } from './Step'
import { useRandomRoomId } from './useRandomRoomId'
import { IoRefresh } from 'react-icons/io5'
import QRCode from 'react-qr-code'

export const Step2InviteCollaborators = ({
  activeStep,
  setActiveStep,
}: {
  activeStep: number
  setActiveStep: (step: number) => void
}) => {
  const { roomId, assignNewRoomId } = useRandomRoomId()
  const origin = useOrigin()
  const url = `${origin}/#${roomId}`

  return (
    <Step
      {...{ activeStep, setActiveStep }}
      step={2}
      title="Invite collaborators"
    >
      <p className="text-center text-white/50 mb-1.5 flex items-center justify-center">
        {/* List Room ID */}
        <span className="text-xs">Room ID:</span>
        <span className="text-white/60 ml-2 text-sm inline-block w-12 font-mono">
          {roomId}
        </span>

        {/* Reassign room ID button */}
        <button
          className="text-white/50 border border-white/20 text-[13px] rounded-lg p-1 ml-4 hover:bg-white/5 cursor-pointer"
          onClick={() => assignNewRoomId()}
        >
          <IoRefresh />
        </button>
      </p>

      <div>
        Share this link:{' '}
        <a
          href={`/#${roomId}`}
          target="_blank"
          className="text-blue-400 underline underline-offset-2 text-sm"
        >
          {url}
        </a>
        <div className="text-center">
          <div className="bg-sky-400/80 p-1.5 inline-block rounded-md mt-2">
            <QRCode size={128} value={url} bgColor="#38bdf8" />
          </div>
        </div>
      </div>
    </Step>
  )
}

import { useState, useEffect } from 'react'

/** Helper function to get origin from the url,
    updating when it changes */
function useOrigin() {
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  return origin
}
