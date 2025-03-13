import { useEffect } from 'react'

export function useRandomRoomId() {
  // On page load, check if there is a hash in the url
  // If not, assign a random one
  useEffect(() => {
    if (!window.location.hash) window.location.hash = generateBase62String()
  }, [])
}

// Generate a random 5-char base62 string
// 62^5 = 916,132,832 possibilities
function generateBase62String() {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < 5; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}
