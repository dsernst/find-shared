import { useEffect, useState } from 'react'

/** On page load, check for hash in the url.
    If not, assign a random one */
export function useRandomRoomId() {
  const [roomId, setRoomId] = useState('')
  const { hash, hashLoaded } = useHash()

  // On page load
  useEffect(() => {
    // Give the initial hash a chance to load
    if (!hashLoaded) return

    // Check for hash in the url
    if (hash) return setRoomId(hash.slice(1))

    // If no hash, assign a random one
    assignNewRoomId()
  }, [hash, hashLoaded])

  // For initial load, and Reassign button
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

/** Helper function to get hash from the url,
    updating when it changes */
function useHash() {
  const [hash, setHash] = useState('')
  const [hashLoaded, setHashLoaded] = useState(false)

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash)
    updateHash() // Set initial hash
    setHashLoaded(true)
    window.addEventListener('hashchange', updateHash) // Watch for changes
    return () => window.removeEventListener('hashchange', updateHash) // Clean up
  }, [])

  return { hash, hashLoaded }
}
