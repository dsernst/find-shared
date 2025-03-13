import { useEffect, useState } from 'react'

/** On page load, check for hash in the url.
    If not, assign a random one */
export function useRandomRoomId() {
  const [roomId, setRoomId] = useState('')

  useEffect(() => {
    if (!window.location.hash) {
      assignNewRoomId()
    } else {
      setRoomId(window.location.hash.slice(1))
    }
  }, [])

  function assignNewRoomId() {
    const newId = generateBase62String()
    window.location.hash = newId
    setRoomId(newId)
  }

  return { roomId, assignNewRoomId }
}

/** Generate a random 5-char base62 string.
    62^5 = 916,132,832 possibilities */
function generateBase62String() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < 5; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}
