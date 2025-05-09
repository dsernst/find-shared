'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

export const Footer = () => {
  const [aboutUrl, setAboutUrl] = useState('/about')

  useEffect(() => {
    const hash = window.location.hash
    setAboutUrl(`/about${hash}`)
  }, [])

  return (
    <footer className="row-start-2 flex flex-wrap items-center justify-center gap-x-[24px]">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/dsernst/find-shared"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
        Github
      </a>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href={aboutUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
        About
      </a>
    </footer>
  )
}
