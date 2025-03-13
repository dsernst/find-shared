import Image from 'next/image'

export const Footer = () => (
  <footer className="row-start-3 flex gap-x-[24px] flex-wrap items-center justify-center">
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="https://github.com/dsernst/find-shared"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/file.svg"
        alt="File icon"
        width={16}
        height={16}
      />
      Github
    </a>
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href="/about"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image
        aria-hidden
        src="/window.svg"
        alt="Window icon"
        width={16}
        height={16}
      />
      About
    </a>
  </footer>
)
