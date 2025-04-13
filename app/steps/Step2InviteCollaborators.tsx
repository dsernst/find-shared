import { IoRefresh } from 'react-icons/io5'
import QRCode from 'react-qr-code'
import { useRandomRoomId } from '../room/useRandomRoomId'
import { generateShareUrl } from '../utils/url'
import { Step } from './Step'

export const Step2InviteCollaborators = ({
  activeStep,
  setActiveStep,
  subscriptionCount,
  items,
}: {
  activeStep: number
  setActiveStep: (step: number) => void
  subscriptionCount: number
  items: string
}) => {
  const { roomId, assignNewRoomId } = useRandomRoomId()
  const origin = useOrigin()
  const url = generateShareUrl(items, roomId, origin)

  const guests = subscriptionCount - 1

  return (
    <Step
      {...{ activeStep, setActiveStep }}
      step={2}
      title="Invite collaborators"
      right={guests && guests > 0 ? `${guests} guest${guests === 1 ? '' : 's'}` : undefined}
    >
      {/* Top row */}
      <div className="mb-1.5 flex items-center justify-center text-center text-white/50">
        {/* List Room ID */}
        <span className="text-xs">Room ID:</span>
        <span className="ml-2 inline-block w-12 font-mono text-sm text-white/60">{roomId}</span>

        {/* Reassign room ID button */}
        <button
          className="ml-4 cursor-pointer rounded-lg border border-white/20 p-1 text-[13px] text-white/50 hover:bg-white/5"
          onClick={() => assignNewRoomId()}
        >
          <IoRefresh />
        </button>
      </div>

      {/* Share link & QR */}
      <div className="text-center">
        Share this link:
        {/* Blue hyperlink */}
        <a
          href={url}
          target="_blank"
          className="break-all pl-1.5 text-sm text-blue-400 underline underline-offset-2"
        >
          {url}
        </a>
        {/* QR Code */}
        <div className="opacity-85">
          <div className="mt-2 inline-block rounded-md bg-sky-400/80 p-1.5">
            <QRCode size={128} value={url} bgColor="#38bdf8" />
          </div>
        </div>
      </div>
    </Step>
  )
}

import { useEffect, useState } from 'react'

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
