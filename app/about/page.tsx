'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function About() {
  const [backUrl, setBackUrl] = useState('/')

  useEffect(() => {
    const hash = window.location.hash
    setBackUrl(hash ? `/${hash}` : '/')
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-black to-slate-950 p-8 sm:p-20">
      <main className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <Link
            href={backUrl}
            className="text-sm text-white/60 hover:text-white/80 hover:underline"
          >
            ← Back Home
          </Link>
          <h1 className="mt-4 text-2xl font-medium text-white">
            About <span className="font-bold text-blue-300">Find Shared</span>
          </h1>
        </div>

        <div className="space-y-6 text-white/80">
          <section>
            <h2 className="mb-2 text-lg font-medium text-white">What is Find Shared?</h2>
            <p>
              Find Shared is a privacy-focused tool that helps you discover shared interests with
              others without revealing your full preferences. It&apos;s perfect for finding
              activities, topics, or ideas that you and others share interest in.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-medium text-white">How it works</h2>
            <ol className="list-inside list-decimal space-y-2">
              <li>Add a list of items (activities, topics, etc.)</li>
              <li>Share the room link with others</li>
              <li>Each person privately marks their interest level for each item</li>
              <li>
                Only mutual matches are revealed, with both parties&apos; interest levels shown
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-medium text-white">Privacy First</h2>
            <p>
              Your privacy is our top priority. The app only reveals items that both parties have
              expressed interest in. Your full list of preferences remains private, and you
              can&apos;t discover others&apos; preferences by changing your own after submission.
            </p>

            <p className="mt-2">
              No identifiable information is asked, and nothing is ever stored.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-medium text-white">Interest Levels</h2>
            <p>Each item can be marked with one of four interest levels:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Not interested</li>
              <li>If you want</li>
              <li>I&apos;m into it</li>
              <li>Love it!</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-medium text-white">Open Source</h2>
            <p>
              Find Shared is open source and available on{' '}
              <a
                href="https://github.com/dsernst/find-shared"
                className="text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
